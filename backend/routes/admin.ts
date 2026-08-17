import { Router, Request, Response } from 'express';
import { prisma } from '../db';
import crypto from 'crypto';
import { requireRole } from '../middleware/auth';
import { getPagination } from '../pagination';
import {
  validateBody,
  adminApproveInstructorSchema,
  adminRegisterInstructorSchema,
  adminAddStudentSchema,
  adminCheckStudentTypeSchema,
  adminApproveCertificateSchema,
  adminUpdateInstitutionSchema,
  adminAddInstructorSchema,
  adminMarkPaidSchema,
  adminPaymentConfigSchema,
} from '../validation';

export const adminRouter = Router();

// A5 — El panel de administración exige rol de poder (SUPER_ADMIN/INSTRUCTOR).
// Ningún estudiante puede auto-atribuirse permisos ni consumir endpoints de
// administración. `/student-assigned-courses` se exime por ser auto-servicio
// del propio estudiante (y valida propiedad por separado).
adminRouter.use((req, res, next) => {
  if (req.path === '/student-assigned-courses') return next();
  const role = req.user?.role;
  if (role !== 'SUPER_ADMIN' && role !== 'INSTRUCTOR') {
    return res.status(403).json({ error: 'Acceso restringido al panel administrativo.' });
  }
  return next();
});

// Normalize an institution name to a stable key so the same school isn't duplicated
// with slightly different spellings/capitalization/accents ("Hondura" vs "Honduras" -> "honduras", "politécnica" == "politecnica").
function normalizeInstitutionKey(name: string): string {
  const normalized = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return normalized || 'instituto';
}

