from fastapi import APIRouter
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
    result = await query_model(request.task_type, request.prompt)
    return AskResponse(response=result)