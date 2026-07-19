'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TryOnMethodSelector } from '@/components/tryon/TryOnMethodSelector'
import { LiveCameraTryOn } from '@/components/tryon/LiveCameraTryOn'
import { UploadSelfie } from '@/components/tryon/UploadSelfie'
import { VirtualTryOn } from '@/components/product/VirtualTryOn'

type TryOnMethod = 'camera' | 'upload' | 'model' | null

export default function TryOnPage() {
  const [selectedMethod, setSelectedMethod] = useState<TryOnMethod>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const handleMethodSelect = (method: TryOnMethod) => {
    setSelectedMethod(method)
  }

  const handleBack = () => {
    setSelectedMethod(null)
    setCapturedImage(null)
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-2">Virtual Try-On</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose how you want to try on your favorite products
          </p>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!selectedMethod ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TryOnMethodSelector
                onMethodSelect={handleMethodSelect}
                selectedMethod={selectedMethod}
              />
            </motion.div>
          ) : selectedMethod === 'camera' ? (
            <motion.div
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LiveCameraTryOn
                onCapture={setCapturedImage}
                onBack={handleBack}
              />
            </motion.div>
          ) : selectedMethod === 'upload' ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <UploadSelfie
                onUpload={setCapturedImage}
                onBack={handleBack}
              />
            </motion.div>
          ) : null}

          {capturedImage && (
            <motion.div
              key="tryon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VirtualTryOn
                productName="Lipstick"
                productImage={capturedImage}
                shades={[
                  { _id: '1', name: 'Red', hex: '#FF0000' },
                  { _id: '2', name: 'Pink', hex: '#FFC0CB' },
                  { _id: '3', name: 'Nude', hex: '#F5DEB3' },
                ]}
                onClose={handleBack}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
