# Kế hoạch: Tự học Vibecode

> Vibecode = mô tả điều muốn làm bằng lời, để AI viết code, người học điều hướng,
> chạy thử, sửa lỗi và quyết định. Người học không cần viết từng dòng, nhưng phải
> **đọc được, chạy được, sửa hướng được**.

## Hiện trạng (đã kiểm tra 2026-10-17)

- Chưa có hành trình, chặng hay bài nào gọi tên "vibecode" (chỉ xuất hiện trong
  `copy-tone.test.ts` và `i18n-scan.mjs`).
- Đã có nền để dựa vào: hành trình `website`, `ai-assistant`, `ai-agent`,
  `ai-builder` trong `lib/learning-flows.ts`; bài `viet-yeu-cau-cho-ai-prompt`,
  `ai-trong-cong-viec-lap-trinh-bat-dau-tu-dau`, các bài git, các bài dựng agent.
- Khung tái dùng được: `LEARNING_FLOWS` + `FeynmanCard`, khối `exercise` / `sim` /
  `aiLab` / `scenario`, tiến độ theo hành trình (`learning-flow-progress.ts`).

## Nguyên tắc

1. **Thử trước, học sau.** Bài đầu: gõ một câu, thấy trang web chạy. Không mở đầu bằng lý thuyết.
2. **Không dạy "AI làm hộ".** Mỗi chặng có một việc người học phải tự làm: đọc diff, chạy test, bắt lỗi AI bịa.
3. **Không lập kho bài thứ hai.** Hành trình trỏ vào slug; tiến độ và quiz tính ở một chỗ.
4. **Ghi thật trạng thái.** Chặng chưa có bài thì ghi "Đang bổ sung".
5. **Công cụ đổi nhanh** (Cursor, Claude Code, Copilot, Lovable...). Dạy theo *thao tác* (mô tả, chạy, đọc, sửa), công cụ chỉ là ví dụ minh hoạ, nêu ngày kiểm lần cuối.

## Hành trình đề xuất: `vibecode` (6 chặng, mỗi chặng chốt một câu Feynman)

| # | Chặng | Chiến thắng | Câu chốt | Khối thực hành |
|---|---|---|---|---|
| 1 | Làm trang đầu tiên trong 10 phút | Một trang web chạy được từ một câu mô tả | AI là thợ xây nhanh, bạn là chủ nhà giữ bản vẽ | `sim` + `aiLab` |
| 2 | Viết yêu cầu như bản giao việc | Cùng một ý, prompt mơ hồ vs rõ: so kết quả | Yêu cầu càng cụ thể, sửa càng ít | `aiLab` so sánh prompt |
| 3 | Đọc được thứ AI viết | Chỉ ra chức năng của từng khối code, bắt một lỗi | Không đọc được thì không dám giao | `exercise` đọc code, tìm lỗi |
| 4 | Chạy, lỗi, sửa (vòng debug) | Dán thông báo lỗi đúng cách, sửa trong 3 vòng | Lỗi là câu hỏi, không phải thất bại | `scenario` + `exercise` |
| 5 | Giữ dự án không sụp (git, bước nhỏ, test) | Commit từng bước, quay lại được khi AI làm hỏng | Mỗi bước nhỏ phải quay lại được | `exercise` git, `scenario` |
| 6 | Đưa lên mạng & an toàn | Deploy một app nhỏ, không lộ khoá API | Chạy được chưa phải là an toàn | `flow` + `scenario` |

Hai hướng cuối (theo mẫu các hành trình khác): **nghệ nhân** (học code sâu,
sang track lập trình) và **nghệ sĩ** (làm sản phẩm thật, dự án cuối).

## Dự án xuyên suốt

Một app nhỏ người học tự chọn (sổ chi tiêu, trang giới thiệu quán, bộ thẻ ghi nhớ).
Mỗi chặng thêm một lớp: giao diện → dữ liệu → sửa lỗi → lưu phiên bản → đưa lên mạng.
Cuối hành trình có thứ để khoe, không chỉ điểm quiz.

