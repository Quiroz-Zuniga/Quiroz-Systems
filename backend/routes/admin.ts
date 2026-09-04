import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import { requireRole } from '../middleware/auth';

export const adminRouter = Router();

adminRouter.use(requireRole('SUPER_ADMIN'));

adminRouter.get('/overview', async (req: Request, res: Response) => {
  try {
    const totalStudents = await prisma.user.count({ where: { role: 'USUARIO' } });
    const totalInstructors = await prisma.user.count({ where: { role: 'INSTITUCION' } });
    const pendingInstructors = await prisma.user.count({ where: { role: 'PENDIENTE_INSTITUCION' } });
    const totalProgresses = await prisma.courseProgress.count();
    const totalCertificates = await prisma.certificate.count();

    const avgAggregate = await prisma.courseProgress.aggregate({
      _avg: {
        finalGradePercent: true,
      },
      where: {
        finalGradePercent: { not: null },
      },
    });

    const averageGradePercent = Math.round(avgAggregate._avg.finalGradePercent ?? 0);

    return res.json({
      totalStudents,
      totalInstructors,
      pendingInstructors,
      totalProgresses,
      totalCertificates,
      averageGradePercent,
    });
  } catch (error: any) {
    console.error('Error overview admin:', error);
    return res.status(500).json({ error: 'Error overview' });
  }
});

adminRouter.get('/instructors', async (req: Request, res: Response) => {
  try {
    const instructors = await prisma.user.findMany({
      where: {
        role: { in: ['INSTITUCION', 'PENDIENTE_INSTITUCION'] },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const instructorIds = instructors.map((i) => i.id);
    const subscriptions = await prisma.subscription.findMany({
      where: { institution_id: { in: instructorIds } },
      orderBy: { createdAt: 'desc' },
    });
    const subMap = new Map<string, (typeof subscriptions)[0]>();
    for (const sub of subscriptions) {
      if (!subMap.has(sub.institution_id)) {
        subMap.set(sub.institution_id, sub);
      }
    }

    const mapped = instructors.map((i) => {
      const sub = subMap.get(i.id);
      const approvalStatus = i.role === 'INSTITUCION' || sub?.estado === 'activa' ? 'APPROVED' : 'PENDING';

      return {
        id: i.id,
        name: i.name,
        email: i.email,
        approvalStatus,
        institution: { name: i.name, status: approvalStatus },
        createdAt: i.createdAt.toISOString(),
      };
    });

    return res.json(mapped);
  } catch (error: any) {
    console.error('Error instructors admin:', error);
    return res.status(500).json({ error: 'Error instructors' });
  }
});

adminRouter.get('/institutions', async (req: Request, res: Response) => {
  try {
    const institutions = await prisma.institution.findMany({
      include: {
        students: true,
        subscriptions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const instIds = institutions.map((i) => i.id);
    const adminUsers = await prisma.user.findMany({
      where: { id: { in: instIds } },
      select: { id: true, name: true, email: true },
    });
    const userMap = new Map(adminUsers.map((u) => [u.id, u]));

    const mapped = institutions.map((inst) => {
      const adminUser = userMap.get(inst.id);
      const latestSub = inst.subscriptions[0];
      const status = latestSub?.estado === 'activa' ? 'APPROVED' : 'PENDING';

      return {
        id: inst.id,
        name: inst.nombre,
        teacherName: inst.nombre_docente_responsable || adminUser?.name || '',
        code: inst.id.substring(0, 8),
        adminEmail: adminUser?.email || '',
        status,
        plan: latestSub?.plan || 'NINGUNO',
        maxAlumnos: latestSub?.max_alumnos || 0,
        fechaExpiracion: latestSub?.fecha_expiracion ? latestSub.fecha_expiracion.toISOString() : null,
        createdAt: inst.createdAt.toISOString(),
        _count: { students: inst.students.length, instructors: 1 },
      };
    });

    return res.json({ institutions: mapped });
  } catch (error: any) {
    console.error('Error institutions admin:', error);
    return res.status(500).json({ error: 'Error institutions' });
  }
});

adminRouter.get('/students', async (req: Request, res: Response) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'USUARIO' },
      include: {
        institutions: {
          include: {
            institution: true,
          },
        },
        courseProgresses: {
          include: {
            attempts: {
              where: { passed: true },
            },
          },
        },
        certificates: true,
        recognitions: true,
      },
    });

    const mapped = students.map((s) => {
      const isInst = s.institutions.length > 0;
      const totalLessonsCompleted = s.courseProgresses.reduce(
        (acc, p) => acc + p.attempts.length,
        0
      );

      return {
        id: s.id,
        name: s.name,
        email: s.email,
        studentType: isInst ? 'INSTITUTIONAL' : 'AUTONOMOUS',
        institutionName: isInst ? s.institutions[0].institution.nombre : '',
        totalCoursesStarted: s.courseProgresses.length,
        totalCertificates: s.certificates.length + s.recognitions.length,
        totalLessonsCompleted,
        createdAt: s.createdAt.toISOString(),
      };
    });

    return res.json({ students: mapped });
  } catch (error: any) {
    console.error('Error students admin:', error);
    return res.status(500).json({ error: 'Error students' });
  }
});

// GET /api/admin/transactions — Monitoreo de pagos y transacciones institucionales
adminRouter.get('/transactions', async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        subscription: {
          include: {
            institution: true,
          },
        },
      },
      orderBy: { fecha: 'desc' },
    });

    const mapped = transactions.map((t) => ({
      id: t.id,
      subscriptionId: t.subscription_id,
      institutionName: t.subscription.institution.nombre,
      teacherName: t.subscription.institution.nombre_docente_responsable || '',
      plan: t.subscription.plan,
      monto: t.monto,
      moneda: t.moneda,
      estado: t.estado,
      referenciaPaypal: t.referencia_paypal,
      fecha: t.fecha.toISOString(),
    }));

    return res.json({ transactions: mapped });
  } catch (error: any) {
    console.error('Error al obtener transacciones:', error);
    return res.status(500).json({ error: 'Error al consultar transacciones' });
  }
});

// POST /api/admin/update-subscription — Cambiar estado de suscripción institucional
adminRouter.post('/update-subscription', async (req: Request, res: Response) => {
  try {
    const { institutionId, estado, plan, maxAlumnos } = req.body;
    if (!institutionId || !estado) {
      return res.status(400).json({ error: 'institutionId y estado son requeridos.' });
    }

    const sub = await prisma.subscription.findFirst({
      where: { institution_id: institutionId },
      orderBy: { createdAt: 'desc' },
    });

    if (sub) {
      await prisma.subscription.update({
        where: { id: sub.id },
        data: {
          estado,
          plan: plan || sub.plan,
          max_alumnos: maxAlumnos || sub.max_alumnos,
          fecha_expiracion:
            estado === 'activa'
              ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
              : sub.fecha_expiracion,
        },
      });
    } else {
      await prisma.subscription.create({
        data: {
          institution_id: institutionId,
          plan: plan || 'ESTANDAR',
          max_alumnos: maxAlumnos || 50,
          estado,
          fecha_inicio: new Date(),
          fecha_expiracion: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Sincronizar el rol del usuario docente
    const newRole = estado === 'activa' ? 'INSTITUCION' : 'PENDIENTE_INSTITUCION';
    await prisma.user.update({
      where: { id: institutionId },
      data: { role: newRole },
    });

    return res.json({ success: true, message: 'Suscripción actualizada exitosamente.' });
  } catch (error: any) {
    console.error('Error al actualizar suscripción:', error);
    return res.status(500).json({ error: 'Error al actualizar suscripción' });
  }
});
