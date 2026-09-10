# Max AI Workbench — Frontend API Endpoints Specification

This document details all API endpoints expected and called by the **Max AI Workbench** frontend (`frontend/src/services/api.js`).

---

## 1. Connection Architecture

- **Backend Base URL**: `http://127.0.0.1:8000/api/v1`
- **Configurable Via**: `VITE_API_URL` environment variable
- **Security Guarantee**: 
  - 100% offline, air-gapped on-premise execution.
  - No external cloud AI API keys, external relays, or cloud telemetry.
  - Zero egress (`0 KB`).
- **Offline Protocol**:
  - When the backend is offline, views display neutral "Unavailable / Offline" states and show the `BackendBanner` alert with `uvicorn app.main:app --reload` launch instructions.
  - The frontend does **NOT** fabricate fake model telemetry, mock SOP records, or synthetic audit logs.

---

## 2. Endpoints Summary

| Method | Endpoint | Source File | Description |
|---|---|---|---|
| `GET` | `/api/v1/status` | `src/services/api.js` | Telemetry, platform info, CPU/RAM, active model, and zero-egress status |
| `POST` | `/api/v1/orchestrate/` | `src/services/api.js` | Core agentic pipeline (Intent → RAG → Local LLM → Audit) |
| `POST` | `/api/v1/ask` | `src/services/api.js` | Direct model query wrapper |
| `POST` | `/api/v1/execute` | `src/services/api.js` | Run Python code inside AST-guarded local sandbox |
| `POST` | `/api/v1/upload` | `src/services/api.js` | Upload & parse document text (PDF, DOCX, XLSX, TXT, PY) |
| `POST` | `/api/v1/rag/search` | `src/services/api.js` | Retrieve SOP knowledge from on-premise vector/keyword store |
| `POST` | `/api/v1/documents/generate` | `src/services/api.js` | Generate Word (.docx) approval memo or Excel (.xlsx) sheet |
| `GET` | `/api/v1/documents/download/{filename}` | `src/services/api.js` | Direct download of generated .docx/.xlsx file |
| `GET` | `/api/v1/audit` | `src/services/api.js` | Fetch zero-egress audit log entries and network telemetry |

---

## 3. Detailed Endpoint Contracts

### 1. System Health & Hardware Status
- **URL**: `GET /api/v1/status`
- **Frontend Caller**: `checkBackendHealth()`, `getStatus()` in `StatusView.jsx`
- **Response Format (`200 OK`)**:
```json
{
  "status": "operational",
  "platform": "Windows 11",
  "cpu_percent": 14.2,
  "memory_percent": 58.6,
  "model_host": "http://localhost:12434/engines/v1",
  "active_model": "ai/qwen2.5:7B-Q4_K_M",
  "model_footprint": "4.36 GiB (4-bit Quantized)",
  "gpu_name": "NVIDIA GeForce RTX 3050",
  "vram_total": "6.00 GiB",
  "vram_usage": "4.36 GiB (72.7% Allocated)",
  "vram_headroom": "1.64 GiB (Safe Margin)",
  "sovereign_network_egress_bytes": 0,
  "egress_status": "AIR_GAPPED_0_EGRESS"
}
```

---

### 2. Main Agent Orchestrator
- **URL**: `POST /api/v1/orchestrate/`
- **Frontend Caller**: `handleSend()` in `Workbench.jsx`
- **Request Body (`application/json`)**:
```json
{
  "prompt": "Inspect centrifugal pump P-102 vibration velocity RMS against API 610.",
  "model": "auto",
  "session_id": "session_abc123"
}
```
- **Response Format (`200 OK`)**:
```json
{
  "ok": true,
  "session_id": "session_abc123",
  "task_type": "SOP_RAG",
  "model_used": "ai/qwen2.5:7B-Q4_K_M",
  "response": "Under API 610, newly overhauled centrifugal pumps must maintain vibration velocity RMS under 2.8 mm/s. Alert trigger is 4.5 mm/s, and shutdown trip is 7.1 mm/s.",
  "text_response": "Under API 610, newly overhauled centrifugal pumps must maintain vibration velocity RMS under 2.8 mm/s.",
  "reasoning": "Retrieved MRPL-SOP-001 (API 610). Validated operating limits.",
  "execution_time_ms": 382,
  "output_files": [],
  "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
  "egress_bytes": 0
}
```

---

### 3. Direct Model Query
- **URL**: `POST /api/v1/ask`
- **Request Body (`application/json`)**:
```json
{
  "prompt": "What is Barlow's formula?",
  "model": "ai/qwen2.5:7B-Q4_K_M",
  "session_id": "session_abc123"
}
```
- **Response Format (`200 OK`)**:
```json
{
  "ok": true,
  "session_id": "session_abc123",
  "response": "Barlow's formula calculates internal pressure hoop stress in cylindrical pipes: S_h = (P * D) / (2 * t).",
  "model_used": "ai/qwen2.5:7B-Q4_K_M",
  "latency_ms": 195
}
```

