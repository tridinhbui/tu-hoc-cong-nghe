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

/** Tên hiển thị: `coalesce(nullif(full_name,''), split_part(email,'@',1), 'Người học')`.
 *  SQLite không có `split_part`, nên phần lấy tên trước dấu @ dựng bằng
 *  `substr` + `instr`. Dùng lại ở nhiều bảng xếp hạng nên tách ra một chỗ. */
const DISPLAY_NAME = `coalesce(
  nullif(prof.full_name, ''),
  case when instr(prof.email, '@') > 1
       then substr(prof.email, 1, instr(prof.email, '@') - 1) end,
  'Người học'
)`;

/** `composite_score_components()` - hàm phụ trợ duy nhất trong cả 53 RPC, dùng
 *  bởi `get_composite_leaderboard` và `get_my_composite_rank`.
 *
 *  BẪY LỚN NHẤT KHI DỊCH: Postgres ép các thành phần sang `numeric` nên
 *  `learning_xp / 40000` là phép chia thập phân. SQLite chia hai số NGUYÊN cho
 *  ra số NGUYÊN, nên viết y nguyên thì mọi người dưới 40.000 XP đều được 0 ở
 *  cấu phần đó - điểm tổng sai mà không có lỗi nào. Vì thế mọi mẫu số ở đây
 *  đều viết dạng thập phân (`40000.0`).
 *
 *  `greatest`/`least` hai đối số → `max`/`min` của SQLite (chúng nhận nhiều đối
 *  số, khác `max()` gộp nhóm). */
const COMPOSITE_COMPONENTS = `
with checkin_xp as (
  select c.user_id, coalesce(sum(c.xp_earned), 0) as xp
    from user_chests c where c.source = 'daily_login' group by c.user_id
),
exam_totals as (
  select e.user_id, coalesce(sum(e.score), 0) as points
    from user_level_exams e where e.source = 'server_graded' group by e.user_id
),
base as (
  select prof.id as user_id,
         ${DISPLAY_NAME} as name,
         prof.avatar_url,
         max(0, coalesce(prof.total_xp, 0) - coalesce(cx.xp, 0)) as learning_xp,
         coalesce(et.points, 0) as exam_points,
         max(0, min(100, coalesce(prof.avg_quiz_score, 0))) as accuracy,
         max(0, coalesce(st.current_streak, 0)) as streak_days
    from user_profiles prof
    left join checkin_xp cx on cx.user_id = prof.id
    left join exam_totals et on et.user_id = prof.id
    left join user_streaks st on st.user_id = prof.id
   where coalesce(prof.is_disabled, 0) = 0
     and coalesce(prof.role, 'user') <> 'admin'
)
select b.user_id, b.name, b.avatar_url, b.learning_xp, b.exam_points,
       b.accuracy, b.streak_days,
       cast(round(1000 * (
           0.35 * min(1.0, b.learning_xp / 40000.0)
         + 0.30 * min(1.0, b.exam_points / 1400.0)
         + 0.20 * (b.accuracy / 100.0)
         + 0.15 * min(1.0, b.streak_days / 100.0)
       )) as integer) as composite
  from base b`;

export interface CompositeRow {
  user_id: string; name: string; avatar_url: string | null;
  learning_xp: number; exam_points: number; accuracy: number;
  streak_days: number; composite: number;
}

/** `get_composite_leaderboard(p_limit)` */
export async function getCompositeLeaderboard(
  db: D1Like,
  limit?: number
): Promise<CompositeRow[]> {
  return rows<CompositeRow>(
    db,
    `${COMPOSITE_COMPONENTS}
      order by composite desc, exam_points desc, learning_xp desc
      limit ?`,
    clampLimit(limit, 10, 50)
  );
}

/** `get_chat_message_reactions(p_user_id)`.
 *
 *  Hàm gốc có một dòng phân quyền nằm ngay trong mệnh đề WHERE:
 *  `and p_user_id = auth.uid()` - tức là chỉ được xem reaction trên tin nhắn
 *  của CHÍNH MÌNH. Không có `auth.uid()` trên D1 nên điều kiện ấy phải được
 *  kiểm tường minh ở đây; bỏ nó đi là mở cho ai cũng đọc được hộp thoại của
 *  người khác.
 *
 *  `array_agg(user_id order by created_at)` không dịch thẳng được: `group_concat`
 *  của SQLite không bảo đảm thứ tự ở mọi phiên bản. Nên lấy từng dòng đã sắp
 *  rồi gom nhóm bằng TypeScript - kết quả giống hệt và không phụ thuộc phiên bản.
 */
