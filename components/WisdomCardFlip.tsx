"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Lightbulb } from "lucide-react";
import { getWisdomCardForScore, selectWisdomTone } from "@/lib/wisdom-cards";

/** Nhãn và màu mặt úp đổi theo giọng, để người học biết mình sắp lật ra gì. */
const TONE_STYLE = {
  celebrate: {
    label: "Thẻ ghi nhận",
    prompt: "Chạm để nhận lời chúc mừng",
    face: "from-amber-400 to-orange-500 border-amber-300/50",
    revealBorder: "border-amber-200 dark:border-amber-900",
    icon: "text-amber-500",
  },
  encourage: {
    label: "Thẻ tiếp sức",
    prompt: "Chạm để xem một lời nhắn",
    face: "from-orange-500 to-rose-600 border-orange-400/50",
    revealBorder: "border-orange-200 dark:border-orange-900",
    icon: "text-orange-500",
  },
  steady: {
    label: "Thẻ kinh nghiệm tài chính",
    prompt: "Chạm để xem một câu kinh nghiệm tài chính",
    face: "from-emerald-500 to-teal-600 border-emerald-400/50",
    revealBorder: "border-emerald-200 dark:border-emerald-900",
    icon: "text-emerald-500",
  },
} as const;

export default function WisdomCardFlip({
  score = 0,
  total = 0,
}: {
  /** Kết quả bài quiz vừa xong. Bỏ trống thì thẻ về đúng hành vi cũ. */
  score?: number;
  total?: number;
}) {
  const [card] = useState(() => getWisdomCardForScore(score, total));
  const [flipped, setFlipped] = useState(false);
  const style = TONE_STYLE[selectWisdomTone(score, total)];

  return (
    <div className="py-2">
      <p className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2 text-center">
        {style.label}
      </p>
      <div className="mx-auto max-w-xs" style={{ perspective: 1000 }}>
        <button
          type="button"
          onClick={() => setFlipped(true)}
          disabled={flipped}
          className={`relative w-full h-40 ${flipped ? "cursor-default" : "cursor-pointer"}`}
          style={{ transformStyle: "preserve-3d" }}
          aria-label={flipped ? undefined : `Chạm để lật ${style.label.toLowerCase()}`}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Face-down side */}
            <div
              className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${style.face} flex flex-col items-center justify-center gap-2 shadow-md border`}
              style={{ backfaceVisibility: "hidden" }}
            >
              <Sparkles className="w-7 h-7 text-white/90" />
              <p className="text-xs font-bold text-white/95 px-6 text-center leading-relaxed">
                {style.prompt}
              </p>
            </div>

            {/* Revealed side */}
            <div
              className={`absolute inset-0 w-full h-full rounded-2xl bg-white dark:bg-stone-900 border-2 ${style.revealBorder} flex flex-col items-center justify-center gap-2 shadow-md px-5`}
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Lightbulb className={`w-5 h-5 ${style.icon} flex-shrink-0`} />
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 text-center leading-relaxed">
                {card.text}
              </p>
            </div>
          </motion.div>
        </button>
      </div>

      {/* Chỉ hiện sau khi đã lật - trước đó nó cạnh tranh sự chú ý với chính
          việc lật thẻ, và dẫn người ta đi khỏi trang trước khi đọc được gì. */}
      {flipped && (
        <p className="mt-3 text-center">
          <Link
            href="/loi-nhan"
            className="text-[11px] font-bold text-orange-600 hover:underline dark:text-orange-400"
          >
            Ghé góc yên tĩnh một phút ›
          </Link>
        </p>
      )}
    </div>
  );
}
