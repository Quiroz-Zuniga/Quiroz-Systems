# Auditoría Backend — QuirozSystems
**Fecha:** 2026-08-17  
**Auditor:** Agente IA (solo lectura — sin modificaciones)  
**Scope:** Base de Datos · API · Seguridad · Calidad de Código Backend  
**Archivos revisados:** `prisma/schema.prisma`, `backend/app.ts`, `backend/index.ts`, `backend/db.ts`, `backend/session.ts`, `backend/password.ts`, `backend/rateLimit.ts`, `backend/validation.ts`, `backend/piston.ts`, `backend/routes/*` (11 archivos), `backend/use-cases/*` (2 archivos), `backend/middleware/auth.ts`, `backend/domain/*` (2 archivos), `backend/specs/lessonSpecs.ts`, `backend/runners/*` (4 archivos), `tests/*` (6 archivos), `docker-compose.yml`, `Dockerfile`, `.env.example`, `.github/workflows/ci.yml`, `package.json`

---

## Resumen ejecutivo

El backend muestra un nivel de madurez por encima del promedio para un proyecto en esta etapa: arquitectura en capas razonablemente limpia, Zero Trust en calificaciones, validación con Zod sobre todos los inputs críticos, y la capa de autenticación usa cookies HttpOnly + scrypt con comparación en tiempo constante. Sin embargo, se identifican **5 riesgos que requieren atención antes de lanzar roles/suscripciones**: (1) el webhook de PayPal no valida la firma criptográfica, exponiendo el sistema a cambios de rol fraudulentos; (2) el modelo `Course` es prácticamente un stub sin datos útiles; (3) hay un acoplamiento directo backend→frontend (`courseRegistry` importa `src/data/courses`); (4) el superadmin se auto-crea en el primer login con cualquier contraseña; y (5) no hay migraciones formales de Prisma — todo corre contra `prisma db push` sin historial.

---

## Estadísticas

| Severidad | Count |
|-----------|-------|
| 🔴 Crítica   | 2     |
| 🟠 Alta      | 5     |
| 🟡 Media     | 6     |
| 🟢 Baja      | 5     |
| **Total**    | **18** |

---

## 1. Base de Datos

### 1.1 Inventario de modelos (Prisma — `prisma/schema.prisma`)

| Modelo | PK | Campos destacados | Relaciones |
|--------|----|-------------------|------------|
| `Institution` | `id: String (uuid)` | `nombre`, `logo_url?`, `nombre_docente_responsable?` | 1:N → InstitutionStudent; 1:N → Subscription |
| `User` | `id: String (uuid)` | `email (unique)`, `password?`, `role: String` | N:M vía InstitutionStudent; 1:N → Certificate, CourseProgress, Recognition, Session |
| `InstitutionStudent` | `id: String` | `institutionId`, `userId` | N:1 → Institution; N:1 → User. Unique `[institutionId, userId]` |
| `Course` | `id: String (uuid)` | `es_muestra: Boolean` | — (ninguna relación) |
| `Session` | `id: String` | `token (unique)`, `userId?`, `expiresAt` | N:1 → User (onDelete Cascade) |
| `MonetizationConfig` | `id: String ("default")` | `kofiUrl?`, `paypalUrl?`, `subscriptionPriceDisplay` | — |
| `Recognition` | `id: String` | `recognitionCode (unique)`, `usuario_id`, `curso_id`, `institucion_id?` | N:1 → User |
| `CourseProgress` | `id: String` | `userId`, `courseId`, `status`, `completionDate: String?`, `finalGradePercent?` | N:1 → User; 1:N → LessonAttempt. Unique `[userId, courseId]` |
| `LessonAttempt` | `id: String` | `courseProgressId`, `lessonId`, `submittedCode`, `passed` | N:1 → CourseProgress. Unique `[courseProgressId, lessonId]` |
| `Certificate` | `uuid: String` | `userId?`, `courseId`, `finalGradePercent`, `issueDate: String` | N:1 → User (onDelete SetNull) |
| `Subscription` | `id: String` | `institution_id`, `plan`, `max_alumnos`, `estado`, `paypal_subscription_id?` | N:1 → Institution; 1:N → Transaction |
| `Transaction` | `id: String` | `subscription_id`, `monto`, `moneda`, `estado`, `referencia_paypal?` | N:1 → Subscription |

### 1.2 Hallazgos de Base de Datos