export async function getChatMessageReactions(
  db: D1Like,
  actor: string,
  userId: string
): Promise<{ message_id: number; emoji: string; user_ids: string[] }[]> {
  if (!actor || actor !== userId) return [];

  const flat = await rows<{ message_id: number; emoji: string; user_id: string }>(
    db,
    `select r.message_id, r.emoji, r.user_id
       from chat_message_reactions r
       join chat_messages msg on msg.id = r.message_id
      where msg.user_id = ?
      order by r.message_id, r.emoji, r.created_at asc`,
    userId
  );

  const out: { message_id: number; emoji: string; user_ids: string[] }[] = [];
  for (const r of flat) {
    const last = out[out.length - 1];
    if (last && last.message_id === r.message_id && last.emoji === r.emoji) last.user_ids.push(r.user_id);
    else out.push({ message_id: r.message_id, emoji: r.emoji, user_ids: [r.user_id] });
  }
  return out;
}

/** Gom các dòng `(message_id, emoji, user_id)` đã sắp sẵn thành mảng user_ids.
 *  Dùng chung cho hai hàm reaction; xem chú thích ở `getChatMessageReactions`
 *  về lý do không dùng `group_concat`. */
function groupReactions(
  flat: { message_id: number; emoji: string; user_id: string }[]
): { message_id: number; emoji: string; user_ids: string[] }[] {
  const out: { message_id: number; emoji: string; user_ids: string[] }[] = [];
  for (const r of flat) {
    const last = out[out.length - 1];
    if (last && last.message_id === r.message_id && last.emoji === r.emoji) last.user_ids.push(r.user_id);
    else out.push({ message_id: r.message_id, emoji: r.emoji, user_ids: [r.user_id] });
  }
  return out;
}

/** `get_study_room_reactions(p_room_id)`.
 *
 *  Phân quyền của bản gốc nằm trong một `exists(...)`: người gọi phải là thành
 *  viên ĐANG hoạt động của phòng (`left_at is null`). Giữ nguyên nó trong SQL
 *  thay vì kiểm ở TypeScript - một truy vấn thì không có khoảng hở giữa lúc
 *  kiểm tư cách và lúc đọc dữ liệu. */
export async function getStudyRoomReactions(
  db: D1Like,
  actor: string,
  roomId: number
): Promise<{ message_id: number; emoji: string; user_ids: string[] }[]> {
  if (!actor) return [];
  const flat = await rows<{ message_id: number; emoji: string; user_id: string }>(
    db,
    `select r.message_id, r.emoji, r.user_id
       from study_room_message_reactions r
       join study_room_messages msg on msg.id = r.message_id
      where msg.room_id = ?1
        and exists (
          select 1 from study_room_members m
           where m.room_id = ?1 and m.user_id = ?2 and m.left_at is null
        )
      order by r.message_id, r.emoji, r.created_at asc`,
    roomId,
    actor
  );
  return groupReactions(flat);
}

/** `get_daily_active_users(days)`.
 *
 *  Bản gốc dựng khung ngày bằng `generate_series` rồi LEFT JOIN, để ngày không
 *  ai học vẫn hiện ra với số 0 thay vì biến mất khỏi đồ thị. SQLite không có
 *  `generate_series`, nên khung ngày dựng bằng CTE ĐỆ QUY - đây là hàm duy
 *  nhất trong 53 hàm cần tới nó.
 *
 *  MÚI GIỜ. `current_date` của Postgres theo múi giờ máy chủ (UTC trên
 *  Supabase) còn `date('now')` của SQLite cũng là UTC, nên hai bên khớp nhau.
 *  Nhưng cả hai đều KHÔNG phải "hôm nay" theo giờ Việt Nam: một lượt học lúc
 *  6 giờ sáng giờ Việt Nam rơi vào ngày hôm trước theo UTC. Đây là hành vi có
 *  sẵn của bản gốc, dịch giữ nguyên; muốn đổi thì là một quyết định riêng.
 */
