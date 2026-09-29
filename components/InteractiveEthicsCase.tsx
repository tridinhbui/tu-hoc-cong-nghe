"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { btnPrimary } from "@/components/ui/system";

// Phán một tình huống đạo đức, widget cho các bài khai `interactiveType:
// "ethics-case"`.
//
// Khung đối chiếu là Bộ quy tắc đạo đức kỹ sư phần mềm của ACM/IEEE-CS (tám
// nguyên tắc). Cái khó không phải là thuộc tám nguyên tắc - đọc một lượt là
// nhớ. Cái khó là đứng trước một tình huống bình thường tới mức không thấy gì
// sai, rồi phải nói được nó chạm vào nguyên tắc nào. Nên widget này không hỏi
// "Nguyên tắc 3 là gì"; nó đưa ra một mẩu chuyện đúng kiểu người ta gặp ở công
// ty và bắt phán.
//
// Hai bước, cố ý tách rời: có vi phạm không, rồi vi phạm điều nào. Tách ra vì
// đó là hai lỗi khác nhau - người thấy sai mà chỉ sai điều khoản khác hẳn
// người không thấy có gì sai. Gộp làm một câu bốn phương án thì không phân
// biệt được, và bước một mới là bước hay hỏng.
//
// Một trong bốn tình huống KHÔNG vi phạm. Nếu mọi tình huống đều vi phạm thì
// bấm "có" là ăn điểm, và bài học sai đi thành "cứ nghi ngờ là đúng" - trong
// khi thực tế phần lớn việc hàng ngày là hợp lệ.

interface EthicsCase {
  id: string;
  scenario: string;
  violates: boolean;
  /** Nguyên tắc bị chạm, hoặc nguyên tắc người ta HAY tưởng bị chạm nếu không vi phạm. */
  standard: string;
  distractors: string[];
  reasoning: string;
}

function getCases(t: Dictionary): EthicsCase[] {
  const tr = t.interactiveRest.ethicsCase;
  return [
    {
      id: "data",
      scenario: tr.dataScenario,
      violates: true,
      standard: tr.dataStandard,
      distractors: [tr.dataDistractor1, tr.dataDistractor2, tr.dataDistractor3],
      reasoning: tr.dataReasoning,
    },
    {
      id: "gift",
      scenario: tr.giftScenario,
      violates: false,
      standard: tr.giftStandard,
      distractors: [tr.giftDistractor1, tr.giftDistractor2, tr.giftDistractor3],
      reasoning: tr.giftReasoning,
    },
    {
      id: "safety",
      scenario: tr.safetyScenario,
      violates: true,
      standard: tr.safetyStandard,
      distractors: [tr.safetyDistractor1, tr.safetyDistractor2, tr.safetyDistractor3],
      reasoning: tr.safetyReasoning,
    },
    {
      id: "credit",
      scenario: tr.creditScenario,
      violates: true,
      standard: tr.creditStandard,
      distractors: [tr.creditDistractor1, tr.creditDistractor2, tr.creditDistractor3],
      reasoning: tr.creditReasoning,
    },
  ];
}

/** Trộn phương án theo id để vị trí đáp án đúng không cố định, nhưng ổn định
 *  giữa các lần render - không nhảy chỗ ngay dưới ngón tay người đang chọn. */
function shuffled(c: EthicsCase): string[] {
  const options = [c.standard, ...c.distractors];
  let hash = 2166136261;
  for (let i = 0; i < c.id.length; i++) {
    hash ^= c.id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  for (let i = options.length - 1; i > 0; i--) {
    hash = Math.imul(hash ^ (hash >>> 15), 2246822507);
    const j = (hash >>> 0) % (i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

export default function InteractiveEthicsCase() {
  const { t } = useI18n();
  const tr = t.interactiveRest.ethicsCase;
  const CASES = useMemo(() => getCases(t), [t]);
  const [index, setIndex] = useState(0);
  const [verdict, setVerdict] = useState<boolean | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const c = CASES[index];
  const options = shuffled(c);
  const done = picked !== null;

  function goTo(next: number) {
    setIndex(next);
    setVerdict(null);
    setPicked(null);
  }

  return (
    <div className="rounded-md border border-line-strong bg-white p-6 dark:border-stone-700 dark:bg-stone-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-black tracking-tight text-ink-max">
          {format(tr.caseCounter, { current: index + 1, total: CASES.length })}
        </h3>
        <div className="flex gap-1">
          {CASES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={format(tr.caseAriaLabel, { n: i + 1 })}
              aria-current={i === index}
              className={`h-1.5 w-6 cursor-pointer rounded-xs ${
                i === index ? "bg-brand-600 dark:bg-brand-500" : "bg-surface-sunken"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-body">{c.scenario}</p>

      {/* Bước 1: có vi phạm không. */}
      <p className="mt-4 text-xs font-bold text-ink-muted">
        {tr.violatesQuestion}
      </p>
      <div className="mt-2 flex gap-2">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            disabled={verdict !== null}
            onClick={() => setVerdict(v)}
            className={`cursor-pointer rounded-sm border px-4 py-2 text-xs font-bold disabled:cursor-default ${
              verdict === null
                ? "border-stone-300 text-stone-700 hover:border-stone-500 dark:border-stone-700 dark:text-stone-200"
                : v === c.violates
                  ? "border-brand-600 bg-brand-50 text-brand-800 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200"
                  : verdict === v
                    ? "border-red-500 bg-red-50 text-red-800 dark:border-red-700 dark:bg-red-950/40 dark:text-red-200"
                    : "border-stone-200 text-stone-400 dark:border-stone-800 dark:text-stone-600"
            }`}
          >
            {v ? tr.violatesYes : tr.violatesNo}
          </button>
        ))}
      </div>

      {/* Bước 2 chỉ mở sau bước 1: chọn điều khoản trước khi kết luận có sai hay
          không là làm ngược thứ tự suy nghĩ mà đề thi kiểm tra. */}
      {verdict !== null && (
        <>
          <p className="mt-4 text-xs font-bold text-ink-muted">
            {c.violates ? tr.standardQuestionViolated : tr.standardQuestionClean}
          </p>
          <div className="mt-2 space-y-1.5">
            {options.map((option) => {
              const isAnswer = option === c.standard;
              return (
                <button
                  key={option}
                  type="button"
                  disabled={done}
                  onClick={() => setPicked(option)}
                  className={`block w-full rounded-sm border px-3 py-2 text-left text-xs font-medium disabled:cursor-default ${
                    !done
                      ? "cursor-pointer border-stone-200 text-stone-700 hover:border-stone-400 dark:border-stone-700 dark:text-stone-200"
                      : isAnswer
                        ? "border-brand-600 bg-brand-50 text-brand-900 dark:border-brand-400 dark:bg-brand-950/40 dark:text-brand-200"
                        : picked === option
                          ? "border-red-500 bg-red-50 text-red-900 dark:border-red-700 dark:bg-red-950/40 dark:text-red-200"
                          : "border-stone-200 text-stone-400 dark:border-stone-800 dark:text-stone-600"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </>
      )}

      {done && (
        <div className="mt-4 border-l-2 border-stone-950 pl-4 dark:border-stone-200">
          <p className="text-xs leading-relaxed text-ink-soft">{c.reasoning}</p>
          {index < CASES.length - 1 && (
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className={`mt-3 cursor-pointer ${btnPrimary}`}
            >
              {tr.nextCaseButton}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
