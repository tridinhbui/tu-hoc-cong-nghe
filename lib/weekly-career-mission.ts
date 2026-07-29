// "Weekly Career Mission" - five career-shaped tasks that reset every
// Monday, on top of the existing daily/weekly *learning* quests
// (lib/quest-rewards.ts, components/WeeklyQuestsWidget.tsx). Those reward
// showing up; these reward doing the things that actually move a finance
// job application forward.
//
// Progress is never stored. Every counter below is derived on read from a
// table the app already writes (see app/api/career-profile/route.ts), so
// there is no "mission progress" row that can drift from reality - or be
// written from devtools. The only persisted thing is the payout ledger,
// user_career_mission_claims, which only the claim route may insert into.
//
// XP amounts live here and are re-derived server-side at claim time, the
// same shape as lib/quest-rewards.ts - the number the widget renders is
// display-only.

export type CareerMissionId =
  | "ib_questions"
  | "valuation_lessons"
  | "cv_bullets"
  | "mock_interview"
  | "company_case";

export interface CareerMissionDef {
  id: CareerMissionId;
  title: string;
  description: string;
  /** How many `unit`s finish the mission. */
  target: number;
  unit: string;
  xpReward: number;
  coinReward: number;
  href: string;
  ctaLabel: string;
}

export const WEEKLY_CAREER_MISSIONS: CareerMissionDef[] = [
  {
    id: "ib_questions",
    title: "Làm 20 câu IB question",
    description: "Luyện technical + behavioral từ IB question bank trong mục Kiểm tra.",
    target: 20,
    unit: "câu",
    xpReward: 30,
    coinReward: 30,
    href: "/kiem-tra",
    ctaLabel: "Luyện IB question",
  },
  {
    id: "valuation_lessons",
    title: "Hoàn thành 2 bài valuation",
    description: "Bất kỳ 2 bài thuộc nhóm Định giá (DCF, comps, terminal value...).",
    target: 2,
    unit: "bài",
    xpReward: 25,
    coinReward: 25,
    href: "/nghe-nghiep-hoc",
    ctaLabel: "Chọn bài định giá",
  },
  {
    id: "cv_bullets",
    title: "Viết 3 CV bullets",
    description: "Mỗi bullet mô tả 1 việc bạn đã làm theo công thức Hành động - Con số - Kết quả.",
    target: 3,
    unit: "bullet",
    xpReward: 25,
    coinReward: 25,
    href: "/su-nghiep",
    ctaLabel: "Viết bullet",
  },
  {
    id: "mock_interview",
    title: "Làm 1 mock interview",
    description: "Một phiên phỏng vấn thử có tính giờ, 10 câu trải đều các nhóm câu hỏi.",
    target: 1,
    unit: "phiên",
    xpReward: 40,
    coinReward: 40,
    href: "/su-nghiep",
    ctaLabel: "Bắt đầu phỏng vấn thử",
  },
  {
    id: "company_case",
    title: "Đọc 1 company case",
    description: "Hoàn thành một case doanh nghiệp thật trong Thử thách tuần.",
    target: 1,
    unit: "case",
    xpReward: 30,
    coinReward: 30,
    href: "/game",
    ctaLabel: "Mở case tuần",
  },
];

const MISSION_BY_ID = new Map(WEEKLY_CAREER_MISSIONS.map((m) => [m.id, m]));

export function getCareerMission(id: string): CareerMissionDef | null {
  return MISSION_BY_ID.get(id as CareerMissionId) ?? null;
}

/** Defense-in-depth cap for recalculateUserStats, mirroring
 *  MAX_DAILY_QUEST_XP: no single week can produce more than this. */
export const MAX_WEEKLY_CAREER_MISSION_XP = WEEKLY_CAREER_MISSIONS.reduce(
  (sum, m) => sum + m.xpReward,
  0
);

/** Bonus for finishing every mission in a week, claimed as its own ledger
 *  row so it can't be double-paid. */
