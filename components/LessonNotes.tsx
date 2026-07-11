"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { getLessonNotes, createNote, updateNote, deleteNote } from "@/lib/supabase-notes";
import { createClient } from "@/lib/supabase";
import type { LessonNote } from "@/lib/supabase-notes";
import NoteContent from "@/components/NoteContent";

interface LessonNotesProps {
  lessonId: number;
  lessonSlug: string;
}

export default function LessonNotes({ lessonId, lessonSlug }: LessonNotesProps) {
  const [notes, setNotes] = useState<LessonNote[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const userNotes = await getLessonNotes(user.id, lessonId);
          setNotes(userNotes);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [lessonId]);

  const handleCreateNote = async () => {
    if (!noteContent.trim()) return;

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Bạn cần đăng nhập để lưu ghi chú.");
        return;
      }

      const newNote = await createNote(user.id, lessonId, lessonSlug, noteContent);
      setNotes([newNote, ...notes]);
      setNoteContent("");
      setIsEditing(false);
      toast.success("Đã lưu ghi chú");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Không thể lưu ghi chú. Vui lòng thử lại.");
    }
  };

  const handleUpdateNote = async (noteId: number) => {
    if (!noteContent.trim()) return;

    try {
      const updatedNote = await updateNote(noteId, noteContent);
      setNotes(notes.map(note => note.id === noteId ? updatedNote : note));
      setEditingNoteId(null);
      setNoteContent("");
      toast.success("Đã cập nhật ghi chú");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Không thể cập nhật ghi chú. Vui lòng thử lại.");
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
      toast.success("Đã xóa ghi chú");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Không thể xóa ghi chú. Vui lòng thử lại.");
    }
  };

  const startEditing = (note?: LessonNote) => {
    if (note) {
      setEditingNoteId(note.id);
      setNoteContent(note.content);
    } else {
      setEditingNoteId(null);
      setNoteContent("");
    }
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingNoteId(null);
    setNoteContent("");
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
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📝</span>
          <h3 className="font-bold text-stone-900 dark:text-stone-100">Ghi chú</h3>
          <span className="text-xs text-stone-500 dark:text-stone-400">({notes.length})</span>
        </div>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 text-sm font-semibold"
          >
            Mở rộng
          </button>
        )}
      </div>

      {isOpen && (
        <div className="p-5">
          {/* Notes List */}
          {notes.length === 0 && !isEditing ? (
            <div className="text-center py-8 text-stone-500 dark:text-stone-400">
              <p className="mb-4">Chưa có ghi chú nào</p>
              <button
                onClick={() => startEditing()}
                className="text-stone-900 dark:text-stone-100 font-semibold hover:underline"
              >
                Thêm ghi chú đầu tiên
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
                        onChange={(e) => setNoteContent(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm resize-none"
                        rows={3}
                        autoFocus
                      />
                      {/\$/.test(noteContent) && (
                        <div className="px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 border border-dashed border-stone-300 dark:border-stone-600 overflow-x-auto">
                          <NoteContent content={noteContent} />
                        </div>
                      )}
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={cancelEditing}
                          className="px-3 py-1 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                        >
                          Hủy
                        </button>
                        <button
                          onClick={() => handleUpdateNote(note.id)}
                          className="px-3 py-1 text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:opacity-90"
                        >
                          Lưu
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <NoteContent content={note.content} />
                      <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditing(note)}
                          className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
                          title="Sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-stone-500 hover:text-red-600 dark:text-stone-400 dark:hover:text-red-400"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Viết ghi chú của bạn..."
                className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm resize-none"
                rows={3}
                autoFocus
              />
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                Mẹo: gõ công thức toán trong $...$ (nội dòng) hoặc $$...$$ (khối riêng) để hiển thị đẹp, ví dụ $$\frac{"{a}"}{"{b}"}$$
              </p>
              {/\$/.test(noteContent) && (
                <div className="mt-2 px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 border border-dashed border-stone-300 dark:border-stone-600 overflow-x-auto">
                  <NoteContent content={noteContent} />
                </div>
              )}
              <div className="flex gap-2 justify-end mt-2">
                <button
                  onClick={cancelEditing}
                  className="px-3 py-1 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateNote}
                  className="px-3 py-1 text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:opacity-90 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Thêm
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
              Thêm ghi chú mới
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
            Thu gọn
          </button>
        </div>
      )}
    </div>
  );
}
