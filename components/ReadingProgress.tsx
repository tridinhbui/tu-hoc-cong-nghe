"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReadingProgressProps {
  progress: number; // 0-100
  onMilestone?: (milestone: number) => void;
}

export default function ReadingProgress({ progress, onMilestone }: ReadingProgressProps) {
  const [prevMilestone, setPrevMilestone] = useState(0);
  const [celebratingMilestone, setCelebratingMilestone] = useState<number | null>(null);

  const milestones = [25, 50, 75, 100];

  useEffect(() => {
    const currentMilestone = milestones.find((m) => progress >= m && m > prevMilestone);

    if (currentMilestone) {
      setCelebratingMilestone(currentMilestone);
      setPrevMilestone(currentMilestone);
      onMilestone?.(currentMilestone);

      const timer = setTimeout(() => setCelebratingMilestone(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [progress, prevMilestone, onMilestone]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Progress Bar (Vertical) */}
      <div className="flex items-end gap-3 h-48">
        {/* Main progress bar */}
        <div className="relative w-8 h-full bg-stone-100 rounded-full overflow-hidden border-2 border-stone-200">
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-full"
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Milestone markers */}
          {milestones.map((milestone) => (
            <div
              key={milestone}
              className="absolute left-0 right-0 border-t border-dashed border-stone-300 h-0"
              style={{ bottom: `${milestone}%` }}
            >
              <span className="absolute -right-12 text-xs font-bold text-stone-500 top-1/2 -translate-y-1/2">
                {milestone}%
              </span>
            </div>
          ))}
        </div>

        {/* Progress text */}
        <div className="text-center">
          <p className="text-3xl font-bold text-indigo-600">{progress}%</p>
          <p className="text-xs text-stone-500 mt-1">Hoàn thành</p>
        </div>
      </div>

      {/* Celebration animation for milestones */}
      <AnimatePresence>
        {celebratingMilestone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-xl px-6 py-4 text-center"
          >
            <p className="text-2xl mb-1">🎉</p>
            <p className="font-bold text-emerald-900">
              Chúc mừng! Bạn đã đọc {celebratingMilestone}%
            </p>
            <p className="text-xs text-emerald-700 mt-1">
              Bạn đang học tập tuyệt vời — hãy tiếp tục!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
