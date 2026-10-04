import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 11. Một người viết cho một tệp.
export const P11_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Chặng 16 ────────────────────────────────────────────────────────────
  "bao-mat-tai-khoan-toi-thieu": [
    {
      type: "scenario",
      title: "Mã xác thực không do bạn yêu cầu",
      start: "ma",
      nodes: {
        ma: {
          text: "Chín giờ sáng, điện thoại báo một mã 6 số gửi tới số của bạn, dù bạn không đăng nhập ở đâu. Ngay sau đó có người gọi, xưng là nhân viên bảo mật, nói tài khoản đang bị đăng nhập lạ và xin bạn đọc mã để họ huỷ phiên đó.",
          choices: [
            { label: "Đọc mã cho họ để huỷ phiên đăng nhập lạ cho nhanh", next: "doc-ma" },
            { label: "Cúp máy, không đọc mã, rồi tự mở thông báo trong email", next: "email" },
          ],
        },
        "doc-ma": {
          text: "Mã đó chính là chìa khoá cuối cùng mà người gọi đang thiếu. Họ nhập nó ngay, vào được tài khoản, đổi mật khẩu rồi khoá bạn ra ngoài. Xác thực hai lớp vẫn bật, nhưng chính bạn đã tự tay đưa lớp thứ hai cho họ.",
          ending: "bad",
        },
        email: {
          text: "Trong hộp thư có cảnh báo thật: có người vừa nhập đúng mật khẩu email của bạn từ một thiết bị lạ. Mật khẩu đó bạn từng dùng chung cho một diễn đàn nhỏ mà tháng trước thông báo bị lộ dữ liệu.",
          choices: [
            { label: "Đổi mật khẩu email sang một mật khẩu riêng, chưa dùng ở đâu", next: "sim" },
            { label: "Đổi mật khẩu của diễn đàn nhỏ, vì nơi đó mới là chỗ bị lộ", next: "chi-dien-dan" },
          ],
        },
        "chi-dien-dan": {
          text: "Diễn đàn đã an toàn, nhưng email vẫn mang mật khẩu cũ mà kẻ xấu đã có. Họ vào email, bấm quên mật khẩu ở ngân hàng điện tử và mạng xã hội, rồi nhận liên kết đặt lại ngay trong hộp thư mà họ đang nắm.",
          ending: "bad",
        },
        sim: {
          text: "Email giờ có mật khẩu riêng và bạn đã kiểm tra xác thực hai lớp đang bật. Còn một cửa nhỏ: kẻ xấu có thể thuyết phục nhà mạng chuyển số điện thoại của bạn sang một sim khác để nhận mã thay bạn.",
          choices: [
            { label: "Tới nhà mạng đăng ký khoá đổi sim cho số điện thoại này", next: "tot" },
            { label: "Bỏ qua, vì đã có xác thực hai lớp thì thế là đủ rồi", next: "bo-qua" },
          ],
        },
        tot: {
          text: "Một lần ghé nhà mạng, bạn bịt được cửa mà ít người biết tới. Từ nay kẻ xấu muốn chiếm số của bạn phải qua thêm một lớp, và mật khẩu email, xác thực hai lớp, khoá đổi sim cùng bảo vệ chìa khoá lớn nhất của bạn.",
          ending: "good",
        },
        "bo-qua": {
          text: "Vài tháng sau, số của bạn bị chuyển sang một sim khác. Mã xác thực giờ về tay người lạ, và xác thực hai lớp mà bạn tin là đủ lại chính là thứ họ dùng để vào tài khoản.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Một mật khẩu email bị lộ mở ra những cửa nào",
      steps: [
        { label: "Một dịch vụ nhỏ bị lộ dữ liệu", detail: "Diễn đàn bạn đăng ký từ nhiều năm trước bị lộ danh sách email và mật khẩu. Bạn quên mất mình còn tài khoản ở đó." },
        { label: "Kẻ xấu thử mật khẩu ấy ở nơi khác", detail: "Họ thử đúng cặp email và mật khẩu đó với hộp thư của bạn. Nếu bạn dùng chung, cửa mở ngay ở lần thử đầu." },
        { label: "Họ bấm quên mật khẩu ở mọi dịch vụ", detail: "Ngân hàng, mạng xã hội, mua sắm: dịch vụ nào cũng cho đặt lại mật khẩu qua email, nên họ không cần biết mật khẩu riêng của từng nơi." },
        { label: "Liên kết đặt lại về hộp thư của họ", detail: "Liên kết gửi về email, mà email lúc này đang trong tay kẻ xấu. Mật khẩu ngân hàng phức tạp tới đâu cũng không còn tác dụng." },
        { label: "Hai lớp chặn họ ở bước nào", detail: "Mật khẩu riêng cho email chặn ở bước hai. Xác thực hai lớp chặn họ khi mật khẩu đã lộ. Khoá đổi sim chặn việc chiếm số để nhận mã." },
      ],
    },
  ],

  "neu-da-bi-lua-lam-gi": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bản hướng dẫn 'giờ đầu tiên' do AI soạn",
      task: "Một chatbot soạn hướng dẫn cho người vừa chuyển tiền cho kẻ lừa đảo. Bấm vào các câu có thể làm hại người đang hoảng, rồi nộp.",
      segments: [
        { text: "Việc đầu tiên là gọi ngân hàng ngay, báo giao dịch bị lừa đảo và đề nghị hỗ trợ." },
        {
          text: "Trước khi gọi, hãy xoá cuộc trò chuyện với kẻ lừa đi để bớt xấu hổ và đỡ nhìn lại.",
          error: "Tin nhắn, số tài khoản nhận, ảnh chụp màn hình và biên lai là bằng chứng. Xoá đi là tự làm yếu hồ sơ trình báo.",
        },
        { text: "Chụp màn hình tin nhắn, số tài khoản nhận và biên lai rồi cất ở nơi an toàn." },
        {
          text: "Cứ chờ một hai ngày cho bình tĩnh rồi mới gọi ngân hàng, vì gọi sớm hay muộn cũng như nhau.",
          error: "Khả năng can thiệp vào dòng tiền giảm theo từng giờ vì tiền thường được chuyển tiếp ngay sau khi nhận. Gọi ngân hàng phải là việc đầu tiên.",
        },
        { text: "Mang hồ sơ đã giữ tới trình báo cơ quan chức năng." },
        {
          text: "Nếu có dịch vụ nhắn tin nhận lấy lại tiền cho bạn và chỉ cần ứng trước một khoản phí, hãy cân nhắc nhận vì họ có nghiệp vụ.",
          error: "Đây là vòng lừa thứ hai nhắm vào người vừa mất tiền. Không dịch vụ tư nhân nào lấy lại được khoản đã chuyển, và phí ứng trước chỉ làm khoản mất lớn thêm.",
        },
        { text: "Đổi mật khẩu nếu thông tin đăng nhập có thể đã lộ, bắt đầu từ email." },
      ],
    },
    {
      type: "flow",
      title: "Giờ đầu tiên, theo đúng thứ tự",
      steps: [
        { label: "Gọi ngân hàng", detail: "Báo giao dịch bị lừa đảo và đề nghị hỗ trợ. Chỉ bước này can thiệp được vào dòng tiền, nên nó đứng đầu và không được chờ." },
        { label: "Giữ nguyên bằng chứng", detail: "Tin nhắn, số tài khoản nhận, ảnh chụp màn hình, biên lai. Chụp và cất trước khi chặn hay xoá bất cứ thứ gì." },
        { label: "Trình báo cơ quan chức năng", detail: "Mang theo toàn bộ hồ sơ đã giữ. Người tiếp nhận làm việc nhanh hơn nhiều khi có sẵn số tài khoản và thời điểm chuyển." },
        { label: "Đổi mật khẩu từ email", detail: "Nếu thông tin đăng nhập có thể đã lộ, đổi email trước vì mọi dịch vụ khác đặt lại mật khẩu qua nó." },
        { label: "Từ chối 'dịch vụ thu hồi tiền'", detail: "Lời đề nghị giúp lấy lại tiền kèm phí ứng trước thường xuất hiện sau đó. Đừng trả, và nếu nhận được thì nói với ngân hàng." },
      ],
    },
  ],

  "quy-tac-an-toan-cho-ca-nha": [
    {
      type: "scenario",
      title: "Tin nhắn 'chị đổi số rồi, chuyển giúp chị gấp'",
      start: "tin",
      nodes: {
        tin: {
          text: "Bạn nhận tin Zalo từ một tài khoản có ảnh giống chị gái: 'Chị đổi số rồi, đang cần gấp, em chuyển giúp chị 6 triệu, tối chị trả.' Tài khoản này không phải số chị vẫn dùng, và tin nhắn nói đừng gọi vì chị đang họp.",
          choices: [
            { label: "Chuyển trước cho kịp, rồi hỏi lại chị sau khi họp xong", next: "chuyen" },
            { label: "Dừng lại, rồi tự gọi chị bằng số cũ đã lưu trong máy của bạn", next: "dung" },
          ],
        },
        chuyen: {
          text: "Tài khoản đó là kẻ lừa dùng ảnh của chị. Ngay sau khi nhận tiền, họ nhắn tiếp xin thêm một khoản nữa. Tới khi bạn gọi cho chị thật thì tiền đã đi xa, và bạn báo ngân hàng muộn hơn lẽ ra nhiều giờ.",
          ending: "bad",
        },
        dung: {
          text: "Chị bắt máy ngay và nói chị không nhắn gì cả, số cũ vẫn dùng bình thường. Bạn đã phá cả ba điều kiện của kịch bản: dừng lại, gọi cho người thật, và dùng số tự tra thay vì số do người lạ đưa. Giờ còn một việc nữa.",
          choices: [
            { label: "Báo cho cả nhà, nhờ mọi người cùng chặn và nhớ câu quy tắc", next: "bao-ca-nha" },
            { label: "Chỉ chặn tài khoản đó, còn chuyện này nhỏ nên không cần kể ai", next: "im-lang" },
          ],
        },
        "bao-ca-nha": {
          text: "Tối đó mẹ bạn nhận đúng tin nhắn ấy từ 'chị'. Mẹ nhớ câu quy tắc cả nhà đã thống nhất: dừng lại, gọi người khác, gọi bằng số tự tra. Mẹ gọi cho chị trước khi chuyển một đồng nào.",
          ending: "good",
        },
        "im-lang": {
          text: "Kẻ lừa dùng cùng ảnh để nhắn cho mẹ bạn, người ít khi để ý đến những tin như vậy. Vì không ai báo trước, mẹ chuyển 3 triệu rồi mới kể cho bạn vào buổi tối, khi tiền đã đi xa.",
          ending: "bad",
        },
      },
    },
    {
      type: "feynman",
      title: "Cái bẫy nào cũng cần đủ ba điều kiện",
      intro: "Người bán hàng rong mời: 'Chỉ hôm nay, mua ngay kẻo hết, đưa tiền đây tôi lấy hàng'. Bạn thấy lạ nhưng đang đứng một mình, người ta thì cứ giục. Tin nhắn lừa đảo dùng đúng ba chiêu đó.",
      columns: ["Điều kiện", "Ở chợ", "Trong tin nhắn lừa / Cách phá"],
      rows: [
        ["Phải gấp", "'Chỉ hôm nay, hết là mất'", "'Tài khoản sắp bị khoá, xử lý trong 15 phút' — Nói hai chữ dừng lại. Việc thật không hỏng vì chậm."],
        ["Phải một mình", "Đứng một mình, không ai hỏi giá giúp", "'Đừng nói ai kẻo lộ bí mật' — Gọi cho người khác xem cùng. Trạng thái hoảng không lây."],
        ["Phải qua kênh của họ", "Chỉ trả cho người đang đứng trước mặt", "Số hiển thị, link, tài khoản do họ đưa — Gọi lại bằng số tự tra, không dùng số họ đưa."],
      ],
      oneLiner: "Phá được một trong ba điều kiện là bẫy đã hỏng - nên ba chữ dừng, gọi người khác, tự tra số bao được nhiều tình huống hơn một danh sách dài.",
    },
  ],

  // ── Chặng 17 ────────────────────────────────────────────────────────────
  "kiem-truoc-khi-nop-len-kho-ung-dung": [
    {
      type: "exercise",
      language: "python",
      title: "Lọc ra những mục hồ sơ còn thiếu",
      task: "Dưới đây là danh sách soát hồ sơ trước khi nộp. Mỗi mục đã có (True) hay chưa (False). Sửa vòng lặp để in đúng những mục CÒN THIẾU.",
      starter:
        "ho_so = {\n    \"Chính sách quyền riêng tư\": True,\n    \"Giải thích từng quyền\": False,\n    \"Tài khoản thử\": True,\n    \"Đường xoá tài khoản\": False,\n}\n\nthieu = []\nfor muc, du in ho_so.items():\n    if du:\n        thieu.append(muc)\n\nprint(\"Còn thiếu\", len(thieu), \"mục:\")\nfor muc in thieu:\n    print(\"-\", muc)\n",
      solution:
        "ho_so = {\n    \"Chính sách quyền riêng tư\": True,\n    \"Giải thích từng quyền\": False,\n    \"Tài khoản thử\": True,\n    \"Đường xoá tài khoản\": False,\n}\n\nthieu = []\nfor muc, du in ho_so.items():\n    if not du:\n        thieu.append(muc)\n\nprint(\"Còn thiếu\", len(thieu), \"mục:\")\nfor muc in thieu:\n    print(\"-\", muc)\n",
      expectedOutput: "Còn thiếu 2 mục:\n- Giải thích từng quyền\n- Đường xoá tài khoản",
      hints: [
        "Chương trình đang thêm vào danh sách những mục đã đủ, trong khi ta cần những mục chưa đủ.",
        "Điều kiện nào đảo được giá trị True/False? Thử thêm chữ not.",
      ],
    },
  ],

  "dieu-khoan-kho-ung-dung-va-chuyen-bi-go": [
    {
      type: "scenario",
      title: "Thư báo ứng dụng bị gỡ",
      start: "thu",
      nodes: {
        thu: {
          text: "Sáng nay bạn nhận thư từ kho ứng dụng: ứng dụng của bạn bị gỡ tạm vì vi phạm một điều khoản. Thư nêu tên điều khoản và cho phép sửa rồi nộp lại. Người dùng đang hỏi bạn trong nhóm chat là ứng dụng đâu rồi.",
          choices: [
            { label: "Đọc kỹ điều khoản được nêu, sửa đúng điểm đó rồi nộp lại", next: "sua" },
            { label: "Nộp lại bản cũ, chỉ đổi vài dòng mô tả cho khác đi", next: "nop-lai" },
            { label: "Lập tài khoản mới và đăng lại ứng dụng dưới tên khác", next: "tai-khoan-moi" },
          ],
        },
        "nop-lai": {
          text: "Bản mô tả khác đi nhưng điểm vi phạm vẫn nguyên. Đội duyệt từ chối lần nữa, bạn mất thêm vài ngày chờ, và người dùng càng sốt ruột trong lúc bạn chẳng có lời nào để nói với họ.",
          ending: "bad",
        },
        "tai-khoan-moi": {
          text: "Việc này dễ bị coi là lách quy định của kho. Điểm vi phạm không hề được sửa, bạn có nguy cơ mất luôn tài khoản mới, và cả lịch sử đánh giá của ứng dụng cũ cũng không theo sang được.",
          ending: "bad",
        },
        sua: {
          text: "Bạn sửa đúng điểm bị nêu và nộp lại, kèm một dòng giải thích bạn đã đổi gì. Trong lúc chờ duyệt, người dùng hỏi họ biết tin về ứng dụng ở đâu, vì bạn chưa có danh sách email hay trang riêng nào.",
          choices: [
            { label: "Lập một trang thông báo đơn giản, mời người dùng để lại email", next: "kenh-rieng" },
            { label: "Chờ kết quả duyệt rồi mới tính, vì đó là việc của tuần sau", next: "cho" },
          ],
        },
        "kenh-rieng": {
          text: "Ứng dụng được duyệt lại sau vài ngày. Nhờ trang thông báo, bạn báo được tin tới những người đã để lại email, và lần sau nếu có sự cố phân phối bạn vẫn có đường nói với họ mà không qua kho.",
          ending: "good",
        },
        cho: {
          text: "Việc duyệt kéo dài hơn dự tính. Trong thời gian đó người dùng không biết tin gì, nhiều người gỡ khỏi thói quen dùng, và bạn không có cách nào nhắn lại cho họ khi ứng dụng quay lại.",
          ending: "bad",
        },
      },
    },
    {
      type: "chart",
      title: "Từ giá bán tới số tiền về tay bạn",
      caption: "Các mức phí, thuế và hoàn tiền dưới đây chỉ là số minh hoạ để thấy cách chúng nhân nhau. Mức thật tuỳ nền tảng, nơi người mua và nơi bạn nhận tiền - hãy tra điều khoản hiện hành trước khi dựng mô hình doanh thu.",
      kind: "line",
      xLabel: "Giá bán (nghìn đồng)",
      yLabel: "Nghìn đồng",
      x: { from: 20, to: 200, step: 20 },
      params: [
        { id: "phi", label: "Phí nền tảng (minh hoạ)", min: 10, max: 35, step: 1, value: 30, unit: "%" },
        { id: "thue", label: "Thuế (minh hoạ)", min: 0, max: 20, step: 1, value: 10, unit: "%" },
        { id: "hoan", label: "Hoàn tiền (minh hoạ)", min: 0, max: 20, step: 1, value: 5, unit: "%" },
      ],
      series: [
        { label: "Giá bán", expr: "x" },
        { label: "Về tới bạn", expr: "x * (1 - phi / 100) * (1 - thue / 100) * (1 - hoan / 100)" },
      ],
    },
  ],

  "chi-phi-that-de-ra-mat-ung-dung": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bảng chi phí do AI soạn",
      task: "Một chatbot soạn bảng chi phí cho ứng dụng cá nhân miễn phí. Bấm vào các câu đang đánh giá thấp chi phí thật, rồi nộp.",
      segments: [
        { text: "Khoản một lần gồm tài khoản nhà phát triển, thiết bị thử và thiết kế giao diện." },
        {
          text: "Vì ứng dụng miễn phí nên sau ngày ra mắt gần như không còn khoản chi nào.",
          error: "Miễn phí chỉ là không thu tiền. Cập nhật theo hệ điều hành, hỗ trợ người dùng và hạ tầng theo mức dùng vẫn chạy đều sau ngày ra mắt.",
        },
        { text: "Mỗi năm cần dành vài ngày công để sửa ứng dụng theo bản hệ điều hành mới." },
        {
          text: "Hỗ trợ người dùng có thể tính bằng không vì ứng dụng đơn giản và ít ai hỏi.",
          error: "Hỗ trợ bằng không cho tới ngày ra mắt, rồi đều đặn từ đó, và cạnh tranh trực tiếp với thời gian làm tính năng mới.",
        },
        { text: "Nên đặt cảnh báo chi phí hạ tầng từ ngày đầu vì nó tăng theo số người dùng." },
        {
          text: "Một chiếc máy cao cấp là đủ để thử, vì máy rẻ cũng chạy y hệt như vậy.",
          error: "Một máy Android phổ thông nói nhiều hơn một máy cao cấp, vì đó là loại máy người dùng thật đang có.",
        },
      ],
    },
    {
      type: "chart",
      title: "Chi phí cộng dồn qua hai năm",
      caption: "Số tiền là minh hoạ, không phải mức giá thật. Kéo thanh trượt để thấy khoản một lần nhỏ ra sao so với khoản đều đặn khi cộng dồn theo tháng.",
      kind: "line",
      xLabel: "Tháng kể từ ngày ra mắt",
      yLabel: "Triệu đồng (minh hoạ)",
      x: { from: 0, to: 24, step: 3 },
      params: [
        { id: "motlan", label: "Khoản một lần", min: 5, max: 50, step: 1, value: 15, unit: " triệu" },
        { id: "deu", label: "Khoản đều đặn mỗi tháng", min: 0, max: 10, step: 0.5, value: 3, unit: " triệu" },
      ],
      series: [
        { label: "Chỉ khoản một lần", expr: "motlan" },
        { label: "Cộng cả khoản đều đặn", expr: "motlan + x * deu" },
      ],
    },
  ],

  "het-da-ra-mat-va-chi-phi-nguoi-dung-moi": [
    {
      type: "scenario",
      title: "Tuần thứ ba sau ngày ra mắt",
      start: "dau",
      nodes: {
        dau: {
          text: "Tuần đầu ứng dụng của bạn có khoảng 1.500 lượt tải, phần lớn từ người quen. Tuần thứ ba số tải chỉ còn vài trăm. Bạn đang cân nhắc mấy khoản chi mà hồi tuần đầu nghe rất hợp lý (số liệu minh hoạ).",
          choices: [
            { label: "Mở rộng hạ tầng và đăng ký gói dịch vụ trả hằng tháng", next: "mo-rong" },
            { label: "Hoãn mọi khoản chi mới tới sau tuần thứ tư, xem mức nền đã", next: "hoan" },
            { label: "Thuê bạn làm thêm bán thời gian để kịp đà tăng trưởng", next: "thue" },
          ],
        },
        "mo-rong": {
          text: "Sang tuần thứ năm, số tải ổn định ở mức nền thấp hơn nhiều so với tuần đầu. Khoản định kỳ vừa cam kết lớn hơn khoản bạn thu được, và việc rút lại thì tốn công hơn lúc đăng ký.",
          ending: "bad",
        },
        thue: {
          text: "Bạn đã trả lương và đã hứa thời gian làm việc dài hạn, dựa trên con số đo mạng lưới quen biết của mình chứ không đo nhu cầu thật. Khi mức nền hiện ra, bạn mới thấy khoản này khó rút nhất.",
          ending: "bad",
        },
        hoan: {
          text: "Tới tuần thứ tư, số tải ổn định quanh một mức thấp hơn tuần đầu nhiều - đây mới là mức nền. Để biết sản phẩm giữ được người hay không, bạn cần chọn một chỉ số để nhìn.",
          choices: [
            { label: "Xem tỷ lệ quay lại sau 7 ngày và sau 30 ngày của người dùng", next: "quay-lai" },
            { label: "Lấy trung bình bốn tuần đầu làm con số kế hoạch cho tháng sau", next: "trung-binh" },
          ],
        },
        "quay-lai": {
          text: "Tỷ lệ quay lại không bị đợt ra mắt làm cho đẹp lên, nên nó cho bạn biết sản phẩm giữ được ai. Bạn chi tiền theo mức nền và tỷ lệ này, nên khi muốn mở rộng, con số đã đủ để biện minh.",
          ending: "good",
        },
        "trung-binh": {
          text: "Trung bình bốn tuần bị tuần đầu kéo lên cao, nên kế hoạch tháng sau dựa trên số tải mà thực tế sẽ không còn. Tháng sau thiếu hụt, và các khoản chi đã chốt theo con số cao đó.",
          ending: "bad",
        },
      },
    },
    {
      type: "chart",
      title: "Đà ra mắt tắt dần, mức nền còn lại",
      caption: "Đường cong là minh hoạ để thấy hình dạng: tuần đầu cao nhờ mạng lưới quan hệ rồi giảm dần về mức nền. Số thật của ứng dụng bạn sẽ khác; hãy đo từ tuần thứ tư.",
      kind: "line",
      xLabel: "Tuần kể từ ngày ra mắt",
      yLabel: "Lượt tải mỗi tuần (minh hoạ)",
      x: { from: 1, to: 12, step: 1 },
      params: [
        { id: "nen", label: "Mức tải nền", min: 20, max: 200, step: 10, value: 60 },
        { id: "dau", label: "Đà tuần đầu cộng thêm", min: 200, max: 3000, step: 100, value: 1500 },
      ],
      series: [
        { label: "Lượt tải mỗi tuần", expr: "nen + dau * 0.5 ^ (x - 1)" },
        { label: "Mức nền", expr: "nen" },
      ],
    },
  ],

  "nen-tang-dung-chung-cai-ban-khong-kiem-soat": [
    {
      type: "scenario",
      title: "Bản thử hệ điều hành vừa ra",
      start: "ban-thu",
      nodes: {
        "ban-thu": {
          text: "Hệ điều hành công bố bản thử cho nhà phát triển, kèm danh sách thay đổi có thể làm hỏng ứng dụng cũ. Một trong số đó thu hẹp quyền truy cập, trong khi tính năng nhắc lịch của bạn đang dựa vào đúng quyền rộng ấy.",
          choices: [
            { label: "Chạy ứng dụng trên bản thử ngay và đọc danh sách thay đổi", next: "chay-thu" },
            { label: "Chờ bản chính thức ra rồi sửa một lượt cho đỡ mất công", next: "cho" },
            { label: "Xin thêm nhiều quyền rộng trong ứng dụng để phòng khi cần", next: "xin-quyen" },
          ],
        },
        cho: {
          text: "Bản chính thức ra và người dùng cập nhật. Tính năng nhắc lịch hỏng đúng lúc họ đang gửi thư cho bạn, và bạn phải sửa gấp, thay vì sửa lúc rảnh như bản thử cho phép.",
          ending: "bad",
        },
        "xin-quyen": {
          text: "Chính sách yêu cầu lý do cụ thể cho từng quyền, nên bản nộp xin quyền rộng không có lý do thuyết phục bị từ chối. Hướng thu hẹp quyền vẫn không đổi, và bạn mất thêm thời gian chờ duyệt.",
          ending: "bad",
        },
        "chay-thu": {
          text: "Trên bản thử, tính năng nhắc lịch hỏng vì quyền hẹp lại. Bạn còn nhiều tháng trước khi bản chính thức tới, và có hai hướng xử lý.",
          choices: [
            { label: "Đổi sang cách dùng quyền hẹp hơn, đủ cho đúng việc nhắc lịch", next: "hep" },
            { label: "Giữ nguyên thiết kế, hy vọng hệ điều hành nới lại trước bản chính thức", next: "hy-vong" },
          ],
        },
        hep: {
          text: "Bạn sửa vào một buổi, trong lúc chưa ai gửi thư phàn nàn. Khi bản chính thức ra, ứng dụng đã chạy ổn, và thiết kế mới còn khớp với hướng siết quyền đã rõ nhiều năm nay.",
          ending: "good",
        },
        "hy-vong": {
          text: "Hướng siết quyền đã rõ từ nhiều năm, và bản chính thức giữ nguyên thay đổi. Bạn đặt cược vào chuyện mọi thứ đứng yên và thua, phải sửa gấp khi người dùng đã gặp lỗi.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Một bản cập nhật hệ điều hành đi qua ứng dụng của bạn",
      steps: [
        { label: "Bản thử và danh sách thay đổi", detail: "Nền tảng phát hành bản thử nhiều tháng trước bản chính thức. Danh sách ghi rõ thay đổi nào có thể làm hỏng ứng dụng cũ." },
        { label: "Cài bản thử trên một máy", detail: "Dùng một máy riêng, không phải máy hằng ngày. Chạy ứng dụng của bạn và các luồng người dùng hay đi qua." },
        { label: "Đối chiếu với phần dựa vào quyền", detail: "Tìm tính năng nào đang dựa vào quyền rộng, dịch vụ bên thứ ba, hoặc cách nhận diện người dùng cũ có thể bị chặn." },
        { label: "Sửa lúc rảnh", detail: "Đổi sang quyền hẹp hơn hoặc cách khác. Một buổi sửa lúc này rẻ hơn nhiều so với sửa gấp khi người dùng đã gặp lỗi." },
        { label: "Phát hành trước bản chính thức", detail: "Khi bản chính thức tới, ứng dụng đã sẵn sàng. Lặp lại vài lần mỗi năm để biến mỗi bản cập nhật thành một việc, chứ không phải một lần hồi hộp." },
      ],
    },
  ],

  "native-hay-da-nen-tang": [
    {
      type: "exercise",
      language: "javascript",
      title: "Quy tắc chọn native hay đa nền tảng",
      task: "Quy tắc: dự án có đồ họa nặng HOẶC cần tính năng hệ thống sâu thì chọn native; còn lại chọn đa nền tảng. Sửa điều kiện để ba dự án dưới đây nhận đúng lời khuyên.",
      starter:
        "const duAn = [\n  { ten: \"Danh sách đọc sách\", dohoaNang: false, tinhNangHeThong: false },\n  { ten: \"Ứng dụng chỉnh video 3D\", dohoaNang: true, tinhNangHeThong: false },\n  { ten: \"Trình quản lý Bluetooth\", dohoaNang: false, tinhNangHeThong: true },\n];\n\nfor (const d of duAn) {\n  const canNative = d.dohoaNang && d.tinhNangHeThong;\n  console.log(d.ten + \": \" + (canNative ? \"native\" : \"đa nền tảng\"));\n}\n",
      solution:
        "const duAn = [\n  { ten: \"Danh sách đọc sách\", dohoaNang: false, tinhNangHeThong: false },\n  { ten: \"Ứng dụng chỉnh video 3D\", dohoaNang: true, tinhNangHeThong: false },\n  { ten: \"Trình quản lý Bluetooth\", dohoaNang: false, tinhNangHeThong: true },\n];\n\nfor (const d of duAn) {\n  const canNative = d.dohoaNang || d.tinhNangHeThong;\n  console.log(d.ten + \": \" + (canNative ? \"native\" : \"đa nền tảng\"));\n}\n",
      expectedOutput: "Danh sách đọc sách: đa nền tảng\nỨng dụng chỉnh video 3D: native\nTrình quản lý Bluetooth: native",
      hints: [
        "Quy tắc nói 'HOẶC': chỉ cần một trong hai điều kiện đúng là đủ.",
        "Trong JavaScript, 'hoặc' viết là ||, còn && nghĩa là 'và' - phải đúng cả hai.",
      ],
    },
    {
      type: "chart",
      title: "Giá của việc đổi ý tăng theo thời gian",
      caption: "Số màn hình và ngày công dưới đây là minh hoạ để thấy xu hướng: càng về sau, càng nhiều màn hình gắn chặt vào lựa chọn ban đầu, nên đổi ý càng đắt.",
      kind: "line",
      xLabel: "Tháng kể từ khi bắt đầu dựng",
      yLabel: "Ngày công phải viết lại (minh hoạ)",
      x: { from: 1, to: 12, step: 1 },
      params: [
        { id: "mh", label: "Màn hình thêm mỗi tháng", min: 1, max: 10, step: 1, value: 4 },
        { id: "ngay", label: "Ngày công viết lại một màn hình", min: 0.5, max: 4, step: 0.5, value: 1.5 },
      ],
      series: [
        { label: "Nếu đổi ý ở tháng này", expr: "x * mh * ngay" },
        { label: "Nếu đổi ý ở tháng đầu", expr: "mh * ngay" },
      ],
    },
  ],

  "doanh-thu-that-cua-mot-ung-dung": [
    {
      type: "exercise",
      language: "python",
      title: "Bốn phép nhân từ lượt cài tới tiền về tay",
      task: "Số liệu minh hoạ: 1.000 lượt cài, 20% còn hoạt động sau 30 ngày, 4% trong số đó trả tiền, mỗi người trả 5 tháng, giá 50.000 đồng một tháng và bạn nhận lại 70% sau phí và thuế. Mã dưới đang bỏ qua bước còn hoạt động. Sửa để số người trả tiền tính từ người còn hoạt động.",
      starter:
        "cai = 1000\ncon_hoat_dong = 0.2\ntra_tien = 0.04\nso_thang = 5\ngia = 50000\nphan_con_lai = 0.7\n\nso_nguoi_tra = cai * tra_tien\ntong = so_nguoi_tra * so_thang * gia * phan_con_lai\n\nprint(\"Người còn hoạt động:\", round(cai * con_hoat_dong))\nprint(\"Người trả tiền:\", round(so_nguoi_tra))\nprint(\"Thực nhận:\", round(tong), \"đồng\")\n",
      solution:
        "cai = 1000\ncon_hoat_dong = 0.2\ntra_tien = 0.04\nso_thang = 5\ngia = 50000\nphan_con_lai = 0.7\n\nso_nguoi_tra = cai * con_hoat_dong * tra_tien\ntong = so_nguoi_tra * so_thang * gia * phan_con_lai\n\nprint(\"Người còn hoạt động:\", round(cai * con_hoat_dong))\nprint(\"Người trả tiền:\", round(so_nguoi_tra))\nprint(\"Thực nhận:\", round(tong), \"đồng\")\n",
      expectedOutput: "Người còn hoạt động: 200\nNgười trả tiền: 8\nThực nhận: 1400000 đồng",
      hints: [
        "Người đã gỡ ứng dụng không nằm trong bất kỳ phép tính nào phía sau. Tỷ lệ trả tiền áp dụng cho ai?",
        "so_nguoi_tra phải nhân cả cai, con_hoat_dong và tra_tien.",
      ],
    },
    {
      type: "chart",
      title: "Tiền về tay thay đổi mạnh theo hai con số",
      caption: "Số liệu minh hoạ: 1.000 lượt cài, giá 50.000 đồng một tháng, bạn nhận lại 70% sau phí và thuế. Kéo tỷ lệ còn hoạt động và số tháng ở lại để thấy tổng thực nhận thay đổi thế nào so với tỷ lệ trả tiền.",
      kind: "line",
      xLabel: "Tỷ lệ trả tiền (%)",
      yLabel: "Thực nhận (triệu đồng, minh hoạ)",
      x: { from: 1, to: 10, step: 1 },
      params: [
        { id: "con", label: "Còn hoạt động sau 30 ngày", min: 5, max: 50, step: 1, value: 20, unit: "%" },
        { id: "thang", label: "Số tháng ở lại", min: 1, max: 12, step: 1, value: 5, unit: " tháng" },
      ],
      series: [{ label: "Thực nhận", expr: "1000 * con / 100 * x / 100 * thang * 50000 * 0.7 / 1000000" }],
    },
  ],

  "danh-sach-truoc-khi-bam-phat-hanh": [
    {
      type: "exercise",
      language: "python",
      title: "Phát hành theo tỷ lệ: bao nhiêu người gặp lỗi?",
      task: "Bản mới có một lỗi nặng, và 2% số người nhận bản đó sẽ gặp lỗi (số minh hoạ). Với 20.000 người dùng, hãy tính số người gặp lỗi ở mỗi giai đoạn phát hành 5%, 25% và 100%. Mã dưới đang bỏ qua tỷ lệ phát hành, nên giai đoạn nào cũng ra như phát hành hết.",
      starter:
        "nguoi_dung = 20000\nty_le_loi = 0.02\n\nfor ty_le_phat_hanh in [5, 25, 100]:\n    nhan = nguoi_dung\n    gap_loi = nhan * ty_le_loi\n    print(f\"Phát hành {ty_le_phat_hanh}%: {round(gap_loi)} người gặp lỗi\")\n",
      solution:
        "nguoi_dung = 20000\nty_le_loi = 0.02\n\nfor ty_le_phat_hanh in [5, 25, 100]:\n    nhan = nguoi_dung * ty_le_phat_hanh / 100\n    gap_loi = nhan * ty_le_loi\n    print(f\"Phát hành {ty_le_phat_hanh}%: {round(gap_loi)} người gặp lỗi\")\n",
      expectedOutput: "Phát hành 5%: 20 người gặp lỗi\nPhát hành 25%: 100 người gặp lỗi\nPhát hành 100%: 400 người gặp lỗi",
      hints: [
        "Chỉ một phần người dùng nhận bản mới ở mỗi giai đoạn. Phần đó là bao nhiêu phần trăm của nguoi_dung?",
        "nhan = nguoi_dung * ty_le_phat_hanh / 100",
      ],
    },
    {
      type: "feynman",
      title: "Phát hành theo tỷ lệ, hiểu bằng chuyện mở quán",
      intro: "Trước khi đổi thực đơn cả quán, chủ quán cho vài bàn quen thử món mới. Nếu món có vấn đề, chỉ vài bàn biết, và chủ quán vẫn còn thời gian rút lại.",
      columns: ["Thành phần", "Đổi thực đơn quán", "Phát hành ứng dụng"],
      rows: [
        ["Thử trước", "Vài bàn quen dùng món mới", "Một phần nhỏ người dùng nhận bản mới"],
        ["Lỗi hiện ra", "Khách nhăn mặt, chủ quán ghi nhận", "Báo lỗi, đồ thị sự cố tăng ở nhóm nhỏ đó"],
        ["Tăng dần", "Thêm bàn nếu khách hài lòng", "Mở rộng tỷ lệ khi chưa thấy lỗi nặng"],
        ["Người mới", "Khách chưa từng tới mới là người thử công bằng", "Thử trên máy sạch, chưa đăng nhập, chưa có dữ liệu cũ"],
      ],
      oneLiner: "Phát hành theo tỷ lệ là quyền được dừng lại - đổi vài ngày chậm hơn lấy khoảng cách giữa năm phần trăm người gặp lỗi và tất cả người gặp lỗi.",
    },
  ],

  // ── Chặng 18 ────────────────────────────────────────────────────────────
  "du-an-lon-nao-cung-bao-truoc": [
    {
      type: "exercise",
      language: "python",
      title: "Cộng dồn các cam kết trong 8 tuần",
      task: "Bạn có 40 giờ làm việc mỗi tuần, trong đó việc chính cần 28 giờ. Bốn cam kết thêm ghi theo số giờ mỗi tuần (số minh hoạ). Sửa để dòng cuối in tổng số giờ còn thiếu trong CẢ 8 tuần, chứ không chỉ một tuần.",
      starter:
        "cam_ket = {\n    \"Ra mắt tính năng mới\": 6,\n    \"Ôn chứng chỉ\": 5,\n    \"Kèm người mới\": 4,\n    \"Bài nói hội thảo\": 3,\n}\nviec_chinh = 28\nkha_nang = 40\ntuan_con_lai = 8\n\ntong_tuan = viec_chinh + sum(cam_ket.values())\nvuot_tuan = max(0, tong_tuan - kha_nang)\n\nprint(\"Tổng giờ mỗi tuần:\", tong_tuan)\nprint(\"Vượt mỗi tuần:\", vuot_tuan)\nprint(\"Thiếu cả đợt:\", vuot_tuan)\n",
      solution:
        "cam_ket = {\n    \"Ra mắt tính năng mới\": 6,\n    \"Ôn chứng chỉ\": 5,\n    \"Kèm người mới\": 4,\n    \"Bài nói hội thảo\": 3,\n}\nviec_chinh = 28\nkha_nang = 40\ntuan_con_lai = 8\n\ntong_tuan = viec_chinh + sum(cam_ket.values())\nvuot_tuan = max(0, tong_tuan - kha_nang)\n\nprint(\"Tổng giờ mỗi tuần:\", tong_tuan)\nprint(\"Vượt mỗi tuần:\", vuot_tuan)\nprint(\"Thiếu cả đợt:\", vuot_tuan * tuan_con_lai)\n",
      expectedOutput: "Tổng giờ mỗi tuần: 46\nVượt mỗi tuần: 6\nThiếu cả đợt: 48",
      hints: [
        "Một tuần thiếu 6 giờ. Việc này kéo dài bao nhiêu tuần?",
        "Dòng cuối cần nhân với tuan_con_lai.",
      ],
    },
  ],

  "nhan-mot-du-an-phu": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Nhờ AI ước lượng chi phí hai năm của dự án phụ",
      task: "Một người quen nhờ bạn dựng một công cụ nhỏ. Lắp prompt để AI giúp bạn thấy cả phần sau ngày chạy được, không chỉ phần dựng.",
      parts: [
        {
          id: "viec",
          label: "Bối cảnh",
          options: [
            { text: "Chỉ hỏi một câu duy nhất: dựng xong công cụ này sẽ mất khoảng bao lâu?", feedback: "Đây đúng là câu hỏi về phần rẻ nhất của cả vòng đời. AI sẽ trả lời gọn gàng và bạn bỏ sót mọi thứ sau ngày chạy được." },
            { text: "Mô tả công cụ làm gì, ai dùng, và sẽ chạy bao lâu", good: true, feedback: "Có người dùng và thời gian chạy, AI mới ước lượng được các khoản không dừng: người hỏi, thư viện cần nâng, thay đổi ở nơi khác làm hỏng." },
            { text: "Nhờ AI tự đoán công cụ này là gì rồi ước lượng luôn, bạn đỡ phải viết dài dòng", feedback: "AI sẽ bịa một công cụ trông hợp lý, và con số ước lượng thuộc về công cụ đó chứ không phải của bạn." },
          ],
        },
        {
          id: "khoan",
          label: "Khoản cần tính",
          options: [
            { text: "Chỉ cần một tổng số giờ để dựng cho gọn, còn phần bảo trì để tính sau khi xong", feedback: "Bảo trì không có điểm kết thúc và thường lớn hơn nhiều lần phần dựng. Tính sau nghĩa là không bao giờ được tính." },
            { text: "Chỉ tính chi phí bằng tiền như máy chủ và tên miền, giờ làm bỏ qua", feedback: "Giờ của bạn là chi phí lớn nhất của dự án phụ. Bỏ nó đi thì phép tính trông rẻ hơn thực tế." },
            { text: "Tách riêng giờ dựng và giờ bảo trì mỗi tháng sau khi chạy", good: true, feedback: "Hai dòng có bản chất khác nhau: một lần và định kỳ. Tách ra mới thấy phần định kỳ cộng dồn thế nào qua hai năm." },
          ],
        },
        {
          id: "khuon",
          label: "Khuôn dạng",
          options: [
            { text: "Chỉ một con số duy nhất để báo lại cho người nhờ cho nhanh và dễ nhớ", feedback: "Một con số che hết giả định, nên khi sai bạn không biết sai ở đâu và người nhờ cũng không thể thương lượng." },
            { text: "Một bảng theo tháng, ghi rõ từng giả định để bạn kiểm lại", good: true, feedback: "Giả định hiện ra là thứ bạn đối chiếu và chỉnh được. Bảng theo tháng còn cho thấy phần bảo trì tích lại." },
            { text: "Một đoạn văn tự do cho dễ đọc và không bị gò bó", feedback: "Văn xuôi khó kiểm và dễ lẫn giả định với kết luận, nên rất khó biết con số nào là số bạn thật sự dám cam kết." },
          ],
        },
      ],
      responses: [
        {
          requires: ["viec", "khoan", "khuon"],
          text: "Bảng ước lượng hai năm: dựng khoảng 40 giờ, một lần. Bảo trì khoảng 6-10 giờ mỗi tháng sau khi chạy (người dùng hỏi, nâng thư viện, sửa khi nơi khác thay đổi), cộng dồn ít nhất 140-240 giờ. Giả định: khoảng 10 người dùng, không có hỗ trợ khẩn. Lưu ý: tổng bảo trì thường vượt xa phần dựng - hãy thoả thuận ai chịu khoản này trước khi nhận.",
        },
        {
          requires: ["viec", "khoan"],
          text: "Dựng khoảng 40 giờ, bảo trì vài giờ mỗi tháng sau đó. Chưa có bảng theo tháng, nên khó thấy phần bảo trì cộng dồn ra sao và giả định nào đang ở phía sau con số.",
        },
        {
          text: "Dựng công cụ này mất khoảng 40 giờ. Chưa nói gì về phần sau ngày chạy được, nên con số này chỉ trả lời câu hỏi rẻ nhất của cả dự án.",
        },
      ],
    },
    {
      type: "chart",
      title: "Khoản không dừng lại cộng dồn qua hai năm",
      caption: "Số giờ là minh hoạ để thấy hình dạng: phần dựng cố định, phần bảo trì mọc lên theo tháng. Hãy thay bằng ước lượng của chính bạn.",
      kind: "line",
      xLabel: "Tháng sau khi dự án chạy được",
      yLabel: "Giờ cộng dồn (minh hoạ)",
      x: { from: 0, to: 24, step: 2 },
      params: [
        { id: "dung", label: "Giờ dựng ban đầu", min: 10, max: 120, step: 5, value: 40 },
        { id: "bt", label: "Giờ bảo trì mỗi tháng", min: 1, max: 20, step: 1, value: 8 },
      ],
      series: [
        { label: "Phần dựng", expr: "dung" },
        { label: "Dựng cộng bảo trì", expr: "dung + x * bt" },
      ],
    },
  ],

  "duoc-biet-toi-trong-nghe": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Nhờ AI dựng dàn ý bài nói 30 phút",
      task: "Bạn nhận lời nói ở một buổi chia sẻ nghề. Bạn thuộc nội dung, nhưng cần dựng mạch. Lắp prompt để AI giúp bạn dựng đúng thứ cần dựng.",
      parts: [
        {
          id: "nghe",
          label: "Người nghe",
          options: [
            { text: "Nói người nghe là dân kỹ thuật nên ai cũng biết hết nền tảng rồi, không cần tả", feedback: "Quá chung: 'dân kỹ thuật' gồm cả người mới lẫn người nhiều năm. AI sẽ chọn mức độ bừa, và mạch lệch ngay từ đầu." },
            { text: "Không nói gì về người nghe, vì nội dung mới là quan trọng nhất", feedback: "Mạch của bài nói đi từ chỗ người nghe đang đứng, nên thiếu thông tin này AI chỉ có thể dàn các chi tiết bạn thuộc ra một dãy." },
            { text: "Nói rõ họ là ai, đã biết gì, và cần gì sau 30 phút", good: true, feedback: "Có điểm xuất phát và điểm đến, AI mới dựng được một mạch từ chỗ họ đứng tới chỗ bạn muốn họ tới." },
          ],
        },
        {
          id: "mach",
          label: "Việc cần làm",
          options: [
            { text: "Nhờ AI sắp mọi chi tiết bạn thuộc thành một dàn ý dài, có đánh số thứ tự", feedback: "Đó là liệt kê, không phải mạch. Ba mươi phút của một dãy chi tiết khiến người nghe mất dấu sau mười phút." },
            { text: "Đề xuất một mạch ba phần, chỉ ra chi tiết nên bỏ", good: true, feedback: "Bỏ bớt là phần khó nhất của trình bày. Bạn thuộc nhiều nên khó tự bỏ, nên cần một người nhìn từ ngoài." },
            { text: "Nhờ viết trọn bài nói để bạn chỉ cần đọc lên trên sân khấu", feedback: "Bài đọc thuộc không thay được việc hiểu mạch. Người nghe nhận ra ngay, và chuyện bạn vẫn phải dành công chuẩn bị chưa mất đi." },
          ],
        },
        {
          id: "khuon",
          label: "Khuôn dạng",
          options: [
            { text: "Một đoạn văn dài mô tả toàn bộ nội dung bài nói", feedback: "Khó dùng làm bản đồ khi đang đứng trên sân khấu, và khó nhìn ra chỗ nào mạch bị đứt." },
            { text: "Mỗi phần: mục tiêu, thời lượng, một câu chốt", good: true, feedback: "Thời lượng buộc bạn tính ba mươi phút thật; câu chốt buộc mỗi phần phục vụ một ý." },
            { text: "Danh sách gạch đầu dòng ngắn nhất có thể cho khỏi rối", feedback: "Quá ngắn thì mất luôn mạch và thời lượng, trong khi hai thứ này mới là phần cần ước lượng thật." },
          ],
        },
      ],
      responses: [
        {
          requires: ["nghe", "mach", "khuon"],
          text: "Phần 1 (8 phút): từ chỗ người nghe đang đứng - một lỗi họ hay gặp. Câu chốt: lỗi này có nguyên nhân gốc. Phần 2 (15 phút): ba cách tiếp cận, kèm ví dụ thật. Câu chốt: chọn theo tình huống. Phần 3 (7 phút): việc làm được ngay ngày mai. Nên bỏ: phần lịch sử công cụ và hai chi tiết phụ - đúng nhưng không phục vụ mạch.",
        },
        {
          requires: ["nghe", "mach"],
          text: "Dàn ý ba phần đi từ vấn đề người nghe gặp tới cách giải, kèm gợi ý bỏ vài chi tiết phụ. Chưa có thời lượng và câu chốt từng phần, nên chưa biết ba mươi phút có đủ không.",
        },
        {
          text: "Dàn ý 12 mục xếp theo thứ tự bạn thuộc: lịch sử, khái niệm, công cụ, ví dụ, mẹo. Đủ nội dung, nhưng chưa có mạch dẫn người nghe từ chỗ họ đứng tới chỗ bạn muốn họ tới.",
        },
      ],
    },
    {
      type: "flow",
      title: "Từ thuộc lòng tới ba mươi phút trên sân khấu",
      steps: [
        { label: "Liệt kê những gì bạn biết", detail: "Việc này nhanh, vì bạn thuộc lòng. Đây là phần mà người ta nhầm là toàn bộ việc chuẩn bị." },
        { label: "Xác định điểm xuất phát của người nghe", detail: "Họ đã biết gì, đang gặp vấn đề gì. Mạch bài nói bắt đầu từ chỗ họ đứng chứ không phải chỗ bạn đứng." },
        { label: "Chọn điểm đến", detail: "Sau ba mươi phút, người nghe cần nhớ và làm được gì. Điểm đến buộc bạn bỏ những chi tiết không dẫn tới đó." },
        { label: "Dựng mạch và cắt bớt", detail: "Đây là phần tốn thời gian nhất vì cần quyết định bỏ gì. Mỗi chi tiết đúng nhưng không phục vụ mạch đều phải ra khỏi bài." },
        { label: "Nói thử ra tiếng, đo giờ", detail: "Ba mươi phút thật dài hơn ba mươi phút trong đầu. Nói thử cho thấy chỗ mạch đứt và chỗ bạn đã nói quá dài." },
      ],
    },
  ],

  "kem-cap-mot-nguoi-moi": [
    {
      type: "exercise",
      language: "javascript",
      title: "Số giờ thật của việc bị cắt ngang",
      task: "Mỗi ngày người mới hỏi bạn 6 lần, mỗi lần trả lời mất 10 phút và bạn mất thêm 15 phút lấy lại mạch việc đang làm (số minh hoạ). Một tuần làm 5 ngày. Mã dưới chỉ tính phần trả lời. Sửa để tính cả phần lấy lại mạch.",
      starter:
        "const cauHoiMoiNgay = 6;\nconst phutTraLoi = 10;\nconst phutLayLaiMach = 15;\nconst ngay = 5;\nconst gioMotTuan = 40;\n\nconst phutMat = ngay * cauHoiMoiNgay * phutTraLoi;\nconst gioMat = phutMat / 60;\n\nconsole.log(\"Mất mỗi tuần: \" + gioMat + \" giờ\");\nconsole.log(\"Còn lại cho việc chính: \" + (gioMotTuan - gioMat) + \" giờ\");\n",
      solution:
        "const cauHoiMoiNgay = 6;\nconst phutTraLoi = 10;\nconst phutLayLaiMach = 15;\nconst ngay = 5;\nconst gioMotTuan = 40;\n\nconst phutMat = ngay * cauHoiMoiNgay * (phutTraLoi + phutLayLaiMach);\nconst gioMat = phutMat / 60;\n\nconsole.log(\"Mất mỗi tuần: \" + gioMat + \" giờ\");\nconsole.log(\"Còn lại cho việc chính: \" + (gioMotTuan - gioMat) + \" giờ\");\n",
      expectedOutput: "Mất mỗi tuần: 12.5 giờ\nCòn lại cho việc chính: 27.5 giờ",
      hints: [
        "Mỗi lần bị cắt ngang tốn phutTraLoi cộng với phutLayLaiMach.",
        "phutMat = ngay * cauHoiMoiNgay * (phutTraLoi + phutLayLaiMach)",
      ],
    },
    {
      type: "chart",
      title: "Ba tháng đầu nặng, rồi nhẹ dần",
      caption: "Đường cong là minh hoạ: giờ kèm mỗi tuần cao nhất lúc đầu, rồi giảm khi người mới tự đi được. Đặt số của riêng bạn để thấy bạn nên xin điều chỉnh khối lượng chính bao nhiêu trong ba tháng đầu.",
      kind: "line",
      xLabel: "Tuần kể từ khi bắt đầu kèm",
      yLabel: "Giờ mỗi tuần dành cho việc kèm (minh hoạ)",
      x: { from: 1, to: 16, step: 1 },
      params: [
        { id: "dau", label: "Giờ kèm mỗi tuần lúc đầu", min: 6, max: 20, step: 1, value: 14 },
        { id: "giam", label: "Mỗi tuần giảm đi", min: 0, max: 1.5, step: 0.1, value: 0.8 },
        { id: "nen", label: "Mức giữ lại về sau", min: 1, max: 5, step: 0.5, value: 2 },
      ],
      series: [{ label: "Giờ kèm mỗi tuần", expr: "max(nen, dau - giam * (x - 1))" }],
    },
  ],

  "chi-cho-viec-hoc": [
    {
      type: "scenario",
      title: "Chọn hình thức học theo mục tiêu",
      start: "muc-tieu",
      nodes: {
        "muc-tieu": {
          text: "Bạn muốn qua vòng lọc hồ sơ của một vị trí nhiều ứng viên, và tin rằng đang thiếu kỹ năng. Ba thứ nằm trong giỏ: một chứng chỉ có thi, một khoá video dài, và một cuốn sách chuyên sâu về nền tảng. Bạn có thời gian cho đúng một thứ.",
          choices: [
            { label: "Chọn chứng chỉ, vì mục tiêu là qua bộ lọc hồ sơ", next: "chung-chi" },
            { label: "Chọn khoá video dài, vì học nhiều giờ nghe có vẻ chắc chắn", next: "khoa" },
            { label: "Chọn cuốn sách, vì nó giúp hiểu sâu nhất về nền tảng", next: "sach" },
          ],
        },
        khoa: {
          text: "Bạn xem hết khoá video và tốn nhiều tuần, nhưng không có gì chứng minh điều đó trên hồ sơ. Bộ lọc vẫn bỏ qua hồ sơ của bạn, trong khi mục tiêu ban đầu là qua bộ lọc đó.",
          ending: "bad",
        },
        sach: {
          text: "Cuốn sách tốt và bạn hiểu sâu hơn, nhưng đó là mục tiêu thứ ba. Hồ sơ của bạn vẫn không có thứ gì để bộ lọc nhận ra, nên bạn vẫn bị bỏ qua dù đã học nhiều.",
          ending: "bad",
        },
        "chung-chi": {
          text: "Chứng chỉ giúp hồ sơ của bạn qua bộ lọc. Công ty hiện tại nghe tin và đề nghị tài trợ lệ phí, nhưng kèm cam kết ở lại một thời gian và điều khoản hoàn chi phí nếu nghỉ sớm.",
          choices: [
            { label: "Đọc kỹ thời hạn cam kết và điều khoản hoàn chi phí trước khi đồng ý", next: "doc-ky" },
            { label: "Đồng ý ngay vì được tài trợ, điều khoản chỉ là thủ tục", next: "dong-y-ngay" },
          ],
        },
        "doc-ky": {
          text: "Bạn biết mình sẽ phải trả lại bao nhiêu nếu nghỉ trước hạn và đồng ý khi con số đó nằm trong khả năng chấp nhận. Chi phí được tài trợ, mà bạn vẫn giữ được quyền chọn về sau.",
          ending: "good",
        },
        "dong-y-ngay": {
          text: "Sáu tháng sau bạn nhận được lời mời tốt hơn từ nơi khác. Điều khoản hoàn chi phí khiến việc nghỉ trở thành khoản nợ bạn chưa lường tới, vì khoản này không miễn phí chỉ vì công ty đã trả trước.",
          ending: "bad",
        },
      },
    },
    {
      type: "feynman",
      title: "Chọn hình thức học như chọn dụng cụ",
      intro: "Muốn đóng một chiếc đinh thì cần búa, muốn vặn ốc thì cần cờ lê. Mang cờ lê đi đóng đinh vẫn tốn công, dù cờ lê không dở. Học cũng vậy: tiền và giờ bạn bỏ ra giống nhau dù chọn đúng hay sai hình thức.",
      columns: ["Mục tiêu", "Dụng cụ đời thường", "Hình thức học hợp"],
      rows: [
        ["Qua một bộ lọc hồ sơ", "Giấy tờ mà người kiểm tra nhìn là nhận ra", "Chứng chỉ - không gì thay thế được"],
        ["Dùng được một công nghệ", "Tập đi xe bằng cách ngồi lên xe", "Dựng một thứ chạy thật"],
        ["Hiểu sâu một nền tảng", "Đọc bản vẽ để hiểu cả căn nhà", "Thường là một cuốn sách"],
      ],
      oneLiner: "Chọn hình thức theo mục tiêu trước khi cân nhắc giá, vì chọn nhầm hình thức thì bạn vẫn trả đủ cả tiền lẫn giờ.",
    },
  ],
};
