'use client'

import { motion } from 'framer-motion'
import {
  CreditCard,
  Smartphone,
  Banknote,
  Wallet,
  Building2,
  DollarSign,
} from 'lucide-react'
import type { PaymentMethod } from '@/types/cart'

interface PaymentMethodSelectorProps {
  selected: PaymentMethod | null
  onSelect: (method: PaymentMethod) => void
}

const paymentMethods = [
  {
    id: 'cod' as PaymentMethod,
    label: 'Cash on Delivery',
    icon: <DollarSign size={32} />,
    description: 'Pay when you receive',
  },
  {
    id: 'credit_card' as PaymentMethod,
    label: 'Credit Card',
    icon: <CreditCard size={32} />,
    description: 'Visa, Mastercard, Amex',
  },
  {
    id: 'debit_card' as PaymentMethod,
    label: 'Debit Card',
    icon: <CreditCard size={32} />,
    description: 'All major debit cards',
  },
  {
    id: 'upi' as PaymentMethod,
    label: 'UPI',
    icon: <Smartphone size={32} />,
    description: 'Google Pay, PhonePe, etc',
  },
  {
    id: 'net_banking' as PaymentMethod,
    label: 'Net Banking',
    icon: <Building2 size={32} />,
    description: 'All bank accounts',
  },
  {
    id: 'wallet' as PaymentMethod,
    label: 'Wallet',
    icon: <Wallet size={32} />,
    description: 'Use your wallet balance',
  },
]

export function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Payment Method
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(method.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selected === method.id
                ? 'border-primary bg-primary/10 dark:bg-primary/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary'
            }`}
          >
            <div
              className={`mb-2 ${
                selected === method.id
                  ? 'text-primary'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {method.icon}
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              {method.label}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {method.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Payment Details Form (shown when a method is selected) */}
      {selected && selected !== 'cod' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-3">
            Payment details form will be displayed here during payment
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {(selected === 'credit_card' || selected === 'debit_card') && (
              <>
                <div>
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </>
            )}
            {selected === 'upi' && (
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
