import { createClient } from "./supabase";

export interface MilestoneCompletion {
  track_id: string;
  stage_label: string;
  score: number;
}

function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === "PGRST116" || error.code === "42P01" || (error as any).message?.includes("does not exist") || false;
}

export async function getPassedMilestones(userId: string, trackId: string): Promise<MilestoneCompletion[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_milestone_exams")
    .select("track_id, stage_label, score")
    .eq("user_id", userId)
    .eq("track_id", trackId);

  if (error) {
    if (isMissingTableError(error)) {
      if (typeof window !== "undefined") {
        const localData = window.localStorage.getItem(`milestones_${userId}_${trackId}`);
        return localData ? (JSON.parse(localData) as MilestoneCompletion[]) : [];
      }
      return [];
    }
    console.error("Error reading milestones:", error);
    return [];
  }

  return (data ?? []) as MilestoneCompletion[];
}

export async function savePassedMilestone(
  userId: string,
  trackId: string,
  stageLabel: string,
  score: number
): Promise<boolean> {
  const supabase = createClient();
  // Same bug class fixed twice already this session (flashcards, then here):
  // without an explicit onConflict target, PostgREST's upsert defaults to
  // the table's PRIMARY KEY (id, never part of this payload), so a second
  // save for the same (user_id, track_id, stage_label) - e.g. retaking a
  // milestone exam after failing it, or retrying for a better score -
  // behaved as a plain INSERT and hit the real unique constraint, failing
  // with 23505 instead of updating the score.
  const { error } = await supabase
    .from("user_milestone_exams")
    .upsert(
      {
        user_id: userId,
        track_id: trackId,
        stage_label: stageLabel,
        score,
      },
      { onConflict: "user_id,track_id,stage_label" }
    );

  if (error) {
    if (isMissingTableError(error)) {
      if (typeof window !== "undefined") {
        const list = await getPassedMilestones(userId, trackId);
        const idx = list.findIndex((m) => m.stage_label === stageLabel);
        const entry = { track_id: trackId, stage_label: stageLabel, score };
        if (idx !== -1) {
          list[idx] = entry;
        } else {
          list.push(entry);
        }
        window.localStorage.setItem(`milestones_${userId}_${trackId}`, JSON.stringify(list));
        return true;
      }
    }
    console.error("Error saving milestone completion:", error);
    return false;
  }

  return true;
}
