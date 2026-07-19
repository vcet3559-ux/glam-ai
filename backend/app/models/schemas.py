from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Brand Models
class BrandBase(BaseModel):
    name: str
    slug: str
    description: str
    logo_url: Optional[str] = None
    banner_url: Optional[str] = None
    website: Optional[str] = None
    country: Optional[str] = None

class BrandCreate(BrandBase):
    pass

class BrandUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    logo_url: Optional[str] = None
    banner_url: Optional[str] = None
    website: Optional[str] = None
    country: Optional[str] = None

class Brand(BrandBase):
    id: Optional[str] = Field(None, alias="_id")
    created_at: datetime
    updated_at: datetime
    average_rating: float = 0.0
    total_products: int = 0

    class Config:
        populate_by_name = True

# Product Models
class ProductShadeSchema(BaseModel):
    name: str
    hex_code: Optional[str] = None
    image_url: Optional[str] = None

class StoreLinkSchema(BaseModel):
    store: str  # amazon, flipkart, nykaa, etc
    url: str
    price: float
    discount: Optional[int] = None
    availability: bool = True

class ProductBase(BaseModel):
    name: str
    slug: str
    brand_id: str
    category_id: str
    subcategory_id: Optional[str] = None
    description: str
    price: float
    discount: Optional[int] = None
    images: List[str]  # image URLs
    ingredients: Optional[List[str]] = None
    benefits: Optional[List[str]] = None
    shades: Optional[List[ProductShadeSchema]] = None
    store_links: List[StoreLinkSchema]

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: Optional[str] = Field(None, alias="_id")
    rating: float = 0.0
    reviews_count: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# User Models
class UserProfileCreate(BaseModel):
    uid: str
    email: EmailStr
    name: str
    phone: Optional[str] = None
    gender: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    photo_url: Optional[str] = None

class UserProfile(UserProfileCreate):
    id: Optional[str] = Field(None, alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# Review Models
class ReviewCreate(BaseModel):
    product_id: str
    user_id: str
    rating: int = Field(..., ge=1, le=5)
    title: str
    comment: str
    images: Optional[List[str]] = None

class Review(ReviewCreate):
    id: Optional[str] = Field(None, alias="_id")
    helpful_count: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# Recommendation Models
class AIAnalysisSchema(BaseModel):
    skin_tone: str
    undertone: str
    face_shape: str
    lip_shape: str
    eye_color: Optional[str] = None
    hair_color: Optional[str] = None

class RecommendationCreate(BaseModel):
    user_id: str
    product_id: str
    match_score: float
    reason: str
    ai_analysis: AIAnalysisSchema

class Recommendation(RecommendationCreate):
    id: Optional[str] = Field(None, alias="_id")
    recommended_at: datetime

    class Config:
        populate_by_name = True

# Response Models
class SuccessResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    error_code: Optional[str] = None
