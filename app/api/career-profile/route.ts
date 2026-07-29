import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import { FINANCE_CAREERS } from "@/lib/finance-careers";
import { SKILL_DOMAINS, computeCompetencyScores, computeDomainCoverage, type QuizSessionSignal } from "@/lib/career-competency";
import { CERTIFICATION_TARGETS, computeSkillGap, getRequirementsForTarget } from "@/lib/career-skill-gap";
import { buildWeeklyMissionState, getWeekKey, getWeekStart, type CareerMissionCounts } from "@/lib/weekly-career-mission";

// Single read for all three /su-nghiep career-profile surfaces: the
// competency radar, the Job Skill Gap panel and the Weekly Career Mission
// list. One route rather than three because all three are views over the
// same five queries - splitting them would mean fetching user_progress and
// user_quiz_sessions three times per page load.
//
// Nothing here is stored: scores are derived from the progress tables on
// every request (see the header comment in lib/career-competency.ts).
// Auth-scoped - the user id always comes from the session.

export const dynamic = "force-dynamic";

const CFA_LESSON_IDS = Array.from(new Set(CFA_LEVEL_1_SUBJECTS.flatMap((s) => s.lessonIds)));

const DOMAIN_META = Object.fromEntries(
  SKILL_DOMAINS.map((d) => [d.id, { label: d.label, gapHint: d.gapHint }])
) as Record<(typeof SKILL_DOMAINS)[number]["id"], { label: string; gapHint: string }>;

// Same treatment as lib/supabase-quiz-sessions.ts' isMissingTableError: a
// table that hasn't been migrated in this environment yet (user_cv_bullets,
// user_career_mission_claims and the CFA "Module" table are all optional
// here) degrades to "no signal" rather than 500-ing the whole profile.
async function safe<T>(query: PromiseLike<{ data: unknown; count?: number | null }>): Promise<{
  data: T | null;
  count: number | null;
}> {
  try {
    const res = await query;
    return { data: (res.data as T | null) ?? null, count: res.count ?? null };
  } catch {
    return { data: null, count: null };
  }
}

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const weekStart = getWeekStart();
  const weekStartIso = weekStart.toISOString();
  const weekKey = getWeekKey();

  const [progressRes, quizRes, cfaModuleRes, moduleCountRes, goalRes, claimsRes, cvBulletRes, caseRes] =
    await Promise.all([
      safe<{ lesson_id: number; completed_at: string | null }[]>(
        supabase.from("user_progress").select("lesson_id, completed_at").eq("user_id", user.id).eq("completed", true)
      ),
      safe<{ track: string; score: number; total: number; completed_at: string }[]>(
        supabase.from("user_quiz_sessions").select("track, score, total, completed_at").eq("user_id", user.id)
      ),
      safe<{ module_id: string }[]>(
        supabase.from("cfa_module_progress").select("module_id").eq("user_id", user.id).eq("completed", true)
      ),
      safe<null>(supabase.from("Module").select("id", { count: "exact", head: true })),
      safe<{ career_id: string }>(
        supabase.from("user_career_goals").select("career_id").eq("user_id", user.id).maybeSingle()
      ),
      safe<{ mission_id: string }[]>(
        supabase
          .from("user_career_mission_claims")
          .select("mission_id")
          .eq("user_id", user.id)
          .eq("week_key", weekKey)
      ),
      safe<{ id: number; career_id: string; content: string; created_at: string }[]>(
        supabase
          .from("user_cv_bullets")
          .select("id, career_id, content, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(50)
      ),
      safe<{ id: number; created_at: string }[]>(
        supabase
          .from("game_sessions")
          .select("id, created_at")
          .eq("user_id", user.id)
          .eq("game_type", "weekly-case-challenge")
          .gte("created_at", weekStartIso)
      ),
    ]);

  const progressRows = progressRes.data ?? [];
  const completedLessonIds = progressRows.map((r) => r.lesson_id);

  const quizRows = quizRes.data ?? [];
  const quizSessions: QuizSessionSignal[] = quizRows
    .filter((r): r is typeof r & { track: QuizSessionSignal["track"] } =>
      ["personal", "professional", "cfa", "ib", "mock-interview"].includes(r.track)
    )
    .map((r) => ({ track: r.track, score: Number(r.score) || 0, total: Number(r.total) || 0 }));

  const competencies = computeCompetencyScores({
    completedLessonIds,
    quizSessions,
    completedCfaModuleIds: (cfaModuleRes.data ?? []).map((r) => r.module_id),
    totalCfaModules: moduleCountRes.count ?? 0,
    cfaLessonIds: CFA_LESSON_IDS,
  });

  const coverage = computeDomainCoverage(completedLessonIds);

  // Target for the gap panel: an explicit ?target=, else the career the user
  // has pinned as their goal (lib/supabase-career-goals.ts), else nothing -
  // the panel prompts them to pick one rather than guessing.
  const savedGoal = goalRes.data?.career_id ?? null;
  const requestedTarget = request.nextUrl.searchParams.get("target");
  const targetId = requestedTarget || savedGoal;
  const targetCareer = targetId ? FINANCE_CAREERS.find((c) => c.id === targetId) ?? null : null;
  const certification = targetId ? CERTIFICATION_TARGETS[targetId] ?? null : null;

  const skillGap =
    targetCareer || certification
      ? computeSkillGap(getRequirementsForTarget(targetCareer, targetId ?? undefined), coverage, DOMAIN_META)
      : null;

  // Weekly mission counters, all derived from the same rows fetched above.
  const weekStartMs = weekStart.getTime();
  const inThisWeek = (iso: string | null | undefined) =>
    Boolean(iso) && new Date(iso as string).getTime() >= weekStartMs;

  const valuationDomainIds = new Set(SKILL_DOMAINS.find((d) => d.id === "valuation")?.lessonIds ?? []);
  const counts: Partial<CareerMissionCounts> = {
    ib_questions: quizRows
      .filter((r) => (r.track === "ib" || r.track === "mock-interview") && inThisWeek(r.completed_at))
      .reduce((sum, r) => sum + (Number(r.total) || 0), 0),
    valuation_lessons: progressRows.filter((r) => valuationDomainIds.has(r.lesson_id) && inThisWeek(r.completed_at)).length,
    cv_bullets: (cvBulletRes.data ?? []).filter((r) => inThisWeek(r.created_at)).length,
    mock_interview: quizRows.filter((r) => r.track === "mock-interview" && inThisWeek(r.completed_at)).length,
    company_case: (caseRes.data ?? []).length,
  };

  const missions = buildWeeklyMissionState(
    counts,
    (claimsRes.data ?? []).map((r) => r.mission_id),
    weekKey
  );

  return NextResponse.json({
    competencies,
    coverage,
    targetId: targetId ?? null,
    savedGoal,
    skillGap,
    missions,
    cvBullets: cvBulletRes.data ?? [],
    totalLessonsCompleted: completedLessonIds.length,
  });
}
