'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, MapPin } from 'lucide-react'
import type { Brand } from '@/types'

interface BrandCardProps {
  brand: Brand
}

export function BrandCard({ brand }: BrandCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/brands/${brand.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
      >
        {/* Banner Section */}
        <div className="relative h-40 bg-gray-200 dark:bg-gray-800 overflow-hidden">
          {brand.image && (
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Logo Section */}
        <div className="px-4 py-4 -mt-12 relative z-10">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-4 border-white dark:border-gray-900 overflow-hidden"
          >
            {brand.logo ? (
              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              <div className="text-2xl font-bold text-primary">
                {brand.name.charAt(0)}
              </div>
            )}
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="px-4 pb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {brand.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {brand.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={16} fill="currentColor" />
              <span className="font-semibold">4.5/5</span>
            </div>
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-primary hover:text-secondary transition-colors"
              >
                Visit Site
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
