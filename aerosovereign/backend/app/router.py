from fastapi import APIRouter
from app.routes import ask, upload, execute, status

router = APIRouter(prefix="/api/v1")

router.include_router(ask.router, prefix="/ask", tags=["Ask"])
router.include_router(upload.router, prefix="/upload", tags=["Upload"])
router.include_router(execute.router, prefix="/execute", tags=["Execute"])
router.include_router(status.router, prefix="/status", tags=["Status"])
