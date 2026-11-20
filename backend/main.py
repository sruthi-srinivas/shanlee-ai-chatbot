from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
from groq import Groq
from pathlib import Path
import os

# Load environment variables
backend_dir = Path(__file__).resolve().parent
load_dotenv(backend_dir / ".env")
load_dotenv(backend_dir.parent / ".env")

app = FastAPI()

# Enable CORS
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

# Request body
class ChatRequest(BaseModel):
    message: str

# Groq client
def get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY is missing from .env")
    return Groq(api_key=api_key)

# Home route
@app.get("/")
def home():
    return {"message": "Chatbot API is running"}

# Chat route
@app.post("/chat")
def chat(request: ChatRequest):
    try:
        client = get_groq_client()

        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": "You are Shanlee AI, a friendly and helpful AI assistant. Give clear and useful answers."
                },
                {
                    "role": "user",
                    "content": request.message
                }
            ],
            max_completion_tokens=1024
        )

        return {
            "reply": response.choices[0].message.content
        }

    except Exception as e:
        print("Groq API Error:", e)
        return {
            "reply": "Sorry, something went wrong. Please try again."
        }