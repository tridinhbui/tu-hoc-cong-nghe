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
  return (
    <div className="rounded-2xl border border-amber-300/60 bg-amber-50/60 p-4 sm:p-6 dark:border-amber-500/25 dark:bg-amber-500/[0.06]">
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/90 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-amber-950">
          <Lightbulb className="h-3.5 w-3.5" aria-hidden />
          {badge}
        </span>
        <span className="text-xs text-ink-muted">{hint}</span>
      </div>

      <p className="mb-4 text-[15px] leading-7 text-ink-body">{copy.intro}</p>

      {/* Màn hình rộng: bảng. */}
      <div className="hidden overflow-hidden rounded-xl border border-stone-200 bg-white sm:block dark:border-stone-700 dark:bg-stone-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-100 text-xs uppercase tracking-wide text-ink-muted dark:bg-stone-800">
            <tr>
              <th scope="col" className="w-[18%] px-4 py-2.5 font-bold">{c0}</th>
              <th scope="col" className="w-[41%] px-4 py-2.5 font-bold">{c1}</th>
              <th scope="col" className="w-[41%] px-4 py-2.5 font-bold">{c2}</th>
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => (
              <tr key={row[0]} className="border-t border-stone-200 align-top dark:border-stone-700">
                <th scope="row" className="px-4 py-3 font-black text-ink-max">{row[0]}</th>
                <td className="px-4 py-3 leading-6 text-ink-body">{row[1]}</td>
                <td className="px-4 py-3 leading-6 text-ink-body">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Điện thoại: mỗi hàng một thẻ. */}
      <ul className="space-y-2.5 sm:hidden">
        {copy.rows.map((row) => (
          <li key={row[0]} className="rounded-xl border border-stone-200 bg-white p-3 dark:border-stone-700 dark:bg-stone-900">
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

      <div className="mt-5 rounded-xl border-l-4 border-brand-600 bg-white px-4 py-3 dark:border-brand-500 dark:bg-stone-900">
        <p className="eyebrow mb-1 text-accent-strong">{oneLinerLabel}</p>
        <p className="text-base font-bold leading-7 text-ink-max sm:text-lg">{copy.oneLiner}</p>
      </div>
    </div>
  );
}
