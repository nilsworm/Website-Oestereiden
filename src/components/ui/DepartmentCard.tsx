import Link from 'next/link'
import { Target, Globe, Disc, Activity, Award } from 'lucide-react'
import type { DepartmentInfo, Department } from '@/lib/types'

const DEPT_ICONS: Record<Department, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  fussball:     Target,
  volleyball:   Globe,
  tennis:       Disc,
  breitensport: Activity,
  allgemein:    Award,
}

const DEPT_ICON_STYLE: Record<Department, string> = {
  fussball:     'bg-[#1a35c8]/10 text-[#1a35c8]',
  volleyball:   'bg-[#0d7a6e]/10 text-[#0d7a6e]',
  tennis:       'bg-[#c47d0e]/10 text-[#c47d0e]',
  breitensport: 'bg-[#6b4faa]/10 text-[#6b4faa]',
  allgemein:    'bg-sus-ice text-sus-royal',
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
  const Icon = DEPT_ICONS[department.id]

  return (
    <Link href={`/${department.id}`} className="group block h-full">
      <div className={`bg-white rounded-xl shadow-sm p-6 h-full hover:-translate-y-1 transition-all duration-200 ${DEPT_SHADOW[department.id]}`}>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${DEPT_ICON_STYLE[department.id]}`}>
          <Icon size={26} strokeWidth={1.75} />
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
