import { motion } from 'framer-motion'
import HeroBanner from '../components/HeroBanner'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import PageWrapper from '../components/PageWrapper'
import { fetchMovies, fetchSeries, fetchCartoons } from '../api/tmdb'
import { useTMDB } from '../hooks/useTMDB'
import { gridContainer, cardVariant } from '../utils/motionVariants'
import type { ContentItem } from '../types/content'

function ContentRow({ title, items, loading }: { title: string; items: ContentItem[]; loading: boolean }) {
  return (
    <section className='mb-12'>
      <h2 className='text-xl font-bold text-white mb-5 tracking-wide'>{title}</h2>
      {loading ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <motion.div
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'
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
    </section>
  )
}

export default function Home() {
  const { items: movies,   loading: moviesLoading   } = useTMDB(fetchMovies)
  const { items: series,   loading: seriesLoading   } = useTMDB(fetchSeries)
  const { items: cartoons, loading: cartoonsLoading } = useTMDB(fetchCartoons)

  return (
    <PageWrapper>
      <HeroBanner />
      <div className='px-8 md:px-12 pb-16 -mt-28 relative z-10'>
        <ContentRow title='Movies'   items={movies}   loading={moviesLoading}   />
        <ContentRow title='Series'   items={series}   loading={seriesLoading}   />
        <ContentRow title='Cartoons' items={cartoons} loading={cartoonsLoading} />
      </div>
    </PageWrapper>
  )
}
