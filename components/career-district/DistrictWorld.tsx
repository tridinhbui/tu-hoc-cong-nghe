"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { outdoorBrightnessAt } from "@/components/lobby/daylight";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  STAGE_FLOOR_ID,
  STREET_SPAWN,
  TOWER_STOPS,
  buildPathRoom,
  getRoom,
  type CareerDesk,
  type DistrictRoomId,
  type Doorway,
  type PathStop,
  type CafeSeat,
  type Pose,
  type RoomPortal,
} from "./district-space";
import { formulasFor, lessonSlugsFor, lessonSlugsForCareer, type StageIndexEntry } from "./district-content";
import { sayInStudyWorld } from "@/lib/supabase-study-world";
import { finishFocusSession, startFocusSession } from "@/lib/focus-session";
import { useWorldSound } from "@/components/world-controls/world-sound";
import { CHAT_MAX_LENGTH } from "@/lib/supabase-lobby";
import { createWalkState } from "@/components/world-controls/easy-walk";
import PillarQuiz from "./PillarQuiz";
import Minimap, { type MinimapPeer } from "./Minimap";
import CivicPanel from "./CivicPanel";
import type { CharacterEquipments } from "@/lib/rpg-items";
import { CAREER_CATEGORY_ORDER, CAREER_CATEGORY_LABELS, isCareerCategory } from "@/lib/career-categories";

const DistrictScene = dynamic(() => import("./DistrictScene"), {
  ssr: false,
  loading: () => <Fallback label="Đang dựng phố nghề…" />,
});

function Fallback({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-stone-950">
      <div className="text-center">
        <div className="mb-3 text-4xl">🏙️</div>
        <p className="text-sm font-medium text-stone-400">{label}</p>
      </div>
    </div>
  );
}

/** Biểu tượng cho từng nơi trong bảng đi thẳng. Ở một chỗ để thêm phòng mới
 *  không phải sửa một chuỗi ternary bảy tầng. */
const PLACE_ICONS: Record<string, string> = {
  thap: "🛗",
  "khu-game": "🎮",
  "cong-vien": "🌳",
  "trung-tam": "⛲",
  "quan-ca-phe": "☕",
  "cua-hang": "🪞",
  "bang-vang": "🏆",
  "phong-thi": "📝",
  "can-ho": "🏠",
  "bao-tang": "🏛️",
  "nha-ban-be": "🏘️",
};

export interface DistrictLesson {
  /** Id bài học - cần cho câu hỏi ôn tại cột, vốn hỏi theo id chứ không theo slug. */
  id: number;
  slug: string;
  title: string;
  done: boolean;
}

/** Cần điều khiển ảo: kéo trong vòng tròn, thả ra thì về giữa.
 *
 *  Có cả cần lẫn phím lẫn chạm-để-đi vì ba nhóm người dùng khác nhau: người
 *  quen game dùng phím, người dùng điện thoại dùng cần, và người chưa từng
 *  điều khiển nhân vật 3D nào thì chạm vào chỗ muốn tới - cách cuối là cách duy
 *  nhất không phải học gì cả. Cả ba ghi vào cùng một vector nên không đánh nhau. */
function Joystick({
  onVector,
}: {
  onVector: (x: number, y: number) => void;
}) {
  const base = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const active = useRef(false);

  const radius = 46;

  const update = useCallback(
    (clientX: number, clientY: number) => {
      const el = base.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const len = Math.hypot(dx, dy);
      if (len > radius) {
        dx = (dx / len) * radius;
        dy = (dy / len) * radius;
      }
      setKnob({ x: dx, y: dy });
      // Màn hình có trục y hướng xuống; ý định "đi tới" là hướng lên.
      onVector(dx / radius, -dy / radius);
    },
    [onVector]
  );

  const stop = useCallback(() => {
    active.current = false;
    setKnob({ x: 0, y: 0 });
    onVector(0, 0);
  }, [onVector]);

  return (
    <div
      ref={base}
      className="pointer-events-auto relative h-28 w-28 touch-none rounded-full border border-stone-700/70 bg-stone-900/60 backdrop-blur"
      onPointerDown={(e) => {
        e.preventDefault();
        active.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (active.current) update(e.clientX, e.clientY);
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onPointerLeave={() => active.current && stop()}
      role="application"
      aria-label="Cần điều khiển: kéo để đi"
    >
      <div
        className="absolute left-1/2 top-1/2 h-12 w-12 rounded-full bg-emerald-500/85 shadow-lg transition-[background] duration-150"
        style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }}
      />
      <span className="pointer-events-none absolute inset-x-0 -bottom-5 text-center text-[10px] font-bold text-stone-400">
        kéo để đi
      </span>
    </div>
  );
}

