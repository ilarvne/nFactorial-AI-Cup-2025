from typing import Any
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer
from datetime import datetime
import sqlalchemy as sa

class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    
    # Generate tablename automatically based on class name
    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
    
    # Add created_at and updated_at columns to all tables
    created_at: Mapped[datetime] = mapped_column(
        sa.DateTime(timezone=True), 
        server_default=sa.func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        sa.DateTime(timezone=True), 
        server_default=sa.func.now(),
        onupdate=sa.func.now()
    ) 