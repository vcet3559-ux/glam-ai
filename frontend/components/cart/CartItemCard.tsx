'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, Heart } from 'lucide-react'
import type { CartItem } from '@/types/cart'

interface CartItemCardProps {
  item: CartItem
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
  onSaveForLater: () => void
}

export function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  onSaveForLater,
}: CartItemCardProps) {
  const finalPrice = item.price - (item.discount || 0)
  const totalPrice = finalPrice * item.quantity

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-900 rounded-xl p-4 flex gap-4 border border-gray-200 dark:border-gray-800"
    >
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          src={item.product?.images[0]?.url || 'https://via.placeholder.com/100x100'}
          alt={item.product?.name || 'Product'}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
          {typeof item.product?.brand === 'string'
            ? item.product.brand
            : item.product?.brand?.name}
        </p>
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
          {item.product?.name || 'Product'}
        </h3>
        {item.selectedShade && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Shade: {item.selectedShade}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-lg text-gray-900 dark:text-white">
            ₹{Math.round(finalPrice)}
          </span>
          {item.discount && item.discount > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ₹{Math.round(item.price)}
            </span>
          )}
        </div>
      </div>

      {/* Quantity and Actions */}
      <div className="flex flex-col items-end justify-between">
        {/* Quantity Selector */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onQuantityChange(item.quantity - 1)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <Minus size={16} />
          </motion.button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onQuantityChange(item.quantity + 1)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            <Plus size={16} />
          </motion.button>
        </div>

        {/* Total Price */}
        <p className="font-bold text-lg text-primary mt-2">
          ₹{Math.round(totalPrice)}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSaveForLater}
            title="Save for later"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Heart size={18} className="text-primary" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRemove}
            title="Remove from cart"
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-500"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
