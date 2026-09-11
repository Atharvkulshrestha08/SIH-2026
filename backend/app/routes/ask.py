import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models.model_manager import query_model

router = APIRouter()


class AskRequest(BaseModel):
    prompt: str
    task_type: str = "reasoning"  # "code" | "reasoning" | "general"


class AskResponse(BaseModel):
    response: str


@router.post("/", response_model=AskResponse)
async def ask(request: AskRequest):
    """Send a prompt to the model and return its response."""
    try:
        result = await query_model(request.task_type, request.prompt)
    except httpx.ConnectError:
        raise HTTPException(
            status_code=503,
            detail="Model backend unreachable. Confirm Docker Model Runner is running "
                   "and the model is loaded (docker model run ai/qwen2.5:7B-Q4_K_M).",
        )
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="Model request timed out. The model may still be loading into VRAM.",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error during inference: {e}")

    return AskResponse(response=result)