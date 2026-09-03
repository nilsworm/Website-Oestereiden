import { render, screen } from '@testing-library/react'
import RevealImage from '@/components/motion/RevealImage'

describe('RevealImage', () => {
  it('reicht src und alt an next/image durch', () => {
    render(
      <RevealImage
        src="/images/hero/Tennis-2.jpg"
        alt="Tennisanlage des SuS Oestereiden"
        width={400}
        height={300}
      />
    )
    const img = screen.getByAltText('Tennisanlage des SuS Oestereiden')
    expect(img).toBeInTheDocument()
    expect(img.tagName).toBe('IMG')
  })

  it('setzt wrapperClassName auf den äußeren Kasten', () => {
    const { container } = render(
      <RevealImage
        src="/images/hero/Tennis-2.jpg"
        alt="Tennisanlage"
        width={400}
        height={300}
        wrapperClassName="relative h-72"
      />
    )
    expect(container.firstChild).toHaveClass('relative', 'h-72')
  })
})
