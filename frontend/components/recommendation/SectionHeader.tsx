'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  description?: string
  badge?: string
  icon?: React.ReactNode
}

export function SectionHeader({
  title,
  description,
  badge,
  icon,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="text-2xl">{icon}</div>}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {badge && (
          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            {badge}
          </span>
        )}
      </div>
      {description && (
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </motion.div>
  )
}
