"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { getUserStreak } from "@/lib/supabase-streak";
import type { Station } from "./stations";
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
import type { GateTarget } from "./RoomFixtures";

const LobbySceneInner = dynamic(() => import("./LobbySceneInner"), {
  ssr: false,
  loading: () => <SceneFallback label="Đang dựng thư viện…" />,
});

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

/** Nút giữ-để-đi cho màn cảm ứng: phát sự kiện bàn phím giả để dùng chung một
 *  đường điều khiển với desktop, thay vì mở kênh trạng thái thứ hai.
 *
 *  Bốn hướng giờ là bốn hướng THẬT trên màn hình, không phải "xoay trái/phải"
 *  như hồi còn lái kiểu xe tăng: từ khi cả ba thế giới đi theo hướng nhìn, bấm
 *  ← là bước sang trái màn hình chứ không phải quay người.
 *
 *  Nhả phím phải bắt cả pointerup, pointerleave LẪN pointercancel. Trên iOS,
 *  ngón tay trượt khỏi nút hay bị hệ thống cắt ngang chỉ sinh ra pointercancel;
 *  thiếu nó thì phím kẹt ở trạng thái đang giữ và nhân vật đi mãi không dừng. */
function TouchPad() {
  const press = (key: string, type: "keydown" | "keyup") => {
    window.dispatchEvent(new KeyboardEvent(type, { key }));
  };
  const HoldButton = ({
    eventKey,
    label,
    hint,
  }: {
    eventKey: string;
    label: string;
    hint: string;
  }) => {
    const release = () => press(eventKey, "keyup");
    return (
      <button
        type="button"
        aria-label={hint}
        className="flex h-14 w-14 select-none touch-none items-center justify-center rounded-2xl bg-stone-800/85 text-xl text-stone-100 shadow-lg backdrop-blur active:bg-amber-500 active:text-stone-900"
        onPointerDown={(e) => {
          e.preventDefault();
          press(eventKey, "keydown");
        }}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onContextMenu={(e) => e.preventDefault()}
      >
        {label}
      </button>
    );
  };
  return (
    // Hiện khi màn hẹp HOẶC khi con trỏ là ngón tay. Chỉ dựa vào breakpoint
    // thì hỏng ở điện thoại xoay ngang: Tailwind đo BỀ RỘNG, và 844px bị coi
    // là desktop nên D-pad biến mất trên đúng thiết bị không có bàn phím thay
    // thế. Chỉ dựa vào pointer-coarse thì hỏng ở cửa sổ desktop thu hẹp.
    <div className="pointer-events-auto hidden grid-cols-3 gap-1.5 max-sm:grid pointer-coarse:grid">
      <div />
      <HoldButton eventKey="ArrowUp" label="↑" hint="Đi tới" />
      <div />
      <HoldButton eventKey="ArrowLeft" label="←" hint="Sang trái" />
      <HoldButton eventKey="ArrowDown" label="↓" hint="Lùi lại" />
      <HoldButton eventKey="ArrowRight" label="→" hint="Sang phải" />
    </div>
  );
}

export default function LobbyClient() {
  const router = useRouter();
  const [identity, setIdentity] = useState<LobbyIdentity | null>(null);
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
  const [nowTick, setNowTick] = useState(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

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

        setIdentity({
          userId: user.id,
          name: name || user.email?.split("@")[0] || "Người học",
          avatarUrl,
          color: colorForUser(user.id),
          streak,
          level,
          doneToday,
          seat: null,
        });
      })
      .catch(() => setFailed(true));
  }, [router]);

  /** Nhịp giây cho đồng hồ phiên trên HUD. Chỉ chạy khi đang ngồi - một
   *  setInterval sống suốt phiên chỉ để cập nhật thứ không hiển thị là lãng phí
   *  và làm cả trang re-render mỗi giây. */
  useEffect(() => {
    if (seatedTable === null) return;
    setNowTick(Date.now());
    const timer = window.setInterval(() => setNowTick(Date.now()), 1000);
    return () => window.clearInterval(timer);
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
    return <SceneFallback label="Không kết nối được. Thử tải lại trang." />;
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
        />
      ) : (
        <SceneFallback label="Đang mở cửa thư viện…" />
      )}

      {/* Tiêu đề + số người THẬT trong phòng (đếm từ presence, không phải số dựng) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center p-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="rounded-2xl bg-stone-900/75 px-5 py-2.5 text-center shadow-lg backdrop-blur">
          <h1 className="text-sm font-bold text-amber-200">Thư viện · Phòng đọc Sài Gòn</h1>
          <p className="text-[11px] text-stone-400">
            {peerCount > 0
              ? `${peerCount} người đang ở trong sảnh`
              : "Bạn đang ở đây một mình"}
          </p>
        </div>
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
              }}
              className="pointer-events-auto rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-emerald-400"
            >
              Ngồi xuống học · phiên 25 phút
            </button>
          ) : (
            <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-stone-900/85 px-4 py-2.5 shadow-xl backdrop-blur">
              <span className="font-mono text-lg font-bold tabular-nums text-amber-300">
                {(() => {
                  const left = Math.max(0, POMODORO_MS - (nowTick - (seatStartedAt ?? nowTick)));
                  const m = String(Math.floor(left / 60000)).padStart(2, "0");
                  const sec = String(Math.floor((left % 60000) / 1000)).padStart(2, "0");
                  return left === 0 ? "Xong!" : `${m}:${sec}`;
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
                Đứng dậy
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
                href={station.href}
                className="shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold text-stone-900 transition hover:brightness-110"
                style={{ backgroundColor: station.accent }}
              >
                Vào phòng →
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
              placeholder="Nói gì đó với cả sảnh…"
              className="min-w-0 flex-1 rounded-2xl border border-stone-700 bg-stone-900/85 px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 shadow-lg backdrop-blur outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="shrink-0 rounded-2xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-stone-900 shadow-lg transition hover:bg-amber-400 disabled:opacity-40"
            >
              Gửi
            </button>
          </form>
          <div className="pointer-events-none hidden text-[11px] font-medium text-stone-400 pointer-fine:sm:block">
            Chạm vào chỗ muốn tới, hoặc bấm{" "}
            <kbd className="rounded bg-stone-800 px-1.5 py-0.5">W A S D</kbd> · kéo chuột để đổi góc nhìn, lăn để phóng · tin nhắn không được lưu lại
          </div>
          <div className="pointer-events-none hidden truncate text-[11px] font-medium text-stone-400 max-sm:block pointer-coarse:block">
            Kéo màn hình để đổi góc nhìn · chụm hai ngón để phóng
          </div>
        </div>
        <div className="order-1 flex justify-end sm:order-2">
          <TouchPad />
        </div>
      </div>
    </div>
  );
}
