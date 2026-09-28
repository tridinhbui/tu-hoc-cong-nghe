# Brief: chặng "Công nghệ cho người đi làm" (personal track, chặng 24–29)

## Người học

Người đi làm KHÔNG học CS: kế toán, FP&A, marketing, sales, chăm sóc khách hàng,
vận hành, nhân sự, quản lý nhỏ. Họ không muốn thành kỹ sư. Họ muốn hiểu công
nghệ đủ để làm việc tốt hơn: biết một công nghệ giải bài toán kinh doanh nào,
dùng công cụ gì, dựng ra sao, rủi ro gì — và tự làm được một workflow đơn giản.

Hiện kho bài gần như không có gì cho họ: RAG, no-code, tự động hoá, AI theo
phòng ban đều bằng 0. Đó là lỗ hổng các chặng này lấp.

## Khuôn MỘT bài (giữ đúng thứ tự tư duy này trong `sections`)

1. **Vấn đề kinh doanh** — một tình huống công việc cụ thể, đời thường, có con
   số thời gian/công sức cụ thể nếu hợp lý (ví dụ "mỗi cuối tháng mất 6 giờ
   chép số từ 4 file").
2. **Công nghệ giải nó thế nào** — ý tưởng, không thuật ngữ trước khi cần.
3. **Công cụ** — nêu tên công cụ thật. Mặc định: ChatGPT / Claude / Gemini /
   Microsoft Copilot cho AI; Google Sheets + Apps Script và Excel (+ Power
   Query) cho bảng tính; n8n cho tự động hoá (có bản tự host miễn phí và bản
   cloud); NotebookLM cho hỏi-đáp trên tài liệu; Looker Studio cho dashboard.
   Có thể nhắc Zapier/Make/Power Automate như lựa chọn tương đương.
4. **Dựng thế nào** — các bước làm được ngay. Mô tả ở mức ổn định (khái niệm,
   thứ tự bước, cấu trúc) — KHÔNG ghi đường dẫn nút bấm chi tiết hay giá tiền,
   vì giao diện và bảng giá đổi liên tục.
5. **Rủi ro** — dữ liệu nhạy cảm, AI bịa, lỗi im lặng, ai chịu trách nhiệm,
   khi nào cần người duyệt.
6. **Làm ngay** — `application` là một việc 15–30 phút người học tự làm được.

Bài cuối (hoặc hai bài cuối) mỗi chặng là **DỰ ÁN** có đầu ra thật, viết theo
từng bước đánh số, có tiêu chí "xong là khi…".

## Khối nội dung dùng được (`sections`)

`lead`, `heading`, `paragraph`, `list`, `callout`, `comparison`, `conceptTable`,
`feynman`, `closing`, và hai khối mới:

- `{ type: "code", language: "javascript" | "python" | "sql" | "bash" | "json" | "text", code, caption?, runnable? }`
  — dùng cho công thức, prompt mẫu (`language: "text"`), Apps Script,
  JSON trả về từ API. `runnable: true` chỉ khi mã là JavaScript/Python THUẦN
  chạy được một mình (không gọi SpreadsheetApp, fetch, v.v.).
- `{ type: "exercise", language: "javascript" | "python", title, task, starter, solution, expectedOutput, hints? }`
  — tuỳ chọn. Chấm theo đầu ra in ra. `solution` phải in đúng `expectedOutput`;
  `starter` KHÔNG được qua sẵn; nên để starter in đúng hình dạng nhưng sai giá
  trị. Chỉ dùng khi nó thật sự giúp người không biết code (ví dụ sửa một điều
  kiện lọc), không bắt buộc.

**Bài 1 của mỗi chặng có một khối `feynman`** ngay sau `lead`: ví dụ đời thường,
bảng đúng 3 cột (`["Thành phần", "<đời thường>", "<trên máy/công cụ>"]`), mỗi hàng
3 ô, và `oneLiner` chốt một câu. Xem khuôn ở `lib/ai-agent-lessons.ts`.

`sections` ≥ 5 khối (nên 8–12), khối cuối luôn là `closing`.

## Trường bắt buộc của một bài

Xem `lib/ai-agent-lessons.ts` làm khuôn đầy đủ (id, slug, title, subtitle,
duration, difficulty, emoji, track: "personal", isFundamental (bài 1 của chặng),
whyItMatters, openingQuestion, openingOptions (4), correctOption, explanation
(≥ 250 ký tự), diagram (≥ 2 nút), realWorldExample, quiz (5 câu, mỗi câu 4
phương án, explanation ≥ 80 ký tự), keyTakeaways (≥ 3), practicePrompt,
summary {keyIdea, formula, commonMistake, action}, application {title, message,
secondary?}, sections).

- `title`: `"Chặng N, Bài k: <tiêu đề>"`. `duration`: `"x phút"`.
- `difficulty`: phần lớn "Dễ", dự án có thể "Trung bình". Không "Khó".
- `slug`: chữ thường không dấu, nối bằng `-`, duy nhất trong kho.
- `emoji`: CHỈ chọn emoji đã có trong `MAP` của `components/Glyph.tsx` (giao diện
  vẽ emoji thành icon; emoji lạ sẽ không có icon). Không đặt emoji trong chữ.
- `correct` / `correctOption` để 0 cũng được — lúc sinh dữ liệu vị trí được
  xáo lại tự động. Độ DÀI thì không ai sửa hộ.

## Quy tắc quiz (bắt buộc — đọc mục "Writing quiz questions" trong AGENTS.md)

1. Đáp án đúng chỉ nêu mệnh đề; lý do để trong `explanation`.
2. Khoảng 1/4 số câu đáp án đúng là phương án dài nhất, khoảng 1/4 là ngắn
   nhất, còn lại ở giữa. Sửa lệch bằng cách viết lại PHƯƠNG ÁN SAI (dài ra bằng
   chính lỗi sai của nó), không cắt đáp án đúng.
3. Mỗi phương án sai là một nhầm lẫn người học thật sự mắc (ví dụ "dán cả file
   lương vào ChatGPT cho nhanh vì đã tắt lịch sử"), không phải câu vô lý.
4. Cấm phương án rỗng: "Luôn tốt", "Không ảnh hưởng", "Tất cả đều đúng"…
5. Không mâu thuẫn bài khác. Đọc các bài liên quan đã có: chặng 7 API
   (id 269–278), chặng 16 lừa đảo (350–357), chặng 22 Marketing với AI
   (`lib/ai-marketing-lessons.ts`), chặng 23 AI Agent (`lib/ai-agent-lessons.ts`),
   AI trong sản phẩm (id 1261–1280, trong `lib/lessons.ts`).
6. Bốn phương án trong một câu dài xấp xỉ nhau (±20% quanh trung bình).

## Ví dụ thực tế (`realWorldExample`)

Chỉ dùng tên công ty/sự kiện thật khi bạn CHẮC CHẮN nó có thật và công khai
(ví dụ: nhân viên Samsung dán mã nội bộ vào ChatGPT năm 2023; vụ deepfake gọi
video giả lãnh đạo lừa Arup ~25 triệu USD ở Hồng Kông năm 2024; toà án buộc Air
Canada chịu trách nhiệm cho câu trả lời sai của chatbot năm 2024; Klarna công
bố trợ lý AI xử lý phần lớn cuộc chat CSKH năm 2024). Không bịa số liệu. Không
chắc thì dùng tình huống chung, gọi đúng tên là tình huống (ví dụ company:
"Phòng kế toán 5 người").

## Giọng văn

Tiếng Việt, câu ngắn, giọng "đơn giản hơn bạn nghĩ" nhưng không hứa quá. Không
emoji trong chữ. Thuật ngữ tiếng Anh để trong ngoặc sau từ tiếng Việt lần đầu.
Không lan man về lịch sử công nghệ.

## Cách làm và tự kiểm

1. Chỉ tạo/sửa ĐÚNG MỘT tệp được giao. Không sửa `lib/lessons.ts`,
   `lib/track-stages.ts`, từ điển, hay bất kỳ tệp nào khác — người điều phối sẽ
   nối vào sau.
2. KHÔNG chạy `scripts/generate-lesson-data.mjs`, `npm run audit:*`, `npm test`
   hay `next` — các agent khác đang chạy song song và những lệnh đó ghi đè thư
   mục dùng chung.
3. Tự kiểm bằng: `node scripts/check-lesson-file.mjs <tệp của bạn>` — sửa tới
   khi không còn lỗi cứng và phân bố độ dài gần mục tiêu (dài nhất ≤ 33%, ngắn
   nhất ≤ 33%, ở giữa ≤ 62%), và xử lý phần lớn cảnh báo dải độ dài.
4. Báo lại: danh sách slug + một dòng mô tả mỗi bài, kết quả dòng phân bố của
   script, và mọi chỗ bạn không chắc về sự thật.
