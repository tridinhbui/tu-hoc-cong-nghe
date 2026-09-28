# Brief: "AI ứng dụng trong doanh nghiệp" cho builder (professional track, chặng 44–49)

## Người học

Người đã biết lập trình cơ bản (biến, hàm, vòng lặp, HTTP, JSON) muốn đưa LLM vào
sản phẩm/hệ thống nội bộ đúng cách: kỹ sư phần mềm, kỹ sư dữ liệu, trưởng nhóm
chuyển đổi AI. Người đọc senior phải thấy nội dung phản ánh cách doanh nghiệp
thật làm: chi phí, độ trễ, đánh giá, bảo mật, phân quyền, con người duyệt.

Hiện kho gần như không có: RAG, embedding, evals, MCP, chi phí token, guardrails
đều bằng 0. Đừng lặp lại chặng "AI trong sản phẩm" (id 1261–1280) — đó là DÙNG AI
để viết mã; chặng của bạn là XÂY hệ thống có LLM bên trong.

## Khuôn MỘT bài

Vấn đề kỹ thuật thật → cơ chế (vì sao nó chạy như vậy) → mã/kiến trúc tối thiểu →
chế độ hỏng và đánh đổi (chi phí, độ trễ, chất lượng, bảo mật) → việc làm ngay.
Không gắn chặt vào một SDK: dùng dạng HTTP/JSON chung (messages, tools,
tool_use/tool_result) và nói rõ tên trường khác nhau giữa nhà cung cấp. Không
ghi giá tiền cụ thể theo nhà cung cấp (đổi liên tục) — dùng giá giả định ghi rõ
"giả định" khi cần tính.

## Mã là trung tâm

Khác chặng cho người đi làm: ở đây MỖI bài nên có ít nhất một khối `code`, và
MỖI chặng có ít nhất 2 khối `exercise` chạy được. Mã gọi API thật thì không
chạy được trong trình duyệt (không có khoá) — nên bài tập mô phỏng phần logic:
đếm/ước lượng token và chi phí, parse và validate JSON đầu ra, chunking, cosine
similarity, top-k, recall@k, vòng lặp agent với một "mô hình giả" (hàm trả về
kịch bản cố định), dispatch công cụ, che PII bằng regex, chấm điểm eval,
retry với backoff (không sleep thật), cache key... Dùng JavaScript hoặc Python
THUẦN (không thư viện ngoài, không fetch, không numpy). `solution` phải in đúng
`expectedOutput`; `starter` in đúng HÌNH DẠNG nhưng sai giá trị (một lỗi thật
người ta hay mắc), để không đoán được bằng cách in cứng.

Khối dùng được: `lead`, `heading`, `paragraph`, `list`, `callout`, `comparison`,
`conceptTable`, `feynman`, `closing`,
`{ type: "code", language: "javascript"|"python"|"sql"|"bash"|"json"|"text", code, caption?, runnable? }`
(`runnable: true` chỉ khi là JS/Python thuần tự chạy được và in ra gì đó),
`{ type: "exercise", language: "javascript"|"python", title, task, starter, solution, expectedOutput, hints? }`.
Bài 1 mỗi chặng có một khối `feynman` sau `lead` (3 cột, mỗi hàng 3 ô, oneLiner).
`sections` ≥ 5 khối (nên 9–14), khối cuối là `closing`.

## Trường bắt buộc

Như `lib/ai-agent-lessons.ts` (khuôn đầy đủ), NHƯNG `track: "professional"`.
`title`: `"<Tên chặng ngắn>, Bài k: <tiêu đề>"` (ví dụ "RAG, Bài 2: Chia nhỏ tài
liệu"). `difficulty`: "Trung bình" hoặc "Khó". `emoji`: chỉ dùng emoji có trong
`MAP` của `components/Glyph.tsx`. quiz 5 câu × 4 phương án, explanation ≥ 80;
explanation bài ≥ 250; diagram ≥ 2 nút; keyTakeaways ≥ 3; practicePrompt;
summary {keyIdea, formula, commonMistake, action}; application.

## Quy tắc quiz

Đọc mục "Writing quiz questions" trong AGENTS.md. Tóm tắt: đáp án đúng chỉ nêu
mệnh đề; ~1/4 câu đáp án đúng dài nhất, ~1/4 ngắn nhất, còn lại ở giữa; sửa lệch
bằng cách viết lại PHƯƠNG ÁN SAI; mỗi phương án sai là một nhầm lẫn kỹ sư thật
hay mắc (ví dụ "tăng top-k lên 50 để chắc chắn có đoạn đúng", "dùng chính mô
hình sinh câu trả lời để chấm nó mà không hiệu chỉnh"); không phương án rỗng;
bốn phương án dài xấp xỉ nhau. Câu có số thì phương án sai mang phép tính sai
tạo ra nó.

## Sự thật

Không bịa số liệu benchmark, không bịa sự cố. Tên thật chỉ khi chắc chắn (ví dụ:
MCP là giao thức mở do Anthropic công bố cuối 2024; EU AI Act có hiệu lực 2024
và áp dụng theo giai đoạn; OWASP có danh sách Top 10 cho ứng dụng LLM, trong đó
prompt injection đứng đầu). Không chắc thì viết ở mức nguyên lý.

## Giọng văn

Tiếng Việt, chính xác, không quảng cáo. Thuật ngữ tiếng Anh trong ngoặc lần đầu.
Không emoji trong chữ.

## Cách làm và tự kiểm

1. Chỉ tạo ĐÚNG MỘT tệp được giao. Không sửa tệp nào khác.
2. KHÔNG chạy generator, `npm run audit:*`, `npm test`, `next`.
3. Tự kiểm: `node scripts/check-lesson-file.mjs <tệp>` — tới khi không còn lỗi cứng,
   phân bố dài nhất ≤ 26%, ngắn nhất ≤ 30%, ở giữa ≤ 60%; hết cảnh báo dải độ dài.
   Lưu ý: toàn kho đang sát trần 25% "dài nhất", nên nhắm dài nhất khoảng 20–24%.
4. Báo lại: slug + một dòng mỗi bài, dòng phân bố, danh sách bài tập, chỗ không
   chắc về sự thật.
