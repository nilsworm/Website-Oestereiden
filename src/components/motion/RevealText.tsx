'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface RevealTextProps {
  /** Nur String — der Text wird an Leerzeichen in Wörter zerlegt. */
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
}

const ease = [0.25, 0.1, 0.25, 1] as const

export default function RevealText({
  children,
  as = 'h2',
  className,
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const prefersReduced = useReducedMotion()
  const Component = as as React.ElementType

  const words = children.split(' ')

  // Keine Early-Return-Verzweigung: useReducedMotion() liefert serverseitig
  // `null`, clientseitig sofort den echten Wert. Unterschiedliche Bäume auf
  // Server und Client würden bei Reduced Motion die Hydration brechen.
  // Reduced Motion wird stattdessen über `initial` gesteuert, wie in FadeIn.tsx.
  return (
    <Component ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          {/* pb/-mb verhindert, dass overflow-hidden die Unterlängen von g, j, p abschneidet */}
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={prefersReduced ? false : { y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.6, delay: delay + i * 0.06, ease }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Component>
  )
}
