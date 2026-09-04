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

  it('hält den ref-Wrapper getrennt vom geclippten Element', () => {
    // Regressionstest für den Deadlock-Bug: `ref` und `clip-path` auf demselben
    // Element lassen den IntersectionObserver nie "intersecting" melden, weil
    // der Clip die Box auf Nullhöhe kollabiert — das Bild bleibt für immer
    // unsichtbar. `__mocks__/framer-motion.tsx` entfernt `initial`/`animate`
    // aus dem DOM, daher wird hier die Struktur geprüft statt der Clip-Werte:
    // das Bild muss über zwei Wrapper-Ebenen (Clip-Layer, Scale-Layer) unter
    // dem ref-Element hängen, nicht direkt darin.
    const { container } = render(
      <RevealImage
        src="/images/hero/Tennis-2.jpg"
        alt="Tennisanlage"
        width={400}
        height={300}
        wrapperClassName="relative h-72"
      />
    )
    const root = container.firstChild as HTMLElement
    const img = screen.getByAltText('Tennisanlage')
    expect(img.parentElement?.parentElement?.parentElement).toBe(root)
  })
})
