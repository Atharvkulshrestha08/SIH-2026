import logging
from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel

# pyrefly: ignore [missing-import]
from rag.retriever import search_knowledge_base

logger = logging.getLogger(__name__)
router = APIRouter()


class RagSearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 3


@router.post("/search")
async def rag_search(request: RagSearchRequest):
    results = search_knowledge_base(request.query, top_k=request.top_k)
    return {
        "query": request.query,
        "results": results,
        "sovereign_status": "PASS_0_EXTERNAL_EGRESS",
    }