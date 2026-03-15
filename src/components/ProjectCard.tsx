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

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  category,
  image,
  className = '',
}) => {
  return (
    <motion.article
      className={`group relative overflow-hidden rounded-[2rem] glass-dark border border-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] ${className}`}
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-70" />

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              href={`/portfolio/${id}`}
              variant="aura"
              size="sm"
              className="text-[10px] uppercase tracking-[0.16em] font-semibold"
            >
              View Case Study
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-7">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#95EF90] mb-3 block">
          {category}
        </span>

        <h3 className="text-2xl md:text-[1.75rem] font-semibold text-white tracking-[-0.04em] leading-none">
          <Link
            to={`/portfolio/${id}`}
            className="transition-colors duration-300 group-hover:text-[#95EF90]"
          >
            {title}
          </Link>
        </h3>
      </div>
    </motion.article>
  );
};

export default ProjectCard;