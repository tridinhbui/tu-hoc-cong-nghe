"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Soát một bản trả lời của AI, widget cho các bài khai `interactiveType:
// "ai-verify"`.
//
// Cái bẫy của AI trong tài chính không phải là nó trả lời sai trông ra sai.
// Bản trả lời sai trông y hệt bản trả lời đúng: cùng giọng chắc nịch, cùng số
// lẻ tới hai chữ số thập phân, cùng cấu trúc gọn gàng. Nên dạy "hãy kiểm tra
// lại" là dạy một câu khẩu hiệu; thứ dạy được là KIỂM CÁI GÌ.
//
// Widget đưa ra một đoạn ghi nhớ do AI viết, bốn câu, và bắt phân loại từng
// câu vào ba nhóm - vì ba nhóm ấy dẫn tới ba hành động khác nhau:
//
//   - suy ra được từ dữ liệu đã đưa    → đọc lại phép tính là xong
//   - phải đối chiếu nguồn ngoài       → chưa sai, nhưng chưa được dùng
//   - không thể có thật                → dấu hiệu bịa, phải bỏ cả đoạn
//
// Gộp hai nhóm sau lại thành "cần kiểm tra" là mất đúng phần khó: phần lớn câu
// trong một bản trả lời rơi vào nhóm giữa, và người mới hoặc tin hết hoặc nghi
// hết, chứ hiếm khi tách được ra.

type Verdict = "derived" | "source" | "fabricated";

function getLabels(t: Dictionary): Record<Verdict, string> {
  const tr = t.interactiveRest.aiVerify;
  return {
    derived: tr.labelDerived,
    source: tr.labelSource,
    fabricated: tr.labelFabricated,
  };
}

interface Claim {
  text: string;
  answer: Verdict;
  why: string;
}

function getClaims(t: Dictionary): Claim[] {
  const tr = t.interactiveRest.aiVerify;
  return [
    { text: tr.claim1Text, answer: "derived", why: tr.claim1Why },
    { text: tr.claim2Text, answer: "source", why: tr.claim2Why },
    { text: tr.claim3Text, answer: "source", why: tr.claim3Why },
    { text: tr.claim4Text, answer: "fabricated", why: tr.claim4Why },
  ];
}

export default function InteractiveAiVerify() {
  const { t } = useI18n();
  const tr = t.interactiveRest.aiVerify;
  const LABELS = useMemo(() => getLabels(t), [t]);
  const CLAIMS = useMemo(() => getClaims(t), [t]);
  const [picked, setPicked] = useState<Record<number, Verdict | undefined>>({});
  const answered = CLAIMS.filter((_, i) => picked[i]).length;
  const correct = CLAIMS.filter((c, i) => picked[i] === c.answer).length;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        {tr.title}
      </h3>
      <p className="mt-2 whitespace-pre-line rounded-2xl bg-stone-50 p-3 text-[11px] leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {tr.brief}
      </p>

      <ol className="mt-4 space-y-3">
        {CLAIMS.map((claim, i) => {
          const choice = picked[i];
          const done = choice !== undefined;
          return (
            <li key={claim.text} className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
              <p className="text-xs font-semibold leading-snug text-stone-800 dark:text-stone-100">
                {i + 1}. {claim.text}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(Object.keys(LABELS) as Verdict[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    disabled={done}
                    onClick={() => setPicked((prev) => ({ ...prev, [i]: v }))}
                    className={`cursor-pointer rounded-xl border px-2.5 py-1.5 text-[11px] font-bold disabled:cursor-default ${
                      !done
                        ? "border-stone-200 text-stone-600 hover:border-stone-400 dark:border-stone-700 dark:text-stone-300"
                        : v === claim.answer
                          ? "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
                          : choice === v
                            ? "border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200"
                            : "border-stone-200 text-stone-400 dark:border-stone-800 dark:text-stone-600"
                    }`}
                  >
                    {LABELS[v]}
                  </button>
                ))}
              </div>
              {done && (
                <p className="mt-2 text-[11px] leading-relaxed text-stone-600 dark:text-stone-300">{claim.why}</p>
              )}
            </li>
          );
        })}
      </ol>

      {answered === CLAIMS.length && (
        <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
          {format(tr.resultSummary, { correct, total: CLAIMS.length })}
        </p>
      )}
    </div>
  );
}
