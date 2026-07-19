'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Eye, Zap } from 'lucide-react'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onWishlist?: boolean
  onWishlistToggle?: (productId: string) => void
}

export function ProductCard({
  product,
  onWishlist = false,
  onWishlistToggle,
}: ProductCardProps) {
  const discount = product.discount ? Math.round(product.discount) : 0
  const finalPrice = product.price - (product.price * discount) / 100

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
    >
      {/* Image Section */}
      <div className="relative h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden group">
        <Image
          src={product.images[0]?.url || 'https://via.placeholder.com/300x300'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-full p-3 hover:bg-primary hover:text-white transition-colors"
            title="Quick View"
          >
            <Eye size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              onWishlistToggle?.(product._id)
            }}
            className={`bg-white rounded-full p-3 transition-colors ${
              onWishlist
                ? 'bg-primary text-white'
                : 'hover:bg-primary hover:text-white'
            }`}
            title="Add to Wishlist"
          >
            <Heart size={20} fill={onWishlist ? 'currentColor' : 'none'} />
          </motion.button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {typeof product.brand === 'string' ? product.brand : product.brand?.name}
        </p>
        <h3 className="font-semibold text-gray-900 dark:text-white truncate mt-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.round(product.rating))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.reviews})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{Math.round(finalPrice)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-500 line-through dark:text-gray-400">
              ₹{Math.round(product.price)}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-primary text-white py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-shadow"
          >
            Try On
          </motion.button>
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
