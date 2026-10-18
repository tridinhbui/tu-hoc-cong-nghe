# Triển khai học công nghệ — 2026-10-18

Nhánh `rasoat-giao-trinh-cong-nghe`. Không merge, không deploy, không đụng dữ liệu thật.
Chưa commit: các thay đổi nằm trong cây làm việc.

## 1. Kết quả audit (đã có, không xây trùng)

Đọc `TECH-CURRICULUM-AUDIT.md`, `lib/tools/*`, `components/lesson-blocks/*` và đo lại.

| Hạng mục | Đã có |
|---|---|
| Lộ trình | 1.513 bài, 67 chặng personal + 41 professional; nền tảng máy tính → Git → lập trình → Web → API → CSDL → triển khai → Linux/mạng → đám mây → ATTT → AI/LLM/RAG/agent |
| Chạy mã an toàn | Web Worker (`public/runners/`), Pyodide, CSP riêng, `terminate()` khi quá giờ; 628 bài tập chấm theo đầu ra, chạy trong CI |
| Simulator | `/cong-cu`: terminal (Git, Docker, Linux), editor (HTML/CSS), SQL, API, cloud — 111 nhiệm vụ |
| Khối tương tác | `sim`, `aiLab` (prompting + soi lỗi AI), `scenario`, `chart`, `flow`, `exercise`, `feynman` |
| Chấm điểm | Quiz có cổng độ lệch độ dài, bài tập chấm đầu ra, validator khối tương tác trong CI |

**Khoảng trống lớn nhất (đo bằng cách tìm khối đã có):** các bài về CPU, RAM, bộ nhớ,
tiến trình, hệ điều hành chỉ có chữ, `flow` (xem tuần tự, không tác động được), hoặc
`sim` mở terminal. Chưa có chỗ nào người học **chạy một chương trình mức máy và nhìn
thanh ghi/RAM đổi**, hay **tự làm bộ lập lịch của hệ điều hành**. Đó là mảng
"máy tính hoạt động thế nào" mà yêu cầu nêu đầu tiên.

## 2. Đã triển khai

Khối mới `machine` (bốn kiểu: `cpu`, `scheduler`, `http`, `dns`), chạy trên bộ thông dịch tự viết, **không eval**:

- `lib/lesson-blocks/machine.js` — CPU đồ chơi (4 thanh ghi, 8 ô nhớ, 8 lệnh: `LOAD LDM STM ADD SUB JNZ JMP HALT`) và bộ lập lịch round-robin có chi phí chuyển ngữ cảnh.
  - Giới hạn cứng: 40 dòng, 400 bước, 8 ô nhớ, giá trị ≤ 1.000.000. Vòng lặp vô hạn kết thúc bằng thông báo, không treo trang.
  - Lỗi trả về là mã có tham số, dịch qua từ điển vi/en.
- `components/lesson-blocks/MachineBlock.tsx` — soạn chương trình, chạy từng bước/chạy hết, xem thanh ghi và RAM; thanh trượt quantum với dòng thời gian CPU và bảng số liệu. Lời giải mở sau lần chạy thử đầu tiên; lời giải thích hiện sau khi qua bài hoặc mở lời giải.
- Chấm theo **kết quả chạy**: CPU phải dừng sạch và các ô nhớ đúng giá trị; bộ lập lịch phải thoả **hai** giới hạn cùng lúc (phản hồi nhanh và tổng thời gian ngắn), nên không có đáp án "kéo hết cỡ".
- `validate.js` chạy các khối trong CI (`npm run audit:lessons`): lời giải phải đạt, mã khởi đầu và giá trị trượt ban đầu **không** được đạt sẵn, mỗi giới hạn phải loại ít nhất một quantum.
- Dịch: `lib/lesson-translations.js` nhận bản vá chữ; chương trình, số liệu, mục tiêu đọc từ bản Việt.

Sáu phòng thí nghiệm (`lib/lesson-block-additions/t06.ts`), chèn trước `closing`, không đổi id/slug/quiz:

| Bài | Phòng thí nghiệm | Điều học |
|---|---|---|
| `chuong-trinh-trong-bo-nho` | Nhân 6×7 chỉ bằng cộng | chương trình = chuỗi lệnh nhỏ; lỗi "chạy được nhưng sai" (36 thay vì 42) |
| `bo-cuc-bo-nho-va-chi-phi-truy-cap` | Hoán đổi hai ô nhớ | ghi là ghi đè; cần chỗ nháp |
| `tien-trinh-chuong-trinh-dang-chay` | Lập lịch Video/Chat/Thư (đáp án duy nhất q=3) | đánh đổi phản hồi và chi phí chuyển |
| `he-dieu-hanh-lam-gi` | Bốn việc chờ một CPU (đáp án duy nhất q=4) | hệ điều hành là bộ điều phối |

| `http-yeu-cau-va-phan-hoi` | Dựng yêu cầu tới máy chủ giả: 404 → 405 → 401 → 400 → 201 | mỗi mã lỗi chỉ ra một tầng sai (đường dẫn, phương thức, danh tính, nội dung) |
| `dns-tu-ten-mien-toi-dia-chi-ip` | Chọn TTL khi đổi máy chủ (đáp án 110–120) | đánh đổi tốc độ đổi địa chỉ và tải lên máy chủ DNS |

