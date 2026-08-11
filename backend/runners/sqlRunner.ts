import initSqlJs from 'sql.js';
import path from 'path';
import { TestCase, TestCaseResult } from './programmingRunner';

// Resuelve la ruta local de sql-wasm dentro de node_modules para no depender de CDN.
let sqlPromise: Promise<any> | null = null;

function getSqlJs() {
  if (!sqlPromise) {
    const wasmDir = path.join(process.cwd(), 'node_modules', 'sql.js', 'dist');
    sqlPromise = initSqlJs({
      locateFile: (file: string) => path.join(wasmDir, file),
    });
  }
  return sqlPromise;
}

export async function runSqlExercise(
  userQuery: string,
  schemaSql: string | undefined,
  testCases: TestCase[]
): Promise<{ passed: boolean; results: TestCaseResult[]; timeMs: number; logs: string }> {
  const startTime = Date.now();
  const SQL = await getSqlJs();
  const db = new SQL.Database();
  let logs = '';

  try {
    if (schemaSql) {
      db.run(schemaSql);
    }
    const userResults = db.exec(userQuery);

    let actualOutput = '';
    if (userResults.length > 0 && userResults[0].values) {
      actualOutput = userResults[0].values
        .map((row: any[]) => row.map((val) => (val === null ? 'null' : String(val))).join('|'))
        .join('\n');
      if (actualOutput) actualOutput += '\n';
    }

    logs = `Filas retornadas: ${userResults[0]?.values?.length || 0}`;

    const results: TestCaseResult[] = testCases.map((tc) => {
      const expectedTrimmed = tc.output.trim();
      const actualTrimmed = actualOutput.trim();

      let isPassed = false;
      if (expectedTrimmed === 'OK') {
        isPassed = true;
      } else {
        isPassed = expectedTrimmed === actualTrimmed;
      }

      return {
        testCaseId: tc.id,
        description: tc.description || 'Evaluación de consulta SQL',
        input: tc.input,
        expectedOutput: tc.output,
        actualOutput: actualOutput || '(Sin resultados)',
        passed: isPassed,
      };
    });

    const passed = results.every((r) => r.passed);
    const timeMs = Date.now() - startTime;
    db.close();
    return { passed, results, timeMs, logs };
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    const results: TestCaseResult[] = testCases.map((tc) => ({
      testCaseId: tc.id,
      description: tc.description,
      expectedOutput: tc.output,
      actualOutput: `Error SQL: ${errorMsg}`,
      passed: false,
      error: errorMsg,
    }));
    db.close();
    return {
      passed: false,
      results,
      timeMs: Date.now() - startTime,
      logs: `Error SQL: ${errorMsg}`,
    };
  }
}