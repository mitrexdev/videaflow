"""Authentication & authorization for the API.

- Clerk configured → verify the session JWT against Clerk's JWKS, then
  resolve the user's identity (and active org) from Postgres.
- Clerk NOT configured → DEV identity so the skeleton runs locally.

Scoping rule: every query in the codebase must be filtered by identity.org_id
(and user_id where relevant). See modules/projects/routes.py for the pattern.
"""
from __future__ import annotations

import asyncio
import logging
import uuid
from dataclasses import dataclass
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import PyJWKClient
from sqlalchemy import select

from app.core.config import get_settings
from app.core.database import async_session
from app.models.tenant import Organization, OrganizationMember, User
from app.modules.auth.sync import provision_user_in_session

logger = logging.getLogger("app.authn")
settings = get_settings()

_bearer = HTTPBearer(auto_error=False)

DEV_ORG_ID = "00000000-0000-0000-0000-000000000001"
DEV_USER_ID = "00000000-0000-0000-0000-000000000002"

_jwks_client: PyJWKClient | None = None


@dataclass(frozen=True)
class Identity:
    user_id: str
    org_id: str
    role: str = "owner"
    email: str = "dev@videaflow.local"


def _dev_identity() -> Identity:
    logger.warning(
        "Clerk not configured — using DEV identity. Never enable in production."
    )
    return Identity(user_id=DEV_USER_ID, org_id=DEV_ORG_ID)


def _host_of(url: str | None) -> str:
    """Normalize a URL to its bare host (no scheme, no trailing slash)."""
    if not url:
        return ""
    return url.split("://", 1)[-1].rstrip("/").lower()


def _azp_allowed(token_azp: str | None) -> bool:
    """Clerk sets `azp` to the frontend origin (e.g. http://localhost:3000 in
    dev, the app domain in prod) — not always the Clerk instance URL. Allow
    the app's own configured origins plus the Clerk instance itself."""
    if not token_azp:
        return False
    host = _host_of(token_azp)
    if settings.clerk_issuer_effective and host == _host_of(settings.clerk_issuer_effective):
        return True
    return any(_host_of(origin) == host for origin in settings.cors_origins_list)


def _get_jwks_client() -> PyJWKClient:
    global _jwks_client
    if _jwks_client is None:
        if not settings.clerk_jwks_url_effective:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="CLERK_JWKS_URL not configured",
            )
        _jwks_client = PyJWKClient(settings.clerk_jwks_url_effective)
    return _jwks_client


async def _verify_clerk_token(token: str) -> dict:
    try:
        signing_key = await asyncio.to_thread(
            _get_jwks_client().get_signing_key_from_jwt, token
        )
        claims = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            issuer=settings.clerk_issuer_effective,
            options={"require": ["exp", "nbf"]},
        )
    except Exception as exc:  # PyJWTError or JWKS fetch failure
        logger.warning("Clerk token verification failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        ) from exc

    # Clerk session tokens carry the audience in `azp`, NOT `aud`. Clerk
    # stores azp without a scheme (e.g. "x.clerk.accounts.dev") while our
    # expected value is derived from the JWKS URL (with https://), so compare
    # by host, ignoring scheme and trailing slash.
    expected_azp = settings.clerk_audience_effective
    token_azp = claims.get("azp")
    if expected_azp and not token_azp:
        logger.warning("Clerk token is missing the azp claim")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token audience mismatch",
        )
    if expected_azp and not _azp_allowed(token_azp):
        logger.warning(
            "Clerk token audience (azp) mismatch: token azp=%r expected=%r",
            token_azp,
            expected_azp,
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token audience mismatch",
        )

    return claims


async def _load_identity(claims: dict) -> Identity:
    clerk_id = claims.get("sub")
    if not clerk_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token missing subject"
        )

    async with async_session() as session:
        # Lazy-provision so the first sign-in works even before webhooks sync.
        user = await provision_user_in_session(
            session,
            clerk_id=clerk_id,
            email=claims.get("email") or f"{clerk_id}@clerk.local",
            name=claims.get("name"),
        )

        org_id: uuid.UUID | None = None
        org_clerk_id = claims.get("org")
        if org_clerk_id:
            org = await session.scalar(
                select(Organization).where(Organization.clerk_id == org_clerk_id)
            )
            if org is not None:
                org_id = org.id
        else:
            # No active org claim → the user's personal workspace (earliest).
            member = await session.scalar(
                select(OrganizationMember)
                .where(OrganizationMember.user_id == user.id)
                .order_by(OrganizationMember.created_at.asc())
                .limit(1)
            )
            if member is not None:
                org_id = member.organization_id

        if org_id is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No workspace for user"
            )

        member = await session.scalar(
            select(OrganizationMember).where(
                OrganizationMember.organization_id == org_id,
                OrganizationMember.user_id == user.id,
            )
        )
        if member is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not a member of this workspace",
            )

        return Identity(
            user_id=str(user.id),
            org_id=str(org_id),
            role=member.role,
            email=user.email,
        )


async def get_current_identity(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
) -> Identity:
    if not settings.clerk_secret_key:
        return _dev_identity()

    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )

    claims = await _verify_clerk_token(credentials.credentials)
    return await _load_identity(claims)


CurrentIdentity = Annotated[Identity, Depends(get_current_identity)]
