"use client";

import Modal from "./Modal";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary, btnSecondary } from "@/components/ui/system";

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
            className={`${btnSecondary} cursor-pointer`}
          >
            {tc.cancel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={
              danger
                ? "inline-flex items-center justify-center gap-2 rounded-sm bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                : `${btnPrimary} cursor-pointer`
            }
          >
            {loading ? tc.processing : resolvedConfirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm text-ink-soft">{message}</p>
    </Modal>
  );
}
