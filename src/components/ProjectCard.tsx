import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { Project } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { CATEGORY_TRANSLATIONS } from '../data/projects';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px 0px' });

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.4 },
      }}
      className="group relative cursor-pointer overflow-hidden"
      id={`project-card-${project.slug}`}
    >
      <Link to={`/projects/${project.slug}`} className="block w-full h-full">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-tertiary">
          <motion.img
            src={project.image}
            alt={project.title}
            initial={{ scale: 1.06 }}
            animate={isInView ? { scale: 1 } : { scale: 1.06 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Desktop Hover Overlay */}
          <div className="hidden sm:flex absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/70 transition-all duration-500 flex-col justify-end p-6 sm:p-8">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-label px-2.5 py-1 border border-accent/40 text-accent rounded-sm"
                >
                  {language === 'el' ? CATEGORY_TRANSLATIONS[cat] : cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-heading-3 text-text-primary translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              {project.title}
            </h3>

            {/* Location */}
            {(project.location || project.location_el) && (
              <p className="text-label text-text-muted mt-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                {language === 'el' ? (project.location_el || project.location) : project.location}
              </p>
            )}
          </div>

          {/* Mobile Top Accent Line (smoothly sweeps across when scrolled into view) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="sm:hidden absolute top-0 left-0 w-full h-[2px] bg-accent z-10"
          />

          {/* Mobile Title Overlay (animated stylishly when scrolled into view) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="sm:hidden absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/80 to-transparent pt-12 pb-4 px-4 flex flex-col justify-end pointer-events-none"
          >
            <h3 className="text-heading-3 text-text-primary text-base font-semibold leading-tight tracking-wide mb-1">
              {project.title}
            </h3>
            {(project.location || project.location_el) && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
                className="text-label text-text-muted text-[11px]"
              >
                {language === 'el' ? (project.location_el || project.location) : project.location}
              </motion.p>
            )}
          </motion.div>
          
          {/* Desktop Hover Accent Lines */}
          <div className="hidden sm:block absolute top-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-700 ease-out"></div>
          <div className="hidden sm:block absolute top-0 left-0 h-0 w-[2px] bg-accent group-hover:h-full transition-all duration-700 ease-out delay-100"></div>
        </div>
      </Link>
    </motion.article>
  );
}
