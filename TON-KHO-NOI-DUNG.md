# Tồn kho nội dung — trạng thái hiện tại

> Mọi con số dưới đây được **đo** bằng script trên cây làm việc ngày 2026-09-23,
> nhánh `chuyen-sang-cong-nghe`, chứ không đọc từ tài liệu cũ. Chỗ nào tài liệu
> trong repo nói khác, tôi ghi rõ ở mục 9 — vì phần lớn chúng đã lỗi thời.
>
> Phạm vi: **chỉ nội dung học**. Không có gì về giao diện, hạ tầng hay triển khai.
>
> **Kho bài đang thay đổi trong lúc viết tài liệu này.** Giữa lần đo đầu và lần
> đo cuối, `credit-debit-phan-2` (bút toán, `bonus`) đã thành
> `so-su-kien-thuc-chien` (`professional`) — nên `bonus` 63→62 và
> `professional` 360→361. Tổng vẫn 643. Đọc mọi con số ở đây như một lần đọc
> đồng hồ, không phải một hằng số; lệnh đo lại nằm ở phụ lục.

---

## 1. Một trang tóm tắt

| Hạng mục | Số lượng |
|---|--:|
| Tổng bài học | **643** |
| — Nền tảng công nghệ (`personal`) | 220 |
| — Công nghệ chuyên sâu (`professional`) | 361 |
| — Bổ trợ (`bonus`) | 62 |
| Tổng thời lượng đọc | 3.407 phút (≈ 56,8 giờ) |
| Câu quiz cuối bài | 3.220 (5–7 câu/bài, trung vị 5) |
| Câu hỏi mở đầu | 643 (mỗi bài 1) |
| Câu tự kiểm `practicePrompt` | 643 (mỗi bài 1) |
| Khối nội dung `sections` | 5.497 (5–14 khối/bài, trung vị 8) |
| Bài có widget tương tác | 203 / 643 |
| Đề thi thăng cấp | 14 cấp · 382 câu |
| Bài đã dịch tiếng Anh | 61 / 643 (9,5%) |
| Trang bài viết tay (ngoài hệ dữ liệu) | 2 |

**Tình trạng di cư tài chính → công nghệ: gần như xong về mặt nội dung dạy.**
Chỉ **29/643 bài** còn chạm từ vựng tài chính trong toàn văn, **0 bài** dính ở
tiêu đề, và phần lớn 29 bài đó là chính đáng (ESOP, đọc báo cáo lương IT, lừa
đảo đầu tư, chi phí hạ tầng).

**Nhưng phần vỏ thì chưa theo kịp.** Ba chỗ vẫn còn nguyên hình dạng tài chính,
và cả ba đều là thứ người học nhìn thấy — chi tiết ở mục 8.

---

## 2. Nội dung sống ở đâu

```
lib/lessons.ts                     81.352 dòng — NGUỒN SỰ THẬT, mọi bài viết ở đây
        │
        ├── lib/lesson-quiz-overrides.js   vá quiz theo slug (hiện chỉ 3 slug)
        │
        ▼  scripts/generate-lesson-data.mjs
lib/lessons-data/<slug>.json       643 tệp — bản đã sinh, cân lại vị trí đáp án
        │                          (+ _index.json, _track-totals.json)
        │
        ├── lib/lessons-i18n/en/<slug>.json   61 bản dịch (là PATCH, không phải bản sao)
        │
        ▼
app/bai-hoc/[slug]/page.tsx        đọc theo locale, dựng trang
```

Ba tệp quyết định **thứ tự và nhóm** chứ không chứa nội dung:

| Tệp | Vai trò |
|---|---|
| `lib/tracks.ts` | 3 track + mô tả + lộ trình quảng bá trên trang giới thiệu |
| `lib/track-stages.ts` | **Chặng thật** mà bảng điều khiển hiển thị: 21 chặng cá nhân, 43 chặng chuyên sâu, 7 nhánh nghề |
| `lib/bonus-lesson-categories.ts` | Nhóm của track bổ trợ |

Bài được gom vào chặng theo **dải id** (`days: [từ, đến]`), cộng thêm danh sách
`extraLessonIds` cho bài nằm lạc chỗ. Trường `day` đã chết: **0/643 bài có nó**.

---

## 3. Ba track và đối tượng học

| Track | Nhãn hiển thị | Đối tượng | Bài | Giờ |
|---|---|---|--:|--:|
| `personal` | Nền tảng công nghệ | Người mới hoàn toàn, chưa cần biết ngành | 220 | 21,2 |
| `professional` | Công nghệ chuyên sâu | Đã có nền lập trình | 361 | 29,9 |
| `bonus` | Bổ trợ | Đọc thêm, không nằm trong lộ trình chính | 62 | 5,8 |
| `cfa` | Chứng chỉ công nghệ (AWS SAA) | — | **0** | 0 |

