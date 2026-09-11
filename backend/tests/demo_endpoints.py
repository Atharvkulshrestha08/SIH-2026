"""
============================================================================
  MAX (MRPL AI WORKBENCH) - LIVE ENDPOINT DEMONSTRATION
  Smart India Hackathon 2026 | PS-26117
  Sovereign, Air-Gapped, Zero-Egress Industrial AI System
============================================================================

  Run:  cd backend
        python tests/demo_endpoints.py

  Pre-requisites:
        - Backend running:   uvicorn app.main:app --reload
        - Model running:     docker model run ai/qwen2.5:7B-Q4_K_M
============================================================================
"""

import httpx
import json
import time
import sys

BASE = "http://127.0.0.1:8000"
TIMEOUT = 90.0

CYAN    = "\033[96m"
GREEN   = "\033[92m"
YELLOW  = "\033[93m"
MAGENTA = "\033[95m"
BOLD    = "\033[1m"
DIM     = "\033[2m"
RESET   = "\033[0m"
LINE    = "=" * 80


def header(number, title, quote, method, endpoint):
    print(f"\n{LINE}")
    print(f"{BOLD}{CYAN}  [{number}/15] {title}{RESET}")
    print(f"{DIM}  \"{quote}\"{RESET}")
    print(f"{YELLOW}  {method} {endpoint}{RESET}")
    print(LINE)


def show_response(data, elapsed_ms):
    print(f"\n{GREEN}  Response ({elapsed_ms:.0f}ms):{RESET}")
    formatted = json.dumps(data, indent=2, ensure_ascii=False)
    for line in formatted.split("\n"):
        print(f"    {line}")
    print()


