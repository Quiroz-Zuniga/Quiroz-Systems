import { PrismaClient } from '@prisma/client';

// Fase C3/SDD-3 — Instancia única de Prisma.
// Prisma resuelve `env("DATABASE_URL")` cargando su propio `.env`, lo que
// dificulta apuntar a una DB alternativa en tests. Por eso, si el proceso
// define `DATABASE_URL` de forma explícita, la inyectamos por `datasources`
// para que SIEMPRE gane sobre el `.env` (usado por el test runner).

import fs from 'fs';
import path from 'path';

// Si DATABASE_URL apunta a un archivo SQLite que no existe (ej. volumen persistente /data/dev.db),
// copiamos automáticamente la base de datos pre-sembrada con los cursos.
if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('file:')) {
  try {
    const filePath = process.env.DATABASE_URL.replace(/^file:/, '');
    const resolvedPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    const dir = path.dirname(resolvedPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(resolvedPath)) {
      const defaultDb = path.resolve(process.cwd(), 'prisma/dev.db');
      if (fs.existsSync(defaultDb)) {
        fs.copyFileSync(defaultDb, resolvedPath);
        console.log(`[Database] Inicializada base de datos persistente en: ${resolvedPath}`);
      }
    }
  } catch (err) {
    console.warn('[Database] No se pudo auto-inicializar SQLite:', err);
  }
}

const explicitUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL : undefined;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createClient(): PrismaClient {
  return explicitUrl
    ? new PrismaClient({ datasources: { db: { url: explicitUrl } } })
    : new PrismaClient();
}

export const prisma = globalForPrisma.prisma || createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;