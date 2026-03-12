import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, PenTool, Zap } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import Button from '@/components/Button';
import ProjectCard from '@/components/ProjectCard';
import ServiceCard from '@/components/ServiceCard';

const Home = () => {
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative min-h-screen flex items-center justify-center py-10 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-90 z-1"></div>
        <div className="absolute inset-0 dots-pattern opacity-[0.05] z-0"></div>
        
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#95EF90]/5 rounded-full blur-[120px] z-0"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, -30, 0],
            scale: [1, 1.3, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#8A898A]/5 rounded-full blur-[150px] z-0"
        />

        {/* Giant Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center z-0 select-none overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[20vw] font-black tracking-tighter text-outline whitespace-nowrap font-heading"
          >
            TIMIGAGA
          </motion.h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 pt-20 lg:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Creative DNA Card */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-dark p-6 md:p-8 rounded-3xl"
              >
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#95EF90] mb-4 font-heading">Creative DNA</h3>
                <div className="flex gap-6 mb-6">
                  <div>
                    <span className="text-xl md:text-2xl font-black block font-heading">150+</span>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase font-heading">Projects</span>
                  </div>
                  <div>
                    <span className="text-xl md:text-2xl font-black block font-heading">10+</span>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase font-heading">Awards</span>
                  </div>
                  <div>
                    <span className="text-xl md:text-2xl font-black block font-heading">1</span>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase font-heading">Obsession</span>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base font-body">
                  We are a fusion of art and technology, building high-performance digital systems that command respect on the global stage.
                </p>
              </motion.div>

              {/* Portfolio Link Card */}
              <Link to="/portfolio">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="glass-dark p-6 rounded-3xl flex items-center gap-6 group cursor-pointer border border-white/5 hover:border-[#95EF90]/30 transition-all"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-[20%] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform group-hover:scale-105 shrink-0">
                    <span className="text-black font-black text-2xl md:text-3xl leading-none pt-1 font-heading">T</span>
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tight font-heading text-sm md:text-base">VIEW PORTFOLIO</h4>
                    <p className="text-[10px] md:text-xs text-[#95EF90] font-bold uppercase tracking-widest opacity-80 font-heading">Click to explore our work</p>
                  </div>
                  <ArrowRight className="ml-auto text-gray-500 group-hover:translate-x-1 transition-transform group-hover:text-[#95EF90]" />
                </motion.div>
              </Link>

              {/* Tech Arsenal Card */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glass-dark p-6 md:p-8 rounded-3xl"
              >
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#95EF90] mb-6 font-heading">Tech Arsenal</h3>
                <div className="grid grid-cols-4 gap-y-10 gap-x-4 grayscale group">
                   {/* Row 1 */}
                   <div className="flex items-center justify-center">
                     <svg viewBox="0 0 24 24" className="h-7 w-auto text-white hover:text-[#95EF90] transition-all" fill="currentColor">
                       <path d="M13.4,12l6.2,6.2l-1.4,1.4L12,13.4l-6.2,6.2l-1.4,-1.4L10.6,12L4.4,5.8l1.4,-1.4L12,10.6l6.2,-6.2l1.4,1.4L13.4,12z"/>
                     </svg>
                   </div>
                   <img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" alt="GitHub" className="h-7 w-auto mx-auto invert group-hover:grayscale-0 transition-all" />
                   <img src="https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg" alt="Netlify" className="h-7 w-auto mx-auto group-hover:grayscale-0 transition-all" />
                   <div className="flex items-center justify-center">
                     <svg viewBox="0 0 24 24" className="h-7 w-auto text-white hover:text-[#95EF90] transition-all" fill="currentColor">
                       <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/>
                     </svg>
                   </div>
                   
                   {/* Row 2 */}
                   <img src="https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" alt="Supabase" className="h-7 w-auto mx-auto group-hover:grayscale-0 transition-all" />
                   <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="Tailwind" className="h-7 w-auto mx-auto group-hover:grayscale-0 transition-all" />
                   <img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" alt="React" className="h-7 w-auto mx-auto group-hover:grayscale-0 transition-all" />
                   <img src="https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg" alt="VSCode" className="h-7 w-auto mx-auto group-hover:grayscale-0 transition-all" />
                </div>
              </motion.div>
            </div>

            {/* Middle Portrait Column */}
            <div className="lg:col-span-3 flex justify-center relative">
               <motion.div 
                 initial={{ opacity: 0, y: 100 }}
                 animate={{ 
                   opacity: 1, 
                   y: [0, -20, 0],
                 }}
                 transition={{ 
                   opacity: { duration: 1 },
                   y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                 }}
                 className="relative z-10"
               >
                 {/* Glow behind portrait */}
                 <div className="absolute inset-0 bg-[#95EF90]/10 blur-[100px] rounded-full scale-150"></div>

                 <div className="w-[300px] h-[450px] bg-gradient-to-b from-gray-900 to-black rounded-full overflow-hidden border-2 border-white/10 relative shadow-2xl z-20">
                    <img 
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop" 
                      alt="Creative Director" 
                      className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700 scale-105"
                    />
                 </div>
                 {/* Circular Text Badge */}
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -right-16 -translate-y-1/2 w-44 h-44 flex items-center justify-center z-30 pointer-events-none"
                 >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#95EF90] font-black fill-current opacity-80">
                      <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                      <text fontSize="7.5" className="tracking-[0.25em] uppercase">
                        <textPath href="#circlePath">BUILD • DESIGN • INNOVATE • PREMIUM STUDIO • </textPath>
                      </text>
                    </svg>
                 </motion.div>
               </motion.div>
            </div>

            {/* Right Column (Journey & Skills) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-dark p-8 rounded-3xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black">CREATIVE JOURNEY</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Experience Path</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-[#95EF90]/40 pl-4 py-1">
                    <h4 className="text-sm font-bold text-[#95EF90]">LEAD AI DEVELOPER</h4>
                    <p className="text-xs font-medium text-gray-300">Timigaga Studios</p>
                    <p className="text-[10px] text-gray-500 uppercase">2021 — PRESENT</p>
                  </div>
                  <div className="border-l-2 border-white/10 pl-4 py-1">
                    <h4 className="text-sm font-bold text-gray-200">SENIOR DESIGN STRATEGIST</h4>
                    <p className="text-xs font-medium text-gray-400">International Media Group</p>
                    <p className="text-[10px] text-gray-500 uppercase">2018 — 2021</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-dark p-6 md:p-8 rounded-3xl"
              >
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#95EF90] mb-6 font-heading">Mastery</h3>
                <div className="flex flex-wrap gap-2">
                  {['Next.js 15', 'Branding', 'UI Architecture', 'AI Engineering', 'Cinematography', '3D Interaction', 'Product Strategy'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-[10px] font-bold text-gray-300 hover:border-[#95EF90]/50 transition-colors cursor-default uppercase tracking-widest font-heading">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 relative bg-black">
         <SectionWrapper>
           <div className="mb-12 text-center">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter uppercase"
             >
               EXPERTISE<span className="text-[#95EF90]">.</span>
             </motion.h2>
             <p className="text-gray-400 max-w-2xl mx-auto text-sm uppercase tracking-widest font-semibold">We redefine the boundaries of digital possibility.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <ServiceCard 
               title="ECOMMERCE ELITE" 
               description="Hyper-fast storefronts built on Next.js 15 for brands that demand performance."
               icon={<Code size={32} />}
             />
             <ServiceCard 
               title="CINEMATIC BRANDING" 
               description="Visual identities that command authority and communicate international scale."
               icon={<PenTool size={32} />}
             />
             <ServiceCard 
               title="AI ARCHITECTURE" 
               description="Integrating LLMs and custom AI workflows to automate elite studio production."
               icon={<Zap size={32} />}
             />
           </div>
         </SectionWrapper>
      </section>

      {/* Projects Section */}
      <section className="py-16 relative bg-black">
         <SectionWrapper>
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
             <div>
               <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter uppercase">SELECTED WORK<span className="text-[#95EF90]">.</span></h2>
               <p className="text-gray-500 text-xs font-semibold uppercase tracking-[0.3em]">A legacy of digital excellence.</p>
             </div>
             <Button href="/portfolio" variant="aura" size="md" className="uppercase tracking-[0.2em] font-bold text-[10px] px-10">
               THE FULL ARCHIVE
             </Button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <ProjectCard 
               id="architectural-boutique"
               title="STRUCTURA" 
               category="WEB ARCHITECTURE" 
               image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
             />
             <ProjectCard 
               id="ai-music-platform"
               title="SONIC.AI" 
               category="AI PLATFORM" 
               image="https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2070&auto=format&fit=crop"
             />
           </div>
         </SectionWrapper>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#95EF90]/5 rounded-full blur-[120px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter uppercase leading-none">BUILD THE<br />FUTURE<span className="text-[#95EF90]">.</span></h2>
          <p className="text-lg text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed uppercase tracking-wide font-normal">
            Join the elite circle of founders who choose Timigaga for world-class digital production.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button href="/intake" variant="aura" size="lg" className="px-12 py-5 text-sm uppercase tracking-[0.2em] font-bold">
              START A PROJECT <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="px-12 py-5 text-sm uppercase tracking-[0.2em] font-bold">GET IN TOUCH</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
