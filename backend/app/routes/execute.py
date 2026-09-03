from fastapi import APIRouter
from pydantic import BaseModel
from app.sandbox.executor import run_code

router = APIRouter()


class ExecuteRequest(BaseModel):
    code: str
    language: str = "python"


@router.post("/")
async def execute(request: ExecuteRequest):
    """Run code inside the sandbox and return stdout/stderr."""
    result = await run_code(request.code, request.language)
    return result
