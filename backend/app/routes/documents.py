import os
import logging
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.documents.generate import generate_docx_memo, generate_xlsx_sheet, DOC_OUTPUT_DIR
from shared.schemas import DocumentGenerateRequest
from security.audit import log_event

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/generate")
async def generate_document(request: DocumentGenerateRequest):
    try:
        if request.doc_format == "docx":
            filepath = generate_docx_memo(
                title=request.title,
                findings=request.findings,
                author=request.author,
            )
        elif request.doc_format == "xlsx":
            filepath = generate_xlsx_sheet(title=request.title)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported doc_format: {request.doc_format}")

        filename = os.path.basename(filepath)
        log_event(
            event_type="DOCUMENT_GENERATED",
            details=f"Generated {request.doc_format} document: {filename}",
            status="SUCCESS",
        )
        return {
            "status": "success",
            "filename": filename,
            "download_url": f"/api/v1/documents/download/{filename}",
            "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
        }
    except Exception as e:
        logger.error(f"Document generation failed: {e}")
        raise HTTPException(status_code=500, detail=f"Document generation failed: {e}")


@router.get("/download/{filename}")
async def download_document(filename: str):
    safe_name = os.path.basename(filename)  # prevent path traversal
    filepath = os.path.join(DOC_OUTPUT_DIR, safe_name)
    if not os.path.isfile(filepath):
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(filepath, filename=safe_name)