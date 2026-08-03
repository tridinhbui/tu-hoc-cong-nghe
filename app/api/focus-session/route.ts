import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { updateStreak } from "@/lib/supabase-streak";

/** Phiên ngồi học trong thế giới 3D.
 *
 *  Client chỉ được nói "tôi bắt đầu" và "tôi xong"; ĐỘ DÀI phiên do server tự
 *  tính từ hai mốc nó tự đặt. Nếu để client gửi số giây thì đó là một ô nhập
 *  liệu tự do đi thẳng vào bảng thống kê thời gian học.
 *
 *  Ghi bằng service role vì bảng focus_sessions không mở quyền ghi cho
 *  `authenticated` - cùng cách các bảng điểm đã siết ở
 *  supabase/migrations/20260714_harden_quiz_writes.sql. */

/** Trần một phiên. Dài hơn thế gần như chắc chắn là tab bị bỏ quên chứ không
 *  phải người ngồi học, và một phiên tám tiếng làm hỏng mọi con số trung bình
 *  phía sau nó. */
const MAX_SESSION_SECONDS = 45 * 60;
/** Ngắn hơn thế thì không tính là một phiên - ngồi xuống rồi đứng lên ngay. */
const MIN_SESSION_SECONDS = 60;

const VALID_WORLDS = new Set(["thu-vien", "nhom-hoc", "pho-nghe"]);

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json().catch(() => null)) as {
    action?: string;
    world?: string;
    roomKey?: string;
    id?: number;
  } | null;

  const admin = createAdminClient();

  if (body?.action === "start") {
    const world = String(body.world ?? "");
    if (!VALID_WORLDS.has(world)) {
      return NextResponse.json({ error: "Unknown world" }, { status: 400 });
    }
    // Đóng phiên cũ còn bỏ ngỏ trước khi mở phiên mới: chỉ số duy nhất trên
    // bảng chặn hai phiên mở cùng lúc, và một tab bị đóng đột ngột sẽ để lại
    // đúng tình trạng đó.
    await admin
      .from("focus_sessions")
      .update({ ended_at: new Date().toISOString(), seconds: 0 })
      .eq("user_id", user.id)
      .is("ended_at", null);

    const { data, error } = await admin
      .from("focus_sessions")
      .insert({ user_id: user.id, world, room_key: body.roomKey ?? null })
      .select("id")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ id: data.id });
  }

  if (body?.action === "finish") {
    const id = Number(body.id);
    if (!Number.isFinite(id)) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const { data: row } = await admin
      .from("focus_sessions")
      .select("id, started_at, ended_at")
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle();
    // Không tìm thấy, hoặc đã đóng rồi: trả về bình thường thay vì lỗi. Đóng
    // hai lần là chuyện thường khi người dùng đứng dậy rồi đóng luôn tab.
    if (!row || row.ended_at) return NextResponse.json({ seconds: 0, counted: false });

    const elapsed = Math.floor((Date.now() - new Date(row.started_at).getTime()) / 1000);
    const seconds = Math.max(0, Math.min(MAX_SESSION_SECONDS, elapsed));
    await admin
      .from("focus_sessions")
      .update({ ended_at: new Date().toISOString(), seconds })
      .eq("id", row.id);

    // Ngồi học đủ lâu cũng là hoạt động của ngày hôm đó. Gọi đúng hàm chuỗi
    // ngày đang có chứ không tự chạm vào bảng streak - toàn bộ luật đóng băng
    // và khôi phục chuỗi nằm trong đó.
    let counted = false;
    if (seconds >= MIN_SESSION_SECONDS) {
      counted = true;
      await updateStreak(user.id).catch(() => {});
    }
    return NextResponse.json({ seconds, counted });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

/** Tổng thời gian đã ngồi học hôm nay, tính bằng giây. */
export async function GET() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const { data } = await supabase
    .from("focus_sessions")
    .select("seconds")
    .eq("user_id", user.id)
    .gte("started_at", since.toISOString());
  const total = (data ?? []).reduce((sum, r) => sum + (r.seconds ?? 0), 0);
  return NextResponse.json({ todaySeconds: total });
}
