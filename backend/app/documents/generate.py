"""Document generation utilities."""
from app.models.model_manager import query_model


async def generate_document(context: str, instruction: str, model: str = "llama3") -> str:
    """
    Use the model to generate a document given context and an instruction.

    Args:
        context: Background text or extracted document content.
        instruction: What kind of document to generate.
        model: Model identifier to use.

    Returns:
        Generated document as a string.
    """
    prompt = (
        f"You are a professional document writer.\n\n"
        f"Context:\n{context}\n\n"
        f"Instruction:\n{instruction}\n\n"
        f"Generated Document:"
    )
    return await query_model(prompt, model)