export async function findOrCreateInstitution(name: string, adminEmail: string, initStatus = 'APPROVED') {
  const key = normalizeInstitutionKey(name);

  // Exact trimmed-name match
  const byName = await prisma.institution.findFirst({ where: { name: { equals: name.trim() } } });
  if (byName) return byName;

  // Code match on the canonical key
  const byKey = await prisma.institution.findFirst({ where: { code: `INST-${key}` } });
  if (byKey) return byKey;

  // Normalization match (accent-insensitive) so the same school spelled differently
  // ("Politécnica" vs "Politecnica", "Hondura" vs "Honduras") is NOT duplicated.
  const all = await prisma.institution.findMany({ select: { id: true, code: true } });
  const legacy = all.find((i) => {
    // Recompute the stored code's key if it is not already normalized
    const storedKey = i.code.replace(/^INST-/, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return storedKey === key;
  });
  if (legacy) return legacy;

  const code = `INST-${key.toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
  return prisma.institution.create({
    data: { name: name.trim(), code, adminEmail: adminEmail || 'admin@quirozsystems.com', status: initStatus },
  });
}

// GET /api/admin/overview — Global KPI analytics (solo SuperAdmin)
adminRouter.get('/overview', requireRole('SUPER_ADMIN'), async (_req: Request, res: Response) => {
  try {
    const totalStudents = await prisma.student.count({ where: { role: 'STUDENT' } });
    const totalInstructors = await prisma.student.count({ where: { role: 'INSTRUCTOR' } });
    const pendingInstructors = await prisma.student.count({
      where: { role: 'INSTRUCTOR', approvalStatus: 'PENDING' },
    });
    const totalProgresses = await prisma.courseProgress.count();
    const totalCertificates = await prisma.certificate.count();

    const certs = await prisma.certificate.findMany({ select: { finalGradePercent: true } });
    const avgGrade =
      certs.length > 0
        ? (certs.reduce((acc, curr) => acc + curr.finalGradePercent, 0) / certs.length).toFixed(1)
        : '0.0';

    res.json({
      totalStudents,
      totalInstructors,
      pendingInstructors,
      totalProgresses,
      totalCertificates,
      averageGradePercent: parseFloat(avgGrade),
    });
  } catch (error: any) {
    console.error('Error fetching admin overview:', error);
    res.status(500).json({ error: 'Error al consultar métricas del sistema.' });
  }
});

// GET /api/admin/instructors — List instructors for SuperAdmin approval
adminRouter.get('/instructors', requireRole('SUPER_ADMIN'), async (_req: Request, res: Response) => {
  try {
    const instructors = await prisma.student.findMany({
      where: { role: 'INSTRUCTOR' },
      include: {
        institution: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(instructors);
  } catch (error: any) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ error: 'Error al consultar docentes.' });
  }
});

// POST /api/admin/approve-instructor — SuperAdmin approves or rejects instructor/institution
adminRouter.post('/approve-instructor', requireRole('SUPER_ADMIN'), validateBody(adminApproveInstructorSchema), async (req: Request, res: Response) => {
  try {
    const { instructorId, status = 'APPROVED' } = req.body;
    if (!instructorId) return res.status(400).json({ error: 'ID de docente requerido.' });

    const updated = await prisma.student.update({
      where: { id: instructorId },
      data: { approvalStatus: status },
      include: { institution: true },
    });

    if (updated.institutionId) {
      await prisma.institution.update({
        where: { id: updated.institutionId },
        data: { status },
      });
    }

    res.json({
      success: true,
      message: `Docente ${updated.name} ${status === 'APPROVED' ? 'aprobado y habilitado' : 'rechazado'}.`,
      instructor: updated,
    });
  } catch (error: any) {
    console.error('Error approving instructor:', error);
    res.status(500).json({ error: 'Error al actualizar estado del docente.' });
  }
});

// POST /api/admin/register-instructor — Instructor registers for SuperAdmin approval
adminRouter.post('/register-instructor', validateBody(adminRegisterInstructorSchema), async (req: Request, res: Response) => {
  try {
    const { name, email, institutionName } = req.body;
    if (!name || !email || !institutionName) {
      return res.status(400).json({ error: 'Nombre, correo e institución son obligatorios.' });
    }

    // A verified (APPROVED) account cannot be duplicated. Only login with the existing account.
    const existing = await prisma.student.findUnique({ where: { email } });
    if (existing && existing.approvalStatus === 'APPROVED') {
      return res.status(409).json({
        error: 'Este correo ya está registrado como una cuenta verificada. No se puede crear otra cuenta; inicia sesión con la cuenta existente.',
        registered: true,
        role: existing.role,
      });
    }

    const inst = await findOrCreateInstitution(institutionName, email, 'PENDING');

    const instructor = await prisma.student.upsert({
      where: { email },
      update: {
        name,
        role: 'INSTRUCTOR',
        institutionId: inst.id,
      },
      create: {
        name,
        email,
        role: 'INSTRUCTOR',
        approvalStatus: 'PENDING',
        studentType: 'INSTITUTIONAL',
        institutionId: inst.id,
      },
    });

    res.json({
      success: true,
      message: 'Solicitud de registro de docente enviada. Pendiente de aprobación por Quiroz Systems SuperAdmin.',
      instructor,
    });
  } catch (error: any) {
    console.error('Error registering instructor:', error);
    res.status(500).json({ error: 'Error al registrar solicitud de docente.' });
  }
});

// GET /api/admin/students — List students (paginado con proyección).
// A5: SUPER_ADMIN ve global; INSTRUCTOR SOLO los de su propia institución
// (resuelta desde la sesión, nunca desde parámetros enviados por el cliente).
// Fase C2: take/skip desde query (?page&pageSize) y agregados con .aggregate
// en lugar de reducir en memoria.
adminRouter.get('/students', async (req: Request, res: Response) => {
  try {
    let whereClause: any = { role: 'STUDENT' };

    if (req.user!.role === 'INSTRUCTOR') {
      const instructor = await prisma.student.findUnique({
        where: { id: req.user!.id },
        select: { institutionId: true },
      });
      if (instructor && instructor.institutionId) {
        whereClause.institutionId = instructor.institutionId;
      } else {
        // Instructor sin institución: no debe ver estudiantes de otros.
        whereClause.id = '__NONE__';
      }
    }

    const { take, skip } = getPagination(req);

    const [students, totalStudents] = await Promise.all([
      prisma.student.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          studentType: true,
          createdAt: true,
          institution: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      prisma.student.count({ where: whereClause }),
    ]);

    // Agregados por estudiante en SQL (evita cargar todos los progresos).
    const aggResults = await prisma.student.findMany({
      where: { id: { in: students.map((s) => s.id) } },
      select: {
        id: true,
        _count: {
          select: { courseProgresses: true, certificates: true },
        },
        courseProgresses: {
          select: {
            courseId: true,
            status: true,
            completionDate: true,
            finalGradePercent: true,
            certificateUuid: true,
            attempts: { select: { passed: true } },
          },
        },
      },
    });
    const aggMap = new Map(aggResults.map((a) => [a.id, a]));

    const formatted = students.map((s) => {
      const agg = aggMap.get(s.id);
      const progresses = (agg?.courseProgresses ?? []).map((p) => ({
        courseId: p.courseId,
        status: p.status,
        completionDate: p.completionDate,
        finalGradePercent: p.finalGradePercent,
        certificateUuid: p.certificateUuid,
        passedLessonsCount: p.attempts.filter((a) => a.passed).length,
      }));

      return {
        id: s.id,
        name: s.name,
        email: s.email,
        role: s.role,
        studentType: s.studentType,
        institutionName: s.institution ? s.institution.name : 'Independiente / Autónomo',
        createdAt: s.createdAt,
        totalCoursesStarted: agg?._count.courseProgresses ?? 0,
        totalCertificates: agg?._count.certificates ?? 0,
        totalLessonsCompleted: progresses.reduce((acc, p) => acc + p.passedLessonsCount, 0),
        progresses,
      };
    });

    res.json({ students: formatted, total: totalStudents, page: skip / take + 1, pageSize: take });
  } catch (error: any) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Error al consultar lista de estudiantes.' });
  }
});

// POST /api/admin/add-student — Add student under Docente / Institución
// A5: si el solicitante es INSTRUCTOR, el alumno se matricula SIEMPRE bajo la
// institución del docente (resuelta por sesión), sin confiar en el body.
adminRouter.post('/add-student', validateBody(adminAddStudentSchema), async (req: Request, res: Response) => {
  try {
    const { name, email, institutionName = 'Instituto Quiroz Systems', courseIds = [] } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Nombre y correo electrónico del alumno son obligatorios.' });
    }

    // Cannot enroll a student whose email already belongs to a verified account of another role
    const existing = await prisma.student.findUnique({ where: { email } });
    if (existing && existing.role === 'INSTRUCTOR' && existing.approvalStatus === 'APPROVED') {
      return res.status(409).json({
        error: `${email} ya está verificada como cuenta de Docente. No se puede matricular como alumno con el mismo correo.`,
      });
    }

    let inst: any = null;

    // Si el solicitante es un Docente, el alumno se matricula bajo LA MISMA
    // institución del docente (sesión), para que siempre aparezca en su lista.
    if (req.user!.role === 'INSTRUCTOR') {
      const instructor = await prisma.student.findUnique({
        where: { id: req.user!.id },
        select: { institutionId: true },
      });
      if (instructor && instructor.institutionId) {
        inst = await prisma.institution.findUnique({ where: { id: instructor.institutionId } });
      }
    }

    if (!inst) {
      inst = await findOrCreateInstitution(institutionName, email, 'APPROVED');
    }

    const student = await prisma.student.upsert({
      where: { email },
      update: {
        name,
        studentType: 'INSTITUTIONAL',
        institutionId: inst.id,
      },
      create: {
        name,
        email,
        role: 'STUDENT',
        studentType: 'INSTITUTIONAL',
        institutionId: inst.id,
      },
    });

    if (Array.isArray(courseIds)) {
      for (const courseId of courseIds) {
        await prisma.courseProgress.upsert({
          where: {
            studentId_courseId: {
              studentId: student.id,
              courseId,
            },
          },
          update: { status: 'IN_PROGRESS' },
          create: {
            studentId: student.id,
            courseId,
            status: 'IN_PROGRESS',
          },
        });
      }
    }

    res.json({
      success: true,
      message: `Alumno ${name} matriculado exitosamente en ${institutionName}.`,
      student,
    });
  } catch (error: any) {
    console.error('Error adding student under institution:', error);
    res.status(500).json({ error: 'Error al matricular alumno en la institución.' });
  }
});

// POST /api/admin/check-student-type — Check if email belongs to Institution or Independent
adminRouter.post('/check-student-type', validateBody(adminCheckStudentTypeSchema), async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Correo electrónico requerido.' });

    const student = await prisma.student.findUnique({
      where: { email },
      include: { institution: true },
    });

    if (student) {
      return res.json({
        registered: true,
        role: student.role,
        approvalStatus: student.approvalStatus,
        studentType: student.studentType,
        institutionName: student.institution ? student.institution.name : null,
      });
    }

    res.json({
      registered: false,
      role: 'STUDENT',
      approvalStatus: 'APPROVED',
      studentType: 'INDEPENDENT',
      institutionName: null,
    });
  } catch (error: any) {
    console.error('Error checking student type:', error);
    res.status(500).json({ error: 'Error al verificar tipo de alumno.' });
  }
});

// POST /api/admin/approve-certificate — Approve course progress & issue certificate
adminRouter.post('/approve-certificate', validateBody(adminApproveCertificateSchema), async (req: Request, res: Response) => {
  try {
    const {
      studentId,
      studentName,
      studentEmail,
      courseId,
      courseTitle,
      finalGradePercent,
      studyHours,
      approvedBy = 'Quiroz Systems Admin',
    } = req.body;

    if (!courseId || !courseTitle || !studentName) {
      return res.status(400).json({ error: 'Campos obligatorios requeridos para la aprobación.' });
    }

    let student = null;
    if (studentId) {
      student = await prisma.student.findUnique({ where: { id: studentId } });
    }
    if (!student && studentEmail) {
      student = await prisma.student.findUnique({ where: { email: studentEmail } });
    }

    // A5 — Jerarquía de institución: un Docente SOLO puede certificar a alumnos de
    // su propia institución, NUNCA ajenos. El SuperAdmin puede certificar a todos.
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado.' });
    }
    if (req.user!.role === 'INSTRUCTOR') {
      const instructor = await prisma.student.findUnique({
        where: { id: req.user!.id },
        select: { institutionId: true },
      });
      if (student.institutionId !== instructor?.institutionId) {
        return res.status(403).json({
          error: 'No puedes certificar a estudiantes fuera de tu institución.',
        });
      }
    }

    const uuid = `${courseId.toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const today = new Date().toLocaleDateString('es-ES');

    const cert = await prisma.certificate.create({
      data: {
        uuid,
        studentId: student ? student.id : null,
        studentName,
        courseId,
        courseTitle,
        finalGradePercent: parseFloat(finalGradePercent || 100),
        studyHours: parseInt(studyHours || 45),
        issueDate: today,
        approvedBy,
      },
    });

    if (student) {
      await prisma.courseProgress.upsert({
        where: {
          studentId_courseId: {
            studentId: student.id,
            courseId,
          },
        },
        update: {
          status: 'CERTIFIED',
          completionDate: today,
          finalGradePercent: parseFloat(finalGradePercent || 100),
          certificateUuid: uuid,
          approvedBy,
          approvalDate: today,
        },
        create: {
          studentId: student.id,
          courseId,
          status: 'CERTIFIED',
          completionDate: today,
          finalGradePercent: parseFloat(finalGradePercent || 100),
          certificateUuid: uuid,
          approvedBy,
          approvalDate: today,
        },
      });
    }

    res.json({
      success: true,
      message: 'Certificado aprobado e inscrito en SQLite con éxito.',
      certificate: cert,
    });
  } catch (error: any) {
    console.error('Error approving certificate:', error);
    res.status(500).json({ error: 'Error al aprobar el certificado.' });
  }
});

