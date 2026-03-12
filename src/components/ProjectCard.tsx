import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './Button';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, category, image, className = '' }) => {
  return (
    <motion.div 
      className={`group relative overflow-hidden rounded-3xl glass-dark shadow-2xl ${className}`}
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60"></div>
        <div className="absolute inset-0 flex items-end p-8">
           <Button href={`/portfolio/${id}`} variant="aura" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] uppercase tracking-widest font-black">
             View Case Study
           </Button>
        </div>
      </div>
      <div className="p-8">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#95EF90] mb-3 block">
          {category}
        </span>
        <h3 className="text-2xl font-bold text-white group-hover:text-[#95EF90] transition-colors leading-none tracking-tight">
          <Link to={`/portfolio/${id}`}>
            {title}
          </Link>
        </h3>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
