import {
  runPistonCode,
  pistonLimiter,
  UnsupportedLanguageError,
  PistonUnavailableError,
  QueueFullError,
} from '../piston';
import type { TestCase, TestCaseResult } from '../../shared/contracts';

// TestCase / TestCaseResult provienen del contrato compartido (Fase B3):
// un único lugar, consumido también por el frontend.
export type { TestCase, TestCaseResult };

// Ejecuta los test cases de un lenguaje de programación contra el sandbox aislado
// (Piston). Los errores de infraestructura (sandbox caído, cola llena, lenguaje no
// soportado) se propagan para que la ruta responda el status HTTP correcto; solo
// los errores del código del alumno se convierten en un test case fallido.
export async function runProgrammingCode(
  language: string,
  code: string,
  testCases: TestCase[]
): Promise<{ passed: boolean; results: TestCaseResult[]; logs: string; timeMs: number }> {
  const startTime = Date.now();
  const results: TestCaseResult[] = [];
  let globalLogs = '';

  for (const tc of testCases) {
    try {
      // La concurrencia se limita aquí (aplica a execute y assessments).
      const runRes = await pistonLimiter.run(() =>
        runPistonCode({
          language,
          code,
          stdin: tc.input || '',
          runTimeoutMs: 5000,
          compileTimeoutMs: 10000,
          memoryLimitMb: 256,
        })
      );

      const stdout = runRes.stdout || '';
      const stderr = runRes.stderr || '';

      const actualOutput = stdout || stderr || '';
      const expectedTrimmed = (tc.output || '').trim();
      const actualTrimmed = stdout.trim();

      let passed = false;
      if (runRes.timedOut) {
        passed = false;
      } else if (expectedTrimmed === '') {
        passed = runRes.code === 0;
      } else {
        passed = actualTrimmed === expectedTrimmed;
      }

      results.push({
        testCaseId: tc.id,
        description: tc.description,
        input: tc.input,
        expectedOutput: tc.output,
        actualOutput: runRes.timedOut
          ? '(Tiempo límite excedido)'
          : actualOutput || '(Sin salida)',
        passed,
        error: stderr
          ? stderr
          : runRes.timedOut
            ? 'Tiempo límite excedido (5s).'
            : undefined,
      });

      if (stderr) {
        globalLogs += `\n[Stderr/Compile]: ${stderr}`;
      }
    } catch (err) {
      if (
        err instanceof QueueFullError ||
        err instanceof PistonUnavailableError ||
        err instanceof UnsupportedLanguageError
      ) {
        throw err;
      }
      const errorMsg = err instanceof Error ? err.message : String(err);
      results.push({
        testCaseId: tc.id,
        description: tc.description,
        input: tc.input,
        expectedOutput: tc.output,
        actualOutput: `Error de Ejecución: ${errorMsg}`,
        passed: false,
        error: errorMsg,
      });
    }
  }

  const passedAll = results.every((r) => r.passed);
  return {
    passed: passedAll,
    results,
    logs:
      globalLogs ||
      (passedAll ? 'Ejecución completada con éxito.' : 'Se encontraron fallos en los casos de prueba.'),
    timeMs: Date.now() - startTime,
  };
}