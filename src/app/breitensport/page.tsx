import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { breitensportBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Breitensport' }

const kursangebot = [
  { gruppe: 'Kindertanzen', leitung: 'Sandra Risse' },
  { gruppe: 'Kinderturnen (3–4 Jahre)', leitung: 'Carolin Kaup' },
  { gruppe: 'Kinderturnen (5–6 Jahre)', leitung: 'Sandra Risse' },
  { gruppe: 'Kinderturnen (Vorschule)', leitung: 'Paulin Herting' },
  { gruppe: 'Kinderturnen (allgemein)', leitung: 'Janina Luig' },
  { gruppe: 'Tischtennis', leitung: 'Wolfgang Schulte Schilawa' },
  { gruppe: 'Fitness (Bauch-Beine-Po)', leitung: 'Katja Molerus' },
  { gruppe: 'Fit Mix', leitung: 'Melanie Kussmann' },
  { gruppe: 'Nordic Walking', leitung: 'Melanie Kussmann' },
]

export default function BreitensportPage() {
  return (
    <>
      <HeroSection title="Breitensport" subtitle="SuS Oestereiden" />
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-10">Abteilungsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-20">
            {breitensportBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>

          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Angebot</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-8">Kursangebot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {kursangebot.map(kurs => (
              <div key={kurs.gruppe} className="bg-sus-ice rounded-xl p-4 border-l-4 border-[#6b4faa]">
                <div className="font-semibold text-sus-ink text-sm">{kurs.gruppe}</div>
                <div className="text-sus-ink/40 text-xs mt-1">Leitung: {kurs.leitung}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
