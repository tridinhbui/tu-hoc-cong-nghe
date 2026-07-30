"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell } from "lucide-react";
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationsRead,
  subscribeToCommunityNotifications,
  type CommunityNotification,
} from "@/lib/supabase-community";
import { isValidAvatar } from "@/lib/avatar-utils";
import { timeAgo } from "@/lib/time-ago";

function notificationText(n: CommunityNotification): string {
  if (n.type === "comment") return `${n.actor_name} đã bình luận vào bài viết của bạn`;
  return `${n.actor_name} đã thả ${n.emoji ?? "cảm xúc"} vào bài viết của bạn`;
}

/** Bell icon for FinSocial's comment/reaction notifications (see
 *  supabase/migrations/20260821_community_notifications.sql). Mounted once
 *  in AppNavbar, same as the rest of the always-visible chrome, so it works
 *  from any page - not just while looking at the feed itself. */
export default function NotificationBell({ userId }: { userId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<CommunityNotification[] | null>(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
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
    router.push(`/finsocial?post=${n.post_id}`);
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
        type="button"
        onClick={() => void toggleOpen()}
        aria-label="Thông báo"
        aria-expanded={open}
        className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors shrink-0"
      >
        <Bell className="w-4.5 h-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-black text-white ring-2 ring-white dark:ring-stone-950">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[min(22rem,calc(100vw-2rem))] max-h-[70vh] overflow-y-auto rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl z-50">
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-stone-100 dark:border-stone-800">
            <p className="text-xs font-black uppercase tracking-wide text-stone-500 dark:text-stone-400">Thông báo</p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => void handleMarkAllRead()}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Đánh dấu đã đọc tất cả
              </button>
            )}
          </div>

          {loading ? (
            <p className="px-4 py-6 text-center text-xs text-stone-400">Đang tải...</p>
          ) : !notifications || notifications.length === 0 ? (
            <p className="px-4 py-6 text-center text-xs text-stone-400">
              Chưa có thông báo nào. Đăng bài hoặc bình luận trên FinSocial để bắt đầu nhận thông báo khi có người tương tác.
            </p>
          ) : (
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {notifications.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => void handleItemClick(n)}
                  className={`w-full flex items-start gap-2.5 px-4 py-3 text-left transition-colors hover:bg-stone-50 dark:hover:bg-stone-800 ${
                    !n.read_at ? "bg-emerald-50/60 dark:bg-emerald-950/20" : ""
                  }`}
                >
                  {isValidAvatar(n.actor_avatar) ? (
                    <Image
                      src={n.actor_avatar!}
                      alt={n.actor_name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                      {n.actor_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 leading-snug">{notificationText(n)}</p>
                    <p className="mt-0.5 text-[10px] text-stone-400">{timeAgo(n.created_at)}</p>
                  </div>
                  {!n.read_at && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
