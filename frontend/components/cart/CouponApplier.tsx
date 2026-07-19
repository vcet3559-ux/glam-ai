'use client'

import { motion } from 'framer-motion'
import { Gift, X } from 'lucide-react'
import { useState } from 'react'

interface CouponApplierProps {
  onApply: (couponCode: string) => void
  onRemove: () => void
  appliedCoupon?: string
  discount?: number
}

export function CouponApplier({
  onApply,
  onRemove,
  appliedCoupon,
  discount,
}: CouponApplierProps) {
  const [couponCode, setCouponCode] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [error, setError] = useState('')

  const handleApply = () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code')
      return
    }
    onApply(couponCode)
    setCouponCode('')
    setError('')
  }

  const handleRemove = () => {
    onRemove()
    setCouponCode('')
    setIsExpanded(false)
  }

  if (appliedCoupon) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="text-green-600 dark:text-green-400" size={20} />
            <div>
              <p className="font-semibold text-green-900 dark:text-green-300">
                Coupon Applied
              </p>
              <p className="text-sm text-green-800 dark:text-green-400">
                Code: {appliedCoupon}
              </p>
              {discount && (
                <p className="text-sm font-bold text-green-600 dark:text-green-400">
                  You save: ₹{Math.round(discount)}
                </p>
              )}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemove}
            className="p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded transition-colors"
          >
            <X size={20} className="text-green-600 dark:text-green-400" />
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800"
    >
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          <Gift size={18} />
          Have a coupon code?
        </button>
      ) : (
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Coupon Code
            </span>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase())
                setError('')
              }}
              placeholder="Enter coupon code"
              className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleApply}
              className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Apply
            </motion.button>
            <button
              onClick={() => {
                setIsExpanded(false)
                setCouponCode('')
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
