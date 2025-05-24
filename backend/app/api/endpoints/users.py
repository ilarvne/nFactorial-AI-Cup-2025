from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth import fastapi_users, auth_backend, current_active_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserRead, UserCreate, UserUpdate

router = APIRouter()

# Include FastAPI-Users predefined routes
router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="",
    tags=["users"],
)

# Additional custom routes
@router.get("/me", response_model=UserRead)
async def get_current_user(current_user: User = Depends(current_active_user)):
    return current_user 