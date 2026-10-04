import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 13. Một người viết cho một tệp.
export const P13_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "qua-tu-tin-va-neo-vao-cach-lam-dau-tien": [
    {
      type: "exercise",
      language: "python",
      title: "Đổi ước lượng của bạn thành con số có dữ liệu",
      task: "Dưới đây là năm việc đã làm: mỗi cặp là (giờ ước lượng, giờ thực tế). Tính hệ số lệch = tổng giờ thực tế chia tổng giờ ước lượng, rồi nhân vào ước lượng 4 giờ của việc mới. In ra đúng hai dòng theo mẫu của mã khởi đầu.",
      starter: `qua_khu = [(2, 5), (3, 6), (1, 3), (4, 9), (2, 4)]
tong_uoc = sum(u for u, t in qua_khu)
tong_thuc = sum(t for u, t in qua_khu)
he_so = tong_uoc / tong_thuc
uoc_luong_moi = 4
print(f"Hệ số lệch: {he_so:.2f}")
print(f"Nên báo: {uoc_luong_moi * he_so:.1f} giờ")`,
      solution: `qua_khu = [(2, 5), (3, 6), (1, 3), (4, 9), (2, 4)]
tong_uoc = sum(u for u, t in qua_khu)
tong_thuc = sum(t for u, t in qua_khu)
he_so = tong_thuc / tong_uoc
uoc_luong_moi = 4
print(f"Hệ số lệch: {he_so:.2f}")
print(f"Nên báo: {uoc_luong_moi * he_so:.1f} giờ")`,
      expectedOutput: `Hệ số lệch: 2.25
Nên báo: 9.0 giờ`,
      hints: [
        "Hệ số lệch cho biết thực tế gấp mấy lần ước lượng, nên thực tế phải nằm ở tử số.",
        "Mã khởi đầu in ra hệ số nhỏ hơn 1, nghĩa là bạn đang tưởng mình ước lượng thừa giờ.",
      ],
    },
    {
      type: "flow",
      title: "Một lần ước lượng có dữ liệu thay vì bằng tưởng tượng",
      steps: [
        {
          label: "Lấy ba việc tương tự",
          detail: "Chọn ba việc gần đây giống việc mới về cỡ và loại, ví dụ ba màn hình biểu mẫu. Không chọn việc dễ nhớ nhất, chọn việc giống nhất.",
        },
        {
          label: "Đặt ước lượng cạnh thực tế",
          detail: "Với mỗi việc ghi hai con số: hôm đó bạn đã báo mấy giờ và cuối cùng mất mấy giờ. Số thực tế đã chứa sẵn các chỗ rẽ bạn không tưởng tượng ra.",
        },
        {
          label: "Tính hệ số lệch",
          detail: "Cộng giờ thực tế, chia cho cộng giờ ước lượng. Nếu ra 2,25 thì cứ mỗi giờ bạn nghĩ ra, việc này thường mất hơn hai giờ.",
        },
        {
          label: "Nhân vào việc mới",
          detail: "Ước lượng trực giác 4 giờ nhân 2,25 ra khoảng 9 giờ. Con số đó mới là thứ để hứa với người khác.",
        },
        {
          label: "Nghĩ đủ ba cách rồi mới viết",
          detail: "Trước dòng code đầu tiên, viết ra ba cách giải khác nhau. Cách thứ ba thường là cách buộc bạn nhìn bài toán từ hướng khác, không còn là bảo vệ cách đầu tiên.",
        },
      ],
    },
  ],

  "doc-code-nguoi-khac-va-nhan-xet-co-ich": [
    {
      type: "scenario",
      title: "Viết nhận xét cho hàm quên trường hợp danh sách rỗng",
      start: "a",
      nodes: {
        a: {
          text: "Đồng nghiệp gửi pull request có hàm tính tổng giỏ hàng. Bạn thấy hàm sẽ báo lỗi nếu giỏ hàng rỗng, mà giỏ rỗng xảy ra khi khách xoá hết món. Bạn viết nhận xét thế nào?",
          choices: [
            { label: "Anh viết vội nên quên mất trường hợp danh sách rỗng rồi", next: "bad-nguoi" },
            { label: "Chỗ xử lý danh sách này chưa ổn, anh xem lại giúp em nhé", next: "bad-mo-ho" },
            { label: "Bắt buộc: giỏ rỗng làm hàm này báo lỗi ở trang thanh toán", next: "b" },
          ],
        },
        "bad-nguoi": {
          text: "Tác giả đọc câu đầu và dừng ở đó. Hai người cãi nhau về giọng điệu suốt buổi chiều, còn trường hợp rỗng không ai nhắc lại. Pull request nằm ba ngày, và lỗi vẫn còn nguyên khi cuối cùng được gộp.",
          ending: "bad",
        },
        "bad-mo-ho": {
          text: "Tác giả không biết chỗ nào chưa ổn, cũng không biết có bắt buộc sửa không. Anh ấy viết lại cả hàm cho chắc, mất nửa buổi, và đưa thêm một lỗi làm tròn tiền mới vào mà không ai soi tới.",
          ending: "bad",
        },
        b: {
          text: "Tác giả trả lời: dữ liệu giỏ hàng chưa bao giờ rỗng nên không cần xử lý. Bạn chưa chắc ai đúng. Bạn đáp lại thế nào?",
          choices: [
            { label: "Anh chắc hơn em, vậy mình bỏ qua chỗ này nhé", next: "bad-bo-qua" },
            { label: "Em vẫn thấy phải sửa, mình không bàn thêm chuyện này", next: "bad-ep" },
            { label: "Dữ liệu lấy từ đâu vậy anh? Nếu có đường nào trả rỗng thì mình xử lý", next: "good" },
          ],
        },
        "bad-bo-qua": {
          text: "Ba tuần sau, khách xoá hết món trong giỏ và trang thanh toán trắng xoá. Không ai nhớ vì sao hàm này không có nhánh cho trường hợp rỗng, và nhận xét ban đầu của bạn đã bị rút lại.",
          ending: "bad",
        },
        "bad-ep": {
          text: "Tác giả thấy bị ra lệnh nên sửa tối thiểu: thêm một dòng kiểm tra không có giỏ hàng. Nhưng giỏ rỗng trong JavaScript vẫn là một mảng có thật, nên dòng đó không bắt được gì và lỗi vẫn nguyên.",
          ending: "bad",
        },
        good: {
          text: "Tác giả mở lại luồng dữ liệu và thấy đúng: khi khách xoá món cuối cùng, máy chủ trả về danh sách rỗng. Anh ấy thêm nhánh xử lý, cảm ơn bạn đã hỏi nguồn dữ liệu, và còn nhắn thêm rằng cách bạn nêu hậu quả cụ thể giúp anh ấy tự kiểm lại.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một vòng nhận xét có ích, từ lúc mở pull request",
      steps: [
        {
          label: "Đọc cả thay đổi trước khi viết",
          detail: "Đọc hết một lượt rồi mới viết nhận xét đầu tiên. Nhiều khi câu hỏi ở dòng 20 đã được trả lời ở dòng 80.",
        },
        {
          label: "Chọn chỗ đáng nói",
          detail: "Giữ lại những chỗ có hậu quả thật như thiếu trường hợp biên hay lộ dữ liệu. Sở thích đặt tên thì gom thành một câu, không phải mười.",
        },
        {
          label: "Viết đủ ba phần",
          detail: "Vấn đề nói về code, hậu quả nếu để nguyên, rồi phân loại. Ví dụ: hàm chưa xử lý giỏ rỗng, trang thanh toán sẽ trắng, bắt buộc sửa.",
        },
        {
          label: "Gắn nhãn bắt buộc hay tuỳ chọn",
          detail: "Hai chữ tuỳ chọn ở đầu câu giúp tác giả khỏi đoán rằng cả hai mươi nhận xét đều phải sửa trước khi gộp.",
        },
        {
          label: "Khen chỗ làm tốt, rồi chờ phản hồi",
          detail: "Nêu một điều cụ thể đã làm tốt để đội biết cái gì được coi là tốt. Khi tác giả không đồng ý, hỏi lại lý do kỹ thuật trước khi khẳng định.",
        },
      ],
    },
  ],

  "kiem-thu-viet-cai-gi-va-khong-viet-cai-gi": [
    {
      type: "exercise",
      language: "javascript",
      title: "Kiểm thử đúng chỗ dễ hỏng: các giá trị biên",
      task: "Quy định: đơn từ 300.000 đồng trở lên được miễn phí vận chuyển, dưới đó phí là 30.000 đồng. Hàm phiVanChuyen đang sai ở đúng giá trị biên. Sửa hàm, rồi chạy ba giá trị kiểm thử 299999, 300000 và 300001.",
      starter: `function phiVanChuyen(tong) {
  if (tong > 300000) return 0;
  return 30000;
}

for (const tong of [299999, 300000, 300001]) {
  console.log(tong + ": " + phiVanChuyen(tong));
}`,
      solution: `function phiVanChuyen(tong) {
  if (tong >= 300000) return 0;
  return 30000;
}

for (const tong of [299999, 300000, 300001]) {
  console.log(tong + ": " + phiVanChuyen(tong));
}`,
      expectedOutput: `299999: 30000
300000: 0
300001: 0`,
      hints: [
        "Đọc lại quy định: từ 300.000 trở lên nghĩa là chính 300.000 cũng được miễn phí.",
        "Hai giá trị ở xa ngưỡng sẽ đúng dù hàm viết sai; chỉ giá trị đúng bằng ngưỡng mới lộ lỗi.",
      ],
    },
    {
      type: "flow",
      title: "Từ một báo lỗi đến kiểm thử giữ lỗi không quay lại",
      steps: [
        {
          label: "Nhận báo lỗi",
          detail: "Khách nói đơn đúng 300.000 đồng vẫn bị tính phí vận chuyển. Ghi lại đúng con số khách thấy, không đoán nguyên nhân.",
        },
        {
          label: "Viết kiểm thử tái hiện trước",
          detail: "Viết một kiểm thử gọi hàm với 300000 và chờ kết quả 0. Chạy ra đỏ: bạn có bằng chứng đã hiểu đúng lỗi.",
        },
        {
          label: "Sửa code cho tới khi xanh",
          detail: "Đổi dấu lớn hơn thành lớn hơn hoặc bằng. Nếu kiểm thử vẫn đỏ thì giả thuyết của bạn sai, quay lại bước một.",
        },
        {
          label: "Chạy cả bộ kiểm thử",
          detail: "Đảm bảo bản sửa không làm hỏng chỗ khác, ví dụ đơn 100.000 vẫn tính phí 30.000.",
        },
        {
          label: "Giữ kiểm thử trong bộ",
          detail: "Kiểm thử không bị xoá sau khi xanh. Bộ kiểm thử lớn dần đúng ở những chỗ hệ thống thật sự hay sai.",
        },
      ],
    },
  ],

  "thien-kien-hien-tai-va-no-ky-thuat": [
    {
      type: "scenario",
      title: "Thứ Sáu chiều, hạn chót và hai khoản nợ",
      start: "a",
      nodes: {
        a: {
          text: "Bạn vừa xong tính năng và thấy hàm tính thuế bị copy ra ba nơi, bạn mới sửa một nơi. Hạn chót là chiều nay, dọn cả ba nơi mất khoảng một giờ. Bạn làm gì?",
          choices: [
            { label: "Ghi một dòng TODO trong code, tuần sau tính", next: "bad-todo" },
            { label: "Dọn đúng ba nơi vừa chạm vào trong cùng nhánh", next: "b" },
            { label: "Mở nhánh dọn toàn bộ dự án trong cuối tuần này", next: "bad-lon" },
          ],
        },
        "bad-todo": {
          text: "Dòng TODO nằm đó sáu tháng. Không có ai xếp lịch cho nó vì nó không có trong danh sách công việc. Một thành viên mới thấy hàm bị copy và bắt chước, nên giờ có năm nơi.",
          ending: "bad",
        },
        "bad-lon": {
          text: "Cuối tuần bạn dọn xong và mở pull request hơn một nghìn dòng. Không ai đọc kỹ nổi. Hai người duyệt vội và một lỗi làm tròn thuế lọt vào bản phát hành.",
          ending: "bad",
        },
        b: {
          text: "Việc dọn đi kèm việc bạn đằng nào cũng làm nên nó không phải xếp hàng sau việc gấp. Nhưng bạn cũng nhớ thư viện thanh toán đang chậm tám bản cập nhật, và tuần này không có chỗ để làm. Bạn xử lý thế nào?",
          choices: [
            { label: "Đợi khi nào rảnh thì cập nhật", next: "bad-ranh" },
            { label: "Cập nhật cả tám bản ngay tối nay cho xong", next: "bad-toi" },
            { label: "Tạo mục có mô tả và chi phí, đặt lịch cố định", next: "good" },
          ],
        },
        "bad-ranh": {
          text: "Khi nào rảnh không bao giờ tới. Nửa năm sau có một lỗ hổng bảo mật cần vá gấp, các bản cập nhật đã chồng lên nhau và bạn không vá riêng được nữa, thành một dự án kéo dài hai tuần.",
          ending: "bad",
        },
        "bad-toi": {
          text: "Tám bản cập nhật chạy cùng lúc, không ai biết bản nào gây ra lỗi. Tối thứ Sáu chức năng đăng nhập hỏng, và bạn mất cuối tuần để lần ngược từng bản.",
          ending: "bad",
        },
        good: {
          text: "Mục nằm trong danh sách với mô tả, ước tính nửa ngày và lịch cập nhật vào sáng thứ Hai đầu mỗi tháng. Nợ không biến mất, nhưng giờ nó có tên, có chỗ trong lịch, và không phụ thuộc vào ý chí của bạn mỗi tuần.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Nợ để càng lâu thì trả càng đắt",
      caption: "Số liệu minh hoạ để thấy hình dạng lãi kép, không phải đo thực tế của dự án nào. Kéo hai thanh trượt để thấy vì sao việc nhỏ hôm nay thành dự án sau nửa năm.",
      kind: "line",
      xLabel: "Số tháng hoãn",
      yLabel: "Giờ cần để xử lý",
      x: { from: 0, to: 12, step: 1 },
      params: [
        { id: "gio", label: "Giờ làm nếu xử lý ngay", min: 1, max: 8, step: 1, value: 2, unit: "giờ" },
        { id: "lai", label: "Nợ tăng mỗi tháng", min: 5, max: 40, step: 5, value: 20, unit: "%" },
      ],
      series: [
        { label: "Hoãn rồi mới làm", expr: "gio * (1 + lai / 100) ^ x" },
        { label: "Làm ngay", expr: "gio" },
      ],
    },
  ],

  "tong-ket-thoi-quen-chong-diem-mu": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Tìm thiên kiến trong bản kế hoạch do AI viết",
      task: "AI viết bản kế hoạch cho tính năng thanh toán. Bấm vào những đoạn đang rơi vào một trong bốn thiên kiến của chặng này, rồi nộp.",
      segments: [
        {
          text: "Ước lượng: 3 ngày, vì mình đã hình dung đủ các bước và không thấy gì bất ngờ.",
          error: "Quá tự tin: bạn chỉ hình dung được những bước đã biết. Cần dữ liệu những việc tương tự đã mất bao lâu.",
        },
        {
          text: "Cách làm: dùng lại đúng cách của màn hình nạp tiền, vì nó quen và đã chạy được.",
          error: "Neo vào cách đầu tiên: chưa so với cách nào khác. Quy tắc là nghĩ đủ ba cách trước khi viết.",
        },
        {
          text: "Rà soát: người viết hàm tính phí tự đọc lại một lượt trước khi gộp.",
          error: "Điểm mù: chính điểm mù đã tạo ra lỗi cũng làm bạn không thấy nó khi đọc lại. Cần người khác hoặc đổi góc nhìn khi soát.",
        },
        {
          text: "Kiểm thử: viết cho phần tính tiền và làm tròn vì lỗi ở đó làm sai số tiền của khách.",
        },
        {
          text: "Nợ kỹ thuật: ghi mục gộp hai hàm tính phí trùng nhau vào danh sách công việc, ước tính nửa ngày.",
        },
        {
          text: "Cập nhật thư viện thanh toán: làm khi nào rảnh sau đợt này.",
          error: "Thiên kiến hiện tại: khi nào rảnh không bao giờ tới. Cần lịch cố định để việc không phụ thuộc ý chí.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Bốn thiên kiến, bốn cơ chế",
      intro: "Phi công có hàng nghìn giờ bay vẫn đọc danh sách kiểm trước mỗi chuyến, không phải vì họ không nhớ mà vì trí nhớ hỏng đúng lúc cần. Bốn thiên kiến của chặng này cũng vậy: hiểu rồi vẫn mắc, nên cần cơ chế đứng ngoài đầu bạn.",
      columns: ["Thiên kiến", "Cảnh đời thường", "Cơ chế chặn"],
      rows: [
        ["Điểm mù khi đọc code của mình", "Đọc lại thư mình viết mà không thấy lỗi chính tả vì mắt tự điền chữ đúng", "Nhờ người khác đọc, hoặc đổi góc nhìn khi soát"],
        ["Quá tự tin khi ước lượng", "Đoán đi chợ mất 20 phút, quên phần tìm chỗ gửi xe và xếp hàng", "Nhìn dữ liệu những việc tương tự đã làm"],
        ["Neo vào cách đầu tiên", "Nghe một lối đi đầu tiên rồi không hỏi thêm lối nào khác", "Nghĩ đủ ba cách trước khi viết"],
        ["Thiên kiến hiện tại", "Hứa mai tập thể dục, mai lại có việc gấp hơn", "Gắn việc dọn vào việc đằng nào cũng làm, ghi thành mục, đặt lịch cố định"],
      ],
      oneLiner: "Đừng cố nhận ra thiên kiến đúng lúc nó xảy ra; hãy dán cạnh màn hình một danh sách kiểm bốn dòng.",
    },
  ],

  "git-la-gi-va-giai-quyet-van-de-gi": [
    {
      type: "sim",
      tool: "terminal",
      mission: "git-commit",
      title: "Tạo lịch sử đầu tiên cho một dự án",
      task: "Trong terminal mô phỏng, vào thư mục du-an, chạy git init để Git bắt đầu theo dõi, git add . để đưa các tệp vào vùng chờ, rồi git commit -m với một dòng mô tả nói rõ lý do. Sau đó chạy git log để đọc lại mốc vừa đóng dấu.",
    },
  ],

  "commit-dau-tien-va-vung-cho": [
    {
      type: "flow",
      title: "Một tệp đi từ lúc sửa đến lúc vào lịch sử",
      steps: [
        {
          label: "Sửa tệp trong vùng làm việc",
          detail: "Bạn thêm một dòng vào index.html. git status báo tệp đã sửa nhưng chưa vào vùng chờ.",
        },
        {
          label: "Xem khác biệt bằng git diff",
          detail: "Hiện đúng dòng nào được thêm và dòng nào bị bỏ, so vùng làm việc với vùng chờ.",
        },
        {
          label: "git add đưa vào vùng chờ",
          detail: "Bản hiện tại của tệp được chụp vào vùng chờ. Lúc này git diff trơn không hiện gì, vì không còn gì khác với vùng chờ.",
        },
        {
          label: "Sửa thêm sau khi add",
          detail: "git status --short hiện MM: chữ M trái là phần đã chờ, chữ M phải là phần sửa thêm sau đó. Commit sẽ chỉ lấy phần bên trái.",
        },
        {
          label: "git commit đóng dấu vùng chờ",
          detail: "Chỉ những gì đang ở vùng chờ vào lịch sử, kèm dòng mô tả. Phần sửa sau add vẫn nằm ngoài, chờ add và commit lần sau.",
        },
      ],
    },
  ],

  "doc-lich-su-va-quay-lai-moc-cu": [
    {
      type: "feynman",
      title: "Ba kiểu quay lại là ba kiểu sửa sổ ghi chép",
      intro: "Hình dung lịch sử Git như cuốn sổ ghi chép của cả nhóm. Muốn quay lại một trang cũ, bạn có ba cách rất khác nhau, và khác nhau ở chuyện cuốn sổ đã đến tay người khác chưa.",
      columns: ["Lệnh", "Giống như", "Lịch sử sau đó / Khi nào dùng"],
      rows: [
        ["git checkout tới một mốc", "Lật sổ ra xem một trang cũ rồi gấp lại", "Không đổi gì, chỉ đứng ở trang khác — Chỉ cần xem hoặc chạy thử"],
        ["git revert", "Viết thêm một trang mới ghi ngược lại điều trang cũ đã làm", "Dài thêm một mốc, không mất gì — Mốc đã đẩy lên cho người khác"],
        ["git reset", "Xé các trang cuối ra khỏi sổ", "Các mốc sau điểm đó biến mất — Chỉ khi mốc còn riêng tư trên máy bạn"],
      ],
      oneLiner: "Đã đưa cho người khác thì thêm trang mới (revert), chưa đưa thì mới được xé (reset).",
    },
  ],

  "nhanh-trong-git": [
    {
      type: "sim",
      tool: "terminal",
      mission: "git-branch",
      title: "Mở nhánh cho một việc mới",
      task: "Trong terminal mô phỏng, nhóm không ai làm thẳng trên main. Chạy git switch -c với một cái tên nói được nội dung việc sắp làm, ví dụ sua-nut-dang-ky, rồi git branch để xem bạn đang đứng ở nhánh nào.",
    },
    {
      type: "flow",
      title: "Nhánh chỉ là một con trỏ dời theo commit",
      steps: [
        {
          label: "Ban đầu chỉ có main",
          detail: "Nhánh main trỏ tới commit 9c1e2d4, và HEAD trỏ tới main. Mọi thứ nằm trong một tệp văn bản nhỏ chứa mã băm đó.",
        },
        {
          label: "git switch -c tạo nhánh mới",
          detail: "Git ghi thêm một tệp vài chục byte, trỏ cùng commit 9c1e2d4. Không có tệp nào được chép, nên dự án lớn cỡ nào cũng tức thì.",
        },
        {
          label: "Commit trên nhánh mới",
          detail: "Con trỏ của nhánh mới dời sang commit 4e8f0a2 vừa tạo. Con trỏ main đứng yên ở 9c1e2d4.",
        },
        {
          label: "Chuyển về main",
          detail: "HEAD quay lại trỏ main, và thư mục làm việc đổi theo về trạng thái 9c1e2d4. Thay đổi của bạn vẫn an toàn ở nhánh kia.",
        },
        {
          label: "Gộp rồi xoá nhánh",
          detail: "Khi việc xong và được duyệt, main nhận commit 4e8f0a2. Nhánh cũ chỉ còn là một con trỏ thừa, xoá đi cho danh sách gọn.",
        },
      ],
    },
  ],

  "merge-va-xu-ly-xung-dot": [
    {
      type: "flow",
      title: "Giải một xung đột từ lúc Git dừng lại",
      steps: [
        {
          label: "git merge báo CONFLICT",
          detail: "Hai nhánh cùng sửa dòng tiêu đề của index.html. Git ghép phần còn lại tự động và dừng đúng ở dòng đó.",
        },
        {
          label: "git status liệt kê tệp xung đột",
          detail: "Trong mục both modified chỉ có index.html. Các tệp khác đã gộp xong, bạn không phải động vào.",
        },
        {
          label: "Mở tệp và đọc hai phiên bản",
          detail: "Phần giữa dòng <<<<<<< và ======= là bản của bạn, phần giữa ======= và >>>>>>> là bản nhánh kia. Hỏi xem mỗi bên định đạt điều gì.",
        },
        {
          label: "Sửa thành nội dung đúng",
          detail: "Chọn một bên hoặc ghép ý cả hai, rồi xoá sạch ba dòng đánh dấu. Dấu còn sót là văn bản thật nằm trong tệp.",
        },
        {
          label: "git add rồi git commit",
          detail: "git add báo tệp đã giải xong, git commit đóng lần gộp thành một mốc. Nếu rối, git merge --abort đưa mọi thứ về trước lúc gộp.",
        },
      ],
    },
  ],

  "kho-tu-xa-push-pull-clone": [
    {
      type: "flow",
      title: "Từ lúc push bị từ chối đến lúc đẩy lên được",
      steps: [
        {
          label: "git push bị từ chối",
          detail: "Kho từ xa có một commit của đồng nghiệp mà máy bạn chưa có. Git từ chối để việc của họ không bị đè mất.",
        },
        {
          label: "git fetch tải về nhưng chưa gộp",
          detail: "Lịch sử mới nằm ở origin/main, nhánh của bạn không đổi. Bạn xem trước được mình bị lệch bao nhiêu mốc.",
        },
        {
          label: "git status cho biết độ lệch",
          detail: "Dòng diverged cho biết có 1 commit của bạn và 2 commit bên kia mà bạn chưa có. Đây là lúc nhận ra đây là việc thường ngày.",
        },
        {
          label: "git pull --rebase",
          detail: "Commit của bạn được đặt lên trên phần mới nhất của origin/main. Nếu có xung đột thì giải như ở bài gộp nhánh.",
        },
        {
          label: "git push lại",
          detail: "Giờ nhánh của bạn nằm trên đỉnh lịch sử chung nên đẩy được. Không dùng --force để lách qua bước này.",
        },
      ],
    },
  ],

  "pull-request-va-code-review": [
    {
      type: "scenario",
      title: "Bạn vừa viết xong 1.800 dòng thay đổi",
      start: "a",
      nodes: {
        a: {
          text: "Tính năng xong và hạn chót là mai. Thay đổi có 1.800 dòng, trải trên mười hai tệp. Bạn đưa nó vào nhóm thế nào?",
          choices: [
            { label: "Mở một pull request duy nhất, viết phần mô tả thật chi tiết", next: "bad-lon" },
            { label: "Tách thành ba pull request, mỗi cái một ý riêng biệt", next: "b" },
            { label: "Nhờ bạn thân bấm duyệt ngay để kịp hạn chót", next: "bad-duyet" },
          ],
        },
        "bad-lon": {
          text: "Người duyệt mở ra, thấy hàng trăm dòng, và chuyển từ đọc hiểu sang lướt. Bạn nhận hai góp ý về tên biến, không có góp ý nào về logic. Một lỗi trong phần tính phí đi thẳng vào sản phẩm.",
          ending: "bad",
        },
        "bad-duyet": {
          text: "Bạn của bạn bấm duyệt sau hai phút. Kiểm tra tự động xanh nên mọi người yên tâm, nhưng máy không phán đoán được cách tiếp cận. Hai tuần sau mới phát hiện hàm thiếu một trường hợp biên.",
          ending: "bad",
        },
        b: {
          text: "Ba pull request nhỏ được đọc kỹ trong chiều hôm đó. Một người duyệt góp ý: chỗ này nên đặt tên khác, nhưng bạn thấy tên hiện tại gắn với thuật ngữ của bộ phận kinh doanh. Bạn trả lời thế nào?",
          choices: [
            { label: "Bấm resolve, không trả lời, để người ta tự hiểu", next: "bad-im" },
            { label: "Sửa theo mọi góp ý để nhanh được duyệt", next: "bad-theo" },
            { label: "Giải thích lý do thuật ngữ và hỏi lại ngữ cảnh của họ", next: "good" },
          ],
        },
        "bad-im": {
          text: "Người góp ý thấy mình bị gạt đi. Họ không nói gì nhưng ở pull request sau sẽ chỉ lướt qua. Tên cũ vẫn nằm đó và cuộc trao đổi không mang lại điều gì cho cả hai.",
          ending: "bad",
        },
        "bad-theo": {
          text: "Bạn đổi tên theo góp ý và tên mới lệch với thuật ngữ của bộ phận kinh doanh. Ba tháng sau, người mới đọc code và không nối được nó với tài liệu nghiệp vụ.",
          ending: "bad",
        },
        good: {
          text: "Người duyệt không biết thuật ngữ đó và đồng ý giữ tên, chỉ nhờ thêm một dòng chú thích. Cuộc trao đổi thành một đoạn tài liệu, và cả hai đều biết thêm điều mình chưa biết.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Pull request càng lớn, góp ý thực chất càng ít",
      caption: "Số liệu minh hoạ cho xu hướng bài nêu, không phải thống kê đo đạc từ một đội cụ thể. Điều cần nhìn là hướng đi: thay đổi lớn hơn thì được soi kỹ ít hơn.",
      kind: "bar",
      xLabel: "Kích thước pull request",
      yLabel: "Số góp ý thực chất (minh hoạ)",
      data: [
        { label: "80 dòng", values: [6] },
        { label: "300 dòng", values: [5] },
        { label: "800 dòng", values: [2] },
        { label: "2000 dòng", values: [1] },
      ],
      seriesLabels: ["Góp ý về logic và rủi ro"],
    },
  ],

  "mot-ngay-lam-viec-voi-git": [
    {
      type: "scenario",
      title: "Báo lỗi gấp lúc bạn đang làm dở",
      start: "a",
      nodes: {
        a: {
          text: "Bạn đang sửa dở tính năng trên nhánh riêng, ba tệp chưa commit. Trưởng nhóm báo trang đăng nhập đang lỗi trên main và cần sửa ngay. Bạn làm gì?",
          choices: [
            { label: "Chuyển sang main luôn, Git sẽ tự giữ phần đang dở", next: "bad-tron" },
            { label: "Cất phần dở bằng git stash rồi tách nhánh từ main", next: "b" },
            { label: "Bỏ phần dở bằng git restore cho vùng làm việc sạch", next: "bad-mat" },
          ],
        },
        "bad-tron": {
          text: "Git đưa cả ba tệp đang sửa dở sang nhánh mới. Bạn sửa lỗi đăng nhập và commit hết, nên bản sửa lỗi gấp mang theo nửa tính năng chưa chạy được vào main.",
          ending: "bad",
        },
        "bad-mat": {
          text: "git restore xoá các thay đổi chưa commit và không có đường quay lại. Ba tệp bạn làm từ sáng mất sạch, và bạn phải viết lại từ trí nhớ.",
          ending: "bad",
        },
        b: {
          text: "Bạn sửa lỗi, đẩy nhánh, mở pull request và được gộp vào main. Giờ bạn quay lại nhánh tính năng. Nhánh này đã cũ so với main. Bạn làm gì tiếp?",
          choices: [
            { label: "Pop stash, tiếp tục làm, đến lúc mở PR mới tính", next: "bad-cu" },
            { label: "Làm lại từ đầu cho chắc, bỏ qua stash đã cất", next: "bad-quen" },
            { label: "Pop stash, commit phần dở, rồi kéo main mới về", next: "good" },
          ],
        },
        "bad-cu": {
          text: "Một tuần sau bạn mở pull request và cả tuần thay đổi của main dồn vào một lần gộp. Xung đột nhiều tệp cùng lúc, và bạn không còn nhớ vì sao mình sửa chỗ này như vậy.",
          ending: "bad",
        },
        "bad-quen": {
          text: "Stash cũ nằm trong danh sách và không ai nhớ. Bạn mất thêm hai giờ viết lại điều đã làm xong, và tới tuần sau vẫn còn một stash xung đột với mọi thứ đã đổi.",
          ending: "bad",
        },
        good: {
          text: "Commit dở là một mốc an toàn vì dọn lại sau bằng amend được, còn việc chưa commit thì một lệnh gõ nhầm là mất. Kéo main về ngay hôm nay thì chỉ vài dòng khác biệt, và bạn vẫn nhớ rõ ngữ cảnh.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Vòng lặp Git của một ngày làm việc",
      steps: [
        {
          label: "Sáng: về main và kéo bản mới",
          detail: "git switch main rồi git pull --rebase. Bắt đầu từ main cũ là cách tự tạo xung đột cho chính mình.",
        },
        {
          label: "Tách nhánh cho việc hôm nay",
          detail: "git switch -c sua-loi-dang-nhap. Tên nhánh nói được nội dung, một nhánh cho một việc.",
        },
        {
          label: "Commit nhỏ và thường xuyên",
          detail: "git add -p để duyệt từng đoạn, mỗi commit một ý. Mỗi commit là một chỗ quay lại an toàn khi gõ nhầm.",
        },
        {
          label: "Đẩy nhánh lên",
          detail: "git push -u origin tên-nhánh. Đây cũng là bản sao duy nhất của công việc nằm ngoài máy bạn.",
        },
        {
          label: "Mở pull request, hoà giải góp ý",
          detail: "Viết mô tả nói vấn đề và cách tiếp cận. Được duyệt thì gộp vào main rồi xoá nhánh.",
        },
      ],
    },
  ],

  "do-thoi-gian-truoc-khi-lap-ke-hoach-hoc": [
    {
      type: "exercise",
      language: "python",
      title: "Từ nhật ký một tuần đến con số dùng được",
      task: "Dưới đây là số phút bạn thật sự học mỗi tối trong một tuần, 0 nghĩa là hôm đó không học được. Tính tổng, số ngày học được (chỉ tính ngày lớn hơn 0) và trung bình mỗi ngày học được, làm tròn đến số nguyên. In ra đúng ba dòng.",
      starter: `nhat_ky = [0, 45, 0, 30, 60, 0, 20]
tong = sum(nhat_ky)
so_ngay_hoc = len([p for p in nhat_ky if p >= 0])
trung_binh = tong / so_ngay_hoc
print(f"Tổng: {tong} phút")
print(f"Số ngày học được: {so_ngay_hoc}")
print(f"Trung bình mỗi ngày học được: {trung_binh:.0f} phút")`,
      solution: `nhat_ky = [0, 45, 0, 30, 60, 0, 20]
tong = sum(nhat_ky)
so_ngay_hoc = len([p for p in nhat_ky if p > 0])
trung_binh = tong / so_ngay_hoc
print(f"Tổng: {tong} phút")
print(f"Số ngày học được: {so_ngay_hoc}")
print(f"Trung bình mỗi ngày học được: {trung_binh:.0f} phút")`,
      expectedOutput: `Tổng: 155 phút
Số ngày học được: 4
Trung bình mỗi ngày học được: 39 phút`,
      hints: [
        "Điều kiện p >= 0 đúng với cả ngày không học, nên đếm ra 7 ngày.",
        "Con số trung bình đúng là con số bạn dùng để lập kế hoạch cho ngày học được.",
      ],
    },
  ],

  "tu-dong-hoa-thoi-quen-hoc": [
    {
      type: "scenario",
      title: "Ngày tệ nhất của tuần học",
      start: "a",
      nodes: {
        a: {
          text: "Kế hoạch của bạn là học 45 phút mỗi tối. Thứ Tư cả ngày họp, về nhà kiệt sức lúc 9 giờ tối. Bạn làm gì?",
          choices: [
            { label: "Bỏ tối nay, tối mai học gấp đôi để bù", next: "bad-bu" },
            { label: "Ép mình ngồi đủ 45 phút dù đầu óc trống rỗng", next: "bad-ep" },
            { label: "Làm đúng bản tối thiểu mười lăm phút đã chuẩn bị", next: "b" },
          ],
        },
        "bad-bu": {
          text: "Tối thứ Năm bạn nợ hai phần học khi vẫn mệt. Bạn học dở dang, và chuỗi đứt hai ngày bị đọc thành bằng chứng mình không đủ kỷ luật. Sang tuần sau bạn bỏ hẳn.",
          ending: "bad",
        },
        "bad-ep": {
          text: "Bạn ngồi đủ 45 phút nhưng đọc cùng một đoạn năm lần. Cảm giác tệ gắn với việc học, và hôm sau mở máy đã thấy ngại ngay.",
          ending: "bad",
        },
        b: {
          text: "Bản mười lăm phút nằm sẵn trong lịch: mở đúng tab đã để từ tối hôm trước, làm một bài tập. Bạn làm xong và chuỗi không đứt. Sáng hôm sau, bạn tính xem tối mai nên bắt đầu thế nào.",
          choices: [
            { label: "Học bù phần hôm qua thiếu rồi mới học bài mới", next: "bad-bu2" },
            { label: "Quay lại đúng mức bình thường, coi như chưa có gì cần bù", next: "good" },
          ],
        },
        "bad-bu2": {
          text: "Việc quay lại trở thành trả nợ, và khoản nợ đó xuất hiện ngay lúc bạn đang khó. Chỉ cần thêm một tối bận nữa là chuỗi chuyển sang bỏ hẳn.",
          ending: "bad",
        },
        good: {
          text: "Không có khoản nợ nào để trả nên việc quay lại chẳng cần quyết định gì. Tối thứ Năm bạn mở đúng bài đã chuẩn bị sẵn, và tuần học giữ được tính liên tục thay vì một con số đẹp.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Chuẩn bị tối hôm trước để tối nay không còn gì phải chọn",
      steps: [
        {
          label: "Cuối buổi học, ghi chỗ dừng",
          detail: "Viết một dòng: đang dở ở đâu và bước tiếp theo là gì. Mai bạn khỏi tìm lại chỗ đang dở.",
        },
        {
          label: "Chọn nội dung cho buổi sau",
          detail: "Quyết định ngay lúc đầu óc còn tỉnh: mai làm bài nào. Lúc ngồi xuống không còn câu hỏi học gì.",
        },
        {
          label: "Mở sẵn thứ cần dùng",
          detail: "Để sẵn tab, tệp, hoặc ghi chú trên màn hình. Bước mở công cụ là chỗ nhiều người bỏ cuộc nhất.",
        },
        {
          label: "Đặt khung giờ cố định",
          detail: "Cùng giờ mỗi tối thay cho khi nào tiện. Giờ cố định biến việc học thành thói quen, không phải một quyết định.",
        },
        {
          label: "Vạch sẵn bản tối thiểu cho ngày tệ nhất",
          detail: "Viết trước phiên bản mười lăm phút. Ngày tệ nhất bạn không phải nghĩ, chỉ cần làm.",
        },
      ],
    },
  ],

  "chong-quen-giu-lai-thu-da-hoc": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp lịch nhớ lại với khoảng cách giãn dần",
      task: "Bạn học xong một phần vào ngày thứ 10 của kế hoạch. Muốn nhớ lại sau 2 ngày, rồi sau thêm 4 ngày, rồi sau thêm 8 ngày, mỗi khoảng tính từ lần nhớ lại trước đó. In ra danh sách các ngày nhớ lại. Khoảng cách này chỉ là ví dụ để luyện tính, bạn tự chọn nhịp hợp với mình.",
      starter: `ngay_hoc = 10
khoang_cach = [2, 4, 8]
ngay_on = []
for k in khoang_cach:
    ngay_on.append(ngay_hoc + k)
print("Lịch nhớ lại:", ngay_on)`,
      solution: `ngay_hoc = 10
khoang_cach = [2, 4, 8]
ngay_on = []
moc = ngay_hoc
for k in khoang_cach:
    moc += k
    ngay_on.append(moc)
print("Lịch nhớ lại:", ngay_on)`,
      expectedOutput: `Lịch nhớ lại: [12, 16, 24]`,
      hints: [
        "Mã khởi đầu luôn cộng khoảng cách vào ngày học đầu tiên, nên các lần nhớ lại dồn gần nhau.",
        "Dùng một biến lưu ngày nhớ lại gần nhất và cộng khoảng cách tiếp theo vào đó.",
      ],
    },
    {
      type: "flow",
      title: "Một buổi nhớ lại đúng nghĩa",
      steps: [
        {
          label: "Đóng hết tài liệu",
          detail: "Đóng ghi chú, tab và video. Nhìn lại thì thấy quen, nhưng thấy quen chưa phải là nhớ.",
        },
        {
          label: "Tự viết ra từ trang trắng",
          detail: "Viết điều bạn nhớ về chủ đề hôm đó. Cảm giác chậm và khó chịu cho thấy việc nhớ lại đang diễn ra.",
        },
        {
          label: "Mở tài liệu và đối chiếu",
          detail: "Gạch chỗ bạn quên hoặc nhớ sai. Đây là chỗ cần ôn, không phải toàn bộ bài.",
        },
        {
          label: "Hẹn lần sau cách xa hơn",
          detail: "Để vài ngày rồi lấy lại. Khoảng cách làm lần lấy lại khó hơn, và độ khó đó tạo ra hiệu quả.",
        },
        {
          label: "Dựng lại một thứ rất nhỏ không nhìn tài liệu",
          detail: "Làm một chức năng nhỏ từ đầu. Bạn phải quyết định ở những chỗ tài liệu không nói, và đó là khác biệt giữa biết về nó với làm được.",
        },
      ],
    },
  ],
};
