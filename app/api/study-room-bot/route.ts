import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getLessonsMeta } from "@/lib/lessons-loader";
import { CFA_LEVEL_1_SUBJECTS } from "@/lib/cfa-track";
import { isLessonIdInTrack } from "@/lib/track-stages";

export const dynamic = "force-dynamic";

type StudyRoomTopic = "personal" | "professional" | "cfa";

const BOT_COMMANDS = new Set(["/taitai", "/tai", "/bot", "/rules", "/luat"]);

function buildRulesSummary(topic: StudyRoomTopic, lessonCount: number) {
  const topicLabel =
    topic === "personal"
      ? "Tài chính cá nhân"
      : topic === "professional"
        ? "Tài chính chuyên ngành"
        : "CFA Level I";

  return `Tài Tài đây 👋 Nhóm này đang học theo hướng ${topicLabel}, hiện có khoảng ${lessonCount} bài để cả nhóm cùng cày. Luật ngắn gọn: mỗi người cố giữ nhịp tối thiểu 3 bài/tuần, đạt chỉ tiêu thì nhóm được giữ tiếp, và giữ được 3 tuần liên tiếp thì lên nhóm vĩnh viễn.`;
}

function countLessonsForTopic(topic: StudyRoomTopic, lessonsMeta: Awaited<ReturnType<typeof getLessonsMeta>>) {
  if (topic === "cfa") {
    const visibleIds = new Set(lessonsMeta.filter((l) => l.isVisible !== false).map((l) => l.id));
    const cfaIds = new Set<number>();
    for (const subject of CFA_LEVEL_1_SUBJECTS) {
      for (const lessonId of subject.lessonIds) {
        if (visibleIds.has(lessonId)) cfaIds.add(lessonId);
      }
    }
    return cfaIds.size;
  }

  return lessonsMeta.filter((lesson) => {
    if (lesson.isVisible === false) return false;
    if (lesson.track === "bonus") return false;
    if (lesson.track) return lesson.track === topic;
    return isLessonIdInTrack(lesson.id, topic);
  }).length;
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { roomId?: unknown; command?: unknown } | null;
  const roomId = typeof body?.roomId === "number" ? body.roomId : Number(body?.roomId);
  const command = typeof body?.command === "string" ? body.command.trim().toLowerCase() : "";

  if (!Number.isFinite(roomId) || roomId <= 0) {
    return NextResponse.json({ error: "Missing room id" }, { status: 400 });
  }

  if (!BOT_COMMANDS.has(command)) {
    return NextResponse.json({ error: "Unknown command" }, { status: 400 });
  }

  const { data: membership, error: membershipError } = await supabase
    .from("study_room_members")
    .select("room_id")
    .eq("room_id", roomId)
    .eq("user_id", user.id)
    .is("left_at", null)
    .maybeSingle();

  if (membershipError) {
    return NextResponse.json({ error: membershipError.message }, { status: 500 });
  }

  if (!membership) {
    return NextResponse.json({ error: "Bạn không còn trong nhóm này" }, { status: 403 });
  }

  const admin = createAdminClient();
  const { data: room, error: roomError } = await admin
    .from("study_rooms")
    .select("id, topic")
    .eq("id", roomId)
    .maybeSingle();

  if (roomError || !room) {
    return NextResponse.json({ error: roomError?.message || "Room not found" }, { status: 404 });
  }

  const lessonsMeta = await getLessonsMeta();
  const lessonCount = countLessonsForTopic(room.topic as StudyRoomTopic, lessonsMeta);
  const content = buildRulesSummary(room.topic as StudyRoomTopic, lessonCount);

  const { data: inserted, error: insertError } = await admin
    .from("study_room_messages")
    .insert({
      room_id: roomId,
      sender_id: null,
      is_bot: true,
      content,
    })
    .select("*")
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message: inserted });
}
