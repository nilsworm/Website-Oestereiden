import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Datenschutzerklärung' }

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Rechtliches</p>
      <h1 className="text-4xl font-black text-sus-ink mb-10">Datenschutzerklärung</h1>

      <div className="prose prose-zinc max-w-none prose-headings:font-bold prose-a:text-sus-royal">
        <h2>1. Datenschutz auf einen Blick</h2>
        <p>
          Der Betreiber dieser Website nimmt den Schutz Ihrer persönlichen Daten sehr ernst.
          Diese Datenschutzerklärung erläutert, welche Daten wir erheben, wie wir sie verwenden
          und welche Rechte Sie haben.
        </p>
        <h2>2. Erhobene Daten</h2>
        <p>
          Beim Besuch dieser Website werden technisch notwendige Daten automatisch erhoben
          (Server-Logs: IP-Adresse, Browsertyp, Uhrzeit des Zugriffs). Diese Daten werden
          nicht mit anderen Datenquellen zusammengeführt und nach 7 Tagen gelöscht.
        </p>
        <p>
          Personenbezogene Daten (Name, E-Mail) werden nur erhoben, wenn Sie uns diese
          freiwillig mitteilen (z.B. per E-Mail-Kontakt).
        </p>
        <h2>3. Hosting</h2>
        <p>
          Diese Website wird auf einem Server in Deutschland gehostet (Hetzner Online GmbH,
          Industriestr. 25, 91710 Gunzenhausen). Die Verarbeitung erfolgt auf Grundlage von
          Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <h2>4. Cookies</h2>
        <p>
          Wir verwenden ausschließlich technisch notwendige Cookies sowie optionale Cookies
          nach Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Ihre Cookie-Einwilligung
          speichern wir lokal in Ihrem Browser (localStorage). Sie können Ihre Einwilligung
          jederzeit über den Link „Cookie-Einstellungen" im Footer widerrufen.
        </p>
        <h2>5. Ihre Rechte</h2>
        <ul>
          <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        </ul>
        <h2>6. Kontakt Datenschutz</h2>
        <p>
          SuS Oestereiden e.V., Im Kirchfeld 1, 59602 Rüthen<br />
          <a href="mailto:info@sus-oestereiden.de">info@sus-oestereiden.de</a>
        </p>
        <p className="text-sm text-sus-ink/30">Stand: Juni 2026</p>
      </div>
    </div>
  )
}
