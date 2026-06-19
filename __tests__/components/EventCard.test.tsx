import { render, screen } from '@testing-library/react'
import EventCard from '@/components/ui/EventCard'
import type { Event } from '@/lib/types'

const mockEvent: Event = {
  date: '2026-07-19',
  title: 'Sommerfest SuS Oestereiden',
  description: 'Beschreibung des Sommerfests',
  department: 'allgemein',
}

describe('EventCard', () => {
  it('renders event title', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText('Sommerfest SuS Oestereiden')).toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText(/19\.?\s*Juli\s*2026/)).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText('Beschreibung des Sommerfests')).toBeInTheDocument()
  })

  it('renders department badge', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText('Allgemein')).toBeInTheDocument()
  })
})
