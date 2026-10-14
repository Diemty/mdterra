import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import ProjectCard from '../components/ProjectCard';
import { CATEGORIES, CATEGORY_TRANSLATIONS, type ProjectCategory } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';

type FilterOption = 'All' | ProjectCategory;

export default function ProjectsPage() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const { language } = useLanguage();
  const { projects } = useData();

  useEffect(() => {
    const hash = location.hash;
    if (hash.startsWith('#filter=')) {
      const filterValue = decodeURIComponent(hash.replace('#filter=', ''));
      if (CATEGORIES.includes(filterValue as ProjectCategory)) {
        setActiveFilter(filterValue as ProjectCategory);
      }
    }
  }, [location.hash]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.categories.includes(activeFilter as ProjectCategory));
  }, [activeFilter, projects]);

  const filters: FilterOption[] = ['All', ...CATEGORIES];

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-bg-primary" id="projects-header">
        <div className="container-main">
          <SectionReveal>
            <p className="text-label text-accent mb-4 tracking-[0.3em]">
              {language === 'el' ? 'Χαρτοφυλάκιο' : 'Portfolio'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="text-display text-text-primary">
              {language === 'el' ? 'Έργα' : 'Projects'}
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* Filter Bar + Grid */}
      <section className="bg-bg-primary pb-32" id="projects-grid-section">
        <div className="container-main">
          {/* Filter Bar */}
          <SectionReveal delay={0.2}>
            <div className="flex flex-wrap gap-3 mb-16 pb-8 border-b border-border" id="project-filters">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                let displayFilter: string = filter;
                if (language === 'el') {
                  displayFilter = filter === 'All' ? 'Όλα' : CATEGORY_TRANSLATIONS[filter as ProjectCategory];
                }
                
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter as FilterOption)}
                    id={`filter-${filter.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                    className={`relative text-label px-4 py-2.5 rounded-sm transition-all duration-300 ${
                      isActive
                        ? 'text-bg-primary bg-accent'
                        : 'text-text-muted border border-border hover:border-text-muted hover:text-text-primary'
                    }`}
                  >
                    {displayFilter}
                    {isActive && (
                      <motion.div
                        layoutId="filter-active"
                        className="absolute inset-0 bg-accent rounded-sm -z-10"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </SectionReveal>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-label text-text-muted">
              {language === 'el' 
                ? `${filteredProjects.length} έργο${filteredProjects.length !== 1 ? 'α' : ''}`
                : `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}`
              }
              {activeFilter !== 'All' && (
                <span className="text-accent">
                  {' '}· {language === 'el' ? CATEGORY_TRANSLATIONS[activeFilter as ProjectCategory] : activeFilter}
                </span>
              )}
            </p>
          </div>

          {/* Project Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-heading-3 text-text-muted mb-4">
                {language === 'el' ? 'Δεν βρέθηκαν έργα' : 'No projects found'}
              </p>
              <button
                onClick={() => setActiveFilter('All')}
                className="text-label text-accent hover:opacity-70 transition-opacity"
              >
                {language === 'el' ? 'Προβολή όλων των έργων' : 'Show all projects'}
              </button>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