export async function getDailyActiveUsers(
  db: D1Like,
  days: number
): Promise<{ date: string; count: number }[]> {
  // Kẹp để CTE đệ quy không chạy vô hạn nếu `days` là 0, âm hay một số vô lý
  // do client gửi lên. Bản gốc dựa vào `generate_series` tự trả rỗng; ở đây
  // phải tự chặn.
  const n = clampLimit(days, 30, 365);
  return rows<{ date: string; count: number }>(
    db,
    `with recursive spine(day) as (
       select date('now', '-' || (?1 - 1) || ' days')
       union all
       select date(day, '+1 day') from spine where day < date('now')
     )
     select spine.day as date, count(distinct up.user_id) as count
       from spine
       left join user_progress up
         on up.completed = 1
        and date(up.completed_at) = spine.day
      group by spine.day
      order by spine.day`,
    n
  );
}

/** `get_competency_leaderboard(p_lesson_ids bigint[], p_limit int)`.
 *
 *  HÀM DUY NHẤT TRONG 53 HÀM CÓ THAM SỐ MẢNG. Bản gốc dùng
 *  `lesson_id = any(p_lesson_ids)`; SQLite không có kiểu mảng nên danh sách
 *  phải nở thành `in (?,?,?…)` đúng bằng số phần tử lúc chạy.
 *
 *  Vì số dấu hỏi do độ dài mảng quyết định, đây cũng là chỗ dễ mở cửa cho tiêm
 *  SQL nhất trong cả tệp nếu ai đó nối thẳng giá trị vào chuỗi. Ở đây chỉ nối
 *  các dấu `?`, còn giá trị vẫn đi qua `bind` - và mọi phần tử được ép sang số
 *  nguyên trước, nên một phần tử không phải số sẽ bị loại chứ không lọt vào SQL.
 */
export async function getCompetencyLeaderboard(
  db: D1Like,
  lessonIds: number[],
  limit?: number
): Promise<{ user_id: string; name: string; value: number; avatar_url: string | null }[]> {
  const ids = (lessonIds ?? []).map((x) => Math.trunc(Number(x))).filter(Number.isFinite);
  // Mảng rỗng: `any('{}')` của Postgres không khớp dòng nào, còn `in ()` là lỗi
  // cú pháp trong SQLite. Trả rỗng sớm để hai bên hành xử giống nhau.
  if (ids.length === 0) return [];

  const cho = ids.map(() => "?").join(",");
  return rows(
    db,
    `select up.user_id,
            ${DISPLAY_NAME} as name,
            count(*) as value,
            prof.avatar_url
       from user_progress up
       join user_profiles prof on prof.id = up.user_id
      where up.completed = 1
        and up.lesson_id in (${cho})
        and coalesce(prof.is_disabled, 0) = 0
        and coalesce(prof.role, 'user') <> 'admin'
      group by up.user_id, prof.full_name, prof.email, prof.avatar_url
      order by value desc
      limit ?`,
    ...ids,
    clampLimit(limit, 10, 50)
  );
}

/** `get_leaderboard(p_metric, p_limit)`.
 *
 *  Bản gốc rẽ nhánh theo `p_metric` bằng `case` bên trong SQL. Ở đây chọn cột ở
 *  TypeScript rồi ghép vào câu lệnh: danh sách cột là hằng số đóng, không phải
 *  chuỗi do người gọi truyền, nên không mở cửa cho tiêm SQL - và nó tránh được
 *  việc SQLite phải ép kiểu một biểu thức `case` trả về ba cột khác kiểu nhau.
 *
 *  `min_graded = 30`: bảng Điểm TB chỉ nhận người đã có ít nhất 30 bài ĐƯỢC
 *  CHẤM. Bỏ điều kiện này là ai làm đúng một bài cũng đứng đầu bảng.
 */
const METRIC_COLUMN = {
  lessons: "us.total_lessons_completed",
  avg_score: "us.avg_quiz_score",
  xp: "us.total_xp",
} as const;

