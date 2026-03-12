import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import Button from '@/components/Button';

const Contact = () => {
  return (
    <div className="pt-32 bg-black text-white">
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter uppercase leading-tight">
              SAY<br />HELLO<span className="text-[#95EF90]">.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed uppercase tracking-wide font-semibold">
              We're excited to hear from you. Whether you have a clear vision or just an idea, our experts are ready to collaborate.
            </p>
            <div className="space-y-8">
              <div className="flex items-center text-gray-300 group cursor-pointer">
                <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center mr-6 group-hover:bg-[#95EF90] group-hover:text-black transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Email Us</p>
                  <a href="mailto:hello@timigaga.com" className="text-xl font-bold hover:text-[#95EF90] transition-colors tracking-tight">hello@timigaga.com</a>
                </div>
              </div>
              <div className="flex items-center text-gray-300 group cursor-pointer">
                <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center mr-6 group-hover:bg-[#95EF90] group-hover:text-black transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Call Us</p>
                  <a href="tel:+1234567890" className="text-xl font-bold hover:text-[#95EF90] transition-colors tracking-tight">+1 (234) 567-890</a>
                </div>
              </div>
              <div className="flex items-center text-gray-300">
                <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center mr-6">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Office</p>
                  <span className="text-xl font-bold tracking-tight">Remote / Worldwide</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-dark p-10 md:p-14 rounded-[3rem] text-center border border-white/5 shadow-2xl"
          >
            <h2 className="text-3xl font-black text-white mb-6 tracking-tight uppercase">Ready to get started?</h2>
            <p className="text-gray-400 mb-10 text-sm leading-relaxed uppercase tracking-widest font-bold">
              Skip the back-and-forth email and fill out our detailed intake form.
            </p>
            <Button href="/intake" variant="aura" size="lg" className="w-full uppercase tracking-[0.2em] font-black text-sm py-6">
              START PROJECT INTAKE
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Contact;
