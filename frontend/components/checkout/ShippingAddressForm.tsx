'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useState } from 'react'
import type { ShippingAddress } from '@/types/cart'

interface ShippingAddressFormProps {
  onSubmit: (address: ShippingAddress) => void
  initialAddress?: ShippingAddress
  isLoading?: boolean
}

export function ShippingAddressForm({
  onSubmit,
  initialAddress,
  isLoading = false,
}: ShippingAddressFormProps) {
  const [formData, setFormData] = useState<Partial<ShippingAddress>>({
    fullName: initialAddress?.fullName || '',
    phoneNumber: initialAddress?.phoneNumber || '',
    addressLine1: initialAddress?.addressLine1 || '',
    addressLine2: initialAddress?.addressLine2 || '',
    city: initialAddress?.city || '',
    state: initialAddress?.state || '',
    pinCode: initialAddress?.pinCode || '',
    country: initialAddress?.country || 'India',
    isDefault: initialAddress?.isDefault || false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits'
    }
    if (!formData.addressLine1?.trim()) {
      newErrors.addressLine1 = 'Address is required'
    }
    if (!formData.city?.trim()) {
      newErrors.city = 'City is required'
    }
    if (!formData.state?.trim()) {
      newErrors.state = 'State is required'
    }
    if (!formData.pinCode?.trim()) {
      newErrors.pinCode = 'PIN code is required'
    } else if (!/^[0-9]{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'PIN code must be 6 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        _id: initialAddress?._id || '',
        userId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...formData,
      } as ShippingAddress)
    }
  }

  const fields = [
    {
      label: 'Full Name',
      name: 'fullName',
      icon: <Mail size={18} />,
      placeholder: 'Enter your full name',
    },
    {
      label: 'Phone Number',
      name: 'phoneNumber',
      icon: <Phone size={18} />,
      placeholder: '10-digit phone number',
      type: 'tel',
    },
    {
      label: 'Address Line 1',
      name: 'addressLine1',
      icon: <MapPin size={18} />,
      placeholder: 'Enter your address',
    },
    {
      label: 'Address Line 2 (Optional)',
      name: 'addressLine2',
      icon: <MapPin size={18} />,
      placeholder: 'Apartment, suite, etc.',
    },
  ]

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Shipping Address
      </h2>

      {/* Main Fields */}
      <div className="space-y-4 mb-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {field.label}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {field.icon}
              </span>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name as keyof typeof formData] || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.name]: e.target.value,
                  })
                }
                placeholder={field.placeholder}
                className={`w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors[field.name]
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              />
            </div>
            {errors[field.name] && (
              <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      {/* City, State, PIN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            City
          </label>
          <input
            type="text"
            value={formData.city || ''}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
            className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.city
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            State
          </label>
          <input
            type="text"
            value={formData.state || ''}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            placeholder="State"
            className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.state
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.state && (
            <p className="text-sm text-red-500 mt-1">{errors.state}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            PIN Code
          </label>
          <input
            type="text"
            value={formData.pinCode || ''}
            onChange={(e) =>
              setFormData({ ...formData, pinCode: e.target.value })
            }
            placeholder="PIN Code"
            className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              errors.pinCode
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.pinCode && (
            <p className="text-sm text-red-500 mt-1">{errors.pinCode}</p>
          )}
        </div>
      </div>

      {/* Default Address Checkbox */}
      <label className="flex items-center gap-3 mb-6">
        <input
          type="checkbox"
          checked={formData.isDefault || false}
          onChange={(e) =>
            setFormData({ ...formData, isDefault: e.target.checked })
          }
          className="w-4 h-4 rounded cursor-pointer"
        />
        <span className="text-gray-700 dark:text-gray-300">Set as default address</span>
      </label>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Saving...' : 'Continue'}
      </motion.button>
    </motion.form>
  )
}
