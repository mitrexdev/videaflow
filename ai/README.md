# Videaflow AI Orchestrator

Python library powering all AI work. Imported by `services/worker` (and the API
for cost estimates). **Never call a provider SDK directly from API routes or
workers** — always go through a capability interface so providers stay swappable.

## Layout

```
orchestrator/
  providers/          # capability interfaces + implementations
    base.py           #   ProviderCallResult, ProviderUnavailableError
    llm/              #   LLM interface + LiteLLM / OpenAI / Anthropic / Gemini
    image/            #   (Phase 2) image generation
    video/            #   (Phase 2) video generation
    tts/              #   (Phase 2) text-to-speech
    stt/              #   (Phase 2) speech-to-text
  routing/router.py   # registry + failover chain (provider swapping = config)
  schemas/            # Pydantic output contracts per pipeline stage
  workflows/          # typed pipeline stages (script → scenes → assets → …)
  costing/            # USD estimate table + credit math
```

## Rules

1. Every provider call returns `ProviderCallResult` and **records cost**.
2. Transient failures raise `ProviderUnavailableError` so the router can fail over.
3. Structured outputs (Script, SceneBreakdown) are validated with Pydantic and
   retried on schema mismatch — never passed downstream unvalidated.
