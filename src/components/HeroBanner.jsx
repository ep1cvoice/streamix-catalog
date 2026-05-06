import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { featuredMovies } from '../data/featuredMovies'


const TYPE_LABEL = { movie: 'Movie', series: 'TV Series', serial: 'TV Series', cartoon: 'Cartoon' }

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default function HeroBanner() {

  const [currentIndex, setCurrentIndex] = useState(0)
  const movie = featuredMovies[currentIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredMovies.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">

      <AnimatePresence>
        <motion.img
          key={movie.id}
          src={movie.hero}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-top"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/30" />

      <div className="absolute inset-0 flex items-center">
        <motion.div
          key={movie.id}
          className="px-8 md:px-12 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">
            {TYPE_LABEL[movie.type] ?? 'TV Series'} · {movie.genre}
          </p>

          <h1
            className="text-6xl md:text-7xl font-black text-white mb-4 leading-none drop-shadow-lg"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1.5">
              <StarIcon />
              <span className="text-yellow-400 font-bold text-sm">{movie.rating}</span>
            </div>
            <span className="text-gray-400 text-sm">{movie.year}</span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-md line-clamp-3">
            {movie.description}
          </p>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-8 py-3 rounded transition-colors duration-200 text-sm shadow-lg shadow-red-900/40 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-white" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch
            </button>
            <button className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-8 py-3 rounded border border-white/20 backdrop-blur-sm transition-colors duration-200 text-sm cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add to List
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── 7. SLIDE INDICATORS ─────────────────────────────────────────────
          Dots let the user see which slide is active and jump to any slide.
          Clicking calls setCurrentIndex directly — no `prev` needed here
          because we have the exact target index. */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredMovies.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setCurrentIndex(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-8 bg-red-600' : 'w-4 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
