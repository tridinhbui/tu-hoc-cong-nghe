# Deep UX Audit & Usability Test: tuhoccongnghe.org

Ngày: 2026-10-18 · Nhánh: `rasoat-giao-trinh-cong-nghe`

> **Đây là expert simulation, không phải usability study với người thật.**
> Không có người tham gia. Năm "người dùng" bên dưới là năm kịch bản được viết
> sẵn và chạy bằng Playwright (Chromium headless) trên bản chạy local (`next dev`,
> D1 local qua miniflare), mỗi lần với một tài khoản test mới tạo. Script đếm
> thật số thao tác, số lớp phủ, số ngõ cụt và số chữ trên màn hình. Nhưng nó
> **không** đo được người thật có hiểu hay không, có chán hay không, có bỏ cuộc
> hay không. "Thời gian người thật" trong bảng là ước lượng theo mô hình KLM
> (2,5 giây mỗi thao tác + quét chữ 4 từ/giây, tối đa 30 giây mỗi màn), không
> phải số bấm giờ. Muốn biết người mới thật sự có học được không thì vẫn phải
> ngồi cạnh 5 người thật. Mục 9 có kịch bản cho việc đó.

Tóm tắt một dòng: **sản phẩm có nhiều tính năng tốt, nhưng người mới phải đi
qua tới 9 lớp phủ chồng lên nhau trước bài đầu tiên. Ở 3/5 lần chạy, một
trong các lớp đó còn làm nút chính bấm không được.** Mình đã sửa phần
onboarding và một số chỗ khó hiểu trên trang bài học và trang công cụ. Phần
nặng nhất còn lại là **trang bài học quá dày** (1.700 chữ, 9–15 màn hình, 27
nút trong màn đầu). Lượt hai đã gom các khối phụ vào một mục gập (14,8 → 11,3
màn hình ở 390px). Phần còn lại là độ dài của chính thân bài, và đó là quyết
định về nội dung (mục 2 và mục 8).

---

## 1. Phương pháp

| | |
|---|---|
| Công cụ | Playwright 1.61 (`docs/ux-audit/scripts/journey.mjs`, `measure.mjs`, `explore.mjs`) |
| Môi trường | `localhost:4000`, `next dev`, D1 local, đã làm nóng route trước mỗi lượt đo |
| Kích thước | desktop 1440×900, tablet 768×1024, mobile 375×812 và 390×844 |
| Hành trình | landing → đăng ký → onboarding → bài đầu → quiz → công cụ thực hành → tiến độ → quay lại hôm sau (phiên mới, cookie còn) |
| Đo | thao tác (click/điền), lớp phủ phải đóng, ngõ cụt (bước không tìm ra lối), số chữ trong màn đầu, số điều khiển trong màn đầu, vùng chạm < 44px, chữ < 13px, tràn ngang, số màn hình phải cuộn |
| Dữ liệu thô | `docs/ux-audit/data/` (`truoc-p*.json`, `sau-p*.json`, `do-trang-*.json`) |

Năm persona và cách mô phỏng:

| | Persona | Màn hình | Cách đi |
|---|---|---|---|
| p1 | Người mới hoàn toàn | desktop | bấm CTA chính → chọn "Tôi muốn AI làm việc cùng mình" → thử bài → đăng ký → "Chưa rõ - tôi chỉ muốn hiểu công nghệ" |
| p2 | 35–50 tuổi, ít dùng công nghệ | mobile 390 | như p1, chọn "Dùng AI cho công việc văn phòng" |
| p3 | Sinh viên tự học từ 0 | mobile 390 | "VÀO HỌC NGAY" → đăng ký → "Học bài bản để đi làm nghề" |
| p4 | Người đi làm, muốn dùng AI | desktop | thẻ "phân tích số liệu" → thử bài → đăng ký → "Làm việc với bảng số liệu" |
| p5 | Đã biết công nghệ, tìm nâng cao | desktop | "VÀO HỌC NGAY" → đăng ký → chọn "Công nghệ chuyên sâu" ở chỗ nào có |

Giới hạn cần biết khi đọc số:
- Script chọn đáp án đầu tiên ở mỗi câu quiz (để đếm thao tác, không phải để đúng) nên điểm luôn 0/4.
- Script **không** trả lời câu "Dừng & Kiểm tra" giữa bài, nên bài không bao giờ được tính hoàn thành. Nhờ vậy lộ ra phát hiện F-9.
- Một số ngõ cụt chập chờn giữa các lần chạy (lời mời đăng ký trong bài thử, tour hiện sớm hay muộn). Chỗ nào chập chờn thì báo cáo ghi rõ là chập chờn.
- Màn "Đang tải" ở dev mode chậm hơn production và không được tính là lỗi.

---

## 2. Kết quả trước / sau (cùng script, cùng máy)

| Persona | Màn hình | Thao tác: đăng ký → bài đầu | Lớp phủ phải đóng | Ngõ cụt cả hành trình | Tổng thao tác | Công cụ đầu tiên vào |
|---|---|---|---|---|---|---|
| p1 người mới | desktop | **9 → 2** | **7 → 1** | 1 → 0 | 35 → 28 | Dòng lệnh → Trình soạn mã |
| p2 35–50 tuổi | m390 | **9 → 2** | **7 → 1** | 3 → 1* | 35 → 32 | (ngõ cụt) → Trình soạn mã |
| p3 sinh viên | m390 | **9 → 3** | **8 → 2** | 0 → 0 | 35 → 29 | Dòng lệnh → Trình soạn mã |
| p4 người đi làm | desktop | **9 → 2** | **7 → 1** | 2 → 0 | 37 → 28 | Dòng lệnh → Trình soạn mã |
| p5 nâng cao | desktop | **13 → 5** | **9 → 2** | 0 → 0 | 43 → 35 | Dòng lệnh → Trình soạn mã |

\* Ngõ cụt còn lại của p2 là "bài thử không có lời mời đăng ký". Lỗi này xuất
hiện ở cả bản trước lẫn bản sau, tuỳ lần chạy, và phần code đó không bị đổi
(xem F-11). Đây không phải lỗi mới.