// GET /api/admin/student-assigned-courses — Get assigned courseIds for institutional student
// A5: auto-servicio del estudiante. Un STUDENT SOLO puede consultar SU PROPIO
// email; SUPER_ADMIN/INSTRUCTOR pueden consultar a cualquier estudiante.
adminRouter.get('/student-assigned-courses', async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email requerido.' });
    }

    if (req.user!.role === 'STUDENT' && req.user!.email.toLowerCase() !== email.toLowerCase()) {
      return res.status(403).json({ error: 'No puedes consultar la asignación de otro estudiante.' });
    }

    const student = await prisma.student.findUnique({
      where: { email },
      include: {
        courseProgresses: { select: { courseId: true } },
      },
    });

    if (!student) {
      return res.json({ studentType: 'INDEPENDENT', assignedCourseIds: [], hasPaidAccess: false });
    }

    // If INSTITUTIONAL student, return only assigned courseIds
    if (student.studentType === 'INSTITUTIONAL' && student.courseProgresses.length > 0) {
      return res.json({
        studentType: 'INSTITUTIONAL',
        assignedCourseIds: student.courseProgresses.map((p) => p.courseId),
        hasPaidAccess: Boolean(student.paidAccess),
      });
    }

    res.json({
      studentType: student.studentType,
      assignedCourseIds: [],
      hasPaidAccess: Boolean(student.paidAccess),
    });
  } catch (error: any) {
    console.error('Error fetching student assigned courses:', error);
    res.status(500).json({ error: 'Error al consultar cursos asignados.' });
  }
});

