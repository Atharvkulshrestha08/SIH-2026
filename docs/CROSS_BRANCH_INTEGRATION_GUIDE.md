# AeroSovereign: Cross-Branch Backend & Frontend Integration Guide
**Mangalore Refinery and Petrochemicals Limited (MRPL)**  
**Problem Statement PS-26117**: Sovereign On-Premise Agentic AI Workbench  
**Document Version**: 1.0.0 | **Audience**: Full-Stack Developers & System Integrators

---

## 1. Overview & Architecture Topology

In a production project workflow, different team members often work across separate Git branches:
- **`main`**: The primary integration branch containing the unified codebase and complete frontend application.
- **`S_backend`**: The specialized backend branch containing FastAPI routers, Supabase schema migrations, sandboxed code executors, and LLM model managers.
- **Feature Branches**: Independent development branches (e.g. `feat/rag-pipeline`, `feat/vision-ocr`).

This guide details exactly how to run, connect, and verify the frontend and backend running on different branches or unified branches.

```
+-------------------------------------------------------------+
|                     FRONTEND (React + Vite)                 |
|                     Port: http://localhost:5173              |
|                     Branch: main                            |
+------------------------------+------------------------------+
                               |
                   REST HTTP Requests (JSON)
                   VITE_API_URL: http://localhost:8000/api/v1
                   CORS Origin: http://localhost:5173
                               |
                               v
+-------------------------------------------------------------+
|                     BACKEND (FastAPI + Uvicorn)             |
|                     Port: http://localhost:8000              |
|                     Branch: S_backend (or main)             |
+------------------------------+------------------------------+
                               |
              +----------------+----------------+
              |                                 |
              v                                 v
+-----------------------------+   +-----------------------------+
|    Local Ollama LLM Host    |   |     PostgreSQL / Supabase   |
|  http://localhost:11434     |   |     Port: 5432 / Cloud DB   |
+-----------------------------+   +-----------------------------+
```

---

## 2. Three Strategies for Connecting Cross-Branch Work

### Strategy 1: Git Worktrees (Recommended Professional Workflow)
*Use this when you want to run the backend from the `S_backend` branch and the frontend from the `main` branch simultaneously on your machine without switching branches.*

Git worktrees allow you to check out multiple branches at once in separate sibling directories from the same repository:

```bash
# 1. From the repository root (c:\Users\Atharv\OneDrive\Desktop\SIH)
# Create a worktree for the S_backend branch in a sibling directory:
git worktree add ../SIH-backend S_backend

# Now you have two separate working directories:
# c:\Users\Atharv\OneDrive\Desktop\SIH          -> Running 'main' (Frontend)
# c:\Users\Atharv\OneDrive\Desktop\SIH-backend  -> Running 'S_backend' (Backend)
```

### Strategy 2: Merged Branch Workflow (Current Repository State)
*The clean, standard way once backend PRs are integrated.*
On `origin/main`, backend PRs #2, #3, and #4 have been merged into `main`. This means `main` contains **both** the full backend (`/backend`) and the full frontend (`/frontend`).
You can simply run both services directly from the single `main` working directory!

### Strategy 3: Separate Clone Workflow
*Use this if team members prefer completely independent folders:*
```bash
git clone https://github.com/Atharvkulshrestha08/SIH-2026.git backend-service
cd backend-service
git checkout S_backend
```

---

## 3. Step-by-Step Connection & Execution Runbook

### Step 1: Configure Backend Environment
Navigate to the backend directory (`c:\Users\Atharv\OneDrive\Desktop\SIH\backend` or `../SIH-backend`):
1. Create or verify `backend/.env`:
```env
# Server Configuration
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=development
LOG_LEVEL=info

# CORS Settings (ALLOW FRONTEND PORT 5173)
CORS_ORIGINS=["http://localhost:5173","http://127.0.0.1:5173","http://localhost:3000"]

# Sovereign LLM Host (Local Ollama)
OLLAMA_HOST=http://127.0.0.1:11434
DEFAULT_MODEL=deepseek-r1:14b

# Supabase / PostgreSQL Credentials
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-or-service-key
DATABASE_URL=postgresql://postgres:password@localhost:5432/aerosovereign
```

2. Initialize Python Virtual Environment & Install Dependencies:
```bash
cd backend
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
```

3. Launch Backend with Uvicorn:
```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
*Expected Terminal Output*:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Application startup complete.
```

---

### Step 2: Configure Frontend Environment
In a second terminal, navigate to the frontend directory:
1. Verify `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_AIR_GAPPED_MODE=true
```

2. Install Node Dependencies & Launch Vite:
```bash
cd frontend
npm install
npm run dev
```
*Expected Terminal Output*:
```
  VITE v5.4.21  ready in 320 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 4. API Endpoints Mapping & Contract Reference

The frontend `api.js` calls these specific FastAPI backend endpoints:

| Frontend Function (`api.js`) | HTTP Method | Backend URL Path | Payload / Query | Backend Router |
| :--- | :--- | :--- | :--- | :--- |
| `getStatus()` | `GET` | `/api/v1/status` | None | `app/routers/status.py` |
| `askModel(prompt, model)` | `POST` | `/api/v1/ask` | `{"prompt": "...", "model": "auto"}` | `app/routers/ask.py` |
| `executeCode(code)` | `POST` | `/api/v1/execute` | `{"code": "...", "timeout": 10}` | `app/routers/sandbox.py` |
| `searchRag(query)` | `POST` | `/api/v1/rag/search` | `{"query": "...", "top_k": 3}` | `app/routers/rag.py` |
| `generateDocument(data)` | `POST` | `/api/v1/documents/generate`| `{"title": "...", "body": "..."}` | `app/routers/documents.py` |
| `getAudit()` | `GET` | `/api/v1/audit` | None | `app/routers/audit.py` |
| `uploadFile(file)` | `POST` | `/api/v1/upload` | `multipart/form-data` | `app/routers/upload.py` |

---

## 5. Verifying Cross-Origin Communication (CORS)

In `backend/app/main.py`, ensure the CORS middleware allows `http://localhost:5173`:

```python
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

If you see `Access to fetch at 'http://localhost:8000/api/v1/status' from origin 'http://localhost:5173' has been blocked by CORS policy`, verify:
1. `origins` in FastAPI includes the exact protocol, domain, and port (`http://localhost:5173` without trailing slash).
2. The browser is not caching old OPTIONS preflight responses (test in Incognito or Hard Refresh `Ctrl+Shift+R`).

---

## 6. Verification Checklist

1. [ ] **Backend Health Check**: Open `http://localhost:8000/docs` in your browser. You should see the interactive Swagger UI listing all `/api/v1` routes.
2. [ ] **Frontend Telemetry Check**: Open `http://localhost:5173/workbench`. The top telemetry bar should display live CPU/RAM metrics and `AIR_GAPPED_0_EGRESS`.
3. [ ] **Sandbox Execution Check**: Go to the **Sandbox** tab in the Workbench, click "Run Sandbox Verification". Output should display `Calculated Hoop Stress: 177.55 MPa` with `STATUS: WARNING`.
4. [ ] **Ollama Model Check**: Run `curl http://localhost:11434/api/tags` to ensure local weights are registered.
