import { useEffect, useMemo, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import Button from '@/components/Button';
import SectionCard from '@/components/dashboard/SectionCard';
import FilterBar from '@/components/dashboard/FilterBar';
import EmptyState from '@/components/dashboard/EmptyState';
import { getAuthHeaders } from '@/lib/auth';
import { useToast } from '@/components/ui/useToast';

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
  style_preference?: string;
  theme?: string;
  message?: string;
  stage: 'onboarding' | 'in progress' | 'waiting on client' | 'review' | 'completed' | 'archived';
  created_at: string;
};

const stageOptions: ProjectItem['stage'][] = [
  'onboarding',
  'in progress',
  'waiting on client',
  'review',
  'completed',
  'archived',
];

const stageStyles: Record<ProjectItem['stage'], string> = {
  onboarding: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'in progress': 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  'waiting on client': 'bg-orange-500/10 text-orange-300 border-orange-500/20',
  review: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  completed: 'bg-green-500/10 text-green-300 border-green-500/20',
  archived: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20',
};

const ProjectsPage = () => {
  const { showToast } = useToast();

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [stageValue, setStageValue] = useState<ProjectItem['stage']>('onboarding');
  const [updatingStage, setUpdatingStage] = useState(false);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All Stages');

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.project_name.toLowerCase().includes(search.toLowerCase()) ||
        project.client_name.toLowerCase().includes(search.toLowerCase()) ||
        project.service.toLowerCase().includes(search.toLowerCase());

      const matchesStage =
        stageFilter === 'All Stages' ||
        project.stage.toLowerCase() === stageFilter.toLowerCase();

      return matchesSearch && matchesStage;
    });
  }, [projects, search, stageFilter]);

  const activeProjects = useMemo(() => projects.length, [projects]);
  const inProgressProjects = useMemo(
    () => projects.filter((project) => project.stage === 'in progress').length,
    [projects]
  );
  const completedProjects = useMemo(
    () => projects.filter((project) => project.stage === 'completed').length,
    [projects]
  );

  const openProjectDetails = (project: ProjectItem) => {
    setSelectedProject(project);
    setStageValue(project.stage);
  };

  const handleStageUpdate = async () => {
    if (!selectedProject) return;

    try {
      setUpdatingStage(true);

      const headers = await getAuthHeaders();

      const response = await fetch(`/api/projects/${selectedProject.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          stage: stageValue,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to update project stage');
      }

      const updatedProject = result.data as ProjectItem;

      setProjects((prev) =>
        prev.map((item) => (item.id === updatedProject.id ? updatedProject : item))
      );

      setSelectedProject(updatedProject);

      showToast({
        type: 'success',
        title: 'Project updated',
        message: `Project stage changed to ${updatedProject.stage}.`,
      });
    } catch (err) {
      console.error(err);
      showToast({
        type: 'error',
        title: 'Update failed',
        message: 'Could not update the project stage.',
      });
    } finally {
      setUpdatingStage(false);
    }
  };

  return (
    <DashboardShell>
      <DashboardTopbar
        title="Projects"
        subtitle="Monitor active client projects, delivery stages, deadlines, and project value from a clean internal workspace."
      />

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

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <SectionCard
          title="Project Pipeline"
          subtitle="Search and filter project records, then open a project to manage its delivery stage."
          rightSlot={
            <FilterBar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search projects..."
              filterValue={stageFilter}
              onFilterChange={setStageFilter}
              filterOptions={['All Stages', ...stageOptions]}
            />
          }
        >
          {loading ? (
            <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 text-white/55">
              Loading projects...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
              {error}
            </div>
          ) : filteredProjects.length === 0 ? (
            <EmptyState
              title="No projects found"
              description="Projects created from request conversion will appear here. Try adjusting your search or filter."
            />
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <p className="text-white font-medium text-lg">{project.project_name}</p>
                    <p className="text-white/45 text-sm mt-1">
                      {project.client_name} • {project.service}
                    </p>
                    <p className="text-white/35 text-sm mt-1">
                      {project.budget_display || project.budget || 'No value set'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${
                        stageStyles[project.stage]
                      }`}
                    >
                      {project.stage}
                    </span>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-[11px] uppercase tracking-[0.16em] font-medium"
                      onClick={() => openProjectDetails(project)}
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
          title="Project Details"
          subtitle="Inspect the selected project and update its current stage."
        >
          {!selectedProject ? (
            <EmptyState
              title="No project selected"
              description="Select a project from the pipeline to review its details and update progress."
            />
          ) : (
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">
                  {selectedProject.project_name}
                </h3>
                <p className="text-white/50 text-sm">{selectedProject.client_name}</p>
              </div>

              {[
                ['Client Email', selectedProject.client_email || '—'],
                ['Company', selectedProject.company || '—'],
                ['Service', selectedProject.service],
                ['Country', selectedProject.country || '—'],
                [
                  'Budget',
                  selectedProject.budget_display || selectedProject.budget || '—',
                ],
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
                  {selectedProject.message || '—'}
                </p>
              </div>

              <div className="pt-4 border-t border-white/8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/35 mb-3">
                  Update Stage
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={stageValue}
                    onChange={(e) => setStageValue(e.target.value as ProjectItem['stage'])}
                    className="flex-1 rounded-xl bg-[#0A0A0A] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#95EF90]"
                  >
                    {stageOptions.map((stage) => (
                      <option
                        key={stage}
                        value={stage}
                        className="bg-[#0A0A0A] text-white"
                      >
                        {stage}
                      </option>
                    ))}
                  </select>

                  <Button
                    type="button"
                    variant="aura"
                    size="sm"
                    onClick={handleStageUpdate}
                    disabled={updatingStage}
                    className="text-[11px] uppercase tracking-[0.16em] font-medium"
                  >
                    {updatingStage ? 'Saving...' : 'Save Stage'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </DashboardShell>
  );
};

export default ProjectsPage;