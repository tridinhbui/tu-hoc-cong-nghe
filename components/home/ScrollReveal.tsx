"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Generic scroll-triggered reveal wrapper - fades/slides a section in once
// it scrolls into view, `once: true` so it doesn't re-trigger every time the
// visitor scrolls past it again. Centralized here so every landing-page
// section animates with the same timing instead of hand-tuning each one.
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
