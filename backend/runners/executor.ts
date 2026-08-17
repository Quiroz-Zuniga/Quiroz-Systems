import type { TestCase, TestCaseResult, ExecutionOutcome } from '../../shared/contracts';
import { runProgrammingCode } from './programmingRunner';
import { runSqlExercise } from './sqlRunner';
import { runHtmlCssExercise } from './htmlCssRunner';

// Fase B2 — UN SOLO evaluador de specs.
// Todos los lenguajes (programación vía Piston, SQL vía sql.js del servidor y
// HTML/CSS vía inspección estructural) se ejecutan a través de este único
// despachador. Cualquier nuevo lenguaje solo requiere agregar un runner que
// cumpla el contrato `ExecutionOutcome` — sin if/else en los controladores.

export interface RunSpecsParams {
  language: string;
  code: string;
  schemaSql?: string;
  testCases: TestCase[];
}

// Re-export del contrato compartido para los consumidores del ejecutor.
export type { TestCase, TestCaseResult, ExecutionOutcome };

export async function runSpecs(params: RunSpecsParams): Promise<ExecutionOutcome> {
  const { language, code, schemaSql, testCases } = params;

  if (language === 'sql') {
    return runSqlExercise(code, schemaSql, testCases);
  }
  if (language === 'html' || language === 'css' || language === 'htmlcss') {
    return runHtmlCssExercise(code, testCases);
  }
  return runProgrammingCode(language, code, testCases);
}
