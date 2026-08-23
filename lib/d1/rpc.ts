/**
 * Bản dịch các hàm RPC Postgres sang D1.
 *
 * VÌ SAO Ở ĐÂY CHỨ KHÔNG PHẢI TRONG query-builder. Bộ dựng truy vấn nhại
 * `.from()` được vì PostgREST dịch `.from()` thành SQL theo một quy tắc cố
 * định. `.rpc()` thì không: mỗi hàm là một thân plpgsql riêng, nên không có
 * quy tắc chung nào để nhại. 53 hàm là 53 bản dịch tay.
 *
 * QUY ƯỚC KHÁC VỚI SUPABASE:
 *
 *  - Không có `auth.uid()`. 32/53 hàm gốc gọi nó; ở đây id người gọi luôn là
 *    THAM SỐ ĐẦU TIÊN và bắt buộc. Hàm nào không cần thì không nhận.
 *  - Không có RLS. Mọi hàm gốc đều `security definer`, tức là chúng cố ý đi
 *    vòng qua RLS - nên khi dịch, điều kiện chủ sở hữu phải nằm ngay trong SQL
 *    ở đây. Xem chú thích từng hàm về việc bản gốc lọc theo cái gì.
 *  - `now() - interval` → `datetime('now', '-N days')`.
 *  - `jsonb` → chuỗi; dùng `json_extract` khi cần đọc vào trong.
 *
 * Xem RPC-MIGRATION-MAP.md ở gốc repo để biết 53 hàm chia thành ba nhóm nào và
 * hàm nào còn lại chưa dịch.
 */

/** Bề mặt D1 mà tệp này dùng tới - hẹp có chủ ý, để `d1-shim.ts` trong bộ kiểm
 *  chỉ phải nhại đúng ba phương thức thay vì cả `D1Database`. */
export interface D1Like {
  prepare(sql: string): {
    bind(...args: unknown[]): {
      all(): Promise<{ results: unknown[] }>;
    };
  };
}

async function rows<T>(db: D1Like, sql: string, ...args: unknown[]): Promise<T[]> {
  const r = await db.prepare(sql).bind(...args).all();
  return r.results as T[];
}

async function one<T>(db: D1Like, sql: string, ...args: unknown[]): Promise<T | null> {
  const r = await rows<T>(db, sql, ...args);
  return r.length ? r[0] : null;
}

/** Kẹp `limit` do người gọi truyền vào, giống `greatest(1, least(coalesce(p,d), max))`
 *  trong các hàm gốc. Không kẹp thì một `limit` do client gửi lên có thể quét
 *  cả bảng. */
function clampLimit(value: number | null | undefined, fallback: number, max: number): number {
  const n = Number.isFinite(value) ? Number(value) : fallback;
  return Math.min(Math.max(Math.trunc(n) || fallback, 1), max);
}

// ───────────────────────────────────────────────────────────── nhóm A: chỉ đọc

/** `get_total_user_count()` → `select count(*) from user_profiles`.
 *  Bản gốc là `security definer` để hàm đọc được toàn bảng dù RLS chỉ cho mỗi
 *  người thấy dòng của mình. Ở đây đếm toàn bảng là đúng ý định đó. */
export async function getTotalUserCount(db: D1Like): Promise<number> {
  const r = await one<{ c: number }>(db, `select count(*) as c from user_profiles`);
  return r?.c ?? 0;
}

/** `get_total_completed_lessons_count()`.
 *  `completed = true` trong Postgres; ở SQLite boolean là 0/1 nên so với 1. */
export async function getTotalCompletedLessonsCount(db: D1Like): Promise<number> {
  const r = await one<{ c: number }>(
    db,
    `select count(*) as c from user_progress where completed = 1`
  );
  return r?.c ?? 0;
}

/** `get_follow_counts(p_user_id)` → hai truy vấn con trong một dòng.
 *  Bản gốc chỉ cấp quyền cho vai trò `authenticated`, và số người theo dõi là
 *  thông tin công khai của một hồ sơ, nên không lọc theo người gọi. */
export async function getFollowCounts(
  db: D1Like,
  userId: string
): Promise<{ followers: number; following: number }> {
  const r = await one<{ followers: number; following: number }>(
    db,
    `select
       (select count(*) from user_follows where followed_id = ?1) as followers,
       (select count(*) from user_follows where follower_id = ?1) as following`,
    userId
  );
  return { followers: r?.followers ?? 0, following: r?.following ?? 0 };
}

/** `get_track_leaderboard(p_track, p_limit)`.
 *
 *  BẢN DỊCH GIỮ NGUYÊN NGỮ NGHĨA, KỂ CẢ CHỖ SAI. Dải id bài học dưới đây chép
 *  đúng từ hàm gốc, và nó đã lỗi thời: đo trên kho hiện tại, nó chỉ đếm
 *  108/220 bài `personal` và 181/323 bài `professional`. Tức là bảng xếp hạng
 *  theo track đang bỏ sót khoảng một nửa số bài của mỗi track, và điều đó đúng
 *  cả trên Supabase lúc này chứ không phải lỗi do chuyển đổi.
 *
 *  Sửa nó là một thay đổi HÀNH VI (thứ hạng của mọi người đổi), nên nó phải là
 *  một quyết định riêng chứ không lẫn vào đợt di trú. Xem RPC-MIGRATION-MAP.md.
 *
 *  Ba chỗ Postgres không chạy trên SQLite, đã đổi:
 *   - `split_part(email, '@', 1)` → `substr` + `instr`
 *   - `::numeric` → bỏ, SQLite không có ép kiểu này
 *   - `greatest/least` cho limit → kẹp trong TypeScript
 */
export async function getTrackLeaderboard(
  db: D1Like,
  track: "personal" | "professional",
  limit?: number
): Promise<{ user_id: string; name: string; value: number; avatar_url: string | null }[]> {
  const range =
    track === "personal"
      ? "(up.lesson_id between 1 and 20 or up.lesson_id between 201 and 288)"
      : "(up.lesson_id between 21 and 200 or up.lesson_id = 1036)";

  return rows(
    db,
    `select up.user_id,
            coalesce(
              nullif(prof.full_name, ''),
              case when instr(prof.email, '@') > 1
                   then substr(prof.email, 1, instr(prof.email, '@') - 1) end,
              'Người học'
            ) as name,
            count(*) as value,
            prof.avatar_url
       from user_progress up
       join user_profiles prof on prof.id = up.user_id
      where up.completed = 1
        and coalesce(prof.is_disabled, 0) = 0
        and coalesce(prof.role, 'user') <> 'admin'
        and ${range}
      group by up.user_id, prof.full_name, prof.email, prof.avatar_url
      order by value desc
      limit ?`,
    clampLimit(limit, 10, 50)
  );
}
