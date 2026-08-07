"use client";

import { useState } from "react";
import { ShieldQuestion, AlertTriangle } from "lucide-react";
import AppealsClient from "./AppealsClient";
import AppealsAllClient from "./AppealsAllClient";
import AiReportsClient from "../ai-reports/AiReportsClient";
import type { AdminLessonAppeal } from "@/lib/admin/appeals";
import type { AdminAiReportRow } from "@/lib/admin/ai-reports";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface Props {
  appeals: AdminLessonAppeal[];
  aiReports: AdminAiReportRow[];
  initialView?: string;
  initialSection?: string;
}

export default function AppealsCombinedWrapper({
  appeals,
  aiReports,
  initialView = "pending",
  initialSection = "appeals",
}: Props) {
  const { t } = useI18n();
  const ta = t.adminThree.appealsCombinedWrapper;
  const [section, setSection] = useState<"appeals" | "ai-reports">(
    initialSection === "ai-reports" ? "ai-reports" : "appeals"
  );
  const [view, setView] = useState<"pending" | "all">(initialView === "all" ? "all" : "pending");

  const pendingAppealsCount = appeals.filter((a) => a.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Top Section Switcher */}
      <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
        <button
          type="button"
          onClick={() => setSection("appeals")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
            section === "appeals"
              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm"
              : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
          }`}
        >
          <ShieldQuestion className="w-4 h-4 text-emerald-500" />
          {format(ta.lessonAppealsTab, { count: appeals.length })}
        </button>

        <button
          type="button"
          onClick={() => setSection("ai-reports")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
            section === "ai-reports"
              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm"
              : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          {format(ta.aiReportsTab, { count: aiReports.length })}
        </button>
      </div>

      {/* Render Active Section */}
      {section === "appeals" ? (
        <div className="space-y-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setView("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                view === "pending"
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700"
              }`}
            >
              {format(ta.pendingTab, { count: pendingAppealsCount })}
            </button>
            <button
              type="button"
              onClick={() => setView("all")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                view === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700"
              }`}
            >
              {format(ta.allTab, { count: appeals.length })}
            </button>
          </div>

          {view === "all" ? (
            <AppealsAllClient initialAppeals={appeals} />
          ) : (
            <AppealsClient initialAppeals={appeals.filter((a) => a.status === "pending")} />
          )}
        </div>
      ) : (
        <AiReportsClient initialReports={aiReports} />
      )}
    </div>
  );
}
