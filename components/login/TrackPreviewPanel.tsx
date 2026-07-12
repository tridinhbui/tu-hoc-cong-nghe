"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { TRACKS, type TrackId } from "@/lib/tracks";

interface TrackPreviewPanelProps {
  previewTrack: TrackId;
  setPreviewTrack: (id: TrackId) => void;
  compact?: boolean;
}

// Shared between the desktop hero panel and the mobile brand block on the
// login page - one component instead of two hand-kept-in-sync copies.
export default function TrackPreviewPanel({ previewTrack, setPreviewTrack, compact = false }: TrackPreviewPanelProps) {
  const track = TRACKS[previewTrack];

  return (
    <div className={`border-2 border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden ${compact ? "mb-8" : ""}`}>
      <div className={`grid ${Object.keys(TRACKS).length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
        {(Object.keys(TRACKS) as TrackId[]).map((id, index) => {
          const t = TRACKS[id];
          const isActive = previewTrack === id;
          return (
            <button
              key={id}
              onClick={() => setPreviewTrack(id)}
              className={`relative text-left transition-colors cursor-pointer ${compact ? "px-4 py-3" : "px-5 py-4"} ${
                isActive
                  ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                  : `bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 ${compact ? "" : "hover:bg-stone-50 dark:hover:bg-stone-900"}`
              }`}
            >
              {id === "cfa" && (
                <span className="absolute top-1.5 right-1.5 text-[9px] font-extrabold text-white bg-indigo-500 px-1.5 py-0.5 rounded uppercase tracking-wide">
                  Mới
                </span>
              )}
              <div className={`font-bold uppercase tracking-widest opacity-60 ${compact ? "text-[11px] mb-0.5" : "text-xs mb-1"}`}>
                Track {index + 1}
              </div>
              <div className={`font-bold ${compact ? "text-sm" : "text-sm"}`}>{t.tab}</div>
              {t.estimatedHours > 0 && (
                <div className={`opacity-70 ${compact ? "text-xs mt-0.5" : "text-xs mt-0.5"}`}>~{t.estimatedHours} bài học</div>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={previewTrack}
          initial={{ opacity: 0, y: compact ? 4 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: compact ? -4 : -6 }}
          transition={{ duration: 0.18 }}
          className={compact ? "p-4 space-y-3" : "p-6 space-y-4"}
        >
          {!compact && (
            <p className="text-sm text-stone-600 dark:text-stone-400">{track.description}</p>
          )}

          {compact && <p className="text-sm text-stone-600 dark:text-stone-400">{track.description}</p>}

          {!compact && (
            <ul className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
              {track.stages.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="flex-shrink-0 text-stone-300 dark:text-stone-600">→</span> {s}
                </li>
              ))}
            </ul>
          )}

          <a
            href={track.previewSlug ? `/bai-hoc/${track.previewSlug}` : "/cfa"}
            className={`flex items-center justify-between gap-3 rounded-xl transition-all group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-sm hover:shadow-md active:scale-[0.99] ${
              compact ? "px-4 py-3" : "px-5 py-4"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <PlayCircle className={`flex-shrink-0 text-white/90 ${compact ? "w-6 h-6" : "w-7 h-7"}`} />
              <div className="min-w-0">
                <div className={`font-extrabold text-white uppercase tracking-wider ${compact ? "text-[11px]" : "text-xs"}`}>
                  {track.previewSlug
                    ? compact
                      ? "Miễn phí · Xem thử ngay"
                      : "Miễn phí · Xem thử ngay, không cần đăng nhập"
                    : "Xem trước"}
                </div>
                <div className={`font-bold text-white truncate ${compact ? "text-sm" : "text-base"}`}>
                  {track.previewLabel}
                </div>
              </div>
            </div>
            <span className="flex-shrink-0 text-white group-hover:translate-x-0.5 transition-transform text-lg">
              →
            </span>
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
