import Link from 'next/link'
import type { DepartmentInfo, Department } from '@/lib/types'

const DEPT_ICONS: Record<Department, string> = {
  fussball: '⚽',
  volleyball: '🏐',
  tennis: '🎾',
  breitensport: '🏃',
  allgemein: '🏅',
}

const DEPT_SHADOW: Record<Department, string> = {
  fussball:     'hover:shadow-[0_8px_40px_rgba(26,53,200,0.2)]',
  volleyball:   'hover:shadow-[0_8px_40px_rgba(13,122,110,0.2)]',
  tennis:       'hover:shadow-[0_8px_40px_rgba(196,125,14,0.2)]',
  breitensport: 'hover:shadow-[0_8px_40px_rgba(107,79,170,0.2)]',
  allgemein:    'hover:shadow-[0_8px_40px_rgba(42,54,112,0.15)]',
}

interface DepartmentCardProps {
  department: DepartmentInfo
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link href={`/${department.id}`} className="group block h-full">
      <div className={`bg-white rounded-xl shadow-sm p-6 h-full hover:-translate-y-1 transition-all duration-200 ${DEPT_SHADOW[department.id]}`}>
        <div className="w-16 h-16 rounded-2xl bg-sus-ice flex items-center justify-center text-3xl mb-4">
          {DEPT_ICONS[department.id]}
        </div>
        <h3 className="font-bold text-lg text-sus-ink mb-2 group-hover:text-sus-royal transition-colors">
          {department.label}
        </h3>
        <p className="text-sus-ink/60 text-sm leading-relaxed mb-4">{department.description}</p>
        <p className="text-xs text-sus-ink/30 font-medium">Leitung: {department.head}</p>
      </div>
    </Link>
  )
}
