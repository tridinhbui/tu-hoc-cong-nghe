# Rà soát giáo trình công nghệ — 2026-10-17

> **Cập nhật Phase 4:** bản đầu của báo cáo này có sai sót; phần đã sửa và các phát hiện mới nằm ở `CURRICULUM-PHASE4-QA.md`. Đáng chú ý: lượt sửa lời giải quiz đầu tiên tự làm hỏng 4 câu và ánh xạ sai 3 câu (đã sửa), và "72 bài EN" đúng ra là 71.

> Nhánh `chuyen-sang-cong-nghe`. Mọi con số dưới đây được **đo** bằng script trên cây làm
> việc hôm nay, không chép từ tài liệu cũ. `TON-KHO-NOI-DUNG.md` (643 bài, đo 2026-09-23) đã
> lỗi thời: kho hiện có **1.513 bài**.
>
> Tài liệu này nói rõ thứ gì đã đo, thứ gì mới chỉ lấy mẫu, và thứ gì chưa nhìn tới
> (mục 7). Kế hoạch việc còn lại nằm ở `CONTENT-EXPANSION-ROADMAP.md`.

## 1. Tóm tắt

| # | Phát hiện | Mức | Trạng thái |
|---|---|---|---|
| F1 | 168 câu quiz gọi phương án bằng vị trí ("lựa chọn thứ ba"); với **46 câu** thứ tự hiển thị đã đổi nên lời giải trỏ sang phương án khác, có câu trỏ đúng vào **đáp án đúng** và gọi nó là "đúng một phần" | P0 | **Đã sửa** + cổng CI ở mức 0 |
| F2 | Đám mây (Chặng 13) 0/8 bài có bài tập viết mã; an toàn thông tin 2/18; tự động hoá/bảng tính 5/110; làm sản phẩm cùng AI 10/90 | P0 | **Đã bổ sung 41 bài tập chấm được** (mục 4) |
| F3 | Các chặng cho người không lập trình hiển thị bài tập viết mã mở sẵn | P1 | **Đã sửa**: 10 chặng bắt đầu gập |
| F4 | HTML/CSS không chấm được: `exercise` chỉ có `python` và `javascript`; Chặng 4 có 8/20 bài tập | P1 | Mở — cần bộ chấm DOM |
| F5 | Bản tiếng Anh phủ 71/1.513 bài (4,7%); nền tảng máy tính 3/19, API 0/10, CSDL 0/10 | P1 | Mở |
| F6 | Từ vựng mạng (DNS, TCP, TLS, cổng) xuất hiện ở Chặng 9 trước khi Chặng 12 dạy | P2 | Mở — nên thêm tiền đề, không đánh số lại |
| F7 | Kiểm tra độ chính xác kỹ thuật: không tìm thấy nội dung lỗi thời hay mô tả AI quá khả năng (mục 5) | Thông tin | Đã đo |

## 2. Kiểm kê

| Hạng mục | Số lượng |
|---|--:|
| Bài học | **1.513** (personal 1.036 · professional 415 · bonus 62) |
| Chặng | 67 (personal) + 41 (professional) |
| Câu quiz cuối bài | 7.627 |
| Khối nội dung | `paragraph` 1.955 · `scenario` 1.320 · `flow` 1.042 · `comparison` 1.027 · `feynman` 987 · `aiLab` 748 · `exercise` 467→508 · `chart` 333 · `sim` 134 · `code` 177 |
| Khối mã chạy được, chấm bằng CI | 587 → **628** (`npm run audit:exercises`): 567 ở bản tiếng Việt (508 `exercise` + 59 `code` có `runnable`) + 61 ở các bản dịch đã gộp |
| Độ khó | Dễ 467 · Trung bình 843 · Khó 203 |
| Bài có bản dịch tiếng Anh | 71 (`lib/lessons-i18n/en` có 72 tệp, một tệp là `_index.json`) |
| Bài tập viết mã | `python` 291→317 · `javascript` 176→191 (không có ngôn ngữ nào khác) |
| Tệp test | 202 tệp, 2.082 test |

Nền chất lượng quiz **đã xanh** từ trước đợt này: `audit:lessons` và `audit:lessons:en`
thoát 0; z-score độ dài tệ nhất 2,60 so với trần 3,2; 0 đáp án số trần không khớp lời giải;
0 câu trùng; 0 khối tương tác hỏng; mọi bài đều có thực hành và hình ảnh.
Một mục cần theo dõi: `practicePrompt` "chọn dài nhất" đang ở z = 2,98 so với trần 3.

