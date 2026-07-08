"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReadingProgressProps {
  progress: number; // 0-100
  onMilestone?: (milestone: number) => void;
}

const CHECKPOINTS = [25, 50, 75, 100];

export default function ReadingProgress({ progress, onMilestone }: ReadingProgressProps) {
  const [celebratingMilestone, setCelebratingMilestone] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const previousMilestoneRef = useRef(0);

  useEffect(() => {
    const currentMilestone = CHECKPOINTS.find((m) => progress >= m && m > previousMilestoneRef.current);

    if (!currentMilestone) return;

    const timeoutId = window.setTimeout(() => {
      setCelebratingMilestone(currentMilestone);
      onMilestone?.(currentMilestone);
    }, 0);

    previousMilestoneRef.current = currentMilestone;

    return () => window.clearTimeout(timeoutId);
  }, [progress, onMilestone]);

  useEffect(() => {
    if (celebratingMilestone === null) return;

    const timer = window.setTimeout(() => setCelebratingMilestone(null), 3000);
    return () => window.clearTimeout(timer);
  }, [celebratingMilestone]);

  // Auto-collapse when not near milestones (within 5% of a checkpoint)
  useEffect(() => {
    const nearMilestone = CHECKPOINTS.some(cp => Math.abs(progress - cp) <= 5);
    setIsCollapsed(!nearMilestone);
  }, [progress]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Collapsed state - small indicator */}
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="relative w-6 h-20 bg-stone-100 rounded-full overflow-hidden border-2 border-stone-300 hover:border-stone-400 transition-colors cursor-pointer group"
          title="Mở thanh tiến độ"
        >
          {/* Filled progress */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900 to-stone-700 rounded-full"
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          {/* Small runner */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 text-xs"
            animate={{ bottom: `${Math.min(progress, 95)}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            🏃
          </motion.div>
          {/* Progress percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-black text-white drop-shadow-md">{progress}%</span>
          </div>
        </button>
      ) : (
        <>
          {/* Finish flag at top */}
          <div className={`text-xl transition-opacity ${progress >= 100 ? "opacity-100" : "opacity-30"}`}>
            🏁
          </div>

          {/* Race track (vertical) */}
          <div className="relative w-10 h-72 bg-stone-100 rounded-full overflow-hidden border-2 border-stone-300">
            {/* Lane dashes down the middle, like a race track */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 flex flex-col justify-between py-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="w-0.5 h-3 bg-white/70 mx-auto" />
              ))}
            </div>

            {/* Filled progress (bottom to top, black) */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900 to-stone-700 rounded-full"
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Checkpoint flags */}
            {CHECKPOINTS.map((cp) => (
              <div
                key={cp}
                className="absolute left-0 right-0 flex items-center justify-center"
                style={{ bottom: `${cp}%`, transform: "translateY(50%)" }}
              >
                <div
                  className={`w-full border-t-2 border-dashed ${
                    progress >= cp ? "border-white/60" : "border-stone-400/60"
                  }`}
                />
                <span
                  className={`absolute -right-8 text-[10px] font-black ${
                    progress >= cp ? "text-stone-900" : "text-stone-500"
                  }`}
                >
                  {cp === 100 ? "🏁" : `${cp}%`}
                </span>
              </div>
            ))}

            {/* Runner marker at current position */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 text-base"
              animate={{ bottom: `${Math.min(progress, 97)}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              🏃
            </motion.div>
          </div>

          {/* Progress text */}
          <div className="text-center">
            <p className="text-2xl font-black text-stone-900">{progress}%</p>
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wide">Đang đọc</p>
          </div>

          {/* Collapse button */}
          <button
            onClick={() => setIsCollapsed(true)}
            className="text-[10px] text-stone-500 hover:text-stone-900 font-bold uppercase tracking-wide transition-colors"
            title="Đóng thanh tiến độ"
          >
            Đóng
          </button>
        </>
      )}

      {/* Celebration animation for milestones */}
      <AnimatePresence>
        {celebratingMilestone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="fixed left-1/2 top-1/4 -translate-x-1/2 z-50 bg-stone-900 text-white rounded-xl px-6 py-4 text-center shadow-2xl"
          >
            <p className="text-2xl mb-1">{celebratingMilestone === 100 ? "🏁" : "🎉"}</p>
            <p className="font-bold">
              {celebratingMilestone === 100
                ? "Hoàn thành chặng đua!"
                : `Chúc mừng! Bạn đã đọc ${celebratingMilestone}%`}
            </p>
            <p className="text-xs text-stone-300 mt-1">Hãy tiếp tục - bạn đang làm rất tốt!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
