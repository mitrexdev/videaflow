"""Stage 2 of the pipeline: script → SceneBreakdownOutput (storyboard)."""
import json

from pydantic import ValidationError

from orchestrator.routing.router import ProviderRouter
from orchestrator.schemas.scene import SceneBreakdownOutput

SYSTEM_PROMPT = """You are Videaflow's director. You break narration scripts into
visual scenes. Output ONLY valid JSON. Every scene gets: a narration chunk (the
exact spoken lines for that scene, 1-4 short sentences), a vivid image-generation
prompt, a shot type, a camera move, a transition, and an estimated duration."""

USER_TEMPLATE = """Break the following script into visual scenes.

TITLE: {title}
SCRIPT:
{script}

ASPECT RATIO: {aspect_ratio}
Total target length: {duration_seconds}s

Rules:
- Scenes must follow the script word-for-word in order (never rewrite narration).
- 4-10 seconds per scene depending on content density.
- Include a style_token that is appended to every visual prompt for consistency.
- Visual prompts: subject + action + environment + lighting + style; no text or
  watermark keywords.

Respond with JSON only."""

MAX_RETRIES = 3


class SceneGenerationFailed(Exception):
    """Raised when the LLM could not produce a schema-valid scene breakdown."""


async def generate_scenes(
    router: ProviderRouter,
    *,
    title: str,
    script: str,
    aspect_ratio: str = "16:9",
    duration_seconds: int = 60,
    model: str | None = None,
) -> SceneBreakdownOutput:
    prompt = USER_TEMPLATE.format(
        title=title,
        script=script,
        aspect_ratio=aspect_ratio,
        duration_seconds=duration_seconds,
    )

    last_error: Exception | None = None
    for _ in range(MAX_RETRIES):
        try:
            result = await router.complete_llm(
                prompt,
                system=SYSTEM_PROMPT,
                json_mode=True,
                temperature=0.4,
                model=model,
            )
            data = json.loads(result.output)
            return SceneBreakdownOutput.model_validate(data)
        except (json.JSONDecodeError, ValidationError) as exc:
            last_error = exc
            continue

    raise SceneGenerationFailed(
        f"Could not produce a valid scene breakdown after {MAX_RETRIES} attempts: "
        f"{last_error}"
    )
