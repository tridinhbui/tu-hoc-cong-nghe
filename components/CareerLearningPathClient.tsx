"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Circle, CheckCircle2 } from "lucide-react";
import { FINANCE_CAREERS, type FinanceCareer } from "@/lib/finance-careers";
import JobSearchClient from "@/components/JobSearchClient";
import { buildCareerRoadmap, categoryProgress, type LessonIndex } from "@/lib/career-roadmap";
import { useI18n } from "@/lib/i18n/context";
import { mergeCareers } from "@/lib/finance-careers-i18n";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

interface LessonRef {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
}

interface CareerLearningPathClientProps {
  lessonsBySlug: Record<string, LessonRef>;
  lessonsById: Record<number, LessonRef>;
  completedLessonIds: number[];
  embedded?: boolean;
}

function categoryLabel(t: Dictionary, category: FinanceCareer["category"]): string {
  const map: Record<FinanceCareer["category"], string> = {
    investment: t.careerPath.categoryInvestment,
    dealmaking: t.careerPath.categoryDealmaking,
    accounting: t.careerPath.categoryAccounting,
    risk: t.careerPath.categoryRisk,
    banking: t.careerPath.categoryBanking,
    advisory: t.careerPath.categoryAdvisory,
    data: t.careerPath.categoryData,
  };
  return map[category];
}

// One extra filter layer before the (still 7-12 item) career grid, so
// landing on this page is "pick a broad direction" then "pick a career"
// instead of scanning 36 cards at once.
function categoryMeta(
  t: Dictionary
): Record<FinanceCareer["category"], { label: string; description: string; emoji: string; image: string; from: string; to: string }> {
  return {
    investment: { label: t.careerPath.catInvestmentLabel, description: t.careerPath.catInvestmentDesc, emoji: "📈", image: "/careers/cat_investment_3d.jpg", from: "#34d399", to: "#0d9488" },
    // Hai nhóm tách ra ở lượt chia lại 5 -> 7 chưa có ảnh riêng, mượn ảnh của
    // nhóm gốc mà chúng tách ra (dealmaking từ investment, risk từ banking).
    // Cùng cách xử lý đã dùng cho `data` bên dưới. Thay khi có ảnh.
    dealmaking: { label: t.careerPath.catDealmakingLabel, description: t.careerPath.catDealmakingDesc, emoji: "🤝", image: "/careers/cat_investment_3d.jpg", from: "#38bdf8", to: "#0284c7" },
    risk: { label: t.careerPath.catRiskLabel, description: t.careerPath.catRiskDesc, emoji: "🛡️", image: "/careers/cat_banking_3d.jpg", from: "#fb7185", to: "#be123c" },
    accounting: { label: t.careerPath.catAccountingLabel, description: t.careerPath.catAccountingDesc, emoji: "📒", image: "/careers/cat_accounting_3d.jpg", from: "#60a5fa", to: "#2563eb" },
    banking: { label: t.careerPath.catBankingLabel, description: t.careerPath.catBankingDesc, emoji: "🏦", image: "/careers/cat_banking_3d.jpg", from: "#f59e0b", to: "#d97706" },
    advisory: { label: t.careerPath.catAdvisoryLabel, description: t.careerPath.catAdvisoryDesc, emoji: "🤝", image: "/careers/cat_advisory_3d.jpg", from: "#f472b6", to: "#db2777" },
    // Chưa có ảnh riêng cho danh mục này - đang mượn tạm ảnh của nhóm đầu tư.
    // Thay bằng /careers/cat_data_3d.jpg khi có ảnh.
    data: { label: t.careerPath.catDataLabel, description: t.careerPath.catDataDesc, emoji: "🧮", image: "/careers/cat_investment_3d.jpg", from: "#38bdf8", to: "#0369a1" },
  };
}
const CATEGORY_ORDER: FinanceCareer["category"][] = ["investment", "dealmaking", "banking", "risk", "advisory", "accounting", "data"];

// Nghề mà `entryLevel` mở đầu bằng "Senior" là ĐÍCH ĐẾN sau vài năm kinh
// nghiệm, không phải hướng để người mới chọn học từ đầu.
//
// Trước đây chỗ này LỌC BỎ chúng khỏi trang, và lập luận trên là đúng nhưng
// kết luận thì quá tay: bốn nghề bị ẩn gồm "Ngân hàng Đầu tư" và "Chuyên viên
// Đầu tư (CFA Track)" - hai cái tên kéo người vào ngành mạnh nhất - nên trang
// nghề nghiệp không hề nhắc tới chúng ở bất kỳ đâu. Người đi tìm đúng hai nghề
// ấy kết luận là app không dạy, trong khi dữ liệu của cả hai vẫn nằm sẵn trong
// lib/finance-careers.ts kèm lộ trình bài học.
//
// Giờ chúng hiện đủ, kèm nhãn "Cần kinh nghiệm". Tín hiệu mà bộ lọc muốn gửi
// vẫn tới được người học, chỉ khác là dưới dạng một lời cảnh báo đọc được thay
// vì một sự vắng mặt không giải thích.
function needsExperience(career: FinanceCareer): boolean {
  return career.entryLevel.startsWith("Senior");
}
const allCareers = FINANCE_CAREERS;

