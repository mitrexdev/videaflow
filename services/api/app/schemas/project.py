import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

ASPECT_RATIOS = r"^(16:9|9:16|1:1|4:5)$"


class ProjectCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    aspect_ratio: str = Field(default="16:9", pattern=ASPECT_RATIOS)


class ProjectRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    status: str
    aspect_ratio: str
    fps: int
    duration_ms: int
    preview_url: str | None
    cover_url: str | None
    created_at: datetime
    updated_at: datetime
