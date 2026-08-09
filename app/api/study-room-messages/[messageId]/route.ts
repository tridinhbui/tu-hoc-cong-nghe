import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

function getMessageIdFromUrl(request: NextRequest) {
  const raw = new URL(request.url).pathname.split("/").pop();
  const messageId = Number(raw);
  return Number.isFinite(messageId) && messageId > 0 ? messageId : null;
}

export async function DELETE(request: NextRequest) {
  const messageId = getMessageIdFromUrl(request);
  if (!messageId) {
    return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data: message, error: messageError } = await admin
    .from("study_room_messages")
    .select("id, room_id, sender_id, is_bot")
    .eq("id", messageId)
    .maybeSingle();

  if (messageError) {
    return NextResponse.json({ error: messageError.message }, { status: 500 });
  }

  if (!message) {
    return NextResponse.json({ ok: true });
  }

  if (message.is_bot || message.sender_id !== user.id) {
    return NextResponse.json({ code: "notOwnMessageDelete" }, { status: 403 });
  }

  const { data: membership, error: membershipError } = await admin
    .from("study_room_members")
    .select("room_id")
    .eq("room_id", message.room_id)
    .eq("user_id", user.id)
    .is("left_at", null)
    .maybeSingle();

  if (membershipError) {
    return NextResponse.json({ error: membershipError.message }, { status: 500 });
  }

  if (!membership) {
    return NextResponse.json({ code: "notInGroup" }, { status: 403 });
  }

  const { error: deleteError } = await admin
    .from("study_room_messages")
    .delete()
    .eq("id", messageId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: NextRequest) {
  const messageId = getMessageIdFromUrl(request);
  if (!messageId) {
    return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { content?: unknown; isPinned?: unknown } | null;
  const wantsContentUpdate = typeof body?.content === "string";
  const wantsPinUpdate = typeof body?.isPinned === "boolean";

  if (!wantsContentUpdate && !wantsPinUpdate) {
    return NextResponse.json({ error: "Missing update payload" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: message, error: messageError } = await admin
    .from("study_room_messages")
    .select("id, room_id, sender_id, is_bot")
    .eq("id", messageId)
    .maybeSingle();

  if (messageError) {
    return NextResponse.json({ error: messageError.message }, { status: 500 });
  }

  if (!message) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  if (message.is_bot) {
    return NextResponse.json({ code: "systemMessageNotEditable" }, { status: 403 });
  }

  const { data: membership, error: membershipError } = await admin
    .from("study_room_members")
    .select("room_id")
    .eq("room_id", message.room_id)
    .eq("user_id", user.id)
    .is("left_at", null)
    .maybeSingle();

  if (membershipError) {
    return NextResponse.json({ error: membershipError.message }, { status: 500 });
  }

  if (!membership) {
    return NextResponse.json({ code: "notInGroup" }, { status: 403 });
  }

  const updatePayload: { content?: string; is_pinned?: boolean } = {};

  if (wantsContentUpdate) {
    if (message.sender_id !== user.id) {
      return NextResponse.json({ code: "notOwnMessageEdit" }, { status: 403 });
    }
    const content = (body.content as string).trim();
    if (content.length < 1 || content.length > 2000) {
      return NextResponse.json({ code: "messageLength" }, { status: 400 });
    }
    updatePayload.content = content;
  }

  if (wantsPinUpdate) {
    updatePayload.is_pinned = body.isPinned as boolean;
  }

  const { data: updated, error: updateError } = await admin
    .from("study_room_messages")
    .update(updatePayload)
    .eq("id", messageId)
    .select("*")
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ message: updated });
}
