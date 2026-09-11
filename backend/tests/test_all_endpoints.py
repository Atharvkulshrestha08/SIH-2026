"""
MAX Backend & Frontend Integration Test Suite
═══════════════════════════════════════════════
15 test cases covering every endpoint except /ask.
Tests run against the LIVE backend at http://127.0.0.1:8000.

Endpoints tested:
  1. GET  /                              (Root health)
  2. GET  /api/v1/status/                (System telemetry & egress)
  3. POST /api/v1/orchestrate/           (Full pipeline – fast-path greeting)
  4. POST /api/v1/orchestrate/           (Full pipeline – general LLM query)
  5. POST /api/v1/orchestrate/           (System action intent – open app)
  6. POST /api/v1/execute/               (Sandbox – valid code)
  7. POST /api/v1/execute/               (Sandbox – security rejection)
  8. POST /api/v1/execute/               (Sandbox – unsupported language)
  9. POST /api/v1/rag/search             (RAG knowledge base search – hit)
 10. POST /api/v1/rag/search             (RAG knowledge base search – fallback)
 11. POST /api/v1/documents/generate     (DOCX memo generation)
 12. POST /api/v1/documents/generate     (XLSX sheet generation)
 13. GET  /api/v1/documents/download/X   (Download – 404 guard)
 14. GET  /api/v1/audit                  (Audit log retrieval)
 15. GET  /api/v1/voice/status           (Voice engine status)

Run:
  cd backend
  python -m pytest tests/test_all_endpoints.py -v
"""

import pytest
import httpx
import time

BASE = "http://127.0.0.1:8000"
TIMEOUT = 90.0  # generous for local LLM inference


@pytest.fixture(scope="module")
def client():
    """Reusable httpx client pointed at the live backend."""
    with httpx.Client(base_url=BASE, timeout=TIMEOUT) as c:
        yield c


# ═══════════════════════════════════════════════════════════════════
# TC-01: Root Health Endpoint
# ═══════════════════════════════════════════════════════════════════
def test_01_root_health(client):
    """GET / — Backend must return a running status message."""
    res = client.get("/")
    assert res.status_code == 200, f"Root endpoint failed: {res.text}"
    data = res.json()
    assert "message" in data
    assert "running" in data["message"].lower()
    print(f"  [PASS] Root: {data['message']}")


# ═══════════════════════════════════════════════════════════════════
# TC-02: System Status & Telemetry
# ═══════════════════════════════════════════════════════════════════
def test_02_system_status(client):
    """GET /api/v1/status/ — Must return CPU, memory, model_host, and egress info."""
    res = client.get("/api/v1/status/")
    assert res.status_code == 200, f"Status endpoint failed: {res.text}"
    data = res.json()

    # Required fields
    assert data["status"] == "ok"
    assert "platform" in data
    assert isinstance(data["cpu_percent"], (int, float))
    assert isinstance(data["memory_percent"], (int, float))
    assert "model_host" in data
    assert "sovereign_network_egress_bytes" in data
    assert "egress_status" in data
    print(f"  [PASS] Status: platform={data['platform']}, CPU={data['cpu_percent']}%, MEM={data['memory_percent']}%, egress={data['egress_status']}")


# ═══════════════════════════════════════════════════════════════════
# TC-03: Orchestrate – Fast-Path Greeting (no LLM call)
# ═══════════════════════════════════════════════════════════════════
def test_03_orchestrate_fast_path_greeting(client):
    """POST /api/v1/orchestrate/ with a greeting → fast-path response, no model invocation."""
    res = client.post("/api/v1/orchestrate/", json={
        "prompt": "hello",
        "model": "auto",
        "session_id": "test-session-greeting",
    })
    assert res.status_code == 200, f"Orchestrate greeting failed: {res.text}"
    data = res.json()

    assert data["task_type"] == "FAST_PATH"
    assert data["model_used"] == "fast-path"
    assert "MAX" in data["text_response"]
    assert data["sovereign_status"] == "PASS_0_EXTERNAL_EGRESS"
    assert data["execution_time_ms"] < 500  # fast-path should be sub-500ms
    print(f"  [PASS] Fast-path greeting: {data['execution_time_ms']:.1f}ms, response length={len(data['text_response'])}")


# ═══════════════════════════════════════════════════════════════════
# TC-04: Orchestrate – General LLM Query (full pipeline)
# ═══════════════════════════════════════════════════════════════════
def test_04_orchestrate_general_query(client):
    """POST /api/v1/orchestrate/ with a general question → model inference via Docker Model Runner."""
    res = client.post("/api/v1/orchestrate/", json={
        "prompt": "What is the boiling point of water at sea level?",
        "model": "auto",
        "session_id": "test-session-general",
    })
    assert res.status_code == 200, f"Orchestrate general query failed: {res.text}"
    data = res.json()

    assert data["task_type"] == "GENERAL"
    assert len(data["text_response"]) > 0
    assert "model_used" in data
    assert data["sovereign_status"] == "PASS_0_EXTERNAL_EGRESS"
    print(f"  [PASS] General query: model={data['model_used']}, latency={data['execution_time_ms']:.0f}ms, response={data['text_response'][:80]}...")


