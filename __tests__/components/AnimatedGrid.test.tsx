import { render, screen } from '@testing-library/react'
import AnimatedGrid from '@/components/motion/AnimatedGrid'

describe('AnimatedGrid', () => {
  it('renders all children', () => {
    render(
      <AnimatedGrid className="grid grid-cols-3 gap-4">
        <div>Alpha</div>
        <div>Beta</div>
        <div>Gamma</div>
      </AnimatedGrid>
    )
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByText('Gamma')).toBeInTheDocument()
  })

  it('applies className to container', () => {
    const { container } = render(
      <AnimatedGrid className="my-grid"><div>X</div></AnimatedGrid>
    )
    expect(container.firstChild).toHaveClass('my-grid')
  })
})
