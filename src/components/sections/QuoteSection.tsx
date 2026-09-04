'use client'

import Image from 'next/image'
import FadeIn from '@/components/motion/FadeIn'

export default function QuoteSection() {
  return (
    <section className="py-20 md:py-28 px-4 bg-[#0a0e1a] flex items-center">
      <div className="max-w-7xl mx-auto w-full">

        {/* Mobile: kleines rundes Foto zentriert + Zitat darunter */}
        <div className="md:hidden flex flex-col items-center text-center">
          <FadeIn>
            <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6 ring-2 ring-white/20">
              <Image
                src="/images/board/ulrich-mehn.jpg"
                alt="Ulrich Mehn"
                fill
                className="object-cover object-top"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <blockquote>
              <p className="text-[clamp(18px,4vw,24px)] font-light text-[#f0f2ff] leading-relaxed mb-6">
                „Seit über 100 Jahren sind wir mehr als ein Sportverein —
                wir sind ein Stück Heimat"
              </p>
              <footer className="border-t border-white/20 pt-5">
                <p className="font-semibold text-[#f0f2ff] text-sm">Ulrich Mehn</p>
                <p className="text-[#1a35c8] text-xs mt-0.5">Vereinsvorsitzender, SuS Oestereiden e.V.</p>
              </footer>
            </blockquote>
          </FadeIn>
        </div>

        {/* Desktop: 2-Spalten */}
        <div className="hidden md:grid grid-cols-2 gap-20 items-center">
          <FadeIn>
            <div className="relative aspect-square rounded-2xl overflow-hidden max-w-sm shadow-2xl">
              <Image
                src="/images/board/ulrich-mehn.jpg"
                alt="Ulrich Mehn, Vereinsvorsitzender"
                fill
                sizes="40vw"
                className="object-cover object-top"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <blockquote>
              <p className="text-[#1a35c8] text-xs font-semibold uppercase tracking-[0.15em] mb-6">
                Vereinsvorsitzender
              </p>
              <p className="text-[clamp(18px,2.2vw,28px)] font-light text-[#f0f2ff] leading-relaxed mb-8">
                „Seit über 100 Jahren sind wir mehr als ein Sportverein —
                wir sind ein Stück Heimat"
              </p>
              <footer className="border-t border-white/20 pt-6">
                <p className="font-semibold text-[#f0f2ff]">Ulrich Mehn</p>
                <p className="text-[#1a35c8]/70 text-sm mt-0.5">
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
