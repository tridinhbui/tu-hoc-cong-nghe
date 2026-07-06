"use client";

import { useState } from "react";
import { FileText, Download, FileSpreadsheet, FileImage, Archive } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { DOCUMENT_CATEGORIES } from "@/lib/document-categories";
import EmptyState from "@/components/admin/EmptyState";
import type { PublicDocument } from "./page";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function categoryLabel(value: string) {
  return DOCUMENT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

function iconFor(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "xlsx" || ext === "xls") return FileSpreadsheet;
  if (ext === "png" || ext === "jpg" || ext === "jpeg") return FileImage;
  if (ext === "zip") return Archive;
  return FileText;
}

const CATEGORY_FILTERS = [{ value: "all", label: "Tất cả" }, ...DOCUMENT_CATEGORIES];

export default function DocumentsList({ documents }: { documents: PublicDocument[] }) {
  const [filter, setFilter] = useState<string>("all");
  const supabase = createClient();

  const filtered = filter === "all" ? documents : documents.filter((d) => d.category === filter);

  async function handleDownload(doc: PublicDocument) {
    // Best-effort counter — a logged-out visitor or a missing RPC (migration
    // not run yet) should never block the actual download.
    await supabase.rpc("increment_document_download", { doc_id: doc.id }).then(
      () => {},
      () => {}
    );
  }

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {CATEGORY_FILTERS.map((c) => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              filter === c.value
                ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Chưa có tài liệu nào"
          description="Quay lại sau nhé — admin sẽ sớm bổ sung mẫu biểu và ebook miễn phí."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => {
            const Icon = iconFor(doc.file_name);
            return (
              <a
                key={doc.id}
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDownload(doc)}
                className="group block rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-lg dark:hover:shadow-stone-900/50 transition-all overflow-hidden bg-white dark:bg-stone-900"
              >
                {/* Icon */}
                <div className="w-full h-48 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 flex items-center justify-center">
                  <Icon className="w-16 h-16 text-stone-300 dark:text-stone-700" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wide bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-full">
                      {categoryLabel(doc.category)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2 line-clamp-2 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
                    {doc.title}
                  </h3>

                  {doc.description && (
                    <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-3">
                      {doc.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
                    <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                      {formatBytes(doc.file_size)}
                    </span>
                    <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                      <Download className="w-4 h-4" />
                      <span className="text-xs font-bold">Tải về</span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
