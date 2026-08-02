"""Clerk webhook → Postgres sync.

Keeps users, organizations and memberships in Postgres in sync with Clerk,
which remains the source of truth for identity. Idempotent upserts; failures
are logged (never raise) so a bad event doesn't poison the webhook flow.
"""
import logging
import uuid

from sqlalchemy import select

from app.core.database import async_session
from app.models.tenant import Organization, OrganizationMember, User

logger = logging.getLogger("app.auth.sync")


async def provision_user_in_session(
    session,
    *,
    clerk_id: str,
    email: str,
    name: str | None,
) -> User:
    """Return the user, creating them + a personal workspace if missing.

    Used by both the webhook sync and (lazily) by authn, so a user can always
    authenticate even before their webhook event is processed.
    """
    user = await session.scalar(select(User).where(User.clerk_id == clerk_id))
    if user is not None:
        return user

    user = User(clerk_id=clerk_id, email=email, name=name)
    session.add(user)
    await session.flush()

    # Personal workspace so every user has an org to operate in.
    org = Organization(
        name=f"{name or 'My'} Workspace",
        slug=f"ws-{user.id.hex[:12]}",
        plan="free",
        limits={"projects": 5, "credits_monthly": 50},
    )
    session.add(org)
    await session.flush()
    session.add(OrganizationMember(organization_id=org.id, user_id=user.id, role="owner"))
    await session.commit()
    return user


async def upsert_user(data: dict) -> None:
    """Create or update a user, creating their personal workspace on signup."""
    clerk_id = data.get("id")
    if not clerk_id:
        return

    first = data.get("first_name") or ""
    last = data.get("last_name") or ""
    name = f"{first} {last}".strip() or None
    emails = data.get("email_addresses") or []
    email = emails[0].get("email_address", "") if emails else ""

    async with async_session() as session:
        user = await provision_user_in_session(
            session, clerk_id=clerk_id, email=email, name=name
        )
        if user.email != email:
            user.email = email
        if name and user.name != name:
            user.name = name
        await session.commit()


async def delete_user(data: dict) -> None:
    clerk_id = data.get("id")
    if not clerk_id:
        return
    async with async_session() as session:
        user = await session.scalar(select(User).where(User.clerk_id == clerk_id))
        if user is not None:
            await session.delete(user)
            await session.commit()


async def upsert_organization(data: dict) -> None:
    """Upsert an organization by Clerk id (fallback: slug)."""
    clerk_id = data.get("id")
    if not clerk_id:
        return
    slug = data.get("slug")
    name = data.get("name") or slug or "Workspace"

    async with async_session() as session:
        org = await session.scalar(select(Organization).where(Organization.clerk_id == clerk_id))
        if org is None and slug:
            org = await session.scalar(select(Organization).where(Organization.slug == slug))
        if org is None:
            org = Organization(
                clerk_id=clerk_id,
                name=name,
                slug=slug or f"org-{uuid.uuid4().hex[:12]}",
                plan="free",
                limits={},
            )
            session.add(org)
        else:
            org.clerk_id = clerk_id
            org.name = name
            if slug:
                org.slug = slug
        await session.commit()


async def upsert_membership(data: dict) -> None:
    """Add or update a user's role in an organization."""
    org_data = data.get("organization") or {}
    user_data = data.get("public_user_data") or {}
    role = data.get("role")
    clerk_user_id = user_data.get("user_id") or data.get("user_id")
    org_clerk_id = org_data.get("id")
    if not clerk_user_id or not org_clerk_id or not role:
        return

    async with async_session() as session:
        user = await session.scalar(select(User).where(User.clerk_id == clerk_user_id))
        org = await session.scalar(
            select(Organization).where(Organization.clerk_id == org_clerk_id)
        )
        if user is None or org is None:
            logger.warning("Membership sync skipped: user or org not provisioned")
            return
        member = await session.scalar(
            select(OrganizationMember).where(
                OrganizationMember.organization_id == org.id,
                OrganizationMember.user_id == user.id,
            )
        )
        if member is None:
            session.add(
                OrganizationMember(organization_id=org.id, user_id=user.id, role=role)
            )
        else:
            member.role = role
        await session.commit()


async def delete_membership(data: dict) -> None:
    org_data = data.get("organization") or {}
    user_data = data.get("public_user_data") or {}
    clerk_user_id = user_data.get("user_id") or data.get("user_id")
    org_clerk_id = org_data.get("id")
    if not clerk_user_id or not org_clerk_id:
        return
    async with async_session() as session:
        user = await session.scalar(select(User).where(User.clerk_id == clerk_user_id))
        org = await session.scalar(
            select(Organization).where(Organization.clerk_id == org_clerk_id)
        )
        if user is None or org is None:
            return
        member = await session.scalar(
            select(OrganizationMember).where(
                OrganizationMember.organization_id == org.id,
                OrganizationMember.user_id == user.id,
            )
        )
        if member is not None:
            await session.delete(member)
            await session.commit()
