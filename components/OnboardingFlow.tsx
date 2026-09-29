"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, X, GraduationCap, Rocket, Sparkles, Medal, TrendingUp, PenLine, Gamepad2, Bot } from "lucide-react";
import { createClient } from "@/lib/cloudflare";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { btnPrimary } from "@/components/ui/system";

const ICON_TILE =
  "rounded-sm border border-line-strong bg-surface-raised text-ink-body dark:border-stone-700 dark:bg-stone-950";

interface OnboardingStep {
  title: string;
  description: string;
  content: React.ReactNode;
}

function getOnboardingSteps(t: Dictionary): OnboardingStep[] {
  const oc = t.onboarding;
  return [
    {
      title: oc.step1Title,
      description: oc.step1Description,
      content: (
        <div className="text-center py-8">
          <div className={`mx-auto mb-4 w-fit p-4 ${ICON_TILE}`}><GraduationCap className="w-12 h-12" strokeWidth={1.5} aria-hidden /></div>
          <p className="text-ink-soft text-lg">
            {oc.step1Body}
          </p>
        </div>
      ),
    },
    {
      title: oc.step2Title,
      description: oc.step2Description,
      content: (
        <div className="space-y-4 py-4">
          <div className="p-4 border border-line-strong rounded-md dark:border-stone-700">
            <h3 className="font-bold text-ink-max mb-2">{oc.personalTrackTitle}</h3>
            <p className="text-sm text-ink-soft">
              {oc.personalTrackBody}
            </p>
          </div>
          <div className="p-4 border border-line-strong rounded-md dark:border-stone-700">
            <h3 className="font-bold text-ink-max mb-2">{oc.professionalTrackTitle}</h3>
            <p className="text-sm text-ink-soft">
              {oc.professionalTrackBody}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: oc.step3Title,
      description: oc.step3Description,
      content: (
        <div className="my-4 divide-y divide-stone-200 rounded-md border border-line-strong dark:divide-stone-800 dark:border-stone-700">
          <div className="flex items-center gap-4 p-4">
            <div className={`shrink-0 p-2.5 ${ICON_TILE}`}><Sparkles className="w-6 h-6" strokeWidth={1.75} aria-hidden /></div>
            <div>
              <p className="font-bold text-ink-max">{oc.xpLabel}</p>
              <p className="text-xs text-ink-muted">{oc.xpBody}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <div className={`shrink-0 p-2.5 ${ICON_TILE}`}><Medal className="w-6 h-6" strokeWidth={1.75} aria-hidden /></div>
            <div>
              <p className="font-bold text-ink-max">{oc.badgeLabel}</p>
              <p className="text-xs text-ink-muted">{oc.badgeBody}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <div className={`shrink-0 p-2.5 ${ICON_TILE}`}><TrendingUp className="w-6 h-6" strokeWidth={1.75} aria-hidden /></div>
            <div>
              <p className="font-bold text-ink-max">{oc.levelUpLabel}</p>
              <p className="text-xs text-ink-muted">{oc.levelUpBody}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: oc.step4Title,
      description: oc.step4Description,
      content: (
        <div className="my-4 divide-y divide-stone-200 rounded-md border border-line-strong dark:divide-stone-800 dark:border-stone-700">
          <div className="flex items-center gap-4 p-4">
            <div className={`shrink-0 p-2.5 ${ICON_TILE}`}><PenLine className="w-6 h-6" strokeWidth={1.75} aria-hidden /></div>
            <div>
              <p className="font-bold text-ink-max">{oc.quizLabel}</p>
              <p className="text-xs text-ink-muted">{oc.quizBody}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <div className={`shrink-0 p-2.5 ${ICON_TILE}`}><Gamepad2 className="w-6 h-6" strokeWidth={1.75} aria-hidden /></div>
            <div>
              <p className="font-bold text-ink-max">{oc.widgetLabel}</p>
              <p className="text-xs text-ink-muted">{oc.widgetBody}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <div className={`shrink-0 p-2.5 ${ICON_TILE}`}><Bot className="w-6 h-6" strokeWidth={1.75} aria-hidden /></div>
            <div>
              <p className="font-bold text-ink-max">{oc.assistantLabel}</p>
              <p className="text-xs text-ink-muted">{oc.assistantBody}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: oc.step5Title,
      description: oc.step5Description,
      content: (
        <div className="text-center py-8">
          <div className={`mx-auto mb-4 w-fit p-4 ${ICON_TILE}`}><Rocket className="w-12 h-12" strokeWidth={1.5} aria-hidden /></div>
          <p className="text-ink-soft text-lg">
            {oc.step5Body}
          </p>
        </div>
      ),
    },
  ];
}

interface OnboardingFlowProps {
  onComplete: (selectedTrack: "personal" | "professional") => void;
  onSkip: () => void;
}

export default function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const { t } = useI18n();
  const ONBOARDING_STEPS = useMemo(() => getOnboardingSteps(t), [t]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState<"personal" | "professional">("personal");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleComplete = () => {
    onComplete(selectedTrack);
  };

  const handleSkip = () => {
    onSkip();
  };

  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;

  return (
    <div className="fixed inset-0 bg-stone-950/60 z-50 flex items-center justify-center overflow-y-auto p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-stone-900 rounded-md border border-line-strong max-w-lg w-full my-auto overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-line-strong">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleSkip}
              className="text-ink-muted hover:text-ink text-sm font-semibold"
            >
              {t.onboarding.skip}
            </button>
            <div className="flex gap-2">
              {ONBOARDING_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-xs transition-all ${
                    index === currentStep
                      ? "bg-brand-600 dark:bg-brand-500 w-8"
                      : index < currentStep
                      ? "bg-stone-400 dark:bg-stone-600 w-2"
                      : "bg-surface-sunken w-2"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleSkip}
              className="text-ink-muted hover:text-ink"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-ink-max">
            {ONBOARDING_STEPS[currentStep].title}
          </h2>
          <p className="text-ink-soft mt-1">
            {ONBOARDING_STEPS[currentStep].description}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {ONBOARDING_STEPS[currentStep].content}
              
              {/* Track selection for step 1 */}
              {currentStep === 1 && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setSelectedTrack("personal")}
                    className={`w-full p-4 rounded-sm border text-left transition-colors ${
                      selectedTrack === "personal"
                        ? "border-brand-600 dark:border-brand-400"
                        : "border-stone-300 hover:border-stone-500 dark:border-stone-700 dark:hover:border-stone-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-xs border flex items-center justify-center ${
                        selectedTrack === "personal"
                          ? "border-brand-600 bg-brand-600 dark:border-brand-400 dark:bg-brand-500"
                          : "border-line-strong"
                      }`}>
                        {selectedTrack === "personal" && (
                          <Check className="w-3.5 h-3.5 text-white dark:text-stone-950" strokeWidth={3} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-ink-max">
                          {t.onboarding.personalTrackName}
                        </p>
                        <p className="text-xs text-ink-muted">
                          {t.onboarding.personalTrackHint}
                        </p>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedTrack("professional")}
                    className={`w-full p-4 rounded-sm border text-left transition-colors ${
                      selectedTrack === "professional"
                        ? "border-brand-600 dark:border-brand-400"
                        : "border-stone-300 hover:border-stone-500 dark:border-stone-700 dark:hover:border-stone-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-xs border flex items-center justify-center ${
                        selectedTrack === "professional"
                          ? "border-brand-600 bg-brand-600 dark:border-brand-400 dark:bg-brand-500"
                          : "border-line-strong"
                      }`}>
                        {selectedTrack === "professional" && (
                          <Check className="w-3.5 h-3.5 text-white dark:text-stone-950" strokeWidth={3} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-ink-max">
                          {t.onboarding.professionalTrackName}
                        </p>
                        <p className="text-xs text-ink-muted">
                          {t.onboarding.professionalTrackHint}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-line-strong flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-bold text-ink-soft hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.onboarding.previous}
          </button>

          {currentStep === ONBOARDING_STEPS.length - 1 ? (
            <button
              onClick={handleComplete}
              className={btnPrimary}
            >
              {t.onboarding.start}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={btnPrimary}
            >
              {t.onboarding.next}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
