"""Documents package."""
from documents.extract import extract_text
from documents.generate import generate_docx_memo, generate_xlsx_sheet

__all__ = ["extract_text", "generate_docx_memo", "generate_xlsx_sheet"]
