import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { LEVEL_EXAMS } from "@/lib/level-exams";

// One-time upward migration of promotion-exam passes that only ever existed in
// localStorage (thtcdn_user_level_exams_<uid>), from before
// 20260818_user_level_exams.sql existed.
//
// These records were graded in the browser, so they are inherently unverified -
// they are stored with source='legacy_local' precisely so a ranking can
// discount or exclude them rather than treat them as equal to a server-graded
// pass. Importing them at all is a deliberate trade: without it, learners lose
// levels they legitimately certified.
//
// Guards: a legacy row never overwrites a server-graded one, levels and scores
// are bounded, and one request can carry at most the number of levels that
// exist.

const MAX_RECORDS = 20;

interface LegacyRecord {
  passedLevel: number;
  passedAt: number;
  score: number;
}

function isLegacyRecord(value: unknown): value is LegacyRecord {
  return (
    !!value &&
    typeof value === "object" &&
    Number.isInteger((value as LegacyRecord).passedLevel) &&
    typeof (value as LegacyRecord).passedAt === "number" &&
    Number.isInteger((value as LegacyRecord).score)
  );
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!Array.isArray(body?.records) || body.records.length > MAX_RECORDS) {
    return NextResponse.json({ error: "Invalid records" }, { status: 400 });
  }

  const candidates = (body.records as unknown[]).filter(isLegacyRecord).filter(
    (record) =>
      Boolean(LEVEL_EXAMS[record.passedLevel]) &&
      record.score >= LEVEL_EXAMS[record.passedLevel].minPassPercentage &&
      record.score <= 100 &&
      Number.isFinite(record.passedAt) &&
      record.passedAt > 0 &&
      record.passedAt <= Date.now()
  );

  if (candidates.length === 0) {
    return NextResponse.json({ imported: 0 });
  }

  const admin = createAdminClient();

  // Never downgrade an existing row: a server-graded pass is authoritative, and
  // an already-imported legacy row needs no rewrite.
  const { data: existing, error: readError } = await admin
    .from("user_level_exams")
    .select("level")
    .eq("user_id", user.id);
  if (readError) {
    return NextResponse.json({ error: readError.message }, { status: 500 });
  }
  const alreadyRecorded = new Set((existing ?? []).map((row) => Number(row.level)));

  const rows = candidates
    .filter((record) => !alreadyRecorded.has(record.passedLevel))
    .map((record) => ({
      user_id: user.id,
      level: record.passedLevel,
      score: record.score,
      source: "legacy_local" as const,
      passed_at: new Date(record.passedAt).toISOString(),
    }));

  if (rows.length === 0) {
    return NextResponse.json({ imported: 0 });
  }

  const { error } = await admin
    .from("user_level_exams")
    .upsert(rows, { onConflict: "user_id,level", ignoreDuplicates: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ imported: rows.length });
}
