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
    <section className="min-h-[70vh] py-32 px-4 bg-sus-ice flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Der Verein</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-ink mb-12">Alles auf einen Blick</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <FadeIn delay={0}>
            <div className="bg-white rounded-2xl p-8 h-full shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-sus-royal/10 text-sus-royal flex items-center justify-center mb-5">
                <UserPlus size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-sus-ink text-xl mb-3">Mitglied werden</h3>
              <p className="text-sus-ink/60 text-sm leading-relaxed mb-6 flex-1">
                Werde Teil unserer Gemeinschaft. Füll das Aufnahmeformular aus und der Vorstand meldet sich bei dir.
              </p>
              <Link
                href="/mitgliedschaft"
                className="inline-block px-5 py-2.5 bg-sus-royal text-white text-sm font-semibold rounded-xl hover:bg-sus-royal/90 transition-colors text-center"
              >
                Jetzt beitreten
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl p-8 h-full shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-sus-royal/10 text-sus-royal flex items-center justify-center mb-5">
                <LayoutGrid size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-sus-ink text-xl mb-3">Unsere Abteilungen</h3>
              <p className="text-sus-ink/60 text-sm leading-relaxed mb-6 flex-1">
                Fußball, Volleyball, Tennis und Breitensport — für jedes Alter und jedes Niveau etwas dabei.
              </p>
              <div className="flex flex-wrap gap-2">
                {abteilungen.map(a => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="px-3 py-1 border border-sus-royal/30 text-sus-royal text-sm rounded-full hover:bg-sus-royal hover:text-white transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl p-8 h-full shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-sus-royal/10 text-sus-royal flex items-center justify-center mb-5">
                <Mail size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-bold text-sus-ink text-xl mb-3">Kontakt</h3>
              <p className="text-sus-ink/60 text-sm leading-relaxed mb-6 flex-1">
                Fragen? Wir sind für euch da.
              </p>
              <div className="space-y-3 text-sm">
                <p className="text-sus-ink/60">Im Kirchfeld 1, 59602 Rüthen</p>
                <a href="tel:+492954924590" className="block text-sus-royal font-semibold hover:underline">
                  +49 2954 924590
                </a>
                <a href="mailto:info@sus-oestereiden.de" className="block text-sus-royal font-semibold hover:underline">
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