// GET /api/admin/institutions — List all institutions with counts (SuperAdmin)
// Fase C2: paginado con take/skip y conteo de estudiantes con _count (en SQL).
adminRouter.get('/institutions', requireRole('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const { take, skip } = getPagination(req);

    const [institutions, total, instructorCounts] = await Promise.all([
      prisma.institution.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          adminEmail: true,
          status: true,
          createdAt: true,
          _count: { select: { students: true } },
        },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      prisma.institution.count(),
      prisma.student.groupBy({
        by: ['institutionId'],
        where: { role: 'INSTRUCTOR', institutionId: { not: null } },
        _count: { _all: true },
      }),
    ]);

    const instructorMap = new Map(
      instructorCounts
        .filter((c) => c.institutionId)
        .map((c) => [c.institutionId, c._count._all])
    );

    const formatted = institutions.map((inst) => ({
      id: inst.id,
      name: inst.name,
      code: inst.code,
      adminEmail: inst.adminEmail,
      status: inst.status,
      createdAt: inst.createdAt,
      _count: {
        students: inst._count.students,
        instructors: instructorMap.get(inst.id) ?? 0,
      },
    }));

    res.json({ institutions: formatted, total, page: skip / take + 1, pageSize: take });
  } catch (error: any) {
    console.error('Error fetching institutions:', error);
    res.status(500).json({ error: 'Error al consultar instituciones.' });
  }
});

