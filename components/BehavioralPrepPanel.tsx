"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Lightbulb, ChevronRight, ChevronLeft, Quote, Eye } from "lucide-react";
import { TECH_BEHAVIORAL_CARDS } from "@/lib/interview-bank";
import InterviewerStage from "@/components/InterviewerStage";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { btnPrimary, btnSecondary, panel, SectionHead, tabClass } from "@/components/ui/system";

/* i18n-ignore-start: định danh hệ thống, cùng một chuỗi ở mọi ngôn ngữ */
const SYS_BEHAVIORAL = "THCN://INTERVIEW/BEHAVIORAL";
/* i18n-ignore-end */

// Behavioral/fit prep, deliberately un-scored. "Walk me through your resume"
// and "Why banking?" have no single right answer, so the old multiple-choice
// treatment had to invent three wrong ways to describe your own career - it
// graded guessing, not preparation. Here the learner reads the question,
// thinks (or says the answer out loud), then reveals the coaching framework
// and self-assesses. No XP, no score: nothing here is objectively markable,
// and paying XP for clicking "reveal" would just be a participation trophy.

/** `career` lọc thẻ theo NGHỀ đang chọn ở màn hình chuẩn bị. `null` là "tất
 *  cả các nghề" và trả về trọn kho, đúng hành vi cũ. */
interface BehavioralPrepQuestion {
  id: number;
  category: string;
  question: string;
  /** Cách tiếp cận câu trả lời - không phải đáp án. */
  framework: string;
}

