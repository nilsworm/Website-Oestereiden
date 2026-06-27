import type { Event, Department } from '@/lib/types'

const DEPT_LABELS: Record<string, string> = {
  fussball: 'Fußball',
  volleyball: 'Volleyball',
  tennis: 'Tennis',
  breitensport: 'Breitensport',
  allgemein: 'Allgemein',
}

const DEPT_TAG: Record<Department, string> = {
  fussball:     'text-[#1a35c8] bg-[#1a35c8]/10',
  volleyball:   'text-[#0d7a6e] bg-[#0d7a6e]/10',
  tennis:       'text-[#c47d0e] bg-[#c47d0e]/10',
  breitensport: 'text-[#6b4faa] bg-[#6b4faa]/10',
  allgemein:    'text-[#6e6e73] bg-[#6e6e73]/10',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 h-full hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-4">
        <time className="text-xs font-semibold text-[#6e6e73] uppercase tracking-[0.08em]">
          {formatDate(event.date)}
        </time>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${DEPT_TAG[event.department]}`}>
          {DEPT_LABELS[event.department]}
        </span>
      </div>
      <h3 className="font-bold text-[#1d1d1f] text-base mb-2 leading-snug">{event.title}</h3>
      <p className="text-[#6e6e73] text-sm leading-relaxed">{event.description}</p>
    </div>
  )
}
