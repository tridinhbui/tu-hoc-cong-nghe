# Lộ trình mở rộng nội dung công nghệ

> Đi cùng `TECH-CURRICULUM-AUDIT.md` (số liệu và bằng chứng). Cập nhật 2026-10-17, nhánh
> `chuyen-sang-cong-nghe`. Mức ưu tiên: **P0** = nội dung đang sai hoặc thiếu so với lời hứa của
> giáo trình; **P1** = lấp khoảng trống đã đo được; **P2** = cải thiện, làm khi P0/P1 xong.

## Đã xong trong đợt này

| Mã | Việc | Bằng chứng |
|---|---|---|
| P0-1 | Sửa 168 lời giải quiz gọi phương án bằng vị trí (46 câu đang trỏ sai) + 7 câu tiếng Anh; cổng CI ở mức 0 | `audit:lessons`: tham chiếu vị trí 168 → 0; `audit:lessons:en`: 7 → 0 |
| P0-2 | 41 bài tập chấm được cho đám mây, an toàn thông tin, gỡ lỗi, tự động hoá, bảng tính, trang web đầu tiên | `audit:exercises`: 587 → 628 khối; bài có bài tập 467 → 508 |
| P1-1 | Bài tập gập sẵn ở 10 chặng cho người không lập trình | `LessonSections.tsx` |
| P1-2 | Bộ test giữ sàn bài tập theo chặng và cấm tham chiếu vị trí | `lib/__tests__/hands-on-coverage.test.ts` |

## Việc tiếp theo

### P1 — lấp khoảng trống đã đo

| Mã | Việc | Vì sao | Xong khi | Công sức |
|---|---|---|---|---|
| P1-3 | **Bộ chấm HTML/CSS**: thêm `exercise` có `language: "html"`, chấm bằng khẳng định trên DOM trong iframe sandbox (ví dụ "có đúng một `<h1>`", "mọi `<img>` có `alt`", "nút có `type`") | Web là mảng duy nhất ở mức thấp mà không thuộc nhóm "người dùng công nghệ": Chặng 4 có 8/20 bài tập, Chặng 56 chỉ 5/20, vì `exercise` chỉ có `python` và `javascript`. Dạy HTML bằng JavaScript xử lý chuỗi (như `t05`) chỉ là chắp vá | `RunnableLanguage` có `html`; `verify-exercises.mjs` chạy được khẳng định; ≥ 12/20 bài Chặng 4 có bài tập | Lớn (1–2 tuần): loại khối, CSP cho iframe (giống `/runners/`), CI |
| P1-4 | **Vibecoding còn thiếu hai thứ đã nêu trong `KE-HOACH-VIBECODE.md`**: bài "làm ra trang đầu tiên từ một câu mô tả" (id 2750–2759 còn trống) và bài **tự làm không AI** cuối mỗi chặng | Mỗi chặng phải có một việc người học tự làm; hiện chỉ Chặng 67 có dự án xuyên suốt. Khoảng trống này là phần "ownership" của yêu cầu nâng cấp vibecoding | 10 bài mới qua `audit:lessons` + `check-lesson-batch.mjs`; bản dịch EN | Vừa (≈ 10 bài) |
| P1-5 | **Chấm phía máy chủ cho dự án xuyên suốt** (`recordExercisePass` hiện là lời khai của client) | Tiến độ dự án quán cà phê dùng làm thước đo "đã làm được"; ai gọi API cũng ghi đạt được | Máy chủ chạy lại `solution`/`expectedOutput` hoặc ký kết quả; test | Vừa |
| P1-6 | **Dịch tiếng Anh theo phễu học**: Chặng 1 (máy tính, dòng lệnh) → 3 (lập trình) → 7–8 (API, CSDL) → 13/16 (đám mây, an toàn) | 72/1.513 bài (4,8%); nền tảng máy tính 3/19, API 0/10, CSDL 0/10. Người đọc tiếng Anh vào Chặng 1 thấy tiếng Việt từ bài thứ hai | Mỗi đợt ≈ 20 bài, hai lượt (dịch rồi cân độ dài, xem AGENTS.md); `audit:lessons:en` xanh; khối `t0x` được chèn cùng vị trí trong bản dịch | Lớn, chia đợt |

### P2 — cải thiện

| Mã | Việc | Ghi chú |
|---|---|---|
| P2-1 | **Khối `predict`** (dự đoán đầu ra trước khi chạy) và **đúng/sai kèm giải thích** | Hai kiểu bài tập này được yêu cầu nhưng chưa có khối riêng. `exercise` chấm theo đầu ra nên người học có thể chạy rồi chép lại; khối `predict` phải khoá việc xem kết quả cho tới khi người học chốt dự đoán. Đừng giả lập bằng `exercise` (gian lận được) |
| P2-2 | **Tiền đề rõ ràng**: trường `prerequisites` (danh sách slug) hiển thị "Nên học trước" | Chặng 9 dùng DNS/TCP/TLS/cổng trước khi Chặng 12 dạy. **Không đánh số lại chặng** — nhãn là khoá `stage_label` đã lưu trong Cloudflare |
| P2-3 | **Dấu "kiểm lần cuối" cho 30 bài nêu tên sản phẩm cụ thể** | 0/30 hiện có mốc ngày. Nguyên tắc 5 của `KE-HOACH-VIBECODE.md` đã yêu cầu |
| P2-4 | `practicePrompt` "chọn dài nhất" đang z = 2,98 so với trần 3 | Chưa đỏ nhưng sát. Sửa bằng cách kéo dài **phương án nhiễu**, không cắt đáp án đúng (AGENTS.md) |
| P2-5 | Gộp bài tập `t02` về Chặng 58 vào bài kiểm tra đầu chặng hoặc nâng nó thành dự án cuối chặng | Hiện bài tập gập, nhiều người sẽ bỏ qua; nếu số liệu mở cho thấy vậy, đưa lên |
| P2-6 | Chặng 30–50 (vai trò, công cụ AI): thêm **một** bài tập kiểm chứng mỗi chặng (ví dụ kiểm số liệu AI tự điền) bằng `aiLab spotError` hoặc `exercise` | 740 bài, 0 `exercise`; là lựa chọn có chủ ý nhưng đáng đo xem người học có kiểm chứng được không |

## Nguyên tắc khi làm tiếp (rút từ đợt này)

1. **Đo trước, sửa sau, đo lại.** Hai phát hiện lớn nhất (F1, F2) đều không nằm trong bất kỳ cổng
   nào cho tới khi có người đo. Mỗi việc ở trên phải kèm một con số trước/sau.
2. **Gọi phương án bằng nội dung, không bằng vị trí.** Cổng CI hiện bắt cả tiếng Việt lẫn tiếng Anh.
3. **Bài tập phải thất bại trước khi thành công**: mã khởi đầu chạy được nhưng in sai. `check-block-additions.mjs`
   và `verify-exercises.mjs` ép điều này.
4. **Một người viết một tệp.** Đợt `t01`–`t05` dùng cách này và không có xung đột nào; chạy
   `scripts/check-block-additions.mjs <tệp>` trên từng tệp, rồi chạy `audit:*` **một lần** sau cùng
   (`audit:lessons` sinh lại `lib/lessons-data`, không chạy song song).
5. **Đừng gắn nhãn "xong" cho thứ chưa mở trong trình duyệt.** Danh sách "chưa kiểm bằng mắt"
   nằm ở `TECH-CURRICULUM-AUDIT.md` mục 6.