// POST /api/admin/update-institution — Block / authenticate an institution (SuperAdmin)
adminRouter.post('/update-institution', requireRole('SUPER_ADMIN'), validateBody(adminUpdateInstitutionSchema), async (req: Request, res: Response) => {
  try {
    const { institutionId, status } = req.body;
    if (!institutionId) return res.status(400).json({ error: 'ID de institución requerido.' });

    const institution = await prisma.institution.update({
      where: { id: institutionId },
      data: { status },
    });

    if (status === 'REJECTED') {
      await prisma.student.updateMany({
        where: { institutionId, role: 'INSTRUCTOR' },
        data: { approvalStatus: 'REJECTED' },
      });
    } else if (status === 'APPROVED') {
      await prisma.student.updateMany({
        where: { institutionId, role: 'INSTRUCTOR' },
        data: { approvalStatus: 'APPROVED' },
      });
    }

    res.json({ success: true, message: 'Estado de la institución actualizado.', institution });
  } catch (error: any) {
    console.error('Error updating institution:', error);
    res.status(500).json({ error: 'Error al actualizar la institución.' });
  }
});

// POST /api/admin/add-instructor — SuperAdmin adds a teacher + institution directly (approved)
adminRouter.post('/add-instructor', requireRole('SUPER_ADMIN'), validateBody(adminAddInstructorSchema), async (req: Request, res: Response) => {
  try {
    const { name, email, institutionName } = req.body;
    if (!name || !email || !institutionName) {
      return res.status(400).json({ error: 'Nombre, correo e institución son obligatorios.' });
    }

    const instCode = `INST-${institutionName.replace(/\s+/g, '-').toUpperCase()}`;
    const inst = await prisma.institution.upsert({
      where: { code: instCode },
      update: { name: institutionName, status: 'APPROVED' },
      create: { name: institutionName, code: instCode, adminEmail: email, status: 'APPROVED' },
    });

    const instructor = await prisma.student.upsert({
      where: { email },
      update: {
        name,
        role: 'INSTRUCTOR',
        approvalStatus: 'APPROVED',
        studentType: 'INSTITUTIONAL',
        institutionId: inst.id,
      },
      create: {
        name,
        email,
        role: 'INSTRUCTOR',
        approvalStatus: 'APPROVED',
        studentType: 'INSTITUTIONAL',
        institutionId: inst.id,
      },
    });

    res.json({ success: true, message: 'Docente e institución creados y habilitados.', instructor });
  } catch (error: any) {
    console.error('Error adding instructor:', error);
    res.status(500).json({ error: 'Error al agregar docente.' });
  }
});

