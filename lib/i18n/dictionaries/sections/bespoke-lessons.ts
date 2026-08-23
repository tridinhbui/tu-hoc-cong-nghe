// Chữ của các trang bài học VIẾT TAY dưới app/bai-hoc/<slug>/, khoá theo slug.
//
// VÌ SAO CHÚNG KHÔNG DÙNG ĐƯỜNG DỊCH BÀI HỌC. `lib/lessons-i18n/` chỉ đắp lên
// bài trong `lib/lessons.ts`; năm trang này viết nội dung thẳng vào JSX và
// không bao giờ gọi `getLessonBySlug`. `scripts/build-translation-index.mjs`
// còn CHẶN BUILD nếu ai đó đặt một bản dịch cho slug có trang viết tay - vì
// Next phục vụ trang bespoke trước, nên bản dịch sẽ nằm trong repo trông như
// đã xong mà không đổi một chữ nào. Từ điển là đường duy nhất còn lại.
//
// KHÔNG dịch ở đây - và ba nhóm dưới đây là ba lý do KHÁC NHAU:
//
//   - Chuỗi vốn đã là tiếng Anh trong bản gốc: "LBO Capital Structure
//     Simulator", "MOIC (equity return)", và tên bốn nguồn vốn ("Cash on
//     Hand", "Debt Financing"...). Đưa chúng vào đây tạo ra một cặp giá trị
//     giống hệt nhau giữa hai ngôn ngữ, mà dictionary-parity không phân biệt
//     được với một bản dịch bị bỏ quên - nó đã bắt đúng cả ba. Chúng sống
//     thành hằng số trong chính trang, cạnh mảng emoji.
//   - `difficulty` ("Dễ" / "Trung bình" / "Khó") là một union tiếng Việt dùng
//     làm GIÁ TRỊ khắp ứng dụng; giao diện render nó qua `t.difficulty[...]`.
//   - `duration` ("8 phút") được `LessonPageLayout` parse lấy con số để ghi
//     thời gian học; chữ "phút" không hiện nguyên dạng.
//   - `slug`, `id`, `accent`, `nextSlug`: cấu trúc và định tuyến.
//
// `options` của quiz LÀ THEO VỊ TRÍ - `correct` là chỉ số vào mảng gốc, và
// `LessonPageLayout` ghi `quiz_score` xuống Supabase như mọi bài khác. Xáo thứ
// tự khi dịch làm sai ĐÁP ÁN, không phải sai chữ. Cùng luật với
// lib/lessons-i18n; xem AGENTS.md, mục "Translating lessons", luật số 2.
//
// Hai trang, cả hai đã dịch xong: nguon-luc-cho-mot-lan-ra-mat và
// cac-hang-uu-tien-tai-nguyen.
//
// Ba trang viết tay còn lại đã được DI TRÚ về lib/lessons.ts và xoá khỏi
// app/bai-hoc/ trong lúc lượt này đang chạy, nên chúng đi theo đường dịch bài
// học chuẩn (lib/lessons-i18n/) chứ không qua tệp này. Đó là cách sửa GỐC cho
// khiếm khuyết mà chú thích trong mỗi trang từng ghi lại: id giả kiểu 9004 làm
// tiến độ, XP và ghi chú đổ sang một bài khác có thật. Nếu hai trang còn lại
// cũng được di trú thì tệp này biến mất theo.

