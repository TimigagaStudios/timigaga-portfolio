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

type CurrencyTotals = {
  currency: string;
  total: number;
};

const RevenuePage = () => {
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
          throw new Error(result?.error || 'Failed to fetch revenue data');
        }

        setRequests(result.data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load revenue data right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const budgetRequests = useMemo(() => {
    return requests.filter(
      (request) =>
        request.budget_amount !== null &&
        request.budget_amount !== undefined &&
        request.budget_currency
    );
  }, [requests]);

  const closedRequests = useMemo(() => {
    return budgetRequests.filter(
      (request) => request.status?.toLowerCase() === 'closed'
    );
  }, [budgetRequests]);

  const pendingPipelineRequests = useMemo(() => {
    return budgetRequests.filter(
      (request) => request.status?.toLowerCase() !== 'closed'
    );
  }, [budgetRequests]);

  const groupedPipelineTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    budgetRequests.forEach((request) => {
      const currency = request.budget_currency || 'Unknown';
      const amount = Number(request.budget_amount || 0);
      totals[currency] = (totals[currency] || 0) + amount;
    });

    return Object.entries(totals).map(([currency, total]) => ({
      currency,
      total,
    }));
  }, [budgetRequests]);

  const groupedClosedTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    closedRequests.forEach((request) => {
      const currency = request.budget_currency || 'Unknown';
      const amount = Number(request.budget_amount || 0);
      totals[currency] = (totals[currency] || 0) + amount;
    });

    return Object.entries(totals).map(([currency, total]) => ({
      currency,
      total,
    }));
  }, [closedRequests]);

  const currenciesTracked = useMemo(() => {
    return [...new Set(budgetRequests.map((item) => item.budget_currency).filter(Boolean))];
  }, [budgetRequests]);

  const formatCurrency = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `${currency} ${amount}`;
    }
  };

  const subCardClasses =
    'rounded-2xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/8 dark:border-white/6 p-4 transition-colors duration-300';

  const tableCellBase =
    'border-y border-black/8 dark:border-white/6 transition-colors duration-300';

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Revenue"
        subtitle="Track budget pipeline, closed deal value, and request-based revenue signals grouped properly by currency."
      />

      {loading ? (
        <div className="rounded-[1.75rem] glass-dark p-6 text-[var(--app-muted)]">
          Loading revenue data...
        </div>
      ) : error ? (
        <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-8">
            <MetricCard
              label="Requests with Budget"
              value={String(budgetRequests.length)}
            />
            <MetricCard
              label="Pending Pipeline"
              value={String(pendingPipelineRequests.length)}
            />
            <MetricCard
              label="Closed Deals"
              value={String(closedRequests.length)}
            />
            <MetricCard
              label="Currencies Tracked"
              value={String(currenciesTracked.length)}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <div className="rounded-[1.75rem] glass-dark p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-colors duration-300">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--app-heading)] mb-6">
                Pipeline Value by Currency
              </h2>

              {groupedPipelineTotals.length === 0 ? (
                <p className="text-[var(--app-muted)]">No normalized budget data yet.</p>
              ) : (
                <div className="space-y-4">
                  {groupedPipelineTotals.map((item: CurrencyTotals) => (
                    <div
                      key={`pipeline-${item.currency}`}
                      className={subCardClasses}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-1">
                            {item.currency}
                          </p>
                          <p className="text-[var(--app-heading)] text-xl font-semibold">
                            {formatCurrency(item.total, item.currency)}
                          </p>
                        </div>
                        <span className="text-[var(--app-muted)] text-sm">Pipeline</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[1.75rem] glass-dark p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-colors duration-300">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--app-heading)] mb-6">
                Closed Value by Currency
              </h2>

              {groupedClosedTotals.length === 0 ? (
                <p className="text-[var(--app-muted)]">No closed deal values yet.</p>
              ) : (
                <div className="space-y-4">
                  {groupedClosedTotals.map((item: CurrencyTotals) => (
                    <div
                      key={`closed-${item.currency}`}
                      className={subCardClasses}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-1">
                            {item.currency}
                          </p>
                          <p className="text-[var(--app-heading)] text-xl font-semibold">
                            {formatCurrency(item.total, item.currency)}
                          </p>
                        </div>
                        <span className="text-[#95EF90] text-sm">Closed</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.75rem] glass-dark p-5 md:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--app-heading)]">
                Budget Requests
              </h2>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--app-muted)]">
                Live data
              </span>
            </div>

            {budgetRequests.length === 0 ? (
              <div className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/8 dark:border-white/6 p-6 text-[var(--app-muted)] transition-colors duration-300">
                No budget-carrying requests found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] font-medium px-4">
                        Client
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] font-medium px-4">
                        Category
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] font-medium px-4">
                        Country
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] font-medium px-4">
                        Budget
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] font-medium px-4">
                        Currency
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] font-medium px-4">
                        Amount
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] font-medium px-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {budgetRequests.map((request) => (
                      <tr key={request.id} className="bg-black/[0.03] dark:bg-white/[0.02] transition-colors duration-300">
                        <td className={`px-4 py-4 rounded-l-2xl border-l ${tableCellBase}`}>
                          <div>
                            <p className="text-[var(--app-heading)] font-medium">
                              {request.name}
                            </p>
                            <p className="text-[var(--app-muted)] text-sm mt-1">
                              {request.email}
                            </p>
                          </div>
                        </td>

                        <td className={`px-4 py-4 ${tableCellBase} text-[var(--app-heading)]`}>
                          {request.project_category}
                        </td>

                        <td className={`px-4 py-4 ${tableCellBase} text-[var(--app-muted)]`}>
                          {request.country || '—'}
                        </td>

                        <td className={`px-4 py-4 ${tableCellBase} text-[var(--app-heading)]`}>
                          {request.budget_display || request.budget || '—'}
                        </td>

                        <td className={`px-4 py-4 ${tableCellBase} text-[var(--app-muted)]`}>
                          {request.budget_currency || '—'}
                        </td>

                        <td className={`px-4 py-4 ${tableCellBase} text-[var(--app-muted)]`}>
                          {request.budget_amount ?? '—'}
                        </td>

                        <td className={`px-4 py-4 rounded-r-2xl border-r ${tableCellBase}`}>
                          <StatusBadge status={request.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </DashboardShell>
  );
};

export default RevenuePage;