export async function getLeaderboard(
  db: D1Like,
  metric: "streak" | "lessons" | "avg_score" | "xp",
  limit?: number
): Promise<{ user_id: string; name: string; value: number; avatar_url: string | null }[]> {
  const n = clampLimit(limit, 10, 50);

  if (metric === "streak") {
    return rows(
      db,
      `select s.user_id, ${DISPLAY_NAME} as name, s.current_streak as value, prof.avatar_url
         from user_streaks s
         join user_profiles prof on prof.id = s.user_id
        where coalesce(prof.is_disabled, 0) = 0
          and coalesce(prof.role, 'user') <> 'admin'
        order by s.current_streak desc
        limit ?`,
      n
    );
  }

  const col = METRIC_COLUMN[metric] ?? METRIC_COLUMN.xp;
  // Chỉ bảng Điểm TB mới cần cổng số bài đã chấm; hai bảng kia bỏ qua nó.
  const gate = metric === "avg_score" ? "and coalesce(g.graded, 0) >= 30" : "";

  return rows(
    db,
    `select us.user_id, ${DISPLAY_NAME} as name, ${col} as value, prof.avatar_url
       from user_stats us
       join user_profiles prof on prof.id = us.user_id
       left join (
         select p.user_id, count(*) as graded
           from user_progress p where p.quiz_score is not null group by p.user_id
       ) g on g.user_id = us.user_id
      where coalesce(prof.is_disabled, 0) = 0
        and coalesce(prof.role, 'user') <> 'admin'
        ${gate}
      order by value desc
      limit ?`,
    n
  );
}

/** `get_xp_leaderboard_since(p_since, p_limit)` - hàm nhiều bẫy nhất nhóm A.
 *
 *  BA CẤU TRÚC POSTGRES KHÔNG CÓ TRONG SQLITE:
 *
 *  1. `distinct on (user_id, game_type) ... order by xp_earned desc` - lấy ván
 *     có điểm cao nhất mỗi loại game. SQLite không có `DISTINCT ON`; thay bằng
 *     `row_number() over (partition by ...)` rồi lọc `= 1`. Thứ tự trong
 *     `over(...)` phải chép ĐÚNG thứ tự trong `distinct on`, kể cả tiêu chí phá
 *     hoà `created_at asc` - sai thứ tự thì chọn nhầm ván và điểm lệch.
 *
 *  2. `full outer join` - SQLite chỉ hỗ trợ từ 3.39 và không nên phụ thuộc vào
 *     phiên bản của D1. Thay bằng: gom tập user_id bằng `union` rồi `left join`
 *     ba nguồn vào. Ngữ nghĩa giống hệt và chạy trên mọi phiên bản.
 *
 *  3. So sánh mốc thời gian. Dữ liệu lưu dạng `2026-07-12T17:32:55.137+00:00`.
 *     So chuỗi trực tiếp chỉ đúng khi người gọi truyền y hệt định dạng ấy, nên
 *     ở đây chuẩn hoá cả hai vế bằng `datetime()`. Đánh đổi: mất khả năng dùng
 *     chỉ mục trên cột thời gian - chấp nhận được vì lược đồ hiện chưa có chỉ
 *     mục nào, nhưng nếu sau này thêm thì phải xem lại chỗ này.
 */
export async function getXpLeaderboardSince(
  db: D1Like,
  since: string,
  limit?: number
): Promise<{ user_id: string; name: string; value: number; avatar_url: string | null }[]> {
  return rows(db, `${XP_TOTALS_CTE}
     select t.user_id, ${DISPLAY_NAME} as name, t.total_xp as value, prof.avatar_url
       from totals t
       join user_profiles prof on prof.id = t.user_id
      where t.total_xp > 0
        and coalesce(prof.is_disabled, 0) = 0
        and coalesce(prof.role, 'user') <> 'admin'
      order by t.total_xp desc
      limit ?2`, since, clampLimit(limit, 10, 50));
}

/** CTE tính tổng XP theo mốc thời gian, dùng chung bởi
 *  `get_xp_leaderboard_since` và `get_my_xp_rank_since`. Chép lại bản dịch này
 *  ở hai chỗ là hai cơ hội để chúng trôi lệch nhau - và khi ấy bảng xếp hạng và
 *  thứ hạng của chính mình sẽ mâu thuẫn. `?1` là mốc thời gian.
 *
 *  Xem chú thích của `getXpLeaderboardSince` về ba cấu trúc Postgres đã đổi. */
