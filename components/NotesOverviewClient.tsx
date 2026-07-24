"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getAllUserNotes, updateNote, deleteNote, type LessonNote } from "@/lib/supabase-notes";
import NoteContent, { hasMathContent } from "@/components/NoteContent";

interface LessonInfo {
  slug: string;
  title: string;
}

interface NotesOverviewClientProps {
  lessonsById: Record<number, LessonInfo>;
  userId: string;
  initialNotes?: LessonNote[];
  embedded?: boolean;
}

// `userId` comes from the server component (ghi-chu/page.tsx already
// resolved + auth-gated the session) - fetching notes can start immediately
// on mount instead of waiting on a client-side getSession() round trip
// first, which used to make this page load noticeably slower than the rest
// of the app (two sequential client round trips instead of one).
//
// `initialNotes`, when provided, comes from the same server request that
// rendered the page shell - skip the client-side fetch entirely in that
// case instead of re-querying data we already have.
export default function NotesOverviewClient({ lessonsById, userId, initialNotes, embedded = false }: NotesOverviewClientProps) {
  const [notes, setNotes] = useState<LessonNote[]>(initialNotes ?? []);
  const [loading, setLoading] = useState(initialNotes === undefined);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (initialNotes !== undefined) return;
    getAllUserNotes(userId)
      .then(setNotes)
      .catch((error) => console.error("Error loading notes:", error))
      .finally(() => setLoading(false));
    // Only re-run for a different userId; initialNotes is a first-render-only seed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const startEditing = (note: LessonNote) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditContent("");
  };

  const saveEdit = async (noteId: number) => {
    if (!editContent.trim()) return;
    try {
      const updated = await updateNote(noteId, editContent);
      setNotes((prev) => prev.map((n) => (n.id === noteId ? updated : n)));
      cancelEditing();
      toast.success("Đã cập nhật ghi chú");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Không thể cập nhật ghi chú. Vui lòng thử lại.");
    }
  };

  const removeNote = async (noteId: number) => {
    try {
      await deleteNote(noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      toast.success("Đã xóa ghi chú");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Không thể xóa ghi chú. Vui lòng thử lại.");
    }
  };

  // Group by lesson so everything learned from one lesson reads together,
  // most-recently-noted lesson first - the point of this page is to make
  // reviewing "what did I actually learn" fast, not just list rows.
  const grouped = new Map<number, LessonNote[]>();
  for (const note of notes) {
    const list = grouped.get(note.lesson_id) ?? [];
    list.push(note);
    grouped.set(note.lesson_id, list);
  }
  const lessonIds = Array.from(grouped.keys()).sort((a, b) => {
    const aLatest = Math.max(...grouped.get(a)!.map((n) => new Date(n.updated_at).getTime()));
    const bLatest = Math.max(...grouped.get(b)!.map((n) => new Date(n.updated_at).getTime()));
    return bLatest - aLatest;
  });

  if (loading) {
    return (
      <div className={embedded ? "flex items-center justify-center py-16" : "min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center"}>
        <p className="text-stone-500 dark:text-stone-400">Đang tải...</p>
      </div>
    );
  }

  const content = (
    <>
      {!embedded && (
        <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg px-3 py-2 -ml-3 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
            <div className="flex items-center justify-between mt-2 gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Sổ tay học tập ({notes.length})
              </h1>
            </div>
          </div>
        </div>
      )}
      {embedded && (
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
          Ghi chú ({notes.length})
        </h2>
      )}

      <div className={embedded ? "" : "max-w-2xl mx-auto px-6 py-8"}>
        {(
          notes.length === 0 ? (
            <div className="text-center py-16 text-stone-500 dark:text-stone-400">
              <p className="mb-2">Chưa có ghi chú nào.</p>
              <p className="text-sm">Ghi chú bạn thêm khi học bài sẽ được tổng hợp ở đây.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {lessonIds.map((lessonId) => {
                const lessonInfo = lessonsById[lessonId];
                const lessonNotes = grouped.get(lessonId)!;
                return (
                  <div key={lessonId} className="bg-white/95 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/50">
                      {lessonInfo ? (
                        <Link href={`/bai-hoc/${lessonInfo.slug}`} className="font-bold text-stone-900 dark:text-stone-100 hover:underline">
                          {lessonInfo.title}
                        </Link>
                      ) : (
                        <span className="font-bold text-stone-500 dark:text-stone-400">Bài học #{lessonId}</span>
                      )}
                      <span className="text-xs text-stone-500 dark:text-stone-400">{lessonNotes.length} ghi chú</span>
                    </div>
                    <div className="p-5 space-y-3">
                      {lessonNotes.map((note) => (
                        <div key={note.id} className="bg-stone-50 dark:bg-stone-800 rounded-lg p-4 group">
                          {editingNoteId === note.id ? (
                            <div className="space-y-2">
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm resize-none"
                                rows={3}
                                autoFocus
                              />
                              {hasMathContent(editContent) && (
                                <div className="px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 border border-dashed border-stone-300 dark:border-stone-600 overflow-x-auto">
                                  <NoteContent content={editContent} />
                                </div>
                              )}
                              <div className="flex gap-2 justify-end">
                                <button onClick={cancelEditing} className="px-3 py-1 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200">
                                  Hủy
                                </button>
                                <button onClick={() => saveEdit(note.id)} className="px-3 py-1 text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:opacity-90">
                                  Lưu
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <NoteContent content={note.content} />
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-[11px] text-stone-400 dark:text-stone-550">
                                  {new Date(note.updated_at).toLocaleDateString("vi-VN")}
                                </span>
                                <div className="flex gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                                  <button onClick={() => startEditing(note)} className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200" title="Sửa">
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => removeNote(note.id)} className="text-stone-500 hover:text-red-600 dark:text-stone-400 dark:hover:text-red-400" title="Xóa">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </>
  );

  if (embedded) return content;

  return <div className="min-h-screen bg-white dark:bg-stone-950">{content}</div>;
}
