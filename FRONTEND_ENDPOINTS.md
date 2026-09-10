# Max AI Workbench — Frontend API Endpoints Specification

This document provides the complete, authoritative API contract between the **Max AI Workbench** frontend (`frontend/src/services/api.js`) and the local air-gapped FastAPI backend.

---

## 1. Architecture & Connection Defaults

- **Default Backend Base URL**: `http://127.0.0.1:8000/api/v1`
- **Environment Variable Override**: `VITE_API_URL` (in `frontend/.env`)
- **Default Frontend Port**: `http://localhost:5173` (Vite)
- **Air-Gap Security Rule**: 
  - All communication is bound strictly to `127.0.0.1` / `localhost` loopback.
  - **Zero external network egress (0 KB)** is permitted. No external API keys or cloud relays are accepted.
- **Offline Protocol**:
  - When the backend is offline (`checkBackendHealth()` fails or requests timeout/error), the frontend displays non-intrusive alert banners (`BackendBanner`) with instructions to launch `uvicorn app.main:app --reload`.
  - The frontend never fabricates fake telemetry or mock model outputs when disconnected.

---

## 2. API Endpoints Matrix

| # | Method | Endpoint Path | Frontend Caller | Purpose |
|---|---|---|---|---|
| **1** | `GET` | `/api/v1/status` | `checkBackendHealth`, `getStatus` | Telemetry, CPU/RAM utilization, active model info, and egress verification |
| **2** | `POST` | `/api/v1/orchestrate/` | `orchestrate` | Full agentic pipeline (Intent classification → RAG → Local LLM → Audit) |
| **3** | `POST` | `/api/v1/ask` | `askModel` | Direct prompt inference through local model runtime |
| **4** | `POST` | `/api/v1/execute` | `executeCode` | AST-guarded Python sandbox calculations (Barlow stress, vibration, flow) |
| **5** | `POST` | `/api/v1/upload` | `uploadFile` | File ingestion & local text extraction (PDF, DOCX, XLSX, TXT, PY) |
| **6** | `POST` | `/api/v1/rag/search` | `searchRag` | On-premise keyword & vector retrieval over confidential SOPs |
| **7** | `POST` | `/api/v1/documents/generate` | `generateDocument` | Local compilation of Word (.docx) memos and Excel (.xlsx) workbooks |
| **8** | `GET` | `/api/v1/documents/download/{filename}` | Direct browser link (`getDownloadUrl`) | Stream & download compiled engineering deliverables |
| **9** | `GET` | `/api/v1/audit` | `getAudit` | Retrieve immutable zero-egress audit log records |

---

## 3. Detailed Endpoint Specifications

### 1. System Health & Hardware Telemetry

