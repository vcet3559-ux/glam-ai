'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CategoryFilterProps {
  categories: Array<{ id: string; name: string }>
  selected: string[]
  onChange: (selected: string[]) => void
}

export function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleToggle = (categoryId: string) => {
    if (selected.includes(categoryId)) {
      onChange(selected.filter((id) => id !== categoryId))
    } else {
      onChange([...selected, categoryId])
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-semibold text-gray-900 dark:text-white"
      >
        Categories
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 space-y-2 overflow-hidden"
          >
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(category.id)}
                  onChange={() => handleToggle(category.id)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </label>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
