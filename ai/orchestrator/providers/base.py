"""Provider abstraction seam.

Every AI capability (LLM, image, video, TTS, STT) lives behind a capability
interface. Providers are swappable through the registry/router — swapping is a
config change, never a refactor. Every provider call must carry cost so the
credit system can meter usage.

Phase 2: the registry is hydrated from the `provider_settings` DB table so
admins can flip a capability to another provider at runtime (no deploy).
"""
from abc import ABC
from dataclasses import dataclass, field
from typing import Any


@dataclass
class ProviderCallResult:
    output: Any
    cost_usd: float = 0.0
    provider: str = ""
    model: str = ""
    meta: dict[str, Any] = field(default_factory=dict)


class ProviderUnavailableError(Exception):
    """A provider call failed transiently (429/5xx/network) — a fallback may retry."""


class CapabilityProvider(ABC):
    name: str = ""

    async def call(self, payload: Any, **kwargs: Any) -> ProviderCallResult:
        """Generic dispatch — capability interfaces override with typed methods
        (e.g. LLMProvider.complete). Not abstract so providers stay instantiable."""
        raise NotImplementedError
