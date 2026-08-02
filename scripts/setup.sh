#!/usr/bin/env bash
# One-time bootstrap: Python venv + editable installs + JS deps.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Creating Python venv (.venv)"
python3 -m venv .venv
# shellcheck disable=SC1091
source .venv/bin/activate

echo "==> Installing Python packages (editable: ai, api, worker)"
pip install --upgrade pip
pip install -e ai -e services/api -e services/worker

echo "==> Installing JS packages (pnpm)"
pnpm install

echo ""
echo "==> Done."
echo "    Next steps:"
echo "    - copy .env.example -> .env  (cp .env.example .env)"
echo "    - ./scripts/dev.sh          (starts postgres+redis, migrates, runs services)"
