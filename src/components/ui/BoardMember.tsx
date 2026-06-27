import Image from 'next/image'
import type { BoardMember as BoardMemberType } from '@/lib/types'

interface BoardMemberProps {
  member: BoardMemberType
}

export default function BoardMember({ member }: BoardMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#f5f5f7] mb-2.5 flex-shrink-0 ring-2 ring-gray-200">
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
            <span className="text-xl font-semibold text-[#6e6e73]">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <p className="font-semibold text-[#1d1d1f] text-xs leading-snug">{member.name}</p>
      <p className="text-[#6e6e73] text-[10px] mt-0.5 leading-snug">{member.role}</p>
    </div>
  )
}
