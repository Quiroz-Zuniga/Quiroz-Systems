import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { requireRole } from '../middleware/auth';
import crypto from 'crypto';
import { validateBody, institutionAddUserSchema, emitRecognitionSchema } from '../validation';

export const institutionsRouter = Router();

// Endpoints for INSTITUCION role to manage their users
institutionsRouter.use(requireRole('INSTITUCION'));

// Middleware to ensure subscription is active
institutionsRouter.use(async (req: Request, res: Response, next) => {
  try {
    const institutionId = req.user!.id;
    const sub = await prisma.subscription.findFirst({
      where: { institution_id: institutionId, estado: 'activa' },
    });

    if (!sub) {
      return res.status(403).json({ error: 'Suscripción no activa o expirada.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Error al verificar suscripción.' });
  }
});

// Add user to institution
institutionsRouter.post('/add-user', validateBody(institutionAddUserSchema), async (req: Request, res: Response) => {
  try {
    const institutionId = req.user!.id;
    const { email, name } = req.body;

    let userUser = await prisma.user.findUnique({ where: { email } });
    if (!userUser) {
      userUser = await prisma.user.create({
        data: {
          email,
          name,
          role: 'USUARIO',
        },
      });
    }

    // Link in N:N
    await prisma.institutionStudent.upsert({
      where: {
        institutionId_userId: {
          institutionId,
          userId: userUser.id,
        },
      },
      update: {},
      create: {
        institutionId,
        userId: userUser.id,
      },
    });

    res.json({
      success: true,
      userUser: {
        id: userUser.id,
        name: userUser.name,
        email: userUser.email,
        role: userUser.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al agregar alumno' });
  }
});

// View users and progress
institutionsRouter.get('/users', async (req: Request, res: Response) => {
  try {
    const institutionId = req.user!.id;
    const relations = await prisma.institutionStudent.findMany({
      where: { institutionId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            courseProgresses: true,
          },
        },
      },
    });

    const users = relations.map((r: any) => r.user);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al listar alumnos' });
  }
});

// Emit recognition
// [B-A-004] Validar que el alumno haya completado el curso (APPROVED o CERTIFIED)
institutionsRouter.post('/emit-recognition', validateBody(emitRecognitionSchema), async (req: Request, res: Response) => {
  try {
    const institutionId = req.user!.id;
    const { userId, courseId } = req.body;

    // Check if course is completed
    const progress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId,
        },
      },
    });

    if (!progress || (progress.status !== 'APPROVED' && progress.status !== 'CERTIFIED')) {
      return res.status(400).json({ error: 'El alumno no ha completado este curso' });
    }

    const recognitionCode = crypto.randomBytes(6).toString('hex');

    const recognition = await prisma.recognition.create({
      data: {
        recognitionCode,
        usuario_id: userId,
        curso_id: courseId,
        institucion_id: institutionId,
        logo_institucion: null,
        nombre_docente: req.user!.name,
      },
    });

    return res.json({ success: true, recognition });
  } catch (error: any) {
    console.error('Error al emitir reconocimiento:', error);
    return res.status(500).json({ error: 'Error al emitir reconocimiento' });
  }
});
