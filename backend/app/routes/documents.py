"""Document Generation and Download Routes."""
import os
import logging
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from shared.schemas import DocumentGenerateRequest
from app.documents.generate import generate_docx_memo, generate_xlsx_sheet, DOC_OUTPUT_DIR
from security.audit import log_event

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/generate")
@router.post("/generate/")
async def generate_document(request: DocumentGenerateRequest):
    """
    Generate signed .docx approval memos or .xlsx calculation workbooks.
    Route: POST /api/v1/documents/generate
    """
    try:
        findings = request.findings or request.body or "Operational inspection completed with zero critical anomalies."
        fmt = (request.doc_format or "docx").lower()

        if fmt == "xlsx":
            output_path = generate_xlsx_sheet(request.title)
        elif fmt == "docx":
            output_path = generate_docx_memo(request.title, findings, request.author)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported doc_format: {request.doc_format}")

        filename = os.path.basename(output_path)
        log_event(
            event_type="DELIVERABLE_GENERATED",
            details=f"Generated {filename} ({fmt.upper()}) for '{request.title}'",
            status="SUCCESS",
            model="Local Document Compiler",
        )
        return {
            "status": "success",
            "filename": filename,
            "download_url": f"/api/v1/documents/download/{filename}",
            "file_path": output_path,
            "title": request.title,
            "document_type": fmt,
            "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
        }
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Document generation failed: {exc}")
        log_event(
            event_type="DELIVERABLE_ERROR",
            details=f"Generation failed: {str(exc)}",
            status="ERROR",
            model="Local Document Compiler",
        )
        raise HTTPException(status_code=500, detail=f"Document generation failed: {exc}")


@router.get("/download/{filename}")
async def download_file(filename: str):
    """Download generated deliverable by filename safely."""
    safe_name = os.path.basename(filename)
    file_path = os.path.join(DOC_OUTPUT_DIR, safe_name)
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="Requested file not found")
    return FileResponse(file_path, filename=safe_name)
