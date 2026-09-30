# Kế hoạch: 1.500+ bài, AI thực tế, bài nào cũng có thực hành và hình động

Ngày lập: 2026-09-30

## 1. Đang đứng ở đâu (đo, không ước)

| Chỉ số | Hiện tại | Đích |
| --- | --- | --- |
| Tổng số bài | 744 (personal 266 · professional 415 · bonus 62) | **1.500+** |
| Bài có khối thực hành chạy được (`exercise`) | 134 (18%) | **100%** |
| Bài có biểu đồ / hình động | 0 (chưa có khối `chart`) | **100%** |
| Bài có khối Feynman (đời thường trước) | 53 | 100% bài của track người mới |
| Trình mô phỏng | 5 cái (Terminal, SQL, API, Cloud, Editor) nhưng chỉ sống ở `/cong-cu`, **không nhúng được vào bài** | nhúng được mọi nơi |

Đã có sẵn và dùng lại được: `recharts` đã có trong `package.json`, `components/tools/*Sim.tsx`, bộ chạy code trong Web Worker (`public/runners/`), `WebHouseDemo`, chấm theo output (`npm run audit:exercises`).

## 2. Nguyên tắc (không thương lượng khi tăng tốc)

1. **Hạ tầng trước, bài sau.** Viết 760 bài bằng các khối hiện có rồi quay lại gắn tương tác nghĩa là phải sửa hai lần. Tuần 1-3 chỉ làm khối mới và cổng kiểm.
2. **Cổng kiểm là thứ giữ chất lượng, không phải người đọc lại.** Lịch sử của repo (AGENTS.md) cho thấy mỗi lần tăng số bài mà không có cổng kiểm thì lỗi lọt qua. Ví dụ: 91% đáp án đúng là phương án dài nhất, hoặc ba đợt bài mới dưới chuẩn mà CI vẫn xanh. Mọi yêu cầu mới dưới đây đều thành một dòng trong `scripts/audit-lesson-content.mjs`.
3. **"Bài nào cũng có biểu đồ" nghĩa là "bài nào cũng có một thứ để NHÌN chuyển động".** Ép một biểu đồ số liệu vào bài "quyền truy cập tệp" thì chỉ ra một hình trang trí, đúng loại người mới nhận ra ngay là lấp chỗ trống. Vì vậy mỗi bài cần ít nhất một khối trong **họ hình ảnh**: biểu đồ số liệu, sơ đồ luồng chạy từng bước, hoặc sơ đồ trạng thái bấm được. Biểu đồ số liệu dành cho bài có số thật.
4. **Công cụ "mới nhất" sẽ cũ đi.** Mỗi bài về công cụ tách làm hai phần. Phần *bền* là khái niệm và cách nghĩ. Phần *theo phiên bản* là các bước bấm, kèm `verifiedAt` và `toolVersion`. Cổng kiểm báo đỏ khi phần theo phiên bản quá 120 ngày chưa được kiểm lại.
5. **Không bịa tính năng.** Mọi bước thao tác trong bài về công cụ phải trích nguồn chính thức (docs, changelog) trong trường `sources`. Không có nguồn thì không có bài.
6. **Người mới đi trước.** Thứ tự ưu tiên luôn là: track người mới → AI cho công việc → nâng cao.

## 3. Giai đoạn 1: hạ tầng (tuần 1-3)

Bốn khối mới trong `components/lesson-blocks/`, mỗi khối lazy-load (tải khi cuộn tới) để trang bài không nặng thêm:

| Khối | Làm gì | Chấm thế nào |
| --- | --- | --- |
| `sim` | Nhúng một trình mô phỏng có sẵn (terminal / sql / api / cloud / editor) vào bài, kèm nhiệm vụ và trạng thái ban đầu | Chấm theo **kết quả**, giống SQL Console: bảng ra đúng, tệp tồn tại, request trả 200 |
| `aiLab` | Mô phỏng khung chat AI: người học viết hoặc sửa prompt, nhận phản hồi **viết sẵn** theo phần nào của prompt đã có (bối cảnh, việc cần làm, khuôn dạng, ví dụ). Có biến thể "tìm chỗ AI bịa" (gạch chân số liệu sai trong một bản nháp) | Chấm theo các thành phần có mặt / các lỗi đã bắt được, không gọi LLM thật |
| `scenario` | Tình huống công việc rẽ nhánh 2-4 bước ("Sếp gửi file 3.000 dòng, bạn làm gì trước?"); mỗi nhánh sai dẫn tới hậu quả cụ thể rồi cho làm lại | Mọi nhánh phải đi tới kết thúc; cổng kiểm duyệt đồ thị không có ngõ cụt |
| `chart` | Biểu đồ `recharts` (line / bar / scatter / area) có **thanh trượt "nếu… thì"**: kéo tham số, đường cong đổi theo (chi phí token theo số tài liệu, thời gian tiết kiệm theo số email/ngày, lãi kép) | Dữ liệu là hàm hoặc bảng khai báo trong bài; cổng kiểm chạy thử hàm ở hai đầu thanh trượt |
| `flow` | Sơ đồ luồng chạy từng bước (nâng cấp trường `diagram` tĩnh hiện có): bấm "Bước tiếp" để thấy dữ liệu đi qua từng khâu | Tối thiểu 3 bước, mỗi bước một câu |