---

### [ID: B-C-001] Stub de `Course`: modelo sin datos útiles, desacoplado del currículum real
- **Archivo:** `prisma/schema.prisma` (L48–51)
- **Descripción:** El modelo `Course` solo almacena `id` y `es_muestra: Boolean`. Todo el currículo real (lecciones, maxScore, idioma, etc.) vive en `src/data/courses` (frontend) y `specs/lessons/*.yaml`, **nunca en BD**. El campo `courseId` de `CourseProgress`, `LessonAttempt`, `Recognition` y `Certificate` es una `String` libre sin FK a `Course`. Si un `courseId` llega mal formado, se guardará igualmente sin error de integridad referencial.
- **Impacto:** No hay integridad referencial para el activo más importante del sistema (los cursos). Se pueden crear registros de progreso o certificados referenciando cursos inexistentes. Además, la tabla `Course` es redundante con el JSON de frontend.
- **Severidad:** 🔴 Crítica

---

### [ID: B-A-001] Sin migraciones formales de Prisma — solo `db push`
- **Archivo:** `prisma/` (sin carpeta `migrations/`)
- **Descripción:** No existe el directorio `prisma/migrations/`. El esquema se aplica con `prisma db push`, que no genera historial de migraciones. En producción esto significa que cambios destructivos (renombrar columnas, eliminar campos) se ejecutan sin control ni rollback.
- **Impacto:** Riesgo de pérdida de datos en próximas evoluciones del schema. Sin historial, es imposible auditar cuándo se agregó cada tabla/columna.
- **Severidad:** 🟠 Alta

---

### [ID: B-A-002] Campos de fecha como `String` en lugar de `DateTime`
- **Archivos:** `prisma/schema.prisma` L95 (`completionDate: String?`), L99 (`approvalDate: String?`), L135 (`issueDate: String`)
- **Descripción:** Tres campos que representan fechas están tipados como `String` en lugar de `DateTime`. El campo `issueDate` en `Certificate` se genera con `toLocaleDateString('es-ES')` (formato `DD/MM/YYYY`), dependiente del locale del servidor.
- **Impacto:** Imposible hacer queries de rango por fecha, ordenamiento temporal fiable o comparaciones. Si el locale del servidor cambia, los formatos quedan inconsistentes.
- **Severidad:** 🟡 Media

---

### [ID: B-M-001] `status` en `CourseProgress` no es un enum de Prisma
- **Archivo:** `prisma/schema.prisma` (L93), `backend/use-cases/issueCertificate.ts` (L75, L102)
- **Descripción:** `status: String @default("IN_PROGRESS")` usa strings libres. Los valores esperados son `"IN_PROGRESS"`, `"APPROVED"`, `"CERTIFIED"` pero no están restringidos a nivel de BD. El campo `status` se chequea en `routes/institutions.ts` L106 contra `"APPROVED"` sin que exista ningún endpoint que marque un progreso como `"APPROVED"` desde el backend.
- **Impacto:** El endpoint `POST /api/institutions/emit-recognition` (L106) tiene una condición que **nunca se cumple** en el flujo actual, porque `issueCertificate.ts` escribe `"CERTIFIED"`, no `"APPROVED"`. Ver hallazgo B-A-004.
- **Severidad:** 🟡 Media

---

### [ID: B-M-002] `Recognition` sin FK a `Course` ni a `Institution` como entidad
- **Archivo:** `prisma/schema.prisma` (L74–87)
- **Descripción:** `curso_id` e `institucion_id` en `Recognition` son `String` libres (no FKs). Un `Recognition` puede referenciar un `institution_id` que no existe en la tabla `Institution`.
- **Impacto:** Sin integridad referencial en datos de reconocimiento. Consultas que hagan JOIN manual pueden retornar datos huérfanos.
- **Severidad:** 🟡 Media

---

## 2. API

### 2.1 Inventario completo de endpoints

