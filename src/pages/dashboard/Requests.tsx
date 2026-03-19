import { useEffect, useMemo, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import StatusBadge from '@/components/dashboard/StatusBadge';
import Button from '@/components/Button';
import SectionCard from '@/components/dashboard/SectionCard';
import FilterBar from '@/components/dashboard/FilterBar';
import EmptyState from '@/components/dashboard/EmptyState';
import { getAuthHeaders } from '@/lib/auth';
import { useToast } from '@/components/ui/useToast';

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
  const { showToast } = useToast();

  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [convertingProject, setConvertingProject] = useState(false);
  const [statusValue, setStatusValue] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError('');

      const headers = await getAuthHeaders();

      const response = await fetch('/api/requests', { headers });
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

  const openRequestDetails = (request: ClientRequest) => {
    setSelectedRequest(request);
    setStatusValue(request.status);
  };

  const handleStatusUpdate = async () => {
    if (!selectedRequest) return;

    try {
      setUpdatingStatus(true);

      const headers = await getAuthHeaders();

      const response = await fetch(`/api/requests/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({ status: statusValue }),
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

      showToast({
        type: 'success',
        title: 'Status updated',
        message: `Request status changed to ${updatedRequest.status}.`,
      });
    } catch (err) {
      console.error(err);
      showToast({
        type: 'error',
        title: 'Update failed',
        message: 'Could not update request status.',
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleConvertToProject = async () => {
    if (!selectedRequest) return;

    try {
      setConvertingProject(true);

      const headers = await getAuthHeaders();

      const response = await fetch('/api/projects/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          requestId: selectedRequest.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to convert request');
      }

      await fetchRequests();
      setSelectedRequest(null);

      showToast({
        type: 'success',
        title: 'Project created',
        message: 'The request was successfully converted into a project.',
      });
    } catch (err) {
      console.error(err);
      showToast({
        type: 'error',
        title: 'Conversion failed',
        message: 'Could not convert this request into a project.',
      });
    } finally {
      setConvertingProject(false);
    }
  };

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Client Requests"
        subtitle="Track incoming project requests, review client intent, and manage request statuses from intake to close."
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-6">
        <SectionCard
          title="Intake Requests"
          subtitle="Search, filter, and review inbound project requests from your live intake system."
          rightSlot={
            <FilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search requests..."
              filterValue={statusFilter}
              onFilterChange={setStatusFilter}
              filterOptions={['All Statuses', ...statusOptions]}
            />
          }
        >
          {loading ? (
            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 text-white/55">
              Loading requests...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
              {error}
            </div>
          ) : filteredRequests.length === 0 ? (
            <EmptyState
              title="No requests found"
              description="Try adjusting your search or status filter. New intake submissions will appear here automatically."
            />
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
        </SectionCard>

        <SectionCard
          title="Request Details"
          subtitle="Inspect a request, review uploads, update its status, or convert it into a project."
        >
          {!selectedRequest ? (
            <EmptyState
              title="Nothing selected yet"
              description="Choose a request from the list to view its full details and take action."
            />
          ) : (
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">
                  {selectedRequest.name}
                </h3>
                <p className="text-white/50 text-sm">{selectedRequest.email}</p>
              </div>

              {[
                ['Company', selectedRequest.company || '—'],
                ['Phone', selectedRequest.phone || '—'],
                ['Country', selectedRequest.country || '—'],
                ['Category', selectedRequest.project_category],
                [
                  'Budget',
                  selectedRequest.budget_display || selectedRequest.budget || '—',
                ],
                ['Currency', selectedRequest.budget_currency || '—'],
                ['Budget Amount', selectedRequest.budget_amount ?? '—'],
                ['Style Preference', selectedRequest.style_preference || '—'],
                ['Theme', selectedRequest.theme || '—'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-2">
                    {label}
                  </p>
                  <p className="text-white/75">{value}</p>
                </div>
              ))}

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

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
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

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleConvertToProject}
                  disabled={convertingProject}
                  className="text-[11px] uppercase tracking-[0.16em] font-medium"
                >
                  {convertingProject ? 'Converting...' : 'Convert to Project'}
                </Button>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </DashboardShell>
  );
};

export default RequestsPage;