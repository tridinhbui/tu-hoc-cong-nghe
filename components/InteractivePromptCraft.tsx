"use client";

import { useState } from "react";

// Ghép câu lệnh theo khung R-C-T-O, widget cho các bài khai `interactiveType:
// "prompt-craft"`.
//
// Bài học viết ra bốn chữ cái thì ai cũng nhớ được. Cái không nhớ được bằng
// cách đọc là mỗi mảnh THIẾU thì hỏng ở đâu - và đó là thứ duy nhất đáng dạy,
// vì người mới không hỏng ở chỗ không biết khung, họ hỏng ở chỗ bỏ Context rồi
// than AI trả lời chung chung.
//
// Nên widget không chấm điểm câu lệnh. Nó dựng câu lệnh từ những mảnh bạn
// chọn, rồi với mỗi mảnh còn trống thì nói thẳng hậu quả cụ thể. Bỏ trống hết
// vẫn ra một câu lệnh chạy được - đúng như thực tế, và đó mới là cái bẫy.

interface Slot {
  key: "role" | "context" | "task" | "output";
  label: string;
  letter: string;
  options: string[];
  /** Hậu quả cụ thể khi bỏ trống, không phải "câu lệnh sẽ kém đi". */
  cost: string;
}

const SLOTS: Slot[] = [
  {
    key: "role",
    letter: "R",
    label: "Role — vai trò bạn giao cho AI",
    options: [
      "Bạn là chuyên viên phân tích tín dụng doanh nghiệp",
      "Bạn là kiểm toán viên soát xét báo cáo tài chính",
      "Bạn là nhà đầu tư cá nhân thận trọng",
    ],
    cost: "Không có vai trò, AI trả lời ở mức bách khoa toàn thư: đúng nhưng không đứng từ góc nhìn nào, nên không nêu được điều một người làm nghề sẽ để ý trước tiên.",
  },
  {
    key: "context",
    letter: "C",
    label: "Context — dữ kiện và ràng buộc",
    options: [
      "Doanh nghiệp bán lẻ Việt Nam, doanh thu 2.400 tỷ, nợ vay 900 tỷ, biên lợi nhuận gộp giảm 3 điểm so với năm trước",
      "Báo cáo quý gần nhất, chưa kiểm toán, ngành có tính mùa vụ mạnh",
      "Người đọc là ban giám đốc, không có nền tài chính",
    ],
    cost: "Đây là mảnh hay bị bỏ nhất và cũng là mảnh đắt nhất. Không có dữ kiện, AI phải tự bịa ra bối cảnh để trả lời — và nó sẽ bịa, không hỏi lại.",
  },
  {
    key: "task",
    letter: "T",
    label: "Task — việc cụ thể, một động từ",
    options: [
      "Liệt kê năm rủi ro tín dụng lớn nhất và xếp theo mức nghiêm trọng",
      "So sánh hai phương án tài trợ và nêu điều kiện để mỗi phương án tốt hơn",
      "Chỉ ra những khoản mục cần hỏi lại kế toán trước khi kết luận",
    ],
    cost: "Việc mơ hồ (\"phân tích giúp tôi\") cho ra một bài tổng quan dài. Bạn sẽ đọc hết mà không dùng được câu nào, vì không câu nào trả lời một câu hỏi bạn thực sự có.",
  },
  {
    key: "output",
    letter: "O",
    label: "Output — hình dạng câu trả lời",
    options: [
      "Bảng ba cột: rủi ro | dấu hiệu nhận biết | số liệu cần kiểm chứng",
      "Tối đa 200 từ, gạch đầu dòng, không mở bài",
      "Mỗi kết luận kèm một câu nêu rõ giả định đứng sau nó",
    ],
    cost: "Không quy định hình dạng thì mỗi lần chạy lại ra một dạng khác nhau, và bạn mất thời gian định dạng lại nhiều hơn thời gian tiết kiệm được.",
  },
];

export default function InteractivePromptCraft() {
  const [picked, setPicked] = useState<Partial<Record<Slot["key"], string>>>({});
  const missing = SLOTS.filter((s) => !picked[s.key]);
  const assembled = SLOTS.map((s) => picked[s.key])
    .filter(Boolean)
    .join("\n");

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        Ghép một câu lệnh, rồi xem mảnh còn thiếu lấy đi cái gì
      </h3>

      <div className="mt-4 space-y-4">
        {SLOTS.map((slot) => (
          <div key={slot.key}>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-black ${
                  picked[slot.key]
                    ? "bg-emerald-500 text-white"
                    : "bg-stone-200 text-stone-500 dark:bg-stone-700 dark:text-stone-400"
                }`}
              >
                {slot.letter}
              </span>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-200">{slot.label}</span>
            </div>
            <div className="mt-1.5 space-y-1">
              {slot.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setPicked((prev) => ({
                      ...prev,
                      [slot.key]: prev[slot.key] === option ? undefined : option,
                    }))
                  }
                  aria-pressed={picked[slot.key] === option}
                  className={`block w-full cursor-pointer rounded-xl border px-3 py-1.5 text-left text-[11px] leading-snug ${
                    picked[slot.key] === option
                      ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                      : "border-stone-200 text-stone-600 hover:border-stone-400 dark:border-stone-700 dark:text-stone-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
          Câu lệnh của bạn
        </p>
        {assembled ? (
          <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-stone-700 dark:text-stone-200">
            {assembled}
          </pre>
        ) : (
          <p className="mt-1.5 text-[11px] italic text-stone-400 dark:text-stone-500">
            Chưa chọn mảnh nào. Một câu lệnh rỗng vẫn chạy được — đó là lý do người ta không nhận ra
            mình đang thiếu gì.
          </p>
        )}
      </div>

      {missing.length > 0 ? (
        <div className="mt-3 space-y-2">
          {missing.map((slot) => (
            <p
              key={slot.key}
              className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
            >
              <span className="font-bold">Thiếu {slot.letter}: </span>
              {slot.cost}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] leading-relaxed text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200">
          Đủ bốn mảnh. Việc còn lại không nằm trong câu lệnh: câu trả lời trả về vẫn phải kiểm — mọi
          con số AI đưa ra đều là số cần đối chiếu với nguồn, kể cả khi câu lệnh đã viết chuẩn.
        </p>
      )}
    </div>
  );
}
