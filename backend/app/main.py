from dotenv import load_dotenv
load_dotenv()

import sys
import asyncio
if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

from fastapi import FastAPI
from app.router import router
from app.logging_config import setup_logging
from app.db.client import init_pool

setup_logging()

app = FastAPI(
    title="AeroSovereign API",
    description="Backend API for AeroSovereign AI platform",
    version="1.0.0",
)

app.include_router(router)


@app.on_event("startup")
async def startup():
    await init_pool()


@app.get("/")
async def root():
    return {"message": "AeroSovereign backend is running"}