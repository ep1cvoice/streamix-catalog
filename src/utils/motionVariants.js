export const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

export const pageTransition = { duration: 0.25 }

export const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

export const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
}
