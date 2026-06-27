'use client'

import FadeIn from '@/components/motion/FadeIn'

export default function StandortSection() {
  return (
    <section className="py-20 md:py-28 px-4 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="text-xs font-semibold text-[#1a35c8] uppercase tracking-[0.15em] mb-3">Standort</p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#1d1d1f] mb-12">So findest du uns</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <FadeIn className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden h-[360px] md:h-full min-h-[300px] shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
              <iframe
                title="Vereinshalle SuS Oestereiden"
                src="https://www.openstreetmap.org/export/embed.html?bbox=8.414%2C51.490%2C8.460%2C51.510&layer=mapnik&marker=51.4985%2C8.4370"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-2">Adresse</p>
                <p className="font-semibold text-[#1d1d1f]">Im Kirchfeld 1</p>
                <p className="text-[#6e6e73]">59602 Rüthen</p>
              </div>
              <div>
                <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-2">Telefon</p>
                <a
                  href="tel:+492954924590"
                  className="font-semibold text-[#1d1d1f] hover:text-[#1a35c8] transition-colors"
                >
                  +49 2954 924590
                </a>
              </div>
              <div>
                <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-2">E-Mail</p>
                <a
                  href="mailto:info@sus-oestereiden.de"
                  className="font-semibold text-[#1d1d1f] hover:text-[#1a35c8] transition-colors"
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
