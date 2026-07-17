"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Check } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { approveAppealAction, rejectAppealAction, approveMultipleAppealsAction } from "./actions";
import type { AdminLessonAppeal } from "@/lib/admin/appeals";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

export default function AppealsClient({ initialAppeals }: { initialAppeals: AdminLessonAppeal[] }) {
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
        toast.success("Đã duyệt - bài học được tính hoàn thành và cộng XP cho học viên.");
      } catch (error) {
        console.error("Error approving appeal:", error);
        toast.error(error instanceof Error ? error.message : "Không thể duyệt khiếu nại.");
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
        toast.success("Đã từ chối khiếu nại.");
      } catch (error) {
        console.error("Error rejecting appeal:", error);
        toast.error(error instanceof Error ? error.message : "Không thể từ chối khiếu nại.");
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
        toast.success(`Đã duyệt ${ids.length} khiếu nại.`);
      } catch (error) {
        console.error("Error approving appeals:", error);
        toast.error(error instanceof Error ? error.message : "Không thể duyệt khiếu nại.");
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
    return <p className="text-sm text-stone-500 dark:text-stone-400">Không có khiếu nại nào đang chờ duyệt.</p>;
  }

  return (
    <div className="space-y-4">
      {selectedIds.size > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            Đã chọn {selectedIds.size} khiếu nại
          </p>
          <button
            onClick={() => setShowBulkApproveConfirm(true)}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition-colors"
          >
            <Check className="w-4 h-4" />
            Duyệt tất cả ({selectedIds.size})
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
        <input
          type="checkbox"
          checked={selectedIds.size === appeals.length && appeals.length > 0}
          onChange={toggleSelectAll}
          disabled={isPending}
          className="w-4 h-4 rounded border-stone-300 dark:border-stone-700 cursor-pointer"
          title="Chọn/bỏ chọn tất cả"
        />
        <span className="text-xs text-stone-500 dark:text-stone-400">
          {selectedIds.size > 0 ? `${selectedIds.size}/${appeals.length} được chọn` : "Chọn để duyệt hàng loạt"}
        </span>
      </div>

      <div className="space-y-3">
        {appeals.map((a) => (
          <div key={a.id} className={`bg-white dark:bg-stone-900 border rounded-xl p-4 transition-colors ${selectedIds.has(a.id) ? 'border-emerald-400 dark:border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20' : 'border-stone-200 dark:border-stone-800'}`}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={selectedIds.has(a.id)}
                  onChange={() => toggleSelect(a.id)}
                  disabled={isPending}
                  className="w-4 h-4 rounded border-stone-300 dark:border-stone-700 cursor-pointer flex-shrink-0 mt-0.5"
                />
                <div className="min-w-0">
                  <p className="font-bold text-stone-900 dark:text-stone-100">
                    {a.user_name || a.user_email || "Học viên"}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Bài <span className="font-mono">{a.lesson_slug}</span> (id {a.lesson_id}) · {formatDate(a.created_at)}
                  </p>
                  {a.note && (
                    <p className="text-sm text-stone-700 dark:text-stone-300 mt-2 italic">&quot;{a.note}&quot;</p>
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
                  Duyệt
                </button>
                <button
                  onClick={() => setRejectTarget(a.id)}
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-50 transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Từ chối
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={approveTarget !== null}
        title="Duyệt khiếu nại?"
        message="Bài học sẽ được đánh dấu hoàn thành thật cho học viên này và XP sẽ được cộng ngay."
        confirmLabel="Duyệt"
        onConfirm={() => approveTarget !== null && handleApprove(approveTarget)}
        onCancel={() => setApproveTarget(null)}
        loading={isPending}
      />

      <ConfirmDialog
        open={showBulkApproveConfirm}
        title="Duyệt tất cả khiếu nại được chọn?"
        message={`Sẽ duyệt ${selectedIds.size} khiếu nại - bài học sẽ được đánh dấu hoàn thành thật và XP sẽ được cộng cho tất cả học viên.`}
        confirmLabel="Duyệt tất cả"
        onConfirm={handleBulkApprove}
        onCancel={() => setShowBulkApproveConfirm(false)}
        loading={isPending}
      />

      {rejectTarget !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 w-full max-w-sm p-5 space-y-3">
            <h3 className="font-bold text-stone-900 dark:text-stone-100">Từ chối khiếu nại</h3>
            <textarea
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder="Lý do từ chối (tuỳ chọn)..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-400 resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setRejectTarget(null);
                  setRejectNote("");
                }}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800"
              >
                Huỷ
              </button>
              <button
                onClick={() => rejectTarget !== null && handleReject(rejectTarget)}
                disabled={isPending}
                className="px-4 py-2 text-sm font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50"
              >
                Từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
