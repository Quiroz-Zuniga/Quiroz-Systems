# Auditoría Frontend — QuirozSystems
**Fecha:** 2026-08-17  
**Auditor:** Agente IA (solo lectura — sin modificaciones)  
**Scope:** Frontend, Documentación, Calidad de Código, Bugs

---

## Resumen ejecutivo

El frontend del proyecto QuirozSystems (React 19 + Vite 6 + Tailwind 4) presenta una arquitectura funcional y una interfaz bien diseñada para el aprendizaje. Las vulnerabilidades críticas de la auditoría previa (cálculo de nota final y emisión de certificados en cliente) han sido mitigadas: ahora es el backend quien califica y emite (Zero Trust). Sin embargo, persisten riesgos de seguridad del lado del cliente (tokens en localStorage expuestos a XSS), ausencia de un Error Boundary global que convierte cualquier error de renderizado en pantalla en blanco, y falta de un interceptor HTTP centralizado que maneje la expiración de sesión. El estado de auth se gestiona en `App.tsx` de forma monolítica, lo que dificulta escalar hacia roles múltiples.

## Estadísticas

| Severidad | Count |
|-----------|-------|
| Crítica   | 0     |
| Alta      | 3     |
| Media     | 2     |
| Baja      | 3     |

---

## Hallazgos críticos

No se encontraron hallazgos de severidad crítica en la capa de renderizado o estado del frontend. Las vulnerabilidades previas de Zero Trust han sido mitigadas delegando al backend.

---

## Hallazgos altos

### [ID: F-A-001] Falta de interceptor global para 401/403 — sin cierre de sesión automático
- **Archivo:** `src/App.tsx` y componentes (ej. `CourseView.tsx`, `AdminDashboard.tsx`)
- **Descripción:** La aplicación realiza llamadas a la API usando `fetch` nativo con headers via `authHeaders()`. Si el token expira o el servidor responde 401/403, cada componente lo maneja individualmente — a menudo solo mostrando un error o banner. No existe un mecanismo global que intercepte un 401 y ejecute `handleLogout` para limpiar el estado y redirigir a login.
- **Impacto:** El usuario puede quedar atrapado en pantallas con datos rotos cuando expira su sesión. UX deficiente y posible exposición de datos obsoletos.
- **Severidad:** 🟠 Alta

### [ID: F-A-002] Token de sesión almacenado en `localStorage` — riesgo XSS
- **Archivo:** `src/lib/storage.ts`
- **Descripción:** Aunque el backend ahora usa cookies HttpOnly, el frontend sigue almacenando el `SESSION_TOKEN`, perfil de usuario y certificados en `localStorage` como respaldo/caché.
- **Impacto:** Cualquier vulnerabilidad XSS (script de tercero, extensión de navegador maliciosa) permitiría extraer tokens válidos y perfiles completos. La cookie HttpOnly no protege si el token también está en localStorage.
- **Severidad:** 🟠 Alta

### [ID: F-A-003] Ausencia de Error Boundary global
- **Archivo:** `src/App.tsx` / `src/main.tsx`
- **Descripción:** No se ha implementado ningún componente `ErrorBoundary` en el árbol de React. En React 19, errores no capturados en renderizado destruyen todo el árbol.
- **Impacto:** Cualquier excepción no controlada en la UI o fallo al procesar respuestas HTTP dejará al usuario con una pantalla completamente en blanco sin mensaje de recuperación.
- **Severidad:** 🟠 Alta

---

## Hallazgos medios

### [ID: F-M-001] Race conditions en peticiones asíncronas — sin AbortController
- **Archivo:** Componentes Dashboard (`AdminDashboard.tsx`, `InstructorDashboard.tsx`, `SuperAdminDashboard.tsx`)
- **Descripción:** Los componentes realizan fetches en `useEffect` al montar, sin incluir `AbortController` ni flags "isMounted" para ignorar respuestas si el componente se desmonta antes de completarse la red.
- **Impacto:** Navegación rápida entre secciones puede producir actualizaciones de estado en componentes ya desmontados, resultando en fugas de memoria o datos mezclados entre vistas.
- **Severidad:** 🟡 Media

### [ID: F-M-002] Manipulación de rol de UI via DevTools
- **Archivo:** `src/App.tsx` (estado `userRole`)
- **Descripción:** El rol del usuario se guarda en estado local React. Mediante React DevTools o la consola del navegador, un estudiante puede cambiar `userRole` a `'SUPER_ADMIN'` o `'INSTITUCION'`.
- **Impacto:** Aunque el backend devolverá 401/403 (no hay escalada de privilegios real), la interfaz de administración quedará visible al usuario. Expone los flujos internos a usuarios no autorizados y puede generar confusión o intentos de ingeniería social.
- **Severidad:** 🟡 Media

---

## Hallazgos bajos

### [ID: F-B-001] Uso de tipado `any` en múltiples puntos
- **Archivos:** `src/App.tsx` (L475 aprox.), `src/components/AdminDashboard.tsx` (L127, L168), otros
- **Descripción:** Se observan varios cast a `any` y tipos implícitos en bloques `catch (err: any)`.
- **Impacto:** Reduce la seguridad de tipos de TypeScript. Preferible `if (err instanceof Error)`.
- **Severidad:** 🟢 Baja

### [ID: F-B-002] Posible stale closure en `applyServerGrade`
- **Archivo:** `src/components/CourseView.tsx` (L269–L284 aprox.)
- **Descripción:** La función `applyServerGrade` accede directamente a la variable `progress` del scope externo del render en lugar de usar la forma funcional `onUpdateProgress(prev => ({ ...prev }))`.
- **Impacto:** Riesgo menor de actualizar un progreso desactualizado si las ejecuciones ocurren repetidas rápidamente en entornos de React Concurrent.
- **Severidad:** 🟢 Baja

### [ID: F-B-003] Duplicidad de dependencias en `package.json`
- **Archivo:** `package.json`
- **Descripción:** `tailwindcss` y `vite` están declarados simultáneamente en `dependencies` y `devDependencies`.
- **Impacto:** Infla los tiempos de instalación y genera ruido semántico. En producción puede incluir dependencias de build innecesariamente.
- **Severidad:** 🟢 Baja

---

## Áreas sin cobertura / No determinado

- **Tests unitarios frontend:** No se encontraron archivos `.test.tsx` o `.spec.ts` en `src/`. El script `test` del `package.json` apunta a `tests/**/*.test.ts` (backend). La cobertura de componentes de UI es **no determinada**.
- **Rendimiento Monaco Editor:** No se pudo perfilar el impacto de memoria del editor de código en cambios rápidos de lección/curso.
- **Conformidad OpenAPI/tipos compartidos:** Los tipos en `shared/contracts.ts` se mantienen a mano. No hay generación automática desde specs YAML, lo que puede causar desincronización silenciosa.
- **`src/lib/storage.ts` completo:** No se auditó la totalidad del archivo; solo se identificó el patrón de uso de localStorage.

## Notas finales

El código evidencia una transición sólida hacia el modelo Zero Trust dictaminado en auditorías previas: las validaciones de rúbrica y emisión de certificados se trasladaron exitosamente al backend. El enfoque inmediato para la próxima iteración frontend debería centrarse en: (1) eliminar el token de localStorage o hacerlo cookie-only, (2) agregar un Error Boundary global en `main.tsx`, y (3) centralizar el manejo de 401 con un wrapper de fetch o contexto de sesión global.
