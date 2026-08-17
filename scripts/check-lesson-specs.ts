import { loadAllLessonSpecs, validateLessonSpec } from '../backend/specs/lessonSpecs';

// SDD-2 — Lint de specs: valida que cada spec de lección cumpla el contrato
// mínimo y que no existan ids duplicados. Corre en CI (specs:check).
const specs = loadAllLessonSpecs();
if (specs.length === 0) {
  console.error('[specs:check] No se encontraron specs en specs/lessons. Genera con npm run specs:generate.');
  process.exit(1);
}

let errors = 0;
const seen = new Set<string>();

for (const { filePath, lesson } of specs) {
  if (seen.has(lesson.id)) {
    console.error(`  ✗ ${filePath}: id de lección duplicado (${lesson.id})`);
    errors++;
  }
  seen.add(lesson.id);

  const specErrors = validateLessonSpec(lesson, filePath);
  for (const err of specErrors) {
    console.error(`  ✗ ${err}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`[specs:check] ${errors} error(es) en ${specs.length} specs.`);
  process.exit(1);
}
console.log(`[specs:check] OK — ${specs.length} specs de lección válidas.`);