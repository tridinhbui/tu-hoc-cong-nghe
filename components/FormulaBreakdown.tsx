import type { ReactNode } from "react";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";

/**
 * Bảng "con số này ở đâu ra": công thức chữ, rồi cùng công thức đó với số thật
 * đã thay vào, rồi kết quả.
 *
 * VÌ SAO CÓ FILE NÀY. Một người học nhắn lại hỏi "83tr tính trên công thức nào"
 * về widget trái phiếu, và không ai trả lời được từ màn hình - widget chỉ in ra
 * một con số. Hoá ra con số đó sai: nó dùng công thức trái phiếu vĩnh viễn cho
 * một trái phiếu ghi rõ đáo hạn 10 năm. Lỗi sống được lâu chính vì phép tính bị
 * giấu đi; hiện công thức ra là thứ khiến sai sót kiểu đó không sống nổi qua
 * người học đầu tiên.
 *
 * Dùng chung một component thay vì mỗi widget tự bày một kiểu: có 30 widget
 * tính toán, và mỗi cái tự chế một cách trình bày thì người học phải học lại
 * cách đọc ở từng bài.
 *
 * Là server component - không có trạng thái, không có tương tác nào.
 */
export interface FormulaStep {
  /** Vế trái, ví dụ "PV của coupon". */
  label: string;
  /** Phép tính với số đã thay vào, ví dụ "5 × 7,3601". */
  expression: string;
  /** Kết quả của riêng bước này, ví dụ "36,80 triệu". */
  value: string;
}

export default async function FormulaBreakdown({
  formula,
  steps,
  result,
  note,
}: {
  /** Công thức ở dạng ký hiệu, chưa thay số. */
  formula: string;
  /** Các bước trung gian. Bỏ trống nếu công thức chỉ có một phép tính. */
  steps?: FormulaStep[];
  result: { label: string; value: string };
  /** Câu cảnh báo hoặc điều kiện áp dụng, nếu có. */
  note?: ReactNode;
}) {
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return (
    <details className="group rounded-2xl border border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950/40">
      {/* Mặc định đóng: người học lần đầu cần thấy con số và ý nghĩa của nó
          trước, còn công thức là thứ họ mở ra khi đã hỏi "sao lại ra thế". Mở
          sẵn thì khối tính toán át mất phần đang dạy. */}
      <summary className="cursor-pointer list-none px-4 py-3 text-xs font-black uppercase tracking-wider text-stone-500 transition-colors hover:text-stone-800 dark:hover:text-stone-200">
        <span className="mr-1.5 inline-block transition-transform group-open:rotate-90">▸</span>
        {t.miscUi.formulaBreakdown.howThisIsCalculated}
      </summary>

      <div className="space-y-3 px-4 pb-4">
        <div>
          <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
            {t.miscUi.formulaBreakdown.formula}
          </div>
          <code className="block overflow-x-auto whitespace-pre rounded-xl bg-white px-3 py-2 font-mono text-[12px] leading-relaxed text-stone-800 dark:bg-stone-900 dark:text-stone-100">
            {formula}
          </code>
        </div>

        {steps && steps.length > 0 && (
          <div>
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              {t.miscUi.formulaBreakdown.substitution}
            </div>
            <div className="space-y-1">
              {steps.map((step) => (
                <div
                  key={step.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 rounded-xl bg-white px-3 py-2 dark:bg-stone-900"
                >
                  <span className="text-[11px] font-bold text-stone-500">{step.label}</span>
                  <span className="font-mono text-[12px] text-stone-600 dark:text-stone-400">
                    {step.expression}
                  </span>
                  <span className="font-mono text-[12px] font-bold text-stone-900 dark:text-stone-100">
                    = {step.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-baseline justify-between gap-x-3 rounded-xl bg-stone-900 px-3 py-2.5 text-white dark:bg-stone-800">
          <span className="text-[11px] font-black uppercase tracking-wider text-stone-400">
            {result.label}
          </span>
          <span className="font-mono text-sm font-black">{result.value}</span>
        </div>

        {note && <p className="text-[11px] leading-relaxed text-stone-500">{note}</p>}
      </div>
    </details>
  );
}
