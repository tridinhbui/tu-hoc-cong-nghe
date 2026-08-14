"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Joystick from "@/components/world-controls/joystick";
import dynamic from "next/dynamic";
import { CHAT_MAX_LENGTH, POMODORO_MS, colorForUser, type LobbyChatMessage } from "@/lib/supabase-lobby";
import { sayInStudyWorld } from "@/lib/supabase-study-world";
import { createWalkState } from "@/components/world-controls/easy-walk";
import { useWorldSound } from "@/components/world-controls/world-sound";
import type { CharacterEquipments } from "@/lib/rpg-items";
import { finishFocusSession, getTodayFocusSeconds, startFocusSession } from "@/lib/focus-session";
import { getSceneLighting } from "@/lib/study-room-lighting";
import {
  AWAY_MS,
  DAILY_FOCUS_TARGET_MINUTES,
  focusMinutesToday,
  formatCountdown,
  isSessionComplete,
  notifySessionDone,
  playSessionChime,
  remainingMs,
  shouldEndForAway,
} from "@/lib/study-session";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { QUEST_XP_REWARDS } from "@/lib/quest-rewards";

/** three.js chỉ chạy phía trình duyệt: ssr:false giữ nó ngoài bundle server, và
 *  người dùng thấy khung chờ thay vì lỗi hydrate. */
const StudyRoomScene = dynamic(() => import("./StudyRoomScene"), {
  ssr: false,
  loading: () => <SceneFallbackLoader />,
});

/** Wrapper so the dynamic-import loading state gets its own translation
 *  instead of a hard-coded Vietnamese string baked into the `dynamic()` call. */
function SceneFallbackLoader() {
  const { t } = useI18n();
  return <SceneFallback label={t.studyWorld.loadingRoom} />;
}

function SceneFallback({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-stone-950">
      <div className="text-center">
        <div className="mb-3 text-4xl">🚪</div>
        <p className="text-sm font-medium text-stone-400">{label}</p>
      </div>
    </div>
  );
}


export interface StudyRoomWorldProps {
  roomId: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  level: number;
  /** Số bài đã học trong tuần - khắc lên biển tên như chuỗi ngày ở thư viện. */
  weeklyLessons: number;
  /** Mục tiêu XP tuần của nhóm, viết lên bảng trắng trong phòng. */
  weeklyXpProgress: number;
  weeklyXpGoal: number;
  /** Dòng nhiệm vụ hiện lên bảng, tối đa vài dòng cho vừa khung. */
  missionLines: string[];
  topicLabel: string;
  /** Đồ đang trang bị, nạp ở phía gọi. */
  gear?: CharacterEquipments | null;
  /** Thành viên nhóm; ai không online sẽ ngồi mờ ở ghế của mình. */
  members?: Array<{ userId: string; name: string; avatarUrl: string | null; color: string; level: number }>;
  /** Bấm "ra khỏi phòng" khi đứng ở cửa. */
  onExit?: () => void;
}

