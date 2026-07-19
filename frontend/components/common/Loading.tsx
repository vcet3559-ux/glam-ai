'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse" />
      ))}
    </motion.div>
  )
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Loader2 className="text-primary" size={48} />
      </motion.div>
    </div>
  )
}
