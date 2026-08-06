"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { DOCUMENT_CATEGORIES } from "@/lib/document-categories";
import Modal from "@/components/admin/Modal";
import FileDropzone from "@/components/admin/FileDropzone";
import { submitCommunityDocumentAction } from "./actions";
import { useI18n } from "@/lib/i18n/context";

interface CommunityUploadModalProps {
  open: boolean;
  onClose: () => void;
  loggedIn: boolean;
}

export default function CommunityUploadModal({ open, onClose, loggedIn }: CommunityUploadModalProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    try {
      await submitCommunityDocumentAction(formData);
      toast.success(t.communityUpload.toastSuccess);
      formRef.current?.reset();
      onClose();
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.communityUpload.toastErrorFallback);
    }
    setSubmitting(false);
  }

  return (
    <Modal open={open} onClose={onClose} title={t.communityUpload.modalTitle}>
      {!loggedIn ? (
        <div className="text-sm text-stone-600 dark:text-stone-400 space-y-4">
          <p>{t.communityUpload.loginRequiredMessage}</p>
          <a
            href="/login"
            className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold hover:bg-stone-800 dark:hover:bg-white transition-colors"
          >
            {t.communityUpload.loginButton}
          </a>
        </div>
      ) : (
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <p className="text-xs text-stone-500 dark:text-stone-400 -mt-1">
            {t.communityUpload.visibilityNote}
          </p>
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">{t.communityUpload.titleLabel}</label>
            <input
              name="title"
              required
              placeholder={t.communityUpload.titlePlaceholder}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">{t.communityUpload.descriptionLabel}</label>
            <textarea
              name="description"
              rows={3}
              placeholder={t.communityUpload.descriptionPlaceholder}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">{t.communityUpload.categoryLabel}</label>
            <select
              name="category"
              defaultValue="khac"
              className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100"
            >
              {DOCUMENT_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <FileDropzone
            name="file"
            label={t.communityUpload.fileLabel}
            required
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-sm font-bold text-stone-700 dark:text-stone-300"
            >
              {t.communityUpload.cancelButton}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {submitting ? t.communityUpload.submittingButton : t.communityUpload.submitButton}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
