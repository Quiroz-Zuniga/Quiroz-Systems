import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

// Fase A6 — Validación de schema (Zod) sobre req.body.
// Un único punto de verdad para los contratos de entrada de la API. Cada ruta
// que consume datos del cliente valida aquí (procura no trust de ningún campo).

export function validateBody(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos en la solicitud.',
        issues: result.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      });
    }
    req.body = result.data;
    next();
  };
}

const email = z.string().trim().toLowerCase().email('Correo electrónico inválido.');
const password = z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.');
const courseId = z.string().min(1).max(32);

export const registerSchema = z.object({
  role: z.enum(['STUDENT', 'INSTRUCTOR']),
  name: z.string().trim().min(1).max(120),
  email,
  password,
  institutionName: z.string().trim().min(1).max(200).optional(),
});

export const loginSchema = z.object({
  email,
  password,
  role: z.enum(['STUDENT', 'INSTRUCTOR']).optional(),
});

export const executeSchema = z.object({
  language: z.string().min(1).max(32),
  code: z.string().min(1).max(50_000),
  testCases: z
    .array(
      z.object({
        id: z.string().min(1).max(64),
        input: z.string().max(10_000).optional(),
        output: z.string().max(10_000),
        description: z.string().max(300).optional(),
      })
    )
    .optional(),
});

export const assessmentSchema = z.object({
  courseId,
  lessonId: z.string().min(1).max(64),
  language: z.string().min(1).max(32),
  code: z.string().min(1).max(50_000),
  // SDD — testCases y schemaSql ya NO se aceptan del cliente: el backend los
  // carga desde specs/lessons (fuente de verdad). Se permiten en el body solo
  // por retrocompatibilidad del frontend, pero el evaluador los ignora.
  testCases: z
    .array(
      z.object({
        id: z.string().min(1).max(64),
        input: z.string().max(10_000).optional(),
        output: z.string().max(10_000),
        description: z.string().max(300).optional(),
      })
    )
    .optional(),
  schemaSql: z.string().max(100_000).optional(),
  attemptsCount: z.coerce.number().int().nonnegative().max(1000).optional(),
  hintsUnlockedCount: z.coerce.number().int().nonnegative().max(1000).optional(),
  timeSpentSeconds: z.coerce.number().int().nonnegative().max(3_600_000).optional(),
});

export const profileSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email,
});

const attemptSchema = z
  .object({
    lessonId: z.string().min(1).max(64),
    attemptsCount: z.coerce.number().int().nonnegative().max(1000).optional(),
    hintsUnlockedCount: z.coerce.number().int().nonnegative().max(1000).optional(),
    timeSpentSeconds: z.coerce.number().int().nonnegative().max(3_600_000).optional(),
    scoreObtained: z.coerce.number().finite().optional(),
    functionalScore: z.coerce.number().finite().optional(),
    efficiencyScore: z.coerce.number().finite().optional(),
    timeScore: z.coerce.number().finite().optional(),
    passed: z.boolean().optional(),
    submittedCode: z.string().max(50_000).optional(),
    completedAt: z.string().datetime({ offset: true }).or(z.string().datetime()).optional(),
  })
  .passthrough();

export const progressSchema = z.object({
  courseId,
  attempts: z.record(z.string().min(1).max(64), attemptSchema).optional(),
  completionDate: z.string().max(40).optional(),
  finalGradePercent: z.coerce.number().finite().max(100).optional(),
  certificateUuid: z.string().max(100).optional(),
});

export const certificateIssueSchema = z.object({
  courseId,
  courseTitle: z.string().trim().min(1).max(200),
  studyHours: z.coerce.number().int().positive().max(10_000).optional(),
});

export const adminApproveInstructorSchema = z.object({
  instructorId: z.string().min(1).max(120),
  status: z.enum(['APPROVED', 'REJECTED']).optional(),
});

export const adminRegisterInstructorSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email,
  institutionName: z.string().trim().min(1).max(200),
});

export const adminAddStudentSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email,
  institutionName: z.string().trim().max(200).optional(),
  courseIds: z.array(courseId).max(100).optional(),
});

export const adminCheckStudentTypeSchema = z.object({
  email,
});

export const adminApproveCertificateSchema = z.object({
  studentId: z.string().max(120).optional(),
  studentName: z.string().trim().min(1).max(200),
  studentEmail: z.string().email().optional(),
  courseId,
  courseTitle: z.string().trim().min(1).max(200),
  finalGradePercent: z.coerce.number().finite().max(100).optional(),
  studyHours: z.coerce.number().int().positive().max(10_000).optional(),
  approvedBy: z.string().max(200).optional(),
});

export const adminUpdateInstitutionSchema = z.object({
  institutionId: z.string().min(1).max(120),
  status: z.enum(['APPROVED', 'REJECTED', 'PENDING']),
});

export const adminAddInstructorSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email,
  institutionName: z.string().trim().min(1).max(200),
});

export const adminMarkPaidSchema = z.object({
  studentId: z.string().max(120).optional(),
  email: z.string().email().optional(),
  paid: z.boolean(),
}).refine((d) => d.studentId || d.email, {
  message: 'Estudiante requerido.',
  path: ['studentId'],
});

export const adminPaymentConfigSchema = z.object({
  methodName: z.string().max(200).optional(),
  provider: z.string().max(200).optional(),
  bankName: z.string().max(200).optional(),
  accountNumber: z.string().max(200).optional(),
  holderName: z.string().max(200).optional(),
  amount: z.coerce.number().finite().nonnegative().optional(),
  currency: z.string().max(10).optional(),
  isActive: z.boolean().optional(),
});