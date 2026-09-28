"use client";

import { useState } from "react";
import { MessageSquare, Megaphone } from "lucide-react";
import MessagesTabs from "./MessagesTabs";
import AnnouncementsClient from "../announcements/AnnouncementsClient";
import type { MessagesResult } from "@/lib/admin/messages";
import type { ChatThread } from "@/lib/admin/chat";
import type { BugReport } from "@/lib/admin/bugs";
import type { AdminAnnouncement } from "@/lib/admin/announcements";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface Props {
  result: MessagesResult;
  initialSearch: string;
  initialFilter: "all" | "read" | "unread";
  threads: ChatThread[];
  bugReports: BugReport[];
  announcements: AdminAnnouncement[];
  initialSection?: string;
}

export default function MessagesCombinedWrapper({
  result,
  initialSearch,
  initialFilter,
  threads,
  bugReports,
  announcements,
  initialSection = "messages",
}: Props) {
  const { t } = useI18n();
  const tm = t.adminThree.messagesCombinedWrapper;
  const [section, setSection] = useState<"messages" | "announcements">(
    initialSection === "announcements" ? "announcements" : "messages"
  );

  return (
    <div className="space-y-6">
      {/* Top Section Switcher */}
      <div className="flex items-center gap-3 border-b border-line pb-3">
        <button
          type="button"
          onClick={() => setSection("messages")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
            section === "messages"
              ? "bg-accent-soft text-ink-max border border-brand-600 dark:border-brand-400"
              : "border border-line-strong text-ink-soft hover:border-stone-950 dark:hover:border-stone-300"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          {format(tm.messagesTab, { count: result.messages.length + threads.length })}
        </button>

        <button
          type="button"
          onClick={() => setSection("announcements")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
            section === "announcements"
              ? "bg-accent-soft text-ink-max border border-brand-600 dark:border-brand-400"
              : "border border-line-strong text-ink-soft hover:border-stone-950 dark:hover:border-stone-300"
          }`}
        >
          <Megaphone className="w-4 h-4" />
          {format(tm.announcementsTab, { count: announcements.length })}
        </button>
      </div>

      {/* Render Active Section */}
      {section === "messages" ? (
        <MessagesTabs
          result={result}
          initialSearch={initialSearch}
          initialFilter={initialFilter}
          threads={threads}
          bugReports={bugReports}
        />
      ) : (
        <AnnouncementsClient initialAnnouncements={announcements} />
      )}
    </div>
  );
}
