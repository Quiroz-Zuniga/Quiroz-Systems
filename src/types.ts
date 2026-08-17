// Fase B3 — Single Source of Truth.
// Este archivo es un re-export del contrato compartido `../shared/contracts.ts`
// para mantener compatibilidad con todos los imports existentes del frontend.
// No definir tipos aquí: cualquier tipo nuevo vive en shared/contracts.ts.
export type {
  CourseId,
  LessonLevel,
  CodeExample,
  TestCase,
  Exercise,
  Lesson,
  Course,
  TestCaseResult,
  ExecutionOutcome,
  ExecutionResult,
  LessonAttempt,
  CourseProgress,
  Certificate,
  StudentProfile,
  UserRole,
  AuthUser,
  RegisterRequest,
  LoginRequest,
  AssessmentRequest,
  AssessmentResponse,
  ExecuteRequest,
} from '../shared/contracts';