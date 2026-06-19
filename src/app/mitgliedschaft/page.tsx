import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'

export const metadata: Metadata = { title: 'Mitgliedschaft' }

const distribution = [
  { abteilung: 'Breitensport', anteil: 35 },
  { abteilung: 'Fußball', anteil: 33 },
  { abteilung: 'Tennis', anteil: 20 },
  { abteilung: 'Volleyball', anteil: 12 },
]

export default function MitgliedschaftPage() {
  return (
    <>
      <HeroSection
        title="Mitgliedschaft"
        subtitle="Werden Sie Teil unseres Vereins"
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-zinc max-w-none">
            <h2>Über uns</h2>
            <p>
              Der SuS Oestereiden e.V. ist mit über 860 Mitgliedern der größte Verein im
              Stadtgebiet Rüthen. Seit 1922 fördern wir Sport und Gemeinschaft in der Region.
            </p>

            <h2>Mitgliederverteilung</h2>
            <div className="not-prose space-y-3 mb-8">
              {distribution.map(d => (
                <div key={d.abteilung}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{d.abteilung}</span>
                    <span className="text-gray-500">{d.anteil} %</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sus-green rounded-full"
                      style={{ width: `${d.anteil}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <h2>Aufnahme</h2>
            <p>
              Zur Aufnahme füllen Sie bitte den Aufnahmeantrag aus und senden ihn an:
            </p>
            <address className="not-italic bg-sus-green-pale rounded-lg p-4 text-sm not-prose">
              <strong>SuS Oestereiden e.V.</strong><br />
              z. Hd. Michael Witthaut<br />
              Im Kirchfeld 1<br />
              59602 Rüthen<br /><br />
              <a href="mailto:info@sus-oestereiden.de" className="text-sus-green underline">
                info@sus-oestereiden.de
              </a>
            </address>

            <div className="not-prose mt-6">
              <a
                href="/downloads/aufnahmeantrag.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sus-green text-white font-medium rounded-lg hover:bg-sus-green-light transition-colors"
              >
                Aufnahmeantrag herunterladen (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
