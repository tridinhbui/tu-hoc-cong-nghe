import { NextRequest, NextResponse } from "next/server";
import { AccessToken, type VideoGrant } from "livekit-server-sdk";
import { TrackSource } from "@livekit/protocol";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// Mints a LiveKit access token for the caller's study-room voice channel.
//
// The whole security model of the voice room lives here, because a LiveKit
// token is a bearer credential: whoever holds one can join that room and be
// heard. So the room name is *derived from the database*, never from the
// request - a client that POSTs {roomId: 999} for a room it isn't in gets a
// 403 rather than a token that would drop it into strangers' conversation.
//
// Grants are audio-only on purpose (canPublishSources: ["microphone"]).
// Camera is a separate, later decision with its own privacy trade-offs; until
// then the server simply will not authorise a video track, so no amount of
// client-side tinkering can turn one on.

export const dynamic = "force-dynamic";

/** LiveKit room name for a study room. Prefixed so this project's rooms can
 *  never collide with anything else sharing the LiveKit project. */
function livekitRoomName(roomId: number): string {
  return `study-room-${roomId}`;
}

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!url || !apiKey || !apiSecret) {
    // Voice is optional infrastructure: an environment without LiveKit
    // credentials should degrade to "the button is unavailable", not 500.
    return NextResponse.json({ code: "voiceNotConfigured", configured: false }, { status: 503 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { roomId?: unknown } | null;
  const roomId = typeof body?.roomId === "number" ? body.roomId : null;
  if (roomId === null) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  // Membership check against the same "active member" definition the chat RLS
  // uses (left_at is null), so leaving a room also takes away the mic.
  const { data: membership, error: membershipError } = await supabase
    .from("study_room_members")
    .select("id")
    .eq("room_id", roomId)
    .eq("user_id", user.id)
    .is("left_at", null)
    .maybeSingle();

  if (membershipError) {
    return NextResponse.json({ error: membershipError.message }, { status: 500 });
  }
  if (!membership) {
    return NextResponse.json({ code: "notInStudyRoom" }, { status: 403 });
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const grant: VideoGrant = {
    room: livekitRoomName(roomId),
    roomJoin: true,
    canSubscribe: true,
    canPublish: true,
    canPublishSources: [TrackSource.MICROPHONE],
    canPublishData: false,
  };

  // identity is the Supabase user id so the client can match a LiveKit
  // participant back to the seat it belongs to in the 3D room.
  const at = new AccessToken(apiKey, apiSecret, {
    identity: user.id,
    name: profile?.full_name ?? undefined,
    // Short-lived: the client re-requests on every join, and an expired token
    // that leaked is worth nothing.
    ttl: "1h",
  });
  at.addGrant(grant);

  return NextResponse.json({
    token: await at.toJwt(),
    url,
    roomName: livekitRoomName(roomId),
    identity: user.id,
  });
}
