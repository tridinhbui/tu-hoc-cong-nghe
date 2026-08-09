"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Gamepad2, ChevronLeft, ChevronRight, Radio } from "lucide-react";
import type { LessonMeta } from "./DashboardClient";
import { GAMES } from "@/lib/games";
import { getWeekSeed, pickRotatingWindow } from "@/lib/content-rotation";
import { getTotalCompletedLessonsCount } from "@/lib/supabase-user";
import { useLocalStorageValue } from "@/lib/use-local-storage-value";
import { GOAL_UPDATED_EVENT } from "@/components/GoalSelectionBanner";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";

interface DashboardRecommendationsProps {
  lessonsMeta: LessonMeta[];
  completed: number[];
  userId: string;
}

// Topic titles are copy, slugs/icons/colors are structure - so these are
// built from `t` rather than kept as a static module-scope array. See
// lib/i18n/dictionaries/sections/quests-referral.ts (`recommendations`).

// Pools are intentionally larger than what's shown at once - "Đang hot tuần
// này" picks a rotating 4-item window out of each pool (see
// pickRotatingWindow/getWeekSeed below), so the same handful of slugs
// doesn't sit there unchanged forever the way a single fixed 4-item list
// would. The window shifts once per ISO week, wrapping back to the start
// once it cycles through the whole pool.
const DEFAULT_TRENDING_POOL = [
  "tai-chinh-la-gi",
  "lai-don-lai-kep",
  "suc-manh-thoi-gian",
  "loi-nhuan-cac-cap-do",
  "tien-la-gi",
  "lai-suat-la-gi",
  "rui-ro-la-gi",
  "thanh-khoan-la-gi",
  "lam-phat-la-gi",
  "gia-tri-thoi-gian-cua-tien",
];


