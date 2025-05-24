from typing import Dict, Any, Optional, List
import tempfile
import os
import json

from openai import AsyncOpenAI
from app.core.config import settings

class OpenAIWorker:
    """
    Worker for interacting with OpenAI models (GPT, Whisper, TTS)
    """
    
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        
    async def understand_intent(self, message: str) -> Dict[str, Any]:
        """
        Use GPT to understand the user's intent and extract entities
        """
        try:
            # Prepare the system prompt for intent understanding
            system_prompt = """
            You are an AI assistant that helps classify user requests and extract relevant entities.
            For healthcare requests, identify the intent and any relevant entities.
            Common intents include: 'book_appointment', 'medication_reminder', 'health_question', 'document_analysis'.
            For appointments, extract: doctor_type, date, location.
            For medication reminders, extract: medication_name, dosage, frequency, start_date.
            Return your analysis as JSON.
            """
            
            response = await self.client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": message}
                ],
                response_format={"type": "json_object"}
            )
            
            # Extract and parse the JSON response
            content = response.choices[0].message.content
            result = json.loads(content)
            
            return result
        
        except Exception as e:
            print(f"Error in understand_intent: {str(e)}")
            # Return a default structure if there's an error
            return {
                "intent": "unknown",
                "entities": {}
            }
            
    async def transcribe_audio(self, audio_content: bytes) -> Optional[str]:
        """
        Transcribe audio using Whisper
        """
        try:
            # Create a temporary file to store the audio
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
                temp_file.write(audio_content)
                temp_file_path = temp_file.name
            
            # Transcribe using Whisper API
            with open(temp_file_path, "rb") as audio_file:
                transcript = await self.client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file
                )
            
            # Clean up the temporary file
            os.unlink(temp_file_path)
            
            return transcript.text
            
        except Exception as e:
            print(f"Error in transcribe_audio: {str(e)}")
            return None
            
    async def generate_text_to_speech(self, text: str) -> Optional[bytes]:
        """
        Generate speech from text using OpenAI TTS
        """
        try:
            response = await self.client.audio.speech.create(
                model="tts-1",
                voice="alloy",
                input=text
            )
            
            # Get the audio content
            audio_content = await response.read()
            return audio_content
            
        except Exception as e:
            print(f"Error in generate_text_to_speech: {str(e)}")
            return None 