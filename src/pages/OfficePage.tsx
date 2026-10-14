import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';

export default function OfficePage() {
  const { language } = useLanguage();
  const { teamMembers } = useData();

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-bg-primary" id="office-header">
        <div className="container-main">
          <SectionReveal>
            <p className="text-label text-accent mb-4 tracking-[0.3em]">
              {language === 'el' ? 'Σχετικα με εμας' : 'About Us'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="text-display text-text-primary">
              {language === 'el' ? 'Γραφείο' : 'Office'}
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* Philosophy & Founder */}
      <section className="bg-bg-secondary py-32 sm:py-40" id="philosophy-section">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Founder Profile */}
            <div className="lg:col-span-4">
              <SectionReveal delay={0.15}>
                <div className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-bg-tertiary mb-8 rounded-sm">
                    <img 
                      src="/images/team/Makis-Dimitroglou.jpg" 
                      alt="Makis Dimitroglou" 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-heading-3 text-text-secondary mb-2">Makis Dimitroglou</h3>
                  <p className="text-body text-text-secondary/80 mb-3">
                    {language === 'el' ? 'Αρχιτέκτων Ε.Μ.Π.' : 'Architect N.T.U.A.'}
                  </p>
                  <a 
                    href="mailto:md@mdterra.gr" 
                    className="text-label text-accent hover:text-accent-alt transition-colors duration-300 inline-block relative overflow-hidden"
                  >
                    md@mdterra.gr
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-alt -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </a>
                </div>
              </SectionReveal>
            </div>

            {/* Philosophy Text */}
            <div className="lg:col-span-8">
              <SectionReveal delay={0.25}>
                <p className="text-body text-text-secondary/80 mb-6 leading-relaxed">
                  <strong className="text-text-secondary font-semibold">Mdterra</strong>{' '}
                  {language === 'el' 
                    ? 'είναι ένα σύγχρονο και καινοτόμο αρχιτεκτονικό γραφείο με έδρα την Αθήνα. Στην Mdterra, καθοδηγούμαστε από μια βαθιά εσωτερική παρόρμηση να εξερευνήσουμε, να κατανοήσουμε και να εκφράσουμε τη μοναδική αφήγηση κάθε πελάτη.'
                    : 'is a modern and innovative architectural practice based in Athens, Greece. At Mdterra, we are driven by a deep internal impulse to explore, understand, and express each client\'s unique narrative.'
                  }
                </p>
              </SectionReveal>
              <SectionReveal delay={0.35}>
                <p className="text-body text-text-secondary/80 mb-6 leading-relaxed">
                  {language === 'el' 
                    ? 'Διοχετεύουμε τη δημιουργικότητά μας μέσα από τη γεωμετρία, την τεχνολογία, την κλίμακα, την υλικότητα, το κλίμα και το φως—δημιουργώντας χώρους που ανταποκρίνονται στις προσδοκίες των πελατών μας παρέχοντας υψηλής ποιότητας αρχιτεκτονικές υπηρεσίες. Σχεδιάζουμε βιώσιμα περιβάλλοντα για διαβίωση, εργασία και κοινωνικοποίηση—χώρους διαμορφωμένους από τις ανθρώπινες ανάγκες, που αντικατοπτρίζουν και ενισχύουν τις δράσεις όσων τους κατοικούν.'
                    : 'We channel our creativity through geometry, technology, scale, materiality, climate, and light—crafting spaces that meet our clients\' expectations while delivering high-quality architectural services. We design sustainable environments for living, working, and socializing—spaces shaped by human needs, reflecting and reinforcing the actions of those who inhabit them.'
                  }
                </p>
              </SectionReveal>
              <SectionReveal delay={0.45}>
                <p className="text-body text-text-secondary/80 mb-8 leading-relaxed">
                  {language === 'el' 
                    ? 'Το έργο μας έχει αναγνωριστεί και βραβευτεί σε εθνικούς και διεθνείς αρχιτεκτονικούς διαγωνισμούς. Βλέπουμε την αρχιτεκτονική ως ένα ισχυρό μέσο εισαγωγής και επικοινωνίας κοινωνικών αξιών. Πιστεύουμε ότι το δομημένο περιβάλλον επηρεάζει βαθιά την ανθρώπινη συμπεριφορά — και ως εκ τούτου, πρέπει να είναι κάτι περισσότερο από απλό σκηνικό — πρέπει να αλληλεπιδρά, να διαμορφώνει και να ανταποκρίνεται.'
                    : 'Our work has been recognized and awarded in both national and international architectural competitions. We see architecture as a powerful medium for introducing and communicating social values. We believe the built environment profoundly influences human behavior — and therefore, it must be more than just scenery — it must engage, shape, and respond.'
                  }
                </p>
              </SectionReveal>
              <SectionReveal delay={0.55}>
                <div className="pl-6 border-l-2 border-text-secondary/30">
                  <p className="text-heading-3 font-light italic text-text-secondary leading-relaxed mb-4">
                    {language === 'el' 
                      ? '"Αφηγούμαστε ιστορίες μέσα από το χώρο. Μερικές φορές, ο χώρος γίνεται η ίδια η ιστορία. Μπορεί να είναι η Πράξη. Μπορεί να είναι το Γεγονός. Μπορεί να είναι η Εμπειρία."'
                      : '"We tell stories through space. Sometimes, the space becomes the story itself. It can be the Act. It can be the Fact. It can be the Experience."'
                    }
                  </p>
                  <p className="text-label text-text-secondary/60 uppercase tracking-widest">
                    {language === 'el' ? 'Αυτη ειναι η μεγαλυτερη επιδιωξη μας.' : 'That is our greatest pursuit.'}
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-bg-primary py-32 sm:py-40 border-t border-border" id="team-section">
        <div className="container-main">
          <SectionReveal>
            <div className="text-center mb-20">
              <p className="text-label text-accent mb-4 tracking-[0.3em]">
                {language === 'el' ? 'Οι Ανθρωποι' : 'The People'}
              </p>
              <h2 className="text-heading-1 text-text-primary">
                {language === 'el' ? 'Η Ομάδα Μας' : 'Our Team'}
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {teamMembers.map((member, i) => (
              <SectionReveal key={member.id || member.name} delay={i * 0.05}>
                <motion.div
                  className="group cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="aspect-[4/5] overflow-hidden bg-bg-tertiary mb-6 rounded-sm">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-body font-bold text-text-primary mb-1">{member.name}</h3>
                  <p className="text-body-sm text-text-muted mb-2">
                    {language === 'el' ? member.role_el : member.role}
                  </p>
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-label text-accent hover:text-accent-alt transition-colors duration-300 inline-block relative overflow-hidden"
                  >
                    {member.email}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-alt -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </a>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-bg-secondary pt-32 sm:pt-40 pb-20 sm:pb-24" id="contact-section">
        <div className="container-narrow text-center">
          <SectionReveal>
            <p className="text-label text-bg-primary mb-4 tracking-[0.3em]">
              {language === 'el' ? 'Επικοινωνηστε μαζι μας' : 'Get In Touch'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="text-heading-1 text-text-secondary mb-12">
              {language === 'el' ? 'Επικοινωνία' : 'Contact'}
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <SectionReveal delay={0.15}>
              <div>
                <p className="text-label text-text-secondary/60 mb-3">
                  {language === 'el' ? 'Διεύθυνση' : 'Address'}
                </p>
                <p className="text-body text-text-secondary">
                  {language === 'el' 
                    ? <>Σοφοκλέους 272, 17674<br/>Αθήνα, Ελλάδα</>
                    : <>272 Sofokleous Str 17674<br/>Athens, Greece</>
                  }
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div>
                <p className="text-label text-text-secondary/60 mb-3">
                  {language === 'el' ? 'Στοιχεία' : 'Contact'}
                </p>
                <a
                  href="mailto:info@mdterra.gr"
                  className="text-body text-text-secondary hover:text-bg-primary/80 transition-colors duration-300 block mb-2"
                >
                  info@mdterra.gr
                </a>
                <a
                  href="tel:+302109412601"
                  className="text-body text-text-secondary hover:text-bg-primary/80 transition-colors duration-300 block mb-2"
                >
                  (+30) 210 9412 601
                </a>
                <a
                  href="tel:+306944881319"
                  className="text-body text-text-secondary hover:text-bg-primary/80 transition-colors duration-300 block"
                >
                  (+30) 6944 881 319
                </a>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.25}>
              <div>
                <p className="text-label text-text-secondary/60 mb-3">
                  {language === 'el' ? 'Κοινωνικά' : 'Social'}
                </p>
                <a
                  href="https://www.facebook.com/www.mdterra.gr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-text-secondary hover:text-bg-primary/80 transition-colors duration-300"
                >
                  Facebook
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
