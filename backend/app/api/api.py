from fastapi import APIRouter

from app.api.endpoints import health, users, assistant

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(assistant.router, prefix="/assistant", tags=["assistant"]) 