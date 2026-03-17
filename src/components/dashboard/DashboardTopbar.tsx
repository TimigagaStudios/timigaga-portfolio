import React from 'react';

interface DashboardTopbarProps {
  title: string;
  subtitle?: string;
}

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 md:mb-10">
      <p className="text-white/35 uppercase tracking-[0.32em] text-xs mb-3">
        Timigaga Admin
      </p>
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="text-white/55 text-base md:text-lg leading-8 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default DashboardTopbar;