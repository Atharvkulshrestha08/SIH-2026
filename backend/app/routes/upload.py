import datetime
from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import uuid
import os
import json

from app.db.client import get_pool
from app.documents.extract import extract_text
from security.audit import log_event

router = APIRouter()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", os.path.join(os.path.dirname(__file__), "..", "..", "uploads"))
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("")
@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    """Upload a document, extract its text, and record it in database or audit log."""
    file_id = str(uuid.uuid4())
    dest = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")

    try:
        with open(dest, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {exc}")

    try:
        extracted_text = extract_text(dest)
        status = "done"
    except Exception as exc:
        extracted_text = f"[Extraction failed: {exc}]"
        status = "failed"

    findings_json = json.dumps({"text": extracted_text})
    created_at = datetime.datetime.now().isoformat()
    doc_id = file_id

    try:
        pool = await get_pool()
        if pool:
            async with pool.acquire() as conn:
                row = await conn.fetchrow(
                    """
                    INSERT INTO documents (filename, extracted_findings, status)
                    VALUES ($1, $2::jsonb, $3)
                    RETURNING id, filename, status, created_at
                    """,
                    file.filename, findings_json, status,
                )
                doc_id = str(row["id"])
                created_at = row["created_at"].isoformat()
    except Exception:
        pass

    log_event(
        event_type="DOCUMENT_INGESTION",
        details=f"Uploaded {file.filename} ({len(extracted_text)} chars extracted)",
        status="SUCCESS" if status == "done" else "ERROR",
        model="Local Document Parser",
    )

    return {
        "document_id": doc_id,
        "filename": file.filename,
        "status": status,
        "created_at": created_at,
        "char_count": len(extracted_text),
        "text_preview": extracted_text[:500],
        "extracted_preview": extracted_text[:300],
    }