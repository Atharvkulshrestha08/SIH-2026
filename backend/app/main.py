from fastapi import FastAPI
from app.router import router
from app.logging_config import setup_logging

setup_logging()

app = FastAPI(
    title="AeroSovereign API",
    description="Backend API for AeroSovereign AI platform",
    version="1.0.0",
)

app.include_router(router)


@app.get("/")
async def root():
    return {"message": "AeroSovereign backend is running"}