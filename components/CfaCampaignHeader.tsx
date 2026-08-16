"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { buildCfaCampaign, type CfaSubjectState } from "@/lib/cfa-progression";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

interface CfaCampaignHeaderProps {
  completedLessonIds: number[];
}

/** Phần đầu trang CFA: người học đang ở đâu, làm gì tiếp, và được gì nếu làm.
 *
 *  Ba con số ở đây KHÔNG trùng nhau và đó là chủ ý:
 *  - "bài Level I" là phép đếm, trả lời "đã đi được bao xa".
 *  - "sẵn sàng thi" cân theo trọng số chính thức, trả lời "thi thì sao".
 *  - "XP" là phần thưởng đã vào tài khoản thật.
 *  Gộp chúng thành một thanh tiến độ duy nhất là điều dễ làm và sai: một người
 *  học trọn FSA (80 bài) rồi bỏ trắng bốn môn nhỏ sẽ thấy một con số đẹp trong
 *  khi khả năng qua kỳ thi thì không.
 */
export default function CfaCampaignHeader({ completedLessonIds }: CfaCampaignHeaderProps) {
  const { t } = useI18n();
  const campaign = useMemo(
    () => buildCfaCampaign(new Set(completedLessonIds)),
    [completedLessonIds]
  );

  const stateLabel: Record<CfaSubjectState, string> = {
    upcoming: t.finalTwo.cfaCampaign.stateUpcoming,
    open: t.finalTwo.cfaCampaign.stateOpen,
    inProgress: t.finalTwo.cfaCampaign.stateInProgress,
    proficient: t.finalTwo.cfaCampaign.stateProficient,
    mastered: t.finalTwo.cfaCampaign.stateMastered,
  };

  const current = campaign.subjects.find((s) => s.subject.id === campaign.currentSubjectId) ?? null;
  const milestone = campaign.nextMilestone;
  const milestoneSubjectName = milestone
    ? campaign.subjects.find((s) => s.subject.id === milestone.subjectId)?.subject.name ?? ""
    : "";
  const unlocksName = milestone?.unlocksSubjectId
    ? campaign.subjects.find((s) => s.subject.id === milestone.unlocksSubjectId)?.subject.name ?? ""
    : "";

  return (
    <section className="mb-8">
      {/* KHÔNG lặp lại hero.
          `components/cfa/CfaCurrentStage.tsx` (thêm ở bd91dac, một phiên khác)
          đã đứng ngay trên khối này và đã nói: môn hiện tại, bài kế tiếp, nút
          "học tiếp", +10 XP. Hai khối trả lời cùng một câu hỏi, xếp chồng nhau,
          là đúng thứ trang này vừa được dọn để thoát ra.
          Nên phần dưới đây chỉ giữ những gì hero KHÔNG nói: mốc kèm thứ nó mở
          ra, ba con số không trùng nhau, đường mười môn, và các công cụ. */}
      <div className="border-l-2 border-stone-900 pl-4 dark:border-stone-100">
        {current ? (
          <>
            {milestone && (
              // Mốc nói ĐỦ BA VẾ: còn bao nhiêu, được gì, mở ra gì. Thiếu vế
              // cuối thì nó chỉ là một thanh tiến độ viết bằng chữ.
              <p className="mt-2 text-[13px] text-stone-700 dark:text-stone-300">
                {milestone.unlocksSubjectId
                  ? format(t.finalTwo.cfaCampaign.milestone, {
                      lessons: milestone.lessonsLeft,
                      subject: milestoneSubjectName,
                      xp: milestone.xpReward,
                      unlocks: unlocksName,
                    })
                  : format(t.finalTwo.cfaCampaign.milestoneLast, {
                      lessons: milestone.lessonsLeft,
                      subject: milestoneSubjectName,
                      xp: milestone.xpReward,
                    })}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              {/* Nút "Học tiếp" đã ở hero phía trên, không dựng lại.
                  Checkpoint của ĐÚNG môn này. `?subject=` là tham số mới ở
                  app/api/knowledge-challenge - trước đây route chỉ lọc tới mức
                  track, nên "kiểm tra Ethics" sẽ là đề trộn mười môn.
                  Hành động PHỤ, nên là liên kết chữ: kiểm tra là để soi lại thứ
                  vừa học, không phải việc thay cho học. */}
              {current.done > 0 && (
                <Link
                  href={`/kiem-tra?track=cfa&subject=${current.subject.id}`}
                  className="text-sm font-medium text-stone-600 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-900 dark:text-stone-400 dark:decoration-stone-600 dark:hover:text-stone-200"
                  title={t.finalTwo.cfaCampaign.checkpointHint}
                >
                  {format(t.finalTwo.cfaCampaign.checkpointCta, { subject: current.subject.name })}
                </Link>
              )}
            </div>
          </>
        ) : (
          <p className="mt-1 text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            {t.finalTwo.cfaCampaign.allDone}
          </p>
        )}
      </div>

      {/* BA con số, ba câu trả lời khác nhau - xem chú thích đầu tệp. Hàng chữ,
          không phải ba tấm thẻ thống kê. */}
      <dl className="mt-5 flex flex-wrap items-end gap-x-8 gap-y-3 border-y border-stone-200 py-4 dark:border-stone-800">
        <div>
          <dt className="eyebrow text-stone-400 dark:text-stone-500">
            {t.finalTwo.cfaCampaign.readinessLabel}
          </dt>
          <dd className="mt-0.5 text-2xl font-semibold tabular-nums tracking-tight text-stone-900 dark:text-stone-100">
            {campaign.examReadiness}%
          </dd>
        </div>
        <div className="border-l border-stone-200 pl-8 dark:border-stone-800">
          <dt className="eyebrow text-stone-400 dark:text-stone-500">
            {t.finalTwo.cfaCampaign.pathLabel}
          </dt>
          <dd className="mt-0.5 text-sm tabular-nums text-stone-700 dark:text-stone-300">
            {format(t.finalTwo.cfaCampaign.levelProgress, {
              done: campaign.doneLessons,
              total: campaign.totalLessons,
            })}
          </dd>
        </div>
        <div className="border-l border-stone-200 pl-8 dark:border-stone-800">
          <dt className="eyebrow text-stone-400 dark:text-stone-500">XP</dt>
          <dd className="mt-0.5 text-sm tabular-nums text-stone-700 dark:text-stone-300">
            {format(t.finalTwo.cfaCampaign.xpEarned, { xp: campaign.xpFromCfa })}
          </dd>
        </div>
        <p className="ml-auto max-w-xs text-[11px] leading-snug text-stone-400 dark:text-stone-500">
          {t.finalTwo.cfaCampaign.readinessHint}
        </p>
      </dl>

      {/* Đường mười môn. Nét dọc bên trái chạy suốt danh sách là thứ làm nó đọc
          như một lộ trình chứ như mười dòng rời - cùng cách lib/career-zones
          dựng bản đồ nghề. Môn chưa tới lượt mờ đi chứ KHÔNG bị khoá: người ôn
          tuần cuối cần vào thẳng môn yếu nhất. */}
      <ol className="mt-6 border-l border-stone-200 dark:border-stone-800">
        {campaign.subjects.map((s) => {
          const isCurrent = s.subject.id === campaign.currentSubjectId;
          const isDone = s.state === "mastered" || s.state === "proficient";
          const dim = s.state === "upcoming";
          return (
            <li key={s.subject.id} className="relative pl-5">
              {/* Dấu mốc trên đường: đặc khi đã qua, viền khi đang đứng, rỗng
                  khi chưa tới. Ba hình dạng, không ba màu. */}
              <span
                className={`absolute -left-[5px] top-4 h-2.5 w-2.5 rounded-full border-2 ${
                  isDone
                    ? "border-emerald-600 bg-emerald-600 dark:border-emerald-500 dark:bg-emerald-500"
                    : isCurrent
                      ? "border-stone-900 bg-white dark:border-stone-100 dark:bg-stone-950"
                      : "border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-950"
                }`}
                aria-hidden="true"
              />
              <div
                className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-stone-200/70 py-3 dark:border-stone-800/70 ${
                  dim ? "opacity-55" : ""
                }`}
              >
                <span
                  className={`text-sm ${
                    isCurrent
                      ? "font-semibold text-stone-900 dark:text-stone-100"
                      : "font-medium text-stone-700 dark:text-stone-300"
                  }`}
                >
                  {s.subject.name}
                </span>
                {isDone && (
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" aria-hidden="true" />
                )}
                <span className="text-xs text-stone-400 dark:text-stone-500">
                  {format(t.finalTwo.cfaCampaign.weightLabel, { weight: s.subject.weight })}
                </span>
                <span className="ml-auto text-xs tabular-nums text-stone-500 dark:text-stone-400">
                  {s.done}/{s.total}
                </span>
                <span className="w-24 shrink-0 text-right text-xs text-stone-500 dark:text-stone-400">
                  {stateLabel[s.state]}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Ba công cụ ôn tập, KHÔNG khoá.
          Brief ban đầu muốn "Locked until X mastery". Ba route này đang mở cho
          tất cả, nên thêm khoá là LẤY ĐI thứ đang có - một người thi tuần sau
          cần vào thẳng bảng công thức, không phải học đủ mastery mới được tra.
          Nên trạng thái mạnh nhất ở đây là "nên dùng bây giờ", và nó được suy
          ra từ tiến độ thật chứ không phải gán cứng:
          - Thẻ ghi nhớ: khi đang học dở một môn, tức đang có thuật ngữ mới.
          - Thi thử: khi đã qua nửa mức sẵn sàng - làm đề lúc mới 10% thì con số
            trả về không dạy được gì ngoài việc làm nản.
          - Bảng công thức: luôn dùng được, nó là tài liệu tra cứu. */}
      <div className="mt-8">
        <p className="eyebrow text-stone-400 dark:text-stone-500">
          {t.finalTwo.cfaCampaign.toolsLabel}
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(
            [
              {
                href: "/cfa/flashcards",
                label: t.finalTwo.cfaCampaign.flashcards,
                hint: t.finalTwo.cfaCampaign.flashcardsHint,
                recommended: current?.state === "inProgress",
              },
              {
                href: "/cfa/formulas",
                label: t.finalTwo.cfaCampaign.cheatSheet,
                hint: t.finalTwo.cfaCampaign.cheatSheetHint,
                recommended: false,
              },
              {
                href: "/cfa/thi-thu",
                label: t.finalTwo.cfaCampaign.mockExam,
                hint: t.finalTwo.cfaCampaign.mockExamHint,
                recommended: campaign.examReadiness >= 50,
              },
            ] as const
          ).map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group rounded-lg border p-3 transition-colors ${
                tool.recommended
                  ? "border-emerald-600/40 dark:border-emerald-500/40"
                  : "border-stone-200 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  {tool.label}
                </span>
                <span
                  className={`shrink-0 text-[10px] ${
                    tool.recommended
                      ? "font-semibold text-emerald-700 dark:text-emerald-400"
                      : "text-stone-400 dark:text-stone-500"
                  }`}
                >
                  {tool.recommended
                    ? t.finalTwo.cfaCampaign.toolRecommended
                    : t.finalTwo.cfaCampaign.toolAvailable}
                </span>
              </div>
              <p className="mt-1 text-xs leading-snug text-stone-500 dark:text-stone-400">
                {tool.hint}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
