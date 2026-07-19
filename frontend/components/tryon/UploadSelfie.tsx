'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, RotateCcw } from 'lucide-react'

interface UploadSelfieProps {
  onUpload: (imageData: string) => void
  onBack: () => void
}

export function UploadSelfie({ onUpload, onBack }: UploadSelfieProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result as string
      setPreview(imageData)
      setError(null)
    }
    reader.onerror = () => {
      setError('Failed to read the file')
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = () => {
    if (preview) {
      onUpload(preview)
    }
  }

  return (
    <div className="space-y-4">
      {preview ? (
        <div>
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded-2xl max-h-96 object-cover"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Your selfie is ready to try on!
          </p>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <div className="flex flex-col items-center gap-3">
            <Upload size={48} className="text-primary" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Click to upload
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                or drag and drop
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-3 text-red-700 dark:text-red-200 text-sm">
          {error}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-semibold transition-all"
        >
          <RotateCcw size={20} />
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          disabled={!preview}
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-all"
        >
          <Upload size={20} />
          Try On
        </motion.button>
      </div>
    </div>
  )
}
