from fastapi import APIRouter
from pydantic import BaseModel
from app.models.model_manager import query_model

router = APIRouter()


class AskRequest(BaseModel):
    prompt: str
    model: str = "llama3"


class AskResponse(BaseModel):
    response: str


@router.post("/", response_model=AskResponse)
async def ask(request: AskRequest):
    """Send a prompt to the model and return its response."""
    result = await query_model(request.prompt, request.model)
    return AskResponse(response=result)