| # | Método | Ruta | Controlador | Auth | Rol | Validación body |
|---|--------|------|------------|------|-----|----------------|
| 1 | GET | `/api/health` | `app.ts` L139 | ❌ Público | — | — |
| 2 | GET | `/api/courses` | `routes/courses.ts` L10 | ❌ Público (sesión opcional) | — | — |
| 3 | POST | `/api/auth/register` | `routes/auth.ts` L30 | ❌ Público | — | ✅ `registerSchema` |
| 4 | POST | `/api/auth/login` | `routes/auth.ts` L84 | ❌ Público | — | ✅ `loginSchema` |
| 5 | GET | `/api/auth/me` | `routes/auth.ts` L144 | ❌ Público (401 interno) | — | — |
| 6 | POST | `/api/auth/logout` | `routes/auth.ts` L166 | ❌ Público | — | — |
| 7 | GET | `/api/certificates/verify/:uuid` | `routes/certificates.ts` L31 | ❌ Público | — | — |
| 8 | GET | `/api/monetization-config` | `routes/monetization.ts` L22 | ❌ Público | — | — |
| 9 | POST | `/api/webhooks/paypal` | `routes/subscriptions.ts` L86 | ❌ Público | — | — |
| 10 | POST | `/api/execute` | `routes/execute.ts` L18 | ✅ authRequired | Cualquiera | ✅ `executeSchema` |
| 11 | POST | `/api/assessments` | `routes/assessments.ts` L13 | ✅ authRequired | Cualquiera | ✅ `assessmentSchema` |
| 12 | GET | `/api/profile` | `routes/profile.ts` L8 | ✅ authRequired | Cualquiera | — |
| 13 | POST | `/api/profile` | `routes/profile.ts` L21 | ✅ authRequired | Cualquiera | ✅ `profileSchema` |
| 14 | GET | `/api/progress/:courseId` | `routes/progress.ts` L9 | ✅ authRequired | Cualquiera | — |
| 15 | POST | `/api/progress` | `routes/progress.ts` L95 | ✅ authRequired | Cualquiera | ✅ `progressSchema` |
| 16 | POST | `/api/certificates/issue` | `routes/certificates.ts` L10 | ✅ authRequired | Cualquiera | ✅ `certificateIssueSchema` |
| 17 | GET | `/api/certificates` | `routes/certificates.ts` L50 | ✅ authRequired | Cualquiera | — |
| 18 | POST | `/api/subscriptions/create` | `routes/subscriptions.ts` L9 | ✅ authRequired | `PENDIENTE_INSTITUCION` | ⚠️ Sin Zod |
| 19 | GET | `/api/subscriptions/status` | `routes/subscriptions.ts` L52 | ✅ authRequired | `PENDIENTE_INSTITUCION` | — |
| 20 | POST | `/api/institutions/add-user` | `routes/institutions.ts` L29 | ✅ authRequired | `INSTITUCION` + sub activa | ⚠️ Manual only |
| 21 | GET | `/api/institutions/users` | `routes/institutions.ts` L69 | ✅ authRequired | `INSTITUCION` + sub activa | — |
| 22 | POST | `/api/institutions/emit-recognition` | `routes/institutions.ts` L91 | ✅ authRequired | `INSTITUCION` + sub activa | ⚠️ Sin Zod |
| 23 | GET | `/api/admin/overview` | `routes/admin.ts` L9 | ✅ authRequired | `SUPER_ADMIN` | — |
| 24 | GET | `/api/admin/instructors` | `routes/admin.ts` L31 | ✅ authRequired | `SUPER_ADMIN` | — |
| 25 | GET | `/api/admin/institutions` | `routes/admin.ts` L59 | ✅ authRequired | `SUPER_ADMIN` | — |
| 26 | GET | `/api/admin/students` | `routes/admin.ts` L85 | ✅ authRequired | `SUPER_ADMIN` | — |

> **Nota:** `validation.ts` define 8 schemas admin (`adminApproveInstructorSchema`, `adminRegisterInstructorSchema`, `adminAddUserSchema`, `adminCheckUserTypeSchema`, `adminApproveCertificateSchema`, `adminUpdateInstitutionSchema`, `adminAddInstructorSchema`, `adminMonetizationConfigSchema`) que **no se usan** en ningún route — dead code de endpoints eliminados o no implementados.

### 2.2 Hallazgos de API

---

### [ID: B-A-003] Endpoints de `subscriptions` e `institutions` sin validación Zod
- **Archivos:** `routes/subscriptions.ts` (L12: `planId` sin schema); `routes/institutions.ts` (L32–34: validación manual; L93–94: `userId/courseId` sin validación)
- **Descripción:** `POST /api/subscriptions/create` acepta `planId` del body sin Zod. `POST /api/institutions/emit-recognition` acepta `userId` y `courseId` sin ninguna validación de tipo o longitud.
- **Impacto:** Comportamiento inesperado o crashes con inputs malformados. Inconsistencia con el patrón del resto de la API.
- **Severidad:** 🟠 Alta

