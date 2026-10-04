import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 12. Một người viết cho một tệp.
export const P12_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Chặng 18 ───────────────────────────────────────────────────────────────
  "nuoi-mot-du-an-song-lau": [
    {
      type: "scenario",
      title: "Câu hỏi bị né suốt nửa năm",
      start: "s1",
      nodes: {
        s1: {
          text: "Dự án của bạn có vài trăm người dùng. Hai tháng nay bạn trả lời issue trễ dần, và đã ba lần để một yêu cầu nằm im. Cuối tuần, bạn ngồi xuống nghĩ xem mình đang làm gì.",
          choices: [
            { label: "Đặt lịch riêng, ghi ra giờ mỗi tuần bạn thật sự dành", next: "s2" },
            { label: "Cố trả lời nhanh hơn, tuần sau chắc sẽ đỡ hơn", next: "bad_push" },
          ],
        },
        bad_push: {
          text: "Tuần sau có thêm bốn issue mới và một người dùng nhắn riêng hỏi vì sao bị bỏ rơi. Bạn vẫn chưa trả lời được câu hỏi gốc: mình còn muốn làm việc này không. Im lặng kéo dài thêm ba tháng, người dùng lặng lẽ chuyển sang dự án khác.",
          ending: "bad",
        },
        s2: {
          text: "Con số làm bạn giật mình: gần mười hai giờ mỗi tuần, chỉ còn hai giờ là viết mã. Bạn nhận ra mình không còn chắc là muốn nuôi nó thêm ba năm nữa.",
          choices: [
            { label: "Đăng thông báo rõ dự án hỗ trợ gì, và mời người cùng bảo trì", next: "good" },
            { label: "Im lặng, giữ nguyên rồi từ từ bớt vào mỗi tháng", next: "bad_fade" },
          ],
        },
        bad_fade: {
          text: "Không ai biết bạn đã rút. Người dùng vẫn gửi yêu cầu, vẫn chờ, và vài người tự dựng bản sao riêng mà không nói. Dự án chết dần, không có ngày nào để mọi người kịp chuyển.",
          ending: "bad",
        },
        good: {
          text: "Hai người nhận lời cùng bảo trì. Bạn mất vài buổi hướng dẫn, nhưng sau một tháng khối lượng của bạn giảm hẳn, và nếu một ngày bạn muốn dừng thì dự án không dừng theo.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Hoá đơn nặng dần của một dự án",
      caption:
        "Số liệu minh hoạ, không phải đo thật: kéo tốc độ tăng người dùng để thấy phần viết mã teo đi trong khi phần cân nhắc và trả lời phình ra.",
      kind: "line",
      xLabel: "Năm sau khi ra mắt",
      yLabel: "Giờ mỗi tuần",
      x: { from: 0, to: 5, step: 1 },
      params: [{ id: "a", label: "Tốc độ tăng người dùng", min: 1, max: 3, step: 0.5, value: 2, unit: "x" }],
      series: [
        { label: "Giờ viết mã", expr: "max(1, 8 - x * a)" },
        { label: "Giờ trả lời và cân nhắc", expr: "2 + x * a * 1.5" },
      ],
    },
  ],

  "ban-do-cac-du-an-lon": [
    {
      type: "exercise",
      language: "python",
      title: "Cộng sáu khoản lên một trang",
      task:
        "Bạn có 12 giờ rảnh mỗi tuần và bốn cam kết (số giờ mỗi tuần ghi sẵn trong mã). Tính tổng giờ, tính phần vượt quỹ, rồi chọn bỏ hẳn đúng một dòng: dòng có số giờ nhỏ nhất mà vẫn đủ bù phần vượt. Đầu ra mong muốn gồm ba dòng: Tổng, Vượt quỹ, Bỏ hẳn.",
      starter: `cam_ket = {"dự án cá nhân": 6, "họp cộng đồng hằng tuần": 3, "viết blog": 2, "kèm người mới": 4}
quy = 12

tong = 0
# TODO: cộng số giờ của mọi cam kết vào tong
vuot = tong - quy

bo = ""
# TODO: chọn dòng nhỏ nhất có số giờ >= vuot

print("Tổng:", tong)
print("Vượt quỹ:", vuot)
print("Bỏ hẳn:", bo)
`,
      solution: `cam_ket = {"dự án cá nhân": 6, "họp cộng đồng hằng tuần": 3, "viết blog": 2, "kèm người mới": 4}
quy = 12

tong = 0
for gio in cam_ket.values():
    tong += gio
vuot = tong - quy

bo = ""
for ten, gio in cam_ket.items():
    if gio >= vuot and (bo == "" or gio < cam_ket[bo]):
        bo = ten

print("Tổng:", tong)
print("Vượt quỹ:", vuot)
print("Bỏ hẳn:", bo)
`,
      expectedOutput: `Tổng: 15
Vượt quỹ: 3
Bỏ hẳn: họp cộng đồng hằng tuần`,
      hints: [
        "Dùng vòng for qua cam_ket.values() và cộng từng số vào tong.",
        "Với mỗi cam kết, chỉ xét nếu gio >= vuot; trong các dòng đó giữ lại dòng có gio nhỏ nhất.",
        "Giảm đều cả bốn dòng thì không phải là bỏ hẳn một dòng - bài này chỉ cho bỏ một.",
      ],
    },
    {
      type: "flow",
      title: "Một buổi lập bản đồ cam kết",
      steps: [
        { label: "Liệt kê", detail: "Viết mọi thứ bạn đã hứa vào một trang, kể cả thứ chưa ai gọi là cam kết, như một nhóm bạn lập ra hoặc một dự án đã có người dùng." },
        { label: "Điền giờ và ngày kết thúc", detail: "Mỗi dòng ghi số giờ mỗi tuần thật sự dành. Dòng nào không điền được ngày kết thúc thì đánh dấu để quyết định lại định kỳ." },
        { label: "Cộng và so với quỹ", detail: "Tổng thường lớn hơn trực giác. Nếu vượt quỹ thời gian thật, vấn đề hiện ra ngay trên trang giấy thay vì trong những tuần mệt." },
        { label: "Bỏ hẳn một dòng", detail: "Cắt một dòng trọn vẹn, đừng bớt đều mọi dòng. Giữ lại thứ vẫn tiếp tục chạy sau khi bạn rút tay." },
        { label: "Hẹn ngày xem lại", detail: "Đặt một ngày cụ thể để mở trang này ra lần nữa. Phần đã đầu tư trong quá khứ không được tính vào phép cân nhắc." },
      ],
    },
  ],

  // ── Chặng 19 ───────────────────────────────────────────────────────────────
  "kiet-suc-nghe-lap-trinh": [
    {
      type: "scenario",
      title: "Nghỉ phép xong, thứ Hai vẫn nặng",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn vừa nghỉ năm ngày và những ngày đó thật sự dễ chịu. Sáng thứ Hai quay lại, bạn thấy nặng như cũ, nhìn danh sách việc mà không muốn mở ra. Hạn chót của dự án lại vừa bị đổi.",
          choices: [
            { label: "Xin thêm vài ngày nghỉ nữa để nạp lại năng lượng", next: "bad_rest" },
            { label: "Ghi xem việc nào khiến bạn nặng lòng nhất và vì sao", next: "s2" },
          ],
        },
        bad_rest: {
          text: "Thêm ba ngày nghỉ, bạn lại khá hơn. Quay lại, đúng chỗ cũ, đúng hạn chót cũ, và chỉ sau hai hôm cảm giác nặng trở lại. Nghỉ thêm không đổi được thứ gây ra nó.",
          ending: "bad",
        },
        s2: {
          text: "Bạn thấy rõ: không phải khối lượng mà là chuyện bạn bị giao, bị đổi ý liên tục và không được quyết gì về cách làm. Bạn cũng nhận ra mình bắt đầu thấy công việc vô nghĩa.",
          choices: [
            { label: "Nói với quản lý về phần bạn được quyết và thứ tự việc", next: "good" },
            { label: "Làm thêm giờ để xong cho nhanh rồi mới tính chuyện khác", next: "bad_hours" },
          ],
        },
        bad_hours: {
          text: "Bạn làm sáu mươi giờ một tuần vào đúng những việc bị đổi liên tục. Ba tuần sau, mất ngủ và đau đầu xuất hiện, và bạn bắt đầu mắc lỗi ngớ ngẩn. Đó là hệ quả, không phải khởi đầu của vấn đề.",
          ending: "bad",
        },
        good: {
          text: "Quản lý đồng ý để bạn tự chọn thứ tự và chốt hạn trước khi bắt đầu. Khối lượng gần như không đổi nhưng cảm giác nặng giảm rõ sau hai tuần, vì thứ bạn can thiệp là mức kiểm soát chứ không phải số giờ.",
          ending: "good",
        },
      },
    },
  ],

  "le-thuoc-cong-cu-va-ky-nang-nen": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Trợ lý giải thích một hàm giảm giá",
      task:
        "Trợ lý viết mã vừa giải thích hàm giam_gia(gia, phan_tram) cho bạn, nói rằng hàm trả về gia * (1 - phan_tram / 100). Hãy bấm vào những đoạn nghe có vẻ đúng nhưng bạn không nên tin ngay, rồi nộp.",
      segments: [
        { text: "Hàm nhận giá gốc và phần trăm giảm, rồi nhân giá với phần còn lại sau khi trừ." },
        { text: "Ví dụ giam_gia(200, 10) trả về 180, đúng như tính tay." },
        {
          text: "Hàm xử lý được mọi đầu vào nên bạn có thể đưa thẳng vào trang thanh toán.",
          error: "Nó chỉ được thử với dữ liệu mẫu. Phần trăm âm, lớn hơn 100, hoặc giá bằng 0 làm giá cuối sai hay âm. Trường hợp biên của bài toán của bạn là thứ công cụ không biết.",
        },
        { text: "Phép chia cho 100 giúp đổi phần trăm sang số thập phân trước khi nhân." },
        {
          text: "Vì kết quả đã khớp ví dụ nên không cần ai đọc lại logic hay viết thêm kiểm thử.",
          error: "Khớp một ví dụ không chứng minh được gì về các trường hợp còn lại. Người đưa mã vào sản phẩm phải đánh giá được nó, không chỉ thấy nó chạy.",
        },
      ],
    },
    {
      type: "flow",
      title: "Nhận mã do công cụ viết mà vẫn đánh giá được",
      steps: [
        { label: "Đọc trước khi chạy", detail: "Đọc từng dòng và tự nói được nó làm gì. Dòng nào bạn không giải thích nổi là dòng chưa được phép vào sản phẩm." },
        { label: "Tự đoán đầu ra", detail: "Chọn một đầu vào và đoán kết quả trước khi chạy. Đoán sai nghĩa là bạn đã hiểu sai mã hoặc mã sai." },
        { label: "Thử trường hợp biên", detail: "Số không, số âm, danh sách rỗng, chuỗi dài bất thường. Đây là chỗ bài toán của bạn khác những bài toán trông giống." },
        { label: "Gỡ lỗi có phương pháp", detail: "Khi hỏng, thu hẹp dần phạm vi thay vì đoán hoặc dán lỗi qua lại. Sự cố thật là tổ hợp riêng của hệ thống bạn." },
        { label: "Mô tả lại bài toán", detail: "Nếu kết quả vẫn lệch, viết lại đề bài rõ hơn và nói rõ các trường hợp biên. Chất lượng thứ nhận lại phụ thuộc vào đây." },
      ],
    },
  ],

  "tu-the-co-tay-va-man-hinh": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Lời khuyên về chỗ ngồi của một trợ lý",
      task:
        "Một trợ lý AI viết cho bạn hướng dẫn thiết lập chỗ làm việc. Phần lớn đúng, nhưng có đoạn đi ngược điều bạn vừa học. Bấm các đoạn sai rồi nộp.",
      segments: [
        { text: "Đặt cạnh trên của màn hình ngang tầm mắt, để nhìn hơi chếch xuống và cổ ở tư thế trung tính." },
        {
          text: "Máy tính xách tay đặt thẳng trên bàn là vừa đủ cao nếu bạn ngồi thẳng lưng.",
          error: "Máy xách tay đặt trên bàn luôn thấp hơn mức ngang tầm mắt khá nhiều. Một giá kê máy cộng bàn phím rời giải quyết gần hết.",
        },
        { text: "Giữ cổ tay thẳng hàng với cẳng tay, không gập lên và không bẻ sang hai bên khi gõ." },
        {
          text: "Tựa cổ tay lên miếng đệm trong lúc gõ để nó được nâng đỡ liên tục.",
          error: "Miếng đệm là để nghỉ giữa các lần gõ. Tựa lên khi gõ tạo áp lực đúng chỗ dây thần kinh đi qua cổ tay.",
        },
        { text: "Hai chân chạm sàn, đùi gần song song với mặt sàn; nếu ghế quá cao thì thêm một cái kê chân." },
        {
          text: "Đã có ghế tốt và ngồi đúng chuẩn thì có thể yên tâm ngồi liền ba bốn tiếng.",
          error: "Tư thế tốt nhất là tư thế tiếp theo. Cơ thể không được thiết kế để giữ nguyên một trạng thái hàng giờ, kể cả trạng thái đúng chuẩn.",
        },
      ],
    },
    {
      type: "flow",
      title: "Ba thứ chỉnh một lần, theo thứ tự",
      steps: [
        { label: "Nâng màn hình", detail: "Cạnh trên ngang tầm mắt. Với máy xách tay, thêm giá kê và bàn phím rời, và bạn xong phần phổ biến nhất của vấn đề." },
        { label: "Căn cổ tay", detail: "Với bàn phím rời đặt ngang tầm khuỷu, cổ tay thẳng hàng với cẳng tay. Miếng đệm để nghỉ, không để tựa khi gõ." },
        { label: "Đặt chân", detail: "Chân chạm sàn, đùi gần song song mặt sàn. Ghế quá cao thì kê chân thay vì thả lơ lửng." },
        { label: "Hẹn tư thế tiếp theo", detail: "Thiết lập xong vẫn phải đứng dậy và đổi dáng ngồi. Thiết bị tốt không thay được việc đó." },
      ],
    },
  ],

  "nhip-lam-viec-ben": [
    {
      type: "exercise",
      language: "python",
      title: "Khối liền mạch dài nhất trong ngày",
      task:
        "Ngày làm việc từ 9 đến 17 giờ. Hàm khoi_dai_nhat nhận danh sách cuộc họp (giờ bắt đầu, giờ kết thúc) và trả về số giờ trống liền nhau dài nhất. Hàm đang bỏ sót khoảng trống sau cuộc họp cuối. Sửa để hai ngày có cùng ba cuộc họp cho đúng kết quả.",
      starter: `def khoi_dai_nhat(hop, dau=9, cuoi=17):
    moc = dau
    dai = 0
    for bd, kt in sorted(hop):
        dai = max(dai, bd - moc)
        moc = kt
    # TODO: còn khoảng trống từ cuộc họp cuối tới giờ tan làm
    return dai

rai_rac = [(10, 11), (12, 13), (14, 15)]
gom_lai = [(9, 10), (10, 11), (11, 12)]

print("Họp rải rác:", khoi_dai_nhat(rai_rac), "giờ liền")
print("Họp gom lại:", khoi_dai_nhat(gom_lai), "giờ liền")
`,
      solution: `def khoi_dai_nhat(hop, dau=9, cuoi=17):
    moc = dau
    dai = 0
    for bd, kt in sorted(hop):
        dai = max(dai, bd - moc)
        moc = kt
    dai = max(dai, cuoi - moc)
    return dai

rai_rac = [(10, 11), (12, 13), (14, 15)]
gom_lai = [(9, 10), (10, 11), (11, 12)]

print("Họp rải rác:", khoi_dai_nhat(rai_rac), "giờ liền")
print("Họp gom lại:", khoi_dai_nhat(gom_lai), "giờ liền")
`,
      expectedOutput: `Họp rải rác: 2 giờ liền
Họp gom lại: 5 giờ liền`,
      hints: [
        "Sau vòng for, biến moc đang giữ giờ kết thúc của cuộc họp cuối.",
        "Khoảng trống còn lại là cuoi - moc; so nó với dai bằng max.",
      ],
    },
    {
      type: "chart",
      title: "Mỗi lần bị ngắt lấy đi bao nhiêu giờ tập trung",
      caption:
        "Số liệu minh hoạ, không phải đo thật: giả sử một ngày có 6 giờ có thể tập trung sâu và mỗi lần bị ngắt cần một khoảng thời gian để lấy lại trạng thái. Kéo thời gian lấy lại để so với việc gom họp thành một khối (chỉ tính một lần ngắt).",
      kind: "line",
      xLabel: "Số lần bị ngắt trong ngày",
      yLabel: "Giờ tập trung sâu còn lại",
      x: { from: 0, to: 10, step: 1 },
      params: [{ id: "r", label: "Thời gian lấy lại trạng thái sau mỗi lần ngắt", min: 10, max: 30, step: 5, value: 20, unit: "phút" }],
      series: [
        { label: "Bị ngắt rải rác", expr: "max(0, 6 - x * r / 60)" },
        { label: "Gom họp thành một khối", expr: "6 - r / 60" },
      ],
    },
  ],

  "danh-sach-kiem-suc-khoe-nghe-nghiep": [
    {
      type: "exercise",
      language: "python",
      title: "Chọn đúng một thứ cho tuần này",
      task:
        "Cuối tuần bạn tự chấm bốn mục từ 1 đến 5 (5 là tốt nhất). Chương trình phải chọn mục có điểm thấp nhất, in điểm đó và tên mục. Mã đang chọn nhầm mục điểm cao nhất; sửa lại.",
      starter: `diem = {"kiểm soát": 3, "đánh giá được": 4, "thân thể": 2, "khối liền mạch": 3}

chon = max(diem, key=diem.get)

print("Điểm thấp nhất:", diem[chon])
print("Tuần này chọn:", chon)
`,
      solution: `diem = {"kiểm soát": 3, "đánh giá được": 4, "thân thể": 2, "khối liền mạch": 3}

chon = min(diem, key=diem.get)

print("Điểm thấp nhất:", diem[chon])
print("Tuần này chọn:", chon)
`,
      expectedOutput: `Điểm thấp nhất: 2
Tuần này chọn: thân thể`,
      hints: ["Hàm min và max có cùng cách gọi: min(diem, key=diem.get) trả về khoá có giá trị nhỏ nhất."],
    },
    {
      type: "flow",
      title: "Mười phút cuối tuần",
      steps: [
        { label: "Hỏi bốn câu", detail: "Kiểm soát, khả năng đánh giá, thân thể, khối liền mạch. Mỗi câu một cái gật hoặc lắc đầu, đừng viết luận." },
        { label: "Chấm điểm thật", detail: "Hỏi về quyền quyết định chứ không về số giờ, hỏi về khả năng giải thích chứ không về tỷ lệ dùng công cụ." },
        { label: "Chọn đúng một", detail: "Mục điểm thấp nhất, hoặc mục rẻ nhất để sửa. Làm cả bốn cùng lúc thường là làm không cái nào." },
        { label: "Gắn một ngày", detail: "Việc nào cũng cần một ngày cụ thể. Nâng màn hình ngang tầm mắt chỉ mất một lần và tự có tác dụng mãi." },
        { label: "Mở lại tuần sau", detail: "Danh sách chạy đều hiệu quả hơn sự cảnh giác, vì nó không đòi bạn nhớ ra đúng lúc đang bận và mệt." },
      ],
    },
  ],

  // ── Chặng 20 ───────────────────────────────────────────────────────────────
  "nghe-nhung-nam-dau": [
    {
      type: "scenario",
      title: "Bí ba mươi phút, rồi hai lời mời",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn mới vào nghề ba tháng, bí một lỗi từ sáng và đã quá nửa giờ chưa tiến triển. Người cùng đội senior đang ngồi cạnh, trông cũng bận.",
          choices: [
            { label: "Hỏi, kèm cái đã thử và đoạn mã liên quan", next: "s2" },
            { label: "Tự mò thêm, hỏi khi chắc là mình hết cách", next: "bad_stuck" },
          ],
        },
        bad_stuck: {
          text: "Bạn mất thêm bốn giờ. Khi hỏi, người senior chỉ ra lỗi trong hai phút, vì đó là chuyện cấu hình họ từng gặp. Buổi chiều bạn trễ hẳn tiến độ mà không ai biết lý do.",
          ending: "bad",
        },
        s2: {
          text: "Người senior xem và chỉ ra lỗi chỉ trong vài phút, còn nhận xét thêm cách bạn đặt tên hàm. Một năm sau, bạn nhận hai lời mời: một nơi trả hơn mười phần trăm nhưng không ai review mã, một nơi trả thấp hơn nhưng review đều.",
          choices: [
            { label: "Chọn nơi trả cao hơn vì lương là thứ đo được", next: "bad_pay" },
            { label: "Chọn nơi có review đều, dù lương chênh lệch", next: "good" },
          ],
        },
        bad_pay: {
          text: "Hai năm sau bạn có hai năm kinh nghiệm trên hồ sơ nhưng cách làm gần như một năm lặp lại hai lần. Không ai chỉ ra chỗ chưa được, và khoản mất đó không bao giờ hiện trên bảng lương.",
          ending: "bad",
        },
        good: {
          text: "Mỗi tuần có người đọc mã của bạn và nói thẳng chỗ chưa ổn. Chức danh năm đầu ngang nhau, nhưng thói quen viết rõ, hỏi đúng, học đều cộng dồn thành khác biệt sau ba năm.",
          ending: "good",
        },
      },
    },
  ],

  "nghe-giai-doan-giua": [
    {
      type: "scenario",
      title: "Lời đề nghị lên quản lý",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn làm nghề bảy năm. Gần đây bạn viết ít mã hơn, cả ngày giải thích và gỡ vướng cho đồng nghiệp, và bạn lo mình đang chững lại. Sếp đề nghị bạn nhận vị trí quản lý đội.",
          choices: [
            { label: "Nhận ngay, vì chức danh mới là bằng chứng tiến bộ", next: "bad_title" },
            { label: "Hỏi công việc hằng ngày của vị trí đó gồm những gì", next: "s2" },
          ],
        },
        bad_title: {
          text: "Bạn nhận rồi mới thấy lịch kín họp một-một và duyệt kế hoạch. Bạn không còn thời gian viết mã, và sáu tháng sau bạn nhận ra mình không thích loại việc này.",
          ending: "bad",
        },
        s2: {
          text: "Phần lớn là họp nhân sự, ngân sách và điều phối. Bạn thích phần gỡ vướng cho người khác nhưng không muốn bỏ hẳn kỹ thuật. Bạn nghĩ cách đo đóng góp của mình nên khác đi.",
          choices: [
            { label: "Đề nghị vai kỹ thuật cấp cao, giữ một phần việc thật", next: "good" },
            { label: "Từ chối và quay về đếm số dòng mã mỗi tuần", next: "bad_count" },
          ],
        },
        bad_count: {
          text: "Bạn đếm mã mỗi tuần và thấy con số đi xuống, dù những cuộc giải thích của bạn đã chặn nhiều hướng sai trước khi thành mã. Bạn tự kết luận mình đang chững lại, trong khi thật ra công việc đổi hình dạng.",
          ending: "bad",
        },
        good: {
          text: "Vai mới cho bạn đủ thời gian gỡ vướng và ngăn hướng sai, đồng thời giữ cảm giác về chi phí thật của một quyết định nhờ phần việc viết mã nhỏ bạn vẫn làm.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Giờ làm việc đổi loại theo giai đoạn",
      caption:
        "Số liệu minh hoạ, không phải đo thật và không gắn với số năm cụ thể: chỉ để thấy phần viết mã co lại khi phần gỡ vướng và ngăn hướng sai lớn lên.",
      kind: "bar",
      xLabel: "Giai đoạn",
      yLabel: "Giờ mỗi tuần (minh hoạ)",
      data: [
        { label: "Giai đoạn đầu", values: [30, 6, 4] },
        { label: "Giai đoạn giữa", values: [14, 14, 12] },
      ],
      seriesLabels: ["Viết mã", "Gỡ vướng cho người khác", "Giải thích, ngăn hướng sai"],
    },
  ],

  "nghe-giai-doan-sau": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Nhờ AI soạn lời phản đối một hướng đi",
      task:
        "Đội định dùng một thiết kế mà bạn thấy sẽ hỏng khi lượng người dùng tăng. Bạn nhờ AI soạn thư gửi cả đội. Hãy chọn từng phần của yêu cầu để thư biến ý kiến thành một dự đoán có thể kiểm chứng.",
      parts: [
        {
          id: "cach-noi",
          label: "Cách thể hiện ý kiến",
          options: [
            {
              text: "Nêu cái gì sẽ hỏng, trong điều kiện nào, khoảng khi nào",
              good: true,
              feedback: "Một dự đoán cụ thể có thể sai, và chính vì thế nó đáng tin. Đội cũng học được lý do.",
            },
            {
              text: "Viết chắc nịch rằng hướng này sai, nhấn mạnh bạn có nhiều năm kinh nghiệm trong nghề",
              feedback: "Uy tín làm cả đội dừng lại nhưng không ai học được lý do, và bạn không bị kiểm chứng.",
            },
            {
              text: "Liệt kê thật nhiều rủi ro tiềm ẩn của hướng này để đội tự đánh giá hết",
              feedback: "Một danh sách dài không có điều kiện và mốc thời gian không bị phản bác được, nên cũng không giúp đội quyết định.",
            },
          ],
        },
        {
          id: "kiem-chung",
          label: "Cách kiểm chứng",
          options: [
            {
              text: "Đề xuất một phép đo nhỏ mà đội chạy được để biết ai đúng",
              good: true,
              feedback: "Phép đo biến tranh luận thành thử nghiệm, và bạn chịu phán xét như mọi người.",
            },
            {
              text: "Đề nghị hoãn quyết định đến khi bạn có thời gian viết một tài liệu phân tích dài",
              feedback: "Hoãn vô thời hạn cũng chặn đội lại, và phân tích dài không có mốc nào để kiểm.",
            },
            {
              text: "Không đề xuất gì, để đội tự thấy hậu quả rồi cùng rút kinh nghiệm sau",
              feedback: "Để hỏng rồi mới học là cách đắt nhất, và đội cũng không biết bạn đã thấy trước.",
            },
          ],
        },
        {
          id: "nguoi-nhan",
          label: "Người nhận thư",
          options: [
            {
              text: "Gửi cả đội, ghi rõ lý do để ai cũng đánh giá được",
              good: true,
              feedback: "Lý do công khai là cách nâng người khác: lần sau họ tự nhìn ra mà không cần bạn lên tiếng.",
            },
            {
              text: "Chỉ gửi riêng trưởng nhóm với đề nghị anh ấy tự quyết định thay cả đội",
              feedback: "Quyết định đi qua một người mà lý do không tới đội, nên đội không học được gì.",
            },
            {
              text: "Chỉ nói miệng trong cuộc họp, không viết gì để khỏi tạo thêm tranh cãi",
              feedback: "Không viết ra thì dự đoán không được lưu lại, và sau này không ai kiểm được bạn đúng hay sai.",
            },
          ],
        },
      ],
      responses: [
        {
          requires: ["cach-noi", "kiem-chung", "nguoi-nhan"],
          text: "Thư nêu: dưới tải gấp ba lượng hiện tại, hàng đợi sẽ đầy trong khoảng hai quý, kèm một phép đo tải đội chạy được trong một buổi chiều. Cả đội hiểu lý do, có thể phản bác bằng số liệu, và bạn sẵn sàng chịu kết quả.",
        },
        {
          requires: ["cach-noi", "kiem-chung"],
          text: "Dự đoán và phép đo đều tốt, nhưng thư chỉ tới một người nên phần lớn đội không thấy lý do. Họ làm theo kết quả, không học được cách nhìn.",
        },
        {
          text: "Thư nghe có thẩm quyền nhưng không có gì để kiểm. Đội hoặc dừng vì nể bạn hoặc phớt lờ, và nếu bạn sai thì không ai biết, nếu bạn đúng thì không ai học được vì sao.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Quán tính sau mười năm, đơn giản hơn bạn nghĩ",
      intro:
        "Chọn việc theo quán tính giống ngồi trên băng chuyền ở sân bay: mỗi bước bạn không làm gì, vậy mà sau một lúc bạn đã ở rất xa nơi mình định tới.",
      columns: ["Thành phần", "Băng chuyền sân bay", "Giai đoạn sau của nghề"],
      rows: [
        ["Lực đẩy", "Băng chuyền tự chạy", "Việc tự tìm tới bạn, thường là loại bạn đã làm tốt"],
        ["Mỗi bước", "Không cần cố gắng gì", "Mỗi lần nhận đều hợp lý, không lần nào là quyết định"],
        ["Khi nhìn lại", "Ở một cổng bay không định chọn", "Sau ba năm, đó thật ra là một quyết định chưa ai đưa ra"],
        ["Chủ động", "Bước xuống, chọn hướng đi", "Chọn một trong bốn hướng: sâu, rộng, nâng người, dựng hệ thống"],
      ],
      oneLiner: "Việc tới tìm bạn thì dễ nhận, nhưng chọn có ý thức mới biến nó thành hướng đi của riêng bạn.",
    },
  ],

  "tu-tich-luy-sang-truyen-lai": [
    {
      type: "scenario",
      title: "Người cả đội đang chờ",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn là người giỏi nhất đội về một phần hệ thống. Mọi yêu cầu về phần đó đều qua tay bạn, và bạn xử lý nhanh hơn bất kỳ ai. Tuần này có bốn yêu cầu chờ bạn, trong khi bạn đang bận việc khác.",
          choices: [
            { label: "Tự làm nốt cả bốn, vì bạn làm nhanh và chắc nhất", next: "bad_self" },
            { label: "Giao một việc cho đồng nghiệp, ngồi cạnh làm cùng", next: "s2" },
          ],
        },
        bad_self: {
          text: "Bạn làm xong cả bốn, đẹp hơn bất kỳ ai làm. Tuần sau lại có bốn việc nữa. Cách này vẫn cho kết quả tốt, nên không có gì báo bạn phải đổi, và đội ngày càng chờ vào mỗi mình bạn.",
          ending: "bad",
        },
        s2: {
          text: "Đồng nghiệp làm chậm và mắc vài lỗi mà bạn nhìn ra ngay. Mấy tháng đầu kết quả kém hơn nếu bạn tự làm. Bạn phân vân.",
          choices: [
            { label: "Tiếp tục để họ làm, góp ý sau mỗi lần xong", next: "good" },
            { label: "Lấy lại việc, vì kết quả ngắn hạn tốt hơn nhiều", next: "bad_back" },
          ],
        },
        bad_back: {
          text: "Bạn lấy lại việc, đồng nghiệp học được rất ít, và bạn quay về làm nút thắt của cả đội. Tín hiệu ngắn hạn thì đúng, nhưng nó trỏ ngược hướng của quãng đường dài.",
          ending: "bad",
        },
        good: {
          text: "Sau bốn tháng, ba người trong đội xử lý được phần đó, kể cả khi bạn nghỉ phép. Kết quả bạn tạo ra không còn gắn với số giờ của riêng bạn.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Chuyển một việc từ tay mình sang người khác",
      steps: [
        { label: "Chọn việc lặp lại", detail: "Chọn việc bạn làm tốt và cứ quay lại mỗi tuần. Đây là loại việc mà đào tạo người khác trả công nhiều nhất." },
        { label: "Làm cùng", detail: "Ngồi cạnh một người, để họ cầm bàn phím và bạn nói lý do. Lần đầu chậm hơn tự làm khá nhiều." },
        { label: "Để họ làm một mình", detail: "Bạn chỉ xem lại sau khi xong. Kết quả vài lần đầu sẽ kém hơn của bạn, và đó là cái giá bình thường." },
        { label: "Chấp nhận phần kém đi", detail: "Tín hiệu ngắn hạn sẽ bảo bạn lấy lại việc. Giữ nguyên, vì cách cũ chỉ hết trần chứ không hỏng." },
        { label: "Đo bằng thứ còn lại", detail: "Hỏi: nếu tuần sau bạn nghỉ, phần này còn chạy không? Đó là giá trị bạn tạo ra qua người khác." },
      ],
    },
  ],

  // ── Chặng 21 ───────────────────────────────────────────────────────────────
  "he-thong-toi-thieu-can-co": [
    {
      type: "sim",
      tool: "terminal",
      mission: "mkdir-notes",
      title: "Dựng tệp ghi chú trong mười phút",
      task:
        "Bộ công cụ tối thiểu có một tệp ghi chú cho những gì bạn phải tra lại lần thứ hai. Trong dòng lệnh, tạo thư mục tên ghi-chu rồi tạo một tệp bên trong (ví dụ mkdir ghi-chu rồi touch ghi-chu/lenh-hay-dung.txt).",
    },
  ],

  "tu-dong-hoa-toan-bo-he-thong": [
    {
      type: "exercise",
      language: "python",
      title: "Dừng ngay ở bước đầu tiên hỏng",
      task:
        "Một quy trình chạy bốn bước sau mỗi commit: định dạng mã, kiểm thử, dựng bản mới, triển khai. Mã đang chạy hết mọi bước dù kiểm thử đã hỏng. Sửa để dừng ngay ở bước hỏng đầu tiên và in tên bước đó ở dòng cuối, để mỗi lần đỏ chỉ ra đúng một chuyện.",
      starter: `buoc = [("định dạng mã", True), ("kiểm thử", False), ("dựng bản mới", True), ("triển khai", True)]

loi = None
for ten, dat in buoc:
    print("Bước", ten + ":", "đạt" if dat else "hỏng")
    # TODO: nếu bước hỏng thì nhớ tên bước vào loi và dừng vòng lặp

print("Dừng ở:", loi)
`,
      solution: `buoc = [("định dạng mã", True), ("kiểm thử", False), ("dựng bản mới", True), ("triển khai", True)]

loi = None
for ten, dat in buoc:
    print("Bước", ten + ":", "đạt" if dat else "hỏng")
    if not dat:
        loi = ten
        break

print("Dừng ở:", loi)
`,
      expectedOutput: `Bước định dạng mã: đạt
Bước kiểm thử: hỏng
Dừng ở: kiểm thử`,
      hints: [
        "Từ khoá break thoát khỏi vòng for ngay lập tức.",
        "Gán loi = ten trước khi break, để dòng cuối có tên bước hỏng.",
      ],
    },
    {
      type: "flow",
      title: "Một lần commit đi qua quy trình tự chạy",
      steps: [
        { label: "Commit", detail: "Bạn lưu thay đổi. Từ lúc này không còn gì cần nhớ làm tay, kiểm tra chạy ngay lúc commit chứ không đợi pull request." },
        { label: "Định dạng mã", detail: "Máy sửa kiểu viết mà không bàn cãi. Việc giống hệt nhau mỗi lần thì máy làm tốt hơn người." },
        { label: "Chạy kiểm thử", detail: "Một bước riêng cho kiểm thử, để khi đỏ chỉ có một chuyện cần xem." },
        { label: "Dựng bản mới", detail: "Chỉ chạy khi các bước trước qua. Chất lượng là phần cố định, phạm vi là phần điều chỉnh." },
        { label: "Triển khai", detail: "Chỉ đến đây với thứ đã qua mọi bước. Quyết định tách dịch vụ hay đổi cấu trúc vẫn cần một người ngồi nghĩ." },
      ],
    },
  ],

  "buoi-ra-soat-hang-nam": [
    {
      type: "scenario",
      title: "Cuối buổi rà soát",
      start: "s1",
      nodes: {
        s1: {
          text: "Buổi rà soát hằng năm vừa xong. Bạn phát hiện ngưỡng cảnh báo độ trễ đặt từ ba năm trước, trong khi lưu lượng đã tăng gấp nhiều lần, cùng một bản sao lưu chưa từng khôi phục thử và hai thư viện đã ngừng bảo trì.",
          choices: [
            { label: "Ghi cả ba vào ghi chú, định bụng xử lý khi rảnh", next: "bad_intent" },
            { label: "Gắn mỗi việc với một ngày cụ thể và một người làm", next: "s2" },
          ],
        },
        bad_intent: {
          text: "Năm sau, buổi rà soát mở ra đúng ba phát hiện đó, giờ có thêm hai cái nữa. Nó chỉ là một buổi để biết, không phải để sửa. Trong lúc đó, một đợt tải cao lên mà không có cảnh báo nào kêu.",
          ending: "bad",
        },
        s2: {
          text: "Ngưỡng cảnh báo sửa trong tuần này, thư viện nâng trong tháng sau. Còn bản sao lưu: bạn thử khôi phục thì thấy tệp cấu hình thiếu.",
          choices: [
            { label: "Sửa thiếu sót rồi khôi phục thử lại cho tới khi chạy được", next: "good" },
            { label: "Coi như đã có sao lưu vì tệp vẫn nằm ở đó", next: "bad_backup" },
          ],
        },
        bad_backup: {
          text: "Một sự cố ổ đĩa xảy ra sáu tháng sau. Bản sao lưu không khôi phục được vì thiếu cấu hình. Một bản sao chưa từng khôi phục thì chưa tính là bản sao.",
          ending: "bad",
        },
        good: {
          text: "Cả ba việc xong đúng ngày, và bản sao lưu đã được khôi phục thử thành công. Buổi rà soát năm sau bắt đầu từ danh sách mới thay vì danh sách cũ.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Buổi rà soát hằng năm đơn giản hơn bạn nghĩ",
      intro:
        "Rà soát hằng năm giống đi kiểm định xe: xe vẫn chạy ngon, nhưng có những thứ chỉ lộ ra khi có người kiểm theo danh sách.",
      columns: ["Thành phần", "Kiểm định xe", "Rà soát hệ thống"],
      rows: [
        ["Cái không báo tín hiệu", "Phanh mòn dần mà xe vẫn chạy", "Ngưỡng cảnh báo lỗi thời so với lưu lượng hiện tại"],
        ["Cái kiểm bằng cách thử", "Đạp phanh thử, không đoán", "Khôi phục thử bản sao lưu trên một máy trống"],
        ["Cái lớn lên theo năm", "Xe chở nặng hơn trước", "Phần mã lớn hơn, cùng số bài kiểm thử phủ được ít hơn"],
        ["Kết quả", "Phiếu ghi hạn sửa từng mục", "Mỗi phát hiện gắn một ngày cụ thể"],
      ],
      oneLiner: "Công cụ bắt được lỗi, nhưng chỉ buổi rà soát bắt được sự lỗi thời, và nó chỉ có ích khi phát hiện nào cũng có ngày sửa.",
    },
  ],

  "tong-ket-toan-bo-lo-trinh": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Lời khuyên chọn một công nghệ mới nổi",
      task:
        "Bạn hỏi một trợ lý nên dùng công cụ cơ sở dữ liệu mới nổi cho dự án nhỏ của mình hay không. Nó trả lời bằng đoạn dưới. Bấm các câu đi ngược các nguyên tắc cả lộ trình lặp lại, rồi nộp.",
      segments: [
        { text: "Trước hết hãy hỏi dữ liệu của bạn sống bao lâu, vì câu này loại bớt phần lớn lựa chọn." },
        {
          text: "Nên chọn công cụ này vì nó đang nổi và đội nào cũng đang chuyển sang.",
          error: "Một công cụ đang nổi không trả lời được câu hỏi nào về dữ liệu của bạn. Chạy theo công cụ mới vì nó đang được chú ý là kiểu quyết định lộ trình này khuyên tránh.",
        },
        { text: "Hãy xem nó hỏng ra sao: hỏng ầm ĩ và dừng hẳn thường rẻ hơn hỏng im lặng và trả dữ liệu sai." },
        {
          text: "Cứ chọn cấu hình nhanh nhất trước, chuyện duy trì và chuyển dữ liệu sau này tính sau.",
          error: "Tốc độ là kết quả, không phải điểm xuất phát, và duy trì được quan trọng hơn tối ưu ở mọi chủ đề. Dữ liệu bền đặt trước, lớp tăng tốc sau.",
        },
        { text: "Cuối cùng hãy hỏi nếu nó sập thì kéo theo những gì, để quyết định mức dự phòng." },
      ],
    },
    {
      type: "flow",
      title: "Năm bước đánh giá một công nghệ chưa từng học",
      steps: [
        { label: "Dữ liệu sống bao lâu", detail: "Câu đầu tiên và thường là câu duy nhất cần. Nó loại phần lớn lựa chọn không phù hợp trước khi bàn thứ khác." },
        { label: "Chạy ở phía nào", detail: "Phía người dùng thì ai cũng đọc và sửa được. Phía máy chủ thì bạn kiểm soát, nhưng trả bằng một vòng gọi mạng." },
        { label: "Hỏng thì hỏng ra sao", detail: "Hỏng ầm ĩ và dừng hẳn, hay hỏng im lặng và trả dữ liệu sai? Loại thứ hai đắt hơn vì không ai biết." },
        { label: "Xấu nhất thì mất gì", detail: "Không hỏi nó nhanh tới đâu mà hỏi nếu nó sập thì kéo theo những gì. Câu này quyết định mức dự phòng." },
        { label: "Chọn cái duy trì được", detail: "Trong các lựa chọn còn lại, lấy thứ bạn dựng lại được và nuôi được lâu. Duy trì được quan trọng hơn tối ưu." },
      ],
    },
  ],

  // ── Bài lẻ ─────────────────────────────────────────────────────────────────
  "diem-mu-khi-doc-code-cua-chinh-minh": [
    {
      type: "exercise",
      language: "python",
      title: "Lỗi nhìn qua thì không thấy",
      task:
        "Đoạn mã dưới tính tổng và trung bình của bốn mức giá (120, 80, 50, 150), nhưng in sai. Đừng đọc lướt: đọc to từng dòng, đặc biệt dòng for, như thể bạn đọc mã của người lạ. Sửa để tổng là 400 và trung bình là 100.",
      starter: `gia = [120, 80, 50, 150]

tong = 0
for i in range(1, len(gia)):
    tong += gia[i]

print("Tổng:", tong)
print("Trung bình:", tong / len(gia))
`,
      solution: `gia = [120, 80, 50, 150]

tong = 0
for i in range(0, len(gia)):
    tong += gia[i]

print("Tổng:", tong)
print("Trung bình:", tong / len(gia))
`,
      expectedOutput: `Tổng: 400
Trung bình: 100.0`,
      hints: [
        "Danh sách trong Python đếm từ 0. Phần tử đầu tiên là gia[0].",
        "Thử viết ra giấy giá trị của i qua từng vòng và so với các phần tử trong danh sách.",
        "Nếu bạn vẫn không thấy: đổi góc nhìn, thử đọc to từng dòng hoặc giải thích dòng for cho một vật vô tri.",
      ],
    },
  ],
};
