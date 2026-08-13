"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, CheckCircle2, ArrowRight, X, BrainCircuit, Award } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

interface DiagnosticQuestion {
  id: number;
  question: string;
  options: { text: string; scoreTrack: "personal" | "professional" | "cfa" | "ai" }[];
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
        { text: t.diagnostic.q1Opt3, scoreTrack: "cfa" },
        { text: t.diagnostic.q1Opt4, scoreTrack: "ai" },
      ],
    },
    {
      id: 2,
      question: t.diagnostic.q2,
      options: [
        { text: t.diagnostic.q2Opt1, scoreTrack: "personal" },
        { text: t.diagnostic.q2Opt2, scoreTrack: "professional" },
        { text: t.diagnostic.q2Opt3, scoreTrack: "cfa" },
        { text: t.diagnostic.q2Opt4, scoreTrack: "ai" },
      ],
    },
    {
      id: 3,
      question: t.diagnostic.q3,
      options: [
        { text: t.diagnostic.q3Opt1, scoreTrack: "personal" },
        { text: t.diagnostic.q3Opt2, scoreTrack: "professional" },
        { text: t.diagnostic.q3Opt3, scoreTrack: "cfa" },
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
    cfa: 0,
    ai: 0,
  });

  const DIAGNOSTIC_QUESTIONS = useMemo(() => buildDiagnosticQuestions(t), [t]);

  const handleSelectOption = (track: "personal" | "professional" | "cfa" | "ai") => {
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

  const trackNames: Record<string, { title: string; desc: string; url: string; emoji: string }> = {
    personal: {
      title: t.diagnostic.trackPersonalTitle,
      desc: t.diagnostic.trackPersonalDesc,
      url: "/dashboard?track=personal",
      emoji: "🌱",
    },
    professional: {
      title: t.diagnostic.trackProfessionalTitle,
      desc: t.diagnostic.trackProfessionalDesc,
      url: "/dashboard?track=professional",
      emoji: "💼",
    },
    cfa: {
      title: t.diagnostic.trackCfaTitle,
      desc: t.diagnostic.trackCfaDesc,
      url: "/cfa",
      emoji: "🎓",
    },
    ai: {
      title: t.diagnostic.trackAiTitle,
      desc: t.diagnostic.trackAiDesc,
      url: "/dashboard?track=professional",
      emoji: "🤖",
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
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-black/70 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg my-auto rounded-3xl bg-white dark:bg-stone-900 shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                <Compass className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-black text-stone-900 dark:text-stone-100">
                  {t.diagnostic.modalTitle}
                </h3>
                <p className="text-[11px] font-bold text-stone-400">{t.diagnostic.modalSubtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1.5 rounded-full text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer transition-colors"
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
                    <div className="flex items-center justify-between text-xs font-black text-stone-400">
                      <span>{format(t.diagnostic.questionCounter, { current: currentIndex + 1, total: DIAGNOSTIC_QUESTIONS.length })}</span>
                      <button
                        type="button"
                        onClick={handleDismiss}
                        className="text-[11px] font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 underline cursor-pointer"
                      >
                        {t.diagnostic.skipForNow}
                      </button>
                    </div>

                    <p className="font-extrabold text-base text-stone-900 dark:text-stone-100 leading-snug">
                      {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(opt.scoreTrack)}
                          className="w-full text-left p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <span>{opt.text}</span>
                          <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()
            ) : (
              /* Result Step */
              <div className="text-center py-4 space-y-4">
                <div className="text-5xl">{rec.emoji}</div>
                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-300 dark:border-emerald-800">
                    {t.diagnostic.resultBadge}
                  </span>
                  <h3 className="text-lg font-black text-stone-900 dark:text-stone-100 mt-2">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto leading-relaxed">
                    {rec.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleComplete}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
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
