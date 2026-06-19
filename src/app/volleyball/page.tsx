import type { Metadata } from 'next'
import HeroSection from '@/components/ui/HeroSection'
import BoardMember from '@/components/ui/BoardMember'
import { volleyballBoard } from '@/data/board'

export const metadata: Metadata = { title: 'Volleyball' }

export default function VolleyballPage() {
  return (
    <>
      <HeroSection title="Volleyball" subtitle="SuS Oestereiden" />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-800 mb-8">Abteilungsvorstand</h2>
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