export default function StudyRoomWorld({
  roomId,
  userId,
  name,
  avatarUrl,
  level,
  weeklyLessons,
  weeklyXpProgress,
  weeklyXpGoal,
  missionLines,
  topicLabel,
  gear,
  members = [],
  onExit,
}: StudyRoomWorldProps) {
  const { t } = useI18n();
  const [seatable, setSeatable] = useState<number | null>(null);
  const [seated, setSeated] = useState<number | null>(null);
  const [seatStartedAt, setSeatStartedAt] = useState<number | null>(null);
  const [nearDoor, setNearDoor] = useState(false);
  const [peerCount, setPeerCount] = useState(0);
  const [log, setLog] = useState<LobbyChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [selfSpeech, setSelfSpeech] = useState<{ text: string; at: number } | null>(null);
  const [seatedCount, setSeatedCount] = useState(0);
  /** Phòng học là thế giới duy nhất trong ba cái chưa có tiếng, dù nó là nơi
   *  người ta ở lại lâu nhất. Mặc định vẫn TẮT - lý do nằm trong world-sound. */
  const sound = useWorldSound();
  /** Những người đã bị ẩn trong phiên này.
   *
   *  Chỉ nằm trong bộ nhớ và chỉ lọc phần chữ ở máy mình: phòng này giới hạn
   *  trong nhóm nên rủi ro thấp, và một hệ thống báo cáo có hồ sơ, có người
   *  duyệt là việc khác hẳn - dựng nửa vời thì tệ hơn không dựng. Cái cần có
   *  ngay là một lối thoát tức thì cho người đang bị làm phiền, không phải một
   *  quy trình. */
  const [mutedIds, setMutedIds] = useState<ReadonlySet<string>>(new Set());
  const [nowTick, setNowTick] = useState(0);
  const [lighting, setLighting] = useState<{ daylight: number; lampColor: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const walkRef = useRef(createWalkState());
  /** Id phiên đang mở ở server. Ngồi xuống mở, đứng dậy đóng - và độ dài do
   *  server tính, nên đây chỉ cần giữ cái id. */
  const focusIdRef = useRef<number | null>(null);
  /** Giây của các phiên ĐÃ ĐÓNG hôm nay. Giây chứ không phải phút: phiên đang
   *  mở phải cộng thêm vào, vì `focus_sessions.seconds` chỉ được ghi lúc đóng. */
  const [todayClosedSeconds, setTodayClosedSeconds] = useState<number | null>(null);
  /** Phiên vừa chạy hết giờ. Giữ tách khỏi `seated` vì người học được quyền
   *  ngồi tiếp sau khi chuông reo - đứng dậy là quyết định của họ, không phải
   *  của cái đồng hồ. */
  const [sessionDone, setSessionDone] = useState(false);
  /** Vì sao phiên vừa kết thúc, để nói lại cho đúng: tự đứng dậy khác với bị
   *  dừng vì rời đi. */
  const [endedAway, setEndedAway] = useState(false);
  const chimedRef = useRef(false);

  // Đọc đồng hồ sau khi mount, không lúc render: giờ của server và giờ của
  // người học khác nhau, và một căn phòng sáng khác nhau ở hai lần render đầu
  // là lỗi hydrate. Cập nhật lại mỗi 10 phút để phiên học kéo dài qua hoàng
  // hôn thì căn phòng cũng đi theo.
  useEffect(() => {
    const read = () => setLighting(getSceneLighting(new Date().getHours()));
    read();
    const timer = window.setInterval(read, 10 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  /** Tổng phút hôm nay đọc ngay khi vào phòng, không đợi đóng phiên đầu tiên.
   *  Thư viện đã sửa chỗ này từ trước; phòng nhóm thì chưa, nên người đã ngồi
   *  học buổi sáng quay lại vẫn thấy tiến độ đứng ở 0/15 - một con số sai, và
   *  sai theo hướng làm nản. */
  useEffect(() => {
    void getTodayFocusSeconds()
      .then((s) => setTodayClosedSeconds(s))
      .catch(() => {});
  }, []);

  /** Mở và đóng phiên ngồi học. Trước đây ngồi hết 25 phút không để lại gì cả:
   *  đứng dậy là mất sạch, không chuỗi ngày, không dòng nào trong lịch sử. */
  useEffect(() => {
    if (seated === null) return;
    let cancelled = false;
    void startFocusSession("nhom-hoc", String(roomId)).then((id) => {
      if (cancelled) void (id !== null && finishFocusSession(id));
      else focusIdRef.current = id;
    });
    return () => {
      cancelled = true;
      const id = focusIdRef.current;
      focusIdRef.current = null;
      if (id !== null) {
        void finishFocusSession(id).then((r) => {
          if (r.counted) void getTodayFocusSeconds().then((s) => setTodayClosedSeconds(s));
        });
      }
    };
  }, [seated, roomId]);

  /** Nhịp giây cho đồng hồ phiên. Chỉ chạy khi đang ngồi - một setInterval sống
   *  suốt phiên chỉ để cập nhật thứ không hiển thị là lãng phí, và nó làm cả
   *  HUD re-render mỗi giây. */
  useEffect(() => {
    if (seated === null) return;
    setNowTick(Date.now());
    const timer = window.setInterval(() => setNowTick(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [seated]);

  /** Chuông báo hết phiên, đúng một lần cho mỗi lần ngồi.
   *
   *  Trước đây đồng hồ chạy về 0 rồi hiện chữ "Xong!" và không có gì khác xảy
   *  ra - người ngồi học đúng cách nhất, tức là không nhìn màn hình, là người
   *  duy nhất không biết mình đã xong. */
  useEffect(() => {
    if (seated === null || seatStartedAt === null) return;
    if (chimedRef.current) return;
    if (!isSessionComplete(seatStartedAt, nowTick, POMODORO_MS)) return;
    chimedRef.current = true;
    setSessionDone(true);
    playSessionChime();
    notifySessionDone(Math.round(POMODORO_MS / 60000));
  }, [seated, seatStartedAt, nowTick]);

  /** Rời đi thì phiên dừng.
   *
   *  Tab ẩn liên tục quá ngưỡng nghĩa là người học đã đi chỗ khác, và đếm tiếp
   *  sẽ bơm chính con số mà căn phòng này tồn tại để tạo ra. Cố ý không đo
   *  bàn phím hay chuột: người học nghiêm túc nhất là người ngồi im đọc sách
   *  giấy, và một bộ đếm dựa trên thao tác sẽ đá đúng người đó ra. */
  useEffect(() => {
    if (seated === null) return;
    let hiddenSince: number | null = document.hidden ? Date.now() : null;
    let timer: number | null = null;

    const stopIfAway = () => {
      if (!shouldEndForAway(hiddenSince, Date.now())) return;
      setEndedAway(true);
      setSeated(null);
      setSeatStartedAt(null);
    };

    const onVisibility = () => {
      if (document.hidden) {
        hiddenSince = Date.now();
        timer = window.setTimeout(stopIfAway, AWAY_MS + 500);
      } else {
        hiddenSince = null;
        if (timer !== null) window.clearTimeout(timer);
        timer = null;
      }
    };

    if (hiddenSince !== null) timer = window.setTimeout(stopIfAway, AWAY_MS + 500);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, [seated]);

  /** Ngồi lại thì dọn trạng thái của phiên trước. */
  useEffect(() => {
    if (seated !== null) {
      setSessionDone(false);
      setEndedAway(false);
      chimedRef.current = false;
    }
  }, [seated]);

  const identity = useMemo(
    () => ({
      userId,
      name,
      avatarUrl,
      color: colorForUser(userId),
      streak: weeklyLessons,
      level,
      doneToday: weeklyLessons > 0,
      gear: gear ?? null,
    }),
    [userId, name, avatarUrl, weeklyLessons, level, gear]
  );

  const pushLog = useCallback((message: LobbyChatMessage) => {
    // Giữ 20 dòng gần nhất: đủ để bắt kịp mạch chuyện vừa lỡ, không đủ để thành
    // một cuộn lịch sử phải quản lý. Lời nói trong phòng không được lưu.
    setLog((prev) => [...prev.slice(-19), message]);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = sayInStudyWorld(roomId, userId, name, draft);
    if (!message) return;
    setDraft("");
    // Hiện câu của mình ngay, không chờ vòng về server.
    setSelfSpeech({ text: message.text, at: message.at });
    pushLog(message);
  };

  const boardRows = useMemo(() => {
    const pct = Math.min(100, Math.round((weeklyXpProgress / Math.max(1, weeklyXpGoal)) * 100));
    return [format(t.studyWorld.boardGoalLine, { progress: weeklyXpProgress, goal: weeklyXpGoal, pct }), ...missionLines.slice(0, 4)];
  }, [weeklyXpProgress, weeklyXpGoal, missionLines, t]);

  /** Phút ngồi học hôm nay, đã cộng phiên đang mở. Một biến cho cả dòng chào ở
   *  đầu HUD lẫn ô đồng hồ dưới chân, nên hai chỗ không thể lệch nhau. */
  const focusMinutes = focusMinutesToday(todayClosedSeconds ?? 0, seatStartedAt, nowTick);
  const focusGoalReached = focusMinutes >= DAILY_FOCUS_TARGET_MINUTES;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-stone-950">
      {lighting ? (
        <StudyRoomScene
          walkRef={walkRef}
          roomId={roomId}
          identity={identity}
          seated={seated}
          seatStartedAt={seatStartedAt}
          onSeatableChange={setSeatable}
          onDoorProximity={setNearDoor}
          onPeerCount={setPeerCount}
          onSeatedCount={setSeatedCount}
          onChatMessage={pushLog}
          selfSpeech={selfSpeech}
          members={members}
          boardTitle={format(t.studyWorld.boardTitle, { topic: topicLabel })}
          boardRows={boardRows}
          lampColor={lighting.lampColor}
          daylight={lighting.daylight}
        />
      ) : (
        <SceneFallback label={t.studyWorld.loadingLights} />
      )}

      {/* Số người THẬT đang ở trong phòng, đếm từ presence chứ không phải sĩ số
          thành viên: một phòng 8 người mà đang chỉ có mình bạn là một thông tin
          khác hẳn, và là thông tin cần biết. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-center gap-2 p-3">
        <div className="rounded-2xl bg-stone-900/75 px-4 py-1.5 text-center shadow-lg backdrop-blur">
          <p className="text-[11px] font-bold text-emerald-300">
            {format(t.studyWorld.roomHeader, { topic: topicLabel })}
          </p>
          <p className="text-[10px] text-stone-400">
            {peerCount > 1 ? format(t.studyWorld.peerCount, { count: peerCount }) : t.studyWorld.aloneLabel}
          </p>
          {/* Ở cùng phòng khác với đang cùng học. Cả căn phòng dựng lên vì sự
              hiện diện của người khác, nên phân biệt hai điều đó là thông tin
              đáng hiện nhất ở đây. */}
          {seatedCount > 0 && (
            <p className="mt-0.5 text-[10px] font-bold text-amber-300">
              {format(t.studyWorld.seatedCount, { count: seatedCount })}
            </p>
          )}
          {/* Tổng thời gian đã ngồi học hôm nay. Hiện sau phiên đầu tiên chứ
              không hiện sẵn số 0: một dòng "0 phút" ngay lúc vừa vào phòng là
              lời trách móc, không phải thông tin. */}
          {todayClosedSeconds !== null && focusMinutes > 0 && (
            <p className="mt-0.5 text-[10px] font-bold text-emerald-300">
              {format(t.studyWorld.todayMinutes, { minutes: focusMinutes })}
            </p>
          )}
        </div>
        {/* Âm thanh mặc định TẮT: trình duyệt chặn phát tự động, và tiếng tự
            nổi lên trong một app học tập làm người ta đóng tab. */}
        <button
          type="button"
          onClick={sound.toggle}
          aria-label={sound.enabled ? t.studyWorld.soundOnAria : t.studyWorld.soundOffAria}
          className="pointer-events-auto cursor-pointer rounded-2xl bg-stone-900/75 px-3 py-2 text-[13px] shadow-lg backdrop-blur transition hover:bg-stone-800"
        >
          {sound.enabled ? "🔊" : "🔈"}
        </button>
      </div>

      {/* Ngồi vào bàn / đứng dậy. Nút chỉ hiện khi thực sự đứng trong tầm một
          cái ghế trống - một nút "ngồi" luôn hiện sẽ phải tự đoán ngồi ghế nào,
          và đoán trúng ghế người khác đang ngồi thì hai nhân vật lồng vào nhau. */}
      {(seatable !== null || seated !== null) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex justify-center px-4">
          {seated === null ? (
            <button
              type="button"
              onClick={() => {
                setSeated(seatable);
                setSeatStartedAt(Date.now());
                // Tiếng ngồi xuống: dấu hiệu duy nhất nói phiên đã bắt đầu mà
                // không cần rời mắt khỏi chỗ đang nhìn.
                sound.play("sit");
              }}
              className="pointer-events-auto cursor-pointer rounded-2xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-xl transition hover:bg-emerald-400"
            >
              {t.studyWorld.sitButton}
            </button>
          ) : (
            <div
              className={`pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-2 shadow-xl backdrop-blur ${
                sessionDone ? "bg-emerald-600/90" : "bg-stone-900/85"
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-mono text-base font-bold tabular-nums text-emerald-300">
                  {sessionDone ? (
                    <span className="text-white">{t.studyWorld.sessionDone}</span>
                  ) : (
                    formatCountdown(remainingMs(seatStartedAt, nowTick, POMODORO_MS))
                  )}
                </span>
                {/* Đồng hồ trên là Pomodoro 25 phút; mốc ăn thưởng là 15 phút
                    CỘNG DỒN cả ngày, tính chung với cả thư viện. Hai con số
                    khác nhau nên dòng này nói thẳng cái thứ hai. */}
                <span className={`text-[10px] font-bold ${focusGoalReached ? "text-emerald-200" : "text-stone-400"}`}>
                  {focusGoalReached
                    ? format(t.studyWorld.focusGoalReached, { xp: QUEST_XP_REWARDS.daily_focus })
                    : format(t.studyWorld.focusGoalProgress, {
                        minutes: focusMinutes,
                        target: DAILY_FOCUS_TARGET_MINUTES,
                        xp: QUEST_XP_REWARDS.daily_focus,
                      })}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSeated(null);
                  setSeatStartedAt(null);
                }}
                className="cursor-pointer rounded-xl bg-stone-700 px-3 py-1.5 text-[11px] font-bold text-stone-100 transition hover:bg-stone-600"
              >
                {t.studyWorld.standButton}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Phiên vừa bị dừng vì rời đi. Nói thẳng lý do: một phiên biến mất mà
          không giải thích sẽ bị đọc là lỗi, và lần sau người học không tin con
          số thời gian nữa. */}
      {endedAway && seated === null && (
        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-stone-900/90 px-4 py-2.5 shadow-xl backdrop-blur">
            <p className="text-[11px] leading-snug text-stone-200">
              {t.studyWorld.endedAwayPart1}{Math.round(AWAY_MS / 60000)}{t.studyWorld.endedAwayPart2}
              <br />
              {t.studyWorld.endedAwayResumeHint}
            </p>
            <button
              type="button"
              onClick={() => setEndedAway(false)}
              className="shrink-0 cursor-pointer rounded-xl bg-stone-700 px-3 py-1.5 text-[11px] font-bold text-stone-100 hover:bg-stone-600"
            >
              {t.studyWorld.endedAwayAck}
            </button>
          </div>
        </div>
      )}

      {/* Lối ra, chỉ hiện khi đứng ở cửa */}
      {nearDoor && seated === null && onExit && (
        <div className="pointer-events-none absolute inset-x-0 top-16 z-10 flex justify-center px-4">
          <button
            type="button"
            onClick={onExit}
            className="pointer-events-auto cursor-pointer rounded-2xl bg-sky-500/90 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur transition hover:bg-sky-400"
          >
            {t.studyWorld.exitDoorButton}
          </button>
        </div>
      )}

      {/* Nhật ký lời nói gần đây */}
      {log.length > 0 && (
        <div className="pointer-events-none absolute left-3 top-1/2 z-10 hidden w-56 -translate-y-1/2 flex-col gap-1 sm:flex">
          {log
            .filter((m) => !mutedIds.has(m.userId))
            .slice(-5)
            .map((m) => (
              <div
                key={m.id}
                className="pointer-events-auto group flex items-start gap-1.5 rounded-xl bg-stone-900/70 px-2.5 py-1 text-[11px] text-stone-200 backdrop-blur"
              >
                <span className="min-w-0 flex-1">
                  <span className="font-bold text-emerald-300">{m.name}</span>{" "}
                  <span className="text-stone-300">{m.text}</span>
                </span>
                {m.userId !== userId && (
                  <button
                    type="button"
                    onClick={() => setMutedIds((prev) => new Set(prev).add(m.userId))}
                    title={format(t.studyWorld.hideSpeechTitle, { name: m.name })}
                    aria-label={format(t.studyWorld.hideSpeechAria, { name: m.name })}
                    className="shrink-0 cursor-pointer text-stone-500 opacity-0 transition-opacity hover:text-stone-200 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          {mutedIds.size > 0 && (
            <button
              type="button"
              onClick={() => setMutedIds(new Set())}
              className="pointer-events-auto cursor-pointer self-start rounded-lg bg-stone-800/70 px-2 py-0.5 text-[10px] font-bold text-stone-400 hover:text-stone-200"
            >
              {format(t.studyWorld.hiddenCount, { count: mutedIds.size })}
            </button>
          )}
        </div>
      )}

      {/* Thanh dưới: ô nói + hướng dẫn + bàn phím đi lại */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <form onSubmit={submit} className="pointer-events-auto flex max-w-xs gap-2">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={CHAT_MAX_LENGTH}
              placeholder={t.studyWorld.speakPlaceholder}
              className="min-w-0 flex-1 rounded-2xl border border-stone-700 bg-stone-900/85 px-3 py-2 text-xs text-stone-100 placeholder:text-stone-500 shadow-lg backdrop-blur outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="shrink-0 cursor-pointer rounded-2xl bg-emerald-500 px-3 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-emerald-400 disabled:opacity-40"
            >
              {t.studyWorld.speakButton}
            </button>
          </form>
          <p className="pointer-events-none hidden text-[10px] font-medium text-stone-400 sm:block">
            {t.studyWorld.controlsHintPart1}
            <kbd className="rounded bg-stone-800 px-1 py-0.5">{t.studyWorld.controlsHintKeys}</kbd>
            {t.studyWorld.controlsHintPart2}
          </p>
        </div>
        <Joystick
          onVector={(x, y) => {
            const walk = walkRef.current;
            walk.input.x = x;
            walk.input.y = y;
            // Cầm cần là giành lại quyền lái: đích tự đi phải nhường.
            if (Math.hypot(x, y) > 0.08) walk.target = null;
          }}
        />
      </div>
    </div>
  );
}