export const bespokeLessonsVi = {
  bespokeLessons: {
    "cac-hang-uu-tien-tai-nguyen": {
      title: "Các Hạng Ưu Tiên Tài Nguyên",
      subtitle: "9 hạng công suất, thứ tự thu hồi và ai bị cắt trước khi cụm thiếu chỗ",
      nextTitle: "Day 6: Câu điều kiện",
      heading: "Không phải mọi đơn vị công suất đều giống nhau",
      intro:
        "Khi nói tới \"công suất\" của một hệ thống, hầu hết người mới nghĩ đó là một con số duy nhất: bao nhiêu CPU, bao nhiêu bộ nhớ. Thực tế công suất là một bức tranh nhiều tầng với ít nhất 9 hạng khác nhau - mỗi hạng có mức độ dễ bị thu hồi, mức dự phòng phải mua thêm, và thứ tự bị cắt hoàn toàn khác.",
      intro2:
        "Hiểu điều này giúp bạn: (1) đọc hoá đơn hạ tầng đúng hơn, (2) hiểu tại sao cùng một con CPU lại có nhiều mức giá, (3) biết dịch vụ nào chết trước khi cụm hết chỗ.",
      ruleHeading: "Quy tắc vàng: Rủi ro ↔ Dự phòng",
      ruleLead: "Trước khi đi vào từng hạng, hãy ghi nhớ một quy tắc không đổi trong vận hành:",
      ruleBanner: "Càng dễ bị thu hồi → càng phải mua dư nhiều",
      ruleNote:
        "Không ai giữ được cùng một mức cam kết dịch vụ trên công suất có thể mất bất cứ lúc nào mà không mua dư. Đây là lý do spot phải dự phòng 18% trong khi chỗ đặt trước chỉ cần 5%.",
      typesHeading: "9 hạng công suất",
      rateSuffix: "{tag} · Dự phòng ~{rate}%",
      waterfallHeading: "🏗️ Thác phân bổ công suất - ai còn chỗ khi cụm co lại?",
      scenarioNormal: " Bình thường (cụm 600 vCPU)",
      scenarioDistress: "🔥 Sự cố vùng (cụm 280 vCPU)",
      payoutLine: "{paid}/{total} vCPU",
      verdictNormal:
        " Cụm 600 vCPU > tổng nhu cầu 450 vCPU → mọi hạng đều đủ chỗ. Còn dư 150 vCPU cho tải đột biến.",
      verdictDistress:
        "🔥 Cụm 280 vCPU < tổng nhu cầu 450 vCPU → hạng hệ thống đủ, từ tầng 3 trở xuống không còn chỗ. Tải nền bị thu hồi sạch.",
      lboHeading: "Trộn hạng - ứng dụng thực tế của thứ tự ưu tiên",
      lboLead:
        "Trộn nhiều hạng công suất là cách điển hình nhất để thấy thứ tự ưu tiên hoạt động. Đội hạ tầng ghép nhiều tầng cam kết dài hạn với càng ít công suất trả theo giờ càng tốt - để kéo chi phí mỗi đơn vị xuống mà vẫn giữ được cam kết dịch vụ.",
      lboTableTitle: "Cấu trúc công suất điển hình - cụm 1.000 vCPU",
      lboAmounts: ["500 vCPU", "200 vCPU", "100 vCPU", "200 vCPU"],
      lboEquityRate: "Rẻ hơn 70-90%, mất bất cứ lúc nào",
      lboNote:
        "Ghép nhiều hạng để hạ giá - nếu tải nền ổn định suốt 3 năm: chi phí mỗi vCPU giảm từ giá niêm yết xuống còn khoảng 45%, tương đương tiết kiệm hơn một nửa hoá đơn.",
      takeawayHeading: " 3 điều cần nhớ",
      takeaways: [
        "Rủi ro ↔ Dự phòng: chỗ đặt trước cần dư ít nhất, spot cần dư nhiều nhất",
        "Thứ tự thu hồi: Hệ thống → Đặt trước → Chạy nền hoãn được → Spot - ai đứng cuối mất nhiều nhất khi cụm co lại",
        "Hiểu thứ tự ưu tiên = hiểu tại sao cùng một con CPU lại có nhiều mức giá khác nhau",
      ],
      debtTypes: [
        { tag: "Có chỗ đặt trước", desc: "Bộ lập lịch giữ sẵn một lượng tài nguyên cụ thể (CPU, bộ nhớ, băng thông) cho riêng tải này. Không ai được dùng phần đó kể cả khi tải đang rảnh. Rủi ro bị thu hồi thấp nhất → cần mua dư ít nhất trong cả cấu trúc.", eg: "Đặt trước 8 vCPU cho tầng cơ sở dữ liệu, giữ nguyên kể cả lúc rảnh" },
        { tag: "Không đặt trước", desc: "Có hạn mức trần nhưng không có chỗ giữ sẵn. Khi cụm chật, tải phải tranh chỗ với mọi tải cùng hạng. Rủi ro bị dồn cao hơn → phải mua dư nhiều hơn.", eg: "Dịch vụ nội bộ đặt limit nhưng không đặt request, gặp lúc cao điểm là chậm" },
        { tag: "Ưu tiên xếp trước", desc: "Được cấp chỗ trước tất cả trong thứ tự lập lịch khi cụm thiếu. Không nhất thiết có chỗ đặt trước - ưu tiên nói về thứ tự xếp hàng, không phải về việc giữ sẵn tài nguyên.", eg: "Tải hệ thống thường vừa đặt trước vừa ưu tiên cao - hai thuộc tính khác nhau" },
        { tag: "Đứng sau hạng ưu tiên", desc: "Chỉ được cấp chỗ sau khi hạng ưu tiên đã đủ. Trong một cụm chia sẻ, thường là job huấn luyện hoặc chạy báo cáo. Rủi ro bị hoãn thực sự cao hơn → phải mua dư thêm 3-5% so với hạng trên.", eg: "Job ETL đêm, job huấn luyện mô hình, việc dọn dẹp định kỳ" },
        { tag: "Hạn mức bùng nổ", desc: "Như hạn mức tín dụng cho tải: tích luỹ khi rảnh, tiêu khi cao điểm, hết thì tụt về mức nền. Linh hoạt nhất trong các hạng, thường dùng cho tải lên xuống thất thường.", eg: "Máy chủ tích luỹ điểm bùng nổ ban đêm, tiêu hết vào giờ cao điểm sáng" },
        { tag: "Cam kết theo kỳ hạn", desc: "Cam kết dùng một lượng cố định trong một kỳ định sẵn (tháng hoặc năm), đổi lấy giá thấp hơn. Không trả lại được giữa kỳ. Dùng cho phần tải nền đã biết chắc.", eg: "Cam kết 1 năm cho 200 vCPU tải nền, đổi lấy giảm khoảng 30%" },
        { tag: "Có thể được nâng hạng", desc: "Bắt đầu ở hạng thấp, được nâng lên hạng ưu tiên khi đạt điều kiện. Rẻ hơn hạng ưu tiên nhưng đội vận hành giữ được đường thoát. Phổ biến ở hệ thống mới vì tránh cam kết sớm.", eg: "Dịch vụ mới chạy hạng thấp 3 tháng, đủ tải ổn định thì nâng lên đặt trước" },
        { tag: "Mua trước từ thị trường", desc: "Trả trước cho một lượng công suất trong 1 đến 3 năm, nhà cung cấp giữ chỗ và giảm giá sâu. Giá cố định, hết hạn thì trả lại. Phân tán rủi ro giá, không phụ thuộc giá theo giờ.", eg: "Mua trước 3 năm cho 200 vCPU, giảm khoảng 50% so với giá theo giờ" },
        { tag: "Lai giữa rẻ và mất", desc: "Đứng giữa cam kết và không có gì. Rẻ hơn 70-90% nhưng bị thu hồi trước tiên khi nhà cung cấp cần chỗ. Phổ biến trong cụm huấn luyện để 'lấp chỗ trống' khi cam kết dài hạn không đủ.", eg: "Cụm huấn luyện dùng spot: cam kết 50% + bùng nổ 20% + spot 30%" },
      ],
      quiz: [
        {
          question: "Tại sao công suất đặt trước cần mua dư ít hơn công suất không đặt trước?",
          options: [
            "Vì nhà cung cấp ưu tiên khách lớn, và chỗ đặt trước hầu hết là của họ",
            "Vì chỗ đặt trước luôn có kỳ hạn ngắn hơn nên ít biến động hơn",
            "Vì tài nguyên đã được giữ sẵn nên không bị tranh mất lúc cao điểm",
            "Vì giá của chỗ đặt trước đã được nhà cung cấp trợ giá một phần",
          ],
          explanation: "Rủi ro và dự phòng luôn đi cùng nhau. Chỗ đặt trước có tài nguyên giữ sẵn → khả năng bị tranh mất thấp → đội vận hành chấp nhận mua dư ít hơn mà vẫn giữ được cam kết dịch vụ. Đây là nguyên tắc cốt lõi của việc chia phần tài nguyên.",
        },
        {
          question: "Trong thác phân bổ công suất, thứ tự ưu tiên đúng là:",
          options: [
            "Spot → System Critical → Guaranteed Reserved → Deferrable Batch",
            "Deferrable Batch → Guaranteed Reserved → System Critical → Spot",
            "Spot → Burst Credit → Guaranteed Reserved → System Critical",
            "System Critical → Guaranteed Reserved → Deferrable Batch → Spot",
          ],
          explanation: "Khi cụm thiếu chỗ, System Critical được cấp trước (vừa đặt trước vừa ưu tiên cao), sau đó Guaranteed Reserved, rồi Deferrable Batch, cuối cùng mới tới Spot. Thứ tự này quyết định mức dự phòng của từng hạng.",
        },
        {
          question: "Hạn mức bùng nổ khác cam kết theo kỳ hạn ở điểm gì?",
          options: [
            "Bùng nổ là hạn mức tích luỹ rồi tiêu, cam kết cấp cố định cả kỳ",
            "Bùng nổ có giá cố định còn cam kết thì thả nổi theo từng giờ dùng",
            "Bùng nổ chỉ dành cho cụm nội bộ và hệ thống của nhà cung cấp lớn",
            "Cam kết không tính tiền phần chưa dùng, còn bùng nổ thì vẫn tính",
          ],
          explanation: "Hạn mức bùng nổ giống hạn mức tín dụng cho tải - tích luỹ khi rảnh, tiêu khi cao điểm, hết thì tụt về mức nền. Linh hoạt, dùng cho tải thất thường. Cam kết theo kỳ hạn cấp một lượng cố định suốt kỳ, đổi lấy giá thấp hơn.",
        },
        {
          question: "Hạng có thể được nâng hạng phù hợp với hệ thống nào?",
          options: [
            "Hệ thống của nhà cung cấp, được cấp riêng một hạng ngoài bảng giá",
            "Một dạng chỗ đặt trước không kèm quyền ưu tiên khi cụm thiếu chỗ",
            "Công suất không tính tiền, chỉ trả khi kết thúc kỳ cam kết dài hạn",
            "Dịch vụ mới chưa biết tải thật, chạy hạng thấp rồi nâng lên sau",
          ],
          explanation: "Hạng nâng được là công suất giá thấp có thể chuyển lên hạng ưu tiên khi tải chứng minh được là ổn định (thường sau vài tháng). Đôi bên cùng lợi: đội vận hành trả ít hơn lúc đầu, nhà cung cấp giữ được khách khi hệ thống lớn lên.",
        },
        {
          question: "Spot phù hợp nhất trong tình huống nào?",
          options: [
            "Khi hệ thống cần mức cam kết dịch vụ cao nhất có thể đạt được",
            "Khi cụm huấn luyện cần lấp khoảng giữa cam kết dài hạn và trả theo giờ",
            "Khi một dịch vụ mới cần chỗ ổn định mà chưa đo được tải thật",
            "Khi nhà cung cấp cần giữ chỗ cho tải hệ thống của chính họ",
          ],
          explanation: "Spot lấp khoảng trống trong cấu trúc công suất của một cụm huấn luyện. Cam kết dài hạn chỉ nên mua tới mức tải nền chắc chắn. Phần còn lại muốn rẻ mà chấp nhận bị thu hồi → spot, rẻ hơn 70-90% và thường có thời gian báo trước vài phút.",
        },
      ],
    },
    "nguon-luc-cho-mot-lan-ra-mat": {
      title: "Nguồn Lực Cho Một Lần Ra Mắt",
      subtitle: "Công sức để đưa một hệ thống lên sản xuất đến từ đâu?",
      nextTitle: "Cộng hưởng khi gộp hai dịch vụ",
      heading: "Nguồn Lực Cho Một Lần Ra Mắt",
      intro: "Công sức để ra mắt một hệ thống đến từ đâu - và cấu trúc nào cho hiệu quả cao nhất?",
      sourcesHeading: "🧰 4 nguồn lực chính khi ra mắt",
      debtShareLabel: "Tỷ lệ vay nợ kỹ thuật ({debt}% / {equity}% làm chuẩn)",
      dealSizeLabel: "Tổng công sức: {size} người-giờ",
      equityShare: "{pct}% làm chuẩn",
      debtShare: "{pct}% vay nợ",
      equityCaption: "Làm chuẩn ngay (tự bỏ)",
      debtCaption: "Nợ kỹ thuật (vay tương lai)",
      exitAssumption: "Sau 5 quý (giả định tải +50%, đã trả 50% nợ kỹ thuật):",
      exitEvLabel: "Giá trị hệ thống ({multiple}x × {ebitda} người-giờ giữ được mỗi quý)",
      remainingDebtLabel: "Nợ kỹ thuật còn lại",
      billion: "{value} người-giờ",
      checklistHeading: "📋 Checklist khi cân nhắc vay nợ kỹ thuật",
      sources: [
        {
          desc: "Đội tự viết, tự kiểm thử, tự vận hành. Đơn giản nhất, không phụ thuộc ai và không nợ ai.",
          example: "Đội nền tảng tự dựng lớp xác thực thay vì mua, vì nó chạm vào mọi dịch vụ",
          pro: "Không phụ thuộc bên ngoài, hiểu tường tận",
          con: "Chi phí cơ hội cao nếu có việc đáng làm hơn",
        },
        {
          desc: "Làm nhanh và để lại phần dọn dẹp cho sau: bỏ kiểm thử, chép mã, gắn tạm. Dùng đòn bẩy để ra mắt sớm.",
          example: "Ra mắt bản đầu bằng cách chép logic sang ba chỗ, hẹn gộp lại ở quý sau",
          pro: "Ra mắt sớm hơn, học được từ người dùng thật",
          con: "Lãi cộng dồn: mỗi thay đổi sau đều đắt hơn",
        },
        {
          desc: "Mua một dịch vụ ngoài thay vì tự viết. Đội đổi công sức lấy hoá đơn hằng tháng.",
          example: "Dùng dịch vụ gửi thư và xếp hàng thay vì tự dựng và tự trực",
          pro: "Không tốn công sức, chạy được ngay",
          con: "Phụ thuộc nhà cung cấp, khó gỡ ra sau này",
        },
        {
          desc: "Kết hợp mã nguồn mở + tự viết phần riêng + phần trả sau nếu hệ thống lớn lên.",
          example: "Lấy thư viện mở làm nền, tự viết phần nghiệp vụ, hẹn tối ưu khi vượt 10 nghìn lượt/giây",
          pro: "Bắc cầu giữa cái cần ngay và cái cần lâu dài",
          con: "Phức tạp khi vận hành và theo dõi",
        },
      ],
      checklist: [
        "Đội có đủ người và thời gian để làm chuẩn ngay không?",
        "Sau khi ra mắt, tỷ lệ mã không có kiểm thử sẽ là bao nhiêu? Đội có chịu nổi không?",
        "Lần ra mắt này làm tốc độ của quý sau nhanh lên hay chậm đi?",
        "Ai sẽ trả phần nợ này, và trả vào lúc nào trong lịch?",
        "Chi phí gỡ bỏ và mốc thời gian thu được lợi ích thật?",
      ],
      quiz: [
        {
          question: "Trong một lần ra mắt có vay nợ kỹ thuật, 'đòn bẩy' đề cập đến điều gì?",
          options: [
            "Sức mặc cả của đội kỹ thuật khi thương lượng thời hạn",
            "Khả năng đẩy giá bán của sản phẩm lên sau khi ra mắt",
            "Phương pháp ước lượng công sức thường dùng trong lập kế hoạch",
            "Phần lớn công việc được ra mắt bằng cách nợ lại phần dọn dẹp",
          ],
          explanation: "Vay nợ kỹ thuật dùng đòn bẩy để khuếch đại kết quả trên phần công sức đội thật sự bỏ ra. Đội bỏ 30-40% công sức làm chuẩn, 60-70% còn lại là phần nợ lại - và phần nợ đó phải trả, có lãi.",
        },
        {
          question: "Làm chuẩn ngay hoàn toàn so với nợ hoàn toàn: cách nào rẻ hơn về tổng công sức?",
          options: [
            "Làm chuẩn ngay, vì nợ kỹ thuật cộng lãi vào mọi thay đổi sau đó",
            "Nợ hoàn toàn - ra mắt sớm, chắc chắn có phản hồi",
            "Hai cách ngang nhau, vì cùng một lượng việc phải làm xong",
            "Phụ thuộc từng đội nên không có câu trả lời chung",
          ],
          explanation: "Nợ kỹ thuật giống một khoản vay có lãi: mỗi thay đổi đi qua phần mã đang nợ đều đắt hơn, và phần lãi ấy cộng dồn theo thời gian. Vay vẫn đúng khi giá trị của việc ra mắt sớm lớn hơn phần lãi phải trả - nhưng tổng công sức thì cao hơn.",
        },
        {
          question: "Một lần ra mắt 'sinh lời' nghĩa là gì?",
          options: [
            "Ra mắt có nhiều cộng hưởng nên cả hai đội cùng nhanh lên",
            "Đội chấp nhận ra mắt với phạm vi nhỏ hơn kế hoạch ban đầu",
            "Tốc độ giao việc của đội sau lần ra mắt cao hơn trước đó",
            "Lần ra mắt được thực hiện và hoàn tất rất nhanh chóng",
          ],
          explanation: "Sinh lời: tốc độ sau khi ra mắt cao hơn trước. Ngược lại là hao mòn. Khi vay nợ kỹ thuật, đội tạo thêm phần phải bảo trì - lần ra mắt chỉ sinh lời khi phần việc mới làm được bù đắp được chỗ chậm đi ấy.",
        },
        {
          question: "Tại sao đội vẫn chọn vay nợ kỹ thuật thay vì làm chuẩn hoàn toàn?",
          options: [
            "Để giữ lại người của đội cho một dự án khác đang chờ",
            "Nợ khuếch đại kết quả trên phần công sức tự bỏ ra",
            "Quy trình duyệt bắt buộc mọi lần ra mắt phải có phần nợ",
            "Làm chuẩn hoàn toàn không được phép trong dự án thật",
          ],
          explanation: "Ví dụ: tổng việc 1.000 người-giờ. Làm chuẩn hết: sau 5 quý hệ thống đáng 1.500 → gấp 1,5 lần. Vay nợ (300 tự bỏ + 700 nợ, trả được 400 sau 5 quý, hệ thống đáng 1.500): kết quả trên phần tự bỏ = (1.500−300)/300 = 4 lần. Đòn bẩy khuếch đại kết quả - và khuếch đại cả rủi ro.",
        },
        {
          question: "Phần trả sau theo mốc trong một lần ra mắt là gì?",
          options: [
            "Phần công việc được hoãn lại, gắn với một mốc tải cụ thể",
            "Khoản công sức đội phải hoàn lại nếu hệ thống không đạt mốc",
            "Phần lãi tính trên khối lượng công việc đã bị hoãn lại",
            "Số người đội được cấp thêm khi hệ thống vượt mốc tải",
          ],
          explanation: "Phần trả sau theo mốc là phần việc cố tình hoãn, gắn vào một ngưỡng đo được (lượt/giây, số người dùng, dung lượng). Dùng khi đội và người đặt hàng không thống nhất được là phần đó có thật sự cần hay không - hoãn tới lúc số liệu tự trả lời.",
        },
      ],
    },
  } as Record<string, BespokeLessonCopy>,
};

