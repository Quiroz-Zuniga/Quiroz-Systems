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

export interface TestCase {
  id: string;
  input?: string;
  output: string;
  description?: string;
}

export interface CodeExample {
  title: string;
  code: string;
  explanation?: string;
}

export interface Exercise {
  statement: string;
  initialCode: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
  schemaSql?: string; // Optional SQL schema & seed for SQL lessons
}

export interface Lesson {
  id: string; // e.g., 'cpp-01', 'sql-01'
  title: string;
  level: LessonLevel;
  objectives: string[];
  theory: string;
  examples: CodeExample[];
  exercise: Exercise;
  approvalCriteria: string;
  estimatedMinutes: number;
  maxScore: number; // 100 for regular, 500 for Capstone Project
}

export interface Course {
  id: CourseId;
  title: string; // e.g. "Quiroz Systems — C++"
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

export interface TestCaseResult {
  testCaseId: string;
  description?: string;
  input?: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
}

export interface ExecutionResult {
  passed: boolean;
  results: TestCaseResult[];
  logs: string;
  timeMs: number;
  error?: string;
}

export interface LessonAttempt {
  lessonId: string;
  attemptsCount: number;
  hintsUnlockedCount: number;
  timeSpentSeconds: number;
  scoreObtained: number; // calculated score out of maxScore
  functionalScore: number; // out of 70% max
  efficiencyScore: number; // out of 20% max
  timeScore: number; // out of 10% max
  passed: boolean;
  completedAt?: string;
  submittedCode: string;
}

export interface CourseProgress {
  courseId: CourseId;
  completedLessonIds: string[];
  attempts: Record<string, LessonAttempt>; // lessonId -> attempt details
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
