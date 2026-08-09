"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { getUserStreak } from "@/lib/supabase-streak";
import { getEquippedGear } from "@/lib/supabase-equipment";
import { getResumeLessonAction } from "@/app/(app)/dashboard/actions";
import { finishFocusSession, getTodayFocusSeconds, startFocusSession } from "@/lib/focus-session";
import { stationRoomHref, type Station } from "./stations";
import {
  AWAY_MS,
  formatCountdown,
  isSessionComplete,
  notifySessionDone,
  playSessionChime,
  remainingMs,
  shouldEndForAway,
} from "@/lib/study-session";
import {
  CHAT_MAX_LENGTH,
  POMODORO_MS,
  colorForUser,
  sendChat,
  type LobbyChatMessage,
  type LobbyIdentity,
} from "@/lib/supabase-lobby";

/** three.js chỉ chạy phía trình duyệt - ssr:false giữ nó ngoài bundle server,
 *  và người dùng thấy khung chờ thay vì lỗi hydrate. */
import type { GateTarget } from "./gates";
import LobbyDirectory from "./LobbyDirectory";
import Joystick from "@/components/world-controls/joystick";
import { createWalkState } from "@/components/world-controls/easy-walk";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

const LobbySceneInner = dynamic(() => import("./LobbySceneInner"), {
  ssr: false,
  loading: () => <BuildingFallback />,
});

/** The dynamic() loading slot renders inside the provider, so it can read the
 *  dictionary itself rather than being handed a hard-coded label. */
function BuildingFallback() {
  const { t } = useI18n();
  return <SceneFallback label={t.lobby.building} />;
}

function SceneFallback({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-stone-950">
      <div className="text-center">
        <div className="mb-3 text-4xl">🏛️</div>
        <p className="text-sm font-medium text-stone-400">{label}</p>
      </div>
    </div>
  );
}

