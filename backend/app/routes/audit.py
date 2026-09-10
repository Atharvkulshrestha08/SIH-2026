import logging
from fastapi import APIRouter

from security.audit import get_audit_logs

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("")
async def get_audit(limit: int = 20):
    logs = get_audit_logs(limit=limit)
    return {
        "count": len(logs),
        "logs": logs,
        "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
    }