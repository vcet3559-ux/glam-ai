'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, ShoppingBag, MapPin, Truck, CreditCard, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import type { CartItem, DeliveryMethod, PaymentMethod } from '@/types/cart'

interface CheckoutSummaryProps {
  items: CartItem[]
  shippingAddress?: {
    fullName: string
    addressLine1: string
    city: string
  }
  deliveryMethod?: DeliveryMethod
  paymentMethod?: PaymentMethod
  orderSummary: {
    subtotal: number
    discount: number
    shippingFee: number
    tax: number
    grandTotal: number
  }
  couponCode?: string
  couponDiscount?: number
}

const stepLabels = {
  shipping: 'Shipping Address',
  delivery: 'Delivery Method',
  payment: 'Payment Method',
  summary: 'Order Summary',
}

export function CheckoutSummary({
  items,
  shippingAddress,
  deliveryMethod,
  paymentMethod,
  orderSummary,
  couponCode,
  couponDiscount = 0,
}: CheckoutSummaryProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('items')

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const sections = [
    {
      id: 'items',
      title: `${items.length} Item${items.length !== 1 ? 's' : ''}`,
      icon: <ShoppingBag size={20} />,
      completed: items.length > 0,
      content: items.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700 first:border-t-0"
        >
          <span className="text-gray-600 dark:text-gray-400">
            {item.product?.name} x {item.quantity}
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ₹{Math.round((item.price - (item.discount || 0)) * item.quantity)}
          </span>
        </div>
      )),
    },
    {
      id: 'shipping',
      title: 'Shipping Address',
      icon: <MapPin size={20} />,
      completed: !!shippingAddress,
      content: shippingAddress && (
        <div className="space-y-1 text-sm">
          <p className="font-semibold text-gray-900 dark:text-white">
            {shippingAddress.fullName}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {shippingAddress.addressLine1}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {shippingAddress.city}
          </p>
        </div>
      ),
    },
    {
      id: 'delivery',
      title: 'Delivery Method',
      icon: <Truck size={20} />,
      completed: !!deliveryMethod,
      content: deliveryMethod && (
        <p className="text-gray-600 dark:text-gray-400 capitalize">
          {deliveryMethod.replace('_', ' ')}
        </p>
      ),
    },
    {
      id: 'payment',
      title: 'Payment Method',
      icon: <CreditCard size={20} />,
      completed: !!paymentMethod,
      content: paymentMethod && (
        <p className="text-gray-600 dark:text-gray-400 capitalize">
          {paymentMethod.replace('_', ' ')}
        </p>
      ),
    },
  ]

  const summaryItems = [
    { label: 'Subtotal', value: orderSummary.subtotal },
    { label: 'Discount', value: -orderSummary.discount, highlight: true },
    ...(couponCode
      ? [
          {
            label: `Coupon (${couponCode})`,
            value: -couponDiscount,
            highlight: true,
          },
        ]
      : []),
    { label: 'Shipping', value: orderSummary.shippingFee },
    { label: 'Tax', value: orderSummary.tax },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden sticky top-8"
    >
      {/* Summary Header */}
      <div className="bg-gradient-primary bg-clip-text text-transparent p-6 border-b border-gray-200 dark:border-gray-800">
        <p className="text-lg font-bold">Order Summary</p>
      </div>

      {/* Sections */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {sections.map((section) => (
          <motion.div key={section.id}>
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-3 text-left flex-1">
                <div className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                  {section.icon}
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </span>
                {section.completed && (
                  <CheckCircle className="ml-auto text-green-500" size={18} />
                )}
              </div>
              <div className="flex-shrink-0 ml-2">
                {expandedSection === section.id ? (
                  <ChevronUp className="text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-600 dark:text-gray-400" />
                )}
              </div>
            </button>

            {/* Content */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height:
                  expandedSection === section.id ? 'auto' : 0,
                opacity: expandedSection === section.id ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">{section.content}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
        {summaryItems.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center text-sm"
          >
            <span
              className={`${
                item.highlight
                  ? 'text-green-600 dark:text-green-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {item.label}
            </span>
            <span
              className={`${
                item.value < 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-900 dark:text-white'
              } font-semibold`}
            >
              {item.value < 0 ? '−' : ''}₹{Math.abs(Math.round(item.value))}
            </span>
          </div>
        ))}
      </div>

      {/* Grand Total */}
      <div className="p-4 border-t-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900 dark:text-white">
            Grand Total
          </span>
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ₹{Math.round(orderSummary.grandTotal)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
