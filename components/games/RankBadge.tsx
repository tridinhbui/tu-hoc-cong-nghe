/**
 * Số hạng trong bảng xếp hạng. Ba hạng đầu là một ô bo tròn thay cho emoji
 * huy chương - emoji vẽ khác nhau theo hệ điều hành và đọc là trang trí rẻ
 * tiền. Từ hạng 4 trở đi chỉ là con số.
 *
 * Tông VÀNG, không phải xanh (2026-09-30): thứ hạng cao là thành tích, và
 * logic màu chung của app (globals.css) cho thành tích/phần thưởng đi vàng.
 * Hạng 1 đặc nhất, hạng 2-3 nhạt dần - con số vẫn là thứ nói thứ hạng, màu
 * chỉ nói "đây là bục vinh danh".
 */
const PODIUM_TONE: Record<number, string> = {
  1: "bg-gradient-to-b from-amber-400 to-reward text-white shadow-[0_4px_10px_-4px_rgb(227_138_6/0.8)]",
  2: "bg-reward-soft text-reward-strong ring-1 ring-inset ring-reward-line",
  3: "bg-reward-soft/60 text-reward-strong ring-1 ring-inset ring-reward-line/60",
};

export default function RankBadge({ rank, className = "" }: { rank: number; className?: string }) {
  const tone = PODIUM_TONE[rank];
  if (!tone) return <span className={`font-mono tabular-nums ${className}`}>{rank}</span>;
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-bold tabular-nums ${tone} ${className}`}
    >
      {rank}
    </span>
  );
}
