"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { getWisdomCardForScore, selectWisdomTone } from "@/lib/wisdom-cards";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/** Mặt úp đổi theo giọng, để người học biết mình sắp lật ra gì. Bản trước
 *  dùng ba dải gradient cam/hồng/xanh; giờ cả ba là cùng một mặt mực, và giọng
 *  được nói bằng NHÃN ở trên thẻ (đã đổi theo giọng) thay vì bằng màu. Nhãn
 *  và lời mời chạm đổi theo ngôn ngữ nên lấy từ dictionary bằng toneStyle(t). */
const TONE_VISUAL = {
  celebrate: { icon: "text-ink-soft" },
  encourage: { icon: "text-ink-soft" },
  steady: { icon: "text-ink-soft" },
} as const;

function toneStyle(t: Dictionary, tone: keyof typeof TONE_VISUAL) {
  return { ...TONE_VISUAL[tone], ...t.miscUi.wisdomCardFlip.tones[tone] };
}

export default function WisdomCardFlip({
  score = 0,
  total = 0,
}: {
  /** Kết quả bài quiz vừa xong. Bỏ trống thì thẻ về đúng hành vi cũ. */
  score?: number;
  total?: number;
}) {
  const { t } = useI18n();
  const [card] = useState(() => getWisdomCardForScore(score, total));
  const [flipped, setFlipped] = useState(false);
  const style = toneStyle(t, selectWisdomTone(score, total));

  return (
    <div className="py-2">
      <p className="eyebrow text-ink-muted mb-2 text-center">
        {style.label}
      </p>
      <div className="mx-auto max-w-xs" style={{ perspective: 1000 }}>
        <button
          type="button"
          onClick={() => setFlipped(true)}
          disabled={flipped}
          className={`relative w-full h-40 ${flipped ? "cursor-default" : "cursor-pointer"}`}
          style={{ transformStyle: "preserve-3d" }}
          aria-label={flipped ? undefined : format(t.miscUi.wisdomCardFlip.flipAriaLabel, { label: style.label.toLowerCase() })}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Face-down side */}
            <div
              className="absolute inset-0 w-full h-full rounded-md border border-stone-800 bg-stone-950 flex flex-col items-center justify-center gap-2 dark:border-stone-700"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Lightbulb className="w-6 h-6 text-stone-400" />
              <p className="text-xs font-bold text-white px-6 text-center leading-relaxed">
                {style.prompt}
              </p>
            </div>

            {/* Revealed side */}
            <div
              className="absolute inset-0 w-full h-full rounded-md border border-line-strong bg-white dark:bg-stone-900 flex flex-col items-center justify-center gap-2 px-5"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Lightbulb className={`w-5 h-5 ${style.icon} flex-shrink-0`} />
              <p className="text-sm font-semibold text-ink-heading text-center leading-relaxed">
                {t.wisdomCards[card.id] ?? card.text}
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
            className="text-[11px] font-bold text-accent-strong underline-offset-4 hover:underline"
          >
            {t.miscUi.wisdomCardFlip.visitQuietCorner}
          </Link>
        </p>
      )}
    </div>
  );
}
