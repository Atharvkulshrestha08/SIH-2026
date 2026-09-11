from fastapi import APIRouter
from app.routes import ask, upload, execute, status, orchestrate, audit, rag, documents, voice

router = APIRouter(prefix="/api/v1")

router.include_router(ask.router, prefix="/ask", tags=["Ask"])
router.include_router(upload.router, prefix="/upload", tags=["Upload"])
router.include_router(execute.router, prefix="/execute", tags=["Execute"])
router.include_router(status.router, prefix="/status", tags=["Status"])
router.include_router(orchestrate.router, prefix="/orchestrate", tags=["Orchestrate"])
router.include_router(audit.router, prefix="/audit", tags=["Audit"])
router.include_router(rag.router, prefix="/rag", tags=["RAG"])
router.include_router(documents.router, prefix="/documents", tags=["Documents"])
router.include_router(voice.router, prefix="/voice", tags=["Voice"])