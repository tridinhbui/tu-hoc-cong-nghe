"use client";

import { useState } from "react";

// Cặp lựa chọn của Prospect Theory, widget cho các bài khai `interactiveType:
// "prospect"`.
//
// Đây là widget duy nhất trong bộ không tính ra con số nào. Việc của nó là
// chứng minh một thiên kiến CHO CHÍNH NGƯỜI ĐANG MANG NÓ - thứ mà không đoạn
// văn nào làm được, vì đọc xong ai cũng tin mình thuộc nhóm ngoại lệ.
//
// Hai câu hỏi có giá trị kỳ vọng giống hệt nhau và chỉ khác cách đóng khung:
// một bên nói về phần được, một bên nói về phần mất. Phần lớn người chọn chắc
// chắn ở khung được và chọn cược ở khung mất - đúng hiệu ứng phản chiếu mà
// Kahneman và Tversky mô tả. Widget không nói trước điều đó; nó để người học
// chọn xong rồi mới đối chiếu.

const QUESTIONS = [
  {
    id: "gain",
    frame: "Bạn vừa được cho 100 triệu. Chọn một trong hai:",
    safe: "Nhận thêm chắc chắn 50 triệu",
    risky: "Tung đồng xu: 50% được thêm 100 triệu, 50% không được gì thêm",
    safeResult: 150,
    riskyResult: 150,
  },
  {
    id: "loss",
    frame: "Bạn vừa được cho 200 triệu. Chọn một trong hai:",
    safe: "Trả lại chắc chắn 50 triệu",
    risky: "Tung đồng xu: 50% phải trả lại 100 triệu, 50% không phải trả gì",
    safeResult: 150,
    riskyResult: 150,
  },
] as const;

type Choice = "safe" | "risky";

export default function InteractiveProspect() {
  const [answers, setAnswers] = useState<Record<string, Choice | undefined>>({});
  const done = QUESTIONS.every((q) => answers[q.id]);
  const flipped = done && answers.gain === "safe" && answers.loss === "risky";
  const consistent = done && answers.gain === answers.loss;

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-5 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">
          🎲 Hai câu hỏi, cùng một kết quả
        </h3>
        <p className="text-stone-500 text-sm dark:text-stone-400">
          Chọn theo cảm giác đầu tiên, đừng tính toán. Đối chiếu ở cuối.
        </p>
      </div>

      {QUESTIONS.map((q) => (
        <div key={q.id} className="rounded-2xl border border-stone-200 p-4 dark:border-stone-800">
          <p className="text-sm font-bold text-stone-800 dark:text-stone-100">{q.frame}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(["safe", "risky"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: c }))}
                aria-pressed={answers[q.id] === c}
                className={`rounded-xl border px-3 py-2.5 text-left text-[13px] leading-snug transition-colors ${
                  answers[q.id] === c
                    ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                    : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800/60 dark:text-stone-200 dark:hover:bg-stone-800"
                }`}
              >
                {c === "safe" ? q.safe : q.risky}
              </button>
            ))}
          </div>
        </div>
      ))}

      {done && (
        <div
          className={`rounded-2xl p-4 ${
            flipped ? "bg-amber-50 dark:bg-amber-950/30" : "bg-emerald-50 dark:bg-emerald-950/30"
          }`}
        >
          <p className="text-sm text-stone-700 dark:text-stone-200">
            Cả bốn lựa chọn đều dẫn tới <b>150 triệu</b> tính theo giá trị kỳ vọng. Hai câu hỏi mô tả
            đúng một bài toán, chỉ khác chỗ đặt mốc: câu đầu nói về phần được thêm, câu sau nói về
            phần phải trả lại.
          </p>
          {flipped ? (
            <p className="mt-2 text-sm font-semibold text-amber-800 dark:text-amber-200">
              Bạn chọn chắc chắn khi nói về phần được, và chọn cược khi nói về phần mất. Đó là hiệu
              ứng phản chiếu - phần lớn người chọn đúng như vậy, và nó là lý do người ta cắt lãi sớm
              nhưng giữ mãi khoản đang lỗ.
            </p>
          ) : consistent ? (
            <p className="mt-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              Bạn giữ nguyên khẩu vị rủi ro ở cả hai khung. Điều đáng chú ý: phần lớn người không
              làm vậy - và họ cũng không nhận ra mình vừa đổi.
            </p>
          ) : (
            <p className="mt-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              Bạn đổi khẩu vị theo hướng ngược với đa số. Dù theo hướng nào, điểm cần nhớ vẫn là:
              cách đặt câu hỏi đã đủ làm bạn đổi quyết định trên một bài toán không đổi.
            </p>
          )}
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="mt-3 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold text-stone-700 shadow-2xs dark:bg-stone-800 dark:text-stone-200"
          >
            Làm lại
          </button>
        </div>
      )}
    </div>
  );
}
