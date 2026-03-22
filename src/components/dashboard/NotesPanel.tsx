import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { getAuthHeaders } from '@/lib/auth';
import { useToast } from '@/components/ui/useToast';

type NoteItem = {
  id: string;
  content: string;
  created_at: string;
};

interface NotesPanelProps {
  clientRequestId?: string;
  projectId?: string;
}

const NotesPanel = ({ clientRequestId, projectId }: NotesPanelProps) => {
  const { showToast } = useToast();

  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const headers = await getAuthHeaders();

      const params = new URLSearchParams();

      if (clientRequestId) params.set('clientRequestId', clientRequestId);
      if (projectId) params.set('projectId', projectId);

      const response = await fetch(`/api/notes?${params.toString()}`, {
        headers,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to load notes');
      }

      setNotes(result.data || []);
    } catch (error) {
      console.error(error);
      showToast({
        type: 'error',
        title: 'Notes failed to load',
        message: 'Could not fetch notes for this record.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientRequestId || projectId) {
      fetchNotes();
    }
  }, [clientRequestId, projectId]);

  const handleAddNote = async () => {
    if (!content.trim()) return;

    try {
      setSaving(true);

      const headers = await getAuthHeaders();

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({
          client_request_id: clientRequestId || null,
          project_id: projectId || null,
          content,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to save note');
      }

      setContent('');
      await fetchNotes();

      showToast({
        type: 'success',
        title: 'Note added',
        message: 'Your note was saved successfully.',
      });
    } catch (error) {
      console.error(error);
      showToast({
        type: 'error',
        title: 'Failed to save note',
        message: 'Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-4 border-t border-black/8 dark:border-white/8 transition-colors duration-300">
      <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--app-muted)] mb-3">
        Internal Notes
      </p>

      <div className="space-y-3 mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Add a note, follow-up reminder, project observation, or internal context..."
          className="w-full rounded-xl bg-black/[0.03] dark:bg-white/5 border border-black/8 dark:border-white/10 px-4 py-3 text-sm text-[var(--app-heading)] placeholder:text-[var(--app-muted)] outline-none resize-none focus:border-[#95EF90] transition-colors duration-300"
        />

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddNote}
          disabled={saving}
          className="text-[11px] uppercase tracking-[0.16em] font-medium"
        >
          {saving ? 'Saving note...' : 'Add Note'}
        </Button>
      </div>

      {loading ? (
        <p className="text-[var(--app-muted)] text-sm">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-[var(--app-muted)] text-sm">No notes yet.</p>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl bg-black/[0.03] dark:bg-white/[0.02] border border-black/8 dark:border-white/6 px-4 py-4 transition-colors duration-300"
            >
              <p className="text-[var(--app-heading)] text-sm leading-7 whitespace-pre-wrap">
                {note.content}
              </p>
              <p className="text-[var(--app-muted)] text-xs mt-3">
                {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPanel;
