# Backend API Structure

FastAPI backend for Glam AI marketplace.

## Directory Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Configuration & environment
│   ├── database.py          # MongoDB connection
│   ├── models/              # Pydantic models & schemas
│   ├── routes/              # API endpoints
│   ├── services/            # Business logic
│   └── utils/               # Helper functions
├── requirements.txt         # Python dependencies
├── Dockerfile               # Docker configuration
└── .env.example            # Environment variables template
```

## Setup

```bash
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

## API Documentation

Swagger UI: `http://localhost:8000/docs`
