import { Link } from 'react-router-dom';
import { useScroll, useTransform } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import ProjectCard from '../components/ProjectCard';
import HeroLogoReveal from '../components/HeroLogoReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const { language } = useLanguage();
  const { projects } = useData();

  const featuredProjects = projects.slice(0, 6);

  return (
    <PageTransition>
      {/* ──────── HERO SECTION ──────── */}
      <HeroLogoReveal heroOpacity={heroOpacity} heroScale={heroScale} />

      {/* ──────── ABOUT TEASER ──────── */}
      <section className="bg-bg-secondary py-32 sm:py-40" id="about-section">
        <div className="container-narrow text-center">
          <SectionReveal>
            <h2 className="text-heading-1 text-text-secondary mb-8">Mdterra</h2>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="text-body text-text-secondary/70 max-w-2xl mx-auto mb-10">
              {language === 'el' ? (
                <>
                  Η Mdterra είναι ένα σύγχρονο και καινοτόμο αρχιτεκτονικό γραφείο με έδρα την Αθήνα.
                  Στην Mdterra, καθοδηγούμαστε από μια βαθιά εσωτερική παρόρμηση να εξερευνήσουμε, 
                  να κατανοήσουμε και να εκφράσουμε τη μοναδική αφήγηση κάθε πελάτη. Διοχετεύουμε τη 
                  δημιουργικότητά μας μέσα από τη γεωμετρία, την τεχνολογία, την κλίμακα, την υλικότητα, 
                  το κλίμα και το φως—δημιουργώντας χώρους που ανταποκρίνονται στις προσδοκίες των 
                  πελατών μας παρέχοντας υψηλής ποιότητας αρχιτεκτονικές υπηρεσίες.
                </>
              ) : (
                <>
                  Mdterra is a modern and innovative architectural practice based in Athens, Greece. 
                  At Mdterra, we are driven by a deep internal impulse to explore, understand, and 
                  express each client's unique narrative. We channel our creativity through geometry, 
                  technology, scale, materiality, climate, and light—crafting spaces that meet our 
                  clients' expectations while delivering high-quality architectural services.
                </>
              )}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <Link
              to="/office"
              className="inline-flex items-center gap-3 text-label-lg text-accent hover:opacity-70 transition-opacity duration-300 group"
              id="about-read-more"
            >
              <span>{language === 'el' ? 'Περισσότερα' : 'Read More'}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ──────── PROJECTS SECTION ──────── */}
      <section className="bg-bg-primary py-32 sm:py-40" id="projects-section">
        <div className="container-main">
          <SectionReveal>
            <div className="flex items-end justify-between mb-16">
              <h2 className="text-heading-1 text-text-primary">{language === 'el' ? 'Έργα' : 'Projects'}</h2>
              <Link
                to="/projects"
                className="hidden sm:inline-flex items-center gap-3 text-label-lg text-text-muted hover:text-accent transition-colors duration-300 group"
                id="projects-view-all"
              >
                <span>{language === 'el' ? 'Προβολή Όλων' : 'View All'}</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <div className="sm:hidden mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 text-label-lg text-text-muted hover:text-accent transition-colors duration-300"
            >
              {language === 'el' ? 'Προβολή Όλων των Έργων' : 'View All Projects'}
            </Link>
          </div>
        </div>
      </section>

      {/* ──────── QUOTE SECTION ──────── */}
      <section className="bg-bg-secondary py-32 sm:py-40" id="quote-section">
        <div className="container-narrow text-center">
          <SectionReveal>
            <div className="divider mx-auto mb-12" style={{ background: '#E0DDD8' }} />
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <blockquote className="text-heading-2 text-text-secondary/80 font-light italic max-w-3xl mx-auto leading-relaxed">
              {language === 'el' 
                ? `"Το έργο μας αναγνωρίζεται και βραβεύεται μέσα από εθνικούς και διεθνείς αρχιτεκτονικούς διαγωνισμούς."`
                : `"Our work is recognized and awarded through national and international architectural competitions."`
              }
            </blockquote>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <Link
              to="/projects#filter=Competition"
              className="inline-flex items-center gap-2 text-label text-white mt-8 hover:opacity-70 transition-opacity duration-300"
            >
              {language === 'el' ? 'Προβολή Έργων Διαγωνισμών' : 'View Competition Projects'} →
            </Link>
          </SectionReveal>
          <SectionReveal delay={0.4}>
            <div className="divider mx-auto mt-12" style={{ background: '#E0DDD8' }} />
          </SectionReveal>
        </div>
      </section>

      {/* ──────── FAKAROLA TEASER ──────── */}
      <section className="bg-bg-primary py-32 sm:py-40" id="fakarola-section">
        <div className="container-narrow text-center">
          <SectionReveal>
            <h2 className="text-heading-1 text-text-primary mb-6">Fakarola</h2>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="text-body text-text-muted max-w-xl mx-auto mb-10">
              {language === 'el' 
                ? 'Σκίτσα, προσχέδια, ζωγραφιές, σημειώσεις, φωτογραφίες και άλλα.' 
                : 'Sketches, draft drawings, paintings, notes, photos and more.'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <Link
              to="/fakarola"
              className="inline-flex items-center gap-3 text-label-lg text-text-muted hover:text-accent transition-colors duration-300 group"
              id="fakarola-explore"
            >
              <span>{language === 'el' ? 'Εξερευνήστε τη Φακαρόλα' : 'Explore Fakarola'}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
