"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Info, ShieldAlert, X } from "lucide-react";
import { getUnreadAnnouncements, markAnnouncementRead, type Announcement } from "@/lib/announcements";
import { useI18n } from "@/lib/i18n/context";

/** Mức độ nói bằng CẠNH TRÁI và biểu tượng, trên cùng một mặt giấy: xanh
 *  (thông tin, dữ liệu sống), hổ phách (cảnh báo), đỏ (nghiêm trọng). Bản trước
 *  tô cả khối bằng ba nền sky/amber/rose. */
const SEVERITY_STYLE: Record<Announcement["severity"], { wrap: string; icon: typeof Info; iconCls: string }> = {
  info: {
    wrap: "border-l-brand-600 dark:border-l-brand-400",
    icon: Info,
    iconCls: "text-accent",
  },
  warning: {
    wrap: "border-l-amber-500 dark:border-l-amber-400",
    icon: AlertTriangle,
    iconCls: "text-warn",
  },
  critical: {
    wrap: "border-l-red-600 dark:border-l-red-400",
    icon: ShieldAlert,
    iconCls: "text-danger",
  },
};

// Admin -> everyone broadcasts (maintenance notices, launches, policy
// changes) - see app/admin/announcements. Fetches once per dashboard visit;
// dismissing writes announcement_reads so it never shows again for this
// user unless the admin sends a new one.
export default function AnnouncementBanner({ userId }: { userId: string }) {
  const { t } = useI18n();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissing, setDismissing] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    getUnreadAnnouncements(userId)
      .then((data) => {
        if (!cancelled) setAnnouncements(data);
      })
      .catch((error) => console.error("Error loading announcements:", error));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  async function dismiss(id: number) {
    setDismissing(id);
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    try {
      await markAnnouncementRead(userId, id);
    } catch (error) {
      console.error("Error dismissing announcement:", error);
    } finally {
      setDismissing(null);
    }
  }

  if (announcements.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto mb-6 space-y-2.5">
      {announcements.map((a) => {
        const style = SEVERITY_STYLE[a.severity];
        const Icon = style.icon;
        return (
          <div key={a.id} className={`rounded-md border border-l border-line bg-white dark:bg-stone-900 px-4 py-3.5 flex items-start gap-3 ${style.wrap}`}>
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.iconCls}`} />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-ink-max">{a.title}</p>
              <p className="text-sm mt-0.5 text-ink-body whitespace-pre-wrap">{a.body}</p>
            </div>
            <button
              onClick={() => dismiss(a.id)}
              disabled={dismissing === a.id}
              aria-label={t.miscUi.announcementBanner.closeLabel}
              className="flex-shrink-0 p-1 rounded-sm text-ink-faint hover:bg-surface-raised hover:text-ink transition-colors disabled:opacity-50 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
