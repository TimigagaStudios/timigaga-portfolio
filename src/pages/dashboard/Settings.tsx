import { useEffect, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import Button from '@/components/Button';
import SectionCard from '@/components/dashboard/SectionCard';
import { supabase } from '@/lib/supabase';
import { getAuthHeaders } from '@/lib/auth';
import { useToast } from '@/components/ui/useToast';
import { useTheme } from '@/context/ThemeContext';

type StudioSettings = {
  id: string;
  studio_name: string;
  founder_name: string;
  public_email: string;
  phone: string;
  location: string;
  default_theme: string;
  accent_color: string;
  brand_status: string;
};

const SettingsPage = () => {
  const { showToast } = useToast();
  const { setTheme } = useTheme();

  const [settings, setSettings] = useState<StudioSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const applyAdminTheme = (themeValue: string) => {
    if (themeValue === 'Light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const headers = await getAuthHeaders();

      const response = await fetch('/api/settings', {
        headers,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to fetch settings');
      }

      setSettings(result.data);
      applyAdminTheme(result.data.default_theme);
    } catch (error) {
      console.error(error);
      showToast({
        type: 'error',
        title: 'Failed to load settings',
        message: 'Could not fetch studio settings.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!settings) return;

    const { name, value } = e.target;
    setSettings((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);

      const headers = await getAuthHeaders();

      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(settings),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to save settings');
      }

      setSettings(result.data);
      applyAdminTheme(result.data.default_theme);

      showToast({
        type: 'success',
        title: 'Settings saved',
        message: 'Studio settings updated successfully.',
      });
    } catch (error) {
      console.error(error);
      showToast({
        type: 'error',
        title: 'Save failed',
        message: 'Could not save studio settings.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin-login';
  };

  if (loading || !settings) {
    return (
      <DashboardShell>
        <DashboardTopbar
          title="Settings"
          subtitle="Manage studio profile details, internal preferences, integrations, and dashboard access settings."
        />
        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6 text-white/55">
          Loading settings...
        </div>
      </DashboardShell>
    );
  }

  const inputClasses =
    'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#95EF90]';

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Settings"
        subtitle="Manage studio profile details, internal preferences, integrations, and dashboard access settings."
      />

      <div className="space-y-6">
        <SectionCard
          title="Studio Profile"
          subtitle="Update your core public-facing business identity and contact information."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Studio Name
              </label>
              <input
                name="studio_name"
                value={settings.studio_name}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Founder Name
              </label>
              <input
                name="founder_name"
                value={settings.founder_name}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Public Email
              </label>
              <input
                name="public_email"
                value={settings.public_email}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Phone
              </label>
              <input
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Location
              </label>
              <input
                name="location"
                value={settings.location}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Brand & Display"
          subtitle="Manage internal display defaults and current brand state."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Default Theme
              </label>
              <select
                name="default_theme"
                value={settings.default_theme}
                onChange={handleChange}
                className={inputClasses}
              >
                <option className="bg-[#0A0A0A] text-white">Dark Premium</option>
                <option className="bg-[#0A0A0A] text-white">Light</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Accent Color
              </label>
              <input
                name="accent_color"
                value={settings.accent_color}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Brand Status
              </label>
              <select
                name="brand_status"
                value={settings.brand_status}
                onChange={handleChange}
                className={inputClasses}
              >
                <option className="bg-[#0A0A0A] text-white">Active</option>
                <option className="bg-[#0A0A0A] text-white">Paused</option>
                <option className="bg-[#0A0A0A] text-white">Internal</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="button"
              variant="aura"
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className="text-[11px] uppercase tracking-[0.16em] font-medium"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </SectionCard>

        <SectionCard
          title="Integrations"
          subtitle="Current operational connection status for the studio stack."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Supabase
              </p>
              <p className="text-white text-lg">Connected</p>
              <p className="text-white/45 text-sm mt-2">
                Database, storage, auth.
              </p>
            </div>

            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                Brevo
              </p>
              <p className="text-white text-lg">Connected</p>
              <p className="text-white/45 text-sm mt-2">
                Transactional email active.
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
        </SectionCard>

        <SectionCard
          title="Security & Access"
          subtitle="Manage admin access and current session security."
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-white font-medium">Authenticated admin session</p>
              <p className="text-white/45 text-sm mt-2 max-w-2xl">
                Dashboard access is currently protected through Supabase authentication and secured API routes.
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
        </SectionCard>
      </div>
    </DashboardShell>
  );
};

export default SettingsPage;
