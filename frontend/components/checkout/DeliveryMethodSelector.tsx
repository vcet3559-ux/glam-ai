'use client'

import { motion } from 'framer-motion'
import { Truck, Zap, Plane } from 'lucide-react'
import type { DeliveryMethod, DeliveryOption } from '@/types/cart'

interface DeliveryMethodSelectorProps {
  options: DeliveryOption[]
  selected: DeliveryMethod | null
  onSelect: (method: DeliveryMethod) => void
}

const iconMap = {
  standard: <Truck size={32} />,
  express: <Zap size={32} />,
  overnight: <Plane size={32} />,
}

export function DeliveryMethodSelector({
  options,
  selected,
  onSelect,
}: DeliveryMethodSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Delivery Method
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <motion.button
            key={option.method}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(option.method)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selected === option.method
                ? 'border-primary bg-primary/10 dark:bg-primary/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className={`${
                  selected === option.method
                    ? 'text-primary'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {iconMap[option.method]}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {option.label}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {option.estimatedDays} day{option.estimatedDays > 1 ? 's' : ''}
              </p>
              <p className="text-lg font-bold text-primary">
                {option.cost === 0 ? 'Free' : `₹${option.cost}`}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
