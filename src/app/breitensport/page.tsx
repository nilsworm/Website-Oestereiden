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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Abteilungsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-16">
            {breitensportBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-zinc-800 mb-6">Kursangebot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {kursangebot.map(kurs => (
              <div key={kurs.gruppe} className="bg-sus-green-pale rounded-lg p-4">
                <div className="font-semibold text-zinc-800 text-sm">{kurs.gruppe}</div>
                <div className="text-gray-500 text-xs mt-1">Leitung: {kurs.leitung}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
