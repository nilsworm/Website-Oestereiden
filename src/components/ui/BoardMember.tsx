import Image from 'next/image'
import type { BoardMember as BoardMemberType } from '@/lib/types'

interface BoardMemberProps {
  member: BoardMemberType
}

export default function BoardMember({ member }: BoardMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-sus-green-pale mb-3 flex items-center justify-center">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-3xl text-sus-green font-bold">
            {member.name.charAt(0)}
          </span>
        )}
      </div>
      <p className="font-semibold text-zinc-800 text-sm">{member.name}</p>
      <p className="text-gray-500 text-xs mt-0.5">{member.role}</p>
    </div>
  )
}