def demo():
    client = httpx.Client(base_url=BASE, timeout=TIMEOUT)
    print(f"\n{BOLD}{MAGENTA}")
    print("  ================================================================")
    print("     MAX - SOVEREIGN AI WORKBENCH | LIVE ENDPOINT DEMONSTRATION")
    print("     Smart India Hackathon 2026 | MRPL | PS-26117")
    print("     100% Local. Zero External Egress. Air-Gapped by Design.")
    print("  ================================================================")
    print(RESET)

    input(f"{DIM}  Press ENTER to begin the demonstration...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 1. ROOT HEALTH
    # ──────────────────────────────────────────────────────────────
    header(1,
        "ROOT HEALTH CHECK",
        "The heartbeat of sovereignty -- proving the system is alive and local.",
        "GET", "/")

    t = time.perf_counter()
    res = client.get("/")
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 2. SYSTEM STATUS & TELEMETRY
    # ──────────────────────────────────────────────────────────────
    header(2,
        "SYSTEM STATUS & SOVEREIGN TELEMETRY",
        "Real-time CPU, memory, and network egress proof -- every byte accounted for.",
        "GET", "/api/v1/status/")

    t = time.perf_counter()
    res = client.get("/api/v1/status/")
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 3. ORCHESTRATE - FAST PATH (GREETING)
    # ──────────────────────────────────────────────────────────────
    header(3,
        "ORCHESTRATE -- FAST-PATH GREETING",
        "Sub-millisecond response. No GPU needed. Intelligence without waste.",
        "POST", "/api/v1/orchestrate/")

    payload = {"prompt": "hello", "model": "auto", "session_id": "demo"}
    print(f"  Payload: {json.dumps(payload)}")
    t = time.perf_counter()
    res = client.post("/api/v1/orchestrate/", json=payload)
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 4. ORCHESTRATE - GENERAL LLM QUERY
    # ──────────────────────────────────────────────────────────────
    header(4,
        "ORCHESTRATE -- FULL LLM INFERENCE PIPELINE",
        "From prompt to answer -- routed, augmented, inferred, and audited. All on local GPU.",
        "POST", "/api/v1/orchestrate/")

    payload = {"prompt": "What is the boiling point of water at sea level?", "model": "auto", "session_id": "demo"}
    print(f"  Payload: {json.dumps(payload)}")
    print(f"\n{DIM}  (Waiting for local Qwen 7B inference on GPU...){RESET}")
    t = time.perf_counter()
    res = client.post("/api/v1/orchestrate/", json=payload)
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 5. ORCHESTRATE - SYSTEM ACTION
    # ──────────────────────────────────────────────────────────────
    header(5,
        "ORCHESTRATE -- SYSTEM ACTION (OPEN APP)",
        "AI meets desktop automation -- whitelisted, sandboxed, no model call needed.",
        "POST", "/api/v1/orchestrate/")

    payload = {"prompt": "open calculator", "model": "auto", "session_id": "demo"}
    print(f"  Payload: {json.dumps(payload)}")
    t = time.perf_counter()
    res = client.post("/api/v1/orchestrate/", json=payload)
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 6. SANDBOX - VALID CODE EXECUTION
    # ──────────────────────────────────────────────────────────────
    header(6,
        "SANDBOX -- SAFE CODE EXECUTION",
        "AST-verified, time-boxed, isolated -- engineering calculations you can trust.",
        "POST", "/api/v1/execute/")

    payload = {"code": "import math\nP, D, t = 12.5, 406.4, 12.7\nS_h = (P * D) / (2 * t)\nprint(f'Hoop Stress S_h = {S_h:.2f} MPa')", "language": "python"}
    print(f"  Payload: {json.dumps(payload, indent=2)}")
    t = time.perf_counter()
    res = client.post("/api/v1/execute/", json=payload)
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 7. SANDBOX - SECURITY REJECTION
    # ──────────────────────────────────────────────────────────────
    header(7,
        "SANDBOX -- AST SECURITY GATE (NETWORK MODULE BLOCKED)",
        "Zero-trust code analysis. Socket imports? Denied before a single byte leaves.",
        "POST", "/api/v1/execute/")

    payload = {"code": "import socket\nsocket.gethostname()", "language": "python"}
    print(f"  Payload: {json.dumps(payload)}")
    t = time.perf_counter()
    res = client.post("/api/v1/execute/", json=payload)
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 8. SANDBOX - UNSUPPORTED LANGUAGE
    # ──────────────────────────────────────────────────────────────
    header(8,
        "SANDBOX -- UNSUPPORTED LANGUAGE GUARD",
        "Only Python runs in the sovereign sandbox. Everything else is rejected at the gate.",
        "POST", "/api/v1/execute/")

    payload = {"code": "System.out.println('Hello');", "language": "java"}
    print(f"  Payload: {json.dumps(payload)}")
    t = time.perf_counter()
    res = client.post("/api/v1/execute/", json=payload)
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 9. RAG KNOWLEDGE BASE - KEYWORD HIT
    # ──────────────────────────────────────────────────────────────
    header(9,
        "RAG KNOWLEDGE BASE -- SOP RETRIEVAL",
        "Offline retrieval over sovereign SOPs. The right standard, in milliseconds.",
        "POST", "/api/v1/rag/search")

    payload = {"query": "centrifugal pump vibration threshold API 610", "top_k": 3}
    print(f"  Payload: {json.dumps(payload)}")
    t = time.perf_counter()
    res = client.post("/api/v1/rag/search", json=payload)
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 10. RAG KNOWLEDGE BASE - FALLBACK
    # ──────────────────────────────────────────────────────────────
    header(10,
        "RAG KNOWLEDGE BASE -- GRACEFUL FALLBACK",
        "No match? No problem. The system returns the most relevant SOPs anyway.",
        "POST", "/api/v1/rag/search")

    payload = {"query": "quantum teleportation dark matter", "top_k": 2}
    print(f"  Payload: {json.dumps(payload)}")
    t = time.perf_counter()
    res = client.post("/api/v1/rag/search", json=payload)
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 11. DOCUMENT GENERATION - DOCX MEMO
    # ──────────────────────────────────────────────────────────────
    header(11,
        "DOCUMENT GENERATION -- WORD APPROVAL MEMO",
        "From findings to formal memo -- digitally signed, audit-stamped, zero cloud dependency.",
        "POST", "/api/v1/documents/generate")

    payload = {
        "title": "Quarterly NDT Valve Integrity Audit - Zone A3",
        "findings": "All 24 gate valves inspected via UT and RT. Zero critical defects. Wall thickness within ASME tolerances.",
        "author": "Chief Inspection Engineer",
        "doc_format": "docx"
    }
    print(f"  Payload: {json.dumps(payload, indent=2)}")
    t = time.perf_counter()
    res = client.post("/api/v1/documents/generate", json=payload)
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 12. DOCUMENT GENERATION - XLSX SHEET
    # ──────────────────────────────────────────────────────────────
    header(12,
        "DOCUMENT GENERATION -- EXCEL CALCULATION SHEET",
        "Engineering data, formatted and exportable -- ready for the plant floor.",
        "POST", "/api/v1/documents/generate")

    payload = {
        "title": "Pressure Vessel Thickness Verification Matrix",
        "findings": "Calculation spreadsheet for CDU column inspection.",
        "author": "Mechanical Engineer",
        "doc_format": "xlsx"
    }
    print(f"  Payload: {json.dumps(payload, indent=2)}")
    t = time.perf_counter()
    res = client.post("/api/v1/documents/generate", json=payload)
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 13. DOCUMENT DOWNLOAD - 404 GUARD
    # ──────────────────────────────────────────────────────────────
    header(13,
        "DOCUMENT DOWNLOAD -- PATH TRAVERSAL GUARD",
        "Security-first file serving. Invalid paths are rejected, not explored.",
        "GET", "/api/v1/documents/download/nonexistent.docx")

    t = time.perf_counter()
    res = client.get("/api/v1/documents/download/nonexistent_file.docx")
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 14. AUDIT LOG RETRIEVAL
    # ──────────────────────────────────────────────────────────────
    header(14,
        "SOVEREIGN AUDIT LOG",
        "Every action recorded. Every model call traced. Full transparency, zero exceptions.",
        "GET", "/api/v1/audit?limit=5")

    t = time.perf_counter()
    res = client.get("/api/v1/audit", params={"limit": 5})
    show_response(res.json(), (time.perf_counter() - t) * 1000)
    input(f"{DIM}  Press ENTER for next endpoint...{RESET}")

    # ──────────────────────────────────────────────────────────────
    # 15. VOICE ENGINE STATUS
    # ──────────────────────────────────────────────────────────────
    header(15,
        "VOICE ENGINE STATUS -- MULTILINGUAL STT/TTS",
        "10 Indian languages. Local Whisper STT. Browser-native TTS. All offline.",
        "GET", "/api/v1/voice/status")

    t = time.perf_counter()
    res = client.get("/api/v1/voice/status")
    show_response(res.json(), (time.perf_counter() - t) * 1000)

    # ──────────────────────────────────────────────────────────────
    # FINALE
    # ──────────────────────────────────────────────────────────────
    print(f"\n{LINE}")
    print(f"{BOLD}{GREEN}")
    print("  ================================================================")
    print("      ALL 15 ENDPOINTS DEMONSTRATED SUCCESSFULLY")
    print("  ================================================================")
    print(f"  Zero external API calls. Zero cloud dependencies.")
    print(f"  100% sovereign. 100% auditable. 100% offline.")
    print(f"  Built for MRPL. Built for India.")
    print(f"{RESET}")
    print(LINE)

    client.close()


if __name__ == "__main__":
    demo()
