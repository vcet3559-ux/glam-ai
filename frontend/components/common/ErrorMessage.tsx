'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = 'Error',
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6"
    >
      <div className="flex gap-4">
        <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 dark:text-red-200">
            {title}
          </h3>
          <p className="text-red-800 dark:text-red-300 mt-1">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-red-600 dark:text-red-400 font-semibold hover:underline"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
