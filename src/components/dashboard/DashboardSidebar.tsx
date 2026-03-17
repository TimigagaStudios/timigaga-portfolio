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
    <aside className="w-full lg:w-[260px] shrink-0 rounded-[1.75rem] border border-white/6 glass-dark p-5 lg:p-6 h-fit">
      <div className="mb-8">
        <p className="text-white/35 uppercase tracking-[0.32em] text-[10px] mb-3">
          Internal
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-white">
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
                  ? 'bg-[#95EF90] text-black font-medium'
                  : 'text-white/65 hover:bg-white/5 hover:text-white'
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