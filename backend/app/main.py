from dotenv import load_dotenv
load_dotenv()

import sys
import os
import asyncio

backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import router
from app.logging_config import setup_logging
from app.db.client import init_pool

setup_logging()

app = FastAPI(
    title="AeroSovereign API",
    description="Backend API for AeroSovereign AI platform",
    version="1.0.0",
)

# Enable CORS for frontend workbench and landing page
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
async def startup():
    try:
        await init_pool()
    except Exception as e:
        # Graceful fallback if Postgres is not running during local inspection
        pass


@app.get("/")
async def root():
    return {
        "system": "AeroSovereign",
        "status": "ONLINE",
        "message": "AeroSovereign backend is running",
        "docs_url": "/docs",
        "api_v1": "/api/v1",
    }