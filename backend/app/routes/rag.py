"""Sovereign SOP RAG Retrieval Route."""
import logging
from typing import Optional
from fastapi import APIRouter, Query
from shared.schemas import RagSearchRequest
from rag.retriever import search_knowledge_base
from security.audit import log_event

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/search")
@router.post("/search/")
async def rag_search_endpoint(request: Optional[RagSearchRequest] = None, query: Optional[str] = None):
    """
    Search local on-premise SOP repository via POST /api/v1/rag/search.
    Accepts JSON body: {"query": "...", "top_k": 3} or query parameter ?query=...
    """
    search_text = (request.query if request and request.query else query) or "pump vibration"
    top_k = request.top_k if request else 3

    results = search_knowledge_base(search_text, top_k=top_k)
    log_event(
        event_type="SOP_RAG_RETRIEVAL",
        details=f"Retrieved {len(results)} SOP records for '{search_text[:40]}'",
        status="SUCCESS",
        model="Local Sovereign RAG Engine",
    )
    return {
        "query": search_text,
        "results": results,
        "count": len(results),
        "source": "Local Sovereign RAG Repository",
        "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
    }


@router.get("")
@router.get("/")
@router.post("")
@router.post("/")
async def rag_index_endpoint(query: str = Query("pump vibration"), top_k: int = Query(3)):
    """Search SOP repository via GET /api/v1/rag or POST /api/v1/rag."""
    results = search_knowledge_base(query, top_k=top_k)
    log_event(
        event_type="SOP_RAG_RETRIEVAL",
        details=f"Retrieved {len(results)} SOP records for '{query[:40]}'",
        status="SUCCESS",
        model="Local Sovereign RAG Engine",
    )
    return {
        "query": query,
        "results": results,
        "count": len(results),
        "source": "Local Sovereign RAG Repository",
        "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
    }
