'use client'

import CountUp from '@/components/motion/CountUp'
import FadeIn from '@/components/motion/FadeIn'

const stats = [
  { label: 'Gegründet', value: '1922' },
  { label: 'Mitglieder', value: '860+' },
  { label: 'Abteilungen', value: '4' },
  { label: 'Standort', value: 'Rüthen' },
]

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
      {stats.map((stat, i) => (
        <FadeIn key={stat.label} delay={i * 0.08}>
          <div className="text-center">
            <div className="text-[clamp(36px,5vw,64px)] font-bold text-ui-accent leading-none mb-2">
              <CountUp target={stat.value} />
            </div>
            <div className="text-sm text-ui-muted font-medium">{stat.label}</div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
