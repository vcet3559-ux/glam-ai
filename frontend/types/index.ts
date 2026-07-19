// User Types
export interface User {
  uid: string
  email: string
  name: string
  photo?: string
  phone?: string
  gender?: 'male' | 'female' | 'other'
  dateOfBirth?: Date
  createdAt: Date
  updatedAt: Date
}

// Category Types
export interface Category {
  _id: string
  name: string
  slug: string
  icon: string
  image: string
  description: string
  parent?: string
  createdAt: Date
  updatedAt: Date
}

export interface SubCategory {
  _id: string
  name: string
  slug: string
  category: string
  icon?: string
  description: string
  createdAt: Date
  updatedAt: Date
}

// Brand Types
export interface Brand {
  _id: string
  name: string
  slug: string
  logo: string
  description: string
  website?: string
  createdAt: Date
  updatedAt: Date
}

// Product Types
export interface ProductImage {
  url: string
  alt: string
}

export interface ProductShade {
  _id: string
  name: string
  hex?: string
  image?: string
}

export interface StoreLink {
  store: 'amazon' | 'flipkart' | 'nykaa' | 'myntra' | 'ajio' | 'purplle' | 'tira' | 'official'
  url: string
  price: number
  discount?: number
  availability: boolean
}

export interface Product {
  _id: string
  name: string
  slug: string
  brand: Brand | string
  category: Category | string
  subCategory?: SubCategory | string
  description: string
  images: ProductImage[]
  price: number
  discount?: number
  rating: number
  reviews: number
  ingredients?: string[]
  benefits?: string[]
  shades: ProductShade[]
  storeLinks: StoreLink[]
  aiMatchScore?: number
  createdAt: Date
  updatedAt: Date
}

// Review Types
export interface Review {
  _id: string
  product: string
  user: string
  rating: number
  title: string
  comment: string
  helpful: number
  images?: string[]
  createdAt: Date
  updatedAt: Date
}

// Wishlist Types
export interface WishlistItem {
  product: string
  addedAt: Date
}

export interface Wishlist {
  _id: string
  user: string
  items: WishlistItem[]
  createdAt: Date
  updatedAt: Date
}

// Try-On History Types
export interface TryOnHistory {
  _id: string
  user: string
  product: string
  image?: string
  aiAnalysis?: {
    skinTone?: string
    undertone?: string
    faceShape?: string
    lipShape?: string
  }
  matchScore?: number
  createdAt: Date
  updatedAt: Date
}

// Saved Looks Types
export interface SavedLook {
  _id: string
  user: string
  name: string
  description?: string
  image: string
  products: string[]
  createdAt: Date
  updatedAt: Date
}

// Filter Types
export interface FilterOptions {
  categories?: string[]
  brands?: string[]
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  search?: string
}

// Pagination Types
export interface PaginationParams {
  page: number
  limit: number
  sort?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  pages: number
}
