import type { BoardMember, Event, HallSlot, Sponsor, DepartmentInfo, Department } from '@/lib/types'

describe('Type exports', () => {
  it('Department type includes all departments', () => {
    const departments: Department[] = ['fussball', 'volleyball', 'tennis', 'breitensport', 'allgemein']
    expect(departments).toHaveLength(5)
  })

  it('BoardMember has required fields', () => {
    const member: BoardMember = {
      name: 'Test Name',
      role: 'Vorsitzender',
      department: 'vorstand',
    }
    expect(member.name).toBeDefined()
    expect(member.role).toBeDefined()
  })

  it('Event has required fields', () => {
    const event: Event = {
      date: '2026-07-19',
      title: 'Sommerfest',
      description: 'Beschreibung',
      department: 'allgemein',
    }
    expect(event.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('HallSlot has required fields', () => {
    const slot: HallSlot = {
      day: 'mo',
      startTime: '18:00',
      endTime: '20:00',
      group: 'Fußball Senioren',
      department: 'fussball',
    }
    expect(slot.startTime).toMatch(/^\d{2}:\d{2}$/)
    expect(slot.endTime).toMatch(/^\d{2}:\d{2}$/)
  })
})
