from fastapi import APIRouter
from app.routes import ask, upload, execute, status, orchestrate, rag, documents, audit

router = APIRouter(prefix="/api/v1")

router.include_router(ask.router, prefix="/ask", tags=["Ask"])
router.include_router(upload.router, prefix="/upload", tags=["Upload"])
router.include_router(execute.router, prefix="/execute", tags=["Execute"])
router.include_router(status.router, prefix="/status", tags=["Status"])
router.include_router(orchestrate.router, prefix="/orchestrate", tags=["Orchestrate"])
router.include_router(rag.router, prefix="/rag", tags=["Knowledge Base & RAG"])
router.include_router(documents.router, prefix="/documents", tags=["Document Pipeline"])
router.include_router(audit.router, prefix="/audit", tags=["Security & Audit"])

# Aliases for backward and cross-component compatibility
router.add_api_route("/generate", documents.generate_document, methods=["POST"], tags=["Document Pipeline"], include_in_schema=False)
router.add_api_route("/download/{filename}", documents.download_file, methods=["GET"], tags=["Document Pipeline"], include_in_schema=False)
