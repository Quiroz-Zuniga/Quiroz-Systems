import { Router } from 'express';
import { runSpecs } from '../runners/executor';
import { slidingWindowRateLimit } from '../rateLimit';
import { QueueFullError, PistonUnavailableError, UnsupportedLanguageError } from '../piston';
import { validateBody, executeSchema } from '../validation';

export const executeRouter = Router();

// Fase A2 — Rate-limit por usuario/IP antes de entrar al sandbox.
// El guard global de `/api` ya garantiza que req.user exista (autenticado).
const executeLimiter = slidingWindowRateLimit({
  windowMs: 60_000,
  max: 30, // 30 ejecuciones por minuto por usuario
  key: (req) => (req.user ? `user:${req.user.id}` : `ip:${req.ip}`),
  message: 'Has alcanzado el límite de ejecuciones. Espera un momento e inténtalo de nuevo.',
});

executeRouter.post('/execute', executeLimiter, validateBody(executeSchema), async (req, res) => {
  try {
    const { language, code, testCases } = req.body;

    const casesToRun = testCases && testCases.length > 0 ? testCases : [{ id: 'default', input: '', output: '' }];

    // Ejecución delegada al evaluador único de specs (Piston / sql.js / HTML-CSS).
    const outcome = await runSpecs({ language, code, testCases: casesToRun });
    return res.json(outcome);
  } catch (error: any) {
    if (error instanceof QueueFullError) return res.status(429).json({ error: error.message });
    if (error instanceof UnsupportedLanguageError) return res.status(400).json({ error: error.message });
    if (error instanceof PistonUnavailableError) return res.status(503).json({ error: error.message });
    console.error('Error en /api/execute:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor en la ejecución.' });
  }
});
