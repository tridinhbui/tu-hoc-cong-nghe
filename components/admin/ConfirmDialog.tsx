"use client";

import Modal from "./Modal";
import { useI18n } from "@/lib/i18n/context";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  danger = false,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  const { t } = useI18n();
  const tc = t.adminThree.confirmDialog;
  const resolvedConfirmLabel = confirmLabel ?? tc.confirm;
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      footer={
        <>
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            {tc.cancel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 text-sm font-bold rounded-lg text-white transition-colors disabled:opacity-50 ${
              danger ? "bg-rose-600 hover:bg-rose-700" : "bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900"
            }`}
          >
            {loading ? tc.processing : resolvedConfirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm text-stone-600 dark:text-stone-400">{message}</p>
    </Modal>
  );
}
