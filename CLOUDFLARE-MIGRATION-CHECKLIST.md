# Checklist chuyển sang Cloudflare 100% — hiện trạng đo được

Cập nhật lần cuối: sau khi bỏ Durable Object realtime (revert `419a16c`).
Mọi con số dưới đây là **đo trực tiếp trên repo lúc viết**, không phải ước lượng.

## Đã xong

| # | Việc | Bằng chứng |
|---|---|---|
| 1 | Expo (`apps/mobile`, `packages/`) xoá sạch | commit `ad3b86b` |
| 2 | 88/88 bảng dữ liệu → D1 (`migrations-d1/0001_schema.sql`) | schema-snapshot khớp |
| 3 | 53/53 hàm RPC Postgres → TypeScript (`lib/d1/rpc.ts`) | `RPC-MIGRATION-MAP.md` |
| 4 | Bộ điều phối `.rpc()` sinh tự động, đối chiếu chữ ký | `lib/d1/rpc-dispatch.ts`, 10 test |
| 5 | Lược đồ + chính sách phân quyền D1 đưa vào git | commit `e43a103` |
| 6 | Bảng tài khoản + phiên (`auth_users`, `auth_sessions`) | `migrations-d1/0003_auth.sql`, 13 test |
| 7 | Dịch vụ tài khoản: đăng ký/đăng nhập/đặt lại mật khẩu/Google | `lib/auth/service.ts`, `lib/auth/google.ts`, 41 test |
| 8 | Route HTTP cho auth (`/api/auth/*`) | 7 route, đã kiểm |
| 9 | 3 bucket Storage → 1 bucket R2 (`thcn-files`) | `lib/r2/storage.ts`, 12 test |
| 10 | 2 route upload chuyển từ trình duyệt sang máy chủ (avatar, chat-image) | bắt buộc vì R2 không có RLS |
| 11 | 69 tệp nhị phân đã copy thật từ Supabase Storage sang R2 | `scripts/migrate-storage-to-r2.mjs`, chạy xong |
| 12 | Câu SQL cập nhật URL đã sinh sẵn | `scripts/d1/r2-url-updates.sql`, chờ D1 có dữ liệu |

## CHƯA làm — theo mức độ chặn

### Chặn hoàn toàn (không xong thì app không chạy được trên Cloudflare)

- [ ] **D1 thật trên Cloudflare đang RỖNG.** `wrangler d1 execute --remote` xác nhận
      không một bảng nào tồn tại. Mọi thứ kiểm từ đầu dự án (3652 tài khoản, 88 bảng)
      đều chạy trên bản sao **local**. Cần: chạy `migrations-d1/000*.sql` lên `--remote`,
      rồi nạp toàn bộ `scripts/d1/data/*.jsonl` lên `--remote`. **Việc lớn nhất còn lại.**
- [ ] **Trang đăng nhập/đăng ký chưa đổi sang API mới.** `app/login/page.tsx` vẫn gọi
      thẳng `supabase.auth.signUp/signInWithPassword/resend/resetPasswordForEmail/
      signInWithOAuth` — toàn bộ `lib/auth/service.ts` + 7 route `/api/auth/*` đã dựng
      xong ở bước trước **nhưng chưa có UI nào gọi tới chúng**. Đây là khoảng cách lớn
      nhất giữa "đã viết code" và "app dùng được".
- [ ] **`lib/current-user.ts`** — hook `onAuthStateChange` phía trình duyệt, nền tảng
      cho trạng thái đăng nhập toàn app (dùng trong `GlobalChatWrapper`,
      `DashboardClient`). Chưa có bản thay thế cho kiến trúc cookie-phiên.
- [ ] **36 tệp `lib/supabase*.ts` vẫn còn**, và **195 tệp** trong `app/lib/components`
      còn import chúng.

### Dữ liệu bảng (`.from()`) — chưa đụng tới

