"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft, X } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

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
          <div className="text-6xl mb-4">🎓</div>
          <p className="text-stone-600 dark:text-stone-400 text-lg">
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
          <div className="p-4 border-2 border-emerald-200 dark:border-emerald-900 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
            <h3 className="font-bold text-emerald-900 dark:text-emerald-400 mb-2">{oc.personalTrackTitle}</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {oc.personalTrackBody}
            </p>
          </div>
          <div className="p-4 border-2 border-blue-200 dark:border-blue-900 rounded-xl bg-blue-50 dark:bg-blue-950/30">
            <h3 className="font-bold text-blue-900 dark:text-blue-400 mb-2">{oc.professionalTrackTitle}</h3>
            <p className="text-sm text-stone-600 dark:text-stone-400">
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
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-900 rounded-xl">
            <div className="text-4xl">⭐</div>
            <div>
              <p className="font-bold">{oc.xpLabel}</p>
              <p className="text-xs text-stone-500">{oc.xpBody}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-900 rounded-xl">
            <div className="text-4xl">🏅</div>
            <div>
              <p className="font-bold">{oc.badgeLabel}</p>
              <p className="text-xs text-stone-500">{oc.badgeBody}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-900 rounded-xl">
            <div className="text-4xl">📈</div>
            <div>
              <p className="font-bold">{oc.levelUpLabel}</p>
              <p className="text-xs text-stone-500">{oc.levelUpBody}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: oc.step4Title,
      description: oc.step4Description,
      content: (
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-900 rounded-xl">
            <div className="text-4xl">📝</div>
            <div>
              <p className="font-bold">{oc.quizLabel}</p>
              <p className="text-xs text-stone-500">{oc.quizBody}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-900 rounded-xl">
            <div className="text-4xl">🎮</div>
            <div>
              <p className="font-bold">{oc.widgetLabel}</p>
              <p className="text-xs text-stone-500">{oc.widgetBody}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-900 rounded-xl">
            <div className="text-4xl">🤖</div>
            <div>
              <p className="font-bold">{oc.assistantLabel}</p>
              <p className="text-xs text-stone-500">{oc.assistantBody}</p>
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
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-stone-600 dark:text-stone-400 text-lg">
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-stone-900 rounded-2xl max-w-lg w-full my-auto shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleSkip}
              className="text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 text-sm font-semibold"
            >
              {t.onboarding.skip}
            </button>
            <div className="flex gap-2">
              {ONBOARDING_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all ${
                    index === currentStep
                      ? "bg-stone-900 dark:bg-stone-100 w-8"
                      : index < currentStep
                      ? "bg-stone-400 dark:bg-stone-600 w-2"
                      : "bg-stone-200 dark:bg-stone-800 w-2"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleSkip}
              className="text-stone-400 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {ONBOARDING_STEPS[currentStep].title}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mt-1">
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
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedTrack === "personal"
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
                        : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedTrack === "personal"
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-stone-300 dark:border-stone-600"
                      }`}>
                        {selectedTrack === "personal" && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 dark:text-stone-100">
                          {t.onboarding.personalTrackName}
                        </p>
                        <p className="text-xs text-stone-500">
                          {t.onboarding.personalTrackHint}
                        </p>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedTrack("professional")}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedTrack === "professional"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                        : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedTrack === "professional"
                          ? "border-blue-500 bg-blue-500"
                          : "border-stone-300 dark:border-stone-600"
                      }`}>
                        {selectedTrack === "professional" && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 dark:text-stone-100">
                          {t.onboarding.professionalTrackName}
                        </p>
                        <p className="text-xs text-stone-500">
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
        <div className="p-6 border-t border-stone-200 dark:border-stone-800 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.onboarding.previous}
          </button>

          {currentStep === ONBOARDING_STEPS.length - 1 ? (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2 rounded-xl font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition-colors"
            >
              {t.onboarding.start}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 rounded-xl font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition-colors"
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
