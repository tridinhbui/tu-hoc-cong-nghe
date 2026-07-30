"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Check } from "lucide-react";
import { trackFeatureClick } from "@/lib/feature-events";
import { getFreeRecallDone, saveFreeRecallDone } from "@/lib/progress";

// Free recall: write down everything you remember, unprompted, before being
// shown the answers. It is the single strongest retrieval-practice technique
// in the literature and the one this lesson page had no form of - every
// other check here (opening question, midpoint, sidebar quiz, recall MCQ)
// is multiple choice, which tests recognition rather than recall.
//
// Deliberately not graded by anything: the learner scores themselves against
// the key takeaways afterwards. Self-scoring costs nothing to run and the
// act of comparing is itself the second retrieval pass.

const RECALL_SECONDS = 60;

interface FreeRecallCardProps {
  lessonId: number;
  lessonSlug: string;
  takeaways: string[];
  // Rendered once the exercise is finished or skipped - the "Ghi nhớ nhanh"
  // block, which doubles as this exercise's answer key and so must not be
  // on screen while someone is still trying to recall.
  children: React.ReactNode;
}

type Phase = "idle" | "writing" | "scoring" | "done";

// localStorage read through useSyncExternalStore rather than an effect.
// The value differs between server (always false) and client (whatever a
// past visit stored), and this is exactly the mismatch useSyncExternalStore
// exists to resolve: React renders the server snapshot, then re-renders
// with the client one after hydration, with no flash and no setState in an
// effect. Nothing else writes this key while the component is mounted, so
// subscribe has nothing to listen to.
const noopSubscribe = () => () => {};

export default function FreeRecallCard({
  lessonId,
  lessonSlug,
  takeaways,
  children,
}: FreeRecallCardProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [secondsLeft, setSecondsLeft] = useState(RECALL_SECONDS);
  const [text, setText] = useState("");
  const [ticked, setTicked] = useState<Set<number>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // A lesson already recalled in a past visit skips straight to the answers,
  // the same way MidpointInteractive restores its answered state - otherwise
  // re-reading a finished lesson hides its summary behind a timer again.
  const doneInPastVisit = useSyncExternalStore(
    noopSubscribe,
    () => getFreeRecallDone(lessonId),
    () => false,
  );

  const finishWriting = useCallback(() => {
    setPhase((current) => (current === "writing" ? "scoring" : current));
  }, []);

  useEffect(() => {
    if (phase !== "writing") return;

    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          finishWriting();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [phase, finishWriting]);

  useEffect(() => {
    if (phase === "writing") textareaRef.current?.focus();
  }, [phase]);

  function start() {
    setPhase("writing");
    setSecondsLeft(RECALL_SECONDS);
    trackFeatureClick("lesson_free_recall_start", { label: lessonSlug });
  }

  function skip() {
    saveFreeRecallDone(lessonId);
    setPhase("done");
    trackFeatureClick("lesson_free_recall_skip", { label: lessonSlug });
  }

  function submitScore() {
    saveFreeRecallDone(lessonId);
    setPhase("done");
    // The count, never the text. `wordsWritten` is a coarse effort signal
    // that does not reconstruct anything the learner typed.
    trackFeatureClick("lesson_free_recall_done", {
      label: lessonSlug,
      recalled: ticked.size,
      total: takeaways.length,
      wordsWritten: text.trim() ? text.trim().split(/\s+/).length : 0,
    });
    setText("");
  }

  function toggleTicked(index: number) {
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  // With one or no takeaways there is nothing to score against, so the
  // exercise would just be a timer standing between the reader and the
  // summary.
  if (phase === "done" || doneInPastVisit || takeaways.length < 2) return <>{children}</>;

  const progressPct = ((RECALL_SECONDS - secondsLeft) / RECALL_SECONDS) * 100;

  return (
    <div className="rounded-2xl border-2 border-stone-900 dark:border-stone-700 overflow-hidden shadow-xl">
      <div className="bg-stone-900 dark:bg-stone-950 px-6 py-5 flex items-center gap-3">
        <Brain className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-white font-extrabold text-lg tracking-wide">Đổ não 60 giây</p>
          <p className="text-stone-400 text-xs mt-0.5">
            Viết ra trước khi xem đáp án - nhớ lại khó hơn nhận ra, và đó là lý do nó hiệu quả
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 p-6 space-y-4">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                Không cuộn lên xem lại. Trong 60 giây, viết ra mọi thứ bạn còn nhớ từ bài này -
                gạch đầu dòng, sai chính tả, thiếu ý đều không sao.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={start}
                  className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 px-5 py-2.5 rounded-xl font-bold text-sm transition"
                >
                  Bắt đầu 60 giây
                </button>
                <button
                  onClick={skip}
                  className="text-sm font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 underline transition"
                >
                  Bỏ qua, xem tóm tắt
                </button>
              </div>
            </motion.div>
          )}

          {phase === "writing" && (
            <motion.div key="writing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-stone-600 dark:text-stone-400">
                  Còn {secondsLeft} giây
                </span>
                <button
                  onClick={finishWriting}
                  className="text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 underline"
                >
                  Xong sớm
                </button>
              </div>
              <div className="h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder="Mình nhớ rằng..."
                aria-label="Viết ra những gì bạn còn nhớ"
                className="w-full rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 p-4 text-stone-800 dark:text-stone-100 leading-relaxed focus:outline-hidden focus:border-stone-900 dark:focus:border-stone-400 resize-none"
              />
              <p className="text-xs text-stone-400 dark:text-stone-500">
                Nội dung bạn viết không được lưu lại ở đâu cả.
              </p>
            </motion.div>
          )}

          {phase === "scoring" && (
            <motion.div key="scoring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                Hết giờ. Dưới đây là các ý chính - đánh dấu những ý bạn đã viết được.
              </p>
              <div className="space-y-2">
                {takeaways.map((takeaway, i) => {
                  const isTicked = ticked.has(i);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleTicked(i)}
                      aria-pressed={isTicked}
                      className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                        isTicked
                          ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
                          : "border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-950 hover:border-stone-400 dark:hover:border-stone-600"
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                          isTicked
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-stone-300 dark:border-stone-600 text-transparent"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-stone-700 dark:text-stone-200 text-base leading-relaxed">
                        {takeaway}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="text-sm font-bold text-stone-600 dark:text-stone-400">
                  Nhớ được {ticked.size}/{takeaways.length} ý
                </p>
                <button
                  onClick={submitScore}
                  className="bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 px-5 py-2.5 rounded-xl font-bold text-sm transition"
                >
                  Xem tóm tắt đầy đủ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
