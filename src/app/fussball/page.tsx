import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { fussballBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Fußball' }

export default function FussballPage() {
  return (
    <>
      <HeroSection title="Fußball" subtitle="SuS Oestereiden" icon="⚽" />

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-sus-ice rounded-2xl p-6 mb-14 border-l-4 border-sus-royal">
            <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.1em] mb-1">Spielgemeinschaft</p>
            <h2 className="font-bold text-sus-ink mb-2">SG Haarstrang</h2>
            <p className="text-sus-ink/60 text-sm leading-relaxed">
              Im Seniorenbereich spielen wir gemeinsam mit Partnerklubs in der SG Haarstrang.
              Mehr Infos unter{' '}
              <a
                href="https://www.sg-haarstrang.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sus-royal underline hover:no-underline font-semibold"
              >
                www.sg-haarstrang.de
              </a>
            </p>
          </div>

          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-10">Abteilungsvorstand</h2>
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
