import { randomUUID } from 'crypto';
import { prisma } from '../db';
import { isCourseCompleted, getCourseMeta } from '../domain/courseRegistry';
import { calculateCourseGrade } from '../domain/rubric';

export interface IssueCertificateParams {
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  studyHours?: number;
}

export interface IssueCertificateResult {
  success: boolean;
  issued: boolean;
  certificate?: any;
  error?: string;
}

// Emisión idempotente y segura: solo se otorga con progreso REAL 100% (0-100).
// El backend recalcula la calificación final a partir de las lecciones
// aprobadas; nunca se confía en cifras enviadas por el cliente.
export async function issueCertificateForStudent(
  params: IssueCertificateParams
): Promise<IssueCertificateResult> {
  const { studentId, courseId, courseTitle, studyHours = 45 } = params;

  const progress = await prisma.courseProgress.findUnique({
    where: { studentId_courseId: { studentId, courseId } },
    include: { attempts: true },
  });

  if (!progress || progress.attempts.length === 0) {
    return { success: false, issued: false, error: 'Aún no has iniciado este curso.' };
  }

  const passedIds = progress.attempts.filter((a) => a.passed).map((a) => a.lessonId);

  // Validación estricta: deben estar aprobadas TODAS las lecciones del curso.
  if (!isCourseCompleted(passedIds, courseId)) {
    return {
      success: false,
      issued: false,
      error: 'Progreso insuficiente. Completa el 100% del curso para obtener tu certificado.',
    };
  }

  // Recalcular la calificación final en el servidor (rúbrica 70/20/10).
  const meta = getCourseMeta(courseId);
  const totalMaxScore = meta?.totalMaxScore ?? 0;
  const finalGradePercent = calculateCourseGrade(
    progress.attempts.filter((a) => a.passed).map((a) => ({
      lessonId: a.lessonId,
      attemptsCount: a.attemptsCount,
      hintsUnlockedCount: a.hintsUnlockedCount,
      timeSpentSeconds: a.timeSpentSeconds,
      scoreObtained: a.scoreObtained,
      functionalScore: a.functionalScore,
      efficiencyScore: a.efficiencyScore,
      timeScore: a.timeScore,
      passed: a.passed,
      submittedCode: a.submittedCode,
    })),
    totalMaxScore
  );

  // Idempotencia: si ya existe un certificado para este (student + course), devolverlo.
  const existing = await prisma.certificate.findFirst({
    where: { studentId, courseId },
  });
  if (existing) {
    await prisma.courseProgress.update({
      where: { studentId_courseId: { studentId, courseId } },
      data: { finalGradePercent: finalGradePercent, certificateUuid: existing.uuid, status: 'CERTIFIED' },
    });
    return { success: true, issued: false, certificate: existing };
  }

  // UUID generado internamente con crypto (NUNCA por el cliente).
  const uuid = randomUUID().toUpperCase();
  const cert = await prisma.certificate.create({
    data: {
      uuid,
      studentId,
      studentName: params.studentName,
      courseId,
      courseTitle,
      finalGradePercent: finalGradePercent,
      studyHours: Number(studyHours) || 45,
      issueDate: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      approvedBy: 'Quiroz Systems Admin',
    },
  });

  await prisma.courseProgress.update({
    where: { studentId_courseId: { studentId, courseId } },
    data: { finalGradePercent: finalGradePercent, certificateUuid: cert.uuid, status: 'CERTIFIED', completionDate: new Date().toLocaleDateString('es-ES') },
  });

  return { success: true, issued: true, certificate: cert };
}