Track thứ tư `cfa` vẫn tồn tại trong `lib/tracks.ts` với nhãn đã đổi thành
"Chứng chỉ công nghệ · AWS Solutions Architect (Associate)" và 4 miền thi, nhưng
**0 bài được ánh xạ vào**. Nó là một khung rỗng đang chờ nội dung, hoặc một thứ
cần gỡ — đây là quyết định của bạn, không phải lỗi.

### Độ khó

| Dễ | Trung bình | Khó |
|--:|--:|--:|
| 53 | 407 | 183 |

Phân bố lệch mạnh về "Trung bình" (63%). Track nền tảng cho người mới mà chỉ có
53 bài "Dễ" trên tổng 643 là điều đáng xem lại khi bạn sắp xếp lại.

---

## 4. Bản đồ chặng — Nền tảng công nghệ (21 chặng)
| Chặng | Tên | Số bài | Dải id |
|---|---|--:|---|
| Chặng 1 | Biết mình trước khi học: máy tính, hệ điều hành, dòng lệnh | 9 | 263–1353 |
| Chặng 2 | Git & kho mã chung | 8 | 1301–1308 |
| Chặng 3 | Tư duy lập trình và ngôn ngữ đầu tiên | 20 | 1–20 |
| Chặng 4 | HTML, CSS và trang web đầu tiên | 20 | 201–220 |
| Chặng 5 | JavaScript và trình duyệt | 20 | 221–240 |
| Chặng 6 | Cấu trúc dữ liệu và thuật toán cơ bản | 22 | 241–262 |
| Chặng 7 | Gọi API và ghép dịch vụ ngoài | 10 | 269–278 |
| Chặng 8 | Cơ sở dữ liệu và truy vấn | 10 | 279–288 |
| Chặng 9 | Triển khai, tên miền và bảo mật cơ bản | 13 | 289–1763 |
| Chặng 10 | Code review, kiểm thử và tài liệu | 7 | 1030–1240 |
| Chặng 11 | Nghề lập trình & đầu tư vào bản thân | 10 | 300–309 |
| Chặng 12 | Linux, mạng & giao thức | 10 | 310–319 |
| Chặng 13 | Đám mây và hạ tầng thuê ngoài | 8 | 320–327 |
| Chặng 14 | Thị trường IT Việt Nam trong thực tế | 10 | 330–339 |
| Chặng 15 | Blockchain & ứng dụng phi tập trung | 8 | 340–347 |
| Chặng 16 | An toàn thông tin & phòng tấn công | 8 | 350–357 |
| Chặng 17 | Ứng dụng di động thực chiến | 8 | 360–367 |
| Chặng 18 | Những dự án lớn trong nghề | 7 | 370–376 |
| Chặng 19 | Sức khoẻ nghề nghiệp và rủi ro con người | 5 | 380–384 |
| Chặng 20 | Nghề công nghệ theo giai đoạn sự nghiệp | 4 | 390–393 |
| Chặng 21 | Công cụ và vận hành | 4 | 400–403 |

Hai chỗ cần để ý khi sắp xếp lại:

- **Chặng 1** gom bài từ id 263 tới 1353 và **Chặng 9** từ 289 tới 1763. Chúng
  không phải dải liền mạch mà là nhiều mảnh ghép qua `extraLessonIds`. Đổi thứ
  tự ở đây khó hơn vẻ ngoài.
- **Chặng 19, 20, 21** chỉ có 5, 4, 4 bài — mỏng hơn hẳn phần còn lại (trung
  bình 10,5).

---

