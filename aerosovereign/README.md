# AeroSovereign (MRPL-Workbench)

A **sovereign, offline-first, multi-model AI workbench** for engineering and inspection operations. AeroSovereign combines specialized local LLMs, retrieval-augmented search, document automation, voice, and vision into a single system that runs entirely on local infrastructure — with zero external API calls.

Built for the Smart India Hackathon (SIH), then extended into a production-grade 12-week product.

---

## ✨ Key Features

- **Multi-model architecture** — specialist models (code, reasoning, vision, etc.) routed intelligently per task
- **100% local / sovereign** — no external API calls; verifiable via a built-in network monitor
- **Document automation** — extract findings from PDFs, generate Word/Excel reports and approval memos
- **Code execution sandbox** — run and verify code safely, with results shown inline
- **Retrieval-Augmented Generation (RAG)** — semantic search over SOPs, manuals, and past records
- **Vision & multimodal** — analyze P&IDs, engineering drawings, scanned documents, and inspection photos
- **Voice interaction** — speech-to-text and text-to-speech pipeline
- **Security & auditability** — full audit trail, sandbox resource limits, encrypted local knowledge base
- **Scalable architecture** — optional 2-node (gateway + compute) deployment

---

## 🏗️ Architecture

```
aerosovereign/
├── backend/
│   ├── gateway/          # API, task router, STT/TTS
│   ├── agents/            # router, engineering, RAG, document, vision, orchestrator
│   ├── models/             # model manager + configs
│   ├── rag/                # ingestion, retrieval, embeddings
│   ├── sandbox/            # code executor + policies
│   ├── documents/          # extraction + generation (PDF/DOCX/XLSX)
│   ├── security/           # audit logger, network monitor, sandbox enforcer
│   └── tests/
│
├── frontend/
│   ├── src/
│   │   ├── components/ pages/ services/ stores/ assets/
│   └── tests/
│
├── docker/                # Dockerfile.backend, Dockerfile.frontend, docker-compose.yml
├── docs/                  # ARCHITECTURE.md, SETUP.md, API.md, WORKFLOWS.md, DEPLOYMENT.md
├── scripts/                # setup.sh, download_models.sh, run_tests.sh
└── sample_data/            # SOPs, inspection reports, test documents
```

**Team split:**
- **Backend / Infrastructure** — model serving, agents, API, RAG, sandbox/security, performance
- **Frontend / UX** — UI/UX, React/Vue implementation, workflows, docs, accessibility

---

## 🚀 Getting Started

> Full setup instructions live in [`docs/SETUP.md`](docs/SETUP.md).

### Prerequisites
- Python 3.10+, CUDA-capable GPU (e.g. RTX 3050/4050)
- Node.js (for the frontend)
- Ollama / vLLM for local model serving
- Docker (for full-stack deployment)

### Quick Start
```bash
# Clone the repo
git clone <repo-url>
cd aerosovereign

# Run setup script (installs deps, prepares environment)
./scripts/setup.sh

# Download required local models
./scripts/download_models.sh

# Start backend
cd backend && uvicorn gateway.main:app --reload

# Start frontend
cd frontend && npm install && npm run dev
```

Or run the full stack with Docker:
```bash
docker compose -f docker/docker-compose.yml up
```

---

## 🧩 Core Workflows

1. **Document Workflow** — Upload a PDF inspection report → extract findings → generate a Word approval memo
2. **Code Workflow** — Paste Python code → execute in sandbox → view verified results
3. **Multi-Step Engineering Workflow** *(later phase)* — inspection report → applicable SOP retrieval → engineering calculation → generated approval document, orchestrated across multiple specialist agents

---

## 🔒 Sovereignty & Security

AeroSovereign is designed to run **fully offline**:
- Real-time network egress monitoring (0 external calls, verifiable live)
- Comprehensive audit logging for every AI operation
- Sandboxed code execution with resource limits
- Local, encrypted knowledge base
- Access control and intrusion detection logging

---

## 🗺️ Development Roadmap

| Phase | Focus |
|---|---|
| **Week 1** | SIH prototype — core multi-model architecture, 2 workflows, sovereignty proof |
| **Week 2** | Code quality & architecture refactor |
| **Week 3** | Voice (STT + TTS) |
| **Week 4** | Advanced multi-model orchestration |
| **Week 5** | RAG system (local knowledge base) |
| **Week 6** | Vision & multimodal (P&IDs, scans, drawings) |
| **Week 7** | Full document pipeline (PDF/DOCX/XLSX, templates, approvals) |
| **Week 8** | 2-node architecture *(optional, for scalability)* |
| **Week 9** | Security & audit hardening |
| **Week 10** | Performance optimization & benchmarking |
| **Week 11** | Testing & QA (unit, integration, E2E) |
| **Week 12** | Production polish & deployment |

Full details in [`AeroSovereign_3Month_Roadmap.md`](AeroSovereign_3Month_Roadmap.md).

### Performance Targets

| Component | Target |
|---|---|
| Task routing | < 100 ms |
| RAG retrieval | < 150 ms |
| Code execution | < 1.5 s |
| PDF processing | < 3 s |
| Document generation | < 4 s |
| Model switching | < 500 ms |

---

## 🧪 Testing

- **Backend:** >80% code coverage (unit, integration, E2E, offline, failover tests)
- **Frontend:** >70% component coverage (UI, workflow, cross-browser, accessibility)
- CI/CD pipeline with 100+ automated tests

```bash
./scripts/run_tests.sh
```

---

## 📚 Documentation

| Doc | Description |
|---|---|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | System architecture and design decisions |
| [`docs/SETUP.md`](docs/SETUP.md) | Local development setup guide |
| [`docs/API.md`](docs/API.md) | API reference (OpenAPI/Swagger) |
| [`docs/WORKFLOWS.md`](docs/WORKFLOWS.md) | Supported workflows and usage |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Docker-based deployment guide |

---

## 👥 Team & Communication

- **Weekly standups:** Monday planning, Wednesday mid-week sync, Friday review
- **Daily:** Slack for quick sync, GitHub for code review, shared doc for decisions
- Architecture decisions tracked as ADRs; workflows documented as Mermaid diagrams

---