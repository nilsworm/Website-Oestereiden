'use client'

import FadeIn from '@/components/motion/FadeIn'

export default function StandortSection() {
  return (
    <section className="min-h-[70vh] py-32 px-4 bg-sus-ink flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Standort</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-sus-light mb-12">So findest du uns</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <FadeIn className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden h-[360px] md:h-full min-h-[300px]">
              <iframe
                title="Vereinshalle SuS Oestereiden"
                src="https://www.openstreetmap.org/export/embed.html?bbox=8.414%2C51.490%2C8.460%2C51.510&layer=mapnik&marker=51.4985%2C8.4370"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="flex flex-col justify-center">
            <div className="text-sus-light space-y-8">
              <div>
                <p className="text-sus-royal/70 text-xs font-semibold uppercase tracking-[0.15em] mb-2">Adresse</p>
                <p className="font-semibold text-sus-light">Im Kirchfeld 1</p>
                <p className="text-sus-light/60">59602 Rüthen</p>
              </div>
              <div>
                <p className="text-sus-royal/70 text-xs font-semibold uppercase tracking-[0.15em] mb-2">Telefon</p>
                <a
                  href="tel:+492954924590"
                  className="font-semibold text-sus-light hover:text-sus-royal transition-colors"
                >
                  +49 2954 924590
                </a>
              </div>
              <div>
                <p className="text-sus-royal/70 text-xs font-semibold uppercase tracking-[0.15em] mb-2">E-Mail</p>
                <a
                  href="mailto:info@sus-oestereiden.de"
                  className="font-semibold text-sus-light hover:text-sus-royal transition-colors"
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