## 5. Bản đồ chặng — Công nghệ chuyên sâu (43 chặng, 7 nhánh nghề)
| Chặng | Tên | Số bài | Dải id | Nhánh nghề |
|---|---|--:|---|---|
| Chặng 1 | Nền tảng dữ liệu | 21 | 21–1244 | — |
| Chặng 2 | Mạng và giao tiếp giữa các hệ thống | 23 | 41–1692 | — |
| Chặng 3 | Từ mã nguồn tới người dùng | 20 | 61–80 | — |
| Chặng 4 | Đo lường sản phẩm và chọn việc | 20 | 81–100 | — |
| Chặng 5 | Quy mô và nhiều đội | 28 | 101–1753 | — |
| Chặng 6 | Bảo mật ứng dụng | 21 | 121–1036 | — |
| Chặng 7 | Hiệu năng: đo và tối ưu | 20 | 141–160 | — |
| Chặng 8 | Độ tin cậy và quản trị sự cố | 20 | 161–180 | — |
| Chặng 9 | Hàng đợi, sự kiện và xử lý bất đồng bộ | 20 | 181–200 | — |
| Chặng 10 | Nâng cao: Ứng dụng nghề Kỹ sư nền tảng & hệ thống lớn | 12 | 1021–1260 | — |
| Chặng 11 | Vận hành sản phẩm công nghệ hiện đại | 12 | 1202–1259 | — |
| Chặng 12 | Tâm lý người dùng và thiết kế hành vi nâng cao | 6 | 1241–1252 | — |
| Chặng 13 | AI trong sản phẩm: Dùng ChatGPT/Claude để đọc mã, rà lỗi và viết tài liệu | 20 | 1261–1280 | — |
| Chặng 14 | Masterclass chuyên đề: hạ tầng, mạng, startup công nghệ, bảo mật & phần mềm xanh | 5 | 801–805 | — |
| Chặng 15 | Dựng hệ thống thực hành (System Building) | 1 | 1342–1342 | — |
| Chặng 16 | Phần mềm xanh (Green Software & hiệu quả năng lượng) | 7 | 1229–1330 | — |
| Chặng 17 | Hệ điều hành cho người làm công nghệ | 1 | 1258–1258 | — |
| Chặng 18 | Xác thực, phân quyền và tuân thủ | 11 | 1218–1402 | — |
| Chặng 19 | Tối ưu hiệu năng và quản trị rủi ro vận hành | 7 | 1216–1414 | — |
| Chặng 20 | Nền tảng: quy trình nghiên cứu và thiết kế chuyên sâu | 9 | 1215–1289 | — |
| Chặng 21 | Quản trị dữ liệu và sao lưu | 8 | 1232–1287 | — |
| Chặng 22 | Phương pháp đo lường (Measurement & Benchmarking) | 6 | 1421–1426 | — |
| Chặng 23 | SQL và dữ liệu cho phân tích hệ thống | 6 | 1431–1436 | — |
| Chặng 24 | Chuẩn mực mã nguồn và quy định dữ liệu Việt Nam | 8 | 1441–1448 | — |
| Chặng 25 | Hệ sinh thái công nghệ Việt Nam | 7 | 1451–1457 | — |
| Chặng 26 | Hệ thống đa vùng và quốc tế hoá | **0** | — | — |
| Chặng 27 | Nội bộ runtime: cấu trúc và hiệu năng máy ảo | 4 | 1471–1474 | — |
| Chặng 28 | Kỹ năng nghề kỹ sư phần mềm | 4 | 1481–1484 | — |
| Chặng 29 | Công cụ phân tích dữ liệu | 6 | 1491–1496 | — |
| Chặng 30 | Tư duy phân tích dữ liệu | 6 | 1501–1506 | — |
| Chặng 31 | Lập kế hoạch dung lượng và vận hành | 6 | 1511–1516 | — |
| Chặng 32 | Cơ chế phát hành và di trú hệ thống | 6 | 1521–1526 | — |
| Chặng 33 | Kiểm thử: cách một bản phát hành được xác nhận | 6 | 1531–1536 | — |
| Chặng 34 | SRE: Nền tảng, rủi ro vận hành & rủi ro dung lượng | **0** | — | — |
| Chặng 35 | SRE: Rủi ro hiệu năng | **0** | — | — |
| Chặng 36 | SRE: Bảo mật nâng cao & Vấn đề thời sự | **0** | — | — |
| Chặng 37 | SRE: Nền tảng, vận hành, dung lượng & đo lường nâng cao | **0** | — | — |
| Chặng 38 | SRE: Đo lường, mô hình rủi ro & vấn đề thời sự | **0** | — | — |
| Chặng 39 | Sản phẩm thanh toán và ví điện tử | **0** | — | — |
| Chặng 40 | Quan hệ nhà phát triển (DevRel) | 5 | 1711–1715 | — |
| Chặng 41 | Nhật ký hệ thống và sổ sự kiện | 5 | 1721–1725 | — |
| Chặng 42 | Dự án hạ tầng và trung tâm dữ liệu | 5 | 1731–1735 | — |
| Chặng 43 | Định mức tài nguyên và chi phí đám mây | 5 | 1741–1745 | — |

### Tám chặng rỗng

