from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from pydantic import BaseModel

from app.core.auth import current_active_user
from app.models.user import User
from app.services.orchestrator import Orchestrator

router = APIRouter()

class MessageRequest(BaseModel):
    content: str
    conversation_id: Optional[str] = None
    
class MessageResponse(BaseModel):
    message_id: str
    content: str
    conversation_id: str

@router.post("/message", response_model=MessageResponse)
async def send_message(
    request: MessageRequest,
    current_user: User = Depends(current_active_user)
):
    """
    Send a text message to the AI assistant
    """
    orchestrator = Orchestrator()
    
    response = await orchestrator.process_message(
        user_id=current_user.id,
        content=request.content,
        conversation_id=request.conversation_id
    )
    
    return response

@router.post("/upload-document", response_model=MessageResponse)
async def upload_document(
    document: UploadFile = File(...),
    description: Optional[str] = Form(None),
    conversation_id: Optional[str] = Form(None),
    current_user: User = Depends(current_active_user)
):
    """
    Upload a medical document (image/PDF) for analysis
    """
    orchestrator = Orchestrator()
    
    # Read file content
    contents = await document.read()
    
    response = await orchestrator.process_document(
        user_id=current_user.id,
        file_content=contents,
        file_name=document.filename,
        file_content_type=document.content_type,
        description=description,
        conversation_id=conversation_id
    )
    
    return response

@router.post("/voice", response_model=MessageResponse)
async def send_voice(
    audio: UploadFile = File(...),
    conversation_id: Optional[str] = Form(None),
    current_user: User = Depends(current_active_user)
):
    """
    Send voice audio to be transcribed and processed
    """
    orchestrator = Orchestrator()
    
    # Read audio content
    contents = await audio.read()
    
    response = await orchestrator.process_voice(
        user_id=current_user.id,
        audio_content=contents,
        conversation_id=conversation_id
    )
    
    return response 