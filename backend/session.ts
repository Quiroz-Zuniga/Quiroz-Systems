import type { Request } from 'express';
import { prisma } from './db';

// Fuente única de verdad para resolver una sesión a partir del token Bearer.
// Reutilizada por la ruta /api/auth/me, el middleware authRequired y
// cualquier otro consumidor que necesite la identidad del usuario.

export function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  return scheme === 'Bearer' && token ? token : null;
}

export async function findSessionUser(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: { include: { institution: true } } },
  });
  if (!session || session.expiresAt < new Date()) return null;
  return session.user;
}