- [ ] **89 lời gọi `.from("bang")` qua Supabase** ở **51 tệp** chưa chuyển sang
      `createD1Client`/`getClient()`. Đây là khối việc lớn thứ hai, độc lập với auth:
      mỗi tệp `lib/supabase-*.ts` (chat, community, study-rooms, social, lobby,
      study-world, bugs, admin/*, v.v.) đang tự viết `.from()`/`.insert()`/`.update()`
      thẳng vào Supabase.

### Realtime (`.channel`) — quay lại từ đầu

- [ ] **7 module** (`lib/supabase-social.ts`, `-study-rooms.ts`, `-community.ts`,
      `-chat.ts`, `-bugs.ts`, `-lobby.ts`, `-study-world.ts`) vẫn gọi
      `supabase.channel()`. Bản Durable Object trước đã bị bỏ theo yêu cầu — **chưa có
      kiến trúc thay thế nào đang đứng**. Cần quyết định lại hướng đi trước khi dựng.

### Bí mật vay mượn từ Supabase

- [ ] `lib/quiz-tokens.ts` và `lib/level-exam-tokens.ts` dùng
      `SUPABASE_SERVICE_ROLE_KEY` làm khoá HMAC ký token câu trả lời quiz — **không
      liên quan gì tới Supabase API**, chỉ mượn tạm một chuỗi bí mật có sẵn. Xoá biến
      đó mà không thay bằng khoá riêng (ví dụ `QUIZ_TOKEN_SECRET`) là **mọi token quiz
      đang lưu hành hỏng ngay lập tức**.
- [ ] `app/admin/users.ts` — khoá tài khoản (`setUserDisabled`) gọi
      `supabase.auth.admin.updateUserById(..., ban_duration)`. Thiết kế D1 mới
      (`getCurrentUser()` kiểm `is_disabled` mỗi yêu cầu) **đã giải quyết đúng vấn đề
      này gọn hơn** — chỉ cần đổi `setUserDisabled` sang ghi D1 và gọi
      `revokeAllSessions()`, không cần cơ chế "ban" nào khác.

### Hạ tầng triển khai

- [ ] **Cron:** 7 route (`app/api/cron/*`, `app/api/admin/sync-lessons`) vẫn gọi
      Supabase trực tiếp. Không có Cloudflare Cron Trigger nào khai trong
      `wrangler.jsonc` (`triggers.crons` rỗng), và `vercel.json` không có cấu hình
      cron — nghĩa là **hiện tại không rõ cái gì đang gọi các route này theo lịch**.
      Cần xác nhận nguồn gọi cũ trước khi thay.
- [ ] `next.config.ts` → `images.remotePatterns` còn khai `*.supabase.co`. Không xoá
      ngay được (69 tệp cũ có thể vẫn còn URL Supabase ở nơi khác), nhưng cần dọn sau
      khi toàn bộ URL đã trỏ về R2.
- [ ] `app/auth/callback/route.ts` — route callback OAuth cũ của Supabase, dùng
      `createServerClient` từ `@supabase/ssr`. Trở nên thừa sau khi trang đăng nhập
      chuyển sang `/api/auth/google/start`, nhưng **chưa xoá** vì trang đăng nhập chưa
      chuyển.
- [ ] `package.json` vẫn khai `@supabase/ssr` và `@supabase/supabase-js`. Gỡ được
      **sau cùng**, khi mục "36 tệp lib/supabase*" ở trên về 0.

### Việc phụ, không chặn nhưng cần biết

- [ ] 5 tệp test (`lib/__tests__/*.test.ts`) còn import từ `@/lib/supabase*` —
      sẽ đỏ ngay khi các tệp nguồn bị xoá, cần cập nhật cùng lúc.
- [ ] `lib/__tests__/realtime-channel-remount.test.ts` kiểm hành vi riêng của
      `supabase-js` (channel cho cùng topic không tạo lại) — vô nghĩa với kiến trúc
      mới bất kể chọn hướng nào, xoá khi thay `.channel()`.

## Thứ tự khuyến nghị (phụ thuộc lẫn nhau)

```
1. Nạp schema + dữ liệu thật lên D1 remote     ← không phụ thuộc gì, làm trước
2. Nối trang đăng nhập/đăng ký vào /api/auth/*  ← auth "dùng được" từ đây
3. lib/current-user.ts bản D1                   ← để phần còn lại của UI có user
4. Chuyển 89 lời gọi .from() ở 51 tệp sang D1   ← khối lớn nhất, làm dần theo module
5. Quyết định lại kiến trúc .channel()          ← 7 module, làm sau cùng
6. Xoá 36 tệp lib/supabase*, gỡ 2 dependency    ← chỉ làm khi 1-5 xong hết
```

Bước 4 không phụ thuộc bước 5 và ngược lại — có thể làm song song nếu muốn,
nhưng KHÔNG làm bước 6 trước khi cả hai xong, vì bất kỳ tệp nào còn sót lại
một `import` từ `lib/supabase*` sẽ làm build đỏ ngay khi tệp đó bị xoá.
