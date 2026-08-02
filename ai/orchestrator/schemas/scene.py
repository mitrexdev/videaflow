from pydantic import BaseModel, Field


class SceneOutput(BaseModel):
    """One visual scene. narration is the exact spoken lines for that scene."""

    position: int = Field(description="0-based scene order")
    narration: str = Field(description="Exact voiceover lines for this scene")
    visual_prompt: str = Field(
        description="Image/video prompt: subject + action + environment + lighting + style"
    )
    shot_type: str | None = Field(default=None, description="close-up, wide, aerial, …")
    camera_instruction: str | None = Field(
        default=None, description="slow push-in, static, pan, …"
    )
    transition: str = Field(default="cut", description="cut, fade, dissolve, zoom")
    estimated_duration_seconds: int = Field(default=4)


class SceneBreakdownOutput(BaseModel):
    scenes: list[SceneOutput]
    style_token: str = Field(
        description="Reusable style descriptor appended to every visual prompt for consistency"
    )
