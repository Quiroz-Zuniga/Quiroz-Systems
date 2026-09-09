import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { getSessionToken, findSessionAccount } from '../session';

export const coursesRouter = Router();

// /api/courses — Devuelve el catálogo completo de cursos
coursesRouter.get('/courses', async (_req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { order: 'asc' },
    });
    return res.json(courses);
  } catch (error: any) {
    console.error('Error in /courses:', error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});
