/**
 * Số hạng trong bảng xếp hạng. Ba hạng đầu là một chấm tròn tô màu kim loại
 * (vàng, bạc, đồng) thay cho emoji huy chương - emoji vẽ khác nhau theo hệ
 * điều hành và đọc là trang trí rẻ tiền. Từ hạng 4 trở đi chỉ là con số.
 */
const PODIUM_TONE: Record<number, string> = {
  1: "bg-amber-100 text-amber-800 ring-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-800",
  2: "bg-stone-100 text-stone-700 ring-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:ring-stone-600",
  3: "bg-orange-100 text-orange-800 ring-orange-300 dark:bg-orange-950/50 dark:text-orange-300 dark:ring-orange-800",
};

export default function RankBadge({ rank, className = "" }: { rank: number; className?: string }) {
  const tone = PODIUM_TONE[rank];
  if (!tone) return <span className={className}>{rank}</span>;
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-black tabular-nums ring-1 ${tone} ${className}`}
    >
      {rank}
    </span>
  );
}
