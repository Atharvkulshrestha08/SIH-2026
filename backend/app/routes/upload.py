from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import uuid
import os
import json

from app.db.client import get_pool
from app.documents.extract import extract_text

router = APIRouter()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/tmp/max/uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    """Upload a document, extract its text, and record it in Postgres."""
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

    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO documents (filename, extracted_findings, status)
            VALUES ($1, $2::jsonb, $3)
            RETURNING id, filename, status, created_at
            """,
            file.filename, findings_json, status,
        )

    return {
        "document_id": str(row["id"]),
        "filename": row["filename"],
        "status": row["status"],
        "created_at": row["created_at"].isoformat(),
        "extracted_preview": extracted_text[:300],
    }