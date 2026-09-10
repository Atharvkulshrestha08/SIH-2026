"""Test runner script for MAX backend."""
import sys
import os

backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
try:
    from gateway.main import app  # pyright: ignore [missing-import]
except ImportError:
    from backend.gateway.main import app  # type: ignore

def run():
    client = TestClient(app)
    print("Testing MAX Backend API...")
    
    # Test 1: Root
    r = client.get("/")
    assert r.status_code == 200 and r.json()["system"] == "MAX"
    print("  [PASS] Root endpoint")

    # Test 2: Status
    r = client.get("/api/v1/status")
    assert r.status_code == 200 and r.json()["sovereign_network_egress_bytes"] == 0
    print("  [PASS] Status & Zero-Egress verification")

    # Test 3: Sandbox
    r = client.post("/api/v1/execute", json={"code": "print(100 + 23)"})
    assert r.status_code == 200 and "123" in r.json()["stdout"]
    print("  [PASS] AST Sandbox calculation execution")

    # Test 4: Security rejection
    r = client.post("/api/v1/execute", json={"code": "import socket"})
    assert r.status_code == 200 and r.json()["returncode"] == 403
    print("  [PASS] AST Security sandbox network violation blocked")

    # Test 5: RAG
    r = client.get("/api/v1/rag?query=pump")
    assert r.status_code == 200 and r.json()["count"] > 0
    print("  [PASS] Sovereign SOP RAG retrieval")

    # Test 6: Ask & Routing
    r = client.post("/api/v1/ask", json={"prompt": "Calculate pipe hoop stress"})
    assert r.status_code == 200 and r.json()["task_type"] == "CODE_MATH"
    print("  [PASS] Multi-model intent routing & execution")

    # Test 7: Docx Generation
    r = client.post("/api/v1/generate", json={"title": "Test Memo", "findings": "All safe", "doc_format": "docx"})
    assert r.status_code == 200 and r.json()["status"] == "success"
    print("  [PASS] Automated Word (.docx) approval memo generation")

    # Test 8: Xlsx Generation
    r = client.post("/api/v1/generate", json={"title": "Test Sheet", "findings": "", "doc_format": "xlsx"})
    assert r.status_code == 200 and r.json()["status"] == "success"
    print("  [PASS] Automated Excel (.xlsx) calculation workbook generation")

    print("\nALL 8/8 BACKEND TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    run()
