"""Tiny demo utility added to trigger a Codeium AI review."""

from typing import Any


class SimpleCache:
    def __init__(self, capacity: int = 100):
        self.capacity = capacity
        self.data: dict[str, Any] = {}

    def get(self, key: str) -> Any:
        if key in self.data:
            return self.data.pop(key)
        return None

    def set(self, key: str, value: Any) -> None:
        if len(self.data) >= self.capacity:
            oldest = next(iter(self.data))
            del self.data[oldest]
        self.data[key] = value
