"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Flame, TrendingUp, Target, BookOpen, Gamepad2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import type { LessonMeta } from "./DashboardClient";
import { GAMES } from "@/lib/games";
import { getIllustrativeCount } from "@/lib/illustrative-stats";

interface DashboardRecommendationsProps {
  lessonsMeta: LessonMeta[];
  completed: number[];
  userId: string;
}

const DEFAULT_TOPICS = [
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

const DEFAULT_TRENDING = [
  "tai-chinh-la-gi",
  "lai-don-lai-kep",
  "suc-manh-thoi-gian",
  "loi-nhuan-cac-cap-do",
];

const getIllustrativeStudyingCount = getIllustrativeCount;

export default function DashboardRecommendations({ lessonsMeta, completed, userId }: DashboardRecommendationsProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [hotCollapsed, setHotCollapsed] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hotScrollProgress, setHotScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hotScrollContainerRef = useRef<HTMLDivElement>(null);

  const goalKey = `thtcdn_learning_goal_${userId}`;

  const loadGoal = () => {
    if (typeof window !== "undefined") {
      setSelectedGoal(window.localStorage.getItem(goalKey));
    }
  };

  useEffect(() => {
    loadGoal();

    // Listen for goal changes
    window.addEventListener("thtcdn_goal_updated", loadGoal);
    return () => {
      window.removeEventListener("thtcdn_goal_updated", loadGoal);
    };
  }, [goalKey]);

  // Determine active topics and trending slugs based on user's target goal
  let activeTopics = DEFAULT_TOPICS;
  let activeTrendingSlugs = DEFAULT_TRENDING;

  if (selectedGoal === "personal-finance") {
    activeTopics = [
      {
        id: "pf-basic",
        title: "Tài chính Cá nhân",
        icon: BookOpen,
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-950/30",
        slugs: ["tai-chinh-la-gi", "thu-nhap-chi-phi-tiet-kiem", "tai-san-tieu-san"],
      },
      {
        id: "pf-debt",
        title: "Tín dụng & Nợ",
        icon: Target,
        color: "text-rose-500",
        bg: "bg-rose-50 dark:bg-rose-950/30",
        slugs: ["credit-debit-phan-1", "credit-debit-phan-2", "no-tot-no-xau"],
      }
    ];
    activeTrendingSlugs = ["tai-san-tieu-san", "no-tot-no-xau", "credit-debit-phan-1", "thu-nhap-chi-phi-tiet-kiem"];
  } else if (selectedGoal === "basic-investing") {
    activeTopics = [
      {
        id: "bi-save",
        title: "Tích lũy",
        icon: TrendingUp,
        color: "text-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
        slugs: ["lai-don-lai-kep", "suc-manh-thoi-gian", "thanh-khoan-la-gi"],
      },
      {
        id: "bi-risk",
        title: "Rủi ro & Kế hoạch",
        icon: BookOpen,
        color: "text-amber-500",
        bg: "bg-amber-50 dark:bg-amber-950/30",
        slugs: ["lam-phat-la-gi", "rui-ro-la-gi", "loi-nhuan-ky-vong"],
      }
    ];
    activeTrendingSlugs = ["lai-don-lai-kep", "lam-phat-la-gi", "suc-manh-thoi-gian", "thanh-khoan-la-gi"];
  } else if (selectedGoal === "corporate-finance") {
    activeTopics = [
      {
        id: "cf-reports",
        title: "Báo cáo tài chính",
        icon: Target,
        color: "text-purple-500",
        bg: "bg-purple-50 dark:bg-purple-950/30",
        slugs: ["bang-can-doi-ke-toan", "bao-cao-luu-chuyen-tien-te", "dupont-analysis"],
      },
      {
        id: "cf-valuation",
        title: "Định giá & Cổ phiếu",
        icon: TrendingUp,
        color: "text-indigo-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/30",
        slugs: ["roic", "enterprise-value", "fcf-deep-dive"],
      }
    ];
    activeTrendingSlugs = ["dupont-analysis", "roic", "enterprise-value", "fcf-deep-dive"];
  }

  // Recommendations
  const topicRecs = activeTopics.map((topic) => {
    const topicLessons = lessonsMeta.filter((l) => topic.slugs.includes(l.slug));
    if (topicLessons.length === 0) return null;
    const incomplete = topicLessons.filter((l) => !completed.includes(l.id));
    const lesson = incomplete.length > 0 ? incomplete[0] : topicLessons[0];
    return { type: "topic" as const, topic, lesson };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

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
  const primaryItems = [...topicRecs, ...gameItem].slice(0, 5);
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
    <div className="space-y-6 w-full">
      {/* 💡 Gợi ý hôm nay */}
      {primaryItems.length > 0 && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-4 shadow-sm flex flex-col justify-between overflow-hidden w-full relative">
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
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-between mb-3 flex-shrink-0 cursor-pointer text-left focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">Gợi ý hôm nay</h2>
            </div>
            {collapsed ? (
              <ChevronDown className="w-4 h-4 text-stone-400 dark:text-stone-500" />
            ) : (
              <ChevronUp className="w-4 h-4 text-stone-400 dark:text-stone-500" />
            )}
          </button>

          {/* Scrollable Container */}
          {!collapsed && (
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
                    if (item.type === "topic") {
                      const { topic, lesson } = item;
                      const isDone = completed.includes(lesson.id);
                      const Icon = topic.icon;
                      return (
                        <Link
                          key={`topic-${topic.id}`}
                          href={`/bai-hoc/${lesson.slug}`}
                          style={{ animationDelay: `${idx * 60}ms` }}
                          className="rec-card group flex flex-col justify-between rounded-xl border border-stone-200/60 dark:border-stone-800 bg-gradient-to-b from-stone-50/50 to-stone-100/10 dark:from-stone-900/60 dark:to-stone-950/20 px-3.5 py-3 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md hover:shadow-emerald-500/5 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 min-w-[205px] w-[205px] shrink-0 snap-start"
                        >
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <div className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center ${topic.bg} ${topic.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                <Icon className="w-3 h-3" />
                              </div>
                              <span className="text-[10px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                                {topic.title}
                              </span>
                              {isDone && (
                                <span className="ml-auto text-[9px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1 py-0.5 rounded-sm">
                                  Xong
                                </span>
                              )}
                            </div>
                            <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                              {lesson.title}
                            </h3>
                          </div>
                          <p className="text-[10px] text-stone-450 dark:text-stone-500 mt-2.5 line-clamp-1">
                            {lesson.subtitle}
                          </p>
                          <p className="text-[9px] text-emerald-600 dark:text-emerald-400 mt-1.5 font-bold">
                            👥 {getIllustrativeStudyingCount(lesson.slug, 20, 120)} người đang học
                          </p>
                        </Link>
                      );
                    }

                    // game Suggestion
                    const { game } = item;
                    const ACCENTS: Record<string, string> = {
                      emerald: "border-emerald-200/60 dark:border-emerald-950 bg-gradient-to-b from-emerald-50/20 to-emerald-100/5 dark:from-emerald-950/20 dark:to-emerald-950/5 hover:border-emerald-400 hover:shadow-emerald-500/5",
                      sky: "border-sky-200/60 dark:border-sky-950 bg-gradient-to-b from-sky-50/20 to-sky-100/5 dark:from-sky-950/20 dark:to-sky-950/5 hover:border-sky-400 hover:shadow-sky-500/5",
                      amber: "border-amber-200/60 dark:border-amber-950 bg-gradient-to-b from-amber-50/20 to-amber-100/5 dark:from-amber-950/20 dark:to-amber-950/5 hover:border-amber-400 hover:shadow-amber-500/5",
                      violet: "border-violet-200/60 dark:border-violet-950 bg-gradient-to-b from-violet-50/20 to-violet-100/5 dark:from-violet-950/20 dark:to-violet-950/5 hover:border-violet-400 hover:shadow-violet-500/5",
                      rose: "border-rose-200/60 dark:border-rose-950 bg-gradient-to-b from-rose-50/20 to-rose-100/5 dark:from-rose-950/20 dark:to-rose-950/5 hover:border-rose-400 hover:shadow-rose-500/5",
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
                            <div className="w-5.5 h-5.5 rounded-lg flex items-center justify-center bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                              <Gamepad2 className="w-3 h-3 text-emerald-600 dark:text-emerald-450 animate-pulse" />
                            </div>
                            <span className="text-[10px] font-extrabold text-stone-600 dark:text-stone-455 uppercase tracking-wider">
                              Mini Game {game.emoji}
                            </span>
                          </div>
                          <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                            {game.title}
                          </h3>
                        </div>
                        <p className="text-[10px] text-stone-450 dark:text-stone-500 mt-2.5 line-clamp-1">
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
                      className="absolute top-0 bottom-0 left-0 w-6 bg-emerald-500 dark:bg-emerald-450 rounded-full transition-transform duration-100 ease-out"
                      style={{ transform: `translateX(${(scrollProgress / 100) * (64 - 24)}px)` }}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* 🔥 Bài học Đang hot */}
      {hotItems.length > 0 && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-xl p-4 shadow-sm flex flex-col justify-between overflow-hidden w-full relative">
          <button
            onClick={() => setHotCollapsed(!hotCollapsed)}
            className="w-full flex items-center justify-between mb-3 flex-shrink-0 cursor-pointer text-left focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">Đang hot tuần này</h2>
            </div>
            {hotCollapsed ? (
              <ChevronDown className="w-4 h-4 text-stone-400 dark:text-stone-500" />
            ) : (
              <ChevronUp className="w-4 h-4 text-stone-400 dark:text-stone-500" />
            )}
          </button>
          
          {!hotCollapsed && (
            <>
              <div className="relative group/rec-slider w-full">
                {/* Left Arrow Button */}
                {hotScrollProgress > 1 && (
                  <button
                    onClick={() => {
                      if (hotScrollContainerRef.current) {
                        hotScrollContainerRef.current.scrollBy({ left: -217, behavior: "smooth" });
                      }
                    }}
                    className="absolute -left-2.5 top-1/2 -translate-y-1/2 z-10 w-7.5 h-7.5 rounded-full bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-800 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white transition-all cursor-pointer opacity-0 group-hover/rec-slider:opacity-100 hidden sm:flex"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                {/* Right Arrow Button */}
                {hotScrollProgress < 99 && (
                  <button
                    onClick={() => {
                      if (hotScrollContainerRef.current) {
                        hotScrollContainerRef.current.scrollBy({ left: 217, behavior: "smooth" });
                      }
                    }}
                    className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-7.5 h-7.5 rounded-full bg-white/95 dark:bg-stone-900/95 border border-stone-200 dark:border-stone-800 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white transition-all cursor-pointer opacity-0 group-hover/rec-slider:opacity-100 hidden sm:flex"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                <div 
                  ref={hotScrollContainerRef}
                  onScroll={handleHotScroll}
                  className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-none"
                >
                  {hotItems.map((item, idx) => {
                    const { lesson } = item;
                    const isDone = completed.includes(lesson.id);
                    return (
                      <Link
                        key={`hot-${lesson.id}`}
                        href={`/bai-hoc/${lesson.slug}`}
                        style={{ animationDelay: `${idx * 60}ms` }}
                        className="rec-card group flex flex-col justify-between rounded-xl border border-rose-100 dark:border-rose-950/30 bg-gradient-to-b from-rose-50/20 to-rose-100/5 dark:from-rose-950/20 dark:to-rose-950/5 px-3.5 py-3 hover:border-rose-300 dark:hover:border-rose-800 hover:shadow-md hover:shadow-rose-500/5 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 min-w-[205px] w-[205px] shrink-0 snap-start"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-5.5 h-5.5 rounded-lg flex items-center justify-center bg-rose-100 dark:bg-rose-900/50 text-rose-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                              <Flame className="w-3 h-3 animate-pulse" />
                            </div>
                            <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-455 uppercase tracking-wider">
                              Đang hot
                            </span>
                            {isDone && (
                              <span className="ml-auto text-[9px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1 py-0.5 rounded-sm">
                                Xong
                                </span>
                            )}
                          </div>
                          <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 leading-tight">
                            {lesson.title}
                          </h3>
                        </div>
                        <p className="text-[10px] text-stone-455 dark:text-stone-500 mt-2.5 line-clamp-1">
                          {lesson.subtitle}
                        </p>
                        <p className="text-[9px] text-rose-500 dark:text-rose-400 mt-1.5 font-bold">
                          👥 {getIllustrativeStudyingCount(lesson.slug, 80, 340)} người đang học
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Custom Scroll Indicator */}
              {hotItems.length > 1 && (
                <div className="mt-2.5 flex justify-center">
                  <div className="w-16 h-1 bg-stone-100 dark:bg-stone-850 rounded-full relative">
                    <div 
                      className="absolute top-0 bottom-0 left-0 w-6 bg-rose-500 dark:bg-rose-450 rounded-full transition-transform duration-100 ease-out"
                      style={{ transform: `translateX(${(hotScrollProgress / 100) * (64 - 24)}px)` }}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
