"""Local PostgreSQL client for AeroSovereign — replaces Supabase entirely.
All data stays on-premises; no external network calls."""
import os
import logging

logger = logging.getLogger(__name__)

try:
    import asyncpg
except ImportError:
    asyncpg = None

DB_HOST = os.getenv("POSTGRES_HOST", "localhost")
DB_PORT = os.getenv("POSTGRES_PORT", "5433")
DB_NAME = os.getenv("POSTGRES_DB", "aerosovereign")
DB_USER = os.getenv("POSTGRES_USER", "aerosovereign")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "localdev")

_pool = None


async def init_pool():
    global _pool
    if asyncpg is None:
        logger.warning("asyncpg not installed; skipping Postgres pool initialization.")
        return None
    try:
        _pool = await asyncpg.create_pool(
            host=DB_HOST, port=DB_PORT, database=DB_NAME,
            user=DB_USER, password=DB_PASSWORD,
        )
        schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
        if os.path.exists(schema_path):
            with open(schema_path) as f:
                schema_sql = f.read()
            async with _pool.acquire() as conn:
                await conn.execute(schema_sql)
        return _pool
    except Exception as e:
        logger.warning(f"PostgreSQL connection failed: {e}. Running without local DB persistence.")
        return None


async def get_pool():
    global _pool
    if _pool is None and asyncpg is not None:
        await init_pool()
    return _pool