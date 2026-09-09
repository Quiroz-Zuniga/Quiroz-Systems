import {
  runPistonCode,
  pistonLimiter,
  UnsupportedLanguageError,
  PistonUnavailableError,
  QueueFullError,
} from '../piston';
import { runLocalCode } from './localRunner';
import type { TestCase, TestCaseResult } from '../../shared/contracts';

// TestCase / TestCaseResult provienen del contrato compartido (Fase B3):
// un único lugar, consumido también por el frontend.
export type { TestCase, TestCaseResult };

// Ejecuta los test cases de un lenguaje de programación contra el sandbox aislado
// (Piston). Si Piston no está disponible, realiza fallback seguro al runner local.
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
      let runRes;
      try {
        // Intenta ejecutar vía Piston sandbox si está disponible
        runRes = await pistonLimiter.run(() =>
          runPistonCode({
            language,
            code,
            stdin: tc.input || '',
            runTimeoutMs: 5000,
            compileTimeoutMs: 10000,
            memoryLimitMb: 256,
          })
        );
      } catch (pistonErr) {
        if (pistonErr instanceof PistonUnavailableError || pistonErr instanceof UnsupportedLanguageError) {
          // Fallback al ejecutor local si Piston no está disponible
          runRes = await runLocalCode({
            language,
            code,
            stdin: tc.input || '',
            runTimeoutMs: 5000,
            compileTimeoutMs: 10000,
          });
        } else {
          throw pistonErr;
        }
      }

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