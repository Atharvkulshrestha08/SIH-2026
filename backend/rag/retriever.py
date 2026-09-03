"""RAG (Retrieval-Augmented Generation) retriever for SOPs and manuals."""
import os
import re
import logging
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

# Built-in sovereign SOP knowledge repository
DEFAULT_KNOWLEDGE_BASE = [
    {
        "id": "MRPL-SOP-001",
        "title": "Centrifugal Pump Operating Envelope & Vibration Thresholds",
        "content": (
            "Standard API 610 / ISO 10816-3 guidelines for horizontal split-case pumps:\n"
            "- Overall vibration velocity RMS shall not exceed 2.8 mm/s in newly overhauled units.\n"
            "- Alarm trigger threshold is 4.5 mm/s RMS; emergency shutdown trip at 7.1 mm/s RMS.\n"
            "- Mechanical seal flush plan API Plan 11/53B must maintain barrier fluid differential pressure of +1.5 bar over stuffing box pressure."
        ),
        "tags": ["pump", "vibration", "api610", "mechanical seal"],
    },
    {
        "id": "MRPL-SOP-002",
        "title": "Pressure Vessel Hydrostatic & Ultrasonic Wall Thickness Inspection",
        "content": (
            "ASME Section VIII Div 1 rules for refinery column inspection:\n"
            "- Nominal shell thickness: 24.5 mm. Minimum allowable wall thickness (MAWT): 18.2 mm.\n"
            "- If ultrasonic thickness gauge measures below 19.0 mm, de-rate design pressure or initiate immediate sleeve replacement.\n"
            "- Hydrostatic test pressure must equal 1.3 times the maximum allowable working pressure (MAWP)."
        ),
        "tags": ["pressure vessel", "thickness", "asme", "ndt", "hydrostatic"],
    },
    {
        "id": "MRPL-SOP-003",
        "title": "Crude Distillation Unit (CDU) Emergency Isolation Protocol",
        "content": (
            "Emergency protocol for column high-pressure / thermal runaway:\n"
            "1. Activate ESD (Emergency Shutdown) Loop 401 to close furnace fuel gas solenoid valves in < 2 seconds.\n"
            "2. Divert column overhead vapors to flare header via safety relief bypass PCV-102.\n"
            "3. Inject steam purge at 12 barg into column bottom strip zone.\n"
            "4. Inform Control Room Superintendent immediately via dedicated hotline."
        ),
        "tags": ["cdu", "emergency", "isolation", "safety", "flare"],
    },
]

# In-memory document store
_DOCS = list(DEFAULT_KNOWLEDGE_BASE)


def search_knowledge_base(query: str, top_k: int = 3) -> List[Dict[str, Any]]:
    """
    Perform local semantic/keyword search over SOP documents.
    """
    query_words = set(re.findall(r'\w+', query.lower()))
    scored_docs = []

    for doc in _DOCS:
        doc_words = set(re.findall(r'\w+', (doc["title"] + " " + doc["content"]).lower()))
        overlap = len(query_words.intersection(doc_words))
        
        # Tag bonus
        tag_match = sum(2 for tag in doc.get("tags", []) if tag in query.lower())
        score = overlap + tag_match

        if score > 0:
            scored_docs.append((score, doc))

    scored_docs.sort(key=lambda x: x[0], reverse=True)
    results = [doc for score, doc in scored_docs[:top_k]]

    # If no specific keyword match, return top general SOPs
    if not results:
        results = _DOCS[:top_k]

    return results


def add_document_to_rag(doc_id: str, title: str, content: str, tags: List[str] = None):
    """Add a custom document to the in-memory RAG index."""
    _DOCS.append({
        "id": doc_id,
        "title": title,
        "content": content,
        "tags": tags or [],
    })
    logger.info("Added document %s to RAG knowledge base", doc_id)
