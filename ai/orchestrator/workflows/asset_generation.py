"""Asset generation stage (Phase 2).

After the storyboard review gate, this stage generates per-scene visuals
(image or video), voiceover audio, and captions — in parallel, with progress
events. Placeholder here so the module boundary is visible; implementation
lands with the image/TTS/STT providers.
"""


async def generate_scene_assets(
    *,
    project_id: str,
    scene: dict,
    style_token: str,
    voice_id: str,
) -> dict:
    """Generate image/video + voiceover for a single scene.

    Phase 2: call the image/video provider + TTS provider, persist assets,
    emit progress, and update the scene record.
    """
    raise NotImplementedError("Phase 2: asset generation")


async def generate_captions(*, audio_asset_id: str, language: str = "en") -> dict:
    """Transcribe a stitched voiceover into word-level caption segments."""
    raise NotImplementedError("Phase 2: captions via STT")
