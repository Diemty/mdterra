import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const navLinks = [
  { to: '/', label: 'Home', label_el: 'Αρχική' },
  { to: '/office', label: 'Office', label_el: 'Γραφείο' },
  { to: '/projects', label: 'Projects', label_el: 'Έργα' },
  { to: '/fakarola', label: 'Fakarola', label_el: 'Φακαρόλα' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-bg-secondary py-3 shadow-lg' : 'bg-bg-secondary py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        id="main-header"
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10 group" id="nav-logo">
            <img 
              alt="Mdterra Architecture" 
              className="h-14 lg:h-16 w-auto transition-opacity duration-300" 
              src="/images/logo.png" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10" id="nav-desktop">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  className={`relative text-label-lg transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white hover:text-white/80'
                  }`}
                >
                  {language === 'el' ? link.label_el : link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="text-label-lg text-white hover:text-white/80 transition-colors ml-4 border border-white/30 px-3 py-1 rounded"
            >
              {language === 'en' ? 'EN' : 'GR'}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-px bg-white transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-secondary flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-heading-2 text-white"
                >
                  {language === 'el' ? link.label_el : link.label}
                </Link>
              ))}
              <button 
                onClick={toggleLanguage}
                className="text-heading-3 text-white border border-white/30 px-6 py-2 rounded mt-4"
              >
                {language === 'en' ? 'EN' : 'GR'}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
