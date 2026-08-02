"""Central cost table: estimates credit consumption per kind of work.

Values are best-effort USD estimates; actual spend is metered at the provider
boundary (see providers/base.py) and stored in usage_meter. 1 credit = $0.01.

Keep this table in sync with real provider pricing as models/prices change.
"""
from __future__ import annotations

CREDIT_VALUE_USD = 0.01

ESTIMATES_USD: dict[str, float] = {
    "script": 0.001,             # one short structured LLM call
    "scene_breakdown": 0.002,    # one structured LLM call over the script
    "image": 0.04,               # 1 image (flux-schnell ~$0.003, flux-dev ~$0.04)
    "video": 0.25,               # 5s 720p AI video — recheck per provider
    "voiceover": 0.002,          # per ~100 chars via a mid-tier TTS
    "captions": 0.001,           # whisper on ~60s of audio
    "music": 0.0,                # library track, not AI
    "render_720p_60s": 0.10,     # remotion/ffmpeg compute on a CPU worker
    "render_1080p_60s": 0.30,
}


def estimate_credits(kind: str, units: float = 1.0) -> int:
    """Estimated credits for `units` of `kind` (round up, min 1)."""
    cost = ESTIMATES_USD.get(kind, 0.0) * units
    return max(1, round(cost / CREDIT_VALUE_USD))
