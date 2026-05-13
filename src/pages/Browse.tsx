import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  fetchTopRated, fetchNowPlaying, fetchUpcoming,
  fetchMovies, fetchSeries, fetchCartoons,
} from '../api/tmdb'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import PageWrapper from '../components/PageWrapper'
import { gridContainer, cardVariant } from '../utils/motionVariants'
import type { ContentItem } from '../types/content'

const LIST_FETCHERS: Record<string, () => Promise<ContentItem[]>> = {
  'top-rated':   fetchTopRated,
  'now-playing': fetchNowPlaying,
  'upcoming':    fetchUpcoming,
}

const LIST_LABELS: Record<string, string> = {
  'top-rated':   'Top Rated',
  'now-playing': 'Now Playing',
  'upcoming':    'Upcoming',
}

export default function Browse() {
  const [searchParams] = useSearchParams()
  const list  = searchParams.get('list')  ?? ''
  const genre = searchParams.get('genre') ?? ''

  const [items, setItems]     = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setItems([])

    const run = list
      ? (LIST_FETCHERS[list] ?? Promise.resolve.bind(Promise, []))()
      : Promise.all([fetchMovies(), fetchSeries(), fetchCartoons()]).then(
          ([movies, series, cartoons]) => {
            const seen = new Set<number>()
            return [...movies, ...series, ...cartoons].filter(item => {
              if (seen.has(item.id)) return false
              seen.add(item.id)
              return true
            }).filter(item =>
              item.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
          }
        )

    run
      .then(data => { if (!cancelled) { setItems(data); setLoading(false) } })
      .catch(err  => { if (!cancelled) { setError(String(err)); setLoading(false) } })

    return () => { cancelled = true }
  }, [list, genre])

  const title = list ? (LIST_LABELS[list] ?? list) : genre

  return (
    <PageWrapper>
      <div className='pt-28 px-8 md:px-12 pb-16 min-h-screen'>
        <h1
          className='text-5xl font-black text-white mb-8 tracking-wider'
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {title}
        </h1>

        {loading ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {Array.from({ length: 20 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <p className='text-red-400'>{error}</p>
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