Tại sao `aiLab` là mô phỏng chứ không gọi AI thật (Workers AI đã có binding từ `/api/coco-chat`): gọi AI thật tốn chi phí mỗi lượt, có thể trả lời sai ngay trong bài dạy "AI hay bịa", và không chấm lặp lại được. Có thể thêm một khu "thử với AI thật" sau giai đoạn 3, ghi rõ là ngoài phần chấm điểm.

**Cổng kiểm mới** (đặt ở mức kho bài đạt được, rồi nâng dần theo luật ở AGENTS.md):

- `MIN_PRACTICE_BLOCKS`: số khối thuộc `exercise | sim | aiLab | scenario` mỗi bài. Bắt đầu ở 0 cho bài cũ (danh sách miễn trừ ghi vào baseline), **1 cho mọi bài mới** ngay từ ngày đầu.
- `MIN_VISUAL_BLOCKS`: số khối thuộc `chart | flow | feynman`. Cách làm tương tự.
- `TOOL_FRESHNESS_DAYS = 120` cho bài có `toolVersion`.
- Mở rộng `audit:exercises` để chạy cả lời giải mẫu của `sim` và `scenario`.

**Xong giai đoạn 1 khi** có năm khối trên, mỗi khối có một bài mẫu hoàn chỉnh, test, bản tiếng Anh, và các cổng kiểm đã chạy trong CI.

## 4. Giai đoạn 2: 760+ bài mới (tuần 4-16)

Chia theo **việc người học muốn làm**, không theo môn. Mỗi cụm là một hành trình mới hoặc mở rộng trong `lib/learning-flows.ts`:

| Cụm | Số bài | Ví dụ bài |
| --- | --- | --- |
| **AI theo nghề / phòng ban**: kế toán, nhân sự, bán hàng, CSKH, marketing, giáo viên, luật, y tế hành chính, chủ shop online | 260 | Đối chiếu sao kê bằng AI; soạn JD và lọc CV có kiểm thiên lệch; kịch bản gọi khách và tóm tắt cuộc gọi |
| **Công cụ AI hằng ngày**: ChatGPT, Claude, Gemini, Copilot (Office), NotebookLM, Perplexity, Canva AI, Notion AI, Gemini trong Google Sheets | 180 | Dự án trong Claude / ChatGPT; NotebookLM biến tài liệu nội bộ thành trợ lý; so sánh ba công cụ trên cùng một việc |
| **Tự động hoá không cần code**: Zapier, Make, n8n, Power Automate, Apps Script có AI viết hộ | 110 | Email khách → dòng trong bảng tính → nháp trả lời |
| **Làm sản phẩm với AI**: AI viết code (Cursor, Claude Code, Copilot), dựng trang web / app nhỏ, đưa lên mạng | 90 | Tự làm trang đặt lịch cho tiệm; sửa lỗi bằng cách đọc thông báo lỗi cùng AI |
| **Dữ liệu với AI**: bảng tính, biểu đồ, Power BI Copilot, đọc số liệu có kiểm chứng | 60 | Từ bảng lộn xộn tới 5 nhận xét có dẫn ô nguồn |
| **Dùng AI an toàn**: dữ liệu cá nhân, prompt injection, bản quyền, quy định tại Việt Nam | 40 | Việc gì không được dán vào AI ở công ty bạn |
| **Nền tảng cho người mới**: viết lại chặng 1 theo thứ tự có câu chuyện | 30 | Tách bài lập kế hoạch học ra khỏi chuỗi bài dòng lệnh |
| **Tổng** | **770** | → **1.514 bài** |

**Khuôn bài cho 770 bài mới** (bắt buộc, cổng kiểm giữ):

1. Mở bằng một việc cụ thể trong tuần làm việc của người học, không mở bằng định nghĩa.
2. Khối Feynman: đồ vật đời thường → thuật ngữ.
3. Ít nhất 1 khối thực hành (`aiLab` / `sim` / `scenario` / `exercise`) **và** 1 khối hình ảnh (`chart` / `flow`).
4. `application`: việc làm được trong 20 phút với tài liệu của chính người học. Thẻ "Hôm qua bạn thử chưa?" đọc trường này.
5. Quiz ≥5 câu theo đúng 6 luật trong AGENTS.md (độ dài phương án, phương án gây nhiễu phải là lỗi người học hay mắc thật, không có phương án vô lý).
6. Bài về công cụ thêm `toolVersion`, `verifiedAt`, `sources`.

