'use client'

import { motion } from 'framer-motion'
import { Check, Package, Calendar, MapPin, Truck } from 'lucide-react'
import Link from 'next/link'
import type { Order } from '@/types/cart'

interface OrderSuccessProps {
  order: Order
}

export function OrderSuccess({ order }: OrderSuccessProps) {
  const estimatedDelivery = new Date(
    new Date().getTime() + 3 * 24 * 60 * 60 * 1000
  ) // 3 days from now

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center py-12 px-4"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="mb-6"
      >
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="text-green-600 dark:text-green-400" size={40} />
        </div>
      </motion.div>

      {/* Main Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Thank you for your purchase
        </p>
      </motion.div>

      {/* Order Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Order Number
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-white font-mono">
            #{order.orderNumber}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Amount
          </p>
          <p className="text-xl font-bold text-primary">
            ₹{Math.round(order.grandTotal)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Items
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {order.items.length}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Status
          </p>
          <p className="text-xl font-bold text-orange-500">
            {order.orderStatus}
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-8 text-left"
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          What happens next?
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30">
                <Check className="text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Order Confirmed
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We've received your order
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Package className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Processing
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We're preparing your items
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Truck className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                On the Way
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your order will be shipped soon
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delivery Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 text-left"
      >
        <div className="flex gap-3 mb-4">
          <Calendar className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div>
            <p className="font-semibold text-blue-900 dark:text-blue-300">
              Estimated Delivery
            </p>
            <p className="text-blue-800 dark:text-blue-400">
              {estimatedDelivery.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <MapPin className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div>
            <p className="font-semibold text-blue-900 dark:text-blue-300">
              Delivery Address
            </p>
            <p className="text-blue-800 dark:text-blue-400">
              {order.shippingAddress.addressLine1},
              {order.shippingAddress.addressLine2 && (
                <> {order.shippingAddress.addressLine2},</>
              )}
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.pinCode}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/orders" className="flex-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:shadow-lg transition-shadow"
          >
            View Order
          </motion.button>
        </Link>
        <Link href="/products" className="flex-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full border-2 border-primary text-primary py-3 rounded-lg font-bold hover:bg-primary/10 transition-colors"
          >
            Continue Shopping
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}
