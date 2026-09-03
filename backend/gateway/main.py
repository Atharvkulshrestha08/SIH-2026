"""AeroSovereign Gateway Service Entry Point."""
import sys
import os

# Ensure backend root is on sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gateway.router import router

app = FastAPI(
    title="AeroSovereign Sovereign AI Workbench",
    description="Offline-first, Zero-Cloud-Egress Multi-Model Engineering Platform (Node 1/2 Orchestrator)",
    version="2.1.0",
)

# Enable CORS for local dev frontend (Vite runs on 5173, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
async def root():
    return {
        "system": "AeroSovereign",
        "version": "2.1.0",
        "mode": "100% On-Premise Air-Gapped",
        "status": "ONLINE",
        "docs_url": "/docs",
        "api_v1": "/api/v1",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("gateway.main:app", host="0.0.0.0", port=8000, reload=True)
