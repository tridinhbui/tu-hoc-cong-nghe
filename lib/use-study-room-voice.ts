"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError, type ApiErrorCode } from "@/lib/api-error-code";
import {
  Room,
  RoomEvent,
  Track,
  type RemoteTrack,
  type RemoteTrackPublication,
  type RemoteParticipant,
  type Participant,
} from "livekit-client";

// Voice chat for a study room, over LiveKit.
//
// Deliberately opt-in and audio-only. These rooms are re-matched randomly
// every Monday (see weekly_rematch_study_rooms()), so members are frequently
// strangers who did not choose each other - nobody is connected, and no
// microphone is opened, until they press the button themselves. The server
// refuses to grant a camera track at all (app/api/study-room/voice-token).
//
// The hook owns exactly one Room instance for the component's lifetime and
// tears it down on unmount; a leaked Room keeps a live mic open, which is the
// worst possible bug in this feature.

export type VoiceStatus = "idle" | "connecting" | "connected" | "unavailable" | "error";

export interface StudyRoomVoiceState {
  status: VoiceStatus;
  /** Supabase user ids currently connected to the voice channel, including self. */
  participantIds: string[];
  /** Supabase user ids currently speaking - drives the glow on the 3D seats. */
  speakingIds: string[];
  micEnabled: boolean;
  /** Browser blocked autoplay; the user has to tap once to hear anything. */
  needsAudioUnlock: boolean;
  /** MÃ lỗi, không phải câu chữ: hook này nằm ở lib nên không có `useI18n()`,
   *  và một câu tiếng Việt trả về từ đây sẽ hiện nguyên vậy cho người đọc
   *  tiếng Anh. Component tra mã qua `translateApiError`. */
  errorCode: ApiErrorCode | null;
  join: () => Promise<void>;
  leave: () => Promise<void>;
  toggleMic: () => Promise<void>;
  unlockAudio: () => Promise<void>;
}

export function useStudyRoomVoice(roomId: number | null): StudyRoomVoiceState {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [participantIds, setParticipantIds] = useState<string[]>([]);
  const [speakingIds, setSpeakingIds] = useState<string[]>([]);
  const [micEnabled, setMicEnabled] = useState(false);
  const [needsAudioUnlock, setNeedsAudioUnlock] = useState(false);
  const [errorCode, setErrorCode] = useState<ApiErrorCode | null>(null);

  const roomRef = useRef<Room | null>(null);
  /** roomRef is only populated once the token round-trip resolves, so it
   *  cannot by itself stop a second join() launched in the meantime - which
   *  would build a second Room and open a second microphone. */
  const joiningRef = useRef(false);
  /** Audio elements created by track.attach(), kept so they can be detached
   *  again - an orphaned <audio> keeps playing after the peer leaves. */
  const audioElsRef = useRef<Map<string, HTMLMediaElement>>(new Map());

  const syncParticipants = useCallback((room: Room) => {
    const ids = [room.localParticipant.identity, ...Array.from(room.remoteParticipants.values()).map((p) => p.identity)];
    setParticipantIds(ids.filter(Boolean));
  }, []);

  const teardown = useCallback(async () => {
    const room = roomRef.current;
    roomRef.current = null;

    for (const el of audioElsRef.current.values()) {
      el.remove();
    }
    audioElsRef.current.clear();

    if (room) {
      room.removeAllListeners();
      await room.disconnect().catch(() => {});
    }

    setParticipantIds([]);
    setSpeakingIds([]);
    setMicEnabled(false);
    setNeedsAudioUnlock(false);
    setStatus("idle");
  }, []);

  const join = useCallback(async () => {
    if (roomId === null || roomRef.current || joiningRef.current) return;
    joiningRef.current = true;
    setStatus("connecting");
    setErrorCode(null);

    try {
      const res = await fetch("/api/study-room/voice-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });
      const body = await res.json().catch(() => null);

      if (res.status === 503) {
        setStatus("unavailable");
        setErrorCode((body?.code as ApiErrorCode | undefined) ?? "voiceNotConfigured");
        return;
      }
      if (!res.ok) {
        throw new ApiError(body?.error ?? "voice token failed", body?.code as ApiErrorCode | undefined);
      }

      const room = new Room({ adaptiveStream: true, dynacast: true });
      roomRef.current = room;

      room
        .on(RoomEvent.TrackSubscribed, (track: RemoteTrack, _pub: RemoteTrackPublication, participant: RemoteParticipant) => {
          if (track.kind !== Track.Kind.Audio) return;
          const el = track.attach();
          el.setAttribute("data-livekit-identity", participant.identity);
          // Off-screen rather than unmounted: an <audio> has to be in the
          // document for playback, but nothing about it is meant to be seen.
          el.style.display = "none";
          document.body.appendChild(el);
          audioElsRef.current.set(participant.identity, el);
        })
        .on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack, _pub, participant: RemoteParticipant) => {
          track.detach().forEach((el) => el.remove());
          audioElsRef.current.delete(participant.identity);
        })
        .on(RoomEvent.ParticipantConnected, () => syncParticipants(room))
        .on(RoomEvent.ParticipantDisconnected, () => syncParticipants(room))
        .on(RoomEvent.ActiveSpeakersChanged, (speakers: Participant[]) => {
          setSpeakingIds(speakers.map((s) => s.identity).filter(Boolean));
        })
        .on(RoomEvent.AudioPlaybackStatusChanged, () => {
          setNeedsAudioUnlock(!room.canPlaybackAudio);
        })
        .on(RoomEvent.Disconnected, () => {
          void teardown();
        });

      await room.connect(body.url, body.token);

      // Connected but silent: the mic stays off until the user asks for it,
      // so joining to listen never broadcasts a room by accident.
      syncParticipants(room);
      setNeedsAudioUnlock(!room.canPlaybackAudio);
      setStatus("connected");
    } catch (err) {
      console.error("Error joining study room voice:", err);
      await teardown();
      setStatus("error");
      setErrorCode(err instanceof ApiError && err.code ? err.code : "voiceJoinFailed");
    } finally {
      joiningRef.current = false;
    }
  }, [roomId, syncParticipants, teardown]);

  const leave = useCallback(async () => {
    await teardown();
  }, [teardown]);

  const toggleMic = useCallback(async () => {
    const room = roomRef.current;
    if (!room) return;
    const next = !micEnabled;
    try {
      await room.localParticipant.setMicrophoneEnabled(next);
      setMicEnabled(next);
    } catch (err) {
      console.error("Error toggling microphone:", err);
      // Almost always a denied permission prompt - surface it rather than
      // leaving the button looking like it worked.
      setErrorCode("micFailed");
    }
  }, [micEnabled]);

  const unlockAudio = useCallback(async () => {
    const room = roomRef.current;
    if (!room) return;
    await room.startAudio().catch(() => {});
    setNeedsAudioUnlock(!room.canPlaybackAudio);
  }, []);

  // Leaving the page must close the mic, not just stop rendering the button.
  useEffect(() => {
    return () => {
      void teardown();
    };
  }, [teardown]);

  // Switching rooms (the Monday re-match, or a manual join) has to drop the
  // old channel - otherwise the user stays audible in a room they left.
  useEffect(() => {
    if (roomRef.current) void teardown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return {
    status,
    participantIds,
    speakingIds,
    micEnabled,
    needsAudioUnlock,
    errorCode,
    join,
    leave,
    toggleMic,
    unlockAudio,
  };
}
