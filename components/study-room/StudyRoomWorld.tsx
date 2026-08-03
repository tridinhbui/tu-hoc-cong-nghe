"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { CHAT_MAX_LENGTH, POMODORO_MS, colorForUser, type LobbyChatMessage } from "@/lib/supabase-lobby";
import { sayInStudyWorld } from "@/lib/supabase-study-world";

/** three.js chỉ chạy phía trình duyệt: ssr:false giữ nó ngoài bundle server, và
 *  người dùng thấy khung chờ thay vì lỗi hydrate. */
const StudyRoomScene = dynamic(() => import("./StudyRoomScene"), {
  ssr: false,
  loading: () => <SceneFallback label="Đang mở cửa phòng…" />,
});

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

/** Ánh sáng theo giờ, rút gọn về hai con số mà cảnh 3D cần: độ sáng ngoài trời
 *  và màu bóng đèn thả.
 *
 *  Phòng 3D bằng CSS ở ngay cạnh có bảng ánh sáng riêng (lib/study-room-lighting.ts)
 *  với gradient cho tường và cửa sổ - dạng dữ liệu đó không dùng được cho
 *  three.js, và ngược lại. Hai bảng, một ý niệm về giờ giấc; nếu đổi khung giờ
 *  thì phải đổi cả hai. */
function lightingForHour(hour: number): { daylight: number; lampColor: string } {
  const h = ((Math.floor(hour) % 24) + 24) % 24;
  if (h < 5) return { daylight: 0, lampColor: "#ffc98a" };
  if (h < 7) return { daylight: 0.35, lampColor: "#ffdcae" };
  if (h < 11) return { daylight: 1, lampColor: "#fff1d6" };
  if (h < 16) return { daylight: 0.9, lampColor: "#fff1d6" };
  if (h < 19) return { daylight: 0.45, lampColor: "#ffd7a1" };
  return { daylight: 0.08, lampColor: "#ffc98a" };
}

/** Nút giữ-để-đi. Phát sự kiện bàn phím giả để dùng chung đúng một đường điều
 *  khiển với bàn phím, thay vì mở kênh trạng thái thứ hai chỉ cho cảm ứng.
 *
 *  Luôn hiện, kể cả trên máy có bàn phím: không có gì trên màn hình nói rằng
 *  căn phòng đi được, nên người mở lần đầu sẽ chỉ nhìn nó xoay rồi bỏ đi. */
function press(key: string, type: "keydown" | "keyup") {
  window.dispatchEvent(new KeyboardEvent(type, { key }));
}

/** Khai ở tầng module, không lồng trong WalkPad: một component định nghĩa lại
 *  mỗi lần render là một component MỚI với React, nên nút bị tháo ra lắp lại -
 *  và nếu điều đó xảy ra giữa lúc ngón tay đang giữ, sự kiện nhả phím không
 *  bao giờ tới và nhân vật đi mãi. */
function Hold({ eventKey, label, title }: { eventKey: string; label: string; title: string }) {
  return (
    <button
      type="button"
      aria-label={title}
      title={title}
      className="flex h-11 w-11 select-none items-center justify-center rounded-2xl bg-stone-800/85 text-lg font-bold text-stone-100 shadow-lg backdrop-blur transition-colors active:bg-emerald-600"
      onPointerDown={(e) => {
        e.preventDefault();
        press(eventKey, "keydown");
      }}
      onPointerUp={() => press(eventKey, "keyup")}
      onPointerLeave={() => press(eventKey, "keyup")}
      onPointerCancel={() => press(eventKey, "keyup")}
      onContextMenu={(e) => e.preventDefault()}
    >
      {label}
    </button>
  );
}

function WalkPad() {
  return (
    <div className="pointer-events-auto grid grid-cols-3 gap-1.5">
      <div />
      <Hold eventKey="ArrowUp" label="↑" title="Đi tới" />
      <div />
      <Hold eventKey="ArrowLeft" label="↺" title="Xoay trái" />
      <Hold eventKey="ArrowDown" label="↓" title="Lùi lại" />
      <Hold eventKey="ArrowRight" label="↻" title="Xoay phải" />
    </div>
  );
}

