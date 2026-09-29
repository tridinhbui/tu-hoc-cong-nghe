"use client";

import Image from "next/image";

/**
 * Cơ Cơ - linh vật trợ lý học của app (thay Tài Tài của bản tài chính).
 *
 * Hai ảnh: `head` (mặc định) cho khung nhỏ - dưới ~48px thân và laptop chỉ
 * còn là một đốm, nên cắt lấy phần đầu cho dễ nhận ra; `full` cho chỗ đủ rộng
 * để thấy cả dáng đang gõ laptop. Cả hai nền trong suốt.
 *
 * `float` bật nhịp lơ lửng nhẹ - cho những chỗ Cơ Cơ đang "nói" (lời chào,
 * gợi ý). Tắt khi người dùng chọn giảm chuyển động.
 */
export default function CoCoAvatar({
  size = 32,
  variant = "head",
  float = false,
  className = "",
}: {
  size?: number;
  variant?: "head" | "full";
  float?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={variant === "full" ? "/images/coco/coco.png" : "/images/coco/coco-head.png"}
      /* i18n-ignore-start: tên riêng của linh vật, giống nhau ở mọi ngôn ngữ */
      alt="Cơ Cơ"
      /* i18n-ignore-end */
      width={size}
      height={size}
      className={`select-none shrink-0 object-contain ${float ? "motion-safe:animate-[coco-float_4s_ease-in-out_infinite]" : ""} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
