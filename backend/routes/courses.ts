import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { getSessionToken, findSessionAccount } from '../session';

export const coursesRouter = Router();

// /api/courses
// If not logged in, return courses where es_muestra = true (limit 2 for safety)
// If logged in, return all courses.
coursesRouter.get('/courses', async (req: Request, res: Response) => {
  try {
    let loggedIn = false;
    const token = getSessionToken(req);
    if (token) {
      const account = await findSessionAccount(token);
      if (account) loggedIn = true;
    }

    if (!loggedIn) {
      const courses = await prisma.course.findMany({
        where: { es_muestra: true },
        take: 2,
      });
      return res.json(courses);
    } else {
      const courses = await prisma.course.findMany();
      return res.json(courses);
    }
  } catch (error: any) {
    console.error('Error in /courses:', error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});
