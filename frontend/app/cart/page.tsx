'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/store/cart'
import { CartItemCard, CouponApplier, OrderSummaryComponent } from '@/components/cart'
import { LoadingSkeleton, ErrorMessage } from '@/components/common'
import type { OrderSummary } from '@/types/cart'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } =
    useCart()
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subtotal = getTotalPrice()
  const discount = cart?.totalDiscount || 0
  const shippingFee = subtotal > 500 ? 0 : 50
  const tax = Math.round((subtotal - discount - couponDiscount) * 0.05)
  const grandTotal = subtotal - discount - couponDiscount + shippingFee + tax

  const summary: OrderSummary = {
    subtotal,
    discount,
    couponDiscount,
    shippingFee,
    tax,
    grandTotal: Math.max(0, grandTotal),
  }

  const handleApplyCoupon = (couponCode: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (couponCode === 'SAVE10') {
        setAppliedCoupon(couponCode)
        setCouponDiscount(Math.round(subtotal * 0.1))
        setError(null)
      } else if (couponCode === 'SAVE20') {
        setAppliedCoupon(couponCode)
        setCouponDiscount(Math.round(subtotal * 0.2))
        setError(null)
      } else {
        setError('Invalid coupon code')
      }
      setIsLoading(false)
    }, 500)
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponDiscount(0)
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <ShoppingCart
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-700 mb-6"
            />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Add some products to get started
            </p>
            <Link
              href="/products"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in cart
          </p>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <ErrorMessage message={error} onRetry={() => setError(null)} />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.items.map((item) => (
                <CartItemCard
                  key={item._id}
                  item={item}
                  onQuantityChange={(qty) =>
                    updateQuantity(item.productId, qty)
                  }
                  onRemove={() => removeFromCart(item.productId)}
                  onSaveForLater={() => console.log('Save for later:', item._id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Coupon */}
            <CouponApplier
              onApply={handleApplyCoupon}
              onRemove={handleRemoveCoupon}
              appliedCoupon={appliedCoupon || undefined}
              discount={couponDiscount}
            />

            {/* Order Summary */}
            <OrderSummaryComponent
              summary={summary}
              appliedCoupon={appliedCoupon || undefined}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
