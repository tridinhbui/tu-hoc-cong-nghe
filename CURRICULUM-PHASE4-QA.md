# Phase 4 — Final Curriculum QA & Integration

> 2026-10-17/18. PR [#8](https://github.com/tridinhbui/tu-hoc-cong-nghe/pull/8)
> (`rasoat-giao-trinh-cong-nghe`, base `chuyen-sang-cong-nghe`). Mọi số liệu đo trên máy;
> chỗ nào chỉ lấy mẫu hay chưa kiểm, ghi rõ. Không merge, không deploy, không chạm D1 thật
> hay thư mục làm việc của phiên khác (mọi thử nghiệm chạy trong worktree sạch dưới scratchpad
> với D1 **cục bộ**, tài khoản `*@example.test` chỉ tồn tại trong tệp sqlite đó).

## 0. Quyết định cuối

| Hạng mục | Kết luận | Lý do ngắn |
|---|---|---|
| **PR #8 → `chuyen-sang-cong-nghe`** | **MERGE READY** sau khi CI xanh trên commit mới | Cây tích hợp sạch: tsc, test 202/202, 3 bộ audit, build đều qua. Phase 4 tìm và sửa 11 lỗi có bằng chứng (mục 2, 4) |
| **`chuyen-sang-cong-nghe` → `main`** | **FIX REQUIRED** (không phải lỗi mã) | Cần một PR mới; có 1 xung đột nội dung thật ở `MissionPicker.tsx` và 3 commit của người khác chưa được rà ở đây (mục 1) |
| **Điểm bài tập / quiz / bằng chứng năng lực là "đã xác minh"** | **BLOCKED** — đừng coi là bằng chứng | Tái hiện được: ghi bằng chứng cho bài tập chưa làm, và nhét một bài học "hoàn thành, 100 điểm" bằng một lệnh gọi (mục 5). Có từ trước PR này, không do PR này gây ra |

## 1. Phụ thuộc giữa PR #7 và #8

```
main        ... 9438f24a ── 826e496a ── 815ce74d ── 6f9fb104 ── c410674e (merge PR #7)
                     \
chuyen-...            ├─ bde82e00 (UX người mới)   ┐ chỉ có ở chuyen
                      ├─ 50eaccc9 (API hộp thư)    ┘
                      ├─ e1369d7c ── bd6ff115       (bản gốc của 826e496a, 815ce74d)
PR #8 (4 commit)      ├─ ed511660 (Dashboard gọn lại)
                      ├─ 85fa749b                   (bản gốc của 6f9fb104)
                      ├─ aa6e4a30, 022314c6         (Rà soát)  + 71f96b0e, bcf2fb47 (Phase 4)
```

- PR #7 đã vào `main` bằng **commit viết lại**. `git patch-id` của ba cặp (`e1369d7c`/`826e496a`,
  `bd6ff115`/`815ce74d`, `85fa749b`/`6f9fb104`) **trùng nhau**: cùng một thay đổi, khác SHA.
  Không có nội dung Chặng 67 nào bị mất hay lặp; chỉ lịch sử hiện hai lần.
- PR #8 mang theo `85fa749b` (bản trùng) vì nó nằm dưới commit của tôi trên nhánh cục bộ.
  Merge vào `chuyen-sang-cong-nghe` không xung đột.
- Hợp nhất thử `main` + nhánh PR #8 trong worktree sạch: **một xung đột**,
  `components/learning-flows/MissionPicker.tsx` (`main` thêm trường `tone` ở PR #7; `ed511660`
  viết lại thành danh sách hàng và bỏ `tone`). Giải bằng cách lấy bản của nhánh
  (`ed511660` mới hơn, đã có đủ 9 hướng gồm `vibecode`); sau giải: tsc 0, 2.082 test qua, build 0.
  Cây kết quả **giống hệt** đầu nhánh PR #8 (`git diff` rỗng).

**Thứ tự merge đề nghị**

