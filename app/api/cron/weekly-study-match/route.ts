import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createAdminClient } from "@/lib/supabase-admin";

// Vercel Cron hits this via GET (see vercel.json: "0 13 * * 1" = Monday
// 20:00 giờ Việt Nam, an hour after send-weekly-digest so the digest email
// and the fresh room assignment land close together). Closes every open
// study_room_members row and re-groups everyone active in the last 7 days
// into fresh random rooms by preferred_track - see
// public.weekly_rematch_study_rooms() in
// supabase/migrations/20260719_study_room_weekly_match_and_chat.sql for the
// actual grouping logic. Manual join_study_room/leave_study_room stay
// available afterward for anyone who wants to switch mid-week.
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[weekly-study-match] CRON_SECRET is not set - refusing to run.");
    return false;
  }
  const authHeader = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${cronSecret}`;
  const authBuf = Buffer.from(authHeader);
  const expectedBuf = Buffer.from(expected);
  if (authBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(authBuf, expectedBuf);
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase.rpc("weekly_rematch_study_rooms");

  if (error) {
    console.error("[weekly-study-match] weekly_rematch_study_rooms failed:", error);
    return NextResponse.json({ error: "Failed to rematch study rooms" }, { status: 500 });
  }

  const result = (data as { rooms_created: number; users_matched: number }[] | null)?.[0] ?? {
    rooms_created: 0,
    users_matched: 0,
  };

  return NextResponse.json({
    roomsCreated: result.rooms_created,
    usersMatched: result.users_matched,
  });
}
