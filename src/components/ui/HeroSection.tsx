interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
}

export default function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  return (
    <section className="bg-sus-green text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">{title}</h1>
        <p className="text-xl md:text-2xl font-light opacity-90 mb-4">{subtitle}</p>
        {description && (
          <p className="text-base md:text-lg opacity-75 max-w-2xl mx-auto">{description}</p>
        )}
      </div>
    </section>
  )
}
