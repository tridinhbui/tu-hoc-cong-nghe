import type { LessonFunnel } from "@/lib/admin/lesson-funnel";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary, format, intlLocale } from "@/lib/i18n";
import { panel } from "@/components/ui/system";

/** Bài nào bị bỏ dở, và `whyItMatters` có giữ chân được ai không.
 *
 *  Bảng này tồn tại để ngăn một quyết định đắt: 396 bài đang thiếu
 *  `whyItMatters`, và viết lại từng ấy bài là công việc hàng tuần. Trước khi
 *  bắt đầu, hai cột dưới cùng phải nói được rằng nó có tác dụng.
 *
 *  Khi chưa có dữ liệu thì nói RÕ LÝ DO chứ không bày bảng rỗng - một bảng
 *  rỗng đọc thành "không ai bỏ bài nào", và đó là kết luận sai nguy hiểm nhất
 *  có thể rút ra từ chỗ này. */
export default async function LessonFunnelPanel({ funnel }: { funnel: LessonFunnel }) {
  // Stays a server component: it renders a table from a prop and needs no
  // browser API, so reading the dictionary on the server keeps the admin bundle
  // as it was rather than shipping this panel's JS to make one label swap.
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return (
    <section className={`${panel} p-5`}>
      <h2 className="eyebrow border-b border-line-strong pb-2 text-ink-soft">
        {t.adminFunnel.title}
      </h2>

      {!funnel.available ? (
        <p className="mt-3 rounded-sm border border-warn-line bg-warn-soft p-3 text-[13px] leading-relaxed text-warn-ink">
          {funnel.reason ?? t.adminFunnel.noDataFallback}
        </p>
      ) : (
        <>
          <p className="mt-2 text-[12px] text-ink-muted">
            {format(t.adminFunnel.totalOpens, { total: funnel.totalOpens.toLocaleString(intlLocale(locale)) })}
          </p>

          {funnel.whySplit && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {(
                [
                  [t.adminFunnel.withWhy, funnel.whySplit.withWhy],
                  [t.adminFunnel.withoutWhy, funnel.whySplit.withoutWhy],
                ] as const
              ).map(([label, b]) => {
                const rate = b.opens > 0 ? b.reachedRecall / b.opens : 0;
                return (
                  <div key={label} className="rounded-sm border border-line-strong p-3">
                    <p className="text-[11px] font-bold text-ink-muted">{label}</p>
                    <p className="font-mono text-2xl font-medium tabular-nums text-ink-max">
                      {(rate * 100).toFixed(0)}%
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      {format(t.adminFunnel.splitCaption, {
                        lessons: b.lessons,
                        opens: b.opens.toLocaleString(intlLocale(locale)),
                      })}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {funnel.whySplit && (
            <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
              {format(t.adminFunnel.splitNote, { min: funnel.minOpensForSplit })}{" "}
              <code>{t.adminFunnel.splitNoteWhyItMattersCode}</code> {t.adminFunnel.splitNoteSuffix}
            </p>
          )}

          <table className="mt-4 w-full text-left text-[12px]">
            <thead className="text-[10px] uppercase tracking-widest text-ink-faint">
              <tr>
                <th className="pb-1">{t.adminFunnel.colLesson}</th>
                <th className="pb-1 text-right">{t.adminFunnel.colOpens}</th>
                <th className="pb-1 text-right">{t.adminFunnel.colReached}</th>
                <th className="pb-1 text-right">{t.adminFunnel.colDrop}</th>
              </tr>
            </thead>
            <tbody>
              {funnel.rows.slice(0, 20).map((r) => (
                <tr key={r.slug} className="border-t border-line-soft">
                  <td className="py-1.5 pr-2">
                    <span className="font-medium text-ink-heading">{r.title}</span>
                    <span className="ml-1 font-mono text-[10px] text-ink-faint">{r.slug}</span>
                  </td>
                  <td className="py-1.5 text-right font-mono tabular-nums">{r.opens}</td>
                  <td className="py-1.5 text-right font-mono tabular-nums">{r.reachedRecall}</td>
                  <td className="py-1.5 text-right font-mono font-bold tabular-nums text-danger">
                    {r.dropBeforeEnd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {funnel.rows.length === 0 && (
            <p className="mt-2 text-[12px] text-ink-muted">{t.adminFunnel.noRowsData}</p>
          )}
        </>
      )}
    </section>
  );
}
