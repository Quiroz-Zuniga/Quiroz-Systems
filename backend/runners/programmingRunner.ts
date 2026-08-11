import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { promisify } from 'util';

const execPromise = promisify(exec);

export interface TestCase {
  id: string;
  input?: string | null;
  output: string;
  description?: string | null;
}

export interface TestCaseResult {
  testCaseId: string;
  description?: string | null;
  input?: string | null;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  error?: string;
}

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
      const runRes = await runLocalCode(language, code, tc.input || '');
      const stdout = runRes.stdout || '';
      const stderr = runRes.stderr || '';

      const actualOutput = stdout || stderr || '';
      const expectedTrimmed = (tc.output || '').trim();
      const actualTrimmed = stdout.trim();

      let passed = false;
      if (expectedTrimmed === '') {
        passed = runRes.code === 0;
      } else {
        passed = actualTrimmed === expectedTrimmed;
      }

      results.push({
        testCaseId: tc.id,
        description: tc.description,
        input: tc.input,
        expectedOutput: tc.output,
        actualOutput: actualOutput || '(Sin salida)',
        passed,
        error: stderr ? stderr : undefined,
      });

      if (stderr) {
        globalLogs += `\n[Stderr/Compile]: ${stderr}`;
      }
    } catch (err: any) {
      results.push({
        testCaseId: tc.id,
        description: tc.description,
        input: tc.input,
        expectedOutput: tc.output,
        actualOutput: `Error de Ejecución: ${err.message}`,
        passed: false,
        error: err.message,
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

// Ejecución local de código en un sandbox temporal (sin dependencia del cliente).
async function runLocalCode(
  language: string,
  code: string,
  input: string = ''
): Promise<{ stdout: string; stderr: string; code: number }> {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'quiroz-sandbox-'));

  try {
    let command = '';
    let filePath = '';

    if (language === 'python') {
      filePath = path.join(tmpDir, 'main.py');
      fs.writeFileSync(filePath, code, 'utf-8');
      command = `python3 "${filePath}"`;
    } else if (language === 'javascript' || language === 'nodejs') {
      filePath = path.join(tmpDir, 'main.js');
      fs.writeFileSync(filePath, code, 'utf-8');
      command = `node "${filePath}"`;
    } else if (language === 'cpp') {
      filePath = path.join(tmpDir, 'main.cpp');
      const binPath = path.join(tmpDir, 'main_bin');
      fs.writeFileSync(filePath, code, 'utf-8');
      command = `g++ "${filePath}" -o "${binPath}" && "${binPath}"`;
    } else if (language === 'java') {
      filePath = path.join(tmpDir, 'Main.java');
      fs.writeFileSync(filePath, code, 'utf-8');
      command = `javac "${filePath}" && java -cp "${tmpDir}" Main`;
    } else if (language === 'rust') {
      filePath = path.join(tmpDir, 'main.rs');
      const binPath = path.join(tmpDir, 'main_bin');
      fs.writeFileSync(filePath, code, 'utf-8');
      command = `rustc "${filePath}" -o "${binPath}" && "${binPath}"`;
    } else {
      throw new Error(`Lenguaje no soportado en sandbox local: ${language}`);
    }

    return await new Promise<{ stdout: string; stderr: string; code: number }>((resolve) => {
      const child = exec(
        command,
        {
          timeout: 5000,
          maxBuffer: 1024 * 1024 * 5,
        },
        (error, stdout, stderr) => {
          resolve({
            stdout: stdout ? stdout.toString() : '',
            stderr: stderr ? stderr.toString() : error ? error.message : '',
            code: error && error.code !== undefined ? error.code : 0,
          });
        }
      );

      if (input && child.stdin) {
        child.stdin.write(input);
        child.stdin.end();
      }
    });
  } finally {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {
      /* ignore cleanup error */
    }
  }
}