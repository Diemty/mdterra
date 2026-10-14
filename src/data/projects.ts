export type ProjectCategory =
  | 'Residential'
  | 'Commercial'
  | 'Government & Healthcare'
  | 'Competition'
  | 'Cultural'
  | 'Hospitality'
  | 'Landscape & Urban Planning';

export interface Project {
  id: number;
  title: string;
  slug: string;
  categories: ProjectCategory[];
  image: string;
  headerImage?: string;
  subtitle?: string;
  subtitle_el?: string;
  year?: string;
  location?: string;
  location_el?: string;
  client?: string;
  designTeam?: string;
  mep?: string;
  structuralDesign?: string;
  contractor?: string;
  photographer?: string;
  associateArchitects?: string;
  designConsultant?: string;
  plotSize?: string;
  builtArea?: string;
  capacity?: string;
  galleryImages?: string[];
  description?: string[];
  description_el?: string[];
}

export const CATEGORIES: ProjectCategory[] = [
  'Residential',
  'Commercial',
  'Government & Healthcare',
  'Competition',
  'Cultural',
  'Hospitality',
  'Landscape & Urban Planning',
];

export const CATEGORY_TRANSLATIONS: Record<ProjectCategory, string> = {
  'Residential': 'Κατοικίες',
  'Commercial': 'Επαγγελματικοί Χώροι',
  'Government & Healthcare': 'Δημόσια Έργα & Υγεία',
  'Competition': 'Διαγωνισμοί',
  'Cultural': 'Πολιτιστικά Έργα',
  'Hospitality': 'Φιλοξενία & Τουρισμός',
  'Landscape & Urban Planning': 'Τοπίο & Πολεοδομία',
};

