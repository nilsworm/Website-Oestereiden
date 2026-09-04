'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpProps {
  target: string
  className?: string
}

function parse(target: string): { value: number; suffix: string } | null {
  const match = target.match(/^(\d+)(.*)$/)
  if (!match) return null
  return { value: parseInt(match[1], 10), suffix: match[2] }
}

export default function CountUp({ target, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const parsed = parse(target)
  const [displayed, setDisplayed] = useState(parsed ? String(parsed.value > 100 ? parsed.value - 50 : 0) + parsed.suffix : target)

  useEffect(() => {
    if (!isInView || !parsed) return
    const { value, suffix } = parsed
    const startValue = value > 100 ? value - 50 : 0
    const duration = 1200
    const frameRate = 16 // ~60fps
    let frame = 0

    const tick = () => {
      const elapsed = frame * frameRate
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (value - startValue) * eased)
      setDisplayed(current + suffix)
      if (progress < 1) {
        frame++
        setTimeout(tick, frameRate)
      }
    }
    tick()
  }, [isInView]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!parsed) return <span ref={ref} className={className}>{target}</span>
  return <span ref={ref} className={className}>{displayed}</span>
}
