export interface SRSItemState {
  level: number; // 1 to 4
  intervalDays: number;
  nextReviewAt: string; // ISO timestamp
}

export function calculateNextSRS(
  currentLevel: number,
  quality: "forget" | "hard" | "good" | "mastered",
  now: Date = new Date()
): SRSItemState {
  let nextLevel = currentLevel;
  let intervalDays = 1;

  switch (quality) {
    case "forget":
      nextLevel = 1;
      intervalDays = 1;
      break;
    case "hard":
      nextLevel = Math.max(1, currentLevel);
      intervalDays = 3;
      break;
    case "good":
      nextLevel = Math.min(4, Math.max(1, currentLevel) + 1);
      intervalDays = nextLevel === 2 ? 3 : nextLevel === 3 ? 7 : 14;
      break;
    case "mastered":
      nextLevel = 4;
      intervalDays = 30;
      break;
  }

  const nextDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    level: nextLevel,
    intervalDays,
    nextReviewAt: nextDate.toISOString(),
  };
}

export function isDueForReview(nextReviewAt?: string | null, now: Date = new Date()): boolean {
  if (!nextReviewAt) return true;
  return new Date(nextReviewAt).getTime() <= now.getTime();
}
