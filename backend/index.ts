import express from 'express';
import cors from 'cors';
import { executeRouter } from './routes/execute';
import { assessmentsRouter } from './routes/assessments';
import { profileRouter } from './routes/profile';
import { certificatesRouter } from './routes/certificates';
import { progressRouter } from './routes/progress';
import { adminRouter } from './routes/admin';
import { authRouter } from './routes/auth';
import { authRequired } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Fase A1 — Auth MW obligatoria.
// Protege TODAS las rutas /api/* salvo la lista pública explícita
// (registro, inicio de sesión y verificación pública de certificados).
// Cualquier ruta nueva queda protegida por defecto (default-deny).
const PUBLIC_API_PATHS = [
  '/auth/register',
  '/auth/login',
  '/auth/me',
  '/auth/logout',
  '/certificates/verify',
  '/health',
];

app.use('/api', (req, res, next) => {
  const isPublic = PUBLIC_API_PATHS.some(
    (p) => req.path === p || req.path.startsWith(`${p}/`)
  );
  if (isPublic) return next();
  return authRequired(req, res, next);
});

// Mount API Routes
app.use('/api', executeRouter);
app.use('/api', assessmentsRouter);
app.use('/api', profileRouter);
app.use('/api', certificatesRouter);
app.use('/api', progressRouter);
app.use('/api', authRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Quiroz Systems Backend API' });
});

const server = app.listen(PORT, () => {
  console.log(`[Quiroz Systems Backend API] Servidor Express ejecutándose en http://localhost:${PORT}`);
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
