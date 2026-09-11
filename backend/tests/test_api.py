"""Test suite for MAX backend services."""
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
    assert data["system"] == "MAX"
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
