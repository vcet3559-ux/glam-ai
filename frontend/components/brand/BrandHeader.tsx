'use client'

import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Share2 } from 'lucide-react'
import { useState } from 'react'

interface BrandHeaderProps {
  name: string
  description: string
  logo: string
  banner: string
  rating: number
  reviews: number
  productCount: number
}

export function BrandHeader({
  name,
  description,
  logo,
  banner,
  rating,
  reviews,
  productCount,
}: BrandHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      {/* Banner */}
      <div className="relative h-64 bg-gradient-primary overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Logo and Info */}
      <div className="px-6 py-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:gap-8">
          {/* Logo */}
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={logo}
            alt={name}
            className="w-40 h-40 rounded-2xl shadow-2xl border-4 border-white dark:border-dark bg-white dark:bg-gray-900 object-contain p-2"
          />

          {/* Brand Info */}
          <div className="flex-1 mt-4 md:mt-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" fill="currentColor" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {rating}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {reviews} reviews
                  </p>
                </div>
              </div>
              <div>
                <p className="font-bold text-2xl text-primary">{productCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Products
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  isFollowing
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-primary hover:text-white'
                }`}
              >
                <Heart fill={isFollowing ? 'currentColor' : 'none'} size={20} />
                {isFollowing ? 'Following' : 'Follow'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <ShoppingCart size={20} />
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
              >
                <Share2 size={20} />
                Share
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
