"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Phán một tình huống đạo đức, widget cho các bài khai `interactiveType:
// "ethics-case"`.
//
// Ethics là môn nặng nhất kỳ CFA, và cái khó của nó không phải là thuộc bảy
// nhóm Standards - đọc một lượt là nhớ. Cái khó là đứng trước một tình huống
// bình thường tới mức không thấy gì sai, rồi phải nói được nó chạm vào điều
// khoản nào. Nên widget này không hỏi "Standard III là gì"; nó đưa ra một mẩu
// chuyện đúng kiểu người ta gặp ở công ty và bắt phán.
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
  /** Điều khoản bị chạm, hoặc điều khoản người ta HAY tưởng bị chạm nếu không vi phạm. */
  standard: string;
  distractors: string[];
  reasoning: string;
}

function getCases(t: Dictionary): EthicsCase[] {
  const tr = t.interactiveRest.ethicsCase;
  return [
    {
      id: "mnpi",
      scenario: tr.mnpiScenario,
      violates: true,
      standard: tr.mnpiStandard,
      distractors: [tr.mnpiDistractor1, tr.mnpiDistractor2, tr.mnpiDistractor3],
      reasoning: tr.mnpiReasoning,
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
      id: "fair",
      scenario: tr.fairScenario,
      violates: true,
      standard: tr.fairStandard,
      distractors: [tr.fairDistractor1, tr.fairDistractor2, tr.fairDistractor3],
      reasoning: tr.fairReasoning,
    },
    {
      id: "record",
      scenario: tr.recordScenario,
      violates: true,
      standard: tr.recordStandard,
      distractors: [tr.recordDistractor1, tr.recordDistractor2, tr.recordDistractor3],
      reasoning: tr.recordReasoning,
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
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
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
              className={`h-2 w-6 cursor-pointer rounded-full ${
                i === index ? "bg-stone-900 dark:bg-stone-100" : "bg-stone-200 dark:bg-stone-700"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-stone-300">{c.scenario}</p>

      {/* Bước 1: có vi phạm không. */}
      <p className="mt-4 text-xs font-bold text-stone-500 dark:text-stone-400">
        {tr.violatesQuestion}
      </p>
      <div className="mt-2 flex gap-2">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            disabled={verdict !== null}
            onClick={() => setVerdict(v)}
            className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-bold disabled:cursor-default ${
              verdict === null
                ? "border-stone-300 text-stone-700 hover:border-stone-500 dark:border-stone-700 dark:text-stone-200"
                : v === c.violates
                  ? "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
                  : verdict === v
                    ? "border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200"
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
          <p className="mt-4 text-xs font-bold text-stone-500 dark:text-stone-400">
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
                  className={`block w-full rounded-xl border px-3 py-2 text-left text-xs font-medium disabled:cursor-default ${
                    !done
                      ? "cursor-pointer border-stone-200 text-stone-700 hover:border-stone-400 dark:border-stone-700 dark:text-stone-200"
                      : isAnswer
                        ? "border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
                        : picked === option
                          ? "border-rose-400 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200"
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
        <div className="mt-4 rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60">
          <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-300">{c.reasoning}</p>
          {index < CASES.length - 1 && (
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="mt-3 cursor-pointer rounded-full bg-stone-900 px-4 py-2 text-[11px] font-bold text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900"
            >
              {tr.nextCaseButton}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
