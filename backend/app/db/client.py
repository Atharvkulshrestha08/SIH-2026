"""Local PostgreSQL client for AeroSovereign — replaces Supabase entirely.
All data stays on-premises; no external network calls."""
import os
# pyrefly: ignore [missing-import]
import asyncpg
DB_HOST = os.getenv("POSTGRES_HOST", "localhost")
DB_PORT = os.getenv("POSTGRES_PORT", "5433")
DB_NAME = os.getenv("POSTGRES_DB", "aerosovereign")
DB_USER = os.getenv("POSTGRES_USER", "aerosovereign")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD", "localdev")

_pool: asyncpg.Pool | None = None


async def init_pool():
    global _pool
    _pool = await asyncpg.create_pool(
        host=DB_HOST, port=DB_PORT, database=DB_NAME,
        user=DB_USER, password=DB_PASSWORD,
    )
    schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
    with open(schema_path) as f:
        schema_sql = f.read()
    async with _pool.acquire() as conn:
        await conn.execute(schema_sql)


async def get_pool() -> asyncpg.Pool:
    if _pool is None:
        await init_pool()
    return _pool