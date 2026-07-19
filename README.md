# Glam AI - AI-Powered Beauty & Fashion Marketplace

A professional, modern web application where users can browse beauty and fashion products, try them virtually using AI, get personalized recommendations, compare prices across multiple shopping platforms, and purchase from their preferred stores.

## ✨ Features

### User Features
- 🔐 Firebase Authentication (Login/Signup)
- 👤 User Profiles & Preferences
- 💄 Virtual Try-On (Live Camera, Upload Selfie, AI Model)
- 🤖 AI Beauty Analysis (Skin Tone, Undertone, Face Shape, Lip Shape)
- ⭐ AI Recommendations & Match Scores
- 💰 Multi-Store Price Comparison
- 🛍️ Shopping Cart & Wishlist
- 📸 Saved Looks & Try-On History
- ⭐ Product Reviews & Ratings

### Admin Features
- 📊 Dashboard & Analytics
- 🛍️ Manage Products, Brands, Categories
- 👥 User Management
- ⭐ Review Management
- 🔗 Store Links Management
- 📤 Image Upload

### Product Categories
Beauty, Fashion, Jewellery, Skincare, Footwear, Hair Care, Accessories

### Supported Stores
Amazon, Flipkart, Nykaa, Myntra, Ajio, Purplle, Tira, Official Brand Websites

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** with App Router
- **React** 19
- **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### Backend
- **FastAPI** with Python 3.11+
- **MongoDB** for database
- **Firebase Admin SDK** for authentication

### AI/ML
- **MediaPipe Face Mesh** for face detection
- **OpenCV** for image processing

## 📋 Project Structure

```
glam-ai/
├── frontend/                    Next.js application
│   ├── app/                     App Router pages & layouts
│   ├── components/              Reusable components
│   │   ├── common/             Navbar, Footer, etc.
│   │   ├── home/               Homepage sections
│   │   ├── product/            Product pages
│   │   ├── tryon/              Virtual try-on module
│   │   └── admin/              Admin dashboard
│   ├── lib/                     Utilities & helpers
│   ├── hooks/                   Custom React hooks
│   ├── types/                   TypeScript types
│   └── package.json
├── backend/                     FastAPI application
│   ├── app/
│   │   ├── main.py             Entry point
│   │   ├── config.py           Configuration
│   │   ├── database.py         MongoDB setup
│   │   ├── models/             Data models
│   │   ├── routes/             API endpoints
│   │   ├── services/           Business logic
│   │   └── utils/              Helpers
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml           Development environment
└── README.md                    This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB 6.0+
- Git

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs at `http://localhost:3000`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn app.main:app --reload
```

Backend API runs at `http://localhost:8000`

### Using Docker Compose

```bash
docker-compose up -d
```

## 📱 User Flow

1. **Landing Page** → Explore featured products & brands
2. **Authentication** → Sign up or login with Firebase
3. **Home Page** → View recommendations, trending products, categories
4. **Product Browsing** → Browse by category → Select product
5. **Virtual Try-On** → Choose method (camera, upload, AI model)
6. **AI Analysis** → Face detection & beauty profile analysis
7. **Price Comparison** → View prices across all stores
8. **Checkout** → Redirects to preferred shopping platform

## 🎯 Development Roadmap

- [x] Project Structure & Setup
- [ ] Frontend: Authentication Module
- [ ] Frontend: Home Page
- [ ] Frontend: Product Browsing & Details
- [ ] Backend: Core API Setup
- [ ] Backend: Database Schemas
- [ ] Backend: Authentication Service
- [ ] Backend: Product Management API
- [ ] Frontend: Virtual Try-On Module
- [ ] Backend: AI Integration (MediaPipe, OpenCV)
- [ ] Backend: Price Comparison
- [ ] Admin Panel
- [ ] Testing & Documentation
- [ ] Deployment & Optimization

## 📝 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Backend (.env)
```
DATABASE_URL=mongodb://localhost:27017
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
DEBUG=True
```

## 🧪 Testing

```bash
# Frontend
npm run test

# Backend
pytest
```

## 📦 Build & Deploy

```bash
# Frontend build
npm run build
npm start

# Backend production
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
```

## 👨‍💼 Development Guidelines

1. **Build feature-by-feature** - Each feature is complete before moving to next
2. **Test thoroughly** - No TypeScript errors, no React warnings, fully responsive
3. **Clean code** - Reusable components, clear architecture, proper error handling
4. **No fake functionality** - All features must be fully operational
5. **Production-ready** - `npm run dev` and `npm run build` work perfectly

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please follow our development guidelines and ensure all tests pass.

---

**Let's build something beautiful!** ✨
