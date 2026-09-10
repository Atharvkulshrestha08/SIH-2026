"""Test suite for AeroSovereign backend services."""
import pytest
from fastapi.testclient import TestClient
import sys
import os

backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from gateway.main import app

client = TestClient(app)


def test_root_endpoint():
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert data["system"] == "AeroSovereign"
    assert data["status"] == "ONLINE"


def test_status_endpoint():
    res = client.get("/api/v1/status")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "operational"
    assert data["sovereign_network_egress_bytes"] == 0
    assert data["egress_status"] == "AIR_GAPPED_0_EGRESS"


def test_sandbox_execution():
    res = client.post("/api/v1/execute", json={"code": "print(100 + 23)"})
    assert res.status_code == 200
    data = res.json()
    assert data["returncode"] == 0
    assert "123" in data["stdout"]


def test_sandbox_security_rejection():
    # Attempting to import socket should be rejected by AST checker
    res = client.post("/api/v1/execute", json={"code": "import socket\nsocket.gethostname()"})
    assert res.status_code == 200
    data = res.json()
    assert data["returncode"] == 403
    assert "Security Violation" in data["stderr"]


def test_rag_retrieval():
    res = client.get("/api/v1/rag?query=pump+vibration")
    assert res.status_code == 200
    data = res.json()
    assert data["count"] > 0
    assert any("pump" in d["title"].lower() or "pump" in d["content"].lower() for d in data["results"])


def test_intent_routing_and_ask():
    res = client.post("/api/v1/ask", json={"prompt": "Calculate the hoop stress in a cylindrical shell"})
    assert res.status_code == 200
    data = res.json()
    assert data["task_type"] == "CODE_MATH"
    assert len(data["text_response"]) > 0


def test_document_memo_generation():
    res = client.post("/api/v1/generate", json={
        "title": "Quarterly NDT Valve Audit",
        "findings": "All valves tested within 0.05% leakage tolerance.",
        "author": "Chief Inspector",
        "doc_format": "docx"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["filename"].endswith(".docx")


from app.main import app as app_main
app_client = TestClient(app_main)


def test_app_main_status():
    res = app_client.get("/api/v1/status")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"


def test_app_main_rag_search():
    res = app_client.post("/api/v1/rag/search", json={"query": "centrifugal pump vibration", "top_k": 2})
    assert res.status_code == 200
    data = res.json()
    assert data["count"] > 0
    assert len(data["results"]) > 0


def test_app_main_documents_generate():
    res = app_client.post("/api/v1/documents/generate", json={
        "title": "PSV-104 Inspection Review",
        "findings": "All relief pressures nominal.",
        "author": "Lead NDT Engineer",
        "doc_format": "docx"
    })
    assert res.status_code == 200
    assert res.json()["status"] == "success"
    assert "download_url" in res.json()


def test_app_main_audit():
    res = app_client.get("/api/v1/audit")
    assert res.status_code == 200
    data = res.json()
    assert "audit_logs" in data
    assert len(data["audit_logs"]) > 0


def test_app_main_ask():
    res = app_client.post("/api/v1/ask", json={"prompt": "Calculate thickness for pressure vessel"})
    assert res.status_code == 200
    data = res.json()
    assert data["task_type"] in ["CODE_MATH", "SOP_RAG", "GENERAL"]
    assert "text_response" in data
    assert data["sovereign_status"] == "PASS_0_EXTERNAL_EGRESS"


def test_app_main_execute():
    res = app_client.post("/api/v1/execute", json={"code": "print('hello from sandbox')"})
    assert res.status_code == 200
    assert "hello from sandbox" in res.json()["stdout"]


def test_app_main_upload():
    file_content = b"ASME Section VIII Div 1 inspection report for tower 101."
    res = app_client.post(
        "/api/v1/upload",
        files={"file": ("test_report.txt", file_content, "text/plain")}
    )
    assert res.status_code == 200
    assert res.json()["status"] == "done"
    assert "document_id" in res.json()

