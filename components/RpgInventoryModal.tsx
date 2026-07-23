"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import RpgInventoryPanel from "@/components/RpgInventoryPanel";

interface RpgInventoryModalProps {
  user: any;
  onClose: () => void;
}

export default function RpgInventoryModal({ user, onClose }: RpgInventoryModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative mx-auto my-3 min-h-0 max-w-7xl w-full overflow-hidden rounded-3xl shadow-2xl sm:my-6"
      >
        <div className="absolute right-5 top-5 z-20">
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm transition-colors hover:bg-stone-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <RpgInventoryPanel user={user} />
      </motion.div>
    </div>
  );
}
