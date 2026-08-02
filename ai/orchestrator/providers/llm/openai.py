"""OpenAI-flavored provider preset (routes through LiteLLM)."""
from orchestrator.providers.llm.litellm import LiteLLMProvider


class OpenAIProvider(LiteLLMProvider):
    name = "openai"

    def __init__(self, *, default_model: str = "openai/gpt-4o-mini") -> None:
        super().__init__(default_model=default_model)
