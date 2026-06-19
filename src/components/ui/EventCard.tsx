import type { Event } from '@/lib/types'

const DEPT_LABELS: Record<string, string> = {
  fussball: 'Fußball',
  volleyball: 'Volleyball',
  tennis: 'Tennis',
  breitensport: 'Breitensport',
  allgemein: 'Allgemein',
}

const DEPT_COLORS: Record<string, string> = {
  fussball: 'bg-green-100 text-green-800',
  volleyball: 'bg-blue-100 text-blue-800',
  tennis: 'bg-yellow-100 text-yellow-800',
  breitensport: 'bg-purple-100 text-purple-800',
  allgemein: 'bg-gray-100 text-gray-700',
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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <time className="text-sm font-medium text-gray-500">{formatDate(event.date)}</time>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${DEPT_COLORS[event.department]}`}>
          {DEPT_LABELS[event.department]}
        </span>
      </div>
      <h3 className="font-bold text-lg text-zinc-800 mb-2">{event.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
    </div>
  )
}