## 3. Bản đồ năng lực và độ phủ thực hành

Mỗi dòng gom các chặng cùng một mảng (định nghĩa trong script `domains.py`, đoạn mã ở cuối tài
liệu). "Có bài tập" là số bài chứa ít nhất một khối `exercise` (chấm theo đầu ra).

| Mảng | Bài | Có bài tập **trước** | Có bài tập **sau** | EN |
|---|--:|--:|--:|--:|
| Nền tảng máy tính, dòng lệnh, Linux, mạng | 19 | 15 (78%) | 15 (78%) | 3 |
| Git và cộng tác | 8 | 4 (50%) | 4 (50%) | 0 |
| Lập trình (Python, JS, cấu trúc dữ liệu) | 63 | 60 (95%) | 60 (95%) | 9 |
| Web (HTML, CSS) | 20 | 8 (40%) | 8 (40%) | 0 |
| API | 10 | 10 (100%) | 10 (100%) | 0 |
| Cơ sở dữ liệu | 10 | 10 (100%) | 10 (100%) | 0 |
| Triển khai, kiểm thử, review | 20 | 14 (70%) | 14 (70%) | 0 |
| **Đám mây** | 8 | **0 (0%)** | **5 (62%)** | 0 |
| **An toàn thông tin** (cá nhân và ứng dụng) | 18 | **2 (11%)** | **5 (27%)** | 0 |
| **Tự động hoá không/ít code** | 110 | **5 (4%)** | **17 (15%)** | 0 |
| **Làm sản phẩm cùng AI** (vibecoding) | 90 | **10 (11%)** | **31 (34%)** | 10 |
| Chuyên sâu: LLM, RAG, agent, evals | 56 | 38 (67%) | 38 (67%) | 0 |
| Chuyên sâu: Docker, CI/CD, gỡ lỗi | 18 | 17 (94%) | 17 (94%) | 0 |
| **Tổng** | 1.513 | **467** | **508** | 71 |

Đọc bảng:

- Phần **lập trình cốt lõi** (Chặng 3, 5, 6, 7, 8) đã dày bài tập từ trước. Đó là chỗ giáo trình
  mạnh nhất, không cần đụng.
- Phần yếu nằm ở các mảng người đi làm **dùng** công nghệ chứ không viết nó: đám mây, an toàn
  thông tin, tự động hoá, làm sản phẩm cùng AI. 740 bài của Chặng 30–66 được viết cho người
  không lập trình (nhân sự, nhà hàng, bất động sản…) và có 0 khối `exercise` — đó là lựa chọn
  có chủ ý của nhóm đó, ghi nhận nhưng không coi là lỗi.
- Phần Web không chấm được bằng đầu ra văn bản (F4).

### Thứ tự học (tiền đề)

Chuỗi personal hiện đi: 1 máy tính/dòng lệnh → 2 Git → 3 lập trình → 4 HTML/CSS → 5 JavaScript →
6 cấu trúc dữ liệu → 7 API → 8 CSDL → 9 triển khai → 10 review/kiểm thử → … → 12 Linux/mạng →
13 đám mây → 16 an toàn thông tin.

Đo số bài nhắc từng thuật ngữ, theo chặng (cột 1–12):

| Thuật ngữ | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | **C9** | C10 | C11 | **C12** |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| DNS | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 2 |
| TCP / IP | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 3 |
| HTTPS / TLS | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | 0 | 0 | 2 |
| cổng (port) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 5 |

Chặng 9 (đưa sản phẩm lên mạng) dùng DNS, TCP, TLS, cổng, còn Chặng 12 mới là nơi dạy chúng. Mức
độ nhẹ (1–3 bài mỗi thuật ngữ) và các bài đó giải thích tại chỗ, nên xếp P2. **Không đánh số lại
chặng**: nhãn "Chặng N" là khoá của `stage_label` đã ghi xuống Cloudflare và nằm trong tiêu đề bài.

## 4. Việc đã làm (có bằng chứng trước/sau)

### 4.1 F1 — Lời giải quiz trỏ sai phương án

**Cơ chế.** `balanceLessonQuizzes` đổi chỗ đáp án đúng với một phương án nhiễu ở mỗi câu để
triệt cái mẹo "toàn B". Tác giả viết lời giải theo thứ tự soạn, người học đọc theo thứ tự đã
xáo. Phép đo thứ tự trước/sau (`balance` làm 5.676 câu đổi chỗ) cho 168 câu có tham chiếu vị trí
trong phần giải thích, và **46** câu trong số đó có vị trí được nhắc rơi đúng vào ô bị đổi.

