import Link from "next/link";
import { ArrowLeft, MessageSquareMore, Users, Sparkles, Flame, ShieldCheck } from "lucide-react";
import StudyGroupsClient from "@/components/StudyGroupsClient";
import CommunityFeedClient from "@/components/CommunityFeedClient";

export const dynamic = "force-dynamic";

export default function StudyGroupsPage() {
  return (
    <div className="min-h-screen bg-stone-50/60 dark:bg-stone-950 pb-16">
      {/* Top Header Banner */}
      <div className="border-b border-stone-200/80 dark:border-stone-800 bg-white/95 dark:bg-stone-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl px-3 py-1.5 -ml-3 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Về Dashboard
          </Link>

          <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-700 shadow-2xs">
                <Users className="h-3.5 w-3.5 text-emerald-600" />
                <span>Cộng Đồng Học Tập</span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100">
                Học Nhóm & Mạng Xã Hội Phố Wall
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                Ghép nhóm chat theo chủ đề chuyên sâu, cùng hoàn thành mục tiêu XP tuần & thảo luận bài viết trên MXH chung.
              </p>
            </div>

            {/* Quick Stats Banner Pills */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50/90 px-3.5 py-2 text-xs font-black text-amber-800 shadow-2xs">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>+15% XP Bonus Học Nhóm</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-sky-200 bg-sky-50/90 px-3.5 py-2 text-xs font-black text-sky-800 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Auto-Match Thứ 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] items-start">
          {/* 👥 LEFT: Study Groups Rooms */}
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-md">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.16em] text-stone-800 dark:text-stone-200">
                    Phòng học nhóm chủ đề
                  </h2>
                  <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    Ghép nhóm 5 người, chat riêng & đua Top XP hàng tuần
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Live Match
              </span>
            </div>

            <StudyGroupsClient embedded />
          </section>

          {/* 💬 RIGHT: Global Social Network Feed */}
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md">
                  <MessageSquareMore className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.16em] text-stone-800 dark:text-stone-200">
                    Mạng xã hội chung
                  </h2>
                  <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    Bảng tin chia sẻ cảm nghĩ, streak, ghi chú & bài viết học tập
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                Public Feed
              </span>
            </div>

            <CommunityFeedClient embedded />
          </section>
        </div>
      </div>
    </div>
  );
}
