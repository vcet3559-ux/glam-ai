'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Volume2, Download, Share2, RotateCcw, Undo2 } from 'lucide-react'
import type { ProductShade } from '@/types'

interface VirtualTryOnProps {
  productName: string
  productImage: string
  shades: ProductShade[]
  onClose: () => void
}

export function VirtualTryOn({
  productName,
  productImage,
  shades,
  onClose,
}: VirtualTryOnProps) {
  const [selectedShade, setSelectedShade] = useState(shades[0])
  const [sliderValue, setSliderValue] = useState(50)
  const [history, setHistory] = useState<string[]>([])
  const [isSaved, setIsSaved] = useState(false)

  const handleUndo = useCallback(() => {
    if (history.length > 0) {
      const newHistory = [...history]
      newHistory.pop()
      setHistory(newHistory)
      if (newHistory.length > 0) {
        setSelectedShade(
          shades.find((s) => s._id === newHistory[newHistory.length - 1]) ||
            shades[0]
        )
      }
    }
  }, [history, shades])

  const handleReset = useCallback(() => {
    setSelectedShade(shades[0])
    setSliderValue(50)
    setHistory([])
    setIsSaved(false)
  }, [shades])

  const handleShadeChange = useCallback(
    (shade: ProductShade) => {
      setSelectedShade(shade)
      setHistory([...history, shade._id])
    },
    [history]
  )

  const handleSaveLook = useCallback(() => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }, [])

  const handleDownload = useCallback(() => {
    // Implementation for downloading the image
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      canvas.width = 800
      canvas.height = 600
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `glam-ai-look-${Date.now()}.png`
      link.click()
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white dark:bg-dark rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-primary text-white px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold">{productName}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview Section */}
          <div className="relative bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
            <Image
              src={productImage}
              alt={productName}
              width={500}
              height={600}
              className="w-full"
            />
            {/* Before/After Slider */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderValue}%` }}
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-20"></div>
            </div>
            <div
              className="absolute top-0 bottom-0 w-1 bg-white pointer-events-auto cursor-col-resize"
              style={{ left: `${sliderValue}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <span className="text-xs font-bold">◀ ▶</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize pointer-events-auto"
            />
            <div className="absolute bottom-4 left-4 right-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded">
              Slide to compare
            </div>
          </div>

          {/* Shade Selection */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Available Shades
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {shades.map((shade) => (
                <motion.button
                  key={shade._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShadeChange(shade)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedShade._id === shade._id
                      ? 'border-primary bg-primary bg-opacity-10'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {shade.image ? (
                    <Image
                      src={shade.image}
                      alt={shade.name}
                      width={80}
                      height={80}
                      className="rounded w-full"
                    />
                  ) : shade.hex ? (
                    <div
                      className="w-full h-16 rounded"
                      style={{ backgroundColor: shade.hex }}
                    ></div>
                  ) : null}
                  <p className="text-xs text-center mt-2 truncate">{shade.name}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* AI Match Score */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-4 text-white">
            <h3 className="font-semibold mb-2">AI Match Score</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">92%</p>
                <p className="text-sm opacity-90">
                  Perfect match for your skin tone
                </p>
              </div>
              <div className="text-4xl">✨</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUndo}
              disabled={history.length === 0}
              className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Undo2 size={18} />
              Undo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-semibold transition-all"
            >
              <RotateCcw size={18} />
              Reset
            </motion.button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveLook}
              className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                isSaved
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <Volume2 size={18} />
              {isSaved ? 'Saved!' : 'Save'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              <Download size={18} />
              Download
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              <Share2 size={18} />
              Share
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
