"""Celery client used by the API to enqueue work.

The worker service owns the task *definitions*; the API only sends by task name,
so it never needs to import worker code. See services/worker for definitions.
"""
from celery import Celery

from app.core.config import settings

celery_client = Celery(
    "videaflow",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
)

celery_client.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    broker_connection_retry_on_startup=True,
)


def enqueue(
    task_name: str,
    args: tuple = (),
    kwargs: dict | None = None,
    *,
    queue: str = "ai-gen",
) -> str:
    """Send a task by name. Returns the Celery task id."""
    task = celery_client.send_task(task_name, args=args, kwargs=kwargs or {}, queue=queue)
    return task.id
