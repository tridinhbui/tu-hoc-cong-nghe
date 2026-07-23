import Link from "next/link";
import { ArrowLeft, MessageSquareMore, Users, Sparkles, Flame, ShieldCheck } from "lucide-react";
import StudyGroupsClient from "@/components/StudyGroupsClient";
import CommunityFeedClient from "@/components/CommunityFeedClient";

export const dynamic = "force-dynamic";

export default function StudyGroupsPage() {
  return (
    <div className="min-h-screen bg-stone-50/60 dark:bg-stone-950 pb-16">
      {/* Top Header Banner with Half-Submerged 3D Roundtable Background */}
      <div className="relative border-b border-emerald-500/30 bg-gradient-to-r from-stone-950 via-emerald-950/90 to-stone-950 text-white overflow-hidden shadow-xl">
        {/* 3D Perspective Grid Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20" />
        
        {/* Half-Submerged 3D Roundtable & Ambient Orb (Upper half submerged) */}
        <div className="pointer-events-none absolute -top-24 right-10 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-36 left-1/3 -translate-x-1/2 w-80 h-80 rounded-full border-4 border-amber-500/30 bg-gradient-to-b from-stone-900/80 via-amber-950/40 to-transparent blur-xs opacity-50 transform rotate-12" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-6 relative z-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-300 hover:text-white bg-white/10 hover:bg-white/20 border border-emerald-500/30 rounded-xl px-3 py-1.5 -ml-3 transition-all backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Về Dashboard
          </Link>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-300 shadow-md backdrop-blur-md">
                <Users className="h-3.5 w-3.5 text-emerald-400" />
                <span>Phòng Học Nhóm & MXH 3D Phố Wall</span>
              </div>
              <h1 className="mt-2.5 text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                Học Nhóm & Mạng Xã Hội Phố Wall
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                Ghép nhóm chat 5 người quanh bàn học 3D, cùng đua mục tiêu XP tuần & thảo luận bài viết trên MXH chung.
              </p>
            </div>

            {/* Quick Stats Banner Pills */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-950/80 px-3.5 py-2 text-xs font-black text-amber-300 shadow-md backdrop-blur-md">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>+15% XP Bonus Học Nhóm</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-sky-500/40 bg-sky-950/80 px-3.5 py-2 text-xs font-black text-sky-300 shadow-md backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
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