**Nhịp làm**: mỗi đợt 20 bài. Agent viết → `audit:lessons` + `audit:exercises` + bộ kiểm khối mới → một người đọc 3 bài chọn ngẫu nhiên trong đợt → rồi mới merge. Làm cân bằng độ dài phương án cho đợt vừa viết **trước** khi viết đợt tiếp theo (bài học từ việc dịch tiếng Anh: làm hai việc song song thì con số trôi đi nhanh bằng tốc độ sửa). Khoảng 3 đợt mỗi tuần thì 13 tuần xong 770 bài.

## 5. Giai đoạn 3: bổ sung tương tác cho 744 bài cũ (chạy song song từ tuần 6)

Thứ tự theo **lượt mở bài thật** (sự kiện `lesson_open` đã ghi từ `LessonPageClient`), không theo số thứ tự bài:

1. 266 bài track người mới, bắt đầu từ chặng 1-3.
2. Bài đầu tiên của mọi hành trình, tức các bài xem thử cho khách.
3. Phần còn lại của track chuyên sâu.

Mỗi bài cũ cần thêm 1 khối thực hành + 1 khối hình ảnh. Với 610 bài chưa có thực hành, phần lớn dùng `sim` có sẵn (dòng lệnh, SQL, API) hoặc `scenario`, nên nhanh hơn viết bài mới. Mỗi bài xong thì gỡ khỏi danh sách miễn trừ. Khi danh sách về 0, nâng `MIN_PRACTICE_BLOCKS` và `MIN_VISUAL_BLOCKS` lên 1 cho toàn bộ kho.

Lưu ý với bài đã dịch: thêm khối làm dịch vị trí các phần trong `sections`, nên phải chèn khối tương ứng vào `lib/lessons-i18n/en/<slug>.json` ở cùng vị trí. Nếu không, cả thân bài tiếng Anh sẽ rơi về tiếng Việt.

## 6. Lịch

| Tuần | Việc | Đo được |
| --- | --- | --- |
| 1-3 | 5 khối mới, cổng kiểm, 5 bài mẫu | CI chạy các cổng mới; 5 bài mẫu qua hết |
| 4-8 | 300 bài mới (AI theo nghề, công cụ AI) + bổ sung tương tác cho 150 bài người mới | 1.044 bài; thực hành 45% |
| 9-12 | 300 bài mới (tự động hoá, làm sản phẩm, dữ liệu) + bổ sung 250 bài | 1.344 bài; thực hành 75% |
| 13-16 | 170 bài còn lại + bổ sung phần cuối + nâng cổng kiểm lên 1 cho toàn kho | **1.514 bài; 100% có thực hành và hình ảnh** |
| Từ tuần 17 | Kiểm lại bài công cụ theo `TOOL_FRESHNESS_DAYS`; dịch tiếng Anh theo lượt mở bài | Không bài công cụ nào quá 120 ngày |

## 7. Đo xem có đỡ chán thật không

Không dùng số bài làm thước đo thành công. Theo dõi các chỉ số sau (sự kiện đã có hoặc thêm vào khối mới):

- Tỉ lệ **mở bài → xong bài**: so bài có khối mới với bài chưa có, trên cùng track.
- Vị trí người học bỏ giữa bài (thanh tiến độ đọc đã lưu): có dịch về sau khối thực hành không.
- Tỉ lệ quay lại **ngày hôm sau** và câu trả lời "Mình thử rồi" / "Chưa kịp" ở thẻ "Hôm qua bạn thử chưa?".
- Tỉ lệ làm xong từng loại khối (`sim_done`, `ailab_done`, `scenario_done`), để biết loại nào đáng nhân rộng.

## 8. Rủi ro

- **Chất lượng khi viết nhanh.** Đây là rủi ro số một. Chặn bằng cổng kiểm và nhịp đợt 20 bài, không tăng tốc bằng cách nới cổng.
- **Nội dung công cụ lỗi thời.** Chặn bằng `verifiedAt` + cổng kiểm 120 ngày; phần khái niệm bền phải đứng được khi giao diện công cụ đổi.
- **Trang bài nặng.** Mọi khối mới tải khi cuộn tới; recharts và các trình mô phỏng không vào bundle đầu trang.
- **Kho tiếng Anh tụt lại.** 770 bài mới chỉ dịch theo lượt mở. Các cổng về độ dài phương án tính riêng cho từng ngôn ngữ, nên phải chạy `audit:lessons:en` cho mỗi đợt dịch.

## 9. Đã quyết (2026-09-30)

1. **Không gọi AI thật ở bất kỳ khối nào.** `aiLab` và mọi mô phỏng khác đều là phản hồi viết sẵn (hardcoded), chấm lặp lại được.
2. **100 bài đầu:** văn phòng chung, bán hàng / CSKH, kế toán, chủ shop online.
3. **Người đọc mẫu mỗi đợt:** một người ngoài ngành, đúng đối tượng người học.
