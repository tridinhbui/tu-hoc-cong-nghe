"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload, FileText, Trash2, Download, Plus, Pencil } from "lucide-react";
import type { DocumentRow } from "@/lib/admin/documents";
import { DOCUMENT_CATEGORIES } from "@/lib/document-categories";
import { uploadDocumentAction, updateDocumentAction, deleteDocumentAction } from "./actions";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Modal from "@/components/admin/Modal";
import FileDropzone from "@/components/admin/FileDropzone";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function categoryLabel(value: string) {
  return DOCUMENT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export default function DocumentsManager({ documents }: { documents: DocumentRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showUpload, setShowUpload] = useState(false);
  const [toEdit, setToEdit] = useState<DocumentRow | null>(null);
  const [toDelete, setToDelete] = useState<DocumentRow | null>(null);
  const [uploading, setUploading] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const editFormRef = useRef<HTMLFormElement>(null);

  async function handleUpload(formData: FormData) {
    setUploading(true);
    try {
      await uploadDocumentAction(formData);
      toast.success("Đã tải lên tài liệu");
      setShowUpload(false);
      formRef.current?.reset();
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không tải lên được tài liệu");
    }
    setUploading(false);
  }

  async function handleUpdate(formData: FormData) {
    if (!toEdit) return;
    setSavingEdit(true);
    try {
      await updateDocumentAction(toEdit.id, formData);
      toast.success("Đã lưu thay đổi");
      setToEdit(null);
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không lưu được thay đổi");
    }
    setSavingEdit(false);
  }

  async function confirmDelete() {
    if (!toDelete) return;
    try {
      await deleteDocumentAction(toDelete.id);
      toast.success("Đã xóa tài liệu");
      setToDelete(null);
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không xóa được tài liệu");
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold hover:bg-stone-800 dark:hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tải tài liệu mới
        </button>
      </div>

      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
        {documents.length === 0 ? (
          <EmptyState icon={FileText} title="Chưa có tài liệu nào" description="Tải lên mẫu biểu, ebook, checklist đầu tiên cho học viên." />
        ) : (
          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 flex items-start gap-4">
                {doc.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={doc.image_url}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-stone-100 dark:bg-stone-800"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">{doc.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-2 py-0.5 rounded-full">
                      {categoryLabel(doc.category)}
                    </span>
                  </div>
                  {doc.description && (
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">{doc.description}</p>
                  )}
                  <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1.5">
                    {doc.file_name} · {formatBytes(doc.file_size)} · {doc.download_count} lượt tải ·{" "}
                    {new Date(doc.created_at).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Xem/tải xuống"
                    className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => {
                      setRemoveImage(false);
                      setToEdit(doc);
                    }}
                    title="Sửa"
                    className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setToDelete(doc)}
                    title="Xóa"
                    className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={showUpload} onClose={() => setShowUpload(false)} title="Tải tài liệu mới">
        <form
          ref={formRef}
          action={handleUpload}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">Tiêu đề</label>
            <input
              name="title"
              required
              placeholder="Ví dụ: Mẫu bảng tính tài sản ròng"
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
            label="Tệp (PDF, Word, Excel, PowerPoint - tối đa 25MB)"
            required
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg"
          />
          <FileDropzone
            name="image"
            label="Ảnh minh hoạ (không bắt buộc - tối đa 5MB)"
            accept=".png,.jpg,.jpeg,.webp"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowUpload(false)}
              className="px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-sm font-bold text-stone-700 dark:text-stone-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {uploading ? "Đang tải lên..." : "Tải lên"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={!!toEdit} onClose={() => setToEdit(null)} title="Sửa tài liệu">
        {toEdit && (
          <form ref={editFormRef} action={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">Tiêu đề</label>
              <input
                name="title"
                required
                defaultValue={toEdit.title}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">Mô tả (không bắt buộc)</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={toEdit.description ?? ""}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">Danh mục</label>
              <select
                name="category"
                defaultValue={toEdit.category}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100"
              >
                {DOCUMENT_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <FileDropzone
              name="file"
              label="Thay tệp mới (không bắt buộc - để trống nếu giữ tệp hiện tại)"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg"
              currentFileName={toEdit.file_name}
            />

            <div className="space-y-2">
              {toEdit.image_url && !removeImage ? (
                <div className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 dark:border-stone-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={toEdit.image_url} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <span className="flex-1 text-sm text-stone-600 dark:text-stone-400">Ảnh minh hoạ hiện tại</span>
                  <button
                    type="button"
                    onClick={() => setRemoveImage(true)}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Xoá ảnh
                  </button>
                </div>
              ) : (
                <FileDropzone
                  name="image"
                  label="Ảnh minh hoạ (không bắt buộc - tối đa 5MB)"
                  accept=".png,.jpg,.jpeg,.webp"
                />
              )}
              <input type="hidden" name="removeImage" value={removeImage ? "true" : "false"} />
              {removeImage && (
                <button
                  type="button"
                  onClick={() => setRemoveImage(false)}
                  className="text-xs font-bold text-stone-600 dark:text-stone-400 hover:underline"
                >
                  Hoàn tác - giữ ảnh cũ
                </button>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setToEdit(null)}
                className="px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-sm font-bold text-stone-700 dark:text-stone-300"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={savingEdit}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold disabled:opacity-50"
              >
                {savingEdit ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        )}
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Xóa tài liệu"
        message={`Bạn có chắc muốn xóa "${toDelete?.title}"? Tệp sẽ bị xóa vĩnh viễn khỏi lưu trữ.`}
        confirmLabel="Xóa"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