---

### [ID: B-A-004] Condición inalcanzable en `emit-recognition` — endpoint siempre rechaza
- **Archivo:** `routes/institutions.ts` (L106)
- **Descripción:** El endpoint valida `if (!progress || progress.status !== 'APPROVED')`. Ningún endpoint del backend establece `status = 'APPROVED'`. `issueCertificate.ts` escribe `status = 'CERTIFIED'` (L75, L102). El endpoint de progreso tampoco escribe el status.
- **Impacto:** **Este endpoint es funcionalmente inútil** — siempre retornará 400 aunque el alumno haya completado el curso. La funcionalidad de reconocimiento institucional está completamente rota.
- **Severidad:** 🔴 Crítica

---

### [ID: B-M-003] Schemas Zod desactualizados — enums de rol incorrectos
- **Archivo:** `backend/validation.ts` (L27, L37)
- **Descripción:** `registerSchema` valida `role` contra `z.enum(['STUDENT', 'INSTRUCTOR'])` pero `routes/auth.ts` L34 espera `'USUARIO'` o `'INSTITUCION'`. El login también usa `'STUDENT'`, `'INSTRUCTOR'`, `'SUPER_ADMIN'`. Los tests usan `role: 'STUDENT'` (`tests/auth.test.ts` L26).
- **Impacto:** El `validateBody(registerSchema)` rechazaría cualquier registro con `role: 'USUARIO'` o `'INSTITUCION'` (400). La lógica interna de `routes/auth.ts` L34 nunca se ejercitará con los valores del schema en producción real.
- **Severidad:** 🟠 Alta

---

### [ID: B-M-004] 8 schemas en `validation.ts` sin usar (dead code)
- **Archivo:** `backend/validation.ts` (L114–162)
- **Descripción:** `adminApproveInstructorSchema`, `adminRegisterInstructorSchema`, `adminAddUserSchema`, `adminCheckUserTypeSchema`, `adminApproveCertificateSchema`, `adminUpdateInstitutionSchema`, `adminAddInstructorSchema`, `adminMonetizationConfigSchema` — definidos pero no importados en ningún route.
- **Impacto:** Los endpoints admin correspondientes (aprobar instructores, configuración de monetización, etc.) no están implementados o fueron eliminados sin limpiar sus schemas.
- **Severidad:** 🟡 Media

---

### [ID: B-B-001] `POST /api/progress` acepta `finalGradePercent` y `certificateUuid` del cliente sin recalcular
- **Archivo:** `routes/progress.ts` (L97, L118–119, L122–124)
- **Descripción:** Aunque `/api/assessments` calcula la nota en el backend, el endpoint de sincronización acepta y persiste `finalGradePercent` y `certificateUuid` directamente del cliente sin recalcular desde la DB.
- **Impacto:** Un usuario autenticado puede enviar `finalGradePercent: 100` y `certificateUuid: "uuid-fake"` a `POST /api/progress` para falsificar progreso sin pasar por el evaluador. Esto puede desencadenar una emisión de certificado fraudulenta.
- **Severidad:** 🟠 Alta

---

## 3. Seguridad

### 3.1 SQL Injection
**Estado: ✅ Sin riesgo detectado.** El proyecto usa Prisma ORM exclusivamente. Única query raw en `app.ts` L143: `` prisma.$queryRaw`SELECT 1` `` — literal sin interpolación de datos del usuario.

### 3.2 Autenticación

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| Algoritmo de hash | ✅ Correcto | `scrypt` con salt 16 bytes. Comparación con `timingSafeEqual`. |
| Almacenamiento de token | ✅ Correcto | Cookie HttpOnly, SameSite=Lax, Secure en producción. |
| TTL de sesión | ✅ Razonable | 7 días. Renovación automática en `/me`. |
| Rotación en login | ✅ Implementado | `deleteMany({ userId })` borra sesiones anteriores. |
| Limpieza de expiradas | ✅ Implementado | Cron cada 1h en `session.ts`. |
| Refresh token | ❌ No existe | No hay token de refresh separado. |

---

### [ID: B-C-002] Webhook PayPal sin validación de firma — escalada de rol fraudulenta
- **Archivo:** `routes/subscriptions.ts` (L86–176)
- **Descripción:** `POST /api/webhooks/paypal` (público, sin auth) verifica si los headers de firma PayPal están presentes (L96) pero **comentó el rechazo** (`// return res.status(400).send(...)`). Cualquiera que haga POST con `event_type: "BILLING.SUBSCRIPTION.ACTIVATED"` y un `custom_id` de usuario existente promoverá ese usuario a `INSTITUCION` (L131–134).
- **Impacto:** Cualquier actor externo puede promover cualquier usuario a `INSTITUCION` sin pagar, llamando directamente al webhook con un body falso. **Escalada de privilegios sin autenticación.**
- **Severidad:** 🔴 Crítica

---

### [ID: B-A-005] Superadmin se auto-crea con la contraseña del primer request
- **Archivo:** `routes/auth.ts` (L96–111)
- **Descripción:** Si `superadmin@quirozsystems.com` no existe en BD, se crea con **la contraseña que envíe el primer request** (L98–105). Si ya existe con otro rol, se le fuerza `SUPER_ADMIN` (L107–110).
- **Impacto:** Quien haga el primer login antes que el admin legítimo establece la contraseña de superadmin. Cualquier usuario con ese email es silenciosamente promovido a SUPER_ADMIN.
- **Severidad:** 🟠 Alta

---

### 3.3 CORS

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| Allowlist explícita | ✅ Correcto | `CORS_ORIGINS` env var. Default: `localhost:5173`, `localhost:4000`. |
| `origin: '*'` | ✅ No presente | Callback con `allowedOrigins.includes(origin)`. |
| `credentials: true` | ⚠️ No configurado | Sin esta opción, las cookies HttpOnly en requests cross-origin pueden ser bloqueadas por el navegador. |

### 3.4 Rate Limiting

| Endpoint | Rate Limit | Tipo |
|----------|------------|------|
| Toda la API (`/api/*`) | 120 req/min por IP | `express-rate-limit` global |
| `POST /api/execute` | 30 req/min por userId/IP | `slidingWindowRateLimit` custom |
| `POST /api/auth/login` | ❌ Sin límite dedicado | Solo el global de 120/min |
| `POST /api/auth/register` | ❌ Sin límite dedicado | Solo el global de 120/min |

> 120 intentos/min contra login es insuficiente para prevenir fuerza bruta sobre contraseñas de 6 caracteres (mínimo del schema de Zod).

### 3.5 Variables de entorno

- `.env.example` **no documenta**: `PAYPAL_CLIENT_ID`, `PAYPAL_PLAN_BASICO`, `PAYPAL_PLAN_ESTANDAR`, `PAYPAL_PLAN_PREMIUM`, `SENTRY_DSN`, `SENTRY_TRACES_SAMPLE_RATE`.
- `routes/subscriptions.ts` L39: `const paypalClientId = process.env.PAYPAL_CLIENT_ID || 'sandbox_client_id'` — se lee pero **no se usa** en el mismo archivo. Dead code.
- Email `superadmin@quirozsystems.com` hardcodeado en `routes/auth.ts` L96.
- No se detectaron secretos hardcodeados fuera de `.env`.

---

## 4. Calidad de Código

### [ID: B-M-005] Acoplamiento backend → frontend: `courseRegistry` importa `src/data/courses`
- **Archivo:** `backend/domain/courseRegistry.ts` (L4)
- **Descripción:** `import { allCourses } from '../../src/data/courses'` — el backend importa directamente del directorio del frontend.
- **Impacto:** Imposible desplegar el backend de forma independiente. Rompe la separación de capas. Si se mueve a microservicio, no compilará.
- **Severidad:** 🟡 Media

---

### [ID: B-M-006] `admin.ts` retorna datos hardcodeados / mock en producción
- **Archivo:** `routes/admin.ts` (L13, L23, L47–48, L71–72)
- **Descripción:**
  - L13: `const pendingInstructors = 0; // Legacy` — siempre 0 sin consultar BD.
  - L23: `averageGradePercent: 100` — siempre 100, dato falso.
  - L47–48: `approvalStatus: 'APPROVED'` — siempre aprobado.
  - L71–72: `code: 'N/A'`, `status: 'APPROVED'` — datos mock.
- **Impacto:** El panel de administración muestra métricas falsas (100% de nota promedio, 0 instructores pendientes, todos los instructores "aprobados").
- **Severidad:** 🟡 Media

---

### [ID: B-B-002] `void courseProgress` en `evaluateLesson.ts`
- **Archivo:** `backend/use-cases/evaluateLesson.ts` (L139)
- **Descripción:** `void courseProgress;` suprime un warning de variable no usada. Podría simplificarse con desestructuración parcial (`const { finalGradePercent } = await prisma.$transaction(...)`).
- **Impacto:** Código confuso para mantenedores.
- **Severidad:** 🟢 Baja

---

### [ID: B-B-003] `serializeUser` acepta `any` en `auth.ts`
- **Archivo:** `routes/auth.ts` (L20)
- **Descripción:** `function serializeUser(user: any)` — sin tipado explícito del input.
- **Impacto:** Menor. Podría tiparlo como `Pick<User, 'id' | 'name' | 'email' | 'role'>`.
- **Severidad:** 🟢 Baja

---

### [ID: B-B-004] `issueCertificate.ts` retorna tipo `any` en `certificate`
- **Archivo:** `backend/use-cases/issueCertificate.ts` (L16)
- **Descripción:** `certificate?: any` en `IssueCertificateResult` en lugar del tipo Prisma `Certificate`.
- **Impacto:** Menor. Pérdida de type-safety en el consumidor.
- **Severidad:** 🟢 Baja

---

### [ID: B-B-005] `docker-compose.yml` expone puerto 2000 de Piston al host
- **Archivo:** `docker-compose.yml` (L29)
- **Descripción:** `ports: "2000:2000"` expone la API de ejecución de código de Piston directamente al host. Piston no tiene autenticación propia.
- **Impacto:** Cualquiera con acceso a la IP en el puerto 2000 puede ejecutar código arbitrario en el sandbox sin autenticación.
- **Severidad:** 🟠 Alta (sin firewall configurado)

---

### 4.1 Cobertura de Tests

| Test | Scope | Estado |
|------|-------|--------|
| `auth.test.ts` | Registro, login, cookie, rotación, logout, default-deny | ✅ Buena cobertura |
| `assessment.test.ts` | Evaluación de lección | ✅ Presente |
| `certificates.test.ts` | Emisión de certificado | ✅ Presente |
| `health.test.ts` | Healthcheck | ✅ Presente |
| `rubric.test.ts` | Cálculo de rúbrica | ✅ Presente |
| Admin endpoints | — | ❌ Sin tests |
| Subscriptions / Webhook PayPal | — | ❌ Sin tests |
| Institutions endpoints | — | ❌ Sin tests |
| Rate limiting | — | ❌ Sin tests |
| Progress sync (POST) | — | ❌ Sin tests directos |

---

## Áreas sin cobertura / No determinado

- **Runners** (`backend/runners/`): `htmlCssRunner.ts`, `sqlRunner.ts`, `programmingRunner.ts` no se auditaron en detalle. Pueden tener issues de timeout o error handling.
- **`ConcurrencyLimiter` en memoria**: Si el servidor se reinicia durante una ejecución, las promesas en espera se pierden sin resolverse.
- **CI sin `prisma migrate`**: El workflow `ci.yml` corre `prisma generate` pero no `prisma db push` ni tests de migración.
- **Secrets en `.env` real**: No se leyó el `.env` real. No se puede confirmar si contiene secretos de PayPal de producción o sandbox.

---

## Resumen ejecutivo — Top 5 problemas más urgentes

| Prioridad | ID | Problema | Acción requerida |
|-----------|----|---------|--------------------|
| 🔴 **1** | B-C-002 | Webhook PayPal sin validación de firma | Implementar verificación criptográfica de firma o lista de IPs de PayPal |
| 🔴 **2** | B-A-004 | `emit-recognition` siempre rechaza (status `APPROVED` nunca se escribe) | Corregir la condición a `status !== 'CERTIFIED'` o agregar transición de estado |
| 🟠 **3** | B-M-003 | Schemas Zod con enums de rol incorrectos (`STUDENT`/`INSTRUCTOR` vs dominio real) | Sincronizar enums en `validation.ts` con los roles reales |
| 🟠 **4** | B-B-001 | `POST /api/progress` acepta `finalGradePercent` del cliente | Ignorar esos campos del body y recalcular siempre desde DB |
| 🟠 **5** | B-A-005 | Superadmin se crea con la contraseña del primer request | Mover credencial inicial a seed o variable de entorno `ADMIN_PASSWORD` |
