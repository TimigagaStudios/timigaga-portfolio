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
      setScrolled(window.scrollY > 50);
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
        scrolled ? 'bg-black/90 backdrop-blur-2xl py-3 border-b border-white/5' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-white rounded-[20%] flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <span className="text-black font-bold text-xl leading-none">T</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight text-white uppercase font-heading group-hover:text-[#95EF90] transition-colors">
              TIMIGAGA
            </span>
            <span className="text-[10px] font-semibold tracking-[0.4em] text-[#95EF90] uppercase font-heading mt-0.5">
              STUDIOS
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-[11px] uppercase font-bold tracking-[0.2em] transition-all hover:text-[#95EF90] font-heading ${
                location.pathname === link.path ? 'text-[#95EF90]' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button href="/intake" variant="aura" size="sm" className="px-8 text-[10px] uppercase tracking-[0.2em] font-bold font-heading">
            START PROJECT
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white hover:text-[#95EF90] focus:outline-none relative z-[110] p-2 transition-transform active:scale-90"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[101] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-full z-[102] bg-black flex flex-col p-8 md:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12 pt-2">
                <Link to="/" className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-[20%] flex items-center justify-center">
                    <span className="text-black font-bold text-lg leading-none">T</span>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-lg font-bold tracking-tight text-white uppercase font-heading">
                      TIMIGAGA
                    </span>
                    <span className="text-[8px] font-semibold tracking-[0.4em] text-[#95EF90] uppercase font-heading mt-0.5">
                      STUDIOS
                    </span>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col gap-6 mb-12">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={`text-2xl uppercase font-bold tracking-tight font-heading transition-colors ${
                      location.pathname === link.path ? 'text-[#95EF90]' : 'text-white hover:text-[#95EF90]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4 mb-12 border-t border-white/5 pt-8">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500">Expertise</span>
                <div className="flex flex-col gap-2 text-sm font-semibold text-gray-400">
                  <span className="hover:text-white transition-colors cursor-pointer">Development</span>
                  <span className="hover:text-white transition-colors cursor-pointer">Branding</span>
                  <span className="hover:text-white transition-colors cursor-pointer">AI Strategy</span>
                </div>
              </div>

              <div className="mt-auto space-y-8">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 block mb-4">Say Hello</span>
                  <a href="mailto:hello@timigaga.com" className="text-lg font-bold block hover:text-[#95EF90] transition-colors">hello@timigaga.com</a>
                  <a href="tel:+1234567890" className="text-sm text-gray-500 mt-2 block hover:text-white transition-colors">+1 (234) 567-890</a>
                </div>
                <Button href="/intake" variant="aura" size="lg" className="w-full uppercase tracking-[0.2em] font-black text-sm">
                  START A PROJECT
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
