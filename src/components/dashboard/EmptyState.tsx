import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <div className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/8 dark:border-white/6 p-6 md:p-8 text-center transition-colors duration-300">
      <h3 className="text-[var(--app-heading)] text-xl font-semibold tracking-tight mb-3">
        {title}
      </h3>
      <p className="text-[var(--app-muted)] leading-8 max-w-xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
