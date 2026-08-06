"use client";

import { useEffect, type Dispatch, type SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlayCircle, CheckCircle2, Sparkles, Flame } from "lucide-react";
import { TRACKS, type TrackId } from "@/lib/tracks";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

const TRACK_IDS = Object.keys(TRACKS) as TrackId[];

interface TrackPreviewPanelProps {
  previewTrack: TrackId;
  setPreviewTrack: Dispatch<SetStateAction<TrackId>>;
  compact?: boolean;
}

export default function TrackPreviewPanel({ previewTrack, setPreviewTrack, compact = false }: TrackPreviewPanelProps) {
  const { t } = useI18n();
  const track = TRACKS[previewTrack];
  

  useEffect(() => {
    let cancelled = false;
    const timer = window.setInterval(() => {
      if (cancelled) return;
      setPreviewTrack((current: TrackId) => {
        const idx = TRACK_IDS.indexOf(current);
        return TRACK_IDS[(idx + 1) % TRACK_IDS.length];
      });
    }, compact ? 6000 : 5400);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [compact, setPreviewTrack]);

  return (
    <div className={`border border-stone-200/90 dark:border-stone-800 rounded-2xl overflow-hidden bg-white dark:bg-stone-900 shadow-md ${compact ? "mb-8" : ""}`}>
      {/* Top Track Selection Tabs */}
      <div className={`grid ${Object.keys(TRACKS).length === 3 ? "grid-cols-3" : "grid-cols-2"} border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40`}>
        {TRACK_IDS.map((id, index) => {
          const trackData = TRACKS[id];
          const isActive = previewTrack === id;
          return (
            <motion.button
              key={id}
              onClick={() => setPreviewTrack(id)}
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -1 }}
              className={`relative text-left transition-all cursor-pointer ${compact ? "px-3.5 py-2.5" : "px-5 py-3.5"} ${
                isActive
                  ? "bg-stone-950 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs"
                  : "bg-white/80 dark:bg-stone-900/60 text-stone-500 dark:text-stone-400 hover:bg-stone-100/60 dark:hover:bg-stone-800"
              }`}
            >
              {id === "cfa" && (
                <span className="absolute top-1.5 right-1.5 text-[9px] font-black text-white bg-indigo-500 px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  {t.trackPanel.isNew}
                </span>
              )}
              <div className={`font-black uppercase tracking-widest opacity-60 ${compact ? "text-[10px] mb-0.5" : "text-[11px] mb-1"}`}>
                {t.trackPanel.trackPrefix} {index + 1}
              </div>
              <div className={`font-black ${compact ? "text-xs" : "text-sm"} leading-snug`}>{t.tracks[id].tab}</div>
              {trackData.estimatedHours > 0 && (
                <div className={`opacity-70 font-semibold ${compact ? "text-[10px] mt-0.5" : "text-xs mt-0.5"}`}>{format(t.trackPanel.effortHours, { hours: trackData.estimatedHours })}</div>
              )}
              {isActive && (
                <motion.div
                  className="absolute inset-x-2 bottom-0 h-1 rounded-t-full bg-emerald-400 dark:bg-emerald-500"
                  layoutId={compact ? "track-indicator-compact" : "track-indicator"}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic Content Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={previewTrack}
          initial={{ opacity: 0, y: compact ? 6 : 8, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: compact ? -6 : -8, scale: 0.985 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className={compact ? "p-4 space-y-3" : "p-5 xl:p-6 space-y-4"}
        >
          {/* Header Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" />
              {t.trackPanel.standardised}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/50">
              <Flame className="w-3 h-3 text-amber-500" />
              {t.trackPanel.xpPerLesson}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
            {track.description}
          </p>

          {/* Animated Stage List with Checkmarks */}
          {!compact && t.tracks[previewTrack].stages.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">{t.trackPanel.stagesTitle}</p>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {t.tracks[previewTrack].stages.map((s, idx) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    className="flex items-center gap-2 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40 px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTA Button */}
          <a
            href={track.previewSlug ? `/bai-hoc/${track.previewSlug}` : "/cfa"}
            className={`cta-electric flex items-center justify-between gap-3 rounded-xl transition-all group bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg active:scale-[0.99] ${
              compact ? "px-4 py-3" : "px-5 py-3.5"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <PlayCircle className={`text-white ${compact ? "w-5 h-5" : "w-6 h-6"}`} />
              </motion.div>
              <div className="min-w-0">
                <div className={`font-black text-white/90 uppercase tracking-wider ${compact ? "text-[10px]" : "text-[11px]"}`}>
                  {track.previewSlug
                    ? compact
                      ? t.trackPanel.freeTryCompact
                      : t.trackPanel.freeTry
                    : t.trackPanel.previewOnly}
                </div>
                <div className={`font-black text-white truncate ${compact ? "text-xs" : "text-sm"}`}>
                  {t.tracks[previewTrack].previewLabel}
                </div>
              </div>
            </div>
            <span className="flex-shrink-0 text-white group-hover:translate-x-1 transition-transform text-lg font-black">
              →
            </span>
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
