import type { Sponsor } from '@/lib/types'

interface SponsorGridProps {
  sponsors: Sponsor[]
}

export default function SponsorGrid({ sponsors }: SponsorGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {sponsors.map((sponsor) => (
        <div
          key={sponsor.name}
          className="group flex items-center justify-center bg-white/8 rounded-lg p-5 h-20 hover:bg-white/15 transition-all duration-150"
        >
          <span className="text-sus-light/50 group-hover:text-sus-light text-sm font-semibold text-center leading-tight transition-colors duration-150">
            {sponsor.name}
          </span>
        </div>
      ))}
    </div>
  )
}
