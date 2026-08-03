"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { ITEM_DESCRIPTIONS, WEARABLE_IN_3D, type CharacterEquipments } from "@/lib/rpg-items";
import { COMPETENCIES } from "@/lib/career-competency";
import { getLeaderboardByMetric, type LeaderboardRow } from "@/lib/supabase-user";
import type { DistrictRoomId } from "./district-space";
import ThreeStatementPanel from "./ThreeStatementPanel";
import CompoundTowerPanel from "./CompoundTowerPanel";
import CapitalStackPanel from "./CapitalStackPanel";
import CashCyclePanel from "./CashCyclePanel";
import PortfolioRiskPanel from "./PortfolioRiskPanel";
import TeachBackPanel from "./TeachBackPanel";

/** Nội dung của sáu căn nhà dân sự, mở ra khi đứng lên bục giữa phòng.
 *
 *  Không có căn nào dựng lại nội dung bằng khối 3D: bảng xếp hạng, danh sách
 *  đồ, hồ sơ cá nhân đều đã có màn hình riêng làm việc đó tốt hơn, và một bảng
 *  xếp hạng khắc bằng chữ 3D vừa khó đọc vừa lệch khỏi bản thật ngay lần sửa
 *  đầu tiên. Căn phòng đưa người ta tới chỗ đứng; tấm thẻ này là nội dung.
 *
 *  Mỗi phòng tự nạp dữ liệu của mình khi được mở, không nạp sẵn cả sáu lúc vào
 *  thành phố: người học thường chỉ ghé một hai căn mỗi phiên, và sáu truy vấn
 *  lúc mở bản đồ là sáu truy vấn phần lớn bị bỏ phí. */

interface Props {
  roomId: DistrictRoomId;
  accent: string;
  userId: string;
  /** Đồ đang mặc thật, để gương so với món đang thử. */
  gear: CharacterEquipments;
  /** Món đang thử trên người - null là đang mặc đồ thật. */
  tryOn: CharacterEquipments | null;
  onTryOn: (gear: CharacterEquipments | null) => void;
  onClose: () => void;
}