`Chặng 26` (Hệ thống đa vùng và quốc tế hoá), `34`–`38` (năm chặng SRE) và
`39` (Sản phẩm thanh toán và ví điện tử) **có tên, có cấu trúc phần, nhưng 0 bài**.
Chúng đã được khai báo trước nội dung. Năm chặng SRE thuộc nhánh "Bảo mật, dữ
liệu & tư vấn" — nghĩa là nhánh đó hiện có 9 chặng thì 6 chặng rỗng.

### Nhánh nghề phân bố rất lệch

| Nhánh (id nội bộ) | Tên hiển thị | Số chặng |
|---|---|--:|
| `corporate` | Kiến trúc dịch vụ | 12 |
| `investment` | Hệ thống & hiệu năng | 13 |
| `banking` | Bảo mật, dữ liệu & tư vấn | 9 (6 rỗng) |
| `quant` | Đo lường & dữ liệu | 2 |
| `data` | Phân tích dữ liệu | 2 |
| `craft` | Kỹ năng nghề | 1 |
| `ai` | AI trong sản phẩm | 1 |

**Id nội bộ vẫn là tên tài chính** (`corporate`, `investment`, `banking`,
`quant`). Tên hiển thị đã đổi sang công nghệ. Id này được ghi xuống cơ sở dữ
liệu nên đổi nó không miễn phí — xem mục 10.

Ba nhánh cuối (`craft`, `ai`, `data`) mỗi nhánh 1–2 chặng, trong khi
`investment` có 13. Người chọn nhánh "AI trong sản phẩm" nhận đúng 20 bài rồi
hết lộ trình.

---

## 6. Cấu trúc một bài và luồng người học

Mỗi bài là một đối tượng với các trường sau (`lib/lesson-types.ts`):

| Nhóm | Trường | Bắt buộc |
|---|---|---|
| Định danh | `id`, `slug`, `track` | ✓ |
| Hiển thị | `title`, `subtitle`, `emoji`, `difficulty`, `duration` | ✓ |
| Thời lượng (sinh tự động) | `readingMinutes`, `totalMinutes`, `estimatedMinutes` | |
| Mở đầu | `whyItMatters`, `openingQuestion`, `openingOptions`, `correctOption`, `explanation` | ✓ (trừ `whyItMatters`) |
| Thân bài | `sections[]` (10 loại khối), `checkpointIndex`, `diagram[]` | ✓ |
| Minh hoạ | `realWorldExample {company, description}`, `interactiveType`, `summaryImage` | một phần |
| Kiểm tra | `quiz[]`, `practicePrompt` | ✓ |
| Đóng bài | `keyTakeaways[]`, `summary`, `application` | ✓ |

Mười loại khối `sections`: `lead`, `heading`, `paragraph`, `list`, `callout`,
`comparison`, `conceptTable`, `formula`, `closing`.

### Luồng một bài

```
whyItMatters  →  Câu hỏi mở đầu (4 phương án, chấm điểm)
              →  sections[0..checkpointIndex]
              →  "Dừng & Kiểm tra" giữa bài  (+ widget tương tác nếu có)
              →  sections[checkpointIndex+1..]
              →  diagram  →  realWorldExample  →  keyTakeaways
              →  Quiz cuối bài (5–7 câu, chấm điểm, ghi quiz_score)
              →  practicePrompt (tự kiểm, không vào điểm)
              →  summary / application
```

### Mở khoá tuần tự: **đang tắt toàn hệ thống**

`lib/lesson-lock-rule.ts` có đủ logic mở khoá tuần tự, điều kiện tiên quyết và
"thử thách kiểm tra kiến thức" cứ 5 bài một lần — nhưng `computeLessonLocked()`
**trả về `false` ngay dòng đầu**. Mọi bài đang mở cho mọi người. Toàn bộ phần
còn lại của hàm là mã chết có chủ ý, kèm chú thích cách bật lại.

Hệ quả khi bạn sắp xếp lại: **thứ tự hiện không ràng buộc gì cả.** Bạn đang tự
do đổi thứ tự mà không phá tiến độ của ai.

Kèm theo: `lib/lesson-stages.ts` (`getLessonStage`) vẫn chỉ biết tới id ≤ 140
cho track chuyên sâu và ≤ 288 cho cá nhân — tức là **lạc hậu vài trăm bài**.
Không ai thấy vì nó chỉ được gọi từ quy tắc khoá đang tắt.

---

## 7. Nội dung được dùng lại ở đâu ngoài trang bài học

Quiz của bài học không chỉ nằm trong bài học. Sáu mặt trận khác đọc lại chính
kho câu hỏi đó:

