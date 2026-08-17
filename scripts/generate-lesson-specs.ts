import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { stringify } from 'yaml';
import { allCourses } from '../src/data/courses';
import { SPECS_LESSONS_DIR, validateLessonSpec } from '../backend/specs/lessonSpecs';

// SDD-2 — Genera un spec YAML versionado por lección (specs/lessons/<curso>/<lesson>.yaml).
// Uso: npm run specs:generate
// Los specs son la fuente de verdad que consumen tests e2e y el lint de CI.

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const outDir = SPECS_LESSONS_DIR;
mkdirSync(outDir, { recursive: true });

let generated = 0;
let errors = 0;

for (const course of allCourses) {
  for (const lesson of course.lessons) {
    const specErrors = validateLessonSpec(lesson, `lesson:${course.id}/${lesson.id}`);
    if (specErrors.length > 0) {
      console.error(`  ✗ ${course.id}/${lesson.id}: ${specErrors.join('; ')}`);
      errors++;
      continue;
    }
    const courseDir = path.join(outDir, course.id);
    mkdirSync(courseDir, { recursive: true });
    const filePath = path.join(courseDir, `${lesson.id}.yaml`);
    const doc = {
      // Spec versionada de lección — contrato shared/contracts.Lesson.
      id: lesson.id,
      title: lesson.title,
      level: lesson.level,
      courseId: course.id,
      language: course.languageName,
      objectives: lesson.objectives,
      exercise: {
        testCases: lesson.exercise.testCases,
        hints: lesson.exercise.hints,
        ...(lesson.exercise.schemaSql ? { schemaSql: lesson.exercise.schemaSql } : {}),
      },
      approvalCriteria: lesson.approvalCriteria,
      estimatedMinutes: lesson.estimatedMinutes,
      maxScore: lesson.maxScore,
    };
    writeFileSync(filePath, stringify(doc), 'utf8');
    generated++;
  }
}

console.log(`[specs:generate] ${generated} lecciones exportadas a ${outDir}${errors ? ` (${errors} con errores)` : ''}.`);
if (errors > 0) process.exit(1);