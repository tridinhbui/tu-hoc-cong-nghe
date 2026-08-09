"use client";

import { useState, useEffect, useCallback } from "react";
import { Edit2, Trash2, Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  getLessonNotes,
  createNote,
  updateNote,
  deleteNote,
  saveNoteDraft,
  readNoteDraft,
  clearNoteDraft,
} from "@/lib/supabase-notes";
import type { LessonNote } from "@/lib/supabase-notes";
import NoteContent, { hasMathContent } from "@/components/NoteContent";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/current-user";

interface LessonNotesProps {
  lessonId: number;
  lessonSlug: string;
}

export default function LessonNotes({ lessonId, lessonSlug }: LessonNotesProps) {
  const { t } = useI18n();
  const [notes, setNotes] = useState<LessonNote[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);
  // Resolved once on mount instead of re-fetched on every save.
  const [userId, setUserId] = useState<string | null>(null);
  const [hasRecoveredDraft, setHasRecoveredDraft] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchNotes = async () => {
      try {
        const user = await getCurrentUser();
        if (cancelled) return;

        if (user) {
          setUserId(user.id);
          const userNotes = await getLessonNotes(user.id, lessonId);
          if (cancelled) return;
          setNotes(userNotes);

          // Recover anything typed but never saved (previous visit, failed
          // save, accidental navigation) and reopen the editor on it.
          const draft = readNoteDraft(user.id, lessonId, null);
          if (draft?.trim()) {
            setNoteContent(draft);
            setIsEditing(true);
            setIsOpen(true);
            setHasRecoveredDraft(true);
          }
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchNotes();
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  // Persist the draft as it is typed, so nothing is lost on navigation.
  const updateDraft = useCallback(
    (value: string) => {
      setNoteContent(value);
      if (userId) saveNoteDraft(userId, lessonId, editingNoteId, value);
    },
    [userId, lessonId, editingNoteId]
  );

  const handleCreateNote = async () => {
    if (!noteContent.trim() || saving) return;

    if (!userId) {
      toast.error(t.notes.signInRequired);
      return;
    }

    setSaving(true);
    try {
      const newNote = await createNote(userId, lessonId, lessonSlug, noteContent);
      setNotes([newNote, ...notes]);
      clearNoteDraft(userId, lessonId, null);
      setNoteContent("");
      setIsEditing(false);
      setHasRecoveredDraft(false);
      toast.success(t.notes.createSuccess);
    } catch (error) {
      // The text stays in the textarea (and in the draft) so the learner can
      // retry - it is not discarded on failure any more.
      console.error("Error creating note:", error);
      toast.error(
        error instanceof Error
          ? format(t.notes.createFailedWithReason, { reason: error.message })
          : t.notes.createFailed
      );
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateNote = async (noteId: number) => {
    if (!noteContent.trim() || saving) return;

    setSaving(true);
    try {
      const updatedNote = await updateNote(noteId, noteContent);
      setNotes(notes.map(note => note.id === noteId ? updatedNote : note));
      if (userId) clearNoteDraft(userId, lessonId, noteId);
      setEditingNoteId(null);
      setIsEditing(false);
      setNoteContent("");
      toast.success(t.notes.updateSuccess);
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error(
        error instanceof Error
          ? format(t.notes.updateFailedWithReason, { reason: error.message })
          : t.notes.updateFailed
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    // Two-step confirm: the trash icon used to delete on a single click, and a
    // failed delete was swallowed, so a misclick was unrecoverable.
    if (deletingNoteId !== noteId) {
      setDeletingNoteId(noteId);
      return;
    }

    const previous = notes;
    setDeletingNoteId(null);
    setNotes(notes.filter(note => note.id !== noteId));
    try {
      await deleteNote(noteId);
      toast.success(t.notes.deleteSuccess);
    } catch (error) {
      console.error("Error deleting note:", error);
      setNotes(previous);
      toast.error(t.notes.deleteFailed);
    }
  };

  const startEditing = (note?: LessonNote) => {
    setDeletingNoteId(null);
    if (note) {
      setEditingNoteId(note.id);
      setNoteContent(readNoteDraft(userId ?? "", lessonId, note.id) || note.content);
    } else {
      setEditingNoteId(null);
      setNoteContent(readNoteDraft(userId ?? "", lessonId, null) || "");
    }
    setIsEditing(true);
  };

  const cancelEditing = () => {
    // Keep the draft: "Hủy" closes the editor, it does not throw away writing.
    // The draft is only cleared on a successful save or an explicit discard.
    setIsEditing(false);
    setEditingNoteId(null);
    setNoteContent("");
    setHasRecoveredDraft(false);
  };

  const discardDraft = () => {
    if (userId) clearNoteDraft(userId, lessonId, editingNoteId);
    setNoteContent("");
    setIsEditing(false);
    setEditingNoteId(null);
    setHasRecoveredDraft(false);
    toast.success(t.notes.discardDraftSuccess);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/4 mb-2"></div>
        <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📝</span>
          <h3 className="font-bold text-stone-900 dark:text-stone-100">{t.notes.heading}</h3>
          <span className="text-xs text-stone-500 dark:text-stone-400">({notes.length})</span>
        </div>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 text-sm font-semibold"
          >
            {t.notes.expand}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="p-5">
          {/* Notes List */}
          {notes.length === 0 && !isEditing ? (
            <div className="text-center py-8 text-stone-500 dark:text-stone-400">
              <p className="mb-4">{t.notes.lessonEmptyTitle}</p>
              <button
                onClick={() => startEditing()}
                className="text-stone-900 dark:text-stone-100 font-semibold hover:underline"
              >
                {t.notes.addFirstNote}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-stone-50 dark:bg-stone-800 rounded-lg p-4 group"
                >
                  {editingNoteId === note.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteContent}
                        onChange={(e) => updateDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                            e.preventDefault();
                            void handleUpdateNote(note.id);
                          }
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm resize-y min-h-[80px]"
                        rows={4}
                        autoFocus
                      />
                      {hasMathContent(noteContent) && (
                        <div className="px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 border border-dashed border-stone-300 dark:border-stone-600 overflow-x-auto">
                          <NoteContent content={noteContent} />
                        </div>
                      )}
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={cancelEditing}
                          className="px-3 py-1 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                        >
                          {t.notes.cancel}
                        </button>
                        <button
                          onClick={() => void handleUpdateNote(note.id)}
                          disabled={saving || !noteContent.trim()}
                          className="px-3 py-1 text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-1.5"
                        >
                          {saving && <Loader2 className="w-3 h-3 animate-spin" />}
                          {saving ? t.notes.saving : t.notes.save}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <NoteContent content={note.content} />
                      <div className="mt-2 flex gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                        <button
                          onClick={() => startEditing(note)}
                          className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
                          title={t.notes.edit}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {deletingNoteId === note.id ? (
                          <span className="inline-flex items-center gap-2 text-xs">
                            <span className="font-bold text-rose-600 dark:text-rose-400">{t.notes.deleteThisConfirm}</span>
                            <button
                              onClick={() => void handleDeleteNote(note.id)}
                              className="font-bold text-rose-600 dark:text-rose-400 hover:underline"
                            >
                              {t.notes.confirmDelete}
                            </button>
                            <button
                              onClick={() => setDeletingNoteId(null)}
                              className="font-bold text-stone-500 dark:text-stone-400 hover:underline"
                            >
                              {t.notes.cancel}
                            </button>
                          </span>
                        ) : (
                          <button
                            onClick={() => void handleDeleteNote(note.id)}
                            className="text-stone-500 hover:text-red-600 dark:text-stone-400 dark:hover:text-red-400"
                            title={t.notes.delete}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add Note Form */}
          {isEditing && editingNoteId === null && (
            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
              {hasRecoveredDraft && (
                <div className="mb-2 flex items-center justify-between gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 px-3 py-2">
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    📄 {t.notes.recoveredDraft}
                  </p>
                  <button
                    onClick={discardDraft}
                    className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline shrink-0"
                  >
                    {t.notes.discardDraft}
                  </button>
                </div>
              )}
              <textarea
                value={noteContent}
                onChange={(e) => updateDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    void handleCreateNote();
                  }
                }}
                placeholder={t.notes.writePlaceholder}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm resize-y min-h-[90px]"
                rows={4}
                autoFocus
              />
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                {t.notes.tipPart1}
                {"\\frac{a}{b}"}
                {t.notes.tipPart2}
              </p>
              {hasMathContent(noteContent) && (
                <div className="mt-2 px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 border border-dashed border-stone-300 dark:border-stone-600 overflow-x-auto">
                  <NoteContent content={noteContent} />
                </div>
              )}
              <div className="flex gap-2 justify-end mt-2">
                <button
                  onClick={cancelEditing}
                  className="px-3 py-1 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                >
                  {t.notes.cancel}
                </button>
                <button
                  onClick={() => void handleCreateNote()}
                  disabled={saving || !noteContent.trim()}
                  className="px-3 py-1 text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-1"
                >
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                  {saving ? t.notes.saving : t.notes.add}
                </button>
              </div>
            </div>
          )}

          {/* Add Note Button */}
          {!isEditing && (
            <button
              onClick={() => startEditing()}
              className="mt-4 w-full py-2 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-lg text-stone-500 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-700 dark:hover:text-stone-300 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t.notes.addNote}
            </button>
          )}
        </div>
      )}

      {isOpen && (
        <div className="px-5 py-3 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={() => setIsOpen(false)}
            className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 text-sm font-semibold flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            {t.notes.collapse}
          </button>
        </div>
      )}
    </div>
  );
}
