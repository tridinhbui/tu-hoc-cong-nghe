/**
 * Số hạng trong bảng xếp hạng. Ba hạng đầu là một ô vuông viền 1px (hạng 1 nền
 * mực) thay cho emoji huy chương - emoji vẽ khác nhau theo hệ điều hành và đọc
 * là trang trí rẻ tiền. Không tô vàng/bạc/đồng: màu trong hệ này có chức năng,
 * và thứ hạng đã nói bằng chính con số. Từ hạng 4 trở đi chỉ là con số.
 */
const PODIUM_TONE: Record<number, string> = {
  1: "border-brand-700 bg-brand-600 text-white dark:border-stone-100",
  2: "border-stone-400 text-ink-max dark:border-stone-500",
  3: "border-stone-300 text-ink-body dark:border-stone-600",
};

export default function RankBadge({ rank, className = "" }: { rank: number; className?: string }) {
  const tone = PODIUM_TONE[rank];
  if (!tone) return <span className={`font-mono tabular-nums ${className}`}>{rank}</span>;
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-xs border font-mono text-xs font-medium tabular-nums ${tone} ${className}`}
    >
      {rank}
    </span>
  );
}
