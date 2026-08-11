# Auditoría Arquitectónica - Fase 1

> **Proyecto:** Quiroz Systems — Plataforma Educativa de Software e Ingeniería
> **Fecha:** 2026-08-05
> **Alcance:** Frontend, Backend, Base de datos, Integraciones y Despliegue
> **Autor:** Auditoría técnica automatizada sobre el código fuente

---

## 1. Mapa del Sistema Actual

Quiroz Systems es una aplicación **monolito combinado sin separación estricta de despliegue**: un SPA React y una API Express que viven en el mismo repositorio pero corren como dos procesos independientes en desarrollo.

### Componentes y flujo de datos

| Capa | Ubicación | Tecnología | Puerto | Responsabilidad |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | `src/` | React 19 + Vite 6 + Tailwind 4 + Monaco | `:5173` | UI, navegación por pestañas, IDE, evaluación en cliente |
| **Backend** | `backend/` | Express 4 + Prisma 5 | `:4000` | API REST, sandbox de ejecución, persistencia SQLite |
| **Base de datos** | `prisma/schema.prisma` / `prisma/dev.db` | SQLite | — | Modelos relacionales y sesiones |

**Flujo nominal de lección:**

1. `CourseView.tsx` carga una lección con su `Exercise.testCases`.
2. Para lenguajes de código envía `POST /api/execute` (expresado por `backend/routes/execute.ts`).
3. Para SQL ejecuta `sqlRunner.ts` (motor `sql.js` — WebAssembly — **en el navegador**, sin pasar por el backend).
4. Para HTML/CSS evalúa con `htmlCssRunner.ts` (inspección por regex de la cadena de código, en el navegador).
5. `rubric.ts` (en el navegador) calcula el puntaje 70/20/10 y lo persiste en `localStorage` vía `storage.ts`, que además hace *fire-and-forget* `POST /api/profile`, `/api/progress`, `/api/certificates/issue`, etc.

**Flujo de autenticación (agregado recientemente):**

- `backend/routes/auth.ts` expone `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout` con hash `scrypt` y modelo `Session`.
- `LoginModal.tsx` y `RegisterModal.tsx` (interfaz) consumen esos endpoints; el token se guarda en `localStorage`.

### Servicios externos declarados vs. realmente utilizados

| Declaración | Dónde | ¿Se usa en código? |
| :--- | :--- | :--- |
| **Piston API** (sandbox) | `docker-compose.yml` (`PISTON_URL=http://piston_api:2000`) | **NO.** `/api/execute` ejecuta compiladores/intérpretes del host con `child_process.exec` |
| **Google Gemini** (`@google/genai`, `GEMINI_API_KEY`) | `package.json`, `.env.example`, `metadata.json` | **NO.** No existe ninguna importación/uso de la librería en el repositorio |
| **Supabase / Vercel / Railway** | no presentes | No configurado |

### Despliegue

`docker-compose.yml` define un servicio `app` con `build: context: .` (apunta a un `Dockerfile`) y un `piston_api`, mapeando el puerto `3000`. **No existe `Dockerfile`**, no hay endpoint que sirva `dist/` (el backend no tiene `express.static`), y `package.json` documenta `build` → `dist/server.cjs` + `start`. La configuración de despliegue y la del backend (`:4000`, sin estáticos) están **en contradicción** entre sí.

---

## 2. Evaluación de Arquitectura y Patrones

### Clean Architecture

- **Fronteras no respetadas.** No existe una sentencia clara de dependencia: las reglas de negocio viven en **`src/lib/rubric.ts`** (frontend). Evaluación, calificación y generación de UUID de certificado ocurren en el cliente. El backend actúa como una *thin CRUD* sobre SQLite.
- **Capa de datos acoplada.** Los handlers de rutas (`backend/routes/admin.ts`, `profile.ts`, `progress.ts`) llaman directamente a Prisma, mezclando *controller + service + repository* en un solo archivo (léase `admin.ts`, 665 líneas).
- **Tipos duplicados.** `src/types.ts` redefine a mano las entidades que Prisma ya define en `prisma/schema.prisma` (no hay *single source of truth* ni contrato compartido).

### Principios SOLID