Tiêu đề bài đầu tiên mà người học thấy:

| | Trước | Sau |
|---|---|---|
| p1, p2 | **Chặng 25, Bài 5:** Kiểm chứng - khi AI bịa trông như thật | Kiểm chứng - khi AI bịa trông như thật · nhãn "Dùng AI làm việc nhanh hơn · Chặng 3/4 · Bài 1" |
| p4 | **Chặng 26, Bài 1:** Làm sạch bảng trước khi hỏi AI | Làm sạch bảng trước khi hỏi AI |
| p3 | Chặng 1, Bài 1: Đo thời gian… | không đổi (đúng là bài 1 của lộ trình nền tảng) |

Những gì **không** cải thiện, nói thẳng:
- Thời gian ước lượng theo KLM gần như không đổi, có persona còn tăng. Bản sau có thêm một dòng gợi ý trên trang công cụ, và trang công cụ giờ dẫn vào Trình soạn mã, trang có nhiều chữ hơn Dòng lệnh. Số thao tác giảm rõ, nhưng lượng chữ phải đọc thì không.
- Trang bài học vẫn 1.700 chữ, 9,4 màn hình desktop / 14,8 màn hình mobile, 27 điều khiển trong màn đầu desktop (F-8, chưa sửa ở lượt này; xem lượt hai bên dưới).
- Cả 10 lượt chạy đều kết thúc với bài **chưa hoàn thành** dù đã làm xong quiz (F-9, chưa sửa ở lượt này; xem lượt hai bên dưới).

### Lượt hai: F-8 (ngân sách khối) và F-9 (thẻ kết quả nói vế còn thiếu)

Cùng `journey.mjs`, cùng máy, `next dev` của nhánh sửa. Đo "trước" ngay trước
khi sửa, trên đúng commit đã có lượt một (`c3d066a`). Dữ liệu thô:
`docs/ux-audit/data/f8-truoc/` và `f8-sau/`. Bảng chiều cao từng khối do
`docs/ux-audit/scripts/lesson-heights.mjs` đo (khách, chưa bấm gì).

| Persona | Bài | Màn hình | Chữ trên trang | Màn hình phải cuộn | Điều khiển trong màn đầu |
|---|---|---|---|---|---|
| p2 35–50 tuổi | `kiem-chung-dau-ra-ai-bia` | m390 | 1.680 → **1.392** | 14,8 → **11,3** | 8 → 8 |
| p1 người mới | `kiem-chung-dau-ra-ai-bia` | desktop | 1.697 → **1.409** | 9,4 → **7,5** | 27 → 27 |
| p3 sinh viên | `do-thoi-gian-truoc-khi-lap-ke-hoach-hoc` | m390 | 1.471 → **992** | 12,5 → **8,3** | 8 → 8 |

Chiều cao trang `kiem-chung-dau-ra-ai-bia` ở 390×844 (khách): **12.491px →
9.514px**. Khối tương tác ở mạch chính, không tính quiz: 8 (câu mở đầu, Feynman
lớp 5, tình huống, câu giữa bài, sơ đồ từng bước, sơ đồ tĩnh, "Luyện tập ngay",
đổ não 60 giây) → **4** (câu mở đầu, tình huống, câu giữa bài, sơ đồ từng bước).

