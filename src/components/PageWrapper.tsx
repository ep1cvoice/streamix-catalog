import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { pageVariants, pageTransition } from '../utils/motionVariants'

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}
