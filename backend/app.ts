import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { rateLimit } from 'express-rate-limit';
import { executeRouter } from './routes/execute';
import { assessmentsRouter } from './routes/assessments';
import { profileRouter } from './routes/profile';
import { certificatesRouter } from './routes/certificates';
import { progressRouter } from './routes/progress';
import { adminRouter } from './routes/admin';
import { authRouter } from './routes/auth';
import { authRequired } from './middleware/auth';
import { prisma } from './db';

// SDD-3 — `buildApp()` separa la construcción del servidor Express del listen.
// Los tests de integración importan esta fábrica y levantan el server en un
// puerto efímero (sin tocar el puerto de producción).

const HERE = (() => {
  // Funciona en bundled CJS (esbuild, __dirname) y en ESM/tsx (import.meta.url).
  try {
    // @ts-ignore — __dirname solo existe en CJS
    if (typeof __dirname !== 'undefined') return __dirname;
  } catch {
    // noop
  }
  return path.dirname(fileURLToPath(import.meta.url));
})();

export function buildApp(): express.Express {
  // Fase C6 — Logging estructurado (JSON) de cada request.
  const app = express();

  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const durationMs = Date.now() - start;
      const entry = {
        ts: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        durationMs,
        ip: req.ip,
      };
      if (res.statusCode >= 500) console.error(JSON.stringify(entry));
      else if (res.statusCode >= 400) console.warn(JSON.stringify(entry));
      else console.log(JSON.stringify(entry));
    });
    next();
  });

  // Fase A6 — Hardening y red.
  // 1. Helmet: headers de seguridad (CSP, nosniff, HSTS, etc.).
  // 2. CORS con allowlist explícita (CORS_ORIGINS) en lugar de `cors()` abierto.
  // 3. Rate-limit global por IP sobre toda la API (express-rate-limit).
  // 4. Límite de payload razonable (JSON body) en vez de '10mb'.
  app.use(helmet());

  const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:4000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(null, false);
      },
    })
  );

  const globalApiLimiter = rateLimit({
    windowMs: 60_000,
    limit: 120, // 120 requests/min por IP a toda la API
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' },
  });

  app.use(express.json({ limit: '2mb' }));

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
    if (req.path === '/health') return next();
    globalApiLimiter(req, res, next);
  });

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

  // Fase C5 — En producción sirve el frontend compilado (dist/public) desde
  // Express. En tests no existe, así que se omite.
  const distDir = path.join(HERE, '..');
  const frontendDist = path.join(distDir, 'dist', 'public');
  const hasStaticApp = fs.existsSync(path.join(frontendDist, 'index.html'));

  // Fase C6 — Healthcheck con métricas básicas (uptime y memoria).
  app.get('/api/health', async (_req, res) => {
    const startedAt = Date.now() - Math.floor(process.uptime() * 1000);
    let dbOk = false;
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbOk = true;
    } catch {
      dbOk = false;
    }
    res.status(dbOk ? 200 : 503).json({
      status: dbOk ? 'ok' : 'degraded',
      service: 'Quiroz Systems Backend API',
      uptimeSeconds: Math.floor(process.uptime()),
      startedAt: new Date(startedAt).toISOString(),
      memory: {
        rssMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
        heapUsedMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      },
      database: dbOk ? 'connected' : 'error',
      frontendServed: hasStaticApp,
    });
  });

  // Sirve los estáticos del frontend si existen (montaje de producción).
  if (hasStaticApp) {
    app.use(express.static(frontendDist));
    // SPA fallback: cualquier ruta no-API cae al index.html (Rutas con Router).
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(path.join(frontendDist, 'index.html'));
    });
  }

  return app;
}