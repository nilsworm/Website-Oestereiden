'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import RevealText from '@/components/motion/RevealText'

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  bgImage?: string
  /** 'dark' nur auf der Startseite. Default hält das bisherige Rendering unverändert. */
  variant?: 'light' | 'dark'
  icon?: string // backwards-compatible: accepted but not rendered (other subpages may still pass it)
  children?: React.ReactNode
}

const ease = [0.25, 0.1, 0.25, 1] as const
const headingClass = 'text-[clamp(44px,8vw,96px)] font-bold tracking-[-0.035em] leading-[0.98] mb-5'

export default function HeroSection({ title, subtitle, description, bgImage, children, variant = 'light' }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const isDark = variant === 'dark'

  return (
    <section>
      <div className={`${isDark ? 'section-dark' : 'page-surface'} px-4 pt-16 pb-12 md:pt-24 md:pb-20`}>
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="eyebrow mb-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            Seit 1922
          </motion.p>
          {isDark ? (
            <RevealText
              as="h1"
              className={headingClass}
              delay={0.2}
            >
              {title}
            </RevealText>
          ) : (
            <motion.h1
              className={`${headingClass} text-ui-text`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              {title}
            </motion.h1>
          )}
          <motion.p
            className="text-xl md:text-2xl text-ui-muted font-normal mb-3"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease }}
          >
            {subtitle}
          </motion.p>
          {description && (
            <motion.p
              className="text-base text-ui-muted max-w-xl leading-relaxed"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease }}
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      {/* Fullbleed Foto */}
      {bgImage && (
        <div className="relative w-full aspect-[4/3] md:aspect-[16/7] overflow-hidden">
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      )}
    </section>
  )
}
