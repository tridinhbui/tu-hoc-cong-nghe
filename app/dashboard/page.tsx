"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "@/lib/client-hooks";
import { lessons } from "@/lib/lessons";

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
  const progress = useProgress();
  const completed = progress.completedLessons;
  const [activeTrack, setActiveTrack] = useState<"personal" | "professional">("personal");
  const sorted = [...lessons].sort((a, b) => a.id - b.id);
  const track = activeTrack === "personal" ? TRACK_PERSONAL : TRACK_PROFESSIONAL;

  const totalDone = completed.length;
  const totalLessons = sorted.length;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Sticky header ── */}
      <div className="border-b border-stone-200 sticky top-0 bg-white z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900">Tự Học Tài Chính</h1>
            <p className="text-xs text-stone-400 mt-0.5">Chọn lộ trình phù hợp với bạn</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-stone-900">{totalDone}</div>
            <div className="text-xs text-stone-400">/ {totalLessons} bài đã học</div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

        {/* ── Track selector cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[TRACK_PERSONAL, TRACK_PROFESSIONAL].map((t) => {
            const isActive = activeTrack === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTrack(t.id as "personal" | "professional")}
                className={`text-left rounded-2xl border-2 px-6 py-5 transition-all duration-200 ${
                  isActive
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                }`}
              >
                <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${isActive ? "text-stone-400" : "text-stone-400"}`}>
                  {t.subtitle}
                </div>
                <div className={`text-lg font-bold mb-2 ${isActive ? "text-white" : "text-stone-900"}`}>
                  {t.title}
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${isActive ? "text-stone-300" : "text-stone-500"}`}>
                  {t.description}
                </p>
                <div className="space-y-1">
                  {t.pillars.map((p) => (
                    <div key={p} className={`flex items-center gap-2 text-sm ${isActive ? "text-stone-300" : "text-stone-500"}`}>
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isActive ? "bg-stone-400" : "bg-stone-300"}`} />
                      {p}
                    </div>
                  ))}
                </div>
                <div className={`mt-4 text-xs font-semibold ${isActive ? "text-stone-300" : "text-stone-400"}`}>
                  {t.stages.length} chặng · {t.stages.filter(s => s.available).length} đang mở
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Divider with active track label ── */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-stone-100" />
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest whitespace-nowrap">
            {track.title}
          </span>
          <div className="flex-1 h-px bg-stone-100" />
        </div>

        {/* ── Stages + lessons ── */}
        <div className="space-y-8">
          {track.stages.map((stage) => {
            const stageLessons = sorted.filter(
              (l) => l.id >= stage.days[0] && l.id <= stage.days[1]
            );
            const stageDone = stageLessons.filter((l) => completed.includes(l.id)).length;

            return (
              <div key={stage.label}>
                {/* Stage header */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                    {stage.label}
                  </span>
                  <h2 className="text-base font-bold text-stone-900">{stage.name}</h2>
                  {stage.available && stageLessons.length > 0 && (
                    <span className="ml-auto text-sm text-stone-400">
                      {stageDone}/{stageLessons.length}
                    </span>
                  )}
                </div>

                {/* Not available yet */}
                {!stage.available && (
                  <div className="border border-dashed border-stone-200 rounded-xl px-5 py-6 text-center">
                    <p className="text-stone-400 text-sm">Chặng này đang được xây dựng</p>
                    <p className="text-stone-300 text-xs mt-1">Sắp ra mắt</p>
                  </div>
                )}

                {/* Available but no lessons in DB yet */}
                {stage.available && stageLessons.length === 0 && (
                  <div className="border border-dashed border-stone-200 rounded-xl px-5 py-6 text-center">
                    <p className="text-stone-400 text-sm">Bài học đang được biên soạn</p>
                    <p className="text-stone-300 text-xs mt-1">Sắp có</p>
                  </div>
                )}

                {/* Lesson list */}
                {stage.available && stageLessons.length > 0 && (
                  <div className="border border-stone-200 rounded-xl overflow-hidden">
                    {stageLessons.map((lesson) => {
                      const isDone = completed.includes(lesson.id);
                      return (
                        <Link
                          key={lesson.id}
                          href={`/bai-hoc/${lesson.slug}`}
                          className="block border-b border-stone-100 last:border-0"
                        >
                          <div className={`flex items-center gap-4 px-5 py-4 hover:bg-stone-50 transition-colors ${isDone ? "opacity-50" : ""}`}>
                            {/* Day number */}
                            <div className="w-10 flex-shrink-0 text-center">
                              <span className="font-mono text-xs font-bold text-stone-300">
                                {String(lesson.id).padStart(3, "0")}
                              </span>
                            </div>

                            {/* Status circle */}
                            <div className="flex-shrink-0">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-stone-400" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-stone-200" />
                              )}
                            </div>

                            {/* Title + subtitle */}
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-semibold leading-snug ${isDone ? "text-stone-400" : "text-stone-900"}`}>
                                {lesson.title}
                              </div>
                              <div className="text-xs text-stone-400 mt-0.5 truncate">
                                {lesson.subtitle}
                              </div>
                            </div>

                            {/* Meta */}
                            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                              <span className="text-xs text-stone-300">{lesson.duration}</span>
                              <span className="text-xs font-medium text-stone-400 border border-stone-100 rounded px-2 py-0.5">
                                {isDone ? "Xong" : lesson.difficulty}
                              </span>
                            </div>

                            <div className="flex-shrink-0 text-stone-200 text-base">›</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
