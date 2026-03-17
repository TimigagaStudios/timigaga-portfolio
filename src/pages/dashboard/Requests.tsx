import { useEffect, useMemo, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
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

const RequestsPage = () => {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
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
          throw new Error(result?.error || 'Failed to fetch requests');
        }

        setRequests(result.data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load client requests right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        request.name.toLowerCase().includes(search.toLowerCase()) ||
        request.email.toLowerCase().includes(search.toLowerCase()) ||
        (request.company || '').toLowerCase().includes(search.toLowerCase()) ||
        request.project_category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'All Statuses' ||
        request.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Client Requests"
        subtitle="Track incoming project requests, review client intent, and manage request statuses from intake to close."
      />

      <div className="rounded-[1.75rem] border border-white/6 glass-dark p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
            Intake Requests
          </h2>

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search requests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#95EF90]"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#95EF90]"
            >
              <option className="bg-[#0A0A0A] text-white">All Statuses</option>
              <option className="bg-[#0A0A0A] text-white">pending</option>
              <option className="bg-[#0A0A0A] text-white">reviewed</option>
              <option className="bg-[#0A0A0A] text-white">contacted</option>
              <option className="bg-[#0A0A0A] text-white">closed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 text-white/55">
            Loading requests...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
            {error}
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 text-white/55">
            No requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                    Client
                  </th>
                  <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                    Category
                  </th>
                  <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                    Budget
                  </th>
                  <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                    Theme
                  </th>
                  <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                    Date
                  </th>
                  <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="bg-white/[0.02]">
                    <td className="px-4 py-4 rounded-l-2xl border-y border-l border-white/6">
                      <div>
                        <p className="text-white font-medium">{request.name}</p>
                        <p className="text-white/45 text-sm mt-1">{request.email}</p>
                        {request.company && (
                          <p className="text-white/35 text-sm mt-1">{request.company}</p>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 border-y border-white/6 text-white/70">
                      {request.project_category}
                    </td>

                    <td className="px-4 py-4 border-y border-white/6 text-white/70">
                      {request.budget || '—'}
                    </td>

                    <td className="px-4 py-4 border-y border-white/6 text-white/45">
                      {request.theme || '—'}
                    </td>

                    <td className="px-4 py-4 border-y border-white/6 text-white/45">
                      {new Date(request.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-4 rounded-r-2xl border-y border-r border-white/6">
                      <StatusBadge status={request.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardShell>
  );
};

export default RequestsPage;