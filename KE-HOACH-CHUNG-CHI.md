# Kế hoạch: ôn chứng chỉ thật sự đủ để đi thi - bài, bài thực hành, đề thi thử

Ngày lập: 2026-09-30

## 1. Đang đứng ở đâu (đo, không ước)

`lib/cert-tracks.ts` **không có bài riêng cho chứng chỉ**: mỗi miền thi là một danh sách bài có sẵn trong kho được ghép vào. Nút "Luyện miền này" rút 10 câu từ quiz của chính các bài đó (`/api/knowledge-challenge?track=cert`).

| Chứng chỉ | Số bài | Câu quiz rút được | Bài có thực hành | Đề thi thử |
| --- | --- | --- | --- | --- |
| AWS Cloud Practitioner (CLF-C02) | 26 | 130 | 5 | không có |
| AWS Solutions Architect (SAA-C03) | 32 | 160 | 3 | không có |
| CompTIA Security+ (SY0-701) | 34 | 170 | 4 | không có |

Theo từng miền: 25-45 câu, thực hành 0-2 bài. Bốn miền **không có bài thực hành nào**: `billing-support`, `resilient-architectures`, `cost-optimized-architectures`, `security-operations`. Trong đó `security-operations` nặng nhất đề Security+ (28%).

Ba khoảng trống này quyết định thứ tự làm:

1. **Câu hỏi hiện có là câu kiểm tra hiểu bài, không phải câu kiểu đề thi.** Đề AWS và CompTIA gần như toàn câu tình huống ("Một công ty cần… giải pháp nào ÍT tốn kém nhất?"), có cả câu chọn nhiều đáp án. Người học đạt 90% ở quiz bài vẫn có thể trượt đề thật.
2. **Không có đề thi thử đủ dài và có giờ.** 65-90 câu trong 90-130 phút là một kỹ năng riêng: giữ nhịp, bỏ qua câu khó rồi quay lại. Luyện 10 câu một lần không tập được điều đó.
3. **Bài chưa phủ hết mục tiêu của đề.** Bài được chọn vì "gần chủ đề", không phải vì đối chiếu từng mục trong hướng dẫn kỳ thi (exam guide). Hiện không đo được đề hỏi mục nào mà kho chưa có bài.

Hạ tầng dùng lại được, không phải viết mới:

- khối `sim` với bộ mô phỏng Cloud / Terminal / SQL (mới dùng ở 6 bài)
- khối `scenario` (751 bài)
- khối `flow` (685 bài)
- `/api/stage-exam` và `/api/level-exam`: đề có giờ, ký đáp án ở server
- chấm theo token của `knowledge-challenge`

## 2. Nguyên tắc (không thương lượng khi tăng tốc)

1. **Không chép đề thật, không dùng "dump".** Nội dung đề AWS và CompTIA thuộc thoả thuận bảo mật của kỳ thi, và bị mua bán dưới dạng "đề rò rỉ". Mọi câu phải tự viết từ **mục tiêu công bố** trong hướng dẫn kỳ thi, và mỗi câu ghi mục tiêu nó kiểm (`objective`). Không có mục tiêu nào để trỏ tới thì không có câu.
2. **Kho đề chấm điểm thì phải được đo ngay từ ngày đầu.** AGENTS.md có hai bài học về chuyện này:
   - ngân hàng câu hỏi IB từng có 271/276 câu mà đáp án đúng là phương án dài nhất
   - `lib/level-exams.ts` từng có 380 câu không cổng nào đo tới

   Kho đề chứng chỉ vào `scripts/audit-lesson-content.mjs` (hoặc một audit riêng) trước khi có câu thứ 50. Các luật áp dụng:
   - độ dài hai chiều và vị trí giữa (`MAX_LENGTH_BIAS_Z`, `MAX_MIDDLE_BIAS_Z`)
   - cấm phương án rỗng ("Luôn tốt", "Không ảnh hưởng"…)
   - đáp án là số trần phải khớp lời giải
   - mọi phương án sai phải là một nhầm lẫn thật, kèm lý do sai
3. **Mỗi câu tình huống có lời giải cho CẢ BỐN phương án**, không chỉ đáp án đúng. Ôn chứng chỉ chủ yếu là học vì sao ba phương án kia sai.
4. **Đề đổi phiên bản thì kho đổi theo.** Mỗi chứng chỉ ghi các trường sau:
   - `examCode`
   - `guideVersion`: phiên bản exam guide
   - `verifiedAt`
   - `sources`: link exam guide chính thức

   Cổng kiểm báo đỏ khi `verifiedAt` quá 180 ngày. Các con số giá, giới hạn dịch vụ, tên gói hỗ trợ đều thuộc phần "theo phiên bản", giống luật `toolVersion` ở KE-HOACH-1500-BAI.md.
