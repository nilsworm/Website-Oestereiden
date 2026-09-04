import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import HeroSection from '@/components/ui/HeroSection'
import EventCard from '@/components/ui/EventCard'
import BoardMember from '@/components/ui/BoardMember'
import SponsorGrid from '@/components/ui/SponsorGrid'
import FadeIn from '@/components/motion/FadeIn'
import AnimatedGrid from '@/components/motion/AnimatedGrid'
import AnimatedStats from '@/components/motion/AnimatedStats'
import RevealText from '@/components/motion/RevealText'
import AbteilungenStack from '@/components/sections/AbteilungenStack'
import QuoteSection from '@/components/sections/QuoteSection'
import StandortSection from '@/components/sections/StandortSection'
import VereinsinfoSection from '@/components/sections/VereinsinfoSection'
import { mainBoard, advisoryBoard } from '@/data/board'
import { events } from '@/data/events'
import { sponsors } from '@/data/sponsors'

export const metadata: Metadata = {
  title: 'SuS Oestereiden e.V. 1922 — Der Verein für die Region',
}

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="SuS Oestereiden e.V."
        subtitle="Der Verein für die Region"
        description="Über 860 Mitglieder, vier Abteilungen, eine Gemeinschaft."
        bgImage="/images/hero/Verein-allgemein-7.jpg"
        variant="dark"
      >
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/mitgliedschaft"
            className="button-primary px-6 py-3"
          >
            Mitglied werden
          </Link>
          <Link
            href="#abteilungen"
            className="button-secondary px-6 py-3"
          >
            Abteilungen
          </Link>
        </div>
      </HeroSection>

      {/* Aktuelles */}
      <section className="page-surface-muted clip-lg section-pad">
        <div className="max-w-7xl mx-auto w-full px-4">
          <FadeIn>
            <p className="eyebrow mb-3">Aktuell</p>
            <RevealText as="h2" className="section-title mb-10">Termine &amp; Neuigkeiten</RevealText>
          </FadeIn>
        </div>
        {/* Mobile: horizontaler Scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory">
          {events.map((event, i) => (
            <div key={i} className="flex-shrink-0 w-[300px] snap-start">
              <EventCard event={event} />
            </div>
          ))}
        </div>
        {/* Desktop: Grid */}
        <div className="hidden md:block max-w-7xl mx-auto px-4">
          <AnimatedGrid className="grid grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Über den Verein + Stats */}
      <section className="px-4 page-surface section-pad">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="eyebrow mb-3">Der Verein</p>
              <RevealText as="h2" className="section-title mb-6">
                Seit über 100 Jahren für die Region
              </RevealText>
              <p className="text-secondary leading-relaxed mb-4 text-lg">
                Der Spiel- und Sportverein Oestereiden e.V. wurde 1922 gegründet und ist heute mit
                über 860 Mitgliedern der größte Verein im Stadtgebiet Rüthen.
              </p>
              <p className="text-secondary leading-relaxed">
                Mit vier aktiven Abteilungen bieten wir Sport und Gemeinschaft für jedes Alter.
              </p>
            </FadeIn>
            <AnimatedStats />
          </div>
        </div>
      </section>

      {/* Foto-Ticker */}
      {(() => {
        const photos = [
          { src: '/images/hero/Fussball-30.jpg',          label: 'Fußball' },
          { src: '/images/hero/Verein-allgemein-7.jpg',   label: 'Vereinsleben' },
          { src: '/images/hero/Tennis-2.jpg',             label: 'Tennis' },
          { src: '/images/hero/Kindertanzen-6.jpg',       label: 'Breitensport' },
          { src: '/images/hero/Verein-allgemein-16.jpg',  label: 'Der Verein' },
        ]
        const track = [...photos, ...photos]
        return (
          <div className="overflow-hidden section-dark clip-lg">
            <div className="flex animate-ticker w-max" style={{ animationDuration: '48s' }}>
              {track.map((photo, i) => (
                <div key={i} className="relative h-64 w-96 flex-shrink-0 overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    fill
                    sizes="384px"
                    className="object-cover brightness-90"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
                    <span className="text-white/90 text-[11px] font-semibold uppercase tracking-[0.15em]">
                      {photo.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Vorsitzender-Zitat */}
      <QuoteSection />

      {/* Abteilungen — Sticky-Stack */}
      <AbteilungenStack />

      {/* Vorstand */}
      <section className="px-4 page-surface section-pad">
        <div className="max-w-5xl mx-auto w-full">
          <FadeIn>
            <p className="eyebrow mb-2">Team</p>
            <RevealText as="h2" className="text-[clamp(22px,3vw,36px)] font-bold text-ui-text mb-10">Vereinsvorstand</RevealText>
          </FadeIn>
          {/* Mobile: horizontaler Scroll */}
          <div className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x">
            {mainBoard.map(member => (
              <div key={member.name} className="flex-shrink-0 w-20 snap-start">
                <BoardMember member={member} />
              </div>
            ))}
          </div>
          {/* Desktop: Grid */}
          <AnimatedGrid className="hidden md:grid grid-cols-6 gap-6 mb-10">
            {mainBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </AnimatedGrid>
          <div className="border-t divider pt-8 mt-8">
            <FadeIn>
              <p className="text-[10px] font-semibold text-ui-muted uppercase tracking-[0.15em] mb-6">Beisitzende</p>
            </FadeIn>
            {/* Mobile: horizontaler Scroll */}
            <div className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x">
              {advisoryBoard.map(member => (
                <div key={member.name} className="flex-shrink-0 w-20 snap-start">
                  <BoardMember member={member} />
                </div>
              ))}
            </div>
            {/* Desktop: Grid */}
            <AnimatedGrid className="hidden md:grid grid-cols-4 gap-6">
              {advisoryBoard.map(member => (
                <BoardMember key={member.name} member={member} />
              ))}
            </AnimatedGrid>
          </div>
        </div>
      </section>

      {/* Standort */}
      <StandortSection />

      {/* Vereinsinfos */}
      <VereinsinfoSection />

      {/* Sponsoren */}
      <section className="py-12 px-4 page-surface-muted border-t divider">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] font-semibold text-ui-muted uppercase tracking-[0.15em] text-center mb-8">
            Unsere Sponsoren
          </p>
          <SponsorGrid sponsors={sponsors} />
        </div>
      </section>
    </>
  )
}
