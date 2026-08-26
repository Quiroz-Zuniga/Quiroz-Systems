import { Router } from 'express';
import { prisma } from '../db';
import { validateBody, progressSchema } from '../validation';
import { calculateCourseGrade } from '../domain/rubric';
import { getCourseMeta } from '../domain/courseRegistry';

export const progressRouter = Router();

progressRouter.get('/progress/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) {
      return res.status(404).json({ error: 'Estudiante no encontrado.' });
    }

    const progress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId,
        },
      },
      include: {
        attempts: true,
      },
    });

    if (!progress) {
      return res.json({
        courseId,
        completedLessonIds: [],
        attempts: {},
        startDate: new Date().toLocaleDateString('es-ES'),
      });
    }

    const attemptsRecord: Record<string, any> = {};
    const completedLessonIds: string[] = [];

    progress.attempts.forEach((att) => {
      attemptsRecord[att.lessonId] = {
        lessonId: att.lessonId,
        attemptsCount: att.attemptsCount,
        hintsUnlockedCount: att.hintsUnlockedCount,
        timeSpentSeconds: att.timeSpentSeconds,
        scoreObtained: att.scoreObtained,
        functionalScore: att.functionalScore,
        efficiencyScore: att.efficiencyScore,
        timeScore: att.timeScore,
        passed: att.passed,
        submittedCode: att.submittedCode,
        completedAt: att.completedAt ? att.completedAt.toISOString() : undefined,
      };
      if (att.passed) {
        completedLessonIds.push(att.lessonId);
      }
    });

    // Fase B1 — La nota final del curso se calcula SIEMPRE en el servidor a
    // partir de los intentos persistidos (rúbrica 70/20/10), nunca se confía
    // en un valor enviado por el cliente.
    const totalMaxScore = getCourseMeta(courseId)?.totalMaxScore ?? 0;
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

    return res.json({
      courseId: progress.courseId,
      completedLessonIds,
      attempts: attemptsRecord,
      startDate: progress.startDate.toLocaleDateString('es-ES'),
      completionDate: progress.completionDate ? progress.completionDate.toISOString() : undefined,
      finalGradePercent,
      certificateUuid: progress.certificateUuid || undefined,
    });
  } catch (error: any) {
    console.error('Error al obtener progreso:', error);
    return res.status(500).json({ error: 'Error al consultar progreso de curso.' });
  }
});

progressRouter.post('/progress', validateBody(progressSchema), async (req, res) => {
  try {
    const { courseId, attempts, completionDate } = req.body;

    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) {
      return res.status(404).json({ error: 'Estudiante no encontrado.' });
    }

    // Fase C1 + B-B-001 — Persistencia atómica y recálculo server-side de nota final.
    await prisma.$transaction(async (tx) => {
      const progress = await tx.courseProgress.upsert({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId,
          },
        },
        create: {
          userId: user.id,
          courseId,
          completionDate: completionDate ? new Date(completionDate) : null,
        },
        update: {
          completionDate: completionDate ? new Date(completionDate) : undefined,
        },
      });

      if (attempts && typeof attempts === 'object') {
        for (const lessonId of Object.keys(attempts)) {
          const att = attempts[lessonId];
          await tx.lessonAttempt.upsert({
            where: {
              courseProgressId_lessonId: {
                courseProgressId: progress.id,
                lessonId,
              },
            },
            create: {
              courseProgressId: progress.id,
              lessonId: att.lessonId,
              attemptsCount: att.attemptsCount || 1,
              hintsUnlockedCount: att.hintsUnlockedCount || 0,
              timeSpentSeconds: att.timeSpentSeconds || 0,
              scoreObtained: Number(att.scoreObtained || 0),
              functionalScore: Number(att.functionalScore || 0),
              efficiencyScore: Number(att.efficiencyScore || 0),
              timeScore: Number(att.timeScore || 0),
              passed: Boolean(att.passed),
              submittedCode: att.submittedCode || '',
              completedAt: att.completedAt ? new Date(att.completedAt) : new Date(),
            },
            update: {
              attemptsCount: att.attemptsCount || 1,
              hintsUnlockedCount: att.hintsUnlockedCount || 0,
              timeSpentSeconds: att.timeSpentSeconds || 0,
              scoreObtained: Number(att.scoreObtained || 0),
              functionalScore: Number(att.functionalScore || 0),
              efficiencyScore: Number(att.efficiencyScore || 0),
              timeScore: Number(att.timeScore || 0),
              passed: Boolean(att.passed),
              submittedCode: att.submittedCode || '',
              completedAt: att.completedAt ? new Date(att.completedAt) : new Date(),
            },
          });
        }
      }

      // Recalcular finalGradePercent server-side
      const passedAttempts = await tx.lessonAttempt.findMany({
        where: { courseProgressId: progress.id, passed: true },
      });
      const totalMaxScore = getCourseMeta(courseId)?.totalMaxScore ?? 0;
      const finalGradePercent = calculateCourseGrade(passedAttempts, totalMaxScore);

      await tx.courseProgress.update({
        where: { id: progress.id },
        data: { finalGradePercent },
      });
    });

    return res.json({ success: true });
  } catch (error: any) {
    console.error('Error al guardar progreso:', error);
    return res.status(500).json({ error: 'Error al actualizar progreso de curso.' });
  }
});
