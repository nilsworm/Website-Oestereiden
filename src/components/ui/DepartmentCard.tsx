import Link from 'next/link'
import Image from 'next/image'
import { Target, Globe, Disc, Activity, Award } from 'lucide-react'
import type { DepartmentInfo, Department } from '@/lib/types'

const DEPT_ICONS: Record<Department, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  fussball:     Target,
  volleyball:   Globe,
  tennis:       Disc,
  breitensport: Activity,
  allgemein:    Award,
}

const DEPT_COLOR: Record<Department, string> = {
  fussball:     'text-[#1a35c8]',
  volleyball:   'text-[#0d7a6e]',
  tennis:       'text-[#c47d0e]',
  breitensport: 'text-[#6b4faa]',
  allgemein:    'text-[#1a35c8]',
}

interface DepartmentCardProps {
  department: DepartmentInfo
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  const Icon = DEPT_ICONS[department.id]

  return (
    <Link href={`/${department.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden h-full shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-200">
        {department.heroImage ? (
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={department.heroImage}
              alt={department.label}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center bg-gray-50">
            <Icon size={48} strokeWidth={1.25} className={DEPT_COLOR[department.id]} />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-base text-[#1d1d1f] group-hover:text-[#1a35c8] transition-colors">
              {department.label}
            </h3>
            <span className="text-[#6e6e73] text-lg leading-none group-hover:translate-x-0.5 transition-transform">›</span>
          </div>
          <p className="text-[#6e6e73] text-sm leading-relaxed">{department.description}</p>
        </div>
      </div>
    </Link>
  )
}
