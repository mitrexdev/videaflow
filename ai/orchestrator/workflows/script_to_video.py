"""End-to-end pipeline: topic → script → scene breakdown.

Phase 2 extends this with: storyboard approval gate → per-scene asset
generation (image/video + voiceover) → captions → render.

Single-scene regeneration is just re-running one stage, never the whole job —
this is why stages are separate, typed, persisted records.
"""
from orchestrator.routing.router import ProviderRouter
from orchestrator.workflows.scene_generation import generate_scenes
from orchestrator.workflows.script_generation import generate_script


async def script_to_scenes(
    router: ProviderRouter,
    *,
    topic: str,
    duration_seconds: int = 60,
    format: str = "shorts",
    platform: str = "YouTube Shorts",
    aspect_ratio: str = "16:9",
) -> dict:
    script = await generate_script(
        router,
        topic=topic,
        duration_seconds=duration_seconds,
        format=format,
        platform=platform,
    )
    scenes = await generate_scenes(
        router,
        title=script.title,
        script=script.script,
        aspect_ratio=aspect_ratio,
        duration_seconds=duration_seconds,
    )
    return {"script": script.model_dump(), "scenes": scenes.model_dump()}