| Principio | Estado | Evidencia |
| :--- | :--- | :--- |
| **S**RP — Responsabilidad Única | ✕ Violado | `admin.ts` mezcla gestión de aprobaciones, normalización de instituciones, autorización y CRUD. `execute.ts` orquesta la ejecución **y** la evaluación de test. |
| **O**CP — Abierto/Cerrado | ✕ | Soporte de lenguajes con `if/else` encadenado en `execute.ts:23-47`; agregar un lenguaje = modificar la función. |
| **L**SP — Sustitución de Liskov | Parcial | Los evaluadores (`sqlRunner`, `htmlCssRunner`, `/api/execute`) tienen firmas similares pero comportamientos inconsistentes; no hay una interfaz común evaluable. |
| **I** — Segregación de interfaces | ~ | `onLoginSuccess` acopla autenticación con navegación y carga de cursos en `App.tsx`. |
| **D** — Inversión de dependencias | **Violado** | Todos los módulos dependen de implementaciones concretas (`prisma`, `express`) sin abstracciones. |

### Spec-Driven Development (SDD)

- **Buen uso parcial:** Cada lección en `src/data/courses/*.ts` define `Exercise.testCases[]` (pares `input/output`) que funcionan como **especificaciones ejecutables**. Esto es la semilla correcta de SDD.
- **Fallos:**
  1. Los **evaluadores están en el cliente**, por lo que la "verificación de la especificación" ocurre en un contexto que el usuario puede alterar.
  2. La lógica de comparación se **duplica** entre `execute.ts` (backend) y `sqlRunner.ts` / `htmlCssRunner.ts` (frontend) con criterios divergentes (trim de strings, comparaciones textuales, "OK" para DDL) → resultados pueden variar por entorno.
  3. **No existe contrato tipado** (OpenAPI / JSON Schema). Los tipos frontend↔backend se desincronizan manualmente.
  4. No hay tests automáticos que validen esos "specs"; el sandbox es el único mecanismo de verificación.

### Buenas prácticas detectadas

- Despliegue en dos puertos (frontend/backend) con proxy `/api` en `vite.config.ts` → buen desacoplamiento para desarrollo.
- TypeScript con `tsc --noEmit` como verificación de tipos en CI (aunque `strict` no está habilitado).
- **UUID de certificado** + endpoint público de verificación → trazabilidad razonable.
- **Hash con `scrypt`** (con sal) en `backend/password.ts` → buena postura para contraseñas.
- **Rúbrica paramétrica** (`rubric.ts`) y test cases como especificación → conceptos sanos.
- Singleton de Prisma en `backend/db.ts` evita múltiples instancias del cliente con hot-reload y en producción.
- Motores de lección embebidos (`sql.js` WASM) integran evaluación dentro del cliente sin round-trips.

---

## 3. Hallazgos y Puntos Críticos

### 3.1 Seguridad — CRÍTICOS

1. **`/api/execute` abierto (RCE / DoS).** No hay autenticación ni limitación de concurrencia. Ejecuta los scripts con `child_process.exec` y compiladores del host (`execute.ts:23-47`). Un cliente anónimo puede: `while True: pass` (CPU hasta el timeout de 5 s), abrir sockets, escribir en disco o inundar el proceso → **denegación de servicio y vector de ejecución arbitraria**. no hay sandbox/container.
2. **Emisión de certificados falsificables.** `GradeReportView.tsx:61-93` **genera el UUID en el cliente** con `Math.random` y llama `POST /api/certificates/issue` con datos arbitrarios. El backend (en `certificates.ts`) acepta y persiste sin verificar el progreso (completó 100%) ni el remitente. **Cualquier usuario puede emitir un certificado válido de un curso sin aprobarlo.**
3. **Rutas `/api/admin/*` NO protegidas.** Sin middleware de rol/token. Un estudiante (o anónimo) puede invocar `/api/admin/approve-certificate`, `/api/admin/mark-paid`, `/api/admin/add-student`, etc., para aprobar/rechazar/marcar como pagado (escalada de privilegios).
4. **Fuga de datos entre usuarios (`findFirst()`).** `profile.ts:8` y `progress.ts:9,81` resuelven al estudiante con `prisma.student.findFirst()` → **siempre el primer estudiante de la tabla**, ignorando el inicio de sesión. Los avances y perfil de un usuario se mezclan con los del resto en multiusuario.
5. **CORS abierto + sin helmet/rate-limit.** `app.use(cors())` permite cualquier origen; no existe `express-rate-limit`, ni headers de seguridad.
6. **Token en `localStorage`** (XSS-friendly) sin expiración/revocación de sesión automática más allá del TTL, sin rotación de token.

