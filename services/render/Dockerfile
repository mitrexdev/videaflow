# syntax=docker/dockerfile:1
# Build context must be the repo root:
#   docker build -f services/render/Dockerfile .
# Phase 2: production packaging (bundle once, slim image). For dev/preview,
# run `pnpm preview` / `pnpm render` from services/render.
FROM node:22-bookworm-slim

# Headless Chrome + fonts + ffmpeg required by Remotion rendering.
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-noto-color-emoji \
    fonts-noto-cjk \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

ENV REMOTION_BROWSER_EXECUTABLE=/usr/bin/chromium
ENV NODE_ENV=production

WORKDIR /app
COPY pnpm-workspace.yaml package.json turbo.json ./
COPY packages/ ./packages/
COPY services/render/ ./services/render/

RUN corepack enable
RUN pnpm install --filter @videaflow/render

WORKDIR /app/services/render
CMD ["pnpm", "render"]
