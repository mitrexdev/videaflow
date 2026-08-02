"""Provider registry + failover chain.

Phase 1 (now): in-code registry with defaults.
Phase 2: chains hydrated from the `provider_settings` DB table at startup,
         with org-level overrides and runtime reconfiguration.
"""
import logging
from typing import Any, Awaitable, Callable

from orchestrator.providers.base import ProviderUnavailableError

logger = logging.getLogger(__name__)


class AllProvidersFailed(Exception):
    def __init__(self, capability: str, errors: list[str]) -> None:
        self.capability = capability
        self.errors = errors
        super().__init__(f"All providers failed for {capability}: {'; '.join(errors)}")


class ProviderRegistry:
    def __init__(self) -> None:
        self._chains: dict[str, list[Any]] = {}

    def register(self, capability: str, provider: Any) -> None:
        self._chains.setdefault(capability, []).append(provider)

    def chain(self, capability: str) -> list[Any]:
        return self._chains.get(capability, [])

    async def call(
        self, capability: str, attempt: Callable[[Any], Awaitable[Any]]
    ) -> Any:
        """Run `attempt(provider)` against each provider until one succeeds."""
        providers = self.chain(capability)
        if not providers:
            raise AllProvidersFailed(capability, ["no providers registered"])

        errors: list[str] = []
        for provider in providers:
            try:
                return await attempt(provider)
            except ProviderUnavailableError as exc:
                errors.append(f"{provider.name}: {exc}")
                logger.warning(
                    "Provider %s unavailable for %s — trying fallback",
                    provider.name,
                    capability,
                )
        raise AllProvidersFailed(capability, errors)


class ProviderRouter:
    """Typed facade over the registry — one method per capability."""

    def __init__(self, registry: ProviderRegistry) -> None:
        self.registry = registry

    async def complete_llm(self, prompt: str, **kwargs: Any) -> Any:
        async def attempt(provider: Any) -> Any:
            return await provider.complete(prompt, **kwargs)

        return await self.registry.call("llm", attempt)

    # Phase 2:
    #   complete_image(prompt, ...)
    #   generate_video(prompt, ...)
    #   speak(text, voice, ...)
    #   transcribe(audio, ...)


def create_default_router() -> ProviderRouter:
    """MVP wiring: all LLM traffic through LiteLLM with a sensible default.

    Model used is configurable per-call; register more providers / chain order
    here or (Phase 2) from the DB.
    """
    from orchestrator.providers.llm.litellm import LiteLLMProvider

    registry = ProviderRegistry()
    registry.register("llm", LiteLLMProvider())
    return ProviderRouter(registry)