// Năm trang có năm bố cục khác nhau, nên chỉ phần CHUNG là bắt buộc; phần
// riêng của từng trang để tuỳ chọn. Trang tự biết nó cần trường nào, còn
// lib/__tests__/bespoke-lessons-i18n.test.ts kiểm rằng mọi mảng của một slug
// khớp độ dài giữa hai bản - đó mới là ràng buộc quan trọng, vì `correct` của
// quiz là chỉ số vào chính những mảng đó.
export interface BespokeLessonCopy {
  title: string;
  subtitle: string;
  nextTitle: string;
  heading: string;
  intro: string;
  sourcesHeading?: string;
  debtShareLabel?: string;
  dealSizeLabel?: string;
  equityShare?: string;
  debtShare?: string;
  equityCaption?: string;
  debtCaption?: string;
  exitAssumption?: string;
  exitEvLabel?: string;
  remainingDebtLabel?: string;
  billion?: string;
  checklistHeading?: string;
  sources?: { desc: string; example: string; pro: string; con: string }[];
  checklist?: string[];
  answerParagraphs?: { text: string; style: string }[][];
  recipeHeading?: string;
  recipe?: string[];
  selectorHeading?: string;
  selectorHint?: string;
  selectorEmpty?: string;
  selectorWhen?: string;
  selectorCompanies?: string;
  selectorWhy?: string;
  selectorWeakness?: string;
  methods?: { when: string; companies: string; why: string; weakness: string }[];
  mistakesHeading?: string;
  mistakes?: { mistake: string; bad: string; fix: string }[];
  onelinerHeading?: string;
  onelinerNote?: string;
  /** cac-hang-uu-tien-tai-nguyen */
  intro2?: string;
  ruleHeading?: string;
  ruleLead?: string;
  ruleBanner?: string;
  ruleNote?: string;
  typesHeading?: string;
  rateSuffix?: string;
  waterfallHeading?: string;
  scenarioNormal?: string;
  scenarioDistress?: string;
  payoutLine?: string;
  verdictNormal?: string;
  verdictDistress?: string;
  lboHeading?: string;
  lboLead?: string;
  lboTableTitle?: string;
  lboAmounts?: string[];
  lboEquityRate?: string;
  lboNote?: string;
  takeawayHeading?: string;
  takeaways?: string[];
  debtTypes?: { tag: string; desc: string; eg: string }[];
  quiz: { question: string; options: string[]; explanation: string }[];
}

