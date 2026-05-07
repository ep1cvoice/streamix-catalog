import type { Variants, Transition } from 'framer-motion'

export const pageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

export const pageTransition: Transition = { duration: 0.25 }

export const gridContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

export const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
}
