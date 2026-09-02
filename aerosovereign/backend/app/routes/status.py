from fastapi import APIRouter
import psutil, platform

router = APIRouter()


@router.get("/")
async def get_status():
    """Return basic service health and system info."""
    return {
        "status": "ok",
        "platform": platform.system(),
        "cpu_percent": psutil.cpu_percent(interval=0.1),
        "memory_percent": psutil.virtual_memory().percent,
    }
