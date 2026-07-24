import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageSquareMore, Users, Sparkles, Flame, ShieldCheck, ArrowRight, Newspaper } from "lucide-react";
import StudyGroupsClient from "@/components/StudyGroupsClient";

export const dynamic = "force-dynamic";

export default function StudyGroupsPage() {
  return (
    <div className="min-h-screen bg-stone-50/60 dark:bg-stone-950 pb-16">
      {/* Top Header Banner with NYSE Wall Street Trading Floor Background */}
      <div className="relative border-b border-emerald-500/40 bg-stone-950 text-white overflow-hidden shadow-2xl min-h-[220px]">
        {/* Wall Street NYSE Trading Floor Background Photo */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/study-group-cover.jpg"
            alt="Wall Street NYSE Trading Floor"
            fill
            className="object-cover object-center brightness-[0.92] contrast-[1.1] scale-105"
            priority
          />
          {/* Soft Gradient Overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/65 via-stone-950/35 to-stone-950/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/20 via-transparent to-stone-950/80" />
        </div>

        {/* 3D Perspective Grid Background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25 z-0" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-7 relative z-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-300 hover:text-white bg-stone-900/80 hover:bg-stone-900 border border-emerald-500/40 rounded-xl px-3 py-1.5 -ml-3 transition-all backdrop-blur-md shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Về Dashboard
          </Link>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-stone-900/90 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-300 shadow-lg backdrop-blur-md">
                <Users className="h-3.5 w-3.5 text-emerald-400" />
                <span>Sàn Giao Dịch Phố Wall & MXH 3D</span>
              </div>
              <h1 className="mt-2.5 text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Học Nhóm & Mạng Xã Hội Phố Wall
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl font-semibold drop-shadow-md">
                Trò chuyện nhóm • Nhắn 1 tin mỗi ngày để hoàn thành check-in &amp; nhận thưởng XP.
              </p>
            </div>

            {/* Quick Stats Banner Pills */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 rounded-2xl border border-amber-500/50 bg-stone-900/90 px-3.5 py-2 text-xs font-black text-amber-300 shadow-lg backdrop-blur-md">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>+15% XP Bonus Học Nhóm</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-sky-500/50 bg-stone-900/90 px-3.5 py-2 text-xs font-black text-sky-300 shadow-lg backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Auto-Match Thứ 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_340px] items-start">
          {/* 👥 LEFT: Study Groups Rooms */}
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-md">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.16em] text-stone-800 dark:text-stone-200">
                    Trò chuyện nhóm
                  </h2>
                  <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    Nhắn 1 tin mỗi ngày để hoàn thành check-in
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Live Match
              </span>
            </div>

            <StudyGroupsClient embedded />
          </section>

          {/* 💬 RIGHT: Community Feed Entry */}
          <aside className="min-w-0 xl:sticky xl:top-24 space-y-4">
            <Link
              href="/nhom-hoc/bang-tin"
              className="group block overflow-hidden rounded-3xl border border-sky-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-xl dark:border-sky-900 dark:bg-stone-900"
            >
              <div className="border-b border-sky-100 bg-sky-50/70 px-5 py-4 dark:border-sky-900/60 dark:bg-sky-950/30">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md">
                      <MessageSquareMore className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                        Bên dưới Học nhóm
                      </p>
                      <h2 className="text-base font-black text-stone-950 dark:text-stone-50">
                        Bảng tin cộng đồng
                      </h2>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-sky-500 transition group-hover:translate-x-1" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold leading-relaxed text-stone-600 dark:text-stone-300">
                  Feed riêng để chia sẻ mẹo học, câu hỏi, phân tích ngắn, ảnh thành tựu và cập nhật streak.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    ["💡", "Mẹo học"],
                    ["📈", "Phân tích"],
                    ["🎯", "Thành tựu"],
                    ["❓", "Hỏi đáp"],
                  ].map(([icon, label]) => (
                    <div key={label} className="rounded-2xl bg-stone-50 px-3 py-2 text-xs font-black text-stone-600 dark:bg-stone-950 dark:text-stone-300">
                      <span className="mr-1.5">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-4 py-2 text-sm font-black text-white shadow-sm transition group-hover:bg-sky-500">
                  <Newspaper className="h-4 w-4" />
                  Mở bảng tin
                </div>
              </div>
            </Link>

            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-stone-900 dark:text-stone-100">
                  Học nhóm trước, feed sau
                </h3>
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-stone-500 dark:text-stone-400">
                Trang này tập trung cho phòng học nhóm. Bảng tin cộng đồng đã được tách riêng để dễ đọc, lọc chủ đề và bình luận hơn.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