const XP_TOTALS_CTE = `with lessons as (
       select user_id, count(*) * 10 as xp
         from user_progress
        where completed = 1 and datetime(completed_at) >= datetime(?1)
        group by user_id
     ),
     quiz as (
       select user_id, coalesce(sum(xp_earned), 0) as xp
         from user_quiz_sessions
        where datetime(completed_at) >= datetime(?1)
        group by user_id
     ),
     game_ranked as (
       select user_id, game_type,
              min(max(coalesce(xp_earned, 0), 0), 50) as xp_earned,
              row_number() over (
                partition by user_id, game_type
                order by xp_earned desc, created_at asc
              ) as rn
         from game_sessions
        where datetime(created_at) >= datetime(?1)
     ),
     games as (
       select user_id, coalesce(sum(xp_earned), 0) as xp
         from game_ranked where rn = 1 group by user_id
     ),
     ids as (
       select user_id from lessons
       union select user_id from quiz
       union select user_id from games
     ),
     totals as (
       select ids.user_id,
              coalesce(l.xp, 0) + coalesce(q.xp, 0) + coalesce(g.xp, 0) as total_xp
         from ids
         left join lessons l on l.user_id = ids.user_id
         left join quiz q on q.user_id = ids.user_id
         left join games g on g.user_id = ids.user_id
     )
`;

// ───────────────────── nhóm "thứ hạng của tôi": sáu hàm cùng một khuôn mẫu

/** Khuôn chung của các hàm `get_my_*_rank` đếm bài đã hoàn thành.
 *
 *  Bản gốc làm ba bước: (1) đếm số bài của chính mình, (2) nếu 0 thì trả RỖNG
 *  chứ không phải hạng chót - người chưa học bài nào thì không có hạng,
 *  (3) hạng = số người có nhiều hơn mình, cộng 1.
 *
 *  Bước (2) là chỗ dễ mất nhất khi dịch: trả `{rank: n, value: 0}` thay vì rỗng
 *  làm giao diện hiện "hạng 1520" cho người mới đăng ký.
 *
 *  Cách tính hạng này cho HẠNG CẠNH TRANH: hai người bằng điểm thì cùng hạng,
 *  và hạng kế tiếp nhảy cóc. Giữ nguyên, đừng đổi sang `row_number`.
 */
async function rankByCompletedLessons(
  db: D1Like,
  userId: string,
  filterSql: string,
  filterParams: unknown[]
): Promise<{ rank: number; value: number }[]> {
  const base = `from user_progress up
                join user_profiles prof on prof.id = up.user_id
               where up.completed = 1
                 and coalesce(prof.is_disabled, 0) = 0
                 and coalesce(prof.role, 'user') <> 'admin'
                 and ${filterSql}`;

  const mine = await one<{ c: number }>(
    db,
    `select count(*) as c ${base} and up.user_id = ?`,
    ...filterParams,
    userId
  );
  const value = mine?.c ?? 0;
  if (!value) return [];

  const r = await one<{ rank: number }>(
    db,
    `select count(*) + 1 as rank from (
       select up.user_id, count(*) as cnt ${base} group by up.user_id
     ) ranked where ranked.cnt > ?`,
    ...filterParams,
    value
  );
  return [{ rank: r?.rank ?? 1, value }];
}

/** `get_my_track_leaderboard_rank(p_track, p_user_id)`.
 *  Dùng lại đúng dải id cứng của `get_track_leaderboard` - xem chú thích ở đó
 *  về việc dải ấy đã lỗi thời và vì sao bản dịch không tự ý sửa. */
export async function getMyTrackLeaderboardRank(
  db: D1Like,
  track: "personal" | "professional",
  userId: string
): Promise<{ rank: number; value: number }[]> {
  const range =
    track === "personal"
      ? "(up.lesson_id between 1 and 20 or up.lesson_id between 201 and 288)"
      : "(up.lesson_id between 21 and 200 or up.lesson_id = 1036)";
  return rankByCompletedLessons(db, userId, range, []);
}

