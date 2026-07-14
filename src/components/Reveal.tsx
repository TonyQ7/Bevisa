import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }): JSX.Element {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return <div>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.72, ease: [0.65, 0, 0.35, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
