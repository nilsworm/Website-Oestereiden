import Image from 'next/image'

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  icon?: string
  children?: React.ReactNode
}

export default function HeroSection({ title, subtitle, description, icon, children }: HeroSectionProps) {
  return (
    <section className="relative bg-sus-navy text-sus-light clip-diagonal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-sus-royal font-semibold text-xs uppercase tracking-[0.15em] mb-4">
              Seit 1922
            </p>
            <h1 className="text-[clamp(40px,6vw,80px)] font-black tracking-tight leading-none mb-4 text-sus-light">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-sus-light/70 font-light mb-3">{subtitle}</p>
            {description && (
              <p className="text-base text-sus-light/50 max-w-lg leading-relaxed">{description}</p>
            )}
          </div>

          <div className="flex-shrink-0 flex items-center justify-center">
            {icon ? (
              <span className="text-[80px] md:text-[100px] leading-none">{icon}</span>
            ) : (
              <Image
                src="/images/logo.png"
                alt="SuS Oestereiden Logo"
                width={140}
                height={140}
                className="animate-float opacity-90"
                priority
              />
            )}
          </div>
        </div>
      </div>

      {children && (
        <div className="bg-sus-club/80 py-4 px-4">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      )}
    </section>
  )
}
