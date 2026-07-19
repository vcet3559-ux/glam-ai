'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PriceRange {
  min: number
  max: number
}

interface PriceFilterProps {
  range: PriceRange
  selected: PriceRange
  onChange: (range: PriceRange) => void
}

export function PriceFilter({ range, selected, onChange }: PriceFilterProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between font-semibold text-gray-900 dark:text-white"
      >
        Price Range
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
            className="mt-4 space-y-4 overflow-hidden"
          >
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Min Price: ₹{selected.min}
              </label>
              <input
                type="range"
                min={range.min}
                max={range.max}
                value={selected.min}
                onChange={(e) =>
                  onChange({
                    ...selected,
                    min: Math.min(Number(e.target.value), selected.max),
                  })
                }
                className="w-full accent-primary"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Max Price: ₹{selected.max}
              </label>
              <input
                type="range"
                min={range.min}
                max={range.max}
                value={selected.max}
                onChange={(e) =>
                  onChange({
                    ...selected,
                    max: Math.max(Number(e.target.value), selected.min),
                  })
                }
                className="w-full accent-primary"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
