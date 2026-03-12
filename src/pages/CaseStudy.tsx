import { useParams } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import { ArrowLeft } from 'lucide-react';
  import SectionWrapper from '@/components/SectionWrapper';
  import Button from '@/components/Button';
  
  const CaseStudy = () => {
    const { id } = useParams();
    console.log("Viewing project:", id);
    
    // Mock data
  const project = {
    title: "QUANTUM PAY FINTECH",
    client: "Nova Finance",
    category: "FINTECH SOLUTIONS",
    year: "2024",
    description: "A comprehensive digital transformation of a legacy banking platform into a cinematic, high-performance financial dashboard.",
    heroImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
    objectives: [
      "Simplify complex financial data streams",
      "Improve transaction speed by 40%",
      "Establish elite visual hierarchy",
      "Full AI-powered fraud detection UI"
    ],
    tools: ["React", "D3.js", "Tailwind 4", "Supabase", "Gemini AI"],
    results: [
      "99.9% uptime achieved",
      "400% increase in user session length",
      "International Design Award 2024"
    ]
  };

  return (
    <div className="pt-32 bg-black text-white min-h-screen">
      <SectionWrapper>
        <div className="mb-12">
          <Button href="/portfolio" variant="ghost" size="sm" className="pl-0 text-gray-500 hover:text-[#95EF90]">
            <ArrowLeft size={16} className="mr-2" /> RETURN TO GALLERY
          </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <span className="text-[#95EF90] font-black tracking-[0.4em] uppercase text-[10px]">{project.category}</span>
            <h1 className="text-5xl md:text-8xl font-black text-white mt-4 mb-8 tracking-tighter leading-none">{project.title}</h1>
          </div>

          <div className="rounded-[3rem] overflow-hidden mb-20 shadow-2xl border border-white/10 aspect-video relative group">
            <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8 space-y-12">
              <div>
                <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Overview</h2>
                <p className="text-2xl text-gray-300 leading-relaxed font-medium uppercase">
                  {project.description}
                </p>
              </div>

              <div>
                <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">The Ambition</h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  Nova Finance came to us with a vision to redefine the digital banking landscape. They needed a platform that didn't just function—it needed to inspire trust through elite aesthetics and seamless performance. We utilized Next.js and D3.js to create a fluid, real-time experience that handles millions of requests with cinematic grace.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-dark p-10 rounded-3xl border border-white/5">
                   <h3 className="text-xl font-black mb-6 tracking-tight uppercase">OBJECTIVES</h3>
                   <ul className="space-y-4">
                     {project.objectives.map((obj, i) => (
                       <li key={i} className="flex items-start text-sm text-gray-400">
                         <div className="w-1.5 h-1.5 bg-[#95EF90] rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                         {obj}
                       </li>
                     ))}
                   </ul>
                </div>
                <div className="glass-dark p-10 rounded-3xl border border-white/5">
                   <h3 className="text-xl font-black mb-6 tracking-tight uppercase">TECH UTILIZED</h3>
                   <div className="flex flex-wrap gap-2">
                    {project.tools.map(tool => (
                      <span key={tool} className="px-4 py-2 bg-white/5 text-[#95EF90] rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 space-y-8">
              <div className="glass-dark p-10 rounded-3xl border border-white/5 sticky top-32">
                <h3 className="text-[10px] font-black text-[#95EF90] uppercase tracking-[0.3em] mb-8">Metrics & Impact</h3>
                <ul className="space-y-8">
                  {project.results.map((result, idx) => (
                    <li key={idx} className="group">
                      <p className="text-3xl font-black text-white group-hover:text-[#95EF90] transition-colors leading-none mb-2 tracking-tighter">{result.split(' ')[0]}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{result.split(' ').slice(1).join(' ')}</p>
                    </li>
                  ))}
                </ul>
                <hr className="my-10 border-white/5" />
                <Button href="/intake" variant="aura" size="lg" className="w-full text-[10px] uppercase tracking-[0.2em] font-black">
                  START YOUR PROJECT
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
};

export default CaseStudy;
