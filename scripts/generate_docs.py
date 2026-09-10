import os
import subprocess

DOCS_DIR = os.path.abspath("docs")
os.makedirs(DOCS_DIR, exist_ok=True)

HTML_FRONTEND_DOC = os.path.join(DOCS_DIR, "frontend_documentation.html")
PDF_FRONTEND_DOC = os.path.join(DOCS_DIR, "MAX_FRONTEND_DOCUMENTATION.pdf")
MD_FRONTEND_DOC = os.path.join(DOCS_DIR, "MAX_FRONTEND_DOCUMENTATION.md")

HTML_INTEGRATION_DOC = os.path.join(DOCS_DIR, "cross_branch_integration_guide.html")
PDF_INTEGRATION_DOC = os.path.join(DOCS_DIR, "CROSS_BRANCH_INTEGRATION_GUIDE.pdf")
MD_INTEGRATION_DOC = os.path.join(DOCS_DIR, "CROSS_BRANCH_INTEGRATION_GUIDE.md")

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# ==============================================================================
# 1. FRONTEND DOCUMENTATION CONTENT (Markdown & HTML)
# ==============================================================================

FRONTEND_MD_CONTENT = r"""# AeroSovereign: Frontend Architecture & Comprehensive Specification
**Mangalore Refinery and Petrochemicals Limited (MRPL)**  
**Problem Statement PS-26117**: Sovereign On-Premise Agentic AI Workbench using Open-Weight Multimodal LLMs for Confidential Industrial Work  
**Document Version**: 1.0.0 | **Classification**: Confidential Industrial PSU

---

## 1. Executive Summary

AeroSovereign is an air-gapped, on-premise industrial AI workbench engineered specifically for confidential PSU engineering environments (refineries, petrochemical units, and defence installations). The frontend provides a mission-critical, high-assurance web interface that enables plant engineers to:
1. Conduct multi-step engineering calculations verified against **ASME Section VIII** and **API 610** standards.
2. Interrogate confidential P&IDs, metallurgical schematics, and equipment inspection logs using self-hosted vision and multimodal models.
3. Query plant standard operating procedures (SOPs) through an on-premise vector database (RAG).
4. Auto-generate formal engineering compliance memos backed by a cryptographic SHA-256 audit ledger.
5. Guarantee zero external data egress through physical and software air-gap telemetry monitors.

---

## 2. Frontend Architecture & Technology Stack

### Core Technologies
- **UI Framework**: React 18 (`react`, `react-dom`)
- **Build Tool & Dev Server**: Vite 5 (`vite`, `@vitejs/plugin-react`)
- **Client-Side Routing**: React Router v6 (`react-router-dom`)
- **Iconography**: Lucide React (`lucide-react` v0.395.0)
- **Styling Paradigm**: Vanilla CSS Design Tokens (Strictly avoiding generic Tailwind/Stitch bloat)
- **Hardware Rendering**: 60 FPS HTML5 2D Canvas with exponential lerp smoothing (`requestAnimationFrame`)
- **Frame Sequence Buffer**: 90 pre-rendered WebP high-resolution frames (`/frames/laptop/`)

### Design Aesthetics & Visual Tokens
- **Theme**: Deep Cyber-Industrial Dark Mode (`#030712`, `#0b1120`, `#0f172a`)
- **Primary Accents**: High-contrast Neon Cyan (`#06b6d4`, `#22d3ee`), Emerald Green (`#10b981`, `#34d399`), Amber Alert (`#f59e0b`)
- **Typography**: `Plus Jakarta Sans` (display and headings), `JetBrains Mono` (engineering telemetry, code, and calculation logs)
- **Visual Effects**: Glassmorphic panels (`backdrop-filter: blur(16px)`), subtle radial glow gradients, telemetry scanlines

---

## 3. Application Routing Structure

The application defines a dual-surface routing architecture in `frontend/src/App.jsx`:

| Route | Component | File Path | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage` | `frontend/src/pages/LandingPage.jsx` | Public-facing / stakeholder executive landing page, hardware reveal scroller, capabilities matrix, and interactive live demo playground |
| `/workbench` | `Home` | `frontend/src/pages/Home.jsx` | Industrial engineering operations workbench: live zero-egress telemetry, LLM reasoning studio, ASME sandbox, RAG query, memo generator, and audit ledger |

---

## 4. Landing Page (`/`): Component Breakdown

### 4.1 Navbar (`Navbar.jsx`)
- **Brand Title**: `AeroSovereign` with industrial cyan accents.
- **Organization Emblem**: Tagged with MRPL Problem Statement 26117.
- **Sovereign Status Pill**: Real-time status badge showing `AIR-GAPPED 0 KB/s EGRESS`.
- **Navigation Anchors**: Smooth scroll to `#hardware-reveal`, `#capabilities`, `#architecture`, `#use-cases`, and `#live-demo`.
- **Primary Action**: "Launch Workbench" button routed to `/workbench`.

### 4.2 Hero Section (`HeroSection.jsx`)
- **Eyebrow Badge**: `MRPL • PROBLEM STATEMENT 26117`.
- **Main Heading**: "AeroSovereign: Sovereign On-Premise Agentic AI Workbench".
- **Mission Statement**: Explicitly highlights local air-gapped GPU inference for confidential refinery P&IDs, ASME code calculations, and zero external network leakage.
- **CTAs**: "Launch Sovereign Workbench" (`/workbench`) and "Inspect Private GPU Node" (scrolls to hardware reveal).
- **Industrial Security Emblem**: Interactive 3D shield and chip badge detailing:
  - Isolation: `AIR-GAPPED`
  - Inference: `LOCAL GPU`
  - Organization: `MRPL PSU`
  - Egress Leak: `0 KB LEAK`
- **Interactive Mouse Indicator**: Direct smooth-scroll trigger to the hardware scrubber.

### 4.3 Laptop & GPU Scroller (`LaptopGpuScroller.jsx`)
- **Hardware Sequence**: 90-frame pre-rendered WebP canvas sequence displaying the engineering laptop dropping, unfolding, and exploding into the dual GPU silicon core.
- **Canvas Rendering Engine**:
  - Exponential lerp smoothing: `currentFrame += (targetFrame - currentFrame) * 0.18`.
  - 16:9 aspect-fit math with automatic DPR scaling and anti-aliasing.
  - Initial 15-frame buffer preloading for immediate rendering without stutter.
- **4 Sticky Scroller Stages**:
  1. *Stage 1 (0% - 25%)*: Sovereign Mobile Workstation (Field-ruggedized casing).
  2. *Stage 2 (25% - 50%)*: 180° Precision Hinge Deployment (Dual 4K HDR displays).
  3. *Stage 3 (50% - 75%)*: Exploded Component Architecture (Vapor chamber, ECC memory, hardware kill switch).
  4. *Stage 4 (75% - 100%)*: Dual NVIDIA RTX 5090 Ada Silicon Core (32GB VRAM, local GGUF/AWQ model inference).
- **Interactive Scrubber Controls**: Direct step buttons (`Field Rugged`, `Deploy Screen`, `Exploded View`, `Dual GPU Core`) allowing users to scrub to specific frames directly.

### 4.4 Features Section (`FeaturesSection.jsx`)
Features 4 core industrial capability cards with icons, metrics, and security badges:
1. **Deterministic Engineering Calculations**: ASME Section VIII Div 1/2, API 610 pump dynamics, ISO 10816 vibration severity.
2. **Private Multimodal Document Vision**: High-resolution OCR and layout understanding for confidential P&IDs and isometric drawings.
3. **Air-Gapped Hybrid RAG Architecture**: On-premise vector embeddings and BM25 hybrid search over refinery technical manuals.
4. **Cryptographic Audit Ledger**: Immutable SHA-256 action logging guaranteeing evidentiary compliance for PSU audits.

### 4.5 Sovereignty Architecture Section (`SovereigntyArchSection.jsx`)
- **Direct Side-by-Side Comparison**:
  - *Public Cloud AI (Commercial APIs)*: Data leaves refinery premises, shared tenant risks, subject to internet downtime and external subpoenas.
  - *AeroSovereign On-Premise Core*: Physically isolated network, zero egress bytes, private GPU server racks, local weights only.
- **Architecture Pipeline Diagram**: Visual pipeline showing User Request -> Air-Gapped Firewall -> Local Model Router (Qwen/DeepSeek/Llama) -> Code Sandbox / Vector DB -> Cryptographic Hash -> Verified Response.

### 4.6 Industrial Use Cases (`IndustrialUseCases.jsx`)
Interactive tabbed showcase of 4 real-world refinery scenarios:
1. **ASME Pressure Vessel Shell Assessment**: Barlow's formula calculation for internal pressure tolerances.
2. **API 610 Centrifugal Pump Flow Dynamics**: Volumetric throughput and velocity compliance verification.
3. **ISO 10816 Vibration Severity Analysis**: Tri-axial RMS vibration zone classification (Zones A to D).
4. **Refinery NDT Compliance Memo**: Automated non-destructive testing approval generation.

### 4.7 Live Demo Section (`LiveDemoSection.jsx`)
An interactive, client-side simulation studio where prospective evaluators can:
- Select from 3 pre-built refinery prompts (Pressure Vessel Wall Thickness, API 610 Pump Cavitation, Ultrasonic Flaw in Cracker Unit).
- Trigger a simulated local air-gapped inference query.
- View step-by-step reasoning tokens, formula derivation, and ASME safety threshold verification.

### 4.8 Footer (`Footer.jsx`)
- Institutional metadata, copyright, air-gapped deployment stamp, and direct navigation links.

---

## 5. Engineering Workbench (`/workbench` - `Home.jsx`)

The Workbench is the operational cockpit for MRPL chemical, mechanical, and safety engineers.

### 5.1 Real-Time Telemetry Bar
- **Platform**: `Local Air-Gapped Sovereign Node`
- **CPU & RAM Gauges**: Live percentage utilization metrics.
- **GPU Accelerator**: `NVIDIA RTX 5090 (24GB VRAM)` with live VRAM tracker.
- **Network Egress Monitor**: `0 KB Egress` with prominent green badge.
- **Active Local Weights**: Displays loaded models (`DeepSeek-R1-14B`, `Qwen2.5-Coder-7B`, `Llama-3.2-Vision-11B`).

### 5.2 Five Operational Tabs
1. **Ask / LLM Studio**:
   - Model dropdown: Auto-Routing, DeepSeek-R1 (Reasoning), Qwen-2.5-Coder (Code), Llama-3.2-Vision (Multimodal).
   - Prompt input with syntax highlighting.
   - Outputs: Direct model answer, reasoning thoughts, and execution timestamp.
2. **ASME & API Code Execution Sandbox**:
   - Python code editor pre-populated with presets:
     - Hoop Stress (Barlow's Formula) for ASME SA-516 Grade 70 steel.
     - API 610 Centrifugal Pump Volumetric Flow.
     - ISO 10816-3 Vibration Severity Assessment.
   - Execution console displaying return code, stdout, stderr, and PASS/FAIL safety badges.
3. **Sovereign RAG Search**:
   - Query input searching indexed refinery documentation.
   - Results display filename, relevance score (e.g. 94%), and matching text excerpt.
4. **Compliance Document Generator**:
   - Document metadata inputs (Title, Unit Name, Standard).
   - Generates formal ASME Section VIII compliance memo with digital signature stamp and export triggers.
5. **Tamper-Evident Audit Ledger**:
   - Real-time tabular log of every action taken in the session.
   - Fields: Timestamp, User ID, Task Type, Status, and Cryptographic SHA-256 Hash.

---

## 6. Service & API Layer (`api.js`)

The service module (`frontend/src/services/api.js`) provides:
1. **Dynamic URL Binding**: Reads `import.meta.env.VITE_API_URL` with fallback to `http://127.0.0.1:8000/api/v1`.
2. **Resilient Abort Signals**: All fetch calls include 2000ms–5000ms timeout signals (`AbortSignal.timeout()`).
3. **Graceful Offline Fallback**: If the FastAPI backend is not yet booted, the frontend seamlessly returns deterministic industrial mock telemetry and calculations, ensuring demonstrations never fail with raw network errors.

---

## 7. Configuration & Environment Variables (`.env`)

Located at `frontend/.env`:
```env
# Backend API Base URL
VITE_API_URL=http://localhost:8000/api/v1

# Application Identity
VITE_APP_TITLE="AeroSovereign AI Workbench"
VITE_ORGANIZATION="Mangalore Refinery and Petrochemicals Limited (MRPL)"
VITE_PROBLEM_STATEMENT="PS-26117"

# Sovereign Mode Flags
VITE_AIR_GAPPED_MODE=true
VITE_DEFAULT_MODEL="DeepSeek-R1-14B"
```
"""

