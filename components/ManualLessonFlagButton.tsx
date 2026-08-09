"use client";

import { useEffect, useState } from "react";
import { CheckCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { getLessonProgress } from "@/lib/supabase-progress";
import { isLessonFlagged, toggleLessonFlag } from "@/lib/supabase-lesson-flags";
import { useI18n } from "@/lib/i18n/context";
import { getCurrentUser } from "@/lib/current-user";

interface ManualLessonFlagButtonProps {
  lessonId: number;
  lessonSlug: string;
  lessonTitle: string;
}

export default function ManualLessonFlagButton({
  lessonId,
  lessonSlug,
  lessonTitle,
}: ManualLessonFlagButtonProps) {
  const { t } = useI18n();
  const [flagged, setFlagged] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getCurrentUser();

        if (!user) return;

        const [manualFlagged, progress] = await Promise.all([
          isLessonFlagged(user.id, lessonId),
          getLessonProgress(user.id, lessonId),
        ]);

        setFlagged(manualFlagged);
        setCompleted(!!progress?.completed);
      } catch (error) {
        console.error("Error loading manual lesson flag state:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [lessonId]);

  const handleToggle = async () => {
    if (completed) {
      toast.message(t.manualLessonFlag.alreadyCounted, {
        description: t.manualLessonFlag.alreadyCountedNote,
      });
      return;
    }

    if (!flagged) {
      const confirmed = window.confirm(
        t.manualLessonFlag.confirmNoXp
      );
      if (!confirmed) return;
    }

    setToggling(true);
    try {
      const user = await getCurrentUser();

      if (!user) {
        toast.error(t.manualLessonFlag.needLogin);
        return;
      }

      const result = await toggleLessonFlag(user.id, lessonId, lessonSlug, lessonTitle);
      setFlagged(result.flagged);

      if (result.flagged) {
        toast.success(t.manualLessonFlag.marked);
      } else {
        toast.success(t.manualLessonFlag.unmarked);
      }
    } catch (error) {
      console.error("Error toggling manual lesson flag:", error);
      toast.error(t.manualLessonFlag.failed);
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 animate-pulse" />;
  }

  return (
    <button
      onClick={handleToggle}
      disabled={toggling}
      title={
        completed
          ? t.manualLessonFlag.alreadyCountedTitle
          : flagged
            ? t.manualLessonFlag.unflagTitle
            : t.manualLessonFlag.flagTitle
      }
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
        completed
          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
          : flagged
            ? "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400"
            : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700"
      } ${toggling ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
      aria-label={t.manualLessonFlag.ariaLabel}
    >
      {completed ? <CheckCircle2 className="w-5 h-5" /> : <CheckCheck className="w-5 h-5" />}
    </button>
  );
}
