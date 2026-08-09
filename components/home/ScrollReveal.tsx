"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Generic scroll-triggered reveal wrapper - fades/slides a section in once
// it scrolls into view, `once: true` so it doesn't re-trigger every time the
// visitor scrolls past it again. Centralized here so every landing-page
// section animates with the same timing instead of hand-tuning each one.
//
// Với `prefers-reduced-motion`, nội dung hiện ngay ở opacity 1 chứ không phải
// chạy cùng hiệu ứng với duration ngắn hơn: cái được yêu cầu tắt là chuyển
// động, và một khối chữ mờ dần vẫn là chuyển động. Đây cũng là hàng rào cho
// trường hợp IntersectionObserver không kịp kích hoạt - khi đó `initial` giữ
// nguyên opacity 0 và cả mục biến mất, chứ không chỉ vào chậm.
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
