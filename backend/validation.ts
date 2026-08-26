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
  role: z.enum(['USUARIO', 'INSTITUCION', 'PENDIENTE_INSTITUCION']).default('USUARIO'),
  name: z.string().trim().min(1).max(120),
  email,
  password,
  institutionName: z.string().trim().min(1).max(200).optional(),
});

export const loginSchema = z.object({
  email,
  password,
  role: z.enum(['USUARIO', 'INSTITUCION', 'PENDIENTE_INSTITUCION', 'SUPER_ADMIN']).optional(),
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

// [B-B-001] Eliminar finalGradePercent y certificateUuid del body aceptado
export const progressSchema = z.object({
  courseId,
  attempts: z.record(z.string().min(1).max(64), attemptSchema).optional(),
  completionDate: z.string().datetime({ offset: true }).or(z.string().datetime()).optional(),
});

export const certificateIssueSchema = z.object({
  courseId,
  courseTitle: z.string().trim().min(1).max(200),
  studyHours: z.coerce.number().int().positive().max(10_000).optional(),
});

// [B-A-003] Validaciones Zod añadidas
export const subscriptionCreateSchema = z.object({
  planId: z.enum(['BASICO', 'ESTANDAR', 'PREMIUM']).default('ESTANDAR'),
});

export const emitRecognitionSchema = z.object({
  userId: z.string().min(1).max(120),
  courseId,
});

export const institutionAddUserSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email,
});

export const adminMonetizationConfigSchema = z.object({
  kofiUrl: z.union([z.string().trim().url().max(300), z.literal('')]).nullable().optional(),
  paypalUrl: z.union([z.string().trim().url().max(300), z.literal('')]).nullable().optional(),
  subscriptionPriceDisplay: z.string().trim().min(1).max(100).optional(),
});