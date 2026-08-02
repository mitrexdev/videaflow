from functools import lru_cache
from pathlib import Path
from urllib.parse import urlsplit

from pydantic_settings import BaseSettings, SettingsConfigDict

# This file: services/api/app/core/config.py → repo root is 4 parents up.
REPO_ROOT = Path(__file__).resolve().parents[4]


def _base_from_jwks(jwks_url: str | None) -> str | None:
    """Derive the Clerk instance base URL from its JWKS URL."""
    if not jwks_url:
        return None
    parts = urlsplit(jwks_url)
    if not parts.scheme or not parts.netloc:
        return None
    return f"{parts.scheme}://{parts.netloc}"


class Settings(BaseSettings):
    """App settings. Overridable via env vars (see .env.example)."""

    model_config = SettingsConfigDict(
        env_file=REPO_ROOT / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_env: str = "development"
    app_name: str = "videaflow-api"
    debug: bool = False

    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/videaflow"
    redis_url: str = "redis://localhost:6379/0"
    celery_broker_url: str = "redis://localhost:6379/1"
    celery_result_backend: str = "redis://localhost:6379/2"

    # Clerk. Leave blank in local dev to fall back to the DEV identity.
    clerk_secret_key: str | None = None
    clerk_jwks_url: str | None = None
    clerk_issuer: str | None = None
    clerk_audience: str | None = None
    clerk_webhook_secret: str | None = None

    cors_origins: str = "http://localhost:3000,http://localhost:5173"

    # Cloudflare R2 (S3-compatible object storage)
    r2_account_id: str | None = None
    r2_access_key_id: str | None = None
    r2_secret_access_key: str | None = None
    r2_bucket_name: str | None = None
    r2_public_base_url: str | None = None
    r2_endpoint_url: str | None = None

    stripe_secret_key: str | None = None
    stripe_webhook_secret: str | None = None

    resend_api_key: str | None = None

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def clerk_jwks_url_effective(self) -> str | None:
        """JWKS URL — appends the standard path if only the instance base is set."""
        if not self.clerk_jwks_url:
            return None
        url = self.clerk_jwks_url.rstrip("/")
        if url.endswith("/.well-known/jwks.json"):
            return url
        return f"{url}/.well-known/jwks.json"

    @property
    def clerk_issuer_effective(self) -> str | None:
        """Clerk token issuer — explicit env, else derived from the JWKS URL."""
        return self.clerk_issuer or _base_from_jwks(self.clerk_jwks_url)

    @property
    def clerk_audience_effective(self) -> str | None:
        """Clerk token audience — explicit env, else derived from the JWKS URL."""
        return self.clerk_audience or _base_from_jwks(self.clerk_jwks_url)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
