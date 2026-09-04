import { render, screen } from '@testing-library/react'
import AbteilungenStack from '@/components/sections/AbteilungenStack'
import { departments } from '@/data/departments'

describe('AbteilungenStack', () => {
  it('rendert eine Zeile je Abteilung', () => {
    render(<AbteilungenStack />)
    expect(screen.getAllByRole('link')).toHaveLength(departments.length)
  })

  it('verlinkt jede Abteilung auf ihre eigene Seite', () => {
    render(<AbteilungenStack />)
    expect(screen.getByRole('link', { name: 'Fußball' })).toHaveAttribute('href', '/fussball')
    expect(screen.getByRole('link', { name: 'Tennis' })).toHaveAttribute('href', '/tennis')
  })

  it('trägt die Sprungmarke #abteilungen für den Hero-Button', () => {
    const { container } = render(<AbteilungenStack />)
    expect(container.querySelector('#abteilungen')).toBeInTheDocument()
  })
})