export default function LobbyClient() {
  const { t } = useI18n();
  const router = useRouter();
  const [identity, setIdentity] = useState<LobbyIdentity | null>(null);
  /** Bài kế tiếp trong lộ trình, để có việc làm ngay khi vừa vào sảnh. */
  const [nextLesson, setNextLesson] = useState<{ slug: string; title: string; duration?: string } | null>(
    null
  );
  const [failed, setFailed] = useState(false);
  const [log, setLog] = useState<LobbyChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [selfSpeech, setSelfSpeech] = useState<{ text: string; at: number } | null>(null);
  const [nearGate, setNearGate] = useState<GateTarget | null>(null);
  const [peerCount, setPeerCount] = useState(0);
  const [seatableTable, setSeatableTable] = useState<number | null>(null);
  const [station, setStation] = useState<Station | null>(null);
  const [seatedTable, setSeatedTable] = useState<number | null>(null);
  const [seatStartedAt, setSeatStartedAt] = useState<number | null>(null);
  // Khởi tạo 0 chứ không phải Date.now(): component này vẫn được render phía
  // server, nên đọc đồng hồ lúc render cho ra hai giá trị khác nhau ở hai phía
  // và gây lệch hydration. Effect bên dưới (setInterval mỗi giây) đặt giá trị
  // thật ngay khi mount, nên số 0 không bao giờ kịp hiển thị - và
  // isSessionComplete() với now=0 cho ra khoảng thời gian âm, tức là không
  // đời nào kích nhầm chuông hết giờ.
  const [nowTick, setNowTick] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  /** Ý định di chuyển, sở hữu ở đây chứ không trong cảnh: cần điều khiển nằm
   *  ngoài Canvas nên nó phải ghi được vào cùng một vector mà vòng lặp vẽ đọc. */
  const walkRef = useRef(createWalkState());
  /** Phiên ngồi học ở server. Ngồi vào bàn mở, đứng dậy đóng; độ dài do server
   *  tính từ hai mốc nó tự đặt. */
  const focusIdRef = useRef<number | null>(null);
  const [todayMinutes, setTodayMinutes] = useState<number | null>(null);
  /** Phiên đã chạy hết 25 phút chưa. Tách khỏi `seatedTable` vì chuông chỉ được
   *  kêu một lần, còn người ngồi thì có thể ngồi tiếp sau khi hết giờ. */
  const [chimed, setChimed] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth
      .getUser()
      .then(async ({ data: { user } }) => {
        if (!user) {
          router.replace("/login?next=/cong-dong");
          return;
        }
        // Cùng mẫu với AppNavbar: hàng user_profiles không được đảm bảo tồn
        // tại, nên luôn có fallback từ user_metadata.
        let name: string | null = user.user_metadata?.full_name || null;
        let avatarUrl: string | null = user.user_metadata?.avatar_url || null;
        let level = 1;
        try {
          const { data } = await supabase
            .from("user_profiles")
            .select("full_name, avatar_url, current_level")
            .eq("id", user.id)
            .single();
          if (data?.full_name) name = data.full_name;
          if (data?.avatar_url) avatarUrl = data.avatar_url;
          if (data?.current_level) level = data.current_level;
        } catch {
          // giữ fallback
        }
        // Streak nằm ở bảng riêng, và "hôm nay đã học chưa" suy từ
        // last_activity_date chứ không có cột nào nói thẳng.
        let streak = 0;
        let doneToday = false;
        try {
          const s = await getUserStreak(user.id);
          streak = s?.current_streak ?? 0;
          if (s?.last_activity_date) {
            const today = new Date().toISOString().slice(0, 10);
            doneToday = s.last_activity_date.slice(0, 10) === today;
          }
        } catch {
          // streak là phần thưởng phụ, thiếu nó không chặn vào phòng
        }

        // Đồ trang bị đọc cùng lúc với danh tính. Hỏng thì vào phòng tay
        // không, không phải không vào được.
        let gear = {};
        try {
          gear = await getEquippedGear(user.id, supabase);
        } catch {
          // giữ tay không
        }

        // Bài kế tiếp, đọc song song với danh tính chứ không đợi.
        //
        // Sảnh 3D vốn có cửa dẫn vào /hoc-bai, nhưng chúng nằm trên ban công
        // TẦNG HAI: phải đi hết sảnh rồi leo lên mới thấy. Người vào lần đầu
        // đứng giữa một căn phòng đẹp mà không có việc gì để làm ngay, và thứ
        // họ tới đây để làm - học bài - thì bị chôn sau một quãng đi bộ.
        //
        // Thẻ này hiện tên bài THẬT tiếp theo trong lộ trình, không phải một
        // nút "Vào học" chung chung: nhìn thấy "Day 47 · WACC là gì?" là đã
        // biết mình sắp làm gì, còn một cái nút thì vẫn phải bấm mới biết.
        //
        // Qua Server Action vì lib/resume-learning đọc cả tập bài học - gọi
        // thẳng từ client sẽ kéo ~1,3MB nội dung bài vào bundle, đúng lỗi mà
        // chú thích trong dashboard/actions.ts đã ghi lại.
        const track =
          typeof window !== "undefined" &&
          window.localStorage.getItem("activeTrack") === "professional"
            ? "professional"
            : "personal";
        getResumeLessonAction(user.id, track)
          .then((lesson) => setNextLesson(lesson ?? null))
          // Hỏng thì sảnh vẫn vào được như cũ, chỉ là không có thẻ gợi ý.
          .catch(() => setNextLesson(null));

        setIdentity({
          userId: user.id,
          name: name || user.email?.split("@")[0] || "Người học",
          avatarUrl,
          color: colorForUser(user.id),
          streak,
          level,
          doneToday,
          seat: null,
          gear,
        });
      })
      .catch(() => setFailed(true));
  }, [router]);

  /** Số phút hôm nay đọc ngay khi vào, không đợi tới lúc đứng dậy lần đầu.
   *  Trước đây dòng "hôm nay bạn đã ngồi học N phút" chỉ xuất hiện sau khi kết
   *  thúc một phiên trong chính lần vào này - nên người đã học 90 phút buổi
   *  sáng, chiều quay lại, được chào bằng một khoảng trống. */
  useEffect(() => {
    void getTodayFocusSeconds()
      .then((s) => setTodayMinutes(Math.round(s / 60)))
      .catch(() => {});
  }, []);

  /** Mở và đóng phiên ngồi học. Trước đây ngồi hết 25 phút trong thư viện
   *  không để lại dấu vết nào. */
  useEffect(() => {
    if (seatedTable === null) return;
    let cancelled = false;
    void startFocusSession("thu-vien", `ban-${seatedTable}`).then((id) => {
      if (cancelled) void (id !== null && finishFocusSession(id));
      else focusIdRef.current = id;
    });
    return () => {
      cancelled = true;
      const id = focusIdRef.current;
      focusIdRef.current = null;
      if (id !== null) {
        void finishFocusSession(id).then((r) => {
          if (r.counted) void getTodayFocusSeconds().then((s) => setTodayMinutes(Math.round(s / 60)));
        });
      }
    };
  }, [seatedTable]);

  /** Nhịp giây cho đồng hồ phiên trên HUD. Chỉ chạy khi đang ngồi - một
   *  setInterval sống suốt phiên chỉ để cập nhật thứ không hiển thị là lãng phí
   *  và làm cả trang re-render mỗi giây. */
  useEffect(() => {
    if (seatedTable === null) return;
    setNowTick(Date.now());
    const timer = window.setInterval(() => setNowTick(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [seatedTable]);

  /** Hết 25 phút thì phải BÁO, chứ không chỉ đổi chữ trên màn hình thành "Xong!".
   *  Cả điểm của một phiên Pomodoro là được rời mắt khỏi màn hình trong lúc nó
   *  chạy; một dấu hiệu chỉ nhìn mới thấy thì đúng ra là không có dấu hiệu nào.
   *  Dùng chung chuông với phòng học để hai nơi nghe giống nhau. */
  useEffect(() => {
    if (chimed || !isSessionComplete(seatStartedAt, nowTick, POMODORO_MS)) return;
    setChimed(true);
    playSessionChime();
    notifySessionDone(Math.round(POMODORO_MS / 60000));
  }, [chimed, seatStartedAt, nowTick]);

  /** Rời tab quá lâu thì đóng phiên. Không có cái này, ngồi vào bàn rồi đi ăn
   *  trưa vẫn được tính là học - và `todayMinutes` là con số người ta dùng để
   *  tự đánh giá, nên thổi phồng nó còn tệ hơn là không đếm. */
  useEffect(() => {
    if (seatedTable === null) return;
    let hiddenSince: number | null = null;
    const onVisibility = () => {
      if (document.hidden) {
        hiddenSince = Date.now();
        return;
      }
      if (shouldEndForAway(hiddenSince, Date.now(), AWAY_MS)) {
        setSeatedTable(null);
        setSeatStartedAt(null);
      }
      hiddenSince = null;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [seatedTable]);

  const pushLog = useCallback((message: LobbyChatMessage) => {
    // Giữ 30 dòng gần nhất: đủ để bắt kịp mạch chuyện vừa lỡ, không đủ để
    // biến thành một cuộn lịch sử phải quản lý.
    setLog((prev) => [...prev.slice(-29), message]);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) return;
    const message = sendChat(identity.userId, identity.name, draft);
    if (!message) return;
    setDraft("");
    // Hiện câu của mình ngay, không chờ vòng về server.
    setSelfSpeech({ text: message.text, at: message.at });
    pushLog(message);
  };

  if (failed) {
    return <SceneFallback label={t.lobby.connectFailed} />;
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {identity ? (
        <LobbySceneInner
          identity={identity}
          onChatMessage={pushLog}
          onPortalProximity={setNearGate}
          selfSpeech={selfSpeech}
          onPeerCount={setPeerCount}
          onSeatableChange={setSeatableTable}
          onStationNear={setStation}
          seatedTable={seatedTable}
          seatStartedAt={seatStartedAt}
          walkRef={walkRef}
        />
      ) : (
        <SceneFallback label={t.lobby.opening} />
      )}

      {/* Tiêu đề + số người THẬT trong phòng (đếm từ presence, không phải số dựng) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-2 p-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="rounded-2xl bg-stone-900/75 px-5 py-2.5 text-center shadow-lg backdrop-blur">
          <h1 className="text-sm font-bold text-amber-200">{t.lobby.title}</h1>
          {todayMinutes !== null && todayMinutes > 0 && (
            <p className="text-[11px] font-bold text-amber-300">
              {format(t.lobby.studiedToday, { minutes: todayMinutes })}
            </p>
          )}
          <p className="text-[11px] text-stone-400">
            {peerCount > 0
              ? format(t.lobby.peersHere, { count: peerCount })
              : t.lobby.alone}
          </p>
        </div>

        {/* Bài kế tiếp - ngay tầm mắt lúc vừa vào, không phải sau một quãng đi
            bộ tới cửa phòng trên ban công. Ẩn khi đang đứng trước một cửa: lúc
            đó thẻ cửa đã nói đúng việc cần làm, hai thẻ chồng nhau chỉ gây
            nhiễu. */}
        {nextLesson && !nearGate && !station && (
          <Link
            href={`/bai-hoc/${nextLesson.slug}`}
            className="pointer-events-auto flex max-w-[min(22rem,90vw)] items-center gap-3 rounded-2xl border border-amber-400/40 bg-stone-900/85 px-4 py-2.5 text-left shadow-xl backdrop-blur transition hover:border-amber-300 hover:bg-stone-900"
          >
            <span className="shrink-0 text-xl">📖</span>
            <span className="min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-widest text-amber-300">
                {t.lobby.nextLessonLabel}
              </span>
              <span className="block truncate text-sm font-bold text-white">{nextLesson.title}</span>
            </span>
            <span className="ml-auto shrink-0 rounded-xl bg-amber-400 px-3 py-1.5 text-[11px] font-black text-stone-950">
              {t.lobby.startLesson}
            </span>
          </Link>
        )}

        {/* Bảng chỉ đường. Nằm trong CHÍNH cột này chứ không neo riêng ở một
            góc: nó phải xếp chồng dưới thẻ bài kế tiếp, còn một panel neo góc
            trên màn 390px thì rộng gần hết bề ngang và đè lên thẻ đó.
            Ẩn cùng lúc với thẻ bài kế tiếp khi đang đứng trước một cửa hoặc
            một cổng - lúc ấy đích đến đã ở ngay trước mặt, một danh sách mười
            đích khác chỉ làm nhiễu. */}
        {!nearGate && !station && <LobbyDirectory />}
      </div>

      {/* Ngồi vào bàn / đứng dậy. Nút chỉ xuất hiện khi thực sự đứng cạnh một
          cái bàn - một nút "ngồi" luôn hiện sẽ phải tự đoán ngồi bàn nào. */}
      {(seatableTable !== null || seatedTable !== null) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-56 z-10 flex justify-center px-4 sm:bottom-32">
          {seatedTable === null ? (
            <button
              type="button"
              onClick={() => {
                setSeatedTable(seatableTable);
                setSeatStartedAt(Date.now());
                setChimed(false);
              }}
              className="pointer-events-auto rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-emerald-400"
            >
              {t.lobby.sitDown}
            </button>
          ) : (
            <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-stone-900/85 px-4 py-2.5 shadow-xl backdrop-blur">
              <span className="font-mono text-lg font-bold tabular-nums text-amber-300">
                {(() => {
                  const left = remainingMs(seatStartedAt, nowTick, POMODORO_MS);
                  return left === 0 ? t.lobby.sessionDone : formatCountdown(left);
                })()}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSeatedTable(null);
                  setSeatStartedAt(null);
                }}
                className="rounded-xl bg-stone-700 px-3 py-1.5 text-xs font-bold text-stone-100 transition hover:bg-stone-600"
              >
                {t.lobby.standUp}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Lời mời đi tiếp, chỉ hiện khi đứng gần một cánh cổng. Nhãn và màu đến
          từ chính cánh cổng đó, nên thêm cổng thứ ba không phải sửa ở đây. */}
      {nearGate && (
        <div className="pointer-events-none absolute inset-x-0 top-24 z-10 flex justify-center px-4">
          <Link
            href={nearGate.href}
            className="pointer-events-auto rounded-2xl px-5 py-3 text-sm font-bold text-stone-950 shadow-xl backdrop-blur transition hover:brightness-110"
            style={{ backgroundColor: nearGate.accent }}
          >
            {nearGate.label}
          </Link>
        </div>
      )}

      {/* Nhật ký chat gần đây */}
      {log.length > 0 && (
        <div className="pointer-events-none absolute left-4 top-1/2 z-10 hidden w-72 -translate-y-1/2 flex-col gap-1 sm:flex">
          {log.slice(-6).map((m) => (
            <div
              key={m.id}
              className="rounded-xl bg-stone-900/70 px-3 py-1.5 text-xs text-stone-200 backdrop-blur"
            >
              <span className="font-bold text-amber-300">{m.name}</span>{" "}
              <span className="text-stone-300">{m.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Thẻ cửa phòng học: hiện khi đứng trước một cửa trên ban công tầng hai.
          Công thức nằm ngay trên thẻ chứ không chỉ trên biển đá trong cảnh -
          trên điện thoại biển đá trong cảnh 3D nhỏ tới mức không đọc nổi. */}
      {station && (
        <div className="pointer-events-none absolute inset-x-0 bottom-56 z-10 flex justify-center px-4 sm:bottom-44">
          <div
            className="pointer-events-auto w-full max-w-sm rounded-2xl border bg-stone-900/90 p-4 shadow-2xl backdrop-blur"
            style={{ borderColor: station.accent }}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: station.accent }}>
              {station.room}
            </p>
            <p className="mt-2 font-mono text-base font-semibold text-stone-50">{station.formula}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-stone-400">{station.note}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="min-w-0 flex-1 truncate text-xs text-stone-300">{station.blurb}</p>
              <Link
                href={stationRoomHref(station)}
                className="shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold text-stone-900 transition hover:brightness-110"
                style={{ backgroundColor: station.accent }}
              >
                {t.lobby.enterRoom}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Thanh dưới: ô chat + hướng dẫn + D-pad.
      
          Trên điện thoại xếp DỌC - D-pad một hàng riêng bên trên, ô chat chiếm
          trọn bề ngang bên dưới. Xếp ngang như trên desktop thì D-pad ăn mất
          180px của 390px màn hình và ô nhập còn đúng 102px, hẹp tới mức chữ
          gợi ý cũng không hiện hết.
      
          pb theo safe-area: thanh Home của iPhone nằm đè lên 34px cuối màn
          hình, và không có dòng này thì hàng nút dưới cùng nằm ngay dưới nó. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-stretch gap-2 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-end sm:justify-between sm:gap-3">
        <div className="order-2 flex min-w-0 flex-1 flex-col gap-2 sm:order-1">
          <form onSubmit={submit} className="pointer-events-auto flex max-w-md gap-2">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={CHAT_MAX_LENGTH}
              placeholder={t.lobby.chatPlaceholder}
              className="min-w-0 flex-1 rounded-2xl border border-stone-700 bg-stone-900/85 px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 shadow-lg backdrop-blur outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="shrink-0 rounded-2xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-stone-900 shadow-lg transition hover:bg-amber-400 disabled:opacity-40"
            >
              {t.lobby.send}
            </button>
          </form>
          <div className="pointer-events-none hidden text-[11px] font-medium text-stone-400 pointer-fine:sm:block">
            {t.lobby.hintPart1}
            <kbd className="rounded bg-stone-800 px-1.5 py-0.5">{t.lobby.hintKeys}</kbd>
            {t.lobby.hintPart2}
          </div>
          <div className="pointer-events-none hidden truncate text-[11px] font-medium text-stone-400 max-sm:block pointer-coarse:block">
            {t.lobby.hintTouch}
          </div>
        </div>
        <div className="order-1 flex justify-end sm:order-2">
          <Joystick
            onVector={(x, y) => {
              const walk = walkRef.current;
              walk.input.x = x;
              walk.input.y = y;
              // Cầm cần là giành lại quyền lái: đích chạm-để-đi phải nhường.
              if (Math.hypot(x, y) > 0.08) walk.target = null;
            }}
          />
        </div>
      </div>
    </div>
  );
}