## Các giai đoạn thực hiện

| GĐ | Việc | Đầu ra |
|---|---|---|
| 1 | Khung hành trình: thêm `vibecode` vào `learning-flows.ts` (FlowId, chặng, câu chốt vi/en), thẻ Feynman, test slug tồn tại. Chặng nào chưa có bài ghi "Đang bổ sung". | Trang `/hoc-theo-nhu-cau/vibecode` |
| 2 | Chặng 1–2 (≈8 bài Dễ): file `lib/vibecode-lessons.ts` theo mẫu `ai-agent-lessons.ts`, id còn trống, mỗi bài một khối thực hành + một khối trực quan | 8 bài qua `npm run audit:lessons` |
| 3 | Chặng 3–4 (≈8 bài): bài đọc code, bài debug có `exercise` chạy được trong CI (`audit:exercises`) | 8 bài |
| 4 | Chặng 5–6 (≈8 bài) + dự án cuối; tái dùng bài git hiện có thay vì viết lại | 8 bài + 1 dự án |
| 5 | Dịch en (`lib/lessons-i18n/en`), chạy `audit:lessons:en`, rebalance hai lượt | Bản tiếng Anh |
| 6 | Đo: tỉ lệ bấm "Học bài đầu tiên", học tiếp bài hai, hoàn thành chặng 1 | Số liệu |

Tổng ước tính: ~24 bài mới, phần lớn mức Dễ/Vừa.

## Rủi ro và cách chặn

- **Quiz bị đoán được:** theo AGENTS.md, đo phân bố độ dài ngay trên từng batch bằng `scripts/check-lesson-batch.mjs <file>`, nói rõ mục tiêu phân bố cho cả `quiz`, `practicePrompt`, `openingOptions` ngay từ đầu.
- **Nội dung lỗi thời** khi công cụ đổi: bài dạy thao tác, ghi công cụ ở khối ví dụ riêng.
- **Người học lệ thuộc AI:** mỗi chặng có một bài "tự làm không AI" để kiểm tra hiểu.
- **Chạy code lạ:** bài chỉ dùng runner Web Worker sẵn có, không thực thi code do người học dán từ nguồn ngoài ngoài sandbox đó.
- **Ghi migration:** nếu thêm giá trị mới cho `learning_goal`, kiểm tra D1 có ràng buộc giá trị không trước khi deploy.

## Cần bạn quyết

1. Đối tượng chính: non-tech hoàn toàn, hay người đã biết chút code?
2. Công cụ minh hoạ chính: Cursor / Claude Code / Lovable / không gắn công cụ nào?
3. Là hành trình mới `vibecode`, hay một chặng mới trong hành trình `website`/`ai-builder`?

## Tiến độ (2026-10-17)

- GĐ1 xong: hành trình `vibecode` (5 chặng, "Đang bổ sung") trong `lib/learning-flows.ts`, chữ vi/en, bộ chọn nhiệm vụ.
- GĐ2 một phần: Chặng 67 "Làm sản phẩm cùng AI mà vẫn kiểm soát được" (ids 2740-2749,
  `lib/ai-work-lessons/s67-a.ts`), đã có 4 bài Dễ (2740-2743: giao việc, chia bước, đặt ranh giới,
  nghiệm thu). Plumbing: `track-stages.ts`, `tracks.ts`, từ điển track-stages vi/en,
  `stage-topics.ts` (ai-building), `practical-skill.ts`, `revampDashboard.stages` vi/en.
- Còn: 2744 (bài 5 của phần giao việc), dải 2745-2749 (đọc và kiểm tra thứ AI viết), bản dịch en của 4 bài,
  bài tự làm không AI ở mỗi chặng, dự án xuyên suốt.
- Lưu ý: toàn bộ test lib còn 1 test hỏng có sẵn (`kiem-tra-page`, "+8 XP" trùng), không do phần này.
