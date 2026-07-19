'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Camera as CameraIcon, StopCircle, RotateCcw } from 'lucide-react'

interface LiveCameraTryOnProps {
  onCapture: (imageData: string) => void
  onBack: () => void
}

export function LiveCameraTryOn({ onCapture, onBack }: LiveCameraTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user',
          },
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsStreaming(true)
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to access camera'
        )
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        ctx.drawImage(videoRef.current, 0, 0)
        const imageData = canvasRef.current.toDataURL('image/jpeg')
        onCapture(imageData)
      }
    }
  }, [onCapture])

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 text-red-700 dark:text-red-200">
        <p className="font-semibold">Camera Error</p>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={onBack}
          className="mt-3 text-red-600 dark:text-red-300 font-semibold hover:underline"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-2xl overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full aspect-video object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>

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
          onClick={handleCapture}
          disabled={!isStreaming}
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-all"
        >
          <CameraIcon size={20} />
          Capture
        </motion.button>
      </div>
    </div>
  )
}
