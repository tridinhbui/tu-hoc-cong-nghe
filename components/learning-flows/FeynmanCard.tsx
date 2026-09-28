import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

export interface FeynmanCopy {
  intro: string;
  columns: string[];
  rows: string[][];
  oneLiner: string;
}

/**
 * Thẻ Feynman: ví dụ đời thường → bảng so sánh ba cột → chốt một câu.
 *
 * Bảng là bảng thật ở màn hình rộng, và thành từng thẻ dọc ở điện thoại - ba
 * cột chữ dài chen trong 375px thì mỗi ô còn hai chữ một dòng, không ai đọc
 * được. Cột đầu (tên thành phần) đứng làm nhãn cho mỗi thẻ.
 *
 * Câu chốt đứng CUỐI và nổi nhất thẻ: nó là thứ người học mang về, và là phép
 * thử của chính người viết - không tóm được trong một câu thì chưa hiểu.
 */
export default function FeynmanCard({
  badge,
  hint,
  oneLinerLabel,
  copy,
  children,
}: {
  badge: string;
  hint: string;
  oneLinerLabel: string;
  copy: FeynmanCopy;
  /** Chỗ cho một bản demo tương tác, đặt giữa bảng và câu chốt. */
  children?: ReactNode;
}) {
  const [c0, c1, c2] = copy.columns;
  // Khuôn của Frame (thanh tiêu đề #f3f1ec + thân trắng, viền 1px), nhưng
  // thanh tiêu đề mang chữ đã dịch nên đi bằng sans - luật 4 không cho đặt
  // nhãn tiếng Việt vào phông mono của Frame.
  return (
    <div className="overflow-hidden rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-stone-300 bg-[#f3f1ec] px-4 py-2 dark:border-stone-700 dark:bg-stone-950">
        <span className="eyebrow inline-flex items-center gap-1.5 text-ink-max">
          <Lightbulb className="h-3.5 w-3.5" aria-hidden />
          {badge}
        </span>
        <span className="text-xs text-ink-muted">{hint}</span>
      </div>

      <div className="p-4 sm:p-5">
        <p className="mb-4 text-[15px] leading-7 text-ink-body">{copy.intro}</p>

        {/* Màn hình rộng: bảng. */}
        <div className="hidden overflow-hidden rounded-sm border border-stone-300 sm:block dark:border-stone-700">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-300 bg-[#fbfaf7] text-ink-muted dark:border-stone-700 dark:bg-stone-950">
              <tr>
                <th scope="col" className="eyebrow w-[18%] px-4 py-2.5">{c0}</th>
                <th scope="col" className="eyebrow w-[41%] px-4 py-2.5">{c1}</th>
                <th scope="col" className="eyebrow w-[41%] px-4 py-2.5">{c2}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {copy.rows.map((row) => (
                <tr key={row[0]} className="align-top">
                  <th scope="row" className="px-4 py-3 font-black text-ink-max">{row[0]}</th>
                  <td className="px-4 py-3 leading-6 text-ink-body">{row[1]}</td>
                  <td className="px-4 py-3 leading-6 text-ink-body">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Điện thoại: mỗi hàng một khối, chia bằng gạch mảnh. */}
        <ul className="divide-y divide-stone-200 rounded-sm border border-stone-300 sm:hidden dark:divide-stone-800 dark:border-stone-700">
          {copy.rows.map((row) => (
            <li key={row[0]} className="p-3">
              <p className="mb-1.5 font-black text-ink-max">{row[0]}</p>
              <p className="text-sm leading-6 text-ink-body">
                <span className="font-semibold text-ink-muted">{c1}: </span>
                {row[1]}
              </p>
              <p className="mt-1 text-sm leading-6 text-ink-body">
                <span className="font-semibold text-ink-muted">{c2}: </span>
                {row[2]}
              </p>
            </li>
          ))}
        </ul>

        {children ? <div className="mt-5">{children}</div> : null}

        <blockquote className="mt-5 border-l-2 border-stone-950 pl-4 dark:border-stone-200">
          <p className="eyebrow mb-1 text-ink-soft">{oneLinerLabel}</p>
          <p className="text-base font-bold leading-7 text-ink-max sm:text-lg">{copy.oneLiner}</p>
        </blockquote>
      </div>
    </div>
  );
}
