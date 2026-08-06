"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { EyeOff, ExternalLink, CheckCircle2, Users } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { ignoreAiReportAction, resolveAiReportsForLessonAction } from "./actions";
import { groupAiReportsByLesson, type AdminAiReportRow } from "@/lib/admin/ai-report-grouping";

interface AiReportsClientProps {
  initialReports: AdminAiReportRow[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

export default function AiReportsClient({ initialReports }: AiReportsClientProps) {
  const [reports, setReports] = useState<AdminAiReportRow[]>(initialReports);
  const [resolveTarget, setResolveTarget] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const groups = useMemo(() => groupAiReportsByLesson(reports), [reports]);
  const pendingGroup = groups.find((g) => g.lesson_id === resolveTarget) ?? null;

  function handleResolveLesson(lessonId: number) {
    startTransition(async () => {
      const res = await resolveAiReportsForLessonAction(lessonId);
      if (res.success) {
        setReports((prev) => prev.filter((r) => r.lesson_id !== lessonId));
        toast.success("Đã đóng toàn bộ báo cáo của bài học này.");
      } else {
        toast.error(res.error || "Không thể đóng cụm báo cáo");
      }
      setResolveTarget(null);
    });
  }

  function handleIgnoreQuote(ids: number[]) {
    startTransition(async () => {
      const results = await Promise.all(ids.map((id) => ignoreAiReportAction(id)));
      const closed = ids.filter((_, i) => results[i].success);
      if (closed.length > 0) {
        const closedSet = new Set(closed);
        setReports((prev) => prev.filter((r) => !closedSet.has(r.id)));
      }
      if (closed.length === ids.length) {
        toast.success("Đã bỏ qua đoạn này.");
      } else {
        const failure = results.find((r) => !r.success);
        toast.error(failure?.error || `Chỉ bỏ qua được ${closed.length}/${ids.length} báo cáo.`);
      }
    });
  }

  if (groups.length === 0) {
    return (
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-8 text-center text-stone-500 dark:text-stone-400 text-sm">
        Không có báo cáo lỗi AI nào đang chờ xử lý. Cảm ơn bạn!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-stone-500 dark:text-stone-400">
        <span className="font-bold text-stone-700 dark:text-stone-300">{reports.length}</span> báo cáo trên{" "}
        <span className="font-bold text-stone-700 dark:text-stone-300">{groups.length}</span> bài học · bài bị báo nhiều
        nhất xếp trước
      </p>

      {groups.map((group) => (
        <div
          key={group.lesson_id}
          className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="flex items-start justify-between gap-3 flex-wrap px-5 py-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-stone-900 dark:text-stone-100 truncate" title={group.lesson_title}>
                  {group.lesson_title}
                </h3>
                <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-extrabold bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300">
                  {group.total} báo cáo
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {group.lesson_slug ? (
                  <span className="font-mono">{group.lesson_slug}</span>
                ) : (
                  <span>ID: {group.lesson_id}</span>
                )}{" "}
                · {group.quotes.length} đoạn · mới nhất {formatDate(group.latest_at)}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {group.lesson_slug && (
                <Link
                  href={`/bai-hoc/${group.lesson_slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  Xem bài học
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
              <button
                onClick={() => setResolveTarget(group.lesson_id)}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Đã sửa bài này
              </button>
            </div>
          </div>

          <ul className="divide-y divide-stone-100 dark:divide-stone-800">
            {group.quotes.map((q) => (
              <li key={q.ids[0]} className="px-5 py-3.5 flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="italic bg-rose-50 dark:bg-rose-950/20 border-l-2 border-rose-400 text-stone-700 dark:text-stone-300 px-2.5 py-1.5 rounded-r-md text-xs">
                    &quot;{q.quote}&quot;
                  </p>
                  <div className="flex items-center gap-2 flex-wrap mt-1.5 text-xs text-stone-500 dark:text-stone-400">
                    {q.count > 1 && (
                      <span className="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400">
                        <Users className="w-3.5 h-3.5" />
                        {q.count} người cùng báo
                      </span>
                    )}
                    {q.reporters.length > 0 && <span className="truncate">{q.reporters.join(", ")}</span>}
                    <span>· {formatDate(q.latest_at)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleIgnoreQuote(q.ids)}
                  disabled={isPending}
                  className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition disabled:opacity-50"
                  title="Đã xem, không phải lỗi nội dung"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  Bỏ qua
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <ConfirmDialog
        open={pendingGroup !== null}
        title="Đóng toàn bộ báo cáo của bài này?"
        message={
          pendingGroup
            ? `Sẽ đánh dấu ${pendingGroup.total} báo cáo trên bài "${pendingGroup.lesson_title}" là đã xử lý và ẩn khỏi hàng đợi. Dữ liệu vẫn được giữ lại. Chỉ làm sau khi nội dung bài đã được sửa xong.`
            : ""
        }
        confirmLabel="Đã sửa, đóng hết"
        onConfirm={() => pendingGroup !== null && handleResolveLesson(pendingGroup.lesson_id)}
        onCancel={() => setResolveTarget(null)}
        loading={isPending}
      />
    </div>
  );
}
