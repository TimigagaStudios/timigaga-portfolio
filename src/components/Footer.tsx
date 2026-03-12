import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import Button from './Button';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#95EF90]/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-white rounded-[20%] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <span className="text-black font-bold text-3xl leading-none">T</span>
              </div>
              <div className="flex flex-col leading-none">
                <h3 className="text-2xl font-bold tracking-tight text-white uppercase font-heading">
                  TIMIGAGA
                </h3>
                <span className="text-[11px] font-semibold tracking-[0.5em] text-[#95EF90] uppercase font-heading mt-1">
                  STUDIOS
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-8 uppercase tracking-wide font-body">
              We are a premium digital studio crafting cinematic web experiences and innovative software solutions for forward-thinking brands globally.
            </p>
            <div className="flex space-x-6 text-gray-500">
              <a href="#" className="hover:text-[#95EF90] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#95EF90] transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-[#95EF90] transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-[#95EF90] transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8 text-white/40 font-heading">Studio</h4>
            <ul className="space-y-4 text-xs font-semibold uppercase tracking-widest text-gray-400 font-body">
              <li><Link to="/portfolio" className="hover:text-[#95EF90] transition-colors">Portfolio</Link></li>
              <li><Link to="/services" className="hover:text-[#95EF90] transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-[#95EF90] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#95EF90] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Expertise */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8 text-white/40 font-heading">Expertise</h4>
            <ul className="space-y-4 text-xs font-semibold uppercase tracking-widest text-gray-400 font-body">
              <li className="hover:text-[#95EF90] transition-colors cursor-default">Web Design</li>
              <li className="hover:text-[#95EF90] transition-colors cursor-default">Development</li>
              <li className="hover:text-[#95EF90] transition-colors cursor-default">Branding</li>
              <li className="hover:text-[#95EF90] transition-colors cursor-default">AI Strategy</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6 text-white/40 font-heading">Say Hello</h4>
            <p className="text-base font-bold mb-3 hover:text-[#95EF90] transition-colors cursor-pointer font-heading">hello@timigaga.com</p>
            <p className="text-xs text-gray-500 mb-6 font-normal tracking-wide font-body">+1 (234) 567-890</p>
            <Button href="/intake" variant="aura" size="sm" className="w-full text-[10px] uppercase tracking-widest font-bold font-heading">
              Start a Project
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 font-heading">
          <p>&copy; {new Date().getFullYear()} Timigaga Studios. Excellence as standard.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