/** `get_my_competency_leaderboard_rank(p_lesson_ids, p_user_id)` */
export async function getMyCompetencyLeaderboardRank(
  db: D1Like,
  lessonIds: number[],
  userId: string
): Promise<{ rank: number; value: number }[]> {
  const ids = (lessonIds ?? []).map((x) => Math.trunc(Number(x))).filter(Number.isFinite);
  if (ids.length === 0) return [];
  return rankByCompletedLessons(db, userId, `up.lesson_id in (${ids.map(() => "?").join(",")})`, ids);
}

/** `get_my_xp_rank_since(p_since, p_user_id)`.
 *  Dùng lại `XP_TOTALS_CTE` để phép tính giống hệt bảng xếp hạng công khai. */
export async function getMyXpRankSince(
  db: D1Like,
  since: string,
  userId: string
): Promise<{ rank: number; value: number }[]> {
  const mine = await one<{ total_xp: number }>(
    db,
    `${XP_TOTALS_CTE} select t.total_xp from totals t where t.user_id = ?2`,
    since,
    userId
  );
  const value = mine?.total_xp ?? 0;
  if (!value) return [];

  const r = await one<{ rank: number }>(
    db,
    `${XP_TOTALS_CTE}
     select count(*) + 1 as rank
       from totals t
       join user_profiles prof on prof.id = t.user_id
      where coalesce(prof.is_disabled, 0) = 0
        and coalesce(prof.role, 'user') <> 'admin'
        and t.total_xp > ?2`,
    since,
    value
  );
  return [{ rank: r?.rank ?? 1, value }];
}

/** `get_my_composite_rank(p_user_id)`.
 *
 *  Hai điểm phải giữ:
 *   - `rank()` chứ không `row_number()`: hai người bằng điểm thì CÙNG hạng.
 *   - `and p_user_id = auth.uid()`: bảng phân rã điểm để lộ điểm thi và độ
 *     chính xác của người khác, thứ mà bảng công khai cố ý không hiện. Không
 *     có `auth.uid()` trên D1 nên điều kiện ấy kiểm ở đây.
 */
export async function getMyCompositeRank(
  db: D1Like,
  actor: string,
  userId: string
): Promise<
  { rank: number; value: number; learning_xp: number; exam_points: number; accuracy: number; streak_days: number }[]
> {
  if (!actor || actor !== userId) return [];
  return rows(
    db,
    `with scored as (
       select c.*, rank() over (order by c.composite desc) as rnk
         from (${COMPOSITE_COMPONENTS}) c
     )
     select s.rnk as rank, s.composite as value, s.learning_xp, s.exam_points,
            s.accuracy, s.streak_days
       from scored s where s.user_id = ?`,
    userId
  );
}

/** Truy vấn con đếm số bài ĐÃ CHẤM mỗi người, dùng chung ở bảng Điểm TB. */
const GRADED_SUBQUERY = `left join (
    select p.user_id, count(*) as graded
      from user_progress p where p.quiz_score is not null group by p.user_id
  ) g on g.user_id = us.user_id`;
const NOT_BANNED = `coalesce(prof.is_disabled, 0) = 0 and coalesce(prof.role, 'user') <> 'admin'`;
const MIN_GRADED = 30;

/** `get_my_leaderboard_rank(p_metric, p_user_id)` - bốn nhánh, nhánh cuối tinh tế.
 *
 *  Khác nhóm `rankByCompletedLessons`: ở đây trả rỗng khi KHÔNG TÌM THẤY người
 *  dùng (my_value is null), chứ không phải khi giá trị bằng 0. Người có 0 XP
 *  vẫn có hạng. Dịch nhầm hai điều kiện này cho nhau là hoặc giấu mất hạng của
 *  người mới, hoặc hiện hạng cho người không tồn tại.
 *
 *  NHÁNH KHÓ NHẤT là Điểm TB khi người dùng CHƯA đủ 30 bài chấm: họ đứng sau
 *  TOÀN BỘ nhóm đủ sàn, rồi mới xếp trong nhóm chưa đủ sàn. Nên hạng =
 *  (số người đủ sàn) + (số người chưa đủ sàn nhưng điểm cao hơn) + 1.
 */
