# Videaflow

**AI-powered creator operating system** — from a single idea to a complete, publish-ready video package.

## What it does

Idea → Script → Scenes → Storyboard → Visuals → Voice → Captions → Music → Video → Export.

Give Videaflow a topic (or paste your own script) and it writes the script, splits it into scenes,
generates visuals and voiceover, adds captions and music, and renders an MP4 for YouTube, Shorts,
Reels, or TikTok.

## Architecture (modular monolith)

```
apps/web          Next.js 15 (App Router) — marketing, dashboard, editor. BFF only, never touches Postgres.
services/api      FastAPI — REST /v1, SSE progress, webhooks. Owns the database.
services/worker   Celery — ai-gen queue: script, scenes, image, TTS, captions.
services/render   Node/Remotion + FFmpeg — composition + rendering.
ai/orchestrator   Python lib — swappable AI providers (LLM/image/video/TTS/STT) + workflows + costing.
packages/         video-schema (zod contracts), api-client, ui, tsconfig, eslint-config.
infrastructure/   docker-compose (dev), Dockerfiles, nginx, terraform.
```

Every AI capability sits behind a capability interface with a registry + failover chain — providers
are swapped via config, not refactors. See `docs/architecture/`.

## Tech stack

Next.js 15 · TypeScript · Tailwind v4 · FastAPI · SQLAlchemy 2 (async) · PostgreSQL 16 · Redis ·
Celery · Remotion · FFmpeg · LiteLLM · Cloudflare R2 (S3-compatible) · Clerk (auth) · Stripe (billing).

## Getting started

```bash
# 1. Bootstrap (Python venv + editable installs + JS deps)
./scripts/setup.sh

# 2. Configure env
cp .env.example .env          # fill in API keys as needed

# 3. Start Postgres + Redis, migrate, run api + worker + web
./scripts/dev.sh
```

Services:
- Web: http://localhost:3000
- API docs: http://localhost:8000/docs (OpenAPI)
- Health: http://localhost:8000/healthz

> Without Clerk keys configured, the API uses a DEV identity and auto-seeds a dev tenant so the
> skeleton runs out of the box. Never run production without Clerk configured.

## Try the async pipeline

```bash
source .venv/bin/activate
cd services/api
python -c "from app.core.queue import enqueue; print(enqueue('app.tasks.script.generate', ('history of AI',)))"
```

(Requires an LLM API key in `.env` — e.g. `ANTHROPIC_API_KEY`.)

## Status

Phase 0–1 foundation complete (walking skeleton): monorepo, DB schema + migrations, FastAPI CRUD,
AI orchestrator with provider abstraction, Celery worker, Remotion render skeleton, marketing site
(landing/features/pricing), and **Clerk auth** — themed sign-in/sign-up pages, protected
dashboard/editor routes, Clerk webhook → Postgres user/org sync, JWT verification in the API.
Next: the script → storyboard → render vertical slice end-to-end (generation API + assets).
