'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Upload, AlertCircle } from 'lucide-react'

interface TryOnMethodSelectorProps {
  onMethodSelect: (method: 'camera' | 'upload' | 'model') => void
  selectedMethod?: string
}

export function TryOnMethodSelector({
  onMethodSelect,
  selectedMethod,
}: TryOnMethodSelectorProps) {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)

  useEffect(() => {
    // Check camera permission
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setCameraPermission(true))
      .catch(() => setCameraPermission(false))
  }, [])

  const methods = [
    {
      id: 'camera',
      name: 'Live Camera',
      description: 'Try on using your webcam in real-time',
      icon: <Camera size={32} />,
      available: cameraPermission !== false,
    },
    {
      id: 'upload',
      name: 'Upload Selfie',
      description: 'Upload a photo from your device',
      icon: <Upload size={32} />,
      available: true,
    },
    {
      id: 'model',
      name: 'AI Model',
      description: 'Try on with our AI beauty model',
      icon: <span className="text-4xl">✨</span>,
      available: true,
    },
  ] as const

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {methods.map((method) => (
        <motion.button
          key={method.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onMethodSelect(method.id as any)}
          disabled={!method.available}
          className={`p-6 rounded-2xl border-2 transition-all ${
            selectedMethod === method.id
              ? 'border-primary bg-primary bg-opacity-10'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary'
          } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="text-primary">{method.icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {method.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {method.description}
            </p>
            {!method.available && (
              <div className="flex items-center gap-1 text-red-500 text-xs mt-2">
                <AlertCircle size={16} />
                Not available
              </div>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  )
}
