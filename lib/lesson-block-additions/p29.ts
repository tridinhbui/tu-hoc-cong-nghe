import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 29. Một người viết cho một tệp.
export const P29_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "case-tong-chi-phi-so-huu": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp hạng hai phương án bằng tổng chi phí sở hữu",
      task: "Hai phương án được cho bằng ba con số mỗi tháng (đơn vị triệu đồng, minh hoạ): tiền thuê, giờ vận hành và phần hạ tầng đã có mà phương án dùng lại được. Một giờ công tính 1 triệu. Mã khởi đầu mới chỉ so tiền thuê. Tính tổng chi phí sở hữu = thuê + giờ × đơn giá − dùng lại, rồi in phương án rẻ nhất.",
      starter: `DON_GIA_GIO = 1
phuong_an = {
    "Tự dựng": {"thue": 40, "gio": 70, "dung_lai": 12},
    "Quản lý sẵn": {"thue": 90, "gio": 4, "dung_lai": 0},
}
tco = {}
for ten, p in phuong_an.items():
    tco[ten] = p["thue"]
    print(f"{ten}: {tco[ten]} triệu")
re_nhat = min(tco, key=tco.get)
print("Rẻ nhất:", re_nhat)
`,
      solution: `DON_GIA_GIO = 1
phuong_an = {
    "Tự dựng": {"thue": 40, "gio": 70, "dung_lai": 12},
    "Quản lý sẵn": {"thue": 90, "gio": 4, "dung_lai": 0},
}
tco = {}
for ten, p in phuong_an.items():
    tco[ten] = p["thue"] + p["gio"] * DON_GIA_GIO - p["dung_lai"]
    print(f"{ten}: {tco[ten]} triệu")
re_nhat = min(tco, key=tco.get)
print("Rẻ nhất:", re_nhat)
`,
      expectedOutput: `Tự dựng: 98 triệu
Quản lý sẵn: 94 triệu
Rẻ nhất: Quản lý sẵn`,
      hints: [
        "Công thức có ba vế: giá thuê cộng công vận hành quy ra tiền, rồi trừ phần dùng lại được.",
        "Với tự dựng: 40 + 70 × 1 − 12. Thứ hạng đảo ngược so với khi chỉ nhìn bảng giá.",
      ],
    },
    {
      type: "chart",
      title: "Công vận hành đảo thứ hạng ở đâu",
      caption:
        "Số liệu minh hoạ: giá thuê và đơn giá giờ công ở đây chỉ để thấy hình dạng. Kéo đơn giá giờ công và nhìn điểm hai đường cắt nhau dịch chuyển: phương án tự dựng chỉ rẻ hơn khi công vận hành còn ít.",
      kind: "line",
      xLabel: "Giờ vận hành mỗi tháng của phương án tự dựng",
      yLabel: "Tổng chi phí sở hữu mỗi tháng (triệu)",
      x: { from: 0, to: 120, step: 10 },
      params: [{ id: "dongia", label: "Đơn giá một giờ công (minh hoạ)", min: 0.3, max: 2, step: 0.1, value: 1, unit: "triệu" }],
      series: [
        { label: "Tự dựng (thuê 40, dùng lại 12)", expr: "40 + x*dongia - 12" },
        { label: "Quản lý sẵn (thuê 90, 4 giờ)", expr: "90 + 4*dongia" },
      ],
    },
  ],

  "case-ty-le-trung-cache": [
    {
      type: "scenario",
      title: "Tỷ lệ trúng tụt sau một bản phát hành",
      start: "start",
      nodes: {
        start: {
          text: "Chiều nay có một bản phát hành. Tối đến, tỷ lệ trúng bộ nhớ đệm tụt từ 97% xuống 88%, CPU cơ sở dữ liệu tăng vọt. Không ai chạm vào cấu hình của lớp đệm. Bạn làm gì đầu tiên?",
          choices: [
            { label: "Tăng gấp đôi dung lượng bộ nhớ đệm cho rộng chỗ", next: "mem" },
            { label: "Xem bản phát hành có đổi cách sinh khoá đệm không", next: "keys" },
            { label: "Nâng cơ sở dữ liệu lên cỡ lớn hơn để chịu tải", next: "bigdb" },
          ],
        },
        mem: {
          text: "Dung lượng không phải vấn đề: khoá mới sinh ra không khớp khoá cũ nên request vẫn trượt dù đệm còn trống. Bạn trả thêm tiền cho bộ nhớ, tỷ lệ trúng vẫn nằm ở 88% và cơ sở dữ liệu vẫn quá tải vào giờ cao điểm hôm sau.",
          ending: "bad",
        },
        bigdb: {
          text: "Cơ sở dữ liệu lớn hơn hạ nhiệt được vài ngày, hoá đơn tăng cố định. Nguyên nhân vẫn còn nguyên, nên mỗi lần lưu lượng tăng thêm một chút thì lại phải nâng cỡ tiếp, trả tiền cho một lỗi không ai tìm.",
          ending: "bad",
        },
        keys: {
          text: "Đúng vậy: bản phát hành thêm tiền tố phiên bản vào khoá, nên mọi khoá cũ giờ không ai tra được và đệm đang nguội dần. Bạn xử lý thế nào?",
          choices: [
            { label: "Hoàn tác thay đổi khoá, rồi theo dõi tỷ lệ trượt", next: "alert" },
            { label: "Xoá sạch bộ nhớ đệm để nó nạp lại từ đầu cho sạch", next: "flush" },
          ],
        },
        flush: {
          text: "Đệm trống thì mọi request trượt cùng một lúc, và hàng nghìn request đổ thẳng xuống cơ sở dữ liệu đúng giờ cao điểm. Cơ sở dữ liệu quá tải, trang chậm hẳn trong nhiều phút trước khi đệm kịp nạp lại.",
          ending: "bad",
        },
        alert: {
          text: "Tỷ lệ trượt quay về 3%. Còn một việc để lần sau không phải chờ người dùng phàn nàn mới biết. Bạn đặt cảnh báo nào?",
          choices: [
            { label: "Cảnh báo khi tỷ lệ trúng dưới 80% tính theo ngưỡng tuyệt đối", next: "abs" },
            { label: "Cảnh báo khi tỷ lệ trượt lệch xa đường nền gần nhất", next: "ok" },
          ],
        },
        abs: {
          text: "Lần sau tỷ lệ tụt từ 97% xuống 85% vẫn nằm trên ngưỡng 80%, nên không có gì kêu. Cơ sở dữ liệu gánh gấp năm lần tải trong nhiều ngày trước khi ai đó để ý vì hoá đơn tăng.",
          ending: "bad",
        },
        ok: {
          text: "Tỷ lệ trượt đi từ 3% lên 12% là gấp bốn lần, và cảnh báo theo mức thay đổi bật trong vài phút sau lần phát hành kế. Lỗi được bắt lúc nó còn nhỏ.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Mỗi điểm phần trăm trúng cuối cùng đáng giá hơn nó trông",
      caption:
        "Số minh hoạ: tổng lưu lượng là giả định, bạn kéo thanh trượt để thay. Điều cần thấy là hình dạng: tải xuống cơ sở dữ liệu giảm một nửa mỗi khi tỷ lệ trượt giảm một nửa, dù trục tỷ lệ trúng chỉ nhích rất ít.",
      kind: "bar",
      xLabel: "Tỷ lệ trúng của bộ nhớ đệm (%)",
      yLabel: "Request mỗi giây chạm cơ sở dữ liệu",
      x: { from: 90, to: 99, step: 1 },
      params: [{ id: "rps", label: "Tổng request mỗi giây (minh hoạ)", min: 5000, max: 50000, step: 5000, value: 20000, unit: "req/s" }],
      series: [{ label: "Tải xuống cơ sở dữ liệu", expr: "rps*(1 - x/100)" }],
    },
  ],

  "chi-phi-co-dinh-va-theo-luong-dung": [
    {
      type: "exercise",
      language: "python",
      title: "Gói trả cố định, chi phí theo lần gọi: ai đang lỗ",
      task: "Gói giá 200 nghìn mỗi người mỗi tháng, cố định. Chi phí cố định 30.000 nghìn chia cho 500 người (minh hoạ), cộng 0,5 nghìn cho mỗi lần gọi dịch vụ ngoài. Mã khởi đầu mới chỉ tính phần cố định. Thêm phần theo lượng dùng để thấy nhóm nào đang lỗ.",
      starter: `GIA_GOI = 200
CHI_PHI_CO_DINH = 30000
NGUOI_DUNG = 500
DON_GIA_LAN = 0.5
lo = 0
for ten, so_lan in (("Nhẹ", 100), ("Vừa", 300), ("Nặng", 600)):
    chi_phi = CHI_PHI_CO_DINH / NGUOI_DUNG
    lai = GIA_GOI - chi_phi
    print(f"{ten}: lãi {lai:.0f} nghìn")
    if lai < 0:
        lo += 1
print(f"Số nhóm đang lỗ: {lo}/3")
`,
      solution: `GIA_GOI = 200
CHI_PHI_CO_DINH = 30000
NGUOI_DUNG = 500
DON_GIA_LAN = 0.5
lo = 0
for ten, so_lan in (("Nhẹ", 100), ("Vừa", 300), ("Nặng", 600)):
    chi_phi = CHI_PHI_CO_DINH / NGUOI_DUNG + so_lan * DON_GIA_LAN
    lai = GIA_GOI - chi_phi
    print(f"{ten}: lãi {lai:.0f} nghìn")
    if lai < 0:
        lo += 1
print(f"Số nhóm đang lỗ: {lo}/3")
`,
      expectedOutput: `Nhẹ: lãi 90 nghìn
Vừa: lãi -10 nghìn
Nặng: lãi -160 nghìn
Số nhóm đang lỗ: 2/3`,
      hints: [
        "Chi phí mỗi người gồm hai phần: phần cố định chia đầu người và phần số lần gọi nhân đơn giá.",
        "Nhóm Vừa trông gần hoà vốn, nhưng chỉ cần thêm vài chục lần gọi là đã lỗ.",
      ],
    },
    {
      type: "chart",
      title: "Doanh thu phẳng, chi phí dốc lên",
      caption:
        "Số minh hoạ. Đường doanh thu nằm ngang vì người dùng trả cố định; đường chi phí bắt đầu từ phần cố định chia đầu người rồi dốc theo số lần gọi. Kéo đơn giá mỗi lần gọi để dời điểm hai đường cắt nhau: sau điểm đó, người dùng càng tích cực bạn càng lỗ.",
      kind: "line",
      xLabel: "Số lần gọi dịch vụ ngoài của một người mỗi tháng",
      yLabel: "Nghìn đồng mỗi người mỗi tháng",
      x: { from: 0, to: 600, step: 50 },
      params: [{ id: "c", label: "Chi phí mỗi lần gọi (minh hoạ)", min: 0.1, max: 1, step: 0.1, value: 0.5, unit: "nghìn" }],
      series: [
        { label: "Doanh thu mỗi người (gói cố định)", expr: "200" },
        { label: "Chi phí mỗi người", expr: "60 + x*c" },
      ],
    },
  ],

  "chia-chi-phi-dich-vu-dung-chung": [
    {
      type: "scenario",
      title: "Chia hoá đơn của nền tảng dùng chung",
      start: "start",
      nodes: {
        start: {
          text: "Nền tảng dùng chung tốn 120 triệu mỗi tháng. Ba đội dùng nó với tỷ lệ khoảng 70%, 20% và 10% (số đo thô), nhưng đội nhỏ nhất lại đông người nhất. Bạn chia hoá đơn thế nào?",
          choices: [
            { label: "Chia đều mỗi đội 40 triệu, cho nhanh và ít cãi nhau", next: "equal" },
            { label: "Chia theo số người của đội, nghe có vẻ công bằng nhất", next: "headcount" },
            { label: "Chia theo lượng dùng đo được, kèm bảng gửi hằng tháng", next: "measured" },
          ],
        },
        equal: {
          text: "Đội dùng 10% trả y như đội dùng 70%, nên đội nặng nhất học được bài học sai: dùng thêm không tốn thêm gì. Ba tháng sau lượng dùng của họ tăng gấp rưỡi, hoá đơn chung phình ra và không đội nào có lý do cắt bớt.",
          ending: "bad",
        },
        headcount: {
          text: "Đội đông người nhất trả nhiều nhất dù hầu như không đụng tới nền tảng, còn đội dùng nhiều nhất trả ít vì ít người. Đội bị tính oan bắt đầu tự dựng bản riêng, còn lượng dùng của đội nặng vẫn không đổi.",
          ending: "bad",
        },
        measured: {
          text: "Mỗi đội thấy phần của mình mỗi tháng và hành vi bắt đầu đổi mà không cần ai đi nhắc. Một chuyện khác nảy ra: đội nền tảng nói họ chỉ được nhắc tên khi có sự cố. Báo cáo hằng tháng nên có gì?",
          choices: [
            { label: "Chỉ báo số sự cố, vì đó là điều mọi người quan tâm", next: "onlyfail" },
            { label: "Bỏ phần sự cố ra khỏi báo cáo để bớt tiếng ồn", next: "hide" },
            { label: "Số sự cố cùng số lần phát hành chạy qua nền tảng", next: "both" },
          ],
        },
        onlyfail: {
          text: "Bảng chỉ hiện những ngày xấu, nên đội nền tảng chỉ tồn tại vào những ngày xấu. Hai kỹ sư giỏi nhất xin chuyển sang đội sản phẩm trong quý đó, và vị trí của họ rất khó tuyển lại.",
          ending: "bad",
        },
        hide: {
          text: "Bảng sạch hơn nhưng các đội sản phẩm thấy sự cố trên kênh chat mà không thấy trong báo cáo, và họ bắt đầu nghi ngờ mọi con số khác trong đó. Niềm tin vào bảng chi phí sụp theo.",
          ending: "bad",
        },
        both: {
          text: "Bảng hiện cả những ngày xấu lẫn khối lượng việc đội nền tảng gánh hộ, với cùng mức nổi bật. Bức tranh cân: các đội sản phẩm thấy giá trị, đội nền tảng được ghi công, và chi phí đã gắn đúng người tạo ra nó.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Chia hoá đơn như chia tiền điện phòng trọ",
      intro:
        "Một dãy phòng trọ chung một công tơ. Chủ trọ có thể chia đều, chia theo số người ở, hoặc lắp công tơ riêng cho từng phòng. Cả ba đều thu đủ tổng tiền điện của tháng, nhưng mỗi cách dạy người ở một thói quen khác.",
      columns: ["Cách chia", "Giống như", "Thói quen nó dạy"],
      rows: [
        ["Chia đều", "Mọi phòng trả cùng số tiền", "Bật máy lạnh cả ngày cũng không tốn thêm, nên không ai có lý do tắt"],
        ["Theo quy mô đội", "Chia theo số người ở mỗi phòng", "Phòng đông nhưng đi vắng cả ngày vẫn trả nhiều, nên tạo ra bực bội thay vì tiết kiệm"],
        ["Theo lượng đo", "Mỗi phòng một công tơ", "Ai bật nhiều trả nhiều, hành vi đổi mà không cần nhắc, đổi lại phải tốn công lắp công tơ"],
      ],
      oneLiner: "Cả ba cách chia đúng tổng số tiền; chỉ cách gắn con số với lượng dùng thật mới đổi được hành vi.",
    },
  ],

  "so-lieu-giua-ky-va-thay-doi-an": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản tóm tắt tuần của AI có ba chỗ đọc sai số liệu",
      task: "AI viết bản tóm tắt tuần từ bảng điều khiển. Bấm các đoạn bạn cho là đọc sai số liệu giữa kỳ hoặc bỏ sót thay đổi ẩn, rồi nộp. Có đoạn đúng, đừng bấm hết.",
      segments: [
        {
          text: "Độ trễ trung bình tuần này tăng 6% so với tuần trước, đây là thay đổi cần xử lý ngay trước thứ Sáu.",
          error: "Một tuần dao động mạnh hơn nhiều so với cả quý, và phần dao động thêm đó hầu hết là nhiễu. Mức 6% trong một tuần chưa đáng phản ứng, nó chỉ đáng khi kéo dài.",
        },
        { text: "Tổng số yêu cầu mỗi ngày gần như phẳng trong sáu tuần qua, quanh mức 1,2 triệu." },
        {
          text: "Vì tổng số yêu cầu phẳng, cơ cấu người dùng chắc chắn không đổi và các giả định về tải vẫn còn nguyên giá trị.",
          error: "Tổng phẳng có thể là một thành phần tăng bù đúng cho một thành phần giảm, ví dụ người dùng cũ giảm bằng người dùng mới tăng. Hai nhóm dùng hệ thống rất khác nhau, nên giả định về tải có thể đã hết hạn.",
        },
        { text: "Cần tách theo nhóm, ví dụ người dùng cũ và mới, hoặc theo vùng, trước khi kết luận rằng tải đang ổn định." },
        {
          text: "Trung vị độ trễ đứng yên ở mức cũ, nên không cần xem thêm phân vị 99.",
          error: "Trung vị đứng yên vẫn cho phép nhóm chậm nhất chậm dần đi. Thay đổi ở phần đuôi không đi qua trung vị, nên phải xem riêng các phân vị cao.",
        },
        { text: "Nên đặt cạnh độ trễ một chỉ số về chi phí để giữ nó, vì chi phí có thể tăng đều mỗi tháng trong khi biểu đồ độ trễ vẫn phẳng." },
      ],
    },
    {
      type: "flow",
      title: "Cuộc rà soát quý tìm thứ biểu đồ không thấy",
      steps: [
        {
          label: "Lùi ra đủ xa",
          detail: "Mở chỉ số chính theo quý thay vì theo tuần. Nếu đường chỉ gợn nhẹ quanh một mức, bạn vừa loại được phần lớn các lo lắng đến từ nhiễu trước khi đào sâu.",
        },
        {
          label: "Tách theo phân vị",
          detail: "Đặt trung vị cạnh phân vị 95 và 99 trên cùng một trục thời gian. Nếu trung vị phẳng mà phân vị 99 dốc lên, một nhóm nhỏ đang chậm dần mà trung bình không bao giờ báo.",
        },
        {
          label: "Tách theo nhóm",
          detail: "Chia tổng yêu cầu theo loại người dùng và theo vùng. Hai đường đi ngược chiều nhau bù trừ thành một tổng phẳng là dấu hiệu thành phần đã đổi.",
        },
        {
          label: "Đặt chi phí bên cạnh",
          detail: "Vẽ chi phí để giữ chỉ số ở mức đó cùng một trang. Chỉ số giữ nguyên trong khi chi phí tăng đều là thay đổi ở nền, và không ngưỡng cảnh báo nào bắt được nó.",
        },
        {
          label: "Hỏi thẳng một câu",
          detail: "Cuối buổi hỏi cả nhóm: điều gì đã đổi mà biểu đồ của chúng ta không thấy? Ghi câu trả lời, kể cả khi là chưa biết, thành việc cho quý sau.",
        },
      ],
    },
  ],

  "case-tinh-phi-ha-tang-noi-bo": [
    {
      type: "exercise",
      language: "python",
      title: "Chia hoá đơn hạ tầng theo mức dùng đo được",
      task: "Hoá đơn tháng là 100 triệu (minh hoạ). Mức dùng đo được tính bằng giờ máy: ba đội có nhãn, còn một phần chưa gắn được nhãn nào. Mã khởi đầu chia đều cho ba đội và làm phần chưa quy được biến mất. Sửa để mỗi dòng bằng hoá đơn nhân phần giờ máy của chính nó, kể cả dòng chưa quy được, và tổng cuối cùng khớp hoá đơn.",
      starter: `hoa_don = 100
su_dung = {"Đội A": 400, "Đội B": 250, "Đội C": 150, "Chưa quy được": 200}
so_doi = 3
tong_thu = 0
for ten in su_dung:
    phan = hoa_don / so_doi
    tong_thu += phan
    print(f"{ten}: {phan:.0f} triệu")
print(f"Tổng: {tong_thu:.0f} triệu")
`,
      solution: `hoa_don = 100
su_dung = {"Đội A": 400, "Đội B": 250, "Đội C": 150, "Chưa quy được": 200}
tong_gio = sum(su_dung.values())
tong_thu = 0
for ten in su_dung:
    phan = hoa_don * su_dung[ten] / tong_gio
    tong_thu += phan
    print(f"{ten}: {phan:.0f} triệu")
print(f"Tổng: {tong_thu:.0f} triệu")
`,
      expectedOutput: `Đội A: 40 triệu
Đội B: 25 triệu
Đội C: 15 triệu
Chưa quy được: 20 triệu
Tổng: 100 triệu`,
      hints: [
        "Phần của mỗi dòng là hoá đơn nhân giờ máy của nó, chia cho tổng giờ máy của cả bốn dòng.",
        "Đừng rải phần chưa quy được cho ba đội cho đủ số. Giữ nó thành một dòng riêng để ai cũng thấy việc gắn nhãn còn thiếu bao nhiêu.",
      ],
    },
    {
      type: "feynman",
      title: "Ba cách làm đội bớt tiêu tài nguyên",
      intro:
        "Hãy nghĩ tới một tầng nhà chung một tủ lạnh trong văn phòng. Có thể khoá từng ngăn, có thể dán tên và hoá đơn của từng người lên cửa tủ, hoặc cứ để mọi người tự nhiên. Ba cách ấy đổi hành vi theo ba hướng khác nhau.",
      columns: ["Cách làm", "Giống như", "Điều thường xảy ra"],
      rows: [
        ["Hạn mức cứng", "Khoá mỗi người một ngăn", "Chặn được chi tiêu, nhưng chặn cả lúc cần thật, và người ta bắt đầu mượn ngăn của người khác"],
        ["Công khai bảng chi phí", "Dán hoá đơn từng người lên cửa tủ", "Không cấm gì, chỉ làm con số hiện cạnh tên đội; chậm hơn nhưng hành vi đổi và không có trò lách"],
        ["Để hoá đơn gộp một chỗ", "Không ai thấy phần của mình", "Mỗi đội hưởng trọn lợi ích, chi phí chia đều cả công ty, nên mọi đội đều quyết định giống nhau"],
      ],
      oneLiner: "Hạn mức chặn chi tiêu, còn bảng chi phí đổi hành vi, vì nó đặt thông tin cạnh người có quyền quyết định.",
    },
  ],

  "ty-le-no-ky-thuat": [
    {
      type: "exercise",
      language: "python",
      title: "Chia nợ cho năng lực dọn thật, không phải năng lực hứa",
      task: "Mỗi quý có nợ đã ghi lại và năng lực dọn thật (đơn vị người-ngày, minh hoạ). Mã khởi đầu chia cho mức năng lực 30 đã hứa trên giấy ở mọi quý. Chia cho năng lực thật của từng quý, phân loại (dưới 2 quý là lành, 2 đến 4 cần kế hoạch, trên 4 khó thoát) và in xu hướng.",
      starter: `quy = [("Q1", 54, 30), ("Q2", 66, 22), ("Q3", 72, 16)]
NANG_LUC_HUA = 30
ty_le = []
for ten, no, nang_luc in quy:
    r = no / NANG_LUC_HUA
    ty_le.append(r)
    if r < 2:
        nhan = "lành"
    elif r <= 4:
        nhan = "cần kế hoạch"
    else:
        nhan = "khó thoát"
    print(f"{ten}: {r:.1f} quý - {nhan}")
print("Xu hướng:", "xấu đi" if ty_le[-1] > ty_le[0] else "khá lên")
`,
      solution: `quy = [("Q1", 54, 30), ("Q2", 66, 22), ("Q3", 72, 16)]
ty_le = []
for ten, no, nang_luc in quy:
    r = no / nang_luc
    ty_le.append(r)
    if r < 2:
        nhan = "lành"
    elif r <= 4:
        nhan = "cần kế hoạch"
    else:
        nhan = "khó thoát"
    print(f"{ten}: {r:.1f} quý - {nhan}")
print("Xu hướng:", "xấu đi" if ty_le[-1] > ty_le[0] else "khá lên")
`,
      expectedOutput: `Q1: 1.8 quý - lành
Q2: 3.0 quý - cần kế hoạch
Q3: 4.5 quý - khó thoát
Xu hướng: xấu đi`,
      hints: [
        "Mẫu số là phần dọn thật sự hoàn thành trong quý đó, và nó đổi theo từng quý.",
        "Nợ tăng từ 54 lên 72 nghe chậm, nhưng năng lực dọn giảm từ 30 xuống 16 mới là thứ đẩy tỷ lệ vượt 4 quý.",
      ],
    },
    {
      type: "chart",
      title: "Cùng một khoản nợ, năng lực dọn quyết định bao lâu mới hết",
      caption:
        "Số minh hoạ: khoản nợ tính bằng người-ngày và là giả định. Kéo thanh trượt nợ để thấy một khoản nợ chưa đổi vẫn vượt ngưỡng 4 quý khi năng lực dọn thật chỉ còn rất ít.",
      kind: "line",
      xLabel: "Năng lực dọn thật mỗi quý (người-ngày)",
      yLabel: "Số quý để dọn hết nợ",
      x: { from: 5, to: 45, step: 5 },
      params: [{ id: "no", label: "Nợ kỹ thuật đã ghi lại (minh hoạ)", min: 20, max: 120, step: 10, value: 70, unit: "người-ngày" }],
      series: [
        { label: "Nợ chia cho năng lực dọn", expr: "no/x" },
        { label: "Ngưỡng 4 quý", expr: "4" },
      ],
    },
  ],

  "dong-tai-nguyen-san-pham-tang-nhanh": [
    {
      type: "scenario",
      title: "Chi phí hạ tầng gấp ba trong một năm",
      start: "start",
      nodes: {
        start: {
          text: "Sản phẩm tăng người dùng gấp đôi trong năm, trong khi chi phí hạ tầng tăng gấp ba. Giám đốc hỏi bạn nên làm gì. Phản ứng đầu tiên của bạn là gì?",
          choices: [
            { label: "Dừng mọi khoản dựng sẵn ngay để kéo chi phí xuống", next: "freeze" },
            { label: "Để tăng trưởng nhanh thì chi phí xấu cũng bình thường", next: "wait" },
            { label: "Tách chi phí mỗi yêu cầu và phần dung lượng đang rảnh", next: "split" },
          ],
        },
        freeze: {
          text: "Phần dung lượng dựng sẵn vốn đúng kế hoạch và sẽ tự hết khi lượng dùng bắt kịp. Bạn cắt nó đi, ba tháng sau đợt tăng lưu lượng kế tiếp chạm trần và trang chậm đúng lúc sản phẩm đang được chú ý nhất.",
          ending: "bad",
        },
        wait: {
          text: "Một phần chi phí này sẽ không tự hết, vì mỗi tính năng mới đã thêm một lời gọi vào đường đi chính. Một năm sau mỗi yêu cầu chạm vào gần gấp đôi số dịch vụ so với trước, và không ai có thể chỉ ra quyết định nào sai.",
          ending: "bad",
        },
        split: {
          text: "Số đo cho thấy khoảng một phần ba hạ tầng đang rảnh vì dựng sẵn, còn mỗi yêu cầu giờ gọi 9 dịch vụ thay vì 4 của năm trước. Bạn xử lý hai phần đó ra sao?",
          choices: [
            { label: "Cắt phần rảnh về không, và giảm đều mọi khoản 20%", next: "cut" },
            { label: "Giữ phần rảnh có theo dõi, rà các lời gọi thêm vào", next: "revisit" },
          ],
        },
        cut: {
          text: "Hai loại chi phí cần hai cách xử lý ngược nhau, và bạn vừa gộp chúng. Phần rảnh biến mất đúng lúc cần, còn lời gọi thừa vẫn nằm nguyên trong đường đi chính và tiếp tục phình khi lượng dùng tăng.",
          ending: "bad",
        },
        revisit: {
          text: "Hai quý sau, phần rảnh đã giảm tự nhiên và chi phí mỗi yêu cầu bắt đầu hạ. Đến quý thứ năm, báo cáo vẫn giải thích chi phí cao bằng cụm từ đầu tư dựng sẵn y như quý đầu. Bạn nghĩ gì?",
          choices: [
            { label: "Chấp nhận, vì lời giải thích đã đúng từ đầu năm", next: "same" },
            { label: "Đòi tách lại số liệu, vì giai đoạn dựng sẵn phải có điểm kết", next: "ok" },
          ],
        },
        same: {
          text: "Lời giải thích không đổi qua năm quý là dấu hiệu nguyên nhân đã khác mà câu chữ thì chưa. Phần kém hiệu quả lớn dần dưới cái tên cũ cho tới khi hoá đơn không còn giải thích nổi nữa.",
          ending: "bad",
        },
        ok: {
          text: "Số liệu tách lại cho thấy dựng sẵn đã hết từ quý ba, còn lại là kém hiệu quả của các lời gọi thêm. Đội dừng lại sửa đúng phần đó, và chi phí mỗi yêu cầu bắt đầu giảm thật.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Mỗi tính năng thêm một lời gọi, và chi phí mỗi yêu cầu leo lên",
      caption:
        "Số minh hoạ: ban đầu một yêu cầu gọi 4 dịch vụ, rồi mỗi tháng thêm một lượng lời gọi bạn chọn. Đơn giá mỗi lời gọi là tương đối. Không lần thêm nào đáng phản đối riêng lẻ, nhưng đường cộng dồn thì khác.",
      kind: "line",
      xLabel: "Tháng kể từ đầu năm",
      yLabel: "Chi phí mỗi yêu cầu (đơn vị tương đối)",
      x: { from: 0, to: 12, step: 1 },
      params: [
        { id: "g", label: "Số lời gọi thêm mỗi tháng (minh hoạ)", min: 0, max: 1, step: 0.1, value: 0.6 },
        { id: "gia", label: "Chi phí một lời gọi (tương đối)", min: 1, max: 5, step: 1, value: 1 },
      ],
      series: [{ label: "Chi phí mỗi yêu cầu", expr: "(4 + g*x)*gia" }],
    },
  ],

  "case-tach-do-tre-thanh-phan": [
    {
      type: "exercise",
      language: "python",
      title: "Tách độ trễ 500 ms thành từng chặng",
      task: "Một request mất tổng 500 ms, chia ra bốn chặng (số minh hoạ). Mã khởi đầu in tỷ lệ chưa nhân với 100 và chọn nhầm chặng nhỏ nhất. Sửa để in phần trăm mỗi chặng, chỉ ra chặng cần sửa trước, rồi tính tổng độ trễ nếu chặng đó giảm còn 40 ms.",
      starter: `chang = {"Xử lý": 22, "Chờ phụ thuộc": 31, "Truy vấn dữ liệu": 440, "Dựng phản hồi": 7}
tong = sum(chang.values())
for ten, ms in chang.items():
    ty = ms / tong
    print(f"{ten}: {ty:.0f}%")
lon_nhat = min(chang, key=chang.get)
print("Sửa trước:", lon_nhat)
con_lai = tong - chang[lon_nhat] + 40
print(f"Sau khi chặng đó còn 40 ms: tổng {con_lai} ms, nhanh gấp {tong / con_lai:.1f} lần")
`,
      solution: `chang = {"Xử lý": 22, "Chờ phụ thuộc": 31, "Truy vấn dữ liệu": 440, "Dựng phản hồi": 7}
tong = sum(chang.values())
for ten, ms in chang.items():
    ty = ms / tong * 100
    print(f"{ten}: {ty:.0f}%")
lon_nhat = max(chang, key=chang.get)
print("Sửa trước:", lon_nhat)
con_lai = tong - chang[lon_nhat] + 40
print(f"Sau khi chặng đó còn 40 ms: tổng {con_lai} ms, nhanh gấp {tong / con_lai:.1f} lần")
`,
      expectedOutput: `Xử lý: 4%
Chờ phụ thuộc: 6%
Truy vấn dữ liệu: 88%
Dựng phản hồi: 1%
Sửa trước: Truy vấn dữ liệu
Sau khi chặng đó còn 40 ms: tổng 100 ms, nhanh gấp 5.0 lần`,
      hints: [
        "Phần trăm = thời gian chặng chia tổng, rồi nhân 100.",
        "Chặng đáng sửa trước là chặng lớn nhất, không phải chặng trông rối nhất hay nhỏ nhất.",
      ],
    },
    {
      type: "chart",
      title: "Sửa đúng chặng thay vì sửa chặng trông rối nhất",
      caption:
        "Số liệu minh hoạ cho một request 500 ms. Cột thứ hai giả định chỉ chặng truy vấn được sửa còn 40 ms; ba chặng còn lại giữ nguyên. Bốn hướng sửa còn lại gộp lại cũng không đáng kể bằng một hướng đúng.",
      kind: "bar",
      xLabel: "Chặng trong request",
      yLabel: "Thời gian (ms)",
      seriesLabels: ["Trước khi sửa", "Sau khi sửa chặng truy vấn"],
      data: [
        { label: "Xử lý", values: [22, 22] },
        { label: "Chờ phụ thuộc", values: [31, 31] },
        { label: "Truy vấn dữ liệu", values: [440, 40] },
        { label: "Dựng phản hồi", values: [7, 7] },
      ],
    },
  ],

  "slo-cam-ket-do-tin-cay": [
    {
      type: "exercise",
      language: "python",
      title: "Ngân sách lỗi còn lại và nhịp tiêu",
      task: "SLO 99,9% cho kỳ 30 ngày. Hai sự cố đã tiêu 18 và 12 phút, và kỳ mới trôi qua 10 ngày. Ngân sách lỗi là phần được phép hỏng, tức (100 − SLO)%, không phải phần SLO. Sửa dòng tính ngân sách trong mã khởi đầu rồi đọc nhịp tiêu: lớn hơn 1 nghĩa là đang tiêu nhanh hơn kỳ trôi.",
      starter: `PHUT_KY = 30 * 24 * 60
slo = 99.9
su_co = [18, 12]
ngay_troi_qua = 10
ngan_sach = PHUT_KY * slo / 100
da_tieu = sum(su_co)
ty_le_tieu = da_tieu / ngan_sach
nhip = ty_le_tieu / (ngay_troi_qua / 30)
print(f"Ngân sách lỗi: {ngan_sach:.1f} phút")
print(f"Đã tiêu: {da_tieu} phút ({ty_le_tieu * 100:.0f}%)")
print(f"Còn lại: {ngan_sach - da_tieu:.1f} phút")
print(f"Nhịp tiêu: {nhip:.1f} lần mức đều")
if nhip > 1:
    print("Tiêu nhanh hơn kỳ trôi: cân nhắc dừng phát hành")
`,
      solution: `PHUT_KY = 30 * 24 * 60
slo = 99.9
su_co = [18, 12]
ngay_troi_qua = 10
ngan_sach = PHUT_KY * (100 - slo) / 100
da_tieu = sum(su_co)
ty_le_tieu = da_tieu / ngan_sach
nhip = ty_le_tieu / (ngay_troi_qua / 30)
print(f"Ngân sách lỗi: {ngan_sach:.1f} phút")
print(f"Đã tiêu: {da_tieu} phút ({ty_le_tieu * 100:.0f}%)")
print(f"Còn lại: {ngan_sach - da_tieu:.1f} phút")
print(f"Nhịp tiêu: {nhip:.1f} lần mức đều")
if nhip > 1:
    print("Tiêu nhanh hơn kỳ trôi: cân nhắc dừng phát hành")
`,
      expectedOutput: `Ngân sách lỗi: 43.2 phút
Đã tiêu: 30 phút (69%)
Còn lại: 13.2 phút
Nhịp tiêu: 2.1 lần mức đều
Tiêu nhanh hơn kỳ trôi: cân nhắc dừng phát hành`,
      hints: [
        "Ngân sách lỗi = (1 − SLO) × thời gian kỳ. Với 99,9% thì chỉ 0,1% thời gian kỳ được phép hỏng.",
        "Đã dùng 69% ngân sách khi mới trôi 33% của kỳ, nên nhịp tiêu vượt xa 1.",
      ],
    },
    {
      type: "chart",
      title: "Mỗi số chín thêm vào làm ngân sách lỗi co lại mười lần",
      caption:
        "Số liệu tính từ công thức cho kỳ 30 ngày, phần sự cố đã tiêu là giả định bạn kéo. Hãy để ý: ngân sách ở 99,9% chỉ khoảng 43 phút, nên một sự cố vừa đã ăn gần hết.",
      kind: "bar",
      xLabel: "SLO (%)",
      yLabel: "Phút được phép hỏng mỗi kỳ 30 ngày",
      x: { from: 99, to: 99.9, step: 0.1 },
      params: [{ id: "tieu", label: "Phút hỏng đã tiêu trong kỳ (minh hoạ)", min: 0, max: 200, step: 10, value: 30, unit: "phút" }],
      series: [
        { label: "Ngân sách lỗi cả kỳ", expr: "(100 - x)/100*43200" },
        { label: "Còn lại sau khi trừ đã tiêu", expr: "max(0, (100 - x)/100*43200 - tieu)" },
      ],
    },
  ],

  "case-doc-bao-cao-su-co": [
    {
      type: "scenario",
      title: "Đọc bản tổng kết sự cố của người khác",
      start: "start",
      nodes: {
        start: {
          text: "Một công ty khác công bố tổng kết sự cố: chứng chỉ hết hạn lúc 02:10, API của họ ngừng khoảng 40 phút. Bạn có nửa giờ để rút ra điều gì đó cho đội mình. Bạn đọc theo hướng nào?",
          choices: [
            { label: "Đọc để biết chuyện gì xảy ra, rồi gửi cả đội đọc cho vui", next: "story" },
            { label: "Ghi lại nguyên nhân gốc và thêm nhắc gia hạn chứng chỉ", next: "root" },
            { label: "Đọc dòng thời gian và tìm lớp phòng thủ bị hụt", next: "layers" },
          ],
        },
        story: {
          text: "Cả đội đọc xong, kết luận là công ty đó bất cẩn, rồi quay lại việc cũ. Không thay đổi nào ở hệ thống của bạn, và sáu tháng sau một lỗi nhìn hơi khác nhưng cùng hình dạng xảy ra với bạn.",
          ending: "bad",
        },
        root: {
          text: "Bạn thêm một nhắc nhở cho chứng chỉ. Tháng sau một khoá truy cập khác hết hạn, đi đúng đường cũ: không cảnh báo nào tới được người trực, không ai biết trong gần một giờ. Nguyên nhân gốc khác, chuỗi hụt lớp thì y hệt.",
          ending: "bad",
        },
        layers: {
          text: "Dòng thời gian: cảnh báo bật lúc 02:12 nhưng chỉ gửi vào kênh không ai theo dõi ban đêm. Có người biết lúc 02:50, và sửa xong lúc 02:55. Câu hỏi nào đáng ghi nhất?",
          choices: [
            { label: "Ai phụ trách chứng chỉ và vì sao họ quên gia hạn", next: "blame" },
            { label: "Vì sao mất 40 phút để có người biết, chỉ 5 để sửa", next: "gap" },
          ],
        },
        blame: {
          text: "Cuộc trò chuyện chuyển sang truy trách nhiệm một cá nhân. Điều bạn học được là một cái tên, và bản tổng kết không còn dạy gì về hệ thống. Người trực ngần ngại nhận lỗi ở sự cố sau.",
          ending: "bad",
        },
        gap: {
          text: "Khoảng cách 40 phút so với 5 phút chỉ ra lớp hụt là phát hiện, không phải sửa chữa. Đến lúc áp vào hệ thống của bạn, bạn kiểm tra điều gì trước?",
          choices: [
            { label: "Chờ xem công ty kia công bố hành động khắc phục để sao chép", next: "copy" },
            { label: "Kiểm tra cảnh báo của mình có tới được người trực ban đêm không", next: "ok" },
          ],
        },
        copy: {
          text: "Danh sách khắc phục của họ nói về hệ thống của họ, không phải của bạn. Trong khi chờ, cảnh báo của đội bạn vẫn chỉ gửi vào một kênh ngủ quên và không ai phát hiện ra.",
          ending: "bad",
        },
        ok: {
          text: "Bạn thử bắn một cảnh báo giả lúc nửa đêm và thấy nó không tới ai cả. Sửa việc đó chỉ mất một buổi, và bạn ghi thêm hai câu hỏi chưa trả lời được về hệ thống để rà trong tuần tới.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Đọc một bản tổng kết sự cố để rút ra việc làm",
      steps: [
        {
          label: "Dựng lại dòng thời gian",
          detail: "Chép các mốc theo phút ra một cột: lỗi khởi phát, cảnh báo bật, người đầu tiên biết, sửa xong. Khoảng cách giữa các mốc cho thấy thời gian bị mất ở đâu.",
        },
        {
          label: "Đánh dấu khoảnh khắc phát hiện",
          detail: "Tách riêng đoạn từ lúc lỗi bắt đầu đến lúc có người biết. Nếu đoạn này dài hơn đoạn sửa, lớp phòng thủ yếu nhất là phát hiện chứ không phải khắc phục.",
        },
        {
          label: "Liệt kê lớp phòng thủ đã hụt",
          detail: "Với mỗi lớp mà lỗi đi qua (kiểm thử, soát bản phát hành, cảnh báo), ghi nó có tồn tại không và vì sao không chặn được. Mỗi lớp hụt là một câu hỏi, không phải một lời chê.",
        },
        {
          label: "Hỏi lại về hệ thống của mình",
          detail: "Với từng lớp hụt, trả lời: đội mình có lớp này không, và nó chặn được thật không? Thử bằng cách bắn một cảnh báo giả hoặc một lỗi nhỏ có kiểm soát.",
        },
        {
          label: "Ghi các câu chưa trả lời được",
          detail: "Câu nào bạn chưa trả lời được về hệ thống mình thì thành việc có người nhận và ngày xem lại. Nguyên nhân gốc của sự cố kia thì không cần thuộc.",
        },
      ],
    },
  ],

  "ton-dong-cong-viec-vong-quay-va-so-ngay-ton": [
    {
      type: "exercise",
      language: "python",
      title: "Số ngày tồn và hạng mục cũ nhất của một đội",
      task: "Đội có 12 hạng mục chờ, mỗi hạng mục ghi tuổi theo ngày, và xử lý được 3 hạng mục mỗi tuần. Số ngày tồn = số hạng mục chia tốc độ ra (theo tuần) rồi nhân 7. Mã khởi đầu bỏ quên đổi sang ngày và báo tuổi trung bình thay cho tuổi hạng mục cũ nhất. Sửa cả hai.",
      starter: `tuoi_ngay = [3, 5, 8, 12, 20, 34, 61, 150, 210, 340, 5, 9]
RA_MOI_TUAN = 3
so_luong = len(tuoi_ngay)
so_ngay_ton = so_luong / RA_MOI_TUAN
trung_binh = sum(tuoi_ngay) / so_luong
cu_nhat = trung_binh
print(f"Số hạng mục: {so_luong}")
print(f"Số ngày tồn: {so_ngay_ton:.0f} ngày")
print(f"Tuổi trung bình: {trung_binh:.0f} ngày")
print(f"Hạng mục cũ nhất: {cu_nhat:.0f} ngày")
`,
      solution: `tuoi_ngay = [3, 5, 8, 12, 20, 34, 61, 150, 210, 340, 5, 9]
RA_MOI_TUAN = 3
so_luong = len(tuoi_ngay)
so_ngay_ton = so_luong / RA_MOI_TUAN * 7
trung_binh = sum(tuoi_ngay) / so_luong
cu_nhat = max(tuoi_ngay)
print(f"Số hạng mục: {so_luong}")
print(f"Số ngày tồn: {so_ngay_ton:.0f} ngày")
print(f"Tuổi trung bình: {trung_binh:.0f} ngày")
print(f"Hạng mục cũ nhất: {cu_nhat:.0f} ngày")
`,
      expectedOutput: `Số hạng mục: 12
Số ngày tồn: 28 ngày
Tuổi trung bình: 71 ngày
Hạng mục cũ nhất: 340 ngày`,
      hints: [
        "Tốc độ ra tính theo tuần, nên chia xong phải nhân 7 mới ra ngày.",
        "Tuổi trung bình 71 ngày che mất hạng mục 340 ngày; muốn bắt nó thì lấy giá trị lớn nhất.",
      ],
    },
    {
      type: "chart",
      title: "Chỉ hướng tác động vào đầu vào mới đổi được dấu",
      caption:
        "Số minh hoạ: mức tồn ban đầu và tốc độ vào ra là giả định. Hãy đặt vào lớn hơn ra, rồi thử tăng ra thêm hai hạng mục mỗi tuần: đường vẫn đi lên. Muốn nó đi xuống thì phải làm vào nhỏ hơn ra.",
      kind: "line",
      xLabel: "Tuần",
      yLabel: "Số hạng mục đang tồn",
      x: { from: 0, to: 20, step: 1 },
      params: [
        { id: "dau", label: "Số hạng mục đang tồn lúc đầu", min: 0, max: 200, step: 10, value: 40 },
        { id: "vao", label: "Hạng mục mới mỗi tuần", min: 1, max: 20, step: 1, value: 8, unit: "việc" },
        { id: "ra", label: "Hạng mục xong mỗi tuần", min: 1, max: 20, step: 1, value: 6, unit: "việc" },
      ],
      series: [{ label: "Hạng mục đang tồn", expr: "max(0, dau + (vao - ra)*x)" }],
    },
  ],

  "sau-khi-ra-mat-co-nen-cong-bo-slo": [
    {
      type: "scenario",
      title: "Bộ phận kinh doanh muốn công bố 99,95%",
      start: "start",
      nodes: {
        start: {
          text: "Sản phẩm đã chạy bốn quý. Đo nội bộ: mức thấp nhất từng đạt là 99,9% (có quý chỉ 99,92%), quy trình dừng phát hành đã có sẵn, chưa có di trú lớn nào đang chờ. Kinh doanh muốn công bố 99,95% để chốt hợp đồng. Bạn đề xuất gì?",
          choices: [
            { label: "Công bố 99,95%, vì khách hàng sẽ yên tâm hơn nhiều", next: "high" },
            { label: "Công bố 99,5%, thấp hơn mức đã giữ được qua các kỳ", next: "low" },
            { label: "Chưa công bố gì, đo nội bộ thêm vài quý nữa cho chắc", next: "wait" },
          ],
        },
        high: {
          text: "Con số cao hơn mức tốt nhất bạn từng đạt, nên ngân sách lỗi bị tiêu sạch ngay quý đầu. Một sự cố bình thường đã thành vi phạm cam kết, và mọi đợt di trú sau đó phải xin phê duyệt như một sự kiện đặc biệt.",
          ending: "bad",
        },
        wait: {
          text: "Dữ liệu đã đủ ổn định để cam kết một mức thấp hơn, nhưng đội vẫn chờ. Hai khách doanh nghiệp yêu cầu cam kết bằng văn bản trước khi ký và chọn nhà cung cấp khác trong lúc bạn đang đo thêm.",
          ending: "bad",
        },
        low: {
          text: "Khách có một con số để dựa vào, và vẫn còn khoảng cách giữa mức công bố và mức đã đo. Quý sau đội định chuyển cơ sở dữ liệu, dự kiến tiêu nhiều ngân sách lỗi. Bạn làm gì?",
          choices: [
            { label: "Xin phê duyệt từng bước như một sự kiện đặc biệt", next: "event" },
            { label: "Làm di trú, theo dõi nhịp tiêu và dừng phát hành khác khi cần", next: "ok" },
          ],
        },
        event: {
          text: "Quy trình phê duyệt kéo dài, di trú bị đẩy từ quý này sang quý khác. Chính việc khó nhất cần làm lại bị cam kết kìm lại, đúng điều bài cảnh báo, dù con số công bố vốn thấp hơn mức đã đo.",
          ending: "bad",
        },
        ok: {
          text: "Di trú diễn ra trong ngân sách lỗi còn dư. Khi nhịp tiêu vượt mức đều, đội dừng các phát hành khác mà không phải tranh cãi với ai. Cam kết giữ được và việc khó nhất vẫn được làm.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Bốn quý đo nội bộ so với hai mức cam kết",
      caption:
        "Số liệu minh hoạ cho một quý 90 ngày. Ngân sách ở 99,9% là 129,6 phút, ở 99,95% là 64,8 phút. Thử so từng cột phút hỏng thực với hai đường ngân sách: mức cao hơn mức đã giữ được sẽ bị vượt ở hai trong bốn quý.",
      kind: "bar",
      xLabel: "Quý đo nội bộ",
      yLabel: "Phút hỏng trong quý",
      seriesLabels: ["Phút hỏng thực tế", "Ngân sách ở 99,9%", "Ngân sách ở 99,95%"],
      data: [
        { label: "Quý 1", values: [90, 129.6, 64.8] },
        { label: "Quý 2", values: [35, 129.6, 64.8] },
        { label: "Quý 3", values: [120, 129.6, 64.8] },
        { label: "Quý 4", values: [50, 129.6, 64.8] },
      ],
    },
  ],

  "case-ghep-hai-he-thong": [
    {
      type: "scenario",
      title: "Quyết định gộp hai hệ thống sau sáp nhập",
      start: "start",
      nodes: {
        start: {
          text: "Công ty vừa mua một sản phẩm tương tự: hai hệ thống, hai tập người dùng, hai đội kỹ thuật. Giám đốc muốn biết kế hoạch gộp. Bạn trả lời thế nào?",
          choices: [
            { label: "Gộp toàn bộ vào một kho mã ngay trong quý đầu", next: "all" },
            { label: "Để hai hệ thống tách hẳn, người dùng tự lo", next: "none" },
            { label: "Hỏi trước: người dùng thấy sự rời rạc ở chỗ nào", next: "ask" },
          ],
        },
        all: {
          text: "Hai đội cùng sửa một hệ thống mà cả hai chỉ hiểu một nửa. Lược đồ khác nhau và cách xử lý trường hợp biên khác nhau, nên khi có sự cố không ai tách được là lỗi kỹ thuật hay lỗi do chưa hiểu. Quý đầu trôi qua mà người dùng chỉ thấy lỗi.",
          ending: "bad",
        },
        none: {
          text: "Người dùng của cả hai bên phải đăng nhập hai nơi và nhận hai hoá đơn. Cùng một thay đổi chính sách phải làm hai lần. Sự rời rạc người dùng thấy ngày càng rõ, và đối thủ nào có sản phẩm liền mạch sẽ lấy khách của bạn.",
          ending: "bad",
        },
        ask: {
          text: "Dữ liệu hỗ trợ cho thấy khách phàn nàn chuyện đăng nhập hai nơi và hoá đơn hai lần, hầu như không ai nói về tính năng. Bạn chọn hướng nào?",
          choices: [
            { label: "Viết lại cả hai thành một hệ thống mới cho sạch", next: "rewrite" },
            { label: "Nối ở lớp người dùng: đăng nhập chung, hoá đơn chung", next: "bridge" },
          ],
        },
        rewrite: {
          text: "Hai hệ thống cũ vẫn chạy được, nhưng cả hai đội dồn vào bản viết lại suốt hai năm, trong khi hai hệ thống cũ chạy song song. Sản phẩm gần như đứng im trong lúc khách hàng đợi một thứ họ chưa từng yêu cầu.",
          ending: "bad",
        },
        bridge: {
          text: "Khách chỉ thấy một sản phẩm, bên dưới vẫn là hai hệ thống và mỗi đội làm chủ phần mình hiểu. Sáu tháng sau, một thay đổi quy tắc tính thuế phải làm hai lần ở hai nơi. Bước tiếp theo là gì?",
          choices: [
            { label: "Gộp riêng phần tính thuế, giữ nguyên các phần còn lại", next: "ok" },
            { label: "Gộp nốt mọi phần còn lại cho đồng bộ một lần", next: "everything" },
          ],
        },
        everything: {
          text: "Phần lớn những gì bạn gộp thêm chưa từng bị làm hai lần, nên không đem lại lợi ích gì cho người dùng. Rủi ro kỹ thuật và rủi ro con người lại dồn vào cùng một đợt, đúng thứ cần tránh từ đầu.",
          ending: "bad",
        },
        ok: {
          text: "Chỉ phần đang bị làm hai lần được gộp, và nếu dừng lại ở bước này thì hệ thống vẫn dùng được. Hai đội học dần nhau qua một phần nhỏ trước khi quyết định có gộp thêm hay không.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Gộp từng bước, mỗi bước dừng lại vẫn dùng được",
      steps: [
        {
          label: "Nối đăng nhập",
          detail: "Một tài khoản mở được cả hai hệ thống. Người dùng ngừng thấy hai sản phẩm ngay ở cửa vào, còn hai cơ sở dữ liệu bên dưới chưa đụng tới.",
        },
        {
          label: "Hợp nhất bảng người dùng",
          detail: "Ghép hai danh sách người dùng thành một, xử lý các tài khoản trùng. Đây là phần gần như luôn cần gộp, và dừng lại sau bước này hệ thống vẫn chạy bình thường.",
        },
        {
          label: "Gộp hoá đơn",
          detail: "Khách nhận một hoá đơn tổng hợp cho cả hai sản phẩm. Hai hệ thống thanh toán vẫn độc lập, chỉ phần trình bày được ghép lại.",
        },
        {
          label: "Vận hành rồi mới đo",
          detail: "Chờ cho tới khi có khoảng sáu tháng dữ liệu vận hành thật và hai đội đã quen hệ thống của nhau. Trong thời gian này chưa gộp thêm phần nào.",
        },
        {
          label: "Gộp phần bị làm hai lần",
          detail: "Chỉ gộp những chỗ một thay đổi nghiệp vụ vẫn phải sửa ở cả hai nơi. Phần nào không bị làm hai lần thì được phép giữ riêng, dù nhìn không gọn.",
        },
      ],
    },
  ],

  "case-dat-truoc-hay-tra-theo-dung": [
    {
      type: "exercise",
      language: "python",
      title: "Cam kết bao nhiêu máy cho 12 tháng tới",
      task: "Tải 12 tháng gần nhất tính bằng số máy (minh hoạ). Phần cam kết đặt trước giá 0,6 mỗi máy mỗi tháng, phần phát sinh trả theo dùng giá 1,0. Mã khởi đầu cam kết theo đỉnh cao nhất. Cam kết theo mức tải thấp nhất duy trì được suốt kỳ, rồi in tiết kiệm so với trả theo dùng toàn bộ.",
      starter: `tai = [42, 40, 45, 38, 41, 60, 85, 90, 55, 44, 41, 39]
GIA_THEO_DUNG = 1.0
GIA_DAT_TRUOC = 0.6
cam_ket = max(tai)
theo_dung = sum(tai) * GIA_THEO_DUNG
co_cam_ket = cam_ket * 12 * GIA_DAT_TRUOC + sum(max(0, t - cam_ket) for t in tai) * GIA_THEO_DUNG
tiet_kiem = theo_dung - co_cam_ket
print(f"Mức cam kết: {cam_ket} máy")
print(f"Trả theo dùng toàn bộ: {theo_dung:.1f}")
print(f"Có cam kết: {co_cam_ket:.1f}")
print(f"Tiết kiệm: {tiet_kiem:.1f} ({tiet_kiem / theo_dung * 100:.0f}%)")
`,
      solution: `tai = [42, 40, 45, 38, 41, 60, 85, 90, 55, 44, 41, 39]
GIA_THEO_DUNG = 1.0
GIA_DAT_TRUOC = 0.6
cam_ket = min(tai)
theo_dung = sum(tai) * GIA_THEO_DUNG
co_cam_ket = cam_ket * 12 * GIA_DAT_TRUOC + sum(max(0, t - cam_ket) for t in tai) * GIA_THEO_DUNG
tiet_kiem = theo_dung - co_cam_ket
print(f"Mức cam kết: {cam_ket} máy")
print(f"Trả theo dùng toàn bộ: {theo_dung:.1f}")
print(f"Có cam kết: {co_cam_ket:.1f}")
print(f"Tiết kiệm: {tiet_kiem:.1f} ({tiet_kiem / theo_dung * 100:.0f}%)")
`,
      expectedOutput: `Mức cam kết: 38 máy
Trả theo dùng toàn bộ: 620.0
Có cam kết: 437.6
Tiết kiệm: 182.4 (29%)`,
      hints: [
        "Phần đáng cam kết là phần dưới đường ngang kẻ ở mức thấp nhất, vì nó tồn tại quanh năm.",
        "Thử cam kết theo đỉnh: bạn trả giá đặt trước cho cả những tháng chỉ cần một nửa số máy, và còn tệ hơn trả theo dùng.",
      ],
    },
    {
      type: "chart",
      title: "Tải nền nằm dưới đường ngang, tải đỉnh nằm trên",
      caption:
        "Số liệu minh hoạ, cùng 12 tháng với bài tập. Đường ngang ở mức 38 máy là mức cam kết hợp lý; hai ngọn tháng 7 và tháng 8 là đỉnh theo mùa, nên chỉ đáng trả theo dùng.",
      kind: "line",
      xLabel: "Tháng",
      yLabel: "Số máy cần",
      seriesLabels: ["Tải thực tế", "Mức cam kết (tải thấp nhất)"],
      data: [
        { label: "T1", values: [42, 38] },
        { label: "T2", values: [40, 38] },
        { label: "T3", values: [45, 38] },
        { label: "T4", values: [38, 38] },
        { label: "T5", values: [41, 38] },
        { label: "T6", values: [60, 38] },
        { label: "T7", values: [85, 38] },
        { label: "T8", values: [90, 38] },
        { label: "T9", values: [55, 38] },
        { label: "T10", values: [44, 38] },
        { label: "T11", values: [41, 38] },
        { label: "T12", values: [39, 38] },
      ],
    },
  ],

  "doi-co-20-phan-tram-nang-luc-du": [
    {
      type: "exercise",
      language: "python",
      title: "Gán phần dư theo lợi ích biên, không chia đều",
      task: "Đội có 10 người-ngày dư mỗi chu kỳ, chia thành 5 phần 2 người-ngày. Mỗi đích có điểm lợi ích biên (số minh hoạ), và mỗi lần đã đổ công vào đích nào thì lợi ích biên còn lại của nó giảm xuống 60%. Mã khởi đầu đổ công vòng tròn lần lượt. Sửa để mỗi phần đi vào đích đang có lợi ích biên cao nhất.",
      starter: `loi_ich = {"Tính năng mới": 5, "Trả nợ kỹ thuật": 9, "Gia cố độ tin cậy": 4}
PHAN_DU = 10
MOI_PHAN = 2
chia = {ten: 0 for ten in loi_ich}
for i in range(PHAN_DU // MOI_PHAN):
    ten = list(loi_ich)[i % len(loi_ich)]
    chia[ten] += MOI_PHAN
    loi_ich[ten] *= 0.6
for ten, ngay in chia.items():
    print(f"{ten}: {ngay} người-ngày")
`,
      solution: `loi_ich = {"Tính năng mới": 5, "Trả nợ kỹ thuật": 9, "Gia cố độ tin cậy": 4}
PHAN_DU = 10
MOI_PHAN = 2
chia = {ten: 0 for ten in loi_ich}
for i in range(PHAN_DU // MOI_PHAN):
    ten = max(loi_ich, key=loi_ich.get)
    chia[ten] += MOI_PHAN
    loi_ich[ten] *= 0.6
for ten, ngay in chia.items():
    print(f"{ten}: {ngay} người-ngày")
`,
      expectedOutput: `Tính năng mới: 2 người-ngày
Trả nợ kỹ thuật: 6 người-ngày
Gia cố độ tin cậy: 2 người-ngày`,
      hints: [
        "Mỗi vòng chọn đích có điểm cao nhất ngay lúc đó, rồi cho điểm của nó giảm.",
        "Nợ kỹ thuật được chọn nhiều nhất, nhưng không phải tất cả: đến lúc điểm của nó tụt xuống thấp hơn đích khác thì phần dư chuyển đi.",
      ],
    },
    {
      type: "feynman",
      title: "Phần năng lực dư giống một khoản tiền để dành",
      intro:
        "Hãy nghĩ tới một khoản tiền thừa cuối tháng. Nếu không ghi nó dành cho việc gì, nó tan vào những chi tiêu đến trước. Chia đều cho mọi khoản cũng không hẳn thông minh, vì có khoản đang cháy gấp còn khoản khác thì chưa cần.",
      columns: ["Cách xử lý phần dư", "Giống như", "Điều thường xảy ra"],
      rows: [
        ["Không gán việc cụ thể", "Để tiền thừa trong ví mà không ghi chú", "Tan vào những việc gấp đến trước, và không ai quyết định điều đó"],
        ["Chia đều ba đích", "Đổ đều tiền vào ba khoản dù khoản nào cũng thiếu", "Nghe công bằng, nhưng không đích nào được làm tới nơi"],
        ["Gán theo lợi ích biên", "Trả khoản đang cháy trước, rồi mới tới khoản khác", "Phần dư đi vào chỗ có lợi nhất; thứ tự phải xem lại mỗi quý"],
      ],
      oneLiner: "Phần dư chỉ còn khi nó được ghi thành việc cụ thể, và đích đúng là đích đang có lợi ích biên cao nhất.",
    },
  ],
};
