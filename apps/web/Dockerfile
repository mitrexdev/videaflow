# syntax=docker/dockerfile:1
# Build context must be the repo root:
#   docker build -f apps/web/Dockerfile .
# Next.js standalone output — run with `node server.js`.

FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY pnpm-workspace.yaml package.json turbo.json pnpm-lock.yaml ./
COPY packages/ ./packages/
COPY apps/web/ ./apps/web/
RUN corepack enable && pnpm install --frozen-lockfile --filter @videaflow/web

FROM node:22-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/ .
RUN corepack enable && pnpm --filter @videaflow/web build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
