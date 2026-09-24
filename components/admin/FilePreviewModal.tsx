"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Download, Eye } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface FilePreviewModalProps {
  open: boolean;
  file: File | null;
  onClose: () => void;
}

export default function FilePreviewModal({ open, file, onClose }: FilePreviewModalProps) {
  const { t } = useI18n();
  const tp = t.adminOne.filePreview;
  const [previewUrl, setPreviewUrl] = useState<string>("");
  // Kiểu và cỡ tệp là hàm thuần của `file`, nên suy ra trong lúc render. Nằm
  // chung effect với phần tạo object URL bên dưới chỉ vì cả hai cùng đọc
  // `file`, và cái giá là một lượt render đầu tiên không có thông tin tệp -
  // hộp xem trước hiện ra trống rồi mới điền.
  const fileInfo = useMemo(
    () => (file ? { type: file.type, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` } : null),
    [file]
  );

  useEffect(() => {
    if (!file) return;

    const type = file.type;

    // Create preview URL for images and PDFs
    if (type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else if (type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [file, previewUrl]);

  if (!open || !file) return null;

  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";
  const isExcel =
    file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.type === "application/vnd.ms-excel" ||
    file.name.endsWith(".xlsx") ||
    file.name.endsWith(".xls");

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-line w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-line">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-ink-soft" />
            <h3 className="font-bold text-ink">
              {format(tp.previewOf, { name: file.name })}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface-raised text-stone-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-5">
          {isImage && previewUrl && (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt={tp.previewAlt}
                className="max-w-full max-h-[60vh] rounded-lg object-contain"
              />
            </div>
          )}

          {isPdf && previewUrl && (
            <iframe
              src={previewUrl}
              className="w-full h-[60vh] rounded-lg border border-line-mid"
              title={tp.pdfPreviewTitle}
            />
          )}

          {isExcel && fileInfo && (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                <p className="text-sm text-ink-soft mb-2">{tp.fileInfoTitle}</p>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold text-ink-body">{tp.nameLabel}</span>{" "}
                    <span className="text-ink-soft">{file.name}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-ink-body">{tp.typeLabel}</span>{" "}
                    <span className="text-ink-soft">
                      {fileInfo.type || tp.excelSpreadsheetFallback}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-ink-body">{tp.sizeLabel}</span>{" "}
                    <span className="text-ink-soft">{fileInfo.size}</span>
                  </p>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-warn-line rounded-lg p-4 text-sm text-warn-ink">
                {tp.excelCannotPreview}
              </div>
            </div>
          )}

          {!isImage && !isPdf && !isExcel && fileInfo && (
            <div className="space-y-4">
              <div className="bg-surface-raised border border-line-strong rounded-lg p-6 text-center">
                <p className="text-2xl mb-2">📄</p>
                <p className="font-semibold text-ink mb-2">{file.name}</p>
                <p className="text-sm text-ink-soft">
                  {tp.unsupportedPreview}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface rounded-lg p-3">
                  <p className="text-xs text-ink-soft">{tp.typeCaption}</p>
                  <p className="font-semibold text-ink text-sm">
                    {fileInfo.type || tp.unknownFallback}
                  </p>
                </div>
                <div className="bg-surface rounded-lg p-3">
                  <p className="text-xs text-ink-soft">{tp.sizeCaption}</p>
                  <p className="font-semibold text-ink text-sm">
                    {fileInfo.size}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 border-t border-line">
          <a
            href={previewUrl || "#"}
            download={file.name}
            className={`inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${
              previewUrl
                ? "bg-surface-raised text-ink-body hover:bg-surface-sunken"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            <Download className="w-4 h-4" />
            {tp.download}
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
          >
            {tp.close}
          </button>
        </div>
      </div>
    </div>
  );
}
