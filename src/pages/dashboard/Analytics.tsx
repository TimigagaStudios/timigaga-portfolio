import { useEffect, useMemo, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import MetricCard from '@/components/dashboard/MetricCard';
import { getAuthHeaders } from '@/lib/auth';

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

const AnalyticsPage = () => {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError('');

        const headers = await getAuthHeaders();

        const response = await fetch('/api/requests', {
          headers,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.error || 'Failed to fetch analytics data');
        }

        setRequests(result.data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load analytics data right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const totalRequests = requests.length;

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      pending: 0,
      reviewed: 0,
      contacted: 0,
      closed: 0,
    };

    requests.forEach((request) => {
      const status = request.status?.toLowerCase();
      if (counts[status] !== undefined) {
        counts[status] += 1;
      }
    });

    return counts;
  }, [requests]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    requests.forEach((request) => {
      const category = request.project_category || 'Unknown';
      counts[category] = (counts[category] || 0) + 1;
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [requests]);

  const themeCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    requests.forEach((request) => {
      const theme = request.theme?.trim() || 'Not specified';
      counts[theme] = (counts[theme] || 0) + 1;
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [requests]);

  const requestsWithBudget = useMemo(() => {
    return requests.filter(
      (request) =>
        request.budget_amount !== null &&
        request.budget_amount !== undefined
    ).length;
  }, [requests]);

  const contactedRate = totalRequests
    ? ((statusCounts.contacted / totalRequests) * 100).toFixed(1)
    : '0.0';

  const closedRate = totalRequests
    ? ((statusCounts.closed / totalRequests) * 100).toFixed(1)
    : '0.0';

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Analytics"
        subtitle="Understand request flow, category demand, conversion momentum, and client preference signals from your live intake data."
      />

      {loading ? (
        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6 text-white/55">
          Loading analytics...
        </div>
      ) : error ? (
        <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-8">
            <MetricCard label="Total Requests" value={String(totalRequests)} />
            <MetricCard label="Contacted Rate" value={`${contactedRate}%`} />
            <MetricCard label="Closed Rate" value={`${closedRate}%`} />
            <MetricCard label="Requests With Budget" value={String(requestsWithBudget)} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
                Status Distribution
              </h2>

              <div className="space-y-4">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4"
                  >
                    <span className="text-white/70 capitalize">{status}</span>
                    <span className="text-white text-lg font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
                Service Demand
              </h2>

              {categoryCounts.length === 0 ? (
                <p className="text-white/50">No category data available.</p>
              ) : (
                <div className="space-y-4">
                  {categoryCounts.map(([category, count]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4"
                    >
                      <span className="text-white/70">{category}</span>
                      <span className="text-white text-lg font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
                Theme Preference
              </h2>

              {themeCounts.length === 0 ? (
                <p className="text-white/50">No theme data available.</p>
              ) : (
                <div className="space-y-4">
                  {themeCounts.map(([theme, count]) => (
                    <div
                      key={theme}
                      className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4"
                    >
                      <span className="text-white/70">{theme}</span>
                      <span className="text-white text-lg font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/6 glass-dark p-6">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
              Insight Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                  Highest Demand Category
                </p>
                <p className="text-white text-xl font-semibold">
                  {categoryCounts[0]?.[0] || '—'}
                </p>
              </div>

              <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                  Most Common Theme Preference
                </p>
                <p className="text-white text-xl font-semibold">
                  {themeCounts[0]?.[0] || '—'}
                </p>
              </div>

              <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                  Request Health
                </p>
                <p className="text-white/70 leading-8">
                  {statusCounts.pending > statusCounts.contacted
                    ? 'More requests are still waiting for review. Prioritize response speed to improve conversions.'
                    : 'Request handling is moving in a healthier direction with more reviewed/contacted records.'}
                </p>
              </div>

              <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                  Revenue Readiness
                </p>
                <p className="text-white/70 leading-8">
                  {requestsWithBudget > 0
                    ? 'Budget normalization is active. Revenue tracking can now expand safely by currency.'
                    : 'Budget normalization data is still limited. Continue collecting richer request details.'}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  );
};

export default AnalyticsPage;