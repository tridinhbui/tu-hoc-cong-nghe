"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, CheckCircle2, ShieldQuestion, Sparkles } from "lucide-react";
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationsRead,
  subscribeToCommunityNotifications,
  type CommunityNotification,
} from "@/lib/cloudflare-community";
import { isValidAvatar } from "@/lib/avatar-utils";
import { timeAgo } from "@/lib/time-ago";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { StatusDot } from "@/components/ui/system";

/** Nhận `t` thay vì tự nội suy chuỗi: hai dòng này trước đây là tiếng Việt
 *  cứng trong mã, nên chuông vẫn nói tiếng Việt với người đọc bản tiếng Anh
 *  dù mọi nhãn xung quanh nó đã dịch. */
function notificationText(n: CommunityNotification, t: Dictionary): string {
  switch (n.type) {
    case "comment":
      return format(t.notifications.comment, { actor: n.actor_name || t.dashboard.defaultUserName });
    case "reaction":
      return format(t.notifications.reaction, {
        actor: n.actor_name || t.dashboard.defaultUserName,
        emoji: n.emoji ?? t.notifications.reactionFallback,
      });
    case "appeal_approved":
      return t.notifications.appealApproved;
    case "appeal_rejected":
      return t.notifications.appealRejected;
    case "ai_report_resolved":
      return t.notifications.aiReportResolved;
  }
}

/** Thông báo do admin gây ra không có `actor_id` - cố ý, xem migration
 *  20260901: danh tính người duyệt không phải thứ người học cần thấy. Nên
 *  chúng lấy biểu tượng theo loại thay vì chữ cái đầu của một cái tên. */
function systemIcon(type: CommunityNotification["type"]) {
  if (type === "appeal_approved") return { Icon: CheckCircle2, tone: "text-accent" };
  if (type === "appeal_rejected") return { Icon: ShieldQuestion, tone: "text-warn" };
  if (type === "ai_report_resolved") return { Icon: Sparkles, tone: "text-ink-body" };
  return null;
}

/** Bell icon for Bảng tin's comment/reaction notifications (see
 *  cloudflare/migrations/20260821_community_notifications.sql). Mounted once
 *  in AppNavbar, same as the rest of the always-visible chrome, so it works
 *  from any page - not just while looking at the feed itself. */
