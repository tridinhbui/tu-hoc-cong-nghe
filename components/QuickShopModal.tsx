"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import CosmeticStore from "@/components/CosmeticStore";
import { useIsClient } from "@/lib/use-is-client";
import { useI18n } from "@/lib/i18n/context";

interface QuickShopModalProps {
  userId: string;
  onClose: () => void;
}

export default function QuickShopModal({ userId, onClose }: QuickShopModalProps) {
  const { t } = useI18n();
  const mounted = useIsClient();

  useEffect(() => {
    // Khóa scroll trang đệm khi mở modal cửa hàng
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-stone-950/60 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="rounded-md border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900 p-6 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto z-[10000] my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t.miscUi.quickShopModal.closeShop}
          className="absolute top-4 right-4 p-2 rounded-sm text-ink-muted hover:bg-surface-raised hover:text-ink transition-colors z-30 cursor-pointer"
          title={t.miscUi.quickShopModal.closeShop}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Embedded Cosmetic Store */}
        <CosmeticStore userId={userId} onBack={onClose} />
      </motion.div>
    </div>,
    document.body
  );
}
