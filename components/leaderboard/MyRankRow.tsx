"use client";

import { useI18n } from "@/lib/i18n/context";

/**
 * Dòng "vị trí của bạn" dùng chung cho MỌI bảng xếp hạng.
 *
 * Luôn hiện khi có người đăng nhập - kể cả khi họ chưa có hạng. Các RPC
 * `get_my_*_rank` trả về rỗng cho người chưa có điểm, và trước đây mỗi bảng tự
 * ẩn dòng này đi trong trường hợp đó: người mới vào nhìn bảng không thấy mình
 * ở đâu cả, đúng lúc họ cần biết nhất. Giờ họ thấy "Chưa có hạng" kèm việc cần
 * làm để có tên.
 *
 * `rank === null` nghĩa là chưa có hạng; `valueLabel` là giá trị đã định dạng
 * theo chỉ số của bảng (XP, ngày, bài...).
 */
export default function MyRankRow({
  rank,
  valueLabel,
  compact = false,
}: {
  rank: number | null;
  valueLabel: string | null;
  compact?: boolean;
}) {
  const { t } = useI18n();
  const ranked = rank !== null;
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-accent-line bg-accent-soft ${
        compact ? "px-3 py-2" : "px-3.5 py-2.5"
      }`}
    >
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-white font-black tabular-nums text-accent-strong ring-1 ring-accent-line dark:bg-stone-900 ${
          compact ? "h-7 min-w-7 px-1 text-xs" : "h-8 min-w-8 px-1.5 text-sm"
        }`}
      >
        {ranked ? rank : "–"}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`font-black text-ink ${compact ? "text-sm" : "text-[15px]"}`}>{t.rankWidget.you}</p>
        {!ranked && <p className="truncate text-[11px] font-medium text-ink-muted">{t.rankWidget.unrankedHint}</p>}
      </div>
      <span className={`shrink-0 font-black tabular-nums ${ranked ? "text-accent-strong" : "text-ink-muted"} ${compact ? "text-sm" : "text-[15px]"}`}>
        {ranked ? valueLabel : t.rankWidget.unranked}
      </span>
    </div>
  );
}