| Mặt trận | Đường dẫn | Lấy gì |
|---|---|---|
| Kiểm tra theo track | `/kiem-tra` | `quiz` của bài trong track |
| Thi chặng | `app/api/stage-exam` | `quiz` của bài trong chặng |
| Boss đơn (game) | `app/api/solo-boss/questions` | `quiz` |
| Thẻ ghi nhớ | `app/actions/flashcard-actions.ts` | `quiz` |
| Ôn câu sai | `/on-tap-cau-sai` | `quiz` đã trả lời sai |
| Đề thi thăng cấp | `lib/level-exams.ts` | **kho riêng, 382 câu** |

Nghĩa là **sửa một câu quiz là sửa ở sáu nơi cùng lúc** — đây là điểm mạnh, nhưng
cũng có nghĩa một câu hỏi tồi lan ra sáu mặt trận.

### Đề thi thăng cấp — kho tách biệt

14 cấp, 382 câu, ghi vào bảng `user_level_exams`:

```
Cấp  2  Học Viên Công Nghệ            Cấp  9  An Toàn Thông Tin & Nghề Nghiệp
Cấp  3  Lập Trình Viên Thực Chiến     Cấp 10  Huyền Thoại Công Nghệ
Cấp  4  Kỹ Sư Web                     Cấp 11  Kiến Trúc Hệ Thống Phân Tán
Cấp  5  Lập Trình Viên JavaScript     Cấp 12  Dữ Liệu Quy Mô Lớn
Cấp  6  Kỹ Sư Tích Hợp API            Cấp 13  Bậc Thầy Hiệu Năng
Cấp  7  Kỹ Sư Dữ Liệu & Vận Hành      Cấp 14  Lãnh Đạo Kỹ Thuật
Cấp  8  Kỹ Sư Hạ Tầng Đám Mây         Cấp 15  Kiến Trúc Sư Trưởng
```

Toàn bộ 14 cấp đã sang công nghệ. Kho này **có phép đo nhưng không có cổng gác**:
`scripts/audit-level-exam-length.mjs` chỉ in ra rồi luôn thoát 0.

---

## 8. Nợ nội dung — xếp theo mức người học nhìn thấy

### 8.1 · 20 bài bổ trợ từng KHÔNG hiện ra ở đâu cả — **đã sửa**

`DashboardClient` dựng các nhóm bổ trợ bằng cách duyệt `BONUS_CATEGORY_ORDER`
rồi lọc bài theo nhóm. Nhóm `"Đo lường & vận hành hệ thống"` đã được gán cho
**20 bài** trong đợt chuyển sang công nghệ, nhưng không ai thêm nó vào mảng thứ
tự — nên 20 bài đó lọc ra rỗng và không hiển thị. `tsc` xanh, không bộ kiểm nào
đỏ: một mảng thiếu một phần tử trông y hệt một mảng đủ.

**Lỗi thứ hai, cùng hình dạng, chỉ xảy ra ở bản tiếng Anh.** Bài chưa gán nhóm
rơi về `t.dashboard.bonusOther` — một nhãn *đã dịch* — rồi đem so với chuỗi khoá
`"Khác"` viết cứng trong mảng thứ tự. Tiếng Việt khớp ("Khác" === "Khác"); tiếng
Anh `bonusOther` là `"Other"`, không khớp nhóm nào, nên **23 bài chưa gán nhóm
biến mất với người đọc tiếng Anh**. Một lỗi chỉ xuất hiện ở ngôn ngữ mà người
sửa ít mở ra xem là một lỗi sống lâu.

Đã sửa cả hai ở tầng **cơ chế**, không phải bằng cách gõ thêm một dòng:

- `BONUS_CATEGORY_ORDER` giờ được **tính**, không gõ tay: thứ tự ưu tiên trước,
  mọi nhóm còn lại trong `BONUS_CATEGORIES` nối vào sau, nhóm dự phòng luôn
  cuối. Thêm một nhóm mới là đủ để nó hiện ra.
- Phép lọc dùng khoá `BONUS_CATEGORY_FALLBACK`, không dùng nhãn đã dịch.
- `bonusOther` đã gỡ khỏi cả hai từ điển. Nhãn nhóm dự phòng nay chỉ còn một
  nguồn (`t.bonusCategories["Khác"]`) — hai nguồn cho cùng một nhãn chính là
  cách lỗi này phát sinh.
- `lib/__tests__/bonus-categories-visible.test.ts` gác lớp lỗi này. Đã kiểm
  ngược bằng cách khôi phục mảng gõ tay cũ: bộ kiểm đỏ và gọi đúng tên nhóm bị
  bỏ sót.

Kết quả mô phỏng đúng phép lọc của `DashboardClient`, cả hai ngôn ngữ, 62/62
bài rơi vào đúng một nhóm:

| Nhóm (vi) | Nhóm (en) | Bài |
|---|---|--:|
| Định giá doanh nghiệp | Company valuation | 4 |
| Đọc báo cáo tài chính | Reading financial statements | 10 |
| Case công ty thực tế | Real company cases | 1 |
| Vốn & cổ đông | Capital & shareholders | 2 |
| Đầu tư & danh mục | Investing & portfolios | 2 |
| Đo lường & vận hành hệ thống | Measuring & running systems | **20** |
| Khác | Other | **23** |

**Việc còn lại là của bạn, và cố ý để lại:** 19 bài vẫn nằm dưới nhóm mang tên
tài chính, và 23 bài trong "Khác" chưa có nhóm. Đặt tên nhóm mới và gán 42 bài
này *là* việc sắp xếp nội dung — tôi sửa cơ chế để không bài nào tàng hình được
nữa, chứ không tự chọn taxonomy thay bạn.

### 8.2 · 27 URL công khai mâu thuẫn với chính nội dung của nó

Nội dung được thay nhưng `slug` giữ nguyên, nên địa chỉ nói một đằng, bài nói
một nẻo. Đây là thứ người học thấy trên thanh địa chỉ và khi chia sẻ link.
| Track | URL hiện tại | Nội dung thật |
|---|---|---|
| bonus | `/bai-hoc/tai-chinh-khoi-nghiep-cap-table-vc-valuation` | Chuyên Đề Masterclass 3: Kỹ thuật ở giai đoạn đầu |
| bonus | `/bai-hoc/tai-chinh-xanh-tieu-chuan-esg-tin-chi-carbon` | Chuyên Đề Masterclass 5: Phần mềm tiết kiệm năng lượng |
| bonus | `/bai-hoc/discontinued-operations` | Case chuyên sâu: Một lần tối ưu lớn |
| bonus | `/bai-hoc/commodity-phan-2` | Case chuyên sâu: Tài nguyên tính toán khan hiếm |
| bonus | `/bai-hoc/market-fair-value` | Case chuyên sâu: Chi Phí Mỗi Request Có Hợp Lý? |
| bonus | `/bai-hoc/vingroup-cash-flow` | Case chuyên sâu: Đọc dòng tài nguyên của một hệ thống lớn |
| bonus | `/bai-hoc/operating-leverage` | Chi phí cố định và chi phí theo lượng dùng |
| bonus | `/bai-hoc/income-affiliates-jv` | Chia chi phí và công cho dịch vụ dùng chung |
| bonus | `/bai-hoc/interim-comprehensive-income` | Số liệu giữa kỳ và thay đổi không hiện lên chỉ số chính |
| bonus | `/bai-hoc/maple-leaf-leverage` | Tỷ Lệ Nợ Kỹ Thuật |
| bonus | `/bai-hoc/tesla-cash-flow` | Case: dòng tài nguyên của một sản phẩm tăng nhanh |
| bonus | `/bai-hoc/tu-duy-tai-chinh` | Công sức tiêu đi và công sức tích lại |
| bonus | `/bai-hoc/khau-hao` | Phân bổ chi phí trả trước: ba cách và đường đi qua hoá đơn |
| bonus | `/bai-hoc/bang-can-doi-ke-toan` | Hệ thống đang có gì và dung lượng đến từ đâu |
| bonus | `/bai-hoc/esg-investing-screening-den-portfolio` | Từ sàng lọc tới ưu tiên: sửa dịch vụ nào trước |
| bonus | `/bai-hoc/quan-tri-doanh-nghiep-g-trong-esg` | Chất lượng vận hành: trụ cột ít được nhắc nhất |
| personal | `/bai-hoc/gui-tiet-kiem-hoat-dong-the-nao` | Chặng 12, Bài 1: Tiến trình - chương trình đang chạy là gì |
| personal | `/bai-hoc/lai-suat-thuc-sau-lam-phat` | Chặng 12, Bài 2: Tập tin, thư mục và quyền truy cập |
| personal | `/bai-hoc/rut-tiet-kiem-truoc-han` | Chặng 12, Bài 3: Cổng và dịch vụ đang lắng nghe |
| personal | `/bai-hoc/bac-thang-tien-gui` | Chặng 12, Bài 4: Tường lửa - mặc định là chặn |
| personal | `/bai-hoc/ngan-hang-so-va-vi-dien-tu` | Chặng 12, Bài 8: Shell script - gom việc lặp lại |
| personal | `/bai-hoc/ty-trong-va-bien-dong-crypto` | Chặng 15, Bài 7: Giới hạn thật - khi nào KHÔNG nên dùng chuỗi khối |
| personal | `/bai-hoc/tham-gia-crypto-the-nao` | Chặng 15, Bài 8: Tổng kết - dựng một ứng dụng phi tập trung nhỏ |
| professional | `/bai-hoc/bao-hiem-la-gi-mo-hinh-kinh-doanh` | Dự phòng dùng chung: vì sao không đội nào tự lo hết |
| professional | `/bai-hoc/thue-thu-nhap-doanh-nghiep-cach-tinh` | Chuẩn mực & Dữ liệu, Bài 3: Nghị định 13 - dữ liệu cá nhân là gì |
| professional | `/bai-hoc/thue-gtgt-va-thue-nha-thau` | Chuẩn mực & Dữ liệu, Bài 4: Sự đồng ý và quyền của chủ thể dữ liệu |
| professional | `/bai-hoc/thue-hoan-lai-deferred-tax` | Chuẩn mực & Dữ liệu, Bài 5: Đánh giá tác động xử lý dữ liệu |

