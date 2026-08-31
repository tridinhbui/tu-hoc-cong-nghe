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
export interface D1Statement {
  bind(...args: unknown[]): D1Statement;
  all(): Promise<{ results: unknown[] }>;
  run?(): Promise<{ meta?: { changes?: number; last_row_id?: number } }>;
}

export interface D1Like {
  /** Chạy nhiều lệnh trong MỘT transaction ngầm. Đây là tất cả những gì D1 có:
   *  không có transaction tương tác, tức là KHÔNG đọc được kết quả rồi mới
   *  quyết định ghi gì trong cùng transaction. Mọi hàm nhóm C phải viết lại
   *  quanh giới hạn ấy - xem chú thích từng hàm. */
  batch?(statements: D1Statement[]): Promise<{ meta?: { changes?: number } }[]>;
  prepare(sql: string): {
    bind(...args: unknown[]): {
      all(): Promise<{ results: unknown[] }>;
      /** Chỉ nhóm hàm GHI mới dùng tới. Trả `meta.changes` để biết lệnh có
       *  thật sự đổi dòng nào không - nhiều hàm gốc dựa vào con số ấy để phân
       *  biệt "đã ghi" với "không có gì để ghi". */
      run?(): Promise<{ meta?: { changes?: number; last_row_id?: number } }>;
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

/** Chạy một lệnh ghi và trả số dòng đã đổi.
 *  `run()` là tuỳ chọn trong `D1Like` để phần chỉ đọc không phải cài nó; ở đây
 *  rơi về `all()` nếu thiếu, và khi ấy số dòng đổi không biết được (trả -1)
 *  thay vì giả vờ bằng 0 - 0 có nghĩa là "không đổi gì", một câu khẳng định. */
async function exec(db: D1Like, sql: string, ...args: unknown[]): Promise<number> {
  const stmt = db.prepare(sql).bind(...args);
  if (typeof stmt.run === "function") {
    const r = await stmt.run();
    return r?.meta?.changes ?? -1;
  }
  await stmt.all();
  return -1;
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

/** `get_community_post_comments(p_post_id, p_limit)`.
 *  `p.is_hidden = false` là điều kiện lọc thật: bình luận của bài đã bị ẩn thì
 *  không trả về, kể cả khi biết id bài. */
export async function getCommunityPostComments(
  db: D1Like,
  postId: number,
  limit?: number
): Promise<Record<string, unknown>[]> {
  return rows(
    db,
    `select c.id, c.post_id, c.user_id,
            coalesce(prof.full_name, 'Người học') as user_name,
            prof.avatar_url as user_avatar,
            c.content, c.created_at, c.edited_at
       from community_post_comments c
       join user_profiles prof on prof.id = c.user_id
       join community_posts p on p.id = c.post_id
      where c.post_id = ? and coalesce(p.is_hidden, 0) = 0
      order by c.created_at asc
      limit ?`,
    postId,
    clampLimit(limit, 30, 100)
  );
}

/** `get_my_social_graph()` - không nhận tham số, toàn bộ dựa vào `auth.uid()`.
 *  Trên D1 thì id người gọi thành tham số bắt buộc. Thiếu nó là trả về đồ thị
 *  bạn bè của... không ai, hoặc của tất cả - tuỳ cách viết. Nên chặn sớm. */
export async function getMySocialGraph(
  db: D1Like,
  actor: string
): Promise<Record<string, unknown>[]> {
  if (!actor) return [];
  return rows(
    db,
    `select f.id as friendship_id,
            other.id as user_id, other.full_name, other.avatar_url,
            other.current_level, other.total_xp,
            f.status, f.requested_by, f.created_at, f.updated_at, f.responded_at,
            case when f.status = 'accepted' then 'friend'
                 when f.requested_by = ?1 then 'outgoing'
                 else 'incoming' end as direction
       from user_friendships f
       join user_profiles other
         on other.id = case when f.user_a = ?1 then f.user_b else f.user_a end
      where (f.user_a = ?1 or f.user_b = ?1)
      order by case when f.status = 'pending' then 0 else 1 end,
               f.updated_at desc, f.created_at desc`,
    actor
  );
}

/** `search_accounts(search_term, result_limit)`.
 *
 *  BẪY UNICODE, và nó không sửa được hoàn toàn ở tầng SQL. Postgres `ilike`
 *  không phân biệt hoa thường với MỌI ký tự. `LIKE` của SQLite chỉ gấp chữ cho
 *  A-Z ASCII, và `lower()` cũng vậy - nên "NGUYỄN" sẽ KHÔNG khớp "nguyễn".
 *
 *  Cách giảm nhẹ ở đây: hạ chữ phía TypeScript (`toLowerCase()` của JS hiểu
 *  Unicode) rồi so với `lower(cột)`. Nó xử lý được trường hợp người TÌM gõ hoa,
 *  còn dữ liệu LƯU dạng hoa có dấu thì vẫn trượt. Muốn đúng hoàn toàn phải thêm
 *  một cột đã chuẩn hoá sẵn khi ghi - đó là thay đổi lược đồ, không phải việc
 *  của bản dịch này.
 *
 *  Giữ nguyên hai hành vi của bản gốc dù chúng đáng bàn:
 *   - Ký tự `%` và `_` người dùng gõ vào KHÔNG được thoát, nên gõ `%` khớp mọi
 *     người. Postgres cũng vậy; sửa là đổi hành vi.
 *   - Dưới 2 ký tự thì trả rỗng.
 */
export async function searchAccounts(
  db: D1Like,
  actor: string,
  searchTerm: string,
  limit?: number
): Promise<Record<string, unknown>[]> {
  const term = (searchTerm ?? "").trim();
  if (!actor || term.length < 2) return [];
  const t = term.toLowerCase();

  return rows(
    db,
    `select prof.id, prof.full_name, prof.avatar_url, prof.current_level, prof.total_xp
       from user_profiles prof
      where prof.id <> ?1
        and (lower(coalesce(prof.full_name, '')) like ?2
             or lower(coalesce(prof.email, '')) like ?2)
      order by case
                 when lower(coalesce(prof.full_name, '')) like ?3 then 0
                 when lower(coalesce(prof.email, '')) like ?3 then 1
                 else 2 end,
               prof.total_xp desc, prof.created_at desc
      limit ?4`,
    actor,
    `%${t}%`,
    `${t}%`,
    clampLimit(limit, 8, 20)
  );
}

/** `date_trunc('week', now())` của Postgres - tuần bắt đầu từ THỨ HAI.
 *
 *  `date('now','-6 days','weekday 1')` cho đúng thứ Hai của tuần hiện tại ở cả
 *  bảy ngày, kể cả Chủ nhật (SQLite coi `weekday 1` là thứ Hai KẾ TIẾP, nên
 *  phải lùi 6 ngày trước). Đã kiểm chứng bằng bảng bốn ngày trong bộ kiểm.
 *
 *  Viết nhầm thành `date('now','weekday 1')` là ra thứ Hai TUẦN SAU với mọi
 *  ngày không phải thứ Hai, và mọi chỉ số "tuần này" trả về 0. */
const WEEK_START = `date('now', '-6 days', 'weekday 1')`;

/** Số bài hoàn thành trong tuần này của một người - truy vấn con lặp ở ba hàm
 *  phòng học. `count(...) filter (where ...)` có từ SQLite 3.30 nhưng ở đây
 *  dùng `sum(case ...)` để không phụ thuộc phiên bản của D1. */
const WEEKLY_LESSONS = `(select count(*) from user_progress p
      where p.user_id = %s and p.completed = 1
        and date(p.completed_at) >= ${WEEK_START})`;

/** `get_my_study_room()` */
export async function getMyStudyRoom(db: D1Like, actor: string): Promise<Record<string, unknown>[]> {
  if (!actor) return [];
  return rows(
    db,
    `select r.id as room_id, r.topic,
            sum(case when m2.left_at is null then 1 else 0 end) as member_count,
            r.max_members, r.weekly_xp_goal,
            coalesce(sum(case when m2.left_at is null
                              then ${WEEKLY_LESSONS.replace("%s", "m2.user_id")}
                              else 0 end), 0) * 10 as weekly_xp_progress,
            r.created_at
       from study_rooms r
       join study_room_members mine
         on mine.room_id = r.id and mine.user_id = ? and mine.left_at is null
       left join study_room_members m2 on m2.room_id = r.id
      group by r.id`,
    actor
  );
}

/** `get_study_room_members(p_room_id)`.
 *  Bản gốc chỉ gác `auth.uid() is not null` - tức là bất kỳ ai ĐÃ ĐĂNG NHẬP
 *  cũng xem được thành viên của phòng bất kỳ, không cần là thành viên. Giữ
 *  nguyên mức gác ấy; siết lại là đổi hành vi. */
export async function getStudyRoomMembers(
  db: D1Like,
  actor: string,
  roomId: number
): Promise<Record<string, unknown>[]> {
  if (!actor) return [];
  return rows(
    db,
    `select prof.id as user_id, prof.full_name, prof.avatar_url,
            prof.current_level, prof.total_xp,
            ${WEEKLY_LESSONS.replace("%s", "prof.id")} as weekly_lessons
       from study_room_members m
       join user_profiles prof on prof.id = m.user_id
      where m.room_id = ? and m.left_at is null
      order by weekly_lessons desc`,
    roomId
  );
}

/** `get_study_rooms(p_topic)`.
 *  `having ... < r.max_members`: chỉ hiện phòng CÒN CHỖ. Mất mệnh đề này là
 *  người học bấm vào phòng đã đầy rồi nhận lỗi. */
export async function getStudyRooms(
  db: D1Like,
  actor: string,
  topic?: string | null
): Promise<Record<string, unknown>[]> {
  if (!actor) return [];
  return rows(
    db,
    `select r.id as room_id, r.topic,
            sum(case when m.left_at is null then 1 else 0 end) as member_count,
            r.max_members, r.weekly_xp_goal,
            coalesce(sum(case when m.left_at is null
                              then ${WEEKLY_LESSONS.replace("%s", "m.user_id")}
                              else 0 end), 0) * 10 as weekly_xp_progress,
            r.created_at
       from study_rooms r
       left join study_room_members m on m.room_id = r.id
      where (?1 is null or r.topic = ?1)
      group by r.id
     having sum(case when m.left_at is null then 1 else 0 end) < r.max_members
      order by r.created_at desc
      limit 30`,
    topic ?? null
  );
}

/** `get_community_learning_now(p_limit, p_days)`.
 *  `p_days` là bộ chặn quan trọng - chú thích bản gốc nói rõ: không có nó thì
 *  danh sách đầy người chuỗi ngày cao nhưng đã nghỉ hàng tháng, và "đang học"
 *  thành một câu nói sai có người thật đứng tên. Giữ nguyên.
 *
 *  `distinct on (user_id) order by completed_at desc` → `row_number()`. */
export async function getCommunityLearningNow(
  db: D1Like,
  limit?: number,
  days?: number
): Promise<Record<string, unknown>[]> {
  return rows(
    db,
    `with active as (
       select s.user_id, s.current_streak, s.last_activity_date
         from user_streaks s
        where s.current_streak > 0
          and date(s.last_activity_date) >= date('now', '-' || ?2 || ' days')
        order by s.last_activity_date desc, s.current_streak desc
        limit ?1
     ),
     ranked as (
       select p.user_id, p.lesson_id, p.completed_at,
              row_number() over (partition by p.user_id order by p.completed_at desc) as rn
         from user_progress p
         join active a on a.user_id = p.user_id
        where p.completed = 1 and p.completed_at is not null
     ),
     latest as (select user_id, lesson_id, completed_at from ranked where rn = 1)
     select a.user_id,
            nullif(trim(coalesce(prof.full_name, '')), '') as name,
            prof.avatar_url, a.current_streak, l.lesson_id, l.completed_at
       from active a
       left join user_profiles prof on prof.id = a.user_id
       left join latest l on l.user_id = a.user_id
      where coalesce(prof.is_disabled, 0) = 0
      order by a.last_activity_date desc, a.current_streak desc`,
    clampLimit(limit, 24, 100),
    clampLimit(days, 7, 365)
  );
}

/** Chín bậc cấp độ, chép từ mệnh đề `values` của bản gốc. */
const LEVEL_BANDS = `lvl(level, min_xp, max_xp) as (
     values (1,0,99),(2,100,299),(3,300,599),(4,600,1199),(5,1200,1999),
            (6,2000,3199),(7,3200,4999),(8,5000,6999),(9,7000,999999999)
   )`;

/** `get_level_stats(p_user_id)`.
 *
 *  `jsonb_agg(t.* order by t.xp desc)` KHÔNG dịch thẳng: `json_group_array` của
 *  SQLite không bảo đảm thứ tự (cùng lý do với `array_agg` ở các hàm reaction).
 *  Nên top-5 mỗi bậc lấy bằng `row_number()` rồi gom nhóm ở TypeScript - kết
 *  quả xác định, không phụ thuộc phiên bản.
 */
export async function getLevelStats(
  db: D1Like,
  userId?: string | null
): Promise<
  { level: number; user_count: number; total_users: number; my_rank: number | null; top_users: unknown[] }[]
> {
  const tong = await one<{ c: number }>(db, `select count(*) as c from user_stats`);
  const total_users = tong?.c ?? 0;

  let my_rank: number | null = null;
  if (userId) {
    const r = await one<{ rank: number }>(
      db,
      `select count(*) + 1 as rank from user_stats
        where total_xp > coalesce((select total_xp from user_stats where user_id = ?), -1)`,
      userId
    );
    my_rank = r?.rank ?? null;
  }

  const dem = await rows<{ level: number; user_count: number }>(
    db,
    `with ${LEVEL_BANDS}
     select lvl.level, count(us.user_id) as user_count
       from lvl left join user_stats us on us.total_xp between lvl.min_xp and lvl.max_xp
      group by lvl.level order by lvl.level`
  );

  const top = await rows<{ level: number; name: string; avatar_url: string | null; xp: number }>(
    db,
    `with ${LEVEL_BANDS},
     xep as (
       select lvl.level, ${DISPLAY_NAME} as name, prof.avatar_url, us.total_xp as xp,
              row_number() over (partition by lvl.level order by us.total_xp desc) as rn
         from lvl
         join user_stats us on us.total_xp between lvl.min_xp and lvl.max_xp
         join user_profiles prof on prof.id = us.user_id
     )
     select level, name, avatar_url, xp from xep where rn <= 5 order by level, xp desc`
  );

  return dem.map((d) => ({
    level: d.level,
    user_count: d.user_count,
    total_users,
    my_rank,
    top_users: top.filter((t) => t.level === d.level).map(({ name, avatar_url, xp }) => ({ name, avatar_url, xp })),
  }));
}

/** Ném khi chưa đăng nhập. Bản gốc dùng `raise exception 'Not authenticated'`;
 *  giữ nguyên việc NÉM chứ không trả rỗng - hai hàm dưới đây trả về trạng thái
 *  của chính người dùng, và một object rỗng trông y hệt "người này chưa có gì". */
export class NotAuthenticatedError extends Error {
  constructor() {
    super("Not authenticated");
  }
}

/** `get_nav_state(p_day_start)` - trả JSON. Dựng object ở TypeScript thay vì
 *  `json_build_object`: kết quả giống hệt và không phải lo `row_to_json` của
 *  SQLite có tồn tại hay không. */
export async function getNavState(
  db: D1Like,
  actor: string,
  dayStart: string
): Promise<{ profile: unknown; unresolved_mistakes: number; daily_chest_claimed: boolean }> {
  if (!actor) throw new NotAuthenticatedError();

  const profile = await one(
    db,
    `select full_name, email, avatar_url, total_xp, current_level, lessons_completed, coins
       from user_profiles where id = ?`,
    actor
  );
  const m = await one<{ c: number }>(
    db,
    `select count(*) as c from quiz_mistakes where user_id = ? and coalesce(resolved, 0) = 0`,
    actor
  );
  const chest = await one<{ c: number }>(
    db,
    `select count(*) as c from user_chests
      where user_id = ? and source = 'daily_login' and datetime(earned_at) >= datetime(?)`,
    actor,
    dayStart
  );
  return {
    profile: profile ?? null,
    unresolved_mistakes: m?.c ?? 0,
    daily_chest_claimed: (chest?.c ?? 0) > 0,
  };
}

/** `get_lesson_state()` - bốn mảng id + danh sách đánh dấu, gói thành JSON.
 *  `array_agg` ở đây KHÔNG cần thứ tự nên gom ở TypeScript là đủ. */
export async function getLessonState(
  db: D1Like,
  actor: string
): Promise<{
  completed_lessons: number[];
  unlocked_lesson_ids: number[];
  user_lesson_flags: number[];
  bookmarks: unknown[];
}> {
  if (!actor) throw new NotAuthenticatedError();
  const ids = async (sql: string) =>
    (await rows<{ lesson_id: number }>(db, sql, actor)).map((r) => r.lesson_id);

  return {
    completed_lessons: await ids(
      `select lesson_id from user_progress where user_id = ? and completed = 1`
    ),
    unlocked_lesson_ids: await ids(`select lesson_id from user_lesson_unlocks where user_id = ?`),
    user_lesson_flags: await ids(`select lesson_id from lesson_manual_flags where user_id = ?`),
    bookmarks: await rows(
      db,
      `select id, lesson_id, lesson_slug, lesson_title, created_at
         from lesson_bookmarks where user_id = ? order by created_at desc`,
      actor
    ),
  };
}

/** Lấy phân bố reaction cho một danh sách bài viết rồi gom nhóm ở TypeScript.
 *
 *  Bản gốc dựng `reaction_summary` bằng `jsonb_agg(... order by emoji_count
 *  desc, emoji)` trong một `left join lateral`. SQLite không có `LATERAL`, và
 *  `json_group_array` lại không bảo đảm thứ tự - nên phần này tách ra một truy
 *  vấn thứ hai. Một truy vấn thêm cho cả trang, không phải cho mỗi bài. */
async function reactionSummaries(
  db: D1Like,
  postIds: number[]
): Promise<Map<number, { emoji: string; count: number }[]>> {
  const out = new Map<number, { emoji: string; count: number }[]>();
  if (!postIds.length) return out;
  const cho = postIds.map(() => "?").join(",");
  const r = await rows<{ post_id: number; emoji: string; c: number }>(
    db,
    `select post_id, emoji, count(*) as c
       from community_post_reactions where post_id in (${cho})
      group by post_id, emoji
      order by post_id, c desc, emoji`,
    ...postIds
  );
  for (const x of r) out.set(x.post_id, [...(out.get(x.post_id) ?? []), { emoji: x.emoji, count: x.c }]);
  return out;
}

/** `get_user_community_posts(p_user_id, p_limit, p_before_id)`.
 *  `LATERAL` → truy vấn con tương quan trong SELECT (SQLite hỗ trợ).
 *  `p_before_id` là phân trang theo con trỏ: `p.id < ?` rồi `order by id desc`. */
export async function getUserCommunityPosts(
  db: D1Like,
  actor: string,
  userId: string,
  limit?: number,
  beforeId?: number | null
): Promise<Record<string, unknown>[]> {
  const posts = await rows<Record<string, unknown> & { id: number }>(
    db,
    `select p.id, p.user_id,
            coalesce(prof.full_name, 'Người học') as user_name,
            prof.avatar_url as user_avatar,
            p.kind, p.content, p.metadata, p.created_at, p.edited_at,
            (select count(*) from community_post_reactions cr where cr.post_id = p.id) as reaction_count,
            (select cr.emoji from community_post_reactions cr
              where cr.post_id = p.id and cr.user_id = ?1) as my_reaction,
            (select count(*) from community_post_comments cc where cc.post_id = p.id) as comment_count
       from community_posts p
       join user_profiles prof on prof.id = p.user_id
      where coalesce(p.is_hidden, 0) = 0
        and p.user_id = ?2
        and (?3 is null or p.id < ?3)
      order by p.id desc
      limit ?4`,
    actor || null,
    userId,
    beforeId ?? null,
    clampLimit(limit, 20, 50)
  );

  const tom = await reactionSummaries(db, posts.map((p) => p.id));
  return posts.map((p) => ({ ...p, reaction_summary: tom.get(p.id) ?? [] }));
}

/** `get_dashboard_summary()` - gói năm truy vấn thành một JSON.
 *  Danh sách cột chép nguyên từ bản gốc, không dùng `select *`: thêm cột vào
 *  bảng mà bảng điều khiển bỗng nhận thêm dữ liệu là cách rò rỉ thầm lặng. */
export async function getDashboardSummary(
  db: D1Like,
  actor: string
): Promise<{
  profile: unknown;
  stats: unknown;
  has_completed_onboarding: boolean;
  passed_milestones: unknown[];
  challenge_passed_ids: number[];
}> {
  if (!actor) throw new NotAuthenticatedError();

  const profile = await one(
    db,
    `select id, email, full_name, avatar_url, bio, current_level, total_xp,
            lessons_completed, avg_quiz_score, current_stage, preferred_track, dark_mode
       from user_profiles where id = ?`,
    actor
  );
  const stats = await one(
    db,
    `select total_lessons_completed, total_xp, current_level, avg_quiz_score,
            longest_streak, last_lesson_date, total_study_time_hours
       from user_stats where user_id = ?`,
    actor
  );
  const ob = await one<{ completed: number }>(
    db,
    `select completed from user_onboarding where user_id = ?`,
    actor
  );
  const milestones = await rows(
    db,
    `select track_id, stage_label, score from user_milestone_exams where user_id = ?`,
    actor
  );
  const passes = await rows<{ lesson_id: number }>(
    db,
    `select lesson_id from user_challenge_passes where user_id = ?`,
    actor
  );

  return {
    profile: profile ?? null,
    stats: stats ?? null,
    // Bản gốc ép null thành false tường minh; giữ nguyên để giao diện không
    // phải phân biệt "chưa có bản ghi" với "chưa hoàn thành".
    has_completed_onboarding: Boolean(ob?.completed),
    passed_milestones: milestones,
    challenge_passed_ids: passes.map((p) => p.lesson_id),
  };
}

/** `get_community_feed(p_limit, p_before_id)`.
 *  Giống `get_user_community_posts` nhưng không lọc theo tác giả, và có thêm
 *  cột `is_following` để giao diện biết hiện nút Theo dõi hay không. */
export async function getCommunityFeed(
  db: D1Like,
  actor: string,
  limit?: number,
  beforeId?: number | null
): Promise<Record<string, unknown>[]> {
  const posts = await rows<Record<string, unknown> & { id: number }>(
    db,
    `select p.id, p.user_id,
            coalesce(prof.full_name, 'Người học') as user_name,
            prof.avatar_url as user_avatar,
            p.kind, p.content, p.metadata, p.created_at, p.edited_at,
            (select count(*) from community_post_reactions cr where cr.post_id = p.id) as reaction_count,
            (select cr.emoji from community_post_reactions cr
              where cr.post_id = p.id and cr.user_id = ?1) as my_reaction,
            (select count(*) from community_post_comments cc where cc.post_id = p.id) as comment_count,
            exists (select 1 from user_follows uf
                     where uf.followed_id = p.user_id and uf.follower_id = ?1) as is_following
       from community_posts p
       join user_profiles prof on prof.id = p.user_id
      where coalesce(p.is_hidden, 0) = 0
        and (?2 is null or p.id < ?2)
      order by p.id desc
      limit ?3`,
    actor || null,
    beforeId ?? null,
    clampLimit(limit, 20, 50)
  );

  const tom = await reactionSummaries(db, posts.map((p) => p.id));
  return posts.map((p) => ({ ...p, reaction_summary: tom.get(p.id) ?? [] }));
}

/** `get_study_room_mission_status(p_room_id)` - hàm cuối của nhóm A.
 *
 *  `cross join lateral (values ...)` dựng ba dòng nhiệm vụ từ các con số vừa
 *  tính. SQLite không có `LATERAL`, và dựng ba dòng ấy ở TypeScript vừa ngắn
 *  hơn vừa đọc được - phần SQL chỉ còn việc đếm.
 *
 *  Phân quyền: `exists(... m.user_id = auth.uid() and m.left_at is null)` gắn
 *  vào `room_ctx`, nên người ngoài phòng nhận về RỖNG chứ không phải lỗi.
 *  `greatest(3, n)` → `max(3, n)`; `date_trunc('week', now())` → WEEK_START.
 */
export async function getStudyRoomMissionStatus(
  db: D1Like,
  actor: string,
  roomId: number
): Promise<Record<string, unknown>[]> {
  if (!actor) return [];

  const ctx = await one<{ streak_weeks: number; is_permanent: number; leader_id: string }>(
    db,
    `select r.streak_weeks, r.is_permanent, r.leader_id
       from study_rooms r
      where r.id = ?1
        and exists (select 1 from study_room_members m
                     where m.room_id = r.id and m.user_id = ?2 and m.left_at is null)`,
    roomId,
    actor
  );
  if (!ctx) return [];

  const c = await one<Record<string, number>>(
    db,
    `with members as (
       select m.user_id from study_room_members m
        where m.room_id = ?1 and m.left_at is null
     )
     select
       max(3, (select count(*) from members) * 3) as lesson_target,
       max(3, (select count(*) from members))     as quiz_target,
       max(3, (select count(*) from members) * 3) as checkin_target,
       (select count(*) from user_progress up
         where up.user_id in (select user_id from members)
           and up.completed = 1
           and date(up.completed_at) >= ${WEEK_START}) as lesson_count,
       (select count(*) from user_quiz_sessions qs
         where qs.user_id in (select user_id from members)
           and date(qs.completed_at) >= ${WEEK_START})
       + (select count(*) from study_room_quiz_attempts qa
           where qa.room_id = ?1 and date(qa.created_at) >= ${WEEK_START}) as quiz_count,
       (select count(*) from study_room_checkins ci
         where ci.room_id = ?1 and date(ci.day_key) >= ${WEEK_START}) as checkin_count`,
    roomId
  );

  const claim = await one<{ c: number }>(
    db,
    `select count(*) as c from study_room_reward_claims
      where room_id = ? and date(week_start) = ${WEEK_START}`,
    roomId
  );
  const reward_claimed = (claim?.c ?? 0) > 0;

  const MISSIONS = [
    ["lessons", "Học bài cùng nhau", "Cả nhóm hoàn thành bài học trong tuần", "lesson_count", "lesson_target"],
    ["quizzes", "Quiz nhóm & ôn tập", "Cả nhóm làm quiz tự chọn hoặc thử thách nhóm", "quiz_count", "quiz_target"],
    ["checkins", "Điểm danh đều đặn", "Mỗi thành viên duy trì thói quen check-in tuần này", "checkin_count", "checkin_target"],
  ] as const;

  return MISSIONS.map(([mission_key, title, description, cur, tgt]) => {
    const current_value = c?.[cur] ?? 0;
    const target_value = c?.[tgt] ?? 3;
    return {
      mission_key, title, description, current_value, target_value,
      completed: current_value >= target_value,
      streak_weeks: ctx.streak_weeks,
      is_permanent: Boolean(ctx.is_permanent),
      reward_claimed,
      leader_id: ctx.leader_id,
    };
  });
}

// ══════════════════════════ NHÓM B: một lệnh ghi ══════════════════════════
//
// Bảy hàm dưới đây mỗi hàm chỉ có ĐÚNG MỘT lệnh ghi, nên không cần transaction:
// một câu lệnh trong SQLite đã là nguyên tử. Cái phải giữ khi dịch là các điều
// kiện gác đứng TRƯỚC lệnh ghi - chúng là phân quyền, không phải kiểm tra hình
// thức, và mất một cái là mở một lỗ.

/** `increment_document_download(doc_id)` - không gác gì, bản gốc cấp quyền cho
 *  cả `anon`. Giữ nguyên. */
export async function incrementDocumentDownload(db: D1Like, docId: number): Promise<void> {
  await exec(db, `update documents set download_count = download_count + 1 where id = ?`, docId);
}

/** `leave_study_room()` - rời MỌI phòng đang tham gia, không nhận room_id.
 *  `left_at is null` vừa là điều kiện lọc vừa khiến lệnh trở nên bình phương
 *  luỹ đẳng: gọi hai lần không ghi đè thời điểm rời của lần đầu. */
export async function leaveStudyRoom(db: D1Like, actor: string): Promise<number> {
  if (!actor) return 0;
  return exec(
    db,
    `update study_room_members set left_at = datetime('now')
      where user_id = ? and left_at is null`,
    actor
  );
}

/** `reward_my_referral()` - chỉ đổi trạng thái lượt giới thiệu của CHÍNH MÌNH.
 *  `status = 'pending'` chặn việc thưởng hai lần. */
export async function rewardMyReferral(db: D1Like, actor: string): Promise<number> {
  if (!actor) return 0;
  return exec(
    db,
    `update referrals set status = 'rewarded', rewarded_at = datetime('now')
      where referred_id = ? and status = 'pending'`,
    actor
  );
}

/** `record_referral(p_referrer_id)`.
 *
 *  Ba điều kiện gác của bản gốc, cả ba đều phải giữ:
 *   1. `p_referrer_id is null` → thoát êm.
 *   2. `p_referrer_id = auth.uid()` → không tự giới thiệu chính mình.
 *   3. người giới thiệu phải tồn tại.
 *  Cộng `on conflict (referred_id) do nothing`: mỗi người chỉ được giới thiệu
 *  MỘT lần, và lần đầu thắng.
 *
 *  CẢNH BÁO PHỤ THUỘC: `on conflict (referred_id)` cần một ràng buộc UNIQUE
 *  trên cột ấy. Lược đồ D1 hiện có 0 UNIQUE (xem `0002_indexes.sql` chưa tồn
 *  tại), nên tới khi index được tạo, lệnh này sẽ CHÈN TRÙNG thay vì bỏ qua. */
export async function recordReferral(
  db: D1Like,
  actor: string,
  referrerId: string | null
): Promise<number> {
  if (!actor || !referrerId || referrerId === actor) return 0;
  const ton = await one<{ c: number }>(
    db,
    `select count(*) as c from user_profiles where id = ?`,
    referrerId
  );
  if (!ton?.c) return 0;
  return exec(
    db,
    `insert into referrals (referrer_id, referred_id, status)
     values (?, ?, 'pending')
     on conflict (referred_id) do nothing`,
    referrerId,
    actor
  );
}

/** `mark_admin_chat_messages_seen(p_user_id)`.
 *  `auth.uid() is distinct from p_user_id` → NÉM, không im lặng bỏ qua: bản
 *  gốc `raise exception 'not authorized'`. Giữ nguyên việc ném. */
export async function markAdminChatMessagesSeen(
  db: D1Like,
  actor: string,
  userId: string
): Promise<number> {
  if (!actor || actor !== userId) throw new Error("not authorized");
  return exec(
    db,
    `update chat_messages set read = 1
      where user_id = ? and sender = 'admin' and coalesce(read, 0) = 0`,
    userId
  );
}

/** Người gọi có đang là thành viên hoạt động của phòng không. Dùng ở ba hàm. */
async function isActiveRoomMember(db: D1Like, actor: string, roomId: number): Promise<boolean> {
  const r = await one<{ c: number }>(
    db,
    `select count(*) as c from study_room_members
      where room_id = ? and user_id = ? and left_at is null`,
    roomId,
    actor
  );
  return (r?.c ?? 0) > 0;
}

/** `record_study_room_checkin(p_room_id, p_source)`.
 *  `current_date` → `date('now')` (UTC, giống bản gốc trên Supabase).
 *  Cùng cảnh báo UNIQUE như `recordReferral`: `on conflict (room_id, user_id,
 *  day_key)` cần ràng buộc duy nhất mà lược đồ D1 chưa có. */
export async function recordStudyRoomCheckin(
  db: D1Like,
  actor: string,
  roomId: number,
  source?: string
): Promise<boolean> {
  if (!actor) throw new NotAuthenticatedError();
  if (!(await isActiveRoomMember(db, actor, roomId))) throw new Error("Not a room member");
  const src = (source ?? "").trim() || "chat";
  await exec(
    db,
    `insert into study_room_checkins (room_id, user_id, day_key, source)
     values (?, ?, date('now'), ?)
     on conflict (room_id, user_id, day_key) do nothing`,
    roomId,
    actor,
    src
  );
  return true;
}

/** `record_study_room_quiz_attempt(p_room_id, p_track, p_score, p_total)`.
 *
 *  Kiểm tra đầu vào của bản gốc phải giữ NGUYÊN VẸN - nó chặn điểm bịa:
 *  `p_total <= 0 or p_total > 50 or p_score < 0 or p_score > p_total`.
 *
 *  `round((score::numeric / total::numeric) * 100)::int` - lại là bẫy chia
 *  nguyên: viết `score / total` trong SQLite ra 0 với mọi điểm dưới tuyệt đối.
 *  Tính ở TypeScript cho khỏi phải nhớ.
 *
 *  Bản gốc gọi `record_study_room_checkin` ở cuối và có `returning *`. Hai lệnh
 *  ghi nhưng KHÔNG cần nguyên tử: điểm danh trùng thì `do nothing`, nên chạy
 *  lại vô hại. Đó là lý do hàm này ở nhóm B chứ không phải nhóm C. */
export async function recordStudyRoomQuizAttempt(
  db: D1Like,
  actor: string,
  roomId: number,
  track: string,
  score: number,
  total: number
): Promise<Record<string, unknown> | null> {
  if (!actor) throw new NotAuthenticatedError();
  if (!(await isActiveRoomMember(db, actor, roomId))) throw new Error("Not a room member");
  if (total <= 0 || total > 50 || score < 0 || score > total) throw new Error("Invalid score");

  const percent = Math.round((score / total) * 100);
  await exec(
    db,
    `insert into study_room_quiz_attempts (room_id, user_id, track, score, total, percent)
     values (?, ?, ?, ?, ?, ?)`,
    roomId,
    actor,
    (track ?? "").trim() || "personal",
    score,
    total,
    percent
  );
  await recordStudyRoomCheckin(db, actor, roomId, "group_quiz");

  return one(
    db,
    `select * from study_room_quiz_attempts
      where room_id = ? and user_id = ? order by id desc limit 1`,
    roomId,
    actor
  );
}

// ══════════════════ NHÓM C: nhiều lệnh ghi, cần nguyên tử ══════════════════
//
// D1 chỉ có `batch()` - MỘT transaction ngầm, KHÔNG tương tác. Nghĩa là không
// đọc được kết quả rồi mới quyết định ghi gì trong cùng transaction. Mỗi hàm
// dưới đây phải viết lại quanh giới hạn đó theo một trong hai cách:
//
//   (a) Gộp điều kiện vào chính lệnh ghi rồi kiểm số dòng bị ảnh hưởng.
//       `update ... where coins >= price` + `changes === 0` là "không đủ tiền".
//       Cách này AN TOÀN TRƯỚC CHẠY ĐUA mà không cần transaction nào.
//   (b) Gói nhiều lệnh vào `batch()` khi chúng không phụ thuộc kết quả của nhau.
//
// Cách KHÔNG dùng: đọc rồi ghi bằng hai lời gọi rời. Giữa hai lời gọi ấy có
// một khoảng hở, và trong khoảng ấy hai yêu cầu song song đều thấy "còn đủ
// tiền" rồi cùng trừ. Đó là lỗ tiêu tiền hai lần.

/** Trần thưởng theo nguồn, chép từ `grant_coins`. Giữ Ở MÁY CHỦ chứ không ở
 *  client - đây là thứ biến "đặt coin thành một triệu" thành "nhiều nhất 100". */
const COIN_CAPS: Record<string, number> = {
  building: 5,
  wheel: 100,
  game: 50,
  challenge: 100,
};

/** `grant_coins(p_source, p_ref, p_amount)`.
 *
 *  Bản gốc dựa vào `unique_violation` trên `coin_grants(user_id, source, ref)`
 *  để chống cấp trùng, và bắt ngoại lệ ấy để trả `duplicate: true` chứ không
 *  ném - với giao diện thì thao tác đã thành công từ lần trước.
 *
 *  Ở đây dùng `insert ... on conflict do nothing` rồi đọc `changes`: 0 nghĩa là
 *  đã cấp rồi. Tương đương về ngữ nghĩa và không cần bắt ngoại lệ.
 *
 *  CHỖ KHÔNG PORT ĐƯỢC: `set_config('app.coin_write','on',true)`. Trigger
 *  `guard_coins_on_user_profiles` trên Supabase từ chối mọi lệnh ghi vào cột
 *  `coins` trừ khi cờ phiên ấy bật. SQLite không có biến phạm vi transaction,
 *  nên lớp bảo vệ ấy BIẾN MẤT. Thay thế: mọi thay đổi `coins` phải đi qua đúng
 *  hai hàm trong tệp này (`grantCoins`, `purchaseCosmetic`) và bảng `coin_grants`
 *  đóng vai sổ cái để đối soát. Xem RPC-MIGRATION-MAP.md, bẫy số 4.
 */
export async function grantCoins(
  db: D1Like,
  actor: string,
  source: string,
  ref: string | null,
  amount: number
): Promise<{ granted: number; coins_left: number; duplicate: boolean }> {
  if (!actor) throw new NotAuthenticatedError();
  const cap = COIN_CAPS[source];
  if (cap == null) throw new Error(`Nguồn không hợp lệ: ${source}`);

  const give = Math.min(Math.max(Math.trunc(Number(amount)) || 0, 0), cap);
  const doc = async () =>
    (await one<{ coins: number }>(db, `select coins from user_profiles where id = ?`, actor))?.coins ?? 0;

  if (give === 0) return { granted: 0, coins_left: await doc(), duplicate: false };

  // `coin_grants.id` là TEXT NOT NULL trong lược đồ D1 và KHÔNG có giá trị mặc
  // định: trên Postgres nó là uuid với `gen_random_uuid()`, mà bản chụp
  // PostgREST chỉ lấy được KIỂU chứ không lấy được DEFAULT. 15 bảng đang ở
  // trạng thái này. Sinh id ở đây cho tới khi lược đồ có mặc định.
  const changes = await exec(
    db,
    `insert into coin_grants (id, user_id, source, ref, amount) values (?, ?, ?, ?, ?)
     on conflict (user_id, source, ref) where ref is not null do nothing`,
    crypto.randomUUID(),
    actor,
    source,
    ref,
    give
  );
  if (changes === 0) return { granted: 0, coins_left: await doc(), duplicate: true };

  await exec(
    db,
    `update user_profiles set coins = coalesce(coins, 0) + ? where id = ?`,
    give,
    actor
  );
  return { granted: give, coins_left: await doc(), duplicate: false };
}

/** `purchase_cosmetic(p_asset_key)`.
 *
 *  ĐÂY LÀ HÀM MẪU CHO CÁCH (a). Bản gốc đã viết sẵn theo lối an toàn:
 *  `update ... where coins >= v_price`, rồi nếu không có dòng nào bị đổi thì
 *  báo không đủ tiền. Điều kiện nằm TRONG lệnh ghi nên hai yêu cầu song song
 *  không thể cùng trừ tiền.
 *
 *  Ba lần kiểm tra trước đó (món có tồn tại, có bán, chưa sở hữu) chỉ là để
 *  báo lỗi cho đúng - chúng KHÔNG phải lớp bảo vệ chạy đua. Lớp bảo vệ thật là
 *  `where coins >= ?` và ràng buộc duy nhất `(user_id, asset_id)`.
 */
export async function purchaseCosmetic(
  db: D1Like,
  actor: string,
  assetKey: string
): Promise<{ asset_key: string; coins_left: number }> {
  if (!actor) throw new NotAuthenticatedError();

  const asset = await one<{ id: string; price: number }>(
    db,
    `select id, price from gamification_assets where asset_key = ?`,
    assetKey
  );
  if (!asset) throw new Error(`Không có món nào tên ${assetKey}`);
  if (asset.price == null) throw new Error("Món này không bán");

  const daCo = await one<{ c: number }>(
    db,
    `select count(*) as c from user_inventories where user_id = ? and asset_id = ?`,
    actor,
    asset.id
  );
  if (daCo?.c) throw new Error("Bạn đã sở hữu món này");

  // Trừ tiền CÓ ĐIỀU KIỆN. changes === 0 ⇒ không đủ tiền, và không có khoảng
  // hở nào giữa lúc kiểm và lúc trừ.
  const tru = await exec(
    db,
    `update user_profiles set coins = coins - ? where id = ? and coins >= ?`,
    asset.price,
    actor,
    asset.price
  );
  if (tru === 0) throw new Error("Không đủ xu");

  await exec(
    db,
    `insert into user_inventories (user_id, asset_id) values (?, ?)
     on conflict (user_id, asset_id) do nothing`,
    actor,
    asset.id
  );

  const con = await one<{ coins: number }>(db, `select coins from user_profiles where id = ?`, actor);
  return { asset_key: assetKey, coins_left: con?.coins ?? 0 };
}

/** `toggle_chat_message_reaction(p_message_id, p_emoji)`.
 *
 *  Bản gốc đọc `exists(...)` rồi mới chọn `delete` hay `insert`. Đó là khoảng
 *  hở kinh điển: hai lần bấm gần nhau đều thấy "chưa có" rồi cùng chèn.
 *
 *  Viết lại theo cách (a) - KHÔNG đọc trước:
 *    1. `delete ... where <đúng bộ ba>` và xem `changes`.
 *    2. `changes === 0` nghĩa là chưa có → chèn.
 *  Một lệnh quyết định, không có trạng thái trung gian nào để hai luồng cùng
 *  nhìn thấy. Kết quả cuối giống hệt bản gốc.
 *
 *  Ba lần gác trước đó phải giữ: chưa đăng nhập → ném; tin không tồn tại → ném;
 *  không phải chủ hộp thoại → ném. Cái thứ ba là phân quyền thật.
 */
export async function toggleChatMessageReaction(
  db: D1Like,
  actor: string,
  messageId: number,
  emoji: string
): Promise<{ message_id: number; emoji: string; user_ids: string[] }[]> {
  if (!actor) throw new NotAuthenticatedError();
  const msg = await one<{ user_id: string }>(
    db,
    `select user_id from chat_messages where id = ?`,
    messageId
  );
  if (!msg) throw new Error("Message not found");
  if (msg.user_id !== actor) throw new Error("Not authorized");

  const daXoa = await exec(
    db,
    `delete from chat_message_reactions where message_id = ? and user_id = ? and emoji = ?`,
    messageId,
    actor,
    emoji
  );
  if (daXoa === 0) {
    await exec(
      db,
      `insert into chat_message_reactions (message_id, user_id, emoji) values (?, ?, ?)
       on conflict (message_id, user_id, emoji) do nothing`,
      messageId,
      actor,
      emoji
    );
  }
  return getChatMessageReactions(db, actor, msg.user_id);
}

/** `toggle_study_room_message_reaction(p_message_id, p_emoji)` - cùng khuôn mẫu,
 *  khác ở chỗ gác: phải là thành viên ĐANG hoạt động của phòng chứa tin nhắn. */
export async function toggleStudyRoomMessageReaction(
  db: D1Like,
  actor: string,
  messageId: number,
  emoji: string
): Promise<{ message_id: number; emoji: string; user_ids: string[] }[]> {
  if (!actor) throw new NotAuthenticatedError();
  const msg = await one<{ room_id: number }>(
    db,
    `select room_id from study_room_messages where id = ?`,
    messageId
  );
  if (!msg) throw new Error("Message not found");
  if (!(await isActiveRoomMember(db, actor, msg.room_id))) throw new Error("Not a room member");

  const daXoa = await exec(
    db,
    `delete from study_room_message_reactions where message_id = ? and user_id = ? and emoji = ?`,
    messageId,
    actor,
    emoji
  );
  if (daXoa === 0) {
    await exec(
      db,
      `insert into study_room_message_reactions (message_id, user_id, emoji) values (?, ?, ?)
       on conflict (message_id, user_id, emoji) do nothing`,
      messageId,
      actor,
      emoji
    );
  }
  return getStudyRoomReactions(db, actor, msg.room_id);
}

/** `record_quiz_mistake(p_lesson_id, p_question_index, p_correct, p_question_hash)`.
 *
 *  Không có khoảng hở nào cần vá: cả hai nhánh là MỘT lệnh.
 *  - Đúng → `update ... set resolved = 1`.
 *  - Sai  → `insert ... on conflict do update set wrong_count = wrong_count + 1`.
 *
 *  `coalesce(excluded.question_hash, quiz_mistakes.question_hash)` giữ nguyên
 *  chiều: lần trả lời mới nhất mới khớp nội dung câu hỏi hiện tại. Đảo chiều
 *  thì một hàng cũ mãi mãi mang dấu vân tay của phiên bản đã bị thay.
 */
export async function recordQuizMistake(
  db: D1Like,
  actor: string,
  lessonId: number,
  questionIndex: number,
  correct: boolean,
  questionHash?: string | null
): Promise<void> {
  if (!actor) throw new NotAuthenticatedError();
  if (correct) {
    await exec(
      db,
      `update quiz_mistakes set resolved = 1, last_attempt_at = datetime('now')
        where user_id = ? and lesson_id = ? and question_index = ?`,
      actor,
      lessonId,
      questionIndex
    );
    return;
  }
  await exec(
    db,
    `insert into quiz_mistakes
       (user_id, lesson_id, question_index, wrong_count, resolved,
        first_wrong_at, last_attempt_at, question_hash)
     values (?, ?, ?, 1, 0, datetime('now'), datetime('now'), ?)
     on conflict (user_id, lesson_id, question_index) do update set
       wrong_count = quiz_mistakes.wrong_count + 1,
       resolved = 0,
       last_attempt_at = datetime('now'),
       question_hash = coalesce(excluded.question_hash, quiz_mistakes.question_hash)`,
    actor,
    lessonId,
    questionIndex,
    questionHash ?? null
  );
}

/** `join_study_room(p_room_id)`.
 *
 *  Bản gốc đếm thành viên rồi mới chèn - khoảng hở cho hai người cùng vào
 *  phòng cuối cùng còn một chỗ. Ở đây gộp điều kiện vào chính lệnh chèn:
 *  `insert ... select ... where (đếm) < max_members`. Nếu phòng vừa đầy thì
 *  `changes === 0` và ta ném đúng lỗi cũ.
 *
 *  Thứ tự hai lệnh ghi giữ nguyên: rời phòng cũ TRƯỚC rồi mới vào phòng mới.
 *  Đảo lại thì có khoảnh khắc người dùng ở hai phòng cùng lúc, và
 *  `study_room_members_one_active_idx` sẽ chặn lệnh thứ hai. */
export async function joinStudyRoom(db: D1Like, actor: string, roomId: number): Promise<void> {
  if (!actor) throw new NotAuthenticatedError();
  const room = await one<{ max_members: number }>(
    db,
    `select max_members from study_rooms where id = ?`,
    roomId
  );
  if (!room) throw new Error("Room not found");

  await exec(
    db,
    `update study_room_members set left_at = datetime('now')
      where user_id = ? and left_at is null`,
    actor
  );

  const vao = await exec(
    db,
    `insert into study_room_members (room_id, user_id)
     select ?1, ?2
      where (select count(*) from study_room_members
              where room_id = ?1 and left_at is null) < ?3`,
    roomId,
    actor,
    room.max_members
  );
  if (vao === 0) throw new Error("Room is full");
}

/** `join_or_create_study_room(p_topic)`.
 *
 *  Ba lệnh ghi và một lần đọc ở giữa quyết định có tạo phòng mới hay không -
 *  đúng hình dạng mà `batch()` KHÔNG giải quyết được. Chấp nhận một chạy đua
 *  lành tính: hai người cùng lúc thấy "không còn phòng trống" thì tạo hai
 *  phòng thay vì một. Bản gốc trên Postgres cũng vậy (không có khoá nào ở đây),
 *  nên đây là hành vi giữ nguyên chứ không phải hồi quy.
 *
 *  Cái KHÔNG được lỏng: bước chèn thành viên vẫn phải kiểm sức chứa, nếu không
 *  hai người có thể cùng lấy chỗ cuối của một phòng đã có sẵn. */
export async function joinOrCreateStudyRoom(
  db: D1Like,
  actor: string,
  topic: string
): Promise<number> {
  if (!actor) throw new NotAuthenticatedError();
  if (!["personal", "professional", "cfa"].includes(topic)) throw new Error("Invalid topic");

  await exec(
    db,
    `update study_room_members set left_at = datetime('now')
      where user_id = ? and left_at is null`,
    actor
  );

  for (let thu = 0; thu < 3; thu++) {
    const con = await one<{ id: number; max_members: number }>(
      db,
      `select r.id, r.max_members from study_rooms r
        where r.topic = ?
          and (select count(*) from study_room_members m
                where m.room_id = r.id and m.left_at is null) < r.max_members
        order by r.created_at asc limit 1`,
      topic
    );

    if (con) {
      const vao = await exec(
        db,
        `insert into study_room_members (room_id, user_id)
         select ?1, ?2
          where (select count(*) from study_room_members
                  where room_id = ?1 and left_at is null) < ?3`,
        con.id,
        actor,
        con.max_members
      );
      // Phòng vừa đầy do người khác vào trước: thử phòng kế tiếp thay vì ném.
      if (vao > 0) return con.id;
      continue;
    }

    await exec(db, `insert into study_rooms (topic) values (?)`, topic);
    const moi = await one<{ id: number }>(
      db,
      `select id from study_rooms where topic = ? order by id desc limit 1`,
      topic
    );
    if (!moi) throw new Error("Không tạo được phòng");
    await exec(
      db,
      `insert into study_room_members (room_id, user_id) values (?, ?)`,
      moi.id,
      actor
    );
    return moi.id;
  }
  throw new Error("Room is full");
}

/** `apply_world_boss_damage(p_boss_id, p_score)`.
 *
 *  Sát thương do MÁY CHỦ tính: điểm bị kẹp trong [0,15] rồi mới nhân 6000, nên
 *  một client sửa điểm thành 9999 cũng chỉ gây sát thương của trận hoàn hảo.
 *  Giữ nguyên phép kẹp - đây là lớp chống gian lận, không phải kiểm hình thức.
 *
 *  `update ... where is_active` rồi kiểm `changes`: không có boss nào đang hoạt
 *  động thì `changes === 0` và ta ném, đúng như bản gốc kiểm `boss_id is null`. */
export async function applyWorldBossDamage(
  db: D1Like,
  actor: string,
  bossId: string,
  score: number
): Promise<{ boss_id: string; current_hp: number; max_hp: number; damage_applied: number }> {
  if (!actor) throw new NotAuthenticatedError();
  const diem = Math.min(Math.max(Math.trunc(Number(score)) || 0, 0), 15);
  const damage = diem * 6000;
  if (damage <= 0) throw new Error("Không có sát thương nào để ghi");

  const danh = await exec(
    db,
    `update world_bosses set current_hp = max(0, current_hp - ?)
      where id = ? and is_active = 1`,
    damage,
    bossId
  );
  if (danh === 0) throw new Error("Không tìm thấy world boss đang hoạt động");

  await exec(
    db,
    `insert into world_boss_damage_logs (boss_id, user_id, damage_dealt, score)
     values (?, ?, ?, ?)`,
    bossId,
    actor,
    damage,
    diem
  );

  const b = await one<{ current_hp: number; max_hp: number }>(
    db,
    `select current_hp, max_hp from world_bosses where id = ?`,
    bossId
  );
  return {
    boss_id: bossId,
    current_hp: b?.current_hp ?? 0,
    max_hp: b?.max_hp ?? 0,
    damage_applied: damage,
  };
}

/** `set_study_room_pomodoro(...)` - upsert một dòng theo `room_id`.
 *  Một lệnh duy nhất nên không có chạy đua; hai người cùng bấm thì người sau
 *  thắng, y như bản gốc. `greatest/least` → `max/min`. */
export async function setStudyRoomPomodoro(
  db: D1Like,
  actor: string,
  roomId: number,
  mode: "focus" | "break",
  isRunning: boolean,
  durationSeconds: number,
  remainingSeconds: number
): Promise<Record<string, unknown> | null> {
  if (!actor) throw new NotAuthenticatedError();
  if (mode !== "focus" && mode !== "break") throw new Error("Invalid mode");
  if (!(await isActiveRoomMember(db, actor, roomId))) throw new Error("Not a room member");

  await exec(
    db,
    `insert into study_room_pomodoro
       (room_id, mode, is_running, duration_seconds, remaining_seconds,
        started_at, updated_by, updated_at)
     values (?1, ?2, ?3, max(60, min(7200, ?4)), max(0, min(7200, ?5)),
             case when ?3 = 1 then datetime('now') else null end, ?6, datetime('now'))
     on conflict (room_id) do update set
       mode = excluded.mode,
       is_running = excluded.is_running,
       duration_seconds = excluded.duration_seconds,
       remaining_seconds = excluded.remaining_seconds,
       started_at = excluded.started_at,
       updated_by = excluded.updated_by,
       updated_at = datetime('now')`,
    roomId,
    mode,
    isRunning ? 1 : 0,
    Math.trunc(Number(durationSeconds)) || 0,
    Math.trunc(Number(remainingSeconds)) || 0,
    actor
  );
  return one(db, `select * from study_room_pomodoro where room_id = ?`, roomId);
}

/** `claim_study_room_weekly_reward(p_room_id)` - hàm nhiều lệnh ghi nhất còn lại.
 *
 *  CHỐNG NHẬN HAI LẦN nằm ở `insert ... on conflict (room_id, week_start) do
 *  nothing` rồi kiểm `not found`. Đây đúng là cách (a): việc "giành quyền nhận"
 *  và việc "kiểm tra đã nhận chưa" là CÙNG MỘT lệnh, nên hai thành viên bấm
 *  cùng lúc chỉ một người thắng. Giữ nguyên thứ tự này; đọc trước rồi mới chèn
 *  là mở đúng lỗ mà bản gốc đã tránh.
 *
 *  Phần thưởng cho từng thành viên gói vào `batch()`: chúng không phụ thuộc kết
 *  quả của nhau, và gói lại thì không có ai nhận nửa chừng. */
export async function claimStudyRoomWeeklyReward(
  db: D1Like,
  actor: string,
  roomId: number
): Promise<{
  ok: boolean;
  /** Mã để client tra từ điển. `message` ở lại làm bản dự phòng cho client cũ
   *  và cho đường Supabase, vốn trả về đúng cùng hình dạng này. */
  code: "missions_incomplete" | "already_claimed" | "chest_opened";
  message: string;
  streak_weeks: number;
  is_permanent: boolean;
}> {
  if (!actor) throw new NotAuthenticatedError();
  if (!(await isActiveRoomMember(db, actor, roomId))) throw new Error("Not a room member");

  const phong = async () =>
    (await one<{ streak_weeks: number; is_permanent: number }>(
      db,
      `select streak_weeks, is_permanent from study_rooms where id = ?`,
      roomId
    )) ?? { streak_weeks: 0, is_permanent: 0 };

  const nhiemVu = await getStudyRoomMissionStatus(db, actor, roomId);
  const chuaXong = nhiemVu.filter((m) => !m.completed).length;
  if (chuaXong > 0) {
    const r = await phong();
    return {
      ok: false,
      code: "missions_incomplete",
      message: "Nhóm chưa hoàn thành đủ 3 nhiệm vụ tuần.",
      streak_weeks: r.streak_weeks,
      is_permanent: Boolean(r.is_permanent),
    };
  }

  const gianh = await exec(
    db,
    `insert into study_room_reward_claims (room_id, week_start, claimed_by)
     values (?, ${WEEK_START}, ?)
     on conflict (room_id, week_start) do nothing`,
    roomId,
    actor
  );
  if (gianh === 0) {
    const r = await phong();
    return {
      ok: false,
      code: "already_claimed",
      message: "Tuần này nhóm đã nhận thưởng rồi.",
      streak_weeks: r.streak_weeks,
      is_permanent: Boolean(r.is_permanent),
    };
  }

  await exec(
    db,
    `update study_rooms
        set streak_weeks = streak_weeks + 1,
            is_permanent = case when streak_weeks + 1 >= 3 then 1 else 0 end
      where id = ?`,
    roomId
  );

  const thanhVien = await rows<{ user_id: string }>(
    db,
    `select user_id from study_room_members where room_id = ? and left_at is null`,
    roomId
  );
  const lenh = thanhVien.flatMap((m) => [
    db.prepare(`update user_profiles set coins = coalesce(coins, 0) + 25 where id = ?`).bind(m.user_id),
    db.prepare(`insert into user_chests (user_id, source) values (?, 'study_group')`).bind(m.user_id),
  ]);
  if (typeof db.batch === "function" && lenh.length) await db.batch(lenh as never[]);
  else for (const st of lenh) await (st as { run?: () => Promise<unknown>; all(): Promise<unknown> }).run?.();

  const r = await phong();
  return {
    ok: true,
    code: "chest_opened",
    message: "Đã mở rương nhóm: mỗi thành viên nhận +25 coin và 1 rương.",
    streak_weeks: r.streak_weeks,
    is_permanent: Boolean(r.is_permanent),
  };
}

/** CTE tính lại toàn bộ chỉ số của mọi người, dùng bởi `adminResyncAllUserStats`.
 *
 *  Ba chỗ đã đổi so với bản gốc:
 *   - `distinct on (user_id, game_type)` → `row_number()` (xem bẫy 6).
 *   - `avg(quiz_score) filter (where ...)` → `avg(...)` bỏ qua NULL sẵn trong
 *     SQLite, nên `filter` là thừa; giữ `case when` cho rõ ý.
 *   - `floor(total_xp / 150)` → `/ 150.0` rồi mới `cast(... as integer)`. Chia
 *     nguyên ở đây tình cờ cho cùng kết quả với `floor`, nhưng viết thập phân
 *     thì ý định rõ ràng và không phụ thuộc vào sự trùng hợp ấy. */
const RESYNC_COMPUTED = `with lesson_agg as (
     select user_id, count(*) as lessons_completed,
            avg(case when quiz_score is not null then quiz_score end) as avg_quiz_score
       from user_progress where completed = 1 group by user_id
   ),
   quiz_agg as (
     select user_id, coalesce(sum(xp_earned), 0) as quiz_xp
       from user_quiz_sessions group by user_id
   ),
   game_ranked as (
     select user_id, game_type, xp_earned,
            row_number() over (partition by user_id, game_type
                               order by xp_earned desc, created_at asc) as rn
       from game_sessions
   ),
   game_agg as (
     select user_id, coalesce(sum(xp_earned), 0) as game_xp
       from game_ranked where rn = 1 group by user_id
   ),
   referral_agg as (
     select user_id, coalesce(sum(bonus), 0) as referral_xp from (
       select referrer_id as user_id, 50 as bonus from referrals where status = 'rewarded'
       union all
       select referred_id as user_id, 30 as bonus from referrals where status = 'rewarded'
     ) x group by user_id
   ),
   computed as (
     select prof.id as user_id,
            coalesce(la.lessons_completed, 0) as lessons_completed,
            coalesce(la.avg_quiz_score, 0) as avg_quiz_score,
            coalesce(la.lessons_completed, 0) * 10
              + coalesce(qa.quiz_xp, 0)
              + coalesce(ga.game_xp, 0)
              + coalesce(ra.referral_xp, 0) as total_xp
       from user_profiles prof
       left join lesson_agg la on la.user_id = prof.id
       left join quiz_agg qa on qa.user_id = prof.id
       left join game_agg ga on ga.user_id = prof.id
       left join referral_agg ra on ra.user_id = prof.id
   )`;

/** `admin_resync_all_user_stats()`.
 *
 *  Bốn lệnh ghi, và THỨ TỰ là một phần của tính đúng đắn: đổi trạng thái lượt
 *  giới thiệu TRƯỚC, vì XP của mọi người phụ thuộc vào nó. Đảo lại là một đợt
 *  đồng bộ tính thiếu điểm giới thiệu vừa được duyệt.
 *
 *  `update ... from computed` (cú pháp UPDATE-FROM của Postgres) không có trong
 *  SQLite; thay bằng truy vấn con tương quan. Điều kiện `is distinct from` giữ
 *  nguyên - nó khiến lệnh chỉ chạm những hàng THẬT SỰ đổi, nên `changes` trả về
 *  đúng số người bị ảnh hưởng chứ không phải toàn bộ bảng. */
export async function adminResyncAllUserStats(db: D1Like): Promise<number> {
  await exec(
    db,
    `update referrals set status = 'rewarded', rewarded_at = datetime('now')
      where status = 'pending'
        and exists (select 1 from user_progress up
                     where up.user_id = referrals.referred_id and up.completed = 1)`
  );

  const affected = await exec(
    db,
    `${RESYNC_COMPUTED}
     update user_profiles set
       lessons_completed = (select c.lessons_completed from computed c where c.user_id = user_profiles.id),
       total_xp          = (select c.total_xp from computed c where c.user_id = user_profiles.id),
       current_level     = (select cast(c.total_xp / 150.0 as integer) + 1 from computed c where c.user_id = user_profiles.id),
       avg_quiz_score    = (select round(c.avg_quiz_score, 2) from computed c where c.user_id = user_profiles.id)
     where exists (
       select 1 from computed c where c.user_id = user_profiles.id and (
            coalesce(user_profiles.lessons_completed, -1) <> c.lessons_completed
         or coalesce(user_profiles.total_xp, -1) <> c.total_xp
         or coalesce(user_profiles.current_level, -1) <> cast(c.total_xp / 150.0 as integer) + 1
       ))`
  );

  await exec(
    db,
    `${RESYNC_COMPUTED}
     insert into user_stats (user_id, total_lessons_completed, total_xp, current_level, avg_quiz_score)
     select c.user_id, c.lessons_completed, c.total_xp,
            cast(c.total_xp / 150.0 as integer) + 1, round(c.avg_quiz_score, 2)
       from computed c
      where true
     on conflict (user_id) do update set
       total_lessons_completed = excluded.total_lessons_completed,
       total_xp = excluded.total_xp,
       current_level = excluded.current_level,
       avg_quiz_score = excluded.avg_quiz_score`
  );

  return affected;
}

/* i18n-ignore-start: năm câu này được GHI VÀO study_room_messages.content và ở
   lại đó vĩnh viễn. Dịch chúng làm mồ côi lịch sử chat đã lưu - phòng nào cũng
   thành nửa Việt nửa Anh - và hàm này chạy theo lịch nên không có locale của
   người đọc nào để mà chọn. Cùng hình dạng với REACTION_OPTIONS và
   ASSET_STORAGE_KEYS trong AGENTS.md: giá trị đã persist thì không phải copy. */
/** Câu bot gửi vào phòng, chép nguyên văn từ `weekly_rematch_study_rooms`. */
const BOT = {
  vinhVienChaoTuan:
    "Chào cả nhóm! Tuần mới lại bắt đầu. Nhóm của chúng ta đã đạt trạng thái Vĩnh Viễn, hãy tiếp tục đồng hành và học tập cùng nhau nhé! 🚀",
  lenVinhVien:
    "Chúc mừng nhóm! 🎉 Nhóm đã xuất sắc đạt chỉ tiêu tuần qua (trung bình >= 3 bài học/thành viên) trong 3 tuần liên tiếp! Từ nay, nhóm của chúng ta được nâng cấp thành **Nhóm Vĩnh Viễn**, sẽ duy trì mãi mãi và không bị xếp lại nữa!",
  datChiTieu: (tb: string, lienTiep: number) =>
    `Chúc mừng nhóm! 🎉 Nhóm đã đạt chỉ tiêu tuần qua (trung bình ${tb} bài học/thành viên, yêu cầu >= 3). Nhóm sẽ tiếp tục được duy trì vào tuần tới! Số tuần đạt chỉ tiêu liên tiếp hiện tại: ${lienTiep}/3 tuần.`,
  giaiTan: (tb: string) =>
    `Rất tiếc! 💔 Tuần vừa qua nhóm chỉ đạt trung bình ${tb} bài học/thành viên, không đủ chỉ tiêu tối thiểu là 3 bài/thành viên. Nhóm của chúng ta sẽ bị giải tán. Hãy cố gắng học tập đều đặn hơn ở các nhóm mới nhé! Tạm biệt mọi người!`,
  gioiThieu: (danhSach: string) =>
    `Chào mọi người! Mình là Tài Tài 👋 Đây là nhóm học chung tuần này của các bạn: ${danhSach}. Chỉ tiêu của nhóm: mỗi thành viên học trung bình ít nhất 3 bài/tuần. Nếu đạt chỉ tiêu, nhóm sẽ tiếp tục duy trì vào tuần sau. Nếu không đạt, nhóm sẽ bị giải tán vào cuối tuần. Đặc biệt, nếu đạt chỉ tiêu liên tiếp 3 tuần, nhóm sẽ được duy trì Vĩnh Viễn!`,
};
/* i18n-ignore-end */

/** `weekly_rematch_study_rooms()` - hàm dài nhất trong 53 hàm (185 dòng, 10 lệnh ghi).
 *
 *  ĐÂY LÀ VIỆC CHẠY THEO LỊCH, không nằm trên đường phục vụ yêu cầu. Nên nó
 *  KHÔNG cần nguyên tử toàn phần: chạy lại được, và nếu đứt giữa chừng thì lần
 *  chạy sau dọn nốt. Vì thế vòng lặp `for ... loop` của plpgsql chuyển thẳng
 *  thành vòng lặp TypeScript thay vì phải nhồi vào một câu SQL.
 *
 *  Ba chỗ Postgres không có trong SQLite, đã đổi:
 *   - `array_agg(uid order by random())` → xáo trộn ở TypeScript. `random()`
 *     của SQLite có tồn tại nhưng xáo ở đây thì kiểm thử được (truyền hàm xáo
 *     vào), còn xáo trong SQL thì không.
 *   - `string_agg(... order by full_name)` → gom ở TypeScript.
 *   - `unnest(array[...])` → mảng thường.
 *
 *  `now() - interval '7 days'` → `datetime('now','-7 days')`.
 */
export async function weeklyRematchStudyRooms(
  db: D1Like,
  xao: <T>(a: T[]) => T[] = (a) => a
): Promise<{ rooms_created: number; users_matched: number }> {
  let rooms_created = 0;
  let users_matched = 0;

  // 1. Đánh giá các phòng đang có TRƯỚC khi giải tán hay xếp lại.
  const phongs = await rows<{
    id: number; topic: string; consecutive_weeks_hit: number; is_permanent: number;
  }>(db, `select id, topic, consecutive_weeks_hit, is_permanent from study_rooms`);

  for (const p of phongs) {
    const dem = await one<{ c: number }>(
      db,
      `select count(*) as c from study_room_members where room_id = ? and left_at is null`,
      p.id
    );
    const soThanhVien = dem?.c ?? 0;
    if (soThanhVien === 0) continue;

    if (p.is_permanent) {
      await exec(
        db,
        `insert into study_room_messages (room_id, sender_id, is_bot, content) values (?, null, 1, ?)`,
        p.id,
        BOT.vinhVienChaoTuan
      );
      continue;
    }

    const hoc = await one<{ c: number }>(
      db,
      `select count(*) as c from user_progress up
        where up.completed = 1
          and datetime(up.completed_at) >= datetime('now', '-7 days')
          and up.user_id in (select user_id from study_room_members
                              where room_id = ? and left_at is null)`,
      p.id
    );
    const trungBinh = (hoc?.c ?? 0) / soThanhVien;
    const tb = trungBinh.toFixed(1);

    if (trungBinh >= 3.0) {
      const lienTiep = (p.consecutive_weeks_hit ?? 0) + 1;
      const vinhVien = lienTiep >= 3;
      await exec(
        db,
        `update study_rooms set consecutive_weeks_hit = ?, is_permanent = ? where id = ?`,
        lienTiep,
        vinhVien ? 1 : 0,
        p.id
      );
      await exec(
        db,
        `insert into study_room_messages (room_id, sender_id, is_bot, is_pinned, content)
         values (?, null, 1, ?, ?)`,
        p.id,
        vinhVien ? 1 : 0,
        vinhVien ? BOT.lenVinhVien : BOT.datChiTieu(tb, lienTiep)
      );
    } else {
      await exec(
        db,
        `insert into study_room_messages (room_id, sender_id, is_bot, content) values (?, null, 1, ?)`,
        p.id,
        BOT.giaiTan(tb)
      );
      await exec(
        db,
        `update study_room_members set left_at = datetime('now')
          where room_id = ? and left_at is null`,
        p.id
      );
    }
  }

  // 2. Xoá phòng rỗng và không vĩnh viễn.
  //
  //    Bản gốc chỉ có MỘT lệnh `delete from study_rooms` và dựa vào
  //    `on delete cascade` để dọn tin nhắn với thành viên. Lược đồ D1 có 0
  //    mệnh đề ON DELETE (bản chụp PostgREST không lấy được chúng, trong khi
  //    migration Supabase có 111 chỗ), nên lệnh xoá thẳng sẽ đụng khoá ngoại.
  //    Xoá tường minh theo thứ tự phụ thuộc - đúng dù lược đồ có cascade hay
  //    không, nên không phải sửa lại khi cascade được bổ sung.
  const boDi = (
    await rows<{ id: number }>(
      db,
      `select id from study_rooms
        where coalesce(is_permanent, 0) = 0
          and not exists (select 1 from study_room_members m
                           where m.room_id = study_rooms.id and m.left_at is null)`
    )
  ).map((r) => r.id);

  for (const id of boDi) {
    await exec(db, `delete from study_room_message_reactions
                     where message_id in (select id from study_room_messages where room_id = ?)`, id);
    for (const t of ["study_room_messages", "study_room_members", "study_room_checkins",
                     "study_room_quiz_attempts", "study_room_reward_claims", "study_room_pomodoro"]) {
      await exec(db, `delete from ${t} where room_id = ?`, id);
    }
    await exec(db, `delete from study_rooms where id = ?`, id);
  }

  // 3. Xếp lại những người còn hoạt động mà chưa ở phòng nào.
  for (const topic of ["personal", "professional"]) {
    const ids = (
      await rows<{ user_id: string }>(
        db,
        `select distinct up.user_id
           from user_progress up
           join user_profiles prof on prof.id = up.user_id
          where up.completed = 1
            and datetime(up.completed_at) >= datetime('now', '-7 days')
            and coalesce(prof.is_disabled, 0) = 0
            and not exists (select 1 from study_room_members m
                             where m.user_id = up.user_id and m.left_at is null)
            and ((?1 = 'personal' and coalesce(prof.preferred_track, 'personal') = 'personal')
              or (?1 = 'professional' and prof.preferred_track = 'professional'))
          order by up.user_id`,
        topic
      )
    ).map((r) => r.user_id);
    if (!ids.length) continue;

    const daXao = xao(ids);
    for (let i = 0; i < daXao.length; i += 5) {
      const nhom = daXao.slice(i, i + 5);

      await exec(db, `insert into study_rooms (topic) values (?)`, topic);
      const moi = await one<{ id: number }>(
        db,
        `select id from study_rooms where topic = ? order by id desc limit 1`,
        topic
      );
      if (!moi) continue;
      rooms_created++;

      for (const u of nhom) {
        await exec(
          db,
          `insert into study_room_members (room_id, user_id) values (?, ?)`,
          moi.id,
          u
        );
      }
      users_matched += nhom.length;

      const cho = nhom.map(() => "?").join(",");
      const tomTat = await rows<{ ten: string; cnt: number }>(
        db,
        `select ${DISPLAY_NAME} as ten,
                (select count(*) from user_progress p
                  where p.user_id = prof.id and p.completed = 1
                    and datetime(p.completed_at) >= datetime('now', '-7 days')) as cnt
           from user_profiles prof
          where prof.id in (${cho})
          order by prof.full_name`,
        ...nhom
      );
      /* i18n-ignore-start: mảnh này ghép thẳng vào BOT.gioiThieu ở trên và đi
         cùng nó vào study_room_messages.content - cùng một lý do. */
      const danhSach = tomTat.map((t) => `${t.ten} (${t.cnt ?? 0} bài tuần này)`).join(", ");
      /* i18n-ignore-end */

      await exec(
        db,
        `insert into study_room_messages (room_id, sender_id, is_bot, is_pinned, content)
         values (?, null, 1, 1, ?)`,
        moi.id,
        BOT.gioiThieu(danhSach)
      );
    }
  }

  return { rooms_created, users_matched };
}

export interface LessonSyncRow {
  id: number; slug: string; title: string; subtitle?: string | null;
  duration?: string | null; difficulty?: string | null; emoji?: string | null;
  opening_question?: string | null; opening_options?: unknown;
  correct_option?: number | null; explanation?: string | null;
  key_takeaways?: unknown; track?: string | null; status?: string | null;
  stage_number?: number | null; day_number?: number | null;
}

/** `sync_lessons_atomic(p_lessons jsonb)` - hàm cuối của cả 53.
 *
 *  ĐÂY LÀ HÀM DUY NHẤT THẬT SỰ CẦN MỘT TRANSACTION. Nó kết thúc bằng
 *  `delete from lessons where not exists (... trong payload)`, và hai bảng
 *  cascade theo `lessons(id)` là DỮ LIỆU NGƯỜI HỌC:
 *  `lesson_unlock_requests` và `user_lesson_unlocks`.
 *
 *  Nếu tiến trình đứt giữa chừng mà không có transaction, ta có thể xoá xong
 *  rồi chưa chèn lại - mất bài học kèm dữ liệu mở khoá của mọi người. Vì thế
 *  TOÀN BỘ chuỗi lệnh đi qua `batch()`, và nếu môi trường không có `batch`
 *  thì hàm TỪ CHỐI CHẠY thay vì chạy nửa vời.
 *
 *  Hai phép kiểm đầu vào của bản gốc giữ nguyên - chúng chặn một payload hỏng
 *  xoá sạch bảng: trùng `id` và trùng `slug` đều ném trước khi ghi bất cứ gì.
 *
 *  Bước đổi tên slug tạm cũng giữ: một slug đang thuộc id cũ mà payload gán
 *  cho id mới sẽ đụng ràng buộc duy nhất, nên bản gốc đổi nó thành
 *  `__sync_tmp__<id>__<ngẫu nhiên>` trước khi chèn.
 */
export async function syncLessonsAtomic(db: D1Like, lessons: LessonSyncRow[]): Promise<number> {
  if (!Array.isArray(lessons)) throw new Error("p_lessons must be a JSON array");
  if (typeof db.batch !== "function") {
    throw new Error(
      "syncLessonsAtomic cần batch(): hàm này XOÁ các bài không có trong payload, " +
        "và hai bảng dữ liệu người học cascade theo lessons(id)."
    );
  }

  const ids = new Set<number>();
  const slugs = new Set<string>();
  for (const l of lessons) {
    if (ids.has(l.id)) throw new Error("Payload contains duplicate lesson ids");
    if (slugs.has(l.slug)) throw new Error("Payload contains duplicate lesson slugs");
    ids.add(l.id);
    slugs.add(l.slug);
  }

  const json = (v: unknown) =>
    v == null ? null : typeof v === "string" ? v : JSON.stringify(v);

  // Bản gốc có `coalesce(x.track, 'professional')`. KHÔNG chép mặc định ấy:
  // đúng nó đã gây ra một lỗi sống nhiều tháng - giao diện mặc định
  // `|| "personal"` còn đường ghi mặc định `|| "professional"`, nên cùng một
  // bài hiện ra một track và được lưu bằng track khác. Xem
  // lib/__tests__/lesson-track-required.test.ts. Giờ mọi bài đều tự khai track,
  // nên thiếu track là lỗi dữ liệu và phải NÉM chứ không lặng lẽ gán.
  const thieuTrack = lessons.filter((l) => !l.track).map((l) => `${l.id} ${l.slug}`);
  if (thieuTrack.length) {
    throw new Error(`Bài thiếu track, không tự gán mặc định: ${thieuTrack.slice(0, 5).join(", ")}`);
  }

  const stmts: unknown[] = [];

  // 1. Gỡ đụng độ slug: hàng nào đang giữ slug của payload nhưng khác id.
  for (const l of lessons) {
    stmts.push(
      db
        .prepare(
          `update lessons set slug = '__sync_tmp__' || id || '__' || hex(randomblob(5)),
                              updated_at = datetime('now')
            where slug = ? and id <> ?`
        )
        .bind(l.slug, l.id)
    );
  }

  // 2. Chèn hoặc cập nhật. `is_visible`, `is_fundamental`, `prerequisite_id`
  //    KHÔNG nằm trong payload nên không được đụng tới ở nhánh update.
  for (const l of lessons) {
    stmts.push(
      db
        .prepare(
          `insert into lessons
             (id, slug, title, subtitle, duration, difficulty, emoji, opening_question,
              opening_options, correct_option, explanation, key_takeaways, track, status,
              stage_number, day_number)
           values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
           on conflict (id) do update set
             slug = excluded.slug, title = excluded.title, subtitle = excluded.subtitle,
             duration = excluded.duration, difficulty = excluded.difficulty,
             emoji = excluded.emoji, opening_question = excluded.opening_question,
             opening_options = excluded.opening_options, correct_option = excluded.correct_option,
             explanation = excluded.explanation, key_takeaways = excluded.key_takeaways,
             track = excluded.track, status = excluded.status,
             stage_number = excluded.stage_number, day_number = excluded.day_number,
             updated_at = datetime('now')`
        )
        .bind(
          l.id, l.slug, l.title, l.subtitle ?? null, l.duration ?? null,
          l.difficulty ?? null, l.emoji ?? null, l.opening_question ?? null,
          json(l.opening_options), l.correct_option ?? null, l.explanation ?? null,
          json(l.key_takeaways), l.track, l.status ?? "published",
          l.stage_number ?? null, l.day_number ?? null
        )
    );
  }

  // 3. Xoá những bài không còn trong payload. Nằm CUỐI và trong cùng batch:
  //    nếu bước 2 hỏng thì bước này không bao giờ chạy.
  const cho = [...ids].map(() => "?").join(",");
  stmts.push(
    db.prepare(`delete from lessons where id not in (${cho})`).bind(...[...ids])
  );

  await db.batch(stmts as never[]);
  return lessons.length;
}
