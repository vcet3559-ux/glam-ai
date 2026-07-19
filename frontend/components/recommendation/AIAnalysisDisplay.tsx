'use client'

import { motion } from 'framer-motion'
import { Award, TrendingUp, Sparkles } from 'lucide-react'
import type { AIAnalysis } from '@/types/recommendation'

interface AIAnalysisDisplayProps {
  analysis: AIAnalysis
  matchScore: number
}

export function AIAnalysisDisplay({
  analysis,
  matchScore,
}: AIAnalysisDisplayProps) {
  const traits = [
    { label: 'Skin Tone', value: analysis.skinTone },
    { label: 'Undertone', value: analysis.undertone },
    { label: 'Face Shape', value: analysis.faceShape },
    { label: 'Lip Shape', value: analysis.lipShape },
    ...(analysis.eyeColor ? [{ label: 'Eye Color', value: analysis.eyeColor }] : []),
    ...(analysis.hairColor ? [{ label: 'Hair Color', value: analysis.hairColor }] : []),
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-6 border border-primary/20 dark:border-primary/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Match Score */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center shadow-lg"
        >
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <Award size={24} />
            <span className="text-sm font-semibold">Match Score</span>
          </div>
          <p className="text-4xl font-bold text-primary">{matchScore}%</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Perfect for you
          </p>
        </motion.div>

        {/* Recommendations Count */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center shadow-lg"
        >
          <div className="flex items-center justify-center gap-2 text-secondary mb-2">
            <Sparkles size={24} />
            <span className="text-sm font-semibold">AI Curated</span>
          </div>
          <p className="text-2xl font-bold text-secondary">20+</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Products selected
          </p>
        </motion.div>

        {/* Analysis Details */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center shadow-lg"
        >
          <div className="flex items-center justify-center gap-2 text-accent mb-2">
            <TrendingUp size={24} />
            <span className="text-sm font-semibold">Analysis</span>
          </div>
          <p className="text-lg font-bold text-accent">Complete</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            6 traits analyzed
          </p>
        </motion.div>
      </div>

      {/* Traits Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Your Beauty Profile
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {traits.map((trait, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg p-3 border border-primary/10"
            >
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {trait.label}
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize mt-1">
                {trait.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
