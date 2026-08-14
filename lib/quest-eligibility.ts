import "server-only";
import type { createAdminClient } from "@/lib/supabase-admin";
import {
  DAILY_FOCUS_TARGET_MINUTES,
  DAILY_STREET_TARGET_MINUTES,
  PILLAR_QUIZ_SOURCE,
} from "@/lib/study-session";

/**
 * "Người này ĐÃ làm xong nhiệm vụ chưa" - tính lại ở máy chủ, từ đúng những
 * bảng mà hoạt động thật ghi vào.
 *
 * VÌ SAO TỆP NÀY TỒN TẠI. app/api/quests/claim/route.ts vốn đã tự nhận là
 * "server-authoritative", và nó đúng - nhưng chỉ đúng về SỐ TIỀN. Nó kiểm đăng
 * nhập, kiểm loại nhiệm vụ có thật, kiểm định dạng ngày, kẹp trần XP tuần, rồi
 * ghi. Cái nó chưa bao giờ kiểm là ĐIỀU KIỆN của nhiệm vụ.
 *
 * Cổng "đủ 25 phút" chỉ nằm ở giao diện (components/DailyQuestsWidget.tsx bỏ
 * qua cú bấm khi `quest.current < quest.target`). Một lệnh curl gửi thẳng
 * `{questType:"daily_focus", dayKey:"..."}` là nhận đủ XP mà không ngồi giây
 * nào - đúng nghĩa "cứ vào là được", thậm chí không cần vào.
 *
 * MÚI GIỜ, và đây là chỗ dễ sai nhất. `dayKey` do client gửi lên là ngày ĐỊA
 * PHƯƠNG của trình duyệt (`toLocaleDateString("sv-SE")`), còn máy chủ không
 * biết người dùng ở múi giờ nào. Lấy mốc nửa đêm UTC mà so sẽ từ chối oan:
 * một bài học xong lúc 6 giờ sáng ở Việt Nam nằm ở ngày UTC HÔM TRƯỚC.
 *
 * Nên cửa sổ dưới đây phủ mọi phiên bản có thể có của cùng một ngày địa
 * phương: từ UTC+14 (Kiribati, sớm nhất) tới UTC-12 (muộn nhất). Rộng hơn một
 * ngày lịch, và đó là đánh đổi có chủ ý - thà cho qua một hoạt động lệch vài
 * giờ còn hơn từ chối một người đã học thật. Ràng buộc duy nhất trên bảng vẫn
 * chặn nhận hai lần cùng một ngày, nên phần nới ra ở đây không đúc thêm XP.
 */

type Admin = ReturnType<typeof createAdminClient>;

export interface EligibilityResult {
  eligible: boolean;
  /** Mã lý do, để route trả về mà không lộ chi tiết truy vấn. */
  reason: "ok" | "not-met" | "unverifiable" | "unknown-quest";
}

/** Sớm nhất và muộn nhất mà một ngày địa phương `dayKey` có thể ứng với, tính
 *  bằng UTC. Xem đoạn MÚI GIỜ ở đầu tệp. */
export function localDayWindowUtc(dayKey: string): { start: string; end: string } {
  const midnightUtc = Date.parse(`${dayKey}T00:00:00.000Z`);
  const HOUR = 60 * 60 * 1000;
  return {
    // UTC+14 bắt đầu ngày sớm hơn UTC 14 tiếng.
    start: new Date(midnightUtc - 14 * HOUR).toISOString(),
    // UTC-12 kết thúc ngày muộn hơn UTC 12 tiếng (24h của ngày + 12h lệch).
    end: new Date(midnightUtc + (24 + 12) * HOUR).toISOString(),
  };
}

