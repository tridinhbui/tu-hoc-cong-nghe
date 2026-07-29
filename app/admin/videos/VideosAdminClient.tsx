"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Search, Play, ExternalLink, Trash2, Save } from "lucide-react";
import type { LessonMeta } from "@/lib/lesson-types";
import { saveLessonVideoAction, deleteLessonVideoAction } from "./actions";

interface LessonWithVideo {
  id: number;
  slug: string;
  title: string;
  videoUrl?: string;
}

interface VideosAdminClientProps {
  lessonsMeta: LessonMeta[];
}

// Admins may paste a full watch/embed/share URL or just the bare ID -
// normalize to the ID so the preview link always resolves correctly
// (naively taking the last "/" segment breaks on "watch?v=ID" URLs, since
// that has no "/" before the ID).
function extractYouTubeId(input: string): string {
  const watchMatch = input.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const pathMatch = input.match(/(?:youtu\.be\/|embed\/)([^?&/]+)/);
  if (pathMatch) return pathMatch[1];
  return input.split("/").pop() || input;
}

export default function VideosAdminClient({ lessonsMeta }: VideosAdminClientProps) {
  const [lessons, setLessons] = useState<LessonWithVideo[]>(lessonsMeta);
  const [filteredLessons, setFilteredLessons] = useState<LessonWithVideo[]>(lessonsMeta);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingUrl, setEditingUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const filtered = lessons.filter((l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLessons(filtered);
  }, [searchQuery, lessons]);

  const handleStartEdit = (lesson: LessonWithVideo) => {
    setEditingId(lesson.id);
    setEditingUrl(lesson.videoUrl || "");
  };

  const handleSaveVideo = async (lessonId: number) => {
    try {
      setSaving(true);
      await saveLessonVideoAction(lessonId, editingUrl);

      setLessons(lessons.map((l) =>
        l.id === lessonId ? { ...l, videoUrl: editingUrl } : l
      ));
      setEditingId(null);
      toast.success("Đã cập nhật video thành công");
    } catch (error) {
      console.error("Error saving video:", error);
      toast.error("Không thể lưu video");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteVideo = async (lessonId: number) => {
    if (!confirm("Bạn chắc chắn muốn xoá video này?")) return;

    try {
      setSaving(true);
      await deleteLessonVideoAction(lessonId);

      setLessons(lessons.map((l) =>
        l.id === lessonId ? { ...l, videoUrl: undefined } : l
      ));
      toast.success("Đã xoá video thành công");
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Không thể xoá video");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
        <input
          type="text"
          placeholder="Tìm bài học..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400"
        />
      </div>

      {/* Videos Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-stone-900 dark:text-stone-100">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-900 dark:text-stone-100">Bài Học</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-900 dark:text-stone-100">Video URL</th>
                <th className="text-left px-4 py-3 font-semibold text-stone-900 dark:text-stone-100">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredLessons.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-stone-500 dark:text-stone-400">
                    Không tìm thấy bài học
                  </td>
                </tr>
              ) : (
                filteredLessons.map((lesson) => (
                  <tr
                    key={lesson.id}
                    className="border-b border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-stone-600 dark:text-stone-400">{lesson.id}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-stone-900 dark:text-stone-100">{lesson.title}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">{lesson.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {editingId === lesson.id ? (
                        <input
                          type="text"
                          value={editingUrl}
                          onChange={(e) => setEditingUrl(e.target.value)}
                          placeholder="https://youtu.be/... hoặc YouTube ID"
                          className="w-full px-2 py-1 rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 text-xs"
                        />
                      ) : lesson.videoUrl ? (
                        <a
                          href={`https://youtube.com/watch?v=${extractYouTubeId(lesson.videoUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" />
                          Xem video
                        </a>
                      ) : (
                        <span className="text-stone-400 text-xs">Chưa có video</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {editingId === lesson.id ? (
                          <>
                            <button
                              onClick={() => handleSaveVideo(lesson.id)}
                              disabled={saving}
                              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-900 dark:text-stone-100"
                            >
                              Huỷ
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStartEdit(lesson)}
                              className="px-2 py-1 rounded text-xs bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-950/60"
                            >
                              {lesson.videoUrl ? "Sửa" : "Thêm"}
                            </button>
                            {lesson.videoUrl && (
                              <button
                                onClick={() => handleDeleteVideo(lesson.id)}
                                className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/40 hover:bg-rose-200 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4">
        <p className="text-sm text-indigo-900 dark:text-indigo-300">
          💡 <span className="font-semibold">Tip:</span> Sử dụng YouTube URL (youtu.be hoặc youtube.com/watch?v=) hoặc chỉ cần ID video YouTube
        </p>
      </div>
    </div>
  );
}
