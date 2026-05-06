import { motion } from 'framer-motion'
import HeroBanner from '../components/HeroBanner'
import MovieCard from '../components/MovieCard'
import PageWrapper from '../components/PageWrapper'
import { movies, series, cartoons } from '../data/content'
import { gridContainer, cardVariant } from '../utils/motionVariants'

function ContentRow({ title, items }) {
  return (
    <section className='mb-12'>
      <h2 className='text-xl font-bold text-white mb-5 tracking-wide'>{title}</h2>
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
    </section>
  )
}

export default function Home() {
  return (
    <PageWrapper>
      <HeroBanner />
      <div className='px-8 md:px-12 pb-16 -mt-28 relative z-10'>
        <ContentRow title='Movies' items={movies} />
        <ContentRow title='Series' items={series} />
        <ContentRow title='Cartoons' items={cartoons} />
      </div>
    </PageWrapper>
  )
}