// GET /api/admin/payments — List independent students and their premium/paid status (SuperAdmin)
// Fase C2: paginado con take/skip y total para el cliente.
adminRouter.get('/payments', requireRole('SUPER_ADMIN'), async (req: Request, res: Response) => {
  try {
    const whereClause: any = {
      role: 'STUDENT',
      // The platform admin account never goes through the payment flow
      email: { not: 'superadmin@quirozsystems.com' },
    };
    const { take, skip } = getPagination(req);

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          email: true,
          studentType: true,
          paidAccess: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take,
        skip,
      }),
      prisma.student.count({ where: whereClause }),
    ]);

    res.json({ payments: students, total, page: skip / take + 1, pageSize: take });
  } catch (error: any) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Error al consultar pagos.' });
  }
});

// POST /api/admin/mark-paid — Set whether a student paid for full access (SuperAdmin)
adminRouter.post('/mark-paid', requireRole('SUPER_ADMIN'), validateBody(adminMarkPaidSchema), async (req: Request, res: Response) => {
  try {
    const { studentId, email, paid } = req.body;
    if (!studentId && !email) return res.status(400).json({ error: 'Estudiante requerido.' });

    const student = await prisma.student.update({
      where: studentId ? { id: studentId } : { email },
      data: { paidAccess: Boolean(paid) },
    });

    res.json({ success: true, message: `Acceso completo ${paid ? 'habilitado' : 'revocado'} para ${student.name}.` });
  } catch (error: any) {
    console.error('Error marking paid:', error);
    res.status(500).json({ error: 'Error al actualizar el estado de pago.' });
  }
});

// GET /api/admin/payment-config — Get the payment method settings (SuperAdmin)
adminRouter.get('/payment-config', requireRole('SUPER_ADMIN'), async (_req: Request, res: Response) => {
  try {
    let config = await prisma.paymentConfig.findUnique({ where: { id: 'default' } });
    if (!config) {
      config = await prisma.paymentConfig.create({ data: { id: 'default' } });
    }
    res.json(config);
  } catch (error: any) {
    console.error('Error fetching payment config:', error);
    res.status(500).json({ error: 'Error al consultar la configuración de pago.' });
  }
});

// POST /api/admin/payment-config — Update the payment method settings (SuperAdmin)
adminRouter.post('/payment-config', requireRole('SUPER_ADMIN'), validateBody(adminPaymentConfigSchema), async (req: Request, res: Response) => {
  try {
    const { methodName, provider, bankName, accountNumber, holderName, amount, currency, isActive } = req.body;
    const config = await prisma.paymentConfig.upsert({
      where: { id: 'default' },
      update: {
        methodName: methodName ?? undefined,
        provider: provider ?? undefined,
        bankName: bankName ?? undefined,
        accountNumber: accountNumber ?? undefined,
        holderName: holderName ?? undefined,
        amount: amount !== undefined ? parseFloat(amount) : undefined,
        currency: currency ?? undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
      },
      create: {
        id: 'default',
        methodName: methodName || 'Membresía Quiroz Systems',
        provider: provider || 'Transferencia Bancaria',
        bankName: bankName || 'Quiroz Bank',
        accountNumber: accountNumber || '0000-0000-0000-0000',
        holderName: holderName || 'Quiroz Systems S.A.',
        amount: amount !== undefined ? parseFloat(amount) : 0,
        currency: currency || 'USD',
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });
    res.json({ success: true, message: 'Método de pago actualizado.', config });
  } catch (error: any) {
    console.error('Error updating payment config:', error);
    res.status(500).json({ error: 'Error al actualizar la configuración de pago.' });
  }
});
