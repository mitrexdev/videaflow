#!/usr/bin/env bash
# Dev orchestration: infra up, migrate, run api + worker + web.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -d .venv ]]; then
  echo "No .venv found — run ./scripts/setup.sh first." >&2
  exit 1
fi

echo "==> Starting Postgres + Redis via docker compose"
docker compose -f infrastructure/docker/docker-compose.dev.yml up -d postgres redis

# shellcheck disable=SC1091
source .venv/bin/activate

echo "==> Running migrations"
(cd services/api && alembic upgrade head)

echo "==> Starting services (ctrl-c stops all)"
trap 'kill 0' EXIT

(cd services/api && uvicorn app.main:app --reload --port 8000) &
(cd services/worker && celery -A app.celery_app:celery_app worker -Q ai-gen --loglevel=info) &
(cd apps/web && pnpm dev) &

wait
