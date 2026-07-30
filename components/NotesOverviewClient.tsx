"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, ArrowLeft, Loader2, Search, X } from "lucide-react";
import { toast } from "sonner";
import {
  getAllUserNotes,
  searchUserNotes,
  updateNote,
  deleteNote,
  NOTES_PAGE_SIZE,
  type LessonNote,
} from "@/lib/supabase-notes";
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
  const [saving, setSaving] = useState(false);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  // Results are stored with the query that produced them, so a stale response
  // is simply ignored rather than having to be cleared from an effect.
  const [searchResults, setSearchResults] = useState<{ query: string; rows: LessonNote[] } | null>(null);
  const [searching, setSearching] = useState(false);
  // Whether another page might exist: a short first page means we already have
  // everything, so the "load more" button stays hidden.
  const [hasMore, setHasMore] = useState((initialNotes?.length ?? 0) >= NOTES_PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (initialNotes !== undefined) return;
    getAllUserNotes(userId)
      .then((rows) => {
        setNotes(rows);
        setHasMore(rows.length >= NOTES_PAGE_SIZE);
      })
      .catch((error) => console.error("Error loading notes:", error))
      .finally(() => setLoading(false));
    // Only re-run for a different userId; initialNotes is a first-render-only seed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Searching hits the server so it covers every note, not just the pages
  // already loaded. Debounced so typing doesn't fire a query per keystroke.
  useEffect(() => {
    const trimmed = search.trim();
    if (!trimmed) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      setSearching(true);

      // Lesson titles live in metadata, not in lesson_notes - resolve which
      // lessons match the query here so searching "dòng tiền" also finds notes
      // taken on a lesson with that in its title.
      const needle = trimmed.toLowerCase();
      const matchingLessonIds = Object.entries(lessonsById)
        .filter(([, info]) => info.title.toLowerCase().includes(needle))
        .map(([id]) => Number(id));

      searchUserNotes(userId, trimmed, matchingLessonIds)
        .then((rows) => {
          if (!cancelled) setSearchResults({ query: trimmed, rows });
        })
        .catch((error) => {
          if (cancelled) return;
          console.error("Error searching notes:", error);
          setSearchResults({ query: trimmed, rows: [] });
        })
        .finally(() => {
          if (!cancelled) setSearching(false);
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search, userId, lessonsById]);

  const loadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const next = await getAllUserNotes(userId, { offset: notes.length });
      setNotes((prev) => {
        // Guard against an overlap if a note was edited (and so reordered)
        // between pages.
        const seen = new Set(prev.map((n) => n.id));
        return [...prev, ...next.filter((n) => !seen.has(n.id))];
      });
      setHasMore(next.length >= NOTES_PAGE_SIZE);
    } catch (error) {
      console.error("Error loading more notes:", error);
      toast.error("Không tải thêm được ghi chú.");
    } finally {
      setLoadingMore(false);
    }
  };

  const startEditing = (note: LessonNote) => {
    setConfirmingDeleteId(null);
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditContent("");
  };

  const saveEdit = async (noteId: number) => {
    if (!editContent.trim() || saving) return;
    setSaving(true);
    try {
      const updated = await updateNote(noteId, editContent);
      setNotes((prev) => prev.map((n) => (n.id === noteId ? updated : n)));
      cancelEditing();
      toast.success("Đã cập nhật ghi chú");
    } catch (error) {
      // The editor stays open with the text intact so the edit can be retried.
      console.error("Error updating note:", error);
      toast.error(
        error instanceof Error
          ? `Không cập nhật được ghi chú: ${error.message}`
          : "Không cập nhật được ghi chú. Vui lòng thử lại."
      );
    } finally {
      setSaving(false);
    }
  };

  const removeNote = async (noteId: number) => {
    // Two-step confirm - see the same change in LessonNotes.
    if (confirmingDeleteId !== noteId) {
      setConfirmingDeleteId(noteId);
      return;
    }

    const previous = notes;
    setConfirmingDeleteId(null);
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    try {
      await deleteNote(noteId);
      toast.success("Đã xóa ghi chú");
    } catch (error) {
      console.error("Error deleting note:", error);
      setNotes(previous);
      toast.error("Không xóa được ghi chú. Vui lòng thử lại.");
    }
  };

  // Group by lesson so everything learned from one lesson reads together,
  // most-recently-noted lesson first - the point of this page is to make
  // reviewing "what did I actually learn" fast, not just list rows.
  const trimmedSearch = search.trim();
  const isSearching = trimmedSearch.length > 0;
  // Only trust results that belong to the query currently in the box.
  const matchedResults = searchResults?.query === trimmedSearch ? searchResults.rows : null;
  const visibleNotes = isSearching ? matchedResults ?? [] : notes;
  const awaitingResults = isSearching && (searching || matchedResults === null);

  const grouped = new Map<number, LessonNote[]>();
  for (const note of visibleNotes) {
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
                Sổ tay học tập ({notes.length}{hasMore ? "+" : ""})
              </h1>
            </div>
          </div>
        </div>
      )}
      {embedded && (
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">
          Ghi chú ({notes.length}{hasMore ? "+" : ""})
        </h2>
      )}

      <div className={embedded ? "" : "max-w-2xl mx-auto px-6 py-8"}>
        {/* Search - queries the server, so it covers notes beyond the loaded page */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm trong ghi chú hoặc theo tên bài học..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              title="Xoá tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {isSearching && (
          <p className="mb-4 text-xs font-semibold text-stone-500 dark:text-stone-400">
            {awaitingResults
              ? "Đang tìm..."
              : `Tìm thấy ${visibleNotes.length} ghi chú cho "${trimmedSearch}"`}
          </p>
        )}

        {(
          visibleNotes.length === 0 ? (
            <div className="text-center py-16 text-stone-600 dark:text-stone-300">
              {awaitingResults ? (
                <p className="text-sm text-stone-500 dark:text-stone-400">Đang tìm...</p>
              ) : isSearching ? (
                <>
                  <p className="mb-2 font-semibold">Không tìm thấy ghi chú nào khớp.</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Thử từ khoá khác, hoặc tìm theo tên bài học.</p>
                </>
              ) : (
                <>
                  <p className="mb-2 font-semibold">Chưa có ghi chú nào.</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Ghi chú bạn thêm khi học bài sẽ được tổng hợp tự động ở đây.</p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {lessonIds.map((lessonId) => {
                const lessonInfo = lessonsById[lessonId];
                const lessonNotes = grouped.get(lessonId)!;
                return (
                  <div key={lessonId} className="bg-white/95 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-xs">
                    <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/80 dark:bg-stone-850/80">
                      {lessonInfo ? (
                        <Link href={`/bai-hoc/${lessonInfo.slug}`} className="font-extrabold text-stone-900 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          {lessonInfo.title}
                        </Link>
                      ) : (
                        <span className="font-bold text-stone-600 dark:text-stone-300">Bài học #{lessonId}</span>
                      )}
                      <span className="text-xs font-semibold text-stone-500 dark:text-stone-300 bg-stone-200/60 dark:bg-stone-800 px-2.5 py-1 rounded-full">{lessonNotes.length} ghi chú</span>
                    </div>
                    <div className="p-5 space-y-3">
                      {lessonNotes.map((note) => (
                        <div key={note.id} className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 rounded-xl p-4 group transition-colors">
                          {editingNoteId === note.id ? (
                            <div className="space-y-2">
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                rows={3}
                                autoFocus
                              />
                              {hasMathContent(editContent) && (
                                <div className="px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-dashed border-stone-300 dark:border-stone-700 overflow-x-auto">
                                  <NoteContent content={editContent} />
                                </div>
                              )}
                              <div className="flex gap-2 justify-end pt-1">
                                <button onClick={cancelEditing} className="px-3 py-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors">
                                  Hủy
                                </button>
                                <button
                                  onClick={() => void saveEdit(note.id)}
                                  disabled={saving || !editContent.trim()}
                                  className="px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-xs disabled:opacity-50 inline-flex items-center gap-1.5"
                                >
                                  {saving && <Loader2 className="w-3 h-3 animate-spin" />}
                                  {saving ? "Đang lưu..." : "Lưu thay đổi"}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <NoteContent content={note.content} />
                              <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-200/50 dark:border-stone-700/50">
                                <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-300">
                                  {new Date(note.updated_at).toLocaleDateString("vi-VN")}
                                </span>
                                <div className="flex items-center gap-3">
                                  <button onClick={() => startEditing(note)} className="text-stone-500 hover:text-stone-800 dark:text-stone-300 dark:hover:text-white transition-colors" title="Sửa">
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  {confirmingDeleteId === note.id ? (
                                    <span className="inline-flex items-center gap-2 text-[11px]">
                                      <span className="font-bold text-rose-600 dark:text-rose-400">Xoá?</span>
                                      <button
                                        onClick={() => void removeNote(note.id)}
                                        className="font-bold text-rose-600 dark:text-rose-400 hover:underline"
                                      >
                                        Xoá
                                      </button>
                                      <button
                                        onClick={() => setConfirmingDeleteId(null)}
                                        className="font-bold text-stone-500 dark:text-stone-300 hover:underline"
                                      >
                                        Hủy
                                      </button>
                                    </span>
                                  ) : (
                                    <button onClick={() => void removeNote(note.id)} className="text-stone-400 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400 transition-colors" title="Xóa">
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
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

              {/* Pagination - hidden while searching, since search already
                  queries every note rather than the loaded pages. */}
              {!isSearching && hasMore && (
                <button
                  onClick={() => void loadMore()}
                  disabled={loadingMore}
                  className="w-full py-2.5 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 text-sm font-bold text-stone-600 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-600 hover:text-stone-900 dark:hover:text-white transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loadingMore ? "Đang tải..." : "Tải thêm ghi chú"}
                </button>
              )}
            </div>
          )
        )}
      </div>
    </>
  );

  if (embedded) return content;

  return <div className="min-h-screen bg-white dark:bg-stone-950">{content}</div>;
}