**Mục tiêu "dưới 6 màn hình ở 390px" không đạt: 11,3.** Nói thẳng lý do, vì nó
quyết định bước tiếp theo. 6 màn hình là 5.064px. Riêng thân bài (`sections`)
sau khi đã dời khối phụ ra vẫn cao **5.835px**, gồm khoảng 1.000 chữ giảng
và ba khối mà chỉ số đo chiều cao cho thấy là phần dạy chính (bảng "Bốn kiểu
bịa" 850px, danh sách "Năm cách bắt" 558px, sơ đồ từng bước 747px). Cộng thêm
ba thứ không thể gập là câu mở đầu (521px), câu giữa bài (605px, một vế của
điều kiện hoàn thành) và cột quiz (720px) thì đã quá 6 màn hình trước khi tính
một dòng nào khác. Ngân sách khối đã lấy đi gần hết những gì gập được mà không
đụng nội dung. Xuống dưới 6 thì phải viết bài ngắn hơn hoặc tách bài, tức là
quyết định nội dung trong `lib/lessons*`, nằm ngoài phạm vi của lượt sửa chỉ
về trình bày này.

Desktop vẫn 27 điều khiển trong màn đầu: con số đó đến từ thanh công cụ và
khung bài (đầu trang, mục lục, cột quiz đang mở), không phải từ các khối đã gập.

F-9, cùng script: 3/3 lượt vẫn kết thúc với bài chưa hoàn thành, **và đó là
đúng**, vì script cố ý không trả lời câu giữa bài, còn điều kiện hoàn thành
thì không đổi. Điều thay đổi là thứ người học thấy lúc đó. Kiểm tra riêng bằng
một tài khoản test, ở cả 390px và 1440px: làm hết quiz mà bỏ qua câu giữa bài
thì thẻ kết quả hiện "Bài chưa tính là xong", liệt kê đúng vế còn thiếu, và nút
"Tới câu giữa bài" đặt câu đó ở đỉnh khung nhìn (đo được 96–97px, tức đúng
`scroll-mt-24`). Trả lời câu đó và đọc hết bài thì bài được lưu là hoàn thành,
còn khối "còn thiếu" tự biến mất. Ảnh: `10-sau-f9-the-ket-qua-mobile.png`,
`11a-…`, `11b-sau-f8-hoc-sau-hon-mo.png`.

p2 lượt sau có một ngõ cụt ở bước landing: "bài thử không có lời mời đăng ký".
Đây là F-11. Nó chập chờn từ trước (p1 lượt trước cũng gặp), và nằm ở phần code
lượt này không đụng tới.

---

## 3. Journey map (trước khi sửa, p1, desktop)

```
Landing ──CTA "Bắt đầu học miễn phí"──▶ cuộn xuống 4 thẻ nhu cầu (không mở đăng ký)
   │ chọn thẻ → trang hành trình → "Làm thứ đầu tiên" → đọc thử bài (chưa đăng nhập) ✔ tốt
   │ không thấy lời mời đăng ký giữa bài (chỉ có sau khi làm xong quiz) → quay về "VÀO HỌC NGAY"
   ▼
Đăng ký (3 ô) ──▶ /dashboard
   ① Hướng dẫn 5 bước: Chào mừng → Chọn lộ trình (liệt kê 2 lần) → XP/huy hiệu → Quiz/Widget → Sẵn sàng
   ② 2 giây sau, popup "Mời bạn học cùng (+50 XP)" bật CHỒNG lên ①
   ③ Xong ①: hiện câu "Bạn học để làm gì?" (7 lựa chọn), hỏi lại đúng việc ① vừa hỏi
   ④ Cùng lúc: tour 3 bước làm tối màn hình, lớp làm tối nằm TRÊN ③ → nút ③ bấm không ăn ✖ (3/5 lần chạy)
   ▼ tìm ra "Bỏ qua" của tour → "Bắt đầu bài đầu tiên"
Bài học "Chặng 25, Bài 5"  ← vừa được hứa "Bài 1/13"
   │ đường dẫn THCN://LESSON/…, tab KIEM-CHUNG-….MD / QUIZ.TS / NOTES.MD
   │ 1.700 chữ, ~7 khối tương tác, quiz ở cột phải
   │ làm xong quiz 0/4 đúng → tiêu đề "Hoàn thành!" + toast "còn câu giữa bài"
   ▼ muốn thực hành: trang bài không có menu → "Quay lại" → menu bên trái
Menu: "Học tập" gập, "Thực hành" mở → "Mô phỏng công cụ"
   │ 5 công cụ ngang hàng, nhãn TERMINAL / CODE EDITOR / SQL CONSOLE…, chữ "ticket" không giải thích
   ▼ bấm thẻ đầu → Dòng lệnh Linux, Git và Docker
Hôm sau: "Học tiếp" → cùng bài cũ (vì bài chưa hoàn thành)
```

Sau khi sửa, đoạn giữa (①–④) còn đúng một bước: **"Bạn học để làm gì?" →
"Bắt đầu bài đầu tiên"**. Tour và popup mời bạn chờ tới lượt sau / tới khi đã
học xong một bài.

---

## 4. Đo mật độ từng trang (trước khi sửa)

| Trang | Màn hình | Chữ cả trang | Chữ màn đầu | Điều khiển màn đầu | Vùng chạm nhỏ | Chữ < 13px | Số màn hình | Tràn ngang |
|---|---|---|---|---|---|---|---|---|
| / | desktop | 1972 | 157 | 7 | 7 | 179 | 9.7 | không |
| / | m375 | 1894 | 110 | 7 | 3 | 170 | **15.6** | không |
| /login | desktop | 155 | 155 | 9 | 5 | 14 | 1 | không |
| /login | m375 | 151 | 85 | 9 | 5 | 13 | 1.4 | không |
| /dashboard (lần đầu, có lớp phủ) | desktop | 143 | 143 | 32 | 12 | 11 | 1 | không |
| /dashboard (sau onboarding) | desktop | 353 | 353 | **49** | 14 | 41 | 1 | không |
| /lo-trinh | desktop | 1118 | 345 | 42 | 21 | 65 | 2.6 | không |
| /lo-trinh | m375 | 953 | 195 | 26 | 22 | 59 | 3.5 | không |
| /cong-cu | desktop | 262 | 232 | 29 | 8 | 26 | 1.2 | không |
| /cong-cu | m375 | 258 | 165 | 20 | 12 | 20 | 2 | không |
| /kiem-tra | desktop | 375 | 375 | 44 | 12 | 43 | 1 | không |
| /bai-hoc/… (bài đầu p1) | desktop | **1696** | 280 | 27 | 31 | 62 | 9.4 | không |
| /bai-hoc/… (bài đầu p2) | m390 | 1681 | 113 | 8 | – | – | **14.8** | không |

Không trang nào tràn ngang ở 375/390px. Đó là điểm mạnh có thật của bản hiện
tại. Script cũng có một phép đo tương phản. Phép đo này **không đáng tin**:
nó báo tỉ lệ 1,00 trên các nút nền gradient, vì nó chỉ đọc
`background-color`. Vì vậy báo cáo không rút kết luận nào từ con số tương phản.

---

## 5. Phát hiện và nguyên nhân gốc

Ký hiệu loại: **UX** (tương tác), **IA** (kiến trúc thông tin), **ND** (nội
dung/sư phạm), **KT** (kỹ thuật), **TM** (thẩm mỹ).

### P0: chặn người mới

#### F-1 · Bốn hệ thống onboarding chạy cùng lúc, chồng lên nhau
- **Trang:** `/dashboard`, lần đầu sau đăng ký.
- **Triệu chứng:** 7–9 lớp phủ phải đóng trước bài đầu tiên. Hướng dẫn 5 bước, rồi popup mời bạn, rồi câu "Bạn học để làm gì?", rồi tour 3 bước.
- **Bằng chứng:** `docs/ux-audit/01-truoc-lop-phu-chong-nhau.png`, `02-…`, `04-…`; cột "Lớp phủ" ở mục 2 (7/7/8/7/9).
- **Nguyên nhân gốc (IA + KT):** bốn component được thêm vào ở bốn thời điểm, mỗi cái tự quyết định khi nào bật (`OnboardingFlow` theo `has_completed_onboarding`, `DiagnosticPlacementModal` theo localStorage, `ReferralPromptModal` sau 2 giây mỗi phiên, `SpotlightTour` sau 500ms). Không có nơi nào điều phối "lần đầu vào" như một trải nghiệm duy nhất. Thêm vào đó, câu hỏi thứ hai (`DiagnosticPlacementModal`) được viết ra *để thay* màn 5 bước (chú thích trong file ghi "thay cho bài khảo sát ba câu"), nhưng màn cũ chưa bao giờ bị gỡ.
- **Ảnh hưởng tới người mới:** trước khi học được chữ nào, người mới phải xử lý 7–9 quyết định không liên quan tới việc học. Màn thứ hai còn hỏi lại đúng câu màn đầu vừa hỏi (chọn lộ trình), nên người dùng không biết câu trả lời trước đã đi đâu.
- **Giải pháp (đã làm):** chỉ giữ "Bạn học để làm gì?" làm bước duy nhất. Bước này ghi hoàn tất onboarding và lộ trình (`onTrackChosen`). Màn 5 bước không còn được render. Thêm lựa chọn "Tôi đã biết lập trình, muốn học phần chuyên sâu" để màn 5 bước không còn là chỗ duy nhất chọn được lộ trình chuyên sâu.

#### F-2 · Lớp làm tối của tour nằm trên hộp thoại, nút chính bấm không ăn
- **Trang:** `/dashboard`, lần đầu.
- **Triệu chứng:** bấm "Bắt đầu bài đầu tiên" hoặc một ô mục tiêu thì không có gì xảy ra.
- **Bằng chứng:** `01-truoc-lop-phu-chong-nhau.png`. Playwright báo `locator.click: Timeout` vì phần tử bị che. Lỗi xảy ra ở p1, p2, p4 trong lượt đo trước khi sửa (3/5), và không xảy ra ở lượt nào sau khi sửa.
- **Nguyên nhân gốc (KT):** `SpotlightTour` vẽ lớp phủ toàn màn hình bằng `box-shadow` với z-index cao hơn modal, và không biết có modal nào đang mở. Lúc tour kịp bật (sau 500ms + một vòng mạng) thì lại trùng đúng lúc người dùng đang đọc câu hỏi.
- **Ảnh hưởng:** một ngõ cụt thật ở bước quan trọng nhất. Người không biết phải tìm nút "Bỏ qua" nhỏ trong tooltip thì sẽ kẹt.
- **Giải pháp (đã làm):** `SpotlightTour` có thêm prop `paused`. Dashboard truyền `paused` trong lúc hộp mục tiêu mở **và suốt cả lượt vào đó**, nên tour để dành cho lượt sau.

#### F-3 · Popup "Mời bạn học cùng" bật cho người chưa học bài nào, che nút trên mobile
- **Trang:** mọi trang trong app, kể cả trang bài học.
- **Bằng chứng:** `03-truoc-mobile-popup-che-onboarding.png` (ở 375px, popup che nút "Tiếp theo" của màn hướng dẫn); `02-…` (đè lên kết quả mục tiêu); trong lượt khám phá, popup này cũng đè lên quiz trên trang bài học.
- **Nguyên nhân gốc (UX):** popup tự bật 2 giây sau lần đầu của mỗi phiên, không xét người dùng đang ở đâu hay đã học gì. Phần thưởng của chính lời mời chỉ trao khi người được mời học xong bài đầu, nên lời mời gửi cho người 0 bài là quảng cáo một thứ họ chưa thử.
- **Giải pháp (đã làm):** chỉ tự bật khi `lessons_completed ≥ 1` (đọc từ `get_nav_state`) và không bao giờ bật trên `/bai-hoc/*`. Lối mở thủ công trong menu Kết nối giữ nguyên.

### P1: làm khó hiểu, tốn sức

#### F-4 · Bài đầu tiên mang số "Chặng 25, Bài 5"
- **Trang:** `/bai-hoc/<slug>` khi đi từ hộp mục tiêu hoặc thẻ "Học tiếp".
- **Bằng chứng:** `05a-truoc-dau-bai-hoc.png`. Dashboard ghi "Bài 1/13 · Dùng AI làm việc nhanh hơn", còn tiêu đề trang bài ghi "Chặng 25, Bài 5". 1.027/1.513 tiêu đề bài trong kho có tiền tố "Chặng N, Bài M:".
- **Nguyên nhân gốc (KT):** trang bài đã có cơ chế đổi nhãn theo hành trình (`?hanh-trinh=`), và trang `/hoc-theo-nhu-cau` có dùng cơ chế đó. Nhưng hai lối vào mà người mới thật sự đi qua, `DiagnosticPlacementModal` và `ResumeLearningButton`, lại tạo link không có tham số này.
- **Ảnh hưởng:** người mới tưởng mình đã bỏ lỡ 24 chặng.
- **Giải pháp (đã làm):** hai link trên mang `?hanh-trinh=<flow>`. Tiêu đề giờ không còn tiền tố, và nhãn hành trình hiện ở đầu trang.

#### F-5 · Menu bên trái: "Học tập" luôn gập, "Thực hành" luôn mở
- **Trang:** mọi trang trong app.
- **Bằng chứng:** `06a-truoc-menu-va-cong-cu.png`; 5/5 hành trình trước khi sửa.
- **Nguyên nhân gốc (IA):** mặc định là gập hết, rồi huy hiệu sẽ tự bung nhóm chứa nó. Nhưng huy hiệu "TIN MỚI" của Kiểm tra sáng gần như cả ngày, nên nhóm Thực hành luôn mở. Vì vậy "Bắt đầu từ đâu" và "Học bài", hai mục người mới cần nhất, luôn bị giấu.
- **Giải pháp (đã làm):** mặc định chỉ mở nhóm Học tập (`DEFAULT_COLLAPSED_KEYS`). Người đã từng gập/mở thì vẫn giữ lựa chọn đã lưu.

#### F-6 · Trang bài học nói bằng ngôn ngữ của lập trình viên
- **Trang:** đầu mọi bài học.
- **Bằng chứng:** `05a-…`: `THCN://LESSON/KIEM-CHUNG-DAU-RA-AI-BIA`, tab `KIEM-CHUNG-DAU-RA-AI-BIA.MD`, `QUIZ.TS`, `NOTES.MD`.
- **Nguyên nhân gốc (TM → UX):** khung "cửa sổ soạn thảo" được chép từ trang chủ (hằng `SYS`) để tạo chất "công nghệ". Với lập trình viên đó là một cái nháy mắt. Với người chưa biết `.md` là gì, đó là bốn cụm chữ phải đoán nghĩa ở đúng chỗ đầu tiên họ nhìn. Đây là ví dụ rõ nhất cho việc giao diện được thiết kế theo tư duy của developer.
- **Giải pháp (đã làm):** bỏ dòng đường dẫn. Các tab đổi thành "Bài đọc / Kiểm tra nhanh / Ghi chú". Bỏ "quiz.ts" khỏi đầu khung quiz. Giữ khung viền và nhịp chữ đơn cách để vẫn đúng nhận diện. `05b-sau-dau-bai-hoc.png`.

#### F-7 · Trang công cụ: 5 lựa chọn ngang hàng, không biết bắt đầu từ đâu
- **Trang:** `/cong-cu`.
- **Bằng chứng:** `06a-…`. Thẻ đầu là "TERMINAL · Dòng lệnh Linux, Git và Docker", và cả 5/5 hành trình bấm vào đó. Chữ "ticket" xuất hiện 6 lần mà không có giải thích.
- **Nguyên nhân gốc (IA + ND):** thứ tự thẻ theo cách một lập trình viên học (dòng lệnh trước), không theo việc người mới thấy kết quả nhanh nhất.
- **Giải pháp (đã làm):** đưa Trình soạn mã lên đầu, gắn nhãn "Hợp cho người mới", thêm một câu giải thích "ticket". Câu này chỉ hiện khi chưa làm ticket nào. `06b-sau-menu-va-cong-cu.png`.
- **Còn lại (ND):** người chọn mục tiêu "Dùng AI cho văn phòng" không có công cụ nào khớp với mục tiêu của họ. Cả năm công cụ là công cụ của dân kỹ thuật (xem lộ trình).

#### F-8 · Trang bài học quá dày cho một buổi học 10–15 phút (**đã sửa phần trình bày; mục tiêu 6 màn hình chưa đạt**)
- **Bằng chứng:** 1.680–1.930 chữ. Desktop 9,4–10 màn hình, mobile 12,5–14,8 màn hình. 27–31 điều khiển trong màn đầu desktop. Một bài có khoảng 7 khối tương tác khác nhau: quiz cột phải, câu mở đầu, "Luyện tập ngay", "Đố não 60 giây", tình huống, sơ đồ từng bước, chế độ Feynman, giải thích "cho học sinh lớp 5". Thêm vào đó là một thẻ "Cơ Cơ · mẹo tự động" có nội dung không liên quan tới bài ("Dự án thật là nơi lý thuyết gặp thực tế lộn xộn…" trên bài về AI bịa).
- **Nguyên nhân gốc (ND):** mỗi đợt cải tiến *thêm* một khối (`lib/lesson-block-additions` đảm bảo mọi bài có khối thực hành + khối hình). Không đợt nào *bớt* khối. Thứ tự sư phạm "trực giác → ví dụ → khái niệm → thực hành" vẫn còn, nhưng bị chia nhỏ bởi các khối chen giữa.
- **Ảnh hưởng:** "10–15 phút" trên landing là lời hứa khó giữ trên mobile.
- **Vì sao lượt một chưa sửa:** muốn bớt khối thì phải chọn khối nào ở lại cho từng loại bài. Đó là quyết định nội dung, và nó chạm tới các gate trong `scripts/audit-lesson-content.mjs`.
- **Đã làm (lượt hai): ngân sách khối, chỉ ở phần trình bày.** `lib/lesson-block-budget.ts` chia các khối của bài thành hai nhóm. Mạch chính giữ **một** khối thực hành và **một** khối hình. Khối thực hành chính là bài tập viết mã nếu bài có; nếu không có thì là khối thực hành đầu tiên tác giả đặt. Đếm trên 1.513 bài: 539 bài có `aiLab+scenario`, 364 bài có `exercise+scenario`, nên quy tắc "khối đầu tiên" đơn thuần sẽ giấu bài tập chính của track lập trình ở 8 bài `scenario+exercise`. Mọi khối khác vào mục gập "Học sâu hơn" ở cuối bài: thẻ Feynman/lớp 5 (bỏ luôn công tắc bật/tắt riêng), khối `feynman`, khối thực hành và khối hình thứ hai, sơ đồ tĩnh khi đã có chart/flow, "Luyện tập ngay" khi đã có khối thực hành, widget mô phỏng cũ, đổ não 60 giây kèm ba thẻ tóm tắt, và thẻ mẹo Cơ Cơ. Không khối nào bị xoá khỏi `lib/lessons*`: `audit:lessons` vẫn báo 0/1.513 bài thiếu khối thực hành hay khối hình. Một test mới chạy trên toàn bộ dữ liệu thật để chắc rằng mạch chính của mọi bài vẫn có khối thực hành và khối hình. Câu giữa bài không bao giờ vào mục gập, vì nó là một vế của điều kiện hoàn thành. Chỉ số khối giữ nguyên chỉ số gốc, vì `exercise_passes` khoá theo vị trí khối. Trên mobile, thân bài dùng chữ 16/28 thay cho 18/32, và khoảng cách giữa các khối nhỏ lại. Từ `sm` trở lên thì không đổi.
- **Còn lại:** 11,3 màn hình ở 390px, chưa đạt mục tiêu 6. Phần còn lại là chính thân bài (xem mục 2, lượt hai), nên bước tiếp theo là quyết định nội dung: viết ngắn lại hoặc tách bài.

#### F-9 · Làm xong quiz vẫn chưa xong bài, và hệ thống khen nhầm
- **Bằng chứng:** `07-truoc-khen-hoan-thanh-khi-0-4.png`. Tiêu đề "Hoàn thành!" hiện cùng "0/4 câu đúng", và cùng lúc toast báo "Còn trả lời câu hỏi giữa bài". 10/10 lượt chạy kết thúc với bài chưa hoàn thành, nên hôm sau "Học tiếp" quay về đúng bài cũ.
- **Nguyên nhân gốc (UX + ND):** điều kiện hoàn thành có ba vế. Vế "Dừng & Kiểm tra giữa bài" là một khối giữa bài, rất dễ cuộn qua. Còn thẻ kết quả quiz thì dùng một tiêu đề cố định, không phụ thuộc điểm.
- **Đã làm:** đúng dưới một nửa thì tiêu đề là "Đã làm xong - xem lại các câu sai nhé".
- **Đã làm (lượt hai):** khi quiz xong mà bài chưa đủ điều kiện, thẻ kết quả hiện khối "Bài chưa tính là xong". Khối này liệt kê đúng vế còn thiếu và có một nút chính: "Tới câu giữa bài" (nhảy thẳng tới `#lesson-midpoint`), hoặc "Đọc tiếp chỗ đang dừng" (về chỗ xa nhất đã đọc, theo đúng phép đo của tiêu chí đọc). Tiêu đề đổi thành "Đã làm xong quiz" thay cho "Hoàn thành!". "Bài tiếp" lùi xuống nút phụ, còn nút chia sẻ "đã hoàn thành" chỉ hiện khi bài đã xong thật. Khách không thấy khối này, vì với họ không có gì được lưu hay cộng XP. **Điều kiện hoàn thành, cách chấm điểm và XP không đổi.** Khối dựa trên đúng `allCriteriaMet` / `midpointCriterionMet` / `scrolledFully` mà luồng hoàn thành dùng, nên nó không thể nói một đằng mà dữ liệu lưu một nẻo.
- **Một chi tiết đo được:** bản đầu dùng cuộn mượt và dừng cách đích 1.000–2.500px. Trình duyệt huỷ cuộn mượt đường dài khi bố cục phía trên đổi trong lúc trượt. Bản cuối nhảy thẳng tới đích.
- **Chưa làm:** gộp câu giữa bài vào quiz (mục 8).

#### F-10 · Người đã biết công nghệ không có lối vào phần nâng cao ở câu hỏi đầu
- **Bằng chứng:** p5 trước khi sửa: chọn "Công nghệ chuyên sâu" ở màn 5 bước, rồi câu tiếp theo không có đáp án nào phù hợp. Gần nhất là "Học bài bản…", và màn kết quả của nó lại nói "Lộ trình nền tảng: đi từ máy tính và dòng lệnh".
- **Giải pháp (đã làm):** thêm lựa chọn thứ 7 kèm màn kết quả "Lộ trình chuyên sâu… Phần nào đã vững thì vào Thi vượt chặng để bỏ qua."
- **Còn lại:** bài đầu của lộ trình chuyên sâu vẫn là "Kiểu dữ liệu" (Trung bình). Muốn thật sự bỏ qua phần đã biết thì người học phải tự tìm tới Thi vượt chặng.

### P2: đáng sửa, không chặn

| # | Trang | Triệu chứng · bằng chứng | Nguyên nhân | Loại | Đề xuất |
|---|---|---|---|---|---|
| F-11 | `/bai-hoc` (khách) | Lời mời "Đăng ký miễn phí để lưu tiến độ" chỉ hiện **sau khi** làm xong quiz. Người đọc xong rồi rời đi thì không thấy lời mời nào. Chập chờn trong đo đạc (lúc có lúc không, tuỳ lần chạy). | `authState === "guest"` chỉ xét ở cuối bài | UX | Thêm một dòng nhỏ cố định ở đầu bài cho khách |
| F-12 | `/` | CTA chính "Bắt đầu học miễn phí" không mở đăng ký mà cuộn tới 4 thẻ nhu cầu | Cố ý (thử trước, đăng ký sau), nhưng nhãn hứa "bắt đầu học" | UX writing | Đổi nhãn thành "Chọn việc bạn muốn làm" hoặc giữ nhãn và nhảy thẳng vào bài thử |
| F-13 | `/` mobile | 15,6 màn hình, 8 khối. Tiêu đề dùng hiệu ứng "glitch/scramble" nên lúc đang chạy hiện ký tự rác ("TỪNG BƯỚC M[+", "NG&#"). Mỗi tiêu đề có hai bản trong DOM (marquee), trình đọc màn hình đọc hai lần. `08-landing-mobile-16-man-hinh.png` | Thẩm mỹ "terminal" áp lên chữ tiếng Việt | TM, a11y | Tắt scramble với `prefers-reduced-motion` và ở mobile. `aria-hidden` bản lặp |
| F-14 | `/bai-hoc` trong hành trình | Bài đầu tiên của hành trình mang nhãn "Chặng 3/4 · Bài 1" | `firstWinSlug` cố ý lấy bài ở chặng giữa (thử trước) | ND/IA | Nhãn "Bài thử đầu tiên" cho `firstWinSlug` thay vì số chặng |
| F-15 | `/dashboard` | Người 0 bài thấy LV.1, 0/30 XP, chuỗi 0 ngày, 0/**1036** bài, điểm quiz "--", "Năng lực thực hành", "Thi thăng cấp LV02", "Xếp hạng": 49 điều khiển trong màn đầu | Gamification hiện trước khi có gì để đo | IA | Ẩn khối chỉ số tới bài thứ 3, như menu đã làm với `HIDDEN_FOR_NEWCOMERS`. Thay "0/1036" bằng tiến độ của hành trình |
| F-16 | `/cong-cu/*` | "Tiến độ lưu trên trình duyệt này": đổi máy là mất | Tiến độ công cụ chỉ ở localStorage | KT | Lưu lên D1 như tiến độ bài học |
| F-17 | Toàn app | Tiếng Anh trộn trong giao diện: "Dashboard", "Settings", "TERMINAL", "OUTPUT", "KỸ NĂNG" | Nhãn đặt theo tên kỹ thuật | UX writing | "Trang chính", "Cài đặt"; giữ tên công cụ làm phụ đề |
| F-18 | Màn hướng dẫn cũ | "Bạn có thể thay đổi lộ trình bất cứ lúc nào trong Settings" | — | — | Đã hết hiệu lực vì màn này không còn hiện |

---

## 6. Trả lời các câu hỏi của đề bài

**Có quá nhiều chữ, thẻ, nút trên một màn hình không?** Có, ở hai chỗ: dashboard
sau onboarding (49 điều khiển, 353 chữ trong một màn) và trang bài học (27
điều khiển trong màn đầu, ~1.700 chữ). Landing nhiều chữ (1.900) nhưng màn đầu
gọn (7 điều khiển, 1 CTA chính rõ).

**Người dùng có biết nhìn đâu, bấm gì trước không?** Ở landing và hộp "Bạn học
để làm gì?" thì có: mỗi màn có một hành động chính. Ở dashboard lần đầu thì
không, vì mỗi lớp phủ tranh nhau làm "hành động chính" (F-1, F-2).

**Thuật ngữ có được giải thích đúng lúc không?** Câu hỏi mục tiêu viết rất tốt,
không có thuật ngữ nào. Nhưng ngay sau đó, trang bài và trang công cụ lại mở
đầu bằng `.md`, `.ts`, TERMINAL, SQL CONSOLE, "ticket" (F-6, F-7).
"Hallucination" được giải thích ngay trong câu hỏi quiz, đó là cách làm đúng.

**Navigation có quá nhiều tầng không?** Có ba lối vào cho cùng một câu hỏi "học
gì tiếp": thẻ Học tiếp trên dashboard, `/hoc-bai`, `/lo-trinh`. Trang bài học
không có menu, nên muốn sang công cụ phải "Quay lại" rồi mới mở menu. Menu gập
sai nhóm (F-5).

**Gamification hỗ trợ hay gây phân tâm?** Trước bài đầu tiên thì gây phân tâm:
XP, huy hiệu, cấp độ được giới thiệu ở màn hướng dẫn, và lời mời bạn bè hứa +50
XP khi người dùng chưa học gì. Sau quiz, thẻ kết quả có 6 hành động (flashcard
3D, Dashboard, Bài tiếp, chia sẻ Facebook, làm lại, thẻ tiếp sức) cạnh tranh với
việc duy nhất còn thiếu là câu giữa bài (F-9).

**Có thiết kế theo tư duy developer không?** Có, và đo được: nhãn tệp và đường
dẫn trên mọi bài học, công cụ dòng lệnh đứng đầu, nhãn tiếng Anh, chữ "ticket".
Ngược lại, câu hỏi mục tiêu và trang hành trình được viết theo tư duy người
học. Hai lối nghĩ đang cùng tồn tại trên một hành trình.

**Vì sao nhiều chức năng mà vẫn khó dùng?** Vì mỗi chức năng được thêm vào kèm
cách tự giới thiệu riêng (popup, tour, huy hiệu, thẻ), và không có lớp nào quyết
định *thứ tự* chúng xuất hiện. Từng màn riêng lẻ phần lớn ổn. Cái khó nằm ở
chỗ chúng va vào nhau. F-1 là trường hợp đo được rõ nhất.

**Vì sao trông hiện đại mà vẫn khô và nặng?** Phong cách "terminal" (chữ đơn
cách viết hoa, khung cửa sổ, scramble) tạo cảm giác *công cụ*, không tạo cảm giác
*được dẫn dắt*. Trên trang bài học, nó đứng cạnh 7 khối tương tác, mỗi khối
có viền, nhãn viết hoa và nút riêng. Không có khối nào được phép nhỏ lại để
khối chính nổi lên. Số liệu: 62 đoạn chữ < 13px trên trang bài, chủ yếu là
nhãn viết hoa đơn cách.

**Người học có biết mình tiến bộ và nên học gì tiếp không?** Biết "nên học gì
tiếp" (thẻ Học tiếp làm tốt việc này). Nhưng "tiến bộ" thì khó, vì bài thường
không được tính là xong (F-9), nên thẻ Học tiếp quay về đúng bài cũ, và thanh
tiến độ đứng ở 0/1036.

---

## 7. Những gì đã thay đổi trong code

| File | Thay đổi | Phát hiện |
|---|---|---|
| `components/DashboardClient.tsx` | Bỏ render `OnboardingFlow` cùng state chết đi kèm. Hộp mục tiêu ghi hoàn tất onboarding và lộ trình. Tour bị `paused` trong lượt vào có hỏi mục tiêu. | F-1, F-2 |
| `components/DiagnosticPlacementModal.tsx` | Thêm prop `onTrackChosen`, lựa chọn "đã biết lập trình", link `?hanh-trinh=`. Lối "học bài bản" đi tới `/hoc-bai` thay vì `/dashboard?track=personal` (tham số này không được đọc ở đâu). | F-1, F-4, F-10 |
| `components/SpotlightTour.tsx`, `components/DashboardTour.tsx` | Thêm prop `paused` | F-2 |
| `components/ReferralPromptModal.tsx` | Chỉ tự bật khi đã học ≥ 1 bài, không bật trên trang bài học | F-3 |
| `components/ResumeLearningButton.tsx` | Link "Học tiếp" mang `?hanh-trinh=` khi đang theo một mục tiêu | F-4 |
| `components/AppNavbar.tsx` | Mặc định mở nhóm Học tập | F-5 |
| `components/LessonPageLayout.tsx` | Bỏ đường dẫn/tên tệp giả, đổi nhãn tab. Tiêu đề kết quả quiz phụ thuộc điểm. | F-6, F-9 |
| `components/tools/CongCuClient.tsx` | Trình soạn mã lên đầu, nhãn "Hợp cho người mới", câu giải thích "ticket" | F-7 |
| `lib/i18n/dictionaries/{vi,en}.ts`, `sections/placement-focus.ts`, `sections/revamp-tools.ts` | Chuỗi mới, có đủ cả hai ngôn ngữ | — |
| `lib/lesson-block-budget.ts` (mới), `components/LessonPageClient.tsx`, `components/LessonSections.tsx` | Ngân sách khối: mạch chính giữ một khối thực hành + một khối hình, các khối phụ vào "Học sâu hơn" gập sẵn. `LessonSections` nhận `indices`. Chữ thân bài 16/28 trên mobile | F-8 |
| `components/LessonPageLayout.tsx`, `components/MidpointInteractive.tsx` | Thẻ kết quả quiz nói vế còn thiếu, có nút tới câu giữa bài / chỗ đang đọc. `stageTipsInBody` để thẻ mẹo vào mục gập | F-8, F-9 |
| `lib/__tests__/lesson-block-budget.test.ts` | Test quy tắc ngân sách, và kiểm tra trên dữ liệu thật rằng mạch chính của mọi bài còn khối thực hành + khối hình | F-8 |
| `docs/ux-audit/scripts/journey.mjs`, `lesson-heights.mjs` (mới) | `BASE` đọc từ biến môi trường (để đo ở cổng khác khi cổng 4000 đang bận). Script đo chiều cao từng khối | — |

Không chức năng nào bị xoá. Popup mời bạn vẫn mở được từ menu Kết nối. Tour vẫn
chạy ở lượt vào sau. Lộ trình chuyên sâu vẫn chọn được, giờ là ngay ở câu hỏi
đầu. `components/OnboardingFlow.tsx` còn nguyên trong repo nhưng không còn được
dùng.

Nhận diện màu: đề bài nhắc "cam đất / cam vàng", nhưng thương hiệu hiện tại là
**xanh brand** (`--color-brand-*`). Đây là quyết định của chủ sản phẩm từ
2026-09-27, và các lớp `orange-*`/`amber-*` đều đã được trỏ về `brand-*` trong
`app/globals.css`. Bản sửa này giữ nguyên màu xanh và không thêm màu mới.

### Kiểm tra

| | Kết quả |
|---|---|
| `tsc --noEmit` | 0 lỗi |
| `eslint` trên các file đã sửa | 3 lỗi, đều ở các dòng `LessonPageLayout.tsx` không bị đụng tới (372, 480, 510), đã có từ trước |
| `npm test` | 203/204 file qua. Lỗi duy nhất: `lib/__tests__/kiem-tra-page.test.tsx`, test của `/kiem-tra` và `DailyNewsQuizWidget`, hai file đã có thay đổi chưa commit **từ trước phiên audit này** và không nằm trong thay đổi này |
| Hành trình Playwright | 5/5 persona tới được bài đầu tiên, 0 ngõ cụt ở bước onboarding (trước: 3/5 bị nút bấm không ăn) |
| Lượt hai (F-8, F-9) | `tsc --noEmit` 0 lỗi · `npm test` 205/205 file qua (thêm `lesson-block-budget.test.ts`) · `npm run audit:lessons` exit 0, thiếu thực hành 0/1.513, thiếu hình ảnh 0/1.513 · eslint: không lỗi mới (các lỗi ở `LessonPageLayout.tsx` vẫn là các lỗi cũ đã ghi ở trên) · `i18n-coverage` 0 chuỗi cứng trong `LessonPageClient`/`LessonPageLayout` |

---

## 8. Lộ trình cải thiện tiếp

Xếp theo mức giảm tải nhận thức trên mỗi đơn vị công sức.

1. **Bài học gọn lại (F-8, P1). Phần trình bày đã xong (14,8 → 11,3 màn hình ở 390px). Phần còn lại là nội dung.** Thân bài một mình đã 5.835px ≈ 6,9 màn hình. Muốn xuống dưới 6 thì phải viết bài ngắn hơn (khoảng 600 chữ giảng thay cho 1.000), hoặc tách bài dài làm hai. Bắt đầu từ các bài đầu của mỗi hành trình, vì đó là bài người mới gặp trước.
2. **Hoàn thành bài rõ ràng (F-9, P1). Thẻ kết quả đã nói vế còn thiếu.** Còn lại: cân nhắc gộp câu giữa bài vào quiz, để điều kiện hoàn thành chỉ còn hai vế.
3. **Dashboard cho người 0–3 bài (F-15, P2).** Chỉ hiện thẻ Học tiếp + tiến độ của hành trình. Ẩn chỉ số cấp/XP/xếp hạng tới bài thứ 3, như menu đã làm.
4. **Một nơi điều phối lần đầu vào.** Để F-1 không tái diễn khi ai đó thêm popup thứ năm: một hook `useFirstRunSlot()` cấp quyền hiện cho đúng một lớp phủ mỗi lượt vào.
5. **UX writing (F-12, F-14, F-17).** Một lượt đổi nhãn: Dashboard → Trang chính, nhãn tiếng Anh thành phụ đề, "Bài thử đầu tiên" cho bài mở đầu hành trình.
6. **Landing mobile (F-13).** Tắt scramble trên mobile và với `prefers-reduced-motion`, ẩn bản lặp của tiêu đề khỏi trình đọc màn hình.
7. **Công cụ cho mục tiêu không-kỹ-thuật (F-7 còn lại).** Một "công cụ" luyện prompt hoặc kiểm chứng câu trả lời AI cho người chọn mục tiêu văn phòng/marketing.

## 9. Để kiểm chứng bằng người thật

Script không thay được 5 buổi ngồi cạnh người thật. Kịch bản 30 phút mỗi người,
ghi màn hình và nói to suy nghĩ (think-aloud):

1. "Bạn nghe nói có trang này để học công nghệ. Hãy bắt đầu học bài đầu tiên." Không gợi ý gì. Ghi lại: mất bao lâu tới bài đầu, dừng lại ở đâu, đọc to chữ nào.
2. "Làm phần kiểm tra của bài này." Ghi lại: họ có biết bài đã xong chưa.
3. "Thử một công cụ thực hành." Ghi lại: họ chọn công cụ nào và vì sao.
4. Hôm sau, gửi link: "Học tiếp." Ghi lại: họ có quay lại không, và có tìm được chỗ đã dừng không.

Chọn 1 người cho mỗi persona ở mục 1. Persona 35–50 tuổi nên làm trên điện
thoại của chính họ.

Chạy lại phép đo tự động:

```bash
npm run dev -- --port 4000
```

```bash
node docs/ux-audit/scripts/journey.mjs p1 /tmp/ux-run
```
