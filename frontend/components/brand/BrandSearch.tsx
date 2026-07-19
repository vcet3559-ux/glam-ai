'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface BrandSearchProps {
  value: string
  onChange: (value: string) => void
}

export function BrandSearch({ value, onChange }: BrandSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search brands..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      />
    </motion.div>
  )
}