1. PR #7 — đã xong.
2. PR #8 → `chuyen-sang-cong-nghe` (merge commit).
3. Mở PR mới `chuyen-sang-cong-nghe` → `main` (PR #6 đã đóng), giải xung đột `MissionPicker.tsx` như trên.
   Không cần ép đẩy. Nếu muốn lịch sử gọn, `git rebase --onto main` sẽ tự bỏ ba commit trùng, nhưng
   phải ép đẩy `chuyen-sang-cong-nghe` — việc đó cần bạn đồng ý.

Cái sẽ đi cùng vào `main` mà tôi **không rà**: `bde82e00` (trang chủ/đăng nhập), `50eaccc9`
(API hộp thư), `ed511660` (dashboard và lộ trình). Test của chúng qua, nhưng `ed511660` để lại
lỗi lint ở `components/LearningPathClient.tsx` (mục 6).

## 2. Kiểm tra nội dung độc lập

### 2.1 168 lời giải đã viết lại (46 câu sai thật)

Phương pháp độc lập với script sửa: so mỗi lời giải với **thứ tự hiển thị thật** (`lib/lessons-data`),
rồi đọc toàn bộ 168 câu ở mức từng câu.

| Kiểm tra | Kết quả |
|---|---|
| Mọi trích dẫn “…” khớp đúng **một** phương án hiển thị | 168/168 |
| Câu nào trích đáp án đúng mà chê nó, hoặc trích phương án nhiễu mà khen nó | 5 cờ tự động; đọc tay: không có lỗi |
| Đọc tay toàn bộ 46 câu "sai thật" | 2 câu ánh xạ sai (bên dưới) |
| Đọc tay 122 câu còn lại | 0 câu sai nghĩa; 1 thành ngữ bị hiểu nhầm (bên dưới) |

**Lỗi do chính lượt sửa trước của tôi gây ra, tìm thấy ở Phase 4 và đã sửa:**

| Lỗi | Số câu | Mô tả |
|---|--:|---|
| Cắt cụt "đầu tiên / cuối cùng" | 4 | Script thay "lựa chọn đầu" và bỏ lại chữ "tiên": `lựa chọn “Đó là dấu vết…” tiên` (`chat-luong-du-lieu`, `thuat-toan-tham-lam`, `html-cau-truc-mot-trang`, `dataframe-bang-du-lieu-trong-code`) |
| Ánh xạ sai phương án | 2 | `mini-bang-so-sanh-cong-bang-hai-doi-ban-hang` nói đáp án đúng "so tổng"; `du-an-nho-hop-thu-gon-trong-mot-buoi` gán hai mô tả nhầm cho hai phương án. Văn bản gốc **vốn đã** không khớp thứ tự soạn, nên ánh xạ máy móc giữ nguyên lỗi cũ dưới một hình dạng khác |
| Thành ngữ | 1 | "không có lựa chọn thứ ba" (= không có cách nào khác) bị coi là tham chiếu vị trí; viết lại thành "không có cách thứ ba" |

Bài học: một cổng "0 tham chiếu vị trí" xanh **không** chứng minh lời giải đúng. Nó chỉ chứng minh
chúng không còn phụ thuộc vị trí. Phần "đúng" vẫn cần người đọc. Cổng nay loại "đầu tiên / cuối cùng"
ở chính biểu thức, và `hands-on-coverage.test.ts` có thêm test chặn dạng cắt cụt.

### 2.2 41 bài tập mới

- **Chạy và chấm**: `audit:exercises` — mọi lời giải in đúng `expectedOutput`, không mã khởi đầu nào qua sẵn (628 khối).
  Thêm kiểm ở trình duyệt thật: một bài JavaScript (`email-va-tin-nhan-gia-mao`) và một bài Python
  (`loi-chi-thinh-thoang-moi-xuat-hien`, Pyodide tải được từ CDN) — mã khởi đầu báo "Chưa khớp ở dòng 1"
  kèm cả dòng cần/dòng in; sửa mã thì báo đúng.
- **Lộ đáp án — lỗi mới tìm thấy.** Bản đầu đặt lời giải thích trong khối `callout "Vì sao đúng"` ngay dưới
  đề, nghĩa là người học đọc được lời giải (kể cả chỗ mã khởi đầu sai) trước cả gợi ý và nút "Xem lời giải" vốn
  bị khoá tới khi chạy thử. **Đã sửa**: trường mới `exercise.explanation`, chỉ hiện sau khi qua bài hoặc mở
  lời giải. Đã kiểm trong trình duyệt (ẩn sau lần chạy sai; hiện sau khi mở lời giải) và bằng 2 test
  component. Bản dịch gộp trường này (`pick`).
- **Văn xuôi**: 30 chỗ dùng dấu ` trong `t02` hiện nguyên dấu (giao diện không dựng markdown). Đã đổi sang “…”, có test chặn.
- **Chưa làm / không làm**: không có bản dịch tiếng Anh cho 41 bài tập (các bài chứa chúng chưa được dịch).
  Tính đúng của từng câu giải thích là do tôi và các agent viết đọc lại, chưa có người thứ ba.

## 3. Đối chiếu giáo trình

**Độ phủ bài tập (số bài có ít nhất một khối `exercise`)**

| Mảng | Bài | Trước | Sau |
|---|--:|--:|--:|
| Đám mây | 8 | 0 | 5 |
| An toàn thông tin | 18 | 2 | 5 |
| Tự động hoá không/ít code | 110 | 5 | 17 |
| Làm sản phẩm cùng AI | 90 | 10 | 31 |
| **Toàn kho** | 1.513 | **467** | **508** |

**628 khối mã chạy được** = 567 (tiếng Việt: 508 `exercise` + 59 `code` có `runnable`) + 61 (các bản dịch
đã gộp). Con số 628 của báo cáo trước đúng nhưng chưa nói rõ nó đếm cả hai ngôn ngữ.

**Bản tiếng Anh: 71 bài, không phải 72** (thư mục có `_index.json`). Kiểm VI/EN bằng `findTranslationDrift` +
quét chữ Việt sót lại trong bản đã gộp: **0 bài lệch cấu trúc**, 5 bài còn chữ Việt, đều hợp lệ
(chuỗi ví dụ trong mã như `"Hà Nội"`, `["bút", "vở"]`). 7 lời giải EN gọi phương án bằng vị trí đã sửa ở PR này.

**Tiến trình và tiền đề**: giữ kết luận ở `TECH-CURRICULUM-AUDIT.md` mục 3 (DNS/TCP/TLS/cổng dùng ở Chặng 9 trước
khi Chặng 12 dạy; mức P2). Độ sâu và ví dụ thực tế của 41 bài tập: mỗi bài dùng dữ liệu giả, số liệu ví dụ
được ghi rõ là ví dụ; không thấy bài nào mâu thuẫn số liệu của bài học chứa nó, sau khi sửa bài lọc trùng
(giữ dòng **sau cùng**, khớp lời giải của bài học) và bài `alt` (đúng đặc tả HTML).

## 4. Kiểm tra trình duyệt

Môi trường: worktree sạch = `main` + nhánh PR; D1 **cục bộ** (`wrangler d1 migrations apply --local` với một
cấu hình `wrangler.qa.jsonc` chỉ khai D1, không AI/R2 nên không chạm dịch vụ thật); `next dev --webpack`
(Turbopack từ chối `node_modules` là symlink); đăng ký hai tài khoản bằng API đăng ký của chính ứng dụng.

Lần chạy đầu của dev server trong thư mục làm việc chính **không dùng được**: gọi `getCloudflareContext` lỗi vì
cấu hình `wrangler.jsonc` thật có binding AI luôn đòi kết nối từ xa. Đó là lý do dựng cấu hình riêng.

| Kiểm tra | 375px | 768px | 1440px |
|---|---|---|---|
| Bài tập **gập sẵn** (Chặng 13, 16, 58) | có | có | có |
| Mở bài tập, editor + đầu ra | có | có | có |
| Tràn ngang cả trang | 0 | 0 | 0 |
| Khung bài tập bị cắt | **74–81px → sửa → 0** | 0 | 0 |
| Chấm: sai → thông báo dòng, đúng → "Đúng rồi!" | có | — | có |
| Lời giải thích ẩn tới khi qua/mở lời giải | — | — | có |

**Lỗi tìm thấy bằng trình duyệt và đã sửa**

1. **Đầu ra mong đợi bị cắt ở 375px** (mọi bài tập, có từ trước): ô "Kết quả cần in ra" nằm trong một mục lưới
   không co lại (`min-width:auto`), nên dòng dài làm khối rộng hơn khung 74–81px và bị `overflow-hidden`
   cắt cụt thay vì cuộn trong `<pre>`. Thêm `min-w-0`.
2. **Tiến độ đọc không bao giờ ghi hàng đầu tiên** (có từ trước, đo trên D1 cục bộ): `single()` không có hàng
   trả lỗi không mang mã `PGRST116`, trong khi 22 chỗ gọi coi mã đó là "bình thường". Kết quả: sau khi cuộn hết một
   bài, `reading_progress` có **0 hàng** (58 lỗi console: `single() cần đúng 1 hàng, nhận 0` từ tiến độ đọc,
   bookmark, cờ bài học). Sửa: `D1QueryError.code = "PGRST116"` cho trường hợp 0 hàng, và hai route `/api/db`,
   `/api/db/rpc` chuyển `code` qua dây. Sau sửa: 1 hàng, `scroll_percent=100`.
   **Chưa kiểm trên production** (không có quyền, và không nên); mã đường đi y hệt nên rất có thể cùng lỗi ở đó.
3. Ghi bài tập đã qua: hàng `user_exercise_passes (lesson 351, block 11)` được ghi đúng vị trí khối.

**Không đạt / chưa làm**

- **Resume**: tải lại trang không cho thấy bài tập đã qua (khối không đọc `user_exercise_passes`) và mã
  người học gõ không được giữ. Có từ trước, áp dụng cho cả 467 bài tập cũ. Chưa sửa; xếp P2.
- Chỉ mở 3 trong 10 chặng gập sẵn (13, 16, 58). Chặng 51, 52, 56, 57, 59 dùng cùng một đoạn mã nhưng
  chưa mở bằng mắt.
- Chưa kiểm chế độ tối, bàn phím, trình đọc màn hình. Chưa chụp ảnh lưu lại; số liệu ở bảng là số đo từ DOM.
- Dev server hiện "9 Issues" của Next khi lần đầu (chủ yếu các lỗi `single()` ở trên); chưa đếm lại sau sửa.

## 5. Bảo mật: chấm trong trình duyệt và giả mạo điểm

Nguyên tắc: **kết quả "qua" do trình duyệt gửi lên không phải là xác minh.** Kết quả đo:

| Thử nghiệm (cục bộ, hai người dùng) | Kết quả |
|---|---|
| B đọc `user_progress`, `reading_progress`, `user_profiles` của A qua `/api/db` | chỉ thấy dòng của chính B; hồ sơ A **không** lộ |
| B chèn `user_exercise_passes` mang tên A | bảng không lộ qua `/api/db` ("không có trong lược đồ") |
| Chưa đăng nhập gọi `record_exercise_pass`, `/api/skill-evidence` | bị từ chối (RPC báo cần phiên; GET trả 401) |
| `get_my_exercise_passes` | chỉ trả hàng của người gọi |
| **Gửi `POST /api/skill-evidence` với 3 bài tập chưa chạy** | **200, +30 điểm năng lực** (cloud 0→20, code 0→10) — chỉ kiểm tham chiếu có trong danh mục |
| **B `INSERT user_progress {completed:1, quiz_score:100, time_spent_seconds:1}`** | **thành công** (không làm bài, không xem bài) |
| B sửa thẳng `user_stats.total_xp` | 0 hàng bị đổi (người thử chưa có hàng `user_stats`, nên chưa phân biệt được "bị chặn" với "không có hàng") |

Phân loại:

- **Phân quyền dữ liệu giữa người dùng: đạt** trong các ca đã thử.
- Theo mã, XP và `avg_quiz_score` được tính lại từ `user_progress` (`recalculateUserStats`); tôi **chưa đo** con số đó sau khi chèn dòng giả, nên chưa khẳng định XP bị phình trong thực tế.
- **Chấm điểm phía client: không đáng tin.** `recordExercisePass` và `quiz_score` đều do client khai; tài liệu mã
  (`lib/d1/rpc.ts`) đã tự nhận điều này. Hệ quả cụ thể: `avg_quiz_score`, XP, và phần trăm năng lực ở `/su-nghiep`
  — những con số `AGENTS.md` gọi là "load-bearing" — **sửa được bằng một lệnh gọi**.
- PR này **làm tăng bề mặt**: +41 bài tập, mỗi bài là một tham chiếu giả được được +10 điểm.
- **Chưa sửa trong PR này** vì thiết kế cắt ngang (không phải lỗi một dòng) và không thuộc nội dung. Đề xuất theo thứ tự:
  1. *Quiz*: máy chủ nhận **câu trả lời** chứ không nhận điểm, tự chấm bằng `lib/lessons-data` (đáp án nằm sẵn trong
     kho) — làm được ngay, không cần chạy mã.
  2. *Bài tập*: Workers cấm `eval`, nên không chạy lại Python/JS được; cần một sandbox (Cloudflare Sandbox/Container)
     hoặc, rẻ hơn, **nhãn "tự khai"** trên mọi chỗ hiển thị điểm bài tập và loại nó khỏi XP/phần trăm năng lực.
  3. Trần tốc độ ghi bằng chứng theo người dùng; cổng `time_spent_seconds` hợp lý.

## 6. Tích hợp (cây sạch = `main` + nhánh PR, sau giải xung đột)

| Bước | Kết quả |
|---|---|
| `npm run typecheck` | 0 lỗi |
| `npx vitest run` | **202/202 tệp, 2.082 test qua**, 6 bỏ qua (trước Phase 4: 2.076) |
| `npm run audit:lessons` | thoát 0; tham chiếu vị trí 0 |
| `npm run audit:lessons:en` | thoát 0; tham chiếu vị trí 0 |
| `npm run audit:exercises` | 628 khối, thoát 0 |
| `npm run build` | thoát 0 (Turbopack; phải dùng bản sao `node_modules` vì Turbopack từ chối symlink) |
| `eslint .` | **đỏ: ~117 lỗi ở 34 tệp, đều có từ trước** (`react-hooks/set-state-in-effect`, …). Lint không nằm trong CI (`ci.yml` chạy typecheck, test, 3 audit). Một tệp trùng với PR: `components/LearningPathClient.tsx`, do `ed511660` chứ không do commit của tôi. Tệp tôi sửa: sạch |

Ghi chú: `next build --webpack` **thất bại** ở `app/api/knowledge-challenge/route.ts` (export `interviewQuestionsFor`
không phải route handler). Có từ trước, không đổi bởi PR; production dùng Turbopack nên không ảnh hưởng, nhưng sẽ
cắn nếu ai chuyển sang webpack.

## 7. Còn lại sau Phase 4

| # | Việc | Mức |
|---|---|---|
| 1 | Chấm quiz phía máy chủ (nhận đáp án, không nhận điểm) | P1, chặn việc coi điểm là bằng chứng |
| 2 | Nhãn "tự khai" / loại điểm bài tập khỏi XP và năng lực tới khi có sandbox | P1 |
| 3 | PR `chuyen-sang-cong-nghe` → `main`, giải xung đột `MissionPicker.tsx`; rà `bde82e00`, `50eaccc9`, `ed511660` | P1 |
| 4 | Hiển thị bài tập đã qua và giữ mã khi tải lại (resume) | P2 |
| 5 | Mở bằng mắt Chặng 51, 52, 56, 57, 59; chế độ tối; bàn phím | P2 |
| 6 | Xác minh bug `PGRST116` trên production trước khi báo là đã sửa ở đó | P2 |
| 7 | Lint repo-wide, và `knowledge-challenge/route.ts` | P3 |
| 8 | Dịch tiếng Anh theo phễu (xem `CONTENT-EXPANSION-ROADMAP.md`) | P1, lớn |

## Lệnh tái hiện

```bash
# Cây tích hợp: main + nhánh PR (giải MissionPicker.tsx bằng bản của nhánh)
git worktree add --detach /tmp/integ origin/main && cd /tmp/integ
git merge origin/rasoat-giao-trinh-cong-nghe        # xung đột đúng 1 tệp
git checkout --theirs components/learning-flows/MissionPicker.tsx && git add -A && git commit --no-edit
cp -cR <repo>/node_modules .                         # Turbopack không nhận symlink
npm run typecheck && npx vitest run && npm run audit:lessons && npm run audit:lessons:en \
  && npm run audit:exercises && npm run build
```
