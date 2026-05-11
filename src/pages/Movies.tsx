import { motion } from 'framer-motion'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import PageWrapper from '../components/PageWrapper'
import { fetchMovies } from '../api/tmdb'
import { useTMDB } from '../hooks/useTMDB'
import { gridContainer, cardVariant } from '../utils/motionVariants'

export default function Movies() {
  const { items, loading, error } = useTMDB(fetchMovies)

  return (
    <PageWrapper>
      <div className='pt-28 px-8 md:px-12 pb-16'>
        <h1
          className='text-5xl font-black text-white mb-8 tracking-wider'
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Movies
        </h1>
        {error ? (
          <p className='text-red-400'>{error}</p>
        ) : loading ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {Array.from({ length: 20 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
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
