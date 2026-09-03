# AeroSovereign — Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser / Client                  │
│         React + Vite (port 5173)                     │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP (REST)
┌─────────────────────▼───────────────────────────────┐
│               FastAPI Backend (port 8000)            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  /ask    │ │ /upload  │ │ /execute │ │/status │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┘ │
│       │            │            │                    │
│  model_manager  documents/  sandbox/                 │
│       │         extract.py  executor.py              │
└───────┼─────────────────────────────────────────────┘
        │ HTTP (Ollama API)
┌───────▼──────────────────────────────────────────── ┐
│          Model Server — Ollama (port 11434)          │
│          (runs inside Docker container)              │
│          Models stored in: ollama_data volume        │
└─────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component           | Responsibility                                      |
|---------------------|-----------------------------------------------------|
| `frontend/`         | React UI — prompt input, file upload, code runner   |
| `backend/app/`      | FastAPI application, routing, business logic        |
| `models/model_manager.py` | Proxies inference requests to Ollama server   |
| `documents/`        | Text extraction & document generation               |
| `sandbox/executor.py` | Isolated subprocess code execution               |
| `docker-compose.yml`| Orchestrates backend + model containers             |
