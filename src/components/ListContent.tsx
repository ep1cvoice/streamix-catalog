import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import MovieCard from './MovieCard'
import SkeletonCard from './SkeletonCard'
import { gridContainer, cardVariant } from '../utils/motionVariants'
import type { ContentItem } from '../types/content'

const GRID = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'

interface ListContentProps {
  items: ContentItem[]
  isLoading: boolean
  error: Error | null
  onRetry: () => void
  errorTitle: string
  empty: ReactNode
}

// Body of the Favorites / Watch Later pages: loading, error, empty or the grid of cards
export default function ListContent({ items, isLoading, error, onRetry, errorTitle, empty }: ListContentProps) {
  if (isLoading) {
    return (
      <div className={GRID}>
        {Array.from({ length: 12 }, (_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center py-32 text-center'>
        <p className='text-gray-400 text-lg font-medium mb-2'>{errorTitle}</p>
        <p className='text-gray-600 text-sm mb-6 first-letter:uppercase'>{error.message}</p>
        <button
          onClick={onRetry}
          className='px-6 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors cursor-pointer'
        >
          Try again
        </button>
      </div>
    )
  }

  if (items.length === 0) return empty

  return (
    <motion.div className={GRID} variants={gridContainer} initial='hidden' animate='show'>
      {items.map(item => (
        <motion.div key={`${item.type}:${item.id}`} variants={cardVariant}>
          <MovieCard item={item} />
        </motion.div>
      ))}
    </motion.div>
  )
}
