"""Multi-Agent Orchestrator for AeroSovereign operations."""
import time
import logging
from typing import Optional
from shared.schemas import TaskRequest, TaskResponse, TaskType
from agents.router_agent import classify_task, classify_action_intent, classify_fast_path
from agents.action_executor import execute_action
from rag.retriever import search_knowledge_base
from app.models.model_manager import query_model
from security.audit import log_event

logger = logging.getLogger(__name__)


async def run_orchestrated_task(request: TaskRequest) -> TaskResponse:
    """
    Main orchestration loop:
    0. System action check (open app/file — no model call needed)
    0.5 Fast-path check (conversational/status bypass — sub-5ms)
    1. Fast intent routing (<100ms)
    2. Context augmentation via RAG if needed
    3. Specialized model invocation
    4. Audit logging
    """
    start_time = time.perf_counter()

    # 0. System Action Check — bypasses model entirely if matched
    action_match = classify_action_intent(request.prompt)
    if action_match:
        result = execute_action(action_match["action"], action_match["target"])
        elapsed_ms = (time.perf_counter() - start_time) * 1000.0
        log_event(
            event_type="TASK_SYSTEM_ACTION",
            details=f"Prompt: {request.prompt[:50]}... | Action: {action_match['action']} | Result: {result['status']}",
            status="SUCCESS" if result["status"] == "success" else "DENIED",
        )
        return TaskResponse(
            session_id=request.session_id or "default-session",
            task_type=TaskType.SYSTEM_ACTION,
            model_used="none",
            text_response=result["detail"],
            execution_time_ms=round(elapsed_ms, 2),
            output_files=[],
            sovereign_status="PASS_0_EXTERNAL_EGRESS",
        )

    # 0.5 Fast-Path Check — instant response for greetings, identity, status & acks (< 5ms)
    fast_response = classify_fast_path(request.prompt)
    if fast_response:
        elapsed_ms = (time.perf_counter() - start_time) * 1000.0
        log_event(
            event_type="TASK_FAST_PATH",
            details=f"Prompt: {request.prompt[:50]}... | Mode: fast-path | Latency: {elapsed_ms:.1f}ms",
            status="SUCCESS",
        )
        return TaskResponse(
            session_id=request.session_id or "default-session",
            task_type=TaskType.FAST_PATH,
            model_used="fast-path",
            text_response=fast_response,
            execution_time_ms=round(elapsed_ms, 2),
            output_files=[],
            sovereign_status="PASS_0_EXTERNAL_EGRESS",
        )

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
            f"Please provide an accurate engineering response citing the relevant standard. "
            f"Ground your response strictly in the provided SOP context above. Do not invent unverified thresholds or non-existent clauses; if a specific parameter is missing, state that it requires verification. "
            f"Present formulas and calculations in clean, readable notation (e.g., S_h = (P * D) / (2 * t) = 180 MPa) rather than raw LaTeX backslash syntax."
        )
    elif route.task_type == TaskType.CODE_MATH:
        augmented_prompt = (
            f"{request.prompt}\n\n"
            f"[Guidance: Present mathematical formulas and step-by-step calculations in clean, readable notation (e.g., S_h = (P * D) / (2 * t) = 180 MPa) rather than raw LaTeX backslash codes like \\[ or \\frac. "
            f"Show exact arithmetic substitutions with units so calculations are verifiable and free of hallucinations. Do not invent arbitrary constants.]"
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