### 3.2 Deuda técnica y acoplamiento

- **Reglas de negocio en frontend.** La rúbrica 70/20/10, el cálculo de nota del curso y la lógica de certificación residen al 100% en `src/lib` y en los componentes → el score se puede adulterar desde la consola.
- **Duplicación de evaluadores.** El mismo flujo de "compilar y comparar" existe en `execute.ts` (backend) y en `htmlCssRunner.ts`/`sqlRunner.ts` (frontend) con criterios divergentes.
- **`src/lib/db.ts` es código muerto.** Importa `PrismaClient` en el navegador (no puede funcionar) y no es referenciado por nada; es una copia de `backend/db.ts`.
- **Piston y Gemini declarados aunque no usados**, con `PISTON_URL` en `docker-compose.yml` y `GEMINI_API_KEY` en `.env.example`, lo que genera confusión sobre cuál es el sandbox real.
- **`tailwindcss` duplicado** en `dependencies` y en `devDependencies`.

### 3.3 Base de datos y consultas

- **N+1 / loops sin transacción.** `progress.ts:112-150` hace un `upsert` de `LessonAttempt` por lección en un ciclo **sin `prisma.$transaction`** → escrituras parciales en caso de fallo intermedio.
- **Lecturas costosas.** `admin.ts /students` (`:174-236`) hace `include` de institución + `attempts` y luego **reduce en Node** contando aprobados por progreso (procesamiento en memoria).
- **Índices**: los `@@unique` de `CourseProgress(studentId,courseId)` y `LessonAttempt(courseProgressId,lessonId)` son correctos; faltan índices para los filtros de listado de `admin`.
- **SQLite en producción**: apropiado para MVP/POC, pero es **bloqueante por escritura** y limita la concurrencia real multiusuario / multirregión.

### Despliegue

- `docker-compose.yml` referencia un **`Dockerfile` que no existe** → `docker-compose up` falla.
- El backend **no sirve el bundle estático** (`dist/`) → en producción el frontend construido no puede servirse como una sola aplicación.
- **Conflicto de puertos/config:** `docker-compose` expone `3000`, `express` escucha `4000`, y el proxy de dev usa `:5173`.

Cuadro resumen por severidad: **P0** = seguridad/bloqueos, **P1** = arquitectura, **P2** = optimización.

---

## 4. Plan de Acción y Refactorización

> Prioridad `P0` (bloqueador), `P1` (importante), `P2` (mejora). **🏷️** indica esfuerzo E (bajo → S/M/L).

### Fase A — Ciberproteger la API (contrarrestar el "lado abierto")

| # | Prioridad | Acción | Detalle técnico |
| :-- | :-- | :-- | :-- |
| A1 | **P0** | **AuthMW obligatoria.** | Middleware de Express que resuelve el token Bearer → `Session` → usuario e inyecta `req.user`. Proteger *todas* las rutas `/api/*` salvo `register/login`. Usar `GET /api/auth/me` como fuente de estado. Reutilizar `findSessionUser` de `auth.ts` y el modelo `Session`. |
| A2 | **P0** | Endurecer `/api/execute`. | Mudar la ejecución a un **worker aislado / contenedor (Piston)**, ya declarado en `docker-compose`, con `timeout`, `ulimit` de CPU+memoria y **rate-limit + cola de concurrencia**. Eliminar `exec` en el proceso del servidor. |
| A3 | **P0** | Emitir certificados **server-side**. | `POST /api/certificates/issue` debe validar con el token que el progreso del curso está **completo (100%)**; el UUID lo genera el **backend** (`crypto.randomUUID`), no el cliente. Eliminar `Math.random` de `GradeReportView`. |
| A4 | **P0** | Corregir **`findFirst()` de usuarios**. | `profile.ts` y `progress.ts` deben resolver al estudiante desde `req.user.id` (sesión), no `findFirst()`. |
| A5 | **P0** | Proteger `/api/admin/*`. | Requerir rol `SUPER_ADMIN`/`INSTRUCTOR` y jerarquías de institución por acción (`approve-certificate`, `mark-paid`, `students`). Ningún estudiante puede auto-atribuirse. |
| A6 | **P1** | Hardening y red. | Agregar `helmet`, `cors` con allowlist, `express-rate-limit`, validación de schema (Zod/Ajv) en `req.body` y límite de payload razonable. |

