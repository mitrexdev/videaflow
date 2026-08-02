from redis.asyncio import Redis

from app.core.config import settings

# Shared async Redis client. Used for rate limiting, progress pub/sub,
# and hot caches. Decode to str for simpler payload handling.
redis: Redis = Redis.from_url(settings.redis_url, decode_responses=True)


async def close_redis() -> None:
    await redis.aclose()