**Ví dụ thật** (`doc-mot-he-thong-xac-thuc`, câu 1). Người học thấy ở vị trí thứ hai:
"Vì máy chủ kiểm tra bằng chữ ký mà không hỏi ai…" — đây là **đáp án đúng**. Lời giải ngay
bên dưới viết "Lựa chọn thứ hai mô tả đúng chỗ lưu nhưng không phải nguyên nhân". Lời giải gọi
đáp án đúng là sai, cùng loại lỗi với `on-tap-trai-phieu` và `wacc-co-ban` mà AGENTS.md đã ghi.

**Sửa.**

- 168 lời giải tiếng Việt viết lại để gọi phương án bằng **nội dung** ("Lựa chọn “Vì thẻ được
  lưu…”") thay vì vị trí: 167 bằng script, các cụm số nhiều ("Hai phương án đầu…") sửa tay. 21 tệp nguồn.
- 7 lời giải tiếng Anh trong `lib/lessons-i18n/en/` sửa tương tự.
- `scripts/audit-lesson-content.mjs`: tham chiếu vị trí chuyển từ **đếm** sang **gác ở mức 0**
  (`MAX_POSITION_REFS`), cho cả hai ngôn ngữ. Lượt chạy đầu của cổng mới bắt thêm đúng một dương
  tính giả ("phương án trên bàn" = proposal on the table); nó được loại ở biểu thức, không bằng ngoại lệ.
- `lib/__tests__/hands-on-coverage.test.ts` lặp lại cùng kiểm tra trên nguồn `lib/lessons.ts`.

| | Trước | Sau |
|---|--:|--:|
| Tham chiếu vị trí, quiz tiếng Việt | 168 (46 sai vị trí) | **0** |
| Tham chiếu vị trí, quiz tiếng Anh | 7 | **0** |
| `audit:lessons`, `audit:lessons:en` | xanh (không đo mục này) | xanh, cổng mới ở 0 |

Chưa sửa và cố ý để nguyên: ~66 lời giải của `practicePrompt` cũng nói "lựa chọn cuối…".
`practicePrompt` **không** đi qua `balanceLessonQuizzes` nên thứ tự soạn chính là thứ tự hiển thị
và chúng đang đúng; cổng chỉ phủ `quiz`.

### 4.2 F2 — 41 bài tập chấm được mới

Năm đợt, mỗi đợt một tệp trong `lib/lesson-block-additions/` (`t01`–`t05`), cộng vào bài đã có
bằng cơ chế sẵn có (chèn trước khối `closing`, không đổi `id`, slug, thứ tự quiz hay tiến độ).
Mỗi bài thêm hai khối: `heading` → `exercise`, và lời giải thích nằm trong trường `exercise.explanation` — chỉ hiện sau khi người học qua bài hoặc mở lời giải (xem `CURRICULUM-PHASE4-QA.md`: bản đầu dùng khối `callout` ngay dưới đề và làm lộ đáp án trước cả gợi ý). Mọi bài tập:
mã khởi đầu **chạy được nhưng in sai** (đúng hình dạng, sai giá trị), lời giải khớp
`expectedOutput`, có ít nhất hai gợi ý, dữ liệu giả hoàn toàn.

| Đợt | Mảng | Bài | Ví dụ |
|---|---|--:|---|
| `t01` | An toàn thông tin | 6 | tách miền gốc để bắt `ngan-hang-abc.vn.xac-minh.net`; `endswith` nhận nhầm `evilngan-hang…`; bùng nổ tổ hợp mật khẩu (`**` chứ không phải `*`); quét khoá dán thẳng vào mã; admin thiếu 2FA |
| `t02` | Gỡ lỗi / kiểm chứng việc AI sửa | 9 | đọc traceback; phân loại 4xx/5xx/timeout; thử từng giả thuyết AI đưa ra; chia đôi để tìm thay đổi gây lỗi (đúng 3 lần chạy); hạt giống ngẫu nhiên để bắt lỗi chập chờn; `data` bí danh so với `deepcopy`; hồi quy |
| `t03` | Đám mây + tự động hoá | 10 | hoá đơn có phần miễn phí và máy bỏ quên; độ sẵn sàng 1−(1−a)ⁿ và bẫy "hai bản trong một khu"; RTT tối thiểu theo ánh sáng trong cáp quang; tháng hoà vốn; định dạng ngày/tiền lệch hai nơi; nhánh "còn lại"; chạy thử không gửi thật |
| `t04` | Bảng tính và công cụ nhỏ | 12 | chuẩn hoá "Hà Nội / HN / ha noi"; SUMIF; VLOOKUP không im lặng trả 0; số-trông-như-chữ; gửi theo lô và tiếp tục từ chỗ dừng; kiểm tra số điện thoại và ngày thật (29/02); xuất CSV có thoát dấu ngoặc kép; JSON làm rơi `Date`/`undefined` |
| `t05` | Trang web đầu tiên cùng AI | 4 | liên kết `tel:`/`sms:`; sàng `alt` của ảnh; quét dữ liệu cá nhân trước khi đăng; một nguồn sự thật cho giá |

Ghi chú về độ chính xác (kiểm từng callout, không chỉ chạy mã):

- Quy tắc "hai nhãn cuối là miền gốc" được ghi rõ là **đơn giản hoá** (đuôi `.com.vn` cần danh
  sách hậu tố công cộng).
- Tính thời gian bẻ khoá nói rõ chỉ đúng với mật khẩu **ngẫu nhiên** và 10 tỷ lần/giây là giả định.
- Bài tập `alt` ban đầu dùng luật `role="presentation"` mà bài học không dạy; đã đổi sang đúng
  đặc tả HTML (alt rỗng hợp lệ cho ảnh trang trí, nhưng máy không biết ảnh có trang trí thật nên
  gắn cờ cho người xem lại).
- Bài tập lọc trùng ban đầu giữ dòng **đầu**, trong khi lời giải của bài học nói "dòng sau
  thường là bản đúng hơn". Đã đổi sang giữ dòng **sau cùng** (AGENTS.md quy tắc 5: không mâu
  thuẫn với bài khác).
