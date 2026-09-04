'use client'

import Link from 'next/link'
import { UserPlus, LayoutGrid, Mail } from 'lucide-react'
import FadeIn from '@/components/motion/FadeIn'

const abteilungen = [
  { label: 'Fußball', href: '/fussball' },
  { label: 'Volleyball', href: '/volleyball' },
  { label: 'Tennis', href: '/tennis' },
  { label: 'Breitensport', href: '/breitensport' },
]

export default function VereinsinfoSection() {
  return (
    <section className="py-20 md:py-28 px-4 page-surface">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="eyebrow mb-3">Der Verein</p>
          <h2 className="section-title mb-12">Alles auf einen Blick</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <FadeIn delay={0}>
            <div className="bg-ui-surface rounded-2xl p-8 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#1a35c8]/10 text-[#1a35c8] flex items-center justify-center mb-5">
                <UserPlus size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-ui-text text-xl mb-3">Mitglied werden</h3>
              <p className="text-ui-muted text-sm leading-relaxed mb-6 flex-1">
                Werde Teil unserer Gemeinschaft. Füll das Aufnahmeformular aus und der Vorstand meldet sich bei dir.
              </p>
              <Link
                href="/mitgliedschaft"
                className="button-primary rounded-xl"
              >
                Jetzt beitreten
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-ui-surface rounded-2xl p-8 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#1a35c8]/10 text-[#1a35c8] flex items-center justify-center mb-5">
                <LayoutGrid size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-ui-text text-xl mb-3">Unsere Abteilungen</h3>
              <p className="text-ui-muted text-sm leading-relaxed mb-6 flex-1">
                Fußball, Volleyball, Tennis und Breitensport — für jedes Alter und jedes Niveau etwas dabei.
              </p>
              <div className="flex flex-wrap gap-2">
                {abteilungen.map(a => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="px-3 py-1 border border-ui-accent/40 text-ui-accent text-sm rounded-full hover:bg-ui-accent hover:text-white transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-ui-surface rounded-2xl p-8 h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#1a35c8]/10 text-[#1a35c8] flex items-center justify-center mb-5">
                <Mail size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-ui-text text-xl mb-3">Kontakt</h3>
              <p className="text-ui-muted text-sm leading-relaxed mb-6 flex-1">
                Fragen? Wir sind für euch da.
              </p>
              <div className="space-y-3 text-sm">
                <p className="text-ui-muted">Im Kirchfeld 1, 59602 Rüthen</p>
                <a href="tel:+492954924590" className="block text-ui-accent font-semibold hover:underline">
                  +49 2954 924590
                </a>
                <a href="mailto:info@sus-oestereiden.de" className="block text-ui-accent font-semibold hover:underline">
                  info@sus-oestereiden.de
                </a>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
