# AeroSovereign — Setup Guide

## Prerequisites
- Docker ≥ 24 & Docker Compose v2
- Node.js ≥ 20 (for running the frontend locally)
- Python ≥ 3.11 (for local backend development)

---

## 1. Clone & configure

```bash
git clone <repo-url>
cd aerosovereign

# Backend env
cp backend/.env.example backend/.env

# Frontend env
cp frontend/.env.example frontend/.env
```

---

## 2. Start with Docker Compose

```bash
cd docker
docker compose up --build
```

Services:
| Service  | URL                         |
|----------|-----------------------------|
| Backend  | http://localhost:8000       |
| Model    | http://localhost:11434      |

---

## 3. Pull a model

```bash
bash scripts/download_models.sh
```

Or manually:
```bash
docker exec -it aerosovereign-model ollama pull llama3
```

---

## 4. Run the frontend locally

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## 5. Run the backend locally (without Docker)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
