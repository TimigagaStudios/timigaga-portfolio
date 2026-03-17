import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import MetricCard from '@/components/dashboard/MetricCard';
import StatusBadge from '@/components/dashboard/StatusBadge';

const recentRequests = [
  {
    name: 'TradeCore Academy',
    service: 'Web Design',
    budget: '$15,000',
    status: 'pending',
  },
  {
    name: 'Luxe Habitat',
    service: 'Brand Identity',
    budget: '$8,000',
    status: 'reviewed',
  },
  {
    name: 'Nova Reach',
    service: 'AI Workflow System',
    budget: '$20,000',
    status: 'contacted',
  },
];

const DashboardPage = () => {
  return (
    <DashboardShell>
      <DashboardTopbar
        title="Studio Overview"
        subtitle="Monitor client requests, project momentum, performance, and business health from one premium internal command center."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-8">
        <MetricCard label="Total Requests" value="128" change="+12%" />
        <MetricCard label="Pending Reviews" value="14" change="+4" />
        <MetricCard label="Active Projects" value="9" change="+2" />
        <MetricCard label="Monthly Revenue" value="$12.4k" change="+18%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-[1.75rem] border border-white/6 glass-dark p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
              Recent Requests
            </h2>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/35">
              Latest activity
            </span>
          </div>

          <div className="space-y-4">
            {recentRequests.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h3 className="text-white font-medium text-lg">{item.name}</h3>
                  <p className="text-white/50 text-sm mt-1">
                    {item.service} • {item.budget}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
            Quick Summary
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                Best Performing Service
              </p>
              <p className="text-white text-lg">Web Design & Development</p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                Average Deal Size
              </p>
              <p className="text-white text-lg">$6,800</p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                Conversion Rate
              </p>
              <p className="text-white text-lg">18.4%</p>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                Next Priority
              </p>
              <p className="text-white/65 leading-7">
                Review pending intake submissions and move qualified leads into
                project or revenue tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default DashboardPage;