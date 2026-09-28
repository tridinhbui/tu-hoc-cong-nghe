"use client";

import { createElement, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, CheckCircle2, ArrowRight, X, BrainCircuit, Award, Sprout, Briefcase, GraduationCap, Bot, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { btnPrimary } from "@/components/ui/system";

interface DiagnosticQuestion {
  id: number;
  question: string;
  options: { text: string; scoreTrack: "personal" | "professional" | "certification" | "ai" }[];
}

// Scoring is purely by `scoreTrack` per option (question id + option order),
// never by option text - translating the labels below must never change
// which track an option scores toward.
function buildDiagnosticQuestions(t: Dictionary): DiagnosticQuestion[] {
  return [
    {
      id: 1,
      question: t.diagnostic.q1,
      options: [
        { text: t.diagnostic.q1Opt1, scoreTrack: "personal" },
        { text: t.diagnostic.q1Opt2, scoreTrack: "professional" },
        { text: t.diagnostic.q1Opt3, scoreTrack: "certification" },
        { text: t.diagnostic.q1Opt4, scoreTrack: "ai" },
      ],
    },
    {
      id: 2,
      question: t.diagnostic.q2,
      options: [
        { text: t.diagnostic.q2Opt1, scoreTrack: "personal" },
        { text: t.diagnostic.q2Opt2, scoreTrack: "professional" },
        { text: t.diagnostic.q2Opt3, scoreTrack: "certification" },
        { text: t.diagnostic.q2Opt4, scoreTrack: "ai" },
      ],
    },
    {
      id: 3,
      question: t.diagnostic.q3,
      options: [
        { text: t.diagnostic.q3Opt1, scoreTrack: "personal" },
        { text: t.diagnostic.q3Opt2, scoreTrack: "professional" },
        { text: t.diagnostic.q3Opt3, scoreTrack: "certification" },
        { text: t.diagnostic.q3Opt4, scoreTrack: "ai" },
      ],
    },
  ];
}

export default function DiagnosticPlacementModal({
  userId,
  isOpen,
  onClose,
}: {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { t } = useI18n();
  const [step, setStep] = useState<"quiz" | "result">("quiz");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    personal: 0,
    professional: 0,
    certification: 0,
    ai: 0,
  });

  const DIAGNOSTIC_QUESTIONS = useMemo(() => buildDiagnosticQuestions(t), [t]);

  const handleSelectOption = (track: "personal" | "professional" | "certification" | "ai") => {
    setScores((prev) => ({ ...prev, [track]: prev[track] + 1 }));

    if (currentIndex + 1 < DIAGNOSTIC_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setStep("result");
    }
  };

  const getRecommendedTrack = () => {
    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
    return sorted[0]?.[0] || "personal";
  };

  const recommendedTrack = getRecommendedTrack();

  const trackNames: Record<string, { title: string; desc: string; url: string; icon: LucideIcon }> = {
    personal: {
      title: t.diagnostic.trackPersonalTitle,
      desc: t.diagnostic.trackPersonalDesc,
      url: "/dashboard?track=personal",
      icon: Sprout,
    },
    professional: {
      title: t.diagnostic.trackProfessionalTitle,
      desc: t.diagnostic.trackProfessionalDesc,
      url: "/dashboard?track=professional",
      icon: Briefcase,
    },
    certification: {
      title: t.diagnostic.trackCertificationTitle,
      desc: t.diagnostic.trackCertificationDesc,
      url: "/chung-chi",
      icon: GraduationCap,
    },
    ai: {
      title: t.diagnostic.trackAiTitle,
      desc: t.diagnostic.trackAiDesc,
      url: "/dashboard?track=professional",
      icon: Bot,
    },
  };

  const rec = trackNames[recommendedTrack];

  const handleDismiss = () => {
    try {
      localStorage.setItem(`thtcdn_placement_test_${userId}`, "dismissed");
    } catch (e) {}
    onClose();
  };

  const handleComplete = () => {
    try {
      localStorage.setItem(`thtcdn_placement_test_${userId}`, recommendedTrack);
    } catch (e) {}
    toast.success(format(t.diagnostic.setupToastSuccess, { title: rec.title }));
    onClose();
    router.push(rec.url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-stone-950/60 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg my-auto rounded-md bg-white dark:bg-stone-900 border border-line-strong overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-stone-300 bg-[#f3f1ec] dark:border-stone-700 dark:bg-stone-950">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-stone-300 bg-white text-ink-body dark:border-stone-700 dark:bg-stone-900">
                <Compass className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-black tracking-tight text-ink-max">
                  {t.diagnostic.modalTitle}
                </h3>
                <p className="text-[11px] font-semibold text-ink-muted">{t.diagnostic.modalSubtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1.5 rounded-sm text-ink-muted hover:text-ink cursor-pointer transition-colors"
              title={t.diagnostic.dismissTitle}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            {step === "quiz" ? (
              (() => {
                const q = DIAGNOSTIC_QUESTIONS[currentIndex];
                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-ink-muted">
                      <span>{format(t.diagnostic.questionCounter, { current: currentIndex + 1, total: DIAGNOSTIC_QUESTIONS.length })}</span>
                      <button
                        type="button"
                        onClick={handleDismiss}
                        className="text-[11px] font-bold text-ink-muted hover:text-ink underline underline-offset-4 cursor-pointer"
                      >
                        {t.diagnostic.skipForNow}
                      </button>
                    </div>

                    <p className="font-black tracking-tight text-base text-ink-max leading-snug">
                      {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(opt.scoreTrack)}
                          className="w-full text-left p-3.5 rounded-sm border border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900 hover:border-brand-600 dark:hover:border-brand-400 text-xs sm:text-sm font-semibold text-ink-body transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span>{opt.text}</span>
                          <ArrowRight className="w-4 h-4 text-ink-muted shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()
            ) : (
              /* Result Step */
              <div className="text-center py-4 space-y-4">
                <div className="mx-auto w-fit rounded-sm border border-stone-300 bg-[#f3f1ec] text-ink-body p-3 dark:border-stone-700 dark:bg-stone-950">{createElement(rec.icon, { className: "w-10 h-10", strokeWidth: 1.5, "aria-hidden": true })}</div>
                <div>
                  <span className="eyebrow text-ink-soft">
                    {t.diagnostic.resultBadge}
                  </span>
                  <h3 className="text-lg font-black tracking-tight text-ink-max mt-2">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-ink-soft mt-1 max-w-sm mx-auto leading-relaxed">
                    {rec.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleComplete}
                  className={`${btnPrimary} w-full cursor-pointer`}
                >
                  {t.diagnostic.startLearningNow} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
