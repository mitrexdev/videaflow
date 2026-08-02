# syntax=docker/dockerfile:1
# Build context must be the repo root:
#   docker build -f services/api/Dockerfile .
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

COPY ai/ ./ai/
COPY services/api/ ./services/api/

RUN pip install --upgrade pip \
    && pip install ./ai ./services/api

WORKDIR /app/services/api
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
