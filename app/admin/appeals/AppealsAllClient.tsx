"use client";

import Link from "next/link";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import type { AdminLessonAppeal } from "@/lib/admin/appeals";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

function getStatusBadge(status: string) {
  switch (status) {
    case "approved":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="w-3 h-3" />
          Đã duyệt
        </span>
      );
    case "rejected":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
          <XCircle className="w-3 h-3" />
          Đã từ chối
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
          <Clock className="w-3 h-3" />
          Chờ duyệt
        </span>
      );
    default:
      return null;
  }
}

export default function AppealsAllClient({ initialAppeals }: { initialAppeals: AdminLessonAppeal[] }) {
  const grouped = {
    pending: initialAppeals.filter((a) => a.status === "pending"),
    approved: initialAppeals.filter((a) => a.status === "approved"),
    rejected: initialAppeals.filter((a) => a.status === "rejected"),
  };

  if (initialAppeals.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">Không có khiếu nại nào.</p>;
  }

  return (
    <div className="space-y-8">
      {/* Pending Appeals */}
      {grouped.pending.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-amber-700 dark:text-amber-300 mb-3">Chờ duyệt ({grouped.pending.length})</h2>
          <div className="space-y-3">
            {grouped.pending.map((a) => (
              <div key={a.id} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        {a.user_name || a.user_email || "Học viên"}
                      </p>
                      {getStatusBadge(a.status)}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Bài <span className="font-mono">{a.lesson_slug}</span> (id {a.lesson_id}) · {formatDate(a.created_at)}
                    </p>
                    {a.note && (
                      <p className="text-sm text-stone-700 dark:text-stone-300 mt-2 italic">&quot;{a.note}&quot;</p>
                    )}
                  </div>
                  <Link
                    href="/admin/appeals"
                    className="text-xs font-bold px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shrink-0"
                  >
                    Duyệt
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved Appeals */}
      {grouped.approved.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-3">Đã duyệt ({grouped.approved.length})</h2>
          <div className="space-y-3">
            {grouped.approved.map((a) => (
              <div key={a.id} className="bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-900/30 rounded-xl p-4 opacity-75">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        {a.user_name || a.user_email || "Học viên"}
                      </p>
                      {getStatusBadge(a.status)}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Bài <span className="font-mono">{a.lesson_slug}</span> (id {a.lesson_id}) · {formatDate(a.created_at)}
                      {a.reviewed_at && (
                        <> · Duyệt lúc {formatDate(a.reviewed_at)}</>
                      )}
                    </p>
                    {a.note && (
                      <p className="text-sm text-stone-700 dark:text-stone-300 mt-2 italic">&quot;{a.note}&quot;</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rejected Appeals */}
      {grouped.rejected.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-rose-700 dark:text-rose-300 mb-3">Đã từ chối ({grouped.rejected.length})</h2>
          <div className="space-y-3">
            {grouped.rejected.map((a) => (
              <div key={a.id} className="bg-white dark:bg-stone-900 border border-rose-200 dark:border-rose-900/30 rounded-xl p-4 opacity-75">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        {a.user_name || a.user_email || "Học viên"}
                      </p>
                      {getStatusBadge(a.status)}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Bài <span className="font-mono">{a.lesson_slug}</span> (id {a.lesson_id}) · {formatDate(a.created_at)}
                      {a.reviewed_at && (
                        <> · Từ chối lúc {formatDate(a.reviewed_at)}</>
                      )}
                    </p>
                    {a.note && (
                      <p className="text-sm text-stone-700 dark:text-stone-300 mt-2 italic">&quot;{a.note}&quot;</p>
                    )}
                    {a.admin_note && (
                      <p className="text-xs bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 rounded px-2 py-1 mt-2">
                        <span className="font-bold">Lý do:</span> {a.admin_note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
