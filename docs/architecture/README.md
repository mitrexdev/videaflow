# Architecture

Videaflow is a **modular monolith**: one codebase, four deployables, split into services only
when a module genuinely needs independent scaling.

## The rule that keeps providers swappable

Every AI capability (LLM, image, video, TTS, STT) lives behind a capability interface
(`ai/orchestrator/providers/`). A registry + router (`ai/orchestrator/routing/router.py`) owns
the provider chain and failover. Swapping providers is a config change, never a refactor.

## Data flow

```
Browser → Next.js (BFF) → FastAPI (/v1) → Celery queue → Worker (Python) → AI providers
                                     → Render service (Node/Remotion) → R2 → CDN
```

## Non-negotiables

1. **FastAPI owns the database.** Next.js never queries Postgres directly.
2. **Duration comes from audio, not the LLM.** Scene length is measured from the generated
   voiceover (`ffprobe`), never guessed.
3. **Human-in-the-loop at cost gates.** Scene + storyboard are reviewed before assets generate.
4. **Every provider call records cost.** `usage_meter` is the credit system's source of truth.
5. **Every query is org-scoped.** `Identity.org_id` filters every SQL statement.

## Key decisions

| Decision | Choice | Why |
|---|---|---|
| Real-time updates | SSE (not WebSockets) | One-way stream, auto-reconnect, works through proxies |
| Storage | Cloudflare R2 | S3-compatible, zero egress — the big cost lever for video |
| LLM routing | LiteLLM | One seam over OpenAI/Anthropic/Gemini/Qwen/local |
| Render | Remotion composition + FFmpeg media ops | Editor/renderer share one mental model |
| Jobs | Celery + Redis | `ai-gen` queue (Python) + `render` queue (Node service) |
| Auth | Clerk → JWT verified in FastAPI | Identity is Clerk's job; product data is ours |
| Billing | Credit wallet + ledger + meter | Reserve → meter → settle; balance derived from ledger |

## Services to carve out first (when scaling demands)

1. `services/render` (already separate — GPU/CPU hungry)
2. `services/worker` (queue backlog)
3. API read replicas (dashboard reads)

See `docs/ai-pipeline/` for the generation pipeline and `docs/video-schema/` for contracts.
