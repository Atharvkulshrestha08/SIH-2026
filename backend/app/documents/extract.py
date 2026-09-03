"""Document text extraction utilities."""
import pathlib


def extract_text(file_path: str) -> str:
    """
    Extract plain text from a supported document.
    Extend with pdf/docx parsers as needed.
    """
    path = pathlib.Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    suffix = path.suffix.lower()
    if suffix == ".txt":
        return path.read_text(encoding="utf-8")

    # TODO: add PDF support (e.g. pdfplumber) and DOCX support (python-docx)
    raise NotImplementedError(f"Extraction not supported for file type: {suffix}")
