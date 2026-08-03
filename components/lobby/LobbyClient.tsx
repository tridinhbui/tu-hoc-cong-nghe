"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { colorForUser, type LobbyIdentity } from "@/lib/supabase-lobby";

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
  const HoldButton = ({ eventKey, label, className }: { eventKey: string; label: string; className?: string }) => (
    <button
      type="button"
      aria-label={label}
      className={`flex h-12 w-12 select-none items-center justify-center rounded-2xl bg-stone-800/80 text-lg text-stone-100 shadow-lg backdrop-blur active:bg-stone-600 ${className ?? ""}`}
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

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
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
    }).catch(() => setFailed(true));
  }, [router]);

  const hud = useMemo(
    () => (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4">
        <div className="pointer-events-auto rounded-2xl bg-stone-900/75 px-4 py-2.5 text-xs font-medium text-stone-200 shadow-lg backdrop-blur">
          <span className="hidden sm:inline">
            <kbd className="rounded bg-stone-700 px-1.5 py-0.5">W</kbd>{" "}
            <kbd className="rounded bg-stone-700 px-1.5 py-0.5">S</kbd> đi lại ·{" "}
            <kbd className="rounded bg-stone-700 px-1.5 py-0.5">A</kbd>{" "}
            <kbd className="rounded bg-stone-700 px-1.5 py-0.5">D</kbd> xoay người
          </span>
          <span className="sm:hidden">Giữ nút để di chuyển</span>
        </div>
        <TouchPad />
      </div>
    ),
    []
  );

  if (failed) {
    return <SceneFallback label="Không kết nối được. Thử tải lại trang." />;
  }

  return (
    // 100dvh trừ đi không gì cả: layout cha đã lo phần sidebar bằng lg:pl-64,
    // nên ở đây chỉ cần chiếm trọn chiều cao còn lại.
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {identity ? <LobbySceneInner identity={identity} /> : <SceneFallback label="Đang mở cửa thư viện…" />}
      {hud}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center p-4">
        <div className="rounded-2xl bg-stone-900/75 px-5 py-2.5 text-center shadow-lg backdrop-blur">
          <h1 className="text-sm font-bold text-amber-200">Đại sảnh · Phòng đọc New York</h1>
          <p className="text-[11px] text-stone-400">Nơi khởi nguồn của tài chính hiện đại</p>
        </div>
      </div>
    </div>
  );
}
