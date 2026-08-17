import { prisma } from '../db';
import { getCourseMeta } from '../domain/courseRegistry';
import { calculateLessonScore, calculateCourseGrade } from '../domain/rubric';
import { getLessonSpec } from '../specs/lessonSpecs';
import type { AssessmentRequest, AssessmentResponse, LessonAttempt } from '../../shared/contracts';
import { runSpecs } from '../runners/executor';

// Fase B1 + SDD — Capa de servicio de evaluación (la ÚNICA que califica).
// Orquesta: resolver el currículo oficial (Zero Trust) → ejecutar el runner
// adecuado → aplicar la rúbrica 70/20/10 → persistir de forma transaccional →
// recalcular la nota final del curso en el servidor.
// El frontend jamás ejecuta código ni calcula puntajes: solo envía la solución
// y recibe {passed, results, logs, timeMs, grade, finalGradePercent}.
// Los tipos provienen del contrato compartido (Fase B3).
//
// SDD — Los testCases y schemaSql se cargan desde specs/lessons (fuente de
// verdad versionada). Lo que envía el cliente se IGNORA por completo: un
// estudiante no puede editar la spec para que su solución apruebe.

// Error tipado: lección no versionada en el curriculum oficial.
export class LessonNotRegisteredError extends Error {
  constructor(courseId: string, lessonId: string) {
    super(`La lección ${lessonId} del curso ${courseId} no está registrada en el curriculum oficial.`);
    this.name = 'LessonNotRegisteredError';
  }
}

export type EvaluateLessonParams = AssessmentRequest & { studentId: string };

export type EvaluateLessonResult = AssessmentResponse;

export async function evaluateLesson(params: EvaluateLessonParams): Promise<EvaluateLessonResult> {
  const { studentId, courseId, lessonId, language, code, attemptsCount, hintsUnlockedCount, timeSpentSeconds } = params;

  // Zero Trust: el backend usa SOLO su propio curriculum (maxScore y tiempo).
  const meta = getCourseMeta(courseId);
  const effectiveMaxScore = meta?.lessonMaxScores?.[lessonId] ?? 100;
  const effectiveMinutes = meta?.lessonEstimatedMinutes?.[lessonId] ?? 45;

  // SDD — Los testCases oficiales vienen de la spec versionada, no del cliente.
  const spec = getLessonSpec(courseId, lessonId);
  if (!spec) {
    throw new LessonNotRegisteredError(courseId, lessonId);
  }

  // Ejecutar según el tipo de lección (idioma / SQL / HTML-CSS) vía el
  // evaluador único de specs (Fase B2), siempre con los casos de la spec.
  const execResult = await runSpecs({
    language,
    code,
    schemaSql: spec.schemaSql,
    testCases: spec.testCases,
  });

  // Rúbrica oficial aplicada únicamente en el backend.
  const grade = calculateLessonScore({
    lessonId,
    maxScore: effectiveMaxScore,
    estimatedMinutes: effectiveMinutes,
    passed: execResult.passed,
    attemptsCount: Number(attemptsCount),
    hintsUnlockedCount: Number(hintsUnlockedCount),
    timeSpentSeconds: Number(timeSpentSeconds),
    submittedCode: code,
  });

  // NOTA: persistencia transaccional. La evaluación NO se marca como aprobada
  // salvo que el backend lo certifique.
  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) {
    throw new Error('Estudiante no encontrado.');
  }

  const { courseProgress, finalGradePercent } = await prisma.$transaction(async (tx) => {
    const courseProgress = await tx.courseProgress.upsert({
      where: { studentId_courseId: { studentId, courseId } },
      create: { studentId, courseId },
      update: {},
    });

    await tx.lessonAttempt.upsert({
      where: { courseProgressId_lessonId: { courseProgressId: courseProgress.id, lessonId } },
      create: {
        courseProgressId: courseProgress.id,
        lessonId,
        attemptsCount: Number(attemptsCount),
        hintsUnlockedCount: Number(hintsUnlockedCount),
        timeSpentSeconds: Number(timeSpentSeconds),
        scoreObtained: grade.scoreObtained,
        functionalScore: grade.functionalScore,
        efficiencyScore: grade.efficiencyScore,
        timeScore: grade.timeScore,
        passed: grade.passed,
        submittedCode: code,
        completedAt: grade.completedAt ? new Date(grade.completedAt) : null,
      },
      update: {
        attemptsCount: Number(attemptsCount),
        hintsUnlockedCount: Number(hintsUnlockedCount),
        timeSpentSeconds: Number(timeSpentSeconds),
        scoreObtained: grade.scoreObtained,
        functionalScore: grade.functionalScore,
        efficiencyScore: grade.efficiencyScore,
        timeScore: grade.timeScore,
        passed: grade.passed,
        submittedCode: code,
        completedAt: grade.passed ? new Date() : undefined,
      },
    });

    // Recalcular la nota final del curso en el servidor (rúbrica sobre los
    // intentos reales persistidos, no sobre datos del cliente).
    const attempts = await tx.lessonAttempt.findMany({
      where: { courseProgressId: courseProgress.id, passed: true },
      select: {
        lessonId: true,
        attemptsCount: true,
        hintsUnlockedCount: true,
        timeSpentSeconds: true,
        scoreObtained: true,
        functionalScore: true,
        efficiencyScore: true,
        timeScore: true,
        passed: true,
        submittedCode: true,
      },
    });
    const totalMaxScore = meta?.totalMaxScore ?? 0;
    const finalGradePercent = calculateCourseGrade(attempts, totalMaxScore);

    await tx.courseProgress.update({
      where: { id: courseProgress.id },
      data: { finalGradePercent },
    });

    return { courseProgress, finalGradePercent };
  });

  void courseProgress;

  return {
    passed: execResult.passed,
    results: execResult.results,
    logs: execResult.logs,
    timeMs: execResult.timeMs,
    grade,
    finalGradePercent,
  };
}
