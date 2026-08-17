import type { Request } from 'express';
import { prisma } from './db';

// Fuente única de verdad para resolver una sesión a partir del token.
// Estrategia preferida (Fase C3): cookie HttpOnly `qs_session`; el header
// `Authorization: Bearer` se mantiene como respaldo retrocompatible.
// Reutilizada por la ruta /api/auth/me, el middleware authRequired y
// cualquier otro consumidor que necesite la identidad del usuario.

export const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 días
const SESSION_COOKIE = 'qs_session';

const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1 hora
let cleanupTimer: NodeJS.Timeout | null = null;

export function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  return scheme === 'Bearer' && token ? token : null;
}

function getCookieToken(req: Request): string | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(';')) {
    const [name, value] = part.trim().split('=');
    if (name === SESSION_COOKIE && value) return decodeURIComponent(value);
  }
  return null;
}

// Resuelve el token de sesión preferentemente desde la cookie HttpOnly.
export function getSessionToken(req: Request): string | null {
  return getCookieToken(req) ?? getBearerToken(req);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_MS,
  };
}

export function sessionCookieName(): string {
  return SESSION_COOKIE;
}

export async function findSessionUser(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: { include: { institution: true } } },
  });
  if (!session || session.expiresAt < new Date()) return null;
  return session.user;
}

// Fase C3 — Elimina las sesiones ya vencidas para que la tabla no crezca sin
// límite. Se agenda al arrancar el servidor y se repite cada hora.
export async function cleanupExpiredSessions(): Promise<number> {
  try {
    const result = await prisma.session.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    if (result.count > 0) {
      console.log(`[Sesiones] ${result.count} sesiones expiradas eliminadas.`);
    }
    return result.count;
  } catch (err) {
    console.error('[Sesiones] Error al limpiar sesiones expiradas:', err);
    return 0;
  }
}

export function scheduleSessionCleanup(): void {
  void cleanupExpiredSessions();
  if (cleanupTimer) clearInterval(cleanupTimer);
  cleanupTimer = setInterval(() => void cleanupExpiredSessions(), CLEANUP_INTERVAL_MS);
  // No mantener el proceso vivo por el timer en Node.
  cleanupTimer.unref();
}