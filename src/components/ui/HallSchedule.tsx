'use client'

import { useState } from 'react'
import type { HallSlot } from '@/lib/types'
import type { Department } from '@/lib/types'

const DAYS = ['mo', 'di', 'mi', 'do', 'fr', 'sa', 'so'] as const
type Day = typeof DAYS[number]

const DAY_LABELS: Record<Day, string> = {
  mo: 'Montag', di: 'Dienstag', mi: 'Mittwoch',
  do: 'Donnerstag', fr: 'Freitag', sa: 'Samstag', so: 'Sonntag',
}
const DAY_SHORT: Record<Day, string> = {
  mo: 'Mo', di: 'Di', mi: 'Mi', do: 'Do', fr: 'Fr', sa: 'Sa', so: 'So',
}

const DEPT_SLOT: Record<Department, string> = {
  fussball:     'border-l-[#1a35c8] bg-[#1a35c8]/5',
  volleyball:   'border-l-[#0d7a6e] bg-[#0d7a6e]/5',
  tennis:       'border-l-[#c47d0e] bg-[#c47d0e]/5',
  breitensport: 'border-l-[#6b4faa] bg-[#6b4faa]/5',
  allgemein:    'border-l-sus-muted bg-sus-muted/5',
}

interface HallScheduleProps {
  slots: HallSlot[]
}

export default function HallSchedule({ slots }: HallScheduleProps) {
  const [activeDay, setActiveDay] = useState<Day | null>(null)
  const [tooltip, setTooltip] = useState<HallSlot | null>(null)

  const filteredDays = activeDay ? [activeDay] : [...DAYS]

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveDay(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            activeDay === null
              ? 'bg-sus-royal text-white'
              : 'border border-sus-muted/30 text-sus-ink/50 hover:border-sus-ink/30 hover:text-sus-ink'
          }`}
        >
          Alle
        </button>
        {DAYS.map(day => (
          <button
            key={day}
            aria-label={DAY_LABELS[day]}
            onClick={() => setActiveDay(activeDay === day ? null : day)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeDay === day
                ? 'bg-sus-royal text-white'
                : 'border border-sus-muted/30 text-sus-ink/50 hover:border-sus-ink/30 hover:text-sus-ink'
            }`}
          >
            {DAY_SHORT[day]}
          </button>
        ))}
      </div>

      <div className={`grid gap-3 ${filteredDays.length > 1 ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-7' : 'grid-cols-1 max-w-sm'}`}>
        {filteredDays.map(day => {
          const daySlots = slots.filter(s => s.day === day)
          return (
            <div key={day}>
              <p className="text-xs font-bold text-sus-ink/30 uppercase tracking-[0.1em] mb-2">
                {DAY_LABELS[day]}
              </p>
              <div className="space-y-2">
                {daySlots.length === 0 ? (
                  <div className="text-center text-xs text-sus-ink/20 py-3">–</div>
                ) : (
                  daySlots.map((slot, i) => (
                    <div
                      key={i}
                      className={`relative rounded-lg border-l-4 p-2.5 text-xs cursor-default ${DEPT_SLOT[slot.department]}`}
                      onMouseEnter={() => setTooltip(slot)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <div className="font-bold truncate text-sus-ink">{slot.group}</div>
                      <div className="text-sus-ink/50 mt-0.5 font-medium">{`${slot.startTime}–${slot.endTime}`}</div>

                      {tooltip === slot && (
                        <div className="absolute z-10 bottom-full left-0 mb-1.5 bg-sus-navy text-sus-light text-xs rounded-xl px-3 py-2.5 w-48 shadow-xl pointer-events-none border border-sus-muted">
                          <div className="font-bold">{slot.group}</div>
                          <div className="text-sus-light/60 mt-0.5">{`${slot.startTime} – ${slot.endTime} Uhr`}</div>
                          <div className="capitalize text-sus-light/40 mt-0.5">{slot.department}</div>
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
