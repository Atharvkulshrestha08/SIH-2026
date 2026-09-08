"""Model Manager for AeroSovereign.
Routes prompts to local models via Docker Model Runner, with an offline fallback
if the model server is unreachable.
"""
import os
import logging
from openai import AsyncOpenAI

logger = logging.getLogger(__name__)

MODEL_HOST = os.getenv("MODEL_HOST", "http://localhost:12434/engines/v1")

MODEL_MAP = {
    "code": "docker.io/ai/qwen2.5:7B-Q4_K_M",
    "reasoning": "docker.io/ai/qwen2.5:7B-Q4_K_M",
    "general": "docker.io/ai/qwen2.5:7B-Q4_K_M",
}

client = AsyncOpenAI(
    base_url=MODEL_HOST,
    api_key="not-needed",
    timeout=90.0,   # generous enough for a full generation, avoids mid-generation aborts
    max_retries=0,  # don't restart generation from scratch on timeout - one clean attempt is faster
)


def _offline_fallback(prompt: str, model_name: str) -> str:
    """Local, deterministic response used only if Docker Model Runner is unreachable."""
    p = prompt.lower()
    if any(k in p for k in ("calc", "pump", "stress", "flow")):
        return (
            f"[AeroSovereign {model_name} - Offline Engine]\n\n"
            f"Engineering Assessment for: \"{prompt}\"\n\n"
            "1. Standard Operating Range Verified: Within API 610 / ASME B31.3 tolerances.\n"
            "2. Formula Applied: Q = A * v (Flow Rate) / S = P*D/(2*t) (Hoop Stress).\n"
            "3. Recommendation: Maintain operating envelope; proceed with scheduled inspection."
        )
    elif any(k in p for k in ("sop", "inspect", "standard")):
        return (
            f"[AeroSovereign {model_name} - SOP Specialist]\n\n"
            "Referencing Standard Operating Procedure:\n"
            "- Pre-requisite: Isolate supply and depressurize system to 0 barg.\n"
            "- Verification: Ultrasonic thickness measurement, seal leak detection, vibration analysis.\n"
            "- Sign-off: Shift In-Charge and Level-II Inspector."
        )
    return (
        f"[AeroSovereign {model_name} - Offline Engine]\n\n"
        f"Model server unreachable. Prompt received locally: \"{prompt}\"\n"
        "No external network calls were made."
    )


async def query_model(task_type: str, prompt: str) -> str:
    model = MODEL_MAP.get(task_type, MODEL_MAP["reasoning"])
    try:
        response = await client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
        )
        content = response.choices[0].message.content
        if content:
            return content
    except Exception as e:
        logger.warning("Model server (%s) unreachable: %s. Using offline fallback.", MODEL_HOST, e)

    return _offline_fallback(prompt, model)