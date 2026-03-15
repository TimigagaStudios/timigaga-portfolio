import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import Button from '@/components/Button';

const Contact = () => {
  return (
    <div className="pt-28 md:pt-32 pb-20 bg-black text-white">
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-white/45 uppercase tracking-[0.4em] text-xs mb-5">
              Contact
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] mb-6">
              Let’s build
              <br />
              something remarkable.
            </h1>

            <p className="text-white/60 text-base md:text-lg leading-8 max-w-xl mb-12">
              Whether you already have a clear vision or you’re still shaping
              the idea, Timigaga Studios is ready to help you create a premium
              digital experience with strategy, design, and execution that feels
              world-class.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white/75 group-hover:bg-[#95EF90] group-hover:text-black transition-all duration-300 shrink-0">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/35 mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:Timigaga.official@gmail.com"
                    className="text-lg md:text-xl font-medium tracking-tight hover:text-[#95EF90] transition-colors"
                  >
                    Timigaga.official@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white/75 group-hover:bg-[#95EF90] group-hover:text-black transition-all duration-300 shrink-0">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/35 mb-2">
                    Phone
                  </p>
                  <a
                    href="tel:+2349069584853"
                    className="text-lg md:text-xl font-medium tracking-tight hover:text-[#95EF90] transition-colors"
                  >
                    +234 906 958 4853
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center text-white/75 shrink-0">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/35 mb-2">
                    Location
                  </p>
                  <span className="text-lg md:text-xl font-medium tracking-tight text-white/85">
                    Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="glass-dark p-8 md:p-10 rounded-[2rem] border border-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          >
            <p className="text-white/45 uppercase tracking-[0.35em] text-xs mb-4">
              Project Intake
            </p>

            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight leading-tight mb-5">
              Ready to get started?
            </h2>

            <p className="text-white/60 text-sm md:text-base leading-7 mb-8">
              If you want a faster and more structured collaboration process,
              use the project intake form to share your goals, budget, and
              creative direction in detail.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                href="/intake"
                variant="aura"
                size="md"
                className="text-[11px] uppercase tracking-[0.18em] font-semibold px-6"
              >
                Start Project Intake
              </Button>

              <Button
                href="mailto:Timigaga.official@gmail.com"
                variant="outline"
                size="md"
                className="text-[11px] uppercase tracking-[0.18em] font-semibold px-6"
              >
                Send Email
              </Button>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Contact;