import { render, screen, fireEvent } from '@testing-library/react'
import CookieBanner from '@/components/layout/CookieBanner'

const mockLocalStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

beforeEach(() => mockLocalStorage.clear())

describe('CookieBanner', () => {
  it('shows banner when no consent stored', () => {
    render(<CookieBanner />)
    expect(screen.getByText('Alle akzeptieren')).toBeInTheDocument()
  })

  it('hides banner when consent already stored', () => {
    mockLocalStorage.setItem('sus-cookie-consent', JSON.stringify({ functional: true, statistics: false, marketing: false }))
    render(<CookieBanner />)
    expect(screen.queryByText('Alle akzeptieren')).not.toBeInTheDocument()
  })

  it('saves all-accept to localStorage and hides', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByText('Alle akzeptieren'))
    const stored = JSON.parse(mockLocalStorage.getItem('sus-cookie-consent') ?? '{}')
    expect(stored).toEqual({ functional: true, statistics: true, marketing: true })
    expect(screen.queryByText('Alle akzeptieren')).not.toBeInTheDocument()
  })

  it('saves necessary-only to localStorage', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByText('Nur notwendige'))
    const stored = JSON.parse(mockLocalStorage.getItem('sus-cookie-consent') ?? '{}')
    expect(stored).toEqual({ functional: true, statistics: false, marketing: false })
  })

  it('shows category checkboxes when Einstellungen clicked', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByText('Einstellungen'))
    expect(screen.getByText('Statistiken')).toBeInTheDocument()
    expect(screen.getByText('Marketing')).toBeInTheDocument()
  })

  it('re-opens when open-cookie-banner event fired', () => {
    mockLocalStorage.setItem('sus-cookie-consent', JSON.stringify({ functional: true, statistics: false, marketing: false }))
    render(<CookieBanner />)
    expect(screen.queryByText('Alle akzeptieren')).not.toBeInTheDocument()
    fireEvent(window, new Event('open-cookie-banner'))
    expect(screen.getByText('Alle akzeptieren')).toBeInTheDocument()
  })
})
