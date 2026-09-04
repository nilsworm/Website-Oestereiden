import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Datenschutzerklärung' }

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-ui-text">
      <p className="text-xs font-semibold text-sus-royal uppercase tracking-[0.15em] mb-3">Rechtliches</p>
      <h1 className="text-4xl font-black text-sus-ink mb-10">Datenschutzerklärung</h1>

      <div className="prose max-w-none prose-headings:font-bold prose-a:text-sus-royal dark:prose-invert">
        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der
          Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p>
          Spiel- und Sportverein Oestereiden e.V. 1922<br />
          Im Kirchfeld 1<br />
          59602 Rüthen<br />
          Telefon: +49 2954 924590<br />
          E-Mail: <a href="mailto:info@sus-oestereiden.de">info@sus-oestereiden.de</a>
        </p>
        <p>
          Vertreten durch den Vorstand: Ulrich Mehn (Vereinsvorsitzender), Michael Witthaut
          (Geschäftsführer).
        </p>

        <h2>2. Datenschutzbeauftragter</h2>
        <p>
          Wir sind gesetzlich nicht zur Bestellung eines Datenschutzbeauftragten verpflichtet.
          Für alle Anliegen zum Datenschutz wenden Sie sich bitte an die oben genannten
          Kontaktdaten des Verantwortlichen.
        </p>

        <h2>3. Server-Logfiles</h2>
        <p>
          Beim Aufruf dieser Website erhebt und speichert unser Hostinganbieter automatisch
          Informationen in sogenannten Server-Logfiles, die Ihr Browser automatisch übermittelt:
        </p>
        <ul>
          <li>IP-Adresse des zugreifenden Endgeräts</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Name und URL der abgerufenen Datei</li>
          <li>Browsertyp und Browserversion sowie verwendetes Betriebssystem</li>
          <li>übertragene Datenmenge und Meldung über den Erfolg des Abrufs</li>
          <li>Referrer-URL (die zuvor besuchte Seite)</li>
        </ul>
        <p>
          Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und nicht zur
          Identifizierung Ihrer Person verwendet. Die Verarbeitung erfolgt auf Grundlage von
          Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im technisch
          fehlerfreien Betrieb, in der Sicherheit unserer Systeme und in der Abwehr von
          Angriffen. Die Logfiles werden nach 7 Tagen automatisch gelöscht.
        </p>

        <h2>4. Hosting</h2>
        <p>
          Diese Website wird auf Servern in Deutschland betrieben. Anbieter ist die Hetzner
          Online GmbH, Industriestr. 25, 91710 Gunzenhausen.
        </p>
        <p>
          Der Anbieter verarbeitet die vorgenannten Daten ausschließlich in unserem Auftrag und
          nach unseren Weisungen. Wir haben mit ihm einen Vertrag über die Auftragsverarbeitung
          nach Art. 28 DSGVO geschlossen.
        </p>

        <h2>5. Kontaktaufnahme per E-Mail und Telefon</h2>
        <p>
          Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir die von Ihnen
          mitgeteilten Daten (insbesondere Name, E-Mail-Adresse bzw. Rufnummer sowie den Inhalt
          Ihrer Anfrage), um Ihr Anliegen zu bearbeiten.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage der Anbahnung oder
          Durchführung einer Mitgliedschaft dient, im Übrigen Art. 6 Abs. 1 lit. f DSGVO aufgrund
          unseres berechtigten Interesses an der Beantwortung von Anfragen.
        </p>
        <p>
          Wir löschen Ihre Anfrage, sobald sie abschließend bearbeitet ist und der Löschung keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen, spätestens jedoch nach sechs
          Monaten. Bitte beachten Sie, dass unverschlüsselte E-Mails auf dem Übertragungsweg von
          Dritten mitgelesen werden können.
        </p>

        <h2>6. Mitgliedsantrag</h2>
        <p>
          Die im Aufnahmeantrag angegebenen Daten verarbeiten wir ausschließlich zur Begründung
          und Verwaltung Ihrer Mitgliedschaft sowie zum Einzug der Mitgliedsbeiträge.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Nach Beendigung der Mitgliedschaft
          löschen wir Ihre Daten, sobald keine gesetzlichen Aufbewahrungsfristen — insbesondere
          steuer- und handelsrechtliche Fristen von bis zu zehn Jahren — mehr entgegenstehen.
        </p>

        <h2>7. Cookies und Speicherung auf Ihrem Endgerät</h2>
        <p>
          Diese Website setzt keine Cookies und speichert keine Informationen auf Ihrem Endgerät.
          Wir verwenden keine Analyse-, Tracking- oder Marketingdienste und erstellen keine
          Nutzungsprofile. Alle Schriftarten und Bilder werden von unserem eigenen Server
          ausgeliefert; es werden keine externen Schrift- oder Content-Dienste eingebunden.
        </p>

        <h2>8. Kartendarstellung mit OpenStreetMap</h2>
        <p>
          Zur Anfahrtsbeschreibung binden wir eine Karte des Dienstes OpenStreetMap ein. Anbieter
          ist die OpenStreetMap Foundation (OSMF), St John’s Innovation Centre, Cowley Road,
          Cambridge, CB4 0WS, Vereinigtes Königreich.
        </p>
        <p>
          Die Karte wird nicht automatisch geladen. Sie sehen zunächst nur einen lokalen
          Platzhalter. Erst wenn Sie die Karte durch Anklicken aktiv aktivieren, wird eine
          Verbindung zu den Servern von OpenStreetMap aufgebaut. Dabei wird Ihre IP-Adresse an
          OpenStreetMap übermittelt und kann dort gespeichert werden; ebenso können Informationen
          über Ihren Browser und die aufgerufene Seite übertragen werden. Auf den Umfang dieser
          Verarbeitung haben wir keinen Einfluss.
        </p>
        <p>
          Rechtsgrundlage für das Laden der Karte ist Ihre durch den Klick erteilte Einwilligung
          nach Art. 6 Abs. 1 lit. a DSGVO. Ihre Einwilligung ist freiwillig; Sie können die Karte
          schlicht nicht aktivieren und stattdessen die daneben angegebene Anschrift verwenden.
          Wir speichern Ihre Entscheidung nicht — laden Sie die Seite neu, ist die Karte wieder
          deaktiviert.
        </p>
        <p>
          Die OpenStreetMap Foundation hat ihren Sitz im Vereinigten Königreich, also außerhalb
          der Europäischen Union. Für das Vereinigte Königreich besteht ein
          Angemessenheitsbeschluss der Europäischen Kommission nach Art. 45 DSGVO. Weitere
          Informationen finden Sie unter{' '}
          <a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">
            osmfoundation.org
          </a>
          .
        </p>

        <h2>9. Fotos auf dieser Website</h2>
        <p>
          Auf dieser Website veröffentlichen wir Fotos aus dem Vereinsleben sowie
          Porträtaufnahmen unserer Vorstands- und Abteilungsvorstandsmitglieder.
        </p>
        <p>
          Porträtaufnahmen und erkennbare Abbildungen einzelner Personen veröffentlichen wir
          ausschließlich auf Grundlage einer vorher erteilten Einwilligung der abgebildeten Person
          nach Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit § 22 KunstUrhG. Bei minderjährigen
          Personen holen wir zusätzlich die Einwilligung der Erziehungsberechtigten nach
          Art. 8 DSGVO ein.
        </p>
        <p>
          Sie können eine erteilte Einwilligung jederzeit und ohne Angabe von Gründen mit Wirkung
          für die Zukunft widerrufen. Eine formlose Nachricht an{' '}
          <a href="mailto:info@sus-oestereiden.de">info@sus-oestereiden.de</a> genügt. Wir
          entfernen die betreffende Aufnahme dann unverzüglich von dieser Website. Bitte beachten
          Sie, dass wir auf bereits von Dritten angefertigte Kopien oder auf Zwischenspeicher von
          Suchmaschinen keinen Einfluss haben.
        </p>
        <p>
          Namen und Funktionsbezeichnungen unserer Vorstands- und Abteilungsvorstandsmitglieder
          sowie unserer Übungsleiterinnen und Übungsleiter veröffentlichen wir auf Grundlage von
          Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse besteht darin, Mitgliedern und
          Interessierten die zuständigen Ansprechpartner des Vereins transparent zu machen.
          Private Kontaktdaten veröffentlichen wir nicht.
        </p>

        <h2>10. Verlinkung auf soziale Netzwerke</h2>
        <p>
          Im Fußbereich verlinken wir auf unsere Profile bei Instagram und Facebook (Meta
          Platforms Ireland Ltd., Merrion Road, Dublin 4, Irland). Es handelt sich dabei
          ausschließlich um einfache Verlinkungen, nicht um eingebettete Inhalte oder
          Social-Media-Plugins. Beim bloßen Aufruf unserer Website werden daher keine Daten an
          die Betreiber dieser Netzwerke übermittelt.
        </p>
        <p>
          Erst wenn Sie einen dieser Links anklicken, verlässt Ihr Browser unsere Website und baut
          eine Verbindung zu den Servern des jeweiligen Anbieters auf. Für die dortige
          Datenverarbeitung ist allein der jeweilige Anbieter verantwortlich; es gelten dessen
          Datenschutzbestimmungen.
        </p>

        <h2>11. Ihre Rechte als betroffene Person</h2>
        <p>Sie haben uns gegenüber jederzeit folgende Rechte:</p>
        <ul>
          <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger oder unvollständiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>
            Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3
            DSGVO). Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt
            unberührt.
          </li>
        </ul>
        <p>
          Zur Ausübung dieser Rechte genügt eine formlose Nachricht an{' '}
          <a href="mailto:info@sus-oestereiden.de">info@sus-oestereiden.de</a>.
        </p>

        <h2>12. Widerspruchsrecht nach Art. 21 DSGVO</h2>
        <p>
          Sofern wir Ihre Daten auf Grundlage berechtigter Interessen nach Art. 6 Abs. 1 lit. f
          DSGVO verarbeiten, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen
          Situation ergeben, jederzeit Widerspruch gegen diese Verarbeitung einzulegen. Legen Sie
          Widerspruch ein, verarbeiten wir Ihre Daten nicht mehr, es sei denn, wir können
          zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen, Rechte und Freiheiten
          überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung
          von Rechtsansprüchen.
        </p>

        <h2>13. Beschwerderecht bei der Aufsichtsbehörde</h2>
        <p>
          Unbeschadet anderweitiger Rechtsbehelfe steht Ihnen nach Art. 77 DSGVO ein
          Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu, insbesondere in dem
          Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des
          mutmaßlichen Verstoßes. Die für uns zuständige Aufsichtsbehörde ist:
        </p>
        <p>
          Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br />
          Kavalleriestraße 2–4, 40213 Düsseldorf<br />
          Telefon: +49 211 38424-0<br />
          E-Mail: <a href="mailto:poststelle@ldi.nrw.de">poststelle@ldi.nrw.de</a>
        </p>

        <p className="text-sm text-ui-muted">Stand: September 2026</p>
      </div>
    </div>
  )
}
