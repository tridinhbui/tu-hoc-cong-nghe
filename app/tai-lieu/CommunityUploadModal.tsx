"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { DOCUMENT_CATEGORIES } from "@/lib/document-categories";
import Modal from "@/components/admin/Modal";
import FileDropzone from "@/components/admin/FileDropzone";
import { submitCommunityDocumentAction } from "./actions";

interface CommunityUploadModalProps {
  open: boolean;
  onClose: () => void;
  loggedIn: boolean;
}

export default function CommunityUploadModal({ open, onClose, loggedIn }: CommunityUploadModalProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    try {
      await submitCommunityDocumentAction(formData);
      toast.success("Đã gửi tài liệu - cảm ơn bạn! Admin sẽ duyệt trước khi hiển thị công khai.");
      formRef.current?.reset();
      onClose();
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không gửi được tài liệu");
    }
    setSubmitting(false);
  }

  return (
    <Modal open={open} onClose={onClose} title="Chia sẻ tài liệu của bạn">
      {!loggedIn ? (
        <div className="text-sm text-stone-600 dark:text-stone-400 space-y-4">
          <p>Bạn cần đăng nhập để chia sẻ tài liệu cho cộng đồng.</p>
          <a
            href="/login"
            className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold hover:bg-stone-800 dark:hover:bg-white transition-colors"
          >
            Đăng nhập
          </a>
        </div>
      ) : (
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <p className="text-xs text-stone-500 dark:text-stone-400 -mt-1">
            Tài liệu sẽ hiển thị công khai sau khi admin duyệt.
          </p>
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">Tiêu đề</label>
            <input
              name="title"
              required
              placeholder="Ví dụ: Mẫu theo dõi chi tiêu cá nhân"
              className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">Mô tả (không bắt buộc)</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Mô tả ngắn về tài liệu này..."
              className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">Danh mục</label>
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
            label="Tệp (PDF, Word, Excel, PowerPoint - tối đa 10MB)"
            required
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-sm font-bold text-stone-700 dark:text-stone-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {submitting ? "Đang gửi..." : "Gửi tài liệu"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
