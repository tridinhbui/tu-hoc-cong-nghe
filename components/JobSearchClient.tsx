"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Briefcase, X } from "lucide-react";
import { FINANCE_CAREERS, type FinanceCareer } from "@/lib/finance-careers";
import { JOB_SEARCH_SITES } from "@/lib/job-search-links";

// Pseudo-3D avatar: a layered gradient sphere (radial highlight + soft
// outer glow + drop shadow) with a large emoji centered, plus a subtle
// tilt-on-hover via CSS perspective/rotate - no 3D asset pipeline
// (Three.js/glTF models) exists in this project, so this is a CSS-only
// approximation of a "3D character" rather than a rendered 3D model.
function CareerAvatar({ career, size = 96 }: { career: FinanceCareer; size?: number }) {
  return (
    <div
      className="relative shrink-0 transition-transform duration-300 [transform-style:preserve-3d] hover:[transform:rotateY(8deg)_rotateX(-4deg)]"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full shadow-[0_18px_30px_-12px_rgba(0,0,0,0.35)]"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${career.accentFrom}, ${career.accentTo} 75%)`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.55), transparent 45%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center" style={{ fontSize: size * 0.46 }}>
        {career.emoji}
      </div>
    </div>
  );
}

export default function JobSearchClient() {
  const [selected, setSelected] = useState<FinanceCareer | null>(null);

  function openSite(buildUrl: (k: string) => string, keyword: string) {
    window.open(buildUrl(keyword), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg px-3 py-2 -ml-3 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Việc làm Tài chính
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Bấm vào một nhóm ngành để xem chân dung công việc (JD), kỹ năng cần có, và tìm việc thật trên LinkedIn/TopCV/VietnamWorks.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {FINANCE_CAREERS.map((career) => (
            <button
              key={career.id}
              onClick={() => setSelected(career)}
              className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-900/60 transition-all text-center"
              style={{ perspective: "600px" }}
            >
              <CareerAvatar career={career} size={72} />
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-snug">
                {career.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-stone-900 rounded-3xl border-2 border-stone-200 dark:border-stone-800 w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-5" style={{ perspective: "600px" }}>
              <CareerAvatar career={selected} size={88} />
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold text-stone-900 dark:text-stone-100 leading-snug">
                  {selected.title}
                </h2>
                <p className="text-xs text-stone-400 dark:text-stone-500 font-semibold">{selected.englishTitle}</p>
              </div>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-5">{selected.summary}</p>

            <div className="mb-5">
              <h3 className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2.5">
                Mô tả công việc (JD)
              </h3>
              <ul className="space-y-2">
                {selected.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h3 className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2.5">
                Kỹ năng cần có
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selected.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
              <div className="rounded-xl bg-stone-50 dark:bg-stone-800/50 p-3">
                <p className="text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">
                  Cấp độ
                </p>
                <p className="text-stone-800 dark:text-stone-200 font-semibold">{selected.entryLevel}</p>
              </div>
              <div className="rounded-xl bg-stone-50 dark:bg-stone-800/50 p-3">
                <p className="text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">
                  Mức lương tham khảo
                </p>
                <p className="text-stone-800 dark:text-stone-200 font-semibold">{selected.salaryHint}</p>
              </div>
            </div>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 -mt-3 mb-5">
              * Mức lương chỉ mang tính tham khảo chung, thay đổi theo công ty, khu vực và kinh nghiệm thực tế.
            </p>

            <h3 className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-2.5">
              Tìm việc "{selected.title}" ngay
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {JOB_SEARCH_SITES.map((site) => (
                <button
                  key={site.id}
                  onClick={() => openSite(site.buildUrl, selected.searchKeyword)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  {site.label}
                  <ExternalLink className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
