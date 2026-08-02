"""Scene breakdown task: script → SceneBreakdownOutput (storyboard)."""
import asyncio
import json
import logging

from celery import Task

from app.celery_app import celery_app
from app.tasks.script import get_router
from orchestrator.workflows.scene_generation import SceneGenerationFailed, generate_scenes

logger = logging.getLogger(__name__)


class ScenesTask(Task):
    autoretry_for = (SceneGenerationFailed,)
    retry_kwargs = {"max_retries": 3, "countdown": 5}
    name = "app.tasks.scenes.generate"


@celery_app.task(base=ScenesTask, name="app.tasks.scenes.generate")
def generate_scenes_task(
    title: str,
    script: str,
    aspect_ratio: str = "16:9",
    duration_seconds: int = 60,
) -> dict:
    logger.info("Breaking script into scenes: title=%r", title)
    breakdown = asyncio.run(
        generate_scenes(
            get_router(),
            title=title,
            script=script,
            aspect_ratio=aspect_ratio,
            duration_seconds=duration_seconds,
        )
    )
    logger.info("Scene breakdown complete: %d scenes", len(breakdown.scenes))
    return json.loads(breakdown.model_dump_json())
