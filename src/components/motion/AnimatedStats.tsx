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
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <FadeIn key={stat.label} delay={i * 0.1}>
          <div className="bg-sus-club/50 rounded-2xl p-8 text-center border border-sus-muted/40">
            <div className="text-4xl font-black text-sus-royal mb-1">
              <CountUp target={stat.value} />
            </div>
            <div className="text-sm text-sus-light/50 font-medium">{stat.label}</div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
