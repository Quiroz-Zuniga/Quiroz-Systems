import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { getSessionToken, findSessionAccount } from '../session';
import { prisma } from '../db';

// Identidad del usuario autenticado, resuelta por el token de sesión.
// Soporta cuentas estándar (User) y admins.
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'USUARIO' | 'INSTITUCION' | 'SUPER_ADMIN';
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authRequired: RequestHandler = async (req, res, next) => {
  const token = getSessionToken(req);
  if (!token) return res.status(401).json({ error: 'No hay sesión iniciada.' });

  try {
    const account = await findSessionAccount(token);
    if (!account) {
      return res.status(401).json({ error: 'Sesión expirada o inválida. Inicia sesión de nuevo.' });
    }

    req.user = {
      id: account.user.id,
      email: account.user.email,
      name: account.user.name,
      role: account.user.role as AuthUser['role'],
    };
    next();
  } catch (err) {
    console.error('Error en autenticación:', err);
    return res.status(500).json({ error: 'Error interno de autenticación.' });
  }
};

// Restringe el acceso por rol. Asume que authRequired ya corrió.
export function requireRole(...roles: AuthUser['role'][]): RequestHandler {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'No autenticado.' });
    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: 'No tienes permisos para esta acción.' });
    }
    next();
  };
}
