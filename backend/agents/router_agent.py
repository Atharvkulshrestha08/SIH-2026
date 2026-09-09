"""Intent router agent for sub-100ms task classification."""
import time
import re
from shared.schemas import TaskType, RouteDecision


def classify_task(prompt: str) -> RouteDecision:
    """
    Classifies the user prompt into specialized task categories.
    Executes in < 5ms using rule heuristics, compatible with Qwen2.5-3B intent classifier.
    """
    p = prompt.lower()

    # Code / Math calculation
    if any(k in p for k in ["calculate", "formula", "python", "code", "run", "stress", "flow rate", "reynolds", "ast", "math"]):
        return RouteDecision(
            task_type=TaskType.CODE_MATH,
            target_model="code",
            target_node="node2_compute",
            confidence=0.98,
            reasoning="Engineering calculation or code execution detected.",
            requires_sandbox=True,
        )

    # Document Inspection / Memo Generation
    if any(k in p for k in ["memo", "approval", "report", "generate doc", "word", "excel", "docx", "xlsx"]):
        return RouteDecision(
            task_type=TaskType.REPORT_GENERATION,
            target_model="reasoning",
            target_node="node2_compute",
            confidence=0.96,
            reasoning="Deliverable / document generation requested.",
            requires_docx=True,
        )

    # SOP / Inspection / RAG
    if any(k in p for k in ["sop", "standard", "asme", "api 610", "iso", "manual", "procedure", "inspection", "guideline"]):
        return RouteDecision(
            task_type=TaskType.SOP_RAG,
            target_model="reasoning",
            target_node="node2_compute",
            confidence=0.95,
            reasoning="Industrial SOP knowledge retrieval needed.",
            requires_rag=True,
        )

    # Default General Task
    return RouteDecision(
        task_type=TaskType.GENERAL,
        target_model="general",
        target_node="node1_gateway",
        confidence=0.90,
        reasoning="General sovereign engineering assistance.",
    )


# --- System Action Intent (opens apps/files, bypasses model call) ---

ACTION_TRIGGERS = ["open", "launch", "start"]
KNOWN_APPS = ["notepad", "calculator", "chrome", "docker", "whatsapp"]

STOPWORDS = {
    "open", "launch", "start", "the", "a", "an", "file", "please", "for",
    "me", "in", "sheet", "document", "presentation", "report", "on", "my", "system"
}


def extract_file_search_term(prompt: str) -> str:
    words = [w.strip(".,") for w in prompt.lower().split()]
    keep = [w for w in words if w not in STOPWORDS]
    return " ".join(keep)


def classify_action_intent(prompt: str):
    lower = prompt.lower()
    if not any(t in lower for t in ACTION_TRIGGERS):
        return None

    for app in KNOWN_APPS:
        if app in lower:
            return {"task_type": "SYSTEM_ACTION", "action": "open_app", "target": app}

    search_term = extract_file_search_term(prompt)
    if search_term:
        return {"task_type": "SYSTEM_ACTION", "action": "open_file", "target": search_term}

    return None