# syntax=docker/dockerfile:1
# Build context must be the repo root:
#   docker build -f services/worker/Dockerfile .
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

COPY ai/ ./ai/
COPY services/worker/ ./services/worker/

RUN pip install --upgrade pip \
    && pip install ./ai ./services/worker

WORKDIR /app/services/worker

CMD ["celery", "-A", "app.celery_app:celery_app", "worker", "-Q", "ai-gen", "--loglevel=info"]
