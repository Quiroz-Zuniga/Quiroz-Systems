// Cliente HTTP centralizado para toda la aplicación (Fase 3: F-A-001)
// - Incluye credentials: 'include' en todas las solicitudes para el transporte de cookies HttpOnly (qs_session).
// - Intercepta globalmente errores 401/403 para desencadenar el flujo de logout o expiración de sesión.
// - Soporta AbortSignal para cancelación limpia en componentes desmontados.

type UnauthorizedListener = (status: number) => void;
const unauthorizedListeners: Set<UnauthorizedListener> = new Set();

export function onUnauthorized(listener: UnauthorizedListener): () => void {
  unauthorizedListeners.add(listener);
  return () => {
    unauthorizedListeners.delete(listener);
  };
}

function notifyUnauthorized(status: number) {
  for (const listener of unauthorizedListeners) {
    try {
      listener(status);
    } catch (e) {
      console.error('Error en listener de sesión expirada:', e);
    }
  }
}

export interface RequestOptions extends RequestInit {
  skipAuthRedirect?: boolean;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<{ data: T; response: Response }> {
  const { skipAuthRedirect = false, headers = {}, ...rest } = options;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const finalHeaders = {
    ...defaultHeaders,
    ...(headers as Record<string, string>),
  };

  const url = endpoint.startsWith('http') || endpoint.startsWith('/api')
    ? endpoint
    : `/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    credentials: 'include',
    headers: finalHeaders,
    ...rest,
  });

  if ((response.status === 401 || response.status === 403) && !skipAuthRedirect) {
    // Si la ruta no es de auth informativa (/api/auth/me o /api/auth/login), notificar expiración
    if (
      !url.includes('/api/auth/login') &&
      !url.includes('/api/auth/me') &&
      !url.includes('/api/courses') &&
      !url.includes('/api/certificates/verify')
    ) {
      notifyUnauthorized(response.status);
    }
  }

  let data: any = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      data = await response.text();
    } catch {
      data = null;
    }
  }

  return { data, response };
}

export const api = {
  get: <T = any>(url: string, options?: RequestOptions) =>
    apiClient<T>(url, { ...options, method: 'GET' }),

  post: <T = any>(url: string, body?: any, options?: RequestOptions) =>
    apiClient<T>(url, {
      ...options,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(url: string, body?: any, options?: RequestOptions) =>
    apiClient<T>(url, {
      ...options,
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(url: string, options?: RequestOptions) =>
    apiClient<T>(url, { ...options, method: 'DELETE' }),
};
