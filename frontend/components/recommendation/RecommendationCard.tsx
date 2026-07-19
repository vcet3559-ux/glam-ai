'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, TrendingUp, Zap, ShoppingCart } from 'lucide-react'
import type { Product } from '@/types'

interface RecommendationCardProps {
  product: Product
  matchScore?: number
  reason?: string
  badge?: string
  onWishlist?: boolean
  onWishlistToggle?: (productId: string) => void
}

export function RecommendationCard({
  product,
  matchScore,
  reason,
  badge,
  onWishlist = false,
  onWishlistToggle,
}: RecommendationCardProps) {
  const discount = product.discount ? Math.round(product.discount) : 0
  const finalPrice = product.price - (product.price * discount) / 100

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'perfect':
        return 'bg-gradient-primary'
      case 'budget':
        return 'bg-green-500'
      case 'premium':
        return 'bg-purple-500'
      case 'trending':
        return 'bg-orange-500'
      default:
        return 'bg-primary'
    }
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
    >
      {/* Image Section */}
      <div className="relative h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden group">
        <Image
          src={product.images[0]?.url || 'https://via.placeholder.com/300x300'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex gap-2 flex-wrap">
          {badge && (
            <div
              className={`${getBadgeColor(
                badge
              )} text-white px-3 py-1 rounded-full text-xs font-bold`}
            >
              {badge.charAt(0).toUpperCase() + badge.slice(1)}
            </div>
          )}
          {discount > 0 && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </div>
          )}
        </div>

        {/* Match Score */}
        {matchScore !== undefined && (
          <div className="absolute bottom-3 left-3 bg-white dark:bg-dark rounded-full p-2 shadow-lg">
            <div className="flex items-center gap-1 text-sm font-bold text-primary">
              <TrendingUp size={16} />
              {matchScore}%
            </div>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end justify-end p-4 opacity-0 group-hover:opacity-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              onWishlistToggle?.(product._id)
            }}
            className={`rounded-full p-3 transition-colors ${
              onWishlist
                ? 'bg-primary text-white'
                : 'bg-white text-gray-900 hover:bg-primary hover:text-white'
            }`}
          >
            <Heart size={20} fill={onWishlist ? 'currentColor' : 'none'} />
          </motion.button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {typeof product.brand === 'string' ? product.brand : product.brand?.name}
        </p>
        <h3 className="font-semibold text-gray-900 dark:text-white truncate mt-1">
          {product.name}
        </h3>

        {reason && (
          <p className="text-xs text-primary mt-2 line-clamp-2">{reason}</p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.round(product.rating))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.reviews})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{Math.round(finalPrice)}
          </span>
          {discount > 0 && (
            <span className="text-xs text-gray-500 line-through dark:text-gray-400">
              ₹{Math.round(product.price)}
            </span>
          )}
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 bg-gradient-primary text-white py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
}
