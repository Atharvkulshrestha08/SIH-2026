# Shared schemas and data models
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

class RouteDecision(BaseModel):
    task_type: TaskType
    target_model: str
    target_node: str
    confidence: float
    reasoning: str
    requires_sandbox: bool = False
    requires_rag: bool = False
    requires_docx: bool = False

class TaskRequest(BaseModel):
    session_id: str
    prompt: str
    file_paths: Optional[List[str]] = Field(default_factory=list)
    stream: bool = True

class TaskResponse(BaseModel):
    session_id: str
    task_type: TaskType
    model_used: str
    text_response: str
    execution_time_ms: float
    output_files: Optional[List[str]] = Field(default_factory=list)
    sovereign_status: str = "PASS_0_EGRESS"
