# Guía de Despliegue en Railway — Quiroz Systems

Esta guía detalla los pasos para desplegar **Quiroz Systems** en [Railway](https://railway.app) de forma rápida y segura.

---

## 🚀 Despliegue Rápido (3 Pasos)

### 1. Conectar tu Repositorio en Railway
1. Inicia sesión en [Railway.app](https://railway.app).
2. Haz clic en **+ New Project** -> **Deploy from GitHub repo**.
3. Selecciona el repositorio de `quiroz-systems`.
4. Railway detectará automáticamente el archivo [`railway.json`](file:///home/quirozdev/Proyectos/quiroz-systems/railway.json) y el [`Dockerfile`](file:///home/quirozdev/Proyectos/quiroz-systems/Dockerfile) multi-stage.

---

### 2. Configurar Variables de Entorno en Railway
En tu proyecto de Railway, ve a la pestaña **Variables** del servicio y añade:

| Variable | Valor / Descripción | Requerido |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Sí |
| `DATABASE_URL` | `file:./prisma/dev.db` *(o URL de PostgreSQL)* | Sí |
| `CORS_ORIGINS` | `https://${{RAILWAY_PUBLIC_DOMAIN}},http://localhost:4000` | Recomendado |
| `GEMINI_API_KEY` | Tu API Key de Google Gemini (si usas tutor con IA) | Opcional |
| `PISTON_URL` | URL de tu instancia de Piston (ver sección abajo) | Opcional (para runner externo) |
| `SENTRY_DSN` | DSN de Sentry para monitoreo de errores | Opcional |

> **Nota sobre el puerto**: Railway inyecta automáticamente la variable `PORT`. El backend Express ya está configurado para escuchar en `process.env.PORT`.

---

### 3. Generar Dominio Público
1. En Railway, ve a **Settings** -> **Networking**.
2. Haz clic en **Generate Domain** (te asignará algo como `quiroz-systems-production.up.railway.app`).
3. ¡Listo! Al ingresar a esa URL verás la plataforma funcionando con frontend y backend unificados.

---

## 💾 Persistencia de Datos con SQLite o PostgreSQL

### Opción A: SQLite con Railway Volume (Más simple)
1. En el servicio de tu app en Railway, ve a **Settings** -> **Volumes**.
2. Haz clic en **+ New Volume** y monta la ruta del volumen en:
   - **Mount Path**: `/app/prisma`
3. Esto garantizará que el archivo `dev.db` no se borre tras nuevos despliegues.

### Opción B: PostgreSQL en Railway (Producción recomendada)
1. En tu proyecto de Railway, haz clic en **+ New** -> **Database** -> **Add PostgreSQL**.
2. En las variables de tu aplicación, vincula `DATABASE_URL` con la referencia de Railway: `${{Postgres.DATABASE_URL}}`.

---

## ⚡ (Opcional) Sandbox de Ejecución de Código: Piston en Railway

Si deseas ejecutar código de usuarios de forma aislada:
1. En el mismo proyecto de Railway, haz clic en **+ New** -> **Docker Image**.
2. Imagen: `ghcr.io/engineer-man/piston:latest`
3. En el servicio principal de Quiroz Systems, define la variable:
   `PISTON_URL=http://${{piston.RAILWAY_PRIVATE_DOMAIN}}:2000`

---

## 🔍 Verificación de Salud (Healthcheck)
Railway monitorea automáticamente la salud del servicio mediante:
- **Endpoint**: `/api/health`
- Devuelve estado de conexión de base de datos, uptime y uso de memoria.
