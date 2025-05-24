import uuid
from typing import Optional, Dict, Any, List
import json

from app.core.config import settings
from app.workers.doqkz_browser_worker import DoqKzBrowserWorker
from app.workers.medical_document_analyzer import MedicalDocumentAnalyzer
from app.workers.openai_worker import OpenAIWorker

class Orchestrator:
    """
    The Orchestrator coordinates all AI processing and worker interactions.
    It:
    1. Receives user inputs (text, voice, images)
    2. Uses LLM to understand intent and extract entities
    3. Dispatches tasks to appropriate workers
    4. Aggregates results and formats responses
    """
    
    def __init__(self):
        self.openai_worker = OpenAIWorker()
        self.doqkz_worker = DoqKzBrowserWorker()
        self.document_analyzer = MedicalDocumentAnalyzer()
        
    async def process_message(
        self, 
        user_id: int, 
        content: str, 
        conversation_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Process a text message from the user"""
        
        # Generate or use existing conversation ID
        if not conversation_id:
            conversation_id = str(uuid.uuid4())
            
        # Use LLM to understand intent and plan actions
        understanding = await self.openai_worker.understand_intent(content)
        
        # Based on intent, route to appropriate worker(s)
        response_content = "I'm still learning how to respond to that."
        
        if understanding.get("intent") == "book_appointment":
            # Example flow for appointment booking
            try:
                doctor_type = understanding.get("entities", {}).get("doctor_type")
                date = understanding.get("entities", {}).get("date")
                
                if doctor_type and date:
                    booking_result = await self.doqkz_worker.search_doctors(doctor_type, date)
                    response_content = f"I found several {doctor_type} doctors available on {date}. Please continue to doq.kz to complete your booking."
                else:
                    response_content = "I need more information to book an appointment. Please specify the type of doctor and preferred date."
            except Exception as e:
                response_content = f"I encountered an issue while trying to book your appointment: {str(e)}"
        
        elif understanding.get("intent") == "medication_reminder":
            # Example flow for medication reminders
            response_content = "I'll help you set up a medication reminder. This feature is coming soon."
            
        # Create a response
        response = {
            "message_id": str(uuid.uuid4()),
            "content": response_content,
            "conversation_id": conversation_id
        }
        
        return response
    
    async def process_document(
        self,
        user_id: int,
        file_content: bytes,
        file_name: str,
        file_content_type: str,
        description: Optional[str] = None,
        conversation_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Process an uploaded document (image/PDF)"""
        
        # Generate or use existing conversation ID
        if not conversation_id:
            conversation_id = str(uuid.uuid4())
            
        # Process the document using GPT-4V or other appropriate tool
        analysis_result = await self.document_analyzer.analyze_document(
            file_content=file_content,
            file_name=file_name,
            file_content_type=file_content_type,
            description=description
        )
        
        # Create a response
        response = {
            "message_id": str(uuid.uuid4()),
            "content": analysis_result.get("summary", "I couldn't analyze the document."),
            "conversation_id": conversation_id
        }
        
        return response
        
    async def process_voice(
        self,
        user_id: int,
        audio_content: bytes,
        conversation_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Process voice audio from the user"""
        
        # Generate or use existing conversation ID
        if not conversation_id:
            conversation_id = str(uuid.uuid4())
            
        # Transcribe audio using Whisper
        transcription = await self.openai_worker.transcribe_audio(audio_content)
        
        if not transcription:
            return {
                "message_id": str(uuid.uuid4()),
                "content": "I couldn't understand the audio. Please try again.",
                "conversation_id": conversation_id
            }
            
        # Process the transcribed text like a regular message
        response = await self.process_message(
            user_id=user_id,
            content=transcription,
            conversation_id=conversation_id
        )
        
        return response 