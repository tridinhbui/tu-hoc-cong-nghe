"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, ExternalLink, Briefcase } from "lucide-react";
import { JOB_SEARCH_SITES, SUGGESTED_JOB_KEYWORDS } from "@/lib/job-search-links";

// "Việc làm Tài chính": deep-links into LinkedIn/TopCV/VietnamWorks's own
// search results for a keyword, opened in a new tab - see
// lib/job-search-links.ts for why this isn't a scraper (LinkedIn's ToS
// forbids it and actively enforces that; TopCV/VietnamWorks don't publish a
// public API, so scraping either would be an unsupported, ToS-violating
// integration that breaks on every markup change).
export default function JobSearchClient() {
  const [keyword, setKeyword] = useState(SUGGESTED_JOB_KEYWORDS[0]);

  function openSite(buildUrl: (k: string) => string) {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    window.open(buildUrl(trimmed), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg px-3 py-2 -ml-3 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Việc làm Tài chính
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Tìm việc trực tiếp trên LinkedIn, TopCV, VietnamWorks với từ khóa đã điền sẵn - mở kết quả tìm kiếm thật ở tab mới, không phải danh sách giả lập.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-6">
          <label className="text-xs font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest block mb-2">
            Từ khóa vị trí tuyển dụng
          </label>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Ví dụ: Phân tích tài chính, Kế toán, FP&A..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {SUGGESTED_JOB_KEYWORDS.map((kw) => (
              <button
                key={kw}
                onClick={() => setKeyword(kw)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                  keyword === kw
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                    : "border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-600"
                }`}
              >
                {kw}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {JOB_SEARCH_SITES.map((site) => (
              <button
                key={site.id}
                onClick={() => openSite(site.buildUrl)}
                disabled={!keyword.trim()}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {site.label}
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-4">
            Mỗi nút mở tab mới sang trang tìm kiếm thật của từng nền tảng - kết quả, hạn nộp và thông tin liên hệ đều do chính LinkedIn/TopCV/VietnamWorks cung cấp và cập nhật.
          </p>
        </div>
      </div>
    </div>
  );
}
