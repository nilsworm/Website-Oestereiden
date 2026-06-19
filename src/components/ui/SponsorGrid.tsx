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
          className="flex items-center justify-center bg-white rounded-lg border border-gray-200 p-4 h-20 hover:shadow-md transition-shadow"
        >
          <span className="text-sm font-medium text-gray-600 text-center leading-tight">
            {sponsor.name}
          </span>
        </div>
      ))}
    </div>
  )
}
