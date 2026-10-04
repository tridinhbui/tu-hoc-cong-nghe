import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 33. Một người viết cho một tệp.
export const P33_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "value-at-risk-var-stress-testing": [
    {
      type: "exercise",
      language: "python",
      title: "Một phụ thuộc chậm làm cạn bao nhiêu kết nối",
      task: "Dịch vụ nhận 20 yêu cầu mỗi giây, mỗi yêu cầu giữ một kết nối suốt thời gian chờ phụ thuộc trả lời. Hồ kết nối có 50 chỗ. Mã khởi đầu in đúng khuôn nhưng bỏ qua độ trễ nên lúc nào cũng báo ổn. Sửa để số kết nối bị giữ bằng số yêu cầu mỗi giây nhân độ trễ (giây), và báo CẠN khi từ 50 trở lên.",
      starter: `rps = 20
pool = 50
for latency in [0.05, 0.5, 5]:
    held = rps
    status = "CẠN" if held >= pool else "ổn"
    print(f"độ trễ {latency}s -> giữ {held:.0f} kết nối, {status}")
`,
      solution: `rps = 20
pool = 50
for latency in [0.05, 0.5, 5]:
    held = rps * latency
    status = "CẠN" if held >= pool else "ổn"
    print(f"độ trễ {latency}s -> giữ {held:.0f} kết nối, {status}")
`,
      expectedOutput:
        "độ trễ 0.05s -> giữ 1 kết nối, ổn\nđộ trễ 0.5s -> giữ 10 kết nối, ổn\nđộ trễ 5s -> giữ 100 kết nối, CẠN",
      hints: [
        "Mỗi yêu cầu giữ kết nối trong đúng khoảng độ trễ, nên số kết nối đang bị giữ cùng lúc là tốc độ đến nhân thời gian giữ.",
        "Chỉ cần đổi một dòng: held không còn bằng rps mà phải phụ thuộc vào latency.",
      ],
    },
    {
      type: "flow",
      title: "Một phép thử chịu tải, từ kịch bản tới lần chạy lại",
      steps: [
        {
          label: "Chọn hình dạng",
          detail:
            "Lấy danh sách sự cố đã xảy ra, thêm vài kịch bản chưa xảy ra. Ví dụ: dịch vụ thanh toán mà bạn gọi chậm lên mười giây nhưng không chết hẳn, vì đây là hình dạng gây sập nhiều nhất và hiếm khi được thử.",
        },
        {
          label: "Đặt thước trước khi thử",
          detail:
            "Viết ra thế nào là chịu được: yêu cầu vẫn trả lời trong ngưỡng nào, tỷ lệ lỗi dưới mức nào. Đặt thước sau khi thấy kết quả thì người ta luôn diễn giải được cho kết quả có vẻ ổn.",
        },
        {
          label: "Ép hệ thống hỏng",
          detail:
            "Tiêm độ trễ vào phụ thuộc hoặc dồn tải trong vài giây. Ghi lại hai điều: thước bị vượt ở điểm nào, và thứ gì cạn đầu tiên (luồng, kết nối, bộ nhớ). Thứ cạn đầu tiên mới là chỗ cần sửa.",
        },
        {
          label: "Hạ tải rồi ngồi xem",
          detail:
            "Đưa tải về mức bình thường và bấm giờ cho tới khi thước đạt lại. Nếu hệ thống chỉ trở lại sau khi có người khởi động nó, đó là phát hiện nghiêm trọng nhất của buổi thử, dù ngưỡng gãy trông ổn.",
        },
        {
          label: "Ghi và hẹn chạy lại",
          detail:
            "Mỗi kịch bản thành một dòng: hỏng ở đâu, trở lại sau bao lâu, ai sửa gì. Rồi đặt lịch chạy lại một kịch bản mỗi tháng, vì hệ thống đổi mỗi tuần và kết quả của lần thử cũ chỉ đúng cho phiên bản cũ.",
        },
      ],
    },
  ],

  "han-muc-va-nguong-xet-duyet": [
    {
      type: "scenario",
      title: "Đặt trần cho thao tác xoá hàng loạt",
      start: "dat",
      nodes: {
        dat: {
          text: "Công cụ quản trị của đội cho phép xoá hàng loạt bản ghi. Sau một lần xoá nhầm mười nghìn bản ghi, bạn được giao đặt trần cho mỗi lượt xoá. Bạn lấy con số từ đâu?",
          choices: [
            { label: "Lấy số bản ghi lớn nhất đội từng xoá trong một lượt", next: "thoiquen" },
            { label: "Lấy mức thiệt hại chịu được rồi quy ra số bản ghi", next: "thiethai" },
            { label: "Lấy con số thấp nhất để chắc chắn không ai xoá nhầm", next: "thap" },
          ],
        },
        thoiquen: {
          text: "Trần đặt đúng bằng lần xoá lớn nhất từng có, nên một lần xoá nhầm cỡ đó vẫn lọt qua nguyên vẹn. Con số này trả lời câu hỏi về tiện lợi chứ không giới hạn thiệt hại nào, và lần xoá nhầm kế tiếp lại mất mười nghìn bản ghi.",
          ending: "bad",
        },
        thap: {
          text: "Trần thấp đến mức việc dọn dữ liệu cuối tháng bị chặn cứng, không có đường vượt. Tuần sau có việc gấp, người ta chia nhỏ thành hàng trăm lượt dưới trần và mượn tài khoản của đồng nghiệp. Trần bị vòng qua mà không để lại dấu vết nào.",
          ending: "bad",
        },
        thiethai: {
          text: "Đội tính được: mất quá năm nghìn bản ghi thì khôi phục từ bản sao lưu tốn cả buổi. Trần đặt ở năm nghìn, cao hơn nhu cầu thường ngày nên hiếm ai chạm. Hôm sau có việc dọn dữ liệu hợp lệ cần xoá mười hai nghìn bản ghi. Bạn xử lý đường vượt trần thế nào?",
          choices: [
            { label: "Cho vượt khi có người thứ hai duyệt, ghi lý do", next: "tot" },
            { label: "Chặn cứng, ai cần xoá nhiều phải xin đổi cấu hình", next: "chan" },
            { label: "Cho vượt nếu người xoá gõ lại số lượng để xác nhận", next: "tuxacnhan" },
          ],
        },
        chan: {
          text: "Việc dọn dữ liệu hợp lệ bị chặn đúng lúc có việc gấp. Một kỹ sư chia nhỏ thành nhiều lượt dưới trần rồi chạy bằng tài khoản dịch vụ. Trần vẫn còn trên giấy nhưng không còn giới hạn gì, và không dòng nhật ký nào nói vì sao.",
          ending: "bad",
        },
        tuxacnhan: {
          text: "Gõ lại số lượng chỉ tốn vài giây và ai cũng gõ theo phản xạ. Một lần xoá nhầm nữa vẫn chạy vì chính người nhầm cũng xác nhận con số mình nhầm. Không ai thứ hai nhìn vào, nên trần chỉ thêm một bước chứ không thêm một cặp mắt.",
          ending: "bad",
        },
        tot: {
          text: "Việc dọn dữ liệu chạy sau khi người thứ hai duyệt, mất vài phút, và nhật ký ghi ai dùng, lúc nào, vì sao. Cuối tuần đội xem lại những lần vượt trần và thấy hai lần lẽ ra tránh được. Trần giới hạn hậu quả mà không đẩy ai vào đường vòng.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Hạn mức giống mức rút tiền tối đa của thẻ",
      intro:
        "Thẻ ngân hàng thường có mức rút tối đa mỗi ngày. Mức ấy không dựa trên số bạn hay rút, mà trên thiệt hại bạn chịu được nếu thẻ rơi vào tay người lạ. Cần rút nhiều hơn thì có đường riêng, có người kiểm tra.",
      columns: ["Nguyên tắc", "Chuyện thẻ rút tiền", "Trong hệ thống của bạn"],
      rows: [
        [
          "Trần suy từ thiệt hại chịu được",
          "Mức rút tính theo số tiền mất mà bạn còn chịu nổi, không theo thói quen rút",
          "Trần xoá hàng loạt tính theo khối lượng khôi phục được trong một buổi",
        ],
        [
          "Có đường vượt nhanh",
          "Việc lớn thì lên quầy và được xác minh ngay trong ngày",
          "Thao tác vượt trần cần người thứ hai duyệt, mất vài phút chứ không phải vài ngày",
        ],
        [
          "Rà soát sau",
          "Giao dịch lớn để lại bản ghi để tra lại",
          "Ghi ai dùng đường vượt, lúc nào, vì lý do gì và xem lại hằng tuần",
        ],
      ],
      oneLiner: "Trần đặt theo thiệt hại chịu được, còn đường vượt thì nhanh và có dấu vết.",
    },
  ],

  "he-thong-thoi-gian-thuc-do-tre-co-han-cung": [
    {
      type: "exercise",
      language: "javascript",
      title: "Trung bình đẹp, nhưng lượt tệ nhất thì sao",
      task: "Hai bộ điều khiển phải trả lời trong 10 mili giây. Mã khởi đầu chấm theo trung bình nên hệ A (thỉnh thoảng giật tới 50 ms) vẫn lọt qua. Sửa để chấm theo giá trị TỆ NHẤT: chỉ ĐẠT khi lượt chậm nhất không vượt hạn.",
      starter: `const hanCung = 10;
const he = {
  A: [1, 1, 1, 1, 50, 1, 1, 1],
  B: [5, 5, 5, 5, 5, 5, 5, 5],
};
for (const ten of Object.keys(he)) {
  const xs = he[ten];
  const tb = xs.reduce((a, b) => a + b, 0) / xs.length;
  const tn = Math.max(...xs);
  const dat = tb <= hanCung;
  console.log("Hệ " + ten + ": trung bình " + tb + " ms, tệ nhất " + tn + " ms, " + (dat ? "ĐẠT" : "TRƯỢT"));
}
`,
      solution: `const hanCung = 10;
const he = {
  A: [1, 1, 1, 1, 50, 1, 1, 1],
  B: [5, 5, 5, 5, 5, 5, 5, 5],
};
for (const ten of Object.keys(he)) {
  const xs = he[ten];
  const tb = xs.reduce((a, b) => a + b, 0) / xs.length;
  const tn = Math.max(...xs);
  const dat = tn <= hanCung;
  console.log("Hệ " + ten + ": trung bình " + tb + " ms, tệ nhất " + tn + " ms, " + (dat ? "ĐẠT" : "TRƯỢT"));
}
`,
      expectedOutput:
        "Hệ A: trung bình 7.125 ms, tệ nhất 50 ms, TRƯỢT\nHệ B: trung bình 5 ms, tệ nhất 5 ms, ĐẠT",
      hints: [
        "Với hạn cứng, một lượt cá biệt là dữ liệu quan trọng nhất. Biến nào trong mã đang giữ lượt chậm nhất?",
        "Chỉ đổi biến được so sánh với hanCung.",
      ],
    },
    {
      type: "chart",
      title: "Trung bình che mất lượt giật",
      caption:
        "Số liệu minh hoạ, không phải đo từ hệ thống thật. Hệ A thỉnh thoảng giật tới mức bạn chọn bằng thanh trượt; hệ B luôn 5 ms. Kéo cột mốc giật lên và để ý: đường trung bình của A chìm xuống dưới hạn cứng, nhưng đường tệ nhất thì không đổi.",
      kind: "line",
      xLabel: "Cứ bao nhiêu lượt thì có một lượt giật",
      yLabel: "Độ trễ (ms)",
      x: { from: 10, to: 200, step: 10 },
      params: [
        { id: "spike", label: "Độ trễ của lượt giật", min: 10, max: 100, step: 5, value: 50, unit: "ms" },
        { id: "han", label: "Hạn cứng", min: 5, max: 30, step: 5, value: 10, unit: "ms" },
      ],
      series: [
        { label: "Hệ A: trung bình", expr: "1 + (spike - 1) / x" },
        { label: "Hệ A: tệ nhất", expr: "spike" },
        { label: "Hệ B: luôn như nhau", expr: "5" },
        { label: "Hạn cứng", expr: "han" },
      ],
    },
  ],

  "he-thong-nhung-toi-uu-khi-tai-nguyen-co-dinh": [
    {
      type: "exercise",
      language: "python",
      title: "Vòng lặp bận ăn pin thế nào",
      task: "Thiết bị đo chạy pin 2000 mAh. Khi hoạt động nó hút 20 mA, khi ngủ hút 0,1 mA (số minh hoạ). Mã khởi đầu coi cả hai cách đều hoạt động 100% thời gian. Sửa để cách ngủ giữa các lần đo chỉ hoạt động 1% thời gian. Số giờ bằng dung lượng chia cho dòng trung bình, làm tròn.",
      starter: `pin = 2000
hoat_dong = 20
ngu = 0.1

def so_gio(ty_le_hoat_dong):
    trung_binh = ty_le_hoat_dong * hoat_dong + (1 - ty_le_hoat_dong) * ngu
    return round(pin / trung_binh)

print(f"Vòng lặp bận: {so_gio(1)} giờ")
print(f"Ngủ giữa các lần đo: {so_gio(1)} giờ")
`,
      solution: `pin = 2000
hoat_dong = 20
ngu = 0.1

def so_gio(ty_le_hoat_dong):
    trung_binh = ty_le_hoat_dong * hoat_dong + (1 - ty_le_hoat_dong) * ngu
    return round(pin / trung_binh)

print(f"Vòng lặp bận: {so_gio(1)} giờ")
print(f"Ngủ giữa các lần đo: {so_gio(0.01)} giờ")
`,
      expectedOutput: "Vòng lặp bận: 100 giờ\nNgủ giữa các lần đo: 6689 giờ",
      hints: [
        "Hàm đã tính đúng dòng trung bình; vấn đề là cả hai dòng in đều truyền cùng một tỷ lệ hoạt động.",
        "Hoạt động 1% thời gian nghĩa là truyền 0.01.",
      ],
    },
    {
      type: "flow",
      title: "Cập nhật phần mềm trên thiết bị đã bán đi",
      steps: [
        {
          label: "Ghi bản mới vào vùng phụ",
          detail:
            "Thiết bị không ghi đè bản đang chạy. Bản mới được ghi vào một vùng nhớ riêng trong khi bản cũ vẫn phục vụ người dùng, nên mất điện giữa chừng chỉ làm hỏng vùng phụ.",
        },
        {
          label: "Kiểm tra trước khi tin",
          detail:
            "Phần khởi động, vùng không bao giờ bị ghi đè, kiểm tra mã kiểm tra hoặc chữ ký của bản mới. Một bản ghi dở dang vì mất điện không qua được bước này.",
        },
        {
          label: "Thử khởi động đúng một lần",
          detail:
            "Phần khởi động chuyển sang bản mới ở lần khởi động kế tiếp và đặt đồng hồ đếm ngược. Nếu bản mới không báo mình chạy ổn kịp lúc thì coi như bản hỏng.",
        },
        {
          label: "Tự quay về bản cũ nếu hỏng",
          detail:
            "Vì phần khởi động còn nguyên, thiết bị tự trở lại bản cũ và vẫn nhận được bản sửa. Không ai phải đến tận nơi cắm cáp, điều mà một thiết bị đã bán đi khắp nơi không làm nổi.",
        },
        {
          label: "Chốt bản mới",
          detail:
            "Chỉ sau khi bản mới chạy ổn trong khoảng thời gian đã định mới đánh dấu nó là bản chính thức. Lúc đó vùng cũ mới được phép bị ghi đè ở lần cập nhật sau.",
        },
      ],
    },
  ],

  "doc-mot-bao-cao-nghien-cuu-ky-thuat": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Tìm chỗ lập luận yếu trong phần kết luận",
      task: "Dưới đây là phần kết luận của một báo cáo nội bộ đề xuất chuyển cơ sở dữ liệu sang một sản phẩm mới (số liệu trong báo cáo là minh hoạ). Bấm vào những đoạn có lập luận yếu rồi nộp.",
      segments: [
        { text: "Báo cáo đo thời gian truy vấn trên máy thử nghiệm của nhóm tác giả, với 200 nghìn dòng dữ liệu." },
        {
          text: "Sau khi chuyển sang sản phẩm mới, thời gian phản hồi của trang đặt hàng giảm 30%, do đó sản phẩm mới làm hệ thống nhanh hơn.",
          error:
            "Bước chuyển từ tương quan sang nhân quả nằm ở từ nối 'do đó'. Báo cáo không nói gì về những thay đổi khác diễn ra cùng lúc, nên chưa loại trừ được rằng mức giảm đến từ chỗ khác.",
        },
        { text: "Nhóm cân nhắc ba phương án và ghi rõ nguồn của từng số liệu ở phụ lục." },
        {
          text: "Với dữ liệu thật của chúng ta, lớn gấp hàng nghìn lần mẫu thử, kết quả này chắc chắn giữ nguyên.",
          error:
            "Một phép đo đúng trong điều kiện này chưa nói gì về điều kiện khác. Phạm vi áp dụng không được chứng minh; muốn khẳng định phải đo lại ở quy mô gần với thật.",
        },
        { text: "Mỗi phép đo được lặp ba lần, mỗi lần cách nhau một ngày." },
        {
          text: "Kết luận: sản phẩm mới đã được chứng minh phù hợp, không cần thử nghiệm thêm.",
          error:
            "Báo cáo không nêu kết quả nào sẽ khiến nhóm đổi ý. Thiếu điều kiện bác bỏ thì không có gì để kiểm lại, và 'đã chứng minh' chỉ là cách nói của người đã chọn kết luận trước.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Đọc báo cáo như đọc quảng cáo thuốc bổ",
      intro:
        "Một quảng cáo nói 'dùng sản phẩm này, chín trên mười người khoẻ lên'. Nghe thuyết phục, nhưng bạn nên hỏi: họ khoẻ lên vì thuốc hay vì đằng nào cũng khoẻ, và họ được thử trên ai.",
      columns: ["Chỗ yếu", "Chuyện đời thường", "Câu hỏi gửi tác giả"],
      rows: [
        [
          "Từ tương quan sang nhân quả",
          "Uống thuốc xong thì khỏi, nhưng bệnh vốn tự khỏi sau vài ngày",
          "Còn thay đổi nào xảy ra cùng lúc, và nếu không đổi gì thì kết quả ra sao?",
        ],
        [
          "Phạm vi áp dụng",
          "Thuốc thử trên người trẻ khoẻ mạnh nhưng quảng cáo cho cả người già",
          "Điều kiện đo giống hệ thống của chúng ta ở điểm nào, khác ở điểm nào?",
        ],
        [
          "Thiếu điều kiện bác bỏ",
          "Hiệu quả với hầu hết mọi người; ai không khỏi thì là chưa dùng đủ lâu",
          "Kết quả nào sẽ khiến bạn kết luận sản phẩm không hiệu quả?",
        ],
      ],
      oneLiner: "Đọc báo cáo kỹ thuật là tìm xem cái gì lẽ ra phải có mà không thấy.",
    },
  ],

  "nam-cau-hoi-truoc-khi-cap-quyen": [
    {
      type: "scenario",
      title: "Một đồng nghiệp xin quyền quản trị cơ sở dữ liệu",
      start: "xin",
      nodes: {
        xin: {
          text: "Linh trong nhóm phân tích xin quyền quản trị trên cơ sở dữ liệu sản xuất để xuất doanh số tuần cho báo cáo. Bạn đang bận, và các lần trước bạn đều đồng ý. Bạn làm gì trước tiên?",
          choices: [
            { label: "Hỏi Linh cần quyền này cho đúng việc nào", next: "viec" },
            { label: "Cấp ngay, hẹn Linh báo lại khi xong để thu hồi", next: "capngay" },
            { label: "Từ chối vì quyền quản trị không nên cấp cho ai", next: "tuchoi" },
          ],
        },
        capngay: {
          text: "Linh xuất xong, nhưng không ai nhớ thu hồi vì lời hẹn miệng không có ngày. Ba tháng sau mật khẩu của Linh bị lộ và kẻ lạ có quyền xoá cả bảng sản xuất. Quyền cấp tạm mà không có hạn thì thành vĩnh viễn.",
          ending: "bad",
        },
        tuchoi: {
          text: "Linh không xuất được số liệu nên chép tay từ ảnh chụp màn hình, mất hai ngày và sai vài dòng. Rồi Linh nhờ một người có quyền chạy giúp bằng tài khoản dùng chung. Từ chối cứng không hỏi gì chỉ đẩy việc sang đường vòng khó kiểm soát hơn.",
          ending: "bad",
        },
        viec: {
          text: "Linh nói chỉ cần đọc ba bảng doanh số để xuất ra tệp. Bạn thấy quyền quản trị rộng hơn nhiều so với việc cần làm. Bạn đề xuất gì?",
          choices: [
            { label: "Cấp quyền chỉ đọc ba bảng đó, hết hạn sau bảy ngày", next: "hep" },
            { label: "Cấp quyền chỉ đọc cả cơ sở dữ liệu, không đặt hạn", next: "rong" },
            { label: "Cấp quyền quản trị nhưng bật nhật ký mọi thao tác", next: "nhatky" },
          ],
        },
        rong: {
          text: "Quyền chỉ đọc nghe an toàn, nhưng cả cơ sở dữ liệu có bảng thông tin khách hàng. Nửa năm sau một bản xuất của Linh chứa dữ liệu khách nằm trong thư mục chia sẻ chung. Quyền hẹp hơn quản trị nhưng vẫn rộng hơn việc cần làm, lại không hạn nên không ai rà lại.",
          ending: "bad",
        },
        nhatky: {
          text: "Nhật ký ghi lại thao tác, nhưng chỉ sau khi chúng đã xảy ra. Khi một lệnh xoá nhầm chạy, nhật ký chỉ giúp biết ai nhầm chứ không cứu được dữ liệu. Ghi nhận là phát hiện sau, còn quyền hẹp mới là chặn trước.",
          ending: "bad",
        },
        hep: {
          text: "Linh xuất được số liệu mà không chạm được bảng nào khác. Còn hai câu cuối: ai rà soát quyền này, và nếu tài khoản Linh bị chiếm thì sao. Bạn chốt thế nào?",
          choices: [
            { label: "Đặt nhắc thu hồi cho người cấp và bật xác thực hai lớp", next: "tot" },
            { label: "Ghi vào phiếu rằng quyền đã được duyệt rồi đóng phiếu", next: "phieu" },
            { label: "Nhờ Linh tự nhớ báo lại khi xong để mình thu hồi", next: "linhtu" },
          ],
        },
        phieu: {
          text: "Phiếu đã đóng, quyền hết hạn đúng hạn. Nhưng không ai được giao rà lại, nên lần sau Linh xin gia hạn, người duyệt gật đầu theo thói quen vì chưa từng thấy ai kiểm. Câu hỏi ai rà soát để trống thì quyền cũ cứ tái sinh mãi.",
          ending: "bad",
        },
        linhtu: {
          text: "Linh quên, chuyện thường tình, vì việc đã xong và quyền không làm phiền ai. Người cấp cũng không có lịch nào nhắc. Quyền tưởng ngắn hạn nằm lại cho tới khi tài khoản bị chiếm, và thiệt hại không ai tính trước.",
          ending: "bad",
        },
        tot: {
          text: "Quyền hẹp, có hạn, có người rà và có lớp bảo vệ nếu tài khoản bị chiếm. Linh xuất xong báo cáo ngay chiều hôm đó. Năm câu hỏi mất khoảng năm phút nhưng biến một cái gật đầu thành một quyết định có nhiều lựa chọn.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Năm câu hỏi áp vào một yêu cầu cụ thể",
      steps: [
        {
          label: "Việc cụ thể nào",
          detail:
            "Yêu cầu: 'cho tôi quyền đọc toàn bộ bảng khách hàng'. Hỏi lại: bạn đang làm báo cáo nào? Câu trả lời thật thường là 'đếm khách theo tỉnh', một việc nhỏ hơn rất nhiều so với tên của quyền được xin.",
        },
        {
          label: "Có quyền hẹp hơn không",
          detail:
            "Để đếm khách theo tỉnh, một khung nhìn chỉ có cột tỉnh và mã khách là đủ. Quyền đọc cả bảng, gồm cả số điện thoại, là quyền thừa so với việc.",
        },
        {
          label: "Trong bao lâu",
          detail:
            "Báo cáo làm xong trong một tuần thì quyền hết hạn sau một tuần. Muốn gia hạn thì xin lại, và lần xin lại là dịp hỏi 'vẫn còn cần không'.",
        },
        {
          label: "Ai rà soát, lúc nào",
          detail:
            "Ghi một tên người và một ngày cụ thể, không ghi 'bộ phận bảo mật'. Quyền không có người rà soát gần như không bao giờ bị thu hồi.",
        },
        {
          label: "Nếu bị chiếm thì sao",
          detail:
            "Giả sử tài khoản lộ ngay hôm nay: kẻ xấu đọc được gì? Nếu câu trả lời đáng sợ, kết quả không phải là từ chối mà là thêm lớp: xác thực hai lớp, hạn mức xuất dữ liệu, cảnh báo khi dùng.",
        },
      ],
    },
  ],

  "cong-cu-giam-thiet-hai-khi-phu-thuoc-ngoai-hong": [
    {
      type: "exercise",
      language: "javascript",
      title: "Ngắt mạch sau ba lần lỗi liên tiếp",
      task: "Bảy lượt gọi tới một dịch vụ ngoài, kết quả viết sẵn. Hoàn thành phần ngắt mạch: khi đủ 3 lỗi liên tiếp thì mở mạch, bỏ qua 2 lượt kế tiếp (in 'bỏ qua, dùng đường lui', không gọi) và đặt lại đếm lỗi. Mã khởi đầu đếm lỗi nhưng không bao giờ mở mạch.",
      starter: `const ketQua = [true, false, false, false, true, true, true];
let loiLienTiep = 0;
let boQua = 0;

ketQua.forEach((ok, i) => {
  const luot = i + 1;
  if (boQua > 0) {
    boQua--;
    console.log("lượt " + luot + ": bỏ qua, dùng đường lui");
    return;
  }
  if (ok) {
    loiLienTiep = 0;
    console.log("lượt " + luot + ": gọi thành công");
  } else {
    loiLienTiep++;
    console.log("lượt " + luot + ": gọi lỗi");
    // Việc của bạn: khi đủ 3 lỗi liên tiếp thì mở mạch
  }
});
`,
      solution: `const ketQua = [true, false, false, false, true, true, true];
let loiLienTiep = 0;
let boQua = 0;

ketQua.forEach((ok, i) => {
  const luot = i + 1;
  if (boQua > 0) {
    boQua--;
    console.log("lượt " + luot + ": bỏ qua, dùng đường lui");
    return;
  }
  if (ok) {
    loiLienTiep = 0;
    console.log("lượt " + luot + ": gọi thành công");
  } else {
    loiLienTiep++;
    console.log("lượt " + luot + ": gọi lỗi");
    if (loiLienTiep >= 3) {
      boQua = 2;
      loiLienTiep = 0;
    }
  }
});
`,
      expectedOutput:
        "lượt 1: gọi thành công\nlượt 2: gọi lỗi\nlượt 3: gọi lỗi\nlượt 4: gọi lỗi\nlượt 5: bỏ qua, dùng đường lui\nlượt 6: bỏ qua, dùng đường lui\nlượt 7: gọi thành công",
      hints: [
        "Phần xử lý lượt bỏ qua đã có sẵn, nó chỉ chạy khi boQua lớn hơn 0.",
        "Trong nhánh lỗi, sau khi tăng loiLienTiep, kiểm tra ngưỡng rồi đặt boQua = 2 và đưa đếm lỗi về 0.",
      ],
    },
    {
      type: "chart",
      title: "Luồng bị giữ khi phụ thuộc chậm đi",
      caption:
        "Mô hình đơn giản hoá với số minh hoạ: mỗi yêu cầu giữ một luồng suốt thời gian chờ và lưu lượng không đổi. Với mức mặc định, không có thời gian chờ tối đa thì phụ thuộc chậm quá 5 giây là vượt số luồng sẵn có; đặt thời gian chờ 3 giây thì đường giữ luồng phẳng lại ở mức thấp hơn nhiều.",
      kind: "line",
      xLabel: "Độ trễ của phụ thuộc (giây)",
      yLabel: "Luồng bị giữ",
      x: { from: 0, to: 10, step: 1 },
      params: [
        { id: "rps", label: "Yêu cầu mỗi giây", min: 10, max: 100, step: 10, value: 40, unit: "yêu cầu/giây" },
        { id: "han", label: "Thời gian chờ tối đa", min: 1, max: 10, step: 1, value: 3, unit: "giây" },
        { id: "pool", label: "Số luồng sẵn có", min: 50, max: 400, step: 50, value: 200, unit: "luồng" },
      ],
      series: [
        { label: "Không có thời gian chờ tối đa", expr: "rps * x" },
        { label: "Có thời gian chờ tối đa", expr: "rps * min(x, han)" },
        { label: "Số luồng sẵn có", expr: "pool" },
      ],
    },
  ],

  "chi-so-phi-chuc-nang-la-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Trung bình nói ổn, phân vị 95 nói khác",
      task: "Hai mươi lượt đo độ trễ (ms). Yêu cầu: phân vị 95 phải dưới 800 ms. Mã khởi đầu lấy luôn trung bình làm phân vị 95. Sửa: sắp xếp danh sách rồi lấy phần tử ở hạng 95% × n làm tròn lên (đếm từ 1).",
      starter: `do_tre = [300] * 18 + [2000, 2000]
n = len(do_tre)
trung_binh = sum(do_tre) / n
p95 = trung_binh
print(f"Trung bình: {trung_binh:.0f} ms")
print(f"p95: {p95:.0f} ms")
print("Đạt" if p95 < 800 else "Trượt")
`,
      solution: `do_tre = [300] * 18 + [2000, 2000]
n = len(do_tre)
trung_binh = sum(do_tre) / n
xs = sorted(do_tre)
hang = (95 * n + 99) // 100
p95 = xs[hang - 1]
print(f"Trung bình: {trung_binh:.0f} ms")
print(f"p95: {p95:.0f} ms")
print("Đạt" if p95 < 800 else "Trượt")
`,
      expectedOutput: "Trung bình: 470 ms\np95: 2000 ms\nTrượt",
      hints: [
        "Với 20 lượt đo, hạng 95% là hạng 19 (đếm từ 1), tức chỉ số 18 trong danh sách đã sắp xếp.",
        "Hai lượt chậm nhất nằm ở cuối danh sách đã sắp xếp.",
      ],
    },
    {
      type: "feynman",
      title: "Ba nhóm chỉ số, kể bằng một quán ăn",
      intro:
        "Món quán làm ra đúng với thực đơn là yêu cầu chức năng. Nhưng khách có quay lại hay không còn tuỳ món ra nhanh không, bếp có sạch không, giờ cao điểm có xoay xở nổi không.",
      columns: ["Nhóm", "Ở quán ăn", "Thành phiếu việc có ngưỡng (ví dụ minh hoạ)"],
      rows: [
        [
          "Hiệu quả tài nguyên",
          "Mỗi suất tốn bao nhiêu nguyên liệu và gas",
          "Chi phí hạ tầng mỗi nghìn yêu cầu không vượt mức đã chọn, giao cho một người theo dõi",
        ],
        [
          "Trải nghiệm",
          "Chuyện của mười phần trăm khách đợi lâu nhất, không phải thời gian đợi trung bình",
          "Phân vị 95 của độ trễ dưới ngưỡng đã chọn, đo từ trình duyệt người dùng",
        ],
        [
          "Vận hành",
          "Bếp có công thức viết ra và người thay ca làm được ngay",
          "Khôi phục sau sự cố trong thời gian đã định, và đã có lần chạy thử khôi phục",
        ],
      ],
      oneLiner: "Yêu cầu phi chức năng chỉ có người làm khi nó là một con số có ngưỡng và một cái tên.",
    },
  ],

  "danh-gia-ba-tru-cot-cua-mot-dich-vu": [
    {
      type: "exercise",
      language: "python",
      title: "Chi phí tăng hay giảm, tuỳ vào mẫu số",
      task: "Tổng chi phí hạ tầng ba tháng của một dịch vụ (nghìn đồng) và số yêu cầu (nghìn) viết sẵn. Mã khởi đầu in tổng chi phí nên thấy tháng nào cũng đắt hơn và kết luận xấu đi. Sửa để in chi phí trên mỗi nghìn yêu cầu, rồi kết luận theo con số đó.",
      starter: `chi_phi = [1200, 1500, 1800]
yeu_cau = [400, 600, 900]
ket = []
for t in range(3):
    gia_tri = chi_phi[t]
    ket.append(gia_tri)
    print(f"Tháng {t + 1}: {gia_tri:.1f} nghìn đồng mỗi nghìn yêu cầu")
print("Xu hướng:", "xấu đi" if ket[-1] > ket[0] else "tốt lên")
`,
      solution: `chi_phi = [1200, 1500, 1800]
yeu_cau = [400, 600, 900]
ket = []
for t in range(3):
    gia_tri = chi_phi[t] / yeu_cau[t]
    ket.append(gia_tri)
    print(f"Tháng {t + 1}: {gia_tri:.1f} nghìn đồng mỗi nghìn yêu cầu")
print("Xu hướng:", "xấu đi" if ket[-1] > ket[0] else "tốt lên")
`,
      expectedOutput:
        "Tháng 1: 3.0 nghìn đồng mỗi nghìn yêu cầu\nTháng 2: 2.5 nghìn đồng mỗi nghìn yêu cầu\nTháng 3: 2.0 nghìn đồng mỗi nghìn yêu cầu\nXu hướng: tốt lên",
      hints: [
        "Đơn vị việc ở đây là mỗi nghìn yêu cầu, nên giá trị mỗi tháng là chi phí chia cho số yêu cầu của chính tháng đó.",
      ],
    },
    {
      type: "flow",
      title: "Đánh giá một dịch vụ gửi email hoá đơn",
      steps: [
        {
          label: "Chọn đơn vị việc",
          detail:
            "Dịch vụ gửi email hoá đơn: đơn vị là 'mỗi nghìn email gửi đi', không phải 'mỗi tháng'. Chia chi phí, điện và lỗi cho đơn vị này thì một tháng đông khách không tự động bị coi là tháng tệ.",
        },
        {
          label: "Đo ở nơi người dùng đứng",
          detail:
            "Tính thời gian từ lúc khách bấm gửi tới lúc email vào hộp thư, không chỉ thời gian máy chủ xử lý. Email bị trả lại vì địa chỉ sai hay mạng đứt cũng phải vào tỷ lệ lỗi. Con số sẽ xấu đi, và đó là dấu hiệu nó đúng hơn.",
        },
        {
          label: "Ghi ngay, dù phép đo còn lệch",
          detail:
            "Một dòng mỗi tuần vào bảng tính cũng được. Tháng sau bạn có một đường để nhìn, thay vì phải bắt đầu lại từ số không vì chờ một phép đo hoàn hảo.",
        },
        {
          label: "So với chính nó",
          detail:
            "Tháng này so với sáu tháng trước của chính dịch vụ này, không so với dịch vụ xử lý ảnh chạy ở đội bên. Hai dịch vụ làm hai loại việc khác nhau nên con số chi phí mỗi yêu cầu không so được.",
        },
        {
          label: "Đổi mẫu số thì tính lại lịch sử",
          detail:
            "Nếu về sau thấy nên chia theo 'mỗi hoá đơn' thay vì 'mỗi email', tính lại các tháng cũ theo cách mới. Nối hai đoạn của hai thước đo khác nhau sẽ cho ra một xu hướng không có thật.",
        },
      ],
    },
  ],

  "tu-sang-loc-toi-uu-tien-sua-dich-vu": [
    {
      type: "scenario",
      title: "Mười hai dịch vụ, sức người chỉ đủ cho ba",
      start: "dau",
      nodes: {
        dau: {
          text: "Danh mục có mười hai dịch vụ đã chấm điểm ba trụ cột, nhưng đội chỉ sửa được ba cái trong quý. Cấp trên hỏi cách chọn. Bạn đề xuất gì trước?",
          choices: [
            { label: "Tìm dịch vụ không còn ai gọi tới và tắt hẳn", next: "loaibo" },
            { label: "Sửa mọi dịch vụ dưới ngưỡng điểm 60 theo thứ tự", next: "nguong" },
            { label: "Sửa dịch vụ yếu nhất của từng nhóm cho cân đối", next: "nhom" },
          ],
        },
        nguong: {
          text: "Có chín dịch vụ dưới ngưỡng, danh sách dài hơn nhiều so với sức đội. Đội lấy ba cái điểm thấp nhất, và đó lại là các công cụ nội bộ ít người dùng. Dịch vụ nằm trên đường thanh toán, điểm cao hơn một chút, vẫn nguyên vẹn. Ngưỡng coi mọi dịch vụ như nhau.",
          ending: "bad",
        },
        nhom: {
          text: "Bốn nhóm nên bốn dịch vụ được sửa, vượt sức đội, và hai nhóm trong số đó vốn đang ổn. Công sức đi vào việc nâng một nhóm khoẻ để bảng nhìn cân đối, trong khi nhóm có dịch vụ rủi ro nhất vẫn chờ sang quý sau.",
          ending: "bad",
        },
        loaibo: {
          text: "Đội tìm ra hai dịch vụ chỉ còn được gọi bởi nhau. Tắt cả hai mất hai ngày, điểm trung bình tăng và danh sách ngắn đi. Còn mười dịch vụ, vẫn quá sức người. Bạn xếp thứ tự ba dịch vụ cần sửa thế nào?",
          choices: [
            { label: "Sắp theo điểm nhân mức độ quan trọng, lấy ba đầu", next: "tot" },
            { label: "Sắp theo điểm thấp nhất trước, lấy ba đầu bảng", next: "trieuchung" },
            { label: "Để mỗi đội tự chọn dịch vụ mình muốn sửa trước", next: "tuchon" },
          ],
        },
        trieuchung: {
          text: "Ba dịch vụ điểm thấp nhất đều ít người dùng. Ba tháng sau sự cố đến từ dịch vụ nằm trên đường thanh toán, điểm cao hơn một chút và chưa bao giờ lọt vào ba đầu bảng. Danh sách theo triệu chứng luôn sửa những thứ ít người dùng nhất trước.",
          ending: "bad",
        },
        tuchon: {
          text: "Mỗi đội chọn thứ họ quen và thấy dễ, hai đội cùng chọn một dịch vụ còn dịch vụ không ai nhận nằm lại. Không có tiêu chí chung nên cuối quý không ai chứng minh được ba lần sửa đó giảm rủi ro nào.",
          ending: "bad",
        },
        tot: {
          text: "Ba dịch vụ trên đường thanh toán và đăng nhập được sửa trước. Hai dịch vụ đã tắt còn giảm việc về sau, và đội thêm một quy ước: thay đổi mới không được làm ba trụ cột xấu đi. Thứ tự sửa khớp với thứ tự các sự cố sẽ tới.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Cùng bốn dịch vụ, hai thứ tự sửa khác nhau",
      caption:
        "Số liệu minh hoạ: thiếu hụt bằng 100 trừ điểm, mức quan trọng chấm từ 1 đến 10 theo lượng giao dịch đi qua. Xếp theo cột đầu thì công cụ nội bộ đứng đầu; xếp theo cột sau thì dịch vụ thanh toán đứng đầu với mức chênh lớn.",
      kind: "bar",
      yLabel: "Điểm (đơn vị minh hoạ)",
      data: [
        { label: "Công cụ nội bộ", values: [60, 60] },
        { label: "Báo cáo", values: [50, 100] },
        { label: "Đăng nhập", values: [20, 160] },
        { label: "Thanh toán", values: [30, 300] },
      ],
      seriesLabels: ["Thiếu hụt điểm", "Thiếu hụt nhân mức quan trọng"],
    },
  ],

  "du-phong-dung-chung-giua-cac-doi": [
    {
      type: "exercise",
      language: "javascript",
      title: "Gom chung tiết kiệm được bao nhiêu",
      task: "Ba dịch vụ, mức dùng theo sáu khung giờ (đơn vị tài nguyên, số minh hoạ). Mã khởi đầu coi dự phòng chung bằng tổng các đỉnh riêng nên báo tiết kiệm 0%. Sửa: dự phòng chung là đỉnh của TỔNG mức dùng theo từng khung giờ.",
      starter: `const dich_vu = [
  [10, 40, 10, 10, 10, 10],
  [10, 10, 30, 10, 10, 10],
  [10, 10, 10, 20, 10, 10],
];
const dinh = (xs) => Math.max(...xs);
const rieng = dich_vu.reduce((s, xs) => s + dinh(xs), 0);
const chung = rieng;
const tietKiem = Math.round(((rieng - chung) / rieng) * 100);
console.log("Dự phòng riêng: " + rieng);
console.log("Dự phòng chung: " + chung);
console.log("Tiết kiệm: " + tietKiem + "%");
`,
      solution: `const dich_vu = [
  [10, 40, 10, 10, 10, 10],
  [10, 10, 30, 10, 10, 10],
  [10, 10, 10, 20, 10, 10],
];
const dinh = (xs) => Math.max(...xs);
const rieng = dich_vu.reduce((s, xs) => s + dinh(xs), 0);
const tong = dich_vu[0].map((_, i) => dich_vu.reduce((s, xs) => s + xs[i], 0));
const chung = dinh(tong);
const tietKiem = Math.round(((rieng - chung) / rieng) * 100);
console.log("Dự phòng riêng: " + rieng);
console.log("Dự phòng chung: " + chung);
console.log("Tiết kiệm: " + tietKiem + "%");
`,
      expectedOutput: "Dự phòng riêng: 90\nDự phòng chung: 60\nTiết kiệm: 33%",
      hints: [
        "Trước hết cộng ba dịch vụ lại theo từng khung giờ để có một dãy sáu số, rồi mới lấy đỉnh của dãy đó.",
        "Thử đặt cả ba đỉnh vào cùng một khung giờ: dự phòng chung sẽ bằng dự phòng riêng và tiết kiệm về 0%.",
      ],
    },
    {
      type: "chart",
      title: "Gom chung chỉ tiết kiệm khi các đỉnh lệch nhau",
      caption:
        "Mô hình đơn giản hoá với số minh hoạ, không phải đo từ hệ thống thật. Mức trùng đỉnh 0% nghĩa là các đỉnh không bao giờ gặp nhau; 100% nghĩa là luôn gặp nhau, khi đó hai đường trùng khít và gom chung không tiết kiệm được gì.",
      kind: "line",
      xLabel: "Số dịch vụ gom chung",
      yLabel: "Dự phòng cần giữ (đơn vị)",
      x: { from: 1, to: 10, step: 1 },
      params: [
        { id: "peak", label: "Đỉnh của mỗi dịch vụ", min: 10, max: 100, step: 10, value: 40, unit: "đơn vị" },
        { id: "overlap", label: "Mức các đỉnh trùng nhau", min: 0, max: 100, step: 10, value: 30, unit: "%" },
      ],
      series: [
        { label: "Mỗi dịch vụ giữ riêng", expr: "x * peak" },
        { label: "Gom chung", expr: "peak * (1 + (x - 1) * overlap / 100)" },
      ],
    },
  ],

  "xac-suat-va-thong-ke-cho-ke-hoach-sao-luu": [
    {
      type: "exercise",
      language: "python",
      title: "Ba bản sao lưu có an toàn gấp triệu lần không",
      task: "Mỗi bản sao lưu có xác suất hỏng 1% trong một năm (số minh hoạ). Nếu ba bản hỏng độc lập thì xác suất mất cả ba là 0,01³. Nhưng có 0,2% khả năng một nguyên nhân chung (một lệnh xoá chạy trên mọi bản) làm mất cả ba cùng lúc. Mã khởi đầu bỏ qua nguyên nhân chung. Sửa: mat_ca_ba = q + (1 − q) × p³.",
      starter: `p = 0.01
q = 0.002
doc_lap = p ** 3
mat_ca_ba = doc_lap
print(f"Giả định độc lập: {doc_lap:.6f}")
print(f"Có nguyên nhân chung: {mat_ca_ba:.6f}")
print(f"Gấp khoảng {round(mat_ca_ba / doc_lap)} lần")
`,
      solution: `p = 0.01
q = 0.002
doc_lap = p ** 3
mat_ca_ba = q + (1 - q) * doc_lap
print(f"Giả định độc lập: {doc_lap:.6f}")
print(f"Có nguyên nhân chung: {mat_ca_ba:.6f}")
print(f"Gấp khoảng {round(mat_ca_ba / doc_lap)} lần")
`,
      expectedOutput: "Giả định độc lập: 0.000001\nCó nguyên nhân chung: 0.002001\nGấp khoảng 2001 lần",
      hints: [
        "Mất cả ba xảy ra nếu nguyên nhân chung xảy ra, hoặc nếu nó không xảy ra nhưng cả ba vẫn hỏng độc lập.",
        "Xác suất nguyên nhân chung không xảy ra là 1 − q.",
      ],
    },
    {
      type: "feynman",
      title: "Ba - hai - một, kể bằng chuyện giữ chìa khoá nhà",
      intro:
        "Bạn muốn không bao giờ bị kẹt ngoài cửa. Giữ ba chiếc chìa là chưa đủ nếu cả ba nằm chung một chùm trong cùng một túi: một lần đánh rơi là mất hết.",
      columns: ["Quy tắc", "Chuyện chìa khoá", "Nguyên nhân chung nó chặn"],
      rows: [
        ["Ba bản", "Ba chiếc chìa, mỗi chiếc đúc riêng", "Một thiết bị hỏng ngẫu nhiên"],
        [
          "Hai loại phương tiện",
          "Một chìa kim loại, một thẻ từ",
          "Một lỗi chung của cùng loại thiết bị hoặc cùng phần mềm",
        ],
        [
          "Một bản ở nơi khác",
          "Một chiếc gửi nhà người quen",
          "Sự kiện vật lý đánh vào cả địa điểm, như cháy hay mất điện kéo dài",
        ],
        [
          "Một bản không ghi đè được",
          "Một chiếc cất trong két mà không ai sửa được ổ khoá",
          "Lệnh xoá hoặc mã hoá tống tiền chạy bằng quyền ghi lên mọi bản thông thường",
        ],
      ],
      oneLiner: "Số bản chỉ chống được hỏng ngẫu nhiên; sự khác biệt giữa các bản mới chống được nguyên nhân chung.",
    },
  ],

  "nguong-an-toan-toi-thieu-va-quy-dinh-luu-tru": [
    {
      type: "exercise",
      language: "python",
      title: "Giữ tối thiểu và xoá tối đa",
      task: "Một quy định (số minh hoạ) yêu cầu giữ hồ sơ tối thiểu 5 năm và xoá muộn nhất sau 7 năm. Mã khởi đầu chỉ đọc vế đầu nên hồ sơ 9 năm vẫn được ghi là có thể xoá. Sửa để hồ sơ quá thời hạn tối đa in 'phải xoá'. Tuổi các hồ sơ: 1, 4, 5, 7, 9.",
      starter: `toi_thieu = 5
toi_da = 7
for tuoi in [1, 4, 5, 7, 9]:
    if tuoi < toi_thieu:
        nhan = "phải giữ"
    else:
        nhan = "có thể xoá"
    print(f"{tuoi} năm: {nhan}")
`,
      solution: `toi_thieu = 5
toi_da = 7
for tuoi in [1, 4, 5, 7, 9]:
    if tuoi < toi_thieu:
        nhan = "phải giữ"
    elif tuoi > toi_da:
        nhan = "phải xoá"
    else:
        nhan = "có thể xoá"
    print(f"{tuoi} năm: {nhan}")
`,
      expectedOutput: "1 năm: phải giữ\n4 năm: phải giữ\n5 năm: có thể xoá\n7 năm: có thể xoá\n9 năm: phải xoá",
      hints: [
        "Có ba vùng: dưới mức tối thiểu, giữa hai mốc, và vượt mức tối đa. Hiện mã mới chia hai vùng.",
        "Hồ sơ đúng 7 năm vẫn còn trong hạn, chỉ lớn hơn 7 mới phải xoá.",
      ],
    },
    {
      type: "chart",
      title: "Giữ ngắn hay giữ dài đều có giá",
      caption:
        "Đơn vị trừu tượng, chỉ để thấy hình dạng: đường đầu là rủi ro không tra lại được khi giữ ít hơn mức bạn thật sự cần; đường sau là rủi ro dữ liệu bị lộ, tăng đều theo mỗi năm giữ. Điểm thấp nhất của đường tổng nằm đúng ở mức bạn cần, và nó chỉ trùng mức quy định nếu bạn đã quyết định như vậy.",
      kind: "line",
      xLabel: "Số năm giữ dữ liệu",
      yLabel: "Rủi ro (đơn vị minh hoạ)",
      x: { from: 0, to: 12, step: 1 },
      params: [
        { id: "need", label: "Số năm bạn thật sự cần tra lại", min: 2, max: 10, step: 1, value: 5, unit: "năm" },
        { id: "rate", label: "Rủi ro lộ thêm mỗi năm giữ", min: 1, max: 9, step: 1, value: 3, unit: "điểm" },
      ],
      series: [
        { label: "Không tra lại được", expr: "max(0, need - x) * 10" },
        { label: "Dữ liệu có thể bị lộ", expr: "x * rate" },
        { label: "Tổng", expr: "max(0, need - x) * 10 + x * rate" },
      ],
    },
  ],

  "ac-cam-mat-mat-va-hieu-ung-dong-khung": [
    {
      type: "scenario",
      title: "Đề xuất đổi công cụ trong buổi họp",
      start: "hop",
      nodes: {
        hop: {
          text: "Bạn đề xuất thay công cụ triển khai hiện tại bằng một công cụ mới, tiết kiệm khoảng năm giờ mỗi tuần. Buổi họp phản ứng lạnh: mọi người nhìn vào những gì có thể mất. Bạn nói tiếp thế nào?",
          choices: [
            { label: "Đóng khung lại: hiện đội đang mất năm giờ mỗi tuần", next: "khung" },
            { label: "Hỏi: nếu hôm nay chưa có công cụ nào, ta chọn gì", next: "tuDau" },
            { label: "Kể ra các lần công cụ cũ đã làm đội chậm lại hẳn", next: "ke" },
          ],
        },
        khung: {
          text: "Cách nói này thuyết phục hơn thật, và đề xuất được thông qua. Nhưng đóng khung này thuyết phục như nhau kể cả khi đề xuất không đáng làm: hai tháng sau mới lộ ra công cụ mới thiếu một tính năng đội cần, và không ai còn nhớ buổi họp đã bị dẫn dắt.",
          ending: "bad",
        },
        ke: {
          text: "Mỗi lần kể ra một lần công cụ cũ làm chậm, người nghe lại nghĩ tới phần họ có thể mất khi đổi. Buổi họp kết thúc với danh sách rủi ro dài hơn danh sách lợi ích, và đề xuất bị hoãn sang quý sau. Bạn đã thêm chất liệu cho chính điểm tham chiếu đang cản mình.",
          ending: "bad",
        },
        tuDau: {
          text: "Câu hỏi bỏ vị trí mặc định của công cụ hiện tại. Đội bắt đầu liệt kê điều họ cần từ đầu, và một người nhận ra công cụ cũ thiếu hai thứ họ vẫn xoay xở bằng tay. Còn một việc: chi phí đã bỏ ra để học công cụ cũ vẫn được nhắc tới như lý do ở lại. Bạn xử lý thế nào?",
          choices: [
            { label: "Nói rõ phần đã chi rồi thì chọn hướng nào cũng mất", next: "tot" },
            { label: "Hứa sẽ bù lại mọi giờ đã đầu tư cho công cụ cũ ngay", next: "hua" },
            { label: "Bỏ qua, quay lại nói về lợi ích của công cụ mới đó", next: "boqua" },
          ],
        },
        hua: {
          text: "Lời hứa bù đắp không kèm số liệu nên không ai tin, và nó biến cuộc họp thành thương lượng quyền lợi chứ không còn so hai phương án. Người ngại thay đổi giờ có thêm một lý do cụ thể để từ chối.",
          ending: "bad",
        },
        boqua: {
          text: "Chi phí đã bỏ ra vẫn lơ lửng trong phòng và mọi lời về lợi ích bị nghe như cố bào chữa. Câu 'mình đã đầu tư bao nhiêu công vào cái cũ' không ai phản bác, và ý đó thắng một cách thầm lặng.",
          ending: "bad",
        },
        tot: {
          text: "Nhìn từ đầu, đội thấy công đã học mất ở cả hai hướng và chỉ còn so xem cái nào tốt hơn từ hôm nay. Quyết định chuyển được thông qua kèm điều kiện đo lại sau một quý. Bạn dùng hiểu biết này để quyết định tốt hơn, không phải để thắng cuộc họp.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Cùng một đề xuất, ba cách nói",
      intro:
        "Một cửa hàng có thể ghi 'giảm 5% nếu trả tiền mặt' hoặc 'phụ phí 5% nếu trả bằng thẻ'. Số tiền như nhau, nhưng bạn thấy hai cảm giác rất khác nhau.",
      columns: ["Cách nói", "Người nghe cảm thấy", "Đưa về một câu hỏi công bằng"],
      rows: [
        [
          "Đội đang mất năm giờ mỗi tuần",
          "Thiệt hại đang diễn ra, muốn dừng ngay",
          "Đổi sang: nếu bắt đầu lại từ đầu, ta chọn gì?",
        ],
        [
          "Đội sẽ tiết kiệm năm giờ mỗi tuần",
          "Một phần thưởng chưa chắc, thấy rủi ro nặng hơn lợi",
          "Đặt số giờ mất và số giờ được cạnh nhau trong cùng một cột",
        ],
        [
          "Chuyển rồi thì bỏ hết công đã học",
          "Sợ mất thứ đã có, chi phí đã chi thành thiệt hại sắp tới",
          "Công đã học là chi phí chìm, như nhau ở cả hai phương án",
        ],
      ],
      oneLiner: "Đổi điểm tham chiếu bằng một câu hỏi thay vì cố gắng khách quan hơn.",
    },
  ],

  "khi-ca-doi-dong-y-qua-nhanh": [
    {
      type: "exercise",
      language: "python",
      title: "Nói lần lượt và viết riêng cho hai kết quả khác nhau",
      task: "Bảy người có ý kiến riêng (True là ủng hộ). Khi nói lần lượt, từ người thứ ba trở đi, nếu hai người đầu đã nói cùng một ý thì người đó nói theo họ thay vì ý riêng. Hoàn thành hàm noi_lan_luot. Dòng 'Viết riêng trước' đếm ý kiến thật nên không đổi.",
      starter: `y_kien = [True, True, False, False, False, True, False]  # True = ủng hộ

def noi_lan_luot(y_kien):
    da_noi = []
    for rieng in y_kien:
        # Việc của bạn: từ người thứ ba, nếu hai người đầu cùng một ý thì nói theo họ
        da_noi.append(rieng)
    return da_noi

n = len(y_kien)
print(f"Nói lần lượt: {sum(noi_lan_luot(y_kien))}/{n} ủng hộ")
print(f"Viết riêng trước: {sum(y_kien)}/{n} ủng hộ")
`,
      solution: `y_kien = [True, True, False, False, False, True, False]  # True = ủng hộ

def noi_lan_luot(y_kien):
    da_noi = []
    for i, rieng in enumerate(y_kien):
        if i >= 2 and da_noi[0] == da_noi[1]:
            da_noi.append(da_noi[0])
        else:
            da_noi.append(rieng)
    return da_noi

n = len(y_kien)
print(f"Nói lần lượt: {sum(noi_lan_luot(y_kien))}/{n} ủng hộ")
print(f"Viết riêng trước: {sum(y_kien)}/{n} ủng hộ")
`,
      expectedOutput: "Nói lần lượt: 7/7 ủng hộ\nViết riêng trước: 3/7 ủng hộ",
      hints: [
        "Cần chỉ số i của từng người, vì điều kiện chỉ bắt đầu từ người thứ ba (i từ 2).",
        "Kiểm tra da_noi[0] == da_noi[1], tức hai người đầu thật sự đã nói cùng ý.",
      ],
    },
    {
      type: "flow",
      title: "Một đồng thuận giả hình thành trong ba phút",
      steps: [
        {
          label: "Người đầu nêu phương án",
          detail:
            "Trưởng nhóm nói: 'Dùng hàng đợi tin nhắn cho việc này nhé.' Nghe hợp lý, và chưa ai có lý do cụ thể để phản đối.",
        },
        {
          label: "Người thứ hai gật",
          detail:
            "Người thứ hai không thấy lỗi nào ngay lập tức nên gật đầu. Không ai nói dối; lúc này họ chỉ chưa kịp nghĩ kỹ.",
        },
        {
          label: "Phản đối bắt đầu có giá",
          detail:
            "Từ người thứ ba, nói 'chưa chắc' nghĩa là đi ngược cả hai người trước. Người có nghi ngờ nhẹ tự nhủ chắc những người kia đã cân nhắc rồi.",
        },
        {
          label: "Cả phòng đồng ý",
          detail:
            "Biên bản ghi 'thống nhất'. Nhưng ý kiến riêng của phần lớn mọi người chưa hề được nói ra, nên quyết định được chấp nhận chứ chưa được kiểm tra.",
        },
        {
          label: "Chèn bước viết riêng vào đầu",
          detail:
            "Trước khi ai nói, mỗi người viết ra phương án họ chọn và một rủi ro trong năm phút. Khi đọc ra, các ý kiến đã hình thành độc lập, và người phản đối không còn là người đầu tiên đi ngược.",
        },
      ],
    },
  ],

  "thien-kien-trong-nghien-cuu-nguoi-dung": [
    {
      type: "scenario",
      title: "Chuẩn bị mười hai buổi phỏng vấn",
      start: "bat",
      nodes: {
        bat: {
          text: "Nhóm sản phẩm tin rằng người dùng cần tính năng nhắc việc tự động. Bạn lên kế hoạch phỏng vấn mười hai người. Bạn viết câu hỏi chính thế nào?",
          choices: [
            { label: "Nếu có tính năng nhắc việc tự động, bạn có dùng không?", next: "y" },
            { label: "Lần gần nhất bạn quên một việc, bạn xoay xở ra sao?", next: "gan" },
            { label: "Tính năng nhắc việc tự động hữu ích tới đâu, từ 1 đến 5?", next: "thang" },
          ],
        },
        y: {
          text: "Gần như ai cũng nói có, vì nói có không tốn gì cả. Mười một trên mười hai người nói sẽ dùng, nhóm mở tiệc ăn mừng và tính năng được làm. Sau ra mắt, tỷ lệ dùng thật rất thấp: câu hỏi về ý định đo thiện chí của người trả lời, không đo hành vi của họ.",
          ending: "bad",
        },
        thang: {
          text: "Thang điểm cho ra một con số đẹp, trung bình 4,1. Nhưng người trả lời đọc ra bạn mong gì rồi cho điểm cao để giúp. Con số trông khoa học nhưng chỉ đo mong muốn lịch sự của họ, và nhóm vẫn chưa biết ai thật sự gặp vấn đề.",
          ending: "bad",
        },
        gan: {
          text: "Bảy người kể một lần quên cụ thể và cách họ xoay xở: chụp màn hình, nhắn cho chính mình. Hai người không nhớ ra lần nào. Bạn có chuyện thật để ghi lại. Sau mười hai buổi, bạn lưu kết quả thế nào?",
          choices: [
            { label: "Ghi nguyên văn mọi buổi, nhờ đồng nghiệp đọc cùng", next: "tot" },
            { label: "Tự viết bản tóm tắt ngắn ngay sau mỗi buổi phỏng vấn", next: "tomtat" },
            { label: "Chỉ ghi lại những câu trích hợp nhất với giả thuyết", next: "chon" },
          ],
        },
        tomtat: {
          text: "Bản tóm tắt của bạn đã lọc qua giả thuyết bạn tin: bạn nhớ rõ những câu khớp và quên những câu lệch. Đồng nghiệp đọc bản tóm tắt chỉ thấy lại đúng giả thuyết ấy. Người mắc thiên kiến này không tự thấy nó.",
          ending: "bad",
        },
        chon: {
          text: "Chọn câu trích hợp giả thuyết là chọn bằng chứng sau khi đã chọn kết luận. Ba người nói điều ngược lại bị bỏ khỏi bản trình bày, và nhóm xây tính năng trên một bức tranh đã được chỉnh trước.",
          ending: "bad",
        },
        tot: {
          text: "Đồng nghiệp đọc nguyên văn và chỉ ra một câu bạn đã bỏ qua: hai người nói họ chẳng bao giờ quên vì đã có thói quen riêng. Giả thuyết thu hẹp từ 'ai cũng cần' xuống một nhóm cụ thể. Nghiên cứu làm đúng việc của nó: chỉnh lại điều bạn đã tin.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Hai thiên kiến trong phòng phỏng vấn",
      intro:
        "Hỏi bạn bè 'món này ngon không' khi họ biết bạn nấu, ai cũng khen. Rồi bạn nhớ những lời khen và quên cái nhíu mày thoáng qua. Cả hai chiều đều làm bằng chứng nghiêng về điều bạn mong.",
      columns: ["Thiên kiến", "Chuyện nấu ăn", "Cách chữa"],
      rows: [
        [
          "Hỏi về ý định",
          "Lần sau bạn có ăn món này không? Ai cũng nói có vì nói có không tốn gì",
          "Hỏi chuyện đã xảy ra: lần gần nhất gặp việc này là khi nào, xoay xở ra sao",
        ],
        [
          "Người được hỏi đoán ý bạn",
          "Họ đọc nét mặt bạn khi hỏi và muốn làm bạn vui",
          "Viết sẵn câu hỏi trung tính, không ứng khẩu",
        ],
        [
          "Người hỏi nhớ chọn lọc",
          "Bạn nhớ lời khen, quên cái nhíu mày, và không tự thấy mình làm vậy",
          "Ghi nguyên văn và để người khác đọc, thay vì dựa vào bản tóm tắt của chính mình",
        ],
      ],
      oneLiner: "Hỏi chuyện đã xảy ra, ghi nguyên văn, và để người khác đọc cùng.",
    },
  ],
};
