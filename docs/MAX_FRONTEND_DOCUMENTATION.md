# MAX: Frontend Architecture & Comprehensive Specification
**Mangalore Refinery and Petrochemicals Limited (MRPL)**  
**Problem Statement PS-26117**: Sovereign On-Premise Agentic AI Workbench using Open-Weight Multimodal LLMs for Confidential Industrial Work  
**Document Version**: 1.0.0 | **Classification**: Confidential Industrial PSU

---

## 1. Executive Summary

MAX is an air-gapped, on-premise industrial AI workbench engineered specifically for confidential PSU engineering environments (refineries, petrochemical units, and defence installations). The frontend provides a mission-critical, high-assurance web interface that enables plant engineers to:
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
- **Brand Title**: `MAX` with industrial cyan accents.
- **Organization Emblem**: Tagged with MRPL Problem Statement 26117.
- **Sovereign Status Pill**: Real-time status badge showing `AIR-GAPPED 0 KB/s EGRESS`.
- **Navigation Anchors**: Smooth scroll to `#hardware-reveal`, `#capabilities`, `#architecture`, `#use-cases`, and `#live-demo`.
- **Primary Action**: "Launch Workbench" button routed to `/workbench`.

### 4.2 Hero Section (`HeroSection.jsx`)
- **Eyebrow Badge**: `MRPL • PROBLEM STATEMENT 26117`.
- **Main Heading**: "MAX: Sovereign On-Premise Agentic AI Workbench".
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
  - *MAX On-Premise Core*: Physically isolated network, zero egress bytes, private GPU server racks, local weights only.
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
VITE_APP_TITLE="MAX AI Workbench"
VITE_ORGANIZATION="Mangalore Refinery and Petrochemicals Limited (MRPL)"
VITE_PROBLEM_STATEMENT="PS-26117"

# Sovereign Mode Flags
VITE_AIR_GAPPED_MODE=true
VITE_DEFAULT_MODEL="DeepSeek-R1-14B"
```