function Card({
  title,
  subtitle,
  accent,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  accent: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 max-h-[52vh] overflow-y-auto rounded-2xl border border-stone-700 bg-stone-900/94 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-96">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
            {title}
          </p>
          {subtitle && <p className="mt-0.5 text-[11px] text-stone-400">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-[10px] font-bold text-stone-500 hover:text-stone-300"
        >
          đóng
        </button>
      </div>
      {children}
    </div>
  );
}

/** Cửa hàng: bấm một món là mặc thử ngay trên nhân vật trước gương. */
function Shop({ accent, gear, tryOn, onTryOn, onClose }: Props) {
  const wearable = useMemo(
    // Lọc bằng WEARABLE_IN_3D của lib/rpg-items.ts, KHÔNG chép lại danh sách.
    // Bản đầu tiên của cửa hàng giữ một bản sao ở đây, đúng loại lỗi mà cả
    // đêm nay đi sửa ở chỗ khác - hai danh sách rồi sẽ lệch, và lúc đó cửa
    // hàng bày một món mà nhân vật không mặc được.
    () => Object.entries(ITEM_DESCRIPTIONS).filter(([key]) => WEARABLE_IN_3D.has(key)),
    []
  );
  const shown = tryOn ?? gear;

  return (
    <Card
      title="Cửa hàng & Gương thử đồ"
      subtitle="Bấm để mặc thử — nhìn nhân vật trước gương rồi mới quyết"
      accent={accent}
      onClose={() => {
        onTryOn(null);
        onClose();
      }}
    >
      <div className="grid grid-cols-2 gap-1.5">
        {wearable.map(([key, item]) => {
          const slot = item.type;
          const wearing = shown[slot] === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                // Thử món khác thì bỏ món cũ CÙNG Ô: một người không đội hai
                // cái mũ, và giữ cả hai sẽ khiến gương nói dối.
                const next: CharacterEquipments = { ...shown };
                if (wearing) delete next[slot];
                else next[slot] = key;
                onTryOn(next);
              }}
              className={`cursor-pointer rounded-xl border px-2 py-1.5 text-left text-[11px] leading-snug transition ${
                wearing
                  ? "border-amber-400 bg-amber-950/50 text-amber-100"
                  : "border-stone-700 bg-stone-800/50 text-stone-300 hover:border-stone-500"
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              {item.name}
            </button>
          );
        })}
      </div>
      <div className="mt-2.5 flex gap-1.5">
        <button
          type="button"
          onClick={() => onTryOn(null)}
          className="flex-1 cursor-pointer rounded-xl bg-stone-800 px-3 py-2 text-[11px] font-bold text-stone-200 transition hover:bg-stone-700"
        >
          Về đồ đang mặc
        </button>
        {/* Mua vẫn ở màn hình cửa hàng thật: nó đụng tới xu và kho đồ, và một
            đường mua thứ hai là một chỗ nữa để số dư sai. */}
        <Link
          href="/cua-hang"
          className="flex-1 rounded-xl px-3 py-2 text-center text-[11px] font-black text-stone-950 transition hover:brightness-110"
          style={{ backgroundColor: accent }}
        >
          Tới cửa hàng mua ↗
        </Link>
      </div>
    </Card>
  );
}

const METRICS: Array<{ id: "xp" | "lessons" | "streak" | "avg_score"; label: string }> = [
  { id: "xp", label: "Tổng XP" },
  { id: "lessons", label: "Số bài học" },
  { id: "streak", label: "Chuỗi ngày" },
  { id: "avg_score", label: "Điểm trung bình" },
];

function HallOfFame({ accent, userId, onClose }: Props) {
  const [metric, setMetric] = useState<(typeof METRICS)[number]["id"]>("xp");
  const [rows, setRows] = useState<LeaderboardRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    setRows(null);
    void getLeaderboardByMetric(metric, 10)
      .then((r) => !cancelled && setRows(r))
      .catch(() => !cancelled && setRows([]));
    return () => {
      cancelled = true;
    };
  }, [metric]);

  return (
    <Card title="Sảnh Bảng vàng" subtitle="Mười người dẫn đầu" accent={accent} onClose={onClose}>
      <div className="mb-2 flex flex-wrap gap-1">
        {METRICS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMetric(m.id)}
            className={`cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-bold transition ${
              metric === m.id ? "bg-amber-400 text-stone-950" : "bg-stone-800 text-stone-300 hover:bg-stone-700"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      {rows === null ? (
        <p className="text-[11px] text-stone-400">Đang đọc bảng…</p>
      ) : rows.length === 0 ? (
        <p className="text-[11px] text-stone-400">Chưa có ai trên bảng này.</p>
      ) : (
        <ol className="space-y-0.5">
          {rows.map((r, i) => (
            <li
              key={r.user_id}
              className={`flex items-center gap-2 rounded-lg px-2 py-1 text-[11px] ${
                r.user_id === userId ? "bg-amber-950/50 text-amber-100" : "text-stone-300"
              }`}
            >
              <span className="w-5 shrink-0 text-right font-mono font-black text-stone-500">{i + 1}</span>
              <span className="min-w-0 flex-1 truncate">{r.name || "Người học"}</span>
              <span className="shrink-0 font-mono tabular-nums text-stone-400">{r.value}</span>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-2 text-[10px] leading-snug text-stone-500">
        Bảng theo từng năng lực ({COMPETENCIES.length} nhóm) nằm ở trang Thống kê.
      </p>
      <Link
        href="/analytics"
        className="mt-1.5 block rounded-xl bg-stone-800 px-3 py-1.5 text-center text-[11px] font-bold text-stone-200 transition hover:bg-stone-700"
      >
        Xem bảng năng lực ↗
      </Link>
    </Card>
  );
}

const EXAMS = [
  { href: "/cfa/thi-thu", label: "Đề thi thử CFA Level I", note: "Theo trọng số môn thật" },
  { href: "/kiem-tra", label: "Kiểm tra theo chặng", note: "Chấm điểm ngay" },
  { href: "/phong-van-ky-thuat", label: "Phỏng vấn kỹ thuật IB", note: "Câu hỏi có chấm" },
];

function ExamRoom({ accent, onClose }: Props) {
  return (
    <Card
      title="Phòng thi"
      subtitle="Vào bàn là bắt đầu — im lặng và tính giờ"
      accent={accent}
      onClose={onClose}
    >
      <div className="space-y-1.5">
        {EXAMS.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="block rounded-xl border border-stone-700 bg-stone-800/50 px-3 py-2 transition hover:border-stone-500"
          >
            <p className="text-[11px] font-black text-stone-100">{e.label}</p>
            <p className="text-[10px] text-stone-400">{e.note}</p>
          </Link>
        ))}
      </div>
    </Card>
  );
}

interface ApartmentStats {
  streak: number;
  level: number;
  xp: number;
  lessons: number;
}

function Apartment({ accent, userId, onClose }: Props) {
  const [stats, setStats] = useState<ApartmentStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    void Promise.all([
      supabase.from("user_profiles").select("current_level, total_xp").eq("id", userId).maybeSingle(),
      supabase.from("user_streaks").select("current_streak").eq("user_id", userId).maybeSingle(),
      supabase.from("user_progress").select("lesson_id").eq("user_id", userId).eq("completed", true),
    ]).then(([profile, streak, progress]) => {
      if (cancelled) return;
      setStats({
        level: profile.data?.current_level ?? 1,
        xp: profile.data?.total_xp ?? 0,
        streak: streak.data?.current_streak ?? 0,
        lessons: progress.data?.length ?? 0,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <Card
      title="Căn hộ của bạn"
      subtitle="Chỗ duy nhất trong thành phố là của riêng bạn"
      accent={accent}
      onClose={onClose}
    >
      {stats === null ? (
        <p className="text-[11px] text-stone-400">Đang mở cửa…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: "🔥 Chuỗi ngày", value: `${stats.streak} ngày` },
              { label: "⭐ Cấp độ", value: `Lv.${stats.level}` },
              { label: "✨ Tổng XP", value: String(stats.xp) },
              { label: "📚 Bài đã học", value: String(stats.lessons) },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-stone-800/60 px-2.5 py-1.5">
                <p className="text-[9px] font-bold uppercase tracking-wider text-stone-500">{s.label}</p>
                <p className="text-sm font-black tabular-nums text-stone-100">{s.value}</p>
              </div>
            ))}
          </div>
          <Link
            href="/profile"
            className="mt-2 block rounded-xl px-3 py-2 text-center text-[11px] font-black text-stone-950 transition hover:brightness-110"
            style={{ backgroundColor: accent }}
          >
            Mở hồ sơ đầy đủ ↗
          </Link>
        </>
      )}
    </Card>
  );
}

/** Hiện vật bảo tàng.
 *
 *  Bốn hiện vật đầu tiên đều trỏ tới bài học CÓ THẬT trong kho - và điều đó
 *  được test canh gác (lib/__tests__/civic-content.test.ts), không phải dựa
 *  vào việc người thêm hiện vật nhớ kiểm.
 *
 *  Bản đầu tiên của danh sách này có bốn slug tôi tự nghĩ ra (khung-hoang-1929,
 *  khung-hoang-2008...) và ba trong bốn không tồn tại: cả bảo tàng dẫn tới
 *  trang trống. Bài học không có trường "năm sự kiện" nào để suy ra hiện vật,
 *  nên danh sách buộc phải viết tay - và thứ viết tay thì phải có test. */
const EXHIBITS = [
  {
    year: "Rủi ro hệ thống",
    title: "Vì sao thị trường chỉ trả tiền cho rủi ro hệ thống",
    slug: "frm-thi-truong-chi-tra-cho-rui-ro-he-thong",
  },
  {
    year: "Ngân hàng ngầm",
    title: "Shadow banking và rủi ro ngoài bảng cân đối",
    slug: "ngan-hang-ngam-shadow-banking",
  },
  {
    year: "Trái phiếu VN",
    title: "Giải phẫu một cuộc khủng hoảng trái phiếu riêng lẻ",
    slug: "trai-phieu-doanh-nghiep-rieng-le-bai-hoc",
  },
  {
    year: "Lạm phát",
    title: "Lạm phát là gì, vì sao tiền mất giá",
    slug: "lam-phat-la-gi",
  },
];

function Museum({ accent, onClose }: Props) {
  return (
    <Card
      title="Bảo tàng Tài chính"
      subtitle="Mỗi hiện vật dẫn tới bài học đằng sau nó"
      accent={accent}
      onClose={onClose}
    >
      <div className="space-y-1.5">
        {EXHIBITS.map((e) => (
          <Link
            key={e.slug}
            href={`/bai-hoc/${e.slug}`}
            className="flex items-center gap-2 rounded-xl border border-stone-700 bg-stone-800/50 px-3 py-2 transition hover:border-stone-500"
          >
            <span className="font-mono text-[11px] font-black" style={{ color: accent }}>
              {e.year}
            </span>
            <span className="min-w-0 flex-1 truncate text-[11px] text-stone-200">{e.title}</span>
          </Link>
        ))}
      </div>
      <p className="mt-2 text-[10px] leading-snug text-stone-500">
        Danh sách viết tay, và mỗi slug được test đối chiếu với kho bài học.
      </p>
    </Card>
  );
}

interface FriendRow {
  user_id: string;
  name: string;
  level: number;
  streak: number;
}

function FriendsHouse({ accent, userId, onClose }: Props) {
  const [friends, setFriends] = useState<FriendRow[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    void supabase
      .from("user_connections")
      .select("requester_id, addressee_id, status")
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
      .eq("status", "accepted")
      .then(async ({ data, error }) => {
        if (cancelled) return;
        if (error || !data?.length) {
          setFriends([]);
          return;
        }
        const ids = data.map((r) =>
          (r as { requester_id: string; addressee_id: string }).requester_id === userId
            ? (r as { addressee_id: string }).addressee_id
            : (r as { requester_id: string }).requester_id
        );
        const [profiles, streaks] = await Promise.all([
          supabase.from("user_profiles").select("id, full_name, current_level").in("id", ids),
          supabase.from("user_streaks").select("user_id, current_streak").in("user_id", ids),
        ]);
        if (cancelled) return;
        const streakBy = new Map(
          (streaks.data ?? []).map((s) => [(s as { user_id: string }).user_id, (s as { current_streak: number }).current_streak])
        );
        setFriends(
          (profiles.data ?? []).map((p) => {
            const row = p as { id: string; full_name: string | null; current_level: number | null };
            return {
              user_id: row.id,
              name: row.full_name || "Người học",
              level: row.current_level ?? 1,
              streak: streakBy.get(row.id) ?? 0,
            };
          })
        );
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return (
    <Card
      title="Khu nhà bạn bè"
      subtitle="Chuỗi ngày của những người bạn đã kết bạn"
      accent={accent}
      onClose={onClose}
    >
      {friends === null ? (
        <p className="text-[11px] text-stone-400">Đang gõ cửa…</p>
      ) : friends.length === 0 ? (
        <>
          <p className="text-[11px] text-stone-400">Chưa có ai ở khu này - bạn chưa kết bạn với ai.</p>
          <Link
            href="/ban-be"
            className="mt-2 block rounded-xl px-3 py-2 text-center text-[11px] font-black text-stone-950 transition hover:brightness-110"
            style={{ backgroundColor: accent }}
          >
            Tìm bạn ↗
          </Link>
        </>
      ) : (
        <div className="space-y-1">
          {friends.map((f) => (
            <div key={f.user_id} className="flex items-center gap-2 rounded-lg bg-stone-800/50 px-2.5 py-1.5">
              <span className="min-w-0 flex-1 truncate text-[11px] font-bold text-stone-200">{f.name}</span>
              <span className="shrink-0 text-[10px] text-stone-400">Lv.{f.level}</span>
              <span className="shrink-0 text-[10px] font-bold text-orange-300">🔥 {f.streak}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

/** Ba phòng học thật sự - chúng không đọc dữ liệu người dùng nào, nên chỉ cần
 *  màu nhấn và nút đóng. Tách khỏi PANELS để kiểu của chúng không phải giả vờ
 *  nhận đủ Props của các phòng kia. */
const TEACHING_PANELS: Partial<Record<string, (p: { accent: string; onClose: () => void }) => React.ReactElement>> = {
  "ba-bao-cao": ThreeStatementPanel,
  "thap-lai-kep": CompoundTowerPanel,
  "phong-lbo": CapitalStackPanel,
  "vong-quay-tien": CashCyclePanel,
  "phan-bo-rui-ro": PortfolioRiskPanel,
  "ban-tron": TeachBackPanel,
};

const PANELS: Partial<Record<string, (props: Props) => React.ReactElement>> = {
  "cua-hang": Shop,
  "bang-vang": HallOfFame,
  "phong-thi": ExamRoom,
  "can-ho": Apartment,
  "bao-tang": Museum,
  "nha-ban-be": FriendsHouse,
};

export default function CivicPanel(props: Props) {
  const Teaching = TEACHING_PANELS[props.roomId as string];
  if (Teaching) return <Teaching accent={props.accent} onClose={props.onClose} />;
  const Panel = PANELS[props.roomId as string];
  return Panel ? <Panel {...props} /> : null;
}
