import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 md:p-8 text-center">
      <h3 className="text-white text-xl font-semibold tracking-tight mb-3">
        {title}
      </h3>
      <p className="text-white/50 leading-8 max-w-xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;