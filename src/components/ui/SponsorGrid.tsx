import Image from 'next/image'
import type { Sponsor } from '@/lib/types'

interface SponsorGridProps {
  sponsors: Sponsor[]
}

export default function SponsorGrid({ sponsors }: SponsorGridProps) {
  const track = [...sponsors, ...sponsors]

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex gap-10 animate-ticker w-max">
        {track.map((sponsor, i) => (
          <div
            key={i}
            className="flex items-center justify-center bg-white rounded-xl px-6 py-3 h-20 min-w-[140px] flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            {sponsor.logo ? (
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={120}
                height={56}
                className="object-contain max-h-14 w-auto"
              />
            ) : (
              <span className="text-sus-ink/60 text-sm font-semibold text-center leading-tight">
                {sponsor.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
