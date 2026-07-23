"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Lightbulb } from "lucide-react";
import { getRandomWisdomCard } from "@/lib/wisdom-cards";

export default function WisdomCardFlip() {
  const [card] = useState(() => getRandomWisdomCard());
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="py-2">
      <p className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2 text-center">
        Thẻ kinh nghiệm tài chính
      </p>
      <div className="mx-auto max-w-xs" style={{ perspective: 1000 }}>
        <button
          type="button"
          onClick={() => setFlipped(true)}
          disabled={flipped}
          className={`relative w-full h-40 ${flipped ? "cursor-default" : "cursor-pointer"}`}
          style={{ transformStyle: "preserve-3d" }}
          aria-label={flipped ? undefined : "Chạm để lật thẻ kinh nghiệm tài chính"}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Face-down side */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex flex-col items-center justify-center gap-2 shadow-md border border-emerald-400/50"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Sparkles className="w-7 h-7 text-white/90" />
              <p className="text-xs font-bold text-white/95 px-6 text-center leading-relaxed">
                Chạm để xem một câu kinh nghiệm tài chính
              </p>
            </div>

            {/* Revealed side */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl bg-white dark:bg-stone-900 border-2 border-emerald-200 dark:border-emerald-900 flex flex-col items-center justify-center gap-2 shadow-md px-5"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Lightbulb className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 text-center leading-relaxed">
                {card.text}
              </p>
            </div>
          </motion.div>
        </button>
      </div>
    </div>
  );
}
