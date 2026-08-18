// ============================================================================
// CONTRATO COMPARTIDO FE ⇄ BE (Single Source of Truth — Fase B3)
// ----------------------------------------------------------------------------
// Único lugar donde viven los tipos del dominio de la plataforma y los DTOs de
// la API. Tanto `src/` (frontend) como `backend/` importan desde aquí, y ambos
// se compilan contra el mismo `tsconfig.json` (`npm run lint` → tsc --noEmit).
// No duplicar interfaces en `src/types.ts`, `backend/runners/*`, ni `domain/*`.
// ============================================================================

// --- Catálogo de cursos -----------------------------------------------------

export type CourseId =
  | 'cpp'
  | 'python'
  | 'javascript'
  | 'java'
  | 'nodejs'
  | 'rust'
  | 'sql'
  | 'htmlcss';

export type LessonLevel = 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';

export interface CodeExample {
  title: string;
  code: string;
  explanation?: string;
}

export interface TestCase {
  id: string;
  input?: string | null;
  output: string;
  description?: string | null;
}

export interface Exercise {
  statement: string;
  initialCode: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
  schemaSql?: string;
}

export interface Lesson {
  id: string;
  title: string;
  level: LessonLevel;
  objectives: string[];
  theory: string;
  examples: CodeExample[];
  exercise: Exercise;
  approvalCriteria: string;
  estimatedMinutes: number;
  maxScore: number;
}

export interface Course {
  id: CourseId;
  title: string;
  languageName: string;
  monacoLanguage: string;
  description: string;
  levelRange: string;
  estimatedHours: number;
  iconName: string;
  iconifyId?: string;
  color: string;
  lessons: Lesson[];
}

// --- Evaluación (contrato de runners y rúbrica) -----------------------------

export interface TestCaseResult {
  testCaseId: string;
  description?: string | null;
  input?: string | null;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
}

export interface ExecutionOutcome {
  passed: boolean;
  results: TestCaseResult[];
  logs: string;
  timeMs: number;
}

export interface ExecutionResult extends ExecutionOutcome {
  error?: string;
}

export interface LessonAttempt {
  lessonId: string;
  attemptsCount: number;
  hintsUnlockedCount: number;
  timeSpentSeconds: number;
  scoreObtained: number;
  functionalScore: number;
  efficiencyScore: number;
  timeScore: number;
  passed: boolean;
  completedAt?: string;
  submittedCode: string;
}

// --- Progreso, certificados y perfil ----------------------------------------

export interface CourseProgress {
  courseId: CourseId;
  completedLessonIds: string[];
  attempts: Record<string, LessonAttempt>;
  startDate: string;
  completionDate?: string;
  finalGradePercent?: number;
  certificateUuid?: string;
}

export interface Certificate {
  uuid: string;
  studentName: string;
  courseId: CourseId;
  courseTitle: string;
  finalGradePercent: number;
  studyHours: number;
  issueDate: string;
}

export interface StudentProfile {
  name: string;
  email: string;
}

// --- Autenticación ----------------------------------------------------------

export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'SUPER_ADMIN' | 'TEACHER';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  studentType: string;
}

export interface RegisterRequest {
  role: 'STUDENT' | 'INSTRUCTOR';
  name: string;
  email: string;
  password: string;
  institutionName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  role?: 'STUDENT' | 'INSTRUCTOR';
}

// --- Docentes / Instituciones (suscripción mensual) -------------------------

export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  institutionName: string;
  subscriptionActive: boolean;
  subscriptionExpiresAt?: string;
  subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
}

export interface TeacherRegisterRequest {
  name: string;
  email: string;
  password: string;
  institutionName: string;
}

export interface TeacherLoginRequest {
  email: string;
  password: string;
}

// --- Reconocimiento del docente (documento distinto al certificado) ---------

export interface Recognition {
  id: string;
  recognitionCode: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  teacherName: string;
  institutionName: string;
  title: string;
  message?: string;
  issuedAt: string;
}

export interface MonetizationConfig {
  kofiUrl?: string;
  paypalUrl?: string;
  subscriptionPriceDisplay: string;
}

// --- Alumno vinculado a un docente (con progreso por curso) ----------------

export interface TeacherStudentRecord {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  courses: Array<{
    courseId: string;
    courseTitle: string;
    lessonCount: number;
    passedLessons: number;
    completionPercent: number;
    finalGradePercent?: number;
    timeSpentSeconds: number;
    completed: boolean;
  }>;
}

// --- DTOs de API (assessment y execute) -------------------------------------

export interface AssessmentRequest {
  courseId: string;
  lessonId: string;
  language: string;
  code: string;
  // SDD — Ya no son fuente de verdad: el backend carga testCases (y schemaSql
  // para SQL) desde specs/lessons. Se conservan opcionales solo para no romper
  // clientes antiguos; el evaluador los ignora.
  schemaSql?: string;
  testCases?: TestCase[];
  attemptsCount?: number;
  hintsUnlockedCount?: number;
  timeSpentSeconds?: number;
}

export interface AssessmentResponse extends ExecutionOutcome {
  grade: LessonAttempt;
  finalGradePercent: number;
}

export interface ExecuteRequest {
  language: string;
  code: string;
  testCases?: TestCase[];
}