import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Impressum' }

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-zinc-800 mb-8">Impressum</h1>

      <div className="prose prose-zinc max-w-none">
        <h2>Angaben gemäß § 5 TMG</h2>
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
          Registernummer: 0069
        </p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>
          Robin Heidel<br />
          Nettelstädt 8<br />
          59602 Rüthen
        </p>
      </div>
    </div>
  )
}
