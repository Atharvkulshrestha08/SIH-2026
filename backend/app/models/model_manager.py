from openai import OpenAI
import os

client = OpenAI(
    base_url=os.getenv("MODEL_HOST", "http://localhost:12434/engines/v1"),
    api_key="not-needed"  # DMR ignores this, but the SDK requires a value
)

MODEL_MAP = {
    "code": "ai/qwen3-coder",
    "reasoning": "ai/qwen3.5",
    "general": "ai/llama3.1",
}

def query_model(task_type: str, prompt: str):
    model = MODEL_MAP.get(task_type, "ai/qwen3.5")
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.choices[0].message.content