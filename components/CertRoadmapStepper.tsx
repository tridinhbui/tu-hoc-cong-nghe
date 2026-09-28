"use client";

import { Flag, Lock, Trophy, ShieldCheck } from "lucide-react";

export interface StepperStep {
  title: string;
  status: "active" | "locked" | "completed";
  statusText: string;
  iconType: "flag" | "lock" | "trophy" | "shield";
}

interface CertRoadmapStepperProps {
  title: string;
  steps: StepperStep[];
}

export default function CertRoadmapStepper({ title, steps }: CertRoadmapStepperProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-mono font-black uppercase tracking-wider text-ink">
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
        {steps.map((step, idx) => {
          const isActive = step.status === "active";
          const isCompleted = step.status === "completed";

          return (
            <div key={step.title} className="relative flex items-center">
              <div
                className={`w-full rounded-2xl border p-4 transition-all flex items-center gap-3.5 ${
                  isActive
                    ? "border-brand-600/80 bg-white dark:bg-stone-900 shadow-xs ring-2 ring-brand-500/10"
                    : isCompleted
                    ? "border-brand-300 bg-brand-50/50 dark:bg-brand-950/20"
                    : "border-stone-200/90 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/50 opacity-80"
                }`}
              >
                {/* Icon Container */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive
                      ? "bg-brand-100 dark:bg-brand-950/80 text-accent-ink"
                      : isCompleted
                      ? "bg-brand-600 text-white"
                      : "bg-stone-200/80 dark:bg-stone-800 text-ink-faint"
                  }`}
                >
                  {step.iconType === "flag" && <Flag className="w-5 h-5" />}
                  {step.iconType === "lock" && <Lock className="w-4 h-4" />}
                  {step.iconType === "trophy" && <Trophy className="w-5 h-5" />}
                  {step.iconType === "shield" && <ShieldCheck className="w-5 h-5" />}
                </div>

                {/* Text Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-ink-max truncate">
                    {step.title}
                  </p>
                  <div className="mt-0.5">
                    {isActive ? (
                      <span className="inline-block px-2 py-0.5 rounded-md bg-brand-100 dark:bg-brand-950/80 text-accent-ink text-[10px] font-black uppercase tracking-wider border border-accent-line">
                        {step.statusText}
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-ink-faint">
                        {step.statusText}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Dotted connector (hidden on last step & on small screens) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-stone-300 dark:text-stone-600 font-bold">
                  ···
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
