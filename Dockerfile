# =====================================================================
# Quiroz Systems — Dockerfile multi-stage
# Fase C5: compila el frontend (Vite) y el backend (esbuild) en un stage
# de build, y genera una imagen de runtime mínima que sirve BOTH en el
# puerto 4000 (API + estáticos). El frontend build es servido por Express.
# =====================================================================

# ---- Stage 1: build ----
FROM node:20-alpine AS build
WORKDIR /app

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
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

# Solo dependencias de producción + cliente Prisma regenerado.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npx prisma generate

# Copia el build completo: frontend estático + server bundle.
COPY --from=build /app/dist ./dist
COPY prisma ./prisma

EXPOSE 4000
CMD ["node", "dist/server.cjs"]