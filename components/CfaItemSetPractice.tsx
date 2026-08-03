"use client";

import { useMemo, useState } from "react";
import { CFA_ITEM_SETS, type CfaItemSet, type ItemSetQuestion } from "@/lib/cfa-item-sets";

/**
 * Luyện item set - dạng đề của CFA Level II.
 *
 * Bố cục cố ý giữ tình huống LUÔN hiển thị bên cạnh câu hỏi, không cuộn mất đi.
 * Đó là điểm khác biệt của cả dạng đề: thí sinh Level II đọc đi đọc lại một
 * đoạn dữ liệu để tìm số cần dùng cho từng câu, chứ không đọc một lần rồi trả
 * lời từ trí nhớ. Một giao diện bắt cuộn lên cuộn xuống sẽ luyện sai chỗ đó.
 *
 * Không tính điểm, không lưu, không XP. Bốn câu trong một item set không nói
 * được gì về mức sẵn sàng thi, và gắn một con số vào đó sẽ tạo ra đúng loại
 * niềm tin sai mà /su-nghiep đã phải sửa một lần.
 */

/** Trộn thứ tự phương án theo một hạt cố định.
 *
 *  Mọi đáp án đúng trong dữ liệu đều nằm ở vị trí 0 - viết như vậy dễ soát hơn
 *  nhiều. Trộn ở đây để vị trí không rò rỉ gì; hạt lấy từ id câu hỏi nên thứ tự
 *  ổn định giữa các lần render, không nhảy loạn mỗi khi bấm. */
function shuffledOrder(question: ItemSetQuestion): number[] {
  let hash = 2166136261;
  for (let i = 0; i < question.id.length; i++) {
    hash ^= question.id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const order = question.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    hash = Math.imul(hash ^ (hash >>> 15), 2246822507);
    const j = (hash >>> 0) % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function QuestionBlock({ q, index }: { q: ItemSetQuestion; index: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const order = useMemo(() => shuffledOrder(q), [q]);
  const answered = picked !== null;

  return (
    <li className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
      <p className="text-[13px] font-bold leading-snug text-stone-900 dark:text-stone-100">
        <span className="text-stone-400 dark:text-stone-500">{index + 1}. </span>
        {q.question}
      </p>
      <div className="mt-2.5 space-y-1.5" role="group" aria-label={`Các lựa chọn cho câu ${index + 1}`}>
        {order.map((optionIndex) => {
          const isCorrect = optionIndex === q.correct;
          const isPicked = picked === optionIndex;
          return (
            <button
              key={optionIndex}
              type="button"
              disabled={answered}
              onClick={() => setPicked(optionIndex)}
              className={`block w-full rounded-xl border px-3 py-2 text-left text-[12px] leading-snug transition-colors ${
                !answered
                  ? "cursor-pointer border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400 dark:border-stone-700 dark:bg-stone-800/60 dark:text-stone-200"
                  : isCorrect
                    ? "border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : isPicked
                      ? "border-rose-400 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200"
                      : "border-stone-200 bg-white text-stone-400 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-500"
              }`}
            >
              {q.options[optionIndex]}
            </button>
          );
        })}
      </div>
      {answered && (
        <p className="mt-2.5 rounded-xl bg-stone-50 px-3 py-2 text-[12px] leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
          {q.explanation}
        </p>
      )}
    </li>
  );
}

function ItemSetView({ set }: { set: CfaItemSet }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
      {/* Tình huống dính lại khi cuộn ở màn rộng: đọc câu 4 mà vẫn thấy bảng số
          là đúng cách dạng đề này được làm trên giấy. */}
      <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900/60 lg:sticky lg:top-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
          Tình huống · {set.topic}
        </p>
        <h4 className="mt-1 text-[13px] font-extrabold text-stone-900 dark:text-stone-100">{set.title}</h4>
        <div className="mt-2 space-y-2">
          {set.vignette.split("\n").map((para) => (
            <p key={para.slice(0, 24)} className="text-[12px] leading-relaxed text-stone-700 dark:text-stone-300">
              {para}
            </p>
          ))}
        </div>
      </div>

      <ol className="space-y-3">
        {set.questions.map((q, i) => (
          <QuestionBlock key={q.id} q={q} index={i} />
        ))}
      </ol>
    </div>
  );
}

export default function CfaItemSetPractice() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = CFA_ITEM_SETS.find((s) => s.id === openId) ?? null;

  return (
    <section className="mt-6 rounded-[24px] border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
        Luyện item set - dạng đề Level II
      </h3>
      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-stone-500 dark:text-stone-400">
        Mỗi bộ là một tình huống dài kèm bốn câu hỏi cùng dựa vào nó. Tình huống cố ý chứa nhiều dữ
        kiện hơn số cần dùng - chọn đúng số là một nửa bài thi. Không tính điểm và không lưu lại:
        bốn câu không nói được gì về mức sẵn sàng thi.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {CFA_ITEM_SETS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setOpenId(openId === s.id ? null : s.id)}
            aria-expanded={openId === s.id}
            className={`cursor-pointer rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
              openId === s.id
                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
            }`}
          >
            {s.topic}
          </button>
        ))}
      </div>

      {open ? (
        <div className="mt-4">
          <ItemSetView set={open} />
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border border-dashed border-stone-300 px-4 py-3 text-xs text-stone-500 dark:border-stone-700 dark:text-stone-400">
          Chọn một môn ở trên để mở tình huống.
        </p>
      )}
    </section>
  );
}
