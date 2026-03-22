import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  reviewed: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  contacted: 'bg-green-500/10 text-green-300 border-green-500/20',
  closed: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20',
  active: 'bg-green-500/10 text-green-300 border-green-500/20',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = status.toLowerCase();
  const styles =
    statusStyles[normalized] ||
    'bg-black/[0.03] dark:bg-white/5 text-[var(--app-muted)] border-black/8 dark:border-white/10';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${styles}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
