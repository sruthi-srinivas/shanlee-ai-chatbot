
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai.errors import APIError
from dotenv import load_dotenv
from pydantic import BaseModel
import os
from pathlib import Path

# Load environment variables from backend/.env or parent .env
backend_dir = Path(__file__).resolve().parent
load_dotenv(backend_dir / ".env")
load_dotenv(backend_dir.parent / ".env")

app = FastAPI()

# Enable CORS for Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model
class ChatRequest(BaseModel):
    message: str

def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")
    return genai.Client(api_key=api_key)

# Home route
@app.get("/")
def home():
    return {"message": "Chatbot API is running"}

# Chat route
@app.post("/chat")
def chat(request: ChatRequest):
    try:
        client = get_gemini_client()
        
        # Primary model with fallback for high demand/503 errors
        models_to_try = [
            "gemini-3.8-flash",
            "gemini-3.5-flash",
            "gemini-flash-latest",
        ]
        last_error = None

        for model_name in models_to_try:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=request.message,
                )
                return {"reply": response.text}
            except APIError as e:
                last_error = e
                # If unavailable (503) or rate-limited, attempt fallback model
                if getattr(e, "code", None) in (503, 429) or "503" in str(e):
                    print(f"Model {model_name} unavailable ({e}), trying fallback...")
                    continue
                raise e

        # If all tried models failed with 503
        print("Gemini API Error (all models exhausted):", last_error)
        return {
            "reply": "The AI service is temporarily experiencing high traffic (503). Please wait a moment and try again."
        }

    except Exception as e:
        print("Backend Chat Error:", e)
        return {
            "reply": "Sorry, something went wrong while processing your request. Please try again."
        }

