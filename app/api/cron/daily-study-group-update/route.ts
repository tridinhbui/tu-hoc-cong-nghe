import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createAdminClient } from "@/lib/supabase-admin";

// Vercel Cron hits this via GET (see vercel.json: "0 14 * * *" = daily,
// after the weekly-study-match run so a freshly-formed room gets its first
// "Tài Tài" update the same day). Posts one automated progress-recap
// message per active study room, acting as the group's "quản lý" - who
// studied today, who hasn't yet, and how close the room is to its weekly
// XP goal. Posted as is_bot=true/sender_id=null (see
// supabase/migrations/20260720_study_room_bot_messages.sql) via the
// service-role client, which bypasses study_room_messages' RLS (that
// policy only ever governs human sends).
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[daily-study-group-update] CRON_SECRET is not set - refusing to run.");
    return false;
  }
  const authHeader = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${cronSecret}`;
  const authBuf = Buffer.from(authHeader);
  const expectedBuf = Buffer.from(expected);
  if (authBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(authBuf, expectedBuf);
}

interface RoomRow {
  id: number;
  weekly_xp_goal: number;
}

interface MemberRow {
  user_id: string;
  full_name: string | null;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const { data: rooms, error: roomsError } = await supabase
    .from("study_rooms")
    .select("id, weekly_xp_goal");

  if (roomsError) {
    console.error("[daily-study-group-update] Failed to load rooms:", roomsError);
    return NextResponse.json({ error: "Failed to load rooms" }, { status: 500 });
  }

  let posted = 0;

  for (const room of (rooms ?? []) as RoomRow[]) {
    const { data: members } = await supabase
      .from("study_room_members")
      .select("user_id")
      .eq("room_id", room.id)
      .is("left_at", null);

    const memberIds = (members ?? []).map((m: { user_id: string }) => m.user_id);
    if (memberIds.length === 0) continue;

    // study_room_members.user_id references auth.users, not user_profiles
    // directly, so PostgREST can't embed the join - fetch profiles separately.
    const { data: profiles } = await supabase
      .from("user_profiles")
      .select("id, full_name")
      .in("id", memberIds);

    const nameById = new Map((profiles ?? []).map((p: { id: string; full_name: string | null }) => [p.id, p.full_name]));
    const memberList: MemberRow[] = memberIds.map((id) => ({ user_id: id, full_name: nameById.get(id) ?? null }));

    const { data: todayProgress } = await supabase
      .from("user_progress")
      .select("user_id")
      .in(
        "user_id",
        memberList.map((m) => m.user_id)
      )
      .eq("completed", true)
      .gte("completed_at", todayStart.toISOString());

    const activeToday = new Set((todayProgress ?? []).map((r: { user_id: string }) => r.user_id));
    const studiedNames = memberList.filter((m) => activeToday.has(m.user_id)).map((m) => m.full_name || "Một thành viên");
    const notYetCount = memberList.length - studiedNames.length;

    let content: string;
    if (studiedNames.length === 0) {
      content = `Cập nhật hôm nay: chưa ai trong nhóm học bài nào cả 👀 Ai học đầu tiên hôm nay nào?`;
    } else if (notYetCount === 0) {
      content = `Cập nhật hôm nay: cả ${studiedNames.length} thành viên đều đã học ít nhất 1 bài! Nhóm đang giữ nhịp rất tốt 🔥`;
    } else {
      content = `Cập nhật hôm nay: ${studiedNames.slice(0, 3).join(", ")}${studiedNames.length > 3 ? ` +${studiedNames.length - 3} bạn nữa` : ""} đã học rồi. Còn ${notYetCount} bạn chưa học hôm nay - đừng để mai dồn nhé!`;
    }

    const { error: insertError } = await supabase.from("study_room_messages").insert({
      room_id: room.id,
      sender_id: null,
      is_bot: true,
      content,
    });

    if (insertError) {
      console.error(`[daily-study-group-update] Failed to post for room ${room.id}:`, insertError);
      continue;
    }
    posted += 1;
  }

  return NextResponse.json({ roomsUpdated: posted });
}