export default function NotificationBell({ userId }: { userId: string }) {
  const { t } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<CommunityNotification[] | null>(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties | null>(null);

  /** The panel is positioned by hand into a body portal rather than left as an
   *  `absolute` child, because both mount points break the simple version:
   *
   *  - In the desktop sidebar the bell sits in the `mt-auto` block pinned to
   *    the bottom, so a panel opening downward runs off the viewport and the
   *    list is unreadable. It has to flip upward there.
   *  - In the mobile header the bell's container carries `overflow-hidden`
   *    (needed so the row itself can't cause a horizontal scroll), which
   *    clips any absolutely-positioned child. A portal escapes that without
   *    AppNavbar having to relax the overflow rule. */
  const positionPanel = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const GAP = 8;
    const MARGIN = 16;
    const width = Math.min(352, window.innerWidth - MARGIN * 2);
    const spaceBelow = window.innerHeight - rect.bottom - GAP - MARGIN;
    const spaceAbove = rect.top - GAP - MARGIN;
    const dropUp = spaceBelow < 240 && spaceAbove > spaceBelow;

    setPanelStyle({
      position: "fixed",
      width,
      // Right-aligned to the bell, then clamped so it can never hang off
      // either edge on a narrow screen.
      left: Math.min(Math.max(MARGIN, rect.right - width), window.innerWidth - width - MARGIN),
      ...(dropUp
        ? { bottom: window.innerHeight - rect.top + GAP, maxHeight: spaceAbove }
        : { top: rect.bottom + GAP, maxHeight: spaceBelow }),
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    positionPanel();
    window.addEventListener("resize", positionPanel);
    // `true` so it also fires for scrolls inside the sidebar, not just the page.
    window.addEventListener("scroll", positionPanel, true);
    return () => {
      window.removeEventListener("resize", positionPanel);
      window.removeEventListener("scroll", positionPanel, true);
    };
  }, [open, positionPanel]);

  useEffect(() => {
    getUnreadNotificationCount(userId)
      .then(setUnreadCount)
      .catch((error) => console.error("Error loading unread notification count:", error));

    const unsubscribe = subscribeToCommunityNotifications(userId, () => {
      setUnreadCount((prev) => prev + 1);
      // Only refetch the list if it's currently visible - no point paying
      // for a query the reader can't see yet.
      setNotifications((prev) => (prev === null ? prev : null));
    });
    return unsubscribe;
  }, [userId]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      // The panel lives in a body portal now, so it is no longer inside
      // containerRef - checking only that ref would close the dropdown on
      // every click landing on the dropdown itself.
      if (containerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleOpen = async () => {
    const next = !open;
    setOpen(next);
    if (next && notifications === null) {
      setLoading(true);
      try {
        const list = await getNotifications(userId);
        setNotifications(list);
      } catch (error) {
        console.error("Error loading notifications:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleItemClick = async (n: CommunityNotification) => {
    setOpen(false);
    // Ba loại mới trỏ về chính bài học đang nói tới chứ không phải Bảng tin.
    // Bấm vào "khiếu nại đã được duyệt" mà rơi vào `/bang-tin?post=null` là
    // đúng cái luồng cụt mà thay đổi này đang chữa.
    if (n.lesson_slug) {
      router.push(`/bai-hoc/${n.lesson_slug}`);
    } else if (n.post_id !== null) {
      router.push(`/bang-tin?post=${n.post_id}`);
    }
    if (!n.read_at) {
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setNotifications((prev) =>
        prev ? prev.map((item) => (item.id === n.id ? { ...item, read_at: new Date().toISOString() } : item)) : prev
      );
      markNotificationsRead(userId, [n.id]).catch((error) => console.error("Error marking notification read:", error));
    }
  };

  const handleMarkAllRead = async () => {
    const hadUnread = unreadCount > 0;
    setUnreadCount(0);
    setNotifications((prev) =>
      prev ? prev.map((item) => (item.read_at ? item : { ...item, read_at: new Date().toISOString() })) : prev
    );
    if (hadUnread) {
      try {
        await markNotificationsRead(userId);
      } catch (error) {
        console.error("Error marking all notifications read:", error);
      }
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => void toggleOpen()}
        aria-label={t.notifications.ariaLabel}
        aria-expanded={open}
        className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-sm border border-line-strong text-ink-soft hover:border-stone-400 transition-colors shrink-0 dark:border-stone-700 dark:hover:border-stone-200"
      >
        <Bell className="w-4.5 h-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-xs bg-brand-600 px-1 font-mono text-[9px] font-bold tabular-nums text-white dark:bg-brand-500">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && panelStyle && createPortal(
        <div
          ref={panelRef}
          style={panelStyle}
          className="overflow-y-auto overscroll-contain rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900 z-[60]"
        >
          <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-stone-300 bg-surface-raised dark:border-stone-700 dark:bg-stone-950">
            <p className="eyebrow text-ink-soft">{t.notifications.title}</p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => void handleMarkAllRead()}
                className="text-[11px] font-bold text-accent-strong underline-offset-4 hover:underline"
              >
                {t.notifications.markAllRead}
              </button>
            )}
          </div>

          {loading ? (
            <p className="px-4 py-6 text-center text-xs text-ink-muted">{t.notifications.loading}</p>
          ) : !notifications || notifications.length === 0 ? (
            <p className="px-4 py-6 text-center text-xs text-ink-muted">
              {t.notifications.empty}
            </p>
          ) : (
            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {notifications.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => void handleItemClick(n)}
                  className={`w-full flex items-start gap-2.5 px-4 py-3 text-left transition-colors hover:bg-surface ${
                    !n.read_at ? "bg-page dark:bg-stone-950/60" : ""
                  }`}
                >
                  {(() => {
                    const system = systemIcon(n.type);
                    if (system) {
                      const { Icon, tone } = system;
                      return (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-line-strong bg-surface-raised dark:border-stone-700 dark:bg-stone-950">
                          <Icon className={`h-4 w-4 ${tone}`} aria-hidden />
                        </div>
                      );
                    }
                    return isValidAvatar(n.actor_avatar) ? (
                      <Image
                        src={n.actor_avatar!}
                        alt={n.actor_name || t.dashboard.defaultUserName}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-200 text-xs font-bold text-ink-body dark:bg-stone-800">
                        {n.actor_name.charAt(0).toUpperCase()}
                      </div>
                    );
                  })()}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-ink-heading leading-snug">{notificationText(n, t)}</p>
                    {/* Lý do từ chối. Đây là toàn bộ lý do tồn tại của thay đổi
                        này: ô ghi chú admin gõ vào trước đây không có đường
                        nào đến được người đọc nó. */}
                    {n.detail && (
                      <p className="mt-1 rounded-sm border border-stone-200 bg-surface-raised px-2 py-1 dark:border-stone-800 dark:bg-stone-950 text-[11px] font-medium text-ink-soft leading-snug whitespace-pre-wrap">
                        {n.detail}
                      </p>
                    )}
                    <p className="mt-0.5 text-[10px] text-ink-faint">{timeAgo(n.created_at, t.libData.timeAgo)}</p>
                  </div>
                  {!n.read_at && <span className="mt-1.5 shrink-0 leading-none"><StatusDot /></span>}
                </button>
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
