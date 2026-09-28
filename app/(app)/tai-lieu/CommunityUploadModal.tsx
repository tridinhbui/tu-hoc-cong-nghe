"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { documentCategoriesOf } from "@/lib/document-categories";
import Modal from "@/components/admin/Modal";
import FileDropzone from "@/components/admin/FileDropzone";
import { submitCommunityDocumentAction } from "./actions";
import { useI18n } from "@/lib/i18n/context";
import { btnPrimary, btnSecondary } from "@/components/ui/system";

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
        <div className="text-sm text-ink-soft space-y-4">
          <p>{t.communityUpload.loginRequiredMessage}</p>
          <a
            href="/login"
            className={`${btnPrimary} w-full`}
          >
            {t.communityUpload.loginButton}
          </a>
        </div>
      ) : (
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <p className="text-xs text-ink-muted -mt-1">
            {t.communityUpload.visibilityNote}
          </p>
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{t.communityUpload.titleLabel}</label>
            <input
              name="title"
              required
              placeholder={t.communityUpload.titlePlaceholder}
              className="w-full px-3 py-2 rounded-sm border border-line-strong bg-white dark:bg-stone-800 text-sm text-ink focus:border-brand-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{t.communityUpload.descriptionLabel}</label>
            <textarea
              name="description"
              rows={3}
              placeholder={t.communityUpload.descriptionPlaceholder}
              className="w-full px-3 py-2 rounded-sm border border-line-strong bg-white dark:bg-stone-800 text-sm text-ink focus:border-brand-500 focus:outline-none resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">{t.communityUpload.categoryLabel}</label>
            <select
              name="category"
              defaultValue="khac"
              className="w-full px-3 py-2 rounded-sm border border-line-strong bg-white dark:bg-stone-800 text-sm text-ink focus:border-brand-500 focus:outline-none"
            >
              {documentCategoriesOf(t).map((c) => (
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
              className={btnSecondary}
            >
              {t.communityUpload.cancelButton}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={btnPrimary}
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
