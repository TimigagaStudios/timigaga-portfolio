import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import Button from './Button';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#95EF90]/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/images/timigaga-logo-icon.png"
                alt="Timigaga Studios icon"
                className="h-11 w-auto object-contain"
              />

              <div className="flex flex-col leading-none">
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                  Timigaga
                </h3>
                <span className="text-[11px] font-medium tracking-[0.42em] text-[#95EF90] uppercase mt-1">
                  Studios
                </span>
              </div>
            </div>

            <p className="text-white/60 text-sm max-w-sm leading-8 mb-8">
              We are a premium digital studio crafting cinematic web experiences
              and innovative software solutions for forward-thinking brands globally.
            </p>

            <div className="flex space-x-5 text-white/40">
              <a href="#" className="hover:text-[#95EF90] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#95EF90] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-[#95EF90] transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-[#95EF90] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Studio Links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] mb-6 text-white/35">
              Studio
            </h4>

            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <Link to="/portfolio" className="hover:text-[#95EF90] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#95EF90] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#95EF90] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#95EF90] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Expertise */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] mb-6 text-white/35">
              Expertise
            </h4>

            <ul className="space-y-4 text-sm text-white/60">
              <li>Web Design</li>
              <li>Development</li>
              <li>Branding</li>
              <li>AI Strategy</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] mb-6 text-white/35">
              Say Hello
            </h4>

            <a
              href="mailto:Timigaga.official@gmail.com"
              className="text-base font-medium mb-3 block hover:text-[#95EF90] transition-colors"
            >
              Timigaga.official@gmail.com
            </a>

            <a
              href="tel:+2349069584853"
              className="text-sm text-white/55 mb-6 block hover:text-white transition-colors"
            >
              +234 906 958 4853
            </a>

            <div className="w-fit">
              <Button
                href="/intake"
                variant="aura"
                size="sm"
                className="text-[11px] uppercase tracking-[0.18em] font-semibold px-6"
              >
                Start a Project
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/35">
          <p>&copy; {new Date().getFullYear()} Timigaga Studios. Excellence as standard.</p>

          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;