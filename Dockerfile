# =====================================================================
# Quiroz Systems — Dockerfile multi-stage (Node 22 LTS Alpine)
# Fase C5: compila frontend (Vite) y backend (esbuild) en build stage.
# Runtime stage mínimo que sirve API + Frontend estático.
# =====================================================================

# ---- Stage 1: build ----
FROM node:22-alpine AS build
WORKDIR /app

# Instala librerías nativas requeridas por Prisma en Alpine
RUN apk add --no-cache openssl libc6-compat

# Dependencias primero (aprovecha caché de capas).
COPY package.json package-lock.json ./
RUN npm ci

# Genera el cliente Prisma antes de compilar el backend.
COPY prisma ./prisma
RUN npx prisma generate

# Código fuente.
COPY . .

# Compila frontend (Vite -> dist/public/) y backend (esbuild -> dist/server.cjs).
RUN npm run build:frontend && npm run build:backend

# ---- Stage 2: runtime ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

# Instala librerías nativas requeridas por Prisma y compiladores locales para los cursos
RUN apk add --no-cache openssl libc6-compat python3 g++ gcc libstdc++ make openjdk17-jdk rust

# Copia dependencias y esquema Prisma antes de generar el cliente
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Solo dependencias de producción + cliente Prisma regenerado.
RUN npm ci --omit=dev && npx prisma generate

# Copia el build completo: frontend estático + server bundle.
COPY --from=build /app/dist ./dist
COPY specs ./specs

EXPOSE 4000
CMD ["node", "dist/server.cjs"]