"""Stage 1 of the pipeline: topic/idea → ScriptOutput."""
import json

from pydantic import ValidationError

from orchestrator.routing.router import ProviderRouter
from orchestrator.schemas.script import ScriptOutput

SYSTEM_PROMPT = """You are Videaflow's senior creative scriptwriter. You write tight,
engaging narration scripts for short-form and long-form video. Output ONLY valid
JSON matching the requested schema. Keep sentences short and spoken-friendly —
they will be read aloud by a TTS voice."""

USER_TEMPLATE = """Write a complete video script about the following topic/idea.

Topic: {topic}
Target length: {duration_seconds} seconds
Format: {format}
Platform: {platform}

Requirements:
- Start with a strong hook.
- Keep the narration conversational and punchy.
- End with a clear call-to-action.
- Estimate the final duration accurately.

Respond with JSON only."""

MAX_RETRIES = 3


class ScriptGenerationFailed(Exception):
    """Raised when the LLM could not produce a schema-valid script."""


async def generate_script(
    router: ProviderRouter,
    *,
    topic: str,
    duration_seconds: int = 60,
    format: str = "shorts",
    platform: str = "YouTube Shorts",
    model: str | None = None,
) -> ScriptOutput:
    prompt = USER_TEMPLATE.format(
        topic=topic,
        duration_seconds=duration_seconds,
        format=format,
        platform=platform,
    )

    last_error: Exception | None = None
    for _ in range(MAX_RETRIES):
        try:
            result = await router.complete_llm(
                prompt,
                system=SYSTEM_PROMPT,
                json_mode=True,
                temperature=0.7,
                model=model,
            )
            data = json.loads(result.output)
            return ScriptOutput.model_validate(data)
        except (json.JSONDecodeError, ValidationError) as exc:
            last_error = exc
            continue

    raise ScriptGenerationFailed(
        f"Could not produce a valid script after {MAX_RETRIES} attempts: {last_error}"
    )
