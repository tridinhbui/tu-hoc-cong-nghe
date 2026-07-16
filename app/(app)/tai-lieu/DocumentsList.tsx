"use client";

import { useState, useEffect } from "react";
import { FileText, Download, FileSpreadsheet, FileImage, Archive, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { DOCUMENT_CATEGORIES } from "@/lib/document-categories";
import EmptyState from "@/components/admin/EmptyState";
import Modal from "@/components/admin/Modal";
import CommunityUploadModal from "./CommunityUploadModal";
import type { PublicDocument } from "./page";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function categoryLabel(value: string) {
  return DOCUMENT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

// A non-approved row can only ever belong to the viewer themself (see the
// documents select RLS policy in supabase/migrations/20260709_community_documents.sql),
// so this badge always means "your own pending/rejected submission", never
// someone else's.
function statusBadge(status: PublicDocument["status"]) {
  if (status === "pending") return { label: "Chờ duyệt", className: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400" };
  if (status === "rejected") return { label: "Đã từ chối", className: "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400" };
  return null;
}

function iconFor(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "xlsx" || ext === "xls") return FileSpreadsheet;
  if (ext === "png" || ext === "jpg" || ext === "jpeg") return FileImage;
  if (ext === "zip") return Archive;
  return FileText;
}

const CATEGORY_FILTERS = [{ value: "all", label: "Tất cả" }, ...DOCUMENT_CATEGORIES];

function TypingBanner() {
  const words = [
    "Ebook định giá cổ phiếu từ cơ bản đến nâng cao...",
    "File Excel báo cáo lưu chuyển tiền tệ mẫu...",
    "Checklist quản lý tài chính cá nhân hiệu quả...",
    "Cẩm nang phân tích báo cáo tài chính doanh nghiệp..."
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      setTypingSpeed(300);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <div className="mb-6 p-4 rounded-xl border border-rose-100 dark:border-rose-950/40 bg-rose-50/20 dark:bg-rose-950/5 flex items-center gap-3">
      <span className="flex h-2 w-2 relative shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
      </span>
      <p className="text-xs font-bold text-stone-600 dark:text-stone-300">
        <span className="text-rose-600/60 dark:text-rose-400/50 mr-1.5 font-bold uppercase tracking-wider">Đang cập nhật:</span>
        <span className="text-rose-600 dark:text-rose-400 font-extrabold">{currentText}</span>
        <span className="animate-pulse font-extrabold text-rose-650 dark:text-rose-400">|</span>
      </p>
    </div>
  );
}

export default function DocumentsList({ documents, currentUserId }: { documents: PublicDocument[]; currentUserId: string | null }) {
  const [filter, setFilter] = useState<string>("all");
  const [openDoc, setOpenDoc] = useState<PublicDocument | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const supabase = createClient();

  const filtered = filter === "all" ? documents : documents.filter((d) => d.category === filter);

  async function handleDownload(doc: PublicDocument) {
    // Best-effort counter - a logged-out visitor or a missing RPC (migration
    // not run yet) should never block the actual download.
    await supabase.rpc("increment_document_download", { doc_id: doc.id }).then(
      () => {},
      () => {}
    );
  }

  return (
    <div>
      <TypingBanner />
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div className="flex gap-2 flex-wrap">
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
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 text-xs font-bold text-stone-600 dark:text-stone-400 transition-colors flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Chia sẻ tài liệu của bạn
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Chưa có tài liệu nào"
          description="Quay lại sau nhé - admin sẽ sớm bổ sung mẫu biểu và ebook miễn phí."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => {
            const Icon = iconFor(doc.file_name);
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => setOpenDoc(doc)}
                className="group text-left rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-lg dark:hover:shadow-stone-900/50 transition-all overflow-hidden bg-white dark:bg-stone-900"
              >
                {/* Cover image or icon */}
                {doc.image_url ? (
                  <div className="relative w-full h-48 bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={doc.image_url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-stone-300 dark:text-stone-700" />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wide bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-full">
                      {categoryLabel(doc.category)}
                    </span>
                    <span className="text-[11px] font-black bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 animate-pulse flex items-center gap-0.5">
                      Miễn phí 💎
                    </span>
                    {statusBadge(doc.status) && (
                      <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${statusBadge(doc.status)!.className}`}>
                        {statusBadge(doc.status)!.label}
                      </span>
                    )}
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
                    <span className="text-xs font-bold text-stone-600 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                      Xem chi tiết
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
        title={openDoc ? categoryLabel(openDoc.category) : ""}
        maxWidth="max-w-lg"
      >
        {openDoc && (
          <div className="space-y-4">
            {openDoc.image_url ? (
              <div className="relative w-full h-56 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={openDoc.image_url} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              (() => {
                const Icon = iconFor(openDoc.file_name);
                return (
                  <div className="w-full h-40 rounded-xl bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 flex items-center justify-center">
                    <Icon className="w-14 h-14 text-stone-300 dark:text-stone-700" />
                  </div>
                );
              })()
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">{openDoc.title}</h3>
              {statusBadge(openDoc.status) && (
                <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${statusBadge(openDoc.status)!.className}`}>
                  {statusBadge(openDoc.status)!.label}
                </span>
              )}
            </div>
            {openDoc.status === "pending" && (
              <p className="text-xs text-amber-700 dark:text-amber-400 -mt-2">
                Tài liệu này chỉ hiển thị cho bạn cho đến khi admin duyệt.
              </p>
            )}
            {openDoc.status === "rejected" && (
              <p className="text-xs text-rose-700 dark:text-rose-400 -mt-2">
                Tài liệu này đã bị từ chối và không hiển thị công khai.
              </p>
            )}

            {openDoc.description && (
              <p className="text-sm text-stone-600 dark:text-stone-400 whitespace-pre-line leading-relaxed">
                {openDoc.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              <span>{openDoc.file_name}</span>
              <span>·</span>
              <span>{formatBytes(openDoc.file_size)}</span>
              <span>·</span>
              <span>{openDoc.download_count} lượt tải</span>
            </div>

            {/* Explicit download button - downloading is a deliberate click
                inside the post detail, not a side effect of opening the card. */}
            <a
              href={openDoc.file_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleDownload(openDoc)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold hover:bg-stone-800 dark:hover:bg-white transition-colors"
            >
              <Download className="w-4 h-4" />
              Tải xuống
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
