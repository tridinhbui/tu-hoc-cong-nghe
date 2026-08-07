"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  GraduationCap,
  Gauge,
  CheckCircle2,
  Clock,
  RotateCcw,
  Target,
  Wallet,
  TrendingUp,
  Award,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Structural shape of the three panels: id and per-item icon. Display copy
// (tag/badge/title/subtitle/items[].title/tag/desc) comes from
// `t.dataTables.scrollytelling.panels`; see `panelsOf`.
const PANEL_ICONS = [
  { id: 0, panelKey: "panel0" as const, items: [{ icon: Brain }, { icon: Sparkles }, { icon: GraduationCap }, { icon: Gauge }] },
  {
    id: 1,
    panelKey: "panel1" as const,
    items: [
      { step: "01", icon: Clock },
      { step: "02", icon: Target },
      { step: "03", icon: RotateCcw },
      { step: "04", icon: CheckCircle2 },
    ],
  },
  { id: 2, panelKey: "panel2" as const, items: [{ icon: Wallet }, { icon: GraduationCap }, { icon: Award }, { icon: TrendingUp }] },
];

function panelsOf(t: Dictionary) {
  const copy = t.dataTables.scrollytelling.panels;
  return PANEL_ICONS.map(({ id, panelKey, items }) => {
    const panelCopy = copy[panelKey];
    return {
      id,
      tag: panelCopy.tag,
      badge: panelCopy.badge,
      title: panelCopy.title,
      subtitle: panelCopy.subtitle,
      items: items.map((item, idx) => ({
        ...item,
        title: panelCopy.items[idx].title,
        desc: panelCopy.items[idx].desc,
        tag: "tag" in panelCopy.items[idx] ? (panelCopy.items[idx] as { tag?: string }).tag : undefined,
      })),
    };
  });
}

export default function ScrollytellingPinnedSection() {
  const { t } = useI18n();
  const PANELS = useMemo(() => panelsOf(t), [t]);
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto rotation timer every 6 seconds unless user pauses/clicks
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % PANELS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, PANELS.length]);

  // Mouse wheel scroll to flip tabs smoothly
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) < 15) return;

    if (e.deltaY > 0 && activeTab < PANELS.length - 1) {
      setActiveTab((prev) => prev + 1);
      setIsPaused(true);
    } else if (e.deltaY < 0 && activeTab > 0) {
      setActiveTab((prev) => prev - 1);
      setIsPaused(true);
    }
  };

  const currentPanel = PANELS[activeTab];

  return (
    <section className="relative w-full font-sans bg-white dark:bg-stone-950 py-8 sm:py-12 border-y border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Segmented Tab Controller */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              {t.miscUi.scrollytellingPinnedSection.exploreProduct}
            </span>
          </div>

          {/* Interactive 3 Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
            {PANELS.map((panel, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={panel.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(idx);
                    setIsPaused(true);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? "text-stone-950 dark:text-stone-900 shadow-sm"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="scrollyTabPill"
                      className="absolute inset-0 bg-white dark:bg-emerald-400 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{panel.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Panel Content Stage (Support Wheel Scroll & Zero Empty Space Gap!) */}
        <div
          onWheel={handleWheel}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative min-h-[380px] sm:min-h-[340px] rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 p-5 sm:p-8 shadow-sm overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPanel.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col justify-between h-full"
            >
              {/* Panel Header */}
              <div className="text-center max-w-2xl mx-auto mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 mb-2">
                  {currentPanel.tag}
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-stone-950 dark:text-stone-100 tracking-tight leading-snug">
                  {currentPanel.title}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium leading-relaxed max-w-xl mx-auto">
                  {currentPanel.subtitle}
                </p>
              </div>

              {/* Panel Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {currentPanel.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="p-4 rounded-2xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900/90 shadow-xs hover:border-emerald-400/60 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Icon className="w-4 h-4" />
                          </div>
                          {"step" in item && item.step && (
                            <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/50">
                              {format(t.miscUi.scrollytellingPinnedSection.stepLabel, { step: item.step })}
                            </span>
                          )}
                          {"tag" in item && item.tag && (
                            <span className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-medium leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator Bar */}
          <div className="mt-6 flex justify-center gap-1.5">
            {PANELS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveTab(idx);
                  setIsPaused(true);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === idx ? "w-8 bg-emerald-500" : "w-2 bg-stone-300 dark:bg-stone-700"
                }`}
                title={format(t.miscUi.scrollytelling.goToTab, { index: idx + 1 })}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
