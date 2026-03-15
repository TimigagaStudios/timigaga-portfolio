import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  className = '',
}) => {
  return (
    <motion.div
      className={`group rounded-[2rem] glass-dark border border-white/6 p-7 md:p-8 transition-all duration-500 hover:border-[#95EF90]/25 shadow-[0_18px_50px_rgba(0,0,0,0.22)] ${className}`}
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div className="mb-7 inline-flex rounded-2xl bg-white/5 p-4 text-[#95EF90] transition-all duration-500 group-hover:bg-[#95EF90] group-hover:text-black">
        {icon}
      </div>

      <h3 className="text-2xl md:text-[1.7rem] font-semibold tracking-[-0.04em] text-white mb-4 leading-tight">
        {title}
      </h3>

      <p className="text-white/60 mb-8 leading-8 text-sm md:text-[15px]">
        {description}
      </p>

      <div className="inline-flex items-center gap-2 text-[#95EF90] text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 cursor-pointer group-hover:gap-3">
        <span>Discover Service</span>
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;