export default function CareerLearningPathClient({
  lessonsBySlug,
  lessonsById,
  completedLessonIds,
  embedded = false,
}: CareerLearningPathClientProps) {
  const { t, locale } = useI18n();
  const CATEGORY_META = useMemo(() => categoryMeta(t), [t]);
  // Dữ liệu nghề nằm ngoài từ điển UI - xem lib/finance-careers-i18n. Hợp nhất
  // ở đây chứ không ở module vì bản dịch phụ thuộc locale, mà locale là state.
  const careers = useMemo(() => mergeCareers(allCareers, locale), [locale]);
  const [selectedCategory, setSelectedCategory] = useState<FinanceCareer["category"] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const completedSet = useMemo(() => new Set(completedLessonIds), [completedLessonIds]);

  const selected = selectedId ? careers.find((c) => c.id === selectedId) ?? null : null;
  const careersInCategory = selectedCategory ? careers.filter((c) => c.category === selectedCategory) : [];

  // Same lesson list a career already builds on /su-nghiep's study-plan tab
  // (relatedLessonSlugs + relatedCfaSubjectIds -> CFA_LEVEL_1_SUBJECTS'
  // lessonIds, which point at the same lib/lessons.ts entries, not a
  // separate CFA content table), deduplicated and resolved to real lessons.
  const lessonIndex: LessonIndex = useMemo(
    () => ({ bySlug: lessonsBySlug, byId: lessonsById }),
    [lessonsBySlug, lessonsById]
  );

  const roadmap = useMemo(
    () => (selected ? buildCareerRoadmap(selected, lessonIndex) : []),
    [selected, lessonIndex]
  );

  // Tiến độ của từng nhóm, cho màn hình đầu tiên. Dữ liệu để tính đã nằm sẵn
  // trong props từ trước; thiếu nó thì năm thẻ ở bước 1 giống hệt nhau và
  // không thẻ nào nói được vì sao nên chọn nó chứ không phải thẻ bên cạnh.
  const progressByCategory = useMemo(() => {
    const out = {} as Record<FinanceCareer["category"], ReturnType<typeof categoryProgress>>;
    for (const cat of CATEGORY_ORDER) {
      out[cat] = categoryProgress(
        allCareers.filter((c) => c.category === cat),
        lessonIndex,
        completedSet
      );
    }
    return out;
  }, [lessonIndex, completedSet]);

  const doneCount = roadmap.filter((l) => completedSet.has(l.id)).length;
  const percent = roadmap.length ? Math.round((doneCount / roadmap.length) * 100) : 0;

  // Step 1: pick a broad category first.
  if (!selectedCategory) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-8">
        {!embedded && (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.careerPath.backLabel}
          </Link>
        )}
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">{t.careerPath.pageTitle}</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
          {t.careerPath.pageSubtitle}
        </p>

        {/* Ba cột từ lg trở lên. Với bảy nhóm, lưới này xếp thành 3 + 3 + 1;
            lưới hai cột sẽ là 2×3 + 1 và cũng để một thẻ lẻ ở hàng cuối, nên ba
            cột vẫn hơn. Cột rộng (max-w-5xl thay cho max-w-2xl) kéo nội dung
            phủ hết bề ngang thay vì dồn vào một dải hẹp giữa màn hình. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORY_ORDER.map((cat) => {
            const meta = CATEGORY_META[cat];
            const count = allCareers.filter((c) => c.category === cat).length;
            const countLabel = format(t.careerPath.careerCount, { count });
            const progress = progressByCategory[cat];
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="group flex flex-col text-left rounded-2xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="relative w-13 h-13 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-stone-100 dark:border-stone-700 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={meta.image}
                      alt={meta.label}
                      width={52}
                      height={52}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-stone-900 dark:text-stone-100 text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{meta.label}</p>
                    <p className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">{countLabel}</p>
                  </div>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{meta.description}</p>

                {/* Phần khiến năm thẻ thôi giống hệt nhau. `mt-auto` giữ nó
                    dính đáy thẻ để các thanh thẳng hàng dù mô tả dài ngắn
                    khác nhau. Nhóm chưa có bài nào thì không dựng gì - một
                    thanh 0% không nói lên điều gì ngoài việc dữ liệu còn
                    thiếu. */}
                {progress.total > 0 && (
                  <div className="mt-auto pt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                        {format(t.careerPath.lessonCount, { done: progress.done, total: progress.total })}
                      </span>
                      <span className={`text-[11px] font-black tabular-nums ${progress.done > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-stone-400 dark:text-stone-600"}`}>
                        {progress.percent}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400 transition-[width] duration-500"
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </button>
            );
          })}

        </div>

        {/* Toàn bộ trang Sự nghiệp, nhúng ngay dưới các ô chọn nghề.
            Trước đây nó là một ô nét đứt thứ sáu trong lưới trỏ sang
            /su-nghiep - hai trang trả lời hai nửa của cùng một câu hỏi ("nghề
            này học gì" và "nghề này là gì"), và người dùng phải biết cả hai
            tồn tại thì mới ghép được. Giờ chọn nghề ở trên, đọc về nghề ở
            dưới, cùng một trang. */}
        <div className="-mx-6 mt-8 border-t border-stone-200 dark:border-stone-800">
          <JobSearchClient embedded />
        </div>
      </div>
    );
  }

  // Step 2: pick a career within the chosen category.
  if (!selected) {
    const meta = CATEGORY_META[selectedCategory];
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.careerPath.otherGroup}
        </button>
        <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-1">{meta.label}</h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
          {t.careerPath.pickCareerSubtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {careersInCategory.map((career) => (
            <button
              key={career.id}
              onClick={() => setSelectedId(career.id)}
              className="text-left rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 hover:border-stone-400 dark:hover:border-stone-600 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative flex items-center justify-center text-xl"
                  style={{ background: `linear-gradient(135deg, ${career.accentFrom}, ${career.accentTo})` }}
                >
                  {career.avatar3d ? (
                    <Image
                      src={career.avatar3d}
                      alt={career.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    career.emoji
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-stone-900 dark:text-stone-100 text-sm truncate">{career.title}</p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">{categoryLabel(t, career.category)}</p>
                    {/* Thay cho việc lọc bỏ hẳn nghề khỏi trang - xem
                        needsExperience(). Nhãn chứ không phải khoá: người học
                        vẫn mở được lộ trình bài học của nghề, họ chỉ biết thêm
                        rằng đây là chỗ để nhắm tới chứ không phải chỗ để nộp
                        đơn ngay. */}
                    {needsExperience(career) && (
                      <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                        {t.careerPath.needsExperienceBadge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">{career.summary}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <button
        onClick={() => setSelectedId(null)}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.careerPath.otherCareer}
      </button>

      {/* Career header - same visual role as a stage header on the
          personal/professional track lists, but themed with this career's
          own emoji/avatar/colors instead of the generic STAGE_THEMES. */}
      <div
        className="rounded-2xl p-5 mb-6 text-white"
        style={{ background: `linear-gradient(135deg, ${selected.accentFrom}, ${selected.accentTo})` }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/20 flex items-center justify-center text-3xl shrink-0 relative">
            {selected.avatar3d ? (
              <Image
                src={selected.avatar3d}
                alt={selected.title}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            ) : (
              selected.emoji
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-extrabold leading-tight">{selected.title}</p>
            <p className="text-xs text-white/80 font-semibold">{selected.englishTitle}</p>
          </div>
        </div>
        <p className="text-sm text-white/90 mt-3 leading-relaxed">{selected.summary}</p>
        {roadmap.length > 0 && (
          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 h-1.5 bg-white/25 rounded-full overflow-hidden">
              <div className="h-full bg-white" style={{ width: `${percent}%` }} />
            </div>
            <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg shrink-0">
              {format(t.careerPath.lessonCount, { done: doneCount, total: roadmap.length })}
            </span>
          </div>
        )}
      </div>

      {/* Flat lesson roadmap - same row style as a track's lesson list, just
          without the sub-stage grouping/milestone-exam locking, since a
          career roadmap isn't gated the way a track's stages are. */}
      {roadmap.length === 0 ? (
        <p className="text-sm text-stone-500 dark:text-stone-400 text-center py-8">
          {t.careerPath.noRoadmapLessons}
        </p>
      ) : (
        <div className="space-y-2 mb-6">
          {roadmap.map((lesson, i) => {
            const done = completedSet.has(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/bai-hoc/${lesson.slug}`}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                  done
                    ? "border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20"
                    : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-600"
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 text-[11px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1 min-w-0 text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">
                  {lesson.title}
                </span>
                <span className="text-[10px] text-stone-400 shrink-0">{lesson.duration}</span>
                {done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-stone-300 dark:text-stone-700 shrink-0" />
                )}
              </Link>
            );
          })}
        </div>
      )}

      {!embedded && (
        <Link
          href="/su-nghiep"
          className="block text-center text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 py-2"
        >
          {t.careerPath.fullProfileCta}
        </Link>
      )}
    </div>
  );
}
