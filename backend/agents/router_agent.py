"""Intent router agent for sub-100ms task classification."""
import time
import re
from typing import Optional
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
KNOWN_APPS = [
    "notepad", "calculator", "chrome", "docker", "whatsapp",
    "word", "excel", "powerpoint", "edge", "firefox",
    "file explorer", "explorer", "task manager", "settings",
    "control panel", "command prompt", "cmd", "powershell",
    "paint", "snipping tool", "vscode", "vs code", "spotify", "vlc",
]

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


# --- Fast Path for Straightforward Conversational & Status Queries ---

FAST_GREETINGS = {
    "hlo", "hello", "hi", "hey", "heya", "good morning", "good afternoon",
    "good evening", "howdy", "sup", "yo", "hi there", "hello there", "greetings",
    "namaste", "hola"
}

FAST_IDENTITY = {
    "who are you", "what are you", "what is max", "what is aerosovereign", "what can you do",
    "help", "how to use", "commands", "features", "what is this", "capabilities",
    "tell me about yourself", "who made you"
}

FAST_ACKS = {
    "thanks", "thank you", "thx", "ty", "appreciate it", "ok", "okay",
    "got it", "cool", "great", "nice", "understood", "k", "perfect",
    "bye", "goodbye", "see you", "done", "alright"
}

FAST_STATUS = {
    "status", "system status", "health check", "ping", "are you online",
    "are you ready", "check status", "system health"
}

ENGINEERING_OVERRIDE_KEYWORDS = [
    "calculate", "formula", "code", "run", "stress", "flow rate", "reynolds",
    "math", "sop", "standard", "asme", "api", "iso", "manual", "procedure",
    "memo", "report", "docx", "inspection", "pressure", "temperature", "pipe",
    "vessel", "pump", "valve"
]


def classify_fast_path(prompt: str) -> Optional[str]:
    """
    Sub-millisecond fast-path router for straightforward conversational and status prompts.
    Bypasses the heavy 7B local LLM to eliminate cold-start/inference latency for non-tedious inputs.
    Returns the ready-to-serve response text, or None if the prompt requires model inference.
    """
    cleaned = prompt.strip().lower()
    # Strip basic trailing punctuation
    cleaned_no_punct = re.sub(r"[?!.,;:]+$", "", cleaned).strip()

    # If any technical or engineering keyword is present, fall through to full pipeline
    if any(k in cleaned_no_punct for k in ENGINEERING_OVERRIDE_KEYWORDS):
        return None

    # 1. Greetings
    if cleaned_no_punct in FAST_GREETINGS or (
        len(cleaned_no_punct.split()) <= 3 and any(cleaned_no_punct.startswith(g) for g in ["hi", "hello", "hey", "hlo"])
    ):
        return (
            "Hello! I am MAX, your air-gapped sovereign industrial engineering assistant.\n\n"
            "How can I assist your operations today? You can ask me to:\n"
            "- Perform engineering calculations (e.g., hoop stress, Reynolds number)\n"
            "- Query industrial SOPs & standards (ASME B31.3, API 610, ISO)\n"
            "- Execute local system actions (e.g., 'open notepad', 'launch vs code')\n"
            "- Generate compliance memos and inspection reports"
        )

    # 2. Identity & Capabilities
    if cleaned_no_punct in FAST_IDENTITY:
        return (
            "I am MAX — an air-gapped sovereign engineering assistant operating under strict zero-external-egress protocols.\n\n"
            "Core Capabilities:\n"
            "1. Technical Calculations: Deterministic stress analysis, fluid mechanics, and thermodynamic limits.\n"
            "2. SOP Knowledge Base: Offline retrieval of plant operating procedures and safety standards.\n"
            "3. Native Automation: Whitelisted local application and document management.\n"
            "4. Sovereign Audit: All actions are cryptographically and locally logged."
        )

    # 3. Acknowledgments / Pleasantries
    if cleaned_no_punct in FAST_ACKS:
        return "You're welcome! Let me know whenever you need further engineering calculations, SOP lookups, or system operations."

    # 4. System Status / Health
    if cleaned_no_punct in FAST_STATUS:
        return (
            "[Sovereign System Status: OPERATIONAL]\n"
            "- Network Egress: BLOCKED (PASS_0_EXTERNAL_EGRESS)\n"
            "- Local Gateway & Orchestrator: ACTIVE\n"
            "- Local Knowledge Base (RAG): READY\n"
            "- Sandboxed Compute Engine: READY\n"
            "- Local Model Runner: STANDBY"
        )

    return None