import { motion } from 'framer-motion';
import { Target, Users, Zap } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import Button from '@/components/Button';

const About = () => {
  return (
    <div className="pt-32 bg-black text-white">
      {/* Hero */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter uppercase leading-none">
              BEYOND<br /><span className="text-[#95EF90]">LIMITS.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-6 leading-relaxed max-w-lg uppercase tracking-wide font-semibold">
              Timigaga Studios is a premium digital boutique where cinematic design meets cutting-edge engineering.
            </p>
            <p className="text-gray-500 mb-10 text-sm leading-relaxed font-normal">
              We don't just build websites; we craft digital identities that resonate on an international scale. Our hybrid-remote team leverages AI-augmented workflows to deliver elite results with unprecedented speed and precision.
            </p>
            <Button href="/intake" variant="aura" size="lg" className="px-10 py-4 text-sm uppercase tracking-widest font-bold">
              JOIN THE ELITE
            </Button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
          >
             <img 
               src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
               alt="Timigaga Studio" 
               className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Values */}
      <div className="bg-black py-20 border-y border-white/5">
        <SectionWrapper className="py-0 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Target className="text-[#95EF90]" size={40} />, title: "PRECISION", desc: "Every pixel and every line of code is intentional. We don't do 'good enough'." },
              { icon: <Users className="text-[#95EF90]" size={40} />, title: "PARTNERSHIP", desc: "We are an extension of your team, dedicated to your long-term success." },
              { icon: <Zap className="text-[#95EF90]" size={40} />, title: "VELOCITY", desc: "AI-powered workflows allow us to move at the speed of your vision." }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark p-10 rounded-3xl border border-white/5"
              >
                <div className="mb-6">{v.icon}</div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-normal">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </div>

      {/* Tech Stack */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase">OUR ARSENAL<span className="text-[#95EF90]">.</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm uppercase tracking-widest font-bold">We utilize a world-class technology stack to ensure your product is future-proof.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {['React 19', 'Next.js 15', 'TypeScript', 'Tailwind 4', 'Supabase', 'Framer Motion', 'Gemini AI', 'OpenAI', 'Cursor', 'GitHub', 'Netlify'].map((tech) => (
            <span key={tech} className="px-8 py-4 glass-dark rounded-full text-xs font-black uppercase tracking-widest text-[#95EF90] border border-white/10 hover:border-[#95EF90]/50 transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default About;
