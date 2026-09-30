import type { ReactNode } from "react";

/*
 * HỆ THIẾT KẾ CHUNG - lấy từ trang chủ biên tập (components/home/v2/kit.tsx)
 * để mọi màn hình sau cửa đăng nhập nói cùng một ngôn ngữ với nó.
 *
 * Luật (chép từ kit.tsx, đó là nơi chúng được đặt ra):
 *  1. Bo nhẹ (`rounded-control` 8px, `rounded-card` 12px). Thứ bậc đến từ SẮC
 *     NỀN, chữ và một bóng mảnh ngả xanh (`shadow-card`) - không phải từ viền
 *     xám bao mọi thẻ (2026-09-30: giao diện cũ "nhạt, phẳng, trắng").
 *  2. Ba lớp nền: canvas xanh băng (`bg-page`) -> thẻ trắng (`bg-surface`) ->
 *     vùng nhấn băng (`bg-surface-raised` / `bg-accent-wash`). Giấy ngà chỉ ở
 *     trang chủ + login.
 *  3. Logic màu, một cho cả app:
 *       xanh brand = nhận diện (đang chọn, điều hướng, tiến độ, link, nút chính)
 *       coral `energy` = thử thách, thi, độ khó, đấu, việc cần làm ngay
 *       vàng `reward` = XP, vàng, chuỗi ngày, thành tích
 *     Mỗi màn chỉ MỘT-HAI điểm nhấn (`panelFocus`); phần còn lại yên lặng.
 *  4. Mono chữ hoa cho siêu dữ liệu máy; chữ tiếng Việt đi bằng sans.
 *  5. Siêu dữ liệu không bịa.
 *
 * Dùng các thành phần ở đây thay vì tự dựng thẻ bo góc có bóng đổ.
 */

/** Nút hành động chính: khối xanh có chiều sâu (dải sáng mảnh + bóng xanh),
 *  chữ hoa đậm; rê chuột nổi nhẹ lên. */
export const btnPrimary =
  "group inline-flex items-center justify-center gap-2 rounded-control bg-gradient-to-b from-brand-500 to-brand-600 px-4 py-2.5 text-[13px] font-black uppercase tracking-wide text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_6px_16px_-8px_rgb(41_97_184/0.75)] transition-[transform,box-shadow,background-color] hover:from-brand-600 hover:to-brand-700 motion-safe:hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none dark:from-brand-400 dark:to-brand-500 dark:text-[#07101f] dark:hover:from-brand-300 dark:hover:to-brand-400";

/** Nút phụ: nền thẻ, viền xanh nhạt; rê chuột thì nền băng + chữ xanh. */
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-control border border-accent-line bg-surface px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-brand-300 hover:bg-accent-wash hover:text-accent-strong disabled:cursor-not-allowed disabled:opacity-50";

/** Nút "thử thách" - coral. Chỉ cho hành động vào thi / đấu / nhận thử thách,
 *  không cho hành động thường (đó là btnPrimary). */
export const btnEnergy =
  "group inline-flex items-center justify-center gap-2 rounded-control bg-gradient-to-b from-[#f0625d] to-energy px-4 py-2.5 text-[13px] font-black uppercase tracking-wide text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_6px_16px_-8px_rgb(229_72_77/0.8)] transition-[transform,box-shadow] hover:to-energy-strong motion-safe:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#1f0b0b]";

/** Liên kết chữ: xanh là chức năng, gạch chân khi rê chuột. */
export const textLink = "inline-flex items-center gap-1.5 text-sm font-bold text-accent-strong underline-offset-4 hover:underline";

/** Tab / bộ lọc dạng chữ: tab đang mở có gạch dưới xanh, không phải viên thuốc. */
export function tabClass(active: boolean) {
  return `-mb-px border-b-2 pb-2 text-sm font-bold transition-colors ${
    active ? "border-brand-600 text-accent-strong dark:border-brand-400" : "border-transparent text-ink-muted hover:text-accent-strong"
  }`;
}

/** Nhãn máy: mono, nhỏ, chữ hoa. Chỉ dùng cho định danh, không cho câu tiếng Việt. */
export function Sys({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] ${className}`}>
      {children}
    </span>
  );
}

/** Chấm trạng thái. */
export function StatusDot({ tone = "brand" }: { tone?: "brand" | "muted" }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-1.5 w-1.5 rounded-full ${
        tone === "brand" ? "bg-brand-600 dark:bg-brand-500" : "bg-stone-400 dark:bg-stone-600"
      }`}
    />
  );
}

/**
 * Đầu một khu: mã định vị (mono) + eyebrow trên một đường kẻ 1px, rồi tiêu đề
 * đậm. `code` là định danh kiểu "THCN://APP/DASHBOARD".
 */
