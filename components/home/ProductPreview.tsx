"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Flame, Trophy } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

type Tab = "dashboard" | "lesson";

function buildTabs(t: Dictionary): { id: Tab; label: string }[] {
  return [
    { id: "dashboard", label: t.productPreview.tabDashboard },
    { id: "lesson", label: t.productPreview.tabLesson },
  ];
}

function buildDashboardLessons(t: Dictionary) {
  return [
    { title: t.productPreview.lessonStocksWhy, done: true },
    { title: t.productPreview.lessonPeRatio, done: true },
    { title: t.productPreview.lessonEtf, done: false },
  ];
}

function buildLeaderboard(t: Dictionary) {
  return [
    { name: "Minh Anh", xp: "2,105" },
    { name: "Đức Huy", xp: "1,940" },
    // `isYou` rather than matching the rendered name: deciding who the learner
    // is by comparing display copy breaks the moment the label is reworded.
    { name: t.productPreview.you, xp: "1,240", isYou: true },
  ];
}

// Honest, labeled UI mockup of the actual product (dashboard + a lesson
// screen) - not a real screenshot (no image-capture pipeline exists in this
// project), but built from the same design tokens (stone/emerald palette,
// rounded-xl cards, the same card shapes UserStats/lesson pages actually
// use) so it reads as a faithful preview rather than a generic stock
// illustration. Framed in a browser chrome so it's unambiguous this is
// "what the app looks like," not a real photo of anything.
export default function ProductPreview() {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("dashboard");
  const tabs = useMemo(() => buildTabs(t), [t]);
  const dashboardLessons = useMemo(() => buildDashboardLessons(t), [t]);
  const leaderboard = useMemo(() => buildLeaderboard(t), [t]);

  useEffect(() => {
    const tabs: Tab[] = ["dashboard", "lesson"];
    let cancelled = false;
    const timer = window.setInterval(() => {
      if (cancelled) return;
      setTab((current) => tabs[(tabs.indexOf(current) + 1) % tabs.length]);
    }, 5200);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div
      style={{ contain: "layout paint" }}
      className="animated-border-card relative overflow-hidden rounded-[20px] border border-stone-200/80 bg-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.24)] dark:border-stone-800 dark:bg-stone-900 transform-gpu will-change-transform"
    >
      <style>{`
        @keyframes preview-progress-pulse {
          0%, 100% { transform: scaleX(0.94); opacity: 0.82; }
          50% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes preview-live-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes preview-card-drift {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .preview-progress-live {
          transform-origin: left center;
          animation: preview-progress-pulse 3.4s ease-in-out infinite;
          will-change: transform;
        }
        .preview-live-dot {
          animation: preview-live-blink 1.8s ease-in-out infinite;
          will-change: opacity;
        }
        .preview-card-float {
          animation: preview-card-drift 4.6s ease-in-out infinite;
          will-change: transform;
        }
        .preview-scan-line {
          animation: preview-card-drift 5.8s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-[-10%] top-[-15%] h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute right-[-12%] bottom-[-18%] h-56 w-56 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="preview-scan-line absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent)] opacity-40" />
      </div>
      {/* Browser chrome */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 px-4 py-2.5">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
          </div>
          <div className="flex-1 min-w-0 text-[11px] font-semibold text-stone-400 dark:text-stone-500 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full px-4 py-1 text-center truncate">
            tuhoctaichinh.vn/{tab === "dashboard" ? "dashboard" : "bai-hoc"}
          </div>
        </div>
        <div className="flex gap-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full p-0.5 shrink-0 mx-auto sm:mx-0">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all duration-200 whitespace-nowrap ${
                tab === tabItem.id
                  ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-[0_8px_18px_-14px_rgba(15,23,42,0.45)]"
                  : "text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300"
              }`}
            >
              {tabItem.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5 bg-[#FAFAFC] dark:bg-stone-950 h-[330px] sm:h-[350px] overflow-hidden relative">
        <AnimatePresence mode="wait">
          {tab === "dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 8, scale: 0.985 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-[1.3fr_1fr]"
            >
              <motion.div
                className="preview-card-float rounded-[20px] border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.22)]"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">{t.productPreview.level}</p>
                    <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">{t.productPreview.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full px-2.5 py-1">
                    <span className="preview-live-dot h-1.5 w-1.5 rounded-full bg-white/90" />
                    {format(t.productPreview.xpLabel, { xp: "1,240" })}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden mb-4">
                  <motion.div
                    className="preview-progress-live h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    animate={{ boxShadow: ["0 0 0 rgba(16,185,129,0)", "0 0 18px rgba(16,185,129,0.35)", "0 0 0 rgba(16,185,129,0)"] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="space-y-2">
                  {dashboardLessons.map((l) => (
                    <motion.div
                      key={l.title}
                      className={`flex items-center gap-2.5 min-w-0 rounded-xl border px-3 py-2.5 text-xs font-semibold ${
                        l.done
                          ? "border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
                          : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400"
                      }`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: l.done ? 0.05 : 0.12 }}
                    >
                      {l.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-stone-300 dark:text-stone-700 shrink-0" />
                      )}
                      <span className="truncate min-w-0 flex-1">{l.title}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="grid gap-4">
                <motion.div
                  className="preview-card-float rounded-[20px] border border-orange-100/80 dark:border-orange-950/40 bg-orange-50/60 dark:bg-orange-950/10 p-5 flex items-center gap-3 shadow-[0_12px_28px_-24px_rgba(249,115,22,0.18)]"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-orange-600 dark:text-orange-400 leading-none">
                      {format(t.productPreview.streakLabel, { days: 18 })}
                    </p>
                    <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 mt-0.5">{t.productPreview.streakCaption}</p>
                  </div>
                </motion.div>
                <motion.div
                  className="rounded-[20px] border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.2)]"
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2.5 flex items-center gap-1.5">
                    <span className="preview-live-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {t.productPreview.topWeek}
                  </p>
                  <div className="space-y-2">
                    {leaderboard.map((row, i) => (
                      <motion.div
                        key={row.name}
                        className="flex items-center justify-between text-xs"
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: 0.05 + i * 0.06 }}
                      >
                        <span className={`font-bold ${row.isYou ? "text-emerald-700 dark:text-emerald-400" : "text-stone-700 dark:text-stone-300"}`}>
                          {i + 1}. {row.name}
                        </span>
                        <span className="text-stone-400 dark:text-stone-500 font-semibold">
                          {format(t.productPreview.xpLabel, { xp: row.xp })}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, y: 8, scale: 0.985 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="rounded-[20px] border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.2)]"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
                {t.productPreview.chapterBadge}
              </p>
              <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100 mb-3">
                {t.productPreview.lessonTitle}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                {t.productPreview.lessonBody}
              </p>
              <div className="rounded-[18px] border border-stone-200/80 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 p-4 mb-4">
                <p className="text-[11px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">{t.productPreview.quickQuestion}</p>
                <p className="text-xs font-bold text-stone-900 dark:text-stone-100 mb-3">
                  {t.productPreview.quizQuestion}
                </p>
                <div className="space-y-1.5">
                  {[t.productPreview.quizOption1, t.productPreview.quizOption2].map(
                    (opt, i) => (
                      <motion.div
                        key={opt}
                        className={`text-[11px] font-semibold rounded-lg px-3 py-2 border ${
                          i === 1
                            ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
                            : "border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400"
                        }`}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.08 }}
                      >
                        {opt}
                      </motion.div>
                    )
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-stone-400 dark:text-stone-500">
                <div className="h-1.5 flex-1 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                </div>
                {format(t.productPreview.readTime, { min: 5 })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
