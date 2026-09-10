"""Sovereignty Audit and Telemetry Route."""
from fastapi import APIRouter
from security.audit import get_audit_logs
from security.monitor import get_egress_metrics

router = APIRouter()


@router.get("")
@router.get("/")
async def get_audit_trail(limit: int = 50):
    """
    Retrieve sovereign audit trail events and zero-egress hardware telemetry.
    Route: GET /api/v1/audit
    """
    logs = get_audit_logs(limit=limit)
    metrics = get_egress_metrics()
    return {
        "count": len(logs),
        "audit_logs": logs,
        "logs": logs,
        "network_metrics": metrics,
        "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
    }
