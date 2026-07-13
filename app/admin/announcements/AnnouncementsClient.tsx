"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AlertTriangle, Info, Megaphone, ShieldAlert } from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { createAnnouncementAction, deactivateAnnouncementAction } from "./actions";
import type { AdminAnnouncement } from "@/lib/admin/announcements";

const SEVERITIES: { id: AdminAnnouncement["severity"]; label: string }[] = [
  { id: "info", label: "Thông tin" },
  { id: "warning", label: "Cảnh báo" },
  { id: "critical", label: "Khẩn cấp" },
];

const SEVERITY_STYLE: Record<AdminAnnouncement["severity"], { badge: string; icon: typeof Info }> = {
  info: { badge: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-900", icon: Info },
  warning: { badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900", icon: AlertTriangle },
  critical: { badge: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900", icon: ShieldAlert },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

export default function AnnouncementsClient({
  initialAnnouncements,
}: {
  initialAnnouncements: AdminAnnouncement[];
}) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [severity, setSeverity] = useState<AdminAnnouncement["severity"]>("info");
  const [expiresInDays, setExpiresInDays] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [confirmSendOpen, setConfirmSendOpen] = useState(false);
  const [deactivateTarget, setDeactivateTarget] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSend = title.trim().length > 0 && body.trim().length > 0;

  async function handleSend() {
    setConfirmSendOpen(false);
    setSending(true);
    try {
      const expiresAt =
        expiresInDays.trim() && Number(expiresInDays) > 0
          ? new Date(Date.now() + Number(expiresInDays) * 24 * 60 * 60 * 1000).toISOString()
          : null;

      await createAnnouncementAction({ title: title.trim(), body: body.trim(), severity, expiresAt });
      toast.success("Đã gửi thông báo tới toàn bộ tài khoản");
      setTitle("");
      setBody("");
      setSeverity("info");
      setExpiresInDays("");
      startTransition(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Không thể gửi thông báo. Vui lòng thử lại.");
    } finally {
      setSending(false);
    }
  }

  function handleDeactivate(id: number) {
    startTransition(async () => {
      try {
        await deactivateAnnouncementAction(id);
        setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, active: false } : a)));
        toast.success("Đã thu hồi thông báo");
      } catch (error) {
        console.error("Error deactivating announcement:", error);
        toast.error("Không thể thu hồi thông báo.");
      } finally {
        setDeactivateTarget(null);
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-stone-500 dark:text-stone-400" />
          <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">Gửi thông báo mới</h2>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">
            Tiêu đề
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
            placeholder="VD: Bảo trì hệ thống tối nay 22h-23h"
            className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">
            Nội dung
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={2000}
            rows={4}
            placeholder="Nội dung chi tiết hiển thị cho người dùng..."
            className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100 text-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">
              Mức độ
            </label>
            <div className="flex gap-1.5">
              {SEVERITIES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSeverity(s.id)}
                  className={`flex-1 text-xs font-bold py-2 rounded-lg border-2 transition-colors ${
                    severity === s.id
                      ? "border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                      : "border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-600"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">
              Tự hết hạn sau (ngày, để trống = không hết hạn)
            </label>
            <input
              type="number"
              min={1}
              value={expiresInDays}
              onChange={(e) => setExpiresInDays(e.target.value)}
              placeholder="VD: 7"
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:border-stone-400 dark:focus:border-stone-500 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 dark:text-stone-100 text-sm"
            />
          </div>
        </div>

        <button
          type="button"
          disabled={!canSend || sending}
          onClick={() => setConfirmSendOpen(true)}
          className="w-full py-3 rounded-lg font-bold text-sm bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {sending ? "Đang gửi..." : "Gửi tới toàn bộ tài khoản"}
        </button>
      </div>

      <div>
        <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">Lịch sử thông báo</h2>
        {announcements.length === 0 ? (
          <p className="text-sm text-stone-500 dark:text-stone-400">Chưa gửi thông báo nào.</p>
        ) : (
          <div className="space-y-3">
            {announcements.map((a) => {
              const style = SEVERITY_STYLE[a.severity];
              const Icon = style.icon;
              return (
                <div
                  key={a.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${style.badge}`}>
                          <Icon className="w-3 h-3" />
                          {SEVERITIES.find((s) => s.id === a.severity)?.label}
                        </span>
                        {!a.active && (
                          <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border border-stone-200 dark:border-stone-700 text-stone-400 dark:text-stone-500">
                            Đã thu hồi
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-stone-900 dark:text-stone-100 mt-1.5">{a.title}</p>
                      <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 whitespace-pre-wrap">{a.body}</p>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">
                        {formatDate(a.createdAt)} · {a.createdByEmail ?? "admin"} · {a.readCount} người đã đọc
                        {a.expiresAt ? ` · hết hạn ${formatDate(a.expiresAt)}` : ""}
                      </p>
                    </div>
                    {a.active && (
                      <button
                        onClick={() => setDeactivateTarget(a.id)}
                        disabled={isPending}
                        className="flex-shrink-0 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline disabled:opacity-50"
                      >
                        Thu hồi
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmSendOpen}
        title="Gửi thông báo?"
        message="Thông báo sẽ hiển thị ngay cho mọi tài khoản khi họ vào dashboard, cho tới khi họ tự đóng hoặc bạn thu hồi."
        confirmLabel="Gửi ngay"
        onConfirm={handleSend}
        onCancel={() => setConfirmSendOpen(false)}
        loading={sending}
      />

      <ConfirmDialog
        open={deactivateTarget !== null}
        title="Thu hồi thông báo?"
        message="Thông báo sẽ ngừng hiển thị cho những ai chưa đọc. Không ảnh hưởng tới người đã thấy trước đó."
        confirmLabel="Thu hồi"
        danger
        onConfirm={() => deactivateTarget !== null && handleDeactivate(deactivateTarget)}
        onCancel={() => setDeactivateTarget(null)}
        loading={isPending}
      />
    </div>
  );
}
