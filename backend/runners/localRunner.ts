import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import type { PistonRunResult, RunPistonParams } from '../piston';

function createTempDir(): string {
  const dir = path.join(os.tmpdir(), `quiroz_run_${crypto.randomBytes(8).toString('hex')}`);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function runProcess(
  cmd: string,
  args: string[],
  cwd: string,
  stdinText = '',
  timeoutMs = 5000
): Promise<{ stdout: string; stderr: string; code: number; timedOut: boolean }> {
  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const child = spawn(cmd, args, { cwd, shell: false });

    const timer = setTimeout(() => {
      timedOut = true;
      try {
        child.kill('SIGKILL');
      } catch {
        // noop
      }
    }, timeoutMs);

    if (child.stdin) {
      if (stdinText) {
        child.stdin.write(stdinText);
      }
      child.stdin.end();
    }

    child.stdout?.on('data', (chunk) => {
      stdout += chunk.toString();
      if (stdout.length > 500_000) {
        child.kill('SIGKILL');
      }
    });

    child.stderr?.on('data', (chunk) => {
      stderr += chunk.toString();
      if (stderr.length > 500_000) {
        child.kill('SIGKILL');
      }
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({
        stdout,
        stderr: stderr || err.message,
        code: 1,
        timedOut: false,
      });
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({
        stdout,
        stderr,
        code: code ?? (timedOut ? 124 : 0),
        timedOut,
      });
    });
  });
}

export async function runLocalCode(params: RunPistonParams): Promise<PistonRunResult> {
  const language = params.language.toLowerCase();
  const code = params.code;
  const stdin = params.stdin || '';
  const runTimeoutMs = params.runTimeoutMs ?? 5000;
  const compileTimeoutMs = params.compileTimeoutMs ?? 10000;

  const tmpDir = createTempDir();

  try {
    if (language === 'python') {
      const filePath = path.join(tmpDir, 'main.py');
      fs.writeFileSync(filePath, code, 'utf8');
      const res = await runProcess('python3', [filePath], tmpDir, stdin, runTimeoutMs);
      return {
        stdout: res.stdout,
        stderr: res.stderr,
        code: res.code,
        signal: res.timedOut ? 'SIGKILL' : null,
        timedOut: res.timedOut,
      };
    }

    if (language === 'javascript' || language === 'nodejs') {
      const filePath = path.join(tmpDir, 'main.js');
      fs.writeFileSync(filePath, code, 'utf8');
      const res = await runProcess(process.execPath || 'node', [filePath], tmpDir, stdin, runTimeoutMs);
      return {
        stdout: res.stdout,
        stderr: res.stderr,
        code: res.code,
        signal: res.timedOut ? 'SIGKILL' : null,
        timedOut: res.timedOut,
      };
    }

    if (language === 'cpp' || language === 'cplusplus') {
      const srcPath = path.join(tmpDir, 'main.cpp');
      const binPath = path.join(tmpDir, 'main.out');
      fs.writeFileSync(srcPath, code, 'utf8');

      const compileRes = await runProcess(
        'g++',
        ['-O2', '-std=c++17', srcPath, '-o', binPath],
        tmpDir,
        '',
        compileTimeoutMs
      );

      if (compileRes.code !== 0 || compileRes.timedOut) {
        return {
          stdout: '',
          stderr: compileRes.stderr || (compileRes.timedOut ? 'Tiempo de compilación C++ excedido.' : 'Error de compilación C++'),
          code: compileRes.code || 1,
          signal: compileRes.timedOut ? 'SIGKILL' : null,
          timedOut: compileRes.timedOut,
        };
      }

      const runRes = await runProcess(binPath, [], tmpDir, stdin, runTimeoutMs);
      return {
        stdout: runRes.stdout,
        stderr: runRes.stderr,
        code: runRes.code,
        signal: runRes.timedOut ? 'SIGKILL' : null,
        timedOut: runRes.timedOut,
      };
    }

    if (language === 'java') {
      const srcPath = path.join(tmpDir, 'Main.java');
      fs.writeFileSync(srcPath, code, 'utf8');

      const compileRes = await runProcess('javac', ['Main.java'], tmpDir, '', compileTimeoutMs);

      if (compileRes.code !== 0 || compileRes.timedOut) {
        return {
          stdout: '',
          stderr: compileRes.stderr || (compileRes.timedOut ? 'Tiempo de compilación Java excedido.' : 'Error de compilación Java'),
          code: compileRes.code || 1,
          signal: compileRes.timedOut ? 'SIGKILL' : null,
          timedOut: compileRes.timedOut,
        };
      }

      const runRes = await runProcess('java', ['-cp', tmpDir, 'Main'], tmpDir, stdin, runTimeoutMs);
      return {
        stdout: runRes.stdout,
        stderr: runRes.stderr,
        code: runRes.code,
        signal: runRes.timedOut ? 'SIGKILL' : null,
        timedOut: runRes.timedOut,
      };
    }

    if (language === 'rust') {
      const srcPath = path.join(tmpDir, 'main.rs');
      const binPath = path.join(tmpDir, 'main.out');
      fs.writeFileSync(srcPath, code, 'utf8');

      const compileRes = await runProcess('rustc', ['-O', srcPath, '-o', binPath], tmpDir, '', compileTimeoutMs);

      if (compileRes.code !== 0 || compileRes.timedOut) {
        return {
          stdout: '',
          stderr: compileRes.stderr || (compileRes.timedOut ? 'Tiempo de compilación Rust excedido.' : 'Error de compilación Rust'),
          code: compileRes.code || 1,
          signal: compileRes.timedOut ? 'SIGKILL' : null,
          timedOut: compileRes.timedOut,
        };
      }

      const runRes = await runProcess(binPath, [], tmpDir, stdin, runTimeoutMs);
      return {
        stdout: runRes.stdout,
        stderr: runRes.stderr,
        code: runRes.code,
        signal: runRes.timedOut ? 'SIGKILL' : null,
        timedOut: runRes.timedOut,
      };
    }

    throw new Error(`Lenguaje no soportado para ejecución local: ${language}`);
  } finally {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // noop
    }
  }
}
