import Link from 'next/link'
import type { DepartmentInfo } from '@/lib/types'

const DEPT_ICONS: Record<string, string> = {
  fussball: '⚽',
  volleyball: '🏐',
  tennis: '🎾',
  breitensport: '🏃',
}

interface DepartmentCardProps {
  department: DepartmentInfo
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link href={`/${department.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg hover:border-sus-green transition-all h-full">
        <div className="text-4xl mb-3">{DEPT_ICONS[department.id]}</div>
        <h3 className="font-bold text-lg text-zinc-800 mb-2 group-hover:text-sus-green transition-colors">
          {department.label}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">{department.description}</p>
        <p className="text-xs text-gray-400">Leitung: {department.head}</p>
      </div>
    </Link>
  )
}
