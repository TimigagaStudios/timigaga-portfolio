import { useEffect, useMemo, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import { getAuthHeaders } from '@/lib/auth';

type ProjectItem = {
  id: string;
  project_name: string;
  client_name: string;
  client_email?: string;
  company?: string;
  service: string;
  country?: string;
  budget?: string;
  budget_amount?: number | null;
  budget_currency?: string | null;
  budget_display?: string | null;
  stage: 'onboarding' | 'in progress' | 'waiting on client' | 'review' | 'completed' | 'archived';
  created_at: string;
};

const stageStyles: Record<ProjectItem['stage'], string> = {
  onboarding: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'in progress': 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  'waiting on client': 'bg-orange-500/10 text-orange-300 border-orange-500/20',
  review: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-300 border-green-500/20',
  archived: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20',
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError('');

        const headers = await getAuthHeaders();

        const response = await fetch('/api/projects', {
          headers,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.error || 'Failed to fetch projects');
        }

        setProjects(result.data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load projects right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const activeProjects = useMemo(() => projects.length, [projects]);
  const inProgressProjects = useMemo(
    () => projects.filter((project) => project.stage === 'in progress').length,
    [projects]
  );
  const completedProjects = useMemo(
    () => projects.filter((project) => project.stage === 'completed').length,
    [projects]
  );

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Projects"
        subtitle="Monitor active client projects, delivery stages, deadlines, and project value from a clean internal workspace."
      />

      {loading ? (
        <div className="rounded-[1.75rem] border border-white/6 glass-dark p-6 text-white/55">
          Loading projects...
        </div>
      ) : error ? (
        <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
            <div className="rounded-[1.5rem] border border-white/6 glass-dark p-5 md:p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/40 mb-3">
                Active Projects
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                {activeProjects}
              </h3>
            </div>

            <div className="rounded-[1.5rem] border border-white/6 glass-dark p-5 md:p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/40 mb-3">
                In Progress
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                {inProgressProjects}
              </h3>
            </div>

            <div className="rounded-[1.5rem] border border-white/6 glass-dark p-5 md:p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/40 mb-3">
                Completed
              </p>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                {completedProjects}
              </h3>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/6 glass-dark p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                Project Pipeline
              </h2>

              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#95EF90]"
                />
                <select className="rounded-xl bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#95EF90]">
                  <option className="bg-[#0A0A0A] text-white">All Stages</option>
                  <option className="bg-[#0A0A0A] text-white">onboarding</option>
                  <option className="bg-[#0A0A0A] text-white">in progress</option>
                  <option className="bg-[#0A0A0A] text-white">waiting on client</option>
                  <option className="bg-[#0A0A0A] text-white">review</option>
                  <option className="bg-[#0A0A0A] text-white">completed</option>
                  <option className="bg-[#0A0A0A] text-white">archived</option>
                </select>
              </div>
            </div>

            {projects.length === 0 ? (
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 text-white/55">
                No projects yet. Convert a request into a project from the Requests page.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                        Project
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                        Client
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                        Service
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                        Country
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                        Value
                      </th>
                      <th className="text-left text-[11px] uppercase tracking-[0.22em] text-white/35 font-medium px-4">
                        Stage
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="bg-white/[0.02]">
                        <td className="px-4 py-4 rounded-l-2xl border-y border-l border-white/6">
                          <p className="text-white font-medium">{project.project_name}</p>
                        </td>

                        <td className="px-4 py-4 border-y border-white/6 text-white/70">
                          {project.client_name}
                        </td>

                        <td className="px-4 py-4 border-y border-white/6 text-white/70">
                          {project.service}
                        </td>

                        <td className="px-4 py-4 border-y border-white/6 text-white/45">
                          {project.country || '—'}
                        </td>

                        <td className="px-4 py-4 border-y border-white/6 text-white/70">
                          {project.budget_display || project.budget || '—'}
                        </td>

                        <td className="px-4 py-4 rounded-r-2xl border-y border-r border-white/6">
                          <span
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${
                              stageStyles[project.stage]
                            }`}
                          >
                            {project.stage}
                          </span>
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

export default ProjectsPage;