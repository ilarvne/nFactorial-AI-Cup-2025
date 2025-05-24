from typing import List, Optional
from pydantic import BaseModel, field_validator
from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "DoqLink AI API"
    DESCRIPTION: str = "AI-powered healthcare assistance for doq.kz"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS settings
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost/doqlink")
    
    # Security settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-for-development-only")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # OpenAI settings
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY")
    
    @field_validator("OPENAI_API_KEY")
    def validate_openai_api_key(cls, v, values):
        if not v:
            print("Warning: OPENAI_API_KEY not set. OpenAI features will not work.")
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings() 