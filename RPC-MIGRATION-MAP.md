# Bản đồ 53 hàm RPC Postgres → Cloudflare D1

Sinh bằng cách đọc 127 migration trong `supabase/migrations` + `sql-canchay`,
đối chiếu với 56 lời gọi `.rpc(...)` trong `app/`, `components/`, `lib/`.
Cả 53 hàm được gọi đều có định nghĩa trong repo — không phải đi hỏi Supabase.

Đây là đầu vào cho phase 4 (thay lớp truy cập dữ liệu). Đọc phần "Bốn vấn đề
cắt ngang" trước, vì chúng quyết định thứ tự làm chứ không phải danh sách hàm.

## Bốn vấn đề cắt ngang

**1. `auth.uid()` xuất hiện ở 32/53 hàm.** D1 không có khái niệm này. Mọi hàm
trong nhóm ấy phải nhận `userId` làm tham số, và giá trị đó do lớp phiên trên
Workers cấp. Nghĩa là **phase 4 không hoàn thành được trước phase 5** — ít nhất
phần "biết user hiện tại là ai" của auth phải xong trước.

**2. `SECURITY DEFINER` ở cả 53/53.** Đây không phải chi tiết cú pháp. Nó nghĩa
là toàn bộ 53 hàm đang cố ý đi vòng qua RLS, và RLS mới là thứ đang chặn user A
đọc/ghi dữ liệu của user B. **D1 không có RLS.** Khi chuyển sang D1, tấm lưới
biến mất, còn 53 cái lỗ thì vẫn còn — nên mỗi hàm phải tự kiểm tra quyền trong
mã ứng dụng. Bỏ sót một chỗ là lỗ hổng phân quyền, không phải bug hiển thị.

**3. 11 trigger trong Supabase, 0 trong `migrations-d1/0001_schema.sql`.**
SQLite *có* trigger, nên phần lớn port được — nhưng không phải tất cả:

| Trigger | Việc nó làm | Port sang D1 |
|---|---|---|
| `user_progress_row_cap`, `user_milestone_exams_row_cap` | chặn spam số dòng | ✅ trigger SQLite + `RAISE(ABORT)` |
| `lesson_notes_updated_at`, `cfa_module_notes_updated_at` | tự cập nhật `updated_at` | ✅ trigger SQLite |
| `direct_messages_only_read_flag` | chỉ cho sửa cờ đã đọc | ✅ trigger SQLite |
| 4 trigger `*_notify` | sinh thông báo | ⚠️ nên chuyển sang Queues, đừng để trong DB |
| `guard_coins_on_user_profiles` | khoá cột `coins` | ❌ **không port được** |
| `on_auth_user_created` trên `auth.users` | tự tạo profile | ❌ **không port được** |

Hai cái cuối cần thiết kế mới, xem mục dưới.

**4. Kho tiền đang được bảo vệ bằng một cơ chế chỉ Postgres mới có.**
`supabase/migrations/20260914_lock_coins_column.sql` đặt trigger
`guard_coins_column()` từ chối mọi lệnh ghi vào `user_profiles.coins` trừ khi
biến phiên `app.coin_write` bằng `'on'`, và chỉ `grant_coins()` /
`purchase_cosmetic()` được bật cờ ấy qua `set_config(..., true)` — phạm vi
transaction. SQLite **không có** `current_setting`/`set_config` cũng không có
biến phạm vi transaction. Chuyển thẳng sang D1 là **âm thầm gỡ bỏ lớp bảo vệ
kinh tế trong game**. Thay thế khả dĩ: dồn mọi thay đổi `coins` qua đúng một
module trong `lib/db/`, cộng một bảng sổ cái ghi từng lần cộng/trừ để đối soát.

## Phân loại 53 hàm


