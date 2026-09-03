import { render, screen } from '@testing-library/react'
import RevealText from '@/components/motion/RevealText'

describe('RevealText', () => {
  it('behält den vollständigen Text als zugänglichen Namen, trotz Wortzerlegung', () => {
    render(<RevealText as="h2">Unsere Abteilungen</RevealText>)
    expect(
      screen.getByRole('heading', { level: 2, name: 'Unsere Abteilungen' })
    ).toBeInTheDocument()
  })

  it('rendert den über `as` gewählten Tag', () => {
    render(<RevealText as="h1">Der Verein</RevealText>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('reicht className an das äußere Element durch', () => {
    const { container } = render(<RevealText className="section-title">Test</RevealText>)
    expect(container.firstChild).toHaveClass('section-title')
  })
})
