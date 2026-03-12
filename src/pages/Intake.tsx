import { motion } from 'framer-motion';
import SectionWrapper from '@/components/SectionWrapper';
import IntakeForm from '@/components/IntakeForm';

const Intake = () => {
  return (
    <div className="pt-32 bg-black min-h-screen">
      <SectionWrapper>
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase"
          >
            START YOUR<br />PROJECT<span className="text-[#95EF90]">.</span>
          </motion.h1>
          <p className="text-xl text-gray-400 uppercase tracking-wide font-medium">
            Please fill out the form below to help us understand your vision. 
            We'll get back to you with a proposal within 24 hours.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <IntakeForm />
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Intake;
