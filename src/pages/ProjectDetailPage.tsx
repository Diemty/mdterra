import { useParams, Navigate, Link } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import ProjectCard from '../components/ProjectCard';
import { CATEGORY_TRANSLATIONS } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { projects } = useData();
  const project = projects.find((p) => p.slug === slug);
  const { language } = useLanguage();

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Use localized content if available
  const subtitle = language === 'el' && project.subtitle_el ? project.subtitle_el : project.subtitle;
  const description = language === 'el' && project.description_el ? project.description_el : project.description;
  const location = language === 'el' && project.location_el ? project.location_el : project.location;

  // Find related projects (max 3, matching at least one category)
  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.categories.some((c) => project.categories.includes(c)))
    .slice(0, 3);

  // If not enough related by category, just add some random ones
  if (relatedProjects.length < 3) {
    const additional = projects
      .filter((p) => p.id !== project.id && !relatedProjects.find((rp) => rp.id === p.id))
      .slice(0, 3 - relatedProjects.length);
    relatedProjects.push(...additional);
  }

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] min-h-[500px] flex items-center pt-24">
        <div className="absolute inset-0 z-0 overflow-hidden bg-bg-secondary">
          <div className="w-full h-full">
            <img 
              src={project.headerImage || project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="container-main relative z-10 flex justify-center w-full">
          <div className="inline-flex flex-col items-center text-center bg-bg-primary/85 backdrop-blur-[2px] border border-border/50 p-8 md:p-12 rounded-sm shadow-2xl max-w-full">
            <SectionReveal>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {project.categories.map(cat => (
                  <span key={cat} className="text-label px-3 py-1 bg-accent text-bg-primary rounded-sm">
                    {language === 'el' ? CATEGORY_TRANSLATIONS[cat] : cat}
                  </span>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h1 className="text-display !text-[clamp(2.5rem,6.5vw,6.25rem)] text-text-primary mb-3">
                {project.title}
              </h1>
            </SectionReveal>
            {location && (
              <SectionReveal delay={0.2}>
                <p className="text-heading-3 text-text-muted">{location}</p>
              </SectionReveal>
            )}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="bg-bg-primary py-20">
        <div className="container-main">
          <div className="max-w-5xl mx-auto">
            
            {/* Overview / Subtitle */}
            <SectionReveal>
              <div className="mb-16 space-y-8">
                {subtitle && (
                  <div>
                    <h2 className="text-[1.75rem] leading-tight font-medium text-text-primary mb-2">
                      {subtitle}
                    </h2>
                    {location && (
                      <p className="text-heading-4 text-text-muted">{location}</p>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-x-12 gap-y-6 py-6 border-y border-border/50">
                  <div>
                    <span className="block text-label text-text-muted mb-1 uppercase tracking-wider">
                      {language === 'el' ? 'Τυπος' : 'Type'}
                    </span>
                    <span className="text-body text-text-primary font-medium">
                      {project.categories.map(cat => language === 'el' ? CATEGORY_TRANSLATIONS[cat] : cat).join(', ')}
                    </span>
                  </div>
                  {project.year && (
                    <div>
                      <span className="block text-label text-text-muted mb-1 uppercase tracking-wider">
                        {language === 'el' ? 'Ετος' : 'Year'}
                      </span>
                      <span className="text-body text-text-primary font-medium">{project.year}</span>
                    </div>
                  )}
                  {project.builtArea && (
                    <div>
                      <span className="block text-label text-text-muted mb-1 uppercase tracking-wider">
                        {language === 'el' ? 'Εμβαδον' : 'Area'}
                      </span>
                      <span className="text-body text-text-primary font-medium">{project.builtArea}</span>
                    </div>
                  )}
                </div>
                
                {description && description.length > 0 && (
                  <div className="prose prose-lg max-w-none text-text-primary/90 leading-relaxed mt-12">
                    {description.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </SectionReveal>

            {/* Masonry Gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="mt-12">
                <div className="columns-1 md:columns-2 gap-6 space-y-6">
                  {project.galleryImages.map((img: string, i: number) => (
                    <div key={i} className="break-inside-avoid rounded-sm overflow-hidden bg-bg-tertiary cursor-zoom-in group">
                      <img 
                        src={img} 
                        alt={`${project.title} - ${i + 1}`} 
                        className="w-full h-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Info Bottom Section */}
            <SectionReveal>
              <div className="mt-24 pt-16 border-t border-border">
                <h4 className="text-heading-4 text-text-primary mb-8">
                  {language === 'el' ? 'Πληροφορίες Έργου' : 'Project Info'}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <dl className="space-y-4">
                    {project.designTeam && (
                      <div className="flex flex-col border-b border-border/50 pb-4">
                        <dt className="text-label text-text-muted mb-1">{language === 'el' ? 'Ομάδα Μελέτης' : 'Design Team'}</dt>
                        <dd className="text-body text-text-primary font-medium">{project.designTeam}</dd>
                      </div>
                    )}
                    {project.associateArchitects && (
                      <div className="flex flex-col border-b border-border/50 pb-4">
                        <dt className="text-label text-text-muted mb-1">{language === 'el' ? 'Συνεργάτες Αρχιτέκτονες' : 'Associate Architects'}</dt>
                        <dd className="text-body text-text-primary font-medium">{project.associateArchitects}</dd>
                      </div>
                    )}
                    {project.client && (
                      <div className="flex flex-col border-b border-border/50 pb-4">
                        <dt className="text-label text-text-muted mb-1">{language === 'el' ? 'Πελάτης' : 'Client'}</dt>
                        <dd className="text-body text-text-primary font-medium">{project.client}</dd>
                      </div>
                    )}
                  </dl>
                  
                  <dl className="space-y-4">
                    {project.mep && (
                      <div className="flex flex-col border-b border-border/50 pb-4">
                        <dt className="text-label text-text-muted mb-1">MEP</dt>
                        <dd className="text-body text-text-primary font-medium">{project.mep}</dd>
                      </div>
                    )}
                    {project.structuralDesign && (
                      <div className="flex flex-col border-b border-border/50 pb-4">
                        <dt className="text-label text-text-muted mb-1">{language === 'el' ? 'Στατική Μελέτη' : 'Structural Design'}</dt>
                        <dd className="text-body text-text-primary font-medium">{project.structuralDesign}</dd>
                      </div>
                    )}
                  </dl>

                  <dl className="space-y-4">
                    {project.photographer && (
                      <div className="flex flex-col border-b border-border/50 pb-4">
                        <dt className="text-label text-text-muted mb-1">{language === 'el' ? 'Φωτογραφίες' : 'Photos'}</dt>
                        <dd className="text-body text-text-primary font-medium">{project.photographer}</dd>
                      </div>
                    )}
                    {project.contractor && (
                      <div className="flex flex-col border-b border-border/50 pb-4">
                        <dt className="text-label text-text-muted mb-1">{language === 'el' ? 'Κατασκευαστής' : 'Contractor'}</dt>
                        <dd className="text-body text-text-primary font-medium">{project.contractor}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-6">
                  <p className="text-label text-text-primary flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-accent" /> 
                    {language === 'el' ? 'Μοιραστείτε αυτό το έργο' : 'Share this project'}
                  </p>
                  <div className="flex gap-4">
                    <button className="text-label text-text-muted hover:text-accent transition-colors">Facebook</button>
                    <button className="text-label text-text-muted hover:text-accent transition-colors">Twitter</button>
                    <button className="text-label text-text-muted hover:text-accent transition-colors">LinkedIn</button>
                  </div>
                </div>
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="bg-bg-tertiary py-24 border-t border-border">
        <div className="container-main">
          <SectionReveal>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-heading-2 text-text-primary">
                {language === 'el' ? 'Σχετικά Έργα' : 'Related Projects'}
              </h2>
              <Link 
                to="/projects" 
                className="text-label text-accent hover:opacity-70 transition-opacity"
              >
                {language === 'el' ? 'Προβολή όλων των έργων' : 'View all projects'}
              </Link>
            </div>
          </SectionReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {relatedProjects.map((rp, i) => (
              <ProjectCard key={rp.id} project={rp} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