export const CAREER_MISSION_PERFECT_WEEK_ID = "perfect_week";
export const CAREER_MISSION_PERFECT_WEEK_XP = 50;
export const CAREER_MISSION_PERFECT_WEEK_COINS = 100;

/** Monday 00:00 local time of the week `date` falls in. Local, not UTC:
 *  a learner in Vietnam finishing a mission at 23:00 Sunday must have it
 *  count for the week they think they're in. */
export function getWeekStart(date: Date = new Date()): Date {
  const start = new Date(date);
  const day = start.getDay(); // 0 = Sunday
  const daysSinceMonday = (day + 6) % 7;
  start.setDate(start.getDate() - daysSinceMonday);
  start.setHours(0, 0, 0, 0);
  return start;
}

/** ISO-8601 week label, e.g. "2026-W31" - the key format
 *  user_career_mission_claims.week_key is CHECKed against. */
export function getWeekKey(date: Date = new Date()): string {
  // Thursday of the same week decides the ISO year, which is what makes
  // the last days of December land in W01 of the next year correctly.
  const thursday = getWeekStart(date);
  thursday.setDate(thursday.getDate() + 3);
  const isoYear = thursday.getFullYear();
  const firstThursday = new Date(isoYear, 0, 4);
  const firstWeekStart = getWeekStart(firstThursday);
  const weekNumber = Math.round((thursday.getTime() - firstWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
  return `${isoYear}-W${String(weekNumber).padStart(2, "0")}`;
}

export type CareerMissionCounts = Record<CareerMissionId, number>;

export interface CareerMissionProgress extends CareerMissionDef {
  current: number;
  completed: boolean;
  claimed: boolean;
  claimable: boolean;
}

export interface WeeklyCareerMissionState {
  weekKey: string;
  missions: CareerMissionProgress[];
  /** Missions finished this week, regardless of claim status. */
  completedCount: number;
  perfectWeek: {
    xpReward: number;
    coinReward: number;
    unlocked: boolean;
    claimed: boolean;
    claimable: boolean;
  };
}

export function buildWeeklyMissionState(
  counts: Partial<CareerMissionCounts>,
  claimedIds: string[],
  weekKey: string = getWeekKey()
): WeeklyCareerMissionState {
  const claimed = new Set(claimedIds);
  const missions: CareerMissionProgress[] = WEEKLY_CAREER_MISSIONS.map((mission) => {
    const current = Math.max(0, counts[mission.id] ?? 0);
    const completed = current >= mission.target;
    const isClaimed = claimed.has(mission.id);
    return {
      ...mission,
      current,
      completed,
      claimed: isClaimed,
      claimable: completed && !isClaimed,
    };
  });

  const completedCount = missions.filter((m) => m.completed).length;
  const perfectUnlocked = completedCount === WEEKLY_CAREER_MISSIONS.length;
  const perfectClaimed = claimed.has(CAREER_MISSION_PERFECT_WEEK_ID);

  return {
    weekKey,
    missions,
    completedCount,
    perfectWeek: {
      xpReward: CAREER_MISSION_PERFECT_WEEK_XP,
      coinReward: CAREER_MISSION_PERFECT_WEEK_COINS,
      unlocked: perfectUnlocked,
      claimed: perfectClaimed,
      claimable: perfectUnlocked && !perfectClaimed,
    },
  };
}

/** Reward for a claimable id, or null if the id isn't a mission at all.
 *  The claim route uses this instead of anything from the request body. */
export function getCareerMissionReward(missionId: string): { xp: number; coins: number } | null {
  if (missionId === CAREER_MISSION_PERFECT_WEEK_ID) {
    return { xp: CAREER_MISSION_PERFECT_WEEK_XP, coins: CAREER_MISSION_PERFECT_WEEK_COINS };
  }
  const mission = getCareerMission(missionId);
  return mission ? { xp: mission.xpReward, coins: mission.coinReward } : null;
}
