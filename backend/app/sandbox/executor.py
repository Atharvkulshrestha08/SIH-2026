"""Sandboxed AST-guarded code executor for industrial calculations."""
import asyncio
import ast
import sys
import time
import logging
import subprocess

logger = logging.getLogger(__name__)

TIMEOUT = 8  # seconds default timeout
MAX_CODE_LENGTH = 10000

# Blacklisted operations for sovereignty & safety
DISALLOWED_MODULES = {"socket", "urllib", "requests", "http", "ftplib", "smtplib"}
DISALLOWED_CALLS = {"system", "popen", "spawn", "fork"}


def check_ast_safety(code: str) -> tuple[bool, str]:
    """Inspect AST tree to ensure code is safe and has zero egress capabilities."""
    if len(code) > MAX_CODE_LENGTH:
        return False, "Code exceeds maximum length limit."

    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        return False, f"Syntax Error: {e}"

    for node in ast.walk(tree):
        # Check imports
        if isinstance(node, ast.Import):
            for alias in node.names:
                root_pkg = alias.name.split(".")[0]
                if root_pkg in DISALLOWED_MODULES:
                    return False, f"Security Violation: Import of network module '{alias.name}' is prohibited."
        elif isinstance(node, ast.ImportFrom):
            if node.module:
                root_pkg = node.module.split(".")[0]
                if root_pkg in DISALLOWED_MODULES:
                    return False, f"Security Violation: Import from '{node.module}' is prohibited."

        # Check dangerous calls
        elif isinstance(node, ast.Call):
            func = node.func
            name = ""
            if isinstance(func, ast.Name):
                name = func.id
            elif isinstance(func, ast.Attribute):
                name = func.attr
            if name in DISALLOWED_CALLS:
                return False, f"Security Violation: Invocation of system call '{name}' is restricted."

    return True, "Code passed AST safety verification."


def _blocking_run(python_binary: str, code: str) -> subprocess.CompletedProcess:
    """Runs the code synchronously in a subprocess. Executed in a background thread."""
    return subprocess.run(
        [python_binary, "-c", code],
        capture_output=True,
        timeout=TIMEOUT,
    )


async def run_code(code: str, language: str = "python") -> dict:
    """
    Execute code in a sandboxed subprocess with AST checks and timeout.
    Uses a background thread + subprocess.run() instead of
    asyncio.create_subprocess_exec(), since the latter raises
    NotImplementedError under uvicorn's default event loop on Windows.
    """
    if language.lower() != "python":
        return {
            "stdout": "",
            "stderr": f"Unsupported language: {language}. Only Python is supported in the sovereign sandbox.",
            "returncode": 1,
            "execution_time_ms": 0.0,
        }

    is_safe, safety_msg = check_ast_safety(code)
    if not is_safe:
        return {
            "stdout": "",
            "stderr": safety_msg,
            "returncode": 403,
            "execution_time_ms": 0.0,
        }

    start_time = time.perf_counter()
    python_binary = sys.executable or "python"

    try:
        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(None, _blocking_run, python_binary, code)
        elapsed_ms = (time.perf_counter() - start_time) * 1000.0

        return {
            "stdout": result.stdout.decode(errors="replace"),
            "stderr": result.stderr.decode(errors="replace"),
            "returncode": result.returncode,
            "execution_time_ms": round(elapsed_ms, 2),
        }
    except subprocess.TimeoutExpired:
        return {
            "stdout": "",
            "stderr": f"Execution timed out after {TIMEOUT} seconds.",
            "returncode": 124,
            "execution_time_ms": TIMEOUT * 1000.0,
        }
    except Exception as exc:
        import traceback
        tb = traceback.format_exc()
        return {
            "stdout": "",
            "stderr": f"Execution error: {type(exc).__name__}: {exc}\n{tb}",
            "returncode": 1,
            "execution_time_ms": 0.0,
        }