import { render, screen } from '@testing-library/react'
import FadeIn from '@/components/motion/FadeIn'

describe('FadeIn', () => {
  it('renders children', () => {
    render(<FadeIn><p>Test</p></FadeIn>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('passes className to wrapper', () => {
    const { container } = render(<FadeIn className="my-class"><span /></FadeIn>)
    expect(container.firstChild).toHaveClass('my-class')
  })
})
