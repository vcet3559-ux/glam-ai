import os
from dotenv import load_dotenv

load_dotenv()

# Database
MONGODB_URL = os.getenv(
    "DATABASE_URL", "mongodb://localhost:27017/glam_ai"
)
MONGODB_DB = os.getenv("MONGODB_DB", "glam_ai")

# Firebase
FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID")
FIREBASE_PRIVATE_KEY = os.getenv("FIREBASE_PRIVATE_KEY")
FIREBASE_CLIENT_EMAIL = os.getenv("FIREBASE_CLIENT_EMAIL")

# API
API_TITLE = "Glam AI API"
API_VERSION = "1.0.0"
DEBUG = os.getenv("DEBUG", "False") == "True"

# CORS
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://glam-ai.vercel.app",
]

# File Upload
MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "gif"}
