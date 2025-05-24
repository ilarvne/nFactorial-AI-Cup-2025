from typing import Optional
from pydantic import BaseModel, EmailStr, Field

from fastapi_users import schemas

class UserRead(schemas.BaseUser[int]):
    full_name: Optional[str] = None
    iin: Optional[str] = None

class UserCreate(schemas.BaseUserCreate):
    full_name: Optional[str] = None
    iin: Optional[str] = Field(None, min_length=12, max_length=12)

class UserUpdate(schemas.BaseUserUpdate):
    full_name: Optional[str] = None
    iin: Optional[str] = Field(None, min_length=12, max_length=12) 