"""Dev-only seeding.

Creates the DEV organization + user that `authn.py` falls back to when Clerk
is not configured. Idempotent. Never runs in production (guarded in main.py
by `settings.clerk_secret_key` being unset).
"""
import uuid

from sqlalchemy import select

from app.core.authn import DEV_ORG_ID, DEV_USER_ID
from app.core.database import async_session
from app.models.tenant import Organization, OrganizationMember, User


async def ensure_dev_tenant() -> None:
    org_id = uuid.UUID(DEV_ORG_ID)
    user_id = uuid.UUID(DEV_USER_ID)

    async with async_session() as session:
        if await session.get(Organization, org_id) is None:
            session.add(
                Organization(
                    id=org_id,
                    name="Dev Workspace",
                    slug="dev-workspace",
                    plan="pro",
                    limits={"projects": 100, "credits_monthly": 1000},
                )
            )

        if await session.get(User, user_id) is None:
            session.add(
                User(
                    id=user_id,
                    clerk_id="dev-user",
                    email="dev@videaflow.local",
                    name="Dev User",
                )
            )

        await session.commit()

        member = await session.execute(
            select(OrganizationMember).where(
                OrganizationMember.organization_id == org_id,
                OrganizationMember.user_id == user_id,
            )
        )
        if member.scalar_one_or_none() is None:
            session.add(
                OrganizationMember(
                    organization_id=org_id, user_id=user_id, role="owner"
                )
            )
            await session.commit()
