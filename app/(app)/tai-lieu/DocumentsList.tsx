"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Download, FileSpreadsheet, FileImage, Archive, Plus } from "lucide-react";
import { createClient } from "@/lib/cloudflare";
import { trackFeatureClick } from "@/lib/feature-events";
import { toDownloadUrl } from "@/lib/storage-download";
import { documentCategoriesOf, documentCategoryLabel } from "@/lib/document-categories";
import EmptyState from "@/components/admin/EmptyState";
import Modal from "@/components/admin/Modal";
import CommunityUploadModal from "./CommunityUploadModal";
import type { PublicDocument } from "./page";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { StatusDot, btnPrimary, tabClass } from "@/components/ui/system";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function categoryLabel(value: string, t: Dictionary) {
  return documentCategoryLabel(value, t);
}

// A non-approved row can only ever belong to the viewer themself (see the
// documents select RLS policy in cloudflare/migrations/20260709_community_documents.sql),
// so this badge always means "your own pending/rejected submission", never
// someone else's.
function statusBadge(status: PublicDocument["status"], t: Dictionary) {
  if (status === "pending") return { label: t.documentsList.statusPending, className: "border-warn-line-mid text-warn-strong" };
  if (status === "rejected") return { label: t.documentsList.statusRejected, className: "border-danger-line text-alert-strong" };
  return null;
}

function iconFor(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "xlsx" || ext === "xls") return FileSpreadsheet;
  if (ext === "png" || ext === "jpg" || ext === "jpeg") return FileImage;
  if (ext === "zip") return Archive;
  return FileText;
}

function getCategoryFilters(t: Dictionary) {
  return [{ value: "all", label: t.documentsList.allCategoriesFilter }, ...documentCategoriesOf(t)];
}

/** Tài liệu sắp có. Từng là một dòng gõ-xoá chữ chạy mãi kèm chấm đỏ nhấp
 *  nháy - chuyển động trang trí đúng loại hệ thiết kế bỏ đi. Giờ là một danh
 *  sách tĩnh: cùng nội dung, đọc được một lượt, không đòi mắt chạy theo. */
