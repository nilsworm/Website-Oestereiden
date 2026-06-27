'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  bgImage?: string
  icon?: string // backwards-compatible: accepted but not rendered (other subpages may still pass it)
  children?: React.ReactNode
}

const ease = [0.25, 0.1, 0.25, 1] as const

export default function HeroSection({ title, subtitle, description, bgImage, children }: HeroSectionProps) {
  return (
    <section>
      {/* Weißer Text-Block */}
      <div className="bg-white px-4 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.p
            className="text-[#1a35c8] font-semibold text-xs uppercase tracking-[0.15em] mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease }}
          >
            Seit 1922
          </motion.p>
          <motion.h1
            className="text-[clamp(44px,8vw,96px)] font-black tracking-tight leading-[0.95] mb-5 text-[#1d1d1f]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-[#6e6e73] font-light mb-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease }}
          >
            {subtitle}
          </motion.p>
          {description && (
            <motion.p
              className="text-base text-[#6e6e73] max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease }}
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
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
