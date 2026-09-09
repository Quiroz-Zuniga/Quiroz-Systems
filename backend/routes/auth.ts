import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import crypto from 'crypto';
import { hashPassword, verifyPassword } from '../password';
import {
  getSessionToken,
  findSessionAccount,
  SESSION_TTL_MS,
  sessionCookieOptions,
  sessionCookieName,
} from '../session';
import { validateBody, registerSchema, loginSchema } from '../validation';

export const authRouter = Router();

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function serializeUser(user: any) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

// POST /api/auth/register
authRouter.post('/auth/register', validateBody(registerSchema), async (req: Request, res: Response) => {
  try {
    const { role, name, email, password } = req.body;

    if (role !== 'USUARIO' && role !== 'INSTITUCION') {
      return res.status(400).json({ error: 'Este rol no se registra por cuenta propia en la plataforma.' });
    }

    const emailNormalized = String(email).trim().toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email: emailNormalized } });

    if (existing) {
      return res.status(409).json({
        error: 'Este correo ya tiene una cuenta activa. Inicia sesión en lugar de volver a registrarte.',
      });
    }

    const passwordHash = await hashPassword(password);

    let finalRole = role;
    if (role === 'INSTITUCION') {
      finalRole = 'PENDIENTE_INSTITUCION';
    }

    const user = await prisma.user.create({
      data: {
        name: String(name).trim(),
        email: emailNormalized,
        password: passwordHash,
        role: finalRole,
      },
    });

    if (finalRole === 'PENDIENTE_INSTITUCION') {
      const institutionTitle = req.body.institutionName
        ? String(req.body.institutionName).trim()
        : String(name).trim();

      await prisma.institution.upsert({
        where: { id: user.id },
        update: {
          nombre: institutionTitle,
          nombre_docente_responsable: String(name).trim(),
        },
        create: {
          id: user.id,
          nombre: institutionTitle,
          nombre_docente_responsable: String(name).trim(),
        },
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Cuenta creada correctamente. Ahora puedes iniciar sesión.',
      user: serializeUser(user),
    });
  } catch (error: any) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ error: 'Error interno al registrar la cuenta.' });
  }
});

// POST /api/auth/login
authRouter.post('/auth/login', validateBody(loginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
    }

    const emailNormalized = String(email).trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Credenciales incorrectas. Si no tienes cuenta, regístrate primero.' });
    }

    const valid = await verifyPassword(String(password), user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales incorrectas. Revisa tu correo y contraseña.' });
    }

    await prisma.session.deleteMany({ where: { userId: user!.id } });

    const token = generateToken();
    await prisma.session.create({
      data: {
        token,
        userId: user!.id,
        expiresAt: new Date(Date.now() + SESSION_TTL_MS),
      },
    });

    res.cookie(sessionCookieName(), token, sessionCookieOptions());

    return res.json({ token, user: serializeUser(user!) });
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error interno al iniciar sesión.' });
  }
});

// GET /api/auth/me
authRouter.get('/auth/me', async (req: Request, res: Response) => {
  try {
    const token = getSessionToken(req);
    if (!token) return res.status(401).json({ error: 'No hay sesión iniciada.' });

    const account = await findSessionAccount(token);
    if (!account) return res.status(401).json({ error: 'Sesión expirada o inválida.' });

    await prisma.session.update({
      where: { token },
      data: { expiresAt: new Date(Date.now() + SESSION_TTL_MS) },
    });
    res.cookie(sessionCookieName(), token, sessionCookieOptions());

    return res.json({ user: serializeUser(account.user) });
  } catch (error: any) {
    console.error('Error al restaurar sesión:', error);
    return res.status(500).json({ error: 'Error al restaurar la sesión.' });
  }
});

// POST /api/auth/logout
authRouter.post('/auth/logout', async (req: Request, res: Response) => {
  try {
    const token = getSessionToken(req);
    if (token) {
      await prisma.session.deleteMany({ where: { token } });
    }
    const { maxAge, ...clearOptions } = sessionCookieOptions();
    res.clearCookie(sessionCookieName(), clearOptions);
    return res.json({ success: true });
  } catch (error: any) {
    console.error('Error al cerrar sesión:', error);
    return res.status(500).json({ error: 'Error al cerrar la sesión.' });
  }
});