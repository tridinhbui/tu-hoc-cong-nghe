import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 24. Một người viết cho một tệp.
export const P24_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Bảo mật ứng dụng ────────────────────────────────────────────────────
  "chong-lam-dung": [
    {
      type: "scenario",
      title: "Nút quên mật khẩu bị đem ra thử",
      start: "quen",
      nodes: {
        quen: {
          text: "Trang quên mật khẩu nhận một địa chỉ thư và trả lời người dùng. Bạn viết thông báo trả về thế nào?",
          choices: [
            { label: "Báo rõ địa chỉ này chưa đăng ký tài khoản nào", next: "lo" },
            { label: "Mọi trường hợp đều trả cùng một thông báo", next: "gioihan" },
            { label: "Chỉ nhận yêu cầu từ người đã đăng nhập", next: "ket" },
          ],
        },
        lo: {
          text: "Người lạ chạy một danh sách vài trăm nghìn địa chỉ qua trang này và biết chính xác ai là khách của bạn. Danh sách ấy được dùng cho thư lừa đảo nhắm đích. Mọi lời gọi đều hợp lệ, nên công cụ quét không báo gì.",
          ending: "bad",
        },
        ket: {
          text: "Người thật quên mật khẩu thì đúng là không đăng nhập được, nên không ai dùng được chức năng ở đúng lúc họ cần nó. Phiếu hỗ trợ tăng, còn kẻ dò vẫn tìm đường khác.",
          ending: "bad",
        },
        gioihan: {
          text: "Thông báo đã đồng nhất nên kẻ dò không đọc được gì. Nhưng chức năng này gửi thư mang tên sản phẩm, mỗi thư tốn tiền. Có kẻ nhập địa chỉ của một nạn nhân liên tục. Bạn làm gì?",
          choices: [
            { label: "Giới hạn số thư theo người nhận và theo nguồn gọi", next: "tot" },
            { label: "Tin rằng ít ai rảnh tới mức làm chuyện đó", next: "ngap" },
            { label: "Chỉ thêm ô xác nhận không phải người máy", next: "chuaduoc" },
          ],
        },
        ngap: {
          text: "Hộp thư của nạn nhân ngập trong thư mang tên bạn, nhà cung cấp gửi thư thấy tỷ lệ báo rác tăng và hạ uy tín tên miền. Thư đặt lại mật khẩu của khách thật bắt đầu rơi vào thư rác.",
          ending: "bad",
        },
        chuaduoc: {
          text: "Cỗ máy đơn giản bị chặn bớt, nhưng một người thật bấm lặp lại vẫn làm ngập hộp thư của nạn nhân. Thiếu giới hạn theo địa chỉ nhận nên việc lạm dụng chỉ chậm đi chứ không dừng.",
          ending: "bad",
        },
        tot: {
          text: "Người thật vẫn nhận được thư khi cần, kẻ dò không biết gì, và một địa chỉ không thể bị dội thư vô hạn. Bạn đã trả lời câu hỏi thiết kế: nếu chức năng này bị gọi mười nghìn lần thì chuyện gì xảy ra, và ai trả tiền?",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Hoá đơn khi một tính năng tính phí bị gọi hàng loạt",
      caption:
        "Số liệu minh hoạ: đơn giá mỗi lượt gọi và giới hạn chỉ để thấy hình dạng, dịch vụ thật có bảng giá riêng. Điều đáng nhớ là không có giới hạn thì hoá đơn tăng thẳng theo số lượt người khác chọn gọi.",
      kind: "line",
      xLabel: "Số lượt gọi (nghìn)",
      yLabel: "Chi phí (USD)",
      x: { from: 0, to: 100, step: 10 },
      params: [
        { id: "price", label: "Đơn giá mỗi lượt gọi (minh hoạ)", min: 0.001, max: 0.05, step: 0.001, value: 0.01, unit: "USD" },
        { id: "cap", label: "Giới hạn lượt gọi được tính phí", min: 1000, max: 20000, step: 1000, value: 5000, unit: "lượt" },
      ],
      series: [
        { label: "Không giới hạn", expr: "x * 1000 * price" },
        { label: "Có giới hạn", expr: "min(x * 1000, cap) * price" },
      ],
    },
  ],

  "nhat-ky-truy-vet-ai-lam-gi-luc-nao": [
    {
      type: "exercise",
      language: "python",
      title: "Bản ghi thay đổi phải có giá trị cũ",
      task: "Danh sách dưới đây là các thay đổi đã xảy ra. Mỗi dòng in ra phải cho biết ai đổi trường nào, từ giá trị nào sang giá trị nào, theo mẫu: an doi han_muc: 5000000 -> 9000000. Mã khởi đầu mới in giá trị sau thay đổi; hãy thêm giá trị cũ.",
      starter: `thay_doi = [
    ("an", "han_muc", 5000000, 9000000),
    ("binh", "email", "b@cu.vn", "b@moi.vn"),
    ("chi", "vai_tro", "xem", "quan_tri"),
]
for ai, truong, cu, moi in thay_doi:
    print(f"{ai} doi {truong}: {moi}")
`,
      solution: `thay_doi = [
    ("an", "han_muc", 5000000, 9000000),
    ("binh", "email", "b@cu.vn", "b@moi.vn"),
    ("chi", "vai_tro", "xem", "quan_tri"),
]
for ai, truong, cu, moi in thay_doi:
    print(f"{ai} doi {truong}: {cu} -> {moi}")
`,
      expectedOutput: `an doi han_muc: 5000000 -> 9000000
binh doi email: b@cu.vn -> b@moi.vn
chi doi vai_tro: xem -> quan_tri`,
      hints: ["Biến cu đã có sẵn trong vòng lặp, chỉ chưa được in.", "Mẫu cần dấu mũi tên ASCII: khoảng trắng, dấu trừ, dấu lớn hơn, khoảng trắng."],
    },
    {
      type: "feynman",
      title: "Nhật ký truy vết giống cuốn sổ kho khoá trong phòng giám đốc",
      intro:
        "Hãy nghĩ tới sổ xuất nhập kho của một cửa hàng. Nó chỉ có giá trị khi tra lại được sau nhiều tháng: ai ký, hàng đổi từ bao nhiêu sang bao nhiêu, và thủ kho không thể tự tẩy xoá dòng của mình.",
      columns: ["Ở cửa hàng", "Trong hệ thống", "Vì sao cần"],
      rows: [
        ["Chữ ký của người ghi sổ", "Danh tính thật, không dùng tài khoản chung", "Tra ra đúng một người thay vì ai đó trong phòng"],
        ["Ghi số tồn cũ lẫn số tồn mới", "Giá trị cũ cùng giá trị mới", "Biết hạn mức đi từ đâu tới đâu, không chỉ có một lần đổi"],
        ["Cuốn sổ cất ở phòng giám đốc", "Lưu ở hệ thống riêng, người làm không ghi đè được", "Người bị nghi không sửa được bằng chứng về chính mình"],
        ["Ghi cả người lật xem hồ sơ khách", "Ghi cả hành động đọc dữ liệu nhạy cảm", "Bắt được kiểu lạm dụng không để lại thay đổi nào"],
      ],
      oneLiner: "Bản ghi truy vết phải trả lời được câu hỏi của sáu tháng sau, nên nó cần giá trị cũ và phải nằm ngoài tầm tay người bị hỏi.",
    },
  ],

  "quyen-toi-thieu": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm quyền thừa của từng dịch vụ",
      task: "Với mỗi dịch vụ, `can` là quyền nó thật sự cần và `cap` là quyền đang được cấp. In ra phần quyền thừa theo thứ tự chữ cái, dạng: bao_cao thua: ['ghi']. Dịch vụ không thừa gì thì in: thanh_toan thua: khong. Mã khởi đầu mới in toàn bộ quyền đang cấp.",
      starter: `can = {
    "trang_gioi_thieu": {"doc"},
    "bao_cao": {"doc"},
    "thanh_toan": {"doc", "ghi"},
}
cap = {
    "trang_gioi_thieu": {"doc", "ghi", "xoa"},
    "bao_cao": {"doc", "ghi"},
    "thanh_toan": {"doc", "ghi"},
}
for dv in cap:
    thua = sorted(cap[dv])
    print(dv, "thua:", thua if thua else "khong")
`,
      solution: `can = {
    "trang_gioi_thieu": {"doc"},
    "bao_cao": {"doc"},
    "thanh_toan": {"doc", "ghi"},
}
cap = {
    "trang_gioi_thieu": {"doc", "ghi", "xoa"},
    "bao_cao": {"doc", "ghi"},
    "thanh_toan": {"doc", "ghi"},
}
for dv in cap:
    thua = sorted(cap[dv] - can[dv])
    print(dv, "thua:", thua if thua else "khong")
`,
      expectedOutput: `trang_gioi_thieu thua: ['ghi', 'xoa']
bao_cao thua: ['ghi']
thanh_toan thua: khong`,
      hints: ["Quyền thừa là quyền được cấp mà không nằm trong quyền cần.", "Hai tập hợp trong Python trừ nhau được bằng dấu trừ."],
    },
    {
      type: "feynman",
      title: "Quyền tối thiểu giống cách phát thẻ ở khách sạn",
      intro:
        "Khách sạn không đưa mọi người một chiếc chìa vạn năng. Thẻ phòng mở đúng một phòng, thẻ của nhân viên dọn không mở được két, và thẻ của khách tự hết hạn đúng giờ trả phòng. Thẻ vẫn có thể bị mất, nhưng mất thẻ nào cũng chỉ thiệt hại có hạn.",
      columns: ["Ở khách sạn", "Chiều thu hẹp", "Nếu thẻ bị nhặt mất"],
      rows: [
        ["Thẻ chỉ mở một phòng", "Phạm vi dữ liệu: đúng bảng và cột cần dùng", "Kẻ nhặt chỉ vào được một phòng"],
        ["Thẻ dọn phòng không mở được két", "Loại thao tác: chỉ đọc thì không cấp quyền ghi", "Kẻ nhặt xem được nhưng không sửa được gì"],
        ["Thẻ khách hết hạn lúc trả phòng", "Thời gian: quyền tạm thời có hạn", "Không ai phải nhớ để đi thu hồi"],
        ["Một chiếc chìa vạn năng dùng chung", "Một tài khoản quyền đầy đủ cho mọi dịch vụ", "Mất một chiếc là mất cả toà nhà"],
      ],
      oneLiner: "Cấp quyền hẹp không làm hệ thống khó bị chiếm hơn, nó quyết định kẻ chiếm được đứng ở đâu.",
    },
  ],

  "phong-thu-nhieu-lop": [
    {
      type: "exercise",
      language: "python",
      title: "Hai lớp có thật sự độc lập không",
      task: "Mỗi lớp phòng thủ đọc quyết định của nó từ một nguồn cấu hình. Khi một nguồn bị tắt nhầm, mọi lớp đọc nguồn đó đều hỏng cùng lúc. Với mỗi nguồn hỏng, in số lớp còn lại, theo mẫu: cfg_a hong -> 1 lop con lai. Mã khởi đầu giả định các lớp luôn độc lập nên luôn in cùng một số.",
      starter: `lop = {
    "giao_dien": "cfg_a",
    "may_chu": "cfg_a",
    "co_so_du_lieu": "cfg_b",
}
for hong in ["cfg_a", "cfg_b"]:
    con = len(lop) - 1
    print(hong, "hong ->", con, "lop con lai")
`,
      solution: `lop = {
    "giao_dien": "cfg_a",
    "may_chu": "cfg_a",
    "co_so_du_lieu": "cfg_b",
}
for hong in ["cfg_a", "cfg_b"]:
    con = len([ten for ten, nguon in lop.items() if nguon != hong])
    print(hong, "hong ->", con, "lop con lai")
`,
      expectedOutput: `cfg_a hong -> 1 lop con lai
cfg_b hong -> 2 lop con lai`,
      hints: ["Đếm các lớp có nguồn cấu hình khác với nguồn đang hỏng.", "Lớp giao_dien và may_chu cùng đọc cfg_a nên chúng hỏng cùng nhau."],
    },
    {
      type: "flow",
      title: "Một yêu cầu độc hại đi qua các lớp, khi lớp đầu đã hỏng",
      steps: [
        { label: "Nhánh giao diện bị quên", detail: "Một màn hình mới thiếu bước kiểm tra quyền. Yêu cầu gửi lên máy chủ mang theo mã của một hồ sơ không thuộc người gọi." },
        { label: "Lớp máy chủ chặn lại", detail: "Máy chủ kiểm quyền bằng danh tính trong phiên, không tin giao diện. Vì lý do hỏng của hai lớp khác nhau nên lớp này không hỏng theo." },
        { label: "Kịch bản xấu hơn: hai kiểm tra dùng chung một cờ", detail: "Giả sử giao diện và máy chủ đều đọc cờ cấu hình KIEM_QUYEN. Hai kiểm tra mang hai cái tên nhưng chỉ là một lớp." },
        { label: "Cờ bị tắt nhầm lúc triển khai", detail: "Cả hai kiểm tra cùng im lặng. Không có lỗi nào được báo vì không bước nào thấy điều gì sai." },
        { label: "Lớp cuối đứng gần dữ liệu", detail: "Tài khoản cơ sở dữ liệu của dịch vụ chỉ được đọc bảng của chính nó. Yêu cầu vượt hồ sơ nên bị từ chối ở nơi mọi đường đều đi qua." },
        { label: "Hậu quả nhỏ và chữa đúng chỗ", detail: "Sự cố dừng ở một yêu cầu bị từ chối trong nhật ký. Lớp bổ sung chỉ làm nhẹ hậu quả; bạn vẫn phải sửa cờ ở lớp chính." },
      ],
    },
  ],

  "nhan-bao-cao-lo-hong": [
    {
      type: "scenario",
      title: "Một thư lạ báo rằng trang của bạn có lỗ hổng",
      start: "thu",
      nodes: {
        thu: {
          text: "Hộp thư chung nhận một thư từ người lạ, mô tả cách đọc được dữ liệu của người khác trên sản phẩm của bạn. Bạn trả lời thế nào?",
          choices: [
            { label: "Cảm ơn, xác nhận đã nhận và hẹn mốc báo lại", next: "xacminh" },
            { label: "Đợi xác minh xong rồi mới trả lời một thể", next: "im" },
            { label: "Nhờ họ ký cam kết bí mật trước khi nói tiếp", next: "ky" },
          ],
        },
        im: {
          text: "Hai tuần trôi qua, người báo không thấy gì và đọc đó là sự phớt lờ. Họ đăng chi tiết lên mạng. Bạn phải vá dưới áp lực thời gian, trong khi mọi người đã đọc được cách khai thác.",
          ending: "bad",
        },
        ky: {
          text: "Người báo không có lý do gì để ký một văn bản của người họ chưa quen, nên họ đóng thư lại. Lỗ hổng vẫn nằm đó, chờ người tiếp theo tìm ra, người này có thể không tử tế.",
          ending: "bad",
        },
        xacminh: {
          text: "Bạn xác minh được: báo cáo là thật. Giờ tới phần bạn kiểm soát được. Bạn xử lý tiếp thế nào?",
          choices: [
            { label: "Báo tiến triển theo mốc, vá rồi báo lại họ", next: "tot" },
            { label: "Vá lặng lẽ và không nhắn lại cho ai", next: "langle" },
            { label: "Nhờ luật sư vì họ đã thử khai thác", next: "doa" },
          ],
        },
        langle: {
          text: "Lỗ hổng biến mất mà người báo không nhận một lời. Họ kết luận rằng báo cho bạn là vô ích. Lần sau, khi một lỗ hổng khác được tìm ra, nó sẽ đến tay người khác chứ không đến bạn.",
          ending: "bad",
        },
        doa: {
          text: "Người báo có thiện chí bị đe doạ, câu chuyện lan trong cộng đồng nghiên cứu bảo mật. Những người sau này tìm ra lỗi của bạn chọn công bố thẳng hoặc im lặng, không ai chọn gửi thư.",
          ending: "bad",
        },
        tot: {
          text: "Người báo thấy việc của mình có tác dụng, lỗ hổng được vá trước khi ai khác biết, và địa chỉ liên hệ của bạn trở thành nơi họ nghĩ tới đầu tiên. Cánh cửa mở tốn gần như không gì.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Hành trình của một báo cáo lỗ hổng, từ người ngoài tới bản vá",
      steps: [
        { label: "Người ngoài tìm ra lỗi và đi tìm nơi báo", detail: "Họ tìm một địa chỉ liên hệ về bảo mật trên trang của bạn. Không có thì họ phải đoán, gửi vào hộp thư chung rồi chờ, hoặc bỏ đi." },
        { label: "Họ đọc trang liên hệ ngắn", detail: "Vài dòng ghi địa chỉ và cam kết xử lý công bằng với người báo cáo thiện chí. Hai rào cản lớn nhất, không biết báo ở đâu và sợ bị truy cứu, được gỡ ngay ở đây." },
        { label: "Bạn xác nhận đã nhận trong một dòng", detail: "Chưa cần biết lỗi thật hay không. Một dòng cảm ơn kèm mốc báo lại là để người báo không phải đọc sự im lặng thành phớt lờ." },
        { label: "Xác minh và vá", detail: "Đội tái hiện lỗi, đo phạm vi, vá. Trong lúc đó, nhắn cho người báo ở mỗi mốc đã hẹn, kể cả khi chưa có gì mới." },
        { label: "Báo lại và ghi nhận", detail: "Khi đã vá, cho người báo biết và hỏi họ kiểm tra lại. Họ sẽ nhớ cách bạn đối xử khi gặp lỗ hổng tiếp theo." },
      ],
    },
  ],

  "xu-ly-su-co-bao-mat": [
    {
      type: "scenario",
      title: "3 giờ sáng: tài khoản quản trị đăng nhập từ nơi lạ",
      start: "phathien",
      nodes: {
        phathien: {
          text: "Cảnh báo cho thấy tài khoản quản trị vừa đăng nhập từ một quốc gia bạn chưa có người dùng. Trên một máy chủ có một tiến trình lạ đang chạy. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Chụp trạng thái máy và sao nhật ký ra nơi riêng", next: "phamvi" },
            { label: "Khởi động lại máy chủ để đưa nó về sạch", next: "restart" },
            { label: "Xoá ngay tệp lạ vừa tìm thấy trên máy", next: "xoa" },
          ],
        },
        restart: {
          text: "Tiến trình lạ và bộ nhớ của nó biến mất cùng lúc. Bạn không còn cách trả lời câu hỏi họ vào bằng đường nào, nên hôm sau họ vào lại bằng đúng đường cũ.",
          ending: "bad",
        },
        xoa: {
          text: "Tệp lạ là bằng chứng duy nhất về việc họ đã làm gì, và nó vừa mất. Kẻ tấn công thấy tệp bị xoá nên đổi sang một lối bạn chưa biết, còn bạn không còn gì để lần theo.",
          ending: "bad",
        },
        phamvi: {
          text: "Bằng chứng đã giữ. Bạn đã biết hai đường họ đang dùng: tài khoản quản trị và một khoá triển khai bị lộ. Bạn cắt truy cập thế nào?",
          choices: [
            { label: "Thu hồi từng đường một, tài khoản quản trị trước", next: "tungduong" },
            { label: "Lập kế hoạch rồi thu hồi mọi đường cùng lúc", next: "thongbao" },
            { label: "Chờ tới khi biết hết mọi đường rồi mới cắt", next: "cho" },
          ],
        },
        tungduong: {
          text: "Kẻ tấn công thấy một đường đóng và chuyển ngay sang khoá triển khai còn mở. Giờ họ biết bạn đã phát hiện, và bạn mất dấu họ trong hệ thống.",
          ending: "bad",
        },
        cho: {
          text: "Trong từng giờ chờ, họ vẫn ở trong hệ thống và lấy thêm dữ liệu. Phạm vi sự cố to hơn lúc bạn bắt đầu điều tra.",
          ending: "bad",
        },
        thongbao: {
          text: "Cả hai đường đóng cùng lúc, họ không kịp chuyển hướng. Điều tra cho thấy dữ liệu khách đã bị chạm tới, và quy định đặt thời hạn thông báo tính bằng giờ kể từ lúc phát hiện. Bạn làm gì?",
          choices: [
            { label: "Báo theo phạm vi đã xác định, đúng thời hạn", next: "tot" },
            { label: "Chờ điều tra xong hoàn toàn rồi mới báo", next: "quahan" },
            { label: "Không báo vì chưa chắc dữ liệu có bị lấy", next: "giau" },
          ],
        },
        quahan: {
          text: "Cuộc điều tra kéo dài hơn thời hạn. Đồng hồ nghĩa vụ đã chạy từ lúc phát hiện chứ không phải từ lúc điều tra xong, nên việc thông báo giờ đã trễ.",
          ending: "bad",
        },
        giau: {
          text: "Không có bằng chứng dữ liệu không bị lấy, và quy định không đòi bạn chắc chắn mới báo. Khi chuyện lộ ra từ bên ngoài, vấn đề đã đổi từ sự cố thành việc che giấu.",
          ending: "bad",
        },
        tot: {
          text: "Bằng chứng được giữ, cả hai đường cùng đóng, khách nhận thông báo đúng phạm vi và đúng hạn. Quyết định khó đảo ngược nhất là cái đầu tiên, và nó nằm trong danh sách ba việc bạn đã viết lúc bình thường.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Bốn việc theo thứ tự khi có kẻ tấn công trong hệ thống",
      steps: [
        { label: "Giữ bằng chứng", detail: "Chụp ảnh trạng thái máy, sao nhật ký ra nơi kẻ tấn công không chạm được. Thứ nằm trong bộ nhớ biến mất khi khởi động lại, nên việc này đi trước mọi việc khác." },
        { label: "Xác định phạm vi", detail: "Họ vào bằng đường nào, đã chạm tới bảng dữ liệu nào, còn đang ở trong không. Câu trả lời quyết định đường nào cần cắt và ai cần được báo." },
        { label: "Cắt truy cập đồng thời", detail: "Lập danh sách mọi đường đã biết: tài khoản, khoá, phiên. Thu hồi cùng một lúc, vì cắt từng đường để lộ cho họ biết và đẩy họ sang đường chưa biết." },
        { label: "Thông báo theo thời hạn", detail: "Đồng hồ quy định chạy từ lúc phát hiện, không phải từ lúc điều tra xong. Báo theo phạm vi đã xác định, rồi cập nhật khi hiểu thêm." },
      ],
    },
  ],

  "quyen-rieng-tu-va-nghia-vu": [
    {
      type: "exercise",
      language: "python",
      title: "Yêu cầu xoá phải phủ mọi kho dữ liệu",
      task: "Một người dùng yêu cầu xoá dữ liệu. Mỗi kho có `han` là None nếu xoá được ngay, hoặc số ngày nếu là bản sao lưu chỉ hết hạn sau khoảng đó (số ngày chỉ là minh hoạ). In từng kho theo mẫu: ban_sao_luu: het han sau 35 ngay, hoặc co_so_du_lieu_chinh: xoa ngay. Mã khởi đầu coi mọi kho đều xoá ngay được.",
      starter: `kho = {
    "co_so_du_lieu_chinh": None,
    "kho_bao_cao": None,
    "ban_sao_luu": 35,
}
for ten, han in kho.items():
    print(ten + ": xoa ngay")
`,
      solution: `kho = {
    "co_so_du_lieu_chinh": None,
    "kho_bao_cao": None,
    "ban_sao_luu": 35,
}
for ten, han in kho.items():
    if han is None:
        print(ten + ": xoa ngay")
    else:
        print(ten + ": het han sau", han, "ngay")
`,
      expectedOutput: `co_so_du_lieu_chinh: xoa ngay
kho_bao_cao: xoa ngay
ban_sao_luu: het han sau 35 ngay`,
      hints: ["Dùng `han is None` để phân biệt kho xoá ngay với kho có hạn.", "Câu chính sách nên nêu rõ bản sao lưu hết hạn sau bao nhiêu ngày."],
    },
    {
      type: "feynman",
      title: "Bảo mật và riêng tư là hai câu hỏi về cùng phòng hồ sơ",
      intro:
        "Hãy nghĩ tới phòng lưu hồ sơ giấy của một văn phòng. Câu hỏi ai có chìa khoá là một chuyện. Câu hỏi có cần giữ tờ giấy ấy không, giữ bao lâu, dùng vào việc gì, là chuyện khác hẳn, và nó đứng trước.",
      columns: ["Câu hỏi", "Thuộc về", "Ví dụ với hồ sơ khách"],
      rows: [
        ["Ai có chìa phòng hồ sơ?", "Bảo mật", "Khoá cửa, ghi ai ra vào, chỉ cấp chìa cho người cần"],
        ["Có cần giữ tờ này không?", "Quyền riêng tư", "Biểu mẫu nhận bản tin không cần số căn cước, nên đừng thu"],
        ["Giữ bao lâu và dùng làm gì?", "Quyền riêng tư", "Hồ sơ khách đã nghỉ lâu nên huỷ, không phải khoá kỹ hơn"],
        ["Khách đòi huỷ: bản photo trong kho lưu trữ thì sao?", "Cả hai", "Quy trình huỷ phải phủ cả bản sao lưu lẫn kho báo cáo"],
      ],
      oneLiner: "Bảo vệ tốt một thứ không nên giữ vẫn là một vấn đề; câu hỏi riêng tư đứng trước câu hỏi bảo mật.",
    },
  ],

  "on-tap-bao-mat-ung-dung": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Trợ lý AI rà soát tính năng tải ảnh đại diện",
      task: "Bạn nhờ trợ lý rà soát bảo mật tính năng cho người dùng tải ảnh đại diện. Một vài nhận định trong bản trả lời mắc đúng hai hình dạng lỗi cả chặng đã nhắc: tin lời khai và trộn dữ liệu với lệnh. Bấm vào các đoạn đáng ngờ rồi nộp.",
      segments: [
        {
          text: "Máy chủ chỉ cần xem tệp có đuôi .jpg hay .png là biết đó là ảnh, nên không cần kiểm tra thêm.",
          error: "Phần mở rộng tệp là do phía gửi đặt, nên nó là lời khai chứ không phải bằng chứng. Máy chủ cần kiểm tra nội dung thật của tệp.",
        },
        { text: "Tệp nên lưu ở nơi không thực thi mã, với tên do máy chủ tự sinh thay vì tên người dùng gửi lên." },
        {
          text: "Nút tải lên chỉ hiện cho người đã đăng nhập, nên máy chủ không cần kiểm tra lại quyền.",
          error: "Kiểm tra ở giao diện là lời khai: ai cũng gửi được yêu cầu trực tiếp tới máy chủ. Quyền phải được kiểm tra lại ở máy chủ, gần dữ liệu.",
        },
        { text: "Nếu phần xử lý ảnh bị chiếm, tài khoản của nó nên chỉ ghi được vào thư mục ảnh, để kẻ chiếm không đi xa hơn." },
        {
          text: "Lọc bỏ ký tự lạ khỏi tên tệp là cách chữa tận gốc việc dữ liệu bị hiểu thành lệnh.",
          error: "Chữa tận gốc là tách dữ liệu khỏi lệnh, chẳng hạn tên do máy chủ sinh và tham số hoá, chứ không phải đoán ký tự nào nguy hiểm. Danh sách lọc luôn thiếu một trường hợp.",
        },
        { text: "Ghi lại ai tải tệp nào lên và lúc nào, để sau này trả lời được câu hỏi chuyện gì đã xảy ra." },
      ],
    },
    {
      type: "flow",
      title: "Bốn câu hỏi áp vào tính năng chia sẻ tài liệu bằng liên kết",
      steps: [
        { label: "Dữ liệu nào đi vào tính năng này?", detail: "Mã tài liệu trong đường dẫn, tên tệp, quyền xem hay sửa chọn lúc chia sẻ. Mỗi thứ do phía người dùng quyết định, nên không thứ nào được tin sẵn." },
        { label: "Ai được chạm tới nó?", detail: "Người có liên kết được xem, nhưng liên kết có đoán được không? Mã tuần tự 1001, 1002 cho phép người lạ đi dò cả kho; mã ngẫu nhiên dài thì không." },
        { label: "Nếu phần này bị chiếm, kẻ chiếm đi được tới đâu?", detail: "Dịch vụ xuất liên kết chỉ nên đọc được tài liệu được chia sẻ, không đọc được toàn bộ kho. Đây là câu hỏi của quyền tối thiểu và nhiều lớp." },
        { label: "Ta biết chuyện đã xảy ra bằng cách nào?", detail: "Ai tạo liên kết, ai mở, từ đâu, lúc nào. Nếu không ghi được thì sau này không trả lời được liệu liên kết nào đã bị lộ." },
      ],
    },
  ],

  // ── Hiệu năng ───────────────────────────────────────────────────────────
  "hieu-nang-bat-dau-bang-do": [
    {
      type: "scenario",
      title: "Trang báo cáo mất sáu giây để mở",
      start: "cham",
      nodes: {
        cham: {
          text: "Trang báo cáo mất sáu giây. Một đồng nghiệp tin chắc rằng vòng lặp tính toán là thủ phạm. Bạn làm gì trước?",
          choices: [
            { label: "Viết lại vòng lặp tính toán cho gọn hơn", next: "vonglap" },
            { label: "Dựng phép đo, xếp thời gian theo từng bước", next: "do" },
            { label: "Thêm máy chủ cho chắc và xem có nhanh không", next: "them" },
          ],
        },
        vonglap: {
          text: "Hai tuần sau vòng lặp gọn hơn, mã dễ đọc hơn, và trang vẫn mở trong gần sáu giây. Vòng lặp đó chỉ chiếm vài phần trăm tổng thời gian.",
          ending: "bad",
        },
        them: {
          text: "Chi phí hạ tầng tăng gấp đôi mà thời gian mở trang không đổi, vì phần lớn thời gian là chờ một truy vấn mà thêm máy không làm nhanh hơn.",
          ending: "bad",
        },
        do: {
          text: "Danh sách xếp theo thời gian cho thấy một truy vấn chiếm phần lớn sáu giây, không phải vòng lặp. Mục đứng đầu nằm ngoài dự đoán của mọi người. Bạn làm gì tiếp?",
          choices: [
            { label: "Sửa truy vấn rồi đo lại bằng đúng phép đo cũ", next: "tot" },
            { label: "Sửa truy vấn và coi như đã xong việc", next: "mu" },
            { label: "Sửa luôn mọi mục khác trong danh sách", next: "lan" },
          ],
        },
        mu: {
          text: "Không ai biết bản sửa có tác dụng không. Ba tuần sau người dùng vẫn than chậm và phép đo ban đầu đã không còn để so sánh, nên bạn phải bắt đầu lại từ đầu.",
          ending: "bad",
        },
        lan: {
          text: "Các mục nhỏ mỗi mục chỉ chiếm vài phần trăm, nên tổng lợi ích rất ít, trong khi mã thêm phức tạp. Và sau khi mục lớn nhất đổi, thứ tự cả danh sách cũng đã đổi.",
          ending: "bad",
        },
        tot: {
          text: "Phép đo lần hai xác nhận trang giảm rõ rệt, và nó cũng cho danh sách mới: mục đứng đầu giờ là mục khác. Bạn biết mình mua được gì bằng khoản phức tạp vừa thêm.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một vòng đo, sửa, đo lại",
      steps: [
        { label: "Dựng phép đo cố định", detail: "Một kịch bản lặp lại được: cùng yêu cầu, dữ liệu cỡ thật, chạy nhiều lần để thấy độ dao động. Không có bước này thì hai lần đo sau không so sánh được." },
        { label: "Xếp thời gian theo từng bước", detail: "Mỗi bước nhận một phần trăm của tổng. Trực giác dùng ở đây để chọn chỗ đặt công cụ đo, không dùng để chọn chỗ sửa." },
        { label: "Sửa đúng một mục đứng đầu", detail: "Chỉ một thay đổi mỗi vòng, để biết thay đổi nào tạo ra kết quả nào. Sửa năm thứ một lúc thì không biết thứ nào có tác dụng." },
        { label: "Đo lại bằng đúng phép đo cũ", detail: "Một thay đổi trông chắc chắn nhanh hơn vẫn có thể không đổi gì. Con số mới cho bạn biết khoản phức tạp vừa thêm có xứng đáng không." },
        { label: "Đọc danh sách mới", detail: "Mục thứ hai giờ là mục lớn nhất và tỷ trọng của mọi thứ đã đổi. Bản đồ cũ mô tả một hệ thống không còn tồn tại." },
      ],
    },
  ],

  "chi-so-hieu-nang-phan-anh-trai-nghiem": [
    {
      type: "scenario",
      title: "Bảng điều khiển toàn xanh nhưng khách vẫn than chậm",
      start: "xanh",
      nodes: {
        xanh: {
          text: "Thời gian xử lý của máy chủ đều ở mức ổn, nhưng phiếu hỗ trợ nói trang chậm. Bạn làm gì?",
          choices: [
            { label: "Cho là mạng khách yếu và không xem thêm", next: "mang" },
            { label: "Đo thêm từ phía người dùng, theo thao tác làm được", next: "moc" },
            { label: "Thêm nhiều chỉ số chi tiết hơn bên trong máy chủ", next: "them" },
          ],
        },
        mang: {
          text: "Phiếu hỗ trợ không giảm. Bạn đã bỏ qua phép đo duy nhất trả lời câu hỏi sản phẩm có chậm hay không, và mọi con số bạn có chỉ nói về phần bạn kiểm soát.",
          ending: "bad",
        },
        them: {
          text: "Bảng điều khiển có thêm chục biểu đồ chi tiết về một đoạn của hành trình mà người dùng không phàn nàn. Câu hỏi vì sao khách thấy chậm vẫn không được trả lời.",
          ending: "bad",
        },
        moc: {
          text: "Số đo từ phía người dùng cho thấy nội dung hiện khá sớm nhưng phải rất lâu sau đó nút mới bấm được. Bạn chọn mốc nào làm mục tiêu?",
          choices: [
            { label: "Lúc trang nhận đủ mọi tài nguyên", next: "tainguyen" },
            { label: "Lúc người dùng thật sự thao tác được", next: "tot" },
            { label: "Lúc nội dung đầu tiên hiện ra", next: "noidung" },
          ],
        },
        tainguyen: {
          text: "Mốc này đạt mục tiêu nhưng trang vẫn chưa bấm được vì mã trình duyệt còn đang chạy. Nhận đủ tài nguyên không có nghĩa là dùng được, nên phiếu phàn nàn không giảm.",
          ending: "bad",
        },
        noidung: {
          text: "Nội dung hiện sớm, đạt mục tiêu, và nút vẫn đơ. Khách bực hơn trước vì họ nhìn thấy cái cần bấm mà không bấm được.",
          ending: "bad",
        },
        tot: {
          text: "Mục tiêu giờ nói cùng ngôn ngữ với lời phàn nàn của khách. Bạn kéo thời gian tới lúc bấm được xuống bằng cách giảm mã chạy trên trình duyệt, điều mà chỉ số bên trong máy chủ không bao giờ chỉ ra.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Hành trình của một cú bấm, và đoạn bạn thật sự đo được",
      steps: [
        { label: "Người dùng bấm vào liên kết", detail: "Đồng hồ của họ bắt đầu chạy ở đây. Đồng hồ của máy chủ chưa chạy." },
        { label: "Tìm địa chỉ và thiết lập kết nối", detail: "Phân giải tên miền, bắt tay kết nối. Chưa byte nội dung nào đi qua, và bảng điều khiển của máy chủ không thấy gì." },
        { label: "Máy chủ xử lý yêu cầu", detail: "Đây là đoạn hay được đo nhất vì nó nằm trong tầm kiểm soát, và với nhiều sản phẩm đó không phải đoạn lớn nhất." },
        { label: "Tải tài nguyên phụ", detail: "Bản định dạng, phông chữ, ảnh, mã. Mỗi cái là một vòng đi lại, và trang chưa dùng được dù mọi thứ đã bắt đầu về." },
        { label: "Chạy mã và dựng giao diện", detail: "Trình duyệt thực thi mã, dựng bố cục. Nội dung có thể đã hiện nhưng nút bấm chưa phản hồi." },
        { label: "Người dùng thao tác được", detail: "Mốc nên chọn. Nó đo một việc người dùng làm được, nên khớp với cách họ phàn nàn." },
      ],
    },
  ],

  "ho-so-hieu-nang": [
    {
      type: "exercise",
      language: "python",
      title: "Đọc hồ sơ hiệu năng: số lần gọi và thời gian mỗi lần",
      task: "Mỗi dòng của hồ sơ có tên hàm, số lần gọi và tổng thời gian (ms). In thời gian trung bình mỗi lần (ba chữ số thập phân) kèm nhận định: hàm gọi trên 10000 lần thì hỏi vì sao nó được gọi nhiều thế, còn lại thì giảm chờ đợi. Mẫu: truy_van_don_hang: 47.500 ms/lan -> giam cho doi. Mã khởi đầu in tổng thời gian và luôn kết luận giảm chờ đợi.",
      starter: `ho_so = [
    ("tinh_gia", 120000, 480),
    ("truy_van_don_hang", 40, 1900),
    ("dinh_dang_ngay", 90000, 360),
]
for ten, so_lan, tong_ms in ho_so:
    moi_lan = tong_ms
    print(f"{ten}: {moi_lan:.3f} ms/lan -> giam cho doi")
`,
      solution: `ho_so = [
    ("tinh_gia", 120000, 480),
    ("truy_van_don_hang", 40, 1900),
    ("dinh_dang_ngay", 90000, 360),
]
for ten, so_lan, tong_ms in ho_so:
    moi_lan = tong_ms / so_lan
    nhan = "hoi vi sao goi nhieu" if so_lan > 10000 else "giam cho doi"
    print(f"{ten}: {moi_lan:.3f} ms/lan -> {nhan}")
`,
      expectedOutput: `tinh_gia: 0.004 ms/lan -> hoi vi sao goi nhieu
truy_van_don_hang: 47.500 ms/lan -> giam cho doi
dinh_dang_ngay: 0.004 ms/lan -> hoi vi sao goi nhieu`,
      hints: ["Thời gian mỗi lần bằng tổng chia cho số lần gọi.", "Hàm gọi nhiều mà mỗi lần rẻ thường nằm trong một vòng lặp lồng; hàm gọi ít mà mỗi lần đắt thường là chờ."],
    },
    {
      type: "feynman",
      title: "Hồ sơ hiệu năng giống việc đọc nhật ký của một bếp nhà hàng",
      intro:
        "Hãy nghĩ tới một bếp bận rộn. Thời gian mỗi món ra bàn bị kéo dài bởi hai kiểu chuyện khác nhau: những việc nhỏ lặp đi lặp lại quá nhiều, và những việc ít nhưng phải chờ lâu. Cách sửa cho hai kiểu hoàn toàn khác nhau.",
      columns: ["Ở nhà hàng", "Trong hồ sơ hiệu năng", "Nên làm gì"],
      rows: [
        ["Phục vụ chạy lấy muối năm trăm lần mỗi giờ", "Gọi rất nhiều lần, mỗi lần rẻ", "Hỏi vì sao đi nhiều thế; thường là một vòng lặp lồng"],
        ["Một món nằm chờ lò nướng bốn mươi phút", "Gọi ít lần, mỗi lần đắt", "Giảm chờ đợi chứ không phải giảm thao tác tay"],
        ["Bếp trưởng đứng nhìn lò, tay không làm gì", "Bộ xử lý rảnh trong lúc chờ truy vấn", "Bảng tài nguyên xanh mà khách vẫn chờ; hãy đo thời gian trôi qua"],
        ["Thử công thức với nồi nhỏ ở nhà", "Đo trên dữ liệu mẫu nhỏ", "Chỗ chậm chỉ lộ ra ở nồi lớn; dùng dữ liệu cỡ thật"],
      ],
      oneLiner: "Đọc hồ sơ theo hai cột cùng nhau: số lần gọi cho biết vì sao, thời gian mỗi lần cho biết nên sửa kiểu nào.",
    },
  ],

  "tran-cua-viec-toi-uu": [
    {
      type: "exercise",
      language: "python",
      title: "Tính trần của một lần tối ưu",
      task: "Một bước chiếm `ty_trong` tổng thời gian và được làm nhanh gấp `gap` lần. Tổng thời gian thực sự giảm bao nhiêu phần trăm? Mẫu: 20% x10: giam 18.0%. Mã khởi đầu bỏ qua tỷ trọng và chỉ nhìn mức nhanh gấp bao nhiêu lần.",
      starter: `cac_ca = [(0.2, 10), (0.2, 1000000), (0.8, 2)]
for ty_trong, gap in cac_ca:
    giam = 1 - 1 / gap
    print(f"{ty_trong:.0%} x{gap}: giam {giam:.1%}")
`,
      solution: `cac_ca = [(0.2, 10), (0.2, 1000000), (0.8, 2)]
for ty_trong, gap in cac_ca:
    giam = ty_trong * (1 - 1 / gap)
    print(f"{ty_trong:.0%} x{gap}: giam {giam:.1%}")
`,
      expectedOutput: `20% x10: giam 18.0%
20% x1000000: giam 20.0%
80% x2: giam 40.0%`,
      hints: ["Chỉ phần ty_trong được làm nhanh; phần còn lại giữ nguyên.", "Phần bị cắt đi là ty_trong nhân với (1 trừ 1 chia gap)."],
    },
    {
      type: "chart",
      title: "Trần của lợi ích: tỷ trọng đặt giới hạn cho mức nhanh gấp",
      caption:
        "Số liệu minh hoạ tính từ công thức tỷ trọng và mức cải thiện. Kéo tỷ trọng của bước bạn tối ưu: đường tổng thể luôn nằm dưới trần, dù bước đó nhanh gấp bao nhiêu lần.",
      kind: "line",
      xLabel: "Bước được làm nhanh gấp (lần)",
      yLabel: "Cả hệ thống nhanh gấp (lần)",
      x: { from: 1, to: 20, step: 1 },
      params: [{ id: "s", label: "Bước đó chiếm bao nhiêu tổng thời gian", min: 10, max: 90, step: 5, value: 20, unit: "%" }],
      series: [
        { label: "Cả hệ thống nhanh gấp", expr: "1 / ((1 - s / 100) + (s / 100) / x)" },
        { label: "Trần không thể vượt", expr: "1 / (1 - s / 100)" },
      ],
    },
  ],

  "chi-phi-that-cua-mot-thao-tac": [
    {
      type: "exercise",
      language: "python",
      title: "Một lời gọi trong vòng lặp đắt cỡ nào",
      task: "Cần lấy dữ liệu cho 200 đơn hàng. Mỗi vòng gọi mạng tốn RTT ms, và tính toán mỗi đơn tốn TINH ms (cả hai là số minh hoạ). Hàm thoi_gian(so_don, gom) trả về tổng thời gian: gom=False là gọi mạng riêng cho từng đơn, gom=True là gọi một lần cho cả lô. Mã khởi đầu luôn tính theo cách gọi từng đơn.",
      starter: `RTT = 2
TINH = 0.01

def thoi_gian(so_don, gom):
    return so_don * RTT + so_don * TINH

print("tung don:", thoi_gian(200, False), "ms")
print("gom lo:", thoi_gian(200, True), "ms")
`,
      solution: `RTT = 2
TINH = 0.01

def thoi_gian(so_don, gom):
    if gom:
        return RTT + so_don * TINH
    return so_don * RTT + so_don * TINH

print("tung don:", thoi_gian(200, False), "ms")
print("gom lo:", thoi_gian(200, True), "ms")
`,
      expectedOutput: `tung don: 402.0 ms
gom lo: 4.0 ms`,
      hints: ["Khi gom lại, vòng gọi mạng chỉ trả một lần cho cả lô.", "Phần tính toán vẫn tỷ lệ với số đơn."],
    },
    {
      type: "chart",
      title: "Gọi mạng từng phần tử so với gom thành một lần",
      caption:
        "Số liệu minh hoạ: thời gian của một vòng gọi mạng và chi phí tính toán mỗi phần tử là giả định để thấy hình dạng. Điều đáng nhớ là mỗi vòng gọi mạng trong một vòng lặp được trả lại đủ một lần, nên đường đầu dốc theo số phần tử.",
      kind: "line",
      xLabel: "Số phần tử trong vòng lặp",
      yLabel: "Thời gian chờ (ms)",
      x: { from: 0, to: 500, step: 50 },
      params: [{ id: "rtt", label: "Thời gian một vòng gọi mạng (minh hoạ)", min: 0.5, max: 50, step: 0.5, value: 2, unit: "ms" }],
      series: [
        { label: "Gọi từng phần tử", expr: "x * (rtt + 0.01)" },
        { label: "Gom thành một lần", expr: "rtt + x * 0.01" },
      ],
    },
  ],

  "bo-nho-va-thu-gom-rac": [
    {
      type: "exercise",
      language: "python",
      title: "Trung bình giấu mất những yêu cầu chậm",
      task: "Có 100 yêu cầu: 98 yêu cầu mất 12 ms và hai yêu cầu mất 210 ms và 230 ms vì trùng lúc bộ thu gom dọn (số minh hoạ). In thời gian trung bình (hai chữ số thập phân) và p99, là phần tử thứ 99 sau khi sắp xếp tăng dần. Mã khởi đầu lấy phần tử giữa làm p99.",
      starter: `ms = [12] * 98 + [210, 230]
ms.sort()
tb = sum(ms) / len(ms)
p99 = ms[len(ms) // 2]
print(f"trung binh: {tb:.2f}")
print(f"p99: {p99}")
`,
      solution: `ms = [12] * 98 + [210, 230]
ms.sort()
tb = sum(ms) / len(ms)
p99 = ms[98]
print(f"trung binh: {tb:.2f}")
print(f"p99: {p99}")
`,
      expectedOutput: `trung binh: 16.16
p99: 210`,
      hints: ["Phần tử thứ 99 trong danh sách đánh số từ 1 nằm ở chỉ số 98.", "So hai con số: trung bình chỉ nhích nhẹ, còn p99 lộ ra hai yêu cầu chậm."],
    },
    {
      type: "flow",
      title: "Vòng đời một đối tượng, và lúc hoá đơn đến",
      steps: [
        { label: "Cấp phát", detail: "Thường chỉ là dịch một con trỏ nên gần như miễn phí. Vòng lặp tạo một triệu đối tượng trông không có gì đắt khi đọc mã." },
        { label: "Đối tượng chết sớm", detail: "Dùng xong trong cùng một yêu cầu. Bộ thu gom chỉ cần bỏ qua khi duyệt, nên đây là kiểu rác rẻ nhất." },
        { label: "Đối tượng sống dai", detail: "Bộ nhớ đệm giữ mọi thứ mãi mãi, nên những đối tượng này bị duyệt lại ở mỗi vòng dọn. Chi phí được trả nhiều lần." },
        { label: "Bộ thu gom dừng chương trình", detail: "Ở nhiều cấu hình, mọi yêu cầu đang chạy dừng lại trong lúc duyệt. Bạn không chọn được thời điểm." },
        { label: "Vài yêu cầu bị chậm", detail: "Chúng chậm hơn hàng trăm mili giây, trung bình gần như không nhích, nhưng phân vị cao thì lộ ra. Một phần trăm người dùng đang chờ." },
        { label: "Tạo ít rác hơn ở đường nóng", detail: "Dùng lại vùng đệm, tránh bản sao trung gian, xem lại bộ nhớ đệm. Chỉnh tham số chỉ đổi nhịp trả chi phí, không đổi lượng việc." },
      ],
    },
  ],

  "do-dinh-vi-du-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Duyệt theo hàng hay theo cột: đếm số lần đi lấy dữ liệu",
      task: "Bảng 4 hàng x 8 cột nằm trong bộ nhớ theo từng hàng một, và mỗi lần đi lấy mang về một khối 4 phần tử liền nhau. Giả sử bộ xử lý chỉ nhớ khối vừa lấy. Hàm dem_khoi đếm số lần phải đi lấy khối mới. Hãy tạo thứ tự duyệt theo cột cho `theo_cot`; mã khởi đầu chép lại thứ tự theo hàng.",
      starter: `HANG, COT, KHOI = 4, 8, 4

def dem_khoi(thu_tu):
    hien_tai, lan = None, 0
    for h, c in thu_tu:
        khoi = (h * COT + c) // KHOI
        if khoi != hien_tai:
            lan += 1
            hien_tai = khoi
    return lan

theo_hang = [(h, c) for h in range(HANG) for c in range(COT)]
theo_cot = theo_hang
print("theo hang:", dem_khoi(theo_hang))
print("theo cot:", dem_khoi(theo_cot))
`,
      solution: `HANG, COT, KHOI = 4, 8, 4

def dem_khoi(thu_tu):
    hien_tai, lan = None, 0
    for h, c in thu_tu:
        khoi = (h * COT + c) // KHOI
        if khoi != hien_tai:
            lan += 1
            hien_tai = khoi
    return lan

theo_hang = [(h, c) for h in range(HANG) for c in range(COT)]
theo_cot = [(h, c) for c in range(COT) for h in range(HANG)]
print("theo hang:", dem_khoi(theo_hang))
print("theo cot:", dem_khoi(theo_cot))
`,
      expectedOutput: `theo hang: 8
theo cot: 32`,
      hints: ["Duyệt theo cột nghĩa là vòng ngoài chạy qua cột, vòng trong chạy qua hàng.", "Cùng 32 phần tử, cùng số phép tính: chỉ số lần đi lấy dữ liệu đổi."],
    },
    {
      type: "feynman",
      title: "Bộ nhớ đệm giống chuyến đi mượn sách ở thư viện",
      intro:
        "Hãy nghĩ tới một thư viện chỉ cho bạn mượn theo từng ngăn kệ. Mỗi lần đi, bạn mang về cả ngăn kệ đó chứ không phải một cuốn. Nếu cuốn tiếp theo nằm cùng ngăn, nó đã nằm sẵn trên bàn bạn.",
      columns: ["Ở thư viện", "Trong bộ nhớ", "Hệ quả"],
      rows: [
        ["Mượn cả ngăn kệ một lần", "Bộ xử lý mang về cả khối quanh giá trị cần", "Phần tử kế tiếp đã có, không phải chờ"],
        ["Sách cần đọc xếp liền trên cùng một kệ", "Mảng liền nhau", "Một chuyến đi phục vụ cả chục bước lặp"],
        ["Mỗi cuốn nằm một toà nhà, có tờ chỉ đường", "Cấu trúc nhiều con trỏ", "Gần như mỗi bước là một chuyến đi mới"],
        ["Đọc xuyên qua các kệ theo hàng dọc", "Duyệt vuông góc với thứ tự bộ nhớ", "Mỗi bước rơi sang một khối khác"],
      ],
      oneLiner: "Cùng thuật toán, cùng số phép tính, nhưng dữ liệu nằm cạnh nhau là dữ liệu chỉ phải đi lấy một lần.",
    },
  ],

  "doc-ke-hoach-thuc-thi": [
    {
      type: "scenario",
      title: "Truy vấn mười mili giây bỗng mất bốn giây",
      start: "cham",
      nodes: {
        cham: {
          text: "Một truy vấn chạy mười mili giây suốt nhiều tháng, nay mất bốn giây. Tuần này không ai triển khai gì. Bạn làm gì trước?",
          choices: [
            { label: "Thêm ngay một chỉ mục lên cột đang lọc", next: "chimuc" },
            { label: "Chạy kèm thống kê thực tế và đọc kế hoạch", next: "doc" },
            { label: "Quay lại bản triển khai của tuần trước", next: "rollback" },
          ],
        },
        chimuc: {
          text: "Bạn thêm chỉ mục mà không biết bộ tối ưu có dùng nó không. Nếu nó không dùng, chỉ mục chỉ làm việc ghi chậm hơn, và truy vấn vẫn bốn giây.",
          ending: "bad",
        },
        rollback: {
          text: "Tuần trước không có triển khai nào, nên quay lại không thay đổi gì. Bạn mất một buổi và vẫn chưa biết nguyên nhân.",
          ending: "bad",
        },
        doc: {
          text: "Kế hoạch ước lượng chỉ vài dòng khớp, nhưng số thật là hàng triệu dòng. Bảng đã lớn qua một ngưỡng nên bộ tối ưu chọn cách khác dựa trên thống kê cũ. Bạn làm gì?",
          choices: [
            { label: "Cập nhật thống kê của bảng và kiểm lại kế hoạch", next: "tot" },
            { label: "Ép cơ sở dữ liệu luôn quét toàn bảng", next: "quet" },
            { label: "Ép mọi truy vấn phải đi qua chỉ mục", next: "ep" },
          ],
        },
        quet: {
          text: "Truy vấn này tạm ổn, nhưng các truy vấn lấy ít dòng cũng bị quét cả bảng. Chúng chậm đi theo kích thước bảng và lần sau bạn lại có một sự cố khác.",
          ending: "bad",
        },
        ep: {
          text: "Với truy vấn lấy phần lớn số dòng, việc nhảy về bảng ở mỗi dòng đắt hơn cả quét tuần tự. Bạn vừa làm chậm đúng những truy vấn đang chạy tốt.",
          ending: "bad",
        },
        tot: {
          text: "Ước lượng bám lại số thật, bộ tối ưu chọn lại cách rẻ nhất và truy vấn về mức cũ. Bạn cũng biết chỉ mục nào thực sự được dùng, và chỉ mục nào chỉ làm chậm việc ghi.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Từ một câu truy vấn đến kế hoạch thực thi",
      steps: [
        { label: "Bạn viết kết quả mong muốn", detail: "Truy vấn chỉ mô tả cái cần lấy, chẳng hạn các đơn của một khách trong tháng. Cách lấy do cơ sở dữ liệu quyết định." },
        { label: "Đọc thống kê của các bảng", detail: "Số dòng, độ phân bố giá trị của từng cột. Thống kê cũ thì ước lượng lệch, và sai lệch này là nguồn của nhiều chuyện chậm bất ngờ." },
        { label: "Ước lượng số dòng ở mỗi bước", detail: "Lọc theo cột này thì còn khoảng bao nhiêu dòng. Con số này quyết định nên đi qua chỉ mục hay quét tuần tự." },
        { label: "Chọn tổ hợp rẻ nhất theo ước lượng", detail: "Kế hoạch thực thi là bản in của quyết định ấy: thứ tự nối bảng, chỉ mục nào được dùng. Xem kế hoạch không thôi chỉ cho thấy ước lượng." },
        { label: "Chạy kèm thống kê thực tế", detail: "Bạn nhìn số dòng thật cạnh số dòng ước lượng. Chỗ lệch nhau nhiều lần là chỗ cần sửa." },
      ],
    },
  ],
};
