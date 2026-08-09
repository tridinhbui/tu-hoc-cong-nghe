import { createAdminClient } from "@/lib/supabase-admin";

/** Ai thật sự vào phòng nào trong thành phố 3D.
 *
 *  Thành phố có 29 phòng và cho tới giờ không ai biết phòng nào có người vào.
 *  Mọi quyết định "xây thêm phòng gì" đều là đoán, và đoán sai thì công đổ vào
 *  một chỗ không ai tới.
 *
 *  Đọc bằng service role vì RLS trên focus_sessions chỉ cho mỗi người đọc dòng
 *  của mình - đúng cho người học, nhưng số gộp thì phải nhìn được hết. Trang
 *  gọi nó đã nằm sau lớp kiểm quyền admin. */

export interface RoomUsageRow {
  world: string;
  roomKey: string | null;
  sessions: number;
  minutes: number;
  learners: number;
}

export interface WorldUsage {
  available: boolean;
  /** Vì sao không có dữ liệu - để trang nói được lý do thay vì hiện bảng rỗng. */
  reason?: string;
  rows: RoomUsageRow[];
  totalMinutes: number;
  totalLearners: number;
}

export async function getWorldUsage(days = 30): Promise<WorldUsage> {
  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setHours(0, 0, 0, 0);

  const { data, error } = await createAdminClient()
    .from("focus_sessions")
    .select("world, room_key, seconds, user_id")
    .gte("started_at", since.toISOString());

  if (error) {
    // PGRST205 = bảng chưa tồn tại. Đây là trạng thái thật lúc này (migration
    // 20260824_focus_sessions.sql chưa chạy), và trang phải nói ra chứ không
    // hiện một bảng rỗng trông như "chưa ai vào phòng nào".
    const missing = error.code === "PGRST205" || /Could not find the table/i.test(error.message);
    return {
      available: false,
      /* i18n-ignore-start: thông báo vận hành - nó bảo quản trị viên chạy một
         tệp migration cụ thể. Dịch tên tệp SQL là làm hướng dẫn sai. */
      reason: missing
        ? "Bảng focus_sessions chưa tồn tại - chạy supabase/migrations/20260824_focus_sessions.sql"
      /* i18n-ignore-end */
        : error.message,
      rows: [],
      totalMinutes: 0,
      totalLearners: 0,
    };
  }

  const byRoom = new Map<string, { sessions: number; seconds: number; users: Set<string> }>();
  const allUsers = new Set<string>();
  let totalSeconds = 0;

  for (const raw of data ?? []) {
    const row = raw as { world: string; room_key: string | null; seconds: number | null; user_id: string };
    // Phiên chưa đóng (seconds null) không tính: nó có thể là một tab đang mở
    // ngay lúc này và sẽ làm con số nhảy mỗi lần tải trang.
    const seconds = row.seconds ?? 0;
    if (seconds <= 0) continue;
    const key = `${row.world}::${row.room_key ?? ""}`;
    const entry = byRoom.get(key) ?? { sessions: 0, seconds: 0, users: new Set<string>() };
    entry.sessions += 1;
    entry.seconds += seconds;
    entry.users.add(row.user_id);
    byRoom.set(key, entry);
    allUsers.add(row.user_id);
    totalSeconds += seconds;
  }

  const rows: RoomUsageRow[] = [...byRoom.entries()]
    .map(([key, v]) => {
      const [world, roomKey] = key.split("::");
      return {
        world,
        roomKey: roomKey || null,
        sessions: v.sessions,
        minutes: Math.round(v.seconds / 60),
        learners: v.users.size,
      };
    })
    .sort((a, b) => b.minutes - a.minutes);

  return {
    available: true,
    rows,
    totalMinutes: Math.round(totalSeconds / 60),
    totalLearners: allUsers.size,
  };
}
