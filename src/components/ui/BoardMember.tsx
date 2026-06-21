import Image from 'next/image'
import type { BoardMember as BoardMemberType } from '@/lib/types'

interface BoardMemberProps {
  member: BoardMemberType
}

export default function BoardMember({ member }: BoardMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-sus-club mb-3 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-3xl font-black text-sus-light">
            {member.name.charAt(0)}
          </span>
        )}
      </div>
      <p className="font-semibold text-sus-ink text-sm leading-tight">{member.name}</p>
      <p className="text-sus-muted text-xs mt-0.5 leading-tight">{member.role}</p>
    </div>
  )
}
