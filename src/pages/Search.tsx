import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { allContent } from '../data/content'
import MovieCard from '../components/MovieCard'
import PageWrapper from '../components/PageWrapper'
import { gridContainer, cardVariant } from '../utils/motionVariants'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const q = query.toLowerCase()

  const results = useMemo(() => {
    if (!q) return []
    // Title matches ranked first, then genre-only matches
    const titleMatches = allContent.filter(item =>
      item.title.toLowerCase().includes(q)
    )
    const genreMatches = allContent.filter(item =>
      !item.title.toLowerCase().includes(q) &&
      item.genre.some(g => g.toLowerCase().includes(q))
    )
    return [...titleMatches, ...genreMatches]
  }, [q])

  return (
    <PageWrapper>
      <div className='pt-28 px-8 md:px-12 pb-16 min-h-screen'>
        <div className='mb-8'>
          <h1
            className='text-5xl font-black text-white mb-2 tracking-wider'
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {query ? `"${query}"` : 'Search'}
          </h1>
          {query && (
            <p className='text-gray-500 text-sm'>
              {results.length} title{results.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {query && results.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 text-center'>
            <p className='text-gray-400 text-lg font-medium mb-2'>No results for "{query}"</p>
            <p className='text-gray-600 text-sm'>Try a different title or genre</p>
          </div>
        ) : (
          <motion.div
            key={query}
            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
            variants={gridContainer}
            initial='hidden'
            animate='show'
          >
            {results.map(item => (
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
