from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# This file: services/worker/app/core/config.py → repo root is 4 parents up.
REPO_ROOT = Path(__file__).resolve().parents[4]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=REPO_ROOT / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    celery_broker_url: str = "redis://localhost:6379/1"
    celery_result_backend: str = "redis://localhost:6379/2"

    # How long a single task may run before being killed (safety net).
    task_time_limit: int = 300
    task_soft_time_limit: int = 240


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
