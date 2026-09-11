# Product Requirements Document (PRD)

# MAX / MRPL-Workbench
### Sovereign Multi-Model Agentic AI Workbench for Industrial Operations

**Version:** 2.1  
**Architecture:** Multi-Model, Multi-Agent, On-Premise, Air-Gapped Dual-Node (2x 6GB GPUs)  
**Target Environment:** Refineries (MRPL), PSUs, Heavy Industry & Defense Organizations  

---

# 1. Product Overview

## 1.1 Vision
MAX is a **100% on-premise, zero-cloud-egress, multi-model Agentic AI workbench** designed for industrial environments where data sovereignty, safety, and auditability are non-negotiable.

Instead of a generic single-model chatbot, the platform orchestrates a **dynamic collection of specialized open-weight models** running on consumer hardware (Dual 6GB GPUs: RTX 4050 & RTX 3050).

The system integrates:
* **Real-time Voice Interface:** Ultra-fast local STT (`faster-whisper`) and sentence-streaming local TTS (`Piper-TTS` / `Kokoro-82M`).
* **Intelligent Task Routing:** Sub-100ms intent classification using `Qwen2.5-3B`.
* **Industrial Calculations:** AST-verified Python sandbox execution (`Qwen2.5-Coder-7B`).
* **Document & SOP RAG:** Multimodal PDF/P&ID extraction + local ChromaDB semantic search (`Llama-3.1-8B`).
* **Deliverable Generation:** Direct generation of signed `.docx` approval memos and `.xlsx` calculation workbooks.
* **Mission-Control Bento Dashboard:** Industrial dark-mode UI with live latency counters, VRAM gauges, and a real-time zero-egress network monitor.

---

# 2. System Architecture & Dual-Node Distribution

```text
                                [ React + Tailwind Bento Dashboard ]
                                                  │
                                                  ▼
==================================================================================================
  NODE 1: Interaction, Gateway & Fast Models (Ashutosh - RTX 4050 6GB)
==================================================================================================
  ├── Frontend Server:   Vite / React Dashboard (Bento Grid, Audio Visualizer, Live Preview)
  ├── Voice STT:         faster-whisper (tiny.en / small.en - Latency: <180ms)
  ├── Fast Task Router:  Qwen2.5-3B-Instruct (Intent Classifier - Latency: <90ms)
  ├── Voice TTS:         Piper-TTS (CPU Neural Engine - 0MB VRAM, Latency: <40ms)
  ├── Gateway API:       FastAPI Session Orchestrator & SSE Streaming Hub
  └── Security Layer:    Magic Bytes File Validator & Session Security
                                                  │
                                                  ▼ (Internal Offline LAN / HTTP)
==================================================================================================
  NODE 2: Deep Compute, Agents & RAG Engine (Partner - RTX 3050 6GB)
==================================================================================================
  ├── Specialist LLM 1:  Qwen2.5-Coder-7B-Instruct-Q4_K_M (Code & Math Specialist)
  ├── Specialist LLM 2:  Llama-3.1-8B-Instruct-Q4_K_M (SOP & Report Specialist)
  ├── Sandboxed Compute: AST-Guarded Python Runner (Math Verification & Step Logger)
  ├── Knowledge (RAG):   ChromaDB + bge-small-en-v1.5 embeddings over MRPL SOPs
  ├── Document Engine:   python-docx / openpyxl Automated Deliverable Generator
  └── Egress Daemon:     Scapy / Psutil Live Network Packet Monitor & Audit Log
==================================================================================================
```

---

# 3. Design Language & UI/UX Standards ("Vibe-Coding" Checklist)

The user interface follows a **Mission-Control Industrial Bento Grid** aesthetic:

