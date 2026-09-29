"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, Lightbulb } from "lucide-react";
import { Frame } from "@/components/ui/system";
import { getGameRelatedLessons, getGameMeta, type GameType } from "@/lib/games";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/* i18n-ignore-start: định danh hệ thống, không phải chữ hiển thị. */
const SYS_PATH = "THCN://GAME/REVIEW";
/* i18n-ignore-end */

interface GameLessonRecommendationProps {
  gameType: GameType;
  score?: number;
  total?: number;
  className?: string;
}

export default function GameLessonRecommendation({
  gameType,
  score,
  total,
  className = "",
}: GameLessonRecommendationProps) {
  const { t } = useI18n();
  const gl = t.games.gameLessonRecommendation;
  const gameMeta = getGameMeta(gameType);
  const relatedLessons = getGameRelatedLessons(gameType);

  if (!relatedLessons || relatedLessons.length === 0) return null;

  return (
    <Frame title={SYS_PATH} className={className} bodyClassName="p-4 sm:p-5">
      <div className="mb-3 flex flex-col items-start justify-between gap-3 border-b border-stone-200 pb-3 sm:flex-row sm:items-center dark:border-stone-800">
        <div className="flex items-center gap-2.5">
          <Lightbulb className="h-5 w-5 shrink-0 text-ink-muted" strokeWidth={1.75} aria-hidden />
          <div>
            <span className="eyebrow text-ink-soft">{gl.badge}</span>
            <h4 className="mt-0.5 text-sm font-bold text-ink-max">
              {format(gl.relatedTo, { title: t.gameMeta[gameMeta.id]?.title ?? gameMeta.title })}
            </h4>
          </div>
        </div>

        {score !== undefined && total !== undefined && (
          <div className="shrink-0 text-left sm:text-right">
            <span className="block text-[11px] font-semibold text-ink-muted">
              {gl.lastResultLabel}
            </span>
            <span className="font-mono text-sm font-medium tabular-nums text-ink-max">
              {format(gl.lastResultScore, { score, total })}
            </span>
          </div>
        )}
      </div>

      {/* "x1.5 XP khi học lại" đã gỡ: không có hệ số thưởng nào như vậy trong mã
          tính XP - luật 5, siêu dữ liệu không bịa. */}
      <p className="mb-3.5 text-xs leading-relaxed text-ink-soft">
        {gl.description}
      </p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {relatedLessons.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/bai-hoc/${lesson.slug}`}
            className="group flex items-start justify-between gap-3 rounded-sm border border-line-strong p-3 transition-colors hover:border-stone-950 dark:border-stone-700 dark:hover:border-stone-300"
          >
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex items-center gap-1.5 text-xs font-bold text-accent-strong">
                <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="truncate">{lesson.title}</span>
              </div>
              <p className="line-clamp-1 text-[11px] leading-snug text-ink-muted">
                {lesson.subtitle}
              </p>
            </div>
            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden />
          </Link>
        ))}
      </div>
    </Frame>
  );
}
