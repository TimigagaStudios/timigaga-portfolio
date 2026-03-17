import { useEffect, useMemo, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import StatusBadge from '@/components/dashboard/StatusBadge';
import Button from '@/components/Button';

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

const statusOptions = ['pending', 'reviewed', 'contacted', 'closed'];

const RequestsPage = () => {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusValue, setStatusValue] = useState('');

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

  useEffect(() => {
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

  const openRequestDetails = async (request: ClientRequest) => {
    setSelectedRequest(request);
    setStatusValue(request.status);
  };

  const handleStatusUpdate = async () => {
    if (!selectedRequest) return;

    try {
      setUpdatingStatus(true);

      const response = await fetch(`/api/requests/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: statusValue,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to update status');
      }

      const updatedRequest = result.data as ClientRequest;

      setRequests((prev) =>
        prev.map((item) => (item.id === updatedRequest.id ? updatedRequest : item))
      );

      setSelectedRequest(updatedRequest);
    } catch (err) {
      console.error(err);
      alert('Failed to update request status.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Client Requests"
        subtitle="Track incoming project requests, review client intent, and manage request statuses from intake to close."
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-6">
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
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-white font-medium text-lg">{request.name}</p>
                    <p className="text-white/45 text-sm mt-1">{request.email}</p>
                    <p className="text-white/35 text-sm mt-1">
                      {request.project_category} •{' '}
                      {request.budget_display || request.budget || 'No budget set'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={request.status} />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-[11px] uppercase tracking-[0.16em] font-medium"
                      onClick={() => openRequestDetails(request)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-5 md:p-6">
          {!selectedRequest ? (
            <div className="text-white/45">
              <h3 className="text-xl font-semibold text-white mb-4">
                Request Details
              </h3>
              <p className="leading-8">
                Select a request to view full details, uploaded references, and update its status.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">
                  {selectedRequest.name}
                </h3>
                <p className="text-white/50 text-sm">{selectedRequest.email}</p>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Company
                  </p>
                  <p className="text-white/75">{selectedRequest.company || '—'}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Phone
                  </p>
                  <p className="text-white/75">{selectedRequest.phone || '—'}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Country
                  </p>
                  <p className="text-white/75">{selectedRequest.country || '—'}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Category
                  </p>
                  <p className="text-white/75">{selectedRequest.project_category}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Budget
                  </p>
                  <p className="text-white/75">
                    {selectedRequest.budget_display || selectedRequest.budget || '—'}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Currency
                  </p>
                  <p className="text-white/75">{selectedRequest.budget_currency || '—'}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Budget Amount
                  </p>
                  <p className="text-white/75">
                    {selectedRequest.budget_amount ?? '—'}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Style Preference
                  </p>
                  <p className="text-white/75">{selectedRequest.style_preference || '—'}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Theme
                  </p>
                  <p className="text-white/75">{selectedRequest.theme || '—'}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Message
                  </p>
                  <p className="text-white/70 leading-8 whitespace-pre-wrap">
                    {selectedRequest.message}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    Reference Images
                  </p>
                  {selectedRequest.reference_images &&
                  selectedRequest.reference_images.length > 0 ? (
                    <div className="space-y-2">
                      {selectedRequest.reference_images.map((url, index) => (
                        <a
                          key={`${url}-${index}`}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-[#95EF90] hover:text-white transition-colors break-all"
                        >
                          View reference image {index + 1}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/45">No reference images</p>
                  )}
                </div>

                <div className="pt-4 border-t border-white/8">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                    Update Status
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={statusValue}
                      onChange={(e) => setStatusValue(e.target.value)}
                      className="flex-1 rounded-xl bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#95EF90]"
                    >
                      {statusOptions.map((status) => (
                        <option
                          key={status}
                          value={status}
                          className="bg-[#0A0A0A] text-white"
                        >
                          {status}
                        </option>
                      ))}
                    </select>

                    <Button
                      type="button"
                      variant="aura"
                      size="sm"
                      onClick={handleStatusUpdate}
                      disabled={updatingStatus}
                      className="text-[11px] uppercase tracking-[0.16em] font-medium"
                    >
                      {updatingStatus ? 'Saving...' : 'Save Status'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
};

export default RequestsPage;