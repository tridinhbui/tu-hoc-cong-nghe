"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Info, ShieldAlert, X } from "lucide-react";
import { getUnreadAnnouncements, markAnnouncementRead, type Announcement } from "@/lib/announcements";
import { useI18n } from "@/lib/i18n/context";

const SEVERITY_STYLE: Record<Announcement["severity"], { wrap: string; icon: typeof Info }> = {
  info: {
    wrap: "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900 text-sky-800 dark:text-sky-300",
    icon: Info,
  },
  warning: {
    wrap: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300",
    icon: AlertTriangle,
  },
  critical: {
    wrap: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300",
    icon: ShieldAlert,
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
          <div key={a.id} className={`rounded-xl border-2 px-4 py-3.5 flex items-start gap-3 ${style.wrap}`}>
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">{a.title}</p>
              <p className="text-sm mt-0.5 opacity-90 whitespace-pre-wrap">{a.body}</p>
            </div>
            <button
              onClick={() => dismiss(a.id)}
              disabled={dismissing === a.id}
              aria-label={t.miscUi.announcementBanner.closeLabel}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
