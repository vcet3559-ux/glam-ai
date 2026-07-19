'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import { CategoryFilter } from '@/components/product/CategoryFilter'
import { PriceFilter } from '@/components/product/PriceFilter'
import { CATEGORIES, BEAUTY_SUBCATEGORIES } from '@/lib/constants'
import type { Product } from '@/types'

// Mock data - replace with API call
const MOCK_PRODUCTS: Product[] = [
  {
    _id: '1',
    name: 'Maybelline SuperStay Matte Liquid Lipstick',
    slug: 'maybelline-superstay-matte-liquid-lipstick',
    brand: 'Maybelline',
    category: 'beauty',
    subCategory: 'lipstick',
    description: 'Long-wearing liquid lipstick with matte finish',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596217871470-09bf2da9cd2b?w=500&h=500&fit=crop',
        alt: 'Maybelline SuperStay Matte',
      },
    ],
    price: 399,
    discount: 15,
    rating: 4.5,
    reviews: 234,
    shades: [
      { _id: '1', name: 'Red Power', hex: '#D32F2F' },
      { _id: '2', name: 'Wine Not', hex: '#722C2C' },
    ],
    storeLinks: [
      {
        store: 'amazon',
        url: 'https://amazon.in',
        price: 339,
        availability: true,
      },
      {
        store: 'nykaa',
        url: 'https://nykaa.com',
        price: 349,
        availability: true,
      },
    ],
  },
  {
    _id: '2',
    name: 'MAC Fix+',
    slug: 'mac-fix-plus',
    brand: 'MAC',
    category: 'beauty',
    subCategory: 'primer',
    description: 'Setting spray to keep makeup in place',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1617634924702-92d37f439220?w=500&h=500&fit=crop',
        alt: 'MAC Fix+',
      },
    ],
    price: 2500,
    discount: 10,
    rating: 4.7,
    reviews: 456,
    shades: [{ _id: '1', name: 'Original' }],
    storeLinks: [
      {
        store: 'nykaa',
        url: 'https://nykaa.com',
        price: 2250,
        availability: true,
      },
    ],
  },
]

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const toggleWishlist = (productId: string) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId)
    } else {
      newWishlist.add(productId)
    }
    setWishlist(newWishlist)
  }

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category as string)
    const priceMatch =
      product.price >= priceRange.min && product.price <= priceRange.max
    return categoryMatch && priceMatch
  })

  return (
    <div className="min-h-screen bg-light dark:bg-dark py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Browse Products</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1 space-y-4">
            <CategoryFilter
              categories={CATEGORIES}
              selected={selectedCategories}
              onChange={setSelectedCategories}
            />
            <PriceFilter
              range={{ min: 0, max: 10000 }}
              selected={priceRange}
              onChange={setPriceRange}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onWishlist={wishlist.has(product._id)}
                    onWishlistToggle={toggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                  No products found
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([])
                    setPriceRange({ min: 0, max: 10000 })
                  }}
                  className="mt-4 text-primary hover:underline font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