Đo bằng cách: lấy từ khoá trong slug, bỏ dấu, bỏ từ dừng, so với từ khoá trong
tiêu đề. 56 bài không trùng một từ nào; trong đó 27 bài có slug mang khái niệm
tài chính — đó là bảng trên. **29 bài còn lại không phải lỗi**: slug đã là công
nghệ, chỉ khác cách diễn đạt với tiêu đề (`/bai-hoc/tcp-va-udp` → "Bảo đảm hay
nhanh: hai cách gửi dữ liệu"). Tôi tách riêng vì con số 56 dễ bị đọc nhầm thành
56 chỗ hỏng.

Cảnh báo trước khi đổi hàng loạt: xem mục 10.

### 8.3 · Lớp vỏ tài chính còn sót ở nơi khác

| Chỗ | Tình trạng |
|---|---|
| `PROFESSIONAL_BRANCHES` id | `corporate`, `investment`, `banking`, `quant` — tên hiển thị đã đổi, id chưa |
| Track `cfa` | Nhãn đã sang AWS SAA, nhưng 0 bài ánh xạ |
| 8 chặng rỗng | Chặng 26, 34–39 có tên nhưng chưa có bài |
| 29 bài chạm từ vựng tài chính | Phần lớn chính đáng; đáng soát lại: id 1051 (phân bổ chi phí trả trước), 242/245 (cấu trúc dữ liệu nhưng ví dụ tài chính) |

### 8.4 · Bản dịch tiếng Anh mới ở 9,5%

| Track | Đã dịch | Tỷ lệ |
|---|---|--:|
| `personal` | 11 / 220 | 5% |
| `professional` | 29 / 361 | 8% |
| `bonus` | 21 / 62 | 34% |

Giao diện thì gần xong: `scripts/i18n-coverage.mjs` báo **3 chuỗi** còn lại,
và cả 3 nằm trong `lib/d1/rpc.ts` (thông báo lỗi máy chủ), không phải copy màn
hình.

---

## 9. Chất lượng câu hỏi — tất cả cổng đang xanh

`npm run audit:lessons` (tiếng Việt, 643 bài · 3.230 câu):

```
PERSONAL      0 bài trượt        BONUS         0 bài trượt
PROFESSIONAL  0 bài trượt        Tổng          0 / 643
```

| Phép đo | Hiện tại | Trần |
|---|---|---|
| "Chọn phương án dài nhất" | 25% (may rủi 25%) | 25% |
| Lệch độ dài, |z| tệ nhất | **2,79** | 3,2 |
| `practicePrompt` dài nhất | z = 1,99 | 3 |
| `openingOptions` dài nhất / ngắn nhất | z = 0,85 / 1,26 | 3 |
| Câu trùng trong cùng bài | 0 | 0 |
| Lời giải quiz quá mỏng | 0 | 0 |
| Câu có hai đáp án đúng | 0 | 0 |
| Đáp án số trần không khớp lời giải | 0 | 0 |
| Bài được ân xá (baseline) | **0** | — |

Tiếng Anh (`npm run audit:lessons:en`, 61 bài · 315 câu): 0 bài trượt, |z| tệ
nhất 1,78. Dưới ngưỡng 400 câu nên cổng theo tỷ lệ chỉ báo cáo, chưa gác.

**Một điều chỉnh với tài liệu trong repo:** `AGENTS.md` nói `openingOptions`
đang đỏ ở `z(ngắn) = −3,28` và cần "thêm bốn bài". Đo lại hôm nay: **z = +1,26**,
xanh. Không ai viết bốn bài đó — kho bài đã dịch chuyển bên dưới con số. Đây
đúng là bài học mà chính `AGENTS.md` ghi hai lần: *một z-score trên một kho đang
đổi là một số đọc được, không phải một việc phải làm.* Đo lại trước khi bắt tay.

---

## 10. Ràng buộc phải biết trước khi sắp xếp lại

**1. `slug` là khoá dữ liệu người học, không chỉ là URL.** Sáu module ghi theo
slug: `lesson_highlights`, `lesson_bookmarks`, `lesson_notes`, `lesson_appeals`,
`lesson_manual_flags`, và bài viết trong cộng đồng. Đổi slug mà không di trú là
mất đánh dấu, ghi chú và bôi vàng của người học. Đổi 27 slug ở mục 8.2 cần một
bảng ánh xạ cũ→mới, chạy `UPDATE` cho sáu bảng đó, và một lớp chuyển hướng 301.

**2. `label` của chặng ("Chặng 7") đã ghi xuống cột `stage_label` trong Supabase.**
Nó là khoá dữ liệu chứ không phải nhãn hiển thị — `lib/track-stages.ts` ghi rõ
điều này và vì vậy nó **không được dịch**. Đánh số lại chặng sẽ làm mồ côi dữ
liệu tiến độ đã ghi.

**3. Số chặng của track chuyên sâu là tương đối theo nhánh.** Bảng điều khiển
đánh số lại theo nhánh nghề đang chọn, nên "Chặng 6" trong dữ liệu hiện ra là
"Chặng 1" với người chọn nhánh khác. Đừng viết số chặng tuyệt đối vào nội dung
bài.

**4. Thứ tự hiện KHÔNG ràng buộc.** Mở khoá tuần tự đang tắt (mục 6), nên đổi
thứ tự lúc này rẻ hơn nhiều so với sau khi bật lại.

**5. `lib/lessons.ts` là nguồn, `lib/lessons-data/` là bản sinh.** Sửa vào tệp
JSON đã sinh sẽ bị `npm run audit:lessons` ghi đè ngay lần chạy sau.

**6. Ghi đè chỉ được mang `quiz`.** `lib/lesson-quiz-overrides.js` hiện có đúng
3 slug. Một khoá khác (`sections`, `explanation`…) trong ghi đè sẽ âm thầm chiếm
quyền nội dung dạy — `lib/__tests__/lesson-override-shadowing.test.ts` chặn.

**7. Bản dịch là PATCH theo vị trí.** Phần tử thứ *i* của mảng tiếng Anh phải
dịch đúng phần tử thứ *i* tiếng Việt, vì `correct` đọc từ phía tiếng Việt.

---

## 11. Việc đề xuất, xếp theo tỷ lệ lợi ích / công sức

| # | Việc | Vì sao trước | Quy mô |
|---|---|---|---|
| 1 | ~~Sửa cơ chế nhóm bổ trợ~~ **xong** · còn: đặt tên nhóm công nghệ và gán 42 bài (19 dưới nhóm tài chính + 23 trong "Khác") | 20 bài đã hiện lại; phần còn lại là quyết định taxonomy của bạn | 1 tệp |
| 2 | Quyết định 8 chặng rỗng: viết bài hay gỡ khỏi `track-stages.ts` | Nhánh "Bảo mật, dữ liệu & tư vấn" có 6/9 chặng rỗng | 1 tệp hoặc ~160 bài |
| 3 | Cân lại nhánh nghề (13 chặng so với 1 chặng) | Người chọn nhánh AI hết lộ trình sau 20 bài | cấu trúc |
| 4 | Đổi 27 slug + di trú 6 bảng + chuyển hướng 301 | URL đang mâu thuẫn nội dung | cần di trú dữ liệu |
| 5 | Bổ sung bài "Dễ" cho track nền tảng | 53/643 bài Dễ, trong khi track này dành cho người mới | nội dung |
| 6 | Quyết định track `cfa` | Khung rỗng đang hiển thị | 1 tệp |
| 7 | Dịch tiếp tiếng Anh | Đang ở 9,5% | 582 bài |
| 8 | Cập nhật `getLessonStage` hoặc gỡ | Lạc hậu vài trăm bài, đang vô hại vì khoá tắt | 1 tệp |

---

## Phụ lục — lệnh đo lại

```bash
npm run audit:lessons        # quiz tiếng Việt, sinh lại lib/lessons-data/
npm run audit:lessons:en     # quiz đã dịch
node scripts/i18n-coverage.mjs   # chuỗi giao diện chưa dịch
node scripts/audit-level-exam-length.mjs   # đề thăng cấp (chỉ in, không gác)
```
