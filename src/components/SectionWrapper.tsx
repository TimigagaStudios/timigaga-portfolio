import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = '', id, fullWidth = false }) => {
  if (fullWidth) {
    return (
      <section id={id} className={`w-full ${className}`}>
        {children}
      </section>
    );
  }
  
  return (
    <section id={id} className={`w-full py-2 md:py-4 px-4 md:px-8 lg:px-12 mx-auto max-w-7xl ${className}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;
