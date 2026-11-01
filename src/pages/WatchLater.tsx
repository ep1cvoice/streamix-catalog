import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { useWatchLaterContext } from '../context/WatchLaterContext'
import MovieCard from '../components/MovieCard'
import PageWrapper from '../components/PageWrapper'
import { gridContainer, cardVariant } from '../utils/motionVariants'

export default function WatchLater() {
  const { items } = useWatchLaterContext()

  return (
    <PageWrapper>
      <div className='pt-28 px-8 md:px-12 pb-16 min-h-screen'>
        <h1
          className='text-5xl font-black text-white mb-8 tracking-wider'
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Watch Later
        </h1>

        {items.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-32'>
            <div className='text-red-600/30 mb-6'>
              <Clock className='h-24 w-24' strokeWidth={1} />
            </div>
            <p className='text-gray-400 text-lg font-medium mb-2'>Nothing here yet</p>
            <p className='text-gray-600 text-sm'>Click the clock on any card to save it here</p>
          </div>
        ) : (
          <motion.div
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'
            variants={gridContainer}
            initial='hidden'
            animate='show'
          >
            {items.map(item => (
              <motion.div key={item.id} variants={cardVariant}>
                <MovieCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </PageWrapper>
  )
}
