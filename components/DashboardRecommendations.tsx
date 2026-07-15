import Link from "next/link";
import { Sparkles, Flame, TrendingUp, Target, BookOpen } from "lucide-react";
import type { LessonMeta } from "./DashboardClient";

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

  // Trending
  const trendingLessons = lessonsMeta
    .filter((l) => TRENDING_SLUGS.includes(l.slug))
    .filter((l) => !completed.includes(l.id)); // Prefer uncompleted

  const trendingItems = trendingLessons.map((lesson) => ({
    type: "trending" as const,
    lesson,
  }));

  // Combine topics and trending (showing up to 6 items to make scrolling useful)
  const items = [...topicRecs, ...trendingItems].slice(0, 6);

  if (items.length === 0) return null;

  return (
    <div className="h-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-sm flex flex-col justify-between overflow-hidden">
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">Gợi ý hôm nay (Vuốt để xem thêm)</h2>
      </div>
      
      {/* Scrollable Container */}
      <div className="flex gap-3 overflow-x-auto pb-1 snap-x scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-800">
        {items.map((item, idx) => {
          const { lesson } = item;
          const isDone = completed.includes(lesson.id);

          if (item.type === "topic") {
            const { topic } = item;
            const Icon = topic.icon;
            return (
              <Link
                key={topic.id}
                href={`/bai-hoc/${lesson.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30 px-3.5 py-2.5 hover:border-stone-300 dark:hover:border-stone-600 transition-colors min-w-[190px] w-[190px] shrink-0 snap-start"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${topic.bg} ${topic.color}`}>
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

          // Trending item
          return (
            <Link
              key={`trending-${lesson.id}`}
              href={`/bai-hoc/${lesson.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-rose-100 dark:border-rose-950/30 bg-rose-50/30 dark:bg-rose-950/10 px-3.5 py-2.5 hover:border-rose-300 dark:hover:border-rose-800 transition-colors min-w-[190px] w-[190px] shrink-0 snap-start"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-rose-100 dark:bg-rose-900/50 text-rose-500">
                    <Flame className="w-3 h-3" />
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
        })}
      </div>
    </div>
  );
}