export const bespokeLessonsEn: typeof bespokeLessonsVi = {
  bespokeLessons: {
    "cac-hang-uu-tien-tai-nguyen": {
      title: "The Resource Priority Classes Worth Knowing",
      subtitle: "Nine capacity classes, the eviction order, and who gets cut first when the cluster runs short",
      nextTitle: "Day 6: Conditionals",
      heading: "Not every unit of capacity is the same",
      intro:
        "When people talk about a system's \"capacity\", most beginners picture a single number: how much CPU, how much memory. In reality capacity is a layered picture with at least nine different classes - each with its own chance of being reclaimed, its own headroom you have to buy on top, and its own place in the eviction queue.",
      intro2:
        "Understanding this lets you: (1) read an infrastructure bill more accurately, (2) see why the same CPU comes at several prices, and (3) know which service dies first when the cluster runs out of room.",
      ruleHeading: "The golden rule: Risk ↔ Headroom",
      ruleLead: "Before going through the classes, hold on to one rule that never bends in operations:",
      ruleBanner: "The easier it is to reclaim → the more spare you must buy",
      ruleNote:
        "Nobody holds the same service-level commitment on capacity that can vanish at any moment without buying spare. That is why spot needs 18% headroom while a reservation needs only 5%.",
      typesHeading: "The nine capacity classes",
      rateSuffix: "{tag} · around {rate}% headroom",
      waterfallHeading: "🏗️ The capacity waterfall - who still has room when the cluster shrinks?",
      scenarioNormal: " Normal (cluster of 600 vCPU)",
      scenarioDistress: "🔥 Zone failure (cluster of 280 vCPU)",
      payoutLine: "{paid}/{total} vCPU",
      verdictNormal:
        " Cluster 600 vCPU > total demand 450 vCPU → every class fits. 150 vCPU are left over to absorb spikes.",
      verdictDistress:
        "🔥 Cluster 280 vCPU < total demand 450 vCPU → the system class is covered; from the third layer down there is no room left. Background work is reclaimed entirely.",
      lboHeading: "Mixing classes - priority order in practice",
      lboLead:
        "Blending capacity classes is the clearest place to watch priority order at work. The infrastructure team stacks several tiers of long-term commitment with as little pay-by-the-hour capacity as possible - to pull the cost per unit down while still holding the service-level commitment.",
      lboTableTitle: "A typical capacity mix - a 1,000 vCPU cluster",
      lboAmounts: ["500 vCPU", "200 vCPU", "100 vCPU", "200 vCPU"],
      lboEquityRate: "70-90% cheaper, gone at any moment",
      lboNote:
        "Blending classes is what brings the price down - if the baseline load holds steady for three years, the cost per vCPU falls from list price to roughly 45%, which is more than half the bill saved.",
      takeawayHeading: " Three things to remember",
      takeaways: [
        "Risk ↔ Headroom: a reservation needs the least spare, spot needs the most",
        "Eviction order: System → Reserved → Deferrable batch → Spot - whoever stands last loses most when the cluster shrinks",
        "Understanding priority order means understanding why the same CPU carries several different prices",
      ],
      debtTypes: [
        { tag: "Reserved upfront", desc: "The scheduler holds a specific amount of resource (CPU, memory, bandwidth) for this workload alone. Nobody else may use it, not even while the workload sits idle. The lowest reclaim risk in the structure → the least spare to buy.", eg: "Reserving 8 vCPU for the database tier, held even when it is idle" },
        { tag: "No reservation", desc: "There is a ceiling but nothing held aside. When the cluster fills up, the workload competes for room with everything else in its class. Higher risk of being squeezed → more spare to buy.", eg: "An internal service with a limit but no request, slow whenever peak arrives" },
        { tag: "Scheduled first", desc: "Gets room ahead of everything else in the scheduling order when the cluster is short. It does not have to hold a reservation - priority is about queue position, not about holding resource aside.", eg: "System workloads usually reserve AND rank high - two separate properties" },
        { tag: "Behind the priority class", desc: "Only gets room once the priority class is satisfied. On a shared cluster this is usually training or reporting work. Genuinely higher risk of being deferred → 3-5% more headroom than the class above.", eg: "Nightly ETL jobs, model training runs, scheduled cleanup work" },
        { tag: "Burst allowance", desc: "Like a credit line for load: it accrues while idle, is spent at peak, and drops back to the baseline once exhausted. The most flexible class, normally used for load that swings unpredictably.", eg: "A host banking burst credits overnight and spending them in the morning peak" },
        { tag: "Committed for a term", desc: "You commit to a fixed amount for a set term (a month or a year) in exchange for a lower price. It cannot be handed back mid-term. Used for the part of the load you already know.", eg: "A one-year commitment on 200 vCPU of baseline load for roughly 30% off" },
        { tag: "Can be promoted", desc: "Starts in a low class and moves up to the priority class once it meets the conditions. Cheaper than the priority class while leaving the team a way out. Common for new systems because it avoids committing early.", eg: "A new service runs low-class for three months, then is promoted once its load is steady" },
        { tag: "Bought ahead on the market", desc: "You pay upfront for an amount of capacity across one to three years; the provider holds the room and discounts it heavily. Fixed price, handed back at expiry. It spreads price risk instead of riding the hourly rate.", eg: "Buying 200 vCPU three years ahead, roughly 50% below the hourly rate" },
        { tag: "Cheap but reclaimable", desc: "Sits between a commitment and nothing at all. It is 70-90% cheaper but the first thing reclaimed when the provider needs room. Common on training clusters to 'fill the gap' when long-term commitments do not stretch far enough.", eg: "A training cluster on spot: 50% committed + 20% burst + 30% spot" },
      ],
      quiz: [
        {
          question: "Why does reserved capacity need less spare bought on top than unreserved capacity?",
          options: [
            "Because providers favour large customers, and reservations are mostly theirs",
            "Because a reservation always carries a shorter term and so swings less",
            "Because the resource is already held aside and cannot be taken at peak",
            "Because the price of a reservation is partly subsidised by the provider",
          ],
          explanation: "Risk and headroom always move together. Reserved capacity has the resource held aside → a low chance of being taken → the team accepts less spare while still holding its service-level commitment. This is the core principle of sharing out resource.",
        },
        {
          question: "In the capacity waterfall, the correct priority order is:",
          options: [
            "Spot → System Critical → Guaranteed Reserved → Deferrable Batch",
            "Deferrable Batch → Guaranteed Reserved → System Critical → Spot",
            "Spot → Burst Credit → Guaranteed Reserved → System Critical",
            "System Critical → Guaranteed Reserved → Deferrable Batch → Spot",
          ],
          explanation: "When the cluster runs short, System Critical is served first (it both reserves and ranks high), then Guaranteed Reserved, then Deferrable Batch, and only then Spot. That order is what sets each class's headroom.",
        },
        {
          question: "How does a burst allowance differ from a term commitment?",
          options: [
            "Burst accrues then is spent, a commitment grants a fixed amount all term",
            "Burst carries a fixed price while a commitment floats with each hour used",
            "Burst is only offered on internal clusters and large providers' own systems",
            "A commitment does not bill the unused part, whereas burst bills it anyway",
          ],
          explanation: "A burst allowance is a credit line for load - it accrues while idle, is spent at peak, and drops back to the baseline once exhausted. Flexible, and used for swinging load. A term commitment grants a fixed amount for the whole term in exchange for a lower price.",
        },
        {
          question: "Which system suits a promotable class?",
          options: [
            "A provider's own system, given a class outside the published price list",
            "A form of reservation that carries no priority when the cluster is short",
            "Capacity that is not billed at all, paid only at the end of a long term",
            "A new service whose real load is unknown: run low, promote it later",
          ],
          explanation: "A promotable class is low-priced capacity that can move up to the priority class once the load proves steady (usually after a few months). Both sides win: the team pays less at the start, and the provider keeps the customer as the system grows.",
        },
        {
          question: "When does spot capacity fit best?",
          options: [
            "When a system needs the highest service-level commitment it can reach",
            "When a training cluster needs to fill the gap between commitments and hourly",
            "When a new service needs steady room before its real load is measured",
            "When the provider needs to hold room aside for its own system workloads",
          ],
          explanation: "Spot fills the gap in a training cluster's capacity mix. Long-term commitments should only be bought up to the load you are sure of. For the rest, cheap in exchange for being reclaimed → spot, 70-90% cheaper and usually with a few minutes of warning.",
        },
      ],
    },
    "nguon-luc-cho-mot-lan-ra-mat": {
      title: "Where the Effort for a Launch Comes From",
      subtitle: "Where does the effort to put a system into production come from?",
      nextTitle: "The gains from merging two services",
      heading: "Where the Effort for a Launch Comes From",
      intro: "Where does the effort to launch a system come from - and which structure gives the best return?",
      sourcesHeading: "🧰 The four main sources of effort at launch",
      debtShareLabel: "Share taken as technical debt ({debt}% / {equity}% done properly)",
      dealSizeLabel: "Total effort: {size} person-hours",
      equityShare: "{pct}% done properly",
      debtShare: "{pct}% borrowed",
      equityCaption: "Done properly now (paid yourself)",
      debtCaption: "Technical debt (borrowed from later)",
      exitAssumption: "After five quarters (assuming load +50% and half the debt repaid):",
      exitEvLabel: "System value ({multiple}x × {ebitda} person-hours saved per quarter)",
      remainingDebtLabel: "Technical debt left",
      billion: "{value} person-hours",
      checklistHeading: "📋 Checklist before taking on technical debt",
      sources: [
        {
          desc: "The team writes it, tests it and runs it. The simplest option: nobody to depend on and nobody to repay.",
          example: "A platform team builds its own auth layer rather than buying one, because it touches every service",
          pro: "No outside dependency, full understanding",
          con: "High opportunity cost if something better is waiting",
        },
        {
          desc: "Ship fast and leave the cleanup for later: skip the tests, copy the code, wire it together loosely. Leverage to launch sooner.",
          example: "Shipping the first version by copying the logic into three places, promising to merge them next quarter",
          pro: "Launches sooner, learns from real users",
          con: "Interest compounds: every later change costs more",
        },
        {
          desc: "Buy an outside service instead of writing it. The team trades effort for a monthly bill.",
          example: "Using a hosted mail and queue service rather than building and being on call for one",
          pro: "No effort spent, running immediately",
          con: "Vendor dependency, hard to unpick later",
        },
        {
          desc: "A blend of open source, a bespoke layer of your own, and work deferred until the system grows into it.",
          example: "An open-source base, your own domain layer, and optimisation deferred until 10k requests/second",
          pro: "Bridges what you need now and what you need long-term",
          con: "Harder to operate and to keep track of",
        },
      ],
      checklist: [
        "Does the team have the people and the time to do it properly now?",
        "After launch, what share of the code will have no tests? Can the team live with that?",
        "Does this launch make next quarter faster or slower?",
        "Who repays this debt, and where does it sit on the schedule?",
        "What does unpicking it cost, and when do the real gains land?",
      ],
      quiz: [
        {
          question: "In a launch funded by technical debt, what does 'leverage' refer to?",
          options: [
            "The engineering team's bargaining power when negotiating deadlines",
            "The ability to raise the product's price once it has launched",
            "The estimation method normally used when planning the work",
            "Most of the work ships by deferring the cleanup until later",
          ],
          explanation: "Borrowing technical debt uses leverage to amplify the result on the effort the team actually spends. The team puts in 30-40% of the work properly; the other 60-70% is deferred - and deferred work is repaid with interest.",
        },
        {
          question: "Doing it all properly versus borrowing it all: which costs less in total effort?",
          options: [
            "Doing it properly, because debt adds interest to every later change",
            "Borrowing it all - it ships sooner and feedback is certain",
            "They are equal, since the same amount of work has to be finished",
            "It depends on the team, so there is no general answer",
          ],
          explanation: "Technical debt behaves like an interest-bearing loan: every change that passes through the borrowed code costs more, and that interest compounds over time. Borrowing is still right when launching early is worth more than the interest - but the total effort is higher.",
        },
        {
          question: "What does an 'accretive' launch mean?",
          options: [
            "A launch with enough overlap that both teams get faster",
            "The team agrees to launch a smaller scope than first planned",
            "The team's delivery pace after the launch is higher than before",
            "The launch is carried out and completed very quickly",
          ],
          explanation: "Accretive: the pace after launch is higher than before. Dilutive is the opposite. Borrowing technical debt adds something to maintain - the launch is only accretive when the new capability outweighs the drag it created.",
        },
        {
          question: "Why do teams still borrow technical debt instead of doing it all properly?",
          options: [
            "To keep the team's people free for another project that is waiting",
            "Debt amplifies the result on the effort spent directly",
            "The approval process requires every launch to carry some debt",
            "Doing it all properly is not permitted on a real project",
          ],
          explanation: "Say the work totals 1,000 person-hours. All properly: after five quarters the system is worth 1,500 → 1.5x. Borrowed (300 spent + 700 deferred, 400 repaid over five quarters, system worth 1,500): return on effort spent = (1,500−300)/300 = 4x. Leverage amplifies the result - and the risk with it.",
        },
        {
          question: "What is milestone-deferred work in a launch?",
          options: [
            "Work deliberately deferred and tied to a specific load milestone",
            "Effort the team must repay if the system misses its milestone",
            "The interest charged on the volume of work already deferred",
            "The extra people a team is granted once load passes a milestone",
          ],
          explanation: "Milestone-deferred work is work postponed on purpose and attached to a measurable threshold (requests per second, user count, data volume). It is used when the team and the requester cannot agree whether the work is truly needed - defer it until the numbers answer.",
        },
      ],
    },
  },
};

