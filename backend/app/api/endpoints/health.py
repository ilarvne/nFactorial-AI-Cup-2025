from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db

router = APIRouter()

@router.get("")
async def health_check():
    return {"status": "ok"}

@router.get("/db")
async def db_health_check(db: AsyncSession = Depends(get_db)):
    try:
        # Execute a simple query to check if database is accessible
        result = await db.execute("SELECT 1")
        if result:
            return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": "disconnected", "details": str(e)} 