5. **Thực hành không cần tài khoản cloud thật.** Không bắt người mới nhập thẻ để tạo tài khoản AWS. Thực hành chạy trên trình mô phỏng (`sim`) và chấm theo kết quả. Mỗi bài có thể thêm một mục "làm trên AWS thật (tuỳ chọn, free tier)", ghi rõ là ngoài phần chấm.
6. **Tiến độ vẫn tính ở một chỗ.** Bài mới vào kho bài chung (`lib/lessons.ts`), và `cert-tracks.ts` vẫn chỉ ghép id bài như hiện nay. Một bài chứng chỉ vẫn là một bài học bình thường, lên `user_progress` và XP như mọi bài khác.

## 3. Giai đoạn 0: bản đồ mục tiêu (tuần 1)

Với mỗi chứng chỉ, lấy exam guide chính thức và chép **danh sách mục tiêu** (task statement / objective) thành dữ liệu, ví dụ `lib/cert-objectives.ts`. Chỉ chép tên mục và mã mục; không chép nội dung đề. Sau đó đối chiếu từng mục với bài hiện có.

Kết quả là một bảng phủ cho từng mục: **đã có bài / có bài nhưng mỏng / chưa có**. Bảng này quyết định số bài ở giai đoạn 1; các con số ở dưới là ước lượng trước khi có bảng.

Cổng kiểm mới: `cert-coverage` báo mọi mục tiêu chưa có bài nào. Ngưỡng ban đầu ghi nhận mức hiện tại, rồi siết dần về 0.

## 4. Giai đoạn 1: bài học (tuần 2-7)

Ước lượng khoảng **170 bài mới** cho ba chứng chỉ hiện có. Con số chốt sau giai đoạn 0.

| Chứng chỉ | Hiện có | Thêm | Đích | Ưu tiên nội dung |
| --- | --- | --- | --- | --- |
| CLF-C02 | 26 | ~40 | ~66 | IAM, mô hình trách nhiệm chung, S3 / EC2 / RDS / Lambda ở mức "khi nào dùng", **cả miền billing** (Pricing Calculator, Cost Explorer, các gói Support, Organizations) |
| SAA-C03 | 32 | ~70 | ~100 | VPC sâu (subnet, route, NAT, endpoint), Multi-AZ vs read replica, SQS / SNS / EventBridge, caching, chọn loại lưu trữ, **cả miền resilient và cost-optimized** |
| SY0-701 | 34 | ~60 | ~94 | Nhận diện tấn công qua log, IAM / MFA / PKI, ứng phó sự cố, quản trị rủi ro, **security operations** (miền 28%, hiện 0 thực hành) |

Khuôn một bài chứng chỉ, theo đúng các cổng nội dung đang có:

- Mở bằng một tình huống công việc, không bằng định nghĩa. Có khối `flow` hoặc `chart` cho thứ cần nhìn chuyển động (gói tin qua VPC, chi phí theo thời gian chạy).
- Có một mục **"Đề hay gài chỗ này"**: hai-ba cặp dịch vụ dễ nhầm, ví dụ Security Group và NACL, hay SQS và SNS.
- Quiz ≥ 5 câu như mọi bài. Kho đề thi thử ở giai đoạn 3 là thứ tách riêng.
- Mỗi bài có trường `certObjectives: ["SAA-1.2", …]`, để bảng phủ ở giai đoạn 0 tự cập nhật.

Thứ tự: **CLF-C02 trước.** Đây là chứng chỉ người mới hay chọn đầu tiên, và cũng là chứng chỉ gần nhất với track người mới hiện có. Tiếp theo là Security+, cuối cùng SAA-C03.

## 5. Giai đoạn 2: bài thực hành (tuần 4-9, chạy song song)

Đích: **mọi bài chứng chỉ có ít nhất một khối thực hành, và mọi miền thi có ít nhất 3 lab chấm điểm.** Hiện khoảng 12 lượt bài có thực hành (đếm theo miền, một bài có thể nằm ở hai miền), đích khoảng 300.

| Loại | Làm trên gì | Ví dụ | Chấm |
| --- | --- | --- | --- |
| Lab cấu hình | `sim` tool `cloud` (mở rộng bộ mô phỏng hiện có) | Tạo bucket S3 chặn public; viết IAM policy chỉ đọc một bucket; chia VPC thành 2 subnet public / 2 private | Trạng thái cuối: policy cho phép hay chặn đúng các request thử |
| Lab điều tra | `sim` tool `terminal` | Đọc log đăng nhập tìm brute-force; tìm tiến trình lạ; kiểm quyền tệp | Câu trả lời cuối khớp (IP, tên tiến trình) |
| Lab chi phí | khối `chart` có thanh trượt | On-Demand, Reserved và Savings Plan theo số giờ chạy; giá lưu trữ theo lớp S3 | Chọn đúng phương án rẻ nhất ở mức tải đã cho |
| Ca thiết kế | khối `scenario` rẽ nhánh | "Web app sập khi một AZ hỏng - sửa kiến trúc"; "Phát hiện ransomware - làm gì trước" | Đi tới kết thúc đúng; nhánh sai dẫn tới hậu quả cụ thể |

Việc hạ tầng ở giai đoạn này:

- Bộ mô phỏng Cloud cần thêm IAM policy evaluator, VPC / route và bảng giá mẫu.
- `npm run audit:exercises` phải chạy lời giải mẫu của mọi `sim` mới, giống exercise code hiện nay.

