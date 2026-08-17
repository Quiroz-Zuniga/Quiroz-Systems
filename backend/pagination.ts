import type { Request } from 'express';

// Fase C2 — Helper de paginación para listados (take/skip desde query).
// Valores acotados para evitar abuso (pageSize 1..100, page >= 1).

export interface Pagination {
  take: number;
  skip: number;
}

export function getPagination(req: Request, defaultSize = 25, maxSize = 100): Pagination {
  const parsedSize = Number(req.query.pageSize);
  const parsedPage = Number(req.query.page);

  const pageSize = Number.isInteger(parsedSize) && parsedSize > 0 ? Math.min(parsedSize, maxSize) : defaultSize;
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return { take: pageSize, skip: (page - 1) * pageSize };
}