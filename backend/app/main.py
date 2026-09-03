"""Compatibility alias for app.main -> gateway.main."""
import sys
import os

backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from gateway.main import app

__all__ = ["app"]
