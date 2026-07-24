"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Sparkles, X, ArrowRight, RefreshCw, Trophy } from "lucide-react";
import { toast } from "sonner";
import { LEVEL_EXAMS, saveUserPassedExam, type LevelExamConfig } from "@/lib/level-exams";
import { LEVELS } from "@/lib/levels";

interface RigorousLevelExamModalProps {
  levelToTest: number;
  userId: string;
  isRecertificationRetake?: boolean;
  onClose: () => void;
  onExamPassed: (level: number) => void;
}

export default function RigorousLevelExamModal({
  levelToTest,
  userId,
  isRecertificationRetake = false,
  onClose,
  onExamPassed,
}: RigorousLevelExamModalProps) {
  const examConfig: LevelExamConfig = LEVEL_EXAMS[levelToTest] || LEVEL_EXAMS[2];
  const levelMeta = LEVELS.find((l) => l.level === levelToTest) || LEVELS[1];

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(examConfig.timeLimitSeconds);
  const [submitted, setSubmitted] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [passed, setPassed] = useState(false);

  // Timer Countdown
  useEffect(() => {
    if (submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  function handleSelectOption(qIdx: number, optionIdx: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  }

  function handleSubmitExam() {
    if (submitted) return;
    setSubmitted(true);

    let correctCount = 0;
    examConfig.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / examConfig.questions.length) * 100);
    setScorePercentage(percent);

    const isPass = percent >= examConfig.minPassPercentage;
    setPassed(isPass);

    if (isPass) {
      saveUserPassedExam(userId, {
        passedLevel: levelToTest,
        passedAt: Date.now(),
        score: percent,
      });
      onExamPassed(levelToTest);
      toast.success(`Chúc mừng! Bạn đã thi đỗ xuất sắc Cấp độ ${levelToTest} (${percent}%)!`);
    } else {
      toast.error(`Rất tiếc! Bạn chỉ đạt ${percent}% (Yêu cầu thi đỗ: ≥ ${examConfig.minPassPercentage}%). Vui lòng ôn lại và thử lại!`);
    }
  }

  function formatTime(secs: number) {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-white dark:bg-stone-900 shadow-2xl"
      >
        {/* Top Header */}
        <div className="border-b border-stone-200 dark:border-stone-800 bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{levelMeta.emoji || examConfig.badgeEmoji}</span>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-black uppercase text-emerald-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{isRecertificationRetake ? "Thi Ôn Cấp Định Kỳ" : "Bài Thi Thăng Cấp Khắt Khe"}</span>
              </div>
              <h2 className="text-lg font-black tracking-tight text-white mt-1">
                {examConfig.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Strip */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900 px-6 py-2.5 flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-300">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Yêu cầu đỗ: ≥ {examConfig.minPassPercentage}% điểm chính xác</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Questions Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {!submitted ? (
            examConfig.questions.map((q, qIdx) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-950/40 space-y-3"
              >
                <p className="text-sm font-black text-stone-900 dark:text-stone-100 flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-stone-950">
                    {qIdx + 1}
                  </span>
                  <span>{q.question}</span>
                </p>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[qIdx] === optIdx;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? "bg-emerald-500 text-stone-950 border-emerald-400 shadow-md font-black"
                            : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-emerald-400"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-stone-950" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            /* Result View */
            <div className="py-6 text-center space-y-4">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-4xl shadow-xl">
                {passed ? "🏆" : "❌"}
              </div>
              <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100">
                {passed ? "Xác Nhận Đạt Bằng Cấp Thành Công!" : "Chưa Đạt Yêu Cầu Thi Cấp!"}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Điểm số của bạn: <span className="font-black text-emerald-600 text-lg">{scorePercentage}%</span> (Yêu cầu: ≥ {examConfig.minPassPercentage}%)
              </p>

              {passed ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-1 font-medium">
                  <p className="font-black text-sm">🎉 Bạn chính thức thăng thâm niên Cấp độ {levelToTest}!</p>
                  <p>Trạng thái thi đỗ đã được cấp hiệu lực chứng nhận trong {14} ngày tới.</p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 space-y-1 font-medium">
                  <p className="font-black text-sm">⚠️ Hãy xem lại các khái niệm tài chính cốt lõi</p>
                  <p>Hãy làm lại các bài học và quiz tương tác để củng cố kiến thức trước khi làm lại test bù nhé!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="border-t border-stone-200 dark:border-stone-800 px-6 py-4 bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
          {!submitted ? (
            <>
              <p className="text-xs text-stone-500 font-semibold">
                Đã trả lời {Object.keys(answers).length}/{examConfig.questions.length} câu
              </p>
              <button
                onClick={handleSubmitExam}
                disabled={Object.keys(answers).length < examConfig.questions.length}
                className="button-premium bg-emerald-500 hover:bg-emerald-400 text-stone-950 px-6 py-2.5 rounded-xl font-black text-xs transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2 shadow-md"
              >
                <span>Nộp Bài Thi Cấp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="w-full flex justify-end gap-3">
              {!passed && (
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers({});
                    setTimeLeft(examConfig.timeLimitSeconds);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold text-xs hover:bg-stone-300 cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Thi Lại Ngay</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-stone-950 font-black text-xs hover:bg-emerald-400 cursor-pointer shadow-md"
              >
                Hoàn Tất
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
