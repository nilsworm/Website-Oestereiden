import Image from 'next/image'
import type { BoardMember as BoardMemberType } from '@/lib/types'

interface BoardMemberProps {
  member: BoardMemberType
}

export default function BoardMember({ member }: BoardMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-sus-muted mb-2.5 flex-shrink-0 ring-2 ring-sus-muted/40">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="64px"
            className="object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xl font-semibold text-sus-light/60">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <p className="font-semibold text-sus-light text-xs leading-snug">{member.name}</p>
      <p className="text-sus-royal/70 text-[10px] mt-0.5 leading-snug">{member.role}</p>
    </div>
  )
}
