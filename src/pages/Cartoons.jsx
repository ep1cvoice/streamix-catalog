import { motion } from 'framer-motion'
import MovieCard from '../components/MovieCard'
import PageWrapper from '../components/PageWrapper'
import { cartoons } from '../data/content'
import { gridContainer, cardVariant } from '../utils/motionVariants'

export default function Cartoons() {
  return (
    <PageWrapper>
      <div className='pt-28 px-8 md:px-12 pb-16'>
        <h1
          className='text-5xl font-black text-white mb-8 tracking-wider'
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Cartoons
        </h1>
        <motion.div
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
          variants={gridContainer}
          initial='hidden'
          animate='show'
        >
          {cartoons.map(item => (
            <motion.div key={item.id} variants={cardVariant}>
              <MovieCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  )
}
