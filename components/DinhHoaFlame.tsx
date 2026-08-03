"use client";

import { motion, useReducedMotion } from "framer-motion";

// Ngọn lửa đinh hoả (丁火) - lửa đèn, lửa nến. Không phải lửa trại.
//
// Hình dáng theo đúng nghĩa đó: thân thon và cao chứ không phình tròn, lõi
// sáng gần như đứng yên, chỉ có lớp ngoài lay động. Đinh hoả cháy bền chứ
// không bùng - nên biên độ mọi chuyển động ở đây đều nhỏ, và ba lớp lay lệch
// pha nhau để ngọn lửa "thở" thay vì "nhấp nháy".
//
// `intensity` (0 → 1) nối vào warmth của lời nhắn: người học càng nguội thì
// quầng sáng càng mạnh và tàn lửa càng nhiều.

export default function DinhHoaFlame({
  size = 132,
  intensity = 0.6,
}: {
  size?: number;
  /** 0 → 1. Cùng thang với warmth trong lib/daily-motivation.ts. */
  intensity?: number;
}) {
  const reduced = useReducedMotion();

  // Tàn lửa bay lên. Vị trí và nhịp cố định theo chỉ số, không random - nếu
  // random thì mỗi lần render lại một khác và React sẽ nhấp nháy khi hydrate.
  const embers = [
    { x: 50, delay: 0, drift: -7, duration: 3.6 },
    { x: 62, delay: 1.2, drift: 6, duration: 4.2 },
    { x: 40, delay: 2.1, drift: -4, duration: 3.9 },
    { x: 56, delay: 2.9, drift: 9, duration: 4.6 },
  ];

  return (
    <div
      className="relative"
      style={{ width: size, height: size * 1.35 }}
      aria-hidden
    >
      {/* Quầng sáng - đây mới là thứ chiếu sáng cả card, nên nó nằm dưới cùng
          và lớn hơn ngọn lửa khá nhiều. */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          width: size * 1.7,
          height: size * 1.7,
          background: `radial-gradient(circle, rgba(251,146,60,${0.3 + intensity * 0.4}) 0%, rgba(249,115,22,${0.12 + intensity * 0.2}) 42%, rgba(249,115,22,0) 72%)`,
        }}
        animate={reduced ? undefined : { scale: [1, 1.09, 1.03, 1], opacity: [0.85, 1, 0.9, 0.85] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        viewBox="0 0 100 140"
        width={size}
        height={size * 1.35}
        className="relative"
      >
        <defs>
          <linearGradient id="dhOuter" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#f97316" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <linearGradient id="dhInner" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <radialGradient id="dhCore" cx="50%" cy="72%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0.75" />
          </radialGradient>
        </defs>

        {/* Lớp ngoài - lay nhiều nhất, thân thon vút lên */}
        <motion.path
          d="M50 6 C 60 34, 82 50, 82 80 C 82 106, 68 126, 50 126 C 32 126, 18 106, 18 80 C 18 50, 40 34, 50 6 Z"
          fill="url(#dhOuter)"
          style={{ originX: "50px", originY: "126px" }}
          animate={
            reduced
              ? undefined
              : { scaleY: [1, 1.055, 0.985, 1], scaleX: [1, 0.965, 1.025, 1], rotate: [0, 1.1, -0.9, 0] }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Lớp giữa - lệch pha với lớp ngoài, biên độ nhỏ hơn */}
        <motion.path
          d="M50 42 C 57 62, 69 72, 69 90 C 69 108, 60 121, 50 121 C 40 121, 31 108, 31 90 C 31 72, 43 62, 50 42 Z"
          fill="url(#dhInner)"
          style={{ originX: "50px", originY: "121px" }}
          animate={
            reduced
              ? undefined
              : { scaleY: [1, 0.97, 1.04, 1], scaleX: [1, 1.03, 0.975, 1], rotate: [0, -0.8, 0.7, 0] }
          }
          transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Lõi - gần như đứng yên. Đây là phần "đinh" của đinh hoả: cái sáng
            bên trong không lay theo gió, chỉ đậm nhạt rất nhẹ. */}
        <motion.ellipse
          cx="50"
          cy="102"
          rx="10"
          ry="15"
          fill="url(#dhCore)"
          animate={reduced ? undefined : { opacity: [0.9, 1, 0.94, 0.9] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {!reduced &&
          embers.map((ember, i) => (
            <motion.circle
              key={i}
              cx={ember.x}
              r={1.6}
              fill="#fdba74"
              initial={{ cy: 104, opacity: 0 }}
              animate={{
                cy: [104, 34],
                cx: [ember.x, ember.x + ember.drift],
                opacity: [0, 0.7 * (0.4 + intensity * 0.6), 0],
              }}
              transition={{
                duration: ember.duration,
                repeat: Infinity,
                delay: ember.delay,
                ease: "easeOut",
              }}
            />
          ))}
      </svg>
    </div>
  );
}
