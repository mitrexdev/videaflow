"""NOTE: renders are NOT consumed by Python Celery.

The render queue is served by the Node/Remotion service (services/render).
The Python side enqueues a render by HTTP POST to that service; the service
uploads the finished MP4 to R2 and calls back to mark the render row complete.
"""