function UpcomingBanner() {
  const { t } = useI18n();
  const words = t.documentsList.typingWords;
  return (
    <div className="mb-6 rounded-sm border border-line bg-white p-4 dark:bg-stone-900">
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
        <StatusDot />
        {t.documentsList.updatingLabel}
      </p>
      <ul className="mt-2 divide-y divide-stone-200 dark:divide-stone-800">
        {words.map((w) => (
          <li key={w} className="py-1.5 text-xs font-semibold text-ink-body">
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DocumentsList({ documents, currentUserId }: { documents: PublicDocument[]; currentUserId: string | null }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<string>("all");
  const [openDoc, setOpenDoc] = useState<PublicDocument | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const cloudflare = createClient();
  const categoryFilters = getCategoryFilters(t);

  const filtered = filter === "all" ? documents : documents.filter((d) => d.category === filter);

  async function handleDownload(doc: PublicDocument) {
    trackFeatureClick("document_download", { label: doc.file_name });
    // Best-effort counter - a logged-out visitor or a missing RPC (migration
    // not run yet) should never block the actual download.
    await cloudflare.rpc("increment_document_download", { doc_id: doc.id }).then(
      () => {},
      () => {}
    );
  }

  return (
    <div>
      <UpcomingBanner />
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div role="tablist" className="flex flex-wrap gap-x-5 gap-y-2 border-b border-line">
          {categoryFilters.map((c) => (
            <button
              key={c.value}
              type="button"
              role="tab"
              aria-selected={filter === c.value}
              onClick={() => setFilter(c.value)}
              className={`cursor-pointer ${tabClass(filter === c.value)}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-sm border border-stone-400 px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:border-stone-950 dark:border-stone-600 dark:hover:border-stone-200"
        >
          <Plus className="w-3.5 h-3.5" />
          {t.documentsList.shareButton}
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={t.documentsList.emptyTitle}
          description={t.documentsList.emptyDescription}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc) => {
            const Icon = iconFor(doc.file_name);
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => {
                  setOpenDoc(doc);
                  trackFeatureClick("document_open", { label: doc.file_name });
                }}
                className="group overflow-hidden rounded-md border border-stone-300 bg-white text-left transition-colors hover:border-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-300"
              >
                {/* Cover image or icon */}
                {doc.image_url ? (
                  <div className="relative w-full h-44 border-b border-line bg-surface-raised overflow-hidden">
                    {/* Khung đã có kích thước cố định (h-48) và `relative`, nên
                        `fill` là dạng đúng ở đây - không phải đoán tỉ lệ. Ảnh
                        bìa nằm trong bucket "documents"; trang này là lưới thẻ
                        nên một lượt xem kéo về cả chục tấm cùng lúc. */}
                    <Image
                      src={doc.image_url}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-44 border-b border-line bg-[#f3f1ec] dark:bg-stone-950 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-ink-faint" aria-hidden />
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="rounded-sm border border-line px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-soft">
                      {categoryLabel(doc.category, t)}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-sm border border-line px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-soft">
                      <StatusDot />
                      {t.documentsList.freeBadge}
                    </span>
                    {statusBadge(doc.status, t) && (
                      <span className={`rounded-sm border px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] ${statusBadge(doc.status, t)!.className}`}>
                        {statusBadge(doc.status, t)!.label}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 line-clamp-2 text-base font-black tracking-tight text-ink-max">
                    {doc.title}
                  </h3>

                  {doc.description && (
                    <p className="text-sm text-ink-soft mb-4 line-clamp-3">
                      {doc.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-line-soft">
                    <span className="font-mono text-xs tabular-nums text-ink-muted">
                      {formatBytes(doc.file_size)}
                    </span>
                    <span className="text-xs font-bold text-accent-strong group-hover:underline underline-offset-4">
                      {t.documentsList.viewDetails}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <Modal
        open={!!openDoc}
        onClose={() => setOpenDoc(null)}
        title={openDoc ? categoryLabel(openDoc.category, t) : ""}
        maxWidth="max-w-lg"
      >
        {openDoc && (
          <div className="space-y-4">
            {openDoc.image_url ? (
              <div className="relative w-full h-56 rounded-sm border border-line overflow-hidden bg-surface-raised">
                <Image src={openDoc.image_url} alt="" fill sizes="(max-width: 640px) 100vw, 560px" className="object-cover" />
              </div>
            ) : (
              (() => {
                const Icon = iconFor(openDoc.file_name);
                return (
                  <div className="w-full h-40 rounded-sm border border-line bg-[#f3f1ec] dark:bg-stone-950 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-ink-faint" aria-hidden />
                  </div>
                );
              })()
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-black tracking-tight text-ink-max">{openDoc.title}</h3>
              {statusBadge(openDoc.status, t) && (
                <span className={`rounded-sm border px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em] ${statusBadge(openDoc.status, t)!.className}`}>
                  {statusBadge(openDoc.status, t)!.label}
                </span>
              )}
            </div>
            {openDoc.status === "pending" && (
              <p className="text-xs text-warn-strong -mt-2">
                {t.documentsList.pendingNotice}
              </p>
            )}
            {openDoc.status === "rejected" && (
              <p className="text-xs text-alert-strong -mt-2">
                {t.documentsList.rejectedNotice}
              </p>
            )}

            {openDoc.description && (
              <p className="text-sm text-ink-soft whitespace-pre-line leading-relaxed">
                {openDoc.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted pt-2 border-t border-line">
              <span className="font-mono">{openDoc.file_name}</span>
              <span>·</span>
              <span className="font-mono tabular-nums">{formatBytes(openDoc.file_size)}</span>
              <span>·</span>
              <span>{format(t.documentsList.downloadCount, { count: openDoc.download_count })}</span>
            </div>

            {/* Explicit download button - downloading is a deliberate click
                inside the post detail, not a side effect of opening the card. */}
            <a
              // Tải về thật, không phải mở trong tab mới: `download` trên thẻ
              // <a> vô hiệu với link khác origin, nên Content-Disposition và
              // tên tệp phải do storage của hệ cũ đặt. Xem toDownloadUrl.
              href={toDownloadUrl(openDoc.file_url, openDoc.file_name)}
              onClick={() => handleDownload(openDoc)}
              className={`${btnPrimary} w-full`}
            >
              <Download className="w-4 h-4" />
              {t.documentsList.downloadButton}
            </a>
          </div>
        )}
      </Modal>

      <CommunityUploadModal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        loggedIn={!!currentUserId}
      />
    </div>
  );
}
