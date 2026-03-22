import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change }) => {
  return (
    <div className="rounded-[1.5rem] glass-dark p-5 md:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-colors duration-300">
      <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--app-muted)] mb-3">
        {label}
      </p>
      <div className="flex items-end justify-between gap-4">
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--app-heading)]">
          {value}
        </h3>
        {change && (
          <span className="text-sm text-[#95EF90] font-medium">{change}</span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
