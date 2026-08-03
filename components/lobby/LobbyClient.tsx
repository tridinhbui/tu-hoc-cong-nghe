"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import {
  CHAT_MAX_LENGTH,
  colorForUser,
  sendChat,
  type LobbyChatMessage,
  type LobbyIdentity,
} from "@/lib/supabase-lobby";

/** three.js chỉ chạy phía trình duyệt - ssr:false giữ nó ngoài bundle server,
 *  và người dùng thấy khung chờ thay vì lỗi hydrate. */
const LobbySceneInner = dynamic(() => import("./LobbySceneInner"), {
  ssr: false,
  loading: () => <SceneFallback label="Đang dựng đại sảnh…" />,
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
 *  đường điều khiển với desktop, thay vì mở kênh trạng thái thứ hai. */
function TouchPad() {
  const press = (key: string, type: "keydown" | "keyup") => {
    window.dispatchEvent(new KeyboardEvent(type, { key }));
  };
  const HoldButton = ({ eventKey, label }: { eventKey: string; label: string }) => (
    <button
      type="button"
      aria-label={label}
      className="flex h-12 w-12 select-none items-center justify-center rounded-2xl bg-stone-800/80 text-lg text-stone-100 shadow-lg backdrop-blur active:bg-stone-600"
      onPointerDown={(e) => {
        e.preventDefault();
        press(eventKey, "keydown");
      }}
      onPointerUp={() => press(eventKey, "keyup")}
      onPointerLeave={() => press(eventKey, "keyup")}
      onContextMenu={(e) => e.preventDefault()}
    >
      {label}
    </button>
  );
  return (
    <div className="pointer-events-auto grid grid-cols-3 gap-1.5 sm:hidden">
      <div />
      <HoldButton eventKey="ArrowUp" label="↑" />
      <div />
      <HoldButton eventKey="ArrowLeft" label="↺" />
      <HoldButton eventKey="ArrowDown" label="↓" />
      <HoldButton eventKey="ArrowRight" label="↻" />
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
  const [nearPortal, setNearPortal] = useState(false);
  const [peerCount, setPeerCount] = useState(0);
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
        try {
          const { data } = await supabase
            .from("user_profiles")
            .select("full_name, avatar_url")
            .eq("id", user.id)
            .single();
          if (data?.full_name) name = data.full_name;
          if (data?.avatar_url) avatarUrl = data.avatar_url;
        } catch {
          // giữ fallback
        }
        setIdentity({
          userId: user.id,
          name: name || user.email?.split("@")[0] || "Người học",
          avatarUrl,
          color: colorForUser(user.id),
        });
      })
      .catch(() => setFailed(true));
  }, [router]);

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
          onPortalProximity={setNearPortal}
          selfSpeech={selfSpeech}
          onPeerCount={setPeerCount}
        />
      ) : (
        <SceneFallback label="Đang mở cửa thư viện…" />
      )}

      {/* Tiêu đề + số người THẬT trong phòng (đếm từ presence, không phải số dựng) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center p-4">
        <div className="rounded-2xl bg-stone-900/75 px-5 py-2.5 text-center shadow-lg backdrop-blur">
          <h1 className="text-sm font-bold text-amber-200">Đại sảnh · Phòng đọc New York</h1>
          <p className="text-[11px] text-stone-400">
            {peerCount > 0
              ? `${peerCount} người đang ở trong sảnh`
              : "Bạn đang ở đây một mình"}
          </p>
        </div>
      </div>

      {/* Lời mời vào nhóm học, chỉ hiện khi đứng gần cổng */}
      {nearPortal && (
        <div className="pointer-events-none absolute inset-x-0 top-24 z-10 flex justify-center px-4">
          <Link
            href="/nhom-hoc"
            className="pointer-events-auto rounded-2xl bg-sky-500/90 px-5 py-3 text-sm font-bold text-white shadow-xl backdrop-blur transition hover:bg-sky-400"
          >
            Bước qua cổng → vào Nhóm học
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

      {/* Thanh dưới: ô chat + hướng dẫn + D-pad */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
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
          <div className="pointer-events-none hidden text-[11px] font-medium text-stone-400 sm:block">
            <kbd className="rounded bg-stone-800 px-1.5 py-0.5">W</kbd>{" "}
            <kbd className="rounded bg-stone-800 px-1.5 py-0.5">S</kbd> đi lại ·{" "}
            <kbd className="rounded bg-stone-800 px-1.5 py-0.5">A</kbd>{" "}
            <kbd className="rounded bg-stone-800 px-1.5 py-0.5">D</kbd> xoay người · tin nhắn không được lưu lại
          </div>
        </div>
        <TouchPad />
      </div>
    </div>
  );
}
