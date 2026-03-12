import { motion } from 'framer-motion';
import { Code, Smartphone, Palette, PenTool, Image, Camera, Share2, TrendingUp, Layers } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import ServiceCard from '@/components/ServiceCard';
import Button from '@/components/Button';

const services = [
  { title: 'Web Design', description: 'Creating stunning, responsive websites that captivate your audience.', icon: <Code size={32} /> },
  { title: 'App Development', description: 'Building native and cross-platform mobile applications.', icon: <Smartphone size={32} /> },
  { title: 'Branding', description: 'Developing unique brand identities that resonate with your market.', icon: <Palette size={32} /> },
  { title: 'UI/UX Design', description: 'Designing intuitive user interfaces and seamless user experiences.', icon: <PenTool size={32} /> },
  { title: 'Graphic Design', description: 'Visual communication through typography, photography, and illustration.', icon: <Image size={32} /> },
  { title: 'Photography', description: 'Professional photography services for products, events, and more.', icon: <Camera size={32} /> },
  { title: 'Cinematography', description: 'High-quality video production to tell your brand story.', icon: <Layers size={32} /> },
  { title: 'Social Media', description: 'Strategic social media management and content creation.', icon: <Share2 size={32} /> },
  { title: 'Digital Marketing', description: 'Data-driven marketing strategies to grow your business.', icon: <TrendingUp size={32} /> },
];

const Services = () => {
  return (
    <div className="pt-32 pb-20 bg-black">
      <SectionWrapper>
        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter uppercase"
          >
            SERVICES<span className="text-[#95EF90]">.</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed uppercase tracking-wide font-semibold">
            We merge design intuition with technical mastery to deliver products that redefine industry standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <ServiceCard {...service} className="h-full" />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center glass-dark p-12 md:p-20 rounded-[3rem]">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Looking for more?</h2>
          <p className="mb-10 text-gray-400 max-w-xl mx-auto text-base">We create bespoke solutions for unique challenges. Let's discuss your specific needs and build something exceptional.</p>
          <Button href="/contact" variant="aura" size="lg" className="px-12 py-5 text-sm uppercase tracking-[0.2em] font-black">GET A CUSTOM QUOTE</Button>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Services;
