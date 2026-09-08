from fastapi import APIRouter
from shared.schemas import TaskRequest, TaskResponse
from agents.orchestrator import run_orchestrated_task

router = APIRouter()


@router.post("/", response_model=TaskResponse)
async def orchestrate(request: TaskRequest):
    """Run a prompt through the full orchestration pipeline: intent routing, RAG augmentation, model invocation, and audit logging."""
    return await run_orchestrated_task(request)