import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 15. Một người viết cho một tệp.
export const P15_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Chặng 24 ────────────────────────────────────────────────────────────
  "bang-tinh-la-co-so-du-lieu-dau-tien": [
    {
      type: "exercise",
      language: "python",
      title: "Cộng cột Số tiền khi có ô '2tr'",
      task: "Cột So_tien có bốn ô viết bốn kiểu: '1500000', '2tr', '800000', '1.200.000'. Mã đang chỉ cộng ô toàn chữ số nên lặng lẽ bỏ qua hai ô. Sửa để mọi ô đều được đổi về số thuần và cộng đủ, không ô nào bị bỏ qua.",
      starter: `so_tien = ["1500000", "2tr", "800000", "1.200.000"]
tong = 0
bo_qua = 0
for o in so_tien:
    if o.isdigit():
        tong += int(o)
    else:
        bo_qua += 1
print("Tổng:", tong)
print("Số ô bị bỏ qua:", bo_qua)
`,
      solution: `so_tien = ["1500000", "2tr", "800000", "1.200.000"]
tong = 0
bo_qua = 0
for o in so_tien:
    if o.endswith("tr"):
        tong += int(o[:-2]) * 1000000
    else:
        tong += int(o.replace(".", ""))
print("Tổng:", tong)
print("Số ô bị bỏ qua:", bo_qua)
`,
      expectedOutput: "Tổng: 5500000\nSố ô bị bỏ qua: 0",
      hints: [
        "'2tr' nghĩa là 2 triệu: bỏ hai chữ cuối rồi nhân với 1000000.",
        "'1.200.000' chứa dấu chấm ngăn nghìn; thay dấu chấm bằng chuỗi rỗng rồi mới đổi sang số.",
      ],
    },
    {
      type: "flow",
      title: "Một hoá đơn đi từ ô nhập tới báo cáo",
      steps: [
        { label: "Nhập một dòng mới", detail: "Cột Trang_thai chỉ cho chọn Da_tra, Chua_tra hoặc Tam_tinh nhờ kiểm tra dữ liệu. Gõ 'trả rồi nhé' bị chặn ngay ở ô, không lọt vào bảng." },
        { label: "Bảng gọn nhận dòng", detail: "Table tự kéo công thức xuống dòng HD0104. So_tien là số thuần, Ngay là ngày thật, nên lọc và sắp xếp đều đúng." },
        { label: "Quy trình tự động đọc cột", detail: "Nó cộng So_tien của mọi dòng Chua_tra. Chỉ có HD0102 nên ra 2.000.000. Tất cả ô đều là số, cho nên không cần ai canh." },
        { label: "Báo cáo gộp theo mã khách", detail: "KH0042 có hai dòng và được cộng chung nhờ mã, dù ở một dòng tên khách bị gõ 'Minh An' thay vì 'Cty TNHH Minh An'." },
        { label: "Nếu có người gõ '2tr'", detail: "Quy trình bỏ qua ô đó và tổng thiếu 2 triệu mà không báo lỗi. Vì vậy phải chặn từ cửa nhập, đừng chờ tới bước báo cáo mới phát hiện." },
      ],
    },
  ],

  "mua-cau-hinh-hay-tu-dung-cong-cu": [
    {
      type: "scenario",
      title: "Sau buổi demo 30 phút",
      start: "demo",
      nodes: {
        demo: {
          text: "Phòng 12 người vừa xem demo một phần mềm quản lý đơn hàng thuê bao. Ai cũng khen giao diện. Bên bán nói giá ưu đãi chỉ còn hiệu lực đến cuối tuần nếu ký hợp đồng năm. Bạn đề xuất gì?",
          choices: [
            { label: "Ký hợp đồng năm ngay để kịp giá ưu đãi", next: "ky_ngay" },
            { label: "Xin dùng thử bằng dữ liệu mẫu đã ẩn thông tin", next: "thu_mau" },
            { label: "Dùng thử với ba tháng đơn hàng thật của khách", next: "thu_that" },
          ],
        },
        ky_ngay: {
          text: "Sáu tháng sau, phòng cần xuất toàn bộ dữ liệu để chuyển hệ thống thì phát hiện tệp xuất thiếu hẳn lịch sử trạng thái của từng đơn. Hợp đồng năm vẫn còn sáu tháng phí.",
          ending: "bad",
        },
        thu_that: {
          text: "Khách hàng của công ty vừa nằm trên máy chủ của một bên chưa có hợp đồng nào. Phòng pháp chế yêu cầu xoá dữ liệu và báo cáo lại, buổi dùng thử bị dừng giữa chừng và phải bắt đầu lại từ đầu.",
          ending: "bad",
        },
        thu_mau: {
          text: "Bạn thử thêm đơn, thử phân quyền, rồi thử xuất. Tệp xuất ra thiếu cột lịch sử trạng thái; bên bán nói cột đó chỉ có ở gói cao hơn. Trong lúc đó, chị Hà đã dựng sẵn một bảng Google Sheets theo dõi đơn, nhưng 12 người sửa cùng lúc thỉnh thoảng đè lên nhau. Bạn kết luận thế nào?",
          choices: [
            { label: "Hỏi giá gói có lịch sử khi tăng người, chốt người chủ rồi mới ký", next: "tot" },
            { label: "Ký gói thường, phần lịch sử tính sau cũng được", next: "ky_thuong" },
            { label: "Bỏ phần mềm, giữ bảng của chị Hà mà chưa cần ai phụ trách", next: "bo_phan_mem" },
          ],
        },
        tot: {
          text: "Bạn có báo giá cho cả hai gói, biết tổng chi phí khi lên 20 người, và có tên một người chủ cùng một người thứ hai hiểu hệ thống. Phòng chọn được gói phù hợp với dữ liệu cần mang theo, và hợp đồng ghi rõ quyền xuất dữ liệu.",
          ending: "good",
        },
        ky_thuong: {
          text: "Sau này mới biết dữ liệu lịch sử không thể bổ sung ngược. Những đơn đã xử lý từ lúc ký mãi mãi thiếu lịch sử trạng thái, và nâng gói không lấy lại được chúng.",
          ending: "bad",
        },
        bo_phan_mem: {
          text: "Chi phí thấp, nhưng khi chị Hà nghỉ phép, không ai biết công thức nào đang nối với sheet nào. Một người xoá nhầm một cột, bảng đơn sai cả buổi sáng và không ai chịu trách nhiệm sửa.",
          ending: "bad",
        },
      },
    },
    {
      type: "chart",
      title: "Thuê bao hay tự dựng: chi phí tích luỹ theo tháng",
      caption: "Số minh hoạ để thấy hình dạng, không phải bảng giá thật: thuê bao tăng theo số người, còn tự dựng tốn một khoản đầu rồi tốn giờ bảo trì mỗi tháng. Kéo thanh trượt để thấy điểm giao nhau dịch chuyển.",
      kind: "line",
      xLabel: "Tháng sử dụng",
      yLabel: "Tổng chi phí tích luỹ (triệu đồng)",
      x: { from: 0, to: 24, step: 3 },
      params: [
        { id: "nguoi", label: "Số người dùng", min: 5, max: 50, step: 1, value: 12, unit: "người" },
        { id: "gia", label: "Phí thuê bao mỗi người mỗi tháng", min: 0.05, max: 0.5, step: 0.05, value: 0.2, unit: "triệu" },
        { id: "dung", label: "Chi phí dựng ban đầu", min: 0, max: 40, step: 2, value: 14, unit: "triệu" },
        { id: "bt", label: "Chi phí bảo trì mỗi tháng", min: 0, max: 5, step: 0.5, value: 1.5, unit: "triệu" },
      ],
      series: [
        { label: "Thuê phần mềm", expr: "nguoi*gia*x" },
        { label: "Tự dựng", expr: "dung+bt*x" },
      ],
    },
  ],

  "du-an-ban-do-cong-cu-va-luong-du-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Khoanh các mũi tên chép tay và cộng giờ",
      task: "Bảng 2 có bốn mũi tên. Theo bước 4, mũi tên chép tay là mũi tên mà cột Cách chuyển có chữ 'tay', 'nhập' hoặc 'chép'. Mã đang chỉ tìm chữ 'tay' nên bỏ sót hai mũi tên. Sửa để in đúng ba mũi tên và tổng giờ.",
      starter: `mui_ten = [
    ("Email xác nhận", "Sheets theo dõi", "Chị Hà gõ tay", 5),
    ("Sheets theo dõi", "Phần mềm kế toán", "Xuất CSV, kế toán nhập", 2),
    ("CRM", "Sheets theo dõi", "Chép lại", 1),
    ("Cổng thanh toán", "Phần mềm kế toán", "Tích hợp sẵn (API)", 0),
]

tu_khoa = ["tay"]
tong = 0
for tu, den, cach, gio in mui_ten:
    if any(k in cach.lower() for k in tu_khoa):
        print(f"{tu} -> {den}: {gio} giờ/tuần")
        tong += gio
print("Tổng giờ chép tay mỗi tuần:", tong)
`,
      solution: `mui_ten = [
    ("Email xác nhận", "Sheets theo dõi", "Chị Hà gõ tay", 5),
    ("Sheets theo dõi", "Phần mềm kế toán", "Xuất CSV, kế toán nhập", 2),
    ("CRM", "Sheets theo dõi", "Chép lại", 1),
    ("Cổng thanh toán", "Phần mềm kế toán", "Tích hợp sẵn (API)", 0),
]

tu_khoa = ["tay", "nhập", "chép"]
tong = 0
for tu, den, cach, gio in mui_ten:
    if any(k in cach.lower() for k in tu_khoa):
        print(f"{tu} -> {den}: {gio} giờ/tuần")
        tong += gio
print("Tổng giờ chép tay mỗi tuần:", tong)
`,
      expectedOutput: "Email xác nhận -> Sheets theo dõi: 5 giờ/tuần\nSheets theo dõi -> Phần mềm kế toán: 2 giờ/tuần\nCRM -> Sheets theo dõi: 1 giờ/tuần\nTổng giờ chép tay mỗi tuần: 8",
      hints: [
        "Thêm hai từ khoá nữa vào danh sách tu_khoa: 'nhập' và 'chép'.",
        "Mũi tên của cổng thanh toán là tích hợp sẵn, không được khoanh.",
      ],
    },
    {
      type: "flow",
      title: "Một đơn hàng đi qua bản đồ",
      steps: [
        { label: "Email xác nhận của khách", detail: "Điểm vào của đơn. Lúc này dữ liệu mới chỉ nằm trong hộp thư, chưa có nơi nào khác biết đơn tồn tại." },
        { label: "Chép sang Sheets theo dõi", detail: "Chị Hà gõ tay mỗi ngày, khoảng 5 giờ một tuần (số trong ví dụ của bài). Mũi tên này có chữ 'tay' nên bị khoanh đỏ." },
        { label: "Lấy tên khách từ CRM", detail: "Chép tay khoảng 1 giờ mỗi tuần. Chỗ này dễ sinh hai cách viết cho cùng một khách, rồi thành dòng trùng ở bảng sau." },
        { label: "Xuất CSV cho kế toán", detail: "Mỗi tuần 2 giờ: xuất tệp rồi kế toán nhập lại. Có chữ 'nhập' nên cũng bị khoanh, dù người làm nghĩ đây là việc bình thường." },
        { label: "Cổng thanh toán nối kế toán", detail: "Tích hợp sẵn qua API, 0 giờ, nên không khoanh. Ba mũi tên khoanh cộng lại 8 giờ mỗi tuần: đây là danh sách việc cho chặng tự động hoá." },
      ],
    },
  ],

  // ── Chặng 25 ────────────────────────────────────────────────────────────
  "viet-yeu-cau-cho-ai-prompt": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Lắp prompt: từ chối khéo một báo giá",
      task: "Bạn là nhân viên mua hàng. Nhà cung cấp gửi báo giá 120 triệu nhưng ngân sách đã duyệt chỉ 90 triệu. Chọn một phương án cho từng phần để lắp prompt nhờ AI viết email từ chối khéo.",
      parts: [
        {
          id: "role",
          label: "Vai trò",
          options: [
            { text: "Bạn là nhân viên mua hàng, viết cho nhà cung cấp quen thuộc", good: true, feedback: "Vai trò khớp người gửi thật, nên giọng thư vừa lịch sự vừa có quan hệ làm ăn." },
            { text: "Bạn là chuyên gia viết email giỏi nhất thế giới, luôn hoàn hảo", feedback: "Lời khen không cho AI biết ai viết cho ai. Giọng thư vẫn phải đoán." },
            { text: "Bạn là luật sư chuyên soạn thư từ chối mang tính pháp lý", feedback: "Thư sẽ nặng nề và khô cứng, trong khi bạn muốn giữ quan hệ với nhà cung cấp." },
          ],
        },
        {
          id: "context",
          label: "Bối cảnh",
          options: [
            { text: "Báo giá 120 triệu, ngân sách duyệt 90 triệu; muốn giữ quan hệ, có thể mời báo giá lại quý sau", good: true, feedback: "Có con số, lý do và mục tiêu quan hệ: AI không cần đoán vì sao từ chối." },
            { text: "Công ty không hài lòng với báo giá này và muốn từ chối thật rõ ràng, quyết đoán", feedback: "Chỉ có cảm xúc. Thiếu con số và lý do nên thư sẽ chung chung, thậm chí gay gắt hơn mức bạn muốn." },
            { text: "Viết email từ chối nhà cung cấp", feedback: "Quá ngắn: AI không biết từ chối vì giá, vì chất lượng hay vì lý do khác." },
          ],
        },
        {
          id: "format",
          label: "Định dạng",
          options: [
            { text: "Dưới 120 chữ, có tiêu đề, nêu lý do ngân sách trong một câu", good: true, feedback: "Định dạng nói bằng con số nên bản nháp đầu đã gần dùng được." },
            { text: "Viết sao cho hay và chuyên nghiệp, độ dài tuỳ bạn quyết định, thêm chi tiết cho đầy đủ", feedback: "Hay và chuyên nghiệp không đo được. AI sẽ tự chọn độ dài và thường viết dài hơn cần thiết." },
            { text: "Một bảng hai cột liệt kê ưu nhược điểm của báo giá, kèm điểm từng mục", feedback: "Sai thể loại: đây là email gửi người ngoài, không phải bảng chấm điểm nội bộ." },
          ],
        },
        {
          id: "limit",
          label: "Giới hạn",
          options: [
            { text: "Không hứa sẽ mua quý sau và không nhắc tới giá của nhà cung cấp khác", good: true, feedback: "Hai điều không được nói đã chặn trước hai rủi ro: lời hứa chưa duyệt và lộ báo giá bên khác." },
            { text: "Không giới hạn gì thêm để AI tự do sáng tạo cho thư thêm sinh động", feedback: "Không giới hạn nghĩa là AI có thể hứa mua quý sau, một lời hứa công ty chưa quyết." },
            { text: "Nêu rõ tên và giá của hai nhà cung cấp đối thủ để họ hiểu vì sao bị loại", feedback: "Báo giá của bên khác là thông tin mật. Đưa vào thư là lộ cho một bên thứ ba." },
          ],
        },
      ],
      responses: [
        {
          requires: ["role", "context", "format", "limit"],
          text: "Tiêu đề: Phản hồi về báo giá tháng này\n\nKính gửi anh Nam, cảm ơn anh đã gửi báo giá. Rất tiếc báo giá hiện vượt ngân sách đã được duyệt cho hạng mục này, nên chúng tôi chưa thể tiến hành lần này. Chúng tôi trân trọng sự hợp tác lâu nay và hy vọng có dịp trao đổi lại khi có kế hoạch mới.\n\nTrân trọng. (Hơn 100 chữ, đủ ý, không hứa gì ngoài lời cảm ơn.)",
        },
        {
          requires: ["context", "limit"],
          text: "Kính gửi anh, báo giá 120 triệu vượt ngân sách 90 triệu đã duyệt nên chúng tôi chưa thể tiến hành. (Đúng ý nhưng giọng khô và không có tiêu đề: thiếu vai trò và định dạng nên chưa dùng ngay được.)",
        },
        {
          text: "Kính gửi quý công ty, chúng tôi xin từ chối báo giá. Mong sớm có cơ hội hợp tác trong tương lai. Trân trọng cảm ơn quý công ty rất nhiều. (Chung chung: không lý do, không giữ cửa quan hệ, có thể hứa hợp tác mà chưa ai duyệt.)",
        },
      ],
    },
    {
      type: "feynman",
      title: "Prompt giống một lời giao việc cho người mới",
      intro: "Ngày đầu có nhân viên mới, bạn nhắn 'làm giúp chị cái thư' thì họ sẽ hỏi lại cả chục câu. Nếu họ ngại hỏi, họ sẽ đoán. AI thì luôn đoán thay vì hỏi, nên bạn phải nói trước những điều người mới hay hỏi.",
      columns: ["Phần của prompt", "Giao việc cho người mới", "Giao việc cho AI"],
      rows: [
        ["Vai trò", "Hôm nay em ngồi quầy thay chị", "Bạn là trưởng nhóm chăm sóc khách hàng"],
        ["Bối cảnh", "Khách này đã phàn nàn hai lần rồi", "Chị Hoa, đơn DH-2291, giao trễ 4 ngày"],
        ["Nhiệm vụ", "Soạn giúp chị thư xin lỗi", "Viết email xin lỗi chị Hoa"],
        ["Định dạng", "Ngắn thôi, không quá nửa trang", "Dưới 150 chữ, có tiêu đề"],
        ["Ví dụ mẫu", "Chị đưa lá thư tháng trước làm mẫu", "Dán một email cũ, dặn chỉ bắt chước giọng"],
        ["Giới hạn", "Đừng hứa hoàn tiền nhé", "Không hứa hoàn tiền, không bịa lý do"],
      ],
      oneLiner: "Nếu bạn không thể giao việc này cho người mới mà không bị hỏi lại, thì AI cũng sẽ phải đoán.",
    },
  ],

  "tom-tat-tai-lieu-va-bien-ban-hop": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản tóm tắt này lệch biên bản ở đâu",
      task: "Biên bản gốc chỉ có bốn ý: (1) Chốt đổi nhà vận chuyển từ tháng 11. (2) Chị Mai gửi bảng so sánh giá cho cả nhóm, chưa nói hạn. (3) Anh Dũng đề nghị thuê thêm 2 nhân viên kho, chưa ai đồng ý, để họp sau. (4) Anh Tú kiểm lại tồn kho khu B trước thứ Sáu. Bấm các dòng trong bản tóm tắt của AI mà bạn thấy không có căn cứ rồi nộp.",
      segments: [
        { text: "Quyết định đã chốt: đổi nhà vận chuyển từ tháng 11." },
        { text: "Việc cần làm: chị Mai gửi bảng so sánh giá cho cả nhóm trước ngày 10/10.", error: "Biên bản không nêu hạn cho việc của chị Mai. Ô hạn phải ghi CHƯA RÕ, không được tự điền một ngày nghe hợp lý." },
        { text: "Quyết định đã chốt: thuê thêm 2 nhân viên kho.", error: "Đây chỉ là đề nghị của anh Dũng, chưa ai đồng ý và để họp sau. Phải nằm ở mục CÒN MỞ, không phải quyết định." },
        { text: "Việc cần làm: anh Tú kiểm lại tồn kho khu B trước thứ Sáu." },
        { text: "Nhà vận chuyển mới rẻ hơn nhà cũ khoảng 12%.", error: "Biên bản không có con số 12%. Đây là số AI tự thêm vào cho bản tóm tắt thuyết phục hơn." },
      ],
    },
    {
      type: "flow",
      title: "Tóm một hợp đồng 40 trang mà không mất ý",
      steps: [
        { label: "Chia theo chương", detail: "Cắt hợp đồng thành từng chương trọn vẹn thay vì dán cả 40 trang. Phần giữa của tài liệu quá dài là chỗ AI dễ đọc lướt nhất." },
        { label: "Đưa khung trước, đưa chương sau", detail: "Mỗi chương dùng cùng một khung: nghĩa vụ, hạn, mức phạt, câu gốc. Chỗ chương không nói tới thì ghi CHƯA RÕ." },
        { label: "Gộp các bản tóm", detail: "Dán các bản tóm từng chương vào một lượt riêng và nhờ gộp theo cùng khung, vẫn giữ cột câu gốc. Đừng nhờ AI viết lại thành đoạn văn trôi chảy." },
        { label: "Kiểm ba dòng bất kỳ", detail: "Lấy ba dòng ngẫu nhiên, Ctrl+F câu gốc trong hợp đồng. Dòng nào không tìm thấy câu gốc là dòng nghi AI tự thêm." },
        { label: "Người chủ trì duyệt cuối", detail: "Người sẽ ký hoặc chịu trách nhiệm đọc bản cuối trước khi gửi. Với tài liệu nhạy cảm, chỉ dùng công cụ công ty đã duyệt." },
      ],
    },
  ],

  "du-an-tro-ly-nghien-cuu-bang-ai": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Lắp prompt cho trợ lý nghiên cứu giá đối thủ",
      task: "Sếp hỏi giá gói cơ bản của ba đối thủ (A, B, C) tại Việt Nam trong năm nay. Chọn từng phần để lắp prompt dùng với chế độ tìm kiếm web.",
      parts: [
        {
          id: "question",
          label: "Câu hỏi nghiên cứu",
          options: [
            { text: "Giá niêm yết gói cơ bản của A, B, C tại Việt Nam, công bố trong năm nay", good: true, feedback: "Hẹp theo ai, cái gì và thời điểm nào, nên kết quả kiểm được từng dòng." },
            { text: "Tìm hiểu giúp tôi mọi thứ về ba đối thủ này, đặc biệt là chuyện giá cả của họ", feedback: "Quá rộng: AI sẽ trả về cả lịch sử công ty và tin tức, còn giá thì lẫn trong đó." },
            { text: "Giá các đối thủ", feedback: "Thiếu gói nào, nước nào, năm nào. AI có thể trả giá của năm ngoái hoặc của thị trường khác." },
          ],
        },
        {
          id: "sources",
          label: "Nguồn được dùng",
          options: [
            { text: "Ưu tiên trang chính thức của từng công ty, rồi tới báo chí", good: true, feedback: "Có thứ tự ưu tiên nên đường dẫn trả về dễ kiểm hơn." },
            { text: "Lấy từ bất kỳ nơi nào có con số, kể cả diễn đàn, miễn là nhiều người nhắc tới", feedback: "Nhiều người nhắc tới không có nghĩa là đúng; một lời đồn lặp lại vẫn là lời đồn." },
            { text: "Dùng kiến thức bạn đã học, không cần tìm trên web", feedback: "Kiến thức đã học có thể cũ và không có đường dẫn nào để bạn mở kiểm." },
          ],
        },
        {
          id: "table",
          label: "Định dạng trả về",
          options: [
            { text: "Bảng: khẳng định, nguồn kèm đường dẫn, trích nguyên văn, ngày của nguồn", good: true, feedback: "Cột trích nguyên văn cho phép bạn Ctrl+F đúng câu đó trong trang." },
            { text: "Một đoạn văn tóm tắt mượt mà, tự nhiên, đề cập qua các nguồn đã dùng", feedback: "Đoạn văn trộn lẫn các khẳng định nên bạn không kiểm từng ý được." },
            { text: "Bảng có hai cột: tên đối thủ và mức giá, gọn cho dễ đọc", feedback: "Gọn nhưng không có nguồn và trích dẫn, nên mọi con số đều phải tin theo." },
          ],
        },
        {
          id: "gap",
          label: "Khi không có nguồn",
          options: [
            { text: "Ghi 'KHÔNG TÌM THẤY NGUỒN', không ước đoán và không suy ra từ quy mô công ty", good: true, feedback: "Cho AI quyền nói 'không biết' là cách duy nhất làm ô trống thay cho số bịa." },
            { text: "Nếu thiếu thì ước tính dựa trên giá của đối thủ gần nhất cho bảng đầy đủ", feedback: "Bảng đầy đủ nghe đẹp nhưng ô ước tính trông giống hệt ô có nguồn." },
            { text: "Bỏ dòng đó đi, đừng nhắc tới", feedback: "Bạn không biết thiếu dòng nào nên không biết phải hỏi thêm ở đâu." },
          ],
        },
      ],
      responses: [
        {
          requires: ["question", "sources", "table", "gap"],
          text: "| Khẳng định | Nguồn | Trích nguyên văn | Ngày |\n| Gói cơ bản của A có mức giá niêm yết riêng | trang giá của A (đường dẫn) | một câu chép từ trang | năm nay |\n| Giá gói cơ bản của C | KHÔNG TÌM THẤY NGUỒN | - | - |\n\nĐiều không chắc chắn: trang của B chỉ ghi 'liên hệ báo giá'. (Mô phỏng: bạn vẫn phải mở từng nguồn.)",
        },
        {
          requires: ["question", "gap"],
          text: "Đã tìm giá gói cơ bản của A, B, C. Với C chưa thấy nguồn nên ghi KHÔNG TÌM THẤY NGUỒN. (Đúng hướng nhưng không có bảng, không có trích nguyên văn nên bạn chưa kiểm được từng dòng.)",
        },
        {
          text: "Các đối thủ trong ngành thường có gói cơ bản dao động từ vài trăm nghìn tới vài triệu mỗi tháng, tuỳ tính năng. (Mô phỏng một câu trả lời của prompt kém: nghe thật nhưng không có nguồn nào.)",
        },
      ],
    },
    {
      type: "feynman",
      title: "Có nguồn chưa chắc đã đúng nguồn",
      intro: "Bạn nghe bạn kể 'báo đó có đăng đấy'. Có thể báo có đăng thật, có thể bạn nhớ nhầm tờ báo, có thể báo đăng nhưng nói chuyện khác. Chỉ khi bạn mở tờ báo và tìm đúng câu đó mới dám nói lại với sếp.",
      columns: ["Trạng thái trong bảng", "Chuyện đời thường", "Việc bạn làm"],
      rows: [
        ["Đã kiểm", "Mở tờ báo và thấy đúng câu bạn nghe kể", "Đưa dòng này vào báo cáo"],
        ["Nguồn lỗi", "Bạn kể báo nào đó có đăng nhưng tìm không ra tờ báo", "Không dùng; hỏi lại AI hoặc tự tìm nguồn khác"],
        ["Không khớp", "Báo có thật nhưng không có câu bạn nghe kể", "Không dùng; ghi lại để lần sau cảnh giác với nguồn này"],
        ["KHÔNG TÌM THẤY NGUỒN", "Bạn nói 'tôi chưa nghe ai nói thế'", "Giữ ô trống và ghi rõ trong báo cáo là chưa xác nhận"],
      ],
      oneLiner: "Báo cáo chỉ dựa trên dòng Đã kiểm, còn mọi dòng khác phải được gọi đúng tên là chưa xác nhận.",
    },
  ],

  "kiem-chung-dau-ra-ai-bia": [
    {
      type: "scenario",
      title: "Thư trả lời khách có ba căn cứ pháp lý",
      start: "dau",
      nodes: {
        dau: {
          text: "Bạn là chuyên viên pháp chế. AI vừa soạn thư trả lời khách về điều khoản bảo hành, kèm ba căn cứ pháp lý có số điều, tên văn bản và năm ban hành. Thư đọc rất chuyên nghiệp, và khách cần thư trong chiều nay. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Hỏi lại AI: ba căn cứ này có thật không?", next: "hoi_lai" },
            { label: "Mở từng văn bản trên cổng thông tin chính thức", next: "mo_van_ban" },
            { label: "Gửi luôn vì hai căn cứ đầu bạn đã quen thuộc", next: "gui_luon" },
          ],
        },
        gui_luon: {
          text: "Căn cứ thứ ba không tồn tại. Khách chuyển thư cho bộ phận pháp lý của họ và nhận lại một câu hỏi: văn bản này ở đâu? Người ký thư là bạn, và cả thư mất độ tin cậy dù hai căn cứ kia đúng.",
          ending: "bad",
        },
        hoi_lai: {
          text: "AI trả lời chắc chắn rằng cả ba căn cứ đều có thật và còn hiệu lực, thậm chí tóm tắt nội dung từng điều. Giọng văn trôi chảy y như lúc nó soạn thư. Bạn làm gì tiếp?",
          choices: [
            { label: "Tin câu trả lời đó và gửi thư đi", next: "tin_ai" },
            { label: "Chuyển sang mở từng văn bản trên cổng chính thức", next: "mo_van_ban" },
          ],
        },
        tin_ai: {
          text: "Một hệ thống bịa được căn cứ cũng xác nhận được căn cứ đó. Thư đi với một căn cứ không tồn tại, giống vụ luật sư trích bản án do ChatGPT bịa rồi hỏi lại chính nó. Hỏi lại AI không phải là kiểm chứng.",
          ending: "bad",
        },
        mo_van_ban: {
          text: "Hai căn cứ khớp. Căn cứ thứ ba: số hiệu bạn không tìm thấy trên cổng; một điều khoản gần giống thì lại nói chuyện khác. Chiều đã muộn. Bạn xử lý thế nào?",
          choices: [
            { label: "Nhờ AI cho biết số hiệu đúng rồi dùng luôn", next: "hoi_so" },
            { label: "Bỏ căn cứ thứ ba, giữ hai căn cứ đã kiểm và báo sếp", next: "tot" },
            { label: "Sửa số hiệu cho gần nhất với văn bản tìm được", next: "sua_so" },
          ],
        },
        hoi_so: {
          text: "AI đưa ra một số hiệu mới, nghe hợp lý và cũng không tồn tại. Bạn quay lại đúng chỗ cũ, nhưng lần này mất thêm một tiếng và vẫn chưa gửi được thư.",
          ending: "bad",
        },
        sua_so: {
          text: "Số hiệu giờ trỏ tới một văn bản có thật, nhưng văn bản đó không nói điều thư viện dẫn. Bạn vừa biến một căn cứ bịa thành một trích dẫn sai, khó phát hiện hơn lúc đầu.",
          ending: "bad",
        },
        tot: {
          text: "Thư đi với hai căn cứ đã đọc tận văn bản gốc, kèm một dòng cho sếp biết căn cứ thứ ba bị bỏ vì không xác nhận được. Thư ngắn hơn một chút, nhưng mọi dòng trong đó bạn đều bảo vệ được.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Từ một khẳng định tới nguồn nằm ngoài AI",
      steps: [
        { label: "Gạch chân những gì kiểm được", detail: "Mọi số liệu, tên văn bản, trích dẫn và đường dẫn trong bản nháp. Câu 'đây là điểm rất quan trọng' không kiểm được thì bỏ qua." },
        { label: "Xếp vào đúng kiểu", detail: "Số liệu thì tính lại bằng Excel. Văn bản pháp lý thì tra cổng chính thức. Trích dẫn thì mở bài gốc. Nội bộ thì so với sổ sách." },
        { label: "Đi tới nguồn nằm ngoài AI", detail: "Mở trang, văn bản hoặc tệp nội bộ do chính bạn tìm. Hỏi lại AI hay bắt nó tự đánh dấu [CHẮC] đều không thay được bước này." },
        { label: "Tìm đúng câu hoặc đúng số", detail: "Ctrl+F câu trích hoặc con số. Đường dẫn mở được mới chỉ chứng minh trang có thật, chưa chứng minh trang nói điều AI viết." },
        { label: "Giữ, sửa hoặc xoá", detail: "Khớp thì giữ. Lệch thì sửa theo nguồn. Không tìm thấy thì xoá hoặc ghi [CHƯA CÓ NGUỒN] và không gửi đi như sự thật." },
      ],
    },
  ],

  "thu-vien-prompt-cho-ca-phong": [
    {
      type: "exercise",
      language: "python",
      title: "Điền biến vào mẫu prompt",
      task: "Mẫu prompt có các biến {ten_khach}, {ma_don}, {so_ngay_tre}. Hai chỗ đang sai: vòng lặp tìm 'ten_khach' thay vì '{ten_khach}' nên không điền được gì, và điều kiện về ngày giao mới bị đảo (để trống thì phải dặn không hứa). Sửa để in đúng hai dòng.",
      starter: `mau = "Bối cảnh: Khách {ten_khach}, đơn {ma_don}, trễ {so_ngay_tre} ngày."
bien = {"ten_khach": "chị Hoa", "ma_don": "DH-2291", "so_ngay_tre": 4}
ngay_giao_moi = ""

for ten, gia_tri in bien.items():
    mau = mau.replace(ten, str(gia_tri))
print(mau)

if ngay_giao_moi != "":
    print("Giới hạn: không hứa ngày giao mới.")
else:
    print(f"Giới hạn: chỉ hứa ngày giao mới là {ngay_giao_moi}.")
`,
      solution: `mau = "Bối cảnh: Khách {ten_khach}, đơn {ma_don}, trễ {so_ngay_tre} ngày."
bien = {"ten_khach": "chị Hoa", "ma_don": "DH-2291", "so_ngay_tre": 4}
ngay_giao_moi = ""

for ten, gia_tri in bien.items():
    mau = mau.replace("{" + ten + "}", str(gia_tri))
print(mau)

if ngay_giao_moi == "":
    print("Giới hạn: không hứa ngày giao mới.")
else:
    print(f"Giới hạn: chỉ hứa ngày giao mới là {ngay_giao_moi}.")
`,
      expectedOutput: "Bối cảnh: Khách chị Hoa, đơn DH-2291, trễ 4 ngày.\nGiới hạn: không hứa ngày giao mới.",
      hints: [
        "Trong mẫu, biến nằm trong ngoặc nhọn: phải thay chuỗi '{ten_khach}' chứ không phải 'ten_khach'. Ghép bằng '{' + ten + '}'.",
        "Ngày giao mới để trống nghĩa là chưa có ngày: khi đó in dòng dặn không hứa.",
      ],
    },
    {
      type: "feynman",
      title: "Mẫu prompt giống mẫu đơn xin nghỉ phép",
      intro: "Phòng nhân sự không để mỗi người tự chế một tờ đơn xin nghỉ. Có một mẫu chung: phần chữ cố định, vài chỗ trống để điền, và một người giữ mẫu. Thư viện prompt làm đúng như thế cho việc nhờ AI.",
      columns: ["Thành phần", "Mẫu đơn xin nghỉ phép", "Mẫu prompt trong thư viện"],
      rows: [
        ["Phần cố định", "Kính gửi, cam kết bàn giao việc", "Vai trò, định dạng, giới hạn"],
        ["Chỗ trống", "Họ tên, ngày nghỉ, lý do", "{ten_khach}, {ma_don}, {ly_do}"],
        ["Người giữ mẫu", "Phòng nhân sự", "Người phụ trách ghi trên mẫu"],
        ["Khi cần sửa", "Nhân sự đổi mẫu và ghi ngày ban hành", "Người phụ trách sửa, tăng phiên bản, ghi thay đổi"],
        ["Cách làm sai", "Mỗi người tự chế một mẫu riêng", "Mỗi người giữ prompt tốt trong lịch sử chat của mình"],
      ],
      oneLiner: "Prompt tốt chỉ có ích cho cả phòng khi nó nằm ở một chỗ chung, có biến để điền và có người chịu trách nhiệm.",
    },
  ],

  // ── Chặng 26 ────────────────────────────────────────────────────────────
  "lam-sach-bang-truoc-khi-hoi-ai": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm khách nợ nhiều nhất sau khi bỏ dòng cộng nhóm",
      task: "Bảng công nợ có một dòng 'Cộng nhóm' xen giữa, đúng cái bẫy khiến AI của chị Lan trả lời nhầm. Mã đang tính trên cả dòng đó nên khách nợ nhiều nhất bị sai và tổng bị gấp lên. Bỏ dòng tổng rồi in lại hai kết quả.",
      starter: `bang = [
    ("KH01", "1500000"),
    ("KH02", "2000000"),
    ("Cộng nhóm", "3500000"),
    ("KH03", "800000"),
]

tong = 0
lon_nhat = ("", 0)
for ten, so in bang:
    so = int(so)
    tong += so
    if so > lon_nhat[1]:
        lon_nhat = (ten, so)

print("Khách nợ nhiều nhất:", lon_nhat[0], lon_nhat[1])
print("Tổng công nợ:", tong)
`,
      solution: `bang = [
    ("KH01", "1500000"),
    ("KH02", "2000000"),
    ("Cộng nhóm", "3500000"),
    ("KH03", "800000"),
]

tong = 0
lon_nhat = ("", 0)
for ten, so in bang:
    if ten.startswith("Cộng"):
        continue
    so = int(so)
    tong += so
    if so > lon_nhat[1]:
        lon_nhat = (ten, so)

print("Khách nợ nhiều nhất:", lon_nhat[0], lon_nhat[1])
print("Tổng công nợ:", tong)
`,
      expectedOutput: "Khách nợ nhiều nhất: KH02 2000000\nTổng công nợ: 4300000",
      hints: [
        "Dòng cần bỏ có tên bắt đầu bằng 'Cộng'. Dùng ten.startswith('Cộng') rồi continue ở đầu vòng lặp.",
      ],
    },
  ],

  "hoi-dung-cau-voi-bang-tong-hop": [
    {
      type: "exercise",
      language: "python",
      title: "Biên lãi gộp theo khu vực: đừng lấy trung bình tỷ lệ",
      task: "Mỗi dòng gồm khu vực, doanh thu, lãi gộp (triệu đồng). Mã đang lấy trung bình của các tỷ lệ từng dòng, đúng cái bẫy trong bài. Sửa để cộng doanh thu, cộng lãi gộp theo từng khu vực rồi mới chia.",
      starter: `dong = [
    ("Bắc", 100, 40),
    ("Bắc", 300, 90),
    ("Nam", 100, 50),
    ("Nam", 300, 90),
]

ty_le = {}
for kv, dt, lg in dong:
    ty_le.setdefault(kv, []).append(lg / dt * 100)

for kv, ds in ty_le.items():
    print(f"{kv}: {sum(ds) / len(ds):.1f}%")
`,
      solution: `dong = [
    ("Bắc", 100, 40),
    ("Bắc", 300, 90),
    ("Nam", 100, 50),
    ("Nam", 300, 90),
]

tong_dt = {}
tong_lg = {}
for kv, dt, lg in dong:
    tong_dt[kv] = tong_dt.get(kv, 0) + dt
    tong_lg[kv] = tong_lg.get(kv, 0) + lg

for kv in tong_dt:
    print(f"{kv}: {tong_lg[kv] / tong_dt[kv] * 100:.1f}%")
`,
      expectedOutput: "Bắc: 32.5%\nNam: 35.0%",
      hints: [
        "Tạo hai từ điển: một cộng doanh thu theo khu vực, một cộng lãi gộp theo khu vực.",
        "Chỉ chia ở cuối: tổng lãi gộp ÷ tổng doanh thu × 100.",
      ],
    },
    {
      type: "flow",
      title: "Từ 'chi phí sao cao thế?' tới bảng tổng hợp",
      steps: [
        { label: "Câu hỏi của sếp", detail: "'Chi phí tháng này sao cao thế?' chưa có số đo, chưa có chiều, chưa có mốc so sánh. AI hay người đều phải đoán." },
        { label: "Tách số đo và mốc so sánh", detail: "Số đo: tổng chi phí. Chiều: tháng. Bảng đầu tiên chỉ có hai dòng, tháng trước và tháng này, để biết cao hơn bao nhiêu." },
        { label: "Thêm một chiều", detail: "Đặt loại chi phí ở Hàng, tháng ở Cột. Giờ nhìn ra loại chi phí nào tăng nhiều nhất so với tháng trước." },
        { label: "Thêm bộ lọc nếu cần", detail: "Nếu một loại chi phí tăng bất thường, lọc riêng một phòng để xem có phải phòng đó gây ra không. Bộ lọc chỉ khoanh vùng, không chia nhỏ." },
        { label: "Kiểm bằng lọc tay", detail: "Lọc tay đúng một ô trong bảng tổng hợp và cộng lại. Bảng chỉ cho biết dòng nào tăng; lý do phải hỏi người phụ trách dòng đó." },
      ],
    },
  ],

  "nho-ai-viet-cong-thuc-va-sql-roi-tu-kiem": [
    {
      type: "sim",
      tool: "sql",
      mission: "group-count",
      title: "Một câu SQL gộp nhóm, rồi tự kiểm",
      task: "Đây là cùng kiểu câu hỏi như SUMIFS theo khu vực, nhưng viết bằng SQL: nhóm theo một cột rồi tính theo từng nhóm. Nhiệm vụ: đếm số đơn của từng trạng thái, mỗi trạng thái một dòng. Làm xong, cộng các số đếm lại và so với tổng số dòng của bảng orders; hai số phải bằng nhau.",
    },
    {
      type: "flow",
      title: "Kiểm một công thức AI viết",
      steps: [
        { label: "Mô tả bảng, không dán cả tệp", detail: "Nêu sheet, vùng A1:E5000, kiểu từng cột và ba dòng mẫu bịa cùng hình dạng. AI cần hình dạng bảng, không cần dữ liệu thật." },
        { label: "AI trả công thức", detail: "=SUMIFS(E:E, B:B, \"Miền Bắc\", A:A, \">=\"&DATE(2026,7,1), A:A, \"<\"&DATE(2026,8,1)). Trông đúng, nhưng chưa ai kiểm." },
        { label: "Đọc từng điều kiện", detail: "Cộng cột E khi cột B là Miền Bắc, cột A từ đầu 1/7 và trước đầu 1/8. Bạn nói lại được mỗi điều kiện bằng lời thường chưa?" },
        { label: "Kiểm biên", detail: "Ngày cuối tháng là chỗ hay sai. Nếu AI viết <= DATE(2026,7,31), đơn 31/7 lúc 15:20 trị giá 1.000.000 bị bỏ sót mà không có lỗi nào hiện ra." },
        { label: "Đối chiếu bằng lọc tay", detail: "Với ba dòng mẫu, đáp án đúng là 1.500.000 + 1.000.000 = 2.500.000. Ra 1.500.000 nghĩa là công thức đã sót đơn ngày 31/7." },
      ],
    },
  ],

  "phan-tich-bien-dong-doanh-thu-chi-phi-voi-ai": [
    {
      type: "chart",
      title: "Phần lượng và phần giá trong chênh lệch doanh thu",
      caption: "Số minh hoạ theo ví dụ sản phẩm A trong bài: kế hoạch 1.000 đơn × 200.000 đ. Trục ngang là giá thực tế (nghìn đồng); kéo thanh trượt số đơn thực tế để xem hai phần cộng lại bằng tổng chênh lệch (triệu đồng).",
      kind: "line",
      xLabel: "Giá thực tế (nghìn đồng mỗi đơn)",
      yLabel: "Chênh lệch so với kế hoạch (triệu đồng)",
      x: { from: 180, to: 220, step: 5 },
      params: [{ id: "sl", label: "Số đơn thực tế", min: 800, max: 1300, step: 50, value: 1100, unit: "đơn" }],
      series: [
        { label: "Phần lượng", expr: "(sl-1000)*0.2" },
        { label: "Phần giá", expr: "(x-200)*sl/1000" },
        { label: "Tổng chênh lệch", expr: "(sl-1000)*0.2+(x-200)*sl/1000" },
      ],
    },
  ],

  "tu-bang-toi-bieu-do-ke-chuyen": [
    {
      type: "scenario",
      title: "Biểu đồ cho cuộc họp sáng mai",
      start: "chon_loai",
      nodes: {
        chon_loai: {
          text: "Bạn có bảng chi phí vận chuyển 12 tháng, và chi phí tăng từ tháng 6 sau khi đổi đơn vị giao hàng. Cuộc họp là sáng mai, người xem chỉ nhìn biểu đồ vài giây. Bạn chọn loại biểu đồ nào?",
          choices: [
            { label: "Biểu đồ tròn 12 lát, mỗi tháng một lát", next: "tron" },
            { label: "Biểu đồ đường 12 tháng, tô nổi đoạn từ tháng 6", next: "duong" },
            { label: "Biểu đồ cột 3D có đổ bóng cho sinh động", next: "ba_d" },
          ],
        },
        tron: {
          text: "Mắt người không so sánh nổi 12 lát gần bằng nhau. Cả phòng nhìn một vòng tròn nhiều màu, không ai thấy chi phí đã đổi chiều từ tháng 6, và buổi họp mất mười phút hỏi 'cái gì đáng chú ý ở đây'.",
          ending: "bad",
        },
        ba_d: {
          text: "Hiệu ứng 3D làm cột phía sau trông thấp hơn thực tế. Có người đọc nhầm tháng 7 thấp hơn tháng 6 và đặt câu hỏi sai hướng; bạn phải giải thích biểu đồ thay vì giải thích chi phí.",
          ending: "bad",
        },
        duong: {
          text: "Đường theo tháng cho thấy xu hướng rõ. Giờ tới tiêu đề: AI đề xuất 'Chi phí vận chuyển tăng 18% từ tháng 6, sau khi đổi đơn vị giao hàng'. Bạn chưa tính lại con số này. Bạn làm gì?",
          choices: [
            { label: "Dùng luôn vì tiêu đề viết gọn và có kết luận", next: "dung_luon" },
            { label: "Tính lại từ bảng rồi sửa số trong tiêu đề cho khớp", next: "tot" },
            { label: "Đổi thành 'Chi phí vận chuyển theo tháng' cho khỏi sai", next: "ten_du_lieu" },
          ],
        },
        dung_luon: {
          text: "Từ bảng, mức tăng thật là 14%. Sếp đối chiếu ngay và cuộc họp chuyển sang tranh luận con số 18% thay vì chuyện đổi đơn vị giao hàng. Tiêu đề là câu người ta nhớ nhất, và nó sai.",
          ending: "bad",
        },
        ten_du_lieu: {
          text: "Không còn gì sai, nhưng cũng không còn thông điệp. Người xem phải tự tìm xem điều gì đáng chú ý, và cả phòng bỏ vài phút hỏi 'vậy từ tháng 6 có chuyện gì'.",
          ending: "bad",
        },
        tot: {
          text: "Bạn tính lại: chi phí tăng 14% chứ không phải 18%. Tiêu đề mới 'Chi phí vận chuyển tăng 14% từ tháng 6, sau khi đổi đơn vị giao hàng', cùng đường tô nổi từ tháng 6. Người xem biết nhìn vào đâu và có thể phản bác bằng dữ liệu.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Trục không bắt đầu từ 0 làm chênh lệch to hơn thật",
      caption: "Số minh hoạ: hai cột có giá trị 100 và 104, chênh nhau 4%. Trục ngang là điểm mà trục dọc bắt đầu; đường trên cho thấy cột B trông cao gấp bao nhiêu lần cột A, đường dưới là tỷ lệ thật.",
      kind: "line",
      xLabel: "Trục dọc bắt đầu từ",
      yLabel: "Cột B trông cao gấp (lần) cột A",
      x: { from: 0, to: 90, step: 10 },
      series: [
        { label: "Cái mắt nhìn thấy", expr: "(104-x)/(100-x)" },
        { label: "Tỷ lệ thật", expr: "104/100" },
      ],
    },
  ],

  "du-an-phan-tich-du-lieu-kinh-doanh-bang-ai": [
    {
      type: "exercise",
      language: "python",
      title: "Làm sạch bảng 6 tháng và đối chiếu dòng Tong",
      task: "Đoạn mã đọc bảng doanh thu có ba lỗi cố ý: một tháng bị trùng, một số viết '1.010', và dòng Tong xen vào. Hiện nó đếm cả dòng trùng lẫn dòng Tong. Sửa để chỉ còn 6 dòng tháng, tổng doanh thu khớp với dòng Tong gốc.",
      starter: `dong = [
    "2026-01,820", "2026-02,760", "2026-03,905", "2026-03,905",
    "2026-04,880", "2026-05,940", "2026-06,1.010", "Tong,5315",
]
tong_goc = 5315

da_thay = set()
tong = 0
so_dong = 0
for d in dong:
    thang, dt = d.split(",")
    tong += int(dt.replace(".", ""))
    so_dong += 1

print("Số dòng:", so_dong)
print("Tổng doanh thu:", tong)
print("Khớp dòng Tong:", "Có" if tong == tong_goc else "Không")
`,
      solution: `dong = [
    "2026-01,820", "2026-02,760", "2026-03,905", "2026-03,905",
    "2026-04,880", "2026-05,940", "2026-06,1.010", "Tong,5315",
]
tong_goc = 5315

da_thay = set()
tong = 0
so_dong = 0
for d in dong:
    thang, dt = d.split(",")
    if thang == "Tong" or thang in da_thay:
        continue
    da_thay.add(thang)
    tong += int(dt.replace(".", ""))
    so_dong += 1

print("Số dòng:", so_dong)
print("Tổng doanh thu:", tong)
print("Khớp dòng Tong:", "Có" if tong == tong_goc else "Không")
`,
      expectedOutput: "Số dòng: 6\nTổng doanh thu: 5315\nKhớp dòng Tong: Có",
      hints: [
        "Bỏ qua dòng khi tháng là 'Tong' hoặc đã nằm trong da_thay (một tháng chỉ có một dòng).",
        "Nhớ thêm tháng vào da_thay sau khi đã nhận dòng.",
      ],
    },
    {
      type: "chart",
      title: "Lợi nhuận hoạt động và chi phí bán hàng theo tháng",
      caption: "Dữ liệu mẫu của bài (triệu đồng), sau khi đã làm sạch. Lợi nhuận hoạt động = doanh thu - giá vốn - chi phí bán hàng - chi phí quản lý. Tháng 4 là điểm đáng hỏi: chi phí bán hàng cao nhất kỳ.",
      kind: "bar",
      xLabel: "Tháng",
      yLabel: "Triệu đồng",
      data: [
        { label: "T1", values: [123, 95] },
        { label: "T2", values: [98, 90] },
        { label: "T3", values: [139, 102] },
        { label: "T4", values: [101, 118] },
        { label: "T5", values: [148, 105] },
        { label: "T6", values: [156, 110] },
      ],
      seriesLabels: ["Lợi nhuận hoạt động", "Chi phí bán hàng"],
    },
  ],

  // ── Chặng 27 ────────────────────────────────────────────────────────────
  "giai-phau-mot-workflow-tu-dong": [
    {
      type: "exercise",
      language: "python",
      title: "Viết workflow: kích hoạt, điều kiện, hành động",
      task: "Mỗi đơn mới là một lần kích hoạt. Hành động luôn có: ghi đơn vào bảng. Chỉ khi đơn trên 5 triệu mới thêm hành động báo trưởng phòng. Mã đang báo trưởng phòng cho mọi đơn vì điều kiện luôn đúng. Sửa điều kiện cho đúng, chú ý đơn đúng 5 triệu không phải là 'trên 5 triệu'.",
      starter: `don_hang = [("DH01", 3200000), ("DH02", 7500000), ("DH03", 5000000), ("DH04", 12000000)]

for ma, tien in don_hang:
    print(f"Ghi bảng tính: {ma}")
    if tien >= 0:
        print(f"Báo trưởng phòng: {ma}")
`,
      solution: `don_hang = [("DH01", 3200000), ("DH02", 7500000), ("DH03", 5000000), ("DH04", 12000000)]

for ma, tien in don_hang:
    print(f"Ghi bảng tính: {ma}")
    if tien > 5000000:
        print(f"Báo trưởng phòng: {ma}")
`,
      expectedOutput: "Ghi bảng tính: DH01\nGhi bảng tính: DH02\nBáo trưởng phòng: DH02\nGhi bảng tính: DH03\nGhi bảng tính: DH04\nBáo trưởng phòng: DH04",
      hints: [
        "Điều kiện cần là tien lớn hơn 5000000, viết bằng dấu > chứ không phải >=.",
      ],
    },
  ],

  "chon-viec-dang-tu-dong-hoa": [
    {
      type: "exercise",
      language: "python",
      title: "Chấm điểm việc đáng tự động bằng thời gian hoàn vốn",
      task: "Mã tính giờ tiết kiệm mỗi tháng và thời gian hoàn vốn cho ba việc. Nó đang quên trừ phút bảo trì nên việc nào cũng trông có lời hơn thật. Sửa theo công thức của bài: giờ tiết kiệm = (số lần × phút mỗi lần - phút bảo trì) ÷ 60; hoàn vốn = giờ dựng ÷ giờ tiết kiệm.",
      starter: `viec = [
    # tên, lần/tháng, phút/lần, phút bảo trì/tháng, giờ dựng
    ("Đối chiếu đơn hàng", 20, 15, 30, 5),
    ("Báo cáo tháng", 1, 30, 10, 8),
    ("Sao lưu tệp tuần", 4, 10, 5, 2),
]

tot_nhat = None
for ten, lan, phut, bao_tri, dung in viec:
    gio = lan * phut / 60
    hoan_von = dung / gio
    print(f"{ten}: tiết kiệm {gio:.1f} giờ/tháng, hoàn vốn {hoan_von:.1f} tháng")
    if tot_nhat is None or hoan_von < tot_nhat[1]:
        tot_nhat = (ten, hoan_von)

print("Nên làm trước:", tot_nhat[0])
`,
      solution: `viec = [
    # tên, lần/tháng, phút/lần, phút bảo trì/tháng, giờ dựng
    ("Đối chiếu đơn hàng", 20, 15, 30, 5),
    ("Báo cáo tháng", 1, 30, 10, 8),
    ("Sao lưu tệp tuần", 4, 10, 5, 2),
]

tot_nhat = None
for ten, lan, phut, bao_tri, dung in viec:
    gio = (lan * phut - bao_tri) / 60
    hoan_von = dung / gio
    print(f"{ten}: tiết kiệm {gio:.1f} giờ/tháng, hoàn vốn {hoan_von:.1f} tháng")
    if tot_nhat is None or hoan_von < tot_nhat[1]:
        tot_nhat = (ten, hoan_von)

print("Nên làm trước:", tot_nhat[0])
`,
      expectedOutput: "Đối chiếu đơn hàng: tiết kiệm 4.5 giờ/tháng, hoàn vốn 1.1 tháng\nBáo cáo tháng: tiết kiệm 0.3 giờ/tháng, hoàn vốn 24.0 tháng\nSao lưu tệp tuần: tiết kiệm 0.6 giờ/tháng, hoàn vốn 3.4 tháng\nNên làm trước: Đối chiếu đơn hàng",
      hints: [
        "Trừ bao_tri ngay trong ngoặc: (lan * phut - bao_tri) / 60.",
      ],
    },
    {
      type: "chart",
      title: "Giờ tiết kiệm ròng sau khi tự động hoá một việc",
      caption: "Số minh hoạ để thấy hình dạng, không phải số đo thật của việc nào. Đường bắt đầu ở mức âm (số giờ bỏ ra để dựng) rồi tăng dần theo giờ tiết kiệm mỗi tháng; điểm cắt trục 0 là lúc hoàn vốn. Kéo thanh trượt để thấy vì sao việc làm hiếm khó hoàn vốn.",
      kind: "line",
      xLabel: "Tháng sau khi dựng xong",
      yLabel: "Giờ tiết kiệm ròng",
      x: { from: 0, to: 24, step: 2 },
      params: [
        { id: "lan", label: "Số lần làm mỗi tháng", min: 1, max: 40, step: 1, value: 20, unit: "lần" },
        { id: "phut", label: "Phút mỗi lần", min: 5, max: 60, step: 5, value: 15, unit: "phút" },
        { id: "bt", label: "Phút bảo trì mỗi tháng", min: 0, max: 120, step: 5, value: 30, unit: "phút" },
        { id: "dung", label: "Giờ dựng", min: 1, max: 30, step: 1, value: 5, unit: "giờ" },
      ],
      series: [{ label: "Giờ tiết kiệm ròng", expr: "x*(lan*phut-bt)/60-dung" }],
    },
  ],
};
