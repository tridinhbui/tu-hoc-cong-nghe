"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "@/lib/client-hooks";
import { lessons } from "@/lib/lessons";
import { createClient } from "@/lib/supabase";
import UserStats from "@/components/UserStats";
import UserMenu from "@/components/UserMenu";
import Leaderboard from "@/components/Leaderboard";
import { XP_VALUES, getLevelByXp } from "@/lib/levels";

/* ─── Track definitions ─────────────────────────────────────────── */

const TRACK_PERSONAL = {
  id: "personal",
  title: "Tài chính cá nhân",
  subtitle: "Chưa có nền tảng tài chính",
  description:
    "Dành cho người muốn hiểu tiền bạc, kiểm soát chi tiêu, xây dựng tài sản và đầu tư thông minh — không cần kiến thức ngành.",
  pillars: ["Quản lý dòng tiền", "Tích lũy và đầu tư", "Kế hoạch tài chính dài hạn"],
  stages: [
    {
      label: "Chặng 1",
      name: "Tư duy tiền bạc & tài chính cơ bản",
      days: [1, 20] as [number, number],
      available: true,
    },
    {
      label: "Chặng 2",
      name: "Đầu tư thực tế: cổ phiếu, ETF, quỹ chỉ số",
      days: [201, 220] as [number, number],
      available: false,
    },
    {
      label: "Chặng 3",
      name: "Bất động sản & bảo hiểm cá nhân",
      days: [221, 240] as [number, number],
      available: false,
    },
    {
      label: "Chặng 4",
      name: "Kế hoạch hưu trí & tự do tài chính",
      days: [241, 260] as [number, number],
      available: false,
    },
  ],
};

const TRACK_PROFESSIONAL = {
  id: "professional",
  title: "Tài chính chuyên ngành",
  subtitle: "Theo ngành, theo nghề",
  description:
    "Dành cho người muốn xây nền tảng kỹ thuật bài bản — từ kế toán, phân tích báo cáo, định giá đến tài chính doanh nghiệp.",
  pillars: ["Kế toán & báo cáo tài chính", "Phân tích & định giá", "Tài chính doanh nghiệp"],
  stages: [
    {
      label: "Chặng 1",
      name: "Kế toán nền tảng",
      days: [21, 40] as [number, number],
      available: true,
    },
    {
      label: "Chặng 2",
      name: "Đọc 3 báo cáo tài chính",
      days: [41, 60] as [number, number],
      available: true,
    },
    {
      label: "Chặng 3",
      name: "Chỉ số tài chính cơ bản",
      days: [61, 80] as [number, number],
      available: true,
    },
    {
      label: "Chặng 4",
      name: "Tài chính doanh nghiệp",
      days: [81, 100] as [number, number],
      available: true,
    },
    {
      label: "Chặng 5",
      name: "Giá trị thời gian & chi phí vốn",
      days: [101, 120] as [number, number],
      available: true,
    },
    {
      label: "Chặng 6",
      name: "Cổ phiếu & định giá doanh nghiệp",
      days: [121, 140] as [number, number],
      available: true,
    },
    {
      label: "Chặng 7",
      name: "Trái phiếu, lãi suất & tín dụng",
      days: [141, 160] as [number, number],
      available: true,
    },
    {
      label: "Chặng 8",
      name: "Danh mục đầu tư & quản trị rủi ro",
      days: [161, 180] as [number, number],
      available: true,
    },
    {
      label: "Chặng 9",
      name: "Phái sinh & công cụ nâng cao",
      days: [181, 200] as [number, number],
      available: true,
    },
  ],
};

