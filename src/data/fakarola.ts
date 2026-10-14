export interface FakarolaItem {
  id: number;
  type: string;
  type_el: string;
  title: string;
  title_el: string;
  description: string;
  description_el: string;
  span?: string;
  color?: string;
  image?: string;
  date?: string;
}

export const defaultFakarolaItems: FakarolaItem[] = [
  {
    id: 1,
    type: 'sketch',
    type_el: 'σκίτσο',
    title: 'Urban Fragment I',
    title_el: 'Αστικό Θραύσμα I',
    description: 'Pencil on tracing paper',
    description_el: 'Μολύβι σε ριζόχαρτο',
    span: 'col-span-1 row-span-2',
    color: 'from-accent/10 to-transparent',
  },
  {
    id: 2,
    type: 'note',
    type_el: 'σημείωση',
    title: 'Material Studies',
    title_el: 'Μελέτες Υλικών',
    description: 'Concrete, glass & steel textures — tactile explorations for the Tier House project.',
    description_el: 'Υφές σκυροδέματος, γυαλιού & χάλυβα — απτές εξερευνήσεις για το έργο Tier House.',
    span: 'col-span-1 row-span-1',
    color: 'from-accent-alt/10 to-transparent',
  },
  {
    id: 3,
    type: 'drawing',
    type_el: 'σχέδιο',
    title: 'Section Through Light',
    title_el: 'Τομή Μέσω Φωτός',
    description: 'Charcoal and ink wash',
    description_el: 'Κάρβουνο και πλύση μελάνης',
    span: 'col-span-1 row-span-1',
    color: 'from-text-primary/5 to-transparent',
  },
  {
    id: 4,
    type: 'painting',
    type_el: 'πίνακας',
    title: 'Aegean Geometry',
    title_el: 'Γεωμετρία Αιγαίου',
    description: 'Watercolor on paper — the geometry of Cycladic architecture.',
    description_el: 'Ακουαρέλα σε χαρτί — η γεωμετρία της κυκλαδίτικης αρχιτεκτονικής.',
    span: 'col-span-2 row-span-1',
    color: 'from-accent/5 to-transparent',
  },
  {
    id: 5,
    type: 'sketch',
    type_el: 'σκίτσο',
    title: 'Structural Rhythm',
    title_el: 'Δομικός Ρυθμός',
    description: 'Ink on paper',
    description_el: 'Μελάνι σε χαρτί',
    span: 'col-span-1 row-span-1',
    color: 'from-accent/10 to-transparent',
  },
  {
    id: 6,
    type: 'note',
    type_el: 'σημείωση',
    title: 'On Thresholds',
    title_el: 'Περί Κατωφλίων',
    description: '"The threshold is the space between — not inside, not outside. It is a moment of transformation, where the mundane becomes sacred."',
    description_el: '"Το κατώφλι είναι ο χώρος ανάμεσα — ούτε μέσα, ούτε έξω. Είναι μια στιγμή μεταμόρφωσης, όπου το καθημερινό γίνεται ιερό."',
    span: 'col-span-1 row-span-1',
    color: 'from-accent-alt/10 to-transparent',
  },
  {
    id: 7,
    type: 'drawing',
    type_el: 'σχέδιο',
    title: 'Landscape Contours',
    title_el: 'Περιγράμματα Τοπίου',
    description: 'Graphite study — topographic intervention',
    description_el: 'Μελέτη γραφίτη — τοπογραφική παρέμβαση',
    span: 'col-span-1 row-span-2',
    color: 'from-text-primary/5 to-transparent',
  },
  {
    id: 8,
    type: 'painting',
    type_el: 'πίνακας',
    title: 'Light and Shadow',
    title_el: 'Φως και Σκιά',
    description: 'Gouache on kraft paper',
    description_el: 'Γκουάς σε χαρτί κραφτ',
    span: 'col-span-1 row-span-1',
    color: 'from-accent/10 to-transparent',
  },
];
