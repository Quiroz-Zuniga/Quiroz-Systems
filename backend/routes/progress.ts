import { Router } from 'express';
import { prisma } from '../db';

export const progressRouter = Router();

progressRouter.get('/progress/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const student = await prisma.student.findUnique({ where: { id: req.user!.id } });
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado.' });
    }

    const progress = await prisma.courseProgress.findUnique({
      where: {
        studentId_courseId: {
          studentId: student.id,
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

    return res.json({
      courseId: progress.courseId,
      completedLessonIds,
      attempts: attemptsRecord,
      startDate: progress.startDate.toLocaleDateString('es-ES'),
      completionDate: progress.completionDate || undefined,
      finalGradePercent: progress.finalGradePercent || undefined,
      certificateUuid: progress.certificateUuid || undefined,
    });
  } catch (error: any) {
    console.error('Error al obtener progreso:', error);
    return res.status(500).json({ error: 'Error al consultar progreso de curso.' });
  }
});

progressRouter.post('/progress', async (req, res) => {
  try {
    const { courseId, attempts, completionDate, finalGradePercent, certificateUuid } = req.body;

    const student = await prisma.student.findUnique({ where: { id: req.user!.id } });
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado.' });
    }

    const progress = await prisma.courseProgress.upsert({
      where: {
        studentId_courseId: {
          studentId: student.id,
          courseId,
        },
      },
      create: {
        studentId: student.id,
        courseId,
        completionDate: completionDate || null,
        finalGradePercent: finalGradePercent ? Number(finalGradePercent) : null,
        certificateUuid: certificateUuid || null,
      },
      update: {
        completionDate: completionDate || undefined,
        finalGradePercent: finalGradePercent ? Number(finalGradePercent) : undefined,
        certificateUuid: certificateUuid || undefined,
      },
    });

    if (attempts && typeof attempts === 'object') {
      for (const lessonId of Object.keys(attempts)) {
        const att = attempts[lessonId];
        await prisma.lessonAttempt.upsert({
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

    return res.json({ success: true });
  } catch (error: any) {
    console.error('Error al guardar progreso:', error);
    return res.status(500).json({ error: 'Error al actualizar progreso de curso.' });
  }
});