export interface StudyRoomWorldProps {
  roomId: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  level: number;
  /** Số bài đã học trong tuần - khắc lên biển tên như chuỗi ngày ở đại sảnh. */
  weeklyLessons: number;
  /** Mục tiêu XP tuần của nhóm, viết lên bảng trắng trong phòng. */
  weeklyXpProgress: number;
  weeklyXpGoal: number;
  /** Dòng nhiệm vụ hiện lên bảng, tối đa vài dòng cho vừa khung. */
  missionLines: string[];
  topicLabel: string;
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
  onExit,
}: StudyRoomWorldProps) {
  const [seatable, setSeatable] = useState<number | null>(null);
  const [seated, setSeated] = useState<number | null>(null);
  const [seatStartedAt, setSeatStartedAt] = useState<number | null>(null);
  const [nearDoor, setNearDoor] = useState(false);
  const [peerCount, setPeerCount] = useState(0);
  const [log, setLog] = useState<LobbyChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [selfSpeech, setSelfSpeech] = useState<{ text: string; at: number } | null>(null);
  const [nowTick, setNowTick] = useState(0);
  const [lighting, setLighting] = useState<{ daylight: number; lampColor: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Đọc đồng hồ sau khi mount, không lúc render: giờ của server và giờ của
  // người học khác nhau, và một căn phòng sáng khác nhau ở hai lần render đầu
  // là lỗi hydrate. Cập nhật lại mỗi 10 phút để phiên học kéo dài qua hoàng
  // hôn thì căn phòng cũng đi theo.
  useEffect(() => {
    const read = () => setLighting(lightingForHour(new Date().getHours()));
    read();
    const timer = window.setInterval(read, 10 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  /** Nhịp giây cho đồng hồ phiên. Chỉ chạy khi đang ngồi - một setInterval sống
   *  suốt phiên chỉ để cập nhật thứ không hiển thị là lãng phí, và nó làm cả
   *  HUD re-render mỗi giây. */
  useEffect(() => {
    if (seated === null) return;
    setNowTick(Date.now());
    const timer = window.setInterval(() => setNowTick(Date.now()), 1000);
    return () => window.clearInterval(timer);
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
    }),
    [userId, name, avatarUrl, weeklyLessons, level]
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
    return [`Mục tiêu tuần: ${weeklyXpProgress}/${weeklyXpGoal} XP (${pct}%)`, ...missionLines.slice(0, 4)];
  }, [weeklyXpProgress, weeklyXpGoal, missionLines]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-stone-950">
      {lighting ? (
        <StudyRoomScene
          roomId={roomId}
          identity={identity}
          seated={seated}
          seatStartedAt={seatStartedAt}
          onSeatableChange={setSeatable}
          onDoorProximity={setNearDoor}
          onPeerCount={setPeerCount}
          onChatMessage={pushLog}
          selfSpeech={selfSpeech}
          boardTitle={`Phòng ${topicLabel}`}
          boardRows={boardRows}
          lampColor={lighting.lampColor}
          daylight={lighting.daylight}
        />
      ) : (
        <SceneFallback label="Đang bật đèn…" />
      )}

      {/* Số người THẬT đang ở trong phòng, đếm từ presence chứ không phải sĩ số
          thành viên: một phòng 8 người mà đang chỉ có mình bạn là một thông tin
          khác hẳn, và là thông tin cần biết. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center p-3">
        <div className="rounded-2xl bg-stone-900/75 px-4 py-1.5 text-center shadow-lg backdrop-blur">
          <p className="text-[11px] font-bold text-emerald-300">
            🚪 Phòng học · {topicLabel}
          </p>
          <p className="text-[10px] text-stone-400">
            {peerCount > 1 ? `${peerCount} người đang ở trong phòng` : "Bạn đang ở đây một mình"}
          </p>
        </div>
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
              }}
              className="pointer-events-auto cursor-pointer rounded-2xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-xl transition hover:bg-emerald-400"
            >
              Ngồi xuống học · phiên 25 phút
            </button>
          ) : (
            <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-stone-900/85 px-4 py-2 shadow-xl backdrop-blur">
              <span className="font-mono text-base font-bold tabular-nums text-emerald-300">
                {(() => {
                  const left = Math.max(0, POMODORO_MS - (nowTick - (seatStartedAt ?? nowTick)));
                  const m = String(Math.floor(left / 60000)).padStart(2, "0");
                  const s = String(Math.floor((left % 60000) / 1000)).padStart(2, "0");
                  return left === 0 ? "Xong!" : `${m}:${s}`;
                })()}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSeated(null);
                  setSeatStartedAt(null);
                }}
                className="cursor-pointer rounded-xl bg-stone-700 px-3 py-1.5 text-[11px] font-bold text-stone-100 transition hover:bg-stone-600"
              >
                Đứng dậy
              </button>
            </div>
          )}
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
            Bước ra cửa → xem phòng dạng bàn học
          </button>
        </div>
      )}

      {/* Nhật ký lời nói gần đây */}
      {log.length > 0 && (
        <div className="pointer-events-none absolute left-3 top-1/2 z-10 hidden w-56 -translate-y-1/2 flex-col gap-1 sm:flex">
          {log.slice(-5).map((m) => (
            <div key={m.id} className="rounded-xl bg-stone-900/70 px-2.5 py-1 text-[11px] text-stone-200 backdrop-blur">
              <span className="font-bold text-emerald-300">{m.name}</span>{" "}
              <span className="text-stone-300">{m.text}</span>
            </div>
          ))}
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
              placeholder="Nói với người trong phòng…"
              className="min-w-0 flex-1 rounded-2xl border border-stone-700 bg-stone-900/85 px-3 py-2 text-xs text-stone-100 placeholder:text-stone-500 shadow-lg backdrop-blur outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="shrink-0 cursor-pointer rounded-2xl bg-emerald-500 px-3 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-emerald-400 disabled:opacity-40"
            >
              Nói
            </button>
          </form>
          <p className="pointer-events-none hidden text-[10px] font-medium text-stone-400 sm:block">
            <kbd className="rounded bg-stone-800 px-1 py-0.5">W</kbd>{" "}
            <kbd className="rounded bg-stone-800 px-1 py-0.5">S</kbd> đi lại ·{" "}
            <kbd className="rounded bg-stone-800 px-1 py-0.5">A</kbd>{" "}
            <kbd className="rounded bg-stone-800 px-1 py-0.5">D</kbd> xoay người · kéo để đổi góc nhìn · lời nói ở đây không được lưu
          </p>
        </div>
        <WalkPad />
      </div>
    </div>
  );
}
