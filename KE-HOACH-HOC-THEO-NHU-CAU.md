# Kế hoạch: Học theo nhu cầu + Chế độ Feynman

> Nguồn: feedback của một người học non-tech, 2026-09-27.
> Mục tiêu: người mới vượt được rào cản tâm lý đầu tiên — thấy **dễ** và thấy
> **"mình làm được"** trước khi gặp lý thuyết.

## Feedback, tóm lại

1. **Non-tech chỉ thấy bề nổi.** Họ đến vì một *việc muốn làm* (website, AI
   agent, marketing bằng AI), không phải vì một *môn học*. 21 chặng theo môn
   không cho họ biết việc đó nằm ở đâu.
2. **Nhịp người học đàn:** nghe/thấy → hay quá → thử → *wow, mình làm được* →
   tập nhiều → giỏi hơn → đam mê → rẽ hai hướng: **nghệ nhân** (đào sâu) hoặc
   **nghệ sĩ** (làm ra sản phẩm). Hướng nào cũng bắt đầu từ việc thử.
3. **Giải thích theo Feynman:** tiêu đề hứa điều dễ ("Tạo ra một website đơn
   giản hơn bạn nghĩ"), ví dụ đời thường (ngôi nhà = website), **bảng so sánh**,
   và **chốt trong một câu**.

## Nguyên tắc thiết kế

- **Không tạo kho bài thứ hai.** Hành trình theo nhu cầu chỉ trỏ vào slug đã có,
  nên tiến độ, quiz, điểm vẫn tính ở đúng một chỗ.
- **"Thử" đứng trước "học".** Chiến thắng đầu tiên nằm trên cùng của hành
  trình, trước chặng 1.
- **Ghi thật trạng thái.** Hành trình nào thiếu bài thì ghi "Đang bổ sung" /
  "Sắp có" — hứa nhiều hơn mình có là cách nhanh nhất làm người mới bỏ cuộc.
- **Mỗi chặng chốt đúng một câu.** Không tóm được trong một câu thì chính người
  viết chưa hiểu — đó là phép thử Feynman.

---

## Giai đoạn 1 — Lối vào theo nhu cầu ✅ (đã làm)

| Thứ | Ở đâu |
|---|---|
| Cấu trúc 4 hành trình (slug, trạng thái, chiến thắng đầu, hai hướng) | `lib/learning-flows.ts` |
| Chữ + thẻ Feynman vi/en (ví dụ đời thường, bảng 3 cột, câu chốt) | `lib/i18n/dictionaries/sections/learning-flows.ts` |
| Trang danh sách nhu cầu (công khai, không cần đăng nhập) | `app/hoc-theo-nhu-cau/page.tsx` |
| Trang một hành trình: thử ngay → các chặng → hai hướng | `app/hoc-theo-nhu-cau/[flow]/page.tsx` |
| Thẻ Feynman (bảng ở desktop, thẻ dọc ở điện thoại) | `components/learning-flows/FeynmanCard.tsx` |
| Demo "ngôi nhà": gõ tên, bật/tắt CSS và JS, bấm chuông | `components/learning-flows/WebHouseDemo.tsx` |
| Chương 01 trên trang chủ: "Bắt đầu từ việc bạn muốn làm" | `components/home/HomePage.tsx` |
| Mục navbar "Học theo nhu cầu" | `components/AppNavbar.tsx` |
| Test: slug tồn tại, mọi chặng có thẻ Feynman ở cả vi và en | `lib/__tests__/learning-flows.test.ts` |

Bốn hành trình:

| Hành trình | Trạng thái | Chặng | Ví dụ Feynman chính |
|---|---|---|---|
| 🏠 Làm website | Đủ bài | 4 | Website = ngôi nhà: HTML khung, CSS sơn, JS điện |
| 🤖 Dùng AI làm việc | Đủ bài | 4 | AI = thực tập sinh đọc cả thư viện nhưng hay bịa |
| 🧑‍🚀 Tạo AI Agent | Đang bổ sung | 4 | Agent = nhân viên: não (LLM), tay (API), sổ tay (bộ nhớ) |
| 📣 Marketing với AI | Sắp có | 2 | Marketing = mở quán cà phê |

## Giai đoạn 2 — Feynman *bên trong* bài học ✅ (đã làm)

- Loại khối `feynman` trong `sections` (kiểu, renderer dùng lại `FeynmanCard`,
  gộp bản dịch theo vị trí hàng, tính thời gian đọc) + test
  `lesson-feynman-block.test.tsx`.
- 23 bài có khối Feynman: bài mở đầu của **cả 21 chặng Nền tảng**, cộng
  `html-cau-truc-mot-trang` và `ai-trong-cong-viec-lap-trinh-bat-dau-tu-dau`.
  Hai bài đã có bản tiếng Anh được chèn khối tương ứng vào bản dịch để không
  lệch vị trí.
- Đổi tên 10 chặng kỹ thuật sang giọng "… đơn giản hơn bạn nghĩ" (1–9, 13), cả
  vi lẫn en. Chỉ đổi `name`; `label` ("Chặng N") giữ nguyên vì là khoá đã ghi
  xuống Cloudflare. Các chặng nghề nghiệp/sức khoẻ giữ tên cũ — giọng đó không
  hợp chủ đề của chúng.

**Lưu ý khi thêm khối Feynman vào bài đã có bản dịch:** `sections` của bản dịch
là theo vị trí, nên phải chèn khối tương ứng vào `lib/lessons-i18n/<locale>/`
cùng vị trí, nếu không cả phần thân bài rơi về tiếng Việt.

## Giai đoạn 3 — Onboarding hỏi "Bạn muốn làm gì?" ✅ (đã làm, chờ chạy migration)

- `migrations-d1/0005_learning_goal.sql`: cột `user_profiles.learning_goal`
  (id hành trình, NULL = chưa chọn). **Phải chạy lên D1 remote trước khi
  deploy**, nếu không lưu mục tiêu sẽ báo "chưa lưu được".
- `app/actions/learning-goal.ts`: `saveLearningGoal`, `getLearningGoalState`.
- `lib/learning-flow-progress.ts`: tiến độ theo thứ tự hành trình; không bao
  giờ gợi ý bài của hai nhánh cuối làm "bài tiếp theo".
- `components/learning-flows/LearningGoalCard.tsx`: chưa chọn → bốn thẻ nhu
  cầu; đã chọn → thanh tiến độ, câu chốt Feynman của chặng đang học, nút vào
  bài tiếp theo. Đặt ở đầu `/lo-trinh` (trước mục chọn track) và trên dashboard.
- Trang hành trình đánh dấu ✓ bài đã học khi có phiên.
- Track KHÔNG suy ra từ nhu cầu: một hành trình trải qua nhiều track, và việc
  chọn track vẫn giữ nguyên ở `/lo-trinh`.

## Giai đoạn 4 — Lấp chỗ trống nội dung

**Đã xong:** chặng 22 "Marketing với AI đơn giản hơn bạn nghĩ" — 6 bài mức Dễ
(`lib/ai-marketing-lessons.ts`, id 1770–1775, còn trống 1776–1779). Hành trình
Marketing với AI chuyển từ "Sắp có" sang "Đủ bài". 30 câu quiz qua audit; độ dài
đáp án đúng: dài nhất 6, ngắn nhất 5, ở giữa 19.

Chặng 23 "AI Agent đơn giản hơn bạn nghĩ" — 4 bài (`lib/ai-agent-lessons.ts`,
id 1780–1783): vòng lặp bằng giấy bút, mô tả công cụ, dựng agent từ đầu đến
cuối, chốt an toàn. Hành trình AI Agent chuyển sang "Đủ bài" và có thêm chặng
"Dựng agent". Độ dài đáp án đúng ở 28 câu mới: dài nhất 10, ngắn nhất 9, giữa 9.

**Bài học khi viết quiz:** viết theo khuôn "một phương án rất dài + hai rất
ngắn" làm đáp án đúng luôn nằm GIỮA (28/28) — cũng là một mách nước. Đo phân
bố ngay sau khi viết, trước khi chạy audit toàn kho.

**Còn lại:** demo tương tác cho hành trình AI, thêm bài mức Dễ.

| Việc | Vì sao |
|---|---|
| Chặng Marketing với AI (6–8 bài) | Hành trình đang "Sắp có", chỉ mượn bài nền |
| Một bài dựng AI Agent hoàn chỉnh từ đầu đến cuối | Hành trình Agent có bài nền nhưng chưa có bài "làm ra một cái chạy được" |
| Thêm bài **Dễ** | Chỉ 53/643 bài là "Dễ"; người non-tech cần nhiều bậc thang thấp hơn |
| Demo tương tác kiểu "ngôi nhà" cho AI (gõ prompt → so kết quả mơ hồ vs rõ ràng) | Chiến thắng đầu tiên cho hành trình AI hiện chỉ là một bài đọc |

Bài mới viết vào `lib/lessons.ts` và phải qua `npm run audit:lessons` — xem
quy tắc quiz trong `AGENTS.md`.

## Giai đoạn 5 — Áp cùng khuôn cho trang tài chính

Feedback nói "cả fin". Khuôn tái dùng được nguyên: `LEARNING_FLOWS` +
`FeynmanCard` + từ điển. Ví dụ nhu cầu: "Tôi muốn tiết kiệm được tiền", "Tôi
muốn hiểu đầu tư", "Tôi muốn đọc báo cáo tài chính".

## Đo xem có hiệu quả không

Không đoán — đếm:

- Tỉ lệ khách vào `/hoc-theo-nhu-cau/*` bấm "Học bài đầu tiên".
- Tỉ lệ học xong bài đầu tiên, và học tiếp bài thứ hai (đây mới là "I can do it").
- So với người vào thẳng từ `/lo-trinh` theo track.
