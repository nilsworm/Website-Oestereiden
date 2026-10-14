import { render, screen, fireEvent, act } from '@testing-library/react'
import CookieBanner from '@/components/layout/CookieBanner'
import { reopenConsent } from '@/lib/consent'

describe('CookieBanner', () => {
  beforeEach(() => localStorage.clear())

  it('shows on first visit and hides after rejecting', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByText('Nur notwendige'))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(JSON.parse(localStorage.getItem('sus-consent-v1')!)).toEqual({ media: false })
  })

  it('stores media consent and can be reopened', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByText('Alle akzeptieren'))
    expect(JSON.parse(localStorage.getItem('sus-consent-v1')!)).toEqual({ media: true })
    act(() => reopenConsent())
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByLabelText(/Externe Medien/)).toBeChecked()
  })
})
