import os
import time
from fastapi import APIRouter
import psutil, platform

from shared.schemas import SystemStatusResponse

router = APIRouter()

# Snapshot per-interface counters once, when this module loads (~app startup)
_baseline_counters = psutil.net_io_counters(pernic=True)

# Heuristic: skip interfaces whose name suggests loopback.
# On Windows this is typically "Loopback Pseudo-Interface 1" — adjust if yours differs.
LOOPBACK_HINTS = ("loopback", "lo")


def _external_bytes_sent_since_baseline() -> int:
    """Sum bytes sent on non-loopback interfaces since this module was loaded."""
    current = psutil.net_io_counters(pernic=True)
    total_delta = 0
    for nic, stats in current.items():
        if any(hint in nic.lower() for hint in LOOPBACK_HINTS):
            continue
        baseline = _baseline_counters.get(nic)
        if baseline is None:
            continue
        total_delta += max(0, stats.bytes_sent - baseline.bytes_sent)
    return total_delta


@router.get("/", response_model=SystemStatusResponse)
async def get_status():
    """Return service health, system info, and a real egress measurement."""
    egress_bytes = _external_bytes_sent_since_baseline()
    egress_status = (
        "AIR_GAPPED_0_EGRESS" if egress_bytes == 0
        else f"WARNING_{egress_bytes}_BYTES_SENT_EXTERNAL"
    )
    return SystemStatusResponse(
        status="ok",
        platform=platform.system(),
        cpu_percent=psutil.cpu_percent(interval=0.1),
        memory_percent=psutil.virtual_memory().percent,
        model_host=os.getenv("MODEL_HOST", "http://localhost:12434/engines/v1"),
        sovereign_network_egress_bytes=egress_bytes,
        egress_status=egress_status,
    )