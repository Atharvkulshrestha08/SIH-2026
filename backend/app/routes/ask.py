"""Intelligent Routed Inference Endpoint."""
from fastapi import APIRouter
from shared.schemas import TaskRequest, TaskResponse
from agents.orchestrator import run_orchestrated_task

router = APIRouter()


@router.post("", response_model=TaskResponse)
@router.post("/", response_model=TaskResponse)
async def ask(request: TaskRequest):
    """
    Sub-100ms routed task processing through specialized sovereign agents.
    Automatically handles:
    - Whitelisted system actions (desktop apps, safe browser destinations)
    - Fast intent classification (code, math, SOP, memo)
    - SOP RAG knowledge augmentation
    - Local multi-model execution
    - Immutable audit logging
    """
    return await run_orchestrated_task(request)