from typing import Dict, Any, Optional, List
import tempfile
import os
import base64
import json

from openai import AsyncOpenAI
from app.core.config import settings

class MedicalDocumentAnalyzer:
    """
    Worker for analyzing medical documents like prescriptions, test results, etc.
    Uses GPT-4V for image analysis and GPT-4 for text
    """
    
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        
    async def analyze_document(
        self,
        file_content: bytes,
        file_name: str,
        file_content_type: str,
        description: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Analyze a medical document and extract relevant information
        """
        try:
            # Determine the document type
            is_image = file_content_type.startswith("image/")
            
            if is_image:
                return await self._analyze_image(file_content, description)
            else:
                # For PDFs and other text documents
                # In a real implementation, we would need to extract text from PDFs
                # For simplicity, we'll assume it's plain text
                text_content = file_content.decode("utf-8", errors="ignore")
                return await self._analyze_text(text_content, description)
                
        except Exception as e:
            print(f"Error in analyze_document: {str(e)}")
            return {
                "status": "error",
                "message": str(e)
            }
            
    async def _analyze_image(
        self, 
        image_content: bytes,
        description: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Analyze an image using GPT-4V
        """
        try:
            # Encode image as base64
            base64_image = base64.b64encode(image_content).decode("utf-8")
            
            # Prepare the system prompt
            system_prompt = """
            You are a medical document analyzer. Analyze the provided image of a medical document and extract all relevant information.
            For prescriptions: Extract medication names, dosages, frequency, duration, doctor information.
            For lab results: Extract test names, results, reference ranges, any abnormal values.
            Organize the information in a structured format and provide a summary of the key findings.
            """
            
            # Prepare the user prompt
            user_prompt = "Analyze this medical document."
            if description:
                user_prompt += f" Additional context: {description}"
                
            response = await self.client.chat.completions.create(
                model="gpt-4-vision-preview",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {
                        "role": "user", 
                        "content": [
                            {"type": "text", "text": user_prompt},
                            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                        ]
                    }
                ],
                max_tokens=1000
            )
            
            analysis_text = response.choices[0].message.content
            
            # Extract structured data (if available)
            try:
                # Try to find a JSON block in the response
                json_start = analysis_text.find("```json") + 7 if "```json" in analysis_text else -1
                json_end = analysis_text.find("```", json_start) if json_start > 0 else -1
                
                if json_start > 0 and json_end > 0:
                    json_str = analysis_text[json_start:json_end].strip()
                    structured_data = json.loads(json_str)
                else:
                    structured_data = {}
            except:
                structured_data = {}
            
            return {
                "status": "success",
                "summary": analysis_text,
                "structured_data": structured_data
            }
            
        except Exception as e:
            print(f"Error in _analyze_image: {str(e)}")
            return {
                "status": "error",
                "message": str(e)
            }
            
    async def _analyze_text(
        self, 
        text_content: str,
        description: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Analyze text content using GPT-4
        """
        try:
            # Prepare the system prompt
            system_prompt = """
            You are a medical document analyzer. Analyze the provided text of a medical document and extract all relevant information.
            For prescriptions: Extract medication names, dosages, frequency, duration, doctor information.
            For lab results: Extract test names, results, reference ranges, any abnormal values.
            Organize the information in a structured format and provide a summary of the key findings.
            Return your analysis in JSON format with the following structure:
            {
                "document_type": "prescription|lab_result|other",
                "summary": "brief summary of key points",
                "details": { ... extracted structured data ... }
            }
            """
            
            # Prepare the user prompt
            user_prompt = f"Analyze this medical document:\n\n{text_content}"
            if description:
                user_prompt += f"\n\nAdditional context: {description}"
                
            response = await self.client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                response_format={"type": "json_object"}
            )
            
            # Extract and parse the JSON response
            content = response.choices[0].message.content
            result = json.loads(content)
            
            return {
                "status": "success",
                "summary": result.get("summary", ""),
                "document_type": result.get("document_type", "other"),
                "details": result.get("details", {})
            }
            
        except Exception as e:
            print(f"Error in _analyze_text: {str(e)}")
            return {
                "status": "error",
                "message": str(e)
            } 