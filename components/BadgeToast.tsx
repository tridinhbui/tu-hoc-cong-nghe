"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { BadgeDefinition } from "@/lib/badges";

interface BadgeToastProps {
  badge: BadgeDefinition | null;
  onDismiss: () => void;
}

export default function BadgeToast({ badge, onDismiss }: BadgeToastProps) {
  useEffect(() => {
    if (!badge) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [badge, onDismiss]);

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: -40, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -40, x: "-50%" }}
          className="fixed top-6 left-1/2 z-[60] bg-stone-900 text-white rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-4"
        >
          <span className="text-3xl">{badge.icon}</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Huy hiệu mới
            </p>
            <p className="font-bold">{badge.name}</p>
            <p className="text-xs text-stone-300">{badge.description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
