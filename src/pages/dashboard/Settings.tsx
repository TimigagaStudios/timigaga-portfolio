import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';

const SettingsPage = () => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin-login';
  };

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Settings"
        subtitle="Manage studio profile details, internal preferences, integrations, and dashboard access settings."
      />

      <div className="space-y-6">
        {/* Studio Profile */}
        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
            Studio Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Studio Name
              </p>
              <p className="text-white text-lg">Timigaga Studios</p>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Founder
              </p>
              <p className="text-white text-lg">Timothy Buoro</p>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Public Email
              </p>
              <p className="text-white text-lg">Timigaga.official@gmail.com</p>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Phone
              </p>
              <p className="text-white text-lg">+234 906 958 4853</p>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5 md:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Location
              </p>
              <p className="text-white text-lg">Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Brand & Display */}
        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
            Brand & Display
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Default Theme
              </p>
              <p className="text-white text-lg">Dark Premium</p>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Accent Color
              </p>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#95EF90]" />
                <p className="text-white text-lg">#95EF90</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Brand Status
              </p>
              <p className="text-white text-lg">Active</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
            Notifications
          </h2>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Admin request notifications</p>
                <p className="text-white/45 text-sm mt-1">
                  Receive admin alerts for new client requests through Brevo.
                </p>
              </div>
              <span className="text-[#95EF90] text-sm">Enabled</span>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Client confirmation emails</p>
                <p className="text-white/45 text-sm mt-1">
                  Automatically send confirmation messages after intake submission.
                </p>
              </div>
              <span className="text-[#95EF90] text-sm">Enabled</span>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Follow-up reminders</p>
                <p className="text-white/45 text-sm mt-1">
                  Future automation-ready reminders for pending and reviewed requests.
                </p>
              </div>
              <span className="text-white/40 text-sm">Planned</span>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
            Integrations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Supabase
              </p>
              <p className="text-white text-lg">Connected</p>
              <p className="text-white/45 text-sm mt-2">
                Database, storage, and auth active.
              </p>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Brevo
              </p>
              <p className="text-white text-lg">Connected</p>
              <p className="text-white/45 text-sm mt-2">
                Transactional emails active.
              </p>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Vercel
              </p>
              <p className="text-white text-lg">Connected</p>
              <p className="text-white/45 text-sm mt-2">
                Frontend and API deployment active.
              </p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-6">
            Security & Access
          </h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-white font-medium">Admin-only protected access</p>
              <p className="text-white/45 text-sm mt-2 max-w-2xl">
                Dashboard access is restricted through Supabase authentication.
                API routes should remain protected and limited to authenticated admin use only.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleSignOut}
              className="text-[11px] uppercase tracking-[0.18em] font-semibold px-6"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default SettingsPage;