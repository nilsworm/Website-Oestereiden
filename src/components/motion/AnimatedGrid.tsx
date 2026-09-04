'use client'

import { useRef, Children } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface AnimatedGridProps {
  children: React.ReactNode
  className: string
  stagger?: number
}

export default function AnimatedGrid({ children, className, stagger = 0.08 }: AnimatedGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          key={i}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * stagger, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'contents' }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
