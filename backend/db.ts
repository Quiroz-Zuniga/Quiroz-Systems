import { PrismaClient } from '@prisma/client';

// Fase C3/SDD-3 — Instancia única de Prisma.
// Prisma resuelve `env("DATABASE_URL")` cargando su propio `.env`, lo que
// dificulta apuntar a una DB alternativa en tests. Por eso, si el proceso
// define `DATABASE_URL` de forma explícita, la inyectamos por `datasources`
// para que SIEMPRE gane sobre el `.env` (usado por el test runner).

const explicitUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL : undefined;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createClient(): PrismaClient {
  return explicitUrl
    ? new PrismaClient({ datasources: { db: { url: explicitUrl } } })
    : new PrismaClient();
}

export const prisma = globalForPrisma.prisma || createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;