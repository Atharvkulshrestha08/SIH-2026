import subprocess
import os
import webbrowser
import logging

logger = logging.getLogger(__name__)

# Whitelist ONLY — nothing outside these maps can ever be triggered
ALLOWED_APPS = {
    "notepad": "notepad.exe",
    "chrome": "chrome.exe",
    "calculator": "calc.exe",
    "excel": "excel.exe",
}

ALLOWED_URLS = {
    "whatsapp": "https://web.whatsapp.com",
    "gmail": "https://mail.google.com",
    "youtube": "https://youtube.com",
    "chatgpt": "https://chat.openai.com",
}

ALLOWED_FILE_ROOT = os.path.abspath("sample_data")


def execute_action(action: str, target: str) -> dict:
    if action == "open_app":
        key = target.lower().strip()
        if key not in ALLOWED_APPS:
            return {"status": "denied", "detail": f"'{target}' not in allowed app list"}
        try:
            os.startfile(ALLOWED_APPS[key])
            logger.info(f"Opened app: {key}")
            return {"status": "success", "detail": f"Opened {target}"}
        except Exception as e:
            return {"status": "error", "detail": str(e)}

    elif action == "open_url":
        key = target.lower().strip()
        if key not in ALLOWED_URLS:
            return {"status": "denied", "detail": f"'{target}' not in allowed site list"}
        try:
            webbrowser.open(ALLOWED_URLS[key])
            logger.info(f"Opened URL: {key}")
            return {"status": "success", "detail": f"Opened {target} in browser"}
        except Exception as e:
            return {"status": "error", "detail": str(e)}

    elif action == "open_file":
        full_path = os.path.abspath(os.path.join(ALLOWED_FILE_ROOT, target))
        if not full_path.startswith(ALLOWED_FILE_ROOT) or not os.path.isfile(full_path):
            return {"status": "denied", "detail": f"'{target}' not accessible"}
        try:
            os.startfile(full_path)
            logger.info(f"Opened file: {target}")
            return {"status": "success", "detail": f"Opened {target}"}
        except Exception as e:
            return {"status": "error", "detail": str(e)}

    return {"status": "denied", "detail": "Unknown action type"}