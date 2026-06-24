'use client'

import Image from 'next/image'
import FadeIn from '@/components/motion/FadeIn'

export default function QuoteSection() {
  return (
    <section className="min-h-[70vh] py-32 px-4 bg-sus-navy flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <FadeIn>
            <div className="relative aspect-square rounded-2xl overflow-hidden max-w-sm mx-auto md:mx-0 shadow-2xl">
              <Image
                src="/images/board/ulrich-mehn.jpg"
                alt="Ulrich Mehn, Vereinsvorsitzender"
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <blockquote>
              <p className="text-sus-royal text-xs font-semibold uppercase tracking-[0.15em] mb-6">
                Vereinsvorsitzender
              </p>
              <p className="text-[clamp(18px,2.2vw,28px)] font-light text-sus-light leading-relaxed mb-8">
                „Seit über 100 Jahren sind wir mehr als ein Sportverein —
                wir sind ein Stück Heimat für über 860 Menschen in Rüthen."
              </p>
              <footer className="border-t border-sus-muted/40 pt-6">
                <p className="font-semibold text-sus-light">Ulrich Mehn</p>
                <p className="text-sus-royal/70 text-sm mt-0.5">
                  Vereinsvorsitzender, SuS Oestereiden e.V.
                </p>
              </footer>
            </blockquote>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
