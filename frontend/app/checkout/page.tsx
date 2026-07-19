'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShippingAddressForm,
  DeliveryMethodSelector,
  PaymentMethodSelector,
  OrderSuccess,
  CheckoutSummary,
} from '@/components/checkout'
import { useCart } from '@/lib/store/cart'
import type {
  ShippingAddress,
  DeliveryMethod,
  PaymentMethod,
  Order,
  DeliveryOption,
  OrderSummary,
} from '@/types/cart'

type CheckoutStep = 'shipping' | 'delivery' | 'payment' | 'review' | 'success'

const deliveryOptions: DeliveryOption[] = [
  { method: 'standard', label: 'Standard', estimatedDays: 5, cost: 50 },
  { method: 'express', label: 'Express', estimatedDays: 2, cost: 150 },
  { method: 'overnight', label: 'Overnight', estimatedDays: 1, cost: 300 },
]

export default function CheckoutPage() {
  const { cart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping')
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponDiscount, setCouponDiscount] = useState(0)

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">Your cart is empty</p>
        </div>
      </div>
    )
  }

  const subtotal = cart.totalPrice
  const discount = cart.totalDiscount
  const selectedDeliveryOption = deliveryOptions.find(
    (opt) => opt.method === deliveryMethod
  )
  const shippingFee = selectedDeliveryOption?.cost || 0
  const tax = Math.round((subtotal - discount - couponDiscount) * 0.05)
  const grandTotal = subtotal - discount - couponDiscount + shippingFee + tax

  const orderSummary: OrderSummary = {
    subtotal,
    discount,
    couponDiscount,
    shippingFee,
    tax,
    grandTotal: Math.max(0, grandTotal),
  }

  const handleShippingSubmit = (address: ShippingAddress) => {
    setShippingAddress(address)
    setCurrentStep('delivery')
  }

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !deliveryMethod || !paymentMethod) {
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockOrder: Order = {
        _id: 'order_' + Date.now(),
        userId: 'user_123',
        orderNumber: Math.random().toString(36).substring(7).toUpperCase(),
        items: cart.items.map((item) => ({
          productId: item.productId,
          productName: item.product?.name || 'Product',
          brand: typeof item.product?.brand === 'string'
            ? item.product.brand
            : item.product?.brand?.name || '',
          quantity: item.quantity,
          selectedShade: item.selectedShade,
          price: item.price,
          discount: item.discount,
          totalPrice:
            (item.price - (item.discount || 0)) * item.quantity,
        })),
        subtotal,
        discount,
        couponCode: appliedCoupon || undefined,
        couponDiscount,
        shippingFee,
        tax,
        grandTotal,
        shippingAddress,
        contactEmail: 'user@example.com',
        contactPhone: shippingAddress.phoneNumber,
        deliveryMethod,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
        orderStatus: 'confirmed',
        estimatedDelivery: new Date(
          new Date().getTime() +
            (selectedDeliveryOption?.estimatedDays || 5) * 24 * 60 * 60 * 1000
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setCurrentStep('success')
      setIsLoading(false)
    }, 1500)
  }

  const stepIndicators = [
    { key: 'shipping', label: 'Address' },
    { key: 'delivery', label: 'Delivery' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ]

  return (
    <div className="min-h-screen bg-light dark:bg-dark py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {currentStep !== 'success' && (
          <div>
            {/* Header */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-8"
            >
              Checkout
            </motion.h1>

            {/* Step Indicators */}
            <div className="mb-12 flex justify-between">
              {stepIndicators.map((step, i) => {
                const isActive =
                  (
                    [
                      'shipping',
                      'delivery',
                      'payment',
                      'review',
                    ] as CheckoutStep[]
                  ).indexOf(currentStep) >= i
                const isCompleted =
                  (
                    [
                      'shipping',
                      'delivery',
                      'payment',
                      'review',
                    ] as CheckoutStep[]
                  ).indexOf(currentStep) > i

                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 relative"
                  >
                    {i !== 0 && (
                      <div
                        className={`absolute top-5 left-0 right-0 h-1 -mx-2 ${
                          isCompleted
                            ? 'bg-primary'
                            : 'bg-gray-300 dark:bg-gray-700'
                        }`}
                      />
                    )}
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          isCompleted || isActive
                            ? 'bg-primary text-white'
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {isCompleted ? '✓' : i + 1}
                      </div>
                      <span className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {step.label}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Shipping */}
            {currentStep === 'shipping' && (
              <ShippingAddressForm
                onSubmit={handleShippingSubmit}
                isLoading={isLoading}
              />
            )}

            {/* Delivery */}
            {currentStep === 'delivery' && (
              <motion.div
                key="delivery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <DeliveryMethodSelector
                  options={deliveryOptions}
                  selected={deliveryMethod}
                  onSelect={(method) => {
                    setDeliveryMethod(method)
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep('payment')}
                  disabled={!deliveryMethod}
                  className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                >
                  Continue to Payment
                </motion.button>
              </motion.div>
            )}

            {/* Payment */}
            {currentStep === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PaymentMethodSelector
                  selected={paymentMethod}
                  onSelect={(method) => {
                    setPaymentMethod(method)
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep('review')}
                  disabled={!paymentMethod}
                  className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                >
                  Review Order
                </motion.button>
              </motion.div>
            )}

            {/* Review & Place Order */}
            {currentStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className="w-full bg-gradient-primary text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Placing Order...' : 'Place Order'}
                </motion.button>
              </motion.div>
            )}

            {/* Success */}
            {currentStep === 'success' && (
              <OrderSuccess
                order={{
                  _id: 'order_123',
                  userId: 'user_123',
                  orderNumber: 'GLM' + Math.random().toString(36).substring(7).toUpperCase(),
                  items: cart.items.map((item) => ({
                    productId: item.productId,
                    productName: item.product?.name || 'Product',
                    brand: typeof item.product?.brand === 'string'
                      ? item.product.brand
                      : item.product?.brand?.name || '',
                    quantity: item.quantity,
                    selectedShade: item.selectedShade,
                    price: item.price,
                    discount: item.discount,
                    totalPrice:
                      (item.price - (item.discount || 0)) * item.quantity,
                  })),
                  subtotal,
                  discount,
                  couponCode: appliedCoupon || undefined,
                  couponDiscount,
                  shippingFee,
                  tax,
                  grandTotal,
                  shippingAddress: shippingAddress!,
                  contactEmail: 'user@example.com',
                  contactPhone: shippingAddress?.phoneNumber || '',
                  deliveryMethod: deliveryMethod!,
                  paymentMethod: paymentMethod!,
                  paymentStatus: 'completed',
                  orderStatus: 'confirmed',
                  estimatedDelivery: new Date(
                    new Date().getTime() + 5 * 24 * 60 * 60 * 1000
                  ),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }}
              />
            )}
          </div>

          {/* Sidebar */}
          {currentStep !== 'success' && (
            <CheckoutSummary
              items={cart.items}
              shippingAddress={shippingAddress ? {
                fullName: shippingAddress.fullName,
                addressLine1: shippingAddress.addressLine1,
                city: shippingAddress.city,
              } : undefined}
              deliveryMethod={deliveryMethod}
              paymentMethod={paymentMethod}
              orderSummary={orderSummary}
              couponCode={appliedCoupon}
              couponDiscount={couponDiscount}
            />
          )}
        </div>
      </div>
    </div>
  )
}
