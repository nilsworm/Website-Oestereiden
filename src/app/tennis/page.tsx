import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { tennisBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Tennis' }

export default function TennisPage() {
  return (
    <>
      <HeroSection title="Tennis" subtitle="SuS Oestereiden" />
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-10">Abteilungsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {tennisBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
