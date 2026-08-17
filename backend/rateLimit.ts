import type { Request, Response, NextFunction } from 'express';

// Fase A2/A6 — Rate-limit por ventana deslizante (en memoria).
// Suficiente para un solo proceso; la clave se deriva del usuario autenticado
// (req.user.id) o de la IP cuando no hay sesión.

export interface RateLimitOptions {
  windowMs: number;
  max: number;
  key: (req: Request) => string;
  message?: string;
}

const CLEANUP_INTERVAL_MS = 60_000;

export function slidingWindowRateLimit(options: RateLimitOptions) {
  const hits = new Map<string, number[]>();
  const windowMs = options.windowMs;
  const max = options.max;
  const message = options.message || 'Demasiadas solicitudes. Intenta de nuevo más tarde.';

  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of hits) {
      const recent = timestamps.filter((t) => now - t < windowMs);
      if (recent.length === 0) hits.delete(key);
      else hits.set(key, recent);
    }
    // No mantiene vivo el proceso en tests/one-offs.
    if (typeof timer.unref === 'function') timer.unref();
  }, CLEANUP_INTERVAL_MS);

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const key = options.key(req);
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);

    if (recent.length >= max) {
      res.setHeader('Retry-After', String(Math.ceil(windowMs / 1000)));
      return res.status(429).json({ error: message });
    }

    recent.push(now);
    hits.set(key, recent);
    next();
  };
}