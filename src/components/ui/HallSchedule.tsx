'use client'

import { useState } from 'react'
import type { HallSlot } from '@/lib/types'

const DAYS = ['mo', 'di', 'mi', 'do', 'fr', 'sa', 'so'] as const
const DAY_LABELS: Record<string, string> = {
  mo: 'Montag', di: 'Dienstag', mi: 'Mittwoch',
  do: 'Donnerstag', fr: 'Freitag', sa: 'Samstag', so: 'Sonntag',
}

const DEPT_COLORS: Record<string, string> = {
  fussball: 'bg-green-100 border-l-4 border-sus-green text-green-900',
  volleyball: 'bg-blue-50 border-l-4 border-blue-500 text-blue-900',
  tennis: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-900',
  breitensport: 'bg-purple-50 border-l-4 border-purple-500 text-purple-900',
  allgemein: 'bg-gray-50 border-l-4 border-gray-400 text-gray-800',
}

interface HallScheduleProps {
  slots: HallSlot[]
}

export default function HallSchedule({ slots }: HallScheduleProps) {
  const [tooltip, setTooltip] = useState<HallSlot | null>(null)

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-7 gap-2 min-w-[700px]">
        {DAYS.map(day => {
          const daySlots = slots.filter(s => s.day === day)
          return (
            <div key={day}>
              <div className="text-center text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 py-1 border-b border-gray-200">
                {DAY_LABELS[day]}
              </div>
              <div className="space-y-1.5">
                {daySlots.length === 0 ? (
                  <div className="text-center text-xs text-gray-300 py-4">–</div>
                ) : (
                  daySlots.map((slot, i) => (
                    <div
                      key={i}
                      className={`rounded p-2 cursor-default text-xs relative ${DEPT_COLORS[slot.department]}`}
                      onMouseEnter={() => setTooltip(slot)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <div className="font-semibold truncate">{slot.group}</div>
                      <div className="opacity-70 mt-0.5">{slot.startTime}–{slot.endTime}</div>

                      {tooltip === slot && (
                        <div className="absolute z-10 bottom-full left-0 mb-1 bg-zinc-800 text-white text-xs rounded-md px-3 py-2 w-48 shadow-lg pointer-events-none">
                          <div className="font-semibold">{slot.group}</div>
                          <div className="opacity-80 mt-0.5">{slot.startTime} – {slot.endTime} Uhr</div>
                          <div className="capitalize opacity-70 mt-0.5">{slot.department}</div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
