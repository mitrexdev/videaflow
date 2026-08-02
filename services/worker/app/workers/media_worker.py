"""Runnable entrypoint for a media/ffmpeg worker (Phase 2).

Processes trims, crops, concatenation, loudnorm and transcode jobs that don't
belong on the ai-gen queue.
"""
from app.celery_app import celery_app

if __name__ == "__main__":
    celery_app.worker_main(["worker", "-Q", "media", "--loglevel=info"])
