import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import ProjectCard from '@/components/ProjectCard';
import Button from '@/components/Button';

const projects = [
  { id: '1', title: 'FinTech Dashboard', category: 'Apps', image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop' },
  { id: '2', title: 'Luxury Real Estate', category: 'Web', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' },
  { id: '3', title: 'Neo Commerce', category: 'Web', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' },
  { id: '4', title: 'Vanguard Health', category: 'Branding', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop' },
  { id: '5', title: 'Atlas Travel', category: 'UI/UX', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop' },
  { id: '6', title: 'Zenith Identity', category: 'Branding', image: 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=2070&auto=format&fit=crop' },
];

const categories = ['All', 'Web', 'Apps', 'Branding', 'UI/UX'];

const Portfolio = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(project => 
    filter === 'All' ? true : project.category === filter
  );

  return (
    <div className="pt-32 pb-20 bg-black">
      <SectionWrapper>
        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter uppercase"
          >
            SELECTED<br />WORKS<span className="text-[#95EF90]">.</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed uppercase tracking-wide font-semibold">
            A curated showcase of digital experiences and identity systems crafted for global standards.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-white/5 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-300 relative py-2 cursor-pointer ${
                filter === cat 
                  ? 'text-[#95EF90]' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#95EF90]" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-20 text-center glass-dark p-12 md:p-20 rounded-[3rem]">
          <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase">READY TO BUILD YOUR WORLD?</h3>
          <Button href="/intake" variant="aura" size="lg" className="px-12 py-5 text-sm uppercase tracking-[0.2em] font-black">START A PROJECT</Button>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Portfolio;
