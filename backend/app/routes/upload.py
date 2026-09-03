from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil, uuid, os

router = APIRouter()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "/tmp/aerosovereign/uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    """Upload a document for processing."""
    file_id = str(uuid.uuid4())
    dest = os.path.join(UPLOAD_DIR, f"{file_id}_{file.filename}")
    try:
        with open(dest, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    return {"file_id": file_id, "filename": file.filename, "path": dest}
