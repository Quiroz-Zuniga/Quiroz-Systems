import initSqlJs, { Database } from 'sql.js';
import { TestCaseResult, TestCase } from '../types';

let sqlPromise: Promise<any> | null = null;

function getSqlJs() {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    });
  }
  return sqlPromise;
}

export async function executeSqlExercise(
  userQuery: string,
  schemaSql: string | undefined,
  testCases: TestCase[]
): Promise<{ passed: boolean; results: TestCaseResult[]; timeMs: number; logs: string }> {
  const startTime = Date.now();
  const SQL = await getSqlJs();
  const db: Database = new SQL.Database();

  let logs = '';

  try {
    // 1. Run schema & seed SQL if present
    if (schemaSql) {
      db.run(schemaSql);
    }

    // 2. Execute user query
    const userResults = db.exec(userQuery);

    // Format query results as plain text rows separated by pipe '|' and newlines
    let actualOutput = '';
    if (userResults.length > 0 && userResults[0].values) {
      actualOutput = userResults[0].values
        .map((row) => row.map((val) => (val === null ? 'null' : String(val))).join('|'))
        .join('\n');
      if (actualOutput) actualOutput += '\n';
    }

    logs = `Filas retornadas: ${userResults[0]?.values?.length || 0}`;

    const results: TestCaseResult[] = testCases.map((tc) => {
      const expectedTrimmed = tc.output.trim();
      const actualTrimmed = actualOutput.trim();

      // For DDL or statements that output "OK"
      let isPassed = false;
      if (expectedTrimmed === 'OK') {
        isPassed = true; // Query executed without throwing error
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
