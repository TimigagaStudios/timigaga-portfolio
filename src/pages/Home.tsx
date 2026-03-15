import { motion } from 'framer-motion';
import { ArrowRight, Code, PenTool, Zap } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import Button from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';
import ServiceCard from '@/components/ServiceCard';

const Home = () => {
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-black overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 dots-pattern opacity-[0.04]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(149,239,144,0.08),transparent_35%)]" />

        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, 25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 left-[-120px] w-[420px] h-[420px] bg-[#95EF90]/6 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-[-140px] w-[500px] h-[500px] bg-[#95EF90]/5 rounded-full blur-[140px]"
        />

        <SectionWrapper>
          {/* Top CTA Pills */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <Button
              href="/portfolio"
              variant="aura"
              size="sm"
              className="text-xs md:text-sm"
            >
              See my work
            </Button>
            <Button
              href="/services"
              variant="aura"
              size="sm"
              className="text-xs md:text-sm"
            >
              My catalog
            </Button>
            <Button
              href="/contact"
              variant="aura"
              size="sm"
              className="text-xs md:text-sm"
            >
              Book a service
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Intro */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-3 order-2 lg:order-1"
            >
              <div className="border-t border-[#95EF90]/30 pt-5 max-w-xs">
                <p className="text-xl md:text-2xl leading-tight text-white/90 font-light tracking-tight">
                  Web Developer,
                  <br />
                  Brand Designer
                  <br />& Creative Technologist
                </p>
              </div>
            </motion.div>

            {/* Middle Hero */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center text-center relative"
            >
              <div className="relative w-full flex justify-center">
                <div className="absolute inset-0 bg-[#95EF90]/8 blur-[100px] rounded-full scale-110" />

                <div className="relative z-10 w-[260px] sm:w-[300px] md:w-[360px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-b from-[#151515] to-[#080808] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
                    alt="Timigaga Studios creative portrait"
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[#95EF90] uppercase tracking-[0.6em] text-xs md:text-sm mb-3">
                  Timothy Buoro
                </p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-semibold tracking-tighter leading-none">
                  Timigaga
                </h1>
                <p className="text-base md:text-lg text-white/60 mt-4 max-w-xl mx-auto leading-8">
                  Build. Design. Innovate.
                </p>
              </div>
            </motion.div>

            {/* Right Intro */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-3 order-3"
            >
              <div className="max-w-sm ml-auto">
                <p className="text-base md:text-lg text-white/80 leading-8">
                  Hi, I’m Timothy — founder of Timigaga Studios. I design and
                  build modern digital experiences for brands that want premium
                  positioning, stronger online presence, and world-class visual
                  execution.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Brand / Tools row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/25 text-sm md:text-base"
          >
            <span>React</span>
            <span>Next.js</span>
            <span>Supabase</span>
            <span>Tailwind</span>
            <span>Netlify</span>
            <span>Brevo</span>
          </motion.div>
        </SectionWrapper>
      </section>

      {/* Intro Statement */}
      <section className="py-16 md:py-24 bg-black">
        <SectionWrapper>
          <div className="max-w-5xl">
            <div className="border-t border-[#95EF90]/25 pt-8">
              <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-medium text-white">
                Crafting premium websites, digital products, visual branding,
                and modern creative systems for ambitious businesses.
              </h2>
              <p className="mt-6 max-w-3xl text-white/55 text-base md:text-lg leading-8">
                Timigaga Studios combines strategy, design, development, and AI-assisted
                execution to help brands launch faster, look sharper, and compete
                at a higher level.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 bg-black">
        <SectionWrapper>
          <div className="mb-12">
            <p className="text-[#95EF90] uppercase tracking-[0.4em] text-xs mb-4">
              What I do
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Services built for modern brands.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              title="Website Design & Development"
              description="Fast, polished, conversion-focused websites designed to help your brand stand out and scale."
              icon={<Code size={30} />}
            />
            <ServiceCard
              title="Brand Identity & Visual Design"
              description="Distinct brand systems, digital assets, and creative direction that communicate professionalism."
              icon={<PenTool size={30} />}
            />
            <ServiceCard
              title="AI Workflow & Creative Systems"
              description="AI-assisted processes and smart tools to streamline delivery, outreach, and production."
              icon={<Zap size={30} />}
            />
          </div>
        </SectionWrapper>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-20 bg-black">
        <SectionWrapper>
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
            <div>
              <p className="text-[#95EF90] uppercase tracking-[0.4em] text-xs mb-4">
                Portfolio
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                Selected work.
              </h2>
            </div>

            <Button
              href="/portfolio"
              variant="aura"
              size="md"
              className="uppercase tracking-[0.16em] text-[11px] font-semibold px-8"
            >
              View portfolio
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
              id="architectural-boutique"
              title="Structura"
              category="Web Architecture"
              image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            />
            <ProjectCard
              id="ai-music-platform"
              title="Sonic AI"
              category="AI Platform"
              image="https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2070&auto=format&fit=crop"
            />
          </div>
        </SectionWrapper>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-[#95EF90]/5 rounded-full blur-[120px]" />

        <SectionWrapper>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-semibold tracking-tight leading-none mb-6">
              Ready to build
              <br />
              something exceptional?
            </h2>

            <p className="text-white/60 text-base md:text-lg leading-8 max-w-2xl mx-auto mb-10">
              Let’s create a digital experience that looks premium, performs
              beautifully, and helps your brand move with confidence.
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              <Button
                href="/intake"
                variant="aura"
                size="lg"
                className="px-10 py-5 text-sm uppercase tracking-[0.18em] font-semibold"
              >
                Start a project
                <ArrowRight size={18} className="ml-2" />
              </Button>

              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="px-10 py-5 text-sm uppercase tracking-[0.18em] font-semibold"
              >
                Get in touch
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </section>
    </div>
  );
};

export default Home;