## Nhóm A — chỉ đọc (dịch thẳng sang SELECT)  (33)
  get_chat_message_reactions  [16 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE
  get_community_contribution_leaderboard  [43 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE, CTE (WITH)
  get_community_feed  [70 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, jsonb/json, RETURNS TABLE
  get_community_learning_now  [58 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE, CTE (WITH)
  get_community_post_comments  [33 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE
  get_competency_leaderboard  [23 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE
  get_composite_leaderboard  [11 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE
  get_daily_active_users  [20 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE, generate_series, now()/interval
  get_dashboard_summary  [73 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, jsonb/json, EXCEPTION
  get_follow_counts  [11 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE
  get_friends_leaderboard  [34 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE, CTE (WITH)
  get_leaderboard  [50 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE
  get_lesson_state  [53 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, jsonb/json, EXCEPTION
  get_level_stats  [53 dòng, 0 lệnh ghi]  SECURITY DEFINER, jsonb/json, RETURNS TABLE
  get_my_community_contribution_rank  [43 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE, window function, CTE (WITH)
  get_my_competency_leaderboard_rank  [35 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE
  get_my_composite_rank  [26 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE, window function, CTE (WITH)
  get_my_leaderboard_rank  [111 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE
  get_my_social_graph  [46 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE
  get_my_study_room  [34 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE, now()/interval
  get_my_track_leaderboard_rank  [43 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE
  get_my_xp_rank_since  [65 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE, CTE (WITH)
  get_nav_state  [44 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, EXCEPTION
  get_study_room_members  [29 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE, now()/interval
  get_study_room_mission_status  [89 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE, CTE (WITH), now()/interval
  get_study_room_reactions  [21 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE
  get_study_rooms  [37 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE, now()/interval
  get_total_completed_lessons_count  [9 dòng, 0 lệnh ghi]  SECURITY DEFINER
  get_total_user_count  [9 dòng, 0 lệnh ghi]  SECURITY DEFINER
  get_track_leaderboard  [27 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE
  get_user_community_posts  [67 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, jsonb/json, RETURNS TABLE
  get_xp_leaderboard_since  [51 dòng, 0 lệnh ghi]  SECURITY DEFINER, RETURNS TABLE, CTE (WITH)
  search_accounts  [39 dòng, 0 lệnh ghi]  auth.uid(), SECURITY DEFINER, RETURNS TABLE

## Nhóm B — một lệnh ghi (port dễ)  (7)
  increment_document_download  [8 dòng, 1 lệnh ghi]  SECURITY DEFINER
  leave_study_room  [12 dòng, 1 lệnh ghi]  auth.uid(), SECURITY DEFINER, now()/interval
  mark_admin_chat_messages_seen  [18 dòng, 1 lệnh ghi]  auth.uid(), SECURITY DEFINER, EXCEPTION
  record_referral  [18 dòng, 1 lệnh ghi]  auth.uid(), SECURITY DEFINER, ON CONFLICT
  record_study_room_checkin  [24 dòng, 1 lệnh ghi]  auth.uid(), SECURITY DEFINER, ON CONFLICT, EXCEPTION
  record_study_room_quiz_attempt  [35 dòng, 1 lệnh ghi]  auth.uid(), SECURITY DEFINER, EXCEPTION
  reward_my_referral  [12 dòng, 1 lệnh ghi]  auth.uid(), SECURITY DEFINER, now()/interval

## Nhóm C — nhiều lệnh ghi, cần nguyên tử (viết lại)  (13)
  weekly_rematch_study_rooms  [185 dòng, 10 lệnh ghi]  SECURITY DEFINER, mảng/ARRAY, nhiều lệnh ghi, RETURNS TABLE, now()/interval
  sync_lessons_atomic  [178 dòng, 5 lệnh ghi]  SECURITY DEFINER, jsonb/json, ON CONFLICT, nhiều lệnh ghi, EXCEPTION, now()/interval
  admin_resync_all_user_stats  [114 dòng, 4 lệnh ghi]  SECURITY DEFINER, ON CONFLICT, nhiều lệnh ghi, CTE (WITH), now()/interval
  claim_study_room_weekly_reward  [65 dòng, 4 lệnh ghi]  auth.uid(), SECURITY DEFINER, ON CONFLICT, nhiều lệnh ghi, RETURNS TABLE, EXCEPTION, now()/interval
  join_or_create_study_room  [41 dòng, 3 lệnh ghi]  auth.uid(), SECURITY DEFINER, nhiều lệnh ghi, EXCEPTION, now()/interval
  record_quiz_mistake  [31 dòng, 3 lệnh ghi]  auth.uid(), SECURITY DEFINER, ON CONFLICT, nhiều lệnh ghi, now()/interval
  apply_world_boss_damage  [43 dòng, 2 lệnh ghi]  auth.uid(), SECURITY DEFINER, nhiều lệnh ghi, RETURNS TABLE, EXCEPTION
  grant_coins  [63 dòng, 2 lệnh ghi]  auth.uid(), SECURITY DEFINER, nhiều lệnh ghi, RETURNS TABLE, EXCEPTION
  join_study_room  [33 dòng, 2 lệnh ghi]  auth.uid(), SECURITY DEFINER, nhiều lệnh ghi, EXCEPTION, now()/interval
  purchase_cosmetic  [55 dòng, 2 lệnh ghi]  auth.uid(), SECURITY DEFINER, nhiều lệnh ghi, RETURNS TABLE, EXCEPTION
  set_study_room_pomodoro  [54 dòng, 2 lệnh ghi]  auth.uid(), SECURITY DEFINER, ON CONFLICT, nhiều lệnh ghi, EXCEPTION, now()/interval
  toggle_chat_message_reaction  [51 dòng, 2 lệnh ghi]  auth.uid(), SECURITY DEFINER, ON CONFLICT, nhiều lệnh ghi, RETURNS TABLE, EXCEPTION
  toggle_study_room_message_reaction  [50 dòng, 2 lệnh ghi]  auth.uid(), SECURITY DEFINER, ON CONFLICT, nhiều lệnh ghi, RETURNS TABLE, EXCEPTION

## Ghi chú theo nhóm

**Nhóm A (33 hàm).** Chủ yếu là bảng xếp hạng và truy vấn tổng hợp. SQLite có
CTE và window function nên 9 hàm dùng `WITH` và 2 hàm dùng `OVER()` port được.
Ba điểm phải sửa tay:
- `jsonb` ở 6 hàm → D1 có phần mở rộng JSON1, dùng `json_extract` / `json_object`, cú pháp khác `->>`.
- `generate_series` ở `get_daily_active_users` → SQLite không có, phải thay bằng CTE đệ quy.
- `now() - interval` ở 15 hàm → SQLite dùng `datetime('now','-7 days')`.

**Nhóm B (7 hàm).** Một lệnh ghi, không có trạng thái trung gian. `ON CONFLICT`
có trong SQLite nên upsert giữ nguyên được — **với điều kiện `0002_indexes.sql`
đã tạo đúng UNIQUE**, vì `ON CONFLICT` cần một ràng buộc duy nhất để bám vào.
Đây là chỗ thiếu index ở phase 2 biến thành lỗi dữ liệu chứ không chỉ chậm.

**Nhóm C (13 hàm).** Đây là phần đắt. Mỗi hàm là một chuỗi đọc → kiểm tra →
ghi nhiều bảng, đang dựa vào transaction của Postgres để không ai chen vào giữa.
D1 chỉ có `batch()` — một transaction ngầm, **không tương tác**: bạn không đọc
được kết quả rồi mới quyết ghi gì trong cùng transaction. Nên mỗi hàm phải viết
lại theo một trong hai cách:
- Gộp điều kiện vào chính lệnh ghi (`UPDATE ... WHERE coins >= price`) rồi kiểm tra số dòng bị ảnh hưởng — cách này đã dùng sẵn trong `purchase_cosmetic`, giữ được tính đúng.
- Hoặc đưa lên Durable Object nếu cần tuần tự hoá thật (`weekly_rematch_study_rooms`, `join_or_create_study_room`).

Ba hàm nặng nhất, nên làm cuối và làm riêng:
`weekly_rematch_study_rooms` (185 dòng, 10 lệnh ghi),
`sync_lessons_atomic` (178 dòng, 5 lệnh ghi),
`admin_resync_all_user_stats` (114 dòng, 4 lệnh ghi).

## Thứ tự đề nghị

1. Nhóm A trước — không đụng dữ liệu, sai thì chỉ hiển thị sai, và nó dựng xong khung `lib/db/`.
2. Nhóm B — sau khi `0002_indexes.sql` đã có UNIQUE.
3. Phần "ai là user hiện tại" của phase 5.
4. Nhóm C, mỗi hàm một lần, kèm bài kiểm cho trường hợp chạy song song.
5. Trigger: port 5 cái dễ sang SQLite, chuyển 4 cái thông báo sang Queues, thiết kế lại 2 cái không port được.

---

## Cập nhật sau khi bắt đầu dịch

**Đồ thị phụ thuộc nông.** Ngoài 53 hàm app gọi tới, chỉ có **1 hàm phụ trợ**
được gọi từ bên trong chúng: `composite_score_components()` (dùng bởi
`get_composite_leaderboard` và `get_my_composite_rank`). Tổng thật là 54, không
phải một cây sâu như lo ban đầu.

**Tham số mảng.** `get_competency_leaderboard(bigint[], int)` nhận một mảng id
bài học và dùng `lesson_id = any(p_lesson_ids)`. SQLite không có kiểu mảng, nên
phải sinh chuỗi `?,?,?…` theo số phần tử lúc chạy. Đây là hàm duy nhất trong 53
hàm có tham số mảng.

**Một lỗi có sẵn, không phải do di trú.** `get_track_leaderboard` và
`get_my_track_leaderboard_rank` mã hoá cứng dải id bài học để phân track:

```
personal     : lesson_id 1-20 hoặc 201-288
professional : lesson_id 21-200 hoặc 1036
```

Đo trên kho hiện tại thì các dải ấy chỉ phủ:

| track | được tính | bỏ sót |
|---|---|---|
| personal | 108/220 (49%) | 112 bài |
| professional | 181/323 (56%) | 142 bài |

Không bài nào bị tính nhầm sang track kia - chỉ là **khoảng một nửa số bài của
mỗi track không được tính vào bảng xếp hạng**, và điều đó đang đúng trên
Supabase lúc này. Bản dịch trong `lib/d1/rpc.ts` **chép nguyên dải cũ** kèm chú
thích: sửa nó làm đổi thứ hạng của mọi người, nên phải là một quyết định riêng
chứ không lẫn vào đợt di trú.

Kèm theo: **37 bài đang có `track` là `undefined`**, nên chúng không thuộc bảng
xếp hạng nào cả, kể cả sau khi sửa dải id.

## Tiến độ — XONG CẢ 53 HÀM

| | |
|---|---|
| Nhóm A — chỉ đọc | **33 / 33** |
| Nhóm B — một lệnh ghi | **7 / 7** |
| Nhóm C — cần nguyên tử | **13 / 13** |
| **Tổng** | **53 / 53** |

Mã ở `lib/d1/rpc.ts` (53 hàm xuất). Bộ kiểm ở `lib/d1/__tests__/rpc.test.ts`
(**74 phép kiểm**), chạy trên một BẢN SAO GHI ĐƯỢC của D1 local với 146.260
dòng thật, có áp `0002_unique_constraints.sql`. Mọi thay đổi nằm trong /tmp và
biến mất sau khi chạy, nên D1 local không bao giờ bị đụng.

## Hai khiếm khuyết của lược đồ, phát hiện bằng cách chạy thật

Cả hai đều do bản chụp PostgREST chỉ lấy được cột và kiểu:

**1. 15 bảng có khoá chính TEXT mà KHÔNG có giá trị mặc định.** Trên Postgres
chúng là `uuid default gen_random_uuid()`. Trong D1 chúng là `TEXT NOT NULL`,
nên mọi lệnh chèn không nêu `id` đều ném `NOT NULL constraint failed`. Gặp ở
`coin_grants` khi chạy `grantCoins`. Tạm thời sinh id ở TypeScript; đúng ra
lược đồ phải có mặc định.

**2. Mất toàn bộ 111 mệnh đề `ON DELETE`.** Migration Supabase có 111 chỗ, lược
đồ D1 có **0**. Hậu quả gặp thật: `weekly_rematch_study_rooms` xoá phòng và dựa
vào cascade để dọn tin nhắn với thành viên; trên D1 nó ném `FOREIGN KEY
constraint failed`. Bản dịch xoá tường minh theo thứ tự phụ thuộc - đúng dù có
cascade hay không.

**3. `0002_unique_constraints.sql`** (mới, 38 chỉ mục) trích từ 127 migration
Supabase. Không có nó thì chín chỗ `ON CONFLICT` trong các hàm RPC ném "does not
match any PRIMARY KEY or UNIQUE constraint". Đã thử áp lên dữ liệu thật: **38/38
tạo được, 0 dòng trùng** - tức là vẫn kịp thêm ràng buộc, nhưng chỉ tới khi có
dòng trùng đầu tiên lọt vào.

## Mười ba cái bẫy đã gặp

1. **Chia nguyên/nguyên ra nguyên.** Mẫu số phải viết `40000.0`.
2. **Bộ kiểm phải tự chứng minh.** Phá mã, chạy, thấy đỏ, khôi phục. **Bốn**
   phép kiểm trong tệp này từng xanh cả khi mã đã bị phá.
3. **Phân quyền lẫn trong `WHERE`.** `and p_user_id = auth.uid()`,
   `exists(... left_at is null)`. Bỏ là mở dữ liệu riêng cho tất cả.
4. **`generate_series` → CTE đệ quy, và CTE đệ quy phải tự chặn.**
5. **Tham số mảng nở thành `in (?,?,?)`.** Chỉ nối dấu `?`, không nối giá trị.
6. **`DISTINCT ON` → `row_number()`,** chép đúng cả tiêu chí phá hoà.
7. **`FULL OUTER JOIN` cần SQLite 3.39, `LATERAL` thì không có.**
8. **`date_trunc('week')` bắt đầu từ THỨ HAI** → `date('now','-6 days','weekday 1')`.
9. **`array_agg`/`jsonb_agg` có `order by`** → gom nhóm ở TypeScript.
10. **`LIKE`/`lower()` chỉ gấp chữ ASCII,** không gấp tiếng Việt có dấu.
11. **Chỉ mục MỘT PHẦN phải nêu cả mệnh đề `where` trong `ON CONFLICT`.**
    `coin_grants_once_per_ref ... where ref is not null`.
12. **`INSERT ... SELECT ... ON CONFLICT` cần `where true` chen vào,** nếu không
    SQLite đọc `on` như một phép JOIN và báo lỗi cú pháp.
13. **`max(x)` một đối số là hàm GỘP, `max(a,b)` hai đối số là hàm VÔ HƯỚNG.**

## Điều quan trọng nhất về nhóm C

D1 chỉ có `batch()` - một transaction ngầm, KHÔNG tương tác. Cách viết đúng là
gộp điều kiện vào chính lệnh ghi rồi kiểm số dòng bị ảnh hưởng:

```
update user_profiles set coins = coins - ? where id = ? and coins >= ?
→ changes === 0 nghĩa là không đủ tiền
```

An toàn trước chạy đua mà không cần transaction nào. Cách SAI là đọc rồi ghi
bằng hai lời gọi rời: giữa chúng có khoảng hở để hai yêu cầu song song cùng
thấy "còn đủ tiền" rồi cùng trừ.

`syncLessonsAtomic` là hàm DUY NHẤT thật sự cần transaction, vì nó kết thúc
bằng `delete ... where id not in (payload)` và hai bảng dữ liệu người học
cascade theo `lessons(id)`. Nó TỪ CHỐI chạy nếu môi trường không có `batch()`.
