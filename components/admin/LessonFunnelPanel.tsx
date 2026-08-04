import type { LessonFunnel } from "@/lib/admin/lesson-funnel";

/** Bài nào bị bỏ dở, và `whyItMatters` có giữ chân được ai không.
 *
 *  Bảng này tồn tại để ngăn một quyết định đắt: 396 bài đang thiếu
 *  `whyItMatters`, và viết lại từng ấy bài là công việc hàng tuần. Trước khi
 *  bắt đầu, hai cột dưới cùng phải nói được rằng nó có tác dụng.
 *
 *  Khi chưa có dữ liệu thì nói RÕ LÝ DO chứ không bày bảng rỗng - một bảng
 *  rỗng đọc thành "không ai bỏ bài nào", và đó là kết luận sai nguy hiểm nhất
 *  có thể rút ra từ chỗ này. */
export default function LessonFunnelPanel({ funnel }: { funnel: LessonFunnel }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
      <h2 className="text-sm font-black uppercase tracking-widest text-stone-500">
        Phễu bài học · 30 ngày
      </h2>

      {!funnel.available ? (
        <p className="mt-3 rounded-xl bg-amber-50 p-3 text-[13px] leading-relaxed text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          {funnel.reason ?? "Chưa đọc được dữ liệu."}
        </p>
      ) : (
        <>
          <p className="mt-1 text-[12px] text-stone-500">
            Đếm theo (bài, người), không theo số dòng — một người đọc lại năm lần vẫn là một
            người. Tổng {funnel.totalOpens.toLocaleString("vi-VN")} lượt mở.
          </p>

          {funnel.whySplit && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {(
                [
                  ["Có whyItMatters", funnel.whySplit.withWhy],
                  ["Không có", funnel.whySplit.withoutWhy],
                ] as const
              ).map(([label, b]) => {
                const rate = b.opens > 0 ? b.reachedRecall / b.opens : 0;
                return (
                  <div key={label} className="rounded-xl bg-stone-100 p-3 dark:bg-stone-800">
                    <p className="text-[11px] font-bold text-stone-500">{label}</p>
                    <p className="font-mono text-2xl font-black text-stone-900 dark:text-stone-100">
                      {(rate * 100).toFixed(0)}%
                    </p>
                    <p className="text-[11px] text-stone-500">
                      đọc hết thân bài · {b.lessons} bài, {b.opens.toLocaleString("vi-VN")} lượt mở
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {funnel.whySplit && (
            <p className="mt-2 text-[11px] leading-relaxed text-stone-500">
              Chỉ tính bài có ít nhất {funnel.minOpensForSplit} lượt mở. Đây KHÔNG phải bằng chứng
              nhân quả — bài có <code>whyItMatters</code> thường cũng là bài được chăm hơn về mọi
              mặt. Nhưng nếu hai con số gần bằng nhau thì viết lại 396 bài gần như chắc chắn không
              đáng, và đó đã đủ để quyết.
            </p>
          )}

          <table className="mt-4 w-full text-left text-[12px]">
            <thead className="text-[10px] uppercase tracking-widest text-stone-400">
              <tr>
                <th className="pb-1">Bài</th>
                <th className="pb-1 text-right">Mở</th>
                <th className="pb-1 text-right">Đọc hết</th>
                <th className="pb-1 text-right">Bỏ dở</th>
              </tr>
            </thead>
            <tbody>
              {funnel.rows.slice(0, 20).map((r) => (
                <tr key={r.slug} className="border-t border-stone-100 dark:border-stone-800">
                  <td className="py-1.5 pr-2">
                    <span className="font-medium text-stone-800 dark:text-stone-200">{r.title}</span>
                    <span className="ml-1 font-mono text-[10px] text-stone-400">{r.slug}</span>
                  </td>
                  <td className="py-1.5 text-right font-mono tabular-nums">{r.opens}</td>
                  <td className="py-1.5 text-right font-mono tabular-nums">{r.reachedRecall}</td>
                  <td className="py-1.5 text-right font-mono font-bold tabular-nums text-rose-600 dark:text-rose-400">
                    {r.dropBeforeEnd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {funnel.rows.length === 0 && (
            <p className="mt-2 text-[12px] text-stone-500">Chưa có bài nào đủ dữ liệu.</p>
          )}
        </>
      )}
    </section>
  );
}
