"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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

// `categoryLabel()` từng ở đây, dùng để in tên nhóm dưới mỗi tên nghề trong
// danh sách bước 2. Đã bỏ cùng lượt dọn: ở bước đó người dùng VỪA chọn nhóm
// và tiêu đề trang đang là tên nhóm ấy, nên nhắc lại nó trên từng hàng là lặp.
// Chỗ nhãn đó giờ dành cho tên tiếng Anh của nghề, thứ thật sự thêm thông tin.

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
        {/* DANH BẠ, KHÔNG PHẢI LƯỚI THẺ.
            Bảy ô trước đây mỗi ô là: một thẻ bo 16px viền 2px, một ảnh 3D bo
            góc có viền và shadow riêng, một dòng mô tả, một thanh tiến độ. Bảy
            khối trang trí ngang nhau, và ảnh 3D là thứ nặng nhất trên màn hình
            trong khi nó không phân biệt được nhóm nào với nhóm nào - hai nhóm
            còn đang dùng CHUNG một tấm ảnh vì chưa có ảnh riêng (xem chú thích
            ở categoryMeta).
            Giờ mỗi ô nói bốn thứ theo đúng thứ tự người ta cần: tên nhóm, bao
            nhiêu nghề, ba nghề tiêu biểu, rồi tiến độ nếu có. Ảnh 3D bỏ hẳn;
            màu riêng của nhóm rút xuống một vạch 2px ở mép trái - đủ để phân
            biệt khi lướt, không đủ để tranh phần với chữ. */}
        <div className="grid grid-cols-1 border-t border-stone-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-stone-800">
          {CATEGORY_ORDER.map((cat) => {
            const meta = CATEGORY_META[cat];
            const inCat = allCareers.filter((c) => c.category === cat);
            const countLabel = format(t.careerPath.careerCount, { count: inCat.length });
            const progress = progressByCategory[cat];
            // Ba cái tên cụ thể nói rõ nhóm này là gì hơn bất kỳ câu mô tả nào:
            // "Đầu tư" là một chữ trừu tượng, "Chuyên viên Phân tích Đầu tư"
            // thì không.
            const sample = inCat.slice(0, 3).map((c) => c.title).join(" · ");
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="group relative flex flex-col border-b border-r border-stone-200 px-4 py-3.5 text-left transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900"
              >
                {/* Chỉ báo màu của nhóm: một vạch, không phải một hộp biểu tượng. */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[2px] opacity-70 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: meta.from }}
                />

                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[15px] font-bold tracking-tight text-stone-900 group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                    {meta.label}
                  </p>
                  <span className="shrink-0 text-xs tabular-nums text-stone-400 dark:text-stone-500">
                    {countLabel}
                  </span>
                </div>

                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                  {sample}
                </p>

                {/* Tiến độ rút còn MỘT dòng chữ và một vạch mảnh. Nhóm chưa có
                    bài nào thì không dựng gì - một thanh 0% chỉ nói rằng dữ
                    liệu còn thiếu. */}
                {progress.total > 0 && (
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800">
                      <div
                        className="h-px bg-emerald-600 dark:bg-emerald-400"
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-[11px] tabular-nums text-stone-400 dark:text-stone-500">
                      {format(t.careerPath.lessonCount, { done: progress.done, total: progress.total })}
                    </span>
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

        {/* Danh sách nghề, cùng ngôn ngữ với lưới nhóm ở bước trước: một cột
            chữ, đường kẻ ngăn, không hộp biểu tượng.
            Ô gradient 48px kèm ảnh 3D bỏ đi - nó là thứ đậm nhất trong mỗi
            hàng trong khi thứ người ta đang quét là TÊN NGHỀ, và ba mươi sáu ô
            gradient khác nhau trên một trang là bảng màu cầu vồng chứ không
            phải hệ thống phân loại. */}
        <div className="border-t border-stone-200 dark:border-stone-800">
          {careersInCategory.map((career) => (
            <button
              key={career.id}
              onClick={() => setSelectedId(career.id)}
              className="group flex w-full flex-col border-b border-stone-200 px-1 py-3.5 text-left transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900"
            >
              <div className="flex items-baseline gap-2.5">
                <p className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 dark:text-stone-100 dark:group-hover:text-emerald-400">
                  {career.title}
                </p>
                <span className="shrink-0 text-[11px] text-stone-400 dark:text-stone-500">
                  {career.englishTitle}
                </span>
                {/* Thay cho việc lọc bỏ hẳn nghề khỏi trang - xem
                    needsExperience(). Nhãn chứ không phải khoá: người học vẫn
                    mở được lộ trình bài học của nghề, họ chỉ biết thêm rằng đây
                    là chỗ để nhắm tới chứ không phải chỗ để nộp đơn ngay.
                    Viên thuốc nền hổ phách rút còn chữ - nó là một chú thích,
                    không phải một trạng thái cần báo động. */}
                {needsExperience(career) && (
                  <span className="shrink-0 text-[11px] font-semibold text-amber-700 dark:text-amber-500">
                    {t.careerPath.needsExperienceBadge}
                  </span>
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {career.summary}
              </p>
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

      {/* Tiêu đề nghề, dạng bài viết chứ không phải tấm thẻ.
          Trước đây: một khối gradient hai màu riêng của từng nghề, chữ trắng
          trên nền màu, một ô avatar 3D 56px, và một viên thuốc nền mờ cho tỉ
          số bài. Ba mươi sáu nghề là ba mươi sáu banner màu khác nhau, và trên
          nền màu thì không còn cấp bậc chữ nào đọc được - tên nghề, tên tiếng
          Anh và câu tóm tắt đều thành chữ trắng.
          Giờ dùng chữ và khoảng trắng: tên nghề là thứ to nhất, tên tiếng Anh
          là dòng phụ ngay dưới, tóm tắt là đoạn văn, tiến độ là một dòng số
          liệu trên đường kẻ. Màu riêng của nghề còn đúng một vạch mảnh. */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {selected.title}
          </h1>
          <span className="text-sm text-stone-400 dark:text-stone-500">{selected.englishTitle}</span>
        </div>

        <p className="mt-2 max-w-prose text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          {selected.summary}
        </p>

        {roadmap.length > 0 && (
          <div className="mt-4 border-t border-stone-200 pt-3 dark:border-stone-800">
            <div className="flex items-center gap-3">
              <span className="text-xs tabular-nums text-stone-500 dark:text-stone-400">
                {format(t.careerPath.lessonCount, { done: doneCount, total: roadmap.length })}
              </span>
              <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800">
                <div className="h-px bg-emerald-600 dark:bg-emerald-400" style={{ width: `${percent}%` }} />
              </div>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-stone-700 dark:text-stone-300">
                {percent}%
              </span>
            </div>
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