export function SectionHead({
  code,
  eyebrow,
  title,
  sub,
  dark = false,
  size = "md",
  className = "",
}: {
  code?: string;
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const titleSize =
    size === "lg"
      ? "text-[1.9rem] sm:text-[2.4rem] lg:text-[2.8rem]"
      : size === "sm"
        ? "text-base sm:text-lg"
        : "text-xl sm:text-2xl";
  return (
    <div className={className}>
      {(code || eyebrow) && (
        <div className="flex items-center justify-between gap-4">
          {/* Vạch xanh ngắn trước mã định vị: đầu khu nhận ra được bằng màu của
              app, thay cho đường kẻ xám chạy hết bề ngang (2026-09-30). */}
          <span className="flex items-center gap-2">
            <span aria-hidden className={`h-1 w-5 rounded-full ${dark ? "bg-brand-300" : "bg-accent"}`} />
            {code ? <Sys className={dark ? "text-brand-300" : "text-accent-strong"}>{code}</Sys> : null}
          </span>
          {eyebrow && <span className={`eyebrow text-right ${dark ? "text-stone-300" : "text-ink-soft"}`}>{eyebrow}</span>}
        </div>
      )}
      <h2
        className={`${code || eyebrow ? "mt-3" : ""} font-black leading-[1.12] tracking-[-0.03em] ${titleSize} ${
          dark ? "text-white" : "text-ink-max"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`mt-2 max-w-2xl text-sm leading-6 ${dark ? "text-stone-300" : "text-ink-soft"}`}>{sub}</p>
      )}
    </div>
  );
}

/**
 * Khung cửa sổ ứng dụng: thanh tiêu đề mono + thân. Đây là "thẻ" của hệ thống,
 * thay cho hộp bo 16-28px có bóng đổ.
 */
export function Frame({
  title,
  meta,
  metaText,
  actions,
  children,
  className = "",
  bodyClassName = "",
}: {
  /** Định danh máy trong thanh tiêu đề (mono) - tên tệp, đường dẫn. */
  title: ReactNode;
  /** Định danh máy bên phải (mono, chữ hoa) - "LIVE", "OK", dấu thời gian. */
  meta?: ReactNode;
  /** Chữ đã dịch bên phải - đi bằng sans theo luật 4. */
  metaText?: string;
  /** Nút / liên kết bên phải thanh tiêu đề. */
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-card border border-line-soft bg-surface shadow-card ${className}`}
    >
      <div className="flex h-8 items-center justify-between gap-3 bg-surface-raised px-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-brand-300 dark:bg-brand-700" />
          </span>
          <Sys className="truncate normal-case text-ink-muted">{title}</Sys>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {meta && <Sys className="text-ink-muted">{meta}</Sys>}
          {metaText && <span className="text-[11px] font-semibold text-ink-muted">{metaText}</span>}
          {actions}
        </div>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** Mặt phẳng khi không cần thanh tiêu đề: thẻ trắng nổi trên canvas băng bằng
 *  một bóng mảnh, viền gần như không thấy. */
export const panel = "rounded-card border border-line-soft bg-surface shadow-card";

/** ĐIỂM NHẤN của một màn - chỉ một hai chỗ mỗi trang (thẻ Học tiếp, câu hỏi
 *  đang làm, lựa chọn đang chọn). Nền băng chuyển nhẹ sang trắng, viền xanh. */
export const panelFocus =
  "rounded-card border border-accent-line bg-gradient-to-br from-accent-wash via-surface to-surface shadow-card-hover";

/** Viên nhãn nhỏ theo logic màu. */
export const chipAccent =
  "inline-flex items-center gap-1 rounded-full bg-accent-wash px-2 py-0.5 text-[11px] font-bold text-accent-strong";
export const chipEnergy =
  "inline-flex items-center gap-1 rounded-full bg-energy-soft px-2 py-0.5 text-[11px] font-bold text-energy-strong";
export const chipReward =
  "inline-flex items-center gap-1 rounded-full bg-reward-soft px-2 py-0.5 text-[11px] font-bold text-reward-strong";

/** Ô icon tô nhạt đứng đầu một khối - điểm màu nhỏ thay cho viền. */
export function IconTile({
  children,
  tone = "accent",
  className = "",
}: {
  children: ReactNode;
  tone?: "accent" | "energy" | "reward";
  className?: string;
}) {
  const t =
    tone === "energy"
      ? "bg-energy-soft text-energy"
      : tone === "reward"
        ? "bg-reward-soft text-reward"
        : "bg-accent-wash text-accent";
  // Cỡ mặc định chỉ khi nơi gọi không tự đặt cỡ: hai lớp `h-*` cùng có mặt thì
  // lớp nào thắng là do thứ tự Tailwind sinh CSS, không phải thứ tự trong chuỗi
  // - `h-8` truyền vào sẽ thua `h-9` mặc định và ô không nhỏ lại.
  const size = /(^|\s)h-/.test(className) ? "" : "h-9 w-9";
  return (
    <span aria-hidden className={`inline-flex ${size} shrink-0 items-center justify-center rounded-control ${t} ${className}`}>
      {children}
    </span>
  );
}

/** Thanh tiến độ: rãnh băng, phần đã đi xanh chuyển sắc nhẹ (hoặc vàng cho
 *  XP/phần thưởng). `value` 0-100. */
export function ProgressBar({
  value,
  tone = "accent",
  className = "",
  label,
}: {
  value: number;
  tone?: "accent" | "reward";
  className?: string;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  const fill =
    tone === "reward"
      ? "bg-gradient-to-r from-amber-400 to-reward"
      : "bg-gradient-to-r from-brand-500 to-sky-400 dark:from-brand-400 dark:to-sky-300";
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={label}
      className={`h-2 overflow-hidden rounded-full bg-surface-sunken ${className}`}
    >
      <div className={`h-full rounded-full ${fill} motion-safe:transition-[width] motion-safe:duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Bảng số liệu hệ thống: nhãn trái, số mono căn phải thẳng cột. */
export function StatTable({ rows, className = "" }: { rows: { label: ReactNode; value: ReactNode; id?: string }[]; className?: string }) {
  return (
    <dl className={`divide-y divide-line-soft ${className}`}>
      {rows.map((r, i) => (
        <div key={i} className="flex items-baseline justify-between gap-4 py-2">
          <dt className="flex items-baseline gap-3">
            <Sys className="text-ink-faint">{r.id ?? String(i + 1).padStart(2, "0")}</Sys>
            <span className="text-sm font-semibold text-ink-body">{r.label}</span>
          </dt>
          <dd className="font-mono text-base font-medium tabular-nums text-ink-max">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Con dấu kiểu giấy tờ hành chính - xoay nhẹ, viền kép. */
export function Stamp({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`-rotate-6 border-2 border-brand-600 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600 outline outline-1 outline-offset-2 outline-brand-600 dark:border-brand-400 dark:text-brand-400 dark:outline-brand-400 ${className}`}
    >
      {children}
    </span>
  );
}

/** Dấu cắt góc như bản in thử - bốn góc của một khung. */
export function CropMarks({ className = "border-current" }: { className?: string }) {
  const c = `pointer-events-none absolute h-3 w-3 ${className}`;
  return (
    <>
      <span aria-hidden className={`${c} -left-1.5 -top-1.5 border-l border-t`} />
      <span aria-hidden className={`${c} -right-1.5 -top-1.5 border-r border-t`} />
      <span aria-hidden className={`${c} -bottom-1.5 -left-1.5 border-b border-l`} />
      <span aria-hidden className={`${c} -bottom-1.5 -right-1.5 border-b border-r`} />
    </>
  );
}

/** Trạng thái một phương án quiz. `dim` = đã nộp, phương án này không liên quan. */
export type QuizOptionState = "idle" | "selected" | "correct" | "wrong" | "dim";

/** Phương án trả lời ở màn luyện (/kiem-tra: Daily Signal và phiên luyện).
 *
 *  Không khung sẵn: nền xám rất nhạt, viền 2px trong suốt giữ chỗ để lúc chọn
 *  không nhảy bố cục. Rê chuột là nền xanh nhạt + dịch nhẹ sang phải, nhấn là
 *  lún xuống - cảm giác bấm được, không cần thêm thẻ. Đúng/sai chạy một nhịp
 *  (thcn-pop / thcn-shake trong globals.css) rồi đứng yên. `animate` = false
 *  khi trạng thái được khôi phục lúc tải trang - lắc một câu trả lời từ sáng
 *  nay ngay khi mở trang là phản hồi cho một việc người học không vừa làm. */
export function quizOption(state: QuizOptionState, animate = true): string {
  const base =
    "group/opt w-full text-left rounded-control border-2 transition-[background-color,border-color,color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface";
  switch (state) {
    case "selected":
      return `${base} border-accent bg-accent-soft text-ink-max cursor-pointer active:scale-[0.99]`;
    case "correct":
      return `${base} ${animate ? "thcn-pop" : ""} border-cyan-600 bg-cyan-50 text-ink-max dark:border-cyan-400 dark:bg-cyan-950/40`;
    case "wrong":
      return `${base} ${animate ? "thcn-shake" : ""} border-rose-500 bg-rose-50 text-rose-950 dark:border-rose-400 dark:bg-rose-950/40 dark:text-rose-100`;
    case "dim":
      return `${base} border-transparent bg-surface-raised/40 text-ink-muted opacity-60`;
    default:
      return `${base} border-transparent bg-surface-raised text-ink-body cursor-pointer hover:bg-accent-soft hover:text-ink-max motion-safe:hover:translate-x-0.5 active:scale-[0.99]`;
  }
}

/** Ô phím (A-D) đầu mỗi phương án - đổi màu theo cùng trạng thái. */
export function quizKey(state: QuizOptionState): string {
  const base = "flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold transition-colors";
  switch (state) {
    case "selected":
      return `${base} bg-brand-600 text-white dark:bg-brand-500`;
    case "correct":
      return `${base} bg-cyan-600 text-white dark:bg-cyan-500 dark:text-cyan-950`;
    case "wrong":
      return `${base} bg-rose-500 text-white`;
    case "dim":
      return `${base} bg-surface-sunken text-ink-faint`;
    default:
      return `${base} bg-surface text-ink-muted group-hover/opt:bg-brand-100 group-hover/opt:text-brand-700 dark:group-hover/opt:bg-brand-900 dark:group-hover/opt:text-brand-200`;
  }
}
