import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { fussballBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Fußball' }

export default function FussballPage() {
  return (
    <>
      <HeroSection title="Fußball" subtitle="SuS Oestereiden" />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-sus-green-pale rounded-lg p-6 mb-10">
            <h2 className="font-semibold text-sus-green mb-2">Spielgemeinschaft Haarstrang</h2>
            <p className="text-gray-700 text-sm">
              Im Seniorenbereich spielen wir gemeinsam mit Partnerklubs in der SG Haarstrang.
              Mehr Infos unter{' '}
              <a
                href="https://www.sg-haarstrang.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sus-green underline hover:no-underline"
              >
                www.sg-haarstrang.de
              </a>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Abteilungsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {fussballBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
