import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 43. Một người viết cho một tệp.
export const P43_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Sự kiện hiếm ────────────────────────────────────────────────────────
  "trung-binh-vo-dung-voi-su-kien-hiem": [
    {
      type: "exercise",
      language: "javascript",
      title: "Kỳ vọng nhỏ không có nghĩa là sống sót",
      task: "Đội có quỹ dự phòng 200 triệu cho sự cố. Mã dưới tính kỳ vọng mỗi năm (xác suất nhân thiệt hại) cho ba rủi ro, rồi kết luận 'sống sót' bằng cách so kỳ vọng với quỹ. Đó là câu trả lời cho nhầm câu hỏi. Sửa điều kiện: tổ chức chỉ sống sót nếu mức thiệt hại của MỘT lần xảy ra không vượt quỹ.",
      starter:
        "const QUY = 200; // triệu, quỹ dự phòng\nconst ruiRo = [\n  { ten: \"Hỏng một máy\", xs: 0.5, thiet: 20 },\n  { ten: \"Mất cả trung tâm dữ liệu\", xs: 0.02, thiet: 600 },\n  { ten: \"Xoá nhầm dữ liệu\", xs: 0.1, thiet: 150 },\n];\n\nfor (const r of ruiRo) {\n  const kyVong = r.xs * r.thiet;\n  const song = kyVong <= QUY; // so sai đại lượng\n  console.log(r.ten + \": kỳ vọng \" + kyVong + \" triệu/năm, một lần tệ nhất \" + r.thiet + \" triệu - \" + (song ? \"sống sót\" : \"không sống sót\"));\n}",
      solution:
        "const QUY = 200; // triệu, quỹ dự phòng\nconst ruiRo = [\n  { ten: \"Hỏng một máy\", xs: 0.5, thiet: 20 },\n  { ten: \"Mất cả trung tâm dữ liệu\", xs: 0.02, thiet: 600 },\n  { ten: \"Xoá nhầm dữ liệu\", xs: 0.1, thiet: 150 },\n];\n\nfor (const r of ruiRo) {\n  const kyVong = r.xs * r.thiet;\n  const song = r.thiet <= QUY;\n  console.log(r.ten + \": kỳ vọng \" + kyVong + \" triệu/năm, một lần tệ nhất \" + r.thiet + \" triệu - \" + (song ? \"sống sót\" : \"không sống sót\"));\n}",
      expectedOutput:
        "Hỏng một máy: kỳ vọng 10 triệu/năm, một lần tệ nhất 20 triệu - sống sót\nMất cả trung tâm dữ liệu: kỳ vọng 12 triệu/năm, một lần tệ nhất 600 triệu - không sống sót\nXoá nhầm dữ liệu: kỳ vọng 15 triệu/năm, một lần tệ nhất 150 triệu - sống sót",
      hints: [
        "Câu hỏi 'có còn tồn tại sau đó không' liên quan tới con số xảy ra trong lần nó xảy ra, không phải con số trung bình.",
        "Đổi vế trái của phép so sánh từ kyVong sang thiệt hại của một lần.",
      ],
    },
    {
      type: "flow",
      title: "Đọc một con số rủi ro theo đúng thứ tự",
      steps: [
        {
          label: "Hỏi mức tệ nhất một lần",
          detail:
            "Lấy thiệt hại của lần xảy ra, chưa nhân với xác suất, đặt cạnh phần dự phòng đội có. Nếu nó vượt dự phòng thì câu 'có sống sót không' đã có đáp án, và mọi bước sau chỉ là chuyện chọn cách chuẩn bị.",
        },
        {
          label: "Tính kỳ vọng mỗi năm",
          detail:
            "Chỉ khi một lần xảy ra không kết thúc tổ chức thì kỳ vọng mới có nghĩa. Lúc này tần suất nhân thiệt hại cho bạn con số để so với chi phí phòng ngừa hằng năm.",
        },
        {
          label: "Kiểm giả định độc lập",
          detail:
            "Ba máy chung một nguồn điện hỏng cùng lúc chứ không hỏng lần lượt. Nếu các rủi ro trong bảng có chung nguyên nhân gốc, hãy gộp chúng thành MỘT sự kiện với thiệt hại cộng dồn trước khi tính.",
        },
        {
          label: "Ghi hai con số cạnh nhau",
          detail:
            "Trong đề xuất, mỗi rủi ro hiện cả kỳ vọng mỗi năm lẫn mức tệ nhất một lần. Người duyệt nhìn thấy cả hai nên không thể chỉ đọc con số dễ chịu hơn.",
        },
      ],
    },
  ],

  "chuyen-rui-ro-sang-ben-khac": [
    {
      type: "scenario",
      title: "Thuê hạ tầng quản lý sẵn và đọc hợp đồng",
      start: "mua",
      nodes: {
        mua: {
          text: "Đội thuê một dịch vụ cơ sở dữ liệu quản lý sẵn, phí 5 triệu mỗi tháng (số minh hoạ). Hợp đồng ghi bồi thường tối đa bằng phí đã trả trong kỳ, trong khi mất dữ liệu có thể gây thiệt hại hàng trăm triệu. Bạn làm gì với rủi ro này?",
          choices: [
            { label: "Coi điều khoản bồi thường là bảo hiểm và dừng ở đó", next: "baohiem" },
            { label: "Tự dựng toàn bộ hạ tầng để khỏi nhờ ai gánh hộ", next: "tudung" },
            { label: "Chuyển phần quy ra tiền, giữ phần còn lại cho đội", next: "su-co" },
          ],
        },
        baohiem: {
          text: "Một sự cố làm mất dữ liệu của một ngày. Khoản bồi thường nhận được chỉ bằng một tháng phí, còn khách hàng đã mất đơn và đội không có bản sao lưu riêng nào để khôi phục. Rủi ro chưa từng được xử lý, nó chỉ nằm yên ở chỗ cũ.",
          ending: "bad",
        },
        tudung: {
          text: "Ba kỹ sư mất hai quý dựng và vận hành hạ tầng riêng, trong khi tính năng chậm lại. Chi phí giảm rủi ro vượt xa khoản tiền nhờ bên khác gánh, và đội vẫn không có ai trực ngoài giờ.",
          ending: "bad",
        },
        "su-co": {
          text: "Dịch vụ ngừng sáu giờ vào buổi sáng. Phần chi phí kỹ thuật đã do nhà cung cấp lo, nhưng người dùng đang hỏi liên tục trên kênh hỗ trợ của chính bạn. Bạn trả lời thế nào?",
          choices: [
            { label: "Gửi họ sang trang trạng thái của nhà cung cấp", next: "chuyen-huong" },
            { label: "Tự báo ảnh hưởng và giờ cập nhật tiếp theo", next: "hieu-biet" },
            { label: "Im lặng chờ dịch vụ chạy lại rồi mới nói", next: "im-lang" },
          ],
        },
        "chuyen-huong": {
          text: "Người dùng nhận một đường dẫn tới trang của bên thứ ba thay vì một câu trả lời từ đội. Họ hiểu rằng không ai ở đây chịu trách nhiệm trả lời mình, và một số bỏ sang đối thủ ngay trong tuần đó.",
          ending: "bad",
        },
        "im-lang": {
          text: "Sáu giờ không có một dòng thông báo nào. Khi dịch vụ chạy lại, hàng trăm tin nhắn giận dữ đã chất đống và đội mất cả ngày chỉ để xin lỗi từng người, trong khi uy tín thì không ai hoàn lại được.",
          ending: "bad",
        },
        "hieu-biet": {
          text: "Người dùng biết chuyện gì xảy ra và biết khi nào được báo tiếp. Sau sự cố, nhà cung cấp đổi đội kỹ sư hỗ trợ, và cách hệ thống của bạn nối với dịch vụ đó chỉ còn nằm trong đầu hai người. Bạn làm gì?",
          choices: [
            { label: "Viết cách hệ thống nối với dịch vụ vào tài liệu của đội", next: "tot" },
            { label: "Tin rằng nhà cung cấp giữ đủ tài liệu thay mình", next: "mat-hieu-biet" },
          ],
        },
        "mat-hieu-biet": {
          text: "Sáu tháng sau một lỗi cấu hình xuất hiện. Người hiểu hệ thống đã chuyển đi, phía nhà cung cấp cũng có người mới, và không bên nào biết vì sao hai đầu được nối như vậy. Việc gỡ lỗi mất nhiều ngày.",
          ending: "bad",
        },
        tot: {
          text: "Đội chuyển phần chi phí quy ra tiền sang bên nhận, tự trả lời người dùng và giữ hiểu biết về hệ thống trong tài liệu của mình. Mỗi loại rủi ro nằm đúng chỗ: cái chuyển được thì đã chuyển, cái không chuyển được thì có người chịu trách nhiệm.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Gánh hộ rủi ro, giống mua bảo hiểm xe",
      intro:
        "Mua bảo hiểm xe, công ty bảo hiểm gánh hộ tiền sửa xe vì họ gộp rủi ro của hàng nghìn chủ xe. Nhưng họ không gánh hộ việc bạn trễ hẹn quan trọng, hay việc khách quen mất tin tưởng vì bạn thất hứa.",
      columns: ["Loại rủi ro", "Ví dụ đời thường", "Trong hệ thống của bạn"],
      rows: [
        ["Chuyển được", "Tiền sửa xe sau va chạm, có hoá đơn", "Chi phí quy ra tiền, có hoá đơn, bên nhận định giá được"],
        ["Chuyển một phần", "Bảo hiểm có trần, thiệt hại lớn hơn trần thì bạn tự trả", "Bồi thường gián đoạn thường chỉ bằng phí đã trả trong kỳ"],
        ["Không chuyển được", "Khách quen mất tin vì bạn thất hứa", "Uy tín với người dùng và trách nhiệm trả lời họ"],
      ],
      oneLiner: "Chuyển rủi ro là chuyển phần quy ra tiền được, còn uy tín và hiểu biết về hệ thống thì vẫn ở lại với bạn.",
    },
  ],

  "lop-bao-ve-lam-doi-hanh-vi": [
    {
      type: "exercise",
      language: "javascript",
      title: "Bắt tín hiệu của cơ chế tự khôi phục",
      task: "Một dịch vụ tự khởi động lại khi lỗi nên không ai bị đánh thức, và con số này không ai nhìn. Mã dưới in số lần khởi động lại mỗi tuần. Hãy làm cho cơ chế này để lại tín hiệu: thêm hậu tố ' - CẢNH BÁO' vào mọi tuần mà số lần đạt từ gấp đôi mức của tuần đầu trở lên.",
      starter:
        "const khoiDong = [2, 2, 3, 4, 6, 9, 14]; // mỗi phần tử là một tuần\nconst mucDau = khoiDong[0];\n\nkhoiDong.forEach((n, i) => {\n  let dong = \"Tuần \" + (i + 1) + \": \" + n + \" lần\";\n  // chưa có cảnh báo nào\n  console.log(dong);\n});",
      solution:
        "const khoiDong = [2, 2, 3, 4, 6, 9, 14]; // mỗi phần tử là một tuần\nconst mucDau = khoiDong[0];\n\nkhoiDong.forEach((n, i) => {\n  let dong = \"Tuần \" + (i + 1) + \": \" + n + \" lần\";\n  if (n >= 2 * mucDau) dong += \" - CẢNH BÁO\";\n  console.log(dong);\n});",
      expectedOutput:
        "Tuần 1: 2 lần\nTuần 2: 2 lần\nTuần 3: 3 lần\nTuần 4: 4 lần - CẢNH BÁO\nTuần 5: 6 lần - CẢNH BÁO\nTuần 6: 9 lần - CẢNH BÁO\nTuần 7: 14 lần - CẢNH BÁO",
      hints: ["Ngưỡng là hai lần mucDau, dùng so sánh >= để tuần chạm đúng ngưỡng cũng bị đánh dấu."],
    },
    {
      type: "chart",
      title: "Cơ chế tự khôi phục tăng dần mà không ai thấy",
      caption:
        "Số liệu minh hoạ: mức ban đầu và tốc độ tăng chỉ để thấy hình dạng. Hãy kéo tốc độ tăng: một con số trông vô hại ở tuần đầu vượt qua mức gấp đôi chỉ sau vài tuần, và suốt quãng đó không có tín hiệu nào.",
      kind: "line",
      xLabel: "Tuần",
      yLabel: "Số lần cơ chế tự kích hoạt",
      x: { from: 0, to: 12, step: 1 },
      params: [
        { id: "dau", label: "Số lần ở tuần đầu", min: 1, max: 5, step: 1, value: 2 },
        { id: "tang", label: "Tăng mỗi tuần", min: 0, max: 60, step: 5, value: 25, unit: "%" },
      ],
      series: [
        { label: "Số lần kích hoạt", expr: "dau * (1 + tang / 100) ^ x" },
        { label: "Gấp đôi mức đầu", expr: "dau * 2" },
      ],
    },
  ],

  "chi-phi-that-cua-viec-chuan-bi": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản nháp báo cáo kiểm tra sao lưu do AI viết",
      task: "Bấm vào các đoạn có lập luận sai về giá trị thật của một biện pháp phòng ngừa, rồi nộp.",
      segments: [
        { text: "Quý này đội đã rà soát cấu hình sao lưu: lịch chạy hằng đêm vẫn bật và tài liệu khôi phục khớp với cấu hình." },
        {
          text: "Vì cấu hình và tài liệu đều khớp nhau, có thể kết luận việc khôi phục chắc chắn chạy được khi cần.",
          error:
            "Rà soát cấu hình chỉ xác nhận các mảnh còn đó. Thứ hay hỏng là chỗ nối: khoá hết hạn, quyền bị thu hồi, bước thủ công mà người biết làm đã chuyển đi. Chỉ chạy hết đường đi thật mới chạm tới chúng.",
        },
        { text: "Bản sao lưu mới nhất có từ đêm qua, kích thước tương đương các đêm trước." },
        {
          text: "Giá trị của biện pháp bằng đúng thiệt hại nó chặn được, tức 10 tỷ, vì sao lưu đã được duyệt và dựng xong.",
          error:
            "Giá trị thật là thiệt hại chặn được nhân xác suất nó hoạt động đúng vào ngày cần. Nếu xác suất ấy là một nửa thì giá trị thật chỉ là 5 tỷ.",
        },
        {
          text: "Đề xuất: mỗi quý chạy khôi phục thử trên môi trường tách riêng, đi hết đường từ lấy bản sao lưu tới ứng dụng chạy lại, và ghi thời gian thực tế.",
        },
        {
          text: "Việc kiểm định kỳ ít tốn thời gian nên không cần xếp lịch riêng, tuần nào rảnh thì làm.",
          error:
            "Việc này không có người dùng chờ và kết quả gần như luôn là mọi thứ ổn, nên nó trôi xuống cuối hàng trong mọi tuần bận. Không có lịch cố định thì nó sẽ không được làm.",
        },
      ],
    },
    {
      type: "chart",
      title: "Giá trị thật của biện pháp phòng ngừa theo thời gian",
      caption:
        "Số liệu minh hoạ: thiệt hại chặn được và tốc độ xuống cấp chỉ để thấy hình dạng. Đường trên là con số trong đề xuất, không đổi; đường dưới giả định mỗi tháng không ai chạy thử thì xác suất hoạt động đúng giảm theo tỷ lệ bạn chọn.",
      kind: "line",
      xLabel: "Số tháng không ai chạy thử",
      yLabel: "Giá trị (tỷ)",
      x: { from: 0, to: 12, step: 1 },
      params: [
        { id: "thiet", label: "Thiệt hại chặn được", min: 1, max: 20, step: 1, value: 10, unit: " tỷ" },
        { id: "mat", label: "Xuống cấp mỗi tháng", min: 0, max: 30, step: 5, value: 10, unit: "%" },
      ],
      series: [
        { label: "Con số trong đề xuất", expr: "thiet" },
        { label: "Giá trị thật", expr: "thiet * (1 - mat / 100) ^ x" },
      ],
    },
  ],

  // ── Nhiều đội ───────────────────────────────────────────────────────────
  "ghi-nhan-tien-do-theo-phan-viec-hoan-thanh": [
    {
      type: "exercise",
      language: "javascript",
      title: "Hai cách đo tiến độ cho cùng một dự án",
      task: "Dự án có năm phần việc. Mỗi phần có hai trạng thái: mã đã viết xong, và đã chạy trên môi trường thật cho người dùng thật. Mã dưới đo tiến độ theo mã xong, nên báo 80%. Sửa dòng thứ hai để đo theo phần chạy thật, và dòng cuối để liệt kê đúng những phần chưa giao được.",
      starter:
        "const phan = [\n  { ten: \"Đăng ký\", maXong: true, chayThat: true },\n  { ten: \"Thanh toán\", maXong: true, chayThat: false },\n  { ten: \"Báo cáo\", maXong: true, chayThat: false },\n  { ten: \"Thông báo\", maXong: true, chayThat: true },\n  { ten: \"Di trú dữ liệu\", maXong: false, chayThat: false },\n];\n\nconst theoMa = phan.filter((p) => p.maXong).length;\nconsole.log(\"Theo mốc bàn giao (mã xong): \" + theoMa + \"/5 = \" + (theoMa / 5) * 100 + \"%\");\n\nconst theoThat = phan.filter((p) => p.maXong).length; // đang đếm sai trạng thái\nconsole.log(\"Theo phần chạy thật: \" + theoThat + \"/5 = \" + (theoThat / 5) * 100 + \"%\");\n\nconsole.log(\"Chưa giao được: \" + phan.filter((p) => !p.maXong).map((p) => p.ten).join(\", \"));",
      solution:
        "const phan = [\n  { ten: \"Đăng ký\", maXong: true, chayThat: true },\n  { ten: \"Thanh toán\", maXong: true, chayThat: false },\n  { ten: \"Báo cáo\", maXong: true, chayThat: false },\n  { ten: \"Thông báo\", maXong: true, chayThat: true },\n  { ten: \"Di trú dữ liệu\", maXong: false, chayThat: false },\n];\n\nconst theoMa = phan.filter((p) => p.maXong).length;\nconsole.log(\"Theo mốc bàn giao (mã xong): \" + theoMa + \"/5 = \" + (theoMa / 5) * 100 + \"%\");\n\nconst theoThat = phan.filter((p) => p.chayThat).length;\nconsole.log(\"Theo phần chạy thật: \" + theoThat + \"/5 = \" + (theoThat / 5) * 100 + \"%\");\n\nconsole.log(\"Chưa giao được: \" + phan.filter((p) => !p.chayThat).map((p) => p.ten).join(\", \"));",
      expectedOutput:
        "Theo mốc bàn giao (mã xong): 4/5 = 80%\nTheo phần chạy thật: 2/5 = 40%\nChưa giao được: Thanh toán, Báo cáo, Di trú dữ liệu",
      hints: ["Trạng thái nào mới chạm tới người dùng thật? Dùng đúng trường đó ở cả hai chỗ."],
    },
    {
      type: "flow",
      title: "Một phần việc đi từ 'viết xong' tới 'xong thật'",
      steps: [
        {
          label: "Viết xong mã",
          detail:
            "Mã chạy trên máy người viết với dữ liệu mẫu. Đây là điểm mà cách đo theo mốc bàn giao dừng lại và gọi là xong, dù chưa có rủi ro nào ở bước sau được chạm tới.",
        },
        {
          label: "Qua rà soát",
          detail:
            "Một người khác đọc mã và đồng ý. Nó bắt được lỗi logic, nhưng không bắt được chuyện cấu hình môi trường thật khác máy phát triển.",
        },
        {
          label: "Tích hợp trên môi trường thật",
          detail:
            "Phần này nối với các phần khác và với dịch vụ bên ngoài, lần đầu tiên. Lỗi quyền truy cập, định dạng dữ liệu lệch giữa hai đội và hiệu năng với dữ liệu thật thường lộ ra ở đúng bước này.",
        },
        {
          label: "Di trú và xử lý trường hợp lạ",
          detail:
            "Dữ liệu cũ phải chuyển sang, và các ca ngoài đường chính (đơn hàng huỷ giữa chừng, tài khoản trùng) phải được xử lý. Bước này không làm sớm được vì cần mọi thứ trước nó đã tồn tại.",
        },
        {
          label: "Người dùng thật chạm tới",
          detail:
            "Chỉ đến đây phần việc mới được ghi nhận là xong. Nếu mỗi phần giao được độc lập về giá trị thì tiến độ tăng đều theo từng phần, thay vì nhảy vọt ở cuối.",
        },
      ],
    },
  ],

  "chi-phi-phoi-hop-giua-nhieu-doi": [
    {
      type: "exercise",
      language: "python",
      title: "Thêm đội đến khi nào còn lợi",
      task: "Mỗi đội mang lại 10 đơn vị năng lực. Mỗi đường liên lạc giữa hai đội tốn 2 đơn vị, và số đường giữa n đội là n(n-1)/2. Mã dưới đang tính số đường bằng n nên tưởng thêm đội luôn có lợi. Sửa công thức số đường, để in được số đội cho năng lực ròng cao nhất.",
      starter:
        "NANG_LUC = 10\nCHI_PHI = 2\n\nket_qua = {}\nfor n in range(2, 9):\n    duong = n  # sai: số đường không tăng tuyến tính\n    rong = n * NANG_LUC - duong * CHI_PHI\n    ket_qua[n] = rong\n    print(f\"{n} đội: {duong} đường, năng lực ròng {rong}\")\n\ntot_nhat = max(ket_qua, key=ket_qua.get)\nprint(f\"Năng lực ròng cao nhất ở {tot_nhat} đội\")",
      solution:
        "NANG_LUC = 10\nCHI_PHI = 2\n\nket_qua = {}\nfor n in range(2, 9):\n    duong = n * (n - 1) // 2\n    rong = n * NANG_LUC - duong * CHI_PHI\n    ket_qua[n] = rong\n    print(f\"{n} đội: {duong} đường, năng lực ròng {rong}\")\n\ntot_nhat = max(ket_qua, key=ket_qua.get)\nprint(f\"Năng lực ròng cao nhất ở {tot_nhat} đội\")",
      expectedOutput:
        "2 đội: 1 đường, năng lực ròng 18\n3 đội: 3 đường, năng lực ròng 24\n4 đội: 6 đường, năng lực ròng 28\n5 đội: 10 đường, năng lực ròng 30\n6 đội: 15 đường, năng lực ròng 30\n7 đội: 21 đường, năng lực ròng 28\n8 đội: 28 đường, năng lực ròng 24\nNăng lực ròng cao nhất ở 5 đội",
      hints: ["Hai đội có 1 đường, năm đội có 10. Dùng phép chia nguyên // để ra số nguyên."],
    },
    {
      type: "chart",
      title: "Năng lực thô và năng lực sau khi trừ phối hợp",
      caption:
        "Số liệu minh hoạ: năng lực mỗi đội và chi phí mỗi đường chỉ để thấy hình dạng. Đường thô tăng thẳng; đường sau khi trừ phối hợp cong xuống vì số đường tăng theo bình phương. Kéo chi phí mỗi đường lên để thấy điểm đảo chiều đến sớm hơn.",
      kind: "line",
      xLabel: "Số đội",
      yLabel: "Năng lực (đơn vị)",
      x: { from: 1, to: 12, step: 1 },
      params: [
        { id: "nl", label: "Năng lực mỗi đội", min: 5, max: 20, step: 1, value: 10 },
        { id: "c", label: "Chi phí mỗi đường liên lạc", min: 0, max: 5, step: 0.5, value: 2 },
      ],
      series: [
        { label: "Năng lực thô", expr: "x * nl" },
        { label: "Sau khi trừ phối hợp", expr: "x * nl - c * x * (x - 1) / 2" },
      ],
    },
  ],

  "uoc-luong-goi-viec-va-do-hieu-qua-cua-doi": [
    {
      type: "exercise",
      language: "python",
      title: "Trung bình che phần đuôi",
      task: "Dưới đây là số ngày từ lúc nhận yêu cầu tới lúc tới tay người dùng của 16 hạng mục (số minh hoạ). Hoàn thành mã để in trung bình, trung vị và số hạng mục mất hơn 30 ngày. Mã hiện tại lấy phần tử giữa của danh sách CHƯA sắp xếp làm trung vị, và đếm đuôi theo ngưỡng 50 nên bỏ sót hai hạng mục.",
      starter:
        "ngay = [5, 70, 4, 6, 3, 48, 7, 9, 4, 12, 8, 35, 5, 6, 14, 10]\n\ntb = sum(ngay) / len(ngay)\ntrung_vi = ngay[len(ngay) // 2]  # chưa sắp xếp\nduoi = len([n for n in ngay if n > 50])\n\nprint(f\"Trung bình: {tb:.1f} ngày\")\nprint(f\"Trung vị: {trung_vi:.1f} ngày\")\nprint(f\"Hạng mục mất hơn 30 ngày: {duoi}\")",
      solution:
        "ngay = [5, 70, 4, 6, 3, 48, 7, 9, 4, 12, 8, 35, 5, 6, 14, 10]\n\ntb = sum(ngay) / len(ngay)\ns = sorted(ngay)\nm = len(s) // 2\ntrung_vi = (s[m - 1] + s[m]) / 2\nduoi = len([n for n in ngay if n > 30])\n\nprint(f\"Trung bình: {tb:.1f} ngày\")\nprint(f\"Trung vị: {trung_vi:.1f} ngày\")\nprint(f\"Hạng mục mất hơn 30 ngày: {duoi}\")",
      expectedOutput: "Trung bình: 15.4 ngày\nTrung vị: 7.5 ngày\nHạng mục mất hơn 30 ngày: 3",
      hints: [
        "Sắp xếp danh sách trước. Với 16 phần tử, trung vị là trung bình của hai phần tử ở giữa.",
        "Trung bình gấp đôi trung vị là dấu hiệu của một phần đuôi dài.",
      ],
    },
    {
      type: "feynman",
      title: "Mỗi chỉ số đều làm đẹp được, nên đọc nó cho đúng",
      intro:
        "Giống điểm trung bình của một lớp học: giáo viên có thể làm điểm trung bình tăng bằng cách ra đề dễ hơn, mà học sinh chẳng giỏi thêm chút nào. Con số đẹp không chứng minh điều nó nhằm đo.",
      columns: ["Chỉ số", "Cách làm đẹp mà không ai làm gì sai", "Cách đọc cho đúng"],
      rows: [
        ["Số hạng mục hoàn thành", "Chia nhỏ hạng mục ra, con số tăng ngay", "Đọc kèm thời gian từ yêu cầu tới người dùng"],
        ["Tỷ lệ đúng hạn 100%", "Ước lượng có đệm sẵn, hoặc âm thầm cắt phạm vi cho vừa hạn", "Hỏi phạm vi giao có giữ nguyên so với lúc ước lượng không"],
        ["Thời gian trung bình", "Vài hạng mục nhanh kéo trung bình xuống, che những hạng mục mất ba tháng", "Nhìn cả phân bố, và dừng ở phần đuôi"],
      ],
      oneLiner: "Chỉ số nào đội tự điều chỉnh được thì chỉ nên tin khi nó được đọc cùng một chỉ số khó làm đẹp hơn.",
    },
  ],

  // ── LLM API ─────────────────────────────────────────────────────────────
  "llm-nhin-tu-phia-api": [
    {
      type: "exercise",
      language: "javascript",
      title: "Cửa sổ trượt cho lịch sử hội thoại",
      task: "Mô hình không nhớ gì nên mỗi lượt bạn gửi lại lịch sử. Ngân sách đầu vào là 1.000 token, system prompt tốn 400. Mã dưới đang gửi lại cả 8 tin nên vượt ngân sách. Sửa để giữ các tin MỚI nhất cho tới khi hết chỗ (không được cắt đôi một tin), rồi in số tin giữ lại và tổng token vào.",
      starter:
        "const SYSTEM = 400;\nconst NGAN_SACH = 1000;\nconst tin = [120, 90, 60, 150, 80, 70, 110, 60]; // token từng tin, cũ -> mới\n\nlet giu = tin.slice(); // đang giữ tất cả\n\nconst tong = SYSTEM + giu.reduce((s, x) => s + x, 0);\nconsole.log(\"Giữ \" + giu.length + \"/\" + tin.length + \" tin, \" + tong + \" token vào\");\nconsole.log(\"Trong ngân sách: \" + (tong <= NGAN_SACH ? \"có\" : \"không\"));",
      solution:
        "const SYSTEM = 400;\nconst NGAN_SACH = 1000;\nconst tin = [120, 90, 60, 150, 80, 70, 110, 60]; // token từng tin, cũ -> mới\n\nconst giu = [];\nlet dung = SYSTEM;\nfor (let i = tin.length - 1; i >= 0; i--) {\n  if (dung + tin[i] > NGAN_SACH) break;\n  giu.unshift(tin[i]);\n  dung += tin[i];\n}\n\nconst tong = SYSTEM + giu.reduce((s, x) => s + x, 0);\nconsole.log(\"Giữ \" + giu.length + \"/\" + tin.length + \" tin, \" + tong + \" token vào\");\nconsole.log(\"Trong ngân sách: \" + (tong <= NGAN_SACH ? \"có\" : \"không\"));",
      expectedOutput: "Giữ 6/8 tin, 930 token vào\nTrong ngân sách: có",
      hints: [
        "Duyệt từ tin cuối mảng về đầu và dừng ở tin đầu tiên làm tổng vượt ngân sách.",
        "Bắt đầu bộ đếm từ SYSTEM, vì system prompt luôn được gửi.",
      ],
    },
  ],

  "cau-truc-mot-loi-goi-llm": [
    {
      type: "exercise",
      language: "javascript",
      title: "Đọc lý do dừng trước khi lưu",
      task: "Bốn phản hồi dưới đây đều có HTTP 200. Hãy in việc ứng dụng nên làm với từng phản hồi theo stop_reason: end_turn thì 'dùng kết quả', max_tokens thì 'bị cắt, không lưu', tool_use thì 'chạy công cụ rồi gọi tiếp'. Dòng cuối là tổng token của MỌI lời gọi, vì lời gọi bị cắt vẫn bị tính phí. Mã hiện tại cho phản hồi nào cũng qua và chỉ cộng token của lời gọi dùng được.",
      starter:
        "const phanHoi = [\n  { id: \"a\", stop_reason: \"end_turn\", usage: { input_tokens: 142, output_tokens: 31 } },\n  { id: \"b\", stop_reason: \"max_tokens\", usage: { input_tokens: 900, output_tokens: 500 } },\n  { id: \"c\", stop_reason: \"tool_use\", usage: { input_tokens: 300, output_tokens: 45 } },\n  { id: \"d\", stop_reason: \"end_turn\", usage: { input_tokens: 210, output_tokens: 64 } },\n];\n\nlet vao = 0;\nlet ra = 0;\nfor (const p of phanHoi) {\n  console.log(p.id + \": dùng kết quả\");\n  if (p.stop_reason === \"end_turn\") {\n    vao += p.usage.input_tokens;\n    ra += p.usage.output_tokens;\n  }\n}\nconsole.log(\"Tổng: \" + vao + \" token vào, \" + ra + \" token ra\");",
      solution:
        "const phanHoi = [\n  { id: \"a\", stop_reason: \"end_turn\", usage: { input_tokens: 142, output_tokens: 31 } },\n  { id: \"b\", stop_reason: \"max_tokens\", usage: { input_tokens: 900, output_tokens: 500 } },\n  { id: \"c\", stop_reason: \"tool_use\", usage: { input_tokens: 300, output_tokens: 45 } },\n  { id: \"d\", stop_reason: \"end_turn\", usage: { input_tokens: 210, output_tokens: 64 } },\n];\n\nconst VIEC = {\n  end_turn: \"dùng kết quả\",\n  max_tokens: \"bị cắt, không lưu\",\n  tool_use: \"chạy công cụ rồi gọi tiếp\",\n};\n\nlet vao = 0;\nlet ra = 0;\nfor (const p of phanHoi) {\n  console.log(p.id + \": \" + VIEC[p.stop_reason]);\n  vao += p.usage.input_tokens;\n  ra += p.usage.output_tokens;\n}\nconsole.log(\"Tổng: \" + vao + \" token vào, \" + ra + \" token ra\");",
      expectedOutput:
        "a: dùng kết quả\nb: bị cắt, không lưu\nc: chạy công cụ rồi gọi tiếp\nd: dùng kết quả\nTổng: 1552 token vào, 640 token ra",
      hints: ["Tra việc cần làm theo stop_reason bằng một đối tượng, và cộng usage ở mọi vòng lặp chứ không chỉ khi end_turn."],
    },
    {
      type: "flow",
      title: "Một lời gọi đi từ mã của bạn tới kết quả lưu được",
      steps: [
        {
          label: "Lắp request",
          detail:
            "Mã ghép model, max_tokens, system và mảng messages gồm toàn bộ lịch sử cộng câu hỏi mới. Đây là trí nhớ duy nhất mô hình có trong lời gọi này.",
        },
        {
          label: "Gửi qua HTTP",
          detail:
            "SDK chỉ bọc một yêu cầu HTTP gửi JSON. Mã trạng thái 200 chỉ nói yêu cầu đã được xử lý, chưa nói câu trả lời có dùng được hay không.",
        },
        {
          label: "Đọc stop_reason",
          detail:
            "end_turn thì đi tiếp. max_tokens nghĩa là đầu ra bị cắt giữa chừng và không được lưu. tool_use nghĩa là mô hình đang chờ bạn chạy một công cụ. Mỗi giá trị rẽ vào một nhánh xử lý khác nhau.",
        },
        {
          label: "Ghi usage",
          detail:
            "input_tokens và output_tokens ghi lại cho từng lời gọi, kể cả lời gọi bị cắt. Từ đây bạn tính được chi phí mỗi tính năng thay vì đoán theo hoá đơn cuối tháng.",
        },
        {
          label: "Lưu hoặc gọi tiếp",
          detail:
            "Chỉ nội dung từ nhánh end_turn mới được lưu cho người dùng. Nhánh tool_use nối kết quả công cụ vào messages rồi quay lại bước đầu với lịch sử dài hơn một chút.",
        },
      ],
    },
  ],

  "dau-ra-co-cau-truc-tu-llm": [
    {
      type: "flow",
      title: "Vòng gác cổng cho một đầu ra phân loại ticket",
      steps: [
        {
          label: "Gửi yêu cầu kèm schema",
          detail:
            "Prompt mô tả ticket cần phân loại và schema có intent, priority, summary, hoặc bạn bật chế độ đầu ra có cấu trúc của nhà cung cấp. Dù cách nào, mô hình chỉ được hứa sẽ cố gắng, chưa được tin.",
        },
        {
          label: "Parse chuỗi",
          detail:
            "Một chuỗi có thể kèm lời dẫn hay dấu ba chấm cuối. JSON.parse lỗi ở đây là lỗi rẻ nhất: chưa có dữ liệu nào chạm tới phần còn lại của hệ thống.",
        },
        {
          label: "Kiểm đủ trường",
          detail:
            "Mọi trường required phải có mặt. Thiếu priority thì dừng và báo thiếu trường nào, không điền giá trị mặc định cho trót lọt, vì mặc định biến lỗi của mô hình thành dữ liệu sai trông hợp lệ.",
        },
        {
          label: "Kiểm kiểu và miền",
          detail:
            "intent phải nằm trong tập hoan_tien, doi_hang, hoi_dap; priority phải là số nguyên từ 1 tới 3. Một intent viết đúng chính tả nhưng ngoài tập vẫn là lỗi.",
        },
        {
          label: "Gọi lại kèm lỗi cụ thể",
          detail:
            "Gửi lại cho mô hình đúng thông báo, ví dụ 'priority = 5, phải từ 1 tới 3'. Tối đa hai tới ba lần, vì mỗi lần thử là thêm độ trễ và thêm tiền.",
        },
        {
          label: "Hết lượt thì lộ lỗi",
          detail:
            "Ticket không qua được vòng kiểm vào hàng đợi người duyệt, và tỷ lệ từ chối được đếm. Lỗi hiện ra trong số liệu thay vì lặng lẽ thành một ticket sai.",
        },
      ],
    },
  ],

  "chi-phi-va-do-tre-llm": [
    {
      type: "chart",
      title: "Chi phí tháng theo độ dài đầu ra",
      caption:
        "Số liệu minh hoạ, giá giả định 3 USD mỗi triệu token vào và 15 USD mỗi triệu token ra, giống bài tập trong bài. Token ra đắt gấp năm lần nên đường dốc theo độ dài đầu ra. Đường thấp hơn là khi cắt 30% token vào của prompt.",
      kind: "line",
      xLabel: "Token ra mỗi yêu cầu",
      yLabel: "Chi phí tháng (USD)",
      x: { from: 0, to: 1000, step: 100 },
      params: [
        { id: "rpd", label: "Yêu cầu mỗi ngày", min: 1000, max: 50000, step: 1000, value: 20000 },
        { id: "vao", label: "Token vào mỗi yêu cầu", min: 200, max: 4000, step: 100, value: 1200 },
      ],
      series: [
        { label: "Prompt hiện tại", expr: "rpd * 30 * (vao * 3 + x * 15) / 1000000" },
        { label: "Cắt 30% token vào", expr: "rpd * 30 * (vao * 0.7 * 3 + x * 15) / 1000000" },
      ],
    },
  ],

  "do-tin-cay-khi-goi-llm": [
    {
      type: "flow",
      title: "Một lời gọi bị 429 đi qua các lớp bảo vệ",
      steps: [
        {
          label: "Phân loại lỗi",
          detail:
            "429 là vượt giới hạn tốc độ, đáng thử lại. Lỗi do chính yêu cầu của bạn sai thì thử lại bao nhiêu lần cũng sai, nên nhánh này dừng ngay thay vì đốt tiền.",
        },
        {
          label: "Chờ theo backoff và jitter",
          detail:
            "Chờ theo trần min(CAP, BASE × 2^k) rồi nhân hệ số ngẫu nhiên. Header Retry-After, nếu có, được ưu tiên hơn công thức. Jitter giữ cho hàng trăm client không cùng thử lại vào một giây.",
        },
        {
          label: "Giữ khoá idempotency",
          detail:
            "Mỗi thao tác logic mang một khoá cố định qua mọi lần thử. Nếu lần timeout trước thực ra đã chạy ở phía nhà cung cấp, lần thử sau không gửi email hai lần hay tạo hai ticket.",
        },
        {
          label: "Hết ngân sách thì fallback",
          detail:
            "Sau vài lần thử hoặc khi tổng thời gian chờ vượt ngưỡng người dùng chịu được, chuyển sang mô hình dự phòng. Chất lượng có thể khác, nên ghi lại và báo khi cần.",
        },
        {
          label: "Circuit breaker mở",
          detail:
            "Khi tỷ lệ lỗi vượt ngưỡng, ngừng gọi nhà cung cấp một lúc và đi thẳng đường dự phòng. Sau đó cho vài yêu cầu thử trước khi mở lại hoàn toàn, để không dồn thêm tải lên dịch vụ đang quá tải.",
        },
      ],
    },
  ],

  "chon-mo-hinh-va-nha-cung-cap-llm": [
    {
      type: "scenario",
      title: "Chọn mô hình tóm tắt hợp đồng khách hàng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đội muốn thêm tính năng tóm tắt hợp đồng khách hàng, và hợp đồng chứa thông tin nhạy cảm. Có ba mô hình ứng viên. Bước đầu tiên là gì?",
          choices: [
            { label: "Chạy thử cả ba trên hợp đồng thật của khách ngay", next: "gui-som" },
            { label: "Đọc điều khoản dữ liệu của từng gói, loại gói vi phạm", next: "do" },
            { label: "Chọn mô hình có điểm benchmark công khai cao nhất", next: "benchmark" },
          ],
        },
        "gui-som": {
          text: "Hợp đồng thật của khách đã được gửi tới ba nhà cung cấp trước khi ai đọc điều khoản về nơi xử lý và việc dùng dữ liệu. Việc đó không rút lại được, và pháp chế phải xử lý hậu quả trước cả khi tính năng ra mắt.",
          ending: "bad",
        },
        benchmark: {
          text: "Mô hình có điểm cao nhất lại tóm tắt hợp đồng tiếng Việt kém hơn hẳn một ứng viên rẻ hơn. Điểm công khai đo việc khác, trên dữ liệu khác, và đội chỉ phát hiện sau khi khách phản hồi.",
          ending: "bad",
        },
        do: {
          text: "Một ứng viên bị loại vì điều khoản dữ liệu, còn hai. Bây giờ cần so chất lượng. Bạn lấy gì làm thước đo?",
          choices: [
            { label: "Dựng vài chục hợp đồng ẩn danh kèm tóm tắt chuẩn rồi chạy cả hai", next: "lop" },
            { label: "Nhờ vài đồng nghiệp thử vài câu rồi chọn theo cảm nhận", next: "cam-nhan" },
          ],
        },
        "cam-nhan": {
          text: "Ba người thử ba câu khác nhau và mỗi người chọn một mô hình. Cuộc tranh luận kéo dài hai tuần, và mỗi khi có mô hình mới nó lại lặp lại từ đầu vì không có con số nào để dựa vào.",
          ending: "bad",
        },
        lop: {
          text: "Kết quả trên bộ ví dụ chọn ra một mô hình. Giờ là cách gọi nó trong mã: chỗ nào cũng cần tóm tắt, và thị trường sẽ đổi giá hoặc ra mô hình mới trong vài tháng tới.",
          choices: [
            { label: "Gọi SDK của nhà cung cấp trực tiếp ở mọi chỗ cần tóm tắt", next: "rai-rac" },
            { label: "Đi qua một hàm nội bộ mỏng chỉ gồm system, messages, maxTokens", next: "tot" },
          ],
        },
        "rai-rac": {
          text: "Khi giá đổi, đội muốn thử mô hình khác nhưng lời gọi và cách xử lý lỗi đã rải ở hàng chục chỗ. Việc đổi nhà cung cấp biến thành một dự án riêng, nên đội ở lại với lựa chọn cũ dù không còn tốt nhất.",
          ending: "bad",
        },
        tot: {
          text: "Ràng buộc cứng loại ứng viên trước, bộ ví dụ thật cho con số, và hàm mỏng giữ quyền chọn lại trong tay đội. Lần sau có mô hình mới, câu trả lời đến sau một lần chạy bộ ví dụ thay vì một cuộc tranh luận.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Quy trình chọn mô hình, từ danh sách dài tới quyết định",
      steps: [
        {
          label: "Liệt kê ràng buộc cứng",
          detail:
            "Nơi xử lý và lưu dữ liệu, điều khoản dùng dữ liệu để huấn luyện, và cửa sổ ngữ cảnh đủ cho đầu vào thật lớn nhất cộng đầu ra. Ứng viên vi phạm một mục là bị gạch tên, không cần đo thêm.",
        },
        {
          label: "Dựng bộ ví dụ thật",
          detail:
            "Vài chục ví dụ lấy từ dữ liệu thật (đã ẩn danh) kèm đáp án mong muốn, gồm cả các ca khó mà người dùng hay gặp. Bộ này là tài sản dùng lại cho mọi lần so sánh sau.",
        },
        {
          label: "Chạy mọi ứng viên còn lại",
          detail:
            "Cùng một prompt, cùng bộ ví dụ. Ghi chất lượng, token vào và ra mỗi lượt, và thời gian tới token đầu tiên. Prompt có thể phải chỉnh riêng cho từng mô hình, và phần chỉnh đó cũng là chi phí.",
        },
        {
          label: "Ước chi phí tháng",
          detail:
            "Nhân token trung bình đo được với giá và số yêu cầu dự kiến. Một mô hình tốt hơn vài điểm mà đắt gấp mấy lần có thể không đáng, hoặc rất đáng, tuỳ tính năng; con số cho bạn cơ sở để tranh luận.",
        },
        {
          label: "Chọn và giữ cửa quay lại",
          detail:
            "Chọn một mô hình, bọc nó sau hàm nội bộ mỏng để retry, fallback và log chi phí nằm ở một chỗ. Khi giá hay mô hình đổi, chạy lại bước ba chứ không viết lại ứng dụng.",
        },
      ],
    },
  ],

  // ── RAG ─────────────────────────────────────────────────────────────────
  "rag-vi-sao-va-luong-co-ban": [
    {
      type: "exercise",
      language: "javascript",
      title: "Khi không có đoạn đúng thì đừng gọi mô hình",
      task: "Hàm hoi chấm điểm mỗi đoạn bằng số từ của câu hỏi có mặt trong đoạn, rồi lấy k đoạn cao nhất. Mã hiện tại luôn lấy đủ k đoạn, kể cả đoạn điểm 0, và sẽ đưa chúng vào prompt. Sửa để bỏ đoạn điểm 0, và nếu không còn đoạn nào thì in rằng không có đoạn phù hợp và không gọi mô hình: khi đoạn đúng không có trong prompt, câu trả lời đúng chỉ có thể là trùng hợp.",
      starter:
        "const docs = {\n  A: \"chính sách hoàn tiền hoàn tiền trong 7 ngày kể từ ngày nhận hàng\",\n  B: \"thời gian giao hàng nội thành là 2 ngày\",\n  C: \"bảo hành điện thoại 12 tháng\",\n  D: \"hoàn thiện hồ sơ trong 3 ngày\",\n};\n\nfunction diem(q, text) {\n  const t = new Set(text.split(\" \"));\n  return q.split(\" \").filter((w) => t.has(w)).length;\n}\n\nfunction hoi(q, k) {\n  const xep = Object.entries(docs)\n    .map(([id, t]) => [id, diem(q, t)])\n    .sort((a, b) => b[1] - a[1])\n    .slice(0, k);\n  console.log(\"\\\"\" + q + \"\\\" -> \" + xep.map(([id, d]) => id + \" (\" + d + \")\").join(\", \"));\n}\n\nhoi(\"hoàn tiền trong bao lâu\", 2);\nhoi(\"cách đổi mật khẩu\", 2);",
      solution:
        "const docs = {\n  A: \"chính sách hoàn tiền hoàn tiền trong 7 ngày kể từ ngày nhận hàng\",\n  B: \"thời gian giao hàng nội thành là 2 ngày\",\n  C: \"bảo hành điện thoại 12 tháng\",\n  D: \"hoàn thiện hồ sơ trong 3 ngày\",\n};\n\nfunction diem(q, text) {\n  const t = new Set(text.split(\" \"));\n  return q.split(\" \").filter((w) => t.has(w)).length;\n}\n\nfunction hoi(q, k) {\n  const xep = Object.entries(docs)\n    .map(([id, t]) => [id, diem(q, t)])\n    .filter(([, d]) => d > 0)\n    .sort((a, b) => b[1] - a[1])\n    .slice(0, k);\n  if (xep.length === 0) {\n    console.log(\"\\\"\" + q + \"\\\" -> không có đoạn phù hợp, không gọi mô hình\");\n    return;\n  }\n  console.log(\"\\\"\" + q + \"\\\" -> \" + xep.map(([id, d]) => id + \" (\" + d + \")\").join(\", \"));\n}\n\nhoi(\"hoàn tiền trong bao lâu\", 2);\nhoi(\"cách đổi mật khẩu\", 2);",
      expectedOutput:
        "\"hoàn tiền trong bao lâu\" -> A (3), D (2)\n\"cách đổi mật khẩu\" -> không có đoạn phù hợp, không gọi mô hình",
      hints: [
        "Lọc điểm lớn hơn 0 trước khi sắp xếp và cắt k đoạn.",
        "Thêm một nhánh riêng cho trường hợp danh sách sau khi lọc rỗng, và dùng return để không in dòng thứ hai.",
      ],
    },
  ],

  "rag-chia-nho-tai-lieu-chunking": [
    {
      type: "chart",
      title: "Kích thước đoạn quyết định số lần phải tạo embedding",
      caption:
        "Số liệu minh hoạ: kích thước kho và độ chồng lấn chỉ để thấy hình dạng. Đoạn càng nhỏ thì kho càng nhiều đoạn, và chồng lấn làm số đoạn tăng thêm. Đổi kích thước hay chồng lấn nghĩa là tạo lại embedding cho toàn bộ kho.",
      kind: "line",
      xLabel: "Kích thước đoạn (token)",
      yLabel: "Số đoạn trong kho",
      x: { from: 200, to: 1000, step: 100 },
      params: [
        { id: "tong", label: "Kích thước kho", min: 100, max: 1000, step: 100, value: 500, unit: " nghìn token" },
        { id: "ov", label: "Chồng lấn", min: 0, max: 150, step: 10, value: 50, unit: " token" },
      ],
      series: [
        { label: "Có chồng lấn", expr: "ceil((tong * 1000 - ov) / (x - ov))" },
        { label: "Không chồng lấn", expr: "ceil(tong * 1000 / x)" },
      ],
    },
  ],

  "rag-embedding-va-do-tuong-dong": [
    {
      type: "feynman",
      title: "Embedding là hướng, không phải độ dài",
      intro:
        "Hình dung mỗi quán ăn là một mũi tên trên bản đồ khẩu vị: một trục là độ cay, một trục là độ ngọt, một trục là độ béo. Hai quán cùng kiểu món thì hai mũi tên chỉ cùng hướng, dù một quán lớn hơn nhiều.",
      columns: ["Khái niệm", "Ví dụ đời thường", "Trong embedding"],
      rows: [
        ["Vector", "Mũi tên gồm ba điểm số cay, ngọt, béo", "Mảng số thực vài trăm tới vài nghìn chiều cho một đoạn văn"],
        ["Cosine", "Hai quán chỉ cùng hướng khẩu vị thì giống nhau, dù một quán đông gấp mười", "Tích vô hướng chia tích độ dài, đo hướng chứ không đo độ lớn"],
        ["Chuẩn hoá", "Quy mọi mũi tên về cùng độ dài để chỉ còn so hướng", "Chia vector cho độ dài; phải áp cho cả vector câu hỏi, không chỉ cho kho"],
      ],
      oneLiner: "Embedding so hướng của hai đoạn văn, nên một vector dài không vì thế mà giống câu hỏi hơn.",
    },
  ],
};
