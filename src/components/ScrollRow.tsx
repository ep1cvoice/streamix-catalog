import { useRef } from 'react';
import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';
import { rowContainer, rowCard } from '../utils/motionVariants';
import type { ContentItem } from '../types/content';

interface ScrollRowProps {
  genre: string;
  items: ContentItem[];
  loading?: boolean;
}

const SCROLL_AMOUNT = 320;

function ChevronLeft() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
    </svg>
  );
}

export default function ScrollRow({ genre, items, loading = false }: ScrollRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({
      left: dir === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };

  const arrowBase =
    'absolute top-1/2 -translate-y-1/2 z-30 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-black/60 text-white opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110';

  return (
    <section className='mb-10'>
      <h2
        className='text-3xl font-black text-white mb-4 tracking-wider'
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >{genre}</h2>
      <div className='group/row relative'>
        <button
          onClick={() => scroll('left')}
          className={`${arrowBase} -left-4 cursor-pointer`}
          aria-label='Scroll left'
        >
          <ChevronLeft />
        </button>

        {loading ? (
          <div className='flex gap-3 overflow-x-hidden py-4 -my-4 px-3 -mx-3'>
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className='flex-none w-[calc((100vw-76px)/2)] sm:w-[calc((100vw-88px)/3)] md:w-[calc((100vw-132px)/4)] lg:w-[calc((100vw-144px)/5)]'>
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            ref={trackRef}
            className='flex gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain py-4 -my-4 px-3 -mx-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            variants={rowContainer}
            initial='hidden'
            animate='show'
          >
            {items.map(item => (
              <motion.div key={item.id} className='flex-none w-[calc((100vw-76px)/2)] sm:w-[calc((100vw-88px)/3)] md:w-[calc((100vw-132px)/4)] lg:w-[calc((100vw-144px)/5)]' variants={rowCard}>
                <MovieCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <button
          onClick={() => scroll('right')}
          className={`${arrowBase} -right-4 cursor-pointer`}
          aria-label='Scroll right'
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
