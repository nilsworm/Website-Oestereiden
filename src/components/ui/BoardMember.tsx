import Image from 'next/image'
import type { BoardMember as BoardMemberType } from '@/lib/types'

interface BoardMemberProps {
  member: BoardMemberType
}

export default function BoardMember({ member }: BoardMemberProps) {
  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-sus-muted mb-3">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 180px"
            className="object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-semibold text-sus-light/60">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <p className="font-semibold text-sus-light text-sm leading-snug">{member.name}</p>
      <p className="text-sus-royal/70 text-[12px] mt-0.5 leading-snug">{member.role}</p>
    </div>
  )
}
