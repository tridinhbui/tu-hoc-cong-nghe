import { TRACK_PERSONAL, TRACK_PROFESSIONAL, isLessonInRange, type Stage } from "@/lib/track-stages";

// "Thi vượt chặng" - pass one exam and the whole chặng is credited as
// complete, instead of working through every lesson in it.
//
// This is a much bigger reward than a normal quiz (one exam can credit 20+
// lessons and the XP that comes with them), which is exactly why none of the
// grading happens in the browser. components/StageMilestoneExamModal.tsx -
// the existing "vượt ải" badge - computes its score client-side and then
// tells the server it passed; that is fine for a cosmetic badge, and would be
// a hole big enough to complete the entire curriculum from devtools if it
// credited lessons. app/api/stage-exam grades from signed tokens instead.

export type StageExamTrack = "personal" | "professional";

/** Share of questions that must be correct. Deliberately higher than the 60%
 *  used for a normal quiz gate: skipping a chặng should require actually
 *  knowing it, not scraping a pass. */
export const STAGE_EXAM_PASS_RATIO = 0.8;

/** How many questions one attempt asks. Enough that guessing can't carry
 *  someone through at an 80% threshold - at 4 options, the odds of guessing
 *  12 of 15 are vanishingly small. */
export const STAGE_EXAM_QUESTION_COUNT = 15;

/** A chặng needs at least this many quiz questions across its lessons before
 *  an exam can be offered. Below it the exam would repeat questions or fall
 *  short, and passing would prove very little. */
export const MIN_QUESTIONS_FOR_STAGE_EXAM = 20;

export function getTrackStages(track: StageExamTrack): Stage[] {
  return (track === "personal" ? TRACK_PERSONAL.stages : TRACK_PROFESSIONAL.stages) as Stage[];
}

export function findStage(track: StageExamTrack, stageLabel: string): Stage | null {
  return getTrackStages(track).find((s) => s.label === stageLabel) ?? null;
}

/** Lesson ids belonging to a stage, from the contiguous day range plus any
 *  extraLessonIds the stage or its parts pull in. */
export function stageLessonIds(stage: Stage, allLessonIds: number[]): number[] {
  const ids = allLessonIds.filter((id) => isLessonInRange(id, stage));
  const extras = new Set<number>(stage.extraLessonIds ?? []);
  for (const part of stage.parts) {
    for (const extra of part.extraLessonIds ?? []) extras.add(extra);
  }
  for (const extra of extras) {
    if (!ids.includes(extra) && allLessonIds.includes(extra)) ids.push(extra);
  }
  return ids.sort((a, b) => a - b);
}

export function passedStageExam(score: number, total: number): boolean {
  if (total <= 0) return false;
  return score >= Math.ceil(total * STAGE_EXAM_PASS_RATIO);
}

export interface StageExamEligibility {
  stageLabel: string;
  stageName: string;
  lessonCount: number;
  questionCount: number;
  /** Lessons in this stage the learner has already completed. */
  completedCount: number;
  /** False when the stage has too few questions to examine honestly. */
  eligible: boolean;
}

/** Whether an exam is worth offering for this stage, and how much of it the
 *  learner has already done. A fully-completed stage is still "eligible" -
 *  the caller decides whether to hide it - because re-testing is harmless. */
export function buildEligibility(
  stage: Stage,
  lessonIds: number[],
  questionCount: number,
  completedIds: ReadonlySet<number>
): StageExamEligibility {
  return {
    stageLabel: stage.label,
    stageName: stage.name,
    lessonCount: lessonIds.length,
    questionCount,
    completedCount: lessonIds.filter((id) => completedIds.has(id)).length,
    eligible: questionCount >= MIN_QUESTIONS_FOR_STAGE_EXAM && lessonIds.length > 0,
  };
}
