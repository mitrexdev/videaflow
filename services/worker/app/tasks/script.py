"""Script generation task: topic → structured ScriptOutput."""
import asyncio
import json
import logging

from celery import Task

from app.celery_app import celery_app
from orchestrator.routing.router import ProviderRouter, create_default_router
from orchestrator.workflows.script_generation import ScriptGenerationFailed, generate_script

logger = logging.getLogger(__name__)

_router: ProviderRouter | None = None


def get_router() -> ProviderRouter:
    global _router
    if _router is None:
        _router = create_default_router()
    return _router


class ScriptTask(Task):
    """Retries only transient provider failures; validation errors fail fast."""

    autoretry_for = (ScriptGenerationFailed,)
    retry_kwargs = {"max_retries": 3, "countdown": 5}
    name = "app.tasks.script.generate"


@celery_app.task(base=ScriptTask, name="app.tasks.script.generate")
def generate_script_task(
    topic: str,
    duration_seconds: int = 60,
    format: str = "shorts",
    platform: str = "YouTube Shorts",
) -> dict:
    logger.info("Generating script: topic=%r duration=%ss", topic, duration_seconds)
    script = asyncio.run(
        generate_script(
            get_router(),
            topic=topic,
            duration_seconds=duration_seconds,
            format=format,
            platform=platform,
        )
    )
    logger.info("Script generated: title=%r", script.title)
    return json.loads(script.model_dump_json())
