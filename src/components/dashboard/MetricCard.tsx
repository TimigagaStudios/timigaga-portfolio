import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change }) => {
  return (
    <div className="rounded-[1.5rem] border border-white/6 glass-dark p-5 md:p-6">
      <p className="text-[11px] uppercase tracking-[0.24em] text-white/40 mb-3">
        {label}
      </p>
      <div className="flex items-end justify-between gap-4">
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
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