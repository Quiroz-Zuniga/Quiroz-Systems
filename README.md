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
│   │   └── progress.ts     # API Persistencia de Avance e Intentos
│   ├── db.ts               # Cliente Singleton de Prisma ORM
│   └── index.ts            # Servidor Express API independiente con CORS
│
├── prisma/
│   ├── schema.prisma       # Modelos relacionales de SQLite
│   └── dev.db              # Base de datos SQLite local
│
├── src/                    # FRONTEND CLIENTE VITE + REACT (PUERTO 5173)
│   ├── components/         # Componentes UI React en Tema Claro
│   ├── data/               # Lecciones y casos de prueba por lenguaje
│   ├── lib/                # Utilidades PDF, Rubric, SQL runner y Sync
│   ├── App.tsx             # Componente raíz y navegación por pestañas
│   └── index.css           # Configuración de Tailwind CSS y fuentes
│
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

---

## 📄 Licencia

© 2026 **Quiroz Systems**. Todos los derechos reservados. Plataforma Educativa de Software.
