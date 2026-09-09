# =====================================================================
# Quiroz Systems — Dockerfile multi-stage
# Fase C5: compila el frontend (Vite) y el backend (esbuild) en un stage
# de build, y genera una imagen de runtime mínima que sirve BOTH en el
# puerto 4000 (API + estáticos). El frontend build es servido por Express.
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

# Instala librerías nativas requeridas por Prisma en Alpine
RUN apk add --no-cache openssl libc6-compat

# Copia dependencias y esquema Prisma antes de generar el cliente
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Solo dependencias de producción + cliente Prisma regenerado.
RUN npm ci --omit=dev && npx prisma generate

# Copia el build completo: frontend estático + server bundle.
COPY --from=build /app/dist ./dist

EXPOSE 4000
CMD ["node", "dist/server.cjs"]