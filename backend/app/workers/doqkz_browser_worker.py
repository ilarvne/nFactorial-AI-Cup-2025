from typing import Dict, Any, Optional, List
import asyncio
import os
import json
from datetime import datetime

from playwright.async_api import async_playwright, Page, Browser

class DoqKzBrowserWorker:
    """
    Worker for automating interactions with doq.kz website
    """
    
    def __init__(self):
        self.browser = None
        self.context = None
        
    async def _get_browser(self) -> Browser:
        """Initialize Playwright browser if not already initialized"""
        if not self.browser:
            playwright = await async_playwright().start()
            self.browser = await playwright.chromium.launch(headless=True)
            self.context = await self.browser.new_context()
            # Enable request interception if needed
            # await self.context.route("**/*", self._handle_route)
        return self.browser
        
    async def search_doctors(self, specialty: str, date_str: str) -> Dict[str, Any]:
        """
        Search for doctors of a specific specialty on a given date on doq.kz
        """
        try:
            browser = await self._get_browser()
            page = await self.context.new_page()
            
            # Navigate to doq.kz
            await page.goto("https://doq.kz")
            
            # Wait for the page to load
            await page.wait_for_load_state("networkidle")
            
            # Find and click on the search button
            await page.click("button.search-button")
            
            # Fill in the specialty
            await page.fill("input.specialty-input", specialty)
            await page.click("li.specialty-option")  # Select first matching option
            
            # Fill in the date
            # Convert date_str to required format if needed
            await page.fill("input.date-input", date_str)
            
            # Click search
            await page.click("button.search-submit")
            
            # Wait for results to load
            await page.wait_for_selector("div.doctor-card", timeout=5000)
            
            # Extract doctor information
            doctors = await page.evaluate("""() => {
                const doctorCards = document.querySelectorAll('div.doctor-card');
                return Array.from(doctorCards).map(card => {
                    return {
                        name: card.querySelector('.doctor-name').textContent,
                        specialty: card.querySelector('.doctor-specialty').textContent,
                        clinic: card.querySelector('.doctor-clinic').textContent,
                        availableTimes: Array.from(card.querySelectorAll('.time-slot')).map(slot => slot.textContent)
                    };
                });
            }""")
            
            # Close the page
            await page.close()
            
            return {
                "status": "success",
                "doctors": doctors
            }
            
        except Exception as e:
            print(f"Error in search_doctors: {str(e)}")
            return {
                "status": "error",
                "message": str(e)
            }
            
    async def book_appointment(
        self, 
        doctor_id: str, 
        date_str: str,
        time_slot: str,
        patient_info: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Start the appointment booking process for a selected doctor
        NOTE: This will get the user to the SMS verification point, after which
        they need to manually complete the process
        """
        try:
            browser = await self._get_browser()
            page = await self.context.new_page()
            
            # Navigate to doctor's page
            await page.goto(f"https://doq.kz/doctor/{doctor_id}")
            
            # Wait for the page to load
            await page.wait_for_load_state("networkidle")
            
            # Select the date
            date_obj = datetime.strptime(date_str, "%Y-%m-%d")
            formatted_date = date_obj.strftime("%d.%m.%Y")  # Format expected by doq.kz
            
            # Find and click the date
            await page.click(f"div.calendar-day[data-date='{formatted_date}']")
            
            # Select the time slot
            await page.click(f"button.time-slot:text('{time_slot}')")
            
            # Click the "Book" button
            await page.click("button.book-appointment")
            
            # Fill in patient information
            await page.fill("input[name='firstName']", patient_info.get("first_name", ""))
            await page.fill("input[name='lastName']", patient_info.get("last_name", ""))
            await page.fill("input[name='phoneNumber']", patient_info.get("phone", ""))
            await page.fill("input[name='iin']", patient_info.get("iin", ""))
            
            # Submit the form
            await page.click("button[type='submit']")
            
            # Wait for the SMS verification page
            await page.wait_for_selector("div.sms-verification", timeout=5000)
            
            # Take a screenshot of the SMS verification page to show the user
            screenshot = await page.screenshot()
            
            # Get the booking reference ID if available
            booking_id = await page.evaluate("""() => {
                const refElement = document.querySelector('.booking-reference');
                return refElement ? refElement.textContent : '';
            }""")
            
            # Close the page
            await page.close()
            
            return {
                "status": "sms_verification_required",
                "message": "Please enter the SMS code sent to your phone to complete the booking",
                "booking_id": booking_id,
                "screenshot": screenshot
            }
            
        except Exception as e:
            print(f"Error in book_appointment: {str(e)}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    async def close(self):
        """Close the browser and clean up resources"""
        if self.browser:
            await self.browser.close()
            self.browser = None
            self.context = None 