### Fase B — Arquitectura y contratos

| # | Prioridad | Acción | Detalle |
|---| :-- | :-- | :-- |
| B1 | **P0** | **Mover la evaluación/rúbrica al backend.** | Trasladar `rubric.ts` y las pruebas de ejecución a una capa de servicio (p. ej. `evaluation.ts`); el frontend solo envía la solución y recibe `{passed, scores}` calculados en el servidor. |
| B2 | **P0** | **Un solo evaluador.** | Elegir un único "ejecutor de specs" (Piston/worker) para todos los lenguajes (incl. SQL mediante motor servidor de prueba) y descartar los evaluadores con regex en el cliente (`htmlCssRunner`, `sqlRunner`) — o moverlos al backend con contratos idénticos. |
| B3 | **P1** | **Single source of truth de tipos/contrato.** | Generar tipos desde Prisma y/o definir un **OpenAPI (spec)** compartido; compilar FE/BE contra el mismo contrato. Encaja con SDD (sección `specs/`). |
| B4 | **P1** | Extraer **services + repositorios**. | Refactorizar `admin.ts` (665 líneas) en `institutionService`, `approvalService`, `paymentService`, `certificateService`; repositorios con métodos tipados, sin transacción directa en el handler. |
| B5 | **P1** | **DIP / DI** ligero. | `db` inyectada en los services; habilitar `strict: true` en tsconfig y eliminar los `any` recurrentes. |
| B6 | **P2** | Limpiar deuda. | Eliminar `src/lib/db.ts` (Prisma en FE), quitar dependencias sin uso (`@google/genai` si no se integra), y consolidar `tailwindcss` en `devDependencies`. |

### Fase C — Escalabilidad, datos y despliegue

| # | Prioridad | Acción | Detalle |
|---| :-- | :-- | :-- |
| C1 | **P0** | Transacciones e integridad. | Envolver todos los **upserts de lección** en `prisma.$transaction`; idempotencia si falla. |
| C2 | **P1** | Paginate + proyección en listados. | `/admin/students`, `/admin/payments`, `/admin/institutions` con `take/skip` y select de columnas; mover el cálculo de agregados al SQL (`.aggregate`) en vez de reduce en Node. |
| C3 | **P1** | Sesión robusta. | TTL de sesión + limpieza programada; preferir **cookie HttpOnly** en lugar de `localStorage`; rotación de token en cada inicio y logout seguro. |
| C4 | **P1** | Migración de BD al escalar. | Mantener Prisma; cuando el sistema pase de *single-writer* (SQLite) a multiusuario real, conviene migrar a **PostgreSQL** (cambio de `provider` + ajustes) con `prisma migrate` versionado. Índices recomendados: `Student[email]`, `Institution[code]`, `Session[token,expiresAt]`. |
| C5 | **P1** | Docker real y resolver el mismatch. | Crear `Dockerfile` (multi-stage: build FE → copiar `dist/`, imagen node para backend) y **servir `dist/` con Express en producción** (`express.static` + SPA fallback); unificar puertos (`4000` interno / `80` expuesto) y eliminar `PISTON_URL` de la configuración vacía. |
| C6 | **P2** | Observability + CI. | Logging estructurado, `Sentry`, healthcheck con métricas; agregar `test`, `build`, `lint` y despliegue en un pipeline (GitHub Actions) con `prisma migrate deploy`, no `db push` en producción. |

### SDD (alineación recomendada)

1. **Crear carpeta `specs/`** con contratos (OpenAPI + JSON Schema) para `auth`, `execute`, `certificates` y `progress`.
2. Modelar los `Exercise.testCases[]` como **specs de lección** versionadas en `specs/lessons/*.yaml`, consumidas tanto por el **evaluador backend** como por el lint en CI.
3. Añadir **tests de integración** que ejecuten los `testCases` contra el servidor real y validen la `rubric`.

**Orden sugerido de ejecución:** Fase A1→A5 (bloqueadores) → B1/B2 (reglas al servidor) → A6/C1 → B3/B4 → C → SDD. Cada fase cierra con `tsc` + tests verdes y un despliegue seguro.

---

*Fin de la auditoría de Fase 1. La Fase 2 deberá centrarse en: afirmar contrato de API, mover el motor de evaluación al servidor, y cubrir con tests end-to-end los flujos de certificación y sandbox.*