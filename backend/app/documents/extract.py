"""Document text extraction utilities for PDF, DOCX, and TXT."""
import pathlib
import logging

logger = logging.getLogger(__name__)


def extract_text(file_path: str) -> str:
    """Extract plain text from a supported document (.txt, .pdf, .docx)."""
    path = pathlib.Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    suffix = path.suffix.lower()

    if suffix in [".txt", ".md", ".log", ".csv", ".json"]:
        try:
            return path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            return path.read_text(encoding="latin-1", errors="replace")

    elif suffix == ".pdf":
        try:
            import pypdf
            reader = pypdf.PdfReader(str(path))
            text_parts = []
            for i, page in enumerate(reader.pages):
                page_text = page.extract_text()
                if page_text:
                    text_parts.append(f"--- Page {i+1} ---\n{page_text}")
            return "\n\n".join(text_parts) or "[Notice: No extractable text found in PDF]"
        except Exception as e:
            logger.warning("PDF extraction failed: %s", e)
            return f"[Error extracting text from PDF: {e}]"

    elif suffix == ".docx":
        try:
            import docx
            doc = docx.Document(str(path))
            return "\n".join([p.text for p in doc.paragraphs if p.text.strip()])
        except Exception as e:
            logger.warning("DOCX extraction failed: %s", e)
            return f"[Error extracting text from DOCX: {e}]"

    raise NotImplementedError(f"Extraction not supported for file type: {suffix}")