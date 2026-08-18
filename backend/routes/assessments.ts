import { Router } from 'express';
import { evaluateLesson, LessonNotRegisteredError } from '../use-cases/evaluateLesson';
import { QueueFullError, PistonUnavailableError, UnsupportedLanguageError } from '../piston';
import { validateBody, assessmentSchema } from '../validation';

export const assessmentsRouter = Router();

// Fase B1 + SDD — El CUERPO de evaluación vive en la capa de servicio
// `evaluateLesson` (runner + rúbrica 70/20/10 + persistencia transaccional +
// nota final del curso). Esta ruta es un controlador delgado: valida el body y
// mapea errores tipados. Los `testCases`/`schemaSql` enviados por el cliente
// son IGNORADOS: el backend los carga desde specs/lessons (Zero Trust).
assessmentsRouter.post('/assessments', validateBody(assessmentSchema), async (req, res) => {
  try {
    const {
      courseId,
      lessonId,
      language,
      code,
      attemptsCount = 1,
      hintsUnlockedCount = 0,
      timeSpentSeconds = 0,
    } = req.body;

    const user = req.user!;

    const result = await evaluateLesson({
      userId: user.id,
      courseId,
      lessonId,
      language,
      code,
      attemptsCount,
      hintsUnlockedCount,
      timeSpentSeconds,
    });

    return res.json(result);
  } catch (error: any) {
    if (error instanceof LessonNotRegisteredError) {
      return res.status(400).json({ error: error.message });
    }
    if (error instanceof QueueFullError) {
      return res.status(429).json({ error: error.message });
    }
    if (error instanceof UnsupportedLanguageError) {
      return res.status(400).json({ error: error.message });
    }
    if (error instanceof PistonUnavailableError) {
      return res.status(503).json({ error: error.message });
    }
    if (error?.message === 'Estudiante no encontrado.') {
      return res.status(401).json({ error: error.message });
    }
    console.error('Error en /api/assessments:', error);
    return res.status(500).json({ error: error.message || 'Error interno en la evaluación.' });
  }
});
