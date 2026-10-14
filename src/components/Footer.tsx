import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const isOffice = pathname === '/office';

  return (
    <footer className={`bg-bg-secondary ${isOffice ? 'pt-0 pb-12' : 'pt-24 pb-12 border-t border-white/10'}`} id="main-footer">
      <div className="container-main">
        {!isOffice && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 text-center justify-items-center">
          
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <Link to="/" className="inline-block mb-6">
              <img 
                alt="Mdterra Architecture" 
                className="h-14 lg:h-16 w-auto" 
                src="/images/logo.png" 
              />
            </Link>
            <p className="text-body text-white mb-6 max-w-[250px]">
              {language === 'el' 
                ? 'Σχεδιάζουμε χώρους που εμπνέουν και διαρκούν στο χρόνο.' 
                : 'Designing spaces that inspire and endure through time.'}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center">
            <h4 className="text-label text-white mb-6 uppercase tracking-wider">
              {language === 'el' ? 'Επικοινωνια' : 'Contact'}
            </h4>
            <ul className="space-y-4 text-body text-white">
              <li>
                <span className="block text-white/80 text-sm mb-1">{language === 'el' ? 'Τηλ.' : 'Tel.'}</span>
                <div className="flex flex-col space-y-1">
                  <a href="tel:+302109412601" className="hover:text-white transition-colors duration-300">
                    (+30) 2109412601
                  </a>
                  <a href="tel:+306944881319" className="hover:text-white transition-colors duration-300">
                    (+30) 6944881319
                  </a>
                </div>
              </li>
              <li>
                <span className="block text-white/80 text-sm mb-1">Email.</span>
                <a href="mailto:info@mdterra.gr" className="hover:text-white transition-colors duration-300">
                  info@mdterra.gr
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center">
            <h4 className="text-label text-white mb-6 uppercase tracking-wider">
              {language === 'el' ? 'Τοποθεσια' : 'Location'}
            </h4>
            <address className="not-italic text-body text-white">
              <span className="block text-white/80 text-sm mb-1">{language === 'el' ? 'Διεύθυνση.' : 'Address.'}</span>
              {language === 'el' ? 'Σοφοκλέους 272, 17674' : '272 Sofokleous Str 17674'}<br />
              {language === 'el' ? 'Αθήνα Ελλάδα' : 'Athens Greece'}
            </address>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center">
            <h4 className="text-label text-white mb-6 uppercase tracking-wider">
              {language === 'el' ? 'Κοινωνικα Δικτυα' : 'Social'}
            </h4>
            <ul className="space-y-4 text-body text-white">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-300">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        )}

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 relative flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-label text-white text-center w-full">
            &copy; {new Date().getFullYear()} Mdterra Architecture. {language === 'el' ? 'Με επιφύλαξη παντός δικαιώματος.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-6 md:absolute md:right-0">
            <Link 
              to="/admin" 
              className="text-label text-white/50 hover:text-white transition-colors duration-300 text-[10px] tracking-widest uppercase"
              title="Studio Admin"
            >
              Admin
            </Link>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-label text-white hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              id="footer-back-to-top"
            >
              <span>{language === 'el' ? 'Επιστροφή στην κορυφή' : 'Back to top'}</span>
              <svg 
                className="w-3 h-3 group-hover:-translate-y-1 transition-transform duration-300" 
                viewBox="0 0 10 17" 
                fill="currentColor"
              >
                <path d="M9.2 4.2L5.7 0.7C5.5 0.5 5.3 0.4 5 0.4c-0.3 0-0.5 0.1-0.7 0.3L0.8 4.2c-0.4 0.4-0.4 1 0 1.4 0.4 0.4 1 0.4 1.4 0L4 3.8v11.9c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1V3.8l1.8 1.8c0.4 0.4 1 0.4 1.4 0S9.6 4.6 9.2 4.2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
