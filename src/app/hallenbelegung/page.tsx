import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import HallSchedule from '@/components/ui/HallSchedule'
import { hallSlots } from '@/data/hallenbelegung'

export const metadata: Metadata = { title: 'Hallenbelegung' }

export default function HallenbelegungPage() {
  return (
    <>
      <HeroSection
        title="Hallenbelegung"
        subtitle="Wochenbelegungsplan der Vereinshalle"
        icon="🏟️"
      />
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: 'Fußball',      color: '#1a35c8' },
              { label: 'Volleyball',   color: '#0d7a6e' },
              { label: 'Tennis',       color: '#c47d0e' },
              { label: 'Breitensport', color: '#6b4faa' },
            ].map(item => (
              <span
                key={item.label}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white shadow-sm border-l-4"
                style={{ borderColor: item.color, color: item.color }}
              >
                {item.label}
              </span>
            ))}
          </div>
          <HallSchedule slots={hallSlots} />
          <p className="text-xs text-sus-ink/30 mt-8">
            Stand: Saison 2024/25. Änderungen vorbehalten. Kontakt: info@sus-oestereiden.de
          </p>
        </div>
      </section>
    </>
  )
}
