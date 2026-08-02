"""Celery application for Videaflow workers.

Queues:
  ai-gen  — LLM/image/video/TTS/STT generation tasks (this worker process).
  render  — consumed by the Node/Remotion render service, not by Python Celery.

Run the ai-gen worker locally:
  celery -A app.celery_app:celery_app worker -Q ai-gen --loglevel=info
or via python:
  python -m app.workers.ai_worker
"""
from celery import Celery

from app.core.config import settings

celery_app = Celery(
    "videaflow",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
    include=[
        "app.tasks.script",
        "app.tasks.scenes",
    ],
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
    # At-least-once delivery: ack after the task finishes.
    task_acks_late=True,
    task_reject_on_worker_lost=True,
    worker_prefetch_multiplier=1,
    task_default_queue="ai-gen",
    task_routes={
        "app.tasks.*": {"queue": "ai-gen"},
    },
    task_time_limit=settings.task_time_limit,
    task_soft_time_limit=settings.task_soft_time_limit,
    broker_connection_retry_on_startup=True,
)