export async function getMyLeaderboardRank(
  db: D1Like,
  metric: "streak" | "lessons" | "avg_score" | "xp",
  userId: string
): Promise<{ rank: number; value: number }[]> {
  if (metric === "streak") {
    const mine = await one<{ v: number }>(
      db,
      `select s.current_streak as v from user_streaks s
         join user_profiles prof on prof.id = s.user_id
        where s.user_id = ? and ${NOT_BANNED}`,
      userId
    );
    if (mine?.v == null) return [];
    const r = await one<{ rank: number }>(
      db,
      `select count(*) + 1 as rank from user_streaks s
         join user_profiles prof on prof.id = s.user_id
        where s.current_streak > ? and ${NOT_BANNED}`,
      mine.v
    );
    return [{ rank: r?.rank ?? 1, value: mine.v }];
  }

  const col = METRIC_COLUMN[metric] ?? METRIC_COLUMN.xp;
  const mine = await one<{ v: number }>(
    db,
    `select ${col} as v from user_stats us
       join user_profiles prof on prof.id = us.user_id
      where us.user_id = ? and ${NOT_BANNED}`,
    userId
  );
  if (mine?.v == null) return [];
  const value = mine.v;

  if (metric !== "avg_score") {
    const r = await one<{ rank: number }>(
      db,
      `select count(*) + 1 as rank from user_stats us
         join user_profiles prof on prof.id = us.user_id
        where ${col} > ? and ${NOT_BANNED}`,
      value
    );
    return [{ rank: r?.rank ?? 1, value }];
  }

  const graded = await one<{ c: number }>(
    db,
    `select count(*) as c from user_progress where user_id = ? and quiz_score is not null`,
    userId
  );

  if ((graded?.c ?? 0) >= MIN_GRADED) {
    const r = await one<{ rank: number }>(
      db,
      `select count(*) + 1 as rank from user_stats us
         join user_profiles prof on prof.id = us.user_id ${GRADED_SUBQUERY}
        where us.avg_quiz_score > ? and ${NOT_BANNED} and coalesce(g.graded, 0) >= ${MIN_GRADED}`,
      value
    );
    return [{ rank: r?.rank ?? 1, value }];
  }

  // Chưa đủ sàn: đứng sau toàn bộ nhóm đủ sàn.
  const duSan = await one<{ c: number }>(
    db,
    `select count(*) as c from user_stats us
       join user_profiles prof on prof.id = us.user_id ${GRADED_SUBQUERY}
      where ${NOT_BANNED} and coalesce(g.graded, 0) >= ${MIN_GRADED}`
  );
  const tronNhom = await one<{ c: number }>(
    db,
    `select count(*) as c from user_stats us
       join user_profiles prof on prof.id = us.user_id ${GRADED_SUBQUERY}
      where us.avg_quiz_score > ? and ${NOT_BANNED} and coalesce(g.graded, 0) < ${MIN_GRADED}`,
    value
  );
  return [{ rank: (duSan?.c ?? 0) + (tronNhom?.c ?? 0) + 1, value }];
}

/** `get_community_contribution_leaderboard(p_limit)`.
 *  `where value > 0`: bảng rỗng thì trung thực, bảng độn số 0 giả làm xếp hạng
 *  thì không - chú thích ấy có trong bản gốc và giữ nguyên ở đây. */
export async function getCommunityContributionLeaderboard(
  db: D1Like,
  limit?: number
): Promise<{ user_id: string; name: string; value: number; avatar_url: string | null }[]> {
  return rows(
    db,
    `with post_counts as (
       select p.user_id, count(*) as n from community_posts p
        where coalesce(p.is_hidden, 0) = 0 group by p.user_id
     ),
     comment_counts as (
       select c.user_id, count(*) as n from community_post_comments c group by c.user_id
     ),
     reaction_counts as (
       select r.user_id, count(*) as n from community_post_reactions r group by r.user_id
     )
     select prof.id as user_id, ${DISPLAY_NAME} as name,
            coalesce(pc.n, 0) + coalesce(cc.n, 0) + coalesce(rc.n, 0) as value,
            prof.avatar_url
       from user_profiles prof
       left join post_counts pc on pc.user_id = prof.id
       left join comment_counts cc on cc.user_id = prof.id
       left join reaction_counts rc on rc.user_id = prof.id
      where ${NOT_BANNED}
        and coalesce(pc.n, 0) + coalesce(cc.n, 0) + coalesce(rc.n, 0) > 0
      order by value desc
      limit ?`,
    clampLimit(limit, 10, 50)
  );
}

