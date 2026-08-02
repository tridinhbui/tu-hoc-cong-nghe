import { isLessonInRange, TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";

/**
 * Buckets a learner's highlights into the same "chặng" the dashboard already
 * organises lessons by, so the notebook reads in the order they studied rather
 * than as one flat reverse-chronological list.
 *
 * `lesson_highlights` stores only `lesson_id`, and stage membership lives in
 * `lib/track-stages.ts` as day ranges, so the mapping is derived here rather
 * than denormalised into the table - a lesson that gets moved between stages
 * then only has to change in one place.
 */

export interface StageRef {
  /** Unique across tracks - both tracks have a "Chặng 1". */
  key: string;
  track: "personal" | "professional" | "other";
  label: string;
  name: string;
  /** Position of the stage within its track, for stable ordering. */
  order: number;
}

/**
 * Lessons that belong to no stage - the bonus track, and anything whose id
 * falls outside every range. Grouped together and sorted last rather than
 * dropped, so a highlight never silently disappears from the notebook.
 */
export const UNGROUPED: StageRef = {
  key: "other",
  track: "other",
  label: "Khác",
  name: "Bài case, bài bổ sung và nội dung ngoài lộ trình",
  order: Number.MAX_SAFE_INTEGER,
};

export function resolveStage(lessonId: number): StageRef {
  const personalIndex = TRACK_PERSONAL.stages.findIndex((stage) => isLessonInRange(lessonId, stage));
  if (personalIndex !== -1) {
    const stage = TRACK_PERSONAL.stages[personalIndex];
    return {
      key: `personal:${stage.label}`,
      track: "personal",
      label: stage.label,
      name: stage.name,
      order: personalIndex,
    };
  }

  const professionalIndex = TRACK_PROFESSIONAL.stages.findIndex((stage) => isLessonInRange(lessonId, stage));
  if (professionalIndex !== -1) {
    const stage = TRACK_PROFESSIONAL.stages[professionalIndex];
    return {
      key: `professional:${stage.label}`,
      track: "professional",
      label: stage.label,
      name: stage.name,
      // Offset so professional stages sort after every personal one, matching
      // the dashboard's track order.
      order: TRACK_PERSONAL.stages.length + professionalIndex,
    };
  }

  return UNGROUPED;
}

export interface GroupableHighlight {
  lesson_id: number;
}

export interface StageGroup<T extends GroupableHighlight> {
  stage: StageRef;
  items: T[];
}

/**
 * Groups by stage, preserving the caller's ordering of `items` within each
 * group. Stages the learner has highlighted nothing in are omitted - the
 * notebook shows where they have been, not the whole syllabus.
 */
export function groupByStage<T extends GroupableHighlight>(items: T[]): StageGroup<T>[] {
  const groups = new Map<string, StageGroup<T>>();

  for (const item of items) {
    const stage = resolveStage(item.lesson_id);
    const existing = groups.get(stage.key);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.set(stage.key, { stage, items: [item] });
    }
  }

  return [...groups.values()].sort((a, b) => a.stage.order - b.stage.order);
}
