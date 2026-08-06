"use client";

import Link from "next/link";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import type { AdminLessonAppeal } from "@/lib/admin/appeals";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleString(intlLocale(locale), { dateStyle: "short", timeStyle: "short" });
}

function getStatusBadge(status: string, t: Dictionary) {
  const ta = t.adminThree.appealsAllClient;
  switch (status) {
    case "approved":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="w-3 h-3" />
          {ta.statusApproved}
        </span>
      );
    case "rejected":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
          <XCircle className="w-3 h-3" />
          {ta.statusRejected}
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
          <Clock className="w-3 h-3" />
          {ta.statusPending}
        </span>
      );
    default:
      return null;
  }
}

export default function AppealsAllClient({ initialAppeals }: { initialAppeals: AdminLessonAppeal[] }) {
  const { t, locale } = useI18n();
  const ta = t.adminThree.appealsAllClient;
  const grouped = {
    pending: initialAppeals.filter((a) => a.status === "pending"),
    approved: initialAppeals.filter((a) => a.status === "approved"),
    rejected: initialAppeals.filter((a) => a.status === "rejected"),
  };

  if (initialAppeals.length === 0) {
    return <p className="text-sm text-stone-500 dark:text-stone-400">{ta.noAppeals}</p>;
  }

  return (
    <div className="space-y-8">
      {/* Pending Appeals */}
      {grouped.pending.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-amber-700 dark:text-amber-300 mb-3">
            {format(ta.pendingHeading, { count: grouped.pending.length })}
          </h2>
          <div className="space-y-3">
            {grouped.pending.map((a) => (
              <div key={a.id} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        {a.user_name || a.user_email || ta.unknownLearner}
                      </p>
                      {getStatusBadge(a.status, t)}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {format(ta.lessonMeta, { slug: a.lesson_slug ?? "", id: a.lesson_id, date: formatDate(a.created_at, locale) })}
                    </p>
                    {a.note && (
                      <p className="text-sm text-stone-700 dark:text-stone-300 mt-2 italic">&quot;{a.note}&quot;</p>
                    )}
                  </div>
                  <Link
                    href="/admin/appeals"
                    className="text-xs font-bold px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shrink-0"
                  >
                    {ta.approve}
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
          <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-3">
            {format(ta.approvedHeading, { count: grouped.approved.length })}
          </h2>
          <div className="space-y-3">
            {grouped.approved.map((a) => (
              <div key={a.id} className="bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-900/30 rounded-xl p-4 opacity-75">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        {a.user_name || a.user_email || ta.unknownLearner}
                      </p>
                      {getStatusBadge(a.status, t)}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {format(ta.lessonMeta, { slug: a.lesson_slug ?? "", id: a.lesson_id, date: formatDate(a.created_at, locale) })}
                      {a.reviewed_at && (
                        <> {format(ta.approvedAt, { date: formatDate(a.reviewed_at, locale) })}</>
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
          <h2 className="text-lg font-bold text-rose-700 dark:text-rose-300 mb-3">
            {format(ta.rejectedHeading, { count: grouped.rejected.length })}
          </h2>
          <div className="space-y-3">
            {grouped.rejected.map((a) => (
              <div key={a.id} className="bg-white dark:bg-stone-900 border border-rose-200 dark:border-rose-900/30 rounded-xl p-4 opacity-75">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        {a.user_name || a.user_email || ta.unknownLearner}
                      </p>
                      {getStatusBadge(a.status, t)}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {format(ta.lessonMeta, { slug: a.lesson_slug ?? "", id: a.lesson_id, date: formatDate(a.created_at, locale) })}
                      {a.reviewed_at && (
                        <> {format(ta.rejectedAt, { date: formatDate(a.reviewed_at, locale) })}</>
                      )}
                    </p>
                    {a.note && (
                      <p className="text-sm text-stone-700 dark:text-stone-300 mt-2 italic">&quot;{a.note}&quot;</p>
                    )}
                    {a.admin_note && (
                      <p className="text-xs bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 rounded px-2 py-1 mt-2">
                        <span className="font-bold">{ta.reasonLabel}</span> {a.admin_note}
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
