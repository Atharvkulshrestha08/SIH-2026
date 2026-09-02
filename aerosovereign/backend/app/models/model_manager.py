import httpx
import os
import logging

logger = logging.getLogger(__name__)

MODEL_HOST = os.getenv("MODEL_HOST", "http://model:11434")


async def query_model(prompt: str, model: str = "llama3") -> str:
    """
    Forward a prompt to the Dockerized model server (Ollama-compatible API)
    and return the generated text.
    """
    url = f"{MODEL_HOST}/api/generate"
    payload = {"model": model, "prompt": prompt, "stream": False}

    logger.info("Sending request to model server at %s", url)
    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(url, json=payload)
        response.raise_for_status()

    data = response.json()
    return data.get("response", "")
