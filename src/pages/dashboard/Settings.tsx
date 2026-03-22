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

  const syncThemeFromSetting = (themeLabel: string) => {
    if (themeLabel === 'Light') {
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
      syncThemeFromSetting(result.data.default_theme);
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
      syncThemeFromSetting(result.data.default_theme);

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
        <div className="rounded-[1.75rem] glass-dark p-6 text-[var(--app-muted)]">
          Loading settings...
        </div>
      </DashboardShell>
    );
  }

  const inputClasses =
    'w-full rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/8 dark:border-white/10 px-4 py-3 text-sm text-[var(--app-heading)] outline-none transition-all placeholder:text-[var(--app-muted)] focus:border-[#95EF90]';

  const labelClasses =
    'block text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-3';

  const subCardClasses =
    'rounded-2xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/8 dark:border-white/6 p-5 transition-colors duration-300';

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
              <label className={labelClasses}>Studio Name</label>
              <input
                name="studio_name"
                value={settings.studio_name}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Founder Name</label>
              <input
                name="founder_name"
                value={settings.founder_name}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Public Email</label>
              <input
                name="public_email"
                value={settings.public_email}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Phone</label>
              <input
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClasses}>Location</label>
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
              <label className={labelClasses}>Default Theme</label>
              <select
                name="default_theme"
                value={settings.default_theme}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="Dark Premium" className="bg-[#0A0A0A] text-white">
                  Dark Premium
                </option>
                <option value="Light" className="bg-[#0A0A0A] text-white">
                  Light
                </option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Accent Color</label>
              <input
                name="accent_color"
                value={settings.accent_color}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Brand Status</label>
              <select
                name="brand_status"
                value={settings.brand_status}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="Active" className="bg-[#0A0A0A] text-white">
                  Active
                </option>
                <option value="Paused" className="bg-[#0A0A0A] text-white">
                  Paused
                </option>
                <option value="Internal" className="bg-[#0A0A0A] text-white">
                  Internal
                </option>
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
            <div className={subCardClasses}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-3">
                Supabase
              </p>
              <p className="text-[var(--app-heading)] text-lg">Connected</p>
              <p className="text-[var(--app-muted)] text-sm mt-2">
                Database, storage, auth.
              </p>
            </div>

            <div className={subCardClasses}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-3">
                Brevo
              </p>
              <p className="text-[var(--app-heading)] text-lg">Connected</p>
              <p className="text-[var(--app-muted)] text-sm mt-2">
                Transactional email active.
              </p>
            </div>

            <div className={subCardClasses}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-3">
                Vercel
              </p>
              <p className="text-[var(--app-heading)] text-lg">Connected</p>
              <p className="text-[var(--app-muted)] text-sm mt-2">
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
              <p className="text-[var(--app-heading)] font-medium">
                Authenticated admin session
              </p>
              <p className="text-[var(--app-muted)] text-sm mt-2 max-w-2xl">
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
