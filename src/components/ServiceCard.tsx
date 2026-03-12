import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, className = '' }) => {
  return (
    <motion.div 
      className={`glass-dark p-10 rounded-3xl border border-white/5 hover:border-[#95EF90]/30 transition-all duration-500 group ${className}`}
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-8 p-5 rounded-2xl bg-white/5 text-[#95EF90] inline-block group-hover:bg-[#95EF90] group-hover:text-black transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{title}</h3>
      <p className="text-gray-400 mb-8 leading-relaxed text-sm font-normal">{description}</p>
      <div className="flex items-center text-[#95EF90] font-semibold text-xs tracking-widest uppercase group-hover:gap-3 transition-all duration-300 cursor-pointer">
        <span>Discover Service</span>
        <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-2" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