export interface DistrictWorldProps {
  userId: string;
  /** Đồ đang trang bị, đọc từ user_equipments ở phía server. */
  gear: CharacterEquipments;
  /** Chuỗi ngày và "hôm nay đã học chưa" - khắc lên biển tên như ở thư viện. */
  streak: number;
  doneToday: boolean;
  name: string;
  color: string;
  avatarUrl: string | null;
  level: number;
  /** Tên và trạng thái hoàn thành của mọi bài học xuất hiện trong khu phố. */
  lessons: Record<string, DistrictLesson>;
  /** Chặng học đã đổ sẵn ra danh sách bài ở phía server. */
  stages: StageIndexEntry[];
}

export default function DistrictWorld({
  userId,
  gear,
  streak,
  doneToday,
  name,
  color,
  avatarUrl,
  level,
  lessons,
  stages,
}: DistrictWorldProps) {
  const [roomId, setRoomId] = useState<DistrictRoomId>("street");
  const [entry, setEntry] = useState<Pose>(STREET_SPAWN);
  const [desk, setDesk] = useState<CareerDesk | null>(null);
  const [door, setDoor] = useState<Doorway | null>(null);
  const [portal, setPortal] = useState<RoomPortal | null>(null);
  const [atLift, setAtLift] = useState(false);
  const [stop, setStop] = useState<PathStop | null>(null);
  /** Ghế cà phê trong tầm, và ghế đang ngồi. Ngồi xuống mở một phiên
   *  focus_sessions - cùng đường với thư viện và phòng nhóm. */
  const [seatable, setSeatable] = useState<CafeSeat | null>(null);
  const [seated, setSeated] = useState<number | null>(null);
  const focusIdRef = useRef<number | null>(null);
  /** Bảng thang máy mở bằng nút trên HUD, không cần đi tới buồng thang. */
  const [liftPanel, setLiftPanel] = useState(false);
  const [stagePanel, setStagePanel] = useState(false);
  const [peerCount, setPeerCount] = useState(0);
  const [selfSpeech, setSelfSpeech] = useState<{ text: string; at: number } | null>(null);
  const [draft, setDraft] = useState("");
  /** Bài đang mở câu hỏi ôn tại chỗ, và những bài vừa trả lời đúng trong phiên
   *  này - cột sáng thêm ngay, không chờ tải lại trang. */
  const [quizLessonId, setQuizLessonId] = useState<number | null>(null);
  const [justCorrect, setJustCorrect] = useState<Set<string>>(new Set());
  const [walking, setWalking] = useState(false);
  const [hintSeen, setHintSeen] = useState(false);
  const [daylight, setDaylight] = useState<number | null>(null);
  const walkRef = useRef(createWalkState());
  /** Vị trí người chơi cho bản đồ nhỏ. Ref chứ không state: cảnh ghi vào nó
   *  mỗi khung hình. */
  const playerRef = useRef({ x: 0, z: 0 });
  const [mapPeers, setMapPeers] = useState<MinimapPeer[]>([]);
  /** Bảng điều hướng trên màn hẹp: ẩn mặc định, mở bằng nút la bàn. */
  const [travelOpen, setTravelOpen] = useState(false);
  /** Đang đứng ở bục giữa một căn nhà dân sự, và món đang mặc thử ở cửa hàng. */
  const [atStand, setAtStand] = useState(false);
  const [civicOpen, setCivicOpen] = useState(false);
  const [tryOn, setTryOn] = useState<CharacterEquipments | null>(null);
  /** Ghế đang có người: của mình cộng của người khác. Người khác công bố chỗ
   *  ngồi qua presence, cùng cơ chế bàn học ở thư viện. */
  const sound = useWorldSound();
  /** Qua ref để các callback dưới không phải khai lại mỗi lần bật/tắt tiếng. */
  const soundRef = useRef(sound);
  soundRef.current = sound;
  const seatTaken = useMemo(() => new Set(seated === null ? [] : [seated]), [seated]);

  const room = getRoom(roomId);

  // Đọc đồng hồ sau khi mount, không lúc render: giờ máy chủ khác giờ người
  // học, và một bầu trời khác nhau giữa hai lần render đầu là lỗi hydrate.
  useEffect(() => {
    // Đọc từ cùng một bảng giờ với thư viện. Bản cũ ở đây là một ternary
    // riêng nhảy bậc tại đúng 18:00 - hai thế giới cạnh nhau nói hai giờ khác
    // nhau, và người đi từ bên này sang bên kia lúc chập tối thấy ngay.
    const read = () => setDaylight(outdoorBrightnessAt(new Date().getHours()));
    read();
    const timer = window.setInterval(read, 10 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  /** Escape đóng bảng đang mở.
   *
   *  Năm bảng - thang máy, sân khấu, di chuyển, hành chính, thử đồ - trước đây
   *  chỉ đóng được bằng đúng nút của chính nó. Escape là phản xạ phổ quát trên
   *  desktop, và thiếu nó thì một bảng mở nhầm đọc ra như bị kẹt.
   *
   *  Đóng từng cái một chứ không đóng sạch: người mở hai lớp bảng chồng nhau
   *  mong bấm Escape là lùi một bước, không phải mất hết. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Đang gõ trong ô nói thì Escape thuộc về ô đó.
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;
      if (tryOn !== null) return void setTryOn(null);
      if (civicOpen) return void setCivicOpen(false);
      if (travelOpen) return void setTravelOpen(false);
      if (stagePanel) return void setStagePanel(false);
      if (liftPanel) return void setLiftPanel(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tryOn, civicOpen, travelOpen, stagePanel, liftPanel]);

  // Lời nhắc cách đi chỉ hiện tới lúc người học thực sự bước đi lần đầu.
  useEffect(() => {
    if (walking) setHintSeen(true);
  }, [walking]);

  /** Đóng mọi bảng và bỏ mọi thứ đang đứng gần.
   *
   *  Ba lối vào phòng - đi bộ qua cửa, bấm tầng trong thang máy, mở một hành
   *  lang lộ trình - trước đây mỗi cái chép lại đúng mười lệnh này. Bảng thứ
   *  sáu thêm sau sẽ được nhớ ở hai chỗ và quên ở chỗ thứ ba, và triệu chứng
   *  là một bảng cũ còn treo sau khi đã đổi phòng. */
  const clearRoomState = useCallback(() => {
    setDesk(null);
    setDoor(null);
    setPortal(null);
    setAtLift(false);
    setStop(null);
    setLiftPanel(false);
    setStagePanel(false);
    setTravelOpen(false);
    setAtStand(false);
    setCivicOpen(false);
    setTryOn(null);
  }, []);

  const go = useCallback((target: Doorway) => {
    soundRef.current.play("enter");
    setRoomId(target.to);
    setEntry(target.arriveAt);
    clearRoomState();
  }, [clearRoomState]);

  /** Bấm một tầng trong bảng thang máy. Cùng đường với đi bộ qua cửa: đổi phòng
   *  và đặt chỗ đứng, nên không có hai cách vào phòng cần giữ đồng bộ. */
  const goToFloor = useCallback((id: DistrictRoomId, arriveAt: Pose) => {
    setRoomId(id);
    setEntry(arriveAt);
    clearRoomState();
  }, [clearRoomState]);

  /** Vào một hành lang lộ trình - của một nghề, hoặc của một chặng học.
   *
   *  Phòng dựng ngay lúc bấm chứ không dựng sẵn: gần một trăm hành lang mà
   *  người học chỉ đi một hai cái mỗi phiên. */
  const enterPath = useCallback(
    (id: string, label: string, accent: string, slugs: string[], back: { to: DistrictRoomId; label: string; arriveAt: Pose }) => {
      const room = buildPathRoom(id, label, accent, slugs, back);
      // Vào hành lang thì đứng lùi vào một đoạn, không đứng sát cửa: camera
      // đứng sau lưng ~5m, và sát cửa thì nó bị kẹp vào tường sau và dí sát
      // gáy nhân vật - khung hình chỉ còn cái biển tên.
      const entryPose: Pose = { x: 0, z: room.size.depth / 2 - 4.5, ry: 0 };
      setRoomId(room.id);
      setEntry(entryPose);
      clearRoomState();
    },
    [clearRoomState]
  );

  const roomLessons = useMemo(
    () => (isCareerCategory(roomId) ? lessonSlugsFor(roomId).map((s) => lessons[s]).filter(Boolean) : []),
    [roomId, lessons]
  );
  const lessonTitles = useMemo(() => roomLessons.map((l) => `${l.done ? "✓" : "•"} ${l.title}`), [roomLessons]);

  const deskLessons = useMemo(
    () => (desk ? lessonSlugsForCareer(desk.careerId, 5).map((s) => lessons[s]).filter(Boolean) : []),
    [desk, lessons]
  );

  const doneSlugs = useMemo(() => {
    const out = new Set(Object.values(lessons).filter((l) => l.done).map((l) => l.slug));
    // Trả lời đúng tại cột thì cột sáng NGAY. Đây là phần thưởng duy nhất của
    // việc đi tới tận nơi; để nó chờ tải lại trang là bỏ mất cả cảm giác.
    for (const slug of justCorrect) out.add(slug);
    return out;
  }, [lessons, justCorrect]);

  /** Tiến độ từng nhóm ngành, đếm trên chính kệ bài học của nhóm đó. Biển hiệu
   *  ngoài phố đọc con số này, nên đi qua trước cửa là biết mình đã đi tới đâu
   *  trong ngành ấy mà chưa cần bước vào. */
  const progressByCategory = useMemo(() => {
    const out = {} as Record<string, { done: number; total: number }>;
    for (const c of CAREER_CATEGORY_ORDER) {
      const slugs = lessonSlugsFor(c, 999);
      out[c] = { done: slugs.filter((sl) => doneSlugs.has(sl)).length, total: slugs.length };
    }
    return out;
  }, [doneSlugs]);

  /** Chặng chưa xong đầu tiên - chỗ người học đang đứng trên lộ trình. */
  const currentStageKey = useMemo(() => {
    for (const st of stages) {
      if (!st.available) continue;
      if (st.slugs.some((sl) => !doneSlugs.has(sl))) return st.key;
    }
    return null;
  }, [stages, doneSlugs]);

  const inTower = roomId === "thap" || String(roomId).startsWith("tang-");

  const roomFormulas = useMemo(() => (isCareerCategory(roomId) ? formulasFor(roomId, 4) : []), [roomId]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-stone-950">
      {daylight === null ? (
        <Fallback label="Đang mở phố…" />
      ) : (
        <DistrictScene
          roomId={roomId}
          userId={userId}
          streak={streak}
          doneToday={doneToday}
          onPeerCount={setPeerCount}
          selfSpeech={selfSpeech}
          entry={entry}
          name={name}
          color={color}
          avatarUrl={avatarUrl}
          level={level}
          lessonTitles={lessonTitles}
          walkRef={walkRef}
          onDeskChange={setDesk}
          onDoorChange={setDoor}
          onPortalChange={setPortal}
          onLiftChange={setAtLift}
          onStopChange={setStop}
          onSeatChange={setSeatable}
          onStandChange={setAtStand}
          gear={tryOn ?? gear}
          seatTaken={seatTaken}
          playerRef={playerRef}
          onPeersChange={setMapPeers}
          doneSlugs={doneSlugs}
          progressByCategory={progressByCategory}
          onWalkingChange={setWalking}
          daylight={daylight}
        />
      )}

      {/* Trên màn hẹp, bảng "vào thẳng phòng" và bản đồ đều bị ẩn - trước đó
          chúng ẩn hẳn, nghĩa là người dùng điện thoại mất cả lối tắt lẫn định
          hướng. Nút này mở lại chúng, và chỉ tồn tại ở màn hẹp. */}
      <button
        type="button"
        onClick={() => setTravelOpen((v) => !v)}
        className="pointer-events-auto absolute right-4 top-32 z-20 cursor-pointer rounded-2xl border border-stone-700 bg-stone-900/85 px-3 py-2 text-[11px] font-black text-stone-200 shadow-xl backdrop-blur sm:hidden"
      >
        {travelOpen ? "✕" : "🧭"}
      </button>

      {/* Tên phòng + đường về */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
        <div className="rounded-2xl bg-stone-900/75 px-4 py-2 shadow-lg backdrop-blur">
          <p className="text-sm font-bold" style={{ color: room.accent }}>
            {room.kind === "street" ? "🏙️" : "🏢"} {room.label}
          </p>
          {/* Dòng phụ nói đúng thứ căn phòng NÀY có. Một dòng "0 nghề · 0 bài
              học" ở sảnh tháp không sai về mặt số học nhưng vô nghĩa với người
              đang đứng đó. */}
          <p className="text-[11px] text-stone-400">
            {room.kind === "street"
              ? "Năm căn nhà và một toà tháp"
              : room.desks.length > 0
              ? `${room.desks.length} nghề · ${roomLessons.length} bài học trên kệ`
              : room.portals.length > 1
              ? `${room.portals.length} địa điểm · đi tới từng bục để mở`
              : room.portals.length === 1
              ? room.portals[0].blurb
              : room.seats
              ? `${room.seats.length} chỗ ngồi · ngồi xuống là bắt đầu tính giờ`
              : room.stops
              ? `${room.stops.length} bài trên hành lang · ${room.stops.filter((st) => doneSlugs.has(st.slug)).length} đã học`
              : "Thang máy ở cuối sảnh · mỗi tầng một phòng chức năng"}
          </p>
          {/* Số người THẬT đang ở cùng phòng, đếm từ presence. Một hành lang có
              hai người khác đang đi là thông tin khác hẳn một hành lang trống,
              và là lý do để ở lại. */}
          {peerCount > 1 && (
            <p className="mt-0.5 text-[11px] font-bold text-emerald-300">
              👥 {peerCount} người đang ở đây
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Âm thanh mặc định TẮT: trình duyệt chặn phát tự động, và tiếng tự
              nổi lên trong một app học tập làm người ta đóng tab. */}
          <button
            type="button"
            onClick={sound.toggle}
            aria-label={sound.enabled ? "Tắt âm thanh" : "Bật âm thanh"}
            className="pointer-events-auto cursor-pointer rounded-2xl bg-stone-900/75 px-3 py-2 text-[13px] shadow-lg backdrop-blur transition hover:bg-stone-800"
          >
            {sound.enabled ? "🔊" : "🔈"}
          </button>
          <Link
            href="/su-nghiep"
            className="pointer-events-auto rounded-2xl bg-stone-900/75 px-3 py-2 text-[11px] font-bold text-stone-300 shadow-lg backdrop-blur transition hover:bg-stone-800"
          >
            Thoát ra ↗
          </Link>
        </div>
      </div>

      {/* Lời nhắc cách đi, biến mất ngay khi người học bước đi lần đầu - một
          hướng dẫn còn nằm đó sau khi đã biết cách chỉ là thứ che mất khung
          cảnh. */}
      {!hintSeen && (
        <div className="pointer-events-none absolute inset-x-0 top-24 z-10 flex justify-center px-4">
          <div className="rounded-2xl bg-emerald-600/90 px-5 py-2.5 text-center text-xs font-bold text-white shadow-xl backdrop-blur">
            Chạm vào chỗ bạn muốn tới — hoặc kéo cần điều khiển, hoặc bấm W A S D
          </div>
        </div>
      )}

      {/* Cửa trong tầm */}
      {door && (
        <div className="pointer-events-none absolute inset-x-0 bottom-44 z-10 flex justify-center px-4">
          <button
            type="button"
            onClick={() => go(door)}
            className="pointer-events-auto cursor-pointer rounded-2xl px-6 py-3 text-sm font-bold text-stone-950 shadow-xl transition hover:brightness-110"
            style={{ backgroundColor: door.accent }}
          >
            {/* Cửa quay lại đã mang sẵn nhãn của nó ("Ra phố", "Về sảnh
                chặng"); thêm "Bước vào ·" vào trước là đọc thành một câu vô
                nghĩa. Chỉ cửa ĐI TỚI mới cần chữ mời. */}
            {/^(Ra|Về)\b/.test(door.label) ? door.label : `Bước vào · ${door.label}`}
          </button>
        </div>
      )}

      {/* Thẻ nghề: hiện khi đứng trước một cái bàn. Đây là chỗ căn phòng trả
          lại thứ gì đó cho công đi bộ - nghề này học gì, và bấm vào là học. */}
      {desk && !portal && !stop && (
        <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 rounded-2xl border border-stone-700 bg-stone-900/92 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-80">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: room.accent }}>
            {room.label}
          </p>
          <p className="mt-0.5 text-sm font-black text-white">
            {desk.emoji} {desk.title}
          </p>
          {deskLessons.length > 0 && (
            <>
              <p className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Lộ trình học của nghề này
              </p>
              <ul className="mt-1 space-y-1">
                {deskLessons.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/bai-hoc/${l.slug}`}
                      className="flex items-start gap-1.5 rounded-lg px-1.5 py-1 text-[11px] text-stone-200 transition hover:bg-stone-800"
                    >
                      <span className={l.done ? "text-emerald-400" : "text-stone-600"}>
                        {l.done ? "✓" : "○"}
                      </span>
                      <span className="flex-1 leading-snug">{l.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <button
            type="button"
            onClick={() =>
              enterPath(
                `nghe-${desk.careerId}`,
                `Lộ trình · ${desk.title}`,
                room.accent,
                lessonSlugsForCareer(desk.careerId, 24),
                { to: roomId, label: "Về phòng ngành", arriveAt: { x: 0, z: desk.z + 2.2, ry: 0 } }
              )
            }
            className="mt-2.5 block w-full cursor-pointer rounded-xl px-3 py-2 text-center text-[11px] font-black text-stone-950 transition hover:brightness-110"
            style={{ backgroundColor: room.accent }}
          >
            Bước vào lộ trình học nghề này
          </button>
          <Link
            href="/su-nghiep"
            className="mt-1.5 block rounded-xl bg-stone-800 px-3 py-1.5 text-center text-[11px] font-bold text-stone-200 transition hover:bg-stone-700"
          >
            Xem chân dung nghề đầy đủ
          </Link>
        </div>
      )}

      {/* Thẻ cổng: đứng trước bàn chức năng thì mở được tính năng thật. */}
      {portal && (
        <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 rounded-2xl border border-stone-700 bg-stone-900/92 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-80">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: portal.accent }}>
            Phòng chức năng
          </p>
          <p className="mt-0.5 text-sm font-black text-white">{portal.label}</p>
          <p className="mt-1 text-[11px] leading-snug text-stone-400">{portal.blurb}</p>
          {portal.formula && (
            <p className="mt-2 rounded-lg bg-stone-950/70 px-2.5 py-1.5 font-mono text-[11px] font-bold" style={{ color: portal.accent }}>
              {portal.formula}
            </p>
          )}
          {portal.formulaNote && (
            <p className="mt-1 text-[10px] leading-snug text-stone-500">{portal.formulaNote}</p>
          )}
          <Link
            href={portal.href}
            className="mt-2.5 block rounded-xl px-3 py-2 text-center text-[11px] font-black text-stone-950 transition hover:brightness-110"
            style={{ backgroundColor: portal.accent }}
          >
            Mở {portal.label} ↗
          </Link>
        </div>
      )}

      {/* Gọi thang máy mà không phải đi bộ tới buồng thang.
          Buồng thang vẫn còn và vẫn dùng được - nó là thứ khiến toà nhà có
          thật. Nhưng bắt đi bộ mỗi lần đổi tầng thì đến lần thứ ba đã là hình
          phạt, nên có luôn cả đường tắt. */}
      {inTower && !liftPanel && !atLift && (
        <button
          type="button"
          onClick={() => setLiftPanel(true)}
          className="pointer-events-auto absolute right-4 top-20 z-10 cursor-pointer rounded-2xl border border-amber-500/40 bg-stone-900/85 px-3 py-2 text-[11px] font-black text-amber-200 shadow-xl backdrop-blur transition hover:bg-stone-800"
        >
          🛗 Lên tầng
        </button>
      )}

      {/* Bảng chọn chặng học, ở tầng chặng học. */}
      {roomId === STAGE_FLOOR_ID && (
        <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 rounded-2xl border border-emerald-500/40 bg-stone-900/92 p-3 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-80">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
            🧭 Chặng học tài chính
          </p>
          <p className="mt-0.5 text-[11px] text-stone-400">
            Mỗi chặng là một hành lang; đi hết hành lang là hết chặng.
          </p>
          <div className="mt-2 max-h-64 space-y-0.5 overflow-y-auto">
            {stages.map((st) => {
              const done = st.slugs.filter((sl) => doneSlugs.has(sl)).length;
              const finished = done === st.slugs.length;
              // "Chặng đang học" = chặng chưa xong đầu tiên trong danh sách.
              // Không lưu ở đâu cả, suy ra từ tiến độ - một cột trạng thái nữa
              // trong database là một cột nữa có thể lệch khỏi sự thật.
              const current = !finished && st.key === currentStageKey;
              return (
                <button
                  key={st.key}
                  type="button"
                  disabled={!st.available}
                  onClick={() =>
                    enterPath(st.key, `${st.label} · ${st.trackTitle}`, "#a7f3d0", st.slugs, {
                      to: STAGE_FLOOR_ID,
                      label: "Về sảnh chặng",
                      arriveAt: { x: 0, z: 5.4, ry: 0 },
                    })
                  }
                  className="block w-full cursor-pointer rounded-lg px-2 py-1.5 text-left transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent"
                >
                  {/* Chặng chưa mở thì KHOÁ THẬT, không phải mở rồi mới báo:
                      bước vào một hành lang xong mới bị đuổi ra tệ hơn nhiều
                      so với thấy nó khoá từ đầu. */}
                  <span
                    className={`text-[11px] font-black ${
                      finished ? "text-emerald-400" : current ? "text-amber-300" : "text-emerald-200"
                    }`}
                  >
                    {!st.available ? `🔒 ${st.label}` : finished ? `✓ ${st.label}` : current ? `▶ ${st.label}` : st.label}
                  </span>
                  <span className="ml-1 text-[10px] text-stone-500">{st.trackTitle}</span>
                  <span className="ml-1 font-mono text-[10px] text-stone-400">
                    {done}/{st.slugs.length}
                  </span>
                  <span className="block truncate text-[10px] leading-snug text-stone-400">{st.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Thẻ bài học khi đứng trước một cột trên hành lang lộ trình. */}
      {stop && (
        <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 rounded-2xl border border-stone-700 bg-stone-900/92 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-80">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: room.accent }}>
            Bài {stop.index + 1} / {room.stops?.length ?? 0}
          </p>
          <p className="mt-0.5 text-sm font-black text-white">
            {lessons[stop.slug]?.title ?? stop.slug}
          </p>
          <p className="mt-1 text-[11px] text-stone-400">
            {doneSlugs.has(stop.slug) ? "✓ Bạn đã học bài này" : "Chưa học"}
          </p>
          <div className="mt-2.5 flex gap-1.5">
            <Link
              href={`/bai-hoc/${stop.slug}`}
              className="flex-1 rounded-xl px-3 py-2 text-center text-[11px] font-black text-stone-950 transition hover:brightness-110"
              style={{ backgroundColor: room.accent }}
            >
              Mở bài học ↗
            </Link>
            {lessons[stop.slug] && (
              <button
                type="button"
                onClick={() => setQuizLessonId(lessons[stop.slug].id)}
                className="cursor-pointer rounded-xl bg-stone-800 px-3 py-2 text-[11px] font-black text-stone-200 transition hover:bg-stone-700"
              >
                ❓ Ôn tại chỗ
              </button>
            )}
          </div>
        </div>
      )}

      {quizLessonId !== null && stop && (
        <PillarQuiz
          lessonId={quizLessonId}
          accent={room.accent}
          onClose={() => setQuizLessonId(null)}
          onCorrect={() => {
            soundRef.current.play("correct");
            setJustCorrect((prev) => new Set(prev).add(stop.slug));
          }}
        />
      )}

      {/* Bảng thang máy: hiện khi đứng trong buồng thang, hoặc khi bấm nút gọi. */}
      {(atLift || liftPanel) && (
        <div className="pointer-events-auto absolute right-4 top-20 z-20 w-52 max-w-[calc(100vw-2rem)] rounded-2xl border border-amber-500/40 bg-stone-900/92 p-2.5 shadow-2xl backdrop-blur">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-300">🛗 Thang máy</p>
            {!atLift && (
              <button
                type="button"
                onClick={() => setLiftPanel(false)}
                className="cursor-pointer text-[10px] font-bold text-stone-500 hover:text-stone-300"
              >
                đóng
              </button>
            )}
          </div>
          <div className="max-h-72 space-y-0.5 overflow-y-auto">
            {TOWER_STOPS.map((stop, i) => (
              <button
                key={stop.id}
                type="button"
                onClick={() => goToFloor(stop.id, stop.arriveAt)}
                disabled={stop.id === roomId}
                className="block w-full cursor-pointer rounded-lg px-2 py-1.5 text-left text-[11px] font-bold text-stone-300 transition hover:bg-stone-800 disabled:cursor-default disabled:bg-stone-800 disabled:text-stone-500"
              >
                <span className="mr-1 font-mono text-stone-500">{i === 0 ? "G" : i}</span>
                <span style={{ color: stop.id === roomId ? undefined : stop.accent }}>■</span> {stop.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Công thức của phòng, luôn ở góc - cùng nội dung với biển treo tường,
          nhưng đọc được mà không phải đi tới tận nơi. */}
      {roomFormulas.length > 0 && !desk && !portal && !stop && (
        <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden w-72 rounded-2xl border border-stone-700 bg-stone-900/85 p-3 shadow-xl backdrop-blur sm:block">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
            📐 Công thức treo trong phòng
          </p>
          <ul className="mt-1.5 space-y-1">
            {roomFormulas.map((f) => (
              <li key={f.id} className="text-[11px] leading-snug">
                <span className="font-mono font-bold" style={{ color: room.accent }}>
                  {f.equation}
                </span>
                <span className="ml-1 text-stone-500">· {f.source}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bản đồ nhanh: bấm là tới thẳng, cho người không muốn đi bộ.
          Đi bộ là cái hay của khu phố, nhưng bắt đi bộ mỗi lần là cái dở. */}
      {room.kind === "street" && (
        <div
          className={`pointer-events-auto absolute right-4 top-20 z-10 max-h-[calc(100vh-16rem)] w-44 overflow-y-auto rounded-2xl border border-stone-700 bg-stone-900/85 p-2.5 shadow-xl backdrop-blur sm:block ${
            travelOpen ? "block" : "hidden"
          }`}
        >
          <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-stone-400">
            Vào thẳng phòng
          </p>
          <div className="space-y-1">
            {/* Tháp đứng đầu danh sách vì nó là đường vào MỌI tính năng khác;
                năm nhóm ngành chỉ là năm căn nhà. */}
            {getRoom("street")
              .doorways.filter((d) => d.to !== "street" && !CAREER_CATEGORY_ORDER.includes(d.to as never))
              .map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => go(d)}
                  className="block w-full cursor-pointer rounded-lg px-2 py-1 text-left text-[11px] font-bold transition hover:bg-stone-800"
                  style={{ color: d.accent }}
                >
                  {PLACE_ICONS[d.to as string] ?? "■"} {d.label}
                </button>
              ))}
            {CAREER_CATEGORY_ORDER.map((c) => {
              const d = getRoom("street").doorways.find((x) => x.to === c);
              if (!d) return null;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => go(d)}
                  className="block w-full cursor-pointer rounded-lg px-2 py-1 text-left text-[11px] font-bold text-stone-300 transition hover:bg-stone-800"
                >
                  <span style={{ color: d.accent }}>■</span> {CAREER_CATEGORY_LABELS[c]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Nói với người trong cùng phòng. Cùng kênh đang chở vị trí, không mở
          kênh thứ hai; và KHÔNG lưu lại - đây là lời nói trong một căn phòng,
          ai đang đứng đó thì nghe. */}
      {peerCount > 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const message = sayInStudyWorld(roomId, userId, name, draft);
            if (!message) return;
            setDraft("");
            // Hiện câu của mình ngay, không chờ vòng về server.
            setSelfSpeech({ text: message.text, at: message.at });
          }}
          className="pointer-events-auto absolute bottom-24 left-1/2 z-10 flex w-[min(22rem,86vw)] -translate-x-1/2 gap-2 sm:bottom-6"
        >
          <input
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
      )}

      <Minimap room={room} playerRef={playerRef} peers={mapPeers} />

      {/* Ngồi xuống quán cà phê. Đây là chỗ duy nhất trong khu phố tính giờ,
          nên nút chỉ hiện khi thực sự đứng cạnh một cái ghế trống. */}
      {(seatable !== null || seated !== null) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-44 z-10 flex justify-center px-4">
          {seated === null ? (
            <button
              type="button"
              onClick={() => {
                const idx = seatable?.index ?? null;
                setSeated(idx);
                soundRef.current.play("sit");
                void startFocusSession("pho-nghe", "quan-ca-phe").then((id) => {
                  focusIdRef.current = id;
                });
              }}
              className="pointer-events-auto cursor-pointer rounded-2xl bg-amber-400 px-5 py-2.5 text-xs font-black text-stone-950 shadow-xl transition hover:brightness-110"
            >
              ☕ Ngồi xuống học · bắt đầu tính giờ
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSeated(null);
                const id = focusIdRef.current;
                focusIdRef.current = null;
                if (id !== null) void finishFocusSession(id);
              }}
              className="pointer-events-auto cursor-pointer rounded-2xl bg-stone-800 px-5 py-2.5 text-xs font-bold text-stone-100 shadow-xl transition hover:bg-stone-700"
            >
              Đứng dậy
            </button>
          )}
        </div>
      )}

      {/* Bục giữa nhà dân sự: đứng vào là mở được nội dung của phòng. */}
      {atStand && !civicOpen && (
        <div className="pointer-events-none absolute inset-x-0 bottom-44 z-10 flex justify-center px-4">
          <button
            type="button"
            onClick={() => setCivicOpen(true)}
            className="pointer-events-auto cursor-pointer rounded-2xl px-5 py-2.5 text-xs font-black text-stone-950 shadow-xl transition hover:brightness-110"
            style={{ backgroundColor: room.accent }}
          >
            Mở · {room.label}
          </button>
        </div>
      )}
      {civicOpen && (
        <CivicPanel
          roomId={roomId}
          accent={room.accent}
          userId={userId}
          gear={gear}
          tryOn={tryOn}
          onTryOn={setTryOn}
          onClose={() => setCivicOpen(false)}
        />
      )}

      {/* Cần điều khiển, luôn hiện */}
      <div className="pointer-events-none absolute bottom-6 right-6 z-20 sm:bottom-44">
        <Joystick
          onVector={(x, y) => {
            const walk = walkRef.current;
            walk.input.x = x;
            walk.input.y = y;
            // Cầm cần là giành lại quyền lái: đích đang tự đi phải nhường.
            if (Math.hypot(x, y) > 0.08) walk.target = null;
          }}
        />
      </div>
    </div>
  );
}
