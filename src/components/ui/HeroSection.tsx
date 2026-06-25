'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  icon?: string
  bgImage?: string
  children?: React.ReactNode
}

const ease = [0.25, 0.1, 0.25, 1] as const

export default function HeroSection({ title, subtitle, description, icon, bgImage, children }: HeroSectionProps) {
  return (
    <section className="relative bg-sus-navy text-sus-light clip-diagonal overflow-hidden">
      {bgImage && (
        <>
          <Image src={bgImage} alt="" fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-sus-navy/70" />
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <motion.p
              className="text-sus-royal font-semibold text-xs uppercase tracking-[0.15em] mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease }}
            >
              Seit 1922
            </motion.p>
            <motion.h1
              className="text-[clamp(40px,6vw,80px)] font-black tracking-tight leading-none mb-4 text-sus-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-sus-light/70 font-light mb-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
            >
              {subtitle}
            </motion.p>
            {description && (
              <motion.p
                className="text-base text-sus-light/50 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease }}
              >
                {description}
              </motion.p>
            )}
          </div>

          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {icon ? (
              <span className="text-[80px] md:text-[100px] leading-none animate-float">{icon}</span>
            ) : (
              <Image
                src="/images/logo.png"
                alt="SuS Oestereiden Logo"
                width={140}
                height={140}
                className="animate-float opacity-90"
                priority
              />
            )}
          </motion.div>
        </div>
      </div>

      {children && (
        <motion.div
          className="relative z-10 bg-sus-club/80 py-4 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </motion.div>
      )}
    </section>
  )
}
