import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 14. Một người viết cho một tệp.
export const P14_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ───────────────────────── Chọn công cụ, bài 1 ─────────────────────────
  "dieu-khoan-ho-tro-va-gioi-han": [
    {
      type: "scenario",
      title: "Mười bốn ngày dùng thử, đọc gì trước",
      start: "s0",
      nodes: {
        s0: {
          text: "Bạn chọn công cụ quản lý dự án cho đội 8 người. Việc khó nhất là đồng bộ dữ liệu với phần mềm kế toán qua API. Bản dùng thử có 14 ngày. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Thử lần lượt mọi tính năng cho chắc không sót", next: "broad" },
            { label: "Nhắn bên bán hàng hỏi hỗ trợ của họ tốt cỡ nào", next: "sales" },
            { label: "Đọc danh sách loại trừ của gói hỗ trợ trước", next: "terms" },
          ],
        },
        broad: {
          text: "Hết 14 ngày, hai công cụ bạn đang so đều làm tốt mọi thứ bạn thử, nên bạn chọn theo cảm giác. Sáu tháng sau phần đồng bộ kế toán trục trặc, bạn gửi yêu cầu hỗ trợ và nhận câu trả lời lịch sự rằng tích hợp qua API nằm ngoài phạm vi. Đội phải đổi công cụ giữa năm.",
          ending: "bad",
        },
        sales: {
          text: "Bên bán hàng trả lời ngay: hỗ trợ rất tốt, cam kết phản hồi trong một giờ. Bạn cần quyết định có tin câu đó không.",
          choices: [
            { label: "Tin, vì một giờ là nhanh hơn hẳn công cụ kia", next: "sales_trust" },
            { label: "Hỏi lại bằng văn bản: tích hợp qua API có nằm trong phạm vi hỗ trợ không", next: "terms" },
          ],
        },
        sales_trust: {
          text: "Tháng đầu, khi đồng bộ kế toán lỗi, bạn nhận phản hồi đúng một giờ sau - đúng cam kết. Nội dung phản hồi: vấn đề thuộc phần tích hợp, không nằm trong phạm vi hỗ trợ. Cam kết nói về tốc độ trả lời, không nói về việc có giúp được hay không.",
          ending: "bad",
        },
        terms: {
          text: "Danh sách loại trừ ghi rõ: hỗ trợ không bao gồm tích hợp qua giao diện lập trình. Gói bạn nhắm tới có giá 12 đô mỗi người mỗi tháng và hạn mức gọi API kiểu mềm: vượt thì vẫn chạy và tính thêm tiền. Bạn làm gì tiếp?",
          choices: [
            { label: "Chấp nhận vì 96 đô mỗi tháng nằm trong ngân sách", next: "budget_trap" },
            { label: "Hỏi bằng văn bản gói nào hỗ trợ tích hợp, hạn mức vượt tính giá bao nhiêu, xuất dữ liệu ra thế nào", next: "good" },
            { label: "Loại công cụ này và chọn công cụ còn lại mà không đọc điều khoản", next: "skip_terms" },
          ],
        },
        budget_trap: {
          text: "96 đô là con số nhỏ nhất bạn sẽ trả. Tháng đầu đồng bộ chạy nhiều hơn dự tính, phần vượt hạn mức mềm được tính thêm và bạn chỉ biết qua hoá đơn cuối tháng. Phần tích hợp lỗi thì vẫn không được hỗ trợ.",
          ending: "bad",
        },
        skip_terms: {
          text: "Công cụ còn lại cũng có danh sách loại trừ, và bạn không biết trong đó có gì. Bạn vừa đổi một lựa chọn đã biết rủi ro lấy một lựa chọn chưa biết gì.",
          ending: "bad",
        },
        good: {
          text: "Bên bán trả lời bằng văn bản: gói cao hơn có hỗ trợ tích hợp, phần vượt hạn mức có đơn giá cụ thể, dữ liệu xuất được toàn bộ ra định dạng mở. Bạn tính chi phí thật theo mức dùng của đội, rồi dùng nốt thời gian thử vào đúng phần đồng bộ kế toán, phần việc khó nhất của bạn.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Hoá đơn thật mỗi tháng: hạn mức cứng và hạn mức mềm",
      caption: "Số liệu minh hoạ, không phải bảng giá của nhà cung cấp nào. Kéo thanh trượt để thấy con số trên bảng giá chỉ là mức thấp nhất bạn sẽ trả.",
      kind: "line",
      xLabel: "Phần vượt hạn mức (nghìn lượt gọi)",
      yLabel: "Hoá đơn mỗi tháng (đô)",
      x: { from: 0, to: 100, step: 10 },
      params: [
        { id: "gia", label: "Giá gói mỗi người", min: 5, max: 30, step: 1, value: 12, unit: "đô" },
        { id: "nguoi", label: "Số người dùng", min: 2, max: 30, step: 1, value: 8, unit: "người" },
        { id: "dongia", label: "Đơn giá vượt mỗi nghìn lượt", min: 0, max: 5, step: 0.5, value: 1, unit: "đô" },
      ],
      series: [
        { label: "Hạn mức cứng (dừng khi chạm ngưỡng)", expr: "gia * nguoi" },
        { label: "Hạn mức mềm (tính thêm phần vượt)", expr: "gia * nguoi + x * dongia" },
      ],
    },
  ],

  // ───────────────────────── Chọn công cụ, bài 2 ─────────────────────────
  "doc-so-lieu-nha-cung-cap-trung-ra": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản tóm tắt trang số liệu: chỗ nào đang suy ra quá tay",
      task: "Một trợ lý AI tóm tắt trang số liệu của hai nhà cung cấp cơ sở dữ liệu (số giả định, để luyện). Dữ liệu thật của bạn khoảng 400 GB. Bấm vào những câu suy luận không đứng vững rồi nộp.",
      segments: [
        { text: "Trang giới thiệu của nhà cung cấp B ghi truy vấn nhanh gấp 8 lần nhà cung cấp A." },
        { text: "Chú thích cuối trang cho biết bài đo chạy trên 2 GB dữ liệu nằm gọn trong bộ nhớ." },
        {
          text: "Vì vậy với 400 GB dữ liệu của chúng ta, B cũng sẽ nhanh gấp 8 lần.",
          error: "Dữ liệu của bạn lớn gấp 200 lần bài đo và không còn nằm gọn trong bộ nhớ. Ranh giới đó tạo ra khác biệt nhiều lần, nên không thể mang nguyên con số 8 sang.",
        },
        { text: "Con số 8 lần lấy từ lần chạy nhanh nhất trong 20 lần chạy liên tiếp." },
        {
          text: "Lần chạy nhanh nhất và trung vị đều cho biết hệ thống chạy thế nào, nên dùng con số này để lập kế hoạch là hợp lý.",
          error: "Hai con số trả lời hai câu hỏi khác nhau. Người dùng thật gặp cả vùng đuôi chậm, thứ mà giá trị tốt nhất giấu đi.",
        },
        { text: "Trong bài đo, A chạy với cấu hình mặc định còn B đã được tinh chỉnh." },
        {
          text: "Chuyện A để mặc định chỉ là chi tiết nhỏ và không ảnh hưởng tới việc so sánh.",
          error: "Tinh chỉnh một bên và để bên kia ở mặc định là cách tạo ra so sánh có lợi mà không cần nói dối câu nào.",
        },
        { text: "Cách chắc nhất là chạy thử một phần dữ liệu thật của chúng ta qua cả hai công cụ và so trung vị." },
      ],
    },
    {
      type: "flow",
      title: "Từ con số công bố tới con số của bạn",
      steps: [
        { label: "Chép con số công bố", detail: "Ví dụ 'nhanh gấp 8 lần'. Chưa kết luận gì, chỉ ghi lại kèm tên trang và nơi đặt chú thích." },
        { label: "Đọc chú thích về dữ liệu", detail: "Bài đo dùng bao nhiêu dữ liệu và có nằm gọn trong bộ nhớ không. So với dữ liệu của bạn, đây thường là hệ số lớn nhất." },
        { label: "Đọc cách lấy mẫu", detail: "Giá trị tốt nhất, trung bình hay trung vị. Người dùng của bạn gặp cả vùng chậm, nên trung vị gần với thực tế hơn." },
        { label: "Xem cấu hình hai bên", detail: "Một bên tinh chỉnh, một bên mặc định thì hai con số không so được với nhau." },
        { label: "Đo trên dữ liệu của bạn", detail: "Lấy một phần dữ liệu thật, chạy qua công cụ đang cân nhắc, đo trung vị. Thường mất chưa tới một ngày và là con số duy nhất đúng với hoàn cảnh của bạn." },
      ],
    },
  ],

  // ───────────────────────── Chọn công cụ, bài 3 ─────────────────────────
  "so-hai-cong-cu-va-chot": [
    {
      type: "exercise",
      language: "python",
      title: "Quy hai bảng giá về tổng chi phí năm đầu",
      task: "Công cụ A có phí cao hơn, công cụ B rẻ hơn 20% nhưng tốn chi phí chuyển đổi và đội phải học lâu hơn. Mã khởi đầu mới chỉ so phí dịch vụ. Hãy tính tổng năm đầu cho mỗi bên: phí dịch vụ + chi phí chuyển đổi + số giờ học (mỗi người) × số người × giá một giờ. Đơn vị: nghìn đồng.",
      starter: `# Đơn vị: nghìn đồng, tính cho năm đầu
phi_a = 60000
phi_b = 48000
chuyen_doi_b = 16000
gio_hoc_a = 8     # giờ mỗi người
gio_hoc_b = 16
so_nguoi = 4
gia_gio = 200

tong_a = phi_a
tong_b = phi_b

print("A:", tong_a)
print("B:", tong_b)
if tong_a < tong_b:
    print("Chọn: A")
else:
    print("Chọn: B")
`,
      solution: `# Đơn vị: nghìn đồng, tính cho năm đầu
phi_a = 60000
phi_b = 48000
chuyen_doi_b = 16000
gio_hoc_a = 8     # giờ mỗi người
gio_hoc_b = 16
so_nguoi = 4
gia_gio = 200

tong_a = phi_a + gio_hoc_a * so_nguoi * gia_gio
tong_b = phi_b + chuyen_doi_b + gio_hoc_b * so_nguoi * gia_gio

print("A:", tong_a)
print("B:", tong_b)
if tong_a < tong_b:
    print("Chọn: A")
else:
    print("Chọn: B")
`,
      expectedOutput: "A: 66400\nB: 76800\nChọn: A",
      hints: [
        "Chi phí học của một bên là số giờ mỗi người × số người × giá một giờ.",
        "Bên B còn phải cộng thêm chi phí chuyển đổi chỉ tốn một lần.",
        "Sau khi cộng đủ, bên rẻ hơn trên bảng giá có còn rẻ hơn không?",
      ],
    },
    {
      type: "chart",
      title: "Bên rẻ hơn thua dần khi đội đông lên",
      caption: "Số liệu minh hoạ dựa trên bài tập phía trên: A phí 60.000 và học 8 giờ mỗi người, B phí 48.000 cộng 16.000 chuyển đổi và học 16 giờ mỗi người. Đơn vị nghìn đồng, năm đầu.",
      kind: "line",
      xLabel: "Số người trong đội",
      yLabel: "Tổng chi phí năm đầu (nghìn đồng)",
      x: { from: 1, to: 10, step: 1 },
      params: [{ id: "g", label: "Giá trị một giờ làm việc", min: 100, max: 400, step: 50, value: 200, unit: "nghìn đồng" }],
      series: [
        { label: "Công cụ A (phí cao hơn)", expr: "60000 + 8 * x * g" },
        { label: "Công cụ B (rẻ hơn 20%)", expr: "64000 + 16 * x * g" },
      ],
    },
  ],

  // ───────────────────────── Chặng 22, bài 1 ─────────────────────────
  "marketing-voi-ai-bat-dau-tu-dau": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bản nháp bài đăng trước khi đăng",
      task: "Bạn chỉ đưa AI: tên tiệm trà Lan Hương, combo gồm một ấm trà ô long và hai bánh nhỏ, giá 89.000đ, bán từ thứ Sáu, đặt bàn qua tin nhắn. Bản nháp dưới đây có vài chỗ AI tự điền. Bấm những câu bạn không đăng.",
      segments: [
        { text: "Tiệm trà Lan Hương ra mắt combo trà và bánh từ thứ Sáu này." },
        { text: "Hơn 10.000 khách đã tin dùng trà của tiệm.", error: "Bạn không đưa con số này. AI điền một con số nghe hợp lý, và bạn là người chịu trách nhiệm nếu nó sai." },
        { text: "Combo gồm một ấm trà ô long và hai chiếc bánh nhỏ, giá 89.000đ." },
        { text: "Quy trình pha mới giúp giảm 50% thời gian chờ.", error: "Không có số liệu nào về thời gian chờ trong thông tin bạn đưa. Đây là con số bịa nghe có vẻ thật." },
        { text: "Nhắn tin để đặt bàn trước và có chỗ ngồi yên tĩnh." },
        { text: "Cam kết hài lòng 100% hoặc hoàn tiền ngay.", error: "Một lời hứa về tiền mà bạn chưa hề quyết định. Mọi lời hứa và giá cả phải qua tay bạn." },
      ],
    },
  ],

  // ───────────────────────── Chặng 22, bài 2 ─────────────────────────
  "chan-dung-khach-hang-cho-ai": [
    {
      type: "scenario",
      title: "Viết chân dung khách của tiệm nến thơm",
      start: "s0",
      nodes: {
        s0: {
          text: "Bạn bán nến thơm online và cần một chân dung khách ngắn để dán vào mọi câu lệnh. Bạn lấy chất liệu từ đâu?",
          choices: [
            { label: "Hỏi AI xem khách mua nến thơm thường là ai", next: "ask_ai" },
            { label: "Gom tin nhắn khách hỏi, bình luận và lý do đổi trả", next: "messages" },
            { label: "Dán bảng đơn hàng gồm tên và số điện thoại để AI tự rút ra", next: "paste_pii" },
          ],
        },
        ask_ai: {
          text: "AI trả về một người trung bình: nữ, thích thư giãn, quan tâm trang trí nhà. Nghe hợp lý nhưng là nhiều khách khác ngoài kia, không phải khách của bạn. Bài viết sau đó trơn tru mà nhạt.",
          ending: "bad",
        },
        paste_pii: {
          text: "Danh sách đã chứa tên và số điện thoại thật của khách bị dán vào công cụ AI. Chân dung mô tả một nhóm người nên không cần chi tiết của từng người, và dữ liệu khách một khi đã dán đi thì không lấy lại được.",
          ending: "bad",
        },
        messages: {
          text: "Trong 30 tin nhắn, ba câu lặp lại nhiều nhất: 'nến có mùi nồng không?', 'cháy được bao lâu?', 'tặng sinh nhật có hộp sẵn không?'. Bạn viết chân dung thế nào?",
          choices: [
            { label: "Nữ 25-35 tuổi, thích nến thơm, thu nhập trung bình", next: "demo" },
            { label: "Người mua quà sinh nhật cho bạn, 25-35 tuổi, lo mùi quá nồng, muốn có hộp sẵn", next: "good" },
            { label: "Dán nguyên các tin nhắn kèm tên người gửi cho đủ chi tiết", next: "paste_pii2" },
          ],
        },
        demo: {
          text: "Các nhãn nhân khẩu học đúng nhưng thiếu hoàn cảnh và nỗi lo. AI vẫn không biết khách đang mua cho ai, lo điều gì, nên bài viết vẫn là bài của một người trung bình.",
          ending: "bad",
        },
        paste_pii2: {
          text: "Tên và tài khoản của khách nằm trong câu lệnh, trong khi thứ AI cần chỉ là lời họ hỏi. Chân dung tốt giữ lại câu hỏi và bỏ danh tính.",
          ending: "bad",
        },
        good: {
          text: "Ba dòng ngắn nói rõ ai đọc, họ đang ở hoàn cảnh nào và lo điều gì, lấy từ lời khách thật nên không phải đoán. Dán đoạn này đầu mỗi câu lệnh, AI sẽ viết về mùi dịu và hộp quà thay vì khen nến chung chung.",
          ending: "good",
        },
      },
    },
  ],

  // ───────────────────────── Chặng 22, bài 3 ─────────────────────────
  "viet-noi-dung-cung-ai-dung-giong": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Lắp câu lệnh bốn phần cho bài giới thiệu combo",
      task: "Bạn bán nến thơm và cần một bài đăng ngắn về hộp quà sinh nhật. Chọn một phương án cho từng phần rồi xem AI trả lời ra sao.",
      parts: [
        {
          id: "chandung",
          label: "Người đọc",
          options: [
            { text: "Viết cho tất cả mọi người yêu nến thơm và thích trang trí nhà trên mạng xã hội.", feedback: "Một nhóm quá rộng. AI viết cho người trung bình và bài nhạt." },
            { text: "Người đọc mua quà sinh nhật cho bạn, 25-35 tuổi, lo mùi nến quá nồng.", good: true, feedback: "Đúng ai, đúng hoàn cảnh, đúng nỗi lo, lấy từ chân dung đã viết ở bài trước." },
            { text: "Khách hàng nữ, thu nhập trung bình, thích trang trí nhà và hay mua đồ thư giãn online.", feedback: "Nhãn đúng nhưng thiếu hoàn cảnh và nỗi lo nên AI không biết nói gì với họ." },
          ],
        },
        {
          id: "giong",
          label: "Giọng văn",
          options: [
            { text: "Viết theo giọng thân thiện, gần gũi, chuyên nghiệp nhưng vẫn có chút hài hước nhẹ nhàng.", feedback: "Tả giọng bằng tính từ thì mỗi người hiểu một kiểu. AI ra giọng quảng cáo chung chung." },
            { text: "Viết hay và sáng tạo nhất có thể, như một chuyên gia marketing có mười năm kinh nghiệm.", feedback: "Càng cố sáng tạo, AI càng dùng khuôn mẫu quen thuộc, chính là thứ khách đã quen lướt qua." },
            { text: "Đây là hai bài cũ của tôi (dán). Viết đúng giọng và cách xưng hô như vậy.", good: true, feedback: "Cho xem bài mẫu hiệu quả hơn tả giọng, như cho bạn nghe ghi âm thay vì bảo 'nói giống tôi đi'." },
          ],
        },
        {
          id: "viec",
          label: "Việc cần viết",
          options: [
            { text: "Viết một bài về nến thơm.", feedback: "Quá mơ hồ: bài gì, dài bao nhiêu, kêu gọi gì. AI tự đoán và thường viết quá dài." },
            { text: "Bài đăng khoảng 80 từ giới thiệu hộp quà sinh nhật 3 nến, giá 199.000đ, kết bằng lời mời nhắn tin đặt.", good: true, feedback: "Có loại bài, độ dài, thông tin thật và lời kêu gọi. AI không cần tự điền con số nào." },
            { text: "Viết bài thật hấp dẫn để khách mua ngay hôm nay, kèm khuyến mãi lớn.", feedback: "Bạn chưa hề quyết định khuyến mãi nào, nên AI sẽ bịa một khuyến mãi." },
          ],
        },
        {
          id: "banthao",
          label: "Số bản nháp",
          options: [
            { text: "Chỉ viết một bản duy nhất, thật hay và hoàn chỉnh nhất có thể để tôi đăng luôn.", feedback: "Bạn không có gì để chọn. Một bản thì chỉ sửa được, không so được." },
            { text: "Viết ba bản nháp khác nhau để tôi chọn và sửa.", good: true, feedback: "Ba bản cho bạn chọn câu giống giọng mình nhất rồi ghép lại." },
            { text: "Viết mười lăm bản để đăng cả tuần.", feedback: "Quá nhiều để đọc kỹ, và bạn sẽ đăng bản chưa soát chỉ vì không kịp." },
          ],
        },
      ],
      responses: [
        {
          requires: ["chandung", "giong", "viec", "banthao"],
          text: "Bản 1: 'Sinh nhật bạn thân mà sợ mua nến nồng mùi? Hộp 3 nến này mình chọn mùi dịu, có hộp quà sẵn, 199.000đ. Nhắn mình là có.' Bản 2 và bản 3 cùng ý, đổi cách mở đầu. Giọng gần với hai bài mẫu và không có con số nào bạn chưa đưa.",
        },
        {
          requires: ["chandung", "giong"],
          text: "Bài viết đúng giọng và đúng người đọc, nhưng độ dài và lời kêu gọi do AI tự chọn, có thể kèm một ưu đãi bạn chưa quyết định. Cần chỉ rõ việc cần viết.",
        },
        {
          text: "'Khám phá bộ sưu tập nến thơm tuyệt vời, mang lại không gian thư giãn hoàn hảo cho ngôi nhà bạn!' Trơn tru, đọc được, và có thể là bài của bất kỳ tiệm nến nào.",
        },
      ],
    },
  ],

  // ───────────────────────── Chặng 22, bài 4 ─────────────────────────
  "do-hieu-qua-noi-dung-dung-cach": [
    {
      type: "exercise",
      language: "python",
      title: "Chọn bài hiệu quả nhất theo đơn hàng",
      task: "Ba bài đăng của một quán cà phê, mỗi bài ghi (tên, lượt thích, đơn hàng). Mã khởi đầu đang chọn bài có nhiều lượt thích nhất. Hãy sửa để chọn bài có nhiều đơn hàng nhất, rồi in tên bài và số đơn.",
      starter: `bai_dang = [
    ("Ảnh quán buổi sáng", 240, 3),
    ("Khuyến mãi combo", 90, 11),
    ("Câu chuyện chủ quán", 150, 6),
]

tot_nhat = bai_dang[0]
for bai in bai_dang:
    if bai[1] > tot_nhat[1]:
        tot_nhat = bai

print("Bài hiệu quả nhất:", tot_nhat[0])
print("Số đơn:", tot_nhat[2])
`,
      solution: `bai_dang = [
    ("Ảnh quán buổi sáng", 240, 3),
    ("Khuyến mãi combo", 90, 11),
    ("Câu chuyện chủ quán", 150, 6),
]

tot_nhat = bai_dang[0]
for bai in bai_dang:
    if bai[2] > tot_nhat[2]:
        tot_nhat = bai

print("Bài hiệu quả nhất:", tot_nhat[0])
print("Số đơn:", tot_nhat[2])
`,
      expectedOutput: "Bài hiệu quả nhất: Khuyến mãi combo\nSố đơn: 11",
      hints: [
        "Mỗi bài là bộ ba: vị trí 0 là tên, vị trí 1 là lượt thích, vị trí 2 là đơn hàng.",
        "Phép so sánh trong vòng lặp đang nhìn vào vị trí nào?",
      ],
    },
  ],

  // ───────────────────────── Chặng 22, bài 5 ─────────────────────────
  "ranh-gioi-khi-quang-cao-bang-ai": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát nháp quảng cáo trà thảo mộc",
      task: "Bạn nhờ AI viết quảng cáo trà thảo mộc Hạ Long, hộp 20 gói, giá 120.000đ. AI là người bán hàng nhiệt tình quá mức. Bấm những câu bạn không được đăng.",
      segments: [
        { text: "Trà thảo mộc Hạ Long, hộp 20 gói, giá 120.000đ." },
        { text: "Uống đều một tuần là khỏi hẳn mất ngủ.", error: "Lời hứa về sức khoẻ và kết quả chắc chắn. Đây là loại câu dễ khiến khách tố quảng cáo sai." },
        { text: "Ca sĩ nổi tiếng Y cũng uống loại trà này mỗi tối.", error: "Mượn danh người nổi tiếng khi họ chưa hề đồng ý. Bạn chịu trách nhiệm cho câu này." },
        { text: "Sản phẩm là trà thảo mộc, không phải thuốc." },
        { text: "Chị Mai ở Đà Nẵng: 'Ngủ ngon từ tuần đầu, tôi giới thiệu cho cả nhà!'", error: "Lời chứng thực do AI viết, không có khách tên Mai nào cả. Đánh giá giả là việc nền tảng và khách đều coi là lừa." },
        { text: "Nhắn tin cho trang để đặt hàng." },
      ],
    },
  ],

  // ───────────────────────── Chặng 22, bài 6 ─────────────────────────
  "quy-trinh-noi-dung-hang-tuan-voi-ai": [
    {
      type: "scenario",
      title: "Một tuần hỏng nhịp",
      start: "s0",
      nodes: {
        s0: {
          text: "Tuần trước bạn ốm nên chỉ đăng 1 trong 5 bài đã định. Sáng thứ Hai, bạn nhìn lịch tuần mới. Bạn làm gì?",
          choices: [
            { label: "Bỏ quy trình, tuần nào rảnh thì đăng", next: "drop" },
            { label: "Đăng bù gấp đôi tuần này cho kịp", next: "double" },
            { label: "Quay lại nhịp cũ, mở số liệu tuần trước xem bài nào mang về đơn", next: "review" },
          ],
        },
        drop: {
          text: "Một tuần hỏng thành hai, rồi ba. Không còn số liệu tuần trước để xem, không có chủ đề được lên sẵn, và mỗi bài lại là một lần ngồi nghĩ từ đầu.",
          ending: "bad",
        },
        double: {
          text: "Mười bài trong một tuần, nhiều bài viết vội và chưa soát. Người theo dõi thấy ồn hơn thay vì thấy đều, và bạn mệt hơn tuần ốm.",
          ending: "bad",
        },
        review: {
          text: "Chỉ bài đầu tiên có đơn: 4 đơn. Ba bài kia không có đơn nào hoặc chưa đăng. Bạn chọn chủ đề tuần này thế nào?",
          choices: [
            { label: "Chọn ba đến năm chủ đề, một chủ đề cùng dạng bài có đơn, rồi nhờ AI viết nháp", next: "draft" },
            { label: "Nhờ AI viết mười bốn bài, đăng hai bài mỗi ngày", next: "flood" },
            { label: "Đổi đồng thời giọng, ảnh và tiêu đề cho mới", next: "change_all" },
          ],
        },
        flood: {
          text: "Mười bốn bài là mười bốn bài phải đọc, sửa, soát. Bạn không kịp làm kỹ nên đăng nhiều thứ chưa kiểm, và tuần sau vẫn không biết bài nào hiệu quả.",
          ending: "bad",
        },
        change_all: {
          text: "Nếu đơn tăng hay giảm, bạn không biết do giọng, ảnh hay tiêu đề. Đổi nhiều thứ cùng lúc thì không học được gì từ kết quả.",
          ending: "bad",
        },
        draft: {
          text: "AI đã viết nháp xong cho năm chủ đề. Trước khi hẹn giờ đăng cho cả tuần, bạn làm gì?",
          choices: [
            { label: "Hẹn giờ đăng luôn vì bản nháp đọc trơn tru", next: "unchecked" },
            { label: "Soát con số và lời hứa, thêm một chi tiết chỉ bạn biết rồi mới hẹn giờ", next: "good" },
          ],
        },
        unchecked: {
          text: "Một bài có con số 'giảm 30%' mà bạn chưa hề quyết định giảm. Bạn thấy khi khách nhắn hỏi mua theo giá đó.",
          ending: "bad",
        },
        good: {
          text: "Bạn đọc số liệu, chọn chủ đề, sửa và soát; AI lo phần viết nháp. Một tuần hỏng chỉ là một tuần: nhịp được kéo lại mà không phải đăng bù.",
          ending: "good",
        },
      },
    },
  ],

  // ───────────────────────── Chặng 23, bài 1 ─────────────────────────
  "vong-lap-cua-mot-ai-agent": [
    {
      type: "exercise",
      language: "python",
      title: "Đặt số bước tối đa cho agent bị kẹt",
      task: "Agent này bị kẹt: vòng nào nó cũng gọi tra_thoi_tiet và không bao giờ thấy kết quả ưng ý. Mã khởi đầu cho nó chạy 10 vòng. Hãy dùng biến so_buoc_toi_da để vòng lặp dừng sau đúng 3 vòng rồi báo lại người dùng.",
      starter: `so_buoc_toi_da = 3

for vong in range(1, 11):
    print("Vòng", vong, ": gọi tra_thoi_tiet, chưa thấy kết quả")

print("Dừng: hết số bước tối đa, báo lại người dùng")
`,
      solution: `so_buoc_toi_da = 3

for vong in range(1, so_buoc_toi_da + 1):
    print("Vòng", vong, ": gọi tra_thoi_tiet, chưa thấy kết quả")

print("Dừng: hết số bước tối đa, báo lại người dùng")
`,
      expectedOutput:
        "Vòng 1 : gọi tra_thoi_tiet, chưa thấy kết quả\nVòng 2 : gọi tra_thoi_tiet, chưa thấy kết quả\nVòng 3 : gọi tra_thoi_tiet, chưa thấy kết quả\nDừng: hết số bước tối đa, báo lại người dùng",
      hints: [
        "range(1, 11) chạy từ 1 đến 10. Thay số 11 bằng một biểu thức dùng so_buoc_toi_da.",
        "Muốn chạy đúng 3 vòng, điểm kết thúc của range phải là 4.",
      ],
    },
  ],

  // ───────────────────────── Chặng 23, bài 2 ─────────────────────────
  "mo-ta-cong-cu-cho-agent": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Viết bản mô tả cho công cụ gui_email",
      task: "Agent hỗ trợ khách hàng sắp được dùng công cụ gui_email. Agent chỉ đọc bản mô tả bạn viết. Chọn từng phần rồi xem agent xử lý yêu cầu 'báo chị Lan là đơn 1025 đã giao'.",
      parts: [
        {
          id: "ten",
          label: "Tên công cụ",
          options: [
            { text: "tool2 (tên ngắn cho gọn, mô tả thì để agent tự suy ra)", feedback: "Tên không nói gì. Khi có năm công cụ, agent phải đoán công cụ nào gửi email." },
            { text: "gui_email", good: true, feedback: "Động từ cộng đối tượng nói được công cụ làm gì ngay từ cái tên." },
            { text: "cong_cu_gui_thu_va_thong_bao_cho_khach_hang", feedback: "Quá dài và gộp nhiều việc. Tên nên ngắn và chỉ một việc." },
          ],
        },
        {
          id: "congdung",
          label: "Công dụng và khi nào dùng",
          options: [
            { text: "Công cụ gửi email rất mạnh, nhanh và tiện lợi cho mọi nhu cầu liên lạc của doanh nghiệp.", feedback: "Quảng cáo, không nói công cụ trả về gì hay lúc nào nên dùng." },
            { text: "Gửi một email tới một địa chỉ. Dùng khi cần báo tin cho khách. Không dùng để gửi hàng loạt.", good: true, feedback: "Có việc nó làm, lúc dùng và lúc không dùng, nên agent chọn đúng." },
            { text: "Dùng khi cần.", feedback: "Quá ngắn để quyết định gì." },
          ],
        },
        {
          id: "thamso",
          label: "Tham số",
          options: [
            { text: "Có đầy đủ các thông tin cần thiết để gửi, agent biết cần những gì và sẽ tự điền vào.", feedback: "Agent không biết gồm những gì nên sẽ đoán tên trường và gọi sai." },
            { text: "den (địa chỉ email, bắt buộc), tieu_de (chữ), noi_dung (chữ).", good: true, feedback: "Rõ tên, kiểu và bắt buộc hay không, nên lời gọi hợp lệ ngay lần đầu." },
            { text: "den, tieu_de, noi_dung, ngay_gui theo đủ mọi định dạng ngày.", feedback: "Thêm tham số không cần và không nói định dạng. Agent sẽ thử nhiều kiểu và dễ sai." },
          ],
        },
        {
          id: "canhbao",
          label: "Cảnh báo",
          options: [
            { text: "Không cần cảnh báo gì thêm, agent đã được huấn luyện để biết thận trọng khi gửi email.", feedback: "Agent chỉ biết những gì bạn viết. Email gửi đi rồi không rút lại được." },
            { text: "Việc không rút lại được: soạn nháp và chờ người dùng duyệt trước khi gọi.", good: true, feedback: "Nói rõ việc nào không thể quay lại, nên agent dừng đúng chỗ." },
            { text: "Hãy gửi nhanh nhất có thể ngay khi có yêu cầu để khách không phải chờ lâu.", feedback: "Khuyến khích tốc độ ở đúng chỗ cần cẩn thận." },
          ],
        },
      ],
      responses: [
        {
          requires: ["ten", "congdung", "thamso", "canhbao"],
          text: "Agent soạn nháp: gui_email(den='lan@example.com', tieu_de='Đơn 1025 đã giao', noi_dung='...'), hiện cho bạn duyệt, rồi mới gửi. Đúng công cụ, đủ tham số, dừng ở việc không rút lại được.",
        },
        {
          requires: ["thamso", "canhbao"],
          text: "Lời gọi đúng tham số và chờ duyệt, nhưng với nhiều công cụ agent có thể chọn nhầm vì tên và công dụng chưa rõ.",
        },
        {
          text: "Agent gọi sai công cụ hoặc thiếu tham số, và có thể gửi ngay một email chưa ai duyệt tới địa chỉ nó đoán.",
        },
      ],
    },
  ],

  // ───────────────────────── Chặng 23, bài 3 ─────────────────────────
  "dung-agent-dau-tien-tu-dau-den-cuoi": [
    {
      type: "exercise",
      language: "python",
      title: "Mang kết quả công cụ về cho mô hình",
      task: "Đây là vòng lặp của agent thời tiết. Mô hình giả lập chỉ trả lời được khi lịch sử đã có kết quả công cụ. Mã khởi đầu chạy công cụ nhưng không đưa kết quả vào lịch sử, nên mô hình cứ yêu cầu lại. Hãy thêm kết quả vào lich_su để agent có câu trả lời cuối.",
      starter: `def mo_hinh(lich_su):
    if len(lich_su) == 1:
        return {"cong_cu": "tra_thoi_tiet", "dau_vao": "Đà Lạt"}
    return {"tra_loi": "Mai Đà Lạt có mưa chiều, nhớ mang áo mưa."}


def tra_thoi_tiet(thanh_pho):
    return "mưa chiều"


lich_su = ["Mai Đà Lạt có mưa không?"]

for buoc in range(3):
    y_kien = mo_hinh(lich_su)
    if "tra_loi" in y_kien:
        print("Trả lời:", y_kien["tra_loi"])
        break
    ket_qua = tra_thoi_tiet(y_kien["dau_vao"])
    print("Công cụ trả về:", ket_qua)
`,
      solution: `def mo_hinh(lich_su):
    if len(lich_su) == 1:
        return {"cong_cu": "tra_thoi_tiet", "dau_vao": "Đà Lạt"}
    return {"tra_loi": "Mai Đà Lạt có mưa chiều, nhớ mang áo mưa."}


def tra_thoi_tiet(thanh_pho):
    return "mưa chiều"


lich_su = ["Mai Đà Lạt có mưa không?"]

for buoc in range(3):
    y_kien = mo_hinh(lich_su)
    if "tra_loi" in y_kien:
        print("Trả lời:", y_kien["tra_loi"])
        break
    ket_qua = tra_thoi_tiet(y_kien["dau_vao"])
    print("Công cụ trả về:", ket_qua)
    lich_su.append(ket_qua)
`,
      expectedOutput: "Công cụ trả về: mưa chiều\nTrả lời: Mai Đà Lạt có mưa chiều, nhớ mang áo mưa.",
      hints: [
        "Mô hình chỉ nhìn thấy lich_su. Chạy công cụ xong mà không thêm gì vào đó thì với mô hình chưa có gì xảy ra.",
        "Thêm một phần tử vào danh sách bằng lich_su.append(...).",
      ],
    },
  ],

  // ───────────────────────── Chặng 23, bài 4 ─────────────────────────
  "chot-an-toan-cho-agent": [
    {
      type: "exercise",
      language: "python",
      title: "Chốt duyệt nằm trong mã, không nằm trong lời dặn",
      task: "Agent yêu cầu bốn lần gọi công cụ. gui_email và hoan_tien là việc không rút lại được, chỉ chạy khi người dùng đã duyệt. Người dùng mới duyệt hoan_tien. Hãy sửa vòng lặp để việc chưa duyệt in 'Chờ duyệt' thay vì 'Chạy'.",
      starter: `KHONG_RUT_LAI = ["gui_email", "hoan_tien"]
da_duyet = ["hoan_tien"]
yeu_cau = ["tra_don_hang", "gui_email", "hoan_tien", "tra_don_hang"]

for ten in yeu_cau:
    print("Chạy:", ten)
`,
      solution: `KHONG_RUT_LAI = ["gui_email", "hoan_tien"]
da_duyet = ["hoan_tien"]
yeu_cau = ["tra_don_hang", "gui_email", "hoan_tien", "tra_don_hang"]

for ten in yeu_cau:
    if ten in KHONG_RUT_LAI and ten not in da_duyet:
        print("Chờ duyệt:", ten)
    else:
        print("Chạy:", ten)
`,
      expectedOutput: "Chạy: tra_don_hang\nChờ duyệt: gui_email\nChạy: hoan_tien\nChạy: tra_don_hang",
      hints: [
        "Công cụ cần chặn khi nó nằm trong KHONG_RUT_LAI và chưa nằm trong da_duyet.",
        "Dùng if ... and ... not in ... rồi else cho trường hợp còn lại.",
      ],
    },
  ],

  // ───────────────────────── Chặng 24, bài 1 ─────────────────────────
  "moi-cong-nghe-giai-mot-bai-toan-kinh-doanh": [
    {
      type: "scenario",
      title: "Mỗi sáng một giờ chép đơn",
      start: "s0",
      nodes: {
        s0: {
          text: "Mỗi sáng phòng kế toán mất một giờ chép đơn từ phần mềm CRM sang bảng tính. Sếp nói 'mình phải dùng AI đi'. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Mua một công cụ AI nổi tiếng rồi tìm việc cho nó", next: "tool_first" },
            { label: "Gọi tên bài toán trước rồi mới chọn công nghệ", next: "name_it" },
            { label: "Thêm một phần mềm mới để gom cả hai nơi về một", next: "more_tools" },
          ],
        },
        tool_first: {
          text: "Ba tháng sau không ai mở công cụ. Nó giỏi đọc hiểu và viết chữ, còn việc của phòng là chuyển dữ liệu giữa hai hệ thống, và bạn chưa hề gọi tên bài toán đó.",
          ending: "bad",
        },
        more_tools: {
          text: "Thêm một nơi chứa dữ liệu, thêm một tài khoản phải quản lý, thêm một chỗ có thể hỏng mà không ai để ý. Dữ liệu cũ vẫn phải chép sang, và giờ chép nằm ở ba nơi thay vì hai.",
          ending: "bad",
        },
        name_it: {
          text: "Việc đang tốn giờ là chép dữ liệu đã có cấu trúc từ hệ thống này sang hệ thống kia. Bạn chọn loại công nghệ nào?",
          choices: [
            { label: "API cộng tự động hoá: có đơn mới thì dữ liệu tự sang bảng tính", next: "api_auto" },
            { label: "AI đọc từng đơn rồi gõ lại vào bảng tính", next: "ai_retype" },
            { label: "Chuyển cả hai phần mềm lên một máy chủ đám mây khác", next: "cloud_move" },
          ],
        },
        ai_retype: {
          text: "AI giỏi việc chữ tự do. Dữ liệu ở đây đã có cấu trúc, nên bạn chỉ thêm một bước có thể điền sai số mà không báo, cho một việc luật rõ ràng làm được chính xác.",
          ending: "bad",
        },
        cloud_move: {
          text: "Đám mây trả lời câu 'phần mềm chạy ở đâu'. Nó không làm dữ liệu tự chảy từ phần mềm này sang phần mềm kia, nên mỗi sáng vẫn một giờ chép tay.",
          ending: "bad",
        },
        api_auto: {
          text: "Quy trình chạy được hai tuần. Làm gì để nó không hỏng mà không ai hay?",
          choices: [
            { label: "Để nó chạy, có hỏng thì sẽ có người báo", next: "silent_fail" },
            { label: "Giao một người phụ trách, đặt cảnh báo khi lỗi và đếm số giờ tiết kiệm được", next: "good" },
          ],
        },
        silent_fail: {
          text: "Nhà cung cấp đổi tên một trường, dữ liệu ngừng chảy. Phải ba tuần sau, khi số trong bảng tính không khớp, mới có người để ý.",
          ending: "bad",
        },
        good: {
          text: "Bài toán được gọi đúng tên, công nghệ khớp với bài toán, và có người chịu trách nhiệm cùng cảnh báo lỗi. Giờ tiết kiệm được đo thành con số, nên bạn biết việc này đáng làm.",
          ending: "good",
        },
      },
    },
  ],

  // ───────────────────────── Chặng 24, bài 2 ─────────────────────────
  "saas-va-dam-may-du-lieu-nam-o-dau": [
    {
      type: "scenario",
      title: "Anh Hà nghỉ việc cuối tuần",
      start: "s0",
      nodes: {
        s0: {
          text: "Anh Hà nghỉ việc vào thứ Sáu. Hợp đồng khách hàng nằm trong Drive của tài khoản công ty cấp cho anh, và anh là quản trị viên duy nhất của phần mềm CRM. Bạn xử lý thế nào?",
          choices: [
            { label: "Xoá tài khoản của anh ngay trong ngày cho an toàn", next: "delete_now" },
            { label: "Để nguyên tài khoản đó, mấy tháng nữa tính", next: "leave_open" },
            { label: "Chuyển quyền sở hữu tài liệu, thêm quản trị viên thứ hai rồi mới khoá tài khoản", next: "checklist" },
          ],
        },
        delete_now: {
          text: "Xoá tài khoản kéo theo tài liệu anh sở hữu. Hợp đồng khách biến mất, và CRM không còn quản trị viên nào để phân quyền cho người mới.",
          ending: "bad",
        },
        leave_open: {
          text: "Một tài khoản của người đã nghỉ vẫn đăng nhập được, vẫn thấy hợp đồng và danh sách khách. Phần lớn sự cố nằm ở phía công ty như thế này, không phải ở nhà cung cấp.",
          ending: "bad",
        },
        checklist: {
          text: "Mọi thứ còn nguyên. Khi rà tiếp, bạn thấy một thư mục chứa bảng lương đang chia sẻ bằng đường dẫn 'ai có link cũng xem được'. Bạn làm gì?",
          choices: [
            { label: "Để nguyên vì đường dẫn ít người biết", next: "link_open" },
            { label: "Xoá cả thư mục cho khỏi bị lộ", next: "link_delete" },
            { label: "Đổi sang chia sẻ cho từng người cụ thể cần xem", next: "good" },
          ],
        },
        link_open: {
          text: "Đường dẫn đã được chuyển tiếp qua vài người mà không ai nhớ. Bảng lương nằm ở nơi bất kỳ ai nhặt được link đều đọc được.",
          ending: "bad",
        },
        link_delete: {
          text: "Dữ liệu an toàn hơn nhưng phòng nhân sự mất bảng lương tháng này cùng lịch sử. Giải pháp là thu hẹp người xem, không phải xoá dữ liệu.",
          ending: "bad",
        },
        good: {
          text: "Tài liệu có chủ mới, CRM có hai quản trị viên, tài khoản cũ đã khoá, và bảng lương chỉ người cần mới mở được. Đúng nghĩa là danh sách việc khi nhân viên nghỉ: khoá, chuyển quyền, rồi mới xoá.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một hoá đơn rời khỏi văn phòng thế nào",
      steps: [
        { label: "Chị kế toán lưu hoá đơn", detail: "Chị làm trong trình duyệt. Máy chị chỉ hiện giao diện, hoá đơn không được lưu lại trong máy." },
        { label: "Trình duyệt gửi qua mạng", detail: "Dữ liệu rời văn phòng, kèm tài khoản của chị để nhà cung cấp biết ai đang lưu." },
        { label: "Phần mềm xử lý trên máy chủ", detail: "Máy chủ của nhà cung cấp, thường thuê trên đám mây như AWS, Google Cloud hay Microsoft Azure." },
        { label: "Hoá đơn nằm ở trung tâm dữ liệu", detail: "Có thể ở nước khác. Với dữ liệu nhạy cảm, hỏi nhà cung cấp lưu ở đâu." },
        { label: "Người khác mở hoá đơn", detail: "Ai xem được phụ thuộc phân quyền công ty đặt và tài khoản có xác thực hai lớp hay không." },
        { label: "Khi huỷ thuê bao", detail: "Dữ liệu lấy ra bằng cách nào: xuất tệp, qua API hay nhờ nhà cung cấp, và còn lấy được trong bao lâu sau khi huỷ." },
      ],
    },
  ],

  // ───────────────────────── Chặng 24, bài 3 ─────────────────────────
  "api-la-o-cam-giua-hai-phan-mem": [
    {
      type: "sim",
      tool: "api",
      mission: "firstGet",
      title: "Gửi yêu cầu GET đầu tiên",
      task: "Trong bảng điều khiển, gửi một yêu cầu GET để lấy danh sách sản phẩm, rồi nhìn phần phản hồi: mã trạng thái 2xx là thành công, và tên các trường trong JSON là thứ bạn sẽ chọn khi nối dữ liệu vào bảng tính.",
    },
    {
      type: "flow",
      title: "Từ đơn mới tới dòng trong bảng tính",
      steps: [
        { label: "Khách đặt đơn 1025", detail: "Chuyện xảy ra trong phần mềm bán hàng. Chưa phần mềm nào khác biết." },
        { label: "Webhook báo tin", detail: "Phần mềm bán hàng tự gửi một thông báo tới địa chỉ bạn đăng ký trước: 'có đơn mới'. Không ai phải hỏi liên tục." },
        { label: "Công cụ tự động hoá gọi API", detail: "n8n, Zapier hay Make hỏi lấy chi tiết đơn 1025, kèm khoá API để phần mềm kia biết ai đang hỏi." },
        { label: "Nhận phản hồi JSON", detail: "Dữ liệu về dạng ma_don, khach_hang, san_pham, tong_tien. Bạn chọn các trường cần dùng." },
        { label: "Ghi vào bảng tính", detail: "Mỗi trường được chọn đi vào đúng cột, ví dụ tong_tien 920000 vào cột Tổng tiền." },
        { label: "Có lỗi thì báo người phụ trách", detail: "Khoá API hết hạn hay đổi tên trường làm dữ liệu ngừng chảy mà không ai hay, nên mỗi quy trình cần một người chịu trách nhiệm và một cảnh báo." },
      ],
    },
  ],
};
