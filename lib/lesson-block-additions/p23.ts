import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 23. Một người viết cho một tệp.
export const P23_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "go-he-thong-cu": [
    {
      type: "exercise",
      language: "python",
      title: "Ai đang giữ hệ thống cũ sống",
      task:
        "Số liệu lưu lượng còn lại của hệ thống cũ theo từng bên gọi. Hãy in các bên còn gọi vào, từ nhiều tới ít, kèm phần trăm trên tổng lưu lượng (một chữ số thập phân). Bên đã về 0 thì bỏ qua, vì họ không còn là việc cần xử lý.",
      starter: `luu_luong = {"app-mobile": 0, "bao-cao-noi-bo": 420, "doi-tac-A": 1800, "cron-ke-toan": 35}
tong = sum(luu_luong.values())

for ben, so in luu_luong.items():
    print(f"{ben}: {so}%")
`,
      solution: `luu_luong = {"app-mobile": 0, "bao-cao-noi-bo": 420, "doi-tac-A": 1800, "cron-ke-toan": 35}
tong = sum(luu_luong.values())

for ben, so in sorted(luu_luong.items(), key=lambda kv: kv[1], reverse=True):
    if so > 0:
        print(f"{ben}: {so / tong * 100:.1f}%")
`,
      expectedOutput: "doi-tac-A: 79.8%\nbao-cao-noi-bo: 18.6%\ncron-ke-toan: 1.6%",
      hints: [
        "Con số in ra hiện là số lượt gọi chứ chưa phải phần trăm. Chia cho tong rồi nhân 100.",
        "sorted(..., key=lambda kv: kv[1], reverse=True) sắp theo lượt gọi giảm dần; thêm một điều kiện để bỏ bên bằng 0.",
      ],
    },
    {
      type: "chart",
      title: "Giữ hệ thống cũ thêm một năm nữa tốn bao nhiêu",
      caption:
        "Số liệu minh hoạ, không phải đo thật. Chi phí năm đầu quy ước là 100; mỗi năm sau tăng theo tốc độ g vì người hiểu hệ thống rời đi và nền công nghệ xa dần. Đường ngang là chi phí chuyển nốt phần còn lại một lần. Kéo g và chi phí chuyển để xem điểm hai đường cắt nhau.",
      kind: "line",
      xLabel: "Số năm tiếp tục giữ hệ thống cũ",
      yLabel: "Chi phí tích luỹ (chỉ số minh hoạ)",
      x: { from: 0, to: 5, step: 1 },
      params: [
        { id: "g", label: "Chi phí giữ lại tăng mỗi năm", min: 5, max: 50, step: 5, value: 20, unit: "%" },
        { id: "c", label: "Chi phí chuyển nốt một lần", min: 100, max: 800, step: 50, value: 300 },
      ],
      series: [
        { label: "Tổng chi phí khi tiếp tục giữ", expr: "100*((1+g/100)^(x+1)-1)/(g/100)" },
        { label: "Chuyển nốt hôm nay (một lần)", expr: "c" },
      ],
    },
  ],

  "to-chuc-phan-chieu-kien-truc": [
    {
      type: "scenario",
      title: "Muốn ba phần của sản phẩm đổi độc lập",
      start: "start",
      nodes: {
        start: {
          text: "Mười hai người cùng một đội làm sản phẩm có ba phần: thanh toán, đơn hàng và thông báo. Ai cũng sửa được mọi nơi, và các phần đang dính vào nhau. Ban lãnh đạo muốn ba phần này đổi được độc lập. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Vẽ lại mã thành ba mô-đun, đội vẫn giữ nguyên", next: "modul" },
            { label: "Chia mười hai người thành ba đội, mỗi đội một phần", next: "doi" },
            { label: "Viết quy định cấm gọi chéo, mã và đội giữ nguyên", next: "quydinh" },
          ],
        },
        modul: {
          text: "Sơ đồ mô-đun rất đẹp, nhưng vẫn cùng một nhóm người sửa cả ba. Khi có việc gấp, gọi thẳng vào bên trong nhau là cách nhanh nhất và không ai ngăn. Sáu tháng sau, ranh giới chỉ còn nằm trên sơ đồ.",
          ending: "bad",
        },
        quydinh: {
          text: "Quy định đứng được vài tuần. Tới đợt phát hành gấp đầu tiên, một người gọi chéo cho kịp hạn và được bỏ qua vì lần này khác. Kỷ luật mòn đúng lúc có việc gấp, và sau đó quy định chỉ còn là một dòng trong tài liệu.",
          ending: "bad",
        },
        doi: {
          text: "Ba đội đã lập, mỗi đội sở hữu một phần. Tuần sau đội đơn hàng cần thêm một trường dữ liệu mà phần thanh toán đang giữ. Họ làm thế nào?",
          choices: [
            { label: "Tự sửa thẳng vào mã của đội thanh toán cho nhanh", next: "thang" },
            { label: "Gửi yêu cầu qua giao diện đã thoả thuận của đội kia", next: "giaodien" },
            { label: "Hai đội họp mỗi sáng để chốt từng thay đổi nhỏ", next: "hop" },
          ],
        },
        thang: {
          text: "Thay đổi xong trong một buổi. Nhưng đội thanh toán không biết, nên tuần sau họ đổi cấu trúc và làm hỏng chỗ vừa được sửa. Ranh giới có ba đội trên giấy nhưng thực tế vẫn bị xuyên qua mỗi khi gấp.",
          ending: "bad",
        },
        hop: {
          text: "Ranh giới giữ được, nhưng mỗi thay đổi nhỏ tốn một vòng họp. Chi phí giao tiếp giữa hai đội bị trả hết bằng thời gian chờ thay vì được giảm bằng một hợp đồng rõ. Tốc độ rơi về gần mức hồi còn chung một đội.",
          ending: "bad",
        },
        giaodien: {
          text: "Đội thanh toán nhận yêu cầu, thêm trường vào giao diện của họ theo cách tương thích ngược, và đội đơn hàng dùng ngay khi bản mới ra. Hai đội không phải ngồi chung, và ranh giới được giữ bởi chính chi phí giao tiếp giữa họ.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Nhà bếp nhà hàng và hình dạng của hệ thống",
      intro:
        "Hai đầu bếp đứng cạnh nhau chỉ cần nói một câu là xong việc. Nếu bếp lạnh ở tầng một và bếp nóng ở tầng ba, họ phải đưa phiếu qua lại, và mọi món phối hợp đều chậm. Rất nhanh, nhà hàng sắp xếp công việc quanh chỗ đứng của người, không quanh thực đơn.",
      columns: ["Ở nhà bếp", "Trong tổ chức và mã", "Hệ quả với kiến trúc"],
      rows: [
        [
          "Hai đầu bếp đứng cạnh, hỏi nhau là xong",
          "Hai người cùng đội sửa hai phần mã",
          "Hai phần dễ chạm vào nhau, ranh giới mờ dần theo mỗi việc gấp",
        ],
        [
          "Bếp lạnh và bếp nóng ở hai tầng, trao đổi bằng phiếu",
          "Hai đội khác nhau, trao đổi qua hàng đợi yêu cầu",
          "Giữa hai phần có giao diện rõ vì gọi thẳng quá đắt",
        ],
        [
          "Muốn một món ra độc lập thì cho món đó một bếp riêng",
          "Muốn ba phần độc lập thì lập ba đội sở hữu chúng",
          "Ranh giới tự được giữ, không cần quy định nào cưỡng chế",
        ],
      ],
      oneLiner: "Muốn kiến trúc có hình dạng nào, hãy chia đội theo hình dạng ấy trước khi chia mã.",
    },
  ],

  "khi-nao-tach-dich-vu": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản đề xuất tách dịch vụ do AI viết",
      task:
        "Một trợ lý AI soạn bản đề xuất tách mô-đun báo cáo ra thành dịch vụ riêng. Cả mô-đun báo cáo và mô-đun đơn hàng hiện do cùng một đội bốn người sở hữu và phát hành mỗi tuần một lần. Bấm vào những câu có lập luận sai rồi nộp.",
      segments: [
        { text: "Đề xuất: tách mô-đun báo cáo ra thành một dịch vụ độc lập, với các lý do sau." },
        {
          text: "Mã của mô-đun này đã quá lớn, nên cần một ranh giới mạng để dễ quản lý.",
          error:
            "Kích thước mã giải quyết được bằng ranh giới trong cùng tiến trình. Ranh giới mạng chỉ đáng trả khi có đội riêng cần phát hành theo nhịp khác.",
        },
        {
          text: "Sau khi tách, lời gọi giữa hai bên sẽ nhanh và đáng tin như một lời gọi hàm.",
          error: "Lời gọi qua mạng có thể hỏng và chậm, nên mọi nơi gọi cần xử lý lỗi, hết thời gian chờ và thử lại.",
        },
        {
          text: "Dữ liệu báo cáo vẫn đọc chung cơ sở dữ liệu với đơn hàng, nên không cần đồng bộ gì thêm.",
          error:
            "Hai dịch vụ chung một cơ sở dữ liệu thì chưa tách thật: đổi cấu trúc một bảng vẫn kéo cả hai bên theo, và ta trả chi phí phân tán mà không được lợi ích.",
        },
        { text: "Rủi ro cần chấp nhận: màn hình báo cáo có thể chậm hơn đơn hàng vài giây vì dữ liệu chỉ nhất quán cuối cùng." },
        {
          text: "Kết luận: nên tách ngay trong quý này.",
          error:
            "Câu hỏi lọc chưa được trả lời có: chưa có đội riêng sở hữu phần báo cáo, và hai phần vẫn phát hành cùng nhịp. Chưa có lợi ích nào để đổi lấy chi phí.",
        },
      ],
    },
    {
      type: "chart",
      title: "Mỗi dịch vụ thêm vào chuỗi gọi là thêm một chỗ có thể hỏng",
      caption:
        "Số liệu minh hoạ, giả định các dịch vụ hỏng độc lập và mỗi yêu cầu phải đi qua đủ x dịch vụ nối tiếp. Độ khả dụng mỗi dịch vụ là tham số; một tháng quy ước 30 ngày.",
      kind: "line",
      xLabel: "Số dịch vụ nối tiếp trong một yêu cầu",
      yLabel: "Giờ ngừng mỗi tháng",
      x: { from: 1, to: 10, step: 1 },
      params: [{ id: "a", label: "Độ khả dụng của mỗi dịch vụ", min: 99, max: 99.99, step: 0.01, value: 99.9, unit: "%" }],
      series: [
        { label: "Chuỗi x dịch vụ", expr: "720*(1-(a/100)^x)" },
        { label: "Chỉ một dịch vụ", expr: "720*(1-a/100)" },
      ],
    },
  ],

  "on-tap-quy-mo-va-nhieu-doi": [
    {
      type: "exercise",
      language: "python",
      title: "Một thay đổi phải đi qua mấy đội",
      task:
        "Bốn câu hỏi ôn tập của chặng có câu: một thay đổi thông thường phải đi qua mấy đội? Cho biết mỗi dịch vụ do đội nào sở hữu và danh sách dịch vụ một thay đổi chạm vào. In danh sách các đội cần phối hợp theo thứ tự chữ cái, rồi số đội. Đếm số đội, không đếm số dịch vụ.",
      starter: `chu_so_huu = {"thanh-toan": "doi-A", "don-hang": "doi-B", "kho": "doi-B", "thong-bao": "doi-C"}
thay_doi = ["thanh-toan", "don-hang", "kho", "thong-bao"]

doi = [chu_so_huu[dv] for dv in thay_doi]
print("Đội cần phối hợp:", ", ".join(doi))
print("Số đội:", len(doi))
`,
      solution: `chu_so_huu = {"thanh-toan": "doi-A", "don-hang": "doi-B", "kho": "doi-B", "thong-bao": "doi-C"}
thay_doi = ["thanh-toan", "don-hang", "kho", "thong-bao"]

doi = sorted({chu_so_huu[dv] for dv in thay_doi})
print("Đội cần phối hợp:", ", ".join(doi))
print("Số đội:", len(doi))
`,
      expectedOutput: "Đội cần phối hợp: doi-A, doi-B, doi-C\nSố đội: 3",
      hints: [
        "Danh sách hiện có đội trùng nhau vì doi-B sở hữu hai dịch vụ. Một đội chỉ cần được tính một lần.",
        "Một tập hợp (set) loại trùng; sorted() cho thứ tự chữ cái.",
      ],
    },
    {
      type: "chart",
      title: "Giao tiếp tăng theo bình phương, nên phải chia đội",
      caption:
        "Số liệu minh hoạ. Số cặp người có thể cần trao đổi là n(n-1)/2 khi mọi người chung một nhóm. Khi chia đội k người mỗi đội, trong đội trao đổi tự do và chỉ mỗi đội cử một người đại diện nói chuyện với các đội khác. Đó là mô hình đơn giản hoá, không đo từ một công ty thật.",
      kind: "line",
      xLabel: "Tổng số người",
      yLabel: "Số cặp có thể phải trao đổi",
      x: { from: 8, to: 48, step: 4 },
      params: [{ id: "k", label: "Số người mỗi đội", min: 3, max: 8, step: 1, value: 5, unit: " người" }],
      series: [
        { label: "Tất cả chung một nhóm", expr: "x*(x-1)/2" },
        { label: "Chia đội, mỗi đội một đại diện", expr: "x*(k-1)/2+(x/k)*(x/k-1)/2" },
      ],
    },
  ],

  "mo-hinh-moi-de-doa": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp thứ tự rủi ro theo khả năng nhân thiệt hại",
      task:
        "Nửa trang mô hình mối đe doạ có bốn rủi ro, mỗi rủi ro chấm khả năng xảy ra và thiệt hại nếu xảy ra, đều thang 1 đến 5 (số chấm là minh hoạ). Hãy in ba rủi ro đáng làm trước, xếp theo điểm = khả năng × thiệt hại giảm dần, kèm điểm. Xếp chỉ theo thiệt hại sẽ đưa kẻ tấn công hiếm lên đầu.",
      starter: `rui_ro = [
    ("máy quét thử mật khẩu mặc định", 5, 4),
    ("kẻ nhắm riêng vào bạn lấy cơ sở dữ liệu", 1, 5),
    ("lộ thông tin qua nhật ký", 2, 3),
    ("lỗ hổng trong thư viện đã công bố", 3, 5),
]

xep = sorted(rui_ro, key=lambda r: r[2], reverse=True)
for i, (ten, kn, tn) in enumerate(xep[:3], 1):
    print(f"{i}. {ten} ({tn})")
`,
      solution: `rui_ro = [
    ("máy quét thử mật khẩu mặc định", 5, 4),
    ("kẻ nhắm riêng vào bạn lấy cơ sở dữ liệu", 1, 5),
    ("lộ thông tin qua nhật ký", 2, 3),
    ("lỗ hổng trong thư viện đã công bố", 3, 5),
]

xep = sorted(rui_ro, key=lambda r: r[1] * r[2], reverse=True)
for i, (ten, kn, tn) in enumerate(xep[:3], 1):
    print(f"{i}. {ten} ({kn * tn})")
`,
      expectedOutput:
        "1. máy quét thử mật khẩu mặc định (20)\n2. lỗ hổng trong thư viện đã công bố (15)\n3. lộ thông tin qua nhật ký (6)",
      hints: [
        "Khoá sắp xếp hiện chỉ là thiệt hại. Điểm cần cả hai thành phần nhân với nhau.",
        "Số in ra trong ngoặc cũng phải là điểm, không phải thiệt hại.",
      ],
    },
    {
      type: "flow",
      title: "Từ nửa trang ghi chú tới ba việc làm trước",
      steps: [
        {
          label: "Liệt kê tài sản",
          detail:
            "Với một ứng dụng đặt lịch: hồ sơ khách hàng, tài khoản quản trị, khả năng gửi thông báo thay mặt cửa hàng. Cạnh mỗi dòng ghi một câu: nếu mất thì ai chịu thiệt và ra sao.",
        },
        {
          label: "Gọi tên kẻ tấn công có thật",
          detail:
            "Máy quét chạy khắp Internet thử mật khẩu mặc định và lỗ hổng đã công bố, nhân viên cũ còn tài khoản, kẻ nhắm riêng vào bạn. Ghi bên cạnh mỗi loại họ sẵn sàng bỏ bao nhiêu công sức, vì đó là thứ quyết định biện pháp nào có ý nghĩa.",
        },
        {
          label: "Vẽ các đường vào",
          detail:
            "Biểu mẫu đăng nhập, API công khai, chỗ tải ảnh lên, thư viện bên thứ ba. Với mỗi đường vào, nối tới tài sản mà nó chạm được. Đường vào không nối tới tài sản nào thì tạm xếp sau.",
        },
        {
          label: "Chấm khả năng nhân thiệt hại",
          detail:
            "Mỗi cặp đường vào và tài sản nhận hai con số. Mật khẩu mặc định bị máy quét thử có khả năng cao; kẻ nhắm riêng vào bạn khả năng thấp dù thiệt hại có thể lớn ngang. Nhân hai con số lại và xếp giảm dần.",
        },
        {
          label: "Chọn ba việc đầu và dồn nhiều lớp vào đó",
          detail:
            "Ba dòng điểm cao nhất nhận biện pháp trước, mỗi dòng nhiều hơn một lớp. Các dòng thấp nhận ít hơn, có chủ ý. Bảo vệ đều nhau nghĩa là chỗ quan trọng nhất chỉ có một lớp mỏng.",
        },
      ],
    },
  ],

  "xac-thuc-va-mat-khau": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Chính sách mật khẩu do AI soạn",
      task:
        "Một trợ lý AI soạn chính sách mật khẩu cho hệ thống nội bộ, và nó pha lời khuyên cũ lẫn mới. Bấm vào những câu mà hướng dẫn hiện nay không còn ủng hộ hoặc dựa trên một giả định sai, rồi nộp.",
      segments: [
        { text: "Chính sách mật khẩu đề xuất cho hệ thống nội bộ:" },
        {
          text: "Bắt buộc có chữ hoa, số và ký tự đặc biệt để mật khẩu đủ mạnh.",
          error:
            "Quy tắc thành phần đã bị rút lại: người dùng đáp ứng bằng mẫu dễ đoán như Matkhau1!. Độ dài mới là thứ tạo ra sức mạnh.",
        },
        { text: "Cho phép mật khẩu từ 12 ký tự trở lên và không đặt giới hạn tối đa, để người dùng có thể dùng cả một cụm từ dài." },
        {
          text: "Bắt đổi mật khẩu mỗi ba tháng để rút ngắn thời gian một mật khẩu bị lộ còn dùng được.",
          error:
            "Đổi định kỳ khiến người dùng đổi tối thiểu, thường tăng con số cuối lên một, nên ai biết mật khẩu cũ đoán được mật khẩu mới. Chỉ bắt đổi khi có dấu hiệu lộ.",
        },
        {
          text: "Khoá tài khoản sau năm lần nhập sai là đủ để chặn kẻ dùng danh sách mật khẩu rò rỉ từ nơi khác.",
          error:
            "Mỗi tài khoản trong danh sách rò rỉ chỉ cần đúng một lần thử vì cặp email và mật khẩu đã có sẵn. Không bao giờ chạm tới ngưỡng năm lần sai.",
        },
        { text: "Khuyến khích bật yếu tố xác thực thứ hai, ưu tiên cho tài khoản quản trị." },
      ],
    },
    {
      type: "flow",
      title: "Một vụ rò rỉ ở nơi khác tới tài khoản của bạn thế nào",
      steps: [
        {
          label: "Một dịch vụ khác bị lộ danh sách",
          detail:
            "Danh sách thư điện tử kèm mật khẩu của dịch vụ ấy bị công bố. Dịch vụ của bạn không liên quan gì, và không hề có cảnh báo nào.",
        },
        {
          label: "Máy tự động nạp danh sách",
          detail:
            "Một chương trình lấy từng cặp email và mật khẩu rồi thử trên hàng nghìn dịch vụ khác, trong đó có trang đăng nhập của bạn. Không cần đoán gì cả: người dùng dùng lại mật khẩu ở nhiều nơi.",
        },
        {
          label: "Mỗi tài khoản chỉ một lần thử",
          detail:
            "Cặp được thử là cặp đúng hoặc sai ngay lần đầu, nên bộ đếm sai năm lần không bao giờ kích hoạt. Khoá tài khoản chặn kẻ đoán, không chặn kẻ đã biết đáp án.",
        },
        {
          label: "Vài phần trăm trùng nghĩa là rất nhiều tài khoản",
          detail:
            "Tỷ lệ trùng chỉ vài phần trăm, nhưng nhân với hàng triệu bản ghi thì ra hàng nghìn tài khoản vào được. Trong nhật ký, mỗi lần vào trông như một lần đăng nhập thành công bình thường.",
        },
        {
          label: "Chỗ cắt được vòng này",
          detail:
            "Yếu tố thứ hai làm mật khẩu đúng chưa đủ để vào. Mật khẩu dài khó trùng với thứ người dùng dùng ở nơi khác hơn, và buộc đổi khi có dấu hiệu lộ thay cho đổi định kỳ.",
        },
      ],
    },
  ],

  "phien-dang-nhap-va-ma-thong-bao": [
    {
      type: "scenario",
      title: "Tài khoản quản trị bị chiếm lúc ba giờ sáng",
      start: "start",
      nodes: {
        start: {
          text: "Nhật ký cho thấy tài khoản quản trị vừa đăng nhập từ một địa chỉ lạ và đang mở danh sách khách hàng. Bạn chỉ có vài phút. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Đổi mật khẩu tài khoản đó rồi theo dõi tiếp", next: "matkhau" },
            { label: "Huỷ ngay mọi phiên đang mở của tài khoản đó", next: "huy" },
            { label: "Tắt cả hệ thống cho tới sáng để chắc chắn", next: "tat" },
          ],
        },
        matkhau: {
          text: "Mật khẩu đã đổi, nhưng kẻ tấn công đang giữ một mã phiên còn hạn và nó không bị ảnh hưởng. Họ tiếp tục xuất danh sách khách hàng cho tới khi mã hết hạn. Đổi mật khẩu không cắt quyền truy cập của phiên có sẵn.",
          ending: "bad",
        },
        tat: {
          text: "Toàn bộ khách hàng thật mất dịch vụ suốt đêm. Và vì chưa phiên nào bị huỷ, lúc mở lại hệ thống kẻ tấn công vẫn dùng mã cũ để vào tiếp.",
          ending: "bad",
        },
        huy: {
          text: "Kẻ tấn công bị văng ra ngay. Nhưng bạn chưa biết họ vào bằng cách nào, và người quản trị thật cũng đang chờ để làm việc. Bước tiếp theo?",
          choices: [
            { label: "Cho người quản trị đăng nhập lại ngay bằng mật khẩu cũ", next: "cu" },
            { label: "Đổi mật khẩu, bắt thêm yếu tố thứ hai, rà nhật ký phiên", next: "ra" },
            { label: "Coi như xong vì kẻ tấn công đã bị văng ra", next: "xong" },
          ],
        },
        cu: {
          text: "Nếu mật khẩu chính là thứ bị lộ thì kẻ tấn công vào lại bằng nó chỉ sau vài phút, và lần này họ có phiên mới hoàn toàn hợp lệ.",
          ending: "bad",
        },
        xong: {
          text: "Không ai biết họ đã đọc những gì và vào bằng đường nào. Đường vào vẫn mở, nên ba ngày sau cùng một tài khoản lại đăng nhập từ nơi lạ.",
          ending: "bad",
        },
        ra: {
          text: "Phiên cũ đã mất hiệu lực, mật khẩu mới cùng yếu tố thứ hai chặn đường vào, và nhật ký phiên cho biết kẻ tấn công đã xem những trang nào. Bạn cắt được quyền truy cập và biết được phạm vi ảnh hưởng.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Vòng đời của một phiên đăng nhập",
      steps: [
        {
          label: "Đăng nhập thành công",
          detail:
            "Mật khẩu và yếu tố thứ hai được kiểm một lần. Đây là lúc duy nhất người dùng đưa bí mật thứ nhất qua đường mạng.",
        },
        {
          label: "Cấp một mã phiên hoàn toàn mới",
          detail:
            "Hệ thống tạo mã mới ngay sau đăng nhập, không dùng lại mã có từ trước. Nếu ai đó đã đặt sẵn một mã vào trình duyệt của nạn nhân, mã ấy không mang theo quyền mới.",
        },
        {
          label: "Gắn cờ bảo vệ vào cookie",
          detail:
            "Cờ chống đọc bằng kịch bản chặn mã bị đọc qua trang, cờ chỉ gửi qua kết nối an toàn chặn mã đi trên đường không mã hoá.",
        },
        {
          label: "Mỗi yêu cầu mang mã đi theo",
          detail:
            "Mã đi qua mạng hàng nghìn lần thay vì một lần. Máy chủ tra mã trong kho phiên: còn hạn không, đã bị huỷ chưa. Bí mật thứ hai này có quyền ngang mật khẩu.",
        },
        {
          label: "Thao tác nhạy cảm đòi kiểm lại",
          detail:
            "Đổi email hay xoá tài khoản chỉ chấp nhận khi phiên còn rất mới hoặc người dùng xác nhận lại. Hạn ngắn hơn cho việc nguy hiểm hơn.",
        },
        {
          label: "Kết thúc: hết hạn hoặc bị huỷ ngay",
          detail:
            "Phiên hết hạn tự nhiên, hoặc huỷ chủ động ngay lập tức một phiên cụ thể. Khi nghi ngờ bị chiếm, huỷ toàn bộ phiên mới là bước cắt quyền truy cập; chỉ đổi mật khẩu thì chưa.",
        },
      ],
    },
  ],

  "luu-mat-khau-dung-cach": [
    {
      type: "exercise",
      language: "python",
      title: "Muối riêng từng người",
      task:
        "Hàm bam đang băm mật khẩu mà bỏ qua muối, nên hai người cùng mật khẩu có hai giá trị băm giống hệt, và một bảng tính trước phá được cả hai. Sửa để muối được trộn vào trước khi băm. Bài này chỉ để thấy tác dụng của muối; hệ thống thật dùng thư viện chuyên cho mật khẩu, không tự ghép như thế này.",
      starter: `import hashlib

def bam(mat_khau, muoi):
    return hashlib.sha256(mat_khau.encode()).hexdigest()

def xac_nhan(mat_khau, muoi, da_luu):
    return bam(mat_khau, muoi) == da_luu

muoi_an, muoi_binh = "s1x9", "q7m2"
luu_an = bam("hoa-sen-2024", muoi_an)
luu_binh = bam("hoa-sen-2024", muoi_binh)

print("Hai người cùng mật khẩu, băm giống nhau:", luu_an == luu_binh)
print("An đăng nhập đúng:", xac_nhan("hoa-sen-2024", muoi_an, luu_an))
print("Dùng muối của Bình cho An:", xac_nhan("hoa-sen-2024", muoi_binh, luu_an))
`,
      solution: `import hashlib

def bam(mat_khau, muoi):
    return hashlib.sha256((muoi + mat_khau).encode()).hexdigest()

def xac_nhan(mat_khau, muoi, da_luu):
    return bam(mat_khau, muoi) == da_luu

muoi_an, muoi_binh = "s1x9", "q7m2"
luu_an = bam("hoa-sen-2024", muoi_an)
luu_binh = bam("hoa-sen-2024", muoi_binh)

print("Hai người cùng mật khẩu, băm giống nhau:", luu_an == luu_binh)
print("An đăng nhập đúng:", xac_nhan("hoa-sen-2024", muoi_an, luu_an))
print("Dùng muối của Bình cho An:", xac_nhan("hoa-sen-2024", muoi_binh, luu_an))
`,
      expectedOutput:
        "Hai người cùng mật khẩu, băm giống nhau: False\nAn đăng nhập đúng: True\nDùng muối của Bình cho An: False",
      hints: [
        "Tham số muoi nhận vào nhưng không dùng. Ghép nó với mật khẩu trước khi gọi encode().",
        "Cả bam và xac_nhan đều dùng cùng một hàm bam, nên sửa một chỗ là đủ.",
      ],
    },
    {
      type: "chart",
      title: "Chậm có chủ đích: một lần kiểm tra tốn bao lâu thì kẻ dò mất bao lâu",
      caption:
        "Số liệu minh hoạ để thấy quy luật, không phải đo trên phần cứng thật. Giả định kẻ tấn công cần thử một tỷ khả năng và có n máy chạy song song, mỗi lần kiểm tra mất x mili giây.",
      kind: "line",
      xLabel: "Thời gian một lần kiểm tra (mili giây)",
      yLabel: "Số ngày để dò một tỷ khả năng",
      x: { from: 10, to: 100, step: 10 },
      params: [{ id: "n", label: "Số máy kẻ tấn công chạy song song", min: 1, max: 1000, step: 1, value: 100, unit: " máy" }],
      series: [
        { label: "Băm chậm có chủ đích", expr: "11.574*x/n" },
        { label: "Băm nhanh (0,001 ms mỗi lần)", expr: "0.011574/n" },
      ],
    },
  ],

  "phan-quyen-chi-tiet": [
    {
      type: "exercise",
      language: "python",
      title: "Vai trò đúng chưa đủ, bản ghi cũng phải của người đó",
      task:
        "Hàm duoc_xem đang chỉ kiểm vai trò, nên An (vai khách) xem được đơn hàng 102 của Bình. Sửa để cả hai câu hỏi cùng đúng mới cho xem: vai trò là khách, và đơn hàng thuộc về chính người đang hỏi. Mã đơn không tồn tại phải bị từ chối (mặc định là từ chối).",
      starter: `don_hang = {101: "an", 102: "binh", 103: "an"}

def duoc_xem(nguoi, vai_tro, ma):
    return vai_tro == "khach"

for nguoi, ma in [("an", 101), ("an", 102), ("binh", 102), ("an", 999)]:
    print(nguoi, ma, duoc_xem(nguoi, "khach", ma))
`,
      solution: `don_hang = {101: "an", 102: "binh", 103: "an"}

def duoc_xem(nguoi, vai_tro, ma):
    return vai_tro == "khach" and don_hang.get(ma) == nguoi

for nguoi, ma in [("an", 101), ("an", 102), ("binh", 102), ("an", 999)]:
    print(nguoi, ma, duoc_xem(nguoi, "khach", ma))
`,
      expectedOutput: "an 101 True\nan 102 False\nbinh 102 True\nan 999 False",
      hints: [
        "don_hang cho biết mỗi mã đơn thuộc về ai. So người đang hỏi với chủ của đơn.",
        "don_hang.get(ma) trả về None khi mã không có, và None không bằng tên ai cả, nên mặc định bị từ chối.",
      ],
    },
    {
      type: "flow",
      title: "Một yêu cầu xem đơn hàng đi qua hai câu hỏi",
      steps: [
        {
          label: "Yêu cầu tới",
          detail: "GET /don-hang/102, kèm cookie phiên của An. Mã 102 nằm ngay trong đường dẫn, và An có thể tự sửa thành bất kỳ số nào.",
        },
        {
          label: "Xác định An là ai",
          detail: "Máy chủ tra phiên và biết đây là An, vai khách. Danh tính lấy từ phiên chứ không lấy từ thứ An gửi trong yêu cầu.",
        },
        {
          label: "Câu hỏi một: vai khách có được xem đơn hàng không",
          detail: "Có. Nếu hệ thống dừng ở đây, mọi khách đều đọc được đơn của mọi khách, và lỗi này không báo gì vì mọi thứ đều chạy trơn tru.",
        },
        {
          label: "Câu hỏi hai: đơn 102 có thuộc về An không",
          detail: "Tra bản ghi: đơn 102 là của Bình. Quan hệ phụ thuộc dữ liệu nên phải kiểm ở từng lần gọi, không thể gói vào vai trò.",
        },
        {
          label: "Không khớp quy tắc nào thì từ chối",
          detail: "Mã không tồn tại hoặc trường hợp chưa có quy tắc cũng rơi về từ chối. Lỗi kiểu này hiện ra thành phàn nàn khó chịu nhưng thấy ngay, không âm thầm làm lộ dữ liệu.",
        },
      ],
    },
  ],

  "ma-hoa-du-lieu-nam-yen": [
    {
      type: "scenario",
      title: "Chỉ đủ ngân sách cho một lớp mã hoá",
      start: "start",
      nodes: {
        start: {
          text: "Cơ sở dữ liệu hồ sơ khách hàng có bản sao lưu hằng đêm đẩy sang một kho lưu trữ khác. Mối lo lớn nhất của đội là một bản sao lưu bị lộ hoặc bị sao chép ra ngoài. Ngân sách chỉ đủ một lớp mã hoá. Bạn chọn gì?",
          choices: [
            { label: "Mã hoá toàn ổ đĩa của máy chủ cơ sở dữ liệu", next: "odia" },
            { label: "Mã hoá riêng các cột nhạy cảm như số điện thoại", next: "cot" },
            { label: "Bỏ mã hoá, chỉ xoá bản sao lưu cũ sớm hơn", next: "xoa" },
          ],
        },
        odia: {
          text: "Ổ đĩa được mã hoá, nhưng khi máy đang chạy thì ổ đã mở khoá. Bản sao lưu được xuất ra qua cơ sở dữ liệu đang chạy nên tệp sao lưu là tệp đọc được. Khi kho lưu trữ bị lộ, toàn bộ hồ sơ khách hàng đọc được ngay.",
          ending: "bad",
        },
        xoa: {
          text: "Số bản sao lưu còn lại ít hơn, nhưng bản nào bị lộ vẫn đọc được nguyên vẹn. Đội còn mất khả năng khôi phục về mốc thời gian cũ khi cần, mà không giảm được thiệt hại khi lộ.",
          ending: "bad",
        },
        cot: {
          text: "Các cột nhạy cảm đã mã hoá nên bản sao lưu chỉ chứa dữ liệu ở dạng mã. Giờ phải quyết định khoá nằm ở đâu, vì mã hoá chỉ chuyển bài toán sang bảo vệ khoá.",
          choices: [
            { label: "Để khoá trong tệp cấu hình đi kèm bản sao lưu", next: "cung" },
            { label: "Để khoá trong một bảng riêng của chính cơ sở dữ liệu", next: "bang" },
            { label: "Để khoá trong kho khoá riêng, tách khỏi nơi chứa bản sao lưu", next: "tach" },
          ],
        },
        cung: {
          text: "Bản sao lưu lộ thì khoá lộ cùng lúc. Việc lấy được dữ liệu và việc lấy được khoá là một kịch bản duy nhất, nên lớp mã hoá không thêm được gì.",
          ending: "bad",
        },
        bang: {
          text: "Bảng khoá nằm trong cùng cơ sở dữ liệu nên đi vào cùng bản sao lưu. Kẻ có bản sao có luôn cả dữ liệu mã hoá lẫn khoá giải mã.",
          ending: "bad",
        },
        tach: {
          text: "Một bản sao lưu bị lộ chỉ chứa dữ liệu ở dạng mã. Để đọc được, kẻ tấn công phải làm thêm một vụ xâm nhập nữa vào kho khoá, tức hai kịch bản độc lập thay vì một.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Ba lớp mã hoá là ba kiểu khoá cho ba kiểu trộm",
      intro:
        "Một cửa hàng trang sức có thể khoá cửa kho khi đóng cửa, khoá riêng từng hộp trang sức, hoặc nhận hàng đã niêm phong từ xưởng. Mỗi cách chặn một kiểu trộm, và không cách nào chặn được kẻ đã có chìa khoá.",
      columns: ["Kịch bản mất dữ liệu", "Lớp mã hoá chặn được", "Điều lớp đó không làm được"],
      rows: [
        [
          "Ổ cứng bị lấy khi máy đã tắt",
          "Mã hoá toàn ổ đĩa",
          "Không giúp gì khi máy đang chạy, vì ổ đã mở khoá",
        ],
        [
          "Bản sao cơ sở dữ liệu bị chép ra ngoài",
          "Mã hoá theo cột hoặc trường",
          "Cột đó mất khả năng tìm kiếm và sắp xếp",
        ],
        [
          "Kẻ đọc được thẳng nơi lưu trữ",
          "Mã hoá ở tầng ứng dụng, dữ liệu vào kho đã là dạng mã",
          "Phức tạp nhất để vận hành, và vô nghĩa nếu khoá nằm cùng chỗ",
        ],
      ],
      oneLiner: "Nêu tên kịch bản mất dữ liệu trước khi chọn lớp mã hoá, rồi hỏi: khoá nằm ở đâu?",
    },
  ],

  "quan-ly-khoa-ma-hoa": [
    {
      type: "exercise",
      language: "python",
      title: "Số phiên bản khoá giúp xoay vòng không phải đập đi làm lại",
      task:
        "Hệ thống vừa xoay vòng khoá từ phiên bản 1 sang phiên bản 2, nhưng hàm giải mã luôn dùng khoá mới nhất nên bản ghi cũ ra chữ vô nghĩa. Mỗi bản ghi mang số phiên bản khoá đã dùng để mã hoá. Sửa để giải mã bằng đúng phiên bản của từng bản ghi, rồi đếm các bản ghi còn dùng khoá cũ, vì chúng là việc phải mã hoá lại. (Mã hoá ở đây là phép dịch chữ cái đồ chơi, chỉ để minh hoạ.)",
      starter: `KHOA = {1: 3, 2: 7}
HIEN_TAI = 2

def dich(chu, k):
    return "".join(chr((ord(c) - 97 + k) % 26 + 97) if c.isalpha() else c for c in chu)

ban_ghi = [
    {"v": 1, "du_lieu": "krs grqj dq"},
    {"v": 2, "du_lieu": "ovw kvun ipuo"},
]

for b in ban_ghi:
    print(dich(b["du_lieu"], -KHOA[HIEN_TAI]))
print("Cần mã hoá lại:", 0)
`,
      solution: `KHOA = {1: 3, 2: 7}
HIEN_TAI = 2

def dich(chu, k):
    return "".join(chr((ord(c) - 97 + k) % 26 + 97) if c.isalpha() else c for c in chu)

ban_ghi = [
    {"v": 1, "du_lieu": "krs grqj dq"},
    {"v": 2, "du_lieu": "ovw kvun ipuo"},
]

for b in ban_ghi:
    print(dich(b["du_lieu"], -KHOA[b["v"]]))
print("Cần mã hoá lại:", sum(1 for b in ban_ghi if b["v"] != HIEN_TAI))
`,
      expectedOutput: "hop dong an\nhop dong binh\nCần mã hoá lại: 1",
      hints: [
        "Mỗi bản ghi tự cho biết khoá nào đã mã hoá nó trong b[\"v\"]. Tra khoá theo số đó, đừng dùng HIEN_TAI.",
        "Số cần mã hoá lại là số bản ghi có phiên bản khác HIEN_TAI.",
      ],
    },
    {
      type: "flow",
      title: "Xoay vòng khoá mà không phải dừng hệ thống",
      steps: [
        {
          label: "Tạo khoá phiên bản 2, giữ nguyên phiên bản 1",
          detail:
            "Cả hai cùng nằm trong kho khoá chuyên dụng, mỗi khoá có số phiên bản. Khoá 1 chưa bị xoá vì còn dữ liệu cần nó để đọc.",
        },
        {
          label: "Ghi mới bằng phiên bản 2",
          detail:
            "Từ lúc này mọi bản ghi mới mang nhãn v2. Dữ liệu cũ không bị đụng tới, nên không có thời điểm nào hệ thống phải ngừng.",
        },
        {
          label: "Đọc theo nhãn phiên bản của chính bản ghi",
          detail:
            "Bản ghi v1 giải mã bằng khoá 1, bản ghi v2 bằng khoá 2. Nhờ số phiên bản được gắn vào dữ liệu từ đầu, việc xoay vòng chỉ là thêm một khoá chứ không phải một dự án di dữ liệu.",
        },
        {
          label: "Mã hoá lại dần dần ở nền",
          detail:
            "Một tiến trình nền đọc từng bản ghi v1, giải mã, mã hoá bằng khoá 2 rồi ghi lại. Có thể chạy chậm vào giờ vắng người, và có thể dừng giữa chừng mà không hỏng gì.",
        },
        {
          label: "Huỷ khoá 1 khi không còn bản ghi v1",
          detail:
            "Đếm bản ghi còn nhãn v1 bằng 0 rồi mới huỷ khoá cũ, và giữ một bản sao có kiểm soát nếu bản sao lưu cũ có thể cần khôi phục. Huỷ sớm là mất dữ liệu vĩnh viễn.",
        },
      ],
    },
  ],

  "tiem-lenh": [
    {
      type: "exercise",
      language: "python",
      title: "Truyền tham số thay vì ghép chuỗi",
      task:
        "Hàm tim ghép tên người dùng thẳng vào câu truy vấn. Với tên x' OR '1'='1 nó trả về cả bảng thay vì không ai. Sửa để câu lệnh có cấu trúc cố định và tên chỉ là giá trị, rồi chạy lại cả hai lần gọi.",
      starter: `import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE nguoi_dung (ten TEXT, vai_tro TEXT)")
db.executemany("INSERT INTO nguoi_dung VALUES (?, ?)", [("an", "khach"), ("binh", "admin")])

def tim(ten):
    sql = "SELECT ten, vai_tro FROM nguoi_dung WHERE ten = '" + ten + "'"
    return db.execute(sql).fetchall()

print(tim("an"))
print(tim("x' OR '1'='1"))
`,
      solution: `import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE nguoi_dung (ten TEXT, vai_tro TEXT)")
db.executemany("INSERT INTO nguoi_dung VALUES (?, ?)", [("an", "khach"), ("binh", "admin")])

def tim(ten):
    sql = "SELECT ten, vai_tro FROM nguoi_dung WHERE ten = ?"
    return db.execute(sql, (ten,)).fetchall()

print(tim("an"))
print(tim("x' OR '1'='1"))
`,
      expectedOutput: "[('an', 'khach')]\n[]",
      hints: [
        "Dấu nháy trong tên đóng chuỗi sớm, phần còn lại của tên trở thành điều kiện của câu lệnh. Cấu trúc câu lệnh phải cố định trước khi dữ liệu xuất hiện.",
        "Dùng ? làm chỗ trống và đưa tên vào tham số thứ hai của execute, dưới dạng một bộ: (ten,).",
      ],
    },
    {
      type: "feynman",
      title: "Phiếu yêu cầu ở phòng lưu trữ",
      intro:
        "Bạn đưa thủ kho một phiếu mẫu in sẵn: Lấy hồ sơ của ______. Người điền chỉ được ghi tên vào chỗ trống. Nếu thay vì thế bạn cho họ viết lại cả dòng, họ có thể ghi tên rồi thêm một yêu cầu khác, và thủ kho đọc tất cả như một lệnh.",
      columns: ["Ở phòng lưu trữ", "Trong truy vấn", "Kết quả với dữ liệu lạ"],
      rows: [
        [
          "Phiếu mẫu in sẵn, người điền chỉ ghi được một cái tên",
          "Truy vấn tham số: cấu trúc cố định, dữ liệu là giá trị",
          "Chuỗi lạ chỉ là một cái tên không tồn tại, trả về rỗng",
        ],
        [
          "Cho người khác viết lại cả dòng yêu cầu",
          "Ghép chuỗi: dữ liệu nằm cùng chuỗi với lệnh",
          "Dấu nháy trong dữ liệu đóng giá trị sớm, phần sau thành lệnh",
        ],
        [
          "Dán danh sách chữ cấm trước cửa phòng",
          "Lọc ký tự nguy hiểm",
          "Luôn thiếu một cách viết hoặc một lớp mã hoá nào đó",
        ],
      ],
      oneLiner: "Đừng hỏi dữ liệu có sạch không; hãy làm cho dữ liệu không bao giờ có cơ hội thành câu lệnh.",
    },
  ],

  "kich-ban-chen-vao-trang": [
    {
      type: "exercise",
      language: "javascript",
      title: "Mã hoá đầu ra trước khi ghép vào trang",
      task:
        "Hàm maHoaHtml đang trả về nguyên chuỗi, nên một bình luận chứa thẻ script sẽ được trình duyệt đọc thành mã. Hãy chuyển & thành &amp;, < thành &lt;, > thành &gt; và dấu nháy kép thành &quot;. Thứ tự có ý nghĩa: ký tự nào phải xử lý đầu tiên để không mã hoá hai lần?",
      starter: `function maHoaHtml(s) {
  return s;
}

console.log(maHoaHtml('<script>alert(1)</script>'));
console.log(maHoaHtml('Tom & "Jerry"'));
console.log(maHoaHtml('" onmouseover="gui(1)'));
`,
      solution: `function maHoaHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

console.log(maHoaHtml('<script>alert(1)</script>'));
console.log(maHoaHtml('Tom & "Jerry"'));
console.log(maHoaHtml('" onmouseover="gui(1)'));
`,
      expectedOutput:
        "&lt;script&gt;alert(1)&lt;/script&gt;\nTom &amp; &quot;Jerry&quot;\n&quot; onmouseover=&quot;gui(1)",
      hints: [
        "Các thay thế khác tạo ra ký tự & (ví dụ &lt;). Nếu & được xử lý sau cùng, bạn mã hoá lại chính những thực thể vừa tạo.",
        "Dòng thứ ba là kiểu tấn công thoát khỏi thuộc tính: dấu nháy kép phải được mã hoá thì chuỗi không đóng được thuộc tính.",
      ],
    },
    {
      type: "flow",
      title: "Một bình luận độc hại đi từ ô nhập tới trình duyệt nạn nhân",
      steps: [
        {
          label: "Kẻ tấn công gửi một bình luận",
          detail:
            "Nội dung chứa một thẻ script. Với máy chủ đó chỉ là một chuỗi văn bản như mọi chuỗi khác, nên được lưu nguyên văn và không có gì báo lỗi.",
        },
        {
          label: "Bình luận nằm trong cơ sở dữ liệu",
          detail:
            "Mọi người xem trang đều sẽ được phục vụ nó. Nạn nhân không phải làm gì khác thường, chỉ mở trang như mọi ngày.",
        },
        {
          label: "Ứng dụng ghép chuỗi vào HTML thô",
          detail:
            "Đây là chỗ hỏng. Khung giao diện hiện đại mặc định mã hoá đúng ngữ cảnh, nhưng chỗ cố tình đi vòng để chèn nội dung thô thì không được bảo vệ.",
        },
        {
          label: "Trình duyệt đọc nó thành mã và chạy",
          detail:
            "Kịch bản chạy với đúng danh tính của nạn nhân: đọc được thứ trên màn hình, gửi được yêu cầu thay họ, và lấy được mã phiên nếu cookie không được bảo vệ.",
        },
        {
          label: "Nhật ký máy chủ thấy gì",
          detail:
            "Các yêu cầu do kịch bản gửi trông như hành vi bình thường của chính nạn nhân, với phiên hợp lệ. Không có chữ ký nào của kẻ tấn công để dò theo.",
        },
        {
          label: "Hai chỗ chặn",
          detail:
            "Mã hoá đầu ra theo đúng ngữ cảnh ở bước ghép chuỗi (văn bản, thuộc tính, đường dẫn mỗi nơi một kiểu), và cờ chống đọc bằng kịch bản cho cookie phiên để nếu lọt thì mã phiên vẫn không bị lấy.",
        },
      ],
    },
  ],

  "gia-mao-yeu-cau": [
    {
      type: "exercise",
      language: "python",
      title: "Phiên hợp lệ chưa đủ: kiểm cả nguồn gốc",
      task:
        "Hàm chap_nhan đang chỉ kiểm phiên, nên một trang lạ khiến trình duyệt nạn nhân gửi yêu cầu POST vẫn được chấp nhận. Sửa theo quy tắc: yêu cầu đọc (GET) chỉ cần phiên hợp lệ; yêu cầu ghi (mọi phương thức khác) cần phiên hợp lệ và origin nằm trong danh sách tin cậy.",
      starter: `ORIGIN_TIN_CAY = {"https://nganhang.example"}

def chap_nhan(yc):
    return yc["phien_hop_le"]

yeu_cau = [
    {"phuong_thuc": "GET", "origin": "https://trang-la.example", "phien_hop_le": True},
    {"phuong_thuc": "POST", "origin": "https://nganhang.example", "phien_hop_le": True},
    {"phuong_thuc": "POST", "origin": "https://trang-la.example", "phien_hop_le": True},
    {"phuong_thuc": "POST", "origin": "https://nganhang.example", "phien_hop_le": False},
]

for yc in yeu_cau:
    print(yc["phuong_thuc"], yc["origin"], chap_nhan(yc))
`,
      solution: `ORIGIN_TIN_CAY = {"https://nganhang.example"}

def chap_nhan(yc):
    if not yc["phien_hop_le"]:
        return False
    if yc["phuong_thuc"] == "GET":
        return True
    return yc["origin"] in ORIGIN_TIN_CAY

yeu_cau = [
    {"phuong_thuc": "GET", "origin": "https://trang-la.example", "phien_hop_le": True},
    {"phuong_thuc": "POST", "origin": "https://nganhang.example", "phien_hop_le": True},
    {"phuong_thuc": "POST", "origin": "https://trang-la.example", "phien_hop_le": True},
    {"phuong_thuc": "POST", "origin": "https://nganhang.example", "phien_hop_le": False},
]

for yc in yeu_cau:
    print(yc["phuong_thuc"], yc["origin"], chap_nhan(yc))
`,
      expectedOutput:
        "GET https://trang-la.example True\nPOST https://nganhang.example True\nPOST https://trang-la.example False\nPOST https://nganhang.example False",
      hints: [
        "Dòng thứ ba có phiên hợp lệ và quyền đầy đủ, nhưng yêu cầu bắt nguồn từ trang lạ. Đó chính là cái phải bị chặn.",
        "Kiểm phiên trước. Sau đó chia nhánh: GET qua luôn, phương thức khác phải có origin trong ORIGIN_TIN_CAY.",
      ],
    },
    {
      type: "feynman",
      title: "Thẻ thành viên tự được đưa ra ở quầy",
      intro:
        "Ở quán cà phê quen, thẻ thành viên của bạn được tự động đưa ra mỗi khi có phiếu gọi món mang tên bạn tới quầy, bất kể ai viết phiếu. Nhân viên thấy thẻ đúng và làm theo, vì họ không hỏi phiếu bắt nguồn từ đâu.",
      columns: ["Ở quán cà phê", "Trong trình duyệt và máy chủ", "Cách chặn"],
      rows: [
        [
          "Thẻ thành viên tự được đưa kèm mọi phiếu mang tên bạn",
          "Trình duyệt tự đính cookie vào mọi yêu cầu tới trang đó, kể cả khi trang lạ kích hoạt",
          "Giới hạn cookie theo nguồn gốc: một dòng cấu hình, hiệu quả cao",
        ],
        [
          "Người lạ đưa bạn phiếu chuyển điểm đã điền sẵn và bạn bấm đồng ý",
          "Trang lạ khiến trình duyệt gửi một yêu cầu ghi tới trang của bạn",
          "Kiểm riêng nguồn gốc của yêu cầu ghi, ngoài việc kiểm phiên",
        ],
        [
          "Phiếu xem thực đơn thì giả cũng chẳng hại gì",
          "Yêu cầu đọc không có tác dụng phụ, trang lạ không đọc được phản hồi",
          "Giữ thao tác đọc thật sự chỉ đọc",
        ],
      ],
      oneLiner: "Cookie đúng chỉ chứng minh phiên hợp lệ, không chứng minh người dùng thật sự muốn thao tác đó.",
    },
  ],

  "tai-tep-len-va-noi-dung-khong-tin-cay": [
    {
      type: "exercise",
      language: "python",
      title: "Xác định loại tệp bằng nội dung, không bằng phần đuôi",
      task:
        "Hàm loai_tep đang tin phần đuôi tên tệp, nên avatar.png chứa mã PHP vẫn được nhận là ảnh. Sửa để loại tệp được xác định bằng vài byte đầu của nội dung theo danh sách cho phép; không khớp loại nào trong danh sách thì từ chối. Tệp hoso.png thực chất là PDF sẽ phải được nhận đúng là pdf.",
      starter: `CHO_PHEP = {"gif": b"GIF8", "pdf": b"%PDF"}

def loai_tep(ten, dau_tep):
    duoi = ten.rsplit(".", 1)[-1].lower()
    return duoi if duoi in ("gif", "pdf", "png") else "từ chối"

tep = [
    ("anh.gif", b"GIF89a"),
    ("ho-so.pdf", b"%PDF-1.7"),
    ("avatar.png", b"<?php echo 1;"),
    ("hoso.png", b"%PDF-1.4"),
    ("lenh.exe", b"MZ"),
]

for ten, dau in tep:
    print(ten, "->", loai_tep(ten, dau))
`,
      solution: `CHO_PHEP = {"gif": b"GIF8", "pdf": b"%PDF"}

def loai_tep(ten, dau_tep):
    for loai, chu_ky in CHO_PHEP.items():
        if dau_tep.startswith(chu_ky):
            return loai
    return "từ chối"

tep = [
    ("anh.gif", b"GIF89a"),
    ("ho-so.pdf", b"%PDF-1.7"),
    ("avatar.png", b"<?php echo 1;"),
    ("hoso.png", b"%PDF-1.4"),
    ("lenh.exe", b"MZ"),
]

for ten, dau in tep:
    print(ten, "->", loai_tep(ten, dau))
`,
      expectedOutput:
        "anh.gif -> gif\nho-so.pdf -> pdf\navatar.png -> từ chối\nhoso.png -> pdf\nlenh.exe -> từ chối",
      hints: [
        "Phần đuôi do người gửi đặt, không liên quan tới nội dung thật. Tham số ten gần như không cần dùng nữa.",
        "bytes có phương thức startswith. Duyệt CHO_PHEP và trả loại đầu tiên mà chữ ký khớp.",
      ],
    },
    {
      type: "flow",
      title: "Đường đi an toàn của một tệp tải lên",
      steps: [
        {
          label: "Nhận và giới hạn",
          detail:
            "Đặt trần kích thước ngay khi nhận. Mọi thứ đi kèm tệp, từ phần đuôi, loại nội dung khai báo tới tên tệp, đều là lời khai của người gửi chứ chưa phải sự thật.",
        },
        {
          label: "Xác định loại bằng nội dung",
          detail:
            "Đọc những byte đầu để biết loại thật, rồi đối chiếu với danh sách cho phép. Loại nằm ngoài danh sách bị từ chối, bất kể tên tệp ghi gì.",
        },
        {
          label: "Hệ thống tự sinh tên khi lưu",
          detail:
            "Tên gốc chỉ giữ làm nhãn hiển thị. Tên do người dùng đặt có thể chứa ký tự chuyển thư mục để ghi đè tệp ở chỗ khác.",
        },
        {
          label: "Lưu ngoài vùng máy chủ tự phục vụ",
          detail:
            "Tệp không nằm trong thư mục mà máy chủ web tự động trả cho ai hỏi, nên không có đường gọi trực tiếp để chạy nó.",
        },
        {
          label: "Phục vụ từ tên miền riêng, không thực thi",
          detail:
            "Khi người khác tải tệp về, nội dung đến từ miền khác nên không chạm được cookie phiên của ứng dụng chính. Và không bao giờ để nội dung tải lên được thực thi, đó là lớp giữ cho một tệp lọt qua mọi lớp trên vẫn chỉ nằm im.",
        },
      ],
    },
  ],

  "phu-thuoc-co-lo-hong": [
    {
      type: "scenario",
      title: "Thông báo lỗ hổng trong thư viện xử lý ảnh",
      start: "start",
      nodes: {
        start: {
          text: "Sáng thứ Hai, kênh thông báo bảo mật báo rằng một thư viện xử lý ảnh bạn đang dùng có lỗ hổng nghiêm trọng, và bản vá đã phát hành. Dự án của bạn cập nhật phụ thuộc đều đặn từng tháng. Bạn làm gì trước?",
          choices: [
            { label: "Nâng phiên bản và triển khai ngay, bỏ qua kiểm thử", next: "vao" },
            { label: "Đọc mô tả, kiểm tra mã của mình có dùng phần bị ảnh hưởng", next: "doc" },
            { label: "Chờ xem có ai báo bị khai thác rồi mới hành động", next: "cho" },
          ],
        },
        vao: {
          text: "Bản nâng đổi cách một hàm trả kết quả, và trang tải ảnh hỏng ngay giờ cao điểm. Đội phải khôi phục khẩn cấp lúc máy quét đã bắt đầu thử, nên vừa mất dịch vụ vừa chưa được vá.",
          ending: "bad",
        },
        cho: {
          text: "Đồng hồ đã chạy từ lúc công bố, và cửa sổ nguy hiểm nhất mở ra đúng khi bản vá xuất hiện cùng mô tả chi tiết. Hai ngày sau nhật ký cho thấy những yêu cầu tải ảnh bất thường mà bạn không biết tới từ khi nào.",
          ending: "bad",
        },
        doc: {
          text: "Mã của bạn gọi đúng hàm bị ảnh hưởng, với ảnh do người dùng tải lên. Lỗ hổng chạm tới bạn thật. Bước tiếp theo?",
          choices: [
            { label: "Nâng lên bản vá, chạy kiểm thử rồi triển khai trong ngày", next: "va" },
            { label: "Ghi vào việc cần làm tuần sau vì chưa thấy ai khai thác", next: "hoan" },
          ],
        },
        hoan: {
          text: "Mô tả và mã minh hoạ đã công khai, các máy quét đã được cập nhật. Một tuần sau, một yêu cầu tải ảnh được dựng riêng chạy được trên máy chủ, trong lúc bản vá vẫn nằm trong danh sách việc.",
          ending: "bad",
        },
        va: {
          text: "Dự án cập nhật đều nên bản vá chỉ là nâng một phiên bản nhỏ. Kiểm thử qua, triển khai xong trong vài giờ, và cửa sổ rủi ro rất hẹp. Việc xác nhận ảnh hưởng trước khi vá cũng giúp bạn biết nên ưu tiên việc này.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Càng lạc hậu, vá khẩn càng giống một cuộc di trú",
      caption:
        "Số liệu minh hoạ, không đo từ dự án thật. Giả định mỗi bản chính (major) tụt lại thêm k ngày công để vá khẩn do các thay đổi phá vỡ tương thích, cộng nửa ngày kiểm thử. Đường ngang là số ngày máy quét công khai cần để bắt đầu thử lỗ hổng sau khi công bố.",
      kind: "line",
      xLabel: "Số bản chính phiên bản đang dùng đã tụt lại",
      yLabel: "Số ngày",
      x: { from: 0, to: 5, step: 1 },
      params: [
        { id: "k", label: "Ngày công thêm cho mỗi bản chính tụt lại", min: 1, max: 20, step: 1, value: 5, unit: " ngày" },
        { id: "s", label: "Máy quét bắt đầu thử sau", min: 1, max: 7, step: 1, value: 2, unit: " ngày" },
      ],
      series: [
        { label: "Ngày cần để vá khẩn", expr: "0.5+k*x" },
        { label: "Cửa sổ trước khi máy quét tới", expr: "s" },
      ],
    },
  ],
};
