import Link from 'next/link'
import RevealText from '@/components/motion/RevealText'
import RevealImage from '@/components/motion/RevealImage'
import { departments } from '@/data/departments'

export default function AbteilungenStack() {
  return (
    <section id="abteilungen" className="page-surface clip-lg section-pad px-4">
      <div className="max-w-7xl mx-auto w-full">
        <p className="eyebrow mb-3">Sport</p>
        <RevealText as="h2" className="section-title mb-12">
          Unsere Abteilungen
        </RevealText>

        <div className="space-y-6">
          {departments.map((dept, i) => (
            <div
              key={dept.id}
              className="stack-item"
              style={{ top: `calc(88px + ${i * 16}px)` }}
            >
              <Link
                href={`/${dept.id}`}
                aria-label={dept.label}
                className="group grid grid-cols-1 md:grid-cols-2 surface-raised rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.10)]"
              >
                {dept.heroImage ? (
                  <RevealImage
                    wrapperClassName="relative h-56 md:h-80"
                    src={dept.heroImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-56 md:h-80 bg-ui-surface" />
                )}

                <div className="p-7 md:p-12 flex flex-col justify-center">
                  <h3 className="text-[clamp(24px,3vw,40px)] font-bold tracking-tight text-ui-text mb-3">
                    {dept.label}
                  </h3>
                  <p className="text-ui-muted leading-relaxed">{dept.description}</p>
                  <span className="mt-6 text-ui-accent font-semibold text-sm inline-flex items-center gap-1.5">
                    Zur Abteilung
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">›</span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
