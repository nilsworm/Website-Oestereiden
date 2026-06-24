import { render, screen } from '@testing-library/react'
import { act } from 'react'
import CountUp from '@/components/motion/CountUp'

describe('CountUp', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: false })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders numeric target with suffix', () => {
    render(<CountUp target="860+" />)
    // Advance timers past the full animation duration within act()
    act(() => {
      jest.advanceTimersByTime(1300)
    })
    expect(screen.getByText(/860\+/)).toBeInTheDocument()
  })

  it('renders non-numeric target as-is', () => {
    render(<CountUp target="Rüthen" />)
    expect(screen.getByText('Rüthen')).toBeInTheDocument()
  })

  it('renders "4" target', () => {
    render(<CountUp target="4" />)
    // Advance timers past the full animation duration within act()
    act(() => {
      jest.advanceTimersByTime(1300)
    })
    expect(screen.getByText('4')).toBeInTheDocument()
  })
})
