'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { OrderSummary } from '@/types/cart'

interface OrderSummaryProps {
  summary: OrderSummary
  appliedCoupon?: string
  isLoading?: boolean
}

export function OrderSummaryComponent({
  summary,
  appliedCoupon,
  isLoading = false,
}: OrderSummaryProps) {
  const items = [
    { label: 'Subtotal', value: summary.subtotal, highlight: false },
    {
      label: 'Discount',
      value: -summary.discount,
      highlight: summary.discount > 0,
    },
    ...(appliedCoupon
      ? [
          {
            label: `Coupon (${appliedCoupon})`,
            value: -summary.couponDiscount,
            highlight: summary.couponDiscount > 0,
          },
        ]
      : []),
    { label: 'Shipping', value: summary.shippingFee, highlight: false },
    { label: 'Tax', value: summary.tax, highlight: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 sticky top-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h2>

      {/* Summary Items */}
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex justify-between items-center"
          >
            <span
              className={`text-gray-700 dark:text-gray-300 ${
                item.highlight ? 'font-semibold text-primary' : ''
              }`}
            >
              {item.label}
            </span>
            <span
              className={`font-semibold ${
                item.value < 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {item.value < 0 ? '−' : ''}₹{Math.abs(Math.round(item.value))}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Grand Total */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: items.length * 0.1 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Grand Total
          </span>
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ₹{Math.round(summary.grandTotal)}
          </span>
        </div>
      </motion.div>

      {/* Savings */}
      {(summary.discount > 0 || summary.couponDiscount > 0) && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-6">
          <p className="text-sm font-semibold text-green-700 dark:text-green-300">
            You save ₹
            {Math.round(summary.discount + summary.couponDiscount)}
          </p>
        </div>
      )}

      {/* Proceed Button */}
      <Link href="/checkout">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
          className="w-full bg-gradient-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Proceed to Checkout'}
          <ArrowRight size={20} />
        </motion.button>
      </Link>

      {/* Continue Shopping */}
      <Link href="/products">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-3 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </motion.button>
      </Link>
    </motion.div>
  )
}
