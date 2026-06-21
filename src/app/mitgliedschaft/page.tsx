import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'

export const metadata: Metadata = { title: 'Mitgliedschaft' }

const distribution = [
  { abteilung: 'Breitensport', anteil: 35, color: '#6b4faa' },
  { abteilung: 'Fußball',      anteil: 33, color: '#1a35c8' },
  { abteilung: 'Tennis',       anteil: 20, color: '#c47d0e' },
  { abteilung: 'Volleyball',   anteil: 12, color: '#0d7a6e' },
]

export default function MitgliedschaftPage() {
  return (
    <>
      <HeroSection
        title="Werde Teil von 860+"
        subtitle="Mitglied bei SuS Oestereiden"
        description="Der größte Sportverein im Stadtgebiet Rüthen — seit 1922."
        icon="🤝"
      />

      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Der Verein</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-6">Über uns</h2>
          <p className="text-sus-ink/60 leading-relaxed mb-12 text-lg">
            Der SuS Oestereiden e.V. ist mit über 860 Mitgliedern der größte Verein im
            Stadtgebiet Rüthen. Seit 1922 fördern wir Sport und Gemeinschaft in der Region.
          </p>

          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Verteilung</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-8">Mitglieder</h2>
          <div className="space-y-4 mb-16">
            {distribution.map(d => (
              <div key={d.abteilung}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold text-sus-ink">{d.abteilung}</span>
                  <span className="text-sus-ink/40 font-medium">{d.anteil} %</span>
                </div>
                <div className="h-2 bg-sus-ice rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${d.anteil}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-sus-club">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Aufnahme</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-light mb-6">Jetzt Mitglied werden</h2>
          <p className="text-sus-light/60 leading-relaxed mb-8">
            Zur Aufnahme füllen Sie bitte den Aufnahmeantrag aus und senden ihn an:
          </p>
          <div className="bg-sus-navy/50 rounded-2xl p-6 mb-8 border border-sus-muted text-sus-light/70 text-sm leading-loose">
            <strong className="text-sus-light">SuS Oestereiden e.V.</strong><br />
            z. Hd. Michael Witthaut<br />
            Im Kirchfeld 1<br />
            59602 Rüthen<br />
            <a href="mailto:info@sus-oestereiden.de" className="text-sus-royal hover:underline font-semibold">
              info@sus-oestereiden.de
            </a>
          </div>
          <a
            href="/downloads/aufnahmeantrag.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sus-royal text-white font-semibold rounded-xl hover:bg-sus-royal/90 transition-colors"
          >
            Aufnahmeantrag herunterladen (PDF)
          </a>
        </div>
      </section>
    </>
  )
}
