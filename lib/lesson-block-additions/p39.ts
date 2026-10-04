import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 39. Một người viết cho một tệp.
const L = (...lines: string[]) => lines.join("\n");

export const P39_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Thị trường VN ───────────────────────────────────────────────────────
  "thanh-toan-cho-nguoi-dung-viet-nam": [
    {
      type: "exercise",
      language: "python",
      title: "Đối soát hai trạng thái: cổng nói gì, bạn đã cấp gì",
      task: "Mỗi giao dịch có hai trường tách biệt: trạng thái do cổng báo (paid, failed, pending) và việc bạn đã cấp quyền lợi chưa (granted). In ra việc cần làm cho từng giao dịch: paid mà chưa cấp thì \"cấp quyền lợi\", failed mà đã lỡ cấp thì \"thu hồi quyền lợi\", pending thì luôn \"hỏi lại cổng\" vì chưa ai biết kết quả. Giao dịch đã khớp thì không in gì.",
      starter: L(
        "data = [",
        "    (\"T1\", \"paid\", False),",
        "    (\"T2\", \"failed\", True),",
        "    (\"T3\", \"pending\", False),",
        "    (\"T4\", \"paid\", True),",
        "    (\"T5\", \"pending\", True),",
        "]",
        "",
        "# Mã này chỉ nhìn trạng thái của cổng và bỏ qua granted",
        "for tid, gateway, granted in data:",
        "    if gateway == \"paid\":",
        "        print(f\"{tid}: cấp quyền lợi\")",
        "    elif gateway == \"failed\":",
        "        print(f\"{tid}: thu hồi quyền lợi\")",
        "    else:",
        "        print(f\"{tid}: hỏi lại cổng\")",
      ),
      solution: L(
        "data = [",
        "    (\"T1\", \"paid\", False),",
        "    (\"T2\", \"failed\", True),",
        "    (\"T3\", \"pending\", False),",
        "    (\"T4\", \"paid\", True),",
        "    (\"T5\", \"pending\", True),",
        "]",
        "",
        "for tid, gateway, granted in data:",
        "    if gateway == \"pending\":",
        "        print(f\"{tid}: hỏi lại cổng\")",
        "    elif gateway == \"paid\" and not granted:",
        "        print(f\"{tid}: cấp quyền lợi\")",
        "    elif gateway == \"failed\" and granted:",
        "        print(f\"{tid}: thu hồi quyền lợi\")",
      ),
      expectedOutput: L("T1: cấp quyền lợi", "T2: thu hồi quyền lợi", "T3: hỏi lại cổng", "T5: hỏi lại cổng"),
      hints: [
        "T4 đã paid và đã được cấp: hai vế khớp nhau nên không cần làm gì.",
        "Chỉ hai điều kiện cần thêm granted; pending thì không cần nhìn tới nó.",
      ],
    },
    {
      type: "flow",
      title: "Một khoản chuyển khoản nhanh đi từ đơn hàng tới quyền lợi",
      steps: [
        {
          label: "Đơn sinh ra mã nội dung",
          detail:
            "Khi người dùng chọn chuyển khoản, hệ thống tạo một mã duy nhất gắn với đơn và hiện nó trong nội dung chuyển khoản hoặc mã QR. Mã này là sợi dây duy nhất nối tiền với đơn ở các bước sau.",
        },
        {
          label: "Người dùng chuyển tiền",
          detail:
            "Tiền đi qua ngân hàng của họ, ngoài tầm nhìn của sản phẩm. Họ có thể sửa nội dung, chuyển thiếu hoặc chuyển hai lần; đơn lúc này vẫn ở trạng thái chờ và chưa cấp gì.",
        },
        {
          label: "Tin báo về từ cổng hoặc bảng kê",
          detail:
            "Một dòng giao dịch đến với số tiền và nội dung chuyển khoản. Ghi nó vào trường trạng thái của cổng, tách hẳn với trường \"đã cấp quyền lợi\" để về sau còn biết vế nào lệch.",
        },
        {
          label: "Khớp theo nội dung",
          detail:
            "So mã trong nội dung với đơn đang chờ, rồi so số tiền. Khớp cả hai thì đi tiếp; sai mã hoặc sai số tiền thì dòng này không được tự động cấp gì mà rẽ sang hàng chờ xử lý tay.",
        },
        {
          label: "Cấp quyền lợi",
          detail:
            "Chỉ khi bước khớp đã qua mới đổi trường quyền lợi, và làm sao cho chạy lại bước này không cấp lần hai. Dòng giao dịch đến trễ hoặc đến hai lần là chuyện bình thường.",
        },
        {
          label: "Đối soát cuối ngày",
          detail:
            "Quét hai nhóm lệch: tiền đã về mà chưa cấp, và đã cấp mà chưa thấy tiền. Nhóm thứ hai cũng quan trọng không kém nhóm đầu vì nó là phần bạn đang chịu lỗ.",
        },
      ],
    },
  ],

  "dinh-danh-va-xac-thuc-nguoi-dung-vn": [
    {
      type: "scenario",
      title: "Đặt từng bậc xác thực vào đúng chỗ",
      start: "dk",
      nodes: {
        dk: {
          text: "Bạn làm một ứng dụng mua bán vé sự kiện, có cả bán lại vé và rút tiền về tài khoản. Đội đang tranh luận xem yêu cầu xác thực ở màn hình đăng ký thế nào. Bạn chọn gì?",
          choices: [
            { label: "Bắt chụp căn cước và khuôn mặt ngay lúc đăng ký", next: "kyc" },
            { label: "Chỉ cần số điện thoại để đăng ký và xem vé", next: "rut" },
            { label: "Không xác thực gì, chỉ cần một địa chỉ email", next: "mail" },
          ],
        },
        kyc: {
          text: "Ở màn hình đăng ký, yêu cầu này đứng giữa người dùng và một thứ họ chưa biết có đáng hay không. Phần lớn dừng lại vì đang đi đường, thiếu sáng hoặc không mang giấy tờ, và không quay lại. Số đăng ký thật giảm mạnh dù chưa ai gian lận.",
          ending: "bad",
        },
        mail: {
          text: "Ai cũng tạo được hàng loạt tài khoản chỉ bằng email dùng một lần. Chỉ vài ngày sau, các tài khoản tự động chiếm hết vé mở bán, và người mua thật phải mua lại với giá cao hơn từ chính chúng.",
          ending: "bad",
        },
        rut: {
          text: "Số điện thoại chặn được phần lớn tài khoản tự động và người dùng thật vào được ngay. Giờ đến việc rút tiền: số tiền có thể lớn, và tài khoản có thể là của người khác. Bạn đặt bậc nào ở bước này?",
          choices: [
            { label: "Giữ nguyên số điện thoại, vì đã chặn được tự động", next: "sdt" },
            { label: "Hỏi căn cước ở lần rút tiền đầu tiên", next: "mat" },
            { label: "Yêu cầu căn cước và khuôn mặt cho mọi lượt rút", next: "moi" },
          ],
        },
        sdt: {
          text: "Số điện thoại không chứng minh được danh tính. Một người mượn sim của người khác bán vé lừa đảo rồi rút tiền ngay; khi có khiếu nại, không có giấy tờ nào để lần ra ai chịu trách nhiệm và khoản tiền đã đi mất.",
          ending: "bad",
        },
        moi: {
          text: "Người bán nhỏ rút vài chục nghìn mỗi tuần phải chụp mặt đi chụp mặt lại mỗi lần, trong khi gian lận lớn nhất đã bị chặn từ lần đầu. Phần đông bỏ nền tảng và chuyển sang nơi thu tiền dễ hơn.",
          ending: "bad",
        },
        mat: {
          text: "Cùng yêu cầu chụp căn cước, nhưng bây giờ nó đứng giữa người dùng và tiền của chính họ, nên gần như ai cũng làm. Có một người bán chưa có giấy tờ trong tay lúc đó. Bạn xử lý thế nào?",
          choices: [
            { label: "Báo lỗi chung chung và bắt làm lại từ đầu", next: "loi" },
            { label: "Giữ yêu cầu rút, mời bổ sung giấy tờ khi tiện", next: "ok" },
          ],
        },
        loi: {
          text: "Người bán không biết thiếu gì, cũng không biết tiền còn đó không. Họ gọi hỗ trợ, rồi một phần bỏ ngang, và bạn mất đúng nhóm người dùng đã sẵn sàng làm bậc xác thực cao nhất.",
          ending: "bad",
        },
        ok: {
          text: "Đăng ký không bị chặn, bậc cao nằm đúng nơi người dùng có lý do để làm, và người chưa mang giấy tờ không mất tiền, chỉ phải chờ thêm. Mỗi bậc đặt đúng chỗ của nó.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Mỗi bậc chặn thêm lạm dụng và mất thêm người dùng thật",
      caption:
        "Số liệu minh hoạ để thấy hình dạng, không phải đo từ sản phẩm nào: bậc càng cao thì tài khoản giả bị chặn càng nhiều và người dùng thật còn lại càng ít. Số của sản phẩm bạn phải đo bằng cách chạy thử từng bậc.",
      kind: "bar",
      xLabel: "Bậc xác thực",
      yLabel: "Phần trăm (minh hoạ)",
      data: [
        { label: "Không xác thực", values: [100, 0] },
        { label: "Số điện thoại", values: [88, 70] },
        { label: "Giấy tờ tuỳ thân", values: [62, 92] },
        { label: "Đối chiếu khuôn mặt", values: [47, 98] },
      ],
      seriesLabels: ["Người dùng thật còn lại", "Tài khoản giả bị chặn"],
    },
  ],

  "giai-phau-mot-su-co-thanh-toan": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bản nháp báo cáo sự cố do AI viết",
      task: "AI soạn bản nháp báo cáo sau sự cố cổng thanh toán gián đoạn 40 phút. Bấm vào những đoạn đi ngược với điều bài vừa dạy rồi nộp.",
      segments: [
        {
          text: "Cổng thanh toán gián đoạn khoảng 40 phút. Nguyên nhân nằm ở nhà cung cấp nên đội không sửa được, và phần việc của chúng ta là hạn chế hậu quả.",
        },
        {
          text: "Quy mô sự cố là 40 phút gián đoạn và một khoản doanh thu nhỏ bị mất, vì vậy có thể xếp mức nghiêm trọng thấp.",
          error:
            "Thời gian gián đoạn là con số nhỏ nhất trong câu chuyện. Quy mô thật nằm ở số giao dịch treo phải hỏi lại, hoàn tiền một phần và trả lời khiếu nại trong nhiều ngày.",
        },
        {
          text: "Có khoảng hai nghìn giao dịch rơi vào nhóm treo, tức là không biết cổng đã nhận chưa và người dùng đã bị trừ tiền chưa. Đội hỏi lại cổng cho từng giao dịch.",
        },
        {
          text: "Trong lúc sự cố, nên để nút thanh toán hoạt động như thường và cho người dùng bấm thử lại tuỳ ý, vì mỗi lần thử đều có thể thành công.",
          error:
            "Mỗi lần bấm lại tạo thêm một giao dịch treo và có thể tự trừ tiền người dùng lần hai. Một dòng thông báo rõ ngay trên màn hình thanh toán rẻ hơn nhiều.",
        },
        {
          text: "Các giao dịch treo được xếp vào thất bại và tự động hoàn tiền cho toàn bộ người dùng để đóng sự cố nhanh.",
          error:
            "Treo không phải thất bại: có giao dịch đã được cổng nhận và đã trừ tiền, có giao dịch thì chưa. Hoàn hàng loạt sẽ hoàn nhầm và để lại chênh lệch khó đối soát.",
        },
        {
          text: "Việc đầu tiên sau sự cố là đưa một dòng thông báo lên màn hình thanh toán ngay từ phút đầu, vì đây là biện pháp rẻ nhất để giảm số giao dịch treo.",
        },
      ],
    },
    {
      type: "chart",
      title: "Giao dịch treo tích tụ theo từng phút sự cố",
      caption:
        "Mô hình minh hoạ, không phải số đo thật: giả sử mỗi phút có một số lượng giao dịch đến, và người dùng bấm lại làm hệ số nhân lên. Dòng thông báo rõ ràng được giả định chỉ làm giảm phần bấm lại, không xoá hết nó.",
      kind: "line",
      xLabel: "Số phút sự cố",
      yLabel: "Số giao dịch treo",
      x: { from: 0, to: 60, step: 10 },
      params: [
        { id: "rate", label: "Giao dịch đến mỗi phút", min: 10, max: 100, step: 5, value: 40 },
        { id: "retry", label: "Hệ số bấm lại khi không có thông báo", min: 1, max: 3, step: 0.5, value: 2 },
      ],
      series: [
        { label: "Không thông báo, người dùng bấm lại", expr: "x*rate*retry" },
        { label: "Có thông báo rõ trên màn hình thanh toán", expr: "x*rate*(1+(retry-1)/4)" },
      ],
    },
  ],

  "nghia-vu-voi-nguoi-dung-va-khieu-nai": [
    {
      type: "exercise",
      language: "python",
      title: "Chính sách hoàn tiền cần đúng những trường dữ liệu nào",
      task: "Chính sách: trong 7 ngày kể từ lúc mua được hoàn lại phần chưa dùng của đơn, sau 7 ngày thì không hoàn. Mỗi đơn có số ngày đã qua (days), giá (price) và tỷ lệ đã dùng (used, từ 0 tới 1). In số tiền hoàn của từng đơn. Mã khởi đầu hoàn nguyên giá nếu còn trong hạn, bỏ qua phần đã dùng.",
      starter: L(
        "orders = [",
        "    (\"A1\", 3, 200000, 0),",
        "    (\"A2\", 5, 200000, 0.25),",
        "    (\"A3\", 10, 200000, 0),",
        "    (\"A4\", 7, 100000, 0.5),",
        "]",
        "",
        "for oid, days, price, used in orders:",
        "    amount = price if days <= 7 else 0",
        "    print(f\"{oid}: {amount}\")",
      ),
      solution: L(
        "orders = [",
        "    (\"A1\", 3, 200000, 0),",
        "    (\"A2\", 5, 200000, 0.25),",
        "    (\"A3\", 10, 200000, 0),",
        "    (\"A4\", 7, 100000, 0.5),",
        "]",
        "",
        "for oid, days, price, used in orders:",
        "    amount = round(price * (1 - used)) if days <= 7 else 0",
        "    print(f\"{oid}: {amount}\")",
      ),
      expectedOutput: L("A1: 200000", "A2: 150000", "A3: 0", "A4: 50000"),
      hints: [
        "Phần được hoàn là phần chưa dùng: price nhân với (1 - used).",
        "Để ý đơn A4: ngày thứ 7 vẫn còn nằm trong hạn.",
      ],
    },
    {
      type: "feynman",
      title: "Mỗi câu trong điều khoản là một trường dữ liệu",
      intro:
        "Hãy nghĩ tới một cửa hàng ghi hoá đơn tay. Nếu không ghi ngày bán thì sau này không ai chứng minh được món hàng còn trong hạn đổi trả. Điều khoản nào viết ra cũng cần một thứ được ghi lại để thực hiện nó.",
      columns: ["Cam kết viết ra", "Giống như", "Phải ghi từ ngày đầu"],
      rows: [
        ["Hoàn tiền trong 7 ngày", "Ngày in trên hoá đơn", "Thời điểm giao dịch và mức đã dùng"],
        ["Tra cứu khiếu nại", "Số phiếu bảo hành", "Mã tham chiếu nối phản ánh với giao dịch"],
        ["Xoá tài khoản", "Ngăn kéo hồ sơ khách và ngăn sổ sách thuế", "Nhãn phân loại dữ liệu xoá được và buộc giữ"],
        ["Đổi điều khoản", "Chữ ký của khách ở mỗi lần ký lại", "Phiên bản điều khoản và thời điểm chấp nhận"],
      ],
      oneLiner: "Thêm tính năng lúc nào cũng được, nhưng một trường dữ liệu không được ghi từ đầu thì thiếu vĩnh viễn ở mọi giao dịch cũ.",
    },
  ],

  "so-lieu-thi-truong-noi-gi-va-giau-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp hạng theo thị phần hay theo tích?",
      task: "Sản phẩm có ba nhóm thiết bị với phần trăm người dùng và doanh thu trung bình mỗi người (số minh hoạ). Xếp nhóm theo doanh thu thực (người dùng nhân giá trị) rồi in thứ hạng cùng phần trăm doanh thu và phần trăm người dùng của nhóm đó. Mã khởi đầu xếp theo số người dùng và in nhầm phần trăm người dùng vào cột doanh thu.",
      starter: L(
        "data = [(\"Nền tảng A\", 80, 10), (\"Nền tảng B\", 13, 40), (\"Nền tảng C\", 7, 100)]",
        "",
        "ranked = sorted(data, key=lambda d: d[1], reverse=True)",
        "for i, (name, users, value) in enumerate(ranked, 1):",
        "    share = users",
        "    print(f\"{i}. {name}: {share:.1f}% doanh thu ({users}% người dùng)\")",
      ),
      solution: L(
        "data = [(\"Nền tảng A\", 80, 10), (\"Nền tảng B\", 13, 40), (\"Nền tảng C\", 7, 100)]",
        "",
        "total = sum(users * value for _, users, value in data)",
        "ranked = sorted(data, key=lambda d: d[1] * d[2], reverse=True)",
        "for i, (name, users, value) in enumerate(ranked, 1):",
        "    share = users * value / total * 100",
        "    print(f\"{i}. {name}: {share:.1f}% doanh thu ({users}% người dùng)\")",
      ),
      expectedOutput: L(
        "1. Nền tảng A: 39.6% doanh thu (80% người dùng)",
        "2. Nền tảng C: 34.7% doanh thu (7% người dùng)",
        "3. Nền tảng B: 25.7% doanh thu (13% người dùng)",
      ),
      hints: [
        "Doanh thu của một nhóm là users * value; tổng doanh thu là tổng các tích đó.",
        "Nhóm C chỉ có 7% người dùng nhưng sẽ vượt nhóm B khi xếp theo tích.",
      ],
    },
    {
      type: "feynman",
      title: "Thị phần không phải là phần của chiếc bánh bạn ăn được",
      intro:
        "Một quán có nhiều khách vào nhưng đa số chỉ gọi nước lọc, trong khi vài bàn nhỏ gọi cả bữa. Nhìn số lượt khách thì quán thấy mình phục vụ đại chúng, nhìn hoá đơn thì quán sống nhờ vài bàn ấy.",
      columns: ["Cách nhìn", "Giống như", "Dẫn tới quyết định"],
      rows: [
        ["Tỷ lệ toàn quốc", "Đếm tất cả người đi qua phố", "Làm cho nhóm đông nhất dù nhóm đó đóng góp ít"],
        ["Tỷ lệ trong tập của bạn", "Đếm khách đã bước vào quán", "Đáng tin hơn báo cáo thị trường từ vài trăm người dùng"],
        ["Tích tỷ lệ và giá trị", "Cộng tiền trên hoá đơn từng bàn", "Có thể đảo ngược thứ hạng do thị phần cho ra"],
        ["Giả định không ghi", "Lời hứa miệng với thợ", "Sáu tháng sau không ai nhớ nó từng là giả định"],
      ],
      oneLiner: "Đừng hỏi nhóm nào đông nhất mà hỏi nhóm nào, nhân với giá trị của họ, đóng góp nhiều nhất trong tập của bạn.",
    },
  ],

  "thiet-bi-va-mang-cua-nguoi-dung-vn": [
    {
      type: "exercise",
      language: "javascript",
      title: "Ba hệ số nhân lên nhau",
      task: "Màn hình mở mất 1.5 giây trên máy của đội. Với mỗi hồ sơ gồm hệ số phần cứng, mạng và lần chạy đầu, tính thời gian người dùng thật chờ bằng cách NHÂN các hệ số và in kèm \" - vượt 8 giây\" nếu tới ngưỡng đó (ngưỡng 8 giây là giả định minh hoạ). Mã khởi đầu đang cộng các hệ số.",
      starter: L(
        "const base = 1.5;",
        "const profiles = [",
        "  [\"Máy đội, mạng văn phòng\", 1, 1, 1],",
        "  [\"Máy tầm trung, 4G\", 2, 2, 1.5],",
        "  [\"Máy phổ thông, 3G\", 3, 4, 1.5],",
        "];",
        "",
        "for (const [name, hw, net, first] of profiles) {",
        "  const t = base + hw + net + first;",
        "  const flag = t > 8 ? \" - vượt 8 giây\" : \"\";",
        "  console.log(`${name}: ${t.toFixed(1)} giây${flag}`);",
        "}",
      ),
      solution: L(
        "const base = 1.5;",
        "const profiles = [",
        "  [\"Máy đội, mạng văn phòng\", 1, 1, 1],",
        "  [\"Máy tầm trung, 4G\", 2, 2, 1.5],",
        "  [\"Máy phổ thông, 3G\", 3, 4, 1.5],",
        "];",
        "",
        "for (const [name, hw, net, first] of profiles) {",
        "  const t = base * hw * net * first;",
        "  const flag = t > 8 ? \" - vượt 8 giây\" : \"\";",
        "  console.log(`${name}: ${t.toFixed(1)} giây${flag}`);",
        "}",
      ),
      expectedOutput: L(
        "Máy đội, mạng văn phòng: 1.5 giây",
        "Máy tầm trung, 4G: 9.0 giây - vượt 8 giây",
        "Máy phổ thông, 3G: 27.0 giây - vượt 8 giây",
      ),
      hints: ["Công thức của bài: thời gian trên máy đội nhân cả ba hệ số, không cộng."],
    },
    {
      type: "chart",
      title: "Một giây rưỡi trên máy đội, bao lâu trên máy thật?",
      caption:
        "Mô hình minh hoạ theo công thức của bài: thời gian của người dùng thật bằng thời gian trên máy đội nhân ba hệ số. Các hệ số trên thanh trượt là giả định để bạn thử, không phải số đo thật của một thiết bị hay nhà mạng nào.",
      kind: "line",
      xLabel: "Thời gian trên máy đội (giây)",
      yLabel: "Thời gian người dùng chờ (giây)",
      x: { from: 0.5, to: 3, step: 0.5 },
      params: [
        { id: "hw", label: "Hệ số phần cứng", min: 1, max: 4, step: 0.5, value: 2 },
        { id: "net", label: "Hệ số mạng", min: 1, max: 4, step: 0.5, value: 2 },
        { id: "first", label: "Hệ số lần chạy đầu", min: 1, max: 2, step: 0.1, value: 1.5 },
      ],
      series: [
        { label: "Máy đội", expr: "x" },
        { label: "Người dùng thật", expr: "x*hw*net*first" },
      ],
    },
  ],

  "tieng-viet-trong-san-pham": [
    {
      type: "exercise",
      language: "javascript",
      title: "Chuẩn hoá một lần, tìm kiếm không dấu",
      task: "Người dùng gõ \"huong\" không dấu và muốn tìm ra mọi tên Hương, kể cả tên lưu bằng ký tự dấu đứng riêng (tên thứ tư bên dưới) hay chữ hoa. Viết hàm fold: chữ thường, tách dấu bằng normalize(\"NFD\"), bỏ ký tự dấu, đổi đ thành d. Mã khởi đầu chỉ đổi chữ thường nên không khớp được cái nào.",
      starter: L(
        "const names = [",
        "  \"Nguyễn Thị Hương\",",
        "  \"Trần Văn Hưng\",",
        "  \"HƯƠNG Giang\",",
        "  \"Đặng Hu\\u031Bo\\u031Bng\",",
        "  \"Phạm Minh Đức\",",
        "];",
        "",
        "const fold = (s) => s.toLowerCase();",
        "",
        "const hits = names.map(fold).filter((n) => n.includes(\"huong\"));",
        "hits.forEach((n) => console.log(\"- \" + n));",
        "console.log(`Khớp: ${hits.length}/${names.length}`);",
      ),
      solution: L(
        "const names = [",
        "  \"Nguyễn Thị Hương\",",
        "  \"Trần Văn Hưng\",",
        "  \"HƯƠNG Giang\",",
        "  \"Đặng Hu\\u031Bo\\u031Bng\",",
        "  \"Phạm Minh Đức\",",
        "];",
        "",
        "const fold = (s) =>",
        "  s.toLowerCase().normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g, \"\").replace(/đ/g, \"d\");",
        "",
        "const hits = names.map(fold).filter((n) => n.includes(\"huong\"));",
        "hits.forEach((n) => console.log(\"- \" + n));",
        "console.log(`Khớp: ${hits.length}/${names.length}`);",
      ),
      expectedOutput: L("- nguyen thi huong", "- huong giang", "- dang huong", "Khớp: 3/5"),
      hints: [
        "Các dấu sau khi tách NFD nằm trong khoảng U+0300 đến U+036F; chữ đ không tách được nên cần replace riêng.",
        "\"Hưng\" không chứa \"huong\" dù bỏ dấu, nên nó phải ở ngoài kết quả.",
      ],
    },
    {
      type: "flow",
      title: "Chuẩn hoá ở cửa vào, một lần duy nhất",
      steps: [
        {
          label: "Chuỗi đi vào hệ thống",
          detail:
            "Biểu mẫu, tệp nhập và tin nhắn từ ứng dụng khác gửi cùng một câu bằng các dạng byte khác nhau. Máy bàn phím, tệp xuất từ bảng tính và bản dán từ web đều có thể mang dạng riêng.",
        },
        {
          label: "Chuẩn hoá về một dạng",
          detail:
            "Ngay tại cửa vào, đổi mọi chuỗi về cùng một dạng (chữ đã gộp sẵn dấu). Đây là một quy tắc duy nhất, kiểm được bằng một bài kiểm duy nhất.",
        },
        {
          label: "Lưu hai cột",
          detail:
            "Giữ bản hiển thị đúng như người dùng nhập, và thêm một cột đã bỏ dấu viết thường cho tìm kiếm. Hai cột phục vụ hai việc khác nhau nên đừng bắt một cột làm cả hai.",
        },
        {
          label: "So sánh và sắp xếp",
          detail:
            "Bây giờ hai chuỗi trông giống nhau thì byte cũng giống nhau, nên phép so sánh cho ra bằng nhau. Sắp xếp theo quy tắc ngôn ngữ thay vì theo mã ký tự để chữ có dấu không bị dồn xuống cuối.",
        },
        {
          label: "Tìm kiếm",
          detail:
            "Người gõ \"huong\" được so với cột không dấu, trúng cả Hương và HƯƠNG. Muốn phân biệt Hưng với Hương thì sau đó mới xếp thứ tự ưu tiên khớp có dấu lên trước.",
        },
      ],
    },
  ],

  // ── Runtime ─────────────────────────────────────────────────────────────
  "may-ao-lam-gi-tu-ma-nguon-toi-lenh-may": [
    {
      type: "exercise",
      language: "python",
      title: "Bỏ giai đoạn làm nóng trước khi đo",
      task: "Một hàm được gọi 20 lần. Bốn lần đầu còn chạy thông dịch nên tốn 40 ms mỗi lần, sau đó được biên dịch và chỉ tốn 1 ms (số minh hoạ). In trung bình cả lượt chạy, trung bình sau làm nóng và hệ số bạn đã tính nhầm nếu đo cả hai giai đoạn. Mã khởi đầu đo cả lượt chạy cho cả hai dòng.",
      starter: L(
        "SLOW, FAST, WARMUP, CALLS = 40, 1, 4, 20",
        "costs = [SLOW if i < WARMUP else FAST for i in range(CALLS)]",
        "",
        "all_avg = sum(costs) / len(costs)",
        "warm = costs",
        "warm_avg = sum(warm) / len(warm)",
        "",
        "print(f\"Trung bình cả lượt chạy: {all_avg:.1f} ms\")",
        "print(f\"Trung bình sau làm nóng: {warm_avg:.1f} ms\")",
        "print(f\"Tính nhầm gấp: {all_avg / warm_avg:.1f} lần\")",
      ),
      solution: L(
        "SLOW, FAST, WARMUP, CALLS = 40, 1, 4, 20",
        "costs = [SLOW if i < WARMUP else FAST for i in range(CALLS)]",
        "",
        "all_avg = sum(costs) / len(costs)",
        "warm = costs[WARMUP:]",
        "warm_avg = sum(warm) / len(warm)",
        "",
        "print(f\"Trung bình cả lượt chạy: {all_avg:.1f} ms\")",
        "print(f\"Trung bình sau làm nóng: {warm_avg:.1f} ms\")",
        "print(f\"Tính nhầm gấp: {all_avg / warm_avg:.1f} lần\")",
      ),
      expectedOutput: L("Trung bình cả lượt chạy: 8.8 ms", "Trung bình sau làm nóng: 1.0 ms", "Tính nhầm gấp: 8.8 lần"),
      hints: ["Phần đo sau làm nóng là các phần tử từ vị trí WARMUP trở đi."],
    },
    {
      type: "chart",
      title: "Thời gian trung bình mỗi lần gọi giảm dần khi máy ảo làm nóng",
      caption:
        "Mô hình minh hoạ rất đơn giản: các lần gọi đầu chạy thông dịch, sau ngưỡng thì chạy mã đã biên dịch. Con số là giả định để bạn kéo thử, không phải số đo của một máy ảo cụ thể.",
      kind: "line",
      xLabel: "Số lần gọi hàm",
      yLabel: "Thời gian trung bình mỗi lần (ms)",
      x: { from: 10, to: 200, step: 10 },
      params: [
        { id: "t", label: "Ngưỡng bắt đầu biên dịch", min: 5, max: 100, step: 5, value: 30, unit: "lần" },
        { id: "slow", label: "Chi phí lúc thông dịch", min: 10, max: 50, step: 5, value: 40, unit: "ms" },
        { id: "fast", label: "Chi phí sau biên dịch", min: 1, max: 5, step: 1, value: 1, unit: "ms" },
      ],
      series: [{ label: "Trung bình tích luỹ", expr: "(min(x,t)*slow+max(x-t,0)*fast)/x" }],
    },
  ],

  "bo-cuc-bo-nho-va-chi-phi-truy-cap": [
    {
      type: "exercise",
      language: "python",
      title: "Đếm khối bộ nhớ đệm phải mang về",
      task: "Có 1000 đối tượng, mỗi đối tượng 20 trường 8 byte (160 byte), vòng lặp chỉ đọc 2 trường đầu. Một khối bộ nhớ đệm là 64 byte (số minh hoạ). Với bố cục mảng đối tượng, mỗi đối tượng kéo về một khối. Với bố cục theo trường, hai mảng 8 byte nằm liền nhau. In số khối và tỷ lệ byte hữu ích. Mã khởi đầu quên rằng các phần tử cùng trường nằm sát nhau trong một khối.",
      starter: L(
        "import math",
        "",
        "N, LINE, FIELD, USED = 1000, 64, 8, 2",
        "aos_lines = N",
        "soa_lines = USED * N",
        "useful = N * USED * FIELD",
        "",
        "for name, lines in [(\"Mảng đối tượng\", aos_lines), (\"Mảng theo trường\", soa_lines)]:",
        "    print(f\"{name}: {lines} khối, hữu ích {useful / (lines * LINE) * 100:.1f}%\")",
      ),
      solution: L(
        "import math",
        "",
        "N, LINE, FIELD, USED = 1000, 64, 8, 2",
        "aos_lines = N",
        "soa_lines = USED * math.ceil(N * FIELD / LINE)",
        "useful = N * USED * FIELD",
        "",
        "for name, lines in [(\"Mảng đối tượng\", aos_lines), (\"Mảng theo trường\", soa_lines)]:",
        "    print(f\"{name}: {lines} khối, hữu ích {useful / (lines * LINE) * 100:.1f}%\")",
      ),
      expectedOutput: L("Mảng đối tượng: 1000 khối, hữu ích 25.0%", "Mảng theo trường: 250 khối, hữu ích 100.0%"),
      hints: [
        "Một mảng 1000 phần tử 8 byte chiếm 8000 byte, tức 8000 / 64 khối; có hai mảng như vậy.",
        "Tỷ lệ hữu ích là số byte vòng lặp thật sự dùng chia cho số byte đã mang về.",
      ],
    },
    {
      type: "chart",
      title: "Mỗi khối đọc về có bao nhiêu phần dùng được",
      caption:
        "Mô hình minh hoạ theo ví dụ của bài: nếu mỗi đối tượng có ngần ấy trường và vòng lặp chỉ dùng một số trường, thì khi gom theo đối tượng chỉ phần đó là hữu ích. Gom theo trường được dùng cùng nhau thì gần như trọn vẹn.",
      kind: "line",
      xLabel: "Số trường mỗi đối tượng",
      yLabel: "Tỷ lệ hữu ích của khối đọc (%)",
      x: { from: 2, to: 40, step: 2 },
      params: [{ id: "used", label: "Số trường vòng lặp thật sự dùng", min: 1, max: 10, step: 1, value: 2 }],
      series: [
        { label: "Gom theo đối tượng đầy đủ", expr: "100*min(used,x)/x" },
        { label: "Gom theo trường dùng cùng nhau", expr: "100" },
      ],
    },
  ],

  "do-hieu-nang-o-tang-runtime": [
    {
      type: "scenario",
      title: "Hồ sơ chỉ vào một hàm trông không có gì sai",
      start: "ho_so",
      nodes: {
        ho_so: {
          text: "Hồ sơ hàm cho thấy hàm cộng giá đơn hàng chiếm phần lớn thời gian. Mã chỉ là một vòng lặp qua mảng đối tượng, và bạn không thấy gì sai trong đó. Bước tiếp theo của bạn là gì?",
          choices: [
            { label: "Đọc đi đọc lại vòng lặp tới khi thấy chỗ sai", next: "doc" },
            { label: "Mở bộ đếm phần cứng và xem số lệnh mỗi chu kỳ", next: "ipc" },
            { label: "Viết lại bằng thuật toán khác mà trên giấy nhanh hơn", next: "viet" },
          ],
        },
        doc: {
          text: "Vòng lặp không sai nên bạn đọc mãi không thấy gì. Hồ sơ hàm chỉ nói thời gian ở đâu chứ không nói vì sao chậm, và cả tuần trôi qua mà câu hỏi vẫn nằm sai tầng, không ở trong dòng mã bạn đang soi.",
          ending: "bad",
        },
        viet: {
          text: "Thuật toán mới ít phép tính hơn trên giấy nhưng vẫn đi qua cùng mảng đối tượng ấy. Thời gian chạy gần như không đổi, vì hằng số bị chi phối bởi số lượt chờ bộ nhớ chứ không phải số phép tính.",
          ending: "bad",
        },
        ipc: {
          text: "Số lệnh mỗi chu kỳ chỉ khoảng 0,4, thấp bất thường: bộ xử lý đang đứng chờ nhiều hơn là làm việc. Câu hỏi giờ chuyển sang thứ nó đang chờ. Bạn xem bộ đếm nào trước?",
          choices: [
            { label: "Số nhánh đoán sai, vì vòng lặp nào cũng có nhánh", next: "nhanh" },
            { label: "Số lượt trượt bộ nhớ đệm, nguyên nhân phổ biến nhất", next: "miss" },
            { label: "Số lần tranh chấp khoá, vì mọi chương trình đều đồng bộ", next: "khoa" },
          ],
        },
        nhanh: {
          text: "Vòng lặp chỉ có một nhánh luôn cùng hướng nên đoán sai rất ít, và nhánh như vậy rẻ. Bạn mất cả buổi kiểm một thứ bình thường trong khi lượt trượt bộ nhớ đệm vẫn nằm đó chưa ai nhìn.",
          ending: "bad",
        },
        khoa: {
          text: "Chương trình này chạy một luồng và không có khoá nào để tranh chấp. Bộ đếm cho kết quả bằng không, và bạn quay lại điểm bắt đầu sau khi đã mất công gắn công cụ đo.",
          ending: "bad",
        },
        miss: {
          text: "Tỷ lệ trượt rất cao. Mỗi đối tượng có 20 trường nhưng vòng lặp chỉ dùng 2, nên mỗi khối bộ nhớ đọc về chứa 18 trường vô ích. Bạn sửa theo hướng nào?",
          choices: [
            { label: "Thêm khoá quanh vòng lặp để các luồng khỏi giẫm nhau", next: "them_khoa" },
            { label: "Đổi mảng thành danh sách liên kết cho các nút gọn hơn", next: "ds" },
            { label: "Gom hai trường dùng cùng nhau vào một mảng riêng", next: "ok" },
          ],
        },
        them_khoa: {
          text: "Khoá không làm dữ liệu sát nhau hơn, nên số lượt trượt giữ nguyên, và bạn còn thêm chi phí đồng bộ vào một đoạn vốn chạy một luồng. Chương trình chậm hơn trước khi bạn bắt đầu sửa.",
          ending: "bad",
        },
        ds: {
          text: "Mỗi nút của danh sách nằm ở một chỗ khác nhau nên mỗi bước là một lượt chờ hàng trăm chu kỳ. Cấu trúc này làm số lượt trượt tăng lên chứ không giảm, và vòng lặp chậm hơn rõ.",
          ending: "bad",
        },
        ok: {
          text: "Hai trường được dùng cùng nhau giờ nằm sát nhau, mỗi khối đọc về gần như toàn dữ liệu hữu ích. Đo lại bộ đếm: số lệnh mỗi chu kỳ tăng rõ và hàm không còn đứng đầu hồ sơ.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Từ hồ sơ hàm xuống bộ đếm phần cứng",
      steps: [
        {
          label: "Hồ sơ hàm chỉ ra hàm",
          detail:
            "Công cụ lấy mẫu cho biết hàm nào chiếm phần lớn thời gian. Đây là câu hỏi \"ở đâu\" và nó đủ cho phần lớn công việc tối ưu, nên luôn đi trước.",
        },
        {
          label: "Hàm không có gì sai",
          detail:
            "Không có vòng lặp lồng, không gọi hàm thừa, thuật toán ổn. Đây chính là dấu hiệu để rời hồ sơ hàm, vì đọc mã thêm sẽ không trả lời câu hỏi \"vì sao\".",
        },
        {
          label: "Đọc số lệnh mỗi chu kỳ",
          detail:
            "Nếu con số thấp bất thường thì bộ xử lý đang đứng chờ. Câu hỏi chuyển từ mã của bạn sang thứ mà mã của bạn đang chờ.",
        },
        {
          label: "Chọn ba thứ đáng chờ",
          detail:
            "Bộ nhớ (lượt trượt bộ nhớ đệm), dự đoán nhánh (chỉ nhánh thất thường mới đắt) và đồng bộ (gồm cả chia sẻ sai). Nhìn bộ nhớ trước vì nó phổ biến nhất.",
        },
        {
          label: "Sửa bố cục hoặc nhánh",
          detail:
            "Mỗi nguyên nhân có một cách sửa riêng: gom dữ liệu theo trường dùng cùng nhau, làm nhánh dễ đoán, hoặc tách hai biến sang hai khối bộ nhớ khác nhau.",
        },
        {
          label: "Đo lại bằng chính bộ đếm đó",
          detail:
            "Số lệnh mỗi chu kỳ phải tăng và con số chiếm thời gian của hàm phải giảm. Không đổi tức là chưa đúng nguyên nhân, quay lại bước chọn.",
        },
      ],
    },
  ],

  "go-bo-diem-nghen-va-biet-khi-nao-dung": [
    {
      type: "exercise",
      language: "python",
      title: "Tính trần trước khi bắt tay vào làm",
      task: "Với mỗi phần của chương trình, biết nó chiếm bao nhiêu phần trăm thời gian. Tính mức giảm thời gian tối đa (nếu phần đó nhanh vô hạn) và mức tăng tốc tối đa của cả chương trình, rồi kết luận \"đáng làm\" nếu giảm được từ 10% trở lên (ngưỡng minh hoạ), còn lại \"dừng\". Mã khởi đầu tính nhầm cả hai con số.",
      starter: L(
        "parts = [(\"parse\", 20), (\"query\", 55), (\"render\", 5)]",
        "",
        "for name, pct in parts:",
        "    cut = 100 - pct",
        "    speed = 100 / pct",
        "    verdict = \"đáng làm\" if cut >= 10 else \"dừng\"",
        "    print(f\"{name}: chiếm {pct}%, giảm tối đa {cut}% thời gian, nhanh tối đa {speed:.2f} lần - {verdict}\")",
      ),
      solution: L(
        "parts = [(\"parse\", 20), (\"query\", 55), (\"render\", 5)]",
        "",
        "for name, pct in parts:",
        "    cut = pct",
        "    speed = 1 / (1 - pct / 100)",
        "    verdict = \"đáng làm\" if cut >= 10 else \"dừng\"",
        "    print(f\"{name}: chiếm {pct}%, giảm tối đa {cut}% thời gian, nhanh tối đa {speed:.2f} lần - {verdict}\")",
      ),
      expectedOutput: L(
        "parse: chiếm 20%, giảm tối đa 20% thời gian, nhanh tối đa 1.25 lần - đáng làm",
        "query: chiếm 55%, giảm tối đa 55% thời gian, nhanh tối đa 2.22 lần - đáng làm",
        "render: chiếm 5%, giảm tối đa 5% thời gian, nhanh tối đa 1.05 lần - dừng",
      ),
      hints: [
        "Làm một phần nhanh vô hạn thì chỉ bỏ được đúng phần trăm thời gian nó đang chiếm.",
        "Thời gian còn lại là 1 - pct/100 của ban đầu; tăng tốc là nghịch đảo của số đó.",
      ],
    },
    {
      type: "chart",
      title: "Tăng tốc một phần, chương trình nhanh lên bao nhiêu",
      caption:
        "Đường cong theo đúng phép tính của bài, với phần trăm thời gian là con số minh hoạ bạn tự kéo. Để ý đường trên cùng không bao giờ vượt trần dù bạn làm phần đó nhanh gấp trăm lần.",
      kind: "line",
      xLabel: "Phần được làm nhanh gấp bao nhiêu lần",
      yLabel: "Chương trình nhanh gấp (lần)",
      x: { from: 1, to: 51, step: 5 },
      params: [{ id: "p", label: "Phần trăm thời gian của phần đó", min: 5, max: 90, step: 5, value: 20, unit: "%" }],
      series: [
        { label: "Chương trình sau khi tăng tốc", expr: "1/((1-p/100)+p/(100*x))" },
        { label: "Trần (phần đó nhanh vô hạn)", expr: "1/(1-p/100)" },
      ],
    },
  ],

  // ── Kỹ năng nghề ────────────────────────────────────────────────────────
  "viet-tai-lieu-thiet-ke-mot-trang": [
    {
      type: "scenario",
      title: "Một trang để đổi hàng đợi tin nhắn",
      start: "mo",
      nodes: {
        mo: {
          text: "Bạn có hai tiếng để viết tài liệu một trang đề xuất đổi hàng đợi tin nhắn của hệ thống. Người quyết định chỉ đọc một lượt trước cuộc họp. Bạn mở đầu bằng gì?",
          choices: [
            { label: "Lịch sử hệ thống hiện tại và vì sao nó thành thế", next: "su" },
            { label: "Kết luận đề xuất và điều cần họ quyết định", next: "cat" },
            { label: "Bảng so sánh năm phương án kèm đầy đủ số liệu", next: "bang" },
          ],
        },
        su: {
          text: "Đây là đường suy nghĩ của bạn nên viết rất tự nhiên, nhưng người đọc không có đích để biết mỗi đoạn phục vụ điều gì. Tới nửa trang vẫn chưa thấy đề xuất, họ đọc lướt và hẹn bàn lại trong cuộc họp sau.",
          ending: "bad",
        },
        bang: {
          text: "Bảng chiếm trọn trang và người đọc tự phải rút ra kết luận từ năm cột số. Không ai chắc bạn đề xuất gì, và mặc định của tổ chức là giữ nguyên hiện trạng cho tới khi có người nói rõ hơn.",
          ending: "bad",
        },
        cat: {
          text: "Trang đầu có kết luận rõ. Nhưng bản nháp đã vượt giới hạn một trang với ba phần: phương án đã bỏ kèm lý do, điều kiện chứng minh mình sai, và phụ lục kết quả đo dài. Bạn cắt gì?",
          choices: [
            { label: "Cắt phương án đã bỏ cho gọn, giữ lại phụ lục", next: "bo" },
            { label: "Cắt điều kiện chứng minh sai vì nghe tự làm yếu mình", next: "sai" },
            { label: "Chuyển phụ lục ra đường dẫn, giữ cả hai phần kia", next: "ok" },
          ],
        },
        bo: {
          text: "Người đọc không còn thấy bạn đã cân nhắc gì ngoài đề xuất này. Câu chúng tôi đã cân nhắc kỹ không chứng minh được điều gì, và họ đặt đúng câu hỏi đó ở cuộc họp: vì sao không chọn cách khác.",
          ending: "bad",
        },
        sai: {
          text: "Không có điều kiện chứng minh sai, người đọc chỉ còn cách tin hoặc không tin. Phần lớn chọn không tin vì không có gì để kiểm lại sau này, và đề xuất bị hoãn vô thời hạn.",
          ending: "bad",
        },
        ok: {
          text: "Trang vẫn đủ ba lớp: kết luận, phương án đã bỏ kèm lý do và điều kiện chứng minh sai. Phần chỉ phục vụ người muốn kiểm tra sâu nằm ngoài trang. Cuộc họp đi thẳng vào quyết định.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Trình tự nghĩ và trình tự đọc đi ngược nhau",
      intro:
        "Khi bạn tìm ra đường đi đến một quán ăn, bạn kể lại từng ngã rẽ theo thứ tự đã đi. Nhưng người bạn cần biết ngay quán ở đâu, rồi mới hỏi đường nào dễ đi hơn.",
      columns: ["Phần của trang", "Giống như", "Người đọc cần nó để"],
      rows: [
        ["Kết luận đứng đầu", "Địa chỉ quán ở dòng đầu tin nhắn", "Biết mỗi đoạn phía sau phục vụ điều gì"],
        ["Giới hạn một trang", "Chỉ kể ba ngã rẽ quyết định", "Thấy phần đã được chọn, không phải mọi thứ tác giả biết"],
        ["Phương án đã bỏ", "Nêu các con đường đã thử và lý do bỏ", "Kiểm được rằng tác giả đã cân nhắc thật"],
        ["Điều kiện chứng minh sai", "Dặn nếu quán đóng cửa thì ghé quán bên cạnh", "Có cách kiểm lại sau này thay vì chỉ tin hoặc không tin"],
      ],
      oneLiner: "Viết theo trình tự người đọc cần, không theo trình tự bạn đã đi, và để trang hẹp buộc bạn phải chọn.",
    },
  ],

  "bao-ve-phuong-an-truoc-hoi-dong-kien-truc": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát câu trả lời do AI soạn cho buổi bảo vệ",
      task: "AI soạn sẵn các câu trả lời cho hội đồng kiến trúc. Bấm vào những câu sẽ làm hỏng buổi bảo vệ theo điều bài đã dạy rồi nộp.",
      segments: [
        {
          text: "Hội đồng hỏi về việc mất kết nối giữa chừng: \"Phần đó em chưa nghĩ tới. Em sẽ kiểm xem thông điệp chưa được xác nhận có được gửi lại không, và báo kết quả trong hai ngày.\"",
        },
        {
          text: "Hội đồng hỏi tiếp: \"Em chắc chắn hệ thống tự phục hồi hoàn toàn, vì các sản phẩm tương tự đều làm vậy.\"",
          error:
            "Trả lời chắc chắn về chỗ chưa nghĩ tới thường sai. Khi bị bắt sai, hội đồng không còn cách biết phần nào bạn nắm chắc nên hạ mức tin cho cả phần đã chuẩn bị kỹ.",
        },
        {
          text: "Về phương án thay thế: \"Theo tiêu chí ở trang hai, phương án mới giữ thứ tự thông điệp tốt hơn, còn phương án cũ đơn giản hơn để vận hành.\"",
        },
        {
          text: "Về rủi ro mất thứ tự thông điệp: \"Phương án này đã được bảo vệ ở phần so sánh ở trên, nên em xin quay lại phần đó.\"",
          error:
            "Đây là phản đối về rủi ro, không phải về phương án. Quay lại phần so sánh là trả lời sai câu hỏi, và người hỏi sẽ hỏi lại, lần này gay gắt hơn.",
        },
        {
          text: "Khi bị hỏi dồn, nên đưa ra câu trả lời nghe hợp lý nhất để buổi họp không bị gián đoạn rồi kiểm lại sau.",
          error:
            "Câu trả lời nghe hợp lý nhưng chưa kiểm là cách nhanh nhất để bị bắt sai. Nói thẳng là chưa nghĩ tới rồi nêu rõ bạn sẽ kiểm điều gì mới giữ được niềm tin.",
        },
        {
          text: "Trước buổi họp em đã viết ra ba câu hỏi khó nhất về phương án và tự trả lời, vì cách này tìm ra phần chưa nghĩ tới chứ không chỉ củng cố phần đã nghĩ.",
        },
      ],
    },
    {
      type: "flow",
      title: "Từ câu hỏi bất ngờ tới câu trả lời giữ được niềm tin",
      steps: [
        {
          label: "Nghe hết câu hỏi",
          detail:
            "Chưa trả lời vội. Nhắc lại câu hỏi bằng lời của mình để biết mình đang trả lời đúng điều họ lo, vì sai câu hỏi tốn nhiều hơn chậm vài giây.",
        },
        {
          label: "Phân loại: phương án hay rủi ro",
          detail:
            "Phản đối về phương án là có cách tốt hơn, trả lời bằng so sánh theo tiêu chí đã nêu. Phản đối về rủi ro là cách này có thể hỏng theo kiểu chưa tính tới, và so sánh sẽ không trả lời được.",
        },
        {
          label: "Kiểm xem mình đã nghĩ tới chưa",
          detail:
            "Nếu nằm trong ba câu khó đã chuẩn bị thì trả lời thẳng. Nếu không, đây là lúc quyết định xem bạn có nói điều mình chưa chắc hay không.",
        },
        {
          label: "Nói thẳng là chưa nghĩ tới",
          detail:
            "Một câu ngắn, không biện hộ. Hội đồng giữ được hình dung rõ về phần bạn nắm chắc và phần chưa, thay vì phải nghi ngờ cả hai.",
        },
        {
          label: "Nêu phép kiểm cụ thể",
          detail:
            "Nói bạn sẽ kiểm điều gì và báo lại khi nào. Vế này biến một câu chưa biết thành một việc làm được, và cho người hỏi cơ hội chỉnh lại phép kiểm ngay tại chỗ.",
        },
      ],
    },
  ],

  "chuan-bi-modeling-test-va-case-interview": [
    {
      type: "exercise",
      language: "javascript",
      title: "Soát đồng hồ giữa bài thi 90 phút",
      task: "Kế hoạch chia 90 phút thành năm phần (10, 20, 30, 20, 10 phút). Bạn đã xong ba phần đầu với thời gian thực dưới đây. In từng phần với thời gian thực, thời gian cộng dồn và độ trễ so với mốc cộng dồn của kế hoạch, rồi dòng cuối: còn bao nhiêu phút, hai phần sau cần bao nhiêu, thiếu bao nhiêu. Mã khởi đầu so từng phần riêng lẻ nên bỏ sót độ trễ tích luỹ.",
      starter: L(
        "const plan = [[\"Đọc đề\", 10], [\"Đầu vào\", 20], [\"Xử lý chính\", 30], [\"Kiểm thử\", 20], [\"Rà lỗi\", 10]];",
        "const actual = [12, 22, 41];",
        "",
        "let cum = 0;",
        "let planCum = 0;",
        "actual.forEach((used, i) => {",
        "  const [name, minutes] = plan[i];",
        "  cum += used;",
        "  planCum += minutes;",
        "  const late = used - minutes;",
        "  const status = late > 0 ? `trễ ${late}` : \"đúng hạn\";",
        "  console.log(`${name}: ${used}/${minutes} phút, tổng ${cum}/${planCum} - ${status}`);",
        "});",
        "",
        "const need = plan.slice(actual.length).reduce((s, p) => s + p[1], 0);",
        "console.log(`Còn ${90 - cum} phút, hai phần sau cần ${need} phút: thiếu ${need}`);",
      ),
      solution: L(
        "const plan = [[\"Đọc đề\", 10], [\"Đầu vào\", 20], [\"Xử lý chính\", 30], [\"Kiểm thử\", 20], [\"Rà lỗi\", 10]];",
        "const actual = [12, 22, 41];",
        "",
        "let cum = 0;",
        "let planCum = 0;",
        "actual.forEach((used, i) => {",
        "  const [name, minutes] = plan[i];",
        "  cum += used;",
        "  planCum += minutes;",
        "  const late = cum - planCum;",
        "  const status = late > 0 ? `trễ ${late}` : \"đúng hạn\";",
        "  console.log(`${name}: ${used}/${minutes} phút, tổng ${cum}/${planCum} - ${status}`);",
        "});",
        "",
        "const left = 90 - cum;",
        "const need = plan.slice(actual.length).reduce((s, p) => s + p[1], 0);",
        "console.log(`Còn ${left} phút, hai phần sau cần ${need} phút: thiếu ${need - left}`);",
      ),
      expectedOutput: L(
        "Đọc đề: 12/10 phút, tổng 12/10 - trễ 2",
        "Đầu vào: 22/20 phút, tổng 34/30 - trễ 4",
        "Xử lý chính: 41/30 phút, tổng 75/60 - trễ 15",
        "Còn 15 phút, hai phần sau cần 30 phút: thiếu 15",
      ),
      hints: [
        "Độ trễ là cộng dồn thực trừ cộng dồn kế hoạch, không phải thực trừ kế hoạch của riêng phần đó.",
        "Số phút thiếu bằng số phút hai phần sau cần trừ số phút còn lại.",
      ],
    },
    {
      type: "chart",
      title: "90 phút chia thế nào",
      caption:
        "Phân bổ gợi ý trong bài cho một bài kiểm tra 90 phút, không phải quy định của bài thi nào. Để ý phần viết kiểm thử và rà lỗi vẫn có chỗ riêng, vì cạn giờ với sản phẩm dở dang là lý do trượt phổ biến.",
      kind: "bar",
      xLabel: "Giai đoạn",
      yLabel: "Số phút",
      data: [
        { label: "Đọc đề", values: [10] },
        { label: "Đầu vào", values: [20] },
        { label: "Xử lý chính", values: [30] },
        { label: "Kiểm thử", values: [20] },
        { label: "Rà lỗi", values: [10] },
      ],
      seriesLabels: ["Phút gợi ý"],
    },
  ],

  "lo-trinh-nghe-tu-chuyen-vien-den-truong-nhom": [
    {
      type: "scenario",
      title: "\"Cần tư duy chiến lược hơn\"",
      start: "nhan_xet",
      nodes: {
        nhan_xet: {
          text: "Sau vài năm là kỹ sư thực thi giỏi, đánh giá cuối năm của bạn viết: cần chủ động hơn và có tư duy chiến lược hơn. Không có ví dụ nào đi kèm. Bạn phản ứng thế nào?",
          choices: [
            { label: "Nhận thêm nhiều việc và giao sớm hơn mọi hạn", next: "nhieu" },
            { label: "Xin sếp một ví dụ cụ thể về quyết định cần đưa ra", next: "hoi" },
            { label: "Xin chuyển đội vì nhận xét quá mơ hồ để làm theo", next: "chuyen" },
          ],
        },
        nhieu: {
          text: "Bạn làm nhiều hơn và nhanh hơn, đúng theo tiêu chí cũ. Năm sau nhận xét vẫn như cũ, vì điều họ muốn là làm khác đi chứ không phải nhiều hơn, và bạn kiệt sức mà không ai thấy khác biệt.",
          ending: "bad",
        },
        chuyen: {
          text: "Đội mới đánh giá bằng cùng bản đồ bậc thang, nên sau một năm bạn nhận lại gần như đúng nhận xét cũ bằng lời khác. Bạn mất một năm và mất cả sự tín nhiệm tích luỹ ở đội cũ.",
          ending: "bad",
        },
        hoi: {
          text: "Sếp kể ra một chuyện cụ thể: ba dự án đều mơ hồ, không ai chọn dự án nào làm trước, và việc chọn đó chưa có người đứng ra. Bạn thử làm điều gì trước tiên?",
          choices: [
            { label: "Chờ sếp chọn rồi làm thật tốt phần được giao", next: "cho" },
            { label: "Làm cả ba dự án song song cho chắc ăn", next: "ba" },
            { label: "Chọn một, viết lý do và điều kiện sẽ khiến mình sai", next: "ok" },
          ],
        },
        cho: {
          text: "Bạn vẫn đứng ở bậc thực thi: mọi thứ giao xuống đều làm tốt, nhưng người chọn vẫn là sếp. Sau sáu tháng, nhận xét \"cần chủ động hơn\" quay lại nguyên văn.",
          ending: "bad",
        },
        ba: {
          text: "Ba dự án đều chậm một nửa và không cái nào xong đúng hạn. Bạn tránh được việc phải chọn, nhưng chọn chính là phần giá trị của bậc phán đoán, và bạn lại tiêu thời gian vào bậc cũ.",
          ending: "bad",
        },
        ok: {
          text: "Bạn đưa ra một quan điểm bảo vệ được, kèm điều có thể chứng minh nó sai. Sếp có thể phản đối ở đúng chỗ, và lần sau việc chọn ưu tiên được giao cho bạn. Tiêu chí đã đổi, và bạn là người thấy trước.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Dịch một nhận xét mơ hồ thành việc làm được",
      steps: [
        {
          label: "Nhận xét đến",
          detail:
            "Những cụm như \"chủ động hơn\" hay \"chiến lược hơn\" hầu như không bao giờ đi kèm ví dụ. Đừng đồng ý ngay, cũng đừng gạt đi; ghi lại nguyên văn.",
        },
        {
          label: "Hỏi một tình huống cụ thể",
          detail:
            "Hỏi người nhận xét: tuần qua có quyết định nào lẽ ra tôi nên đưa ra không. Câu hỏi này đổi nhận xét thành chuyện có thật để bàn.",
        },
        {
          label: "Xác định mình đang ở bậc nào",
          detail:
            "Đặt tình huống đó cạnh ba bậc: thực thi, phán đoán, quyết định. Nếu việc đòi hỏi chọn đúng vấn đề hoặc chịu trách nhiệm với thông tin thiếu thì tiêu chí đã đổi.",
        },
        {
          label: "Thử việc của bậc kế tiếp",
          detail:
            "Nhận một việc nhỏ ở bậc kế, chẳng hạn chọn ưu tiên giữa hai việc mơ hồ. Làm khác đi, không phải làm nhiều hơn, và viết ra lý do kèm điều có thể chứng minh bạn sai.",
        },
        {
          label: "Nhận phản hồi và ghi lại",
          detail:
            "Sau đó hỏi lại cùng người ấy: lần này khác không. Ghi nhận xét và cách bạn dịch nó để lần sau bạn không phải đoán lại từ đầu.",
        },
      ],
    },
  ],

  // ── Dữ liệu ─────────────────────────────────────────────────────────────
  "khi-nao-excel-het-du-va-chuyen-sang-python": [
    {
      type: "exercise",
      language: "python",
      title: "Ghép hai nguồn có định dạng ngày khác nhau",
      task: "Hai nguồn báo doanh số theo ngày: nguồn a ghi ngày kiểu 2026-03-05, nguồn b ghi kiểu 05/03/2026 (ngày/tháng/năm). Gộp cả hai thành tổng theo tháng và in theo thứ tự tháng. Mã khởi đầu coi cả hai nguồn là cùng một định dạng nên bị lệch khoá tháng của nguồn b.",
      starter: L(
        "a = [(\"2026-03-05\", 120), (\"2026-04-02\", 90)]",
        "b = [(\"05/03/2026\", 30), (\"17/04/2026\", 50), (\"28/04/2026\", 20)]",
        "",
        "totals = {}",
        "for source in (a, b):",
        "    for text, amount in source:",
        "        key = text[:7]",
        "        totals[key] = totals.get(key, 0) + amount",
        "",
        "for key in sorted(totals):",
        "    print(f\"{key}: {totals[key]}\")",
      ),
      solution: L(
        "from datetime import datetime",
        "",
        "a = [(\"2026-03-05\", 120), (\"2026-04-02\", 90)]",
        "b = [(\"05/03/2026\", 30), (\"17/04/2026\", 50), (\"28/04/2026\", 20)]",
        "",
        "totals = {}",
        "for source, fmt in ((a, \"%Y-%m-%d\"), (b, \"%d/%m/%Y\")):",
        "    for text, amount in source:",
        "        key = datetime.strptime(text, fmt).strftime(\"%Y-%m\")",
        "        totals[key] = totals.get(key, 0) + amount",
        "",
        "for key in sorted(totals):",
        "    print(f\"{key}: {totals[key]}\")",
      ),
      expectedOutput: L("2026-03: 150", "2026-04: 160"),
      hints: [
        "datetime.strptime(text, định_dạng) đọc ngày theo từng định dạng; strftime(\"%Y-%m\") lấy ra khoá tháng.",
        "Mỗi nguồn có định dạng riêng, nên ghép định dạng đi cùng nguồn.",
      ],
    },
    {
      type: "flow",
      title: "Script lo dữ liệu, bảng tính lo mô hình",
      steps: [
        {
          label: "Lấy dữ liệu từ nhiều nguồn",
          detail:
            "Script đọc tệp xuất từ hệ thống, bảng của bộ phận khác và tệp tải về. Mỗi nguồn có tên cột và định dạng ngày riêng, và mọi khác biệt đó được xử lý trong mã chứ không bằng tay.",
        },
        {
          label: "Làm sạch và ghép",
          detail:
            "Đổi tên cột, đổi định dạng ngày về một dạng, bỏ dòng trùng. Mỗi biến đổi là một dòng mã đọc được, nên người kiểm tra có thể theo dõi từng bước.",
        },
        {
          label: "Xuất bảng gọn",
          detail:
            "Kết quả là một bảng sạch, mỗi cột một ý nghĩa. Chạy lại script trên dữ liệu mới thì ra đúng cùng cấu trúc, đây là điều chuỗi thao tác thủ công không làm được.",
        },
        {
          label: "Bảng tính làm mô hình",
          detail:
            "Người cần xem từng ô, đổi giả định và chỉnh trực tiếp mở bảng đã xuất. Excel đang làm đúng việc nó mạnh nhất: nhìn thấy, thử và chỉnh.",
        },
        {
          label: "Trình bày cho người không đọc mã",
          detail:
            "Biểu đồ và bảng tóm tắt rút từ bảng tính. Khi số thay đổi, chạy lại script rồi cập nhật, không ai phải nhớ lại chuỗi thao tác tay của tháng trước.",
        },
      ],
    },
  ],
};