- Giá, thuế, hạn mức trong bài tập đều ghi "ví dụ", không phải số của nhà cung cấp hay lời khuyên thuế.

### 4.3 F3 — bài tập gập sẵn cho người không lập trình

`LessonSections.tsx` đã có quy ước: Chặng 1 và 2 bắt đầu với bài tập gập vì người học chưa định
lập trình. Mở rộng sang Chặng 13, 16, 51, 52, 56, 57, 58, 59 — những chặng mà dòng mã là phần
"xem cùng logic đó viết thành vài dòng", không phải phần chính. Lý do: người viết bài tập tự
báo lại rằng văn bài ở các chặng đó viết cho người dùng bảng tính và công cụ, không phải lập
trình viên. **Chưa kiểm bằng mắt** (xem mục 6).

## 5. Kiểm tra độ chính xác kỹ thuật

Quét toàn bộ văn bản của 1.513 bài bằng biểu thức chính quy, rồi đọc ngữ cảnh của kết quả:

| Mẫu | Kết quả |
|---|---|
| Python 2, jQuery, Internet Explorer, AngularJS, Node ≤ 16, TLS 1.0/1.1, SSL 3 | **0** lần xuất hiện |
| MD5/SHA-1 cho mật khẩu | 0 |
| `http://` không phải localhost/ví dụ | 1 (lệnh `curl` trong bài về cổng, hợp lý) |
| `eval()` | 4, đều trong một phương án **sai** của bài "đầu ra LLM là dữ liệu không tin cậy" |
| "AI luôn đúng / luôn sai" | 9 lần, đều là phương án nhiễu hoặc câu phủ nhận ("Không phải AI luôn sai…") |
| "ổ khoá là an toàn" | 8 lần, đều trong câu **bác bỏ** ngộ nhận đó |
| `var` | 9 lần, bài về closure và phạm vi cố ý dùng `var` để chỉ bẫy |
| "AI hiểu / biết / nhớ / muốn…" trong văn dạy | 72 lần ở 56 bài; xem mẫu 22 câu, **đều là cách nói quen** ("cho AI biết bạn cần gì"), không câu nào nói AI có ý thức hay khả năng ngoài thực tế |
| Bài nêu tên một sản phẩm AI/tự động hoá cụ thể | 30 bài, 0 bài có dấu mốc ngày |

Điều rút ra: giáo trình dạy theo **thao tác**, ít gắn với sản phẩm cụ thể, nên rủi ro lỗi thời
thấp; 30 bài nêu tên sản phẩm nên có dấu "kiểm lần cuối" (trong roadmap). Phần "AI hiểu/biết"
là mẫu 22/72 chứ chưa đọc hết.

