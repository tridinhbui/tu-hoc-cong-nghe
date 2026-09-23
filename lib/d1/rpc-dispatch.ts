import * as R from "./rpc";
import type { D1Like } from "./rpc";

/**
 * Điều phối `.rpc(tên, {tham_số})` sang 53 hàm trong ./rpc.ts.
 *
 * VÌ SAO CẦN LỚP NÀY. Bộ dựng truy vấn nhại được `.from()` vì PostgREST dịch
 * nó theo một quy tắc cố định. `.rpc()` thì không có quy tắc nào: Postgres
 * nhận một đối tượng `{p_user_id, p_limit}` còn các hàm TypeScript nhận tham
 * số theo VỊ TRÍ. Chuyển đổi ấy phải đúng từng hàm, và đổi chỗ hai tham số
 * cùng kiểu là sai dữ liệu âm thầm chứ không phải lỗi.
 *
 * BẢNG DƯỚI ĐÂY ĐƯỢC SINH RA, KHÔNG PHẢI GÕ TAY. Quy tắc: bỏ tiền tố `p_`
 * rồi chuyển sang camelCase; `__actor__` là chỗ id người gọi được tiêm vào.
 * 52/53 hàm khớp thẳng bằng quy tắc ấy; ngoại lệ duy nhất là
 * `search_accounts`, nơi `result_limit` ứng với tham số tên `limit`.
 *
 * MỌI SAI LỆCH ĐỀU NÉM LỖI. Tên lạ, khoá tham số lạ, thiếu người gọi ở hàm
 * cần `actor` - cả ba đều dừng ngay. Cho qua lặng lẽ ở đây nghĩa là một lời
 * gọi gõ sai tên vẫn chạy và trả về rỗng, đúng thứ không bộ kiểm nào bắt.
 */

export class D1RpcError extends Error {}

type Spec = { fn: keyof typeof R; args: readonly (string | null)[] };

const RPC_TABLE: Record<string, Spec> = {
  "admin_resync_all_user_stats": { fn: "adminResyncAllUserStats", args: [] },
  "apply_world_boss_damage": { fn: "applyWorldBossDamage", args: ["__actor__", "p_boss_id", "p_score"] },
  "claim_study_room_weekly_reward": { fn: "claimStudyRoomWeeklyReward", args: ["__actor__", "p_room_id"] },
  "get_chat_message_reactions": { fn: "getChatMessageReactions", args: ["__actor__", "p_user_id"] },
  "get_community_contribution_leaderboard": { fn: "getCommunityContributionLeaderboard", args: ["p_limit"] },
  "get_community_feed": { fn: "getCommunityFeed", args: ["__actor__", "p_limit", "p_before_id"] },
  "get_community_learning_now": { fn: "getCommunityLearningNow", args: ["p_limit", "p_days"] },
  "get_community_post_comments": { fn: "getCommunityPostComments", args: ["p_post_id", "p_limit"] },
  "get_competency_leaderboard": { fn: "getCompetencyLeaderboard", args: ["p_lesson_ids", "p_limit"] },
  "get_composite_leaderboard": { fn: "getCompositeLeaderboard", args: ["p_limit"] },
  "get_daily_active_users": { fn: "getDailyActiveUsers", args: ["days"] },
  "get_dashboard_summary": { fn: "getDashboardSummary", args: ["__actor__"] },
  "get_follow_counts": { fn: "getFollowCounts", args: ["p_user_id"] },
  "get_friends_leaderboard": { fn: "getFriendsLeaderboard", args: ["__actor__", "p_metric"] },
  "get_leaderboard": { fn: "getLeaderboard", args: ["p_metric", "p_limit"] },
  "get_lesson_state": { fn: "getLessonState", args: ["__actor__"] },
  "get_level_stats": { fn: "getLevelStats", args: ["p_user_id"] },
  "get_my_community_contribution_rank": { fn: "getMyCommunityContributionRank", args: ["__actor__", "p_user_id"] },
  "get_my_competency_leaderboard_rank": { fn: "getMyCompetencyLeaderboardRank", args: ["p_lesson_ids", "p_user_id"] },
  "get_my_composite_rank": { fn: "getMyCompositeRank", args: ["__actor__", "p_user_id"] },
  "get_my_leaderboard_rank": { fn: "getMyLeaderboardRank", args: ["p_metric", "p_user_id"] },
  "get_my_social_graph": { fn: "getMySocialGraph", args: ["__actor__"] },
  "get_my_study_room": { fn: "getMyStudyRoom", args: ["__actor__"] },
  "get_my_track_leaderboard_rank": { fn: "getMyTrackLeaderboardRank", args: ["p_track", "p_user_id"] },
  "get_my_xp_rank_since": { fn: "getMyXpRankSince", args: ["p_since", "p_user_id"] },
  "get_nav_state": { fn: "getNavState", args: ["__actor__", "p_day_start"] },
  "get_study_room_members": { fn: "getStudyRoomMembers", args: ["__actor__", "p_room_id"] },
  "get_study_room_mission_status": { fn: "getStudyRoomMissionStatus", args: ["__actor__", "p_room_id"] },
  "get_study_room_reactions": { fn: "getStudyRoomReactions", args: ["__actor__", "p_room_id"] },
  "get_study_rooms": { fn: "getStudyRooms", args: ["__actor__", "p_topic"] },
  "get_total_completed_lessons_count": { fn: "getTotalCompletedLessonsCount", args: [] },
  "get_total_user_count": { fn: "getTotalUserCount", args: [] },
  "get_track_leaderboard": { fn: "getTrackLeaderboard", args: ["p_track", "p_limit"] },
  "get_user_community_posts": { fn: "getUserCommunityPosts", args: ["__actor__", "p_user_id", "p_limit", "p_before_id"] },
  "get_xp_leaderboard_since": { fn: "getXpLeaderboardSince", args: ["p_since", "p_limit"] },
  "grant_coins": { fn: "grantCoins", args: ["__actor__", "p_source", "p_ref", "p_amount"] },
  "increment_document_download": { fn: "incrementDocumentDownload", args: ["doc_id"] },
  "join_or_create_study_room": { fn: "joinOrCreateStudyRoom", args: ["__actor__", "p_topic"] },
  "join_study_room": { fn: "joinStudyRoom", args: ["__actor__", "p_room_id"] },
  "leave_study_room": { fn: "leaveStudyRoom", args: ["__actor__"] },
  "mark_admin_chat_messages_seen": { fn: "markAdminChatMessagesSeen", args: ["__actor__", "p_user_id"] },
  "purchase_cosmetic": { fn: "purchaseCosmetic", args: ["__actor__", "p_asset_key"] },
  "record_quiz_mistake": { fn: "recordQuizMistake", args: ["__actor__", "p_lesson_id", "p_question_index", "p_correct", "p_question_hash"] },
  "record_referral": { fn: "recordReferral", args: ["__actor__", "p_referrer_id"] },
  "record_study_room_checkin": { fn: "recordStudyRoomCheckin", args: ["__actor__", "p_room_id", "p_source"] },
  "record_study_room_quiz_attempt": { fn: "recordStudyRoomQuizAttempt", args: ["__actor__", "p_room_id", "p_track", "p_score", "p_total"] },
  "reward_my_referral": { fn: "rewardMyReferral", args: ["__actor__"] },
  "search_accounts": { fn: "searchAccounts", args: ["__actor__", "search_term", "result_limit"] },
  "set_study_room_pomodoro": { fn: "setStudyRoomPomodoro", args: ["__actor__", "p_room_id", "p_mode", "p_is_running", "p_duration_seconds", "p_remaining_seconds"] },
  "sync_lessons_atomic": { fn: "syncLessonsAtomic", args: ["p_lessons"] },
  "toggle_chat_message_reaction": { fn: "toggleChatMessageReaction", args: ["__actor__", "p_message_id", "p_emoji"] },
  "toggle_study_room_message_reaction": { fn: "toggleStudyRoomMessageReaction", args: ["__actor__", "p_message_id", "p_emoji"] },
  "weekly_rematch_study_rooms": { fn: "weeklyRematchStudyRooms", args: [] },
};

/** Số hàm được phủ. Bộ kiểm khoá con số này để một hàm bị rơi ra là đỏ. */
export const RPC_COUNT = Object.keys(RPC_TABLE).length;

export function createD1Rpc(db: D1Like, actor: string | null) {
  return async function rpc(
    name: string,
    params: Record<string, unknown> = {}
  ): Promise<{ data: unknown; error: Error | null }> {
    const spec = RPC_TABLE[name];
    if (!spec) {
      throw new D1RpcError(`Không có hàm RPC "${name}". Gõ nhầm tên, hoặc hàm chưa được dịch sang D1?`);
    }
    const known = new Set(spec.args.filter((a): a is string => a !== null && a !== "__actor__"));
    for (const k of Object.keys(params)) {
      if (!known.has(k)) {
        throw new D1RpcError(`Hàm "${name}" không nhận tham số "${k}". Nhận: ${[...known].join(", ") || "(không có)"}.`);
      }
    }
    const needsActor = spec.args.includes("__actor__");
    if (needsActor && !actor) {
      throw new D1RpcError(`Hàm "${name}" cần biết người gọi, nhưng phiên hiện tại chưa đăng nhập.`);
    }
    const args = spec.args.map((a) =>
      a === "__actor__" ? actor : a === null ? undefined : params[a]
    );
    try {
      // Bảng được sinh ra và đối chiếu với chữ ký thật, nên ép kiểu ở đây là
      // an toàn; kiểu tĩnh không diễn đạt được "mảng này khớp chữ ký kia".
      const fn = R[spec.fn] as unknown as (db: D1Like, ...rest: unknown[]) => Promise<unknown>;
      return { data: await fn(db, ...args), error: null };
    } catch (err) {
      // Supabase trả lỗi trong { error } chứ không ném; 60 chỗ gọi đang đọc
      // theo kiểu ấy, nên ném ở đây sẽ thành sự cố chưa bắt.
      return { data: null, error: err as Error };
    }
  };
}
