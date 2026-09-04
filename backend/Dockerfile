# Stage 1: Build Dependencies (Dev + Prod)
FROM node:24-alpine AS build-deps

RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache libc6-compat build-base python3 openssl

RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
COPY backend/prisma ./backend/prisma/
COPY backend/prisma.config.ts ./backend/
COPY scripts ./scripts/

ENV CI=true

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

RUN pnpm --filter backend exec prisma generate

# Stage 2: Builder
FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

WORKDIR /app

COPY --from=build-deps /app ./
COPY tsconfig.base.json* nx.json* ./
COPY backend ./backend
COPY frontend ./frontend

RUN pnpm --filter backend build

# Stage 3: Production Dependencies Only
FROM node:24-alpine AS prod-deps

RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache libc6-compat build-base python3 openssl

RUN corepack enable && corepack prepare pnpm@10.5.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
COPY backend/prisma ./backend/prisma/
COPY backend/prisma.config.ts ./backend/
COPY scripts ./scripts/

ENV CI=true

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prod

RUN pnpm --filter backend exec prisma generate

# Stage 4: Production Runtime
FROM node:24-alpine AS production

RUN --mount=type=cache,target=/var/cache/apk \
    apk add --no-cache tini openssl libc6-compat

RUN addgroup --system --gid 1000 appgroup && adduser --system --uid 1000 --ingroup appgroup appuser
WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY backend/package.json ./backend/

ENV NODE_ENV=production NODE_OPTIONS="--max-old-space-size=2048 --expose-gc" PORT=7860
ENV PATH="/app/backend/node_modules/.bin:/app/node_modules/.bin:${PATH}"
ENV NODE_PATH="/app/node_modules:/app/backend/node_modules"

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/backend/node_modules ./backend/node_modules
RUN if [ -d ./backend/node_modules ]; then cp -rn ./backend/node_modules/* ./node_modules/ 2>/dev/null || true; fi
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=prod-deps /app/backend/prisma ./backend/prisma
COPY --from=prod-deps /app/backend/prisma.config.ts ./backend/prisma.config.ts
COPY --from=builder /app/scripts/db/backup-db.sh ./scripts/db/backup-db.sh

RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 7860 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["sh", "-c", "export NODE_OPTIONS=$(echo \"${NODE_OPTIONS:-}\" | sed 's/--optimize-for-size//g'); export DIRECT_URL=\"${DIRECT_URL:-$DATABASE_URL}\"; export DATABASE_URL=\"${DATABASE_URL}\"; if [ -n \"$DATABASE_URL\" ] && [ \"$AUTO_MIGRATE\" != \"false\" ]; then echo '🚀 Applying Prisma database migrations via Direct URL...'; npx prisma migrate deploy --schema=./backend/prisma/schema.prisma; fi; if [ -f backend/dist/backend/src/main.js ]; then node backend/dist/backend/src/main; elif [ -f backend/dist/src/main.js ]; then node backend/dist/src/main; else node backend/dist/main; fi"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD sh -c "export NODE_OPTIONS=\$(echo \"\${NODE_OPTIONS:-}\" | sed 's/--optimize-for-size//g'); node -e \"require('http').get('http://localhost:' + (process.env.PORT || 7860) + '/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))\""