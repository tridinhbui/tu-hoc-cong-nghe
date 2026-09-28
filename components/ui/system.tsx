import type { ReactNode } from "react";

/*
 * HỆ THIẾT KẾ CHUNG - lấy nguyên từ trang giới thiệu (components/home/HomePage.tsx)
 * để mọi màn hình sau cửa đăng nhập nói cùng một ngôn ngữ với nó.
 *
 * Năm luật (chép từ đầu HomePage.tsx, đó là nơi chúng được đặt ra):
 *  1. Bo góc 2-6px. Không có gì tròn trừ chấm trạng thái và ảnh đại diện.
 *  2. Viền 1px làm cấu trúc, không đổ bóng. Chiều sâu đến từ sắc độ nền:
 *     giấy ngà #fbfaf7 -> thanh tiêu đề #f3f1ec -> nền mực stone-950.
 *  3. Xanh có CHỨC NĂNG: liên kết, tab đang mở, đáp án được chọn, dữ liệu
 *     sống. Không tô xanh để trang trí.
 *  4. Mono chỉ cho siêu dữ liệu máy - đường dẫn, mã module, số trong bảng,
 *     dấu thời gian. Chữ tiếng Việt luôn đi bằng phông sans.
 *  5. Siêu dữ liệu không bịa.
 *
 * Dùng các thành phần ở đây thay vì tự dựng thẻ bo 16-28px có bóng đổ.
 */

/** Nút hành động chính: nền mực, chữ trắng, rê chuột thành xanh thương hiệu. */
export const btnPrimary =
  "group inline-flex items-center justify-center gap-2 rounded-sm bg-stone-950 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-brand-300";

/** Nút phụ: viền 1px, không nền. */
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-sm border border-stone-400 px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:border-stone-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-600 dark:hover:border-stone-200";

/** Liên kết chữ: xanh là chức năng, gạch chân khi rê chuột. */
export const textLink = "inline-flex items-center gap-1.5 text-sm font-bold text-accent-strong underline-offset-4 hover:underline";

/** Tab / bộ lọc dạng chữ: tab đang mở có gạch dưới xanh, không phải viên thuốc. */
export function tabClass(active: boolean) {
  return `-mb-px border-b-2 pb-2 text-sm font-bold transition-colors ${
    active ? "border-brand-600 text-ink-max dark:border-brand-400" : "border-transparent text-ink-muted hover:text-ink"
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

/** Ô vuông trạng thái. Vuông, không tròn - cùng hệ góc cạnh với phần còn lại. */
export function StatusDot({ tone = "brand" }: { tone?: "brand" | "muted" }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-1.5 w-1.5 rounded-[1px] ${
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
      ? "text-[1.65rem] sm:text-[2rem] lg:text-[2.25rem]"
      : size === "sm"
        ? "text-base sm:text-lg"
        : "text-xl sm:text-2xl";
  return (
    <div className={className}>
      {(code || eyebrow) && (
        <div
          className={`flex items-center justify-between gap-4 border-b pb-2 ${
            dark ? "border-white/15" : "border-line-strong"
          }`}
        >
          {code ? <Sys className={dark ? "text-stone-400" : "text-ink-muted"}>{code}</Sys> : <span />}
          {eyebrow && <span className={`eyebrow text-right ${dark ? "text-stone-300" : "text-ink-soft"}`}>{eyebrow}</span>}
        </div>
      )}
      <h2
        className={`${code || eyebrow ? "mt-3" : ""} font-black leading-[1.15] tracking-tight ${titleSize} ${
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
      className={`overflow-hidden rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900 ${className}`}
    >
      <div className="flex h-8 items-center justify-between gap-3 border-b border-stone-300 bg-[#f3f1ec] px-3 dark:border-stone-700 dark:bg-stone-950">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className="flex gap-1">
            <span className="h-2 w-2 rounded-xs bg-surface-deep" />
            <span className="h-2 w-2 rounded-xs bg-surface-deep" />
            <span className="h-2 w-2 rounded-xs bg-surface-deep" />
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

/** Mặt phẳng đơn giản khi không cần thanh tiêu đề: viền 1px, không bóng. */
export const panel = "rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900";

/** Bảng số liệu hệ thống: nhãn trái, số mono căn phải thẳng cột. */
export function StatTable({ rows, className = "" }: { rows: { label: ReactNode; value: ReactNode; id?: string }[]; className?: string }) {
  return (
    <dl className={`divide-y divide-stone-200 dark:divide-stone-800 ${className}`}>
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
