from typing import Optional
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable

from app.db.base_class import Base

class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "users"
    
    # FastAPI-Users required fields are handled by SQLAlchemyBaseUserTable
    # Additional fields specific to our application
    full_name: Mapped[str] = mapped_column(String(255), nullable=True)
    iin: Mapped[Optional[str]] = mapped_column(String(12), nullable=True, unique=True, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False) 