import type { Event } from '@/lib/types'

const DEPT_LABELS: Record<string, string> = {
  fussball: 'Fußball',
  volleyball: 'Volleyball',
  tennis: 'Tennis',
  breitensport: 'Breitensport',
  allgemein: 'Allgemein',
}

const DEPT_BORDER: Record<string, string> = {
  fussball:     'border-l-[#1a35c8]',
  volleyball:   'border-l-[#0d7a6e]',
  tennis:       'border-l-[#c47d0e]',
  breitensport: 'border-l-[#6b4faa]',
  allgemein:    'border-l-sus-muted',
}

const DEPT_TAG: Record<string, string> = {
  fussball:     'text-[#1a35c8] bg-[#1a35c8]/10',
  volleyball:   'text-[#0d7a6e] bg-[#0d7a6e]/10',
  tennis:       'text-[#c47d0e] bg-[#c47d0e]/10',
  breitensport: 'text-[#6b4faa] bg-[#6b4faa]/10',
  allgemein:    'text-sus-muted bg-sus-muted/10',
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
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${DEPT_BORDER[event.department]} p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <time className="text-xs font-semibold text-sus-ink/40 uppercase tracking-[0.08em]">
          {formatDate(event.date)}
        </time>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${DEPT_TAG[event.department]}`}>
          {DEPT_LABELS[event.department]}
        </span>
      </div>
      <h3 className="font-bold text-lg text-sus-ink mb-2 leading-snug">{event.title}</h3>
      <p className="text-sus-ink/60 text-sm leading-relaxed">{event.description}</p>
    </div>
  )
}
