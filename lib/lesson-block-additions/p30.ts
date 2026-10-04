import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 30. Một người viết cho một tệp.
export const P30_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "case-bon-mo-hinh-trien-khai": [
    {
      type: "exercise",
      language: "python",
      title: "Loại theo ràng buộc cứng, rồi mới so chi phí",
      task:
        "Bốn mô hình triển khai, mỗi mô hình có: dữ liệu có nằm trong nước không, độ trễ (ms), có cần người trực đêm không, phí hằng tháng và số giờ vận hành mỗi tháng. Ràng buộc cứng của đội: dữ liệu trong nước, độ trễ không quá 50 ms, và đội KHÔNG có người trực đêm. Chỉ giữ các mô hình qua cả ba ràng buộc, rồi chọn mô hình có tổng chi phí thấp nhất, với tổng chi phí = phí tháng + 0,5 × giờ vận hành. (Số liệu minh hoạ.)",
      starter:
        'models = {\n    "tại chỗ": {"trong_nuoc": True, "tre": 20, "truc": True, "phi": 15, "gio": 60},\n    "đám mây": {"trong_nuoc": True, "tre": 45, "truc": False, "phi": 30, "gio": 10},\n    "lai": {"trong_nuoc": True, "tre": 40, "truc": False, "phi": 20, "gio": 40},\n    "biên": {"trong_nuoc": True, "tre": 10, "truc": True, "phi": 25, "gio": 80},\n}\n\ncon_lai = [t for t, m in models.items() if m["trong_nuoc"] and m["tre"] <= 50]\nre_nhat = min(con_lai, key=lambda t: models[t]["phi"])\n\nprint("Còn lại:", ", ".join(con_lai))\nprint(f"Rẻ nhất theo tổng chi phí: {re_nhat} ({models[re_nhat][\'phi\']})")\n',
      solution:
        'models = {\n    "tại chỗ": {"trong_nuoc": True, "tre": 20, "truc": True, "phi": 15, "gio": 60},\n    "đám mây": {"trong_nuoc": True, "tre": 45, "truc": False, "phi": 30, "gio": 10},\n    "lai": {"trong_nuoc": True, "tre": 40, "truc": False, "phi": 20, "gio": 40},\n    "biên": {"trong_nuoc": True, "tre": 10, "truc": True, "phi": 25, "gio": 80},\n}\n\ncon_lai = [t for t, m in models.items() if m["trong_nuoc"] and m["tre"] <= 50 and not m["truc"]]\ntong = lambda t: models[t]["phi"] + 0.5 * models[t]["gio"]\nre_nhat = min(con_lai, key=tong)\n\nprint("Còn lại:", ", ".join(con_lai))\nprint(f"Rẻ nhất theo tổng chi phí: {re_nhat} ({tong(re_nhat)})")\n',
      expectedOutput: "Còn lại: đám mây, lai\nRẻ nhất theo tổng chi phí: đám mây (35.0)",
      hints: [
        "Ràng buộc thứ ba là đội không có người trực đêm, tức là loại mô hình có truc là True.",
        "Tổng chi phí không chỉ là phí tháng: cộng thêm 0,5 lần số giờ vận hành. Mô hình có phí thấp nhất chưa chắc có tổng thấp nhất.",
      ],
    },
    {
      type: "flow",
      title: "Từ một câu hỏi nơi triển khai tới quyết định có ghi lại",
      steps: [
        {
          label: "Liệt kê ràng buộc cứng",
          detail:
            "Viết ra những điều vi phạm là phương án không tồn tại: dữ liệu phải ở trong nước, phản hồi dưới một ngưỡng, không có người trực đêm. Chưa nhắc tới giá ở bước này, vì giá không phải ràng buộc.",
        },
        {
          label: "Gạch phương án vi phạm",
          detail:
            "Đặt từng mô hình trong bốn mô hình cạnh từng ràng buộc. Mô hình tự dựng tại chỗ mà đội không có người trực đêm bị gạch, dù bảng giá của nó trông đẹp nhất.",
        },
        {
          label: "Còn hai phương án, so tổng chi phí",
          detail:
            "Chỉ lúc này mới cộng phí hằng tháng với công vận hành. Hai phương án còn lại thường đổi thứ hạng so với bảng giá, vì công vận hành là khoản bảng giá không hiện ra.",
        },
        {
          label: "Chọn và ghi ràng buộc kèm quyết định",
          detail:
            "Ghi rõ vì sao các mô hình kia bị loại và dựa trên ràng buộc nào. Một năm sau nếu quy định dữ liệu đổi, người sau mở ghi chú này ra là biết quyết định nào cần xét lại.",
        },
      ],
    },
  ],

  "case-cong-nghe-moi-co-that-khong": [
    {
      type: "scenario",
      title: "Đồng nghiệp nói cơ sở dữ liệu mới nhanh gấp mười lần",
      start: "start",
      nodes: {
        start: {
          text: "Đồng nghiệp giới thiệu một cơ sở dữ liệu mới và nói: nhanh hơn mười lần, nên chuyển hệ thống chính sang nó ngay. Bạn trả lời gì?",
          choices: [
            { label: "Chuyển luôn, nhanh gấp mười lần là đủ rõ rồi", next: "hype" },
            { label: "Hỏi nó giải bài toán nào mà cách hiện tại chưa giải được", next: "problem" },
            { label: "Chờ vài năm xem thị trường chọn gì rồi mới tính", next: "wait" },
          ],
        },
        hype: {
          text: "Hệ thống chính chuyển sang trước khi ai biết con số mười lần được đo trong điều kiện nào. Hoá ra nó nhanh với phép đọc theo một khoá, còn các truy vấn nối nhiều bảng của bạn lại chậm hơn bản cũ. Quay lui tốn hai tuần.",
          ending: "bad",
        },
        wait: {
          text: "Thận trọng không sai, nhưng chờ cũng là một quyết định có giá. Đội vẫn mất vài giờ mỗi tuần vì đúng bài toán mà công nghệ này nhắm tới, và suốt thời gian chờ không ai kiểm chứng xem nó có giải được hay không.",
          ending: "bad",
        },
        problem: {
          text: "Đồng nghiệp chỉ ra điểm nghẽn: truy vấn tìm theo vùng địa lý đang mất tám giây. Giờ tới câu hỏi thứ hai về cơ chế. Bạn hỏi gì tiếp?",
          choices: [
            { label: "Nó nhanh nhờ cơ chế gì và đánh đổi điều gì", next: "mechanism" },
            { label: "Bao nhiêu công ty đang dùng và được bao nhiêu sao", next: "stars" },
          ],
        },
        stars: {
          text: "Số người dùng cho biết nó đang được chú ý, không cho biết nó chạy ra sao. Hai tháng sau nhóm phát hiện nó đánh đổi tính nhất quán của dữ liệu, đúng thứ mà module thanh toán của bạn không được phép mất.",
          ending: "bad",
        },
        mechanism: {
          text: "Đồng nghiệp giải thích: nó dựng một chỉ mục riêng cho dữ liệu địa lý, đánh đổi bằng việc ghi chậm hơn và tốn thêm bộ nhớ. Bạn đã biết nó mạnh ở đâu và gãy ở đâu. Bước tiếp theo là gì?",
          choices: [
            { label: "Dựng bản mẫu nhỏ chỉ cho truy vấn địa lý đang chậm", next: "ok" },
            { label: "Thiết kế lại cả kiến trúc quanh nó vì cơ chế hợp lý", next: "rewrite" },
          ],
        },
        rewrite: {
          text: "Cơ chế đúng, nhưng chỉ giúp một truy vấn. Thiết kế lại toàn bộ kiến trúc vì một cải tiến cục bộ làm cả đội mất một quý, trong khi lợi ích chỉ nằm ở một màn hình tìm kiếm.",
          ending: "bad",
        },
        ok: {
          text: "Bản mẫu chạy trên đúng truy vấn nghi ngờ nhất, và sau hai ngày bạn có số đo thật: tám giây còn sáu trăm mili giây, ghi chậm hơn ba mươi phần trăm ở bảng đó. Quyết định giờ dựa trên số đo, không dựa trên lời hứa.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Cơ chế khác lời hứa thế nào",
      intro:
        "Hãy nghĩ tới hai người cùng nói về một loại thực đơn giảm cân. Một người chỉ nói: giảm năm ký trong một tháng. Người kia giải thích nó giảm bằng cách nào và ai không nên ăn. Bạn tin được người thứ hai vì bạn tự suy ra được khi nào nó hợp và khi nào không.",
      columns: ["Cách trình bày", "Giống như", "Bạn làm được gì với nó"],
      rows: [
        ["Lời hứa kết quả", "Giảm năm ký trong một tháng", "Chỉ biết tin hay không tin, không biết áp cho trường hợp của mình"],
        ["Cơ chế", "Cắt tinh bột, ăn nhiều đạm", "Tự suy ra nó hợp với ai và gãy ở đâu"],
        ["Đánh đổi", "Dễ mệt, không hợp người có bệnh nền", "Hỏi thẳng được nhược điểm, vì người hiểu sâu luôn nêu ra được"],
      ],
      oneLiner: "Cơ chế kiểm chứng được, lời hứa thì không; muốn chắc hơn thì dựng bản mẫu nhỏ nhắm đúng chỗ nghi ngờ nhất.",
    },
  ],

  "case-no-ky-thuat-tich-luy": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp nợ kỹ thuật theo lãi, không theo độ xấu",
      task:
        "Bốn khoản cần dọn, mỗi khoản có độ xấu (1-10), số lần chạm vào mỗi tháng và số phút mất mỗi lần chạm. Lãi của một khoản là số phút nó lấy của đội mỗi tháng = số lần chạm × số phút mỗi lần. Xếp theo lãi từ cao xuống thấp và in hai khoản đáng dọn nhất. (Số liệu minh hoạ.)",
      starter:
        'khoan = [\n    ("module thanh toán", 9, 1, 30),\n    ("bộ định tuyến", 5, 12, 25),\n    ("script migrate cũ", 8, 0, 90),\n    ("lớp xác thực", 6, 20, 20),\n]\n# (tên, độ xấu, số lần chạm mỗi tháng, phút mỗi lần chạm)\n\nxep = sorted(khoan, key=lambda k: k[1], reverse=True)\nfor i, (ten, xau, cham, phut) in enumerate(xep[:2], start=1):\n    print(f"{i}. {ten}: {cham * phut} phút/tháng")\n',
      solution:
        'khoan = [\n    ("module thanh toán", 9, 1, 30),\n    ("bộ định tuyến", 5, 12, 25),\n    ("script migrate cũ", 8, 0, 90),\n    ("lớp xác thực", 6, 20, 20),\n]\n# (tên, độ xấu, số lần chạm mỗi tháng, phút mỗi lần chạm)\n\nxep = sorted(khoan, key=lambda k: k[2] * k[3], reverse=True)\nfor i, (ten, xau, cham, phut) in enumerate(xep[:2], start=1):\n    print(f"{i}. {ten}: {cham * phut} phút/tháng")\n',
      expectedOutput: "1. lớp xác thực: 400 phút/tháng\n2. bộ định tuyến: 300 phút/tháng",
      hints: [
        "Khoá sắp xếp đang là độ xấu (k[1]). Thứ cần xếp theo là lãi, tức số lần chạm nhân số phút.",
        "Hai khoản xấu nhất trên giấy gần như không bị chạm tới, nên lãi của chúng nhỏ.",
      ],
    },
    {
      type: "chart",
      title: "Khi nào dọn một khoản nợ thì hoà vốn",
      caption:
        "Số liệu minh hoạ: đường tăng là tổng giờ khoản nợ lấy của đội nếu để nguyên, đường ngang là công dọn một lần. Chỗ hai đường cắt nhau là tháng hoà vốn; khoản ít bị chạm thì đường tăng rất thoải, có khi không bao giờ cắt.",
      kind: "line",
      xLabel: "Số tháng tính từ hôm nay",
      yLabel: "Tổng giờ",
      x: { from: 0, to: 24, step: 2 },
      params: [
        { id: "cham", label: "Số lần chạm vào khoản này mỗi tháng", min: 0, max: 30, step: 1, value: 12, unit: "lần" },
        { id: "phut", label: "Phút mất mỗi lần chạm", min: 5, max: 60, step: 5, value: 25, unit: "phút" },
        { id: "don", label: "Công dọn một lần", min: 8, max: 80, step: 4, value: 40, unit: "giờ" },
      ],
      series: [
        { label: "Giờ bị lấy nếu để nguyên", expr: "x*cham*phut/60" },
        { label: "Công dọn một lần", expr: "don" },
      ],
    },
  ],

  "case-phan-tich-mot-dich-vu": [
    {
      type: "scenario",
      title: "Tiếp quản dịch vụ đơn hàng, người cũ đã nghỉ",
      start: "start",
      nodes: {
        start: {
          text: "Bạn vừa tiếp quản dịch vụ xử lý đơn hàng và người viết ra nó đã nghỉ. Sếp muốn nghe nhận định của bạn sau nửa ngày. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Mở kho mã và đọc từ điểm khởi động xuống", next: "read" },
            { label: "Lấy một request thật và lần theo nó từ đầu tới cuối", next: "trace" },
            { label: "Xin sơ đồ kiến trúc cũ rồi dựa hẳn vào đó", next: "diagram" },
          ],
        },
        read: {
          text: "Ba ngày sau bạn biết dự án dùng framework nào và thư mục nào chứa gì, nhưng vẫn không trả lời được một đơn hàng đi qua những đâu. Nửa ngày hứa với sếp đã trôi qua từ lâu.",
          ending: "bad",
        },
        diagram: {
          text: "Sơ đồ vẽ từ hai năm trước, lúc dịch vụ còn gọi thẳng cơ sở dữ liệu. Giờ nó đi qua một hàng đợi mà sơ đồ không có. Bạn báo cáo theo sơ đồ và sếp ra quyết định dựa trên một hệ thống không còn tồn tại.",
          ending: "bad",
        },
        trace: {
          text: "Bạn lọc nhật ký theo mã của một đơn hôm qua và thấy nó đi qua cổng API, dịch vụ này, gọi sang kho và thanh toán, ghi một bảng rồi trả về. Sáu câu hỏi đã có chỗ để đặt. Còn hai câu bạn chưa trả lời được. Bạn làm gì?",
          choices: [
            { label: "Ghi hai câu đó vào danh sách mang đi hỏi người khác", next: "ok" },
            { label: "Đoán cho đủ sáu câu để bản đồ nhìn hoàn chỉnh", next: "guess" },
          ],
        },
        guess: {
          text: "Một trong hai câu đoán là cách quay lui bản triển khai. Tuần sau có sự cố, bạn chạy đúng lệnh bạn đoán và nó quay lui một phần, để lại cơ sở dữ liệu ở phiên bản mới còn mã ở phiên bản cũ.",
          ending: "bad",
        },
        ok: {
          text: "Bạn nộp một trang giấy: bản đồ một request, các phụ thuộc, nơi ghi dữ liệu và hai câu còn mở. Câu hỏi nào bạn không trả lời được sau nửa ngày chính là danh sách câu hỏi đáng đi hỏi, và mã sau đó đọc nhanh hơn nhiều.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một đơn hàng đi qua dịch vụ, và sáu câu hỏi nằm ở đâu",
      steps: [
        {
          label: "Vào: ai gọi và qua đường nào",
          detail:
            "Lọc nhật ký theo mã request của một đơn hôm qua, tìm dòng đầu tiên. Nó cho biết cổng nào nhận và bên gọi là ai, tức câu hỏi thứ nhất, mà không cần mở một tệp mã nào.",
        },
        {
          label: "Gọi tiếp: những dịch vụ nào",
          detail:
            "Các dòng kế tiếp của cùng mã request cho thấy dịch vụ gọi sang kho và thanh toán. Đánh dấu cái nào thiếu thì request không thể hoàn tất: đó là phụ thuộc thiết yếu.",
        },
        {
          label: "Ghi: dữ liệu đi đâu",
          detail:
            "Tìm lệnh ghi của request ấy trong nhật ký hoặc cấu hình để biết bảng nào được ghi và ghi gì. Chỗ này cũng là nơi bạn hỏi nếu ghi dở thì sao.",
        },
        {
          label: "Trả về: bên gọi làm gì",
          detail:
            "Xem kết quả trả lại và bên gọi dùng nó ra sao. Một dịch vụ trả về thành công nhưng bên gọi bỏ qua trường quan trọng là loại lỗi khó thấy nhất.",
        },
        {
          label: "Hỏng và triển khai",
          detail:
            "Đọc cấu hình thời gian chờ, thử lại, và lệnh triển khai lẫn quay lui. Hai câu cuối này hiếm khi suy ra được từ mã, nên thường thành câu hỏi mang đi hỏi người khác.",
        },
      ],
    },
  ],

  "case-tu-dung-hay-mua": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bản đề xuất tự dựng hay mua do AI viết",
      task: "Một công cụ AI viết đề xuất cho một sản phẩm đặt lịch, có thuật toán gợi ý riêng làm khách chọn mình. Bấm vào những đoạn lập luận sai với nguyên tắc tự dựng thứ làm mình khác biệt, mua thứ ai cũng phải có, rồi nộp.",
      segments: [
        {
          text: "Hệ thống thanh toán tự dựng mất sáu tuần công, thuê chỉ ba trăm nghìn mỗi tháng, nên tự dựng sẽ hoà vốn sau hai năm.",
          error: "Phép tính bỏ qua bảo trì vĩnh viễn và chi phí cơ hội của sáu tuần. Thanh toán là thứ ai cũng phải có, nên câu hỏi đúng là vị trí, không phải giá.",
        },
        {
          text: "Thuật toán gợi ý lịch hẹn là lý do khách chọn sản phẩm này, nên giữ tự dựng và đầu tư thêm.",
        },
        {
          text: "Dịch vụ gửi email giao dịch nên tự dựng, vì đội dựng xong được trong một tuần.",
          error: "Gửi email là loại ai cũng phải có. Dựng nhanh không làm nó thành điểm khác biệt, còn bảo trì thì kéo dài mãi.",
        },
        {
          text: "Nếu mua, nên bọc nhà cung cấp sau một lớp giao diện của mình để đổi ý sau này chỉ sửa một chỗ.",
        },
        {
          text: "Quyết định này chốt cố định, không cần rà lại, vì phần không phải lõi hôm nay sẽ mãi không phải lõi.",
          error: "Phần không phải lõi hôm nay có thể thành lõi ngày mai, nên cần rà lại mỗi năm.",
        },
        {
          text: "Cần ghi lại lý do chọn để người sau biết quyết định dựa trên giả định nào.",
        },
      ],
    },
    {
      type: "chart",
      title: "Tự dựng so với mua khi tính cả bảo trì",
      caption:
        "Số liệu minh hoạ, đơn vị triệu đồng: một tuần công tính 40 giờ. Đường ngang là phép tính chỉ cộng công dựng; đường tăng nhanh là tự dựng khi cộng cả giờ bảo trì mỗi tháng; đường còn lại là phí thuê. Kéo giờ bảo trì về 0 để thấy phép tính ngây thơ.",
      kind: "line",
      xLabel: "Số tháng",
      yLabel: "Tổng chi phí (triệu đồng)",
      x: { from: 0, to: 36, step: 3 },
      params: [
        { id: "tuan", label: "Số tuần công để tự dựng", min: 1, max: 12, step: 1, value: 6, unit: "tuần" },
        { id: "baotri", label: "Giờ bảo trì mỗi tháng", min: 0, max: 30, step: 1, value: 8, unit: "giờ" },
        { id: "gia", label: "Chi phí mỗi giờ công", min: 0.1, max: 0.5, step: 0.05, value: 0.15, unit: "triệu" },
        { id: "phi", label: "Phí thuê mỗi tháng", min: 0.1, max: 2, step: 0.1, value: 0.3, unit: "triệu" },
      ],
      series: [
        { label: "Tự dựng, chỉ tính công dựng", expr: "tuan*40*gia" },
        { label: "Tự dựng, tính cả bảo trì", expr: "tuan*40*gia+x*baotri*gia" },
        { label: "Mua", expr: "x*phi" },
      ],
    },
  ],

  "phan-loai-rui-ro-ky-thuat": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp bốn sự cố vào đúng nhóm rủi ro",
      task:
        "Mỗi sự cố có ba dấu hiệu: nó có còn xảy ra nếu mọi thứ bên ngoài đội đứng yên không, nguyên nhân có phải cấu hình hoặc thao tác thủ công không, và hai bên có hiểu khác nhau về dữ liệu trao đổi không. Viết phan_nhom() trả về một trong bốn nhóm: mã nguồn, vận hành, phụ thuộc, giao diện. Còn xảy ra khi bên ngoài đứng yên thì thuộc mã nguồn hoặc vận hành; không còn thì thuộc phụ thuộc hoặc giao diện.",
      starter:
        'su_co = [\n    ("Chia cho 0 khi giỏ hàng trống", True, False, False),\n    ("Biến môi trường sai sau triển khai", True, True, False),\n    ("Thư viện thanh toán gỡ bản cũ", False, False, False),\n    ("Đối tác đổi ngày từ chuỗi sang số", False, False, True),\n]\n# (mô tả, còn xảy ra khi bên ngoài đứng yên, do cấu hình, hai bên hiểu khác nhau)\n\ndef phan_nhom(con_xay_ra, cau_hinh, hieu_khac):\n    return "mã nguồn"\n\nfor mo_ta, a, b, c in su_co:\n    print(f"{mo_ta} -> {phan_nhom(a, b, c)}")\n',
      solution:
        'su_co = [\n    ("Chia cho 0 khi giỏ hàng trống", True, False, False),\n    ("Biến môi trường sai sau triển khai", True, True, False),\n    ("Thư viện thanh toán gỡ bản cũ", False, False, False),\n    ("Đối tác đổi ngày từ chuỗi sang số", False, False, True),\n]\n# (mô tả, còn xảy ra khi bên ngoài đứng yên, do cấu hình, hai bên hiểu khác nhau)\n\ndef phan_nhom(con_xay_ra, cau_hinh, hieu_khac):\n    if con_xay_ra:\n        return "vận hành" if cau_hinh else "mã nguồn"\n    return "giao diện" if hieu_khac else "phụ thuộc"\n\nfor mo_ta, a, b, c in su_co:\n    print(f"{mo_ta} -> {phan_nhom(a, b, c)}")\n',
      expectedOutput:
        "Chia cho 0 khi giỏ hàng trống -> mã nguồn\nBiến môi trường sai sau triển khai -> vận hành\nThư viện thanh toán gỡ bản cũ -> phụ thuộc\nĐối tác đổi ngày từ chuỗi sang số -> giao diện",
      hints: [
        "Bắt đầu bằng câu hỏi tách nhóm: nhánh con_xay_ra là True nằm trong tầm tay của đội.",
        "Trong mỗi nhánh còn một dấu hiệu nữa để chọn giữa hai nhóm: cau_hinh ở nhánh trong tầm tay, hieu_khac ở nhánh bên ngoài.",
      ],
    },
    {
      type: "flow",
      title: "Một lỗi ngày tháng, nhìn như lỗi mã và hoá ra là giao diện",
      steps: [
        {
          label: "Triệu chứng hiện ở bên mình",
          detail:
            "Dịch vụ đơn hàng vỡ với lỗi không đọc được ngày. Nhìn từ trong, đây là một lỗi mã: hàm đọc ngày thiếu kiểm tra dữ liệu lạ.",
        },
        {
          label: "Sửa đúng dòng",
          detail:
            "Thêm kiểm tra và bỏ qua bản ghi hỏng. Sự cố đóng trong một giờ, nhanh và hợp lý, và xác suất nó lặp lại vẫn nguyên như trước.",
        },
        {
          label: "Hỏi câu tách nhóm",
          detail:
            "Nếu mọi thứ bên ngoài đội đứng yên, sự cố này còn xảy ra không? Không còn: đối tác vừa đổi ngày từ chuỗi sang số, nên nó không nằm ở mã hay cấu hình của đội.",
        },
        {
          label: "Gọi đúng tên: rủi ro giao diện",
          detail:
            "Hai bên hiểu khác nhau về dữ liệu trao đổi. Cách xử lý giờ có một nửa nằm ở phía bên kia, nên đây là một cuộc trao đổi chứ không chỉ một lần sửa.",
        },
        {
          label: "Dùng công cụ của nhóm đó",
          detail:
            "Cùng đối tác viết hợp đồng dữ liệu và kiểm tra ở biên, để thay đổi kiểu dữ liệu bị bắt ngay ở chỗ vào chứ không vỡ sâu trong mã. Đây mới là việc làm số sự cố giảm.",
        },
      ],
    },
  ],

  "case-ba-dieu-nan-khi-hoc-lap-trinh": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Nhờ AI giúp chia nhỏ một yêu cầu thật",
      task: "Bạn học Python ba tháng, hiểu vòng lặp và hàm, nhưng ngồi trước yêu cầu làm công cụ đổi tên hàng loạt tệp ảnh thì trang vẫn trắng. Lắp một prompt để AI giúp đúng chỗ bạn đang thiếu, rồi xem câu trả lời.",
      parts: [
        {
          id: "context",
          label: "Bối cảnh",
          options: [
            {
              text: "Mình học Python ba tháng, hiểu vòng lặp và hàm, nhưng gặp yêu cầu thật là không biết bắt đầu gõ gì.",
              good: true,
              feedback: "Đúng: nó nói rõ bạn đã biết gì và kẹt ở đâu, nên AI không phải dạy lại thứ bạn có.",
            },
            {
              text: "Mình muốn học lập trình giỏi hơn và nhanh hơn.",
              feedback: "Quá chung. AI không biết bạn đang ở đâu nên sẽ đưa một lộ trình đại trà.",
            },
            {
              text: "Mình là người mới hoàn toàn, chưa viết dòng mã nào bao giờ.",
              feedback: "Sai chẩn đoán: AI sẽ giảng khái niệm nhập môn, đúng thứ bạn không thiếu, và bạn lại có cảm giác tiến bộ giả.",
            },
          ],
        },
        {
          id: "task",
          label: "Việc cần làm",
          options: [
            {
              text: "Giúp mình chia yêu cầu này thành các bước nhỏ, chưa viết mã hộ.",
              good: true,
              feedback: "Đúng: thứ bạn thiếu là kỹ năng chia nhỏ bài toán, và chỉ rèn được khi bạn tự gõ phần mã của từng bước.",
            },
            {
              text: "Viết giúp mình chương trình hoàn chỉnh cho yêu cầu này.",
              feedback: "Chương trình chạy, nhưng lần sau trang vẫn trắng: kỹ năng chia nhỏ chưa được rèn.",
            },
            {
              text: "Giải thích lại khái niệm hàm và vòng lặp từ đầu cho mình.",
              feedback: "Chẩn đoán sai là thiếu kiến thức. Bạn đã hiểu chúng; học thêm một lượt chỉ đem lại cảm giác tiến bộ.",
            },
          ],
        },
        {
          id: "format",
          label: "Khuôn dạng",
          options: [
            {
              text: "Mỗi bước một dòng, làm xong trong vài phút, kèm kết quả mong đợi khi chạy thử.",
              good: true,
              feedback: "Đúng: mỗi bước kiểm được ngay, nên vòng phản hồi chặt như tuần đầu tiên được khôi phục.",
            },
            {
              text: "Một đoạn văn dài giải thích hướng tiếp cận tổng thể của cả chương trình.",
              feedback: "Đọc xong vẫn không có việc nhỏ nào để gõ, nên bạn quay lại trang trắng.",
            },
            {
              text: "Một bảng so sánh ba ngôn ngữ phù hợp cho yêu cầu này.",
              feedback: "Đổi chủ đề: bạn đang kẹt ở chia nhỏ, không phải ở chọn ngôn ngữ.",
            },
          ],
        },
      ],
      responses: [
        {
          requires: ["context", "task", "format"],
          text: "1) Liệt kê tên tệp trong một thư mục (kết quả: in ra danh sách). 2) Chỉ giữ tệp đuôi .jpg (kết quả: danh sách ngắn hơn). 3) Với một tệp, tạo tên mới theo mẫu anh-001.jpg (kết quả: in tên mới, chưa đổi). 4) Bọc bước 3 trong vòng lặp. 5) Chỉ khi in đúng mới gọi lệnh đổi tên thật. Hãy tự gõ bước 1 trước.",
        },
        {
          requires: ["task"],
          text: "Chia nhỏ như sau: đọc thư mục, lọc ảnh, tạo tên mới, đổi tên. Các bước hợp lý, nhưng chưa rõ kết quả mong đợi của từng bước nên bạn khó biết mình làm đúng chưa.",
        },
        {
          text: "Đây là chương trình hoàn chỉnh dùng thư viện os để đổi tên tất cả ảnh trong thư mục. Bạn chạy thử nhé. (Chương trình chạy, nhưng bạn chưa chia nhỏ được gì.)",
        },
      ],
    },
    {
      type: "feynman",
      title: "Ba điều làm nản, mỗi điều có nguyên nhân cấu trúc",
      intro:
        "Hãy nghĩ tới việc học nấu ăn. Xem hết video vẫn không nấu nổi bữa cơm, thấy người khác nấu như chớp, và không biết khi nào gọi là biết nấu. Bạn không thiếu năng khiếu; bạn đang ở chặng giữa mà phản hồi đã biến mất.",
      columns: ["Điều làm nản", "Giống như", "Nguyên nhân thật và việc nhỏ nên làm"],
      rows: [
        ["Hiểu mà không làm được", "Xem hết video nấu ăn mà vẫn không dựng được bữa cơm", "Thiếu bước chia nhỏ, không thiếu khái niệm. Viết các bước ra giấy trước khi gõ"],
        ["Thấy người khác đi nhanh", "So bữa cơm đầu của mình với bữa tiệc của đầu bếp", "So quá trình của mình với kết quả của họ. So với chính mình tháng trước"],
        ["Không biết học tới đâu là đủ", "Học nấu mãi mà chưa bao giờ nấu cho ai ăn", "Đích thật là làm được việc, không phải học hết. Chọn một sản phẩm nhỏ và làm xong nó"],
      ],
      oneLiner: "Khoảng giữa không phải dấu hiệu chọn sai nghề; nó là một chặng ai cũng đi qua, và vượt được bằng việc chia nhỏ.",
    },
  ],

  "wealth-management": [
    {
      type: "exercise",
      language: "javascript",
      title: "Tỷ lệ dùng nền tảng có che mất tín hiệu không",
      task:
        "Tám đội, năm đội bị yêu cầu bắt buộc dùng nền tảng nội bộ và ba đội được tự chọn. Tính hai con số: tỷ lệ đội đang dùng trên tất cả đội, và tỷ lệ đội TỰ CHỌN dùng, tức chỉ tính ba đội không bị bắt buộc. Làm tròn tới số nguyên. (Số liệu minh hoạ.)",
      starter:
        'const doi = [\n  { ten: "A", dung: true, batBuoc: true },\n  { ten: "B", dung: true, batBuoc: true },\n  { ten: "C", dung: true, batBuoc: true },\n  { ten: "D", dung: true, batBuoc: true },\n  { ten: "E", dung: true, batBuoc: true },\n  { ten: "F", dung: true, batBuoc: false },\n  { ten: "G", dung: false, batBuoc: false },\n  { ten: "H", dung: false, batBuoc: false },\n];\n\nconst dung = doi.filter((d) => d.dung).length;\nconst tatCa = Math.round((dung / doi.length) * 100);\nconst tuChon = Math.round((dung / doi.length) * 100);\n\nconsole.log(`Tỷ lệ đang dùng: ${tatCa}%`);\nconsole.log(`Tỷ lệ tự chọn dùng: ${tuChon}%`);\n',
      solution:
        'const doi = [\n  { ten: "A", dung: true, batBuoc: true },\n  { ten: "B", dung: true, batBuoc: true },\n  { ten: "C", dung: true, batBuoc: true },\n  { ten: "D", dung: true, batBuoc: true },\n  { ten: "E", dung: true, batBuoc: true },\n  { ten: "F", dung: true, batBuoc: false },\n  { ten: "G", dung: false, batBuoc: false },\n  { ten: "H", dung: false, batBuoc: false },\n];\n\nconst dung = doi.filter((d) => d.dung).length;\nconst tatCa = Math.round((dung / doi.length) * 100);\nconst khongBat = doi.filter((d) => !d.batBuoc);\nconst tuChon = Math.round((khongBat.filter((d) => d.dung).length / khongBat.length) * 100);\n\nconsole.log(`Tỷ lệ đang dùng: ${tatCa}%`);\nconsole.log(`Tỷ lệ tự chọn dùng: ${tuChon}%`);\n',
      expectedOutput: "Tỷ lệ đang dùng: 75%\nTỷ lệ tự chọn dùng: 33%",
      hints: [
        "Lọc ra các đội có batBuoc là false trước, rồi mới đếm bao nhiêu đội trong số đó dùng.",
        "Mẫu số của tỷ lệ tự chọn là số đội không bị bắt buộc, không phải tổng số đội.",
      ],
    },
    {
      type: "flow",
      title: "Một nền tảng nội bộ đi từ nhu cầu tới được chọn",
      steps: [
        {
          label: "Một đội giải xong vấn đề của mình",
          detail:
            "Chưa có kế hoạch nền tảng nào. Một đội viết công cụ triển khai cho chính họ, và nó chạy tốt. Đây là lần xác nhận thứ nhất, dù chưa ai gọi nó là nền tảng.",
        },
        {
          label: "Đội thứ hai mượn lại",
          detail:
            "Đội kế bên thấy và xin dùng. Họ phát hiện ba chỗ gắn cứng vào đội đầu và nhờ sửa. Lần dùng này uốn hình dạng giải pháp cho đúng.",
        },
        {
          label: "Đội thứ ba tự tìm tới",
          detail:
            "Không ai gửi thông báo. Ba nhóm độc lập đã xác nhận nhu cầu, và đây là lúc đáng đầu tư thành sản phẩm. Bắt đầu từ kế hoạch chín tháng thay cho ba lần xác nhận này là bắt đầu bằng phỏng đoán.",
        },
        {
          label: "Nhận nuôi phần khó, rút ngắn thời gian thử",
          detail:
            "Đội nền tảng nhận phần các đội đau nhất, như chứng chỉ và quyền truy cập, và đo thời gian từ lúc một đội bắt đầu thử tới lần chạy đầu tiên. Con số này mới cho biết nền tảng có dễ vào không.",
        },
        {
          label: "Giữ lối thoát rõ ràng",
          detail:
            "Một đội cân nhắc chuyển sang đang ước lượng rủi ro nền tảng dở mà không quay lại được. Lối ra rõ ràng giảm rủi ro đó, và tỷ lệ tự chọn vẫn là tín hiệu không giả được.",
        },
      ],
    },
  ],

  "nhieu-dich-vu-nho-hay-mot-dich-vu-lon": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm những thứ chung làm các dịch vụ không còn độc lập",
      task:
        "Bốn dịch vụ, mỗi dịch vụ liệt kê những thứ nó phụ thuộc (cơ sở dữ liệu, xác thực, vùng, đội trực...). Đếm mỗi thứ được bao nhiêu dịch vụ dùng chung và in ra những thứ được dùng chung bởi ÍT NHẤT 3 trong 4 dịch vụ, xếp từ nhiều xuống ít (bằng nhau thì theo tên). Đó là các điểm hỏng chung. (Số liệu minh hoạ.)",
      starter:
        'dich_vu = {\n    "đơn hàng": {"csdl chung", "xác thực", "vùng A", "đội trực 1"},\n    "kho": {"csdl chung", "xác thực", "vùng A", "đội trực 1"},\n    "thanh toán": {"csdl thanh toán", "xác thực", "vùng A", "đội trực 1"},\n    "thông báo": {"hàng đợi", "xác thực", "vùng B", "đội trực 1"},\n}\nNGUONG = len(dich_vu)\n\ndem = {}\nfor deps in dich_vu.values():\n    for d in deps:\n        dem[d] = dem.get(d, 0) + 1\n\nfor ten, n in sorted(dem.items(), key=lambda kv: (-kv[1], kv[0])):\n    if n >= NGUONG:\n        print(f"{ten}: {n}/{len(dich_vu)} dịch vụ")\n',
      solution:
        'dich_vu = {\n    "đơn hàng": {"csdl chung", "xác thực", "vùng A", "đội trực 1"},\n    "kho": {"csdl chung", "xác thực", "vùng A", "đội trực 1"},\n    "thanh toán": {"csdl thanh toán", "xác thực", "vùng A", "đội trực 1"},\n    "thông báo": {"hàng đợi", "xác thực", "vùng B", "đội trực 1"},\n}\nNGUONG = 3\n\ndem = {}\nfor deps in dich_vu.values():\n    for d in deps:\n        dem[d] = dem.get(d, 0) + 1\n\nfor ten, n in sorted(dem.items(), key=lambda kv: (-kv[1], kv[0])):\n    if n >= NGUONG:\n        print(f"{ten}: {n}/{len(dich_vu)} dịch vụ")\n',
      expectedOutput: "xác thực: 4/4 dịch vụ\nđội trực 1: 4/4 dịch vụ\nvùng A: 3/4 dịch vụ",
      hints: [
        "Ngưỡng hiện tại bằng số dịch vụ, nên chỉ bắt được thứ mà cả bốn cùng dùng. Một vùng hỏng làm sập ba trên bốn dịch vụ cũng là điểm hỏng chung.",
        "Đặt NGUONG bằng 3, phần còn lại của mã đã đúng.",
      ],
    },
    {
      type: "flow",
      title: "Một đêm xấu: mười hai dịch vụ cùng hỏng vì một thứ chung",
      steps: [
        {
          label: "Dịch vụ xác thực chậm dần",
          detail:
            "Không có gì báo lỗi, chỉ là mỗi lần đăng nhập mất hai giây thay vì hai chục mili giây. Mười hai dịch vụ đều gọi nó ở đầu mỗi request.",
        },
        {
          label: "Hết giờ lan sang từng dịch vụ",
          detail:
            "Dịch vụ nào cũng đang chờ xác thực nên đồng loạt vượt thời gian chờ. Trên bảng điều khiển thấy mười hai dịch vụ đỏ cùng lúc, trông như mười hai sự cố riêng.",
        },
        {
          label: "Cảnh báo dồn về một đội trực",
          detail:
            "Cả mười hai cảnh báo gửi tới cùng ba người trực. Độc lập về kỹ thuật không giúp gì khi chỉ có ba người đọc, và hai sự cố cùng lúc trở thành một sự cố kéo dài gấp đôi.",
        },
        {
          label: "Tìm điểm chung trước, chữa từng cái sau",
          detail:
            "Hỏi mười hai dịch vụ cùng gọi thứ gì, thay vì vào từng dịch vụ. Điểm chung hiện ra trong vài phút. Sau sự cố, thêm nó vào danh sách bốn nguồn phụ thuộc chung và thiết kế đường dự phòng cho nó.",
        },
      ],
    },
  ],

  "case-lap-trinh-quy-ve-may-y-tuong": [
    {
      type: "exercise",
      language: "python",
      title: "Trạng thái: ai được phép sửa danh sách này",
      task:
        "Hàm them_hoa_don() thêm một hoá đơn vào danh sách rồi trả về danh sách mới. Hiện tại nó sửa luôn danh sách gốc nên mọi nơi đang giữ danh sách gốc đều thấy nó thay đổi. Sửa hàm để danh sách gốc giữ nguyên và hàm trả về một danh sách MỚI. Biểu diễn dữ liệu và trạng thái là hai trong bốn ý tưởng xuất hiện ở mọi ngôn ngữ.",
      starter:
        'def them_hoa_don(ds, x):\n    ds.append(x)\n    return ds\n\ngoc = ["HD01", "HD02"]\nmoi = them_hoa_don(goc, "HD03")\n\nprint("Gốc:", goc)\nprint("Mới:", moi)\nprint("Cùng một danh sách:", goc is moi)\n',
      solution:
        'def them_hoa_don(ds, x):\n    return ds + [x]\n\ngoc = ["HD01", "HD02"]\nmoi = them_hoa_don(goc, "HD03")\n\nprint("Gốc:", goc)\nprint("Mới:", moi)\nprint("Cùng một danh sách:", goc is moi)\n',
      expectedOutput: "Gốc: ['HD01', 'HD02']\nMới: ['HD01', 'HD02', 'HD03']\nCùng một danh sách: False",
      hints: [
        "append() sửa ngay danh sách đang cầm. Toán tử + giữa hai danh sách tạo ra một danh sách mới.",
        "Ý tưởng này không gắn với Python: ngôn ngữ nào cũng có câu hỏi sao chép hay tham chiếu, và ai được sửa.",
      ],
    },
    {
      type: "feynman",
      title: "Bốn ý tưởng nền, ví dụ đời thường",
      intro:
        "Hãy nghĩ tới việc học lái xe. Biển báo ở mỗi nước một khác, nhưng ở đâu bạn cũng phải hiểu bốn thứ: xe đang ở đâu, đi theo đường nào, đèn nào đang bật, và lỡ xảy ra va chạm thì sao. Biển báo là cú pháp, bốn thứ kia là ý tưởng nền.",
      columns: ["Ý tưởng", "Câu hỏi mang sang mọi ngôn ngữ", "Giống như"],
      rows: [
        ["Biểu diễn dữ liệu", "Kiểu nào, nằm ở đâu, sao chép hay tham chiếu?", "Gửi bản photo hay gửi đường dẫn tới tài liệu chung"],
        ["Luồng điều khiển", "Rẽ nhánh, lặp, gọi hàm, và thứ tự khi bất đồng bộ?", "Công thức nấu ăn: làm bước nào trước, bước nào chờ"],
        ["Trạng thái", "Sống ở đâu, ai được sửa, tồn tại bao lâu?", "Bảng trắng trong phòng họp mà ai cũng có thể xoá"],
        ["Lỗi", "Truyền đi bằng cách nào, ai bắt, không ai bắt thì sao?", "Chuông báo cháy: ai nghe, ai xử lý, nếu không ai ở đó"],
      ],
      oneLiner: "Cú pháp là thứ bạn tra; bốn ý tưởng nền là thứ bạn mang theo sang ngôn ngữ nào cũng được.",
    },
  ],

  "case-ai-trong-san-pham-that": [
    {
      type: "exercise",
      language: "javascript",
      title: "Cho tính năng AI hỏng một cách tử tế",
      task:
        "Tính năng tóm tắt nội dung gọi một mô hình AI. Ba lần gọi trả về: lần một nhanh và có kết quả, lần hai mất 6200 ms, lần ba bị giới hạn tần suất nên không có nội dung (text là null). Viết hienThi(): trả lời nhanh (không quá TIMEOUT) thì hiện kèm nhãn 'Tóm tắt do AI, có thể sai: '; chậm hoặc không có nội dung thì hiện đường lui 'Xem nội dung gốc (bản tóm tắt chưa sẵn sàng)'. (Số liệu minh hoạ.)",
      starter:
        'const TIMEOUT = 3000;\nconst traLoi = [\n  { ms: 800, text: "Khách hỏi về hoàn tiền" },\n  { ms: 6200, text: "Khách hỏi về giao hàng" },\n  { ms: 1500, text: null },\n];\n\nfunction hienThi(r) {\n  return r.text;\n}\n\ntraLoi.forEach((r, i) => console.log(`Yêu cầu ${i + 1}: ${hienThi(r)}`));\n',
      solution:
        'const TIMEOUT = 3000;\nconst traLoi = [\n  { ms: 800, text: "Khách hỏi về hoàn tiền" },\n  { ms: 6200, text: "Khách hỏi về giao hàng" },\n  { ms: 1500, text: null },\n];\n\nfunction hienThi(r) {\n  if (r.text === null || r.ms > TIMEOUT) return "Xem nội dung gốc (bản tóm tắt chưa sẵn sàng)";\n  return "Tóm tắt do AI, có thể sai: " + r.text;\n}\n\ntraLoi.forEach((r, i) => console.log(`Yêu cầu ${i + 1}: ${hienThi(r)}`));\n',
      expectedOutput:
        "Yêu cầu 1: Tóm tắt do AI, có thể sai: Khách hỏi về hoàn tiền\nYêu cầu 2: Xem nội dung gốc (bản tóm tắt chưa sẵn sàng)\nYêu cầu 3: Xem nội dung gốc (bản tóm tắt chưa sẵn sàng)",
      hints: [
        "Hai đường sai cần cùng một đường lui: quá TIMEOUT, hoặc text là null.",
        "Đường đúng vẫn phải gắn nhãn cho phép sai, vì cách trình bày quyết định mức chịu đựng.",
      ],
    },
    {
      type: "flow",
      title: "Một yêu cầu AI đi qua ba đường sai trước khi tới người dùng",
      steps: [
        {
          label: "Gọi mô hình với thời gian chờ",
          detail:
            "Không gọi như một hàm trong bộ nhớ. Đặt thời gian chờ vài giây, vì mô hình chậm là bình thường, và người dùng không chờ được lâu như vậy.",
        },
        {
          label: "Nhận lỗi hoặc giới hạn tần suất",
          detail:
            "Nhà cung cấp có thể từ chối vì quá tần suất hoặc gặp sự cố. Mã phải có nhánh cho trường hợp này từ đầu, không đợi tuần đầu sản phẩm thật mới thêm.",
        },
        {
          label: "Nhận câu trả lời sai mà tự tin",
          detail:
            "Đường sai khó nhất: không có mã lỗi nào để bắt. Cách chống duy nhất là cách trình bày, nên đừng giao câu trả lời như sự thật chắc chắn.",
        },
        {
          label: "Trình bày như gợi ý có thể sửa",
          detail:
            "Gắn nhãn là gợi ý, cho người dùng sửa, và có nút báo sai. Cùng tỷ lệ sai 3%, đây là khác biệt giữa mất niềm tin và một phiền toái nhỏ.",
        },
        {
          label: "Gom báo sai thành dữ liệu",
          detail:
            "Mỗi lần người dùng báo sai là một ví dụ cụ thể về chỗ mô hình hỏng, dùng để cải thiện lời nhắc hoặc đổi cách trình bày ở chỗ đó.",
        },
      ],
    },
  ],

  "case-doc-sau-nhat-ky": [
    {
      type: "exercise",
      language: "python",
      title: "Đọc trọn một request thay vì đếm lỗi",
      task:
        "Nhật ký có các dòng của hai request r-17 và r-42 xen kẽ. In ra các sự kiện của riêng r-42 theo thứ tự thời gian, mỗi dòng dạng 'giờ lớp: nội dung', để thấy chuỗi nguyên nhân từ cổng API xuống tới tồn kho. (Số liệu minh hoạ.)",
      starter:
        'nhat_ky = [\n    ("02:00:01", "r-17", "cổng API", "nhận /orders"),\n    ("02:00:01", "r-42", "cổng API", "nhận /orders"),\n    ("02:00:02", "r-42", "đơn hàng", "gọi tồn kho"),\n    ("02:00:02", "r-17", "đơn hàng", "gọi tồn kho"),\n    ("02:00:03", "r-42", "tồn kho", "chờ khoá bảng stock"),\n    ("02:00:06", "r-17", "tồn kho", "chờ khoá bảng stock"),\n    ("02:00:07", "r-42", "đơn hàng", "hết giờ chờ tồn kho"),\n    ("02:00:08", "r-42", "cổng API", "hết giờ chờ đơn hàng"),\n    ("02:00:09", "r-17", "cổng API", "hết giờ chờ đơn hàng"),\n]\nma = "r-42"\n\nfor gio, rid, lop, noi_dung in sorted(nhat_ky):\n    if "hết giờ" in noi_dung:\n        print(f"{gio} {lop}: {noi_dung}")\n',
      solution:
        'nhat_ky = [\n    ("02:00:01", "r-17", "cổng API", "nhận /orders"),\n    ("02:00:01", "r-42", "cổng API", "nhận /orders"),\n    ("02:00:02", "r-42", "đơn hàng", "gọi tồn kho"),\n    ("02:00:02", "r-17", "đơn hàng", "gọi tồn kho"),\n    ("02:00:03", "r-42", "tồn kho", "chờ khoá bảng stock"),\n    ("02:00:06", "r-17", "tồn kho", "chờ khoá bảng stock"),\n    ("02:00:07", "r-42", "đơn hàng", "hết giờ chờ tồn kho"),\n    ("02:00:08", "r-42", "cổng API", "hết giờ chờ đơn hàng"),\n    ("02:00:09", "r-17", "cổng API", "hết giờ chờ đơn hàng"),\n]\nma = "r-42"\n\nfor gio, rid, lop, noi_dung in sorted(nhat_ky):\n    if rid == ma:\n        print(f"{gio} {lop}: {noi_dung}")\n',
      expectedOutput:
        "02:00:01 cổng API: nhận /orders\n02:00:02 đơn hàng: gọi tồn kho\n02:00:03 tồn kho: chờ khoá bảng stock\n02:00:07 đơn hàng: hết giờ chờ tồn kho\n02:00:08 cổng API: hết giờ chờ đơn hàng",
      hints: [
        "Điều kiện lọc đang là nội dung có chữ 'hết giờ', chỉ cho thấy lớp ngoài cùng. Lọc theo mã request thay cho nó.",
        "Biến ma đã có sẵn nhưng mã chưa dùng tới. Đọc nguyên chuỗi thì nguyên nhân hiện ra ở dòng thứ ba.",
      ],
    },
    {
      type: "chart",
      title: "Số dòng lỗi giảm dần khi tới gần nguyên nhân",
      caption:
        "Số liệu minh hoạ cho một sự cố trong năm phút: lớp ngoài cùng ghi nhiều lỗi nhất vì mọi thứ phía dưới đều làm nó hết giờ, còn lớp chứa nguyên nhân chỉ ghi vài chục dòng. Xếp theo số lỗi sẽ chỉ vào nơi triệu chứng, không vào nguyên nhân.",
      kind: "bar",
      xLabel: "Lớp trong hệ thống",
      yLabel: "Số dòng lỗi trong 5 phút",
      data: [
        { label: "Cổng API", values: [12000] },
        { label: "Đơn hàng", values: [820] },
        { label: "Tồn kho", values: [40] },
      ],
      seriesLabels: ["Dòng lỗi (minh hoạ)"],
    },
  ],

  "kiem-ke-tai-san-so-va-be-mat-tan-cong": [
    {
      type: "exercise",
      language: "python",
      title: "Đối chiếu danh sách tay với những gì đang chạy thật",
      task:
        "Từ hoá đơn lấy ra tập thứ đang chạy; danh sách tay là bảng một người từng cập nhật. In bốn dòng: thứ chạy thật nhưng không có trong danh sách, thứ còn trong danh sách nhưng không còn chạy, thứ chưa có người phụ trách, và các khoá quá 180 ngày chưa đổi (xếp từ cũ nhất, kèm số ngày). (Số liệu minh hoạ.)",
      starter:
        'hoa_don = {"web-1", "web-2", "db-1", "thu-nghiem-2023", "bao-cao-cu"}\ndanh_sach = {"web-1", "web-2", "db-1", "db-cu"}\nchu = {"web-1": "Lan", "web-2": "Lan", "bao-cao-cu": "Linh"}\ntuoi_khoa = {"khoá-ci": 30, "khoá-nhà-thầu": 400, "khoá-báo-cáo": 200}\n\nprint("Chạy nhưng không có trong danh sách:", ", ".join(sorted(danh_sach - hoa_don)))\nprint("Có trong danh sách nhưng không còn chạy:", ", ".join(sorted(hoa_don - danh_sach)))\nprint("Chưa có người phụ trách:", ", ".join(sorted(x for x in danh_sach if x not in chu)))\ncu = sorted((k for k, v in tuoi_khoa.items() if v > 365), key=lambda k: -tuoi_khoa[k])\nprint("Khoá quá 180 ngày chưa đổi:", ", ".join(f"{k} ({tuoi_khoa[k]})" for k in cu))\n',
      solution:
        'hoa_don = {"web-1", "web-2", "db-1", "thu-nghiem-2023", "bao-cao-cu"}\ndanh_sach = {"web-1", "web-2", "db-1", "db-cu"}\nchu = {"web-1": "Lan", "web-2": "Lan", "bao-cao-cu": "Linh"}\ntuoi_khoa = {"khoá-ci": 30, "khoá-nhà-thầu": 400, "khoá-báo-cáo": 200}\n\nprint("Chạy nhưng không có trong danh sách:", ", ".join(sorted(hoa_don - danh_sach)))\nprint("Có trong danh sách nhưng không còn chạy:", ", ".join(sorted(danh_sach - hoa_don)))\nprint("Chưa có người phụ trách:", ", ".join(sorted(x for x in hoa_don if x not in chu)))\ncu = sorted((k for k, v in tuoi_khoa.items() if v > 180), key=lambda k: -tuoi_khoa[k])\nprint("Khoá quá 180 ngày chưa đổi:", ", ".join(f"{k} ({tuoi_khoa[k]})" for k in cu))\n',
      expectedOutput:
        "Chạy nhưng không có trong danh sách: bao-cao-cu, thu-nghiem-2023\nCó trong danh sách nhưng không còn chạy: db-cu\nChưa có người phụ trách: db-1, thu-nghiem-2023\nKhoá quá 180 ngày chưa đổi: khoá-nhà-thầu (400), khoá-báo-cáo (200)",
      hints: [
        "Phép trừ tập hợp có chiều: thứ chạy thật mà danh sách thiếu là hoa_don - danh_sach, không phải ngược lại.",
        "Người phụ trách phải kiểm trên thứ đang chạy thật, không phải trên danh sách tay. Ngưỡng của khoá là 180 ngày.",
      ],
    },
    {
      type: "flow",
      title: "Một bản kiểm kê tự sinh, từ nguồn thật tới hành động",
      steps: [
        {
          label: "Đọc máy và dịch vụ từ hạ tầng",
          detail:
            "Lấy danh sách từ bảng điều khiển hoặc hoá đơn của nhà cung cấp thay vì từ bảng tính. Một máy chủ thử nghiệm dựng hai năm trước vẫn xuất hiện ở đây dù không ai nhớ.",
        },
        {
          label: "Đọc tên miền từ cấu hình DNS",
          detail:
            "Mọi tên miền phụ đều nằm trong cấu hình. Tên trỏ vào một dịch vụ đã xoá là chỗ có thể bị chiếm, nên liệt kê cả những dòng mà đích đã không còn.",
        },
        {
          label: "Tìm khoá ở những nơi khoá hay nằm",
          detail:
            "Biến môi trường, tệp cấu hình, kho bí mật và tài khoản dịch vụ. Nhóm này không có hình dạng nào, nên phải chủ động tìm, và ghi kèm ngày đổi gần nhất.",
        },
        {
          label: "Gán một tên người cho mỗi mục",
          detail:
            "Việc duy nhất không tự động được. Mục nào không có người nhận thì nó không nằm trong lịch vá, lượt quét hay lịch xoay vòng của ai cả.",
        },
        {
          label: "Hành động: vá, xoá hoặc xoay khoá",
          detail:
            "Danh sách đầy đủ mà không dẫn tới hành động thì chưa có ích. Mỗi mục có người nhận thì có việc: vá, xoá nếu không còn dùng, hoặc xoay khoá khi quá hạn.",
        },
      ],
    },
  ],

  "case-hai-cach-do-do-kha-dung": [
    {
      type: "exercise",
      language: "python",
      title: "Cùng một sự cố, hai con số khả dụng",
      task:
        "Mười khung phút: chín khung vắng, mỗi khung 100 request và không lỗi; một khung giờ cao điểm 1000 request, 500 request lỗi. Tính độ khả dụng theo thời gian (tỷ lệ khung không có lỗi nào) và theo request (tỷ lệ request thành công), làm tròn một chữ số thập phân. (Số liệu minh hoạ.)",
      starter:
        'khung = [(100, 0)] * 9 + [(1000, 500)]\n# (số request, số request lỗi) của từng khung phút\n\nkhung_hong = len([k for k in khung if k[1] > 0])\ntheo_thoi_gian = (len(khung) - khung_hong) / len(khung) * 100\ntheo_request = theo_thoi_gian\n\nprint(f"Theo thời gian: {theo_thoi_gian:.1f}%")\nprint(f"Theo request: {theo_request:.1f}%")\n',
      solution:
        'khung = [(100, 0)] * 9 + [(1000, 500)]\n# (số request, số request lỗi) của từng khung phút\n\nkhung_hong = len([k for k in khung if k[1] > 0])\ntheo_thoi_gian = (len(khung) - khung_hong) / len(khung) * 100\ntong = sum(k[0] for k in khung)\nloi = sum(k[1] for k in khung)\ntheo_request = (tong - loi) / tong * 100\n\nprint(f"Theo thời gian: {theo_thoi_gian:.1f}%")\nprint(f"Theo request: {theo_request:.1f}%")\n',
      expectedOutput: "Theo thời gian: 90.0%\nTheo request: 73.7%",
      hints: [
        "Theo request thì cộng số request của mọi khung, cộng số request lỗi, rồi lấy phần thành công trên tổng.",
        "Khung cao điểm chiếm một phần mười thời gian nhưng gần một nửa số request. Đó là lý do hai con số tách xa.",
      ],
    },
    {
      type: "chart",
      title: "Khi sự cố rơi vào giờ đông, hai cách đo tách nhau",
      caption:
        "Số liệu minh hoạ: kéo tỷ lệ thời gian hỏng (0,1 là 99,9% theo thời gian). Trục ngang là giờ hỏng đông gấp bao nhiêu lần trung bình; ở 1 lần thì hai đường trùng nhau, còn càng đông thì khả dụng theo request càng thấp hơn con số theo thời gian.",
      kind: "line",
      xLabel: "Giờ hỏng đông gấp mấy lần lưu lượng trung bình",
      yLabel: "Khả dụng (%)",
      x: { from: 1, to: 10, step: 1 },
      params: [{ id: "p", label: "Tỷ lệ thời gian bị hỏng", min: 0.1, max: 5, step: 0.1, value: 1, unit: "%" }],
      series: [
        { label: "Theo thời gian", expr: "100-p" },
        { label: "Theo request", expr: "100-100*(p/100*x)/(1-p/100+p/100*x)" },
      ],
    },
  ],

  "danh-gia-mot-du-an-nen-tang-noi-bo": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bản đánh giá dự án nền tảng do AI viết",
      task: "Một công cụ AI viết bản đánh giá cho dự án dựng nền tảng triển khai nội bộ. Bấm vào những đoạn làm phép tính bị bẻ cong rồi nộp.",
      segments: [
        {
          text: "Dựng nền tảng tốn 24 tháng công, ước lượng đã nhân đôi từ con số đầu tiên vì ước lượng đầu hầu như luôn thấp.",
        },
        {
          text: "Nền tảng sẽ giúp các đội làm nhanh hơn rất nhiều, nên tính phần tiết kiệm là 8 tháng công mỗi quý.",
          error: "Phần tiết kiệm phải đo bằng thứ đang tốn thật hôm nay, không bằng cảm giác sẽ nhanh hơn. Chưa có số đo thì chưa được tính.",
        },
        {
          text: "Để hiệu số thành dương, nên tính lợi ích trải tới mười hai quý thay vì tám.",
          error: "Kéo dài chân trời cho tới khi hiệu số dương là bẻ cong. Quá tám quý thì mọi giả định đều vô nghĩa.",
        },
        {
          text: "Chi phí duy trì khoảng một phần năm công dựng mỗi năm đã được trừ khỏi phần tiết kiệm trước khi so.",
        },
        {
          text: "Hướng sản phẩm còn mơ hồ nên dùng mức chiết khấu cao hơn so với một hạ tầng đã ổn định.",
        },
        {
          text: "Nền tảng dựng xong là xong, nên không cần tính công người sửa lỗi và trả lời câu hỏi sau đó.",
          error: "Nền tảng cũng phải được nuôi: sửa lỗi, trả lời câu hỏi, nâng phiên bản, viết tài liệu. Bỏ qua khoản này là so chi phí một lần với lợi ích vĩnh viễn.",
        },
      ],
    },
    {
      type: "flow",
      title: "Từ ước lượng thô tới một hiệu số đáng tin",
      steps: [
        {
          label: "Đếm công bỏ ra và nhân đôi",
          detail:
            "Cộng cả phần đội bị hút khỏi việc khác. Ước lượng đầu tiên gần như luôn thấp, nên nhân đôi ngay từ bước này; đây là khoản duy nhất chắc chắn trong cả phép tính.",
        },
        {
          label: "Đo phần tiết kiệm từ số liệu thật",
          detail:
            "Lấy số giờ các đội đang tốn hôm nay cho đúng việc nền tảng sẽ thay. Phần chỉ có trong dự đoán thì để ngoài bảng tính.",
        },
        {
          label: "Trừ chi phí duy trì",
          detail:
            "Khoảng một phần năm công dựng mỗi năm cho sửa lỗi, trả lời câu hỏi, nâng phiên bản và tài liệu. Trừ khỏi phần tiết kiệm trước khi so, nếu không bạn so chi phí một lần với lợi ích vĩnh viễn.",
        },
        {
          label: "Chiết khấu và cắt ở tám quý",
          detail:
            "Mỗi quý xa hơn thì phần đóng góp nhỏ đi, và không tính quá tám quý. Chọn mức chiết khấu cao khi hướng sản phẩm còn mơ hồ, thấp khi hạ tầng đã ổn định.",
        },
        {
          label: "Đọc hiệu số cho trung thực",
          detail:
            "Hiệu số dương mỏng cộng ước lượng lạc quan thì thực chất là âm. Chỉ khi hiệu số vẫn dương sau mọi bước trên thì dự án mới đáng làm.",
        },
      ],
    },
  ],

  "on-tap-quy-loi-ich-tuong-lai-ve-hien-tai": [
    {
      type: "exercise",
      language: "python",
      title: "Một lời hứa ở kỳ tám đáng giá bao nhiêu",
      task:
        "Với ba mức chiết khấu mỗi quý (5%, 15%, 20%), tính hệ số quy đổi DF = 1 / (1 + r)^n ở kỳ 4 và kỳ 8, rồi giá trị hiện tại của khoản lợi ích 10 tháng công mỗi quý trong 8 quý. In mỗi mức một dòng, làm tròn DF tới hai chữ số và PV tới một chữ số. (Số liệu minh hoạ.)",
      starter:
        'loi_ich = 10\nso_quy = 8\n\ndef df(r, n):\n    return 1 / (1 + r * n)\n\nfor r in (0.05, 0.15, 0.20):\n    pv = sum(loi_ich * df(r, n) for n in range(1, so_quy + 1))\n    print(f"r={round(r * 100)}%: kỳ 4 = {df(r, 4):.2f}, kỳ 8 = {df(r, 8):.2f}, PV = {pv:.1f}")\n',
      solution:
        'loi_ich = 10\nso_quy = 8\n\ndef df(r, n):\n    return 1 / (1 + r) ** n\n\nfor r in (0.05, 0.15, 0.20):\n    pv = sum(loi_ich * df(r, n) for n in range(1, so_quy + 1))\n    print(f"r={round(r * 100)}%: kỳ 4 = {df(r, 4):.2f}, kỳ 8 = {df(r, 8):.2f}, PV = {pv:.1f}")\n',
      expectedOutput:
        "r=5%: kỳ 4 = 0.82, kỳ 8 = 0.68, PV = 64.6\nr=15%: kỳ 4 = 0.57, kỳ 8 = 0.33, PV = 44.9\nr=20%: kỳ 4 = 0.48, kỳ 8 = 0.23, PV = 38.4",
      hints: [
        "Hệ số giảm theo cấp số nhân, không giảm đều: dùng (1 + r) mũ n, không dùng 1 + r nhân n.",
        "Ở r = 15% hệ số kỳ 8 phải ra khoảng 0,33, khớp với con số trong công thức của bài.",
      ],
    },
    {
      type: "chart",
      title: "Hệ số quy đổi tụt nhanh hơn bạn nghĩ khi mức chiết khấu tăng",
      caption:
        "Số liệu minh hoạ: đường chính là mức bạn kéo thanh trượt, hai đường còn lại cố định ở 5% và 20% mỗi quý. Ở kỳ 8, mức thấp còn khoảng hai phần ba giá trị, mức cao chỉ còn khoảng một phần năm.",
      kind: "line",
      xLabel: "Số quý tới lúc nhận lợi ích",
      yLabel: "Hệ số quy đổi (1 là nguyên giá trị)",
      x: { from: 0, to: 8, step: 1 },
      params: [{ id: "r", label: "Mức chiết khấu mỗi quý bạn chọn", min: 1, max: 30, step: 1, value: 15, unit: "%" }],
      series: [
        { label: "Mức bạn chọn", expr: "1/(1+r/100)^x" },
        { label: "Thấp, 5% mỗi quý", expr: "1/1.05^x" },
        { label: "Cao, 20% mỗi quý", expr: "1/1.2^x" },
      ],
    },
  ],
};
