/* i18n-ignore-start: nhãn LIVE giữ nguyên ở mọi ngôn ngữ, như một biểu tượng */
const LIVE_LABEL = "LIVE";
/* i18n-ignore-end */

/** Huy hiệu LIVE: chấm đỏ loé + chữ. Gắn cạnh mọi bảng xếp hạng để người học
 *  thấy đây là thứ hạng đang chạy, không phải ảnh chụp. */
export default function LiveBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 font-mono text-[11px] font-black leading-none tracking-[0.12em] text-red-600 dark:text-red-400 ${className}`}>
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-70 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      {LIVE_LABEL}
    </span>
  );
}
