import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { requireRole } from '../middleware/auth';
import crypto from 'crypto';

export const institutionsRouter = Router();

// Endpoints for INSTITUCION role to manage their users
institutionsRouter.use(requireRole('INSTITUCION'));

// Add user to institution
institutionsRouter.post('/add-user', async (req: Request, res: Response) => {
  try {
    const institutionId = req.user!.id; // El id de usuario de la institución
    const { email, name } = req.body;

    if (!email || !name) return res.status(400).json({ error: 'Faltan datos' });

    let userUser = await prisma.user.findUnique({ where: { email } });
    if (!userUser) {
      userUser = await prisma.user.create({
        data: {
          email,
          name,
          role: 'USUARIO',
        }
      });
    }

    // Link in N:N
    await prisma.institutionStudent.upsert({
      where: {
        institutionId_userId: {
          institutionId,
          userId: userUser.id
        }
      },
      update: {},
      create: {
        institutionId,
        userId: userUser.id
      }
    });

    res.json({ success: true, userUser });
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
          include: {
            courseProgresses: true
          }
        }
      }
    });

    const users = relations.map((r: any) => r.user);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al listar alumnos' });
  }
});

// Emit recognition
institutionsRouter.post('/emit-recognition', async (req: Request, res: Response) => {
  try {
    const institutionId = req.user!.id;
    const { userId, courseId } = req.body;

    // Check if course is completed
    const progress = await prisma.courseProgress.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId
        }
      }
    });

    if (!progress || progress.status !== 'APPROVED') {
      return res.status(400).json({ error: 'El alumno no ha completado este curso' });
    }

    const recognitionCode = crypto.randomBytes(6).toString('hex');

    const recognition = await prisma.recognition.create({
      data: {
        recognitionCode,
        usuario_id: userId,
        curso_id: courseId,
        institucion_id: institutionId,
        logo_institucion: null, // Opcional
        nombre_docente: req.user!.name,
      }
    });

    res.json({ success: true, recognition });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al emitir reconocimiento' });
  }
});
