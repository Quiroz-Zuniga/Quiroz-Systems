// Cliente del sandbox aislado Piston (contenedor) — Fase A2.
// El servidor Express YA NO ejecuta código con child_process.exec: todas las
// ejecuciones se delegan al worker aislado vía su API REST.
// Se aplican: timeout de compilación, timeout de ejecución, límite de memoria
// y una cola de concurrencia global para evitar saturación (DoS).

const PISTON_URL = (process.env.PISTON_URL || 'http://localhost:2000').replace(/\/+$/, '');

// --- Errores tipados para que las rutas respondan status correctos ----------
export class UnsupportedLanguageError extends Error {
  constructor(language: string) {
    super(`Lenguaje no soportado en el sandbox Piston: ${language}`);
  }
}

export class PistonUnavailableError extends Error {
  constructor(message: string) {
    super(`Sandbox Piston no disponible: ${message}`);
  }
}

export class QueueFullError extends Error {
  constructor() {
    super('Cola de ejecución saturada. Intenta de nuevo en unos segundos.');
  }
}

// --- Cola de concurrencia (semáforo) ---------------------------------------
// Limita cuántas ejecuciones de código corren en paralelo contra Piston.
// El resto espera en cola; si la cola crece sin control, se rechaza (429).
export class ConcurrencyLimiter {
  private active = 0;
  private readonly waiting: Array<() => void> = [];

  constructor(private readonly max: number, private readonly maxQueue: number) {}

  async run<T>(task: () => Promise<T>): Promise<T> {
    if (this.active >= this.max) {
      if (this.waiting.length >= this.maxQueue) throw new QueueFullError();
      await new Promise<void>((resolve) => this.waiting.push(resolve));
    }
    this.active++;
    try {
      return await task();
    } finally {
      this.active--;
      const next = this.waiting.shift();
      if (next) next();
    }
  }
}

export const pistonLimiter = new ConcurrencyLimiter(
  Number(process.env.PISTON_MAX_CONCURRENCY || 3),
  Number(process.env.PISTON_MAX_QUEUE || 50)
);

// --- Catálogo de lenguajes soportados --------------------------------------
interface LanguageSpec {
  runtime: string; // nombre del runtime en Piston
  file: string; // nombre del archivo fuente (Java requiere clase Main)
}

const LANGUAGE_MAP: Record<string, LanguageSpec> = {
  python: { runtime: 'python', file: 'main.py' },
  javascript: { runtime: 'javascript', file: 'main.js' },
  nodejs: { runtime: 'javascript', file: 'main.js' },
  cpp: { runtime: 'cplusplus', file: 'main.cpp' },
  java: { runtime: 'java', file: 'Main.java' },
  rust: { runtime: 'rust', file: 'main.rs' },
};

// --- Resolución de versión por defecto de cada runtime ---------------------
interface RuntimeDescriptor {
  language: string;
  version: string;
  aliases?: string[];
}

let runtimesPromise: Promise<RuntimeDescriptor[]> | null = null;

async function fetchRuntimes(): Promise<RuntimeDescriptor[]> {
  if (!runtimesPromise) {
    runtimesPromise = (async () => {
      let res: Response;
      try {
        res = await fetch(`${PISTON_URL}/api/v2/runtimes`, {
          signal: AbortSignal.timeout(5000),
        });
      } catch (err: any) {
        const reason =
          err?.name === 'TimeoutError'
            ? 'timeout de conexión'
            : err?.cause?.code || err?.message || String(err);
        throw new PistonUnavailableError(reason);
      }
      if (!res.ok) throw new PistonUnavailableError(`status ${res.status}`);
      return res.json() as Promise<RuntimeDescriptor[]>;
    })()
      .catch((err: unknown) => {
        runtimesPromise = null; // reintentar en la siguiente petición
        throw err;
      });
  }
  return runtimesPromise;
}

async function resolveVersion(runtime: string): Promise<string> {
  const runtimes = await fetchRuntimes();
  const available = runtimes.filter((r) => r.language === runtime);
  if (available.length === 0) {
    throw new UnsupportedLanguageError(runtime);
  }
  const defaultVersion = available.find((r) => Array.isArray(r.aliases) && r.aliases.includes('default'));
  return (defaultVersion || available[0]).version;
}

// --- Ejecución vía Piston ---------------------------------------------------
export interface PistonRunResult {
  stdout: string;
  stderr: string;
  code: number;
  signal: string | null;
  timedOut: boolean;
}

interface RunStage {
  stdout?: string;
  stderr?: string;
  output?: string;
  code: number;
  signal?: string | null;
}

interface PistonExecuteResponse {
  run: RunStage;
  compile?: RunStage;
  timed_out?: boolean;
}

export interface RunPistonParams {
  language: string;
  code: string;
  stdin?: string;
  compileTimeoutMs?: number;
  runTimeoutMs?: number;
  memoryLimitMb?: number;
}

export async function runPistonCode(params: RunPistonParams): Promise<PistonRunResult> {
  const spec = LANGUAGE_MAP[params.language];
  if (!spec) throw new UnsupportedLanguageError(params.language);

  const version = await resolveVersion(spec.runtime);

  const compileTimeoutMs = params.compileTimeoutMs ?? 10000;
  const runTimeoutMs = params.runTimeoutMs ?? 5000;
  // "ulimit" de memoria: Piston mata el proceso si la supera (MB). -1 = sin límite.
  const memoryLimitMb = params.memoryLimitMb ?? 256;

  let res: Response;
  try {
    res = await fetch(`${PISTON_URL}/api/v2/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(compileTimeoutMs + runTimeoutMs + 10000),
      body: JSON.stringify({
        language: spec.runtime,
        version,
        files: [{ name: spec.file, content: params.code }],
        stdin: params.stdin || '',
        args: [],
        compile_timeout: compileTimeoutMs,
        run_timeout: runTimeoutMs,
        compile_memory_limit: memoryLimitMb,
        run_memory_limit: memoryLimitMb,
      }),
    });
  } catch (err: any) {
    const reason =
      err?.name === 'TimeoutError'
        ? 'timeout de conexión'
        : err?.cause?.code || err?.message || String(err);
    throw new PistonUnavailableError(reason);
  }

  if (!res.ok) {
    let raw = '';
    try {
      raw = JSON.stringify(await res.json());
    } catch {
      raw = await res.text().catch(() => '');
    }
    // HttpError de Piston: 400 = runtime/versión desconocida, 429 = sobrecargado.
    if (res.status === 429) throw new QueueFullError();
    throw new PistonUnavailableError(`status ${res.status} ${raw.slice(0, 200)}`);
  }

  const data = (await res.json()) as PistonExecuteResponse;
  return mapPistonResponse(data, runTimeoutMs);
}

function mapPistonResponse(data: PistonExecuteResponse, runTimeoutMs: number): PistonRunResult {
  // Si falló la compilación, reportar ese error (no el run).
  if (data.compile && (data.compile.code !== 0 || data.compile.signal)) {
    return {
      stdout: data.compile.stdout ?? '',
      stderr: (data.compile.stderr ?? data.compile.output ?? '').trim() || 'Error de compilación',
      code: data.compile.code,
      signal: data.compile.signal ?? null,
      timedOut: false,
    };
  }

  const run = data.run;
  return {
    stdout: run.stdout ?? run.output ?? '',
    stderr: run.stderr ?? '',
    code: run.code ?? 0,
    signal: run.signal ?? null,
    timedOut: Boolean(data.timed_out) || run.signal === 'SIGKILL',
  };
}