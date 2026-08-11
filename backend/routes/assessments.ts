import { Router } from 'express';
import { prisma } from '../db';
import { runProgrammingCode } from '../runners/programmingRunner';
import { runSqlExercise } from '../runners/sqlRunner';
import { runHtmlCssExercise } from '../runners/htmlCssRunner';
import { calculateLessonScore } from '../domain/rubric';
import { getCourseMeta } from '../domain/courseRegistry';
import type { TestCase } from '../runners/programmingRunner';

export const assessmentsRouter = Router();

// El CUERPO de evaluación corre íntegro en el servidor. El backend ejecuta los
// tests, aplica la rúbrica 70/20/10 y persiste la nota de forma transaccional.
// El frontend jamás calcula puntajes (Zero Trust).
assessmentsRouter.post('/assessments', async (req, res) => {
  try {
    const {
      courseId,
      lessonId,
      language,
      code,
      schemaSql,
      testCases,
      attemptsCount = 1,
      hintsUnlockedCount = 0,
      timeSpentSeconds = 0,
    } = req.body;

    if (!courseId || !lessonId || typeof code !== 'string' || !Array.isArray(testCases) || testCases.length === 0) {
      return res.status(400).json({ error: 'Faltan campos requeridos (courseId, lessonId, code, testCases).' });
    }

    const user = req.user!;
    // Zero Trust: el backend usa SOLO su propio curriculum (maxScore y tiempo)
    // para la rúbrica. Los valores enviados por el cliente se ignoran.
    const meta = getCourseMeta(courseId);
    const effectiveMaxScore = meta?.lessonMaxScores?.[lessonId] ?? 100;
    const effectiveMinutes = meta?.lessonEstimatedMinutes?.[lessonId] ?? 45;

    // Ejecutar según el tipo de lección (idioma / SQL / HTML-CSS).
    let execResult: {
      passed: boolean;
      results: any[];
      logs: string;
      timeMs: number;
    };

    const cases: TestCase[] = testCases.map((tc: TestCase) => ({
      id: tc.id,
      input: tc.input,
      output: tc.output,
      description: tc.description,
    }));

    if (language === 'sql') {
      execResult = await runSqlExercise(code, schemaSql, cases);
    } else if (language === 'html' || language === 'css' || language === 'htmlcss') {
      execResult = runHtmlCssExercise(code, cases);
    } else {
      execResult = await runProgrammingCode(language, code, cases);
    }

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

    // NOTA: persistencia transaccional.
    // La evaluación NO se marca como aprobada salvo que el backend lo certifique.
    const student = await prisma.student.findUnique({ where: { id: user.id } });
    if (!student) {
      return res.status(401).json({ error: 'Estudiante no encontrado.' });
    }

    const progress = await prisma.courseProgress.upsert({
      where: { studentId_courseId: { studentId: user.id, courseId } },
      create: { studentId: user.id, courseId },
      update: {},
    });

    await prisma.lessonAttempt.upsert({
      where: { courseProgressId_lessonId: { courseProgressId: progress.id, lessonId } },
      create: {
        courseProgressId: progress.id,
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

    return res.json({
      passed: execResult.passed,
      results: execResult.results,
      logs: execResult.logs,
      timeMs: execResult.timeMs,
      grade,
    });
  } catch (error: any) {
    console.error('Error en /api/assessments:', error);
    return res.status(500).json({ error: error.message || 'Error interno en la evaluación.' });
  }
});