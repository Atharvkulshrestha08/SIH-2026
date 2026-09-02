import logging
import sys


def setup_logging(level: str = "INFO") -> None:
    """Configure application-wide logging."""
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[logging.StreamHandler(sys.stdout)],
    )
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
