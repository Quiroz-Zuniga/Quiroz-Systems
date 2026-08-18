# Quiroz Systems — Plataforma Educativa de Software e Ingeniería

<div align="center">
  <p><b>Plataforma web interactiva para el aprendizaje de programación, desarrollo de software y verificación oficial de certificados.</b></p>
</div>

---

## 📋 Descripción General

**Quiroz Systems** es una plataforma educativa integral diseñada para la enseñanza moderna de ciencias de la computación e ingeniería de software. Ofrece cursos estructurados pedagógicamente con lecciones teóricas, ejemplos interactivos, entorno de código integrado (Monaco Editor), ejecución de pruebas en tiempo real, rúbricas de evaluación automática y emisión de certificados oficiales en formato PDF con código único de verificación UUID.

La aplicación cuenta con una **arquitectura desacoplada en dos capas independientes**:
- **Backend API (Express + Prisma + SQLite)** en el puerto `4000`.
- **Frontend Cliente (Vite + React 19 + Tailwind CSS)** en el puerto `5173`.

---

## ✨ Características Principales

- 🎓 **Catálogo de Cursos Integrados**: 8 módulos de especialización:
  - ⚡ **C++**: Fundamentos, estructuras de datos y gestión de memoria.
  - 🐍 **Python**: Sintaxis moderna, estructuras complejas y algoritmos.
  - 🌐 **JavaScript**: ES6+, manipulación DOM y asincronía.
  - ☕ **Java**: Programación orientada a objetos (POO) y patrones.
  - 🟢 **Node.js**: Servidores HTTP, Express y arquitectura backend.
  - 🦀 **Rust**: Control de memoria, ownership y concurrencia.
  - 🗄️ **SQL**: Consultas relacionales, JOINs y diseño de esquemas (vía `sql.js` en navegador).
  - 🎨 **HTML & CSS**: Maquetación web moderna, Flexbox, Grid y diseño responsivo.

- 💻 **Entorno de Código Integrado (IDE)**:
  - Editor basado en **Monaco Editor** con resaltado de sintaxis y autocompletado.
  - Sandbox de ejecución multi-lenguaje backend integrado a la API Piston (`/api/execute`).
  - Motor de base de datos SQLite embebido en navegador para ejercicios SQL.
  - Previsualización e inspección DOM en tiempo real para ejercicios de HTML/CSS.

- 🧪 **Evaluación Automatizada de Casos de Prueba**:
  - Validación instantánea contra múltiples inputs/outputs esperados.
  - Reporte claro de `stdout`, `stderr`, logs de compilación y tiempos de ejecución.

- 📊 **Motor de Rúbrica y Calificación Inteligente**:
  - **Funcionalidad (70%)**: Basada en casos de prueba superados.
  - **Eficiencia (20%)**: Penalización por exceso de reintentos o desbloqueo de pistas.
  - **Tiempo (10%)**: Bonificación por resolución dentro del tiempo estimado.
  - Progresión hasta proyectos integradores (**Capstone Projects**) de alta complejidad.

- 📜 **Generación y Verificación de Certificados PDF**:
  - Emisión de certificado oficial en PDF personalizado al completar el 100% del curso.
  - Asignación de código único de autenticidad **UUID** almacenado en la base de datos SQLite.
  - Módulo e API REST (`/api/certificates/verify/:uuid`) de verificación pública de validez.

---

## 💼 Modelo de Negocio (2026-08)

> **Los 8 cursos son 100% GRATUITOS para cualquier estudiante.** Se eliminó el
> gating de pago ("Acceso Completo / Solo 2 Cursos") y la pasarela bancaria.
> La plataforma se sostiene con **donaciones voluntarias (Ko-fi/PayPal)** y la
> **suscripción mensual de docentes**.

- 🆓 **Estudiantes**: acceso completo y gratuito a los 8 cursos, evaluaciones,
  reportes de nota final y certificado oficial PDF con UUID.
- ☕ **Donaciones**: botón "Invítanos un café" (navbar y footer) que abre los
  enlaces externos configurados en `/api/monetization-config` (Ko-fi y PayPal).
- 🎓 **Docentes Premium (suscripción mensual)**: entidad `Teacher` independiente
  de los estudiantes. El SuperAdmin activa la suscripción con **fecha de
  vencimiento** (`/api/admin/mark-teacher-subscription`). Mientras está activa, el
  docente puede:
  - Vincular alumnos a su cuenta (`/api/teacher/students`).
  - Monitorear el progreso y la nota final de **solo sus propios alumnos**
    (aislamiento validado en el backend).
  - Emitir **Reconocimientos** (`/api/teacher/recognitions`) cuando un alumno
    vinculado completa el 100% de un curso — documento PDF distinto del
    Certificado Oficial, con su propio código de autenticidad `REC-UUID`.
