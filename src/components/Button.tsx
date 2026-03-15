import React from 'react';
import { Link } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'aura';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-black text-white border-transparent relative overflow-hidden',
  secondary: 'bg-[#8A898A] text-white hover:bg-black border border-transparent',
  accent: 'bg-[#95EF90] text-black hover:bg-white border border-transparent font-semibold',
  outline: 'bg-transparent border border-white/20 text-white hover:bg-white/5',
  ghost: 'bg-transparent text-gray-400 hover:text-white border border-transparent',
  aura: 'bg-black text-white border-transparent relative overflow-hidden',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg font-semibold',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'aura',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}) => {
  const isAura = variant === 'aura' || variant === 'primary';

  const baseClasses = `
    inline-flex items-center justify-center rounded-full
    transition-all duration-300 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-[#95EF90]/50 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]} ${sizes[size]} ${className}
  `;

  const AuraContent = () => (
    <>
      <div className="absolute inset-0 aura-beam opacity-40" />
      <div className="border-beam-container">
        <div className="border-beam !opacity-100" />
      </div>
      <div className="absolute inset-[1px] rounded-full bg-black z-10 dots-pattern opacity-20" />
      <div className="relative z-20 flex items-center gap-2">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#95EF90]/0 via-[#95EF90]/25 to-[#95EF90]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </>
  );

  if (href) {
    if (href.startsWith('http')) {
      return (
        <motion.a
          href={href}
          className={`${baseClasses} group`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.05,
            boxShadow: isAura ? '0 0 35px rgba(149, 239, 144, 0.5)' : 'none',
          }}
          whileTap={{ scale: 0.98 }}
        >
          {isAura ? <AuraContent /> : children}
        </motion.a>
      );
    }

    return (
      <Link to={href}>
        <motion.div
          className={`${baseClasses} group`}
          whileHover={{
            scale: 1.05,
            boxShadow: isAura ? '0 0 35px rgba(149, 239, 144, 0.5)' : 'none',
          }}
          whileTap={{ scale: 0.98 }}
        >
          {isAura ? <AuraContent /> : children}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      className={`${baseClasses} group`}
      {...props}
      whileHover={{
        scale: 1.05,
        boxShadow: isAura ? '0 0 35px rgba(149, 239, 144, 0.5)' : 'none',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {isAura ? <AuraContent /> : children}
    </motion.button>
  );
};

export default Button;