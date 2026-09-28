import type { WorldUsage } from "@/lib/admin/world-usage";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary, format } from "@/lib/i18n";
import { panel } from "@/components/ui/system";

/** Phòng nào trong thành phố 3D có người vào.
 *
 *  Bảng này quyết định việc xây tiếp: 29 phòng đã dựng, và cho tới khi có nó
 *  thì "xây thêm phòng gì" là câu hỏi trả lời bằng cảm giác. Xếp theo số PHÚT
 *  chứ không theo số lượt: ghé một giây rồi đi cũng là một lượt, còn ngồi lại
 *  hai mươi phút mới là dấu hiệu căn phòng đáng tồn tại. */

export default async function WorldUsagePanel({ usage }: { usage: WorldUsage }) {
  // Stays a server component, same reasoning as LessonFunnelPanel: it renders
  // from a prop with no browser API, so reading the dictionary on the server
  // avoids shipping this panel's JS just to translate labels.
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  const tw = t.adminOne.worldUsage;
  const worldLabels: Record<string, string> = tw.worldLabels;

  return (
    <div className={`${panel} p-5`}>
      <div className="mb-3">
        <h2 className="eyebrow border-b border-line-strong pb-2 text-ink-soft">{tw.title}</h2>
        <p className="mt-2 text-xs text-ink-muted">{tw.subtitle}</p>
      </div>

      {!usage.available ? (
        // Nói rõ VÌ SAO rỗng. Một bảng trống trông hệt như "chưa ai vào phòng
        // nào", và đó là kết luận sai dẫn tới quyết định sai.
        <div className="rounded-sm border border-warn-line bg-warn-soft px-3 py-2.5">
          <p className="text-xs font-bold text-warn-ink">{tw.noDataTitle}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-warn-ink">{usage.reason}</p>
        </div>
      ) : usage.rows.length === 0 ? (
        <p className="text-xs text-ink-muted">{tw.noRowsFallback}</p>
      ) : (
        <>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div className="rounded-sm border border-line-strong px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">{tw.totalMinutes}</p>
              <p className="font-mono text-lg font-medium tabular-nums text-ink-max">
                {usage.totalMinutes} {tw.minutesUnit}
              </p>
            </div>
            <div className="rounded-sm border border-line-strong px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">{tw.totalLearners}</p>
              <p className="font-mono text-lg font-medium tabular-nums text-ink-max">{usage.totalLearners}</p>
            </div>
          </div>

          <div className="space-y-1">
            {usage.rows.map((r) => {
              const share = usage.totalMinutes > 0 ? r.minutes / usage.totalMinutes : 0;
              return (
                <div key={`${r.world}:${r.roomKey}`} className="flex items-center gap-2 text-xs">
                  <span className="w-40 shrink-0 truncate font-bold text-ink-body">
                    {worldLabels[r.world] ?? r.world}
                    {r.roomKey && <span className="font-mono font-normal text-ink-faint"> · {r.roomKey}</span>}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-xs bg-surface-raised">
                    <div className="h-full bg-brand-600 dark:bg-brand-500" style={{ width: `${share * 100}%` }} />
                  </div>
                  <span className="w-24 shrink-0 text-right tabular-nums text-ink-muted">
                    {format(tw.rowCaption, { minutes: r.minutes, learners: r.learners })}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
