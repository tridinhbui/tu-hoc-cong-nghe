"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Trash2, ExternalLink } from "lucide-react";
import { deleteAiReportAction } from "./actions";
import type { AdminAiReportRow } from "@/lib/admin/ai-reports";

interface AiReportsClientProps {
  initialReports: AdminAiReportRow[];
}

export default function AiReportsClient({ initialReports }: AiReportsClientProps) {
  const [reports, setReports] = useState<AdminAiReportRow[]>(initialReports);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (deletingId) return;
    if (!confirm("Bạn có chắc chắn muốn bỏ qua/xóa báo cáo này?")) return;

    setDeletingId(id);
    try {
      const res = await deleteAiReportAction(id);
      if (res.success) {
        setReports((prev) => prev.filter((r) => r.id !== id));
        toast.success("Đã xóa báo cáo thành công");
      } else {
        toast.error(res.error || "Không thể xóa báo cáo");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối máy chủ");
    } finally {
      setDeletingId(null);
    }
  }

  if (reports.length === 0) {
    return (
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-8 text-center text-stone-500 dark:text-stone-400 text-sm">
        Không có báo cáo lỗi AI nào đang chờ xử lý. Cảm ơn bạn!
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-500 font-bold uppercase tracking-wider">
              <th className="px-6 py-3.5">Người báo cáo</th>
              <th className="px-6 py-3.5">Nội dung (Bị nghi là do AI viết)</th>
              <th className="px-6 py-3.5">Bài học</th>
              <th className="px-6 py-3.5">Thời gian</th>
              <th className="px-6 py-3.5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-stone-900 dark:text-stone-100">{report.user_name}</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">{report.user_email}</div>
                </td>
                <td className="px-6 py-4 max-w-sm">
                  <p className="italic bg-rose-50 dark:bg-rose-950/20 border-l-2 border-rose-400 text-stone-700 dark:text-stone-300 px-2.5 py-1.5 rounded-r-md text-xs line-clamp-3">
                    "{report.quote}"
                  </p>
                </td>
                <td className="px-6 py-4">
                  {report.lesson_slug ? (
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-stone-700 dark:text-stone-300 max-w-[200px] truncate" title={report.lesson_title}>
                        {report.lesson_title}
                      </div>
                      <Link
                        href={`/bai-hoc/${report.lesson_slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-xs"
                      >
                        Xem bài học
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <span className="text-stone-400 text-xs font-medium">ID: {report.lesson_id}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-xs text-stone-500 dark:text-stone-400">
                  {new Date(report.created_at).toLocaleString("vi-VN")}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(report.id)}
                    disabled={deletingId === report.id}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa / Bỏ qua
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
