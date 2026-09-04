'use client'

import { useRef } from 'react'
import Image, { type ImageProps } from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface RevealImageProps extends ImageProps {
  /**
   * Klassen für den äußeren Kasten. Bei `fill` muss hier `relative`
   * und eine Höhe drinstehen — sonst hat das Bild keinen Bezugsrahmen.
   */
  wrapperClassName?: string
}

const ease = [0.25, 0.1, 0.25, 1] as const

export default function RevealImage({ wrapperClassName, ...imageProps }: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const prefersReduced = useReducedMotion()

  // `ref` sitzt bewusst auf einem ungeclippten Wrapper, nicht auf dem
  // Element mit dem Clip-Layer: `clip-path: inset(100% 0 0 0)` kollabiert
  // die sichtbare Box auf Nullhöhe, und IntersectionObserver berechnet die
  // Intersection-Rect NACH dem Clip. Läge `ref` auf dem geclippten Element,
  // wäre die beobachtete Fläche immer 0 — `isInView` würde nie true, der
  // Clip nie geöffnet, das Bild bliebe für immer unsichtbar (Deadlock).
  // Keine Early-Return-Verzweigung: useReducedMotion() liefert serverseitig
  // `null`, clientseitig sofort den echten Wert. Unterschiedliche Bäume auf
  // Server und Client würden bei Reduced Motion die Hydration brechen.
  // Reduced Motion wird stattdessen über `initial` gesteuert, wie in FadeIn.tsx.
  return (
    <div ref={ref} className={wrapperClassName}>
      <motion.div
        className="relative h-full w-full"
        initial={prefersReduced ? false : { clipPath: 'inset(100% 0 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 0.9, ease }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={prefersReduced ? false : { scale: 1.16 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <Image {...imageProps} />
        </motion.div>
      </motion.div>
    </div>
  )
}