/** Phần riêng của từng trang, thu hẹp lại thành BẮT BUỘC.
 *
 *  Trang ép kiểu về đây một lần ở đầu component thay vì kiểm `?.` ở ba mươi chỗ
 *  render. Phép ép đó an toàn nhờ lib/__tests__/bespoke-lessons-i18n.test.ts:
 *  nó kiểm từng slug có đủ trường của chính nó ở CẢ HAI ngôn ngữ, nên một
 *  trường thiếu làm đỏ build chứ không thành `undefined` trên màn hình. */
export interface LaunchEffortLessonCopy extends BespokeLessonCopy {
  remainingDebtLabel: string;
  sourcesHeading: string;
  debtShareLabel: string;
  dealSizeLabel: string;
  equityShare: string;
  debtShare: string;
  equityCaption: string;
  debtCaption: string;
  exitAssumption: string;
  exitEvLabel: string;
  billion: string;
  checklistHeading: string;
  sources: { desc: string; example: string; pro: string; con: string }[];
  checklist: string[];
}

export interface ResourceClassLessonCopy extends BespokeLessonCopy {
  intro2: string;
  ruleHeading: string;
  ruleLead: string;
  ruleBanner: string;
  ruleNote: string;
  typesHeading: string;
  rateSuffix: string;
  waterfallHeading: string;
  scenarioNormal: string;
  scenarioDistress: string;
  payoutLine: string;
  verdictNormal: string;
  verdictDistress: string;
  lboHeading: string;
  lboLead: string;
  lboTableTitle: string;
  lboAmounts: string[];
  lboEquityRate: string;
  lboNote: string;
  takeawayHeading: string;
  takeaways: string[];
  debtTypes: { tag: string; desc: string; eg: string }[];
}

export interface ValuationMethodLessonCopy extends BespokeLessonCopy {
  answerHeading: string;
  answerPrompt: string;
  answerParagraphs: { text: string; style: string }[][];
  recipeHeading: string;
  recipe: string[];
  selectorHeading: string;
  selectorHint: string;
  selectorEmpty: string;
  selectorWhen: string;
  selectorCompanies: string;
  selectorWhy: string;
  selectorWeakness: string;
  methods: { when: string; companies: string; why: string; weakness: string }[];
  mistakesHeading: string;
  mistakes: { mistake: string; bad: string; fix: string }[];
  onelinerHeading: string;
  onelinerNote: string;
}
