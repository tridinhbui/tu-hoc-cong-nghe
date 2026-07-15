import Link from "next/link";
import { Sparkles, Flame, TrendingUp, Target, BookOpen, Gamepad2 } from "lucide-react";
import type { LessonMeta } from "./DashboardClient";
import { GAMES } from "@/lib/games";

interface DashboardRecommendationsProps {
  lessonsMeta: LessonMeta[];
  completed: number[];
}

const TOPICS = [
  {
    id: "newbie",
    title: "Nhập môn",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    slugs: ["tai-chinh-la-gi", "tien-la-gi", "thu-nhap-chi-phi-tiet-kiem"],
  },
  {
    id: "investing",
    title: "Đầu tư",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    slugs: ["lai-suat-la-gi", "rui-ro-la-gi", "loi-nhuan-ky-vong"],
  },
  {
    id: "accounting",
    title: "Kế toán",
    icon: Target,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    slugs: ["ke-toan-la-gi", "doanh-thu-ghi-nhan", "cong-thuc-ke-toan"],
  },
];

const TRENDING_SLUGS = [
  "tai-chinh-la-gi",
  "lai-don-lai-kep",
  "suc-manh-thoi-gian",
  "loi-nhuan-cac-cap-do",
];

export default function DashboardRecommendations({ lessonsMeta, completed }: DashboardRecommendationsProps) {
  // Recommendations
  const topicRecs = TOPICS.map((topic) => {
    const topicLessons = lessonsMeta.filter((l) => topic.slugs.includes(l.slug));
    if (topicLessons.length === 0) return null;
    const incomplete = topicLessons.filter((l) => !completed.includes(l.id));
    const lesson = incomplete.length > 0 ? incomplete[0] : topicLessons[0];
    return { type: "topic" as const, topic, lesson };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  // Trending - prefers uncompleted lessons, but (matching the topic
  // recommendations' own fallback above) falls back to showing completed
  // ones rather than silently dropping to zero trending items once a
  // learner has finished all of them.
  const allTrendingLessons = lessonsMeta.filter((l) => TRENDING_SLUGS.includes(l.slug));
  const incompleteTrending = allTrendingLessons.filter((l) => !completed.includes(l.id));
  const trendingLessons = incompleteTrending.length > 0 ? incompleteTrending : allTrendingLessons;

  const trendingItems = trendingLessons.map((lesson) => ({
    type: "trending" as const,
    lesson,
  }));

  // Suggest a game based on the day of the week
  const gameIndex = new Date().getDay() % GAMES.length;
  const suggestedGame = GAMES[gameIndex];
  const gameItem = suggestedGame ? [{ type: "game" as const, game: suggestedGame }] : [];

  // Combine topics, trending, and game (showing up to 7 items to make scrolling useful)
  const items = [...topicRecs, ...trendingItems, ...gameItem].slice(0, 7);

  if (items.length === 0) return null;

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-sm flex flex-col justify-between overflow-hidden w-full">
      <style>{`
        @keyframes rec-card-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rec-card {
          animation: rec-card-in 0.35s ease-out both;
        }
      `}</style>
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
        <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">Gợi ý hôm nay</h2>
      </div>

      {/* Scrollable Container */}
      <div className="flex gap-3 overflow-x-auto pb-1 snap-x scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-800">
        {items.map((item, idx) => {
          if (item.type === "topic") {
            const { topic, lesson } = item;
            const isDone = completed.includes(lesson.id);
            const Icon = topic.icon;
            return (
              <Link
                key={`topic-${topic.id}`}
                href={`/bai-hoc/${lesson.slug}`}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="rec-card group flex flex-col justify-between rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30 px-3.5 py-2.5 hover:border-stone-300 dark:hover:border-stone-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-[190px] w-[190px] shrink-0 snap-start"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${topic.bg} ${topic.color} transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      {topic.title}
                    </span>
                    {isDone && (
                      <span className="ml-auto text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-sm">
                        Xong
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-stone-700 transition-colors line-clamp-2">
                    {lesson.title}
                  </h3>
                </div>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-2 line-clamp-1">
                  {lesson.subtitle}
                </p>
              </Link>
            );
          }

          if (item.type === "trending") {
            const { lesson } = item;
            const isDone = completed.includes(lesson.id);
            return (
              <Link
                key={`trending-${lesson.id}`}
                href={`/bai-hoc/${lesson.slug}`}
                style={{ animationDelay: `${idx * 60}ms` }}
                className="rec-card group flex flex-col justify-between rounded-xl border border-rose-100 dark:border-rose-950/30 bg-rose-50/30 dark:bg-rose-950/10 px-3.5 py-2.5 hover:border-rose-300 dark:hover:border-rose-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-[190px] w-[190px] shrink-0 snap-start"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-5 h-5 rounded flex items-center justify-center bg-rose-100 dark:bg-rose-900/50 text-rose-500">
                      <Flame className="w-3 h-3 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                      Đang hot
                    </span>
                    {isDone && (
                      <span className="ml-auto text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-sm">
                        Xong
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 transition-colors line-clamp-2">
                    {lesson.title}
                  </h3>
                </div>
                <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-2 line-clamp-1">
                  {lesson.subtitle}
                </p>
              </Link>
            );
          }

          // Game suggestion item
          const { game } = item;
          const ACCENTS: Record<string, string> = {
            emerald: "border-emerald-100 dark:border-emerald-950/30 bg-emerald-50/30 dark:bg-emerald-950/10 hover:border-emerald-350 hover:bg-emerald-50/50",
            sky: "border-sky-100 dark:border-sky-950/30 bg-sky-50/30 dark:bg-sky-950/10 hover:border-sky-350 hover:bg-sky-50/50",
            amber: "border-amber-100 dark:border-amber-950/30 bg-amber-50/30 dark:bg-amber-950/10 hover:border-amber-350 hover:bg-amber-50/50",
            violet: "border-violet-100 dark:border-violet-950/30 bg-violet-50/30 dark:bg-violet-950/10 hover:border-violet-350 hover:bg-violet-50/50",
            rose: "border-rose-100 dark:border-rose-950/30 bg-rose-50/30 dark:bg-rose-950/10 hover:border-rose-350 hover:bg-rose-50/50",
          };
          const accentCls = ACCENTS[game.accent] || ACCENTS.emerald;

          return (
            <Link
              key={`game-${game.id}`}
              href="/game"
              style={{ animationDelay: `${idx * 60}ms` }}
              className={`rec-card group flex flex-col justify-between rounded-xl border px-3.5 py-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-[190px] w-[190px] shrink-0 snap-start ${accentCls}`}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 transition-transform duration-200 group-hover:scale-110">
                    <Gamepad2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-extrabold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                    Mini Game {game.emoji}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {game.title}
                </h3>
              </div>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-2 line-clamp-1">
                {game.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
