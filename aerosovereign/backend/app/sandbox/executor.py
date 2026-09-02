"""Sandboxed code executor."""
import asyncio
import tempfile
import os

TIMEOUT = 10  # seconds


async def run_code(code: str, language: str = "python") -> dict:
    """
    Execute code in a temporary, isolated subprocess.

    Currently supports Python only. Extend `RUNNERS` for other languages.
    """
    RUNNERS = {
        "python": ["python3", "-c"],
    }

    if language not in RUNNERS:
        return {"stdout": "", "stderr": f"Unsupported language: {language}", "returncode": 1}

    cmd = RUNNERS[language] + [code]

    try:
        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=TIMEOUT)
        return {
            "stdout": stdout.decode(),
            "stderr": stderr.decode(),
            "returncode": proc.returncode,
        }
    except asyncio.TimeoutError:
        return {"stdout": "", "stderr": "Execution timed out.", "returncode": 124}
    except Exception as exc:
        return {"stdout": "", "stderr": str(exc), "returncode": 1}