## 6. Giai đoạn 3: đề thi thử và kho câu hỏi kiểu đề (tuần 6-12)

**Kho câu hỏi kiểu đề**, tách khỏi quiz bài học, ví dụ `lib/cert-question-bank/<cert>.ts`:

| Chứng chỉ | Đích | Tỉ lệ theo miền | Loại câu |
| --- | --- | --- | --- |
| CLF-C02 | 400 câu | đúng tỉ trọng đề (24 / 30 / 34 / 12) | chọn 1, chọn 2 |
| SAA-C03 | 500 câu | 30 / 26 / 24 / 20 | tình huống dài, chọn 1 / chọn 2-3 |
| SY0-701 | 450 câu | 12 / 22 / 18 / 28 / 20 | chọn 1, chọn nhiều, **câu mô phỏng** (kéo-thả ghép cặp, đọc log) |

Mỗi câu gồm:

- `objective`: trỏ về mục tiêu ở giai đoạn 0
- `difficulty`
- `explanation` cho từng phương án
- `lessonSlug`: bài để ôn lại

Khoảng 6 lần độ dài đề là đủ để làm vài đề thi thử mà gần như không trùng câu.

**Đề thi thử có giờ.** Cùng số câu và thời gian như đề thật, rút theo tỉ trọng miền. Dùng lại khuôn `/api/stage-exam`: server ký đáp án, chấm lại khi nộp. Có đánh dấu câu để xem lại và điều hướng giữa các câu như đề thật. Hết giờ thì tự nộp.

**Sau khi nộp**, người học thấy:

- điểm quy đổi theo thang của nhà ra đề
- điểm từng miền, xếp từ yếu đến mạnh
- mỗi câu sai trỏ về đúng bài để ôn
- **chỉ số sẵn sàng**: trung bình ba đề gần nhất so với điểm đạt

Câu sai đưa vào kho ôn câu sai (`/on-tap-cau-sai`, đã có SRS).

Dữ liệu cần thêm:

- một bảng D1 `cert_mock_attempts` (migration + policy như các bảng khác)
- `cert_readiness`, tính từ đề thi thử chứ không từ số bài đã xong

Luật màu (2026-09-30): nút vào thi thử là `btnEnergy` (coral), điểm và chỉ số sẵn sàng đi màu vàng.

## 7. Giai đoạn 4: thêm chứng chỉ (tuần 12+, sau khi ba cái đầu đạt đích)

Chọn theo nhu cầu người học của app và theo kho bài đang mạnh (AI thực tế 740 bài):

| Chứng chỉ | Vì sao | Ước lượng |
| --- | --- | --- |
| AWS Certified AI Practitioner (AIF-C01) | Khớp thẳng với 740 bài AI cho công việc; chứng chỉ AI nền tảng dễ vào | ~50 bài, 350 câu |
| Microsoft Azure Fundamentals (AZ-900) | Nhiều công ty Việt Nam dùng Microsoft 365 / Azure | ~45 bài, 350 câu |
| CompTIA Network+ | Nền cho Security+ và cloud; track mạng đã có bài | ~60 bài, 400 câu |
| HashiCorp Terraform Associate | Nối tiếp các chặng Docker / CI/CD mới | ~40 bài, 300 câu |

Mỗi chứng chỉ mới đi đủ giai đoạn 0 → 3, không thêm chứng chỉ chỉ có danh sách bài ghép như hiện nay.

## 8. Tổng khối lượng và cách chạy

| Hạng mục | Ba chứng chỉ hiện có | Thêm ở giai đoạn 4 |
| --- | --- | --- |
| Bài học mới | ~170 | ~195 |
| Khối thực hành mới | ~300 | ~200 |
| Câu hỏi kiểu đề | ~1.350 | ~1.400 |
| Đề thi thử | 3 loại đề | 4 loại đề |

Chạy theo đợt 20-30 bài, giống cách đã làm với 740 bài AI. Mỗi đợt gồm năm bước:

1. viết
2. `npm run audit:lessons` và audit kho đề
3. `npm run audit:exercises`
4. dịch tiếng Anh, hai lượt (dịch rồi cân lại độ dài phương án, xem AGENTS.md)
5. `npm run audit:lessons:en`

**Cân lại đợt vừa viết trước khi viết đợt tiếp**; AGENTS.md ghi lại lần hai việc này chạy song song và tỉ lệ lỗi tăng nhanh bằng tốc độ sửa.

## 9. Xong khi nào (đo được)

- `cert-coverage`: 0 mục tiêu chưa có bài, ở cả ba chứng chỉ.
- Mọi miền có ≥ 3 lab chấm điểm; mọi bài chứng chỉ có ≥ 1 khối thực hành.
- Kho đề đạt đích số câu, qua mọi cổng độ dài và phương án rỗng, ở cả tiếng Việt lẫn tiếng Anh.
- Đề thi thử chạy trọn: có giờ, tự nộp, điểm theo miền, câu sai vào `/on-tap-cau-sai`.
- `verifiedAt` của cả ba chứng chỉ trong vòng 180 ngày, có link exam guide.
