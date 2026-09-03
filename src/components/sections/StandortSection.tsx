'use client'

import FadeIn from '@/components/motion/FadeIn'

export default function StandortSection() {
  return (
    <section className="py-20 md:py-28 px-4 page-surface-muted">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="eyebrow mb-3">Standort</p>
          <h2 className="section-title mb-12">So findest du uns</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <FadeIn className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden h-[360px] md:h-full min-h-[300px]">
              <iframe
                title="Vereinshalle SuS Oestereiden"
                src="https://www.openstreetmap.org/export/embed.html?bbox=8.4166%2C51.5640%2C8.4286%2C51.5700&layer=mapnik&marker=51.56697%2C8.42258"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-2">Adresse</p>
                <p className="font-semibold text-ui-text">Im Kirchfeld 1</p>
                <p className="text-ui-muted">59602 Rüthen</p>
              </div>
              <div>
                <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-2">Telefon</p>
                <a
                  href="tel:+492954924590"
                  className="font-semibold text-ui-text hover:text-ui-accent transition-colors"
                >
                  +49 2954 924590
                </a>
              </div>
              <div>
                <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-2">E-Mail</p>
                <a
                  href="mailto:info@sus-oestereiden.de"
                  className="font-semibold text-ui-text hover:text-ui-accent transition-colors"
                >
                  info@sus-oestereiden.de
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
