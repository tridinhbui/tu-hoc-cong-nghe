# FINAL-MERGE-REPORT — 2026-10-17

**Kết luận: PR #7 đã merge (`c410674e`) và deploy theo lệnh của bạn; CI và Deploy trên `main` đều xanh.** Phần dưới là trạng thái trước khi merge.

~~Chưa merge gì.~~ Merge vào `main` kích hoạt `.github/workflows/cloudflare-deploy.yml`
(`on: push: branches: [main]` → `wrangler deploy`), tức là deploy production. Yêu cầu của bạn là
"không deploy production", nên việc merge đang chờ quyết định của bạn (xem mục 5).

## 1. Commit inventory

| Ref | Trạng thái |
| --- | --- |
| `origin/main` `9438f24a` | Local `main` (`7c0c2f5d`) **cũ hơn 195 commit**, 0 commit riêng. Không cần merge gì từ local `main`. |
| PR #7 `vibecode-chang-67` (draft, MERGEABLE) | 3 commit trên `origin/main`, 0 commit lạc hậu. CI (`test`) pass, Workers Builds pass. |
| PR #6 `chuyen-sang-cong-nghe` | CLOSED. 3 commit đầu trùng patch với PR #7 (`range-diff`: `e1369d7c=826e496a`, `bd6ff115=815ce74d`, `85fa749b=6f9fb104`). **Không merge lại.** |
| 3 commit chỉ có trên `chuyen-sang-cong-nghe` | `bde82e00` UX người mới, `50eaccc9` API `/api/inbox`, `ed511660` dashboard/Bắt đầu từ đâu. Không nằm trong PR nào. Hai commit cuối chưa push. |
| Uncommitted (3 file) | `kiem-tra/page.tsx`, `DailyNewsQuizWidget.tsx`, `revamp-quiz.ts` — của session khác, **không đụng**. |
| Nhánh khác | `backup-*`, `dong-bo-cfa-frm`, `main-merge`, `worktree-career-map-drawer`, worktree `tuhoc-dash-wt`: không có PR, không thuộc phạm vi, không động tới. |

## 2. Kết quả QA (PR #7, worktree cô lập `origin/vibecode-chang-67`)

| Kiểm tra | Kết quả |
| --- | --- |
| `tsc --noEmit` | pass |
| ESLint trên file PR đổi | 0 lỗi, 1 cảnh báo (`readdirSync` thừa trong `check-lesson-batch.mjs`). Toàn repo có 116 lỗi có sẵn từ trước, ngoài phạm vi PR. |
| Vitest | 201 file, 2064 pass, 6 skipped |
| `audit:lessons` (VI) | 0 bài lỗi; z dài nhất 2,98 (trần 3,2) — sát trần |
| `audit:lessons:en` | 0 bài lỗi, 71 bài dịch |
| `audit:exercises` | 587 khối mã chạy đúng, không starter nào qua sẵn |
| `next build` | pass, 1587 trang |
| i18n coverage | còn nhiều chuỗi cứng ở `lib/ai-work-lessons/*` (nợ cũ, xem mục 4) |
| Trình duyệt | `/hoc-theo-nhu-cau` 375/768: không tràn ngang. Chỉ kiểm tra 375 và 768; 1440 và dark mode chưa kiểm tra đầy đủ (emulate dark không đổi nền, có thể app dùng toggle riêng). |

**Không kiểm tra được:** E2E sau đăng nhập (bài học, quiz, XP, streak, leaderboard, cộng đồng, "học tiếp sau khi thoát").
Trang bài học chuyển hướng sang đăng nhập; tôi không tạo tài khoản hay nhập mật khẩu. Các phần đó chỉ được phủ bởi unit test.
Không chạm DB production.

## 3. Security review

PR #7 **không đổi route API, RLS hay migration**. Chỉ thêm nội dung bài, `vibecode-project.ts`, `learning-flows.ts` và UI.

- `/api/db` và `/api/db/rpc`: người gọi lấy từ cookie phiên phía server, có policy theo actor; có test `two-account-isolation`. OK.
- `record_exercise_pass`: ghi theo actor, kiểm số nguyên, `block ≤ 200`. **Chấm bài chạy ở client** (Web Worker), nên "đã qua" là tự khai, không chống gian. Code đã ghi rõ điều này. Không sinh XP trực tiếp; chỉ nuôi bằng chứng kỹ năng. Chấp nhận được, nhưng xem nợ #1.
- `markLessonComplete` được gọi từ client (`LessonPageLayout.tsx`) với `quiz_score` do client gửi — điểm quiz và `avg_quiz_score` giả mạo được. Có từ trước PR #7.
- `/api/skill-evidence` POST: tham chiếu bằng chứng được phân giải phía server từ danh sách cho phép, giới hạn `MAX_REFS`. OK.

## 4. Phân loại

| Mục | Phân loại | Lý do |
| --- | --- | --- |
| PR #7 | **MERGE, chờ bạn cho phép vì sẽ deploy** | Mọi cổng xanh, không đổi bề mặt bảo mật. Phải bỏ draft trước khi merge. |
| PR #6 | **REJECT** | Đã đóng, bị PR #7 thay thế. |
| `50eaccc9` `/api/inbox` | **BLOCKED** | Endpoint mới trả email/tên/nội dung chat của người dùng cho dịch vụ ngoài (inbox-hub) bằng admin client (bỏ qua policy). Chỉ có Bearer token, không rate limit, so sánh độ dài trước `timingSafeEqual`. Cần chủ repo xác nhận token đã đặt, hub nào được gọi, và thêm rate limit. Chưa có PR. |
| `bde82e00`, `ed511660` | **FIX THEN MERGE** (chưa QA) | Chưa chạy cổng riêng. Cần PR riêng cherry-pick khỏi `50eaccc9` và có thể phụ thuộc 3 file chưa commit của session khác. |

**Nợ kỹ thuật**
1. Điểm quiz/bài tập do client gửi: cần chấm hoặc ghi nhận phía server nếu điểm dùng để mở khoá hay xếp hạng.
2. `user_exercise_passes` không kiểm `lesson_id` có tồn tại: một user có thể ghi nhiều hàng rác (mỗi bài ≤ 201 hàng, số bài không giới hạn).
3. 116 lỗi ESLint có sẵn (một phần `react-hooks/set-state-in-effect`).
4. i18n coverage: hàng nghìn chuỗi trong `lib/ai-work-lessons/*`.
5. `audit:lessons` z = 2,98 sát trần 3,2: lô bài mới kế tiếp dễ làm đỏ.
6. Cảnh báo build: `RealtimeHub` Durable Object được khai trong config nhưng không export.
7. `next start` cục bộ trả 500 cho mọi bài học vì thiếu Cloudflare context; muốn smoke test production-build cần `opennextjs-cloudflare preview`.
8. Chưa có E2E có đăng nhập chạy được trong môi trường không có tài khoản test.

## 5. Quyết định cần từ bạn
Merge PR #7 vào `main` sẽ chạy `wrangler deploy` lên production. Nếu bạn đồng ý deploy, cần: bỏ draft rồi merge PR #7, kiểm tra CI `main`, sau đó mở PR riêng cho `bde82e00` và `ed511660`.
