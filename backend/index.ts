import { buildApp } from './app';
import { scheduleSessionCleanup } from './session';
import * as Sentry from '@sentry/node';

// Fase C6 — Sentry: se activa solo si SENTRY_DSN está configurado.
let sentryEnabled = false;
try {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE || 0.1),
    });
    sentryEnabled = true;
    console.log('[Quiroz Systems Backend API] Sentry habilitado.');
  }
} catch (err) {
  console.warn('[Quiroz Systems Backend API] Sentry no disponible:', err);
}

const app = buildApp();
const PORT = Number(process.env.PORT) || 4000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Quiroz Systems Backend API] Servidor Express ejecutándose en http://0.0.0.0:${PORT}`);
  // Fase C3 — Limpieza periódica de sesiones expiradas.
  scheduleSessionCleanup();
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[Quiroz Systems Backend API] Error: El puerto ${PORT} ya está en uso por otro proceso.`);
    console.error(`Para liberarlo ejecuta: fuser -k ${PORT}/tcp`);
  } else {
    console.error('[Quiroz Systems Backend API] Error al iniciar servidor:', err);
  }
  process.exit(1);
});

// Fase C6 — Notificar errores no capturados a Sentry (si está configurado).
if (sentryEnabled) {
  Sentry.setupExpressErrorHandler(app);
}
process.on('unhandledRejection', (reason) => {
  if (sentryEnabled) Sentry.captureException(reason);
  console.error('[Quiroz Systems Backend API] Unhandled rejection:', reason);
});