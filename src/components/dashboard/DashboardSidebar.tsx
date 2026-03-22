import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Overview', path: '/dashboard' },
  { label: 'Requests', path: '/dashboard/requests' },
  { label: 'Projects', path: '/dashboard/projects' },
  { label: 'Revenue', path: '/dashboard/revenue' },
  { label: 'Analytics', path: '/dashboard/analytics' },
  { label: 'Settings', path: '/dashboard/settings' },
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-full lg:w-[260px] shrink-0 rounded-[1.75rem] glass-dark p-5 lg:p-6 h-fit shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-colors duration-300">
      <div className="mb-8">
        <p className="text-[var(--app-muted)] uppercase tracking-[0.32em] text-[10px] mb-3">
          Internal
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-[var(--app-heading)]">
          Dashboard
        </h2>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-xl px-4 py-3 text-sm transition-all ${
                isActive
                  ? 'bg-[#95EF90] text-black font-medium shadow-[0_10px_24px_rgba(149,239,144,0.18)]'
                  : 'text-[var(--app-muted)] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--app-heading)]'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
