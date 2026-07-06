"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Search, Mail, MailOpen, Trash2 } from "lucide-react";
import type { ContactMessage, MessagesResult } from "@/lib/admin/messages";
import { markMessageReadAction, deleteMessageAction } from "./actions";
import EmptyState from "@/components/admin/EmptyState";
import Pagination from "@/components/admin/Pagination";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function MessagesTable({
  result,
  initialSearch,
  initialFilter,
}: {
  result: MessagesResult;
  initialSearch: string;
  initialFilter: "all" | "read" | "unread";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);
  const [toDelete, setToDelete] = useState<ContactMessage | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  function updateParams(patch: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v) next.set(k, v);
      else next.delete(k);
    });
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`);
    });
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ q: search, page: "1" });
  }

  function handleFilterChange(filter: string) {
    updateParams({ filter, page: "1" });
  }

  async function toggleRead(msg: ContactMessage) {
    try {
      await markMessageReadAction(msg.id, !msg.is_read);
      toast.success(msg.is_read ? "Đã đánh dấu chưa đọc" : "Đã đánh dấu đã đọc");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    try {
      await deleteMessageAction(toDelete.id);
      toast.success("Đã xóa tin nhắn");
      setToDelete(null);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  }

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-stone-200 dark:border-stone-800">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
          />
        </form>
        <div className="flex gap-1">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                initialFilter === f
                  ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
            >
              {f === "all" ? "Tất cả" : f === "unread" ? "Chưa đọc" : "Đã đọc"}
            </button>
          ))}
        </div>
      </div>

      {isPending && (
        <div className="px-4 py-2 text-xs text-stone-400">Đang tải...</div>
      )}

      {result.messages.length === 0 ? (
        <EmptyState icon={Mail} title="Không có tin nhắn nào" description="Chưa có tin nhắn nào khớp với bộ lọc hiện tại." />
      ) : (
        <div className="divide-y divide-stone-200 dark:divide-stone-800">
          {result.messages.map((msg) => (
            <div key={msg.id} className={`p-4 ${!msg.is_read ? "bg-blue-50/50 dark:bg-blue-950/10" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
                  className="flex-1 min-w-0 text-left"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">{msg.name}</span>
                    {msg.email && <span className="text-xs text-stone-500 dark:text-stone-400">{msg.email}</span>}
                    {!msg.is_read && (
                      <span className="text-[10px] font-bold uppercase tracking-wide bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                        Mới
                      </span>
                    )}
                  </div>
                  {msg.subject && (
                    <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mt-1">{msg.subject}</p>
                  )}
                  <p className={`text-sm text-stone-600 dark:text-stone-400 mt-1 ${expanded === msg.id ? "" : "line-clamp-2"}`}>
                    {msg.message}
                  </p>
                  <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1.5">
                    {new Date(msg.created_at).toLocaleString("vi-VN")}
                  </p>
                </button>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleRead(msg)}
                    title={msg.is_read ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
                    className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400"
                  >
                    {msg.is_read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setToDelete(msg)}
                    title="Xóa"
                    className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        page={result.page}
        totalPages={result.totalPages}
        onChange={(p) => updateParams({ page: String(p) })}
      />

      <ConfirmDialog
        open={!!toDelete}
        title="Xóa tin nhắn"
        message={`Bạn có chắc muốn xóa tin nhắn từ "${toDelete?.name}"? Hành động này không thể hoàn tác.`}
        confirmLabel="Xóa"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