export default function DashboardRecommendations({ lessonsMeta, completed, userId }: DashboardRecommendationsProps) {
  const { t, locale } = useI18n();
  const [collapsed, setCollapsed] = useState(false);
  const [hotCollapsed, setHotCollapsed] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [hotScrollProgress, setHotScrollProgress] = useState(0);
  const [liveCompletedCount, setLiveCompletedCount] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hotScrollContainerRef = useRef<HTMLDivElement>(null);

  const goalKey = `thtcdn_learning_goal_${userId}`;
  // Cùng một khoá, cùng một kênh báo đổi với GoalSelectionBanner - đoạn dây
  // nghe sự kiện trước đây phải chép ở cả hai nơi giờ nằm trong hook.
  const selectedGoal = useLocalStorageValue(goalKey, GOAL_UPDATED_EVENT);

  useEffect(() => {
    let cancelled = false;

    const loadCompletedCount = async () => {
      try {
        const count = await getTotalCompletedLessonsCount();
        if (!cancelled && typeof count === "number") {
          setLiveCompletedCount(count);
        }
      } catch (error) {
        console.error("Error loading live completed lessons count:", error);
      }
    };

    void loadCompletedCount();

    // Không có vòng lặp 30 giây ở đây nữa. Hai listener ngay dưới đã làm đúng
    // việc đó và làm chính xác hơn: chúng chạy khi con số THẬT SỰ đổi, còn
    // vòng lặp thì gọi một RPC đếm toàn bảng hai lần mỗi phút cho mọi tab
    // dashboard đang mở, phần lớn là để nhận về đúng con số cũ.
    window.addEventListener("thtcdn:xp-gained", loadCompletedCount);
    window.addEventListener("thtcdn_weekly_quests_updated", loadCompletedCount);

    return () => {
      cancelled = true;
      window.removeEventListener("thtcdn:xp-gained", loadCompletedCount);
      window.removeEventListener("thtcdn_weekly_quests_updated", loadCompletedCount);
    };
  }, []);

  // Determine active topics and trending slugs based on user's target goal.
  // "Đang hot tuần này" picks a rotating window out of a larger pool (see
  // DEFAULT_TRENDING_POOL's comment) so it actually changes week to week -
  // seeded once per render off the current ISO week, not randomized per
  // visitor, so everyone sees the same "hot this week" set.
  const weekSeed = getWeekSeed();
  let activeTrendingSlugs = pickRotatingWindow(DEFAULT_TRENDING_POOL, 4, weekSeed);

  if (selectedGoal === "personal-finance") {
    activeTrendingSlugs = pickRotatingWindow(
      ["tai-san-tieu-san", "no-tot-no-xau", "vay-tien-giau-hay-pha-san", "thu-nhap-chi-phi-tiet-kiem", "wealth-management", "credit-rating", "credit-spread"],
      4,
      weekSeed
    );
  } else if (selectedGoal === "basic-investing") {
    activeTrendingSlugs = pickRotatingWindow(
      ["lai-don-lai-kep", "lam-phat-la-gi", "suc-manh-thoi-gian", "thanh-khoan-la-gi", "rui-ro-la-gi", "loi-nhuan-ky-vong", "modern-portfolio-theory", "gia-tri-thoi-gian-cua-tien"],
      4,
      weekSeed
    );
  } else if (selectedGoal === "corporate-finance") {
    activeTrendingSlugs = pickRotatingWindow(
      ["dupont-analysis", "roic", "enterprise-value", "fcf-deep-dive", "free-cash-flow-co-ban", "operating-leverage", "roic-phan-2", "operating-cash-flow"],
      4,
      weekSeed
    );
  }

  // Thẻ chủ đề ("Tài chính cá nhân", "Tín dụng & nợ"...) đã bỏ khỏi băng
  // chuyền. Chúng là nhóm rộng nhất trong đó - mỗi thẻ một tiêu đề, một dòng
  // mô tả và một khối biểu tượng - và chúng lặp lại đúng thứ mà danh sách
  // chặng bên cột trái đã bày ra, chỉ khác cách gọi tên. Thẻ này giờ còn đúng
  // phần không trùng: bộ đếm LIVE, một gợi ý trò chơi, và danh sách bài đang
  // nổi ở dưới.
  //
  // Cả `getDefaultTopics`, các nhánh gán `activeTopics` và `topicRecs` xoá
  // theo, chứ không giữ lại sau một `void`: mã chết mà vẫn biên dịch được thì
  // lần đọc sau không phân biệt được nó với mã đang chạy. Muốn dựng lại thì
  // xem git history của file này.
  // Trending
  const allTrendingLessons = lessonsMeta.filter((l) => activeTrendingSlugs.includes(l.slug));
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

  const primaryItems = [...gameItem].slice(0, 5);
  const hotItems = trendingItems;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    const pct = maxScroll > 0 ? (target.scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(pct);
  };

  const handleHotScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    const pct = maxScroll > 0 ? (target.scrollLeft / maxScroll) * 100 : 0;
    setHotScrollProgress(pct);
  };

  if (primaryItems.length === 0 && hotItems.length === 0) return null;

  return (
    <div className="w-full rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-stone-900 p-4 shadow-sm space-y-4">
      {/* 💡 Gợi ý hôm nay */}
      {primaryItems.length > 0 && (
        <section className="flex flex-col overflow-hidden w-full relative">
          <style>{`
            .scrollbar-none::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-none {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            @keyframes rec-card-in {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .rec-card {
              animation: rec-card-in 0.35s ease-out both;
            }
          `}</style>
          <div className="w-full flex items-center justify-between flex-shrink-0 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-stone-400" />
              <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">{t.recommendations.todayTitle}</h2>
            </div>
          </div>

          {liveCompletedCount !== null && (
            <div className="mb-3 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-3.5 py-3 dark:border-emerald-900/60 dark:from-emerald-950/35 dark:to-teal-950/20">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-emerald-200 dark:bg-stone-950/50 dark:text-emerald-300 dark:ring-emerald-900">
                      <Radio className="h-3 w-3 animate-pulse" />
                      {t.recommendations.liveBadge}
                    </span>
                    <p className="truncate text-[11px] font-black uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
                      {t.recommendations.liveTitle}
                    </p>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-stone-600 dark:text-stone-400">
                    {t.recommendations.liveSubtitle}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-2xl font-black tabular-nums leading-none text-stone-950 dark:text-stone-50">
                    {liveCompletedCount.toLocaleString(intlLocale(locale))}
                  </p>
                  <p className="mt-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">{t.recommendations.lessonsUnit}</p>
                </div>
              </div>
            </div>
          )}

          {/* Scrollable Container */}
          <div>
            <>
              <div className="relative group/rec-slider w-full">
                {/* Left Arrow Button */}
                {scrollProgress > 1 && (
                  <button
                    onClick={() => {
                      if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollBy({ left: -217, behavior: "smooth" });
                      }
                    }}
                    className="absolute -left-2.5 top-1/2 -translate-y-1/2 z-10 w-7.5 h-7.5 rounded-full bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-800 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white transition-all cursor-pointer opacity-0 group-hover/rec-slider:opacity-100 hidden sm:flex"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                {/* Right Arrow Button */}
                {scrollProgress < 99 && (
                  <button
                    onClick={() => {
                      if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollBy({ left: 217, behavior: "smooth" });
                      }
                    }}
                    className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-7.5 h-7.5 rounded-full bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-800 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white transition-all cursor-pointer opacity-0 group-hover/rec-slider:opacity-100 hidden sm:flex"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-none"
                >
                  {primaryItems.map((item, idx) => {

                    // game Suggestion
                    const { game } = item;
                    const ACCENTS: Record<string, string> = {
                      emerald: "border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-300 hover:shadow-emerald-500/5",
                      sky: "border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-sky-300 hover:shadow-sky-500/5",
                      amber: "border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-amber-300 hover:shadow-amber-500/5",
                      violet: "border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-violet-300 hover:shadow-violet-500/5",
                      rose: "border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-rose-300 hover:shadow-rose-500/5",
                    };
                    const accentCls = ACCENTS[game.accent] || ACCENTS.emerald;
                    return (
                      <Link
                        key={`game-${game.id}`}
                        href="/game"
                        style={{ animationDelay: `${idx * 60}ms` }}
                        className={`rec-card group flex flex-col justify-between rounded-xl border px-3.5 py-3 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 min-w-[205px] w-[205px] shrink-0 snap-start ${accentCls}`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-5.5 h-5.5 rounded-lg flex items-center justify-center bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                              <Gamepad2 className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                            </div>
                            <span className="text-[10px] font-extrabold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                              {format(t.recommendations.miniGameLabel, { emoji: game.emoji })}
                            </span>
                          </div>
                          <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                            {game.title}
                          </h3>
                        </div>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-2.5 line-clamp-1">
                          {game.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Custom Scroll Indicator */}
              {primaryItems.length > 1 && (
                <div className="mt-2.5 flex justify-center">
                  <div className="w-16 h-1 bg-stone-100 dark:bg-stone-800/80 rounded-full relative">
                    <div 
                      className="absolute top-0 bottom-0 left-0 w-6 bg-emerald-500 dark:bg-emerald-400 rounded-full transition-transform duration-100 ease-out"
                      style={{ transform: `translateX(${(scrollProgress / 100) * (64 - 24)}px)` }}
                    />
                  </div>
                </div>
              )}
            </>
          </div>
        </section>
      )}

      {/* Khối "Đang hot tuần này" đã bỏ. Nó xếp hạng bài theo một con số
          người học được SINH RA tại chỗ (getIllustrativeStudyingCount), nên
          "đang hot" không đo hoạt động nào có thật - và nó nhân đôi đúng dạng
          băng chuyền bài học ngay phía trên. */}
    </div>
  );
}
