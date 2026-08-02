"""LiteLLM-backed LLM provider.

LiteLLM is the single seam over OpenAI / Anthropic / Gemini / Qwen / vLLM /
Ollama — one interface, one cost tracker. Model names are set via config
(env or the provider_settings table), never hardcoded here.
"""
import logging
from typing import Any

from litellm import acompletion
from litellm.exceptions import APIError, RateLimitError, ServiceUnavailableError, Timeout

from orchestrator.providers.base import ProviderCallResult, ProviderUnavailableError
from orchestrator.providers.llm.base import LLMProvider

logger = logging.getLogger(__name__)

# Transient failures → a fallback provider may retry.
_TRANSIENT = (APIError, RateLimitError, ServiceUnavailableError, Timeout)


class LiteLLMProvider(LLMProvider):
    name = "litellm"

    def __init__(self, *, default_model: str = "anthropic/claude-haiku-4-5-20251001") -> None:
        self.default_model = default_model

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
        messages: list[dict[str, str]] = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})

        kwargs: dict[str, Any] = {
            "model": model or self.default_model,
            "messages": messages,
            "metadata": {"application": "videaflow"},
        }
        if temperature is not None:
            kwargs["temperature"] = temperature
        if max_tokens is not None:
            kwargs["max_tokens"] = max_tokens
        if json_mode:
            kwargs["response_format"] = {"type": "json_object"}

        try:
            resp = await acompletion(**kwargs)
        except _TRANSIENT as exc:
            logger.warning("LLM provider unavailable (%s): %s", type(exc).__name__, exc)
            raise ProviderUnavailableError(str(exc)) from exc

        content: str = resp["choices"][0]["message"]["content"] or ""
        usage = getattr(resp, "usage", None) or {}
        cost = getattr(resp, "_hidden_params", {}).get("response_cost", 0.0)

        return ProviderCallResult(
            output=content,
            cost_usd=float(cost),
            provider=self.name,
            model=getattr(resp, "model", ""),
            meta={
                "input_tokens": getattr(usage, "prompt_tokens", None),
                "output_tokens": getattr(usage, "completion_tokens", None),
            },
        )
