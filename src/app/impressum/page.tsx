import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Impressum' }

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-ui-text">
      <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Rechtliches</p>
      <h1 className="text-4xl font-black text-sus-ink mb-10">Impressum</h1>

      <div className="prose max-w-none prose-headings:font-bold prose-a:text-sus-royal dark:prose-invert">
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          Spiel- und Sportverein Oestereiden e.V. 1922<br />
          Im Kirchfeld 1<br />
          59602 Rüthen
        </p>
        <h2>Vertreten durch</h2>
        <p>
          Ulrich Mehn (Vereinsvorsitzender)<br />
          Michael Witthaut (Geschäftsführer)
        </p>
        <h2>Kontakt</h2>
        <p>
          Telefon: +49 2954 924590<br />
          E-Mail: <a href="mailto:info@sus-oestereiden.de">info@sus-oestereiden.de</a>
        </p>
        <h2>Vereinsregister</h2>
        <p>
          Registergericht: Amtsgericht Warstein<br />
          Registernummer: VR 0069
        </p>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Robin Heidel<br />
          Im Kirchfeld 1<br />
          59602 Rüthen
        </p>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </div>
  )
}