/**
 * Nhiệm vụ KHÔNG kiểm được ở máy chủ, vì không có bảng nào ghi lại việc đã
 * làm - bằng chứng duy nhất là một khoá trong localStorage của trình duyệt.
 *
 * Ghi thành danh sách tường minh chứ không im lặng cho qua: một nhiệm vụ mới
 * quên khai ở QUEST_CHECKS bên dưới sẽ bị TỪ CHỐI chứ không được thả, nên chỗ
 * duy nhất mở cửa là đúng hai dòng này, và chúng đọc được.
 *
 * Vì sao chưa vá: vá đúng cách là ghi lại việc đã làm xuống cơ sở dữ liệu -
 * một bảng cho câu đố tin tức, một cột cho bài trắc nghiệm nghề - tức là một
 * migration, không phải một phép kiểm. Việc đó nằm ngoài lần sửa này.
 *
 * Thiệt hại bị chặn bởi hai thứ có sẵn: `career_assessment` chỉ nhận được MỘT
 * lần cho mỗi tài khoản (ONCE_ONLY_QUESTS), còn `daily_news_quiz` nằm trong
 * trần WEEKLY_QUEST_XP_CAP = 120 XP/tuần chung với mọi nhiệm vụ lặp lại khác.
 */
export const UNVERIFIABLE_QUESTS = new Set(["daily_news_quiz", "career_assessment"]);

/** Nhiệm vụ chỉ đòi "có mặt hôm nay". Không có gì để kiểm, và cả hai đều đã
 *  bị đặt về 0 XP trong lib/quest-rewards.ts nên cũng không có gì để đúc. */
const ATTENDANCE_QUESTS = new Set(["daily_4", "daily_game"]);

type Check = (admin: Admin, userId: string, dayKey: string) => Promise<boolean>;

const QUEST_CHECKS: Record<string, Check> = {
  // Hoàn thành 1 bài học. `head: true` nên PostgREST chỉ trả phần đếm, không
  // kéo hàng nào về - cùng lý do getUnreadRoomMessageCount dùng nó.
  daily_1: async (admin, userId, dayKey) => {
    const { start, end } = localDayWindowUtc(dayKey);
    const { count } = await admin
      .from("user_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("completed", true)
      .gte("completed_at", start)
      .lte("completed_at", end);
    return (count ?? 0) > 0;
  },

  // Chơi ít nhất 1 ván mini game.
  daily_2: async (admin, userId, dayKey) => {
    const { start, end } = localDayWindowUtc(dayKey);
    const { count } = await admin
      .from("game_sessions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", start)
      .lte("created_at", end);
    return (count ?? 0) > 0;
  },

  // Đạt 100% trong một ván. Không lọc được "score = total" bằng PostgREST nên
  // phải kéo về rồi so trong bộ nhớ; cửa sổ một ngày nên số hàng nhỏ.
  daily_3: async (admin, userId, dayKey) => {
    const { start, end } = localDayWindowUtc(dayKey);
    const { data } = await admin
      .from("game_sessions")
      .select("score, total")
      .eq("user_id", userId)
      .gte("created_at", start)
      .lte("created_at", end);
    return (data ?? []).some(
      (g: { score: number | null; total: number | null }) =>
        (g.total ?? 0) > 0 && g.score === g.total
    );
  },

  // Ngồi học đủ mốc, CỘNG DỒN cả ngày qua cả ba phòng. Cùng phép tính với
  // lib/supabase-quests.ts, và cùng hằng số - hai nơi lệch nhau nghĩa là giao
  // diện mời người ta bấm một nút mà máy chủ sẽ từ chối.
  daily_focus: async (admin, userId, dayKey) => {
    const { start, end } = localDayWindowUtc(dayKey);
    const { data } = await admin
      .from("focus_sessions")
      .select("seconds")
      .eq("user_id", userId)
      .gte("started_at", start)
      .lte("started_at", end);
    const seconds = (data ?? []).reduce(
      (sum: number, r: { seconds: number | null }) => sum + (r.seconds ?? 0),
      0
    );
    return seconds >= DAILY_FOCUS_TARGET_MINUTES * 60;
  },

  // Học sâu: 3 bài trong ngày.
  daily_lessons_3: async (admin, userId, dayKey) => {
    const { start, end } = localDayWindowUtc(dayKey);
    const { count } = await admin
      .from("user_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("completed", true)
      .gte("completed_at", start)
      .lte("completed_at", end);
    return (count ?? 0) >= 3;
  },

  // Ra Phố Nghề. HAI nhánh, và phải giữ đủ cả hai: làm thử thách cột trụ,
  // HOẶC ngồi học đủ mốc ngay tại phố. Bỏ nhánh nào cũng thành từ chối oan
  // đúng một nửa số người đã làm xong nhiệm vụ.
  daily_street: async (admin, userId, dayKey) => {
    const { start, end } = localDayWindowUtc(dayKey);

    // `source` cần migration 20260912_daily_quest_signals.sql. Chưa chạy thì
    // truy vấn ném 42703 - bắt tại chỗ để còn thử nốt nhánh thứ hai, thay vì
    // để cả phép kiểm rơi xuống nhánh fail-open ở checkQuestEligibility.
    try {
      const { count } = await admin
        .from("user_quiz_sessions")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("source", PILLAR_QUIZ_SOURCE)
        .gte("completed_at", start)
        .lte("completed_at", end);
      if ((count ?? 0) > 0) return true;
    } catch {
      // Cột chưa có; nhánh ngồi học bên dưới vẫn quyết định được.
    }

    const { data } = await admin
      .from("focus_sessions")
      .select("seconds, world")
      .eq("user_id", userId)
      .gte("started_at", start)
      .lte("started_at", end);
    const streetSeconds = (data ?? [])
      .filter((r: { world: string | null }) => r.world === "pho-nghe")
      .reduce((sum: number, r: { seconds: number | null }) => sum + (r.seconds ?? 0), 0);
    return streetSeconds >= DAILY_STREET_TARGET_MINUTES * 60;
  },

  // Làm 1 quiz nhóm trong phòng 3D.
  daily_room_quiz: async (admin, userId, dayKey) => {
    const { start, end } = localDayWindowUtc(dayKey);
    const { count } = await admin
      .from("study_room_quiz_attempts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", start)
      .lte("created_at", end);
    return (count ?? 0) > 0;
  },

  // Điểm danh học nhóm. Giao diện đọc một cờ trong localStorage, nhưng cờ đó
  // chỉ là bản sao: việc thật là một tin nhắn đã nằm trong study_room_messages.
  daily_study_group: async (admin, userId, dayKey) => {
    const { start, end } = localDayWindowUtc(dayKey);
    const { count } = await admin
      .from("study_room_messages")
      .select("id", { count: "exact", head: true })
      .eq("sender_id", userId)
      .gte("created_at", start)
      .lte("created_at", end);
    return (count ?? 0) > 0;
  },
};

/**
 * Người này có quyền nhận thưởng nhiệm vụ đó hôm đó không.
 *
 * Mặc định là TỪ CHỐI: một loại nhiệm vụ không nằm trong bảng nào ở trên sẽ
 * không lọt qua. Đó là chiều an toàn - thêm nhiệm vụ mới mà quên khai phép
 * kiểm thì nó không nhận được thưởng, thay vì nhận được thưởng miễn phí.
 */
export async function checkQuestEligibility(
  admin: Admin,
  userId: string,
  questType: string,
  dayKey: string
): Promise<EligibilityResult> {
  if (ATTENDANCE_QUESTS.has(questType)) return { eligible: true, reason: "ok" };
  if (UNVERIFIABLE_QUESTS.has(questType)) return { eligible: true, reason: "unverifiable" };

  const check = QUEST_CHECKS[questType];
  if (!check) return { eligible: false, reason: "unknown-quest" };

  try {
    const met = await check(admin, userId, dayKey);
    return met ? { eligible: true, reason: "ok" } : { eligible: false, reason: "not-met" };
  } catch {
    // Bảng thiếu hoặc truy vấn hỏng. CHO QUA, và đây là lựa chọn có chủ ý:
    // migration chưa chạy ở một môi trường nào đó không nên biến mọi nhiệm vụ
    // thành không nhận được. Trước lần sửa này mọi thứ đều cho qua, nên mức
    // xấu nhất ở đây vẫn không tệ hơn hiện trạng.
    return { eligible: true, reason: "unverifiable" };
  }
}