# ═══════════════════════════════════════════════════════════════════
# TC-05: Orchestrate – System Action Intent (open app bypass)
# ═══════════════════════════════════════════════════════════════════
def test_05_orchestrate_system_action(client):
    """POST /api/v1/orchestrate/ with 'open calculator' → system action, no model call."""
    res = client.post("/api/v1/orchestrate/", json={
        "prompt": "open calculator",
        "model": "auto",
        "session_id": "test-session-action",
    })
    assert res.status_code == 200, f"Orchestrate system action failed: {res.text}"
    data = res.json()

    assert data["task_type"] == "SYSTEM_ACTION"
    assert data["model_used"] == "none"
    assert data["sovereign_status"] == "PASS_0_EXTERNAL_EGRESS"
    # The action should mention "calculator" in the response
    assert "calculator" in data["text_response"].lower() or "calc" in data["text_response"].lower()
    print(f"  [PASS] System action: {data['text_response']}")


# ═══════════════════════════════════════════════════════════════════
# TC-06: Sandbox Code Execution – Valid Python
# ═══════════════════════════════════════════════════════════════════
def test_06_sandbox_valid_code(client):
    """POST /api/v1/execute/ with safe Python → stdout with correct result."""
    res = client.post("/api/v1/execute/", json={
        "code": "print(7 * 8 + 1)",
        "language": "python",
    })
    assert res.status_code == 200, f"Execute valid code failed: {res.text}"
    data = res.json()

    assert data["returncode"] == 0
    assert "57" in data["stdout"]
    assert data["stderr"] == "" or "warning" not in data["stderr"].lower()
    assert data["execution_time_ms"] >= 0
    print(f"  [PASS] Sandbox exec: stdout='{data['stdout'].strip()}', latency={data['execution_time_ms']:.0f}ms")


# ═══════════════════════════════════════════════════════════════════
# TC-07: Sandbox Code Execution – Security Rejection (network module)
# ═══════════════════════════════════════════════════════════════════
def test_07_sandbox_security_rejection(client):
    """POST /api/v1/execute/ with 'import socket' → AST rejects with 403."""
    res = client.post("/api/v1/execute/", json={
        "code": "import socket\nsocket.gethostname()",
        "language": "python",
    })
    assert res.status_code == 200, f"Execute security check failed: {res.text}"
    data = res.json()

    assert data["returncode"] == 403
    assert "Security Violation" in data["stderr"]
    assert "socket" in data["stderr"].lower()
    print(f"  [PASS] AST security block: {data['stderr'][:80]}")


# ═══════════════════════════════════════════════════════════════════
# TC-08: Sandbox Code Execution – Unsupported Language
# ═══════════════════════════════════════════════════════════════════
def test_08_sandbox_unsupported_language(client):
    """POST /api/v1/execute/ with language='java' → rejected."""
    res = client.post("/api/v1/execute/", json={
        "code": "System.out.println('Hello');",
        "language": "java",
    })
    assert res.status_code == 200, f"Execute unsupported language failed: {res.text}"
    data = res.json()

    assert data["returncode"] == 1
    assert "unsupported" in data["stderr"].lower() or "only python" in data["stderr"].lower()
    print(f"  [PASS] Unsupported language: {data['stderr'][:80]}")


# ═══════════════════════════════════════════════════════════════════
# TC-09: RAG Knowledge Base Search – Keyword Match
# ═══════════════════════════════════════════════════════════════════
def test_09_rag_search_keyword_match(client):
    """POST /api/v1/rag/search with pump-related query → returns SOP results with pump content."""
    res = client.post("/api/v1/rag/search", json={
        "query": "centrifugal pump vibration threshold API 610",
        "top_k": 3,
    })
    assert res.status_code == 200, f"RAG search failed: {res.text}"
    data = res.json()

    assert "results" in data
    assert len(data["results"]) > 0
    assert data["sovereign_status"] == "PASS_0_EXTERNAL_EGRESS"

    # First result should be the pump SOP
    first = data["results"][0]
    assert "pump" in first["title"].lower() or "pump" in first["content"].lower()
    assert "id" in first
    print(f"  [PASS] RAG hit: top result = '{first['title']}' (id={first['id']})")