---

### 4. AST-Guarded Python Code Sandbox
- **URL**: `POST /api/v1/execute`
- **Frontend Caller**: `handleRun()` in `SandboxView.jsx`
- **Request Body (`application/json`)**:
```json
{
  "code": "P = 14.5\nD = 600.0\nt = 24.5\nprint(f'Stress: {(P * D) / (2 * t):.2f} MPa')",
  "language": "python"
}
```
- **Response Format (`200 OK`)**:
```json
{
  "ok": true,
  "stdout": "Stress: 177.55 MPa\n",
  "stderr": "",
  "returncode": 0,
  "execution_time_ms": 12
}
```

---

### 5. Document Ingestion & Local Parsing
- **URL**: `POST /api/v1/upload`
- **Frontend Caller**: `handleFileUpload()` in `FilesView.jsx` / `ChatView.jsx`
- **Request Body (`multipart/form-data`)**:
  - `file`: Binary file (`.pdf`, `.docx`, `.xlsx`, `.txt`, `.py`)
- **Response Format (`200 OK`)**:
```json
{
  "ok": true,
  "document_id": "DOC-7f2a1b9c",
  "filename": "MRPL_Operating_Manual.pdf",
  "char_count": 14250,
  "status": "done",
  "created_at": "09:15 PM",
  "text_preview": "Extracted text preview...",
  "full_text": "Complete extracted document text..."
}
```

---

### 6. On-Premise SOP Knowledge Retrieval (RAG)
- **URL**: `POST /api/v1/rag/search` (also supports `POST /api/v1/rag`)
- **Frontend Caller**: `handleSearch()` in `RAGView.jsx`
- **Request Body (`application/json`)**:
```json
{
  "query": "pump vibration thresholds",
  "top_k": 3
}
```
- **Response Format (`200 OK`)**:
```json
{
  "ok": true,
  "query": "pump vibration thresholds",
  "count": 1,
  "source": "Local Sovereign RAG Repository",
  "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
  "results": [
    {
      "id": "MRPL-SOP-001",
      "title": "Centrifugal Pump Operating Envelope & Vibration Thresholds",
      "content": "Overall vibration velocity RMS shall not exceed 2.8 mm/s in newly overhauled units...",
      "tags": ["pump", "vibration", "api610"],
      "source": "MRPL_Operating_Manual.pdf"
    }
  ]
}
```

---

### 7. Deliverable Generation (Word & Excel)
- **URL**: `POST /api/v1/documents/generate`
- **Frontend Caller**: `handleGenerate()` in `DocumentsView.jsx`
- **Request Body (`application/json`)**:
```json
{
  "title": "Centrifugal Pump P-102 Overhaul Memo",
  "findings": "Inspection completed with zero anomalies.",
  "author": "Lead Inspection Engineer",
  "doc_format": "docx"
}
```
- **Response Format (`200 OK`)**:
```json
{
  "ok": true,
  "status": "success",
  "filename": "centrifugal_pump_p102_overhaul_memo.docx",
  "download_url": "/api/v1/documents/download/centrifugal_pump_p102_overhaul_memo.docx",
  "file_path": "C:\\outputs\\centrifugal_pump_p102_overhaul_memo.docx",
  "title": "Centrifugal Pump P-102 Overhaul Memo",
  "document_type": "docx",
  "sovereign_status": "PASS_0_EXTERNAL_EGRESS"
}
```

---

### 8. Deliverable Download
- **URL**: `GET /api/v1/documents/download/{filename}`
- **Response**: File binary stream (`application/vnd.openxmlformats-officedocument.wordprocessingml.document` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`)

---

### 9. Immutable Audit Trail
- **URL**: `GET /api/v1/audit?limit=100`
- **Frontend Caller**: `fetchLogs()` in `AuditView.jsx`
- **Response Format (`200 OK`)**:
```json
{
  "ok": true,
  "count": 1,
  "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
  "network_metrics": {
    "bytes_sent": 0,
    "bytes_recv": 0,
    "packets_sent": 0,
    "packets_recv": 0
  },
  "audit_logs": [
    {
      "id": 1,
      "time": "18:42:11",
      "timestamp": "2026-09-10T18:42:11.210Z",
      "event_type": "ORCHESTRATE",
      "event": "SOP_RAG",
      "model": "ai/qwen2.5:7B-Q4_K_M",
      "network_egress": "0 bytes",
      "status": "SUCCESS",
      "sovereign_check": "PASS_0_EXTERNAL_EGRESS",
      "details": "Query: pump vibration | Retr: MRPL-SOP-001"
    }
  ]
}
```
