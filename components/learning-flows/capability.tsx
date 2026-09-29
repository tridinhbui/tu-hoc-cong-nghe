import { format, intlLocale, type Dictionary, type Locale } from "@/lib/i18n";

type RevampCopy = Dictionary["revampGoals"];

/**
 * "18 bài · ~2 giờ" - công sức của một lối học, tính từ số bài thật và
 * `totalMinutes` của từng bài (lib/lesson-reading.js), không viết cứng.
 *
 * Dưới một giờ thì ghi phút; từ một giờ trở lên làm tròn tới nửa giờ. Một con
 * số giờ lẻ tới phút ("1 giờ 57 phút") hứa một độ chính xác mà ước lượng đọc
 * không có. `minutes` không có (dashboard không tải meta bài) thì chỉ ghi số bài.
 */
export function effortLabel(r: RevampCopy, locale: Locale, count: number, minutes?: number): string {
  if (minutes === undefined || minutes <= 0) return format(r.effortLessons, { count });
  if (minutes < 60) return format(r.effortMinutes, { count, minutes });
  const hours = Math.round(minutes / 30) / 2;
  return format(r.effortHours, { count, hours: hours.toLocaleString(intlLocale(locale)) });
}

/**
 * Hai dòng nói lối học này cho bạn cái gì: KỸ NĂNG (việc làm được) và OUTPUT
 * (thứ cầm được ở cuối). Nhãn mono, giá trị gần đen - đây là thông tin cốt lõi
 * của thẻ, không phải trang trí, nên không tô màu.
 */
export function CapabilityFacts({
  r,
  skill,
  output,
  inline = false,
  className = "",
}: {
  r: RevampCopy;
  skill: string;
  output: string;
  /** Trong một <button> chỉ được chứa nội dung dạng dòng, nên dùng <span> thay <dl>. */
  inline?: boolean;
  className?: string;
}) {
  const label = "pt-0.5 font-mono text-[10px] font-bold tracking-wider text-ink-faint";
  const grid = `grid grid-cols-[4.75rem_1fr] content-start gap-x-3 gap-y-1.5 text-sm ${className}`;
  if (inline) {
    return (
      <span className={grid}>
        <span className={label}>{r.skillLabel}</span>
        <span className="leading-snug text-ink-body">{skill}</span>
        <span className={label}>{r.outputLabel}</span>
        <span className="font-bold leading-snug text-ink-max">{output}</span>
      </span>
    );
  }
  return (
    <dl className={grid}>
      <dt className={label}>{r.skillLabel}</dt>
      <dd className="leading-snug text-ink-body">{skill}</dd>
      <dt className={label}>{r.outputLabel}</dt>
      <dd className="font-bold leading-snug text-ink-max">{output}</dd>
    </dl>
  );
}
