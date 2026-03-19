import React from 'react';

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  subtitle,
  children,
  rightSlot,
}) => {
  return (
    <div className="rounded-[1.75rem] border border-white/6 glass-dark p-5 md:p-6">
      {(title || subtitle || rightSlot) && (
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            {title && (
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-white/45 text-sm md:text-base leading-7 mt-2 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          {rightSlot && <div>{rightSlot}</div>}
        </div>
      )}

      {children}
    </div>
  );
};

export default SectionCard;