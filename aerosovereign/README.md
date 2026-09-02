# AeroSovereign

An AI-powered platform for aerospace/sovereign intelligence tasks — backed by a Dockerized LLM, a FastAPI backend, and a React frontend.

## Quick Start

```bash
# 1. Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 2. Start services
cd docker && docker compose up --build

# 3. Pull a model
bash scripts/download_models.sh

# 4. Open the UI
open http://localhost:5173
```

## Project Layout

```
aerosovereign/
├── backend/          FastAPI app + sandbox + document tools
├── frontend/         React + Vite UI
├── docker/           Docker Compose orchestration
├── docs/             API, setup, and architecture docs
├── sample_data/      Example input files
└── scripts/          Utility scripts
```

## Docs

- [API Reference](docs/API.md)
- [Setup Guide](docs/SETUP.md)
- [Architecture](docs/ARCHITECTURE.md)

## License

MIT
