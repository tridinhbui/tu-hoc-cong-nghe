"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { getGameRelatedLessons, getGameMeta, type GameType } from "@/lib/games";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

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
    <div
      className={`rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/40 via-amber-50/10 to-transparent p-4 sm:p-5 shadow-sm relative overflow-hidden transition-all ${className}`}
    >
      {/* Light decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-amber-200/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
            💡
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200/60">
                {gl.badge}
              </span>
              <span className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {gl.bonusXp}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-1">
              {format(gl.relatedTo, { title: t.gameMeta[gameMeta.id]?.title ?? gameMeta.title })}
            </h4>
          </div>
        </div>

        {score !== undefined && total !== undefined && (
          <div className="text-right sm:text-right shrink-0">
            <span className="text-[10px] font-semibold text-stone-500 block">
              {gl.lastResultLabel}
            </span>
            <span className="text-xs font-black text-amber-600">
              {format(gl.lastResultScore, { score, total })}
            </span>
          </div>
        )}
      </div>

      <p className="text-xs text-stone-600 mb-3.5 leading-relaxed">
        {gl.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {relatedLessons.map((lesson, i) => (
          <Link
            key={lesson.slug}
            href={`/bai-hoc/${lesson.slug}`}
            className="group flex items-start justify-between gap-3 p-3 rounded-xl bg-white border border-stone-200/80 hover:border-amber-400 hover:shadow-md transition-all"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-amber-600 text-[11px] font-extrabold mb-0.5">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{t.gameRelatedLessons[gameType]?.[i]?.title ?? lesson.title}</span>
              </div>
              <p className="text-[10px] text-stone-500 line-clamp-1 leading-snug">
                {t.gameRelatedLessons[gameType]?.[i]?.subtitle ?? lesson.subtitle}
              </p>
            </div>
            <div className="w-6 h-6 rounded-lg bg-stone-100 group-hover:bg-amber-500 group-hover:text-white text-stone-400 flex items-center justify-center shrink-0 transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
