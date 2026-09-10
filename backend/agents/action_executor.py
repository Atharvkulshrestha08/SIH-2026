import os
import logging

logger = logging.getLogger(__name__)

ALLOWED_APPS = {
    "notepad": "notepad.exe",
    "calculator": "calc.exe",
    "chrome": "chrome.exe",
    "whatsapp": "whatsapp:",
    "docker": r"C:\ProgramData\Microsoft\Windows\Start Menu\Docker Desktop.lnk",

    # Office suite
    "word": "winword.exe",
    "excel": "excel.exe",
    "powerpoint": "powerpnt.exe",

    # Browsers
    "edge": "msedge.exe",
    "firefox": "firefox.exe",

    # System utilities
    "file explorer": "explorer.exe",
    "explorer": "explorer.exe",
    "task manager": "taskmgr.exe",
    "settings": "ms-settings:",
    "control panel": "control.exe",
    "command prompt": "cmd.exe",
    "cmd": "cmd.exe",
    "powershell": "powershell.exe",
    "paint": "mspaint.exe",
    "snipping tool": "ms-screenclip:",

    # Dev / media (common on a dev's laptop)
    "vscode": r"C:\Users\%USERNAME%\AppData\Local\Programs\Microsoft VS Code\Code.exe",
    "vs code": r"C:\Users\%USERNAME%\AppData\Local\Programs\Microsoft VS Code\Code.exe",
    "spotify": "spotify:",
    "vlc": "vlc.exe",
}

ALLOWED_FILE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "sample_data"))
ALLOWED_FILE_EXTENSIONS = {".xlsx", ".xls", ".docx", ".doc", ".pptx", ".ppt", ".pdf", ".csv", ".txt"}


def resolve_file_target(search_term: str):
    if not os.path.isdir(ALLOWED_FILE_ROOT):
        return None
    term = search_term.lower().strip()
    if not term:
        return None
    for fname in os.listdir(ALLOWED_FILE_ROOT):
        full_path = os.path.join(ALLOWED_FILE_ROOT, fname)
        if not os.path.isfile(full_path):
            continue
        if os.path.splitext(fname)[1].lower() not in ALLOWED_FILE_EXTENSIONS:
            continue
        if term in fname.lower():
            return full_path
    return None


def execute_action(action: str, target: str) -> dict:
    if action == "open_app":
        key = target.lower().strip()
        if key not in ALLOWED_APPS:
            return {"status": "denied", "detail": f"'{target}' not in allowed app list"}
        try:
            os.startfile(os.path.expandvars(ALLOWED_APPS[key]))
            logger.info(f"Opened app: {key}")
            return {"status": "success", "detail": f"Opened {target}"}
        except Exception as e:
            logger.error(f"Failed to open app {key}: {e}")
            return {"status": "error", "detail": f"Could not open {target}: {e}"}

    elif action == "open_file":
        full_path = resolve_file_target(target)
        if not full_path:
            return {"status": "denied", "detail": f"No accessible file matching '{target}' found"}
        try:
            os.startfile(full_path)
            fname = os.path.basename(full_path)
            logger.info(f"Opened file: {fname}")
            return {"status": "success", "detail": f"Opened {fname}"}
        except Exception as e:
            logger.error(f"Failed to open file {target}: {e}")
            return {"status": "error", "detail": f"Could not open file: {e}"}

    return {"status": "denied", "detail": "Unknown action type"}