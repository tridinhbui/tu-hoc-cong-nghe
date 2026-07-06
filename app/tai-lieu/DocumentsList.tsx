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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((doc) => {
            const Icon = iconFor(doc.file_name);
            return (
              <a
                key={doc.id}
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDownload(doc)}
                className="block rounded-xl border-2 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-stone-900 dark:text-stone-100">{doc.title}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wide bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2 py-0.5 rounded-full">
                        {categoryLabel(doc.category)}
                      </span>
                    </div>
                    {doc.description && (
                      <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">{doc.description}</p>
                    )}
                    <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-2">{formatBytes(doc.file_size)}</p>
                  </div>
                  <Download className="w-4 h-4 text-stone-400 dark:text-stone-500 flex-shrink-0 mt-1" />
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