# ==============================================================================
# 2. CROSS-BRANCH INTEGRATION GUIDE CONTENT (Markdown & HTML)
# ==============================================================================

INTEGRATION_MD_CONTENT = r"""# AeroSovereign: Cross-Branch Backend & Frontend Integration Guide
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
"""

# ==============================================================================
# 3. HTML GENERATION WITH CSS FOR BEAUTIFUL PDF PRINTING
# ==============================================================================

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<style>
  @page {{
    size: A4;
    margin: 1.8cm 1.5cm 1.8cm 1.5cm;
    @bottom-center {{
      content: "Page " counter(page) " of " counter(pages);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 8pt;
      color: #64748b;
    }}
  }}

  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    line-height: 1.6;
    font-size: 10pt;
    margin: 0;
    padding: 0;
  }}

  .header-badge {{
    background: #0f172a;
    color: #38bdf8;
    padding: 6px 14px;
    font-family: Consolas, monospace;
    font-size: 8.5pt;
    font-weight: 700;
    letter-spacing: 0.08em;
    border-radius: 4px;
    display: inline-block;
    margin-bottom: 12px;
    border-left: 4px solid #0284c7;
  }}

  h1 {{
    color: #0f172a;
    font-size: 20pt;
    margin: 0 0 8px 0;
    font-weight: 800;
    letter-spacing: -0.02em;
    border-bottom: 2px solid #0284c7;
    padding-bottom: 8px;
  }}

  h2 {{
    color: #0369a1;
    font-size: 13pt;
    margin: 24px 0 10px 0;
    font-weight: 700;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 4px;
    page-break-after: avoid;
  }}

  h3 {{
    color: #0f172a;
    font-size: 10.5pt;
    margin: 16px 0 6px 0;
    font-weight: 600;
    page-break-after: avoid;
  }}

  p {{
    margin: 0 0 8px 0;
  }}

  ul, ol {{
    margin: 0 0 12px 0;
    padding-left: 20px;
  }}

  li {{
    margin-bottom: 4px;
  }}

  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 16px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }}

  th {{
    background-color: #0f172a;
    color: #f8fafc;
    text-align: left;
    padding: 8px 10px;
    font-weight: 600;
    border: 1px solid #334155;
  }}

  td {{
    padding: 6px 10px;
    border: 1px solid #e2e8f0;
    vertical-align: top;
  }}

  tr:nth-child(even) td {{
    background-color: #f8fafc;
  }}

  code {{
    font-family: Consolas, "Courier New", monospace;
    background-color: #f1f5f9;
    color: #0369a1;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 8.5pt;
    border: 1px solid #e2e8f0;
  }}

  pre {{
    background-color: #0f172a;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 6px;
    font-family: Consolas, monospace;
    font-size: 8pt;
    line-height: 1.45;
    overflow-x: auto;
    margin: 10px 0 14px 0;
    border-left: 4px solid #38bdf8;
    page-break-inside: avoid;
  }}

  pre code {{
    background: transparent;
    color: inherit;
    padding: 0;
    border: none;
  }}

  .alert-box {{
    background-color: #eff6ff;
    border-left: 4px solid #2563eb;
    padding: 10px 14px;
    margin: 12px 0;
    border-radius: 4px;
    font-size: 9pt;
  }}

  .meta-table {{
    margin-bottom: 20px;
    width: 100%;
  }}

  .meta-table td {{
    border: none;
    padding: 3px 0;
    font-size: 9pt;
  }}

  .pill {{
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 7.5pt;
    font-weight: 600;
    text-transform: uppercase;
  }}

  .pill-green {{ background: #dcfce7; color: #15803d; }}
  .pill-blue {{ background: #e0f2fe; color: #0369a1; }}
  .pill-amber {{ background: #fef3c7; color: #b45309; }}
</style>
</head>
<body>
{content}
</body>
</html>
"""

def markdown_to_html_body(md_text):
    # Quick, robust converter for standard elements
    lines = md_text.splitlines()
    html_out = []
    in_code_block = False
    code_block_lines = []
    in_list = False
    in_table = False
    table_rows = []

    for line in lines:
        stripped = line.strip()

        # Code block toggle
        if stripped.startswith("```"):
            if in_code_block:
                in_code_block = False
                code_text = "\\n".join(code_block_lines)
                code_text = code_text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                html_out.append(f"<pre><code>{code_text}</code></pre>")
                code_block_lines = []
            else:
                in_code_block = True
            continue

        if in_code_block:
            code_block_lines.append(line)
            continue

        # Tables
        if "|" in line and ("---" in line or line.startswith("|")):
            if not in_table:
                in_table = True
                table_rows = []
            table_rows.append(line)
            continue
        elif in_table:
            in_table = False
            # process table
            html_out.append(render_table(table_rows))
            table_rows = []

        # Lists
        if stripped.startswith("- ") or stripped.startswith("* "):
            if not in_list:
                in_list = True
                html_out.append("<ul>")
            item = stripped[2:].strip()
            item = inline_format(item)
            html_out.append(f"<li>{item}</li>")
            continue
        elif in_list and (not stripped or stripped.startswith("#")):
            in_list = False
            html_out.append("</ul>")

        # Headings
        if stripped.startswith("# "):
            html_out.append(f"<div class='header-badge'>MANGALORE REFINERY & PETROCHEMICALS LIMITED • PS-26117</div>")
            html_out.append(f"<h1>{inline_format(stripped[2:])}</h1>")
        elif stripped.startswith("## "):
            html_out.append(f"<h2>{inline_format(stripped[3:])}</h2>")
        elif stripped.startswith("### "):
            html_out.append(f"<h3>{inline_format(stripped[4:])}</h3>")
        elif stripped.startswith("---"):
            html_out.append("<hr style='border: 0; border-top: 1px solid #cbd5e1; margin: 16px 0;'/>")
        elif stripped:
            html_out.append(f"<p>{inline_format(stripped)}</p>")

    if in_list:
        html_out.append("</ul>")
    if in_table:
        html_out.append(render_table(table_rows))

    return "\\n".join(html_out)

def inline_format(text):
    import re
    # Bold
    text = re.sub(r'\\*\\*(.+?)\\*\\*', r'<strong>\\1</strong>', text)
    # Italic
    text = re.sub(r'\\*(.+?)\\*', r'<em>\\1</em>', text)
    # Inline code
    text = re.sub(r'`(.+?)`', r'<code>\\1</code>', text)
    return text

def render_table(rows):
    if len(rows) < 2:
        return ""
    headers = [c.strip() for c in rows[0].split("|") if c.strip()]
    data_rows = []
    for r in rows[2:]: # skip separator
        cols = [c.strip() for c in r.split("|")]
        if len(cols) >= 2:
            # remove empty first/last if leading/trailing pipe
            actual_cols = [c for c in cols[1:-1]] if r.strip().startswith("|") and r.strip().endswith("|") else [c for c in cols if c]
            if actual_cols:
                data_rows.append(actual_cols)

    table_html = ["<table><thead><tr>"]
    for h in headers:
        table_html.append(f"<th>{inline_format(h)}</th>")
    table_html.append("</tr></thead><tbody>")
    for r in data_rows:
        table_html.append("<tr>")
        for c in r:
            table_html.append(f"<td>{inline_format(c)}</td>")
        table_html.append("</tr>")
    table_html.append("</tbody></table>")
    return "".join(table_html)

# ==============================================================================
# 4. WRITE FILES AND COMPILE PDFS VIA EDGE HEADLESS
# ==============================================================================

print("1. Writing Markdown files...")
with open(MD_FRONTEND_DOC, "w", encoding="utf-8") as f:
    f.write(FRONTEND_MD_CONTENT)

with open(MD_INTEGRATION_DOC, "w", encoding="utf-8") as f:
    f.write(INTEGRATION_MD_CONTENT)

print("2. Generating HTML versions with print styling...")
html_front = HTML_TEMPLATE.format(title="AeroSovereign - Frontend Architecture & Docs", content=markdown_to_html_body(FRONTEND_MD_CONTENT))
with open(HTML_FRONTEND_DOC, "w", encoding="utf-8") as f:
    f.write(html_front)

html_integ = HTML_TEMPLATE.format(title="AeroSovereign - Cross-Branch Integration Guide", content=markdown_to_html_body(INTEGRATION_MD_CONTENT))
with open(HTML_INTEGRATION_DOC, "w", encoding="utf-8") as f:
    f.write(html_integ)

print("3. Compiling PDFs using Microsoft Edge headless...")
def print_to_pdf(html_file, pdf_file):
    cmd = [
        EDGE_PATH,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        f"--print-to-pdf={pdf_file}",
        html_file
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0 and os.path.exists(pdf_file):
        print(f"   [SUCCESS] Created: {pdf_file} ({os.path.getsize(pdf_file)} bytes)")
    else:
        print(f"   [ERROR] Failed to generate {pdf_file}: {res.stderr}")

print_to_pdf(HTML_FRONTEND_DOC, PDF_FRONTEND_DOC)
print_to_pdf(HTML_INTEGRATION_DOC, PDF_INTEGRATION_DOC)
print("Complete!")