Phát hiện phụ do người viết bài tập báo lại khi đọc 41 bài đích (không sửa vì không sai sự thật):

- `may-tinh-bao-gia-nhieu-dong-va-chiet-khau`: phần mở nói "giảm 8%", ví dụ và lời giải dùng 10%;
  bài không nói giảm trước hay sau thuế.
- `du-an-nho-cong-cu-co-nho-lai-du-lieu-sau-khi-tat-may`: dẫn "bài 12", "bài 11", "bài 14"
  (số trong chặng, được `stage-numbering.test.ts` cho phép).
- `ai-doan-nguyen-nhan-sai-nhung-noi-rat-tu-tin`: "AI không mở được tệp" đúng với văn bản dán,
  không đúng với trợ lý có công cụ — sẽ cũ đi.

## 6. Kết quả kiểm thử

| Kiểm tra | Kết quả |
|---|---|
| `npm run audit:lessons` | thoát 0; z tệ nhất 2,60/3,2; tham chiếu vị trí 0 |
| `npm run audit:lessons:en` | thoát 0 |
| `npm run audit:exercises` | 628 khối mã chạy được, mọi lời giải khớp, không mã khởi đầu nào qua sẵn (trước: 587) |
| `npx tsc --noEmit` | thoát 0 |
| `npx eslint` trên tệp đã đổi | sạch |
| `npx vitest run` | cây sạch (commit của PR): **202/202 tệp, 2.076 test qua**; cây làm việc: 1 test đỏ, không liên quan (xem dưới) |
| `npm run build` | thoát 0 |

**Test đỏ trên cây làm việc, xanh trên cây sạch:** `lib/__tests__/kiem-tra-page.test.tsx`
(`getByText("+8 XP")` tìm thấy nhiều phần tử) đỏ khi chạy trên thư mục làm việc, nơi có ba tệp
sửa dở **từ trước khi phiên này bắt đầu** (`app/(app)/kiem-tra/page.tsx`,
`components/DailyNewsQuizWidget.tsx`, `lib/i18n/dictionaries/sections/revamp-quiz.ts`, có trong
`git status` đầu phiên; tôi không động tới chúng). Trên một worktree sạch đúng tại commit của PR,
hook pre-push chạy lại toàn bộ: **202/202 tệp, 2.076 test qua**, và bộ audit nội dung báo 0 bài lỗi.

**Chưa kiểm bằng mắt:** trang bài học yêu cầu đăng nhập và binding D1 của Cloudflare, mà server
dev cục bộ không có (`getCloudflareContext` lỗi), nên tôi không mở được trang để xem bài tập gập
sẵn. Phần này được test component hiện có phủ gián tiếp, không phải kiểm trực quan.

## 7. Giới hạn của lần rà soát này

- **Không đọc từng bài trong 1.513 bài.** Độ chính xác nội dung được đo bằng quét mẫu từ và đọc
  chi tiết ở 41 bài đích, không phải đọc toàn bộ.
- Bài tập chạy trong môi trường CI bằng `python3` của máy và `node:vm`; trình duyệt dùng Pyodide.
  Với mã cho người mới, hai bên cho cùng kết quả, nhưng đó là giả định đã ghi trong
  `verify-exercises.mjs`, không phải thứ tôi kiểm lại.
- Bản dịch tiếng Anh của 41 bài tập mới **không** có: các bài chứa chúng chưa được dịch, và
  bản vá dịch chỉ gắn vào bài đã có bản dịch. Khi dịch từng bài sau này, khối mới nằm ngay
  trước `closing` và phải được chèn cùng vị trí (AGENTS.md, mục "Adding a block to a translated lesson").
- Bài tập chấm trong trình duyệt nên bản ghi "đạt" là lời khai của client (đã ghi ở
  `KE-HOACH-VIBECODE.md`).
- "Dự đoán đầu ra" và "đúng/sai kèm giải thích" chưa có khối riêng; xem roadmap.

## Phụ lục — lệnh để đo lại

```bash
npm run audit:lessons && npm run audit:lessons:en && npm run audit:exercises
npx tsc --noEmit && npx vitest run
```

Bảng độ phủ ở mục 3 sinh từ `lib/lessons-data/*.json` (đã sinh ra bởi `audit:lessons`) và
`lib/track-stages.ts`: với mỗi chặng, đếm bài có khối `exercise` trong `sections`.
