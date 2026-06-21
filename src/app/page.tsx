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

const statsBar = (
  <div className="flex flex-wrap items-center gap-6 text-sus-light/70 text-sm font-medium">
    {[
      { value: '1922', label: 'Gegründet' },
      { value: '860+', label: 'Mitglieder' },
      { value: '4', label: 'Abteilungen' },
      { value: 'Rüthen', label: 'Standort' },
    ].map(stat => (
      <div key={stat.label} className="flex items-baseline gap-1.5">
        <span className="text-sus-light font-bold text-lg">{stat.value}</span>
        <span>{stat.label}</span>
      </div>
    ))}
  </div>
)

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="SuS Oestereiden e.V."
        subtitle="Der Verein für die Region"
        description="Über 860 Mitglieder, vier Abteilungen, eine Gemeinschaft."
      >
        {statsBar}
      </HeroSection>

      {/* Aktuelles — HELL */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Aktuell</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-ink mb-10">Termine & Neuigkeiten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Über den Verein — DUNKEL */}
      <section className="py-24 px-4 bg-sus-navy text-sus-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Der Verein</p>
              <h2 className="text-[clamp(28px,4vw,48px)] font-bold mb-6">Seit über 100 Jahren<br />für die Region</h2>
              <p className="text-sus-light/60 leading-relaxed mb-4 text-lg">
                Der Spiel- und Sportverein Oestereiden e.V. wurde 1922 gegründet und ist heute mit
                über 860 Mitgliedern der größte Verein im Stadtgebiet Rüthen.
              </p>
              <p className="text-sus-light/60 leading-relaxed">
                Mit vier aktiven Abteilungen bieten wir Sport und Gemeinschaft für jedes Alter.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Gegründet', value: '1922' },
                { label: 'Mitglieder', value: '860+' },
                { label: 'Abteilungen', value: '4' },
                { label: 'Standort', value: 'Rüthen' },
              ].map(stat => (
                <div key={stat.label} className="bg-sus-club/50 rounded-2xl p-8 text-center border border-sus-muted/40">
                  <div className="text-4xl font-black text-sus-royal mb-1">{stat.value}</div>
                  <div className="text-sm text-sus-light/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Abteilungen — HELL */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Sport</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-ink mb-10">Unsere Abteilungen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map(dept => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Vorstand — MITTEL */}
      <section className="py-24 px-4 bg-sus-club">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-light mb-10">Vereinsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-14">
            {mainBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
          <p className="text-xs font-semibold text-sus-light/40 uppercase tracking-[0.1em] mb-6">Beisitzende</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {advisoryBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsoren — DUNKEL */}
      <section className="py-24 px-4 bg-sus-navy">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Partner</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-light mb-10">Unsere Sponsoren</h2>
          <SponsorGrid sponsors={sponsors} />
        </div>
      </section>
    </>
  )
}
