import { useEffect, useMemo, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import MetricCard from '@/components/dashboard/MetricCard';
import StatusBadge from '@/components/dashboard/StatusBadge';

type ClientRequest = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  project_category: string;
  budget?: string;
  budget_amount?: number | null;
  budget_currency?: string | null;
  budget_display?: string | null;
  style_preference?: string;
  theme?: string;
  message: string;
  status: string;
  reference_images?: string[];
  created_at: string;
};

const DashboardPage = () => {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/api/requests');
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.error || `Request failed with status ${response.status}`);
        }

        setRequests(result.data || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown dashboard error');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const metrics = useMemo(() => {
    const totalRequests = requests.length;
    const pendingRequests = requests.filter(
      (request) => request.status?.toLowerCase() === 'pending'
    ).length;
    const contactedRequests = requests.filter(
      (request) => request.status?.toLowerCase() === 'contacted'
    ).length;
    const closedRequests = requests.filter(
      (request) => request.status?.toLowerCase() === 'closed'
    ).length;

    return {
      totalRequests,
      pendingRequests,
      contactedRequests,
      closedRequests,
    };
  }, [requests]);

  const recentRequests = useMemo(() => {
    return requests.slice(0, 5);
  }, [requests]);

  const topCategory = useMemo(() => {
    if (requests.length === 0) return '—';

    const counts: Record<string, number> = {};

    requests.forEach((request) => {
      const category = request.project_category || 'Unknown';
      counts[category] = (counts[category] || 0) + 1;
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }, [requests]);

  const conversionRate = useMemo(() => {
    if (requests.length === 0) return '0%';

    const closed = requests.filter(
      (request) => request.status?.toLowerCase() === 'closed'
    ).length;

    const rate = (closed / requests.length) * 100;
    return `${rate.toFixed(1)}%`;
  }, [requests]);

  const subCardClasses =
    'rounded-2xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/8 dark:border-white/6 p-4 md:p-5 transition-colors duration-300';

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Studio Overview"
        subtitle="Monitor client requests, project momentum, business activity, and lead flow from your internal Timigaga command center."
      />

      {loading ? (
        <div className="rounded-[1.75rem] glass-dark p-6 text-[var(--app-muted)]">
          Loading dashboard data...
        </div>
      ) : error ? (
        <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          <p className="font-semibold mb-2">Dashboard failed to load</p>
          <p className="text-sm break-words">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-8">
            <MetricCard label="Total Requests" value={String(metrics.totalRequests)} />
            <MetricCard label="Pending Reviews" value={String(metrics.pendingRequests)} />
            <MetricCard label="Contacted" value={String(metrics.contactedRequests)} />
            <MetricCard label="Closed Deals" value={String(metrics.closedRequests)} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 rounded-[1.75rem] glass-dark p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-colors duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--app-heading)]">
                  Recent Requests
                </h2>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--app-muted)]">
                  Live data
                </span>
              </div>

              {recentRequests.length === 0 ? (
                <div className={subCardClasses}>
                  <p className="text-[var(--app-muted)]">No requests yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentRequests.map((item) => (
                    <div key={item.id} className={subCardClasses}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-[var(--app-heading)] font-medium text-lg">
                            {item.name}
                          </h3>
                          <p className="text-[var(--app-muted)] text-sm mt-1">
                            {item.project_category} •{' '}
                            {item.budget_display || item.budget || 'No budget set'}
                          </p>
                          {item.company && (
                            <p className="text-[var(--app-muted)] text-sm mt-1">
                              {item.company}
                            </p>
                          )}
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[1.75rem] glass-dark p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-colors duration-300">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--app-heading)] mb-6">
                Quick Summary
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-2">
                    Top Service Category
                  </p>
                  <p className="text-[var(--app-heading)] text-lg">{topCategory}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-2">
                    Conversion Rate
                  </p>
                  <p className="text-[var(--app-heading)] text-lg">{conversionRate}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-2">
                    Latest Request
                  </p>
                  <p className="text-[var(--app-heading)] text-lg">
                    {recentRequests[0]?.name || '—'}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-2">
                    Next Priority
                  </p>
                  <p className="text-[var(--app-muted)] leading-7">
                    Review pending requests, qualify serious leads, and move
                    them into projects or revenue tracking as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  );
};

export default DashboardPage;