# ═══════════════════════════════════════════════════════════════════
# TC-10: RAG Knowledge Base Search – Generic Fallback
# ═══════════════════════════════════════════════════════════════════
def test_10_rag_search_fallback(client):
    """POST /api/v1/rag/search with a non-matching query → still returns fallback SOPs."""
    res = client.post("/api/v1/rag/search", json={
        "query": "quantum teleportation dark matter",
        "top_k": 2,
    })
    assert res.status_code == 200, f"RAG fallback search failed: {res.text}"
    data = res.json()

    # Even with no keyword match, the retriever returns top general SOPs as fallback
    assert "results" in data
    assert len(data["results"]) > 0
    print(f"  [PASS] RAG fallback: returned {len(data['results'])} fallback SOP(s)")


# ═══════════════════════════════════════════════════════════════════
# TC-11: Document Generation – DOCX Memo
# ═══════════════════════════════════════════════════════════════════
def test_11_generate_docx_memo(client):
    """POST /api/v1/documents/generate with doc_format='docx' → creates .docx file."""
    res = client.post("/api/v1/documents/generate", json={
        "title": "Test Integration NDT Audit Report",
        "findings": "All welds inspected with UT and RT. Zero defects found in Zone A-3.",
        "author": "Test Engineer",
        "doc_format": "docx",
    })
    assert res.status_code == 200, f"DOCX generation failed: {res.text}"
    data = res.json()

    assert data["status"] == "success"
    assert data["filename"].endswith(".docx")
    assert "download_url" in data
    assert data["sovereign_status"] == "PASS_0_EXTERNAL_EGRESS"
    print(f"  [PASS] DOCX generated: {data['filename']}, download={data['download_url']}")


# ═══════════════════════════════════════════════════════════════════
# TC-12: Document Generation – XLSX Sheet
# ═══════════════════════════════════════════════════════════════════
def test_12_generate_xlsx_sheet(client):
    """POST /api/v1/documents/generate with doc_format='xlsx' → creates .xlsx file."""
    res = client.post("/api/v1/documents/generate", json={
        "title": "Test Pressure Vessel Calculation Matrix",
        "findings": "Calculation spreadsheet placeholder.",
        "author": "Test Engineer",
        "doc_format": "xlsx",
    })
    assert res.status_code == 200, f"XLSX generation failed: {res.text}"
    data = res.json()

    assert data["status"] == "success"
    assert data["filename"].endswith(".xlsx")
    assert "download_url" in data
    print(f"  [PASS] XLSX generated: {data['filename']}")


# ═══════════════════════════════════════════════════════════════════
# TC-13: Document Download – 404 Guard
# ═══════════════════════════════════════════════════════════════════
def test_13_document_download_404(client):
    """GET /api/v1/documents/download/nonexistent.docx → 404 Not Found."""
    res = client.get("/api/v1/documents/download/nonexistent_file_that_does_not_exist.docx")
    assert res.status_code == 404
    data = res.json()
    assert "not found" in data["detail"].lower()
    print(f"  [PASS] Download 404 guard: {data['detail']}")


# ═══════════════════════════════════════════════════════════════════
# TC-14: Audit Log Retrieval
# ═══════════════════════════════════════════════════════════════════
def test_14_audit_logs(client):
    """GET /api/v1/audit?limit=10 → returns audit log entries with sovereign status."""
    res = client.get("/api/v1/audit", params={"limit": 10})
    assert res.status_code == 200, f"Audit endpoint failed: {res.text}"
    data = res.json()

    assert "count" in data
    assert "logs" in data
    assert isinstance(data["logs"], list)
    assert data["sovereign_status"] == "PASS_0_EXTERNAL_EGRESS"

    # After running previous tests, there should be audit entries
    if data["count"] > 0:
        entry = data["logs"][0]
        assert "timestamp" in entry
        assert "event_type" in entry
        assert "status" in entry
        print(f"  [PASS] Audit logs: {data['count']} entries, latest={entry['event_type']} ({entry['timestamp']})")
    else:
        print(f"  [PASS] Audit logs: 0 entries (clean start)")


# ═══════════════════════════════════════════════════════════════════
# TC-15: Voice Engine Status
# ═══════════════════════════════════════════════════════════════════
def test_15_voice_status(client):
    """GET /api/v1/voice/status — Voice engine must report online, offline-mode, and supported languages."""
    res = client.get("/api/v1/voice/status")
    assert res.status_code == 200, f"Voice status failed: {res.text}"
    data = res.json()

    assert data["status"] == "online"
    assert data["offline_mode"] is True
    assert data["egress_status"] == "PASS_0_EXTERNAL_EGRESS"
    assert "stt_engine" in data
    assert "tts_engine" in data
    assert isinstance(data["supported_languages"], list)
    assert len(data["supported_languages"]) >= 5  # at least 5 Indian languages
    assert "en-US" in data["supported_languages"]
    print(f"  [PASS] Voice status: STT={data['stt_engine']}, TTS={data['tts_engine']}, langs={len(data['supported_languages'])}")
