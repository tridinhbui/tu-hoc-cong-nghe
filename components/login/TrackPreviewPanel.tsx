"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TRACKS, type TrackId } from "@/lib/tracks";

interface TrackPreviewPanelProps {
  previewTrack: TrackId;
  setPreviewTrack: (id: TrackId) => void;
  compact?: boolean;
}

// Shared between the desktop hero panel and the mobile brand block on the
// login page — one component instead of two hand-kept-in-sync copies.
export default function TrackPreviewPanel({ previewTrack, setPreviewTrack, compact = false }: TrackPreviewPanelProps) {
  const track = TRACKS[previewTrack];

  return (
    <div className={`border-2 border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden ${compact ? "mb-8" : ""}`}>
      <div className="grid grid-cols-2">
        {(Object.keys(TRACKS) as TrackId[]).map((id) => {
          const t = TRACKS[id];
          const isActive = previewTrack === id;
          return (
            <button
              key={id}
              onClick={() => setPreviewTrack(id)}
              className={`text-left transition-colors cursor-pointer ${compact ? "px-4 py-3" : "px-5 py-4"} ${
                isActive
                  ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900"
                  : `bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 ${compact ? "" : "hover:bg-stone-50 dark:hover:bg-stone-900"}`
              }`}
            >
              <div className={`font-bold uppercase tracking-widest opacity-60 ${compact ? "text-[10px] mb-0.5" : "text-xs mb-1"}`}>
                {id === "personal" ? "Track 1" : "Track 2"}
              </div>
              <div className={`font-bold ${compact ? "text-xs" : "text-sm"}`}>{t.tab}</div>
              <div className={`opacity-70 ${compact ? "text-[10px] mt-0.5" : "text-xs mt-0.5"}`}>~{t.estimatedHours} giờ học</div>
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
            <div>
              <div className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-1">
                {track.subtitle}
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400">{track.description}</p>
            </div>
          )}

          {compact && <p className="text-xs text-stone-600 dark:text-stone-400">{track.description}</p>}

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
            href={`/bai-hoc/${track.previewSlug}`}
            className={`flex items-center justify-between gap-3 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 rounded-xl transition-colors group ${
              compact ? "px-3 py-2.5" : "px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-900"
            }`}
          >
            <div>
              <div className={`font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider ${compact ? "text-[9px]" : "text-[10px]"}`}>
                {compact ? "Xem thử ngay" : "Xem thử ngay, không cần đăng nhập"}
              </div>
              <div className={`font-bold text-stone-900 dark:text-stone-100 ${compact ? "text-xs" : "text-sm"}`}>
                {track.previewLabel}
              </div>
            </div>
            <span className="text-stone-500 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 group-hover:translate-x-0.5 transition-all">
              →
            </span>
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
