import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-2xl py-3 border-b border-white/8'
          : 'bg-transparent py-5 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center group">
          <img
            src="/images/timigaga-logo-full.png"
            alt="Timigaga Studios"
            className="h-15 md:h-16 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <div className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[12px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/55 hover:text-[#95EF90]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <Button
            href="/intake"
            variant="aura"
            size="sm"
            className="px-6 text-[11px] uppercase tracking-[0.18em] font-semibold"
          >
            Start Project
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="text-white hover:text-[#95EF90] focus:outline-none relative z-[110] p-2 transition-transform active:scale-95"
            aria-label="Open Menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/92 backdrop-blur-md z-[101] md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-full z-[102] bg-[#050505] flex flex-col p-6 sm:p-8 md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between pt-2 mb-12">
                <Link to="/" className="flex items-center">
                  <img
                    src="/images/timigaga-logo-full.png"
                    alt="Timigaga Studios"
                    className="h-15 w-auto object-contain"
                  />
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-[#95EF90] transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={26} />
                </button>
              </div>

              <div className="flex flex-col gap-5 mb-12">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`text-[1.75rem] leading-none tracking-[-0.04em] font-semibold transition-colors ${
                        isActive ? 'text-[#95EF90]' : 'text-white hover:text-[#95EF90]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-white/8 pt-8 mb-10">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/35 mb-4">
                  Expertise
                </p>

                <div className="flex flex-col gap-2 text-sm text-white/65">
                  <span>Web Design & Development</span>
                  <span>Brand Identity</span>
                  <span>AI Workflow Systems</span>
                </div>
              </div>

              <div className="mt-auto space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/35 mb-4">
                    Contact
                  </p>

                  <a
                    href="mailto:Timigaga.official@gmail.com"
                    className="text-base font-medium block hover:text-[#95EF90] transition-colors"
                  >
                    Timigaga.official@gmail.com
                  </a>

                  <a
                    href="tel:+2349069584853"
                    className="text-sm text-white/55 mt-2 block hover:text-white transition-colors"
                  >
                    +234 906 958 4853
                  </a>
                </div>

                <Button
                  href="/intake"
                  variant="aura"
                  size="md"
                  className="w-full uppercase tracking-[0.18em] font-semibold text-[11px]"
                >
                  Start a Project
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;