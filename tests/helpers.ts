import { execSync } from 'child_process';
import { existsSync, unlinkSync, mkdirSync } from 'fs';
import path from 'path';
import os from 'os';
import type { Server } from 'http';

// SDD-3 — Infraestructura de tests de integración.
// Usa una SQLite temporal por ejecución (nunca toca prisma/dev.db).

const TEST_DB_DIR = path.join(os.tmpdir(), 'quiroz-systems-tests');
const TEST_DB_PATH = path.join(TEST_DB_DIR, 'test.db');

export function setupTestDatabase(name = 'shared'): void {
  process.env.NODE_ENV = 'test';
  // Cada archivo de test usa su propia SQLite temporal porque node:test
  // ejecuta los archivos en procesos paralelos (evita carreras sobre un
  // mismo archivo).
  const dbPath = path.join(TEST_DB_DIR, `${name}.db`);
  mkdirSync(TEST_DB_DIR, { recursive: true });
  if (existsSync(dbPath)) unlinkSync(dbPath);
  process.env.DATABASE_URL = `file:${dbPath}`;
  // Aplica las migraciones formales de Prisma sobre la DB temporal.
  execSync('npx prisma migrate deploy', {
    stdio: 'pipe',
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
  });
  // Siembra los cursos y lecciones para cumplir las FKs relacionales.
  execSync('npx tsx prisma/seed.ts', {
    stdio: 'pipe',
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
  });
}

export interface TestServer {
  baseUrl: string;
  close: () => Promise<void>;
}

export async function startTestServer(): Promise<TestServer> {
  const { buildApp } = await import('../backend/app');
  const app = buildApp();
  const server: Server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  return {
    baseUrl: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise<void>((resolve) => {
        server.close(() => resolve());
      }),
  };
}

export async function jsonFetch(
  baseUrl: string,
  pathName: string,
  init: RequestInit = {}
): Promise<{ status: number; data: any }> {
  const res = await fetch(`${baseUrl}${pathName}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { status: res.status, data };
}