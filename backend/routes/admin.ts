import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { requireRole } from '../middleware/auth';

export const adminRouter = Router();

adminRouter.use(requireRole('SUPER_ADMIN'));

adminRouter.get('/admin/overview', async (req: Request, res: Response) => {
  try {
    const totalStudents = await prisma.user.count({ where: { role: 'USUARIO' } });
    const totalInstructors = await prisma.user.count({ where: { role: 'INSTITUCION' } });
    const pendingInstructors = 0; // Legacy
    const totalProgresses = await prisma.courseProgress.count();
    const totalCertificates = await prisma.recognition.count();

    return res.json({
      totalStudents,
      totalInstructors,
      pendingInstructors,
      totalProgresses,
      totalCertificates,
      averageGradePercent: 100,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Error overview' });
  }
});

adminRouter.get('/admin/instructors', async (req: Request, res: Response) => {
  try {
    const instructors = await prisma.user.findMany({
      where: { role: 'INSTITUCION' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });

    const mapped = instructors.map(i => ({
      id: i.id,
      name: i.name,
      email: i.email,
      approvalStatus: 'APPROVED',
      institution: { name: i.name, status: 'APPROVED' },
      createdAt: i.createdAt.toISOString(),
    }));

    return res.json(mapped);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Error instructors' });
  }
});

adminRouter.get('/admin/institutions', async (req: Request, res: Response) => {
  try {
    const institutions = await prisma.user.findMany({
      where: { role: 'INSTITUCION' },
      include: {
        institutionStudents: true,
      }
    });

    const mapped = institutions.map(i => ({
      id: i.id,
      name: i.name,
      code: 'N/A',
      adminEmail: i.email,
      status: 'APPROVED',
      createdAt: i.createdAt.toISOString(),
      _count: { students: i.institutionStudents.length, instructors: 1 }
    }));

    return res.json({ institutions: mapped });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Error institutions' });
  }
});

adminRouter.get('/admin/students', async (req: Request, res: Response) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'USUARIO' },
      include: {
        institutionStudents: {
          include: {
            institution: true
          }
        },
        courseProgresses: true,
        recognitions: true,
      }
    });

    const mapped = students.map(s => {
      const isInst = s.institutionStudents.length > 0;
      return {
        id: s.id,
        name: s.name,
        email: s.email,
        studentType: isInst ? 'INSTITUTIONAL' : 'AUTONOMOUS',
        institutionName: isInst ? s.institutionStudents[0].institution.name : '',
        totalCoursesStarted: s.courseProgresses.length,
        totalCertificates: s.recognitions.length,
        totalLessonsCompleted: 0,
        createdAt: s.createdAt.toISOString(),
      };
    });

    return res.json({ students: mapped });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Error students' });
  }
});