* **Theme & Palette:** Ultra-sleek industrial dark mode (`#09090b` zinc base, `#18181b` card surfaces, `#06b6d4` neon cyan for sovereignty status, `#f59e0b` industrial amber for warnings).
* **Layout & Structure:** Responsive Bento Grid layout with rounded corners (`rounded-2xl`), subtle glassmorphism borders (`border border-white/10`), sticky navigation, and breadcrumbs.
* **Micro-Interactions:**
  * Live microphone audio waveform visualizer during speech.
  * Real-time typewriter text streaming for model responses.
  * One-click **Copy to Clipboard** with checkmark animation.
  * One-click **Download `.docx` / `.xlsx`** deliverable buttons with hover glow.
  * Split-screen preview: Scanned PDF on the left, generated `.docx` approval memo on the right.
  * Collapsible step-by-step math and code execution terminal.
* **Icons:** Lucide React icons throughout (ShieldCheck, Cpu, Terminal, Mic, FileText, Zap, Lock).

---

# 4. 20 Enterprise Safety & Air-Gap Hardening Features

To satisfy enterprise industrial security audits:

1. **Magic Bytes File Upload Validation:** Validates header bytes of uploaded PDFs/DOCX; strictly blocks executables, scripts, or macros.
2. **AST-Guarded Python Sandbox:** AST parser inspects generated Python code; forbids `os.system`, `subprocess`, socket connections, and disk modifications.
3. **Execution Timeout & Resource Caps:** Hard 5-second execution limit and 512MB RAM cap on all calculations.
4. **Zero Cloud Tokens / API Keys:** Zero external API keys in repo or runtime memory.
5. **Purged Git Secrets & Artifacts:** `.gitignore` blocks model binaries (`.gguf`, `.bin`), virtualenvs, and audio dumps.
6. **Local-Only Model Serving:** Ollama binds exclusively to `127.0.0.1`.
7. **Strict Pydantic Schema Validation:** All inter-node REST payloads are strictly typed.
8. **Live Outbound WAN Sniffer:** `scapy`/`psutil` monitors network cards and proves `0.00 KB/s` WAN egress.
9. **Immutable Audit Trail:** All tool calls, model decisions, timestamps, and calculation steps are written to a local JSON log.
10. **Human-in-the-Loop Verification:** Final approval memos require manual sign-off before being marked official.
11. **Isolated Inter-Node LAN:** Nodes communicate via private local subnet (`192.168.1.x`) with no gateway router needed.
12. **Input Sanitization & Escaping:** User inputs are sanitized to prevent prompt injection into tool execution.
13. **Local Encryption at Rest:** ChromaDB vectors and temporary session artifacts are stored locally in isolated directories.
14. **Graceful Node Fallback:** If Node 2 is busy, Node 1 queues requests with real-time UI status updates.
15. **Local Vector Database:** ChromaDB operates in-process with zero network telemetry.
16. **CPU-Isolated Voice Engines:** STT and TTS run without competing for GPU VRAM with LLMs.
17. **Model Health Checks:** Real-time `/health` probes ensure LLMs are loaded before dispatching jobs.
18. **Custom 404 & Error Boundaries:** React error boundaries capture model dropouts cleanly.
19. **Content Security Policy & Local Headers:** Prevents external script injection.
20. **Zero-Egress Certificate Display:** Real-time UI widget showing live cryptographic check of local loopback.

---

# 5. Live Performance Telemetry HUD

The top/bottom status bar displays real-time execution benchmarks:

| Metric | Target | Indicator in UI |
| :--- | :--- | :--- |
| **STT Latency** | $< 180\text{ ms}$ | `⚡ STT: 142ms` |
| **Router Classification** | $< 90\text{ ms}$ | `🎯 Router: 78ms (Qwen-3B)` |
| **TTS First Chunk** | $< 350\text{ ms}$ | `🔊 Voice: 310ms (Piper)` |
| **Sandbox Execution** | $< 1.2\text{ s}$ | `⚙️ Python Exec: 0.84s [Verified]` |
| **Sovereignty Status** | 100% Offline | `● 100% AIR-GAPPED (0 KB/s WAN)` |
| **GPU VRAM Utilization** | $< 5.2\text{ GB}$ per GPU | `Node 1: 2.2GB / Node 2: 4.7GB` |
