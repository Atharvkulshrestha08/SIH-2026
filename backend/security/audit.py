"""Audit logging for all AI and sandbox actions."""
import datetime
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

# Keep a rolling in-memory audit log for real-time dashboard display
_AUDIT_LOGS: List[Dict[str, Any]] = []
MAX_AUDIT_LOGS = 100


def log_event(event_type: str, details: str, status: str = "SUCCESS") -> Dict[str, Any]:
    """Record an auditable sovereign event."""
    entry = {
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3],
        "event_type": event_type,
        "details": details,
        "status": status,
        "sovereign_check": "VERIFIED_LOCAL",
    }
    _AUDIT_LOGS.insert(0, entry)
    if len(_AUDIT_LOGS) > MAX_AUDIT_LOGS:
        _AUDIT_LOGS.pop()
    logger.info("AUDIT [%s]: %s (%s)", event_type, details, status)
    return entry


def get_audit_logs(limit: int = 20) -> List[Dict[str, Any]]:
    """Retrieve the most recent audit log entries."""
    return _AUDIT_LOGS[:limit]
