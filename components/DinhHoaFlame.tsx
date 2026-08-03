"use client";

import { motion, useReducedMotion } from "framer-motion";

// Ngọn lửa đinh hoả (丁火) - lửa đèn, lửa nến. Không phải lửa trại.
//
// Hình dáng theo đúng nghĩa đó: thân thon và cao chứ không phình tròn, lõi
// sáng gần như đứng yên, chỉ có lớp ngoài lay động. Đinh hoả cháy bền chứ
// không bùng - nên biên độ mọi chuyển động ở đây đều nhỏ.
//
// Yên tĩnh ở đây đến từ hai thứ, không phải từ việc bớt chuyển động:
//
//   1. Không lớp nào lặp cùng nhịp với lớp nào. Các chu kỳ được chọn lệch
//      nhau và không chia hết cho nhau (2.3 / 3.2 / 4.4 / 5.7 / 6.9 / 9.4),
//      nên toàn cảnh phải rất lâu mới trở lại đúng một trạng thái cũ. Mắt
//      không bắt được điểm lặp thì chuyển động đọc ra là "thở" chứ không
//      phải "chạy vòng".
//   2. Ngọn lửa có chỗ đứng. Bấc, vũng sáng hắt xuống mặt bàn và lớp hơi
//      nóng phía trên cho nó một trên - dưới; thiếu ba thứ đó thì nó chỉ là
//      một hình cam trôi giữa khoảng không.
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

  // Vị trí và nhịp cố định theo chỉ số, không random - nếu random thì mỗi lần
  // render lại một khác và React sẽ nhấp nháy khi hydrate.
  const embers = [
    { x: 50, delay: 0, drift: -7, duration: 5.6, rise: 96 },
    { x: 62, delay: 1.7, drift: 6, duration: 6.4, rise: 108 },
    { x: 40, delay: 3.1, drift: -4, duration: 5.9, rise: 88 },
    { x: 56, delay: 4.4, drift: 9, duration: 7.1, rise: 112 },
    { x: 45, delay: 6.2, drift: -9, duration: 6.7, rise: 100 },
  ];

  // Bụi sáng lơ lửng trong quầng lửa. Chậm hơn tàn lửa nhiều lần và gần như
  // không lên cao - chúng chỉ trôi ngang, để mắt có chỗ nghỉ giữa hai lần
  // tàn lửa bay qua.
  const motes = [
    { x: 24, y: 74, drift: 5, duration: 13.5, delay: 0 },
    { x: 78, y: 92, drift: -6, duration: 16.2, delay: 2.4 },
    { x: 30, y: 108, drift: 4, duration: 14.8, delay: 5.1 },
    { x: 72, y: 62, drift: -4, duration: 17.6, delay: 7.9 },
  ];

  const ease = [0.4, 0, 0.2, 1] as const;

  return (
    <div className="relative" style={{ width: size, height: size * 1.6 }} aria-hidden>
      {/* Quầng ngoài cùng - lớn, rất mờ, nhịp chậm nhất trong toàn bộ khối.
          Đây là thứ làm cả card ấm lên chứ không phải bản thân ngọn lửa. */}
      <motion.div
        className="absolute left-1/2 rounded-full blur-3xl"
        style={{
          width: size * 2.1,
          height: size * 2.1,
          top: "42%",
          x: "-50%",
          y: "-50%",
          background: `radial-gradient(circle, rgba(251,146,60,${0.16 + intensity * 0.26}) 0%, rgba(234,88,12,${0.07 + intensity * 0.12}) 45%, rgba(249,115,22,0) 74%)`,
        }}
        animate={reduced ? undefined : { scale: [1, 1.07, 1.02, 1], opacity: [0.8, 1, 0.88, 0.8] }}
        transition={{ duration: 9.4, repeat: Infinity, ease }}
      />

      {/* Quầng trong - nhỏ hơn, đậm hơn, lệch pha hẳn với quầng ngoài để hai
          lớp không bao giờ nở cùng lúc. */}
      <motion.div
        className="absolute left-1/2 rounded-full blur-2xl"
        style={{
          width: size * 1.25,
          height: size * 1.25,
          top: "46%",
          x: "-50%",
          y: "-50%",
          background: `radial-gradient(circle, rgba(254,215,170,${0.3 + intensity * 0.34}) 0%, rgba(249,115,22,${0.14 + intensity * 0.2}) 48%, rgba(249,115,22,0) 76%)`,
        }}
        animate={reduced ? undefined : { scale: [1, 1.05, 0.98, 1], opacity: [0.9, 1, 0.85, 0.9] }}
        transition={{ duration: 5.7, repeat: Infinity, ease }}
      />

      <svg viewBox="0 0 100 160" width={size} height={size * 1.6} className="relative">
        <defs>
          <linearGradient id="dhOuter" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.5" />
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
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0.7" />
          </radialGradient>
          {/* Vũng sáng hắt xuống mặt bàn - rộng và nhoè, tắt dần ra hai bên. */}
          <radialGradient id="dhPool" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fdba74" stopOpacity={0.5 + intensity * 0.28} />
            <stop offset="45%" stopColor="#f97316" stopOpacity={0.16 + intensity * 0.14} />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="dhWick" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#292524" />
          </linearGradient>
          {/* Hơi nóng phải nhoè hẳn. Không có bộ lọc này thì ba vệt ở trên
              đỉnh đọc ra là hai mảng xám có viền - một lỗi hiển thị, chứ
              không phải luồng khí. */}
          <filter id="dhHeat" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Vũng sáng dưới chân. Nở theo nhịp riêng, chậm hơn thân lửa, nên khi
            lửa lay thì ánh hắt đi sau một nhịp - đúng như ngoài đời. */}
        <motion.ellipse
          cx="50"
          cy="140"
          rx="42"
          ry="9"
          fill="url(#dhPool)"
          animate={reduced ? undefined : { scaleX: [1, 1.08, 0.97, 1], opacity: [0.75, 0.95, 0.82, 0.75] }}
          style={{ originX: "50px", originY: "140px" }}
          transition={{ duration: 6.9, repeat: Infinity, ease }}
        />

        {/* Bấc đèn - nhỏ, hơi cong, cho ngọn lửa một điểm bám. */}
        <path
          d="M49.2 141 C 49.2 134, 48.4 130, 50 126 C 51.4 130, 50.8 134, 50.8 141 Z"
          fill="url(#dhWick)"
        />

        {/* Lớp ngoài - lay nhiều nhất, thân thon vút lên */}
        <motion.path
          d="M50 14 C 60 42, 82 58, 82 88 C 82 114, 68 132, 50 132 C 32 132, 18 114, 18 88 C 18 58, 40 42, 50 14 Z"
          fill="url(#dhOuter)"
          style={{ originX: "50px", originY: "132px" }}
          animate={
            reduced
              ? undefined
              : { scaleY: [1, 1.055, 0.985, 1], scaleX: [1, 0.965, 1.025, 1], rotate: [0, 1.1, -0.9, 0] }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease }}
        />

        {/* Lớp giữa - lệch pha với lớp ngoài, biên độ nhỏ hơn */}
        <motion.path
          d="M50 50 C 57 70, 69 80, 69 98 C 69 116, 60 128, 50 128 C 40 128, 31 116, 31 98 C 31 80, 43 70, 50 50 Z"
          fill="url(#dhInner)"
          style={{ originX: "50px", originY: "128px" }}
          animate={
            reduced
              ? undefined
              : { scaleY: [1, 0.97, 1.04, 1], scaleX: [1, 1.03, 0.975, 1], rotate: [0, -0.8, 0.7, 0] }
          }
          transition={{ duration: 2.3, repeat: Infinity, ease }}
        />

        {/* Lõi - gần như đứng yên. Đây là phần "đinh" của đinh hoả: cái sáng
            bên trong không lay theo gió, chỉ đậm nhạt rất nhẹ. */}
        <motion.ellipse
          cx="50"
          cy="110"
          rx="10"
          ry="15"
          fill="url(#dhCore)"
          animate={reduced ? undefined : { opacity: [0.9, 1, 0.94, 0.9] }}
          transition={{ duration: 2.8, repeat: Infinity, ease }}
        />

        {!reduced && (
          <>
            {/* Hơi nóng bốc lên trên đỉnh lửa: ba vệt rất mờ, giãn ra và tan
                dần. Không nhìn thẳng thấy được, nhưng bỏ đi thì phía trên
                ngọn lửa trống trải hẳn. */}
            {[
              { x: 50, delay: 0, duration: 6.1 },
              { x: 44, delay: 2.2, duration: 7.3 },
              { x: 56, delay: 4.1, duration: 6.7 },
            ].map((h, i) => (
              <motion.ellipse
                key={`heat-${i}`}
                cx={h.x}
                rx="6"
                ry="9"
                fill="#fed7aa"
                filter="url(#dhHeat)"
                initial={{ cy: 26, opacity: 0 }}
                animate={{ cy: [26, 0], opacity: [0, 0.16, 0], scale: [0.6, 1.35] }}
                style={{ originX: `${h.x}px`, originY: "13px" }}
                transition={{ duration: h.duration, repeat: Infinity, delay: h.delay, ease: "easeOut" }}
              />
            ))}

            {motes.map((m, i) => (
              <motion.circle
                key={`mote-${i}`}
                r={0.9}
                fill="#fed7aa"
                initial={{ cx: m.x, cy: m.y, opacity: 0 }}
                animate={{
                  cx: [m.x, m.x + m.drift, m.x],
                  cy: [m.y, m.y - 6, m.y],
                  opacity: [0, 0.34 * (0.5 + intensity * 0.5), 0],
                }}
                transition={{ duration: m.duration, repeat: Infinity, delay: m.delay, ease }}
              />
            ))}

            {embers.map((ember, i) => (
              <motion.circle
                key={`ember-${i}`}
                r={1.5}
                fill="#fdba74"
                initial={{ cx: ember.x, cy: 112, opacity: 0 }}
                animate={{
                  cy: [112, 112 - ember.rise],
                  // Lượn hai nhịp thay vì trôi thẳng một đường - tàn lửa thật
                  // bị dòng khí đẩy qua lại chứ không bay theo đường kẻ.
                  cx: [ember.x, ember.x + ember.drift, ember.x + ember.drift * 0.35],
                  opacity: [0, 0.72 * (0.4 + intensity * 0.6), 0],
                  scale: [1, 0.55],
                }}
                transition={{
                  duration: ember.duration,
                  repeat: Infinity,
                  delay: ember.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}
