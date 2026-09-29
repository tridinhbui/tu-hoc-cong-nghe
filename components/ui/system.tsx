import type { ReactNode } from "react";

/*
 * HỆ THIẾT KẾ CHUNG - lấy từ trang chủ biên tập (components/home/v2/kit.tsx)
 * để mọi màn hình sau cửa đăng nhập nói cùng một ngôn ngữ với nó.
 *
 * Luật (chép từ kit.tsx, đó là nơi chúng được đặt ra):
 *  1. Không bo góc, không bóng, không gradient. Cấu trúc bằng nét mực 1-2px
 *     (`border-line-strong` giờ LÀ màu mực).
 *  2. Trong app nền TRẮNG 100% (`bg-page` = `bg-surface` = trắng) -> thanh tiêu đề
 *     (`bg-surface-raised`) -> dải mực (`bg-surface-invert`). Giấy ngà chỉ ở trang chủ + login.
 *  3. Xanh brand là màu tín hiệu: nút chính, tab đang mở, dữ liệu sống.
 *  4. Mono chữ hoa cho siêu dữ liệu máy; chữ tiếng Việt đi bằng sans.
 *  5. Siêu dữ liệu không bịa.
 *
 * Dùng các thành phần ở đây thay vì tự dựng thẻ bo góc có bóng đổ.
 */

/** Nút hành động chính: khối xanh, chữ hoa đậm, rê chuột thành mực. */
export const btnPrimary =
  "group inline-flex items-center justify-center gap-2 bg-brand-600 px-4 py-2.5 text-[13px] font-black uppercase tracking-wide text-white transition-colors hover:bg-[#0d0e11] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-brand-400 dark:hover:text-[#0d0e11]";

/** Nút phụ: viền 1px, không nền. */
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 border-2 border-line-strong px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-surface-invert hover:text-ink-invert disabled:cursor-not-allowed disabled:opacity-50";

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
      ? "text-[1.9rem] sm:text-[2.4rem] lg:text-[2.8rem]"
      : size === "sm"
        ? "text-base sm:text-lg"
        : "text-xl sm:text-2xl";
  return (
    <div className={className}>
      {(code || eyebrow) && (
        <div
          className={`flex items-center justify-between gap-4 border-b-2 pb-2 ${
            dark ? "border-white/40" : "border-line-strong"
          }`}
        >
          {code ? <Sys className={dark ? "text-brand-300" : "text-accent-strong"}>{code}</Sys> : <span />}
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
      className={`overflow-hidden border-2 border-line-strong bg-surface ${className}`}
    >
      <div className="flex h-8 items-center justify-between gap-3 border-b-2 border-line-strong bg-surface-raised px-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className="flex gap-1">
            <span className="h-2 w-2 border border-line-strong" />
            <span className="h-2 w-2 border border-line-strong" />
            <span className="h-2 w-2 bg-surface-invert" />
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
export const panel = "border border-line-strong bg-surface";

/** Bảng số liệu hệ thống: nhãn trái, số mono căn phải thẳng cột. */
export function StatTable({ rows, className = "" }: { rows: { label: ReactNode; value: ReactNode; id?: string }[]; className?: string }) {
  return (
    <dl className={`divide-y divide-line ${className}`}>
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
