import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { searchMulti } from '../api/tmdb'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import PageWrapper from '../components/PageWrapper'
import { gridContainer, cardVariant } from '../utils/motionVariants'
import type { ContentItem } from '../types/content'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const [results, setResults] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    searchMulti(query)
      .then(data => { if (!cancelled) { setResults(data); setLoading(false) } })
      .catch(err  => { if (!cancelled) { setError(String(err)); setLoading(false) } })

    return () => { cancelled = true }
  }, [query])

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
          {query && !loading && (
            <p className='text-gray-500 text-sm'>
              {results.length} title{results.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {loading ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {Array.from({ length: 10 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <p className='text-red-400'>{error}</p>
        ) : query && results.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 text-center'>
            <p className='text-gray-400 text-lg font-medium mb-2'>No results for "{query}"</p>
            <p className='text-gray-600 text-sm'>Try a different title or genre</p>
          </div>
        ) : results.length > 0 ? (
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
        ) : null}
      </div>
    </PageWrapper>
  )
}
