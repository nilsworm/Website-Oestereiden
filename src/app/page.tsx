import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import EventCard from '@/components/ui/EventCard'
import BoardMember from '@/components/ui/BoardMember'
import DepartmentCard from '@/components/ui/DepartmentCard'
import SponsorGrid from '@/components/ui/SponsorGrid'
import { mainBoard, advisoryBoard } from '@/data/board'
import { events } from '@/data/events'
import { sponsors } from '@/data/sponsors'
import { departments } from '@/data/departments'

export const metadata: Metadata = {
  title: 'SuS Oestereiden e.V. 1922 — Der Verein für die Region',
}

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="SuS Oestereiden e.V."
        subtitle="Der Verein für die Region seit 1922"
        description="Über 860 Mitglieder, vier Abteilungen, eine Gemeinschaft — in Rüthen-Oestereiden."
      />

      {/* Aktuelles */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Aktuelles & Termine</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Über den Verein */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-zinc-800 mb-4">Über unseren Verein</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Der Spiel- und Sportverein Oestereiden e.V. wurde 1922 gegründet und ist heute mit
                über 860 Mitgliedern der größte Verein im Stadtgebiet Rüthen.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Mit vier aktiven Abteilungen — Fußball, Volleyball, Tennis und Breitensport —
                bieten wir Sport und Gemeinschaft für jedes Alter.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Gegründet', value: '1922' },
                { label: 'Mitglieder', value: '860+' },
                { label: 'Abteilungen', value: '4' },
                { label: 'Standort', value: 'Rüthen' },
              ].map(stat => (
                <div key={stat.label} className="bg-sus-green-pale rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-sus-green">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Abteilungen */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Unsere Abteilungen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map(dept => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Vorstand */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Vereinsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-12">
            {mainBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
          <h3 className="text-lg font-semibold text-zinc-700 mb-6">Beisitzende</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {advisoryBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsoren */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Unsere Sponsoren</h2>
          <SponsorGrid sponsors={sponsors} />
        </div>
      </section>
    </>
  )
}
