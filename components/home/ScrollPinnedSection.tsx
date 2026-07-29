"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollPinnedSectionProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode[];
  theme?: "light" | "soft" | "emerald";
}

export default function ScrollPinnedSection({
  badge,
  title,
  description,
  children,
  theme = "light",
}: ScrollPinnedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dynamically calculate horizontal translation percentage based on number of items
  const totalItems = children.length;
  const targetX = totalItems > 1 ? `-${((totalItems - 1) / totalItems) * 82}%` : "0%";
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", targetX]);

  const bgClasses =
    theme === "soft"
      ? "bg-stone-50/80 dark:bg-stone-950/80"
      : theme === "emerald"
      ? "bg-emerald-50/40 dark:bg-emerald-950/20"
      : "bg-white dark:bg-stone-950";

  return (
    <section ref={containerRef} className={`relative h-[220vh] font-sans ${bgClasses}`}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden border-y border-stone-200/70 dark:border-stone-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Section Header (Pinned at Top) */}
          <div className="mb-6 max-w-2xl">
            {badge && <div className="mb-1.5">{badge}</div>}
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 leading-snug">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium leading-relaxed max-w-xl">
                {description}
              </p>
            )}
          </div>

          {/* Horizontal Scroll-Driven Card Track */}
          <div className="relative overflow-hidden pt-2 pb-6">
            <motion.div style={{ x }} className="flex gap-4 sm:gap-5 w-max">
              {children.map((child, idx) => (
                <div
                  key={idx}
                  className="w-[85vw] sm:w-[360px] md:w-[400px] shrink-0"
                >
                  {child}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
