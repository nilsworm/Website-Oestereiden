import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import EventCard from '@/components/ui/EventCard'
import BoardMember from '@/components/ui/BoardMember'
import DepartmentCard from '@/components/ui/DepartmentCard'
import SponsorGrid from '@/components/ui/SponsorGrid'
import FadeIn from '@/components/motion/FadeIn'
import AnimatedGrid from '@/components/motion/AnimatedGrid'
import AnimatedStats from '@/components/motion/AnimatedStats'
import QuoteSection from '@/components/sections/QuoteSection'
import StandortSection from '@/components/sections/StandortSection'
import VereinsinfoSection from '@/components/sections/VereinsinfoSection'
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
        bgImage="/images/hero/Verein-allgemein-7.jpg"
      />

      {/* Sponsoren — direkt unter Hero */}
      <section className="py-10 px-4 bg-sus-navy border-t border-sus-muted/20">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-semibold text-sus-light/30 uppercase tracking-[0.15em] text-center mb-6">Unsere Sponsoren</p>
          <SponsorGrid sponsors={sponsors} />
        </div>
      </section>

      {/* Aktuelles — HELL */}
      <section className="min-h-[70vh] py-32 px-4 bg-white flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <FadeIn>
            <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Aktuell</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-ink mb-10">Termine & Neuigkeiten</h2>
          </FadeIn>
          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Über den Verein — DUNKEL */}
      <section className="min-h-[70vh] py-32 px-4 bg-sus-navy text-sus-light flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Der Verein</p>
              <h2 className="text-[clamp(28px,4vw,48px)] font-bold mb-6">Seit über 100 Jahren<br />für die Region</h2>
              <p className="text-sus-light/60 leading-relaxed mb-4 text-lg">
                Der Spiel- und Sportverein Oestereiden e.V. wurde 1922 gegründet und ist heute mit
                über 860 Mitgliedern der größte Verein im Stadtgebiet Rüthen.
              </p>
              <p className="text-sus-light/60 leading-relaxed">
                Mit vier aktiven Abteilungen bieten wir Sport und Gemeinschaft für jedes Alter.
              </p>
            </FadeIn>
            <AnimatedStats />
          </div>
        </div>
      </section>

      {/* Fotoleiste — Vereinsleben */}
      <div className="grid grid-cols-2 md:grid-cols-4 h-64 md:h-80">
        {[
          { src: '/images/hero/Fussball-30.jpg',       alt: 'Fußball' },
          { src: '/images/hero/Tennis-2.jpg',           alt: 'Tennis' },
          { src: '/images/hero/Kindertanzen-6.jpg',     alt: 'Breitensport' },
          { src: '/images/hero/Verein-allgemein-16.jpg',alt: 'Vereinsleben' },
        ].map(photo => (
          <div key={photo.src} className="relative overflow-hidden">
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-sus-navy/20 hover:bg-sus-navy/0 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Vorsitzender-Zitat — DUNKEL */}
      <QuoteSection />

      {/* Abteilungen — HELL */}
      <section className="min-h-[70vh] py-32 px-4 bg-white flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <FadeIn>
            <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Sport</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-ink mb-10">Unsere Abteilungen</h2>
          </FadeIn>
          <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map(dept => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Vorstand — MITTEL */}
      <section className="min-h-[70vh] py-32 px-4 bg-sus-club flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <FadeIn>
            <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-light mb-12">Vereinsvorstand</h2>
          </FadeIn>
          <AnimatedGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 mb-16">
            {mainBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </AnimatedGrid>
          <FadeIn>
            <p className="text-[11px] font-semibold text-sus-light/40 uppercase tracking-[0.15em] mb-6">Beisitzende</p>
          </FadeIn>
          <AnimatedGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {advisoryBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Standort — DUNKEL */}
      <StandortSection />

      {/* Vereinsinfos — HELL */}
      <VereinsinfoSection />

    </>
  )
}