export default function BehavioralPrepPanel({ career }: { career?: string | null }) {
  const { t } = useI18n();
  const [category, setCategory] = useState<string>("all");
  const [activeIdx, setActiveIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  /* Thẻ hành vi đọc thẳng từ lib/interview-bank/behavioral.ts ở client.
   *
   *  Bản tài chính lấy chúng qua /api/ib-behavioral để lọc theo nhóm nghề và
   *  dịch ở máy chủ. Bản công nghệ có 12 thẻ, dùng chung cho mọi nghề và mới có
   *  tiếng Việt - một vòng gọi mạng ở đây chỉ thêm trạng thái tải và lỗi cho
   *  dữ liệu đã nằm sẵn trong bundle. `career` vẫn nhận để giữ chữ ký. */
  const questions = useMemo<BehavioralPrepQuestion[]>(
    () =>
      TECH_BEHAVIORAL_CARDS.map((c) => ({
        id: c.id,
        category: c.category,
        question: c.question,
        framework: [
          c.whatTheyWant,
          "",
          ...c.framework.map((step, i) => `${i + 1}. ${step}`),
          "",
          `⚠ ${c.pitfall}`,
        ].join("\n"),
      })),
    []
  );
  // Dữ liệu nằm sẵn trong bundle nên không còn trạng thái tải hay lỗi mạng.
  const loading = false;
  const failed = false;
  const load = () => {};


  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const q of questions) counts.set(q.category, (counts.get(q.category) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [questions]);

  /* Bộ lọc giữ NHÃN ĐÃ DỊCH, nên đổi ngôn ngữ là nhãn đang chọn biến mất khỏi
   *  danh sách mới. Kiểm ở lúc VẼ thay vì đặt lại bằng một effect: effect sẽ
   *  vẽ một nhịp rỗng trước khi kịp sửa, còn ở đây khối tự lành ngay trong
   *  cùng một lần vẽ. */
  const activeCategory = useMemo(
    () => (category === "all" || categories.some(([c]) => c === category) ? category : "all"),
    [category, categories]
  );

  const filtered = useMemo(
    () =>
      activeCategory === "all" ? questions : questions.filter((q) => q.category === activeCategory),
    [questions, activeCategory]
  );

  // Đổi bộ lọc phải về câu đầu - chỉ số 7 của danh sách cũ là một câu khác
  // (hoặc vượt ngoài) ở danh sách mới. Làm ngay trong tay bấm thay vì một
  // effect theo dõi `activeCategory`, để không vẽ thêm một nhịp thừa.
  const pickCategory = (next: string) => {
    setCategory(next);
    setActiveIdx(0);
    setRevealed(false);
  };

  // Kẹp lúc vẽ: danh sách vừa đổi độ dài thì `activeIdx` cũ có thể trỏ ra
  // ngoài, và khi đó `q` là undefined - khối trắng thay vì một câu hỏi.
  const safeIdx = Math.min(activeIdx, Math.max(0, filtered.length - 1));
  const q = filtered[safeIdx];

  function go(delta: number) {
    // Đi từ chỉ số ĐÃ KẸP chứ không từ giá trị trong state: nếu state đang
    // trỏ ra ngoài danh sách mới thì bước đầu tiên chỉ kéo nó về đúng chỗ, và
    // trông như bấm hụt một nhịp.
    setActiveIdx(Math.max(0, Math.min(filtered.length - 1, safeIdx + delta)));
    setRevealed(false);
  }

  // Mũi tên trái/phải: người luyện phỏng vấn đi qua hàng trăm câu liên tiếp,
  // và bắt họ rê chuột xuống cuối thẻ cho mỗi câu là một thao tác thừa nhân
  // lên 119 lần. Bỏ qua khi con trỏ đang ở ô nhập liệu để không cướp phím.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (loading) {
    return (
      <div className="py-16 flex flex-col items-center gap-3 text-ink-muted">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p className="text-xs font-bold">{t.behavioralPrep.loading}</p>
      </div>
    );
  }

  if (failed || questions.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center gap-3">
        <p className="text-sm font-bold text-ink-muted">
          {t.behavioralPrep.loadError}
        </p>
        <button onClick={() => void load()} className={`${btnPrimary} cursor-pointer`}>
          {t.behavioralPrep.retry}
        </button>
      </div>
    );
  }

  const progressPct = filtered.length > 1 ? ((safeIdx + 1) / filtered.length) * 100 : 100;

  return (
    <div className="space-y-5">
      {/* Đầu khu dựng theo ĐÚNG khuôn của tab Technical: mã định vị + eyebrow
          trên một đường kẻ 1px, rồi tiêu đề đậm. Hai tab của một trang mà mỗi
          bên mở một kiểu thì đọc ra như hai sản phẩm khác nhau.

          Ghi chú "không chấm điểm" nằm LUÔN trong đầu khu thay vì đứng riêng
          một dòng phía trên: nó chính là câu mô tả vòng thi này, đúng vai trò
          mà đoạn mô tả giữ ở bên Technical. */}
      <SectionHead
        code={SYS_BEHAVIORAL}
        eyebrow={t.behavioralPrep.heroBadge}
        title={t.behavioralPrep.heroTitle}
        sub={
          <>
            {t.behavioralPrep.notePart1}
            <strong className="font-bold text-ink">{t.behavioralPrep.noteBold}</strong>
            {t.behavioralPrep.notePart2}
          </>
        }
      />

      {/* Bộ lọc: MỘT hàng cuộn ngang, tab chữ gạch dưới */}
      <div className="flex gap-5 overflow-x-auto scrollbar-none border-b border-line-strong">
        <button
          onClick={() => pickCategory("all")}
          aria-pressed={category === "all"}
          className={`${tabClass(category === "all")} shrink-0 whitespace-nowrap text-xs cursor-pointer`}
        >
          {format(t.behavioralPrep.allCategories, { count: questions.length })}
        </button>
        {categories.map(([label, count]) => (
          <button
            key={label}
            onClick={() => pickCategory(label)}
            aria-pressed={category === label}
            className={`${tabClass(category === label)} shrink-0 whitespace-nowrap text-xs cursor-pointer`}
          >
            {label}
            <span className="ml-1.5 font-mono font-medium tabular-nums text-ink-faint">{count}</span>
          </button>
        ))}
      </div>

      {q && (
        <div className={`${panel} relative overflow-hidden`}>
          {/* Thanh tiến độ dính mép trên thẻ: đi qua 119 câu mà chỉ có dòng
              chữ "1 / 119" xám nhạt thì không có cảm giác đang tiến tới đâu. */}
          <div className="h-1 w-full bg-surface-raised">
            <div
              className="h-full bg-brand-600 dark:bg-brand-500 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* CÙNG CĂN PHÒNG 3D với vòng technical, không dựng cảnh thứ hai.
              Màn này bán đúng một thứ: có người đối diện đang hỏi bạn. Trước
              đây technical có phòng còn behavioral chỉ có một dấu ngoặc kép
              mờ, nên hai nửa của cùng một buổi phỏng vấn trông như hai tính
              năng khác nhau.

              `round="de"` không phải chọn bừa cho có: nhãn của nó là "Vòng
              sàng lọc", và câu hỏi fit/behavioral đúng là vòng sàng lọc trong
              một quy trình thật - người ngồi đó không phải Analyst hỏi kỹ
              thuật.

              `showCaption={false}` vì khối câu hỏi cỡ `text-2xl` ngay bên dưới
              đã là bản đọc được và chọn được; bật phụ đề nữa thì câu hỏi hiện
              ba lần trong một màn (bong bóng, phụ đề, khối chữ).

              `questionKey` là chỉ số câu chứ không phải nội dung: hai câu
              trùng chữ vẫn là hai lượt hỏi khác nhau, và cảnh dựng lại theo
              khoá này để người phỏng vấn gật đầu đúng lúc câu mới hiện ra. */}
          <div className="px-3 pt-3 sm:px-4 sm:pt-4">
            <InterviewerStage
              round="de"
              question={q.question}
              questionKey={safeIdx}
              showCaption={false}
              bleed={false}
              maxHeightVh={38}
            />
          </div>

          <div className="p-5 sm:p-7 space-y-5">
            <div className="flex items-center justify-between gap-3 border-b border-line-strong pb-2">
              <span className="eyebrow text-ink-soft">
                {q.category}
              </span>
              <span className="font-mono text-xs tabular-nums text-ink-faint shrink-0">
                {safeIdx + 1} / {filtered.length}
              </span>
            </div>

            {/* Câu hỏi là nhân vật chính của trang này, nên nó được cỡ chữ của
                nhân vật chính. Dấu ngoặc kép mờ phía sau nói "đây là lời người
                phỏng vấn nói ra", đúng tình huống đang mô phỏng. */}
            <div className="relative">
              <Quote className="pointer-events-none absolute -left-1 -top-2 w-10 h-10 text-line-soft" aria-hidden />
              <p className="relative font-bold text-xl sm:text-2xl leading-snug tracking-tight text-ink select-text">
                {q.question}
              </p>
            </div>

            {revealed ? (
              <div className="rounded-sm border border-line-strong border-l-2 border-l-stone-950 dark:border-l-stone-200 bg-[#f3f1ec] dark:bg-stone-950 p-4 sm:p-5">
                <p className="eyebrow mb-2 text-ink-soft flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  {t.behavioralPrep.frameworkHeading}
                </p>
                <p className="text-sm leading-relaxed text-ink-body whitespace-pre-line select-text">
                  {q.framework}
                </p>
              </div>
            ) : (
              /* Không còn là dải đen full-width viết hoa. Nút ấy nặng hơn cả
                 câu hỏi, mà việc nó làm chỉ là mở gợi ý - bước SAU khi người
                 học đã tự trả lời. Giờ nó là nút phụ, đúng thứ tự đó. */
              <button onClick={() => setRevealed(true)} className={`${btnSecondary} cursor-pointer`}>
                <Eye className="w-3.5 h-3.5" />
                {t.behavioralPrep.revealFramework}
              </button>
            )}

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-line-strong">
              <button
                onClick={() => go(-1)}
                disabled={safeIdx === 0}
                className={`${btnSecondary} cursor-pointer`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                {t.behavioralPrep.previous}
              </button>
              {/* "Câu tiếp theo" là việc người ta làm nhiều nhất ở màn này, nên
                  nó là nút đặc - trước đây hai nút xám như nhau, không nút nào
                  chỉ ra bước kế tiếp. */}
              <button
                onClick={() => go(1)}
                disabled={safeIdx >= filtered.length - 1}
                className={`${btnPrimary} cursor-pointer`}
              >
                {t.behavioralPrep.next}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
