import { render, screen, fireEvent } from '@testing-library/react'
import HallSchedule from '@/components/ui/HallSchedule'
import type { HallSlot } from '@/lib/types'

const mockSlots: HallSlot[] = [
  { day: 'mo', startTime: '18:00', endTime: '20:00', group: 'Fußball Senioren', department: 'fussball' },
  { day: 'di', startTime: '17:00', endTime: '18:30', group: 'Kinderturnen', department: 'breitensport' },
]

describe('HallSchedule', () => {
  it('renders all day columns', () => {
    render(<HallSchedule slots={mockSlots} />)
    expect(screen.getByText('Montag')).toBeInTheDocument()
    expect(screen.getByText('Dienstag')).toBeInTheDocument()
  })

  it('renders slot group names', () => {
    render(<HallSchedule slots={mockSlots} />)
    expect(screen.getByText('Fußball Senioren')).toBeInTheDocument()
    expect(screen.getByText('Kinderturnen')).toBeInTheDocument()
  })

  it('renders slot times', () => {
    render(<HallSchedule slots={mockSlots} />)
    expect(screen.getByText('18:00–20:00')).toBeInTheDocument()
  })
})
