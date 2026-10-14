'use client'

import CountUp from '@/components/motion/CountUp'
import FadeIn from '@/components/motion/FadeIn'

const stats = [
  { label: 'Gegründet', value: '1922' },
  { label: 'Mitglieder', value: '860+' },
  { label: 'Abteilungen', value: '4' },
  { label: 'Standort', value: 'Oestereiden' },
]

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10">
      {stats.map((stat, i) => (
        <FadeIn key={stat.label} delay={i * 0.08}>
          <div className="text-center">
            {/* Wörter sind schmaler gesetzt, damit „Oestereiden“ in einer Zeile bleibt. */}
            <div
              className={`font-bold text-ui-accent leading-none mb-2 ${
                /^\d/.test(stat.value) ? 'text-[clamp(36px,5vw,64px)]' : 'text-[clamp(22px,2.8vw,44px)]'
              }`}
            >
              <CountUp target={stat.value} />
            </div>
            <div className="text-sm text-ui-muted font-medium">{stat.label}</div>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
