import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import crypto from 'crypto';
import { hashPassword, verifyPassword } from '../password';
import { findOrCreateInstitution } from './admin';
import { getBearerToken, findSessionUser } from '../session';

// Acceso: Rutas de autenticación desacopladas (base de datos -> backend -> frontend).
// - Registro  : POST /api/auth/register  (crea cuenta con contraseña; NO inicia sesión)
// - Inicio    : POST /api/auth/login     (valida email+contraseña y emite una sesión)
// - Sesión    : GET  /api/auth/me        (restaura la sesión activa desde el token)
// - Cierre    : POST /api/auth/logout    (invalida la sesión)
export const authRouter = Router();

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 días

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function serializeUser(user: any) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    studentType: user.studentType,
    approvalStatus: user.approvalStatus,
    institutionName: user.institution ? user.institution.name : null,
  };
}

// POST /api/auth/register — Crea la cuenta con contraseña (sin auto-login).
// Estudiante: queda APROBADO al instante. Docente: queda PENDIENTE de aprobación.
authRouter.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { role, name, email, password, institutionName } = req.body;

    if (!role || !name || !email || !password) {
      return res.status(400).json({ error: 'Debes completar nombre, correo y contraseña.' });
    }
    if (role !== 'STUDENT' && role !== 'INSTRUCTOR') {
      return res.status(400).json({ error: 'Este rol no se registra por cuenta propia en la plataforma.' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    }
    if (role === 'INSTRUCTOR' && !institutionName) {
      return res.status(400).json({ error: 'Debes indicar tu institución o cátedra.' });
    }

    const emailNormalized = String(email).trim().toLowerCase();
    const existing = await prisma.student.findUnique({ where: { email: emailNormalized } });

    // Si ya existe una cuenta del mismo rol CON contraseña -> solo puede iniciar sesión.
    if (existing && existing.role === role && existing.password) {
      return res.status(409).json({
        error: 'Este correo ya tiene una cuenta activa. Inicia sesión en lugar de volver a registrarte.',
      });
    }
    // Si el correo pertenece a otro rol (ya verificado) -> impedir duplicación de identidad.
    if (existing && existing.role !== role) {
      return res.status(409).json({
        error: `Este correo pertenece a una cuenta de ${existing.role === 'INSTRUCTOR' ? 'Docente' : 'Estudiante'}. Inicia sesión con el rol correspondiente.`,
      });
    }

    const passwordHash = await hashPassword(password);

    // Caso: cuenta previamente creada por un admin/docente (institucional o pendiente)
    // sin contraseña -> "reivindicamos" la cuenta fijándole sus credenciales.
    if (existing && existing.role === role && !existing.password) {
      const claimed = await prisma.student.update({
        where: { email: emailNormalized },
        data: { name: String(name).trim(), password: passwordHash },
        include: { institution: true },
      });
      return res.status(201).json({
        success: true,
        message:
          role === 'INSTRUCTOR'
            ? 'Tu cuenta de docente fue completada y queda pendiente de aprobación.'
            : 'Cuenta completada correctamente. Ya puedes iniciar sesión.',
        user: serializeUser(claimed),
      });
    }

    // Nuevo registro.
    let institutionId: string | null = null;
    let studentType = 'INDEPENDENT';
    let approvalStatus = 'APPROVED';

    if (role === 'INSTRUCTOR') {
      const inst = await findOrCreateInstitution(String(institutionName).trim(), emailNormalized, 'PENDING');
      institutionId = inst.id;
      studentType = 'INSTITUTIONAL';
      approvalStatus = 'PENDING';
    }

    const student = await prisma.student.create({
      data: {
        name: String(name).trim(),
        email: emailNormalized,
        password: passwordHash,
        role,
        approvalStatus,
        studentType,
        institutionId,
      },
      include: { institution: true },
    });

    return res.status(201).json({
      success: true,
      message:
        role === 'INSTRUCTOR'
          ? 'Tu solicitud de docente fue registrada. Quedará habilitada cuando Quiroz Systems la apruebe.'
          : 'Cuenta creada correctamente. Ahora puedes iniciar sesión.',
      user: serializeUser(student),
    });
  } catch (error: any) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ error: 'Error interno al registrar la cuenta.' });
  }
});

// POST /api/auth/login — Valida credenciales y emite una sesión (token).
authRouter.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
    }

    const emailNormalized = String(email).trim().toLowerCase();
    const user = await prisma.student.findUnique({
      where: { email: emailNormalized },
      include: { institution: true },
    });

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Credenciales incorrectas. Si no tienes cuenta, regístrate primero.' });
    }

    const valid = await verifyPassword(String(password), user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales incorrectas. Revisa tu correo y contraseña.' });
    }

    if (role && user.role !== role) {
      return res.status(401).json({ error: 'Las credenciales no corresponden a este rol.' });
    }

    if (user.role === 'INSTRUCTOR' && user.approvalStatus !== 'APPROVED') {
      const message =
        user.approvalStatus === 'REJECTED'
          ? 'Tu solicitud de docente fue rechazada. Contacta a Quiroz Systems.'
          : 'Tu solicitud de docente aún no ha sido aprobada por Quiroz Systems. Vuelve a intentarlo cuando sea aprobada.';
      return res.status(403).json({ error: message, approvalStatus: user.approvalStatus });
    }

    const token = generateToken();
    await prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + SESSION_TTL_MS),
      },
    });

    return res.json({ token, user: serializeUser(user) });
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error interno al iniciar sesión.' });
  }
});

// GET /api/auth/me — Restaura la sesión activa desde el token Bearer.
authRouter.get('/auth/me', async (req: Request, res: Response) => {
  try {
    const token = getBearerToken(req);
    if (!token) return res.status(401).json({ error: 'No hay sesión iniciada.' });

    const user = await findSessionUser(token);
    if (!user) return res.status(401).json({ error: 'Sesión expirada o inválida.' });

    return res.json({ user: serializeUser(user) });
  } catch (error: any) {
    console.error('Error al restaurar sesión:', error);
    return res.status(500).json({ error: 'Error al restaurar la sesión.' });
  }
});

// POST /api/auth/logout — Invalida la sesión actual.
authRouter.post('/auth/logout', async (req: Request, res: Response) => {
  try {
    const token = getBearerToken(req);
    if (token) {
      await prisma.session.deleteMany({ where: { token } });
    }
    return res.json({ success: true });
  } catch (error: any) {
    console.error('Error al cerrar sesión:', error);
    return res.status(500).json({ error: 'Error al cerrar la sesión.' });
  }
});