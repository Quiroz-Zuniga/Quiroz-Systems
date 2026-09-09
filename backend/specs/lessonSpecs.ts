import { readFileSync, readdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';
import type { Lesson, TestCase } from '../../shared/contracts';

// SDD-2 — Cargador de specs de lección versionadas (specs/lessons/*.yaml).
// Un archivo YAML por lección, con contrato igual a shared/contracts.Lesson,
// más `schemaSql` para lecciones SQL. Consumido por el evaluador (Zero Trust:
// el backend NUNCA usa testCases/schemaSql enviados por el cliente), por los
// tests de integración y por el lint (specs:check).

export interface LessonSpecFile {
  filePath: string;
  lesson: Lesson;
}

// Spec con los campos que el evaluador oficial necesita (fuente de verdad).
export interface LessonSpec {
  id: string;
  courseId: string;
  language: string;
  maxScore: number;
  estimatedMinutes: number;
  testCases: TestCase[];
  schemaSql?: string;
}

const HERE = typeof __dirname !== 'undefined'
  ? __dirname
  : (typeof import.meta !== 'undefined' && import.meta.url ? path.dirname(fileURLToPath(import.meta.url)) : process.cwd());

export function getSpecsLessonsDir(): string {
  const candidates = [
    path.join(process.cwd(), 'specs', 'lessons'),
    path.join(HERE, 'specs', 'lessons'),
    path.join(HERE, '..', 'specs', 'lessons'),
    path.join(HERE, '..', '..', 'specs', 'lessons'),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  return path.join(process.cwd(), 'specs', 'lessons');
}

const SPECS_LESSONS_DIR = getSpecsLessonsDir();

export function parseLessonSpec(filePath: string): Lesson {
  const raw = readFileSync(filePath, 'utf8');
  const parsed = parseYaml(raw);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error(`Spec de lección inválida (no es objeto): ${filePath}`);
  }
  return parsed as unknown as Lesson;
}

function listYamlFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listYamlFiles(full));
    } else if (entry.isFile() && /\.(yaml|yml)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out.sort();
}

export function loadAllLessonSpecs(): LessonSpecFile[] {
  return listYamlFiles(SPECS_LESSONS_DIR).map((filePath) => ({
    filePath,
    lesson: parseLessonSpec(filePath),
  }));
}

// Normaliza la spec YAML al contrato oficial del evaluador. `language` se
// deriva del curso cuando la spec no lo trae.
export function toLessonSpec(lesson: Lesson, courseId: string): LessonSpec {
  const spec = lesson as unknown as LessonSpec & { title: string };
  return {
    id: lesson.id,
    courseId,
    language: spec.language || '',
    maxScore: Number(lesson.maxScore),
    estimatedMinutes: Number(lesson.estimatedMinutes),
    testCases: lesson.exercise?.testCases ?? [],
    schemaSql: (lesson.exercise as any)?.schemaSql,
  };
}

// Fuente de verdad: resuelve una lección registrada por (courseId, lessonId).
// Devuelve null si la lección no está versionada en specs/lessons.
export function getLessonSpec(courseId: string, lessonId: string): LessonSpec | null {
  const dir = getSpecsLessonsDir();
  const courseDir = path.join(dir, courseId);
  const filePath = path.join(courseDir, `${lessonId}.yaml`);
  if (!existsSync(filePath)) {
    // Intenta buscar directamente por si el yaml está en el root de specs/lessons
    const directPath = path.join(dir, `${lessonId}.yaml`);
    if (existsSync(directPath)) {
      try {
        const lesson = parseLessonSpec(directPath);
        return toLessonSpec(lesson, courseId);
      } catch {
        return null;
      }
    }
    return null;
  }
  try {
    const lesson = parseLessonSpec(filePath);
    return toLessonSpec(lesson, courseId);
  } catch (err) {
    console.error(`[lessonSpecs] Error cargando spec ${courseId}/${lessonId}:`, err);
    return null;
  }
}

// Valida que una lección cumpla el contrato mínimo del evaluador oficial.
export function validateLessonSpec(lesson: Lesson, filePath: string): string[] {
  const errors: string[] = [];
  const testCases = lesson.exercise?.testCases ?? [];
  if (!lesson.id) errors.push(`${filePath}: falta lesson.id`);
  if (!lesson.title) errors.push(`${filePath}: falta lesson.title`);
  if (!Array.isArray(lesson.exercise?.testCases) || testCases.length === 0) {
    errors.push(`${filePath}: exercise.testCases debe tener al menos un caso`);
  }
  for (const [i, tc] of testCases.entries()) {
    if (!tc.id) errors.push(`${filePath}: testCases[${i}].id requerido`);
    if (typeof tc.output !== 'string') errors.push(`${filePath}: testCases[${i}].output requerido (string)`);
  }
  if (Number(lesson.maxScore) <= 0) errors.push(`${filePath}: maxScore debe ser > 0`);
  if (Number(lesson.estimatedMinutes) <= 0) errors.push(`${filePath}: estimatedMinutes debe ser > 0`);
  return errors;
}

export { SPECS_LESSONS_DIR };