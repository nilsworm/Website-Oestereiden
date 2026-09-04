import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { volleyballBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Volleyball' }

export default function VolleyballPage() {
  return (
    <>
      <HeroSection title="Volleyball" subtitle="SuS Oestereiden" bgImage="/images/hero/Verein-allgemein-16.jpg" />
      <section className="py-24 px-4 page-surface">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Team</p>
          <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-sus-ink mb-10">Abteilungsvorstand</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {volleyballBoard.map(member => (
              <BoardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
