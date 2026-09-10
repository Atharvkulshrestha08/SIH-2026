from dotenv import load_dotenv
load_dotenv()

import sys
import asyncio
if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.router import router
from app.logging_config import setup_logging
from app.db.client import init_pool

setup_logging()

app = FastAPI(
    title="MAX API",
    description="Backend API for MAX AI platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
async def startup():
    await init_pool()


@app.get("/")
async def root():
    return {"message": "MAX backend is running"}