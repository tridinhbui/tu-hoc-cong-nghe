"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Check } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { approveAppealAction, rejectAppealAction, approveMultipleAppealsAction } from "./actions";
import type { AdminLessonAppeal } from "@/lib/admin/appeals";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale, type Locale } from "@/lib/i18n";

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleString(intlLocale(locale), { dateStyle: "short", timeStyle: "short" });
}

export default function AppealsClient({ initialAppeals }: { initialAppeals: AdminLessonAppeal[] }) {
  const { t, locale } = useI18n();
  const ta = t.adminThree.appealsClient;
  const [appeals, setAppeals] = useState(initialAppeals);
  const [approveTarget, setApproveTarget] = useState<number | null>(null);
  const [rejectTarget, setRejectTarget] = useState<number | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showBulkApproveConfirm, setShowBulkApproveConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleApprove(id: number) {
    startTransition(async () => {
      try {
        await approveAppealAction(id);
        setAppeals((prev) => prev.filter((a) => a.id !== id));
        toast.success(ta.approveSuccess);
      } catch (error) {
        console.error("Error approving appeal:", error);
        toast.error(error instanceof Error ? error.message : ta.approveFailed);
      } finally {
        setApproveTarget(null);
      }
    });
  }

  function handleReject(id: number) {
    startTransition(async () => {
      try {
        await rejectAppealAction(id, rejectNote);
        setAppeals((prev) => prev.filter((a) => a.id !== id));
        toast.success(ta.rejectSuccess);
      } catch (error) {
        console.error("Error rejecting appeal:", error);
        toast.error(error instanceof Error ? error.message : ta.rejectFailed);
      } finally {
        setRejectTarget(null);
        setRejectNote("");
      }
    });
  }

  function handleBulkApprove() {
    const ids = Array.from(selectedIds);
    startTransition(async () => {
      try {
        await approveMultipleAppealsAction(ids);
        setAppeals((prev) => prev.filter((a) => !selectedIds.has(a.id)));
        setSelectedIds(new Set());
        toast.success(format(ta.bulkApproveSuccess, { count: ids.length }));
      } catch (error) {
        console.error("Error approving appeals:", error);
        toast.error(error instanceof Error ? error.message : ta.approveFailed);
      } finally {
        setShowBulkApproveConfirm(false);
      }
    });
  }

  function toggleSelect(id: number) {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  }

  function toggleSelectAll() {
    if (selectedIds.size === appeals.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(appeals.map((a) => a.id)));
    }
  }

  if (appeals.length === 0) {
    return <p className="text-sm text-ink-muted">{ta.noAppeals}</p>;
  }

  return (
    <div className="space-y-4">
      {selectedIds.size > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-accent-line rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-accent-ink-strong">
            {format(ta.selectedCount, { count: selectedIds.size })}
          </p>
          <button
            onClick={() => setShowBulkApproveConfirm(true)}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition-colors"
          >
            <Check className="w-4 h-4" />
            {format(ta.approveAllSelected, { count: selectedIds.size })}
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 pb-2 border-b border-line">
        <input
          type="checkbox"
          checked={selectedIds.size === appeals.length && appeals.length > 0}
          onChange={toggleSelectAll}
          disabled={isPending}
          className="w-4 h-4 rounded border-line-strong cursor-pointer"
          title={ta.selectAllTitle}
        />
        <span className="text-xs text-ink-muted">
          {selectedIds.size > 0
            ? format(ta.selectedOf, { selected: selectedIds.size, total: appeals.length })
            : ta.selectToBulkApprove}
        </span>
      </div>

      <div className="space-y-3">
        {appeals.map((a) => (
          <div key={a.id} className={`bg-white dark:bg-stone-900 border rounded-xl p-4 transition-colors ${selectedIds.has(a.id) ? 'border-emerald-400 dark:border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20' : 'border-line'}`}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={selectedIds.has(a.id)}
                  onChange={() => toggleSelect(a.id)}
                  disabled={isPending}
                  className="w-4 h-4 rounded border-line-strong cursor-pointer flex-shrink-0 mt-0.5"
                />
                <div className="min-w-0">
                  <p className="font-bold text-ink">
                    {a.user_name || a.user_email || ta.unknownLearner}
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {format(ta.lessonMeta, { slug: a.lesson_slug ?? "", id: a.lesson_id, date: formatDate(a.created_at, locale) })}
                  </p>
                  {a.note && (
                    <p className="text-sm text-ink-body mt-2 italic">&quot;{a.note}&quot;</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setApproveTarget(a.id)}
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {ta.approve}
                </button>
                <button
                  onClick={() => setRejectTarget(a.id)}
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-line-mid text-ink-soft hover:bg-surface disabled:opacity-50 transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  {ta.reject}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={approveTarget !== null}
        title={ta.approveTitle}
        message={ta.approveMessage}
        confirmLabel={ta.approve}
        onConfirm={() => approveTarget !== null && handleApprove(approveTarget)}
        onCancel={() => setApproveTarget(null)}
        loading={isPending}
      />

      <ConfirmDialog
        open={showBulkApproveConfirm}
        title={ta.bulkApproveTitle}
        message={format(ta.bulkApproveMessage, { count: selectedIds.size })}
        confirmLabel={ta.approveAll}
        onConfirm={handleBulkApprove}
        onCancel={() => setShowBulkApproveConfirm(false)}
        loading={isPending}
      />

      {rejectTarget !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-line w-full max-w-sm p-5 space-y-3">
            <h3 className="font-bold text-ink">{ta.rejectDialogTitle}</h3>
            <textarea
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder={ta.rejectReasonPlaceholder}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-line-mid bg-white dark:bg-stone-800 text-sm text-ink focus:outline-none focus:border-stone-400 resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setRejectTarget(null);
                  setRejectNote("");
                }}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-line-strong text-ink-body hover:bg-surface"
              >
                {ta.cancel}
              </button>
              <button
                onClick={() => rejectTarget !== null && handleReject(rejectTarget)}
                disabled={isPending}
                className="px-4 py-2 text-sm font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50"
              >
                {ta.reject}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
