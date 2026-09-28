import { Flame, Star, CheckCircle2 } from "lucide-react";

/** Thanh đầu trang của /chung-chi/<certId>. */
export default function CertPageHeader({
  completedPct,
  eyebrow,
  title,
  subtitle,
  streakLine,
  xp,
  art,
}: {
  /** Phần trăm bài đã xong của tuyến. Dấu tích cạnh tiêu đề chỉ hiện ở 100%;
   *  không truyền thì không có dấu tích. Trước đây nó hiện VÔ ĐIỀU KIỆN, nên
   *  người học 0% đọc thấy một vòng tròn xanh có dấu tích ngay cạnh tên tuyến -
   *  tức trang nói họ đã hoàn thành. */
  completedPct?: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  streakLine: string;
  xp: number;
  art?: React.ReactNode;
}) {
  return (
    <div className="shrink-0 border-b border-stone-200/90 bg-white dark:border-stone-800 dark:bg-stone-900">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-6 py-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent-ink">
              {eyebrow}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-stone-950 sm:text-3xl dark:text-stone-50">
              {title}
            </h1>
            {completedPct !== undefined && completedPct >= 100 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white shadow-2xs">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            )}
          </div>
          <p className="mt-1 text-xs font-medium text-ink-muted">
            {subtitle}
          </p>
        </div>

        {art && <div className="hidden shrink-0 lg:block">{art}</div>}

        <div className="flex shrink-0 flex-wrap items-center gap-2.5 self-start sm:self-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/90 bg-white dark:bg-stone-800 px-3.5 py-1.5 text-xs font-bold text-stone-800 dark:border-amber-900/60 dark:text-amber-300 shadow-2xs">
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span>{streakLine}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/90 bg-white dark:bg-stone-800 px-3.5 py-1.5 text-xs font-bold text-stone-800 dark:border-brand-900/60 dark:text-brand-300 shadow-2xs">
            <Star className="h-3.5 w-3.5 fill-brand-500 text-brand-500" />
            <span>{xp.toLocaleString()} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