Số liệu lập lịch, DNS và máy chủ HTTP đều là mô hình đơn giản hoá, ghi rõ trong lời giải thích. Máy chủ HTTP giả chạy hoàn toàn trong trình duyệt, không gửi gì ra mạng.

## 3. Kiểm thử

| Kiểm tra | Kết quả |
|---|---|
| `tsc --noEmit` | PASS |
| eslint trên tệp đã đổi/mới | PASS |
| `npm run audit:lessons` | PASS (thoát 0; 0 khối hỏng; thiếu thực hành/hình ảnh 0/1513) |
| `npm run audit:lessons:en` | PASS |
| `npm run audit:exercises` | PASS (628 khối, không đổi) |
| `lib/__tests__/machine.test.ts` (11) | PASS: nhân bằng cộng, vòng lặp vô hạn dừng, từ chối lệnh lạ/mã kiểu JS, lập lịch, validator |
| `lib/__tests__/machine-block.test.tsx` (9) | PASS: sai mục tiêu không ghi nhận; sửa mã rồi chạy ghi nhận đúng một lần; lỗi hiển thị bằng tiếng Anh; thanh trượt đạt; bản chữ cho trình đọc màn hình |
| `vitest run` toàn bộ | 2.095 qua, **2 đỏ có từ trước, không do thay đổi này**: `kiem-tra-page` (3 tệp sửa dở từ trước phiên, đã ghi ở báo cáo cũ) và `token-pairs-not-reintroduced` (đỏ cả trên cây sạch, 1 cặp `bg-brand-600`/dark) |
| Trình duyệt, 375px (lượt 2: HTTP, DNS) | PASS: gửi yêu cầu khởi đầu ra 404 với lời giải thích tiếng Việt, scrollWidth = 375, bảng DNS có `caption`. |
| Trình duyệt, 375px (lượt 1: CPU, lập lịch) | PASS: trang tạm render khối, không tràn ngang (scrollWidth = 375), CPU chạy ra R0 = 36 / ô 2 = 36 đúng như tính, kéo quantum = 3 hiện đạt cả hai giới hạn, không lỗi console. Trang tạm đã xoá. |
| Trình duyệt, desktop | BLOCKED: chỉ mở được bằng trang tạm ở viewport mobile; chưa chụp riêng desktop |
| Trang bài học thật trong trình duyệt | **BLOCKED**: bắt đăng nhập (và D1 cục bộ); tôi không tạo tài khoản hay nhập mật khẩu. Khối được kiểm qua trang tạm và test component, không qua `LessonSections` trong trình duyệt. |
| `next build` | **Chưa chạy** (server dev của phiên khác đang dùng cùng thư mục `.next`) |
| Accessibility | Một phần: nhãn cho ô soạn/thanh trượt, bảng có `caption`/`scope`, bản chữ `sr-only` của dòng thời gian, trạng thái không chỉ bằng màu, `role=alert`/`status`. **Chưa** kiểm bằng trình đọc màn hình thật hay axe. |
| Người học giả lập | **Không làm được thật.** Tôi không có người học; thứ thay thế duy nhất là kiểm "mã khởi đầu không đạt sẵn" và "đáp án duy nhất" bằng máy. Đây không phải kiểm thử với người dùng. |

## 4. Giới hạn đã biết

- Chỉ **6 bài** có khối mới. Các mảng còn trống: mô phỏng DNS/HTTP từng gói, mạng (TCP handshake, định tuyến), hạ tầng đám mây ở mức hình học, RAG/agent chạy thử trong lab.
- CPU đồ chơi không có so sánh, ngăn xếp, địa chỉ gián tiếp (nên chưa mô phỏng được mảng, con trỏ). Bộ lập lịch chỉ round-robin; chưa có ưu tiên, FCFS/SJF để so sánh.
- Bản dịch tiếng Anh của sáu bài chứa khối mới **chưa có** (cả sáu chưa có bản dịch); khi dịch, khối mới phải chèn cùng vị trí.
- Ghi "đạt" dùng cùng cơ chế `recordExercisePass`, là lời khai của client như các bài tập khác.
- Sandbox: bộ thông dịch không truy cập DOM/mạng/`eval`; rủi ro còn lại là CPU (≤ 400 bước mỗi lần bấm), đã chặn.

## 5. Việc nên làm tiếp (ưu tiên)

1. ~~HTTP/DNS~~ — đã làm (kiểu `http`, `dns`). Còn lại: TCP handshake/mất gói, định tuyến, TLS từng bước, lab đám mây ở mức hạ tầng.
2. Thêm kiểu `scheduler` so sánh thuật toán, và lệnh so sánh/địa chỉ gián tiếp cho CPU để dạy mảng và con trỏ.
3. Chấm DOM cho HTML/CSS (F4 trong audit cũ), để phủ Chặng 4.
4. Dịch 6 bài này sang tiếng Anh theo quy trình hai lượt trong `AGENTS.md`.
5. Kiểm với người học thật, và đo qua trang bài học đăng nhập.
