import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import StatusBadge from '@/components/dashboard/StatusBadge';

const requests = [
  {
    name: 'TradeCore Academy',
    email: 'hello@tradecore.com',
    category: 'Web Design',
    budget: '$15,000',
    status: 'pending',
    date: '2026-03-12',
  },
  {
    name: 'Luxe Habitat',
    email: 'team@luxehabitat.com',
    category: 'Brand Identity',
    budget: '$8,000',
    status: 'reviewed',
    date: '2026-03-10',
  },
  {
    name: 'Nova Reach',
    email: 'hello@novareach.io',
    category: 'AI Workflow System',
    budget: '$20,000',
    status: 'contacted',
    date: '2026-03-08',
  },
  {
    name: 'Brightline Media',
    email: 'contact@brightline.media',
    category: 'Social Media Management',
    budget: '$1,500',
    status: 'closed',
    date: '2026-03-06',
  },
];

const RequestsPage = () => {
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
              className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#95EF90]"
            />
            <select className="rounded-xl bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#95EF90]">
              <option className="bg-[#0A0A0A] text-white">All Statuses</option>
              <option className="bg-[#0A0A0A] text-white">Pending</option>
              <option className="bg-[#0A0A0A] text-white">Reviewed</option>
              <option className="bg-[#0A0A0A] text-white">Contacted</option>
              <option className="bg-[#0A0A0A] text-white">Closed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-y-3">
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
                  Date
                </th>
                <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request, index) => (
                <tr key={`${request.email}-${index}`} className="bg-white/[0.02]">
                  <td className="px-4 py-4 rounded-l-2xl border-y border-l border-white/6">
                    <div>
                      <p className="text-white font-medium">{request.name}</p>
                      <p className="text-white/45 text-sm mt-1">{request.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-y border-white/6 text-white/70">
                    {request.category}
                  </td>
                  <td className="px-4 py-4 border-y border-white/6 text-white/70">
                    {request.budget}
                  </td>
                  <td className="px-4 py-4 border-y border-white/6 text-white/45">
                    {request.date}
                  </td>
                  <td className="px-4 py-4 rounded-r-2xl border-y border-r border-white/6">
                    <StatusBadge status={request.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
};

export default RequestsPage;