- 💳 **Planes de suscripción (2, configurables)**: los planes no están
  hardcodeados en el frontend — viven en la tabla `SubscriptionPlan` y el
  SuperAdmin los edita desde su panel (precio mensual/anual, moneda y límite de
  alumnos). Valores iniciales:
  - **Docente Individual** — $5 USD/mes o $50 USD/año, hasta **40 alumnos**.
  - **Institucional** — $15 USD/mes o $150 USD/año, hasta **200 alumnos**.
  - El **límite de alumnos se valida en el backend** (`POST /api/teacher/students`
    cuenta los alumnos vinculados y rechaza con `403 limitReached` al superar el
    límite del plan; el plan se puede cambiar al activar la suscripción).
- 🏠 **Landing page**: muestra una sección "Para Docentes e Instituciones" con
  los beneficios, los dos planes (datos reales de `/api/monetization-config`) y
  botones para crear la cuenta de docente o iniciar sesión.
- 🔒 **Seguridad**: cada endpoint `/teacher/*` valida en el backend que el usuario
  es `TEACHER` **y** que su suscripción está activa (no vencida). Una suscripción
  inactiva o vencida devuelve `403` con `subscriptionStatus: INACTIVE | EXPIRED`.

---

## 🧪 Probar el modelo de negocio en local

1. **Crear un Teacher**: en la landing page, sección "Para Docentes e
   Instituciones" → *Crear cuenta de docente* (nombre, correo, contraseña e
   institución). El endpoint `POST /api/teacher/register` crea la cuenta con
   suscripción `INACTIVE` y plan `INDIVIDUAL` (límite 40).
2. **Activar la suscripción (SuperAdmin)**: inicia sesión como SuperAdmin
   (`superadmin@quirozsystems.com`), abre el panel y en "Docentes Premium"
   escribe la **fecha de vencimiento** (ej: +30 días), elige el **plan**
   (Individual/Institucional) y pulsa **Activar**. El límite se ajusta
   automáticamente (40 o 200). El docente verá en `/api/teacher/me` su
   suscripción `ACTIVE`.
3. **Vincular alumnos**: el docente vincula alumnos por correo (creando la
   cuenta o enlazando una existente). Al superar el límite del plan, el backend
   responde `403 limitReached` (prueba con el plan Individual y >40 alumnos, o
   edita el límite en la tabla `SubscriptionPlan`).
4. **Emitir un Reconocimiento de prueba**: un alumno vinculado debe completar el
   100% de un curso (se valida con los mismos intentos aprobados del certificado
   oficial). En el Panel Docente → *Emitir Reconocimiento*, elige alumno, curso,
   título y mensaje opcional, y se descarga el PDF `REC-UUID` (documento distinto
   del Certificado Oficial UUID).
5. **Personalizar precios**: SuperAdmin → "Donaciones y Suscripción" edita los
   planes (precio mensual/anual, límite) y los enlaces Ko-fi/PayPal. Se reflejan
   en la landing page y en `/api/monetization-config`.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Monaco Editor** (`@monaco-editor/react`)
- **Framer Motion** (`motion`)
- **jsPDF** (Generación de certificados vectoriales en cliente)
- **SQL.js** (Motor SQLite en WebAssembly)
- **Lucide React** & **Canvas Confetti**

### Backend & Base de Datos
- **Express.js** + **TypeScript** (`tsx`)
- **Prisma ORM (v5)** + **SQLite** (`prisma/dev.db`)
- **Piston API / Engine** (Sandbox de ejecución segura de código)
- **Node.js**

---

## 📁 Estructura del Proyecto Desacoplada

```text
quiroz-systems/
├── backend/                # SERVIDOR BACKEND EXPRES (PUERTO 4000)
│   ├── routes/
│   │   ├── execute.ts      # API Sandbox de Ejecución Remota Piston
│   │   ├── certificates.ts # API Emisión, Verificación UUID y Listado
│   │   ├── profile.ts      # API Gestión de Perfil de Estudiante
│   │   ├── progress.ts     # API Persistencia de Avance e Intentos
│   │   ├── auth.ts         # API Registro/Login/Sesión (cookie HttpOnly + Bearer)
│   │   ├── teacher.ts      # API Docentes Premium (suscripción, alumnos, reconocimientos)
│   │   ├── monetization.ts # API Pública de donaciones Ko-fi/PayPal
│   │   └── admin.ts        # API Admin (docentes, instituciones, suscripciones)
│   ├── middleware/auth.ts  # authRequired + requireRole + requireActiveSubscription
│   ├── db.ts               # Cliente Singleton de Prisma ORM
│   └── index.ts            # Servidor Express API independiente con CORS
│
├── prisma/
│   ├── schema.prisma       # Modelos relacionales de SQLite (incl. Teacher, Recognition)
│   └── dev.db              # Base de datos SQLite local
│
├── src/                    # FRONTEND CLIENTE VITE + REACT (PUERTO 5173)
│   ├── components/         # Componentes UI React (incl. TeacherDashboard, CoffeeSupportModal)
│   ├── data/               # Lecciones y casos de prueba por lenguaje
│   ├── lib/                # Utilidades PDF, Rubric, SQL runner, Sync y Reconocimientos
│   ├── App.tsx             # Componente raíz y navegación por pestañas
│   └── index.css           # Configuración de Tailwind CSS y fuentes
│
├── tests/                  # Tests e2e (certificados, docentes/suscripción, salud, specs)
├── vite.config.ts          # Configuración del proxy /api -> http://localhost:4000
└── package.json            # Scripts de NPM desacoplados
```

---

## 🚀 Instalación y Ejecución Local

### Requisitos Previos
- **Node.js** (v18 o superior)
- **npm** o **bun**

### Pasos

1. **Instalar dependencias e inicializar base de datos**:
   ```bash
   npm install
   npx prisma db push
   ```

2. **Ejecutar Frontend y Backend simultáneamente**:
   ```bash
   npm run dev
   ```
   - **Frontend UI**: [http://localhost:5173](http://localhost:5173)
   - **Backend REST API**: [http://localhost:4000/api/health](http://localhost:4000/api/health)

3. **O bien, ejecutar por separado**:
   ```bash
   # Servidor Backend API (Puerto 4000)
   npm run dev:backend

   # Cliente Frontend Vite (Puerto 5173)
   npm run dev:frontend
   ```

---

## 📜 Scripts Disponibles

- `npm run dev`: Ejecuta en paralelo el Backend API (`:4000`) y el Frontend Vite (`:5173`).
- `npm run dev:backend`: Ejecuta el servidor API Express en puerto `4000`.
- `npm run dev:frontend`: Ejecuta el cliente Vite en puerto `5173`.
- `npm run build`: Compila la aplicación cliente con Vite y empaqueta el servidor backend con `esbuild` hacia `dist/server.cjs`.
- `npm run start`: Inicia el servidor optimizado para producción (`node dist/server.cjs`).
- `npm run lint`: Ejecuta el verificador de tipos de TypeScript (`tsc --noEmit`).
- `npm test`: Ejecuta los tests e2e (certificados, salud, specs y modelo de negocio/docentes) sobre una SQLite temporal por suite.

---

## 🔌 API Endpoints (Backend REST API)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/execute` | Ejecuta código remoto en sandbox contra casos de prueba. |
| `GET`  | `/api/profile` | Obtiene el perfil del estudiante desde SQLite. |
| `POST` | `/api/profile` | Crea o actualiza el perfil del estudiante en SQLite. |
| `GET`  | `/api/progress/:courseId` | Obtiene el progreso y los intentos del curso desde SQLite. |
| `POST` | `/api/progress` | Guarda avances e intentos de lecciones en SQLite. |
| `POST` | `/api/certificates/issue` | Emite y registra un nuevo certificado con UUID en SQLite. |
| `GET`  | `/api/certificates/verify/:uuid` | Verifica la validez de un certificado por UUID en SQLite. |
| `POST` | `/api/teacher/register` | Crea una cuenta de docente premium (suscripción INACTIVA). |
| `POST` | `/api/teacher/login` | Inicia sesión del docente premium y emite sesión. |
| `GET`  | `/api/teacher/me` | Estado de la suscripción del docente autenticado. |
| `POST` | `/api/teacher/students` | Vincula/crea un alumno perteneciente a este docente (suscripción activa, valida límite del plan). |
| `GET`  | `/api/teacher/students` | Lista SOLO los alumnos de este docente con progreso y nota final. |
| `POST` | `/api/teacher/recognitions` | Emite un Reconocimiento (100% real del curso, alumno vinculado). |
| `GET`  | `/api/monetization-config` | Configuración pública: donaciones Ko-fi/PayPal, precio informativo y planes de suscripción. |
| `GET`  | `/api/admin/teachers` | Lista docentes premium con estado, plan y límite de alumnos (SuperAdmin). |
| `POST` | `/api/admin/mark-teacher-subscription` | Activa/desactiva la suscripción con fecha de vencimiento y plan (SuperAdmin). |
| `POST` | `/api/admin/monetization-config` | Edita enlaces de donación, precio y planes de suscripción (SuperAdmin). |

> Los endpoints de pago antiguos (`/api/admin/payments`, `/api/admin/mark-paid`,
> `/api/admin/payment-config`, `/api/admin/student-assigned-courses`) fueron
> **eliminados**: ya no existe gating de pago en la plataforma.

---

## 📄 Licencia

© 2026 **Quiroz Systems**. Todos los derechos reservados. Plataforma Educativa de Software.
