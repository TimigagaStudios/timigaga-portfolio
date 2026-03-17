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
  project_category: string;
  budget?: string;
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
          throw new Error(result?.error || 'Failed to fetch dashboard data');
        }

        setRequests(result.data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load dashboard data right now.');
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

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Studio Overview"
        subtitle="Monitor client requests, project momentum, business activity, and lead flow from your internal Timigaga command center."
      />

      {loading ? (
        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6 text-white/55">
          Loading dashboard data...
        </div>
      ) : error ? (
        <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
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
            <div className="xl:col-span-2 rounded-[1.75rem] border border-white/6 glass-dark p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                  Recent Requests
                </h2>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                  Live data
                </span>
              </div>

              {recentRequests.length === 0 ? (
                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5 text-white/50">
                  No requests yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentRequests.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div>
                        <h3 className="text-white font-medium text-lg">{item.name}</h3>
                        <p className="text-white/50 text-sm mt-1">
                          {item.project_category} • {item.budget || 'No budget set'}
                        </p>
                        {item.company && (
                          <p className="text-white/35 text-sm mt-1">{item.company}</p>
                        )}
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
                Quick Summary
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Top Service Category
                  </p>
                  <p className="text-white text-lg">{topCategory}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Conversion Rate
                  </p>
                  <p className="text-white text-lg">{conversionRate}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Latest Request
                  </p>
                  <p className="text-white text-lg">
                    {recentRequests[0]?.name || '—'}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Next Priority
                  </p>
                  <p className="text-white/65 leading-7">
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