/** CTE tính tổng đóng góp cộng đồng, dùng chung bởi bảng xếp hạng và hàm hạng. */
const CONTRIBUTION_TOTALS = `with post_counts as (
     select p.user_id, count(*) as n from community_posts p
      where coalesce(p.is_hidden, 0) = 0 group by p.user_id
   ),
   comment_counts as (
     select c.user_id, count(*) as n from community_post_comments c group by c.user_id
   ),
   reaction_counts as (
     select r.user_id, count(*) as n from community_post_reactions r group by r.user_id
   ),
   totals as (
     select prof.id as user_id,
            coalesce(pc.n, 0) + coalesce(cc.n, 0) + coalesce(rc.n, 0) as value
       from user_profiles prof
       left join post_counts pc on pc.user_id = prof.id
       left join comment_counts cc on cc.user_id = prof.id
       left join reaction_counts rc on rc.user_id = prof.id
      where ${NOT_BANNED}
   )`;

/** `get_my_community_contribution_rank(p_user_id)`.
 *  `where value > 0` nằm TRƯỚC `rank()`: người chưa đóng góp gì không nằm
 *  trong bảng nên cũng không có hạng - trả rỗng, giống bảng công khai. */
export async function getMyCommunityContributionRank(
  db: D1Like,
  actor: string,
  userId: string
): Promise<{ rank: number; value: number }[]> {
  if (!actor || actor !== userId) return [];
  return rows(
    db,
    `${CONTRIBUTION_TOTALS},
     scored as (
       select t.user_id, t.value, rank() over (order by t.value desc) as rnk
         from totals t where t.value > 0
     )
     select s.rnk as rank, s.value from scored s where s.user_id = ?`,
    userId
  );
}

/** `get_friends_leaderboard(p_metric)`.
 *
 *  `friend_ids` gồm bạn bè đã nhận lời mời CỘNG CHÍNH MÌNH (`union select
 *  auth.uid()`) - bảng bạn bè mà thiếu mình thì không so được với ai. `union`
 *  chứ không `union all`: nó khử trùng, nên tự mình không xuất hiện hai lần.
 *
 *  `badges` là biểu thức chứ không phải cột: `greatest(0, least(level - 1, 5))`.
 *  Giữ nguyên công thức, chỉ đổi tên hàm sang `max`/`min` của SQLite.
 *
 *  Không có `limit` trong bản gốc - danh sách bạn bè vốn ngắn.
 */
export async function getFriendsLeaderboard(
  db: D1Like,
  actor: string,
  metric: "lessons" | "avg_score" | "streak" | "badges" | "xp"
): Promise<{ user_id: string; name: string; value: number; avatar_url: string | null }[]> {
  if (!actor) return [];
  const VALUE = {
    lessons: "coalesce(us.total_lessons_completed, 0)",
    avg_score: "coalesce(us.avg_quiz_score, 0)",
    streak: "coalesce(st.current_streak, 0)",
    badges: "max(0, min(coalesce(prof.current_level, 1) - 1, 5))",
    xp: "coalesce(us.total_xp, 0)",
  } as const;
  const val = VALUE[metric] ?? VALUE.xp;

  return rows(
    db,
    `with friend_ids as (
       select case when user_a = ?1 then user_b else user_a end as friend_id
         from user_friendships
        where status = 'accepted' and (user_a = ?1 or user_b = ?1)
       union
       select ?1
     )
     select prof.id as user_id, ${DISPLAY_NAME} as name, ${val} as value, prof.avatar_url
       from friend_ids f
       join user_profiles prof on prof.id = f.friend_id
       left join user_stats us on us.user_id = prof.id
       left join user_streaks st on st.user_id = prof.id
      where ${NOT_BANNED}
      order by value desc`,
    actor
  );
}
