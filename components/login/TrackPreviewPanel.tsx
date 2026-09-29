"use client";

import { useEffect, type Dispatch, type SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { TRACKS, type TrackId } from "@/lib/tracks";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { XP_PER_LESSON } from "@/lib/levels";
import { Sys, StatusDot, btnPrimary, panel } from "@/components/ui/system";

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

  // Khuôn thanh tab của khung soạn thảo ở trang chủ: tab đang mở nền trắng
  // liền với thân, tab khác nằm trên nền thanh tiêu đề #f3f1ec, gạch xanh 2px
  // đánh dấu tab đang mở (xanh là chức năng). Không bóng, không viên thuốc.
  return (
    <div className={`${panel} overflow-hidden ${compact ? "mb-8" : ""}`}>
      <div
        className={`grid ${TRACK_IDS.length === 3 ? "grid-cols-3" : "grid-cols-2"} divide-x divide-stone-300 border-b border-stone-300 bg-surface-raised dark:divide-stone-700 dark:border-stone-700 dark:bg-stone-950`}
      >
        {TRACK_IDS.map((id, index) => {
          const trackData = TRACKS[id];
          const isActive = previewTrack === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setPreviewTrack(id)}
              className={`relative text-left transition-colors cursor-pointer ${compact ? "px-3.5 py-2.5" : "px-5 py-3.5"} ${
                isActive
                  ? "bg-white text-ink-max dark:bg-stone-900"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {id === "certification" && (
                <span className="absolute top-1.5 right-1.5 rounded-xs border border-stone-400 px-1 text-[9px] font-bold uppercase tracking-wider text-ink-soft dark:border-stone-600">
                  {t.trackPanel.isNew}
                </span>
              )}
              <div className={`font-bold uppercase tracking-[0.12em] text-ink-faint ${compact ? "text-[10px] mb-0.5" : "text-[11px] mb-1"}`}>
                {t.trackPanel.trackPrefix} {index + 1}
              </div>
              <div className={`font-black ${compact ? "text-xs" : "text-sm"} leading-snug`}>{t.tracks[id].tab}</div>
              {trackData.estimatedHours > 0 && (
                <div className={`text-ink-muted font-semibold ${compact ? "text-[10px] mt-0.5" : "text-xs mt-0.5"}`}>{format(t.trackPanel.effortHours, { hours: trackData.estimatedHours })}</div>
              )}
              {isActive && (
                <motion.div
                  className="absolute inset-x-0 top-0 h-0.5 bg-brand-600 dark:bg-brand-500"
                  layoutId={compact ? "track-indicator-compact" : "track-indicator"}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
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
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={compact ? "p-4 space-y-3" : "p-5 xl:p-6 space-y-4"}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-line-strong px-1.5 py-0.5 text-[11px] font-bold text-ink-soft dark:border-stone-700">
              <StatusDot />
              {t.trackPanel.standardised}
            </span>
            <span className="text-[11px] font-bold tabular-nums text-ink-muted">
              {format(t.trackPanel.xpPerLesson, { xp: XP_PER_LESSON })}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            {track.description}
          </p>

          {!compact && t.tracks[previewTrack].stages.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <p className="eyebrow text-ink-muted">{t.trackPanel.stagesTitle}</p>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {t.tracks[previewTrack].stages.map((s, idx) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 rounded-sm border border-stone-200 px-3 py-2 text-xs font-semibold text-ink-body dark:border-stone-800"
                  >
                    <Sys className="text-ink-faint">{String(idx + 1).padStart(2, "0")}</Sys>
                    <span className="truncate">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={track.previewSlug ? `/bai-hoc/${track.previewSlug}` : "/chung-chi"}
            className={`${btnPrimary} w-full justify-between`}
          >
            <span className="flex min-w-0 items-center gap-3">
              <PlayCircle className={`shrink-0 ${compact ? "w-5 h-5" : "w-6 h-6"}`} />
              <span className="min-w-0 text-left">
                <span className={`block font-bold uppercase tracking-[0.12em] opacity-70 ${compact ? "text-[10px]" : "text-[11px]"}`}>
                  {track.previewSlug
                    ? compact
                      ? t.trackPanel.freeTryCompact
                      : t.trackPanel.freeTry
                    : t.trackPanel.previewOnly}
                </span>
                <span className={`block truncate font-black ${compact ? "text-xs" : "text-sm"}`}>
                  {t.tracks[previewTrack].previewLabel}
                </span>
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
