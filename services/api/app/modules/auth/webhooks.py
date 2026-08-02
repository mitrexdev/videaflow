"""Clerk webhook receiver.

Verifies the Svix signature, records the event for audit, and dispatches to
the sync layer. A failing handler never returns 5xx — Clerk will retry.
"""
import logging

from fastapi import APIRouter, Header, HTTPException, Request, status
from svix.webhooks import Webhook, WebhookVerificationError

from app.core.config import settings
from app.core.database import async_session
from app.models.billing import WebhookEvent
from app.modules.auth import sync

logger = logging.getLogger("app.webhooks")

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


async def _record(provider: str, event_type: str, payload: dict) -> None:
    try:
        async with async_session() as session:
            session.add(
                WebhookEvent(provider=provider, event_type=event_type, payload=payload)
            )
            await session.commit()
    except Exception:  # noqa: BLE001
        logger.exception("Failed to record webhook event")


async def _dispatch(event_type: str, data: dict) -> None:
    if event_type in ("user.created", "user.updated"):
        await sync.upsert_user(data)
    elif event_type == "user.deleted":
        await sync.delete_user(data)
    elif event_type in ("organization.created", "organization.updated"):
        await sync.upsert_organization(data)
    elif event_type in ("organizationMembership.created", "organizationMembership.updated"):
        await sync.upsert_membership(data)
    elif event_type == "organizationMembership.deleted":
        await sync.delete_membership(data)
    else:
        logger.info("Ignoring Clerk event type: %s", event_type)


@router.post("/clerk")
async def clerk_webhook(
    request: Request,
    svix_id: str = Header(alias="svix-id", default=""),
    svix_timestamp: str = Header(alias="svix-timestamp", default=""),
    svix_signature: str = Header(alias="svix-signature", default=""),
):
    if not settings.clerk_webhook_secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Clerk webhooks not configured",
        )

    payload = await request.body()

    wh = Webhook(settings.clerk_webhook_secret)
    try:
        event = wh.verify(
            payload,
            {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            },
        )
    except WebhookVerificationError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid webhook signature",
        )

    event_type = event.get("type", "")
    data = event.get("data", {})
    await _record("clerk", event_type, data)

    try:
        await _dispatch(event_type, data)
    except Exception:  # noqa: BLE001
        logger.exception("Clerk webhook handler failed for %s", event_type)

    return {"received": True}