export const projects: Project[] = [
  {
    id: 1,
    title: "SISMANOGLIO HOSPITAL CICU",
    slug: "sismanoglio-hospital-cicu",
    categories: ["Government & Healthcare"],
    image: "/projects/sismanoglio-hospital-cicu/sismanoglio-v2-thumb-scaled.jpg",
    headerImage: "/projects/sismanoglio-hospital-cicu/sismanoglio-header.jpg",
    subtitle: "Redesign / Rearrangment of Cardiology Intensive Care Unit",
    subtitle_el: "Ανασχεδιασμός / Διαμόρφωση Καρδιολογικής Μονάδας Εντατικής Θεραπείας",
    location: "Athens, Greece",
    location_el: "Αθήνα, Ελλάδα",
    year: "2025",
    designTeam: "Mdterra Architecture",
    client: "AEGEAS NPCC",
    mep: "Dimitrios Mantas",
    photographer: "Danai Nikolopoulou Tsatsaroni",
    galleryImages: [
      "/projects/sismanoglio-hospital-cicu/sismanoglio-hospital-cicu-1.jpg",
      "/projects/sismanoglio-hospital-cicu/sismanoglio-hospital-cicu-2.jpg",
      "/projects/sismanoglio-hospital-cicu/sismanoglio-hospital-cicu-3.jpg",
      "/projects/sismanoglio-hospital-cicu/sismanoglio-hospital-cicu-4.jpg",
      "/projects/sismanoglio-hospital-cicu/sismanoglio-hospital-cicu-5.1.jpg"
    ]
  },
  {
    id: 2,
    title: "PAPANIKOLAOU HOSPITAL ICU",
    slug: "papanikolaou-hospital-icu",
    categories: ["Government & Healthcare"],
    image: "/projects/papanikolaou-hospital-icu/icu-papanikolaou-thumb.jpg",
    headerImage: "/projects/papanikolaou-hospital-icu/icu-papanikolaou-header.jpg",
    subtitle: "Redesign of Intensive Care Unit",
    subtitle_el: "Ανασχεδιασμός Μονάδας Εντατικής Θεραπείας",
    location: "Thessaloniki, Greece",
    location_el: "Θεσσαλονίκη, Ελλάδα",
    year: "2024",
    designTeam: "I. Andrioti, E.S. Piroula Godoy, E.M. Kostopoulou, K. Parmagou",
    client: "AEGEAS NPCC",
    mep: "MDPLAN",
    photographer: "Danai Nikolopoulou Tsatsaroni",
    galleryImages: [
      "/projects/papanikolaou-hospital-icu/icu-papanikolaou-1.jpg",
      "/projects/papanikolaou-hospital-icu/icu-papanikolaou-2.jpg",
      "/projects/papanikolaou-hospital-icu/icu-papanikolaou-3.jpg",
      "/projects/papanikolaou-hospital-icu/icu-papanikolaou-4.jpg"
    ]
  },
  {
    id: 3,
    title: "XERIZOMATA",
    slug: "xerizomata",
    categories: ["Hospitality", "Residential"],
    image: "/projects/xerizomata/xerizomata-thumb.jpg",
    headerImage: "/projects/xerizomata/xerizomata-header.jpg",
    subtitle: "Summer house in Gavalochori, Chania",
    subtitle_el: "Θερινή κατοικία στο Γαβαλοχώρι, Χανιά",
    location: "Crete, Greece",
    location_el: "Κρήτη, Ελλάδα",
    year: "2022-2023",
    designTeam: "K. Parmagou, E. M. Kostopoulou, E. S. Piroula Godoy, M. S. Loutragoti, I. Zervas",
    client: "Private",
    mep: "E. Nikiforakis",
    structuralDesign: "V. Kontezakis",
    photographer: "TBD",
    galleryImages: [
      "/projects/xerizomata/xerizomata-1.jpg",
      "/projects/xerizomata/xerizomata-2.jpg",
      "/projects/xerizomata/xerizomata-3.jpg",
      "/projects/xerizomata/xerizomata-4.jpg",
      "/projects/xerizomata/xerizomata-5.jpg",
      "/projects/xerizomata/xerizomata-6.jpg"
    ]
  },
  {
    id: 4,
    title: "VAGIA SUMMER HOUSE",
    slug: "vagia-summer-house",
    categories: ["Hospitality", "Residential"],
    image: "/projects/vagia-summer-house/vagia-thumb.jpg",
    headerImage: "/projects/vagia-summer-house/vagia-header.jpg",
    subtitle: "Summer house in Vagia, Serifos",
    subtitle_el: "Θερινή κατοικία στη Βαγιά, Σέριφος",
    location: "Serifos, Greece",
    location_el: "Σέριφος, Ελλάδα",
    year: "2021",
    designTeam: "A. Ioannidou, R. Dimitroglou, E. S. Piroula Godoy, M. S. Loutragoti, E. M. Kostopoulou",
    client: "Private",
    mep: "P. Efstathopoulos",
    structuralDesign: "N. Papailiou",
    photographer: "TBD",
    galleryImages: [
      "/projects/vagia-summer-house/vagia-1.jpg",
      "/projects/vagia-summer-house/vagia-2.jpg",
      "/projects/vagia-summer-house/vagia-3.jpg",
      "/projects/vagia-summer-house/vagia-4.jpg",
      "/projects/vagia-summer-house/vagia-5.jpg",
      "/projects/vagia-summer-house/vagia-6.jpg",
      "/projects/vagia-summer-house/vagia-7.jpg",
      "/projects/vagia-summer-house/vagia-8.jpg"
    ]
  },
  {
    id: 5,
    title: "DEPA INFRASTRUCTURE",
    slug: "depa",
    categories: ["Commercial", "Government & Healthcare"],
    image: "/projects/depa/00-depa-first-project-thumb-2-scaled.jpg",
    headerImage: "/projects/depa/00-inside-header-1-scaled.jpg",
    subtitle: "Natural Gas Distribution Networks Head Office",
    subtitle_el: "Κεντρικά Γραφεία Δικτύων Διανομής Φυσικού Αερίου",
    location: "Athens, Greece",
    location_el: "Αθήνα, Ελλάδα",
    year: "2021",
    designTeam: "E. Polyzou, I. Andrioti",
    client: "TBD",
    mep: "D. Mantas",
    photographer: "Danai Nikolopoulou Tsatsaroni",
    galleryImages: [
      "/projects/depa/01-Danai-Nikolopoulou-600-2-scaled.jpg",
      "/projects/depa/02-Danai-Nikolopoulou-637-1-scaled.jpg",
      "/projects/depa/03-Danai-Nikolopoulou-592-1-scaled.jpg",
      "/projects/depa/04-Danai-Nikolopoulou-IMG_5175-1-scaled.jpg",
      "/projects/depa/05-Danai-Nikolopoulou-synthesi-2-1-scaled.jpg",
      "/projects/depa/06-Danai-Nikolopoulou-sunthesi-scaled.jpg",
      "/projects/depa/07-Danai-Nikolopoulou-5157-new-1-scaled.jpg",
      "/projects/depa/08-Danai-Nikolopoulou-IMG_5105-1-scaled.jpg"
    ]
  },
  {
    id: 6,
    title: "HYGEIA HOSPITAL",
    slug: "hygeia",
    categories: ["Commercial", "Government & Healthcare"],
    image: "/projects/hygeia/000_DSC_1064_CROP.jpg",
    headerImage: "/projects/hygeia/001_IMG_0341_crop-1213x1536.jpg",
    subtitle: "Rearrangement of the Radiation Oncology Center",
    subtitle_el: "Αναδιαμόρφωση Κέντρου Ακτινοθεραπευτικής Ογκολογίας",
    location: "Athens, Greece",
    location_el: "Αθήνα, Ελλάδα",
    year: "2020",
    designTeam: "E. Polyzou, A.M. Economou, I. Andrioti",
    structuralDesign: "A. Kontizas",
    mep: "D. Mantas",
    contractor: "CERS GROUP",
    photographer: "B. Louizidis, M. Dimitroglou",
    description: [
      "The project concerns the design of the rearrangement of the Radiation Oncology Centre (ROC), and Medical Physics Department (MPD) located in the HYGEIA HOSPITAL, in Athens, Greece.",
      "ROC occupies a total area of 1000 sqm, including 5 Bunkers – Treatment Rooms for Linear Accelerators and Brachytherapy, open space Control Rooms, Meeting and Medical Planning Rooms, Clinics, Lobby and Waiting Area.",
      "The HYGEIA Hospital Radiation Oncology Centre is the most modern and fully equipped center in Greece and one of the best in Europe.",
      "The Radiation Oncology Center has been selected by the International Radiosurgery Association (IRSA) as a Center of Excellence for Stereotactic Radiotherapy & Radiosurgery."
    ],
    description_el: [
      "Το έργο αφορά τον ανασχεδιασμό και την αναδιαμόρφωση του Κέντρου Ακτινοθεραπευτικής Ογκολογίας (ROC) και του Τμήματος Ιατρικής Φυσικής (MPD) στο Νοσοκομείο ΥΓΕΙΑ, στην Αθήνα.",
      "Το ROC καταλαμβάνει συνολική επιφάνεια 1000 τ.μ. και περιλαμβάνει 5 Bunkers – Αίθουσες Θεραπείας για Γραμμικούς Επιταχυντές και Βραχυθεραπεία, Control Rooms ανοιχτού χώρου, Αίθουσες Συσκέψεων και Ιατρικού Σχεδιασμού, Ιατρεία, Χώρο Υποδοχής και Αναμονής.",
      "Το Κέντρο Ακτινοθεραπευτικής Ογκολογίας του Νοσοκομείου ΥΓΕΙΑ είναι το πιο σύγχρονο και πλήρως εξοπλισμένο κέντρο στην Ελλάδα και ένα από τα καλύτερα στην Ευρώπη.",
      "Έχει επιλεγεί από τη Διεθνή Ένωση Ραδιοχειρουργικής (IRSA) ως Κέντρο Αριστείας για τη Στερεοτακτική Ακτινοθεραπεία και Ραδιοχειρουργική."
    ],
    galleryImages: [
      "/projects/hygeia/001_IMG_0341_crop-1213x1536.jpg",
      "/projects/hygeia/10DSC_1275_crop.jpg",
      "/projects/hygeia/11DSC_1297_crop_rev03.jpg",
      "/projects/hygeia/12DSC_1304_crop_rev3.jpg",
      "/projects/hygeia/20DSC_1330_crop_rev4.jpg",
      "/projects/hygeia/21DSC_1332_crop_rev3.jpg",
      "/projects/hygeia/30DSC_1370_crop_1_rev3.jpg",
      "/projects/hygeia/31DSC_1392_crop_rev3.jpg",
      "/projects/hygeia/40DSC_1356_crop_rev3.jpg",
      "/projects/hygeia/50IMG_0351_crop_rev3-1152x1536.jpg",
      "/projects/hygeia/51DSC_1161_crop_rev3.jpg",
      "/projects/hygeia/60DSC_1060_crop_rev4.jpg",
      "/projects/hygeia/61DSC_1070_crop.jpg",
      "/projects/hygeia/70DSC_1257_crop.jpg"
    ]
  },
  {
    id: 7,
    title: "TABUK CITY GATES",
    slug: "tabuk-city-gates",
    categories: ["Landscape & Urban Planning"],
    image: "/projects/tabuk-city-gates/tabuk-thumb.jpg",
    headerImage: "/projects/tabuk-city-gates/tabuk-header.jpg",
    subtitle: "Housing Development Project in the Region of Tabuk, KSA – Conceptual Masterplan Design",
    subtitle_el: "Έργο Οικιστικής Ανάπτυξης στην Περιοχή του Ταμπούκ, Σαουδική Αραβία – Conceptual Masterplan Design",
    location: "Tabuk, Saudi Arabia",
    location_el: "Ταμπούκ, Σαουδική Αραβία",
    year: "2016",
    client: "Astra Corporation",
    associateArchitects: "P. Gionni, K. Kyriazopoulos",
    designTeam: "I. Kella, M. Patapatiou, P. Pappa, S. Plytas, D. Theodorou, I. Drivakos, G. Dimitrakopoulos, D. Tsioris, S. Rizopoulou",
    plotSize: "1.057.534 sqm",
    capacity: "5.400 Apartments",
    description: [
      "Located in the northwest side of Tabuk and approximately 20km from the city center, the plot covers an area of 1.057.534 sqm and is adjacent to the northwest side with Tabuk circular farms, to the northeast side with the highway to Jordan, and to the southwest and southeast side with a desert track.",
      "The current Master Plan is the outcome of our preliminary study with regards to the envisaged residential development by ASTRA (Arab Supply and Trading Corporation) in the region of Tabuk. The new urban area will consist of approximately 5.400 apartments and will accommodate a population estimate of 30.000-35.000 inhabitants.",
      "The entire population will be served by the complete infrastructure required for the proper operation of this small city, with regards to religious, commercial, educational, recreational, governmental and open green spaces.",
      "The design concept behind the Master Plan includes two main elements: Tabuk City Gates and Tabuk Gardens both of them providing unique opportunities of creating an identity for the new community.",
      "We have designed two twin towers to connect them conceptually with the City Gates of Tabuk, which are going to serve as minarets of the Big Mosque. This is a dynamic symbol of great local importance, as a landmark and reference point. The design of two flagship twin buildings will form an imaginary gateway to the northern edge of the plot, as due to its geographical position they are going to welcome the travellers coming from Jordan to the region of Tabuk and Saudi Arabia. Naturally, the City Gates will have a clear definition and orientation towards Makkah. Also, this design element will create a connecting area in the central open space, which is also going to be repeated in other open space elements of the plot, the location of public buildings and all the religious buildings of the community.",
      "We have also designed a series of intersecting circular areas in the open space, as a reference to the farms and the local history of Tabuk. The cycles of the farms are extended inside the land as they naturally and conceptually enter to the exposed parts of the area. Due to their distinctive profile they are combined with water elements, plants and walking pathways."
    ],
    description_el: [
      "Βρίσκεται στη βορειοδυτική πλευρά του Ταμπούκ και σε απόσταση περίπου 20 χλμ. από το κέντρο της πόλης. Το οικόπεδο καλύπτει έκταση 1.057.534 τ.μ. και συνορεύει βορειοδυτικά με τα κυκλικά αγροκτήματα του Ταμπούκ, βορειοανατολικά με τον αυτοκινητόδρομο προς την Ιορδανία και νοτιοδυτικά/νοτιοανατολικά με έρημο.",
      "Το παρόν Master Plan είναι το αποτέλεσμα της προκαταρκτικής μας μελέτης όσον αφορά την προβλεπόμενη οικιστική ανάπτυξη από την ASTRA (Arab Supply and Trading Corporation) στην περιοχή του Ταμπούκ. Η νέα αστική περιοχή θα αποτελείται από περίπου 5.400 διαμερίσματα και θα φιλοξενήσει έναν εκτιμώμενο πληθυσμό 30.000-35.000 κατοίκων.",
      "Ολόκληρος ο πληθυσμός θα εξυπηρετείται από την πλήρη υποδομή που απαιτείται για την εύρυθμη λειτουργία αυτής της μικρής πόλης, όσον αφορά θρησκευτικούς, εμπορικούς, εκπαιδευτικούς, ψυχαγωγικούς και δημόσιους χώρους πρασίνου.",
      "Η κεντρική ιδέα του Master Plan περιλαμβάνει δύο βασικά στοιχεία: τις Πύλες της Πόλης (Tabuk City Gates) και τους Κήπους του Ταμπούκ (Tabuk Gardens), που και τα δύο προσφέρουν μοναδικές ευκαιρίες για τη δημιουργία μιας ιδιαίτερης ταυτότητας για τη νέα κοινότητα.",
      "Σχεδιάσαμε δύο δίδυμους πύργους για να τους συνδέσουμε εννοιολογικά με τις Πύλες της Πόλης του Ταμπούκ, οι οποίοι θα λειτουργούν ως μιναρέδες του Μεγάλου Τζαμιού. Αυτό αποτελεί ένα δυναμικό σύμβολο μεγάλης τοπικής σημασίας, ως τοπόσημο και σημείο αναφοράς. Ο σχεδιασμός αυτών των κτιρίων θα σχηματίσει μια νοητή πύλη στο βόρειο άκρο του οικοπέδου, που λόγω της γεωγραφικής της θέσης θα υποδέχεται τους ταξιδιώτες που έρχονται από την Ιορδανία. Φυσικά, οι Πύλες θα έχουν σαφή προσανατολισμό προς τη Μέκκα, συνδέοντας τον κεντρικό ανοιχτό χώρο με τα θρησκευτικά και δημόσια κτίρια της κοινότητας.",
      "Επίσης, σχεδιάσαμε μια σειρά από τεμνόμενες κυκλικές περιοχές στον ανοιχτό χώρο, ως αναφορά στα χαρακτηριστικά κυκλικά αγροκτήματα και την τοπική ιστορία του Ταμπούκ. Οι κύκλοι των αγροκτημάτων επεκτείνονται μέσα στη γη, εισχωρώντας φυσικά και εννοιολογικά στην περιοχή, συνδυαζόμενοι με στοιχεία νερού, φυτεύσεις και μονοπάτια περιπάτου."
    ],
    galleryImages: [
      "/projects/tabuk-city-gates/tabuk1.jpg",
      "/projects/tabuk-city-gates/tabuk2.jpg",
      "/projects/tabuk-city-gates/tabuk3.jpg",
      "/projects/tabuk-city-gates/tabuk4.jpg",
      "/projects/tabuk-city-gates/tabuk5.jpg",
      "/projects/tabuk-city-gates/tabuk6updated.jpg"
    ]
  },
  {
    id: 8,
    title: "SAMPATIKI",
    slug: "sampatiki",
    categories: ["Hospitality", "Residential"],
    image: "/projects/sampatiki/sampatiki-thumb.jpg",
    headerImage: "/projects/sampatiki/sampatiki-header.jpg",
    subtitle: "Hotel & Villas in Sampatiki – Conceptual Design – Phase I",
    subtitle_el: "Ξενοδοχείο & Βίλες στη Σαμπατική – Conceptual Design – Φάση I",
    location: "Arcadia, Greece",
    location_el: "Αρκαδία, Ελλάδα",
    year: "2010",
    associateArchitects: "K. Grigoratos, I. Ragoussis",
    structuralDesign: "E. Giannoulakis",
    plotSize: "5.000 sqm",
    capacity: "33 Beds",
    description: [
      "Hotel common areas and 8 separated residential units are integrated in Greek rural landscape fully complying with the image of a traditional Arcadia village."
    ],
    description_el: [
      "Οι κοινόχρηστοι χώροι του ξενοδοχείου και 8 ξεχωριστές οικιστικές μονάδες ενσωματώνονται στο ελληνικό αγροτικό τοπίο, πλήρως εναρμονισμένοι με την εικόνα ενός παραδοσιακού χωριού της Αρκαδίας."
    ],
    galleryImages: [
      "/projects/sampatiki/sampatiki1.jpg",
      "/projects/sampatiki/sampatiki2.jpg",
      "/projects/sampatiki/sampatiki3.jpg",
      "/projects/sampatiki/sampatiki4.jpg"
    ]
  },
  {
    id: 9,
    title: "ILIAD RESORT",
    slug: "iliad-resort",
    categories: ["Hospitality", "Landscape & Urban Planning"],
    image: "/projects/iliad-resort/iliad-thumb.jpg",
    headerImage: "/projects/iliad-resort/iliad-header.jpg",
    subtitle: "Hotel, Golf Course, Marina & Diving Park Masterplan",
    subtitle_el: "Ξενοδοχείο, Γήπεδο Γκολφ, Μαρίνα & Πάρκο Καταδύσεων Masterplan",
    location: "Ithaki, Greece",
    location_el: "Ιθάκη, Ελλάδα",
    year: "2017",
    associateArchitects: "A. Rigopoulos",
    plotSize: "2.500.000 sqm",
    builtArea: "100.000 sqm",
    galleryImages: [
      "/projects/iliad-resort/Iliad1.jpg",
      "/projects/iliad-resort/Iliad2.jpg",
      "/projects/iliad-resort/Iliad3.jpg"
    ]
  },
  {
    id: 10,
    title: "M FOR MANI",
    slug: "m-for-mani",
    categories: ["Hospitality"],
    image: "/projects/m-for-mani/mani-thumb.jpg",
    headerImage: "/projects/m-for-mani/mani-header.jpg",
    subtitle: "Small Hotel in the Outskirts of a Traditional Village – Final Design",
    subtitle_el: "Μικρό Ξενοδοχείο στα Περίχωρα ενός Παραδοσιακού Χωριού – Final Design",
    location: "Mani, Greece",
    location_el: "Μάνη, Ελλάδα",
    year: "2016 - 2017",
    associateArchitects: "A. Rigopoulos",
    designConsultant: "M. Dimitroglou",
    structuralDesign: "M. Mantouvalos",
    plotSize: "122.000 sqm",
    builtArea: "3.500 sqm",
    capacity: "100 Beds",
    galleryImages: [
      "/projects/m-for-mani/mani1.jpg",
      "/projects/m-for-mani/mani2.jpg",
      "/projects/m-for-mani/mani3.jpg"
    ]
  },
  {
    id: 11,
    title: "ASTRA HEAD OFFICE",
    slug: "aho",
    categories: ["Commercial"],
    image: "/projects/aho/aho-thumb.jpg",
    headerImage: "/projects/aho/aho-main.jpg",
    subtitle: "Rearrangement of the ASTRA HEAD OFFICE space",
    subtitle_el: "Αναδιαμόρφωση των Κεντρικών Γραφείων της ASTRA",
    location: "Riyadh, Saudi Arabia",
    location_el: "Ριάντ, Σαουδική Αραβία",
    year: "2017",
    builtArea: "966.48 sqm",
    description: [
      "The project concerns the design of the rearrangement of the ASTRA HEAD OFFICE space, located on the Philips Tower building, in Riyadh, Saudi Arabia.",
      "It has a characteristic elliptical shape with sharp layout endings and consists of a Central common use core, the Office area and a Circular annex.",
      "On the perimeter of the main entrances room, two converging circular corridors give access to all main and auxiliary office rooms. In order to increase natural lighting on the corridor area most of the office façade partitions are constructed of glass panels."
    ],
    description_el: [
      "Το έργο αφορά τον ανασχεδιασμό και την αναδιαμόρφωση των Κεντρικών Γραφείων της ASTRA, που στεγάζονται στο κτίριο Philips Tower, στο Ριάντ της Σαουδικής Αραβίας.",
      "Έχει χαρακτηριστικό ελλειπτικό σχήμα με αιχμηρές απολήξεις στην κάτοψη και αποτελείται από έναν κεντρικό πυρήνα κοινής χρήσης, τον χώρο των γραφείων και ένα κυκλικό παράρτημα.",
      "Περιμετρικά της κύριας αίθουσας εισόδου, δύο συγκλίνοντες κυκλικοί διάδρομοι δίνουν πρόσβαση σε όλες τις κύριες και βοηθητικές αίθουσες γραφείων. Προκειμένου να αυξηθεί ο φυσικός φωτισμός στην περιοχή του διαδρόμου, τα περισσότερα διαχωριστικά των όψεων των γραφείων κατασκευάζονται από γυάλινα πάνελ."
    ],
    galleryImages: [
      "/projects/aho/aho1.jpg",
      "/projects/aho/aho2.jpg",
      "/projects/aho/aho3.jpg",
      "/projects/aho/aho4.jpg",
      "/projects/aho/aho5.jpg",
      "/projects/aho/aho6.jpg",
      "/projects/aho/aho7.jpg",
      "/projects/aho/aho8.jpg",
      "/projects/aho/aho9.jpg"
    ]
  },
  {
    id: 12,
    title: "Makrakis Residence",
    slug: "makrakis-residence",
    categories: ["Residential"],
    image: "/projects/mdhp1v2.jpg"
  },
  {
    id: 13,
    title: "Nestle Staff Restaurant",
    slug: "nestle-staff-restaurant",
    categories: ["Commercial"],
    image: "/projects/mdhp5v2.jpg"
  },
  {
    id: 14,
    title: "Kastraki",
    slug: "kastraki",
    categories: ["Competition", "Cultural", "Landscape & Urban Planning"],
    image: "/projects/mdhp9.jpg"
  },
  {
    id: 15,
    title: "Latsia",
    slug: "latsia",
    categories: ["Competition", "Cultural", "Landscape & Urban Planning"],
    image: "/projects/mdhp8.jpg"
  },
  {
    id: 16,
    title: "PFBSH",
    slug: "pfbsh",
    categories: ["Government & Healthcare"],
    image: "/projects/mdhp7.jpg"
  },
  {
    id: 17,
    title: "The Tier House",
    slug: "the-tier-house",
    categories: ["Residential"],
    image: "/projects/mdhp6v2.jpg"
  },
  {
    id: 18,
    title: "Filiates General Hospital",
    slug: "filiates-hospital",
    categories: ["Government & Healthcare"],
    image: "/projects/mdhp4.jpg"
  },
  {
    id: 19,
    title: "New Medi Medical Center",
    slug: "new-medi-medical-center",
    categories: ["Commercial", "Government & Healthcare"],
    image: "/projects/mdhp2.jpg"
  },
  {
    id: 20,
    title: "Germanina",
    slug: "germanina",
    categories: ["Competition", "Cultural", "Landscape & Urban Planning"],
    image: "/projects/mdhp3.jpg"
  },
  {
    id: 21,
    title: "Olympic Village \"Athens 2004\"",
    slug: "olympic-village-athens-2004",
    categories: ["Competition", "Landscape & Urban Planning", "Residential"],
    image: "/projects/olympic-village-athens-2004-thumb.jpg"
  }
];
