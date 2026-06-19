import type { BoardMember } from '@/lib/types'

export const mainBoard: BoardMember[] = [
  { name: 'Ulrich Mehn', role: 'Vereinsvorsitzender', department: 'vorstand', image: '/images/board/ulrich-mehn.jpg' },
  { name: 'Michael Witthaut', role: 'Geschäftsführer', department: 'vorstand', image: '/images/board/michael-witthaut.jpg' },
  { name: 'Volker Körn', role: 'Stellvertretender Vorsitzender', department: 'vorstand', image: '/images/board/volker-koern.jpg' },
  { name: 'Klaus Rossa', role: 'Kassierer', department: 'vorstand', image: '/images/board/klaus-rossa.jpg' },
  { name: 'Pascal Rückert', role: 'Stellvertretender Vorsitzender', department: 'vorstand', image: '/images/board/pascal-rueckert.jpg' },
  { name: 'Robin Heidel', role: 'Stellvertretender Vorsitzender', department: 'vorstand', image: '/images/board/robin-heidel.jpg' },
]

export const advisoryBoard: BoardMember[] = [
  { name: 'Carina Kaltschmidt', role: 'Abteilungsvorsitzende Breitensport', department: 'breitensport', image: '/images/board/carina-kaltschmidt.jpg' },
  { name: 'Walter Hanemann', role: 'Abteilungsvorsitzender Tennis', department: 'tennis', image: '/images/board/walter-hanemann.jpg' },
  { name: 'Markus Biermann', role: 'Stellv. Abteilungsvorsitzender Fußball', department: 'fussball', image: '/images/board/markus-biermann.jpg' },
  { name: 'Doris Witthaut', role: 'Abteilungsvorsitzende Volleyball', department: 'volleyball', image: '/images/board/doris-witthaut.jpg' },
]

export const fussballBoard: BoardMember[] = [
  { name: 'Rolf Benteler', role: 'Abteilungsleiter', department: 'fussball' },
  { name: 'Markus Biermann', role: 'Stellvertretender Abteilungsleiter', department: 'fussball', image: '/images/board/markus-biermann.jpg' },
  { name: 'Reinhard Mehn', role: 'Stellvertretender Abteilungsleiter', department: 'fussball' },
  { name: 'Guido Horstschäfer', role: 'Geschäftsführer', department: 'fussball' },
  { name: 'Thomas Mertens', role: 'Kassierer', department: 'fussball' },
  { name: 'David Levening', role: 'Beisitzer Herren', department: 'fussball' },
  { name: 'Markus Belda', role: 'Koordinator A- bis D-Junioren', department: 'fussball' },
  { name: 'Matthias Lübke', role: 'Koordinator E- bis G-Junioren', department: 'fussball' },
  { name: 'Josef Eickhoff', role: 'Ehren-Beisitzer', department: 'fussball' },
]

export const volleyballBoard: BoardMember[] = [
  { name: 'Doris Witthaut', role: 'Abteilungsleiterin', department: 'volleyball', image: '/images/board/doris-witthaut.jpg' },
  { name: 'Katrin Rossa', role: 'Kassiererin', department: 'volleyball' },
  { name: 'Anja Mehn', role: 'Beisitzerin', department: 'volleyball' },
]

export const tennisBoard: BoardMember[] = [
  { name: 'Gerrit Keil', role: 'Abteilungsleiter', department: 'tennis' },
  { name: 'Ann-Catrin Dahlhoff', role: 'Geschäftsführerin / Schatzmeisterin', department: 'tennis' },
  { name: 'Jan Wirsdörfer', role: 'Platzwart', department: 'tennis' },
  { name: 'Anna Schiller', role: 'Jugendwart', department: 'tennis' },
  { name: 'Carsten Luig', role: 'Sportwart', department: 'tennis' },
]

export const breitensportBoard: BoardMember[] = [
  { name: 'Carina Kaltschmidt', role: 'Abteilungsleiterin', department: 'breitensport', image: '/images/board/carina-kaltschmidt.jpg' },
  { name: 'Katja Molerus', role: 'Geschäftsführerin', department: 'breitensport' },
  { name: 'Sandra Heiermeier', role: 'Kassiererin', department: 'breitensport' },
]
