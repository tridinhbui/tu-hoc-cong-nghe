"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LoadBar, Scramble } from "@/components/ui/effects";
import { CropMarks, Stamp } from "@/components/ui/system";

export { CropMarks, Stamp };

/*
 * TRANG CHỦ - NGÔN NGỮ BIÊN TẬP. Bộ khung dùng chung cho mọi section.
 *
 * Tạp chí kỹ thuật in rô-nê-ô, không phải template SaaS. Luật chung, để mỗi
 * section một bố cục mà vẫn là một hệ:
 *
 *  1. Không bo góc, không bóng, không gradient. Cấu trúc bằng đường kẻ 1px
 *     và nét đậm 2px màu mực.
 *  2. Bảng màu giữ nguyên tông thương hiệu: mực gần đen, giấy ngà bẩn, xanh
 *     brand làm màu tín hiệu. Không thêm màu mới.
 *  3. Chữ to cắt mép có chủ ý; siêu dữ liệu bằng mono nhỏ chữ hoa.
 *  4. Mỗi section mở bằng cùng một nghi thức: số tờ, thanh nạp kiểu log gỡ
 *     lỗi, tiêu đề giải mã. Đó là nhịp "tài liệu đang được dựng" của trang.
 *  5. Mô-típ tương tác: HỒNG TÂM - toạ độ con trỏ đọc ra như bản vẽ kỹ thuật.
 */

export const PAPER = "bg-[#eeebe3] dark:bg-[#0c0d10]";
export const INK = "text-[#0d0e11] dark:text-[#eeebe3]";
export const RULE = "border-[#0d0e11] dark:border-[#eeebe3]";
/** Dải mực: tối ở cả hai chế độ, để nhịp sáng-tối của trang không đổi. */
export const BAND = "bg-[#0d0e11] text-[#eeebe3] dark:bg-[#15171c]";

/* i18n-ignore-start: định danh hệ thống, cùng một chuỗi ở mọi ngôn ngữ. */
export const ID = {
  doc: "TL-THCN/2026",
  sheet: (n: number) => `TỜ ${String(n).padStart(2, "0")}`,
  coord: (x: number, y: number) => `X${String(x).padStart(4, "0")} Y${String(y).padStart(4, "0")}`,
  os: "THCN_OS v2.6",
  pid: (n: number) => String(1200 + n * 37),
  worldCode: ["W/01", "D/02", "A/03", "S/04"],
  worldGlyph: ["</>", "Σ", "∴", "$_"],
  run: "RUN",
  idle: "IDLE",
  status: (cpu: number) => `MEM 64K · CPU ${cpu}%`,
  enc: "UTF-8 · VI",
  ok: "[ OK ]",
  ms: (n: number) => `${n}ms`,
  prompt: "$",
  path: "THCN://",
  pct: (n: number) => `${String(n).padStart(3, "0")}%`,
  sql: "SELECT ten, xp FROM bang_xep_hang WHERE tuan = 'hien_tai';",
  sqlFile: "query.sql",
  readme: "README.md",
  debuggerFile: "tri-nho.ts",
  featureId: (n: number) => `F${String(n).padStart(2, "0")}`,
  dir: (s: string) => `/${s}`,
  build: "BUILD 2026.09",
};
/* i18n-ignore-end */

export function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] ${className}`}>{children}</span>
  );
}

/** Đầu một tờ: số tờ + nhãn, thanh nạp, tiêu đề giải mã. */
export function SheetHead({
  n,
  kicker,
  title,
  loading,
  dark = false,
  size = "lg",
  className = "",
}: {
  n: number;
  kicker: string;
  title: string;
  loading: string;
  dark?: boolean;
  size?: "lg" | "xl";
  className?: string;
}) {
  const { t } = useI18n();
  const line = dark ? "border-[#eeebe3]" : RULE;
  // Chữ hoa tiếng Việt chồng dấu (Ả, Ẫ, Ệ) lên dòng trên khi dòng khít. Tiêu
  // đề ngắn giữ chữ hoa cho khối chữ đanh; câu dài để chữ thường cho dễ đọc.
  const upper = title.length <= 34;
  return (
    <div className={`min-w-0 ${className}`}>
      <div className={`flex items-center justify-between gap-4 border-b-2 ${line} pb-2`}>
        <Mono className={dark ? "text-brand-300" : "text-accent-strong"}>
          {ID.sheet(n)} — {kicker}
        </Mono>
        <Mono className="hidden opacity-50 sm:inline">{ID.doc}</Mono>
      </div>
      <LoadBar label={loading} done={t.home.v2.done} className={`border-b ${dark ? "border-white/20" : "border-black/15 dark:border-white/15"} py-2`} />
      <h2
        className={`mt-5 font-black tracking-[-0.035em] ${upper ? "uppercase leading-[1.12]" : "leading-[1.05]"} ${
          size === "xl" ? "text-[2.6rem] sm:text-7xl lg:text-[5.5rem]" : "text-[2.1rem] sm:text-5xl lg:text-6xl"
        }`}
      >
        <Scramble text={title} />
      </h2>
    </div>
  );
}

/** Hồng tâm theo con trỏ trong một vùng. */
export function useCrosshair<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    const leave = () => setPos(null);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return { ref, pos };
}

export function Crosshair({ pos }: { pos: { x: number; y: number } | null }) {
  if (!pos) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden md:block">
      <div className="absolute left-0 right-0 h-px bg-brand-600/60" style={{ top: pos.y }} />
      <div className="absolute bottom-0 top-0 w-px bg-brand-600/60" style={{ left: pos.x }} />
      <span className="absolute bg-brand-600 px-1.5 py-0.5 font-mono text-[10px] text-white" style={{ left: pos.x + 8, top: pos.y + 8 }}>
        {ID.coord(Math.round(pos.x), Math.round(pos.y))}
      </span>
    </div>
  );
}
