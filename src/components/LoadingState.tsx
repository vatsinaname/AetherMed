import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface LoadingStateProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
}

export function LoadingState({ message = 'Loading...', size = 'medium' }: LoadingStateProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600`} />
      </motion.div>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-sm text-gray-500"
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

export function PageLoadingState() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <LoadingState size="large" message="Loading page..." />
    </div>
  )
}