- **Endpoint**: `GET /api/v1/status`
- **Headers**: None
- **Frontend Caller**: `checkBackendHealth()`, `getStatus()` in [`StatusView.jsx`](file:///c:/Users/Atharv/OneDrive/Desktop/SIH/frontend/src/components/workbench/StatusView.jsx)
- **Timeout**: `4000ms`

#### Success Response (`200 OK`):
```json
{
  "status": "operational",
  "platform": "Windows 11",
  "cpu_percent": 18.4,
  "memory_percent": 62.1,
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

### 2. Task Orchestration Pipeline

- **Endpoint**: `POST /api/v1/orchestrate/`
- **Headers**: `Content-Type: application/json`
- **Frontend Caller**: `handleSend` in [`Workbench.jsx`](file:///c:/Users/Atharv/OneDrive/Desktop/SIH/frontend/src/pages/Workbench.jsx)
- **Timeout**: `60000ms` (allows for local 7B quantization reasoning)

#### Request Body:
```json
{
  "prompt": "Calculate maximum hoop stress for fractionator column at 14.5 MPa, 600mm OD, 24.5mm wall thickness.",
  "model": "auto",
  "session_id": "session-1725984120"
}
```

#### Success Response (`200 OK`):
```json
{
  "ok": true,
  "session_id": "session-1725984120",
  "task_type": "CODE_MATH",
  "model_used": "ai/qwen2.5:7B-Q4_K_M",
  "response": "Using Barlow's formula: S_h = (P * D) / (2 * t) = (14.5 * 600) / (2 * 24.5) = 177.55 MPa. The calculated hoop stress is 177.55 MPa, which is within the ASME Section VIII allowable limit for SA-516 Grade 70 steel.",
  "text_response": "Using Barlow's formula: S_h = (P * D) / (2 * t) = (14.5 * 600) / (2 * 24.5) = 177.55 MPa.",
  "reasoning": "Classified intent as CODE_MATH. Routed to sandbox executor for Barlow stress verification. Validated against ASME SA-516 Grade 70 allowable stress (138 MPa base, safety factor adjusted).",
  "execution_time_ms": 382,
  "latency_ms": 382,
  "output_files": [],
  "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
  "egress_bytes": 0
}
```

---

### 3. Direct Model Inference

- **Endpoint**: `POST /api/v1/ask`
- **Headers**: `Content-Type: application/json`
- **Frontend Caller**: `askModel()` in [`api.js`](file:///c:/Users/Atharv/OneDrive/Desktop/SIH/frontend/src/services/api.js)

#### Request Body:
```json
{
  "prompt": "What is the emergency trip threshold for pump vibration according to API 610?",
  "model": "ai/qwen2.5:7B-Q4_K_M",
  "session_id": "session-1725984120"
}
```

#### Success Response (`200 OK`):
```json
{
  "ok": true,
  "session_id": "session-1725984120",
  "response": "Under API 610 / ISO 10816-3, the vibration alert threshold is set at 4.5 mm/s RMS, and the emergency shutdown trip threshold is 7.1 mm/s RMS.",
  "model_used": "ai/qwen2.5:7B-Q4_K_M",
  "latency_ms": 240
}
```

---

### 4. Code Sandbox AST Execution

- **Endpoint**: `POST /api/v1/execute`
- **Headers**: `Content-Type: application/json`
- **Frontend Caller**: `handleRun` in [`SandboxView.jsx`](file:///c:/Users/Atharv/OneDrive/Desktop/SIH/frontend/src/components/workbench/SandboxView.jsx)
- **Timeout**: `10000ms`

#### Request Body:
```json
{
  "code": "P = 14.5\nD = 600.0\nt = 24.5\nhoop_stress = (P * D) / (2 * t)\nprint(f'Calculated Hoop Stress: {hoop_stress:.2f} MPa')",
  "language": "python"
}
```

#### Success Response (`200 OK`):
```json
{
  "ok": true,
  "stdout": "Calculated Hoop Stress: 177.55 MPa\nSTATUS: VERIFIED SAFE - Within ASME Section VIII tolerances\n",
  "stderr": "",
  "returncode": 0,
  "execution_time_ms": 14
}
```

---

### 5. Document Ingestion & Local Parsing

- **Endpoint**: `POST /api/v1/upload`
- **Headers**: `Content-Type: multipart/form-data`
- **Frontend Caller**: `handleFileUpload` in [`FilesView.jsx`](file:///c:/Users/Atharv/OneDrive/Desktop/SIH/frontend/src/components/workbench/FilesView.jsx) and attachment handler in [`ChatView.jsx`](file:///c:/Users/Atharv/OneDrive/Desktop/SIH/frontend/src/components/workbench/ChatView.jsx)
- **Timeout**: `15000ms`

#### Request Body:
- `file`: Binary file upload (`.pdf`, `.docx`, `.xlsx`, `.txt`, `.py`)

#### Success Response (`200 OK`):
```json
{
  "ok": true,
  "document_id": "DOC-7f2a1b9c",
  "filename": "MRPL_FCCU_Operating_Manual_Rev4.pdf",
  "char_count": 14250,
  "status": "done",
  "created_at": "08:45 PM",
  "text_preview": "MANGALORE REFINERY AND PETROCHEMICALS LIMITED\nFLUID CATALYTIC CRACKING UNIT (FCCU) REV 4\nSection 4.1: Operating limits for main fractionator column...",
  "full_text": "..."
}
```

---

### 6. Sovereign SOP Knowledge Retrieval (RAG)

- **Endpoint**: `POST /api/v1/rag/search` (also supports `POST /api/v1/rag`)
- **Headers**: `Content-Type: application/json`
- **Frontend Caller**: `handleSearch` in [`RAGView.jsx`](file:///c:/Users/Atharv/OneDrive/Desktop/SIH/frontend/src/components/workbench/RAGView.jsx)
- **Timeout**: `6000ms`

#### Request Body:
```json
{
  "query": "pump vibration thresholds",
  "top_k": 3
}
```

#### Success Response (`200 OK`):
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
      "content": "Standard API 610 / ISO 10816-3 guidelines for horizontal split-case pumps:\n- Overall vibration velocity RMS shall not exceed 2.8 mm/s in newly overhauled units.\n- Alarm trigger threshold is 4.5 mm/s RMS; emergency shutdown trip at 7.1 mm/s RMS.",
      "tags": ["pump", "vibration", "api610", "mechanical seal"],
      "source": "MRPL_FCCU_Operating_Manual_Rev4.pdf"
    }
  ]
}
```

---

### 7. Deliverable Generation (Word & Excel)

- **Endpoint**: `POST /api/v1/documents/generate` (also aliased to `POST /api/v1/generate`)
- **Headers**: `Content-Type: application/json`
- **Frontend Caller**: `handleGenerate` in [`DocumentsView.jsx`](file:///c:/Users/Atharv/OneDrive/Desktop/SIH/frontend/src/components/workbench/DocumentsView.jsx)
- **Timeout**: `10000ms`

#### Request Body:
```json
{
  "title": "Centrifugal Pump P-102 Overhaul Inspection Memo",
  "findings": "Inspection completed according to API 610. Vibration velocity RMS measured at 2.1 mm/s. Safe for continuous operation.",
  "author": "Lead Inspection Engineer, MRPL",
  "doc_format": "docx"
}
```

#### Success Response (`200 OK`):
```json
{
  "ok": true,
  "status": "success",
  "filename": "centrifugal_pump_p102_overhaul_memo.docx",
  "download_url": "/api/v1/documents/download/centrifugal_pump_p102_overhaul_memo.docx",
  "file_path": "C:\\Users\\Atharv\\OneDrive\\Desktop\\SIH\\backend\\outputs\\centrifugal_pump_p102_overhaul_memo.docx",
  "title": "Centrifugal Pump P-102 Overhaul Inspection Memo",
  "document_type": "docx",
  "sovereign_status": "PASS_0_EXTERNAL_EGRESS"
}
```

---

### 8. Deliverable Download

- **Endpoint**: `GET /api/v1/documents/download/{filename}` (also aliased to `/api/v1/download/{filename}`)
- **Frontend Caller**: Direct browser download link `<a download href="...">`
- **Response**: Binary stream (`application/vnd.openxmlformats-officedocument.wordprocessingml.document` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`)

---

### 9. Immutable Audit Trail

- **Endpoint**: `GET /api/v1/audit?limit=100`
- **Headers**: None
- **Frontend Caller**: `fetchLogs` in [`AuditView.jsx`](file:///c:/Users/Atharv/OneDrive/Desktop/SIH/frontend/src/components/workbench/AuditView.jsx)
- **Timeout**: `4000ms`

#### Success Response (`200 OK`):
```json
{
  "ok": true,
  "count": 2,
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
      "details": "Query: centrifugal pump vibration limits | Retr: MRPL-SOP-001 | 380ms"
    }
  ]
}
```

---

## 4. Standardized Error Format

When an endpoint fails or the backend is offline, the backend or frontend wrapper produces the standard error signature:

```json
{
  "ok": false,
  "error": "Backend unavailable: Unable to reach the local Max AI service at 127.0.0.1:8000. Ensure FastAPI is running (uvicorn app.main:app --reload).",
  "endpoint": "/api/v1/...",
  "isBackendOffline": true
}
```
