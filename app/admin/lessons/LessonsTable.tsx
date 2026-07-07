"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Search, BookOpen, Lock, Unlock, Pencil, EyeOff, Star } from "lucide-react";
import type { AdminLessonRow, LessonsResult } from "@/lib/admin/lessons";
import { updateLessonAction } from "./actions";
import EmptyState from "@/components/admin/EmptyState";
import Pagination from "@/components/admin/Pagination";
import Modal from "@/components/admin/Modal";

export default function LessonsTable({
  result,
  initialSearch,
}: {
  result: LessonsResult;
  initialSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);
  const [editing, setEditing] = useState<AdminLessonRow | null>(null);

  function updateParams(patch: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ q: search, page: "1" });
  }

  async function quickToggleVisible(lesson: AdminLessonRow) {
    try {
      await updateLessonAction(lesson.id, { is_visible: !lesson.is_visible });
      toast.success(lesson.is_visible ? "Đã ẩn bài học" : "Đã hiện bài học");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  }

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-stone-200 dark:border-stone-800">
        <form onSubmit={handleSearchSubmit} className="relative max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tiêu đề hoặc slug..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
          />
        </form>
      </div>

      {isPending && <div className="px-4 py-2 text-xs text-stone-400">Đang tải...</div>}

      {result.lessons.length === 0 ? (
        <EmptyState icon={BookOpen} title="Không tìm thấy bài học nào" description="Bảng lessons trên Supabase có thể chưa được đồng bộ - chạy /api/admin/sync-lessons." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-left text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                <th className="px-4 py-3">Bài học</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Điều kiện tiên quyết</th>
                <th className="px-4 py-3">Hoàn thành</th>
                <th className="px-4 py-3 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {result.lessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-stone-400 dark:text-stone-600 w-10">
                        #{lesson.id}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-stone-900 dark:text-stone-100 truncate max-w-xs">
                          {lesson.title}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">{lesson.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {lesson.is_fundamental ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3" /> Nền tảng
                        </span>
                      ) : lesson.prerequisite_id ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                          <Lock className="w-3 h-3" /> Yêu cầu bài #{lesson.prerequisite_id}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                          <Unlock className="w-3 h-3" /> Mở tự do
                        </span>
                      )}
                      {!lesson.is_visible && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full">
                          <EyeOff className="w-3 h-3" /> Đang ẩn
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-400">
                    {lesson.prerequisite_id ? `Bài #${lesson.prerequisite_id}` : "- "}
                  </td>
                  <td className="px-4 py-3 font-semibold text-stone-900 dark:text-stone-100">
                    {lesson.completions}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => quickToggleVisible(lesson)}
                        title={lesson.is_visible ? "Ẩn bài học" : "Hiện bài học"}
                        className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400"
                      >
                        {lesson.is_visible ? <EyeOff className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setEditing(lesson)}
                        title="Sửa"
                        className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={result.page} totalPages={result.totalPages} onChange={(p) => updateParams({ page: String(p) })} />

      {editing && (
        <EditLessonModal
          lesson={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function EditLessonModal({
  lesson,
  onClose,
  onSaved,
}: {
  lesson: AdminLessonRow;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(lesson.title);
  const [subtitle, setSubtitle] = useState(lesson.subtitle ?? "");
  const [prerequisiteId, setPrerequisiteId] = useState(lesson.prerequisite_id?.toString() ?? "");
  const [isFundamental, setIsFundamental] = useState(lesson.is_fundamental);
  const [isVisible, setIsVisible] = useState(lesson.is_visible);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await updateLessonAction(lesson.id, {
        title,
        subtitle,
        prerequisite_id: prerequisiteId.trim() ? Number(prerequisiteId) : null,
        is_fundamental: isFundamental,
        is_visible: isVisible,
      });
      toast.success("Đã lưu thay đổi");
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={`Sửa bài học #${lesson.id}`}
      maxWidth="max-w-lg"
      footer={
        <>
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 text-sm font-bold rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
            Tiêu đề
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
            Mô tả (subtitle)
          </label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={2}
            className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500 resize-none"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
            ID bài học tiên quyết (để trống nếu không cần)
          </label>
          <input
            type="number"
            value={prerequisiteId}
            onChange={(e) => setPrerequisiteId(e.target.value)}
            placeholder="Ví dụ: 20"
            disabled={isFundamental}
            className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500 disabled:opacity-50"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isFundamental}
            onChange={(e) => setIsFundamental(e.target.checked)}
            className="w-4 h-4 rounded border-stone-300 dark:border-stone-700"
          />
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            Bài nền tảng - mở tự do cho mọi người, bỏ qua điều kiện tiên quyết
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isVisible}
            onChange={(e) => setIsVisible(e.target.checked)}
            className="w-4 h-4 rounded border-stone-300 dark:border-stone-700"
          />
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            Hiển thị công khai trên dashboard
          </span>
        </label>
      </div>
    </Modal>
  );
}
