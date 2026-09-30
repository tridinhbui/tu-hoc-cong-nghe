"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ArrowRight, X, Sprout } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { btnPrimary } from "@/components/ui/system";
import { saveLearningGoal } from "@/app/actions/learning-goal";
import { flowLessonSlugs, getLearningFlow, type FlowId } from "@/lib/learning-flows";
import Glyph from "@/components/Glyph";
import { LEARNING_GOAL_CHANGED } from "@/lib/learning-goal-events";

/**
 * Câu hỏi đầu tiên sau khi vào dashboard: "Bạn học để làm gì?".
 *
 * Trước đây là bài khảo sát ba câu "xếp lớp" mà cả bốn đáp án đều là mục tiêu
 * của lập trình viên (Git, backend, chứng chỉ đám mây, "AI rà soát mã"), và
 * kết quả chỉ đổi track - không nối vào hành trình học theo nhu cầu. Đi thử
 * trang như một người U40 làm văn phòng (2026-09-29): không có đáp án nào cho
 * họ, và thẻ "Học tiếp" vẫn chỉ vào bài dòng lệnh.
 *
 * Giờ là một câu, mỗi đáp án là một câu người đi làm tự nói ra. Chọn xong thì
 * lưu thành mục tiêu học (user_profiles.learning_goal) - thẻ Học tiếp và khu
 * Lộ trình trên dashboard đọc đúng giá trị đó - và mời vào bài đầu tiên ngay.
 * "Học để đi làm nghề" giữ đường cũ: không mục tiêu, học theo lộ trình nền tảng.
 */


type Choice = { key: string; goal: FlowId | null };

const CHOICES: Choice[] = [
  { key: "goalOffice", goal: "ai-assistant" },
  { key: "goalNotSure", goal: "ai-assistant" },
  { key: "goalData", goal: "data-ai" },
  { key: "goalMarketing", goal: "ai-marketing" },
  { key: "goalWebsite", goal: "website" },
  { key: "goalCareer", goal: null },
];

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
  const d = t.diagnostic;
  const [picked, setPicked] = useState<Choice | null>(null);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);

  const remember = (value: string) => {
    try {
      localStorage.setItem(`thtcdn_placement_test_${userId}`, value);
    } catch {}
  };

  const handleDismiss = () => {
    remember("dismissed");
    onClose();
  };

  const choose = async (choice: Choice) => {
    setSaving(true);
    setFailed(false);
    const res = await saveLearningGoal(choice.goal).catch(() => ({ ok: false }));
    setSaving(false);
    if (!res.ok) setFailed(true);
    remember(choice.goal ?? "personal");
    window.dispatchEvent(new CustomEvent(LEARNING_GOAL_CHANGED));
    setPicked(choice);
  };

  const flow = picked?.goal ? getLearningFlow(picked.goal) : undefined;

  const startFirst = () => {
    onClose();
    if (flow) router.push(`/bai-hoc/${flow.firstWinSlug}`);
    else router.push("/dashboard?track=personal");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-stone-950/60 p-4 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative my-auto w-full max-w-lg overflow-hidden rounded-card bg-white shadow-2xl dark:bg-stone-900"
        >
          <div className="flex items-start justify-between gap-3 px-6 pb-2 pt-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Compass className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-lg font-black tracking-tight text-ink-max">{picked ? d.goalResultLead : d.goalTitle}</h3>
                {!picked && <p className="mt-0.5 text-sm text-ink-body">{d.goalSubtitle}</p>}
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="cursor-pointer rounded-sm p-1.5 text-ink-muted transition-colors hover:text-ink"
              title={d.dismissTitle}
              aria-label={d.dismissTitle}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-6 pb-6 pt-3">
            {!picked ? (
              <>
                <div className="space-y-2">
                  {CHOICES.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      disabled={saving}
                      onClick={() => void choose(c)}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl bg-surface-raised/70 px-4 py-3 text-left text-sm font-semibold text-ink-body ring-1 ring-line-soft transition-colors hover:bg-accent-soft hover:text-accent-strong hover:ring-accent-line disabled:opacity-60 dark:bg-white/5"
                    >
                      <span>{d[c.key as keyof typeof d] as string}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="mt-4 cursor-pointer text-xs font-semibold text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  {d.skipForNow}
                </button>
              </>
            ) : (
              <div className="space-y-5">
                {flow ? (
                  <div className="rounded-2xl bg-accent-soft p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-accent shadow-sm dark:bg-stone-900">
                        <Glyph emoji={flow.emoji} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-black tracking-tight text-ink-max">{t.learningFlows.flows[flow.id].title}</p>
                        <p className="text-xs font-semibold text-ink-muted">
                          {format(d.goalResultTime, { lessons: flowLessonSlugs(flow).length })}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-accent-strong">{d.goalResultFirst}</p>
                    <p className="mt-1 text-sm leading-6 text-ink-body">{t.revampGoals.flows[flow.id].firstBuild}</p>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-accent-soft p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-accent shadow-sm dark:bg-stone-900">
                        <Sprout className="h-5 w-5" aria-hidden />
                      </span>
                      <p className="font-black tracking-tight text-ink-max">{d.goalCareerLead}</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink-body">{d.goalCareerDesc}</p>
                  </div>
                )}
                {failed && <p className="text-xs font-semibold text-warn-strong">{d.goalSaveFailed}</p>}
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" onClick={startFirst} className={`${btnPrimary} cursor-pointer`}>
                    {flow ? d.goalStartFirst : d.startLearningNow} <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer text-sm font-semibold text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    {d.goalLater}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
