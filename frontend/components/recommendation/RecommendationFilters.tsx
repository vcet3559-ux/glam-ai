'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface RecommendationFilter {
  id: string
  name: string
  value: string
}

interface RecommendationFiltersProps {
  filters: Record<string, RecommendationFilter[]>
  selectedFilters: Record<string, string[]>
  onFilterChange: (filterKey: string, values: string[]) => void
}

export function RecommendationFilters({
  filters,
  selectedFilters,
  onFilterChange,
}: RecommendationFiltersProps) {
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({})

  const toggleFilter = (filterKey: string) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }))
  }

  const handleCheckboxChange = (filterKey: string, value: string) => {
    const current = selectedFilters[filterKey] || []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onFilterChange(filterKey, updated)
  }

  return (
    <div className="space-y-4">
      {Object.entries(filters).map(([filterKey, filterOptions]) => (
        <div
          key={filterKey}
          className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md"
        >
          <button
            onClick={() => toggleFilter(filterKey)}
            className="w-full flex items-center justify-between font-semibold text-gray-900 dark:text-white"
          >
            {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
            <motion.div
              animate={{ rotate: openFilters[filterKey] ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>

          <AnimatePresence>
            {openFilters[filterKey] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 space-y-2 overflow-hidden"
              >
                {filterOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={(
                        selectedFilters[filterKey] || []
                      ).includes(option.value)}
                      onChange={() =>
                        handleCheckboxChange(filterKey, option.value)
                      }
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {option.name}
                    </span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
