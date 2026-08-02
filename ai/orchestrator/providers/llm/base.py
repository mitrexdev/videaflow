from abc import abstractmethod

from orchestrator.providers.base import CapabilityProvider, ProviderCallResult


class LLMProvider(CapabilityProvider):
    """Contract for LLM providers.

    Implementations should use json_mode=True for structured extraction; the
    workflow layer handles JSON parsing + schema validation + retry.
    """

    name: str = ""

    @abstractmethod
    async def complete(
        self,
        prompt: str,
        *,
        system: str | None = None,
        model: str | None = None,
        temperature: float | None = None,
        json_mode: bool = False,
        max_tokens: int | None = None,
    ) -> ProviderCallResult:
        """Complete a prompt; returns raw text output."""
        raise NotImplementedError
