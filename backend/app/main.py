from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import API_TITLE, API_VERSION, ALLOWED_ORIGINS, DEBUG
from app.database import db

# Initialize FastAPI app
app = FastAPI(
    title=API_TITLE,
    version=API_VERSION,
    debug=DEBUG,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Events
@app.on_event("startup")
async def startup_event():
    db.connect_db()
    print("✓ Database connected")

@app.on_event("shutdown")
async def shutdown_event():
    db.close_db()
    print("✓ Database closed")

# Health check
@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Glam AI API is running"}

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Glam AI API",
        "version": API_VERSION,
        "docs": "/docs",
    }
