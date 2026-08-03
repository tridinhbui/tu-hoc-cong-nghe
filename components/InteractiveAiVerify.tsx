"use client";

import { useState } from "react";

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

const LABELS: Record<Verdict, string> = {
  derived: "Suy ra được từ dữ liệu đã đưa",
  source: "Phải đối chiếu nguồn ngoài",
  fabricated: "Không thể có thật",
};

interface Claim {
  text: string;
  answer: Verdict;
  why: string;
}

const BRIEF = `Bạn đưa cho AI bảng số này của công ty Minh Phát và nhờ viết một đoạn ghi nhớ:
doanh thu 2024 là 1.200 tỷ, giá vốn 900 tỷ, chi phí bán hàng và quản lý 180 tỷ,
nợ vay 400 tỷ, vốn chủ 800 tỷ.`;

const CLAIMS: Claim[] = [
  {
    text: "Biên lợi nhuận gộp của Minh Phát năm 2024 là 25%.",
    answer: "derived",
    why: "(1.200 − 900) / 1.200 = 25%. Toàn bộ dữ kiện đã nằm trong bảng bạn đưa, nên chỉ cần đọc lại phép tính. Đây là nhóm duy nhất bạn tự xác nhận được mà không rời khỏi trang.",
  },
  {
    text: "Tỷ lệ nợ trên vốn chủ 0,5 lần thấp hơn trung bình ngành bán lẻ Việt Nam là 0,9 lần.",
    answer: "source",
    why: "Vế đầu suy ra được (400/800 = 0,5). Vế sau thì không: bạn chưa hề đưa số liệu ngành nào. Con số 0,9 có thể đúng, có thể là trung bình của một mẫu khác hẳn, có thể là số bịa — và cả ba khả năng đó trông giống nhau trên màn hình. Chưa đối chiếu được nguồn thì chưa đưa vào báo cáo.",
  },
  {
    text: "Lợi nhuận trước thuế đạt 120 tỷ, tăng 18% so với năm 2023.",
    answer: "source",
    why: "Vế đầu suy ra được (1.200 − 900 − 180 = 120). Vế sau cần số của năm 2023, thứ bạn không đưa. Đây là dạng nguy hiểm nhất: một nửa câu đúng chắc chắn khiến nửa còn lại được tin theo.",
  },
  {
    text: "Theo báo cáo kiểm toán của Deloitte phát hành ngày 12/3/2025, khoản phải thu đã được soát xét và không có ngoại trừ.",
    answer: "fabricated",
    why: "Bạn không đưa báo cáo kiểm toán nào, cũng không nhắc tới đơn vị kiểm toán. Một trích dẫn có tên công ty và ngày tháng cụ thể, xuất hiện từ hư không, là dấu hiệu bịa rõ nhất — và cũng là dấu hiệu thuyết phục nhất, vì chi tiết càng cụ thể thì càng trông giống đã kiểm chứng.",
  },
];

export default function InteractiveAiVerify() {
  const [picked, setPicked] = useState<Record<number, Verdict | undefined>>({});
  const answered = CLAIMS.filter((_, i) => picked[i]).length;
  const correct = CLAIMS.filter((c, i) => picked[i] === c.answer).length;

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        Bốn câu trong một bản ghi nhớ do AI viết. Câu nào dùng được ngay?
      </h3>
      <p className="mt-2 whitespace-pre-line rounded-2xl bg-stone-50 p-3 text-[11px] leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {BRIEF}
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
          {correct}/{CLAIMS.length} đúng. Để ý hai câu ở giữa: cả hai đều mở đầu bằng một phép tính
          đúng rồi nối thêm một mệnh đề bạn không có cách nào xác nhận. Đó là hình dạng thường gặp
          nhất, và nó lọt qua được chính vì nửa đầu kiểm là đúng ngay.
        </p>
      )}
    </div>
  );
}
