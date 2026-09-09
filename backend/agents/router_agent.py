ACTION_TRIGGERS = ["open", "launch", "start"]

def classify_action_intent(prompt: str):
    lower = prompt.lower()
    if not any(t in lower for t in ACTION_TRIGGERS):
        return None

    # Website intent checked first (e.g. "web whatsapp" shouldn't match app whatsapp)
    for phrase in ["web.whatsapp", "webwhatsapp", "whatsapp web"]:
        if phrase in lower:
            return {"task_type": "SYSTEM_ACTION", "action": "open_url", "target": "whatsapp"}
    for site in ["gmail", "youtube", "chatgpt"]:
        if site in lower:
            return {"task_type": "SYSTEM_ACTION", "action": "open_url", "target": site}

    # Native app intent
    for app in ["notepad", "chrome", "calculator", "excel"]:
        if app in lower:
            return {"task_type": "SYSTEM_ACTION", "action": "open_app", "target": app}

    return None