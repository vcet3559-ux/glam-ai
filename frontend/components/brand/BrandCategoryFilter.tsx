'use client'

import { motion } from 'framer-motion'

interface BrandCategory {
  id: string
  name: string
  count: number
}

interface BrandCategoryFilterProps {
  categories: BrandCategory[]
  selected: string | null
  onChange: (category: string | null) => void
}

export function BrandCategoryFilter({
  categories,
  selected,
  onChange,
}: BrandCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(null)}
        className={`px-4 py-2 rounded-full font-semibold transition-all ${
          selected === null
            ? 'bg-primary text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-primary hover:text-white'
        }`}
      >
        All Brands
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(category.id)}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            selected === category.id
              ? 'bg-primary text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-primary hover:text-white'
          }`}
        >
          {category.name} <span className="text-xs">({category.count})</span>
        </motion.button>
      ))}
    </div>
  )
}
