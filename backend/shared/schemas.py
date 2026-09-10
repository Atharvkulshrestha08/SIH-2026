"""Shared schemas and data models for AeroSovereign."""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from enum import Enum


class TaskType(str, Enum):
    GENERAL = "GENERAL"
    CODE_MATH = "CODE_MATH"
    SOP_RAG = "SOP_RAG"
    DOCUMENT_INSPECTION = "DOCUMENT_INSPECTION"
    VISION = "VISION"
    REPORT_GENERATION = "REPORT_GENERATION"
    MULTI_STEP_WORKFLOW = "MULTI_STEP_WORKFLOW"
    SYSTEM_ACTION = "SYSTEM_ACTION"


class RouteDecision(BaseModel):
    task_type: TaskType
    target_model: str
    target_node: str = "node1_gateway"
    confidence: float = 0.95
    reasoning: str = ""
    requires_sandbox: bool = False
    requires_rag: bool = False
    requires_docx: bool = False


class TaskRequest(BaseModel):
    prompt: str
    model: Optional[str] = "auto"
    task_type: Optional[str] = None
    session_id: Optional[str] = "default-session"
    file_paths: Optional[List[str]] = Field(default_factory=list)
    stream: bool = False


class TaskResponse(BaseModel):
    session_id: str = "default-session"
    task_type: TaskType = TaskType.GENERAL
    model_used: str
    text_response: str
    response: Optional[str] = None
    reasoning: Optional[str] = ""
    execution_time_ms: float = 0.0
    latency_ms: Optional[float] = 0.0
    output_files: Optional[List[str]] = Field(default_factory=list)
    sovereign_status: str = "PASS_0_EXTERNAL_EGRESS"
    egress_bytes: int = 0


class ExecuteRequest(BaseModel):
    code: str
    language: str = "python"


class ExecuteResponse(BaseModel):
    stdout: str
    stderr: str
    returncode: int
    execution_time_ms: float = 0.0


class RagSearchRequest(BaseModel):
    query: str
    top_k: int = 3


class DocumentGenerateRequest(BaseModel):
    title: str = "Refinery Inspection Memo"
    memo_type: str = "approval"
    findings: Optional[str] = "Inspection completed with zero critical anomalies."
    body: Optional[str] = None
    author: str = "Lead Inspection Engineer"
    doc_format: str = "docx"  # "docx" or "xlsx"


class SystemStatusResponse(BaseModel):
    status: str = "ok"
    platform: str
    cpu_percent: float
    memory_percent: float
    model_host: str
    sovereign_network_egress_bytes: int = 0
    egress_status: str = "AIR_GAPPED_0_EGRESS"