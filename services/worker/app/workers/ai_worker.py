"""Runnable entrypoint for the ai-gen worker process.

Usage: python -m app.workers.ai_worker
"""
from app.celery_app import celery_app

if __name__ == "__main__":
    celery_app.worker_main(["worker", "-Q", "ai-gen", "--loglevel=info"])
