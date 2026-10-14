import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';

export default function FakarolaPage() {
  const { language } = useLanguage();
  const { fakarolaItems } = useData();

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-bg-primary" id="fakarola-header">
        <div className="container-main">
          <SectionReveal>
            <p className="text-label text-accent mb-4 tracking-[0.3em]">
              {language === 'el' ? 'Η Συλλογη Μας' : 'Our Collection'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="text-display text-text-primary mb-8">Fakarola</h1>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="text-heading-3 text-text-muted font-light max-w-3xl leading-relaxed">
              {language === 'el' 
                ? 'Μια ματιά πίσω από την αρχιτεκτονική διαδικασία. Μια συλλογή από σκίτσα, προσχέδια, ζωγραφιές, σημειώσεις, φωτογραφίες και αντικείμενα που εμπνέουν τη δουλειά μας.'
                : 'A glimpse behind the architectural process. A collection of sketches, draft drawings, paintings, notes, photos, and objects that inspire our work.'
              }
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Grid Section */}
      <section className="bg-bg-secondary py-32 sm:py-40" id="fakarola-grid-section">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[280px]">
            {fakarolaItems.map((item, i) => (
              <SectionReveal 
                key={item.id} 
                delay={i * 0.05} 
                className={`relative group overflow-hidden bg-bg-primary rounded-sm border border-border/40 ${item.span || 'col-span-1 row-span-1'}`}
              >
                {/* Optional Photo Background */}
                {item.image ? (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/60 to-transparent" />
                  </div>
                ) : (
                  /* Background Gradient for Notes/Drawings without photo */
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color || 'from-accent/10 to-transparent'} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
                )}
                
                {/* Content */}
                <div className="relative h-full flex flex-col p-6 sm:p-8 z-10 justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text-primary bg-bg-primary/80 backdrop-blur-sm border border-border px-2.5 py-1 rounded-sm">
                      {language === 'el' ? (item.type_el || item.type) : item.type}
                    </span>
                    <span className="text-label text-text-muted/60 font-mono">
                      #{String(item.id).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <h3 className="text-heading-3 text-text-primary mb-2 leading-tight group-hover:text-accent transition-colors duration-300">
                      {language === 'el' ? (item.title_el || item.title) : item.title}
                    </h3>
                    <p className="text-body-sm text-text-muted font-light line-clamp-3">
                      {language === 'el' ? (item.description_el || item.description) : item.description}
                    </p>
                  </div>
                </div>

                {/* Decorative border line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-700 ease-out" />
              </SectionReveal>
            ))}
          </div>

          {/* End note */}
          <SectionReveal delay={0.3}>
            <div className="text-center mt-20">
              <p className="text-label text-white/60 tracking-[0.2em]">
                {language === 'el' ? 'ΣΥΝΕΧΗΣ ΕΝΗΜΕΡΩΣΗ' : 'CONTINUOUSLY UPDATED ARCHIVE'}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
