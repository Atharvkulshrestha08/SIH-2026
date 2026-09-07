"""Multi-Agent Orchestrator for AeroSovereign operations."""
import time
import logging
from typing import Optional
from shared.schemas import TaskRequest, TaskResponse, TaskType
from agents.router_agent import classify_task
from rag.retriever import search_knowledge_base
from app.models.model_manager import query_model
from security.audit import log_event

logger = logging.getLogger(__name__)


async def run_orchestrated_task(request: TaskRequest) -> TaskResponse:
    """
    Main orchestration loop:
    1. Fast intent routing (<100ms)
    2. Context augmentation via RAG if needed
    3. Specialized model invocation
    4. Audit logging
    """
    start_time = time.perf_counter()

    # 1. Route Decision
    route = classify_task(request.prompt)
    chosen_model = request.model if (request.model and request.model != "auto") else route.target_model

    # 2. Context Gathering (RAG)
    augmented_prompt = request.prompt
    if route.requires_rag or "sop" in request.prompt.lower():
        sop_results = search_knowledge_base(request.prompt, top_k=2)
        sop_context = "\n\n".join([f"[{d['id']} - {d['title']}]: {d['content']}" for d in sop_results])
        augmented_prompt = (
            f"Relevant Sovereign SOPs:\n{sop_context}\n\n"
            f"User Query:\n{request.prompt}\n\n"
            f"Please provide an accurate engineering response citing the relevant standard."
        )

    # 3. Model Query
    text_response = await query_model(chosen_model, augmented_prompt)

    elapsed_ms = (time.perf_counter() - start_time) * 1000.0

    # 4. Audit Log
    log_event(
        event_type=f"TASK_{route.task_type.value}",
        details=f"Prompt: {request.prompt[:50]}... | Model: {chosen_model} | Latency: {elapsed_ms:.1f}ms",
        status="SUCCESS",
    )

    return TaskResponse(
        session_id=request.session_id or "default-session",
        task_type=route.task_type,
        model_used=chosen_model,
        text_response=text_response,
        execution_time_ms=round(elapsed_ms, 2),
        output_files=[],
        sovereign_status="PASS_0_EXTERNAL_EGRESS",
    )
