"""Anthropic-flavored provider preset (routes through LiteLLM)."""
from orchestrator.providers.llm.litellm import LiteLLMProvider


class AnthropicProvider(LiteLLMProvider):
    name = "anthropic"

    def __init__(self, *, default_model: str = "anthropic/claude-haiku-4-5-20251001") -> None:
        super().__init__(default_model=default_model)
