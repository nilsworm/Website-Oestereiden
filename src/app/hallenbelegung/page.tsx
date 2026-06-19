import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import HallSchedule from '@/components/ui/HallSchedule'
import { hallSlots } from '@/data/hallenbelegung'

export const metadata: Metadata = { title: 'Hallenbelegung' }

export default function HallenbelegungPage() {
  return (
    <>
      <HeroSection title="Hallenbelegung" subtitle="Wochenbelegungsplan der Vereinshalle" />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 flex-wrap mb-8 text-xs">
            {[
              { label: 'Fußball', color: 'border-sus-green bg-green-100' },
              { label: 'Volleyball', color: 'border-blue-500 bg-blue-50' },
              { label: 'Tennis', color: 'border-yellow-500 bg-yellow-50' },
              { label: 'Breitensport', color: 'border-purple-500 bg-purple-50' },
            ].map(item => (
              <span key={item.label} className={`flex items-center gap-1.5 px-3 py-1 rounded-full border-l-4 ${item.color}`}>
                {item.label}
              </span>
            ))}
          </div>
          <HallSchedule slots={hallSlots} />
          <p className="text-xs text-gray-400 mt-6">
            Stand: Saison 2024/25. Änderungen vorbehalten. Kontakt: info@sus-oestereiden.de
          </p>
        </div>
      </section>
    </>
  )
}