/* ─── Component ─────────────────────────────────────────────────── */

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();
  const progress = useProgress();
  const completed = progress.completedLessons;
  const [activeTrack, setActiveTrack] = useState<"personal" | "professional">("personal");
  const [user, setUser] = useState<{ id?: string; email?: string; user_metadata?: { full_name?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const [userXp, setUserXp] = useState(0);
  const [avgQuizScore, setAvgQuizScore] = useState(0);
  const [leaderboardEntries, setLeaderboardEntries] = useState<any[]>([]);

  // Check auth and calculate XP on mount
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setUser(session.user);

      // Calculate XP from completed lessons (10 XP per lesson)
      const calculatedXp = completed.length * XP_VALUES.LESSON_COMPLETED;
      setUserXp(calculatedXp);

      // Mock average quiz score
      setAvgQuizScore(75);

      // Generate leaderboard data with real user
      const mockUsers = [
        {
          id: "user1",
          rank: 0,
          name: "Nguyễn Văn A",
          xp: 450,
          lessonsCompleted: 45,
          avgQuizScore: 88,
          level: getLevelByXp(450),
        },
        {
          id: "user2",
          rank: 0,
          name: "Trần Thị B",
          xp: 380,
          lessonsCompleted: 38,
          avgQuizScore: 82,
          level: getLevelByXp(380),
        },
        {
          id: "user3",
          rank: 0,
          name: "Phạm Văn C",
          xp: 320,
          lessonsCompleted: 32,
          avgQuizScore: 75,
          level: getLevelByXp(320),
        },
        {
          id: session.user.id,
          rank: 0,
          name: session.user.user_metadata?.full_name || session.user.email || "Bạn",
          xp: calculatedXp,
          lessonsCompleted: completed.length,
          avgQuizScore: 75,
          level: getLevelByXp(calculatedXp),
        },
      ];

      // Sort by XP and assign ranks
      const sorted = mockUsers.sort((a, b) => b.xp - a.xp);
      const ranked = sorted.map((user, idx) => ({
        ...user,
        rank: idx + 1,
      }));

      setLeaderboardEntries(ranked);
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase.auth, completed.length]);


  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-stone-500">Đang tải...</p>
      </div>
    );
  }

  const sorted = [...lessons].sort((a, b) => a.id - b.id);
  const track = activeTrack === "personal" ? TRACK_PERSONAL : TRACK_PROFESSIONAL;

  const totalDone = completed.length;
  const totalLessons = sorted.length;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Sticky header ── */}
      <div className="border-b border-stone-200 sticky top-0 bg-white z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-stone-900">Tự Học Tài Chính</h1>
            <p className="text-xs text-stone-400 mt-0.5">Chọn lộ trình phù hợp với bạn</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-xl font-bold text-stone-900">{totalDone}</div>
              <div className="text-xs text-stone-400">/ {totalLessons} bài đã học</div>
            </div>
            <UserMenu
              name={user?.user_metadata?.full_name}
              email={user?.email}
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* ── User Stats Section ── */}
        <div className="max-w-6xl mx-auto mb-8">
          <UserStats
            xp={userXp}
            lessonsCompleted={totalDone}
            totalLessons={totalLessons}
            avgQuizScore={avgQuizScore}
          />
        </div>

        {/* ── Main Content: Lessons + Leaderboard ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Lessons (2 columns on desktop) */}
          <div className="lg:col-span-2">
          {/* Track selector - Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {[TRACK_PERSONAL, TRACK_PROFESSIONAL].map((t) => {
            const isActive = activeTrack === t.id;
            return (
              <div key={t.id} className="relative group">
                <button
                  onClick={() => setActiveTrack(t.id as "personal" | "professional")}
                  className={`w-full text-left rounded-xl border-2 px-5 py-4 transition-all ${
                    isActive
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                  }`}
                >
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isActive ? "text-stone-400" : "text-stone-400"}`}>
                    {t.subtitle}
                  </div>
                  <div className={`text-base font-bold ${isActive ? "text-white" : "text-stone-900"}`}>
                    {t.title}
                  </div>
                </button>

                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-50">
                  <div className="bg-stone-900 text-white rounded-xl px-4 py-3 whitespace-nowrap shadow-lg border border-stone-800">
                    <p className="text-sm font-bold mb-2">{t.description}</p>
                    <div className="space-y-1 text-xs text-stone-300">
                      {t.pillars.map((pillar) => (
                        <div key={pillar} className="flex gap-2">
                          <span>•</span>
                          <span>{pillar}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-900" />
                </div>
              </div>
            );
          })}
        </div>

          {/* ── Stages + lessons ── */}
          <div className="space-y-6 mt-8">
          {track.stages.map((stage) => {
            const stageLessons = sorted.filter(
              (l) => l.id >= stage.days[0] && l.id <= stage.days[1]
            );
            const stageDone = stageLessons.filter((l) => completed.includes(l.id)).length;

            return (
              <div key={stage.label}>
                {/* Stage header */}
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-xs font-extrabold text-stone-900 uppercase tracking-widest bg-stone-100 px-3 py-1 rounded-lg">
                    {stage.label}
                  </span>
                  <h2 className="text-lg font-extrabold text-stone-900">{stage.name}</h2>
                  {stage.available && stageLessons.length > 0 && (
                    <span className="ml-auto text-base font-bold text-stone-900 bg-stone-100 px-4 py-1 rounded-lg">
                      {stageDone}/{stageLessons.length}
                    </span>
                  )}
                </div>

                {/* Not available yet - with lock and loading animation */}
                {!stage.available && (
                  <div className="border-2 border-dashed border-stone-200 rounded-xl px-5 py-6 text-center bg-stone-50 relative overflow-hidden">
                    {/* Animated building background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-30 animate-pulse" />

                    {/* Lock icon */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-stone-200 flex items-center justify-center animate-bounce">
                        <svg className="w-6 h-6 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1C6.48 1 2 5.48 2 11v10c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V11c0-5.52-4.48-10-10-10zm0 2c4.41 0 8 3.59 8 8v2H4v-2c0-4.41 3.59-8 8-8zm-3 13h6v2H9z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-stone-600 text-sm font-extrabold">Chặng này bị khoá</p>
                        <p className="text-stone-400 text-xs mt-1">Hoàn thành chặng trước để mở</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Available but no lessons in DB yet - with building animation */}
                {stage.available && stageLessons.length === 0 && (
                  <div className="border-2 border-dashed border-stone-200 rounded-xl px-5 py-6 text-center bg-emerald-50 relative overflow-hidden">
                    {/* Animated construction bars */}
                    <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0s' }} />
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '28px', animationDelay: '0.2s' }} />
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '24px', animationDelay: '0.4s' }} />
                      <div className="w-1 bg-stone-400 rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0.6s' }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="text-3xl animate-bounce">🏗️</div>
                      <p className="text-stone-600 text-sm font-extrabold">Đang xây dựng</p>
                      <p className="text-stone-500 text-xs">Bài học sắp được hoàn thiện</p>
                    </div>
                  </div>
                )}

                {/* Lesson list */}
                {stage.available && stageLessons.length > 0 && (
                  <div className="space-y-2">
                    {stageLessons.map((lesson) => {
                      const isDone = completed.includes(lesson.id);
                      return (
                        <div key={lesson.id} className="relative">
                          <Link
                            href={`/bai-hoc/${lesson.slug}`}
                            className={`block rounded-xl border-2 transition-all ${
                              isDone
                                ? "bg-emerald-50 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100"
                                : "bg-white border-stone-200 hover:border-stone-400 hover:bg-stone-50"
                            }`}
                          >
                          <div className="flex items-center gap-4 px-6 py-5">
                            {/* Day number */}
                            <div className="w-12 flex-shrink-0 text-center">
                              <span className={`font-mono text-sm font-extrabold ${isDone ? "text-emerald-600" : "text-stone-400"}`}>
                                {String(lesson.id).padStart(3, "0")}
                              </span>
                            </div>

                            {/* Status circle */}
                            <div className="flex-shrink-0">
                              {isDone ? (
                                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full border-3 border-stone-300" />
                              )}
                            </div>

                            {/* Title + subtitle */}
                            <div className="flex-1 min-w-0">
                              <div className={`text-base font-bold leading-snug ${isDone ? "text-emerald-900" : "text-stone-900"}`}>
                                {lesson.title}
                              </div>
                              <div className={`text-sm mt-1 truncate ${isDone ? "text-emerald-700" : "text-stone-600"}`}>
                                {lesson.subtitle}
                              </div>
                            </div>

                            {/* Meta */}
                            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                              <span className={`text-sm font-semibold ${isDone ? "text-emerald-700" : "text-stone-600"}`}>
                                {lesson.duration}
                              </span>
                              <span className={`text-sm font-bold rounded-lg px-3 py-1 ${
                                isDone
                                  ? "bg-emerald-200 text-emerald-900"
                                  : "bg-stone-100 text-stone-700"
                              }`}>
                                {isDone ? "Xong" : lesson.difficulty}
                              </span>
                            </div>

                            <div className={`flex-shrink-0 text-lg font-bold ${isDone ? "text-emerald-600" : "text-stone-400"}`}>
                              ›
                            </div>
                          </div>
                        </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          </div>
          </div>

          {/* Right: Leaderboard (1 column on desktop, full width on mobile) */}
          <div className="lg:col-span-1">
            <Leaderboard
              entries={leaderboardEntries}
              currentUserRank={leaderboardEntries.find((e) => e.id === user?.id)?.rank}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
