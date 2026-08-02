"""Google Gemini-flavored provider preset (routes through LiteLLM)."""
from orchestrator.providers.llm.litellm import LiteLLMProvider


class GeminiProvider(LiteLLMProvider):
    name = "gemini"

    def __init__(self, *, default_model: str = "gemini/gemini-2.5-flash") -> None:
        super().__init__(default_model=default_model)
