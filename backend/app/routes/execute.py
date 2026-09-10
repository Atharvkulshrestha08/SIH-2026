from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.sandbox.executor import run_code

router = APIRouter()


class ExecuteRequest(BaseModel):
    code: str
    language: str = "python"


@router.post("")
@router.post("/")
async def execute(request: ExecuteRequest):
    """Run code inside the sandbox and return stdout/stderr."""
    try:
        result = await run_code(request.code, request.language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sandbox execution failed unexpectedly: {e}")

    return result