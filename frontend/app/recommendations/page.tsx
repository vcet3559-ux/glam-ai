'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks'
import {
  RecommendationCard,
  RecommendationFilters,
  AIAnalysisDisplay,
  SectionHeader,
} from '@/components/recommendation'
import { LoadingSkeleton, ErrorMessage } from '@/components/common'
import { Heart, Zap, Crown, TrendingUp, Package, Clock } from 'lucide-react'
import type { Product } from '@/types'
import type { AIAnalysis } from '@/types/recommendation'

// Mock data
const MOCK_RECOMMENDATIONS = {
  perfectMatches: [
    {
      _id: '1',
      name: 'Lipstick Pro',
      brand: 'MAC',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1596217871470-09bf2da9cd2b?w=500&h=500&fit=crop',
        },
      ],
      price: 2500,
      discount: 10,
      rating: 4.8,
      reviews: 520,
      shades: [],
      storeLinks: [],
    },
  ],
  budgetProducts: [
    {
      _id: '2',
      name: 'Budget Lipstick',
      brand: 'Maybelline',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1596217871470-09bf2da9cd2b?w=500&h=500&fit=crop',
        },
      ],
      price: 399,
      discount: 15,
      rating: 4.3,
      reviews: 234,
      shades: [],
      storeLinks: [],
    },
  ],
  premiumPicks: [],
  trendingProducts: [],
  similarShades: [],
  frequentlyBoughtTogether: [],
  recentlyViewed: [],
}

const MOCK_ANALYSIS: AIAnalysis = {
  skinTone: 'medium',
  undertone: 'warm',
  faceShape: 'oval',
  lipShape: 'full',
  eyeColor: 'Brown',
  hairColor: 'Black',
}

export default function RecommendationsPage() {
  const { user, loading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({})

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
      } else {
        newWishlist.add(productId)
      }
      return newWishlist
    })
  }, [])

  const handleFilterChange = useCallback(
    (filterKey: string, values: string[]) => {
      setSelectedFilters((prev) => ({
        ...prev,
        [filterKey]: values,
      }))
    },
    []
  )

  if (authLoading) return <LoadingSkeleton />

  const recommendations = MOCK_RECOMMENDATIONS
  const matchScore = 92

  const filterOptions = {
    brand: [
      { id: 'mac', name: 'MAC', value: 'mac' },
      { id: 'maybelline', name: 'Maybelline', value: 'maybelline' },
      { id: 'lakme', name: 'Lakme', value: 'lakme' },
    ],
    price: [
      { id: 'budget', name: 'Budget (< ₹500)', value: 'budget' },
      { id: 'mid', name: 'Mid-Range (₹500-2000)', value: 'mid' },
      { id: 'premium', name: 'Premium (> ₹2000)', value: 'premium' },
    ],
    rating: [
      { id: '4', name: '4+ Stars', value: '4' },
      { id: '3.5', name: '3.5+ Stars', value: '3.5' },
    ],
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Your Perfect Picks
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Curated recommendations based on your beauty profile and preferences
          </p>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => setError(null)}
            />
          )}
        </AnimatePresence>

        {/* AI Analysis Display */}
        <AIAnalysisDisplay analysis={MOCK_ANALYSIS} matchScore={matchScore} />

        {/* Main Content */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <RecommendationFilters
                filters={filterOptions}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="lg:col-span-3 space-y-12">
            {/* Perfect Matches */}
            {recommendations.perfectMatches.length > 0 && (
              <section>
                <SectionHeader
                  title="Perfect Matches"
                  description="These products are ideal for your skin tone and face shape"
                  badge="AI Curated"
                  icon="✨"
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading ? (
                    <LoadingSkeleton />
                  ) : (
                    recommendations.perfectMatches.map((product) => (
                      <RecommendationCard
                        key={product._id}
                        product={product as Product}
                        matchScore={96}
                        reason="Perfect match for your warm undertone"
                        badge="perfect"
                        onWishlist={wishlist.has(product._id)}
                        onWishlistToggle={toggleWishlist}
                      />
                    ))
                  )}
                </div>
              </section>
            )}

            {/* Budget Products */}
            {recommendations.budgetProducts.length > 0 && (
              <section>
                <SectionHeader
                  title="Best Budget Products"
                  description="Great quality without breaking the bank"
                  badge="Great Value"
                  icon="💚"
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.budgetProducts.map((product) => (
                    <RecommendationCard
                      key={product._id}
                      product={product as Product}
                      matchScore={85}
                      reason="Affordable option with good reviews"
                      badge="budget"
                      onWishlist={wishlist.has(product._id)}
                      onWishlistToggle={toggleWishlist}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Premium Picks */}
            <section>
              <SectionHeader
                title="Premium Picks"
                description="Luxury brands and high-end products"
                badge="Luxury"
                icon="👑"
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                    />
                  ))
                )}
              </div>
            </section>

            {/* Trending Products */}
            <section>
              <SectionHeader
                title="Trending Products"
                description="Most popular choices right now"
                badge="Hot"
                icon="🔥"
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                    />
                  ))
                )}
              </div>
            </section>

            {/* Similar Shades */}
            <section>
              <SectionHeader
                title="Similar Shades"
                description="Other colors that would suit you"
                icon="🎨"
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                    />
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
