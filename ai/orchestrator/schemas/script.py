from pydantic import BaseModel, Field


class ScriptOutput(BaseModel):
    """Structured script produced by the AI stage."""

    title: str = Field(description="Working title for the video")
    script: str = Field(description="Full narration script, ready to split into scenes")
    hook: str = Field(description="The opening hook line")
    cta: str = Field(description="The closing call-to-action")
    estimated_duration_seconds: int = Field(
        default=60, description="Rough target length in seconds"
    )
