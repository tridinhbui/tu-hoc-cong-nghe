import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 21. Một người viết cho một tệp.
export const P21_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Đo cho đúng ─────────────────────────────────────────────────────────
  "thu-nghiem-a-b": [
    {
      type: "exercise",
      language: "python",
      title: "Ngày lễ đã làm gì với con số của bạn",
      task: "Tuần này có ngày lễ nên cả hai nhóm đều tăng. Đơn vị là điểm cơ bản (100 điểm cơ bản = 1 điểm phần trăm). Hiện mã so nhóm thử với chính nó tuần trước. Sửa lại để so nhóm thử với nhóm đối chứng trong CÙNG tuần, rồi dòng thứ ba sẽ cho biết bao nhiêu phần là của ngày lễ.",
      starter: `nhom_thu = {"tuan_truoc": 400, "tuan_nay": 500}
nhom_chung = {"tuan_truoc": 400, "tuan_nay": 450}

truoc_sau = nhom_thu["tuan_nay"] - nhom_thu["tuan_truoc"]
so_ab = nhom_thu["tuan_nay"] - nhom_thu["tuan_truoc"]

print(f"Trước/sau: {truoc_sau:+d}")
print(f"A/B cùng tuần: {so_ab:+d}")
print(f"Phần do ngày lễ: {truoc_sau - so_ab}")
`,
      solution: `nhom_thu = {"tuan_truoc": 400, "tuan_nay": 500}
nhom_chung = {"tuan_truoc": 400, "tuan_nay": 450}

truoc_sau = nhom_thu["tuan_nay"] - nhom_thu["tuan_truoc"]
so_ab = nhom_thu["tuan_nay"] - nhom_chung["tuan_nay"]

print(f"Trước/sau: {truoc_sau:+d}")
print(f"A/B cùng tuần: {so_ab:+d}")
print(f"Phần do ngày lễ: {truoc_sau - so_ab}")
`,
      expectedOutput: `Trước/sau: +100
A/B cùng tuần: +50
Phần do ngày lễ: 50`,
      hints: [
        "Nhóm đối chứng cũng đi qua ngày lễ, nên con số tuần này của nó chính là mốc để so.",
        "so_ab chỉ cần lấy tuần này của nhóm thử trừ tuần này của nhóm đối chứng.",
      ],
    },
    {
      type: "flow",
      title: "Một thử nghiệm A/B đi từ câu hỏi tới quyết định",
      steps: [
        {
          label: "Chốt trước khi chạy",
          detail:
            "Viết ra một chỉ số chính (ví dụ tỷ lệ hoàn tất đăng ký), cỡ mẫu cần đạt và ngưỡng khác biệt đáng phát hành. Ba dòng này nằm trong tài liệu trước khi bất kỳ người dùng nào được chia nhóm, để không ai chọn lại thước đo sau khi đã thấy kết quả.",
        },
        {
          label: "Chia nhóm ngẫu nhiên",
          detail:
            "Mỗi người dùng vào được hệ thống sẽ được gán A hoặc B bằng một phép chia ngẫu nhiên cố định theo mã người dùng, để cùng một người luôn thấy cùng một phiên bản qua nhiều lần mở.",
        },
        {
          label: "Chạy song song",
          detail:
            "Hai nhóm cùng sống qua một tuần: cùng ngày lễ, cùng chiến dịch quảng cáo, cùng đợt triển khai của đội khác. Mọi yếu tố bên ngoài chạm vào cả hai như nhau nên chúng triệt tiêu khi trừ.",
        },
        {
          label: "Chưa đọc vội",
          detail:
            "Số liệu về mỗi ngày vẫn chảy về, và con số tạm thời luôn dao động. Dừng sớm vì thấy đường B nhỉnh lên là cách phổ biến nhất để phát hành thứ không có tác dụng thật. Đợi tới đúng cỡ mẫu đã chốt.",
        },
        {
          label: "Đọc và quyết định",
          detail:
            "So chỉ số chính giữa A và B, rồi hỏi hai câu tách nhau: khác biệt có vượt khỏi nhiễu không (thống kê), và nó có đạt ngưỡng đã chốt không (thực tiễn). Phát hành chỉ khi cả hai cùng đúng.",
        },
      ],
    },
  ],

  "co-mau-va-y-nghia-thong-ke": [
    {
      type: "scenario",
      title: "Nút mới có đáng một thử nghiệm không",
      start: "de-xuat",
      nodes: {
        "de-xuat": {
          text: "Quy trình đăng ký của bạn có vài nghìn người mỗi tuần và khoảng 10% hoàn tất. Sếp muốn đổi màu nút để tăng chừng một điểm phần trăm. Bạn xử lý thế nào?",
          choices: [
            { label: "Chạy A/B hai tuần rồi đọc kết quả", next: "hai-tuan" },
            { label: "Tính cỡ mẫu cần thiết trước, rồi mới quyết", next: "tinh" },
            { label: "Phát hành màu mới rồi so với tuần trước", next: "truoc-sau" },
          ],
        },
        "hai-tuan": {
          text: "Sau hai tuần, nhóm B nhỉnh hơn A một chút, nhưng mẫu nhỏ nên độ dao động ngẫu nhiên lớn hơn chính khác biệt ấy. Một nửa đội tin con số, nửa kia không, và không ai chứng minh được ai đúng. Hai tuần đã mất mà câu hỏi vẫn còn nguyên.",
          ending: "bad",
        },
        "truoc-sau": {
          text: "Tuần sau có đợt khuyến mãi nên tỷ lệ đăng ký nhảy lên. Cả đội ăn mừng cái nút, rồi đến khi khuyến mãi hết thì con số trở lại như cũ. Không ai biết cái nút có tác dụng hay không, vì không có nhóm nào để so cùng thời điểm.",
          ending: "bad",
        },
        tinh: {
          text: "Theo quy tắc ước chừng, để phát hiện chênh một điểm phần trăm ở mức 10% bạn cần khoảng mười tuần với lưu lượng hiện tại (con số minh hoạ). Cải thiện nhỏ như vậy tốn gần hết một quý. Bạn chọn gì?",
          choices: [
            { label: "Chạy đủ mười tuần cho chiếc nút", next: "muoi-tuan" },
            { label: "Thử một thay đổi lớn hơn, hiệu ứng nhiều điểm", next: "lon" },
            { label: "Chọn màu theo phán đoán rồi đi tiếp", next: "phan-doan" },
          ],
        },
        "muoi-tuan": {
          text: "Kết quả ra đúng như mẫu cho phép, nhưng mười tuần của cả đội chỉ để biết một chiếc nút. Trong thời gian đó, những thay đổi có khả năng tạo khác biệt lớn nằm im trong hàng chờ.",
          ending: "bad",
        },
        lon: {
          text: "Bạn đổi cả luồng đăng ký từ năm bước xuống ba bước. Hiệu ứng nếu có sẽ lớn nên chỉ cần dưới một tuần để thấy rõ. Đội có câu trả lời trước khi quý kết thúc.",
          ending: "good",
        },
        "phan-doan": {
          text: "Một tinh chỉnh nhỏ thì phán đoán là đủ: chọn màu dễ nhìn nhất rồi chuyển sang việc khác. Đội giữ lại thời gian thử nghiệm cho những thay đổi mà dữ liệu thật sự trả lời được.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Hiệu ứng nhỏ đi thì mẫu lớn lên bao nhiêu",
      caption:
        "Số minh hoạ theo quy tắc ước chừng n = 16 × p(1 − p) ÷ d² mỗi nhóm (khoảng 80% khả năng phát hiện, mức tin cậy 95%). Dùng để thấy hình dạng bình phương: hiệu ứng nhỏ đi mười lần thì mẫu lớn lên khoảng một trăm lần, không phải để thay phép tính cỡ mẫu thật.",
      kind: "line",
      xLabel: "Mức cải thiện muốn phát hiện (điểm phần trăm)",
      yLabel: "Số người dùng",
      x: { from: 0.5, to: 5, step: 0.5 },
      params: [{ id: "b", label: "Tỷ lệ hiện tại", min: 5, max: 50, step: 5, value: 10, unit: "%" }],
      series: [
        { label: "Mỗi nhóm", expr: "16*(b/100)*(1-b/100)/((x/100)^2)" },
        { label: "Cả hai nhóm", expr: "2*16*(b/100)*(1-b/100)/((x/100)^2)" },
      ],
    },
  ],

  "di-cung-nhau-va-gay-ra-nhau": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản phân tích nhảy từ số liệu sang kết luận",
      task: "Một trợ lý AI viết nháp phân tích rời bỏ cho đội. Bấm vào những đoạn mà kết luận đi xa hơn số liệu cho phép, rồi nộp.",
      segments: [
        {
          text: "Trong 90 ngày qua, nhóm đã gọi hỗ trợ có tỷ lệ rời bỏ cao hơn hẳn nhóm chưa gọi.",
        },
        {
          text: "Vì vậy, việc gọi hỗ trợ làm tăng khả năng rời bỏ.",
          error:
            "Đây là nhảy từ tương quan sang nhân quả. Người gặp trục trặc vừa hay gọi hỗ trợ vừa hay rời bỏ, nên trục trặc có thể là nguyên nhân chung của cả hai.",
        },
        {
          text: "Phần lớn người trong nhóm gọi hỗ trợ đã gặp lỗi thanh toán trong ngày trước khi gọi.",
        },
        {
          text: "Đề xuất: cắt giảm kênh hỗ trợ để giảm rời bỏ.",
          error:
            "Quyết định dựa trên một quan hệ nhân quả chưa kiểm chứng. Nếu quan hệ thật là ngược lại, việc cắt kênh hỗ trợ không giảm được rời bỏ mà còn lấy mất kênh duy nhất cho biết khách đang gặp gì.",
        },
        {
          text: "Để biết chắc, có thể ngẫu nhiên chọn một nửa người vừa gặp lỗi thanh toán để chủ động liên hệ, rồi so với nửa còn lại.",
        },
        {
          text: "Cho tới khi có kết quả đó, chỉ nên coi mối liên hệ trên là một giả thuyết cần kiểm chứng.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Ba cách một tương quan xuất hiện",
      intro:
        "Hãy nghĩ tới một con phố: quán kem đông khách và trẻ con ở đó bị cháy nắng nhiều. Hai điều này đi cùng nhau, nhưng ai cũng biết kem không gây cháy nắng. Cùng một số liệu có thể đến từ ba cấu trúc khác nhau.",
      columns: ["Cấu trúc", "Ví dụ đời thường", "Cách thử phân biệt"],
      rows: [
        [
          "A gây ra B",
          "Bật đèn rồi phòng sáng: có can thiệp, có kết quả.",
          "Tự tay thay đổi A cho một nhóm được chọn ngẫu nhiên, xem B có đổi theo không.",
        ],
        [
          "B gây ra A",
          "Người đã định mua nhà mới tìm hiểu kỹ về vay vốn, chứ không phải ngược lại.",
          "Xem cái nào xảy ra trước theo thời gian, và A có xuất hiện khi chưa có B không.",
        ],
        [
          "C gây ra cả A lẫn B",
          "Trời nắng làm cả bán kem lẫn cháy nắng tăng lên.",
          "Tìm yếu tố thứ ba, rồi so hai nhóm trong cùng điều kiện của yếu tố đó.",
        ],
      ],
      oneLiner:
        "Hai thứ đi cùng nhau chỉ là câu hỏi; ngẫu nhiên hoá mới là cách biến nó thành câu trả lời.",
    },
  ],

  "chi-so-dan-dat": [
    {
      type: "exercise",
      language: "python",
      title: "Chọn phương án bằng một chỉ số, có ràng buộc",
      task: "Đội có bốn phương án sửa biểu mẫu. Chỉ số dẫn dắt là số đăng ký; chất lượng hồ sơ là ràng buộc, không được thấp hơn 72 (số minh hoạ). Mã đang chọn phương án nhiều đăng ký nhất, kể cả phương án phá chất lượng. Hãy loại các phương án vi phạm ràng buộc, in lý do loại, rồi mới chọn.",
      starter: `phuong_an = [
    {"ten": "Rút gọn biểu mẫu", "dang_ky": 120, "chat_luong": 62},
    {"ten": "Thêm bước xác nhận", "dang_ky": 95, "chat_luong": 78},
    {"ten": "Gợi ý điền sẵn", "dang_ky": 110, "chat_luong": 74},
    {"ten": "Giữ nguyên", "dang_ky": 100, "chat_luong": 75},
]
SAN_CHAT_LUONG = 72

con_lai = phuong_an
tot_nhat = max(con_lai, key=lambda p: p["dang_ky"])
print("Chọn:", tot_nhat["ten"])
`,
      solution: `phuong_an = [
    {"ten": "Rút gọn biểu mẫu", "dang_ky": 120, "chat_luong": 62},
    {"ten": "Thêm bước xác nhận", "dang_ky": 95, "chat_luong": 78},
    {"ten": "Gợi ý điền sẵn", "dang_ky": 110, "chat_luong": 74},
    {"ten": "Giữ nguyên", "dang_ky": 100, "chat_luong": 75},
]
SAN_CHAT_LUONG = 72

con_lai = []
for p in phuong_an:
    if p["chat_luong"] < SAN_CHAT_LUONG:
        print("Loại:", p["ten"])
    else:
        con_lai.append(p)
tot_nhat = max(con_lai, key=lambda p: p["dang_ky"])
print("Chọn:", tot_nhat["ten"])
`,
      expectedOutput: `Loại: Rút gọn biểu mẫu
Chọn: Gợi ý điền sẵn`,
      hints: [
        "Ràng buộc không chọn phương án thắng, nó chỉ loại phương án. Lọc trước, so chỉ số dẫn dắt sau.",
        "Duyệt từng phương án: nếu chat_luong nhỏ hơn SAN_CHAT_LUONG thì in Loại, ngược lại thêm vào con_lai.",
      ],
    },
    {
      type: "flow",
      title: "Từ hai mươi con số tới một cuộc thảo luận ngắn",
      steps: [
        {
          label: "Có hai phương án",
          detail:
            "Rút gọn biểu mẫu hay thêm bước xác nhận. Mỗi phương án đều đứng đầu ở vài trong hai mươi chỉ số trên bảng, nên cả hai bên đều có biểu đồ ủng hộ mình.",
        },
        {
          label: "Hỏi chỉ số dẫn dắt",
          detail:
            "Cả phòng nhìn vào đúng một con số đã được chọn trước, ví dụ số đăng ký hoàn tất mỗi tuần. Cuộc cãi nhau về chọn thước đo kết thúc trước khi bắt đầu.",
        },
        {
          label: "Kiểm các ràng buộc",
          detail:
            "Phương án nào làm chất lượng hồ sơ hay tỷ lệ lỗi tụt dưới sàn đã định thì bị loại, dù chỉ số dẫn dắt của nó có đẹp tới đâu. Ràng buộc không cộng điểm cho ai.",
        },
        {
          label: "Chọn trong số còn lại",
          detail:
            "Những phương án sống sót được xếp theo chỉ số dẫn dắt. Người thắng cuộc có lý do ghi được thành một dòng, và người thua cuộc nhìn thấy cùng con số với mình.",
        },
        {
          label: "Không chấm điểm người",
          detail:
            "Con số dùng để chọn hướng đi, không dùng để xếp hạng ai. Khi nó thành thước đo cá nhân, cách rẻ nhất để đạt nó sẽ thắng, và con số ngừng nói thật.",
        },
      ],
    },
  ],

  "dinh-nghia-chi-so-va-su-troi-dat": [
    {
      type: "exercise",
      language: "javascript",
      title: "Cùng một nhật ký, hai định nghĩa, hai con số",
      task: "Định nghĩa cũ của người dùng hoạt động: có bất kỳ sự kiện nào. Định nghĩa mới: làm ít nhất một hành động ngoài việc mở ứng dụng, không phải máy tự động, không phải tài khoản dùng thử. Hiện mã mới vẫn dùng định nghĩa cũ. Sửa để dòng thứ hai đếm đúng theo định nghĩa mới.",
      starter: `const suKien = [
  { nguoi: "an", hanhDong: "mo_app", bot: false, thu: false },
  { nguoi: "binh", hanhDong: "tao_don", bot: false, thu: false },
  { nguoi: "binh", hanhDong: "mo_app", bot: false, thu: false },
  { nguoi: "cuong", hanhDong: "mo_app", bot: true, thu: false },
  { nguoi: "dung", hanhDong: "gui_tin", bot: false, thu: true },
  { nguoi: "em", hanhDong: "gui_tin", bot: false, thu: false },
];

const cu = new Set(suKien.map((s) => s.nguoi)).size;
const moi = new Set(suKien.map((s) => s.nguoi)).size;

console.log("Định nghĩa cũ:", cu);
console.log("Định nghĩa mới:", moi);
`,
      solution: `const suKien = [
  { nguoi: "an", hanhDong: "mo_app", bot: false, thu: false },
  { nguoi: "binh", hanhDong: "tao_don", bot: false, thu: false },
  { nguoi: "binh", hanhDong: "mo_app", bot: false, thu: false },
  { nguoi: "cuong", hanhDong: "mo_app", bot: true, thu: false },
  { nguoi: "dung", hanhDong: "gui_tin", bot: false, thu: true },
  { nguoi: "em", hanhDong: "gui_tin", bot: false, thu: false },
];

const cu = new Set(suKien.map((s) => s.nguoi)).size;
const moi = new Set(
  suKien
    .filter((s) => s.hanhDong !== "mo_app" && !s.bot && !s.thu)
    .map((s) => s.nguoi)
).size;

console.log("Định nghĩa cũ:", cu);
console.log("Định nghĩa mới:", moi);
`,
      expectedOutput: `Định nghĩa cũ: 5
Định nghĩa mới: 2`,
      hints: [
        "Lọc sự kiện trước, rồi mới lấy tập các người dùng khác nhau.",
        "Điều kiện giữ lại: hanhDong khác mo_app, bot là false và thu là false.",
      ],
    },
    {
      type: "flow",
      title: "Thấy một cú nhảy trong một ngày: kiểm gì trước",
      steps: [
        {
          label: "Nhìn hình dạng",
          detail:
            "Cú nhảy xảy ra trong đúng một ngày và giữ mức mới, hay leo dần vài tuần? Hành vi của hàng chục nghìn người đổi từ từ, nên một bậc thang thẳng đứng là dấu hiệu của cách đo, chưa phải của thế giới.",
        },
        {
          label: "Đối chiếu nhật ký triển khai",
          detail:
            "Mở danh sách các lần phát hành trong ngày đó, gồm cả của những đội khác. Một lần đổi cách ghi sự kiện hay thêm một đường thu thập mới thường nằm đúng chỗ bậc thang.",
        },
        {
          label: "Đọc lại định nghĩa",
          detail:
            "Tra định nghĩa chỉ số ở nơi tập trung: có ai thêm hay bớt điều kiện không, có thôi loại tài khoản dùng thử hay máy tự động không. Mỗi điều kiện đổi là một con số khác cho cùng một thế giới.",
        },
        {
          label: "Tính lại bằng định nghĩa cũ",
          detail:
            "Chạy cả hai định nghĩa trên cùng dữ liệu của hai tuần quanh ngày nhảy. Nếu chuỗi theo định nghĩa cũ vẫn mượt thì cú nhảy là sản phẩm của phép đo.",
        },
        {
          label: "Đánh dấu và ghi lại",
          detail:
            "Đặt một vạch dọc có chú thích trên biểu đồ tại ngày đổi, và ghi vào tài liệu định nghĩa. Nếu không tính lại được lịch sử, bắt đầu một chuỗi mới thay vì nối hai chuỗi như một.",
        },
      ],
    },
  ],

  "phan-hoi-dinh-tinh": [
    {
      type: "scenario",
      title: "Vì sao người ta thoát ngay khỏi trang báo cáo",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Số liệu cho thấy nhiều người mở trang báo cáo rồi thoát trong vài giây. Bạn chỉ đủ thời gian nói chuyện với năm người. Bạn tìm ai?",
          choices: [
            { label: "Năm người đã gửi thư góp ý gần đây", next: "thu" },
            { label: "Năm người vừa mở trang rồi thoát ngay", next: "thoat" },
            { label: "Toàn bộ người dùng, qua một khảo sát ngắn", next: "khao-sat" },
          ],
        },
        thu: {
          text: "Cả năm người đều viết thư vì chuyện khác: họ muốn xuất file nhanh hơn. Những người thoát ngay khỏi trang báo cáo vẫn im lặng như trước, và bạn dành hai tuần sửa đúng việc không liên quan.",
          ending: "bad",
        },
        "khao-sat": {
          text: "Số người trả lời ít, điểm hài lòng trung bình trông ổn. Khảo sát không cho biết người thoát ngay đã thấy gì, vì họ là nhóm ít khi trả lời. Bạn có thêm một biểu đồ nhưng chưa có thêm lời giải thích nào.",
          ending: "bad",
        },
        thoat: {
          text: "Năm người đồng ý trò chuyện mười phút. Bạn mở đầu cuộc nói chuyện bằng câu hỏi nào?",
          choices: [
            { label: "Bạn có định dùng trang báo cáo này nữa không?", next: "tuong-lai" },
            { label: "Lần gần nhất bạn cần một báo cáo, bạn đã làm gì?", next: "qua-khu" },
          ],
        },
        "tuong-lai": {
          text: "Cả năm người đều trả lời có, vì người ta lịch sự và tưởng tượng thì dễ. Bạn ghi nhận nhu cầu mạnh và đi xây thêm, trong khi hành vi thật vẫn là thoát sau vài giây.",
          ending: "bad",
        },
        "qua-khu": {
          text: "Ba trong năm người kể họ đã xuất dữ liệu ra bảng tính để tự lọc, vì trang báo cáo không cho lọc theo cửa hàng. Bạn có một lời giải thích cụ thể, có bối cảnh, và một việc rõ ràng cần xây.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Số liệu biết gì, và chỉ người mới biết gì",
      intro:
        "Một nhà hàng đếm được số khách vào và số đĩa trả về còn thừa. Con số cho biết có chuyện, nhưng không cho biết món mặn hay khách đã no trước khi gọi. Muốn biết phải ra hỏi bàn.",
      columns: ["Câu hỏi hay hỏi", "Vì sao dễ ra sai", "Câu hỏi về quá khứ thay thế"],
      rows: [
        [
          "Bạn có dùng tính năng này không?",
          "Người ta lịch sự và thường trả lời có.",
          "Lần gần nhất bạn cần việc này là khi nào, bạn đã làm gì?",
        ],
        [
          "Bạn có muốn thêm tính năng X không?",
          "Muốn một thứ trong tưởng tượng thì chẳng tốn gì.",
          "Hiện nay bạn đang xoay xở việc đó bằng cách nào?",
        ],
        [
          "Bạn thấy sản phẩm thế nào?",
          "Câu trả lời quá chung, khó đào tiếp.",
          "Kể cho tôi về lần gần nhất bạn thấy khó chịu khi dùng nó.",
        ],
      ],
      oneLiner:
        "Số liệu chỉ cho bạn chỗ để đào; hỏi người về chuyện đã xảy ra mới cho bạn biết dưới đó có gì.",
    },
  ],

  // ── Chọn cho đúng ───────────────────────────────────────────────────────
  "uoc-luong-va-vi-sao-no-sai": [
    {
      type: "exercise",
      language: "python",
      title: "Hiệu chỉnh ước lượng bằng lịch sử của chính đội",
      task: "Đội đã ghi lại ước lượng và thời gian thật (ngày) của năm việc trước. Hãy tính hệ số hiệu chỉnh bằng tổng thời gian thật chia tổng ước lượng, rồi áp nó lên kế hoạch mới. Hiện mã đang giả định đội ước lượng chính xác.",
      starter: `uoc = [3, 2, 5, 4, 6]
that = [5, 3, 8, 6, 10]
viec_moi = [4, 6, 2]

he_so = 1.0
tho = sum(viec_moi)

print(f"Hệ số hiệu chỉnh: {he_so:.1f}")
print(f"Ước lượng thô: {tho} ngày")
print(f"Ước lượng sau hiệu chỉnh: {tho * he_so:.1f} ngày")
`,
      solution: `uoc = [3, 2, 5, 4, 6]
that = [5, 3, 8, 6, 10]
viec_moi = [4, 6, 2]

he_so = sum(that) / sum(uoc)
tho = sum(viec_moi)

print(f"Hệ số hiệu chỉnh: {he_so:.1f}")
print(f"Ước lượng thô: {tho} ngày")
print(f"Ước lượng sau hiệu chỉnh: {tho * he_so:.1f} ngày")
`,
      expectedOutput: `Hệ số hiệu chỉnh: 1.6
Ước lượng thô: 12 ngày
Ước lượng sau hiệu chỉnh: 19.2 ngày`,
      hints: [
        "Cộng riêng cả hai danh sách, rồi chia tổng thời gian thật cho tổng ước lượng.",
        "he_so = sum(that) / sum(uoc). Hai dòng in còn lại đã đúng sẵn.",
      ],
    },
    {
      type: "chart",
      title: "Vì sao sai số không tự triệt tiêu khi cộng nhiều việc",
      caption:
        "Số minh hoạ: mỗi việc ước lượng 5 ngày, và bất ngờ chỉ làm việc lâu thêm, không bao giờ làm xong sớm. Kéo hai thanh trượt để thấy khoảng cách giữa kế hoạch và thực tế mở rộng theo số việc.",
      kind: "line",
      xLabel: "Số việc trong kế hoạch",
      yLabel: "Số ngày",
      x: { from: 1, to: 20, step: 1 },
      params: [
        { id: "p", label: "Khả năng một việc gặp bất ngờ", min: 0, max: 100, step: 10, value: 40, unit: "%" },
        { id: "e", label: "Mức trễ khi gặp bất ngờ", min: 0, max: 300, step: 25, value: 100, unit: "%" },
      ],
      series: [
        { label: "Tổng ước lượng", expr: "x*5" },
        { label: "Thời gian thật kỳ vọng", expr: "x*5*(1+(p/100)*(e/100))" },
      ],
    },
  ],

  "chia-nho-va-giao-tung-phan": [
    {
      type: "scenario",
      title: "Hệ thống đặt lịch: làm phần nào trước",
      start: "ke-hoach",
      nodes: {
        "ke-hoach": {
          text: "Bạn có ba tháng để làm hệ thống đặt lịch cho tiệm cắt tóc. Giả định rủi ro nhất là khách có chịu đặt qua ứng dụng thay vì gọi điện hay không. Phần dễ nhất là trang quản lý cho nhân viên. Bạn chia việc ra sao?",
          choices: [
            { label: "Làm cơ sở dữ liệu, rồi máy chủ, rồi giao diện", next: "ngang" },
            { label: "Làm trang quản lý trước vì chắc chắn làm được", next: "de" },
            { label: "Giao một luồng đặt lịch tối thiểu cho vài khách", next: "lat" },
          ],
        },
        ngang: {
          text: "Hết tháng một và tháng hai, mọi thứ đều đúng tiến độ nhưng chưa có gì dùng được. Tuần cuối tháng ba, khách đầu tiên mới chạm vào sản phẩm và mọi phản hồi dồn cả về một lúc, đúng khi không còn thời gian sửa.",
          ending: "bad",
        },
        de: {
          text: "Tiến độ đẹp suốt sáu tuần. Rồi tới lúc cho khách thật thử, bạn phát hiện đa số khách vẫn thích gọi điện hơn. Tin xấu đến muộn mà chỗ rủi ro nhất vẫn chưa được kiểm chứng, nên trang quản lý phục vụ một luồng ít người dùng.",
          ending: "bad",
        },
        lat: {
          text: "Sau hai tuần, luồng tối thiểu chạy được với vài khách thân. Nhưng rất ít người trong số họ đặt lịch qua ứng dụng, đa số vẫn gọi điện. Bạn làm gì tiếp?",
          choices: [
            { label: "Hỏi vài khách ấy vì sao, rồi chỉnh luồng", next: "hoi" },
            { label: "Làm tiếp đúng kế hoạch ba tháng như cũ", next: "nhu-cu" },
          ],
        },
        hoi: {
          text: "Khách nói họ không muốn tạo tài khoản chỉ để đặt một lần cắt tóc. Bạn đổi luồng sang đặt bằng số điện thoại. Tin xấu đến ở tuần thứ hai nên chỉnh vẫn còn rẻ.",
          ending: "good",
        },
        "nhu-cu": {
          text: "Bạn có tín hiệu từ khách thật nhưng bỏ qua nó. Ba tháng sau sản phẩm ra mắt đầy đủ tính năng, và vẫn ít người đặt lịch qua ứng dụng, đúng điều tuần thứ hai đã báo.",
          ending: "bad",
        },
      },
    },
    {
      type: "chart",
      title: "Giao càng thường xuyên, học càng nhiều",
      caption:
        "Số minh hoạ: mỗi lần giao được một phần cho người dùng thật là một điểm học. Kéo chu kỳ giao dài ra để thấy số điểm học mỗi năm tụt nhanh ra sao; với 52 tuần, giao mỗi 2 tuần cho 26 điểm và mỗi 13 tuần chỉ còn 4.",
      kind: "bar",
      xLabel: "Chu kỳ giao (tuần)",
      yLabel: "Số điểm học mỗi năm",
      x: { from: 1, to: 13, step: 1 },
      params: [{ id: "w", label: "Số tuần làm việc trong năm", min: 44, max: 52, step: 2, value: 52, unit: "tuần" }],
      series: [{ label: "Điểm học mỗi năm", expr: "w/x" }],
    },
  ],

  "pham-vi-va-danh-doi": [
    {
      type: "exercise",
      language: "python",
      title: "Trễ rồi: cắt phạm vi, không cắt chất lượng",
      task: "Đợt này còn 10 ngày. Mỗi việc có giá trị (điểm) và công sức (ngày), số minh hoạ. Cắt phạm vi nghĩa là giữ các việc có giá trị trên công sức cao nhất cho tới khi hết ngày, phần còn lại ra khỏi đợt này một cách công khai. Hiện mã duyệt theo thứ tự danh sách nên giữ nhầm việc. Hãy sắp theo tỷ lệ trước.",
      starter: `viec = [
    ("Đăng nhập", 9, 3),
    ("Báo cáo xuất file", 6, 4),
    ("Thông báo đẩy", 4, 2),
    ("Giao diện tối", 2, 3),
    ("Tìm kiếm nâng cao", 8, 5),
]
NGAY = 10

dung = 0
for ten, gia_tri, cong_suc in viec:
    if dung + cong_suc <= NGAY:
        dung += cong_suc
        print("Giữ:", ten)
    else:
        print("Cắt:", ten)
print(f"Tổng: {dung}/{NGAY} ngày")
`,
      solution: `viec = [
    ("Đăng nhập", 9, 3),
    ("Báo cáo xuất file", 6, 4),
    ("Thông báo đẩy", 4, 2),
    ("Giao diện tối", 2, 3),
    ("Tìm kiếm nâng cao", 8, 5),
]
NGAY = 10

dung = 0
for ten, gia_tri, cong_suc in sorted(viec, key=lambda v: v[1] / v[2], reverse=True):
    if dung + cong_suc <= NGAY:
        dung += cong_suc
        print("Giữ:", ten)
    else:
        print("Cắt:", ten)
print(f"Tổng: {dung}/{NGAY} ngày")
`,
      expectedOutput: `Giữ: Đăng nhập
Giữ: Thông báo đẩy
Giữ: Tìm kiếm nâng cao
Cắt: Báo cáo xuất file
Cắt: Giao diện tối
Tổng: 10/10 ngày`,
      hints: [
        "Tỷ lệ của mỗi việc là giá trị chia công sức. Duyệt từ tỷ lệ cao xuống thấp.",
        "Dùng sorted(viec, key=..., reverse=True) trong dòng for.",
      ],
    },
    {
      type: "feynman",
      title: "Ba thứ không giữ được cùng lúc",
      intro:
        "Bạn sửa nhà để kịp đón khách dịp Tết. Thợ báo thiếu thời gian: hoặc bỏ bớt phòng, hoặc dời ngày Tết (không thể), hoặc quét sơn mỏng để kịp. Mỗi cách để lại một dấu vết rất khác nhau.",
      columns: ["Thứ nhường", "Ở ví dụ sửa nhà", "Hậu quả sau đó"],
      rows: [
        [
          "Phạm vi",
          "Sửa hai phòng quan trọng nhất, hẹn phòng thứ ba sau Tết.",
          "Có một cuộc nói chuyện khó hôm nay, nhưng mọi thứ đã làm đều chắc chắn.",
        ],
        [
          "Thời gian",
          "Xin khách đến muộn hơn một tuần.",
          "Chỉ dùng được khi khách chịu, thường bị ràng buộc bởi điều bạn không kiểm soát.",
        ],
        [
          "Chất lượng",
          "Quét sơn mỏng và không xử lý chỗ ẩm.",
          "Không ai bị báo trước; vài tháng sau tường bong ra, tốn nhiều hơn phần đã tiết kiệm.",
        ],
      ],
      oneLiner:
        "Cắt việc là một quyết định, còn cắt chất lượng là một khoản vay mà không ai nhớ mình đã ký.",
    },
  ],

  "uu-tien-va-chi-phi-tri-hoan": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp danh sách theo chi phí trì hoãn trên công sức",
      task: "Mỗi việc có chi phí trì hoãn (số người-ngày mất đi cho mỗi tuần hoãn) và công sức (ngày). Số minh hoạ. Hiện mã xếp theo chi phí trì hoãn riêng nên việc lớn nhưng tốn công lên đầu. Hãy xếp theo tỷ lệ giữa chi phí trì hoãn và công sức, từ cao xuống thấp.",
      starter: `viec = [
    ("Sửa lỗi xuất báo cáo", 6, 2),
    ("Giao diện tối", 1, 3),
    ("API cho đối tác, mốc cố định", 12, 8),
    ("Gỡ chặn cho ba đội", 9, 2),
    ("Tối ưu trang chủ", 2, 5),
]

xep = sorted(viec, key=lambda v: v[1], reverse=True)
for i, (ten, tri_hoan, cong_suc) in enumerate(xep, 1):
    print(f"{i}. {ten} ({tri_hoan / cong_suc:.2f})")
`,
      solution: `viec = [
    ("Sửa lỗi xuất báo cáo", 6, 2),
    ("Giao diện tối", 1, 3),
    ("API cho đối tác, mốc cố định", 12, 8),
    ("Gỡ chặn cho ba đội", 9, 2),
    ("Tối ưu trang chủ", 2, 5),
]

xep = sorted(viec, key=lambda v: v[1] / v[2], reverse=True)
for i, (ten, tri_hoan, cong_suc) in enumerate(xep, 1):
    print(f"{i}. {ten} ({tri_hoan / cong_suc:.2f})")
`,
      expectedOutput: `1. Gỡ chặn cho ba đội (4.50)
2. Sửa lỗi xuất báo cáo (3.00)
3. API cho đối tác, mốc cố định (1.50)
4. Tối ưu trang chủ (0.40)
5. Giao diện tối (0.33)`,
      hints: [
        "Khoá sắp xếp cần là v[1] / v[2], không phải riêng v[1].",
        "Việc hai ngày gỡ chặn cho ba đội phải nhảy lên đầu, đúng như bài nói.",
      ],
    },
    {
      type: "flow",
      title: "Một buổi ưu tiên không cãi nhau về giá trị",
      steps: [
        {
          label: "Gom danh sách",
          detail:
            "Viết mọi việc đang chờ vào một chỗ, kể cả những việc ai cũng đồng ý là hữu ích. Câu hỏi này có giá trị không luôn trả lời có nên không dùng nó để lọc.",
        },
        {
          label: "Hỏi: hoãn ba tháng thì mất gì",
          detail:
            "Với mỗi việc, người yêu cầu phải nói cụ thể mất khách lớn, lỡ mùa cao điểm, ba đội đứng chờ, hay gần như không mất gì. Chính các câu trả lời khác nhau này sắp xếp được danh sách.",
        },
        {
          label: "Ước công sức",
          detail:
            "Đội kỹ thuật cho một con số thô theo ngày, kèm mức tin cậy. Mục đích là so sánh tương đối giữa các việc, chứ không phải cam kết ngày giao.",
        },
        {
          label: "Chia và xếp hạng",
          detail:
            "Lấy chi phí trì hoãn chia công sức rồi xếp từ cao xuống thấp. Việc hai ngày gỡ ba đội thường vượt lên việc lớn hơn, đúng chỗ của nó.",
        },
        {
          label: "Kẻ vạch",
          detail:
            "Kẻ một vạch tại chỗ thời gian của quý hết. Mọi việc dưới vạch được nói thẳng là chưa làm trong quý này, thay vì treo ở trạng thái đang xem xét.",
        },
      ],
    },
  ],

  "noi-khong-va-chi-phi-co-hoi": [
    {
      type: "scenario",
      title: "Một yêu cầu thêm ngay trước mốc giao",
      start: "yeu-cau",
      nodes: {
        "yeu-cau": {
          text: "Đội bạn đang chạy nước rút để giao tính năng thanh toán đúng hạn. Giám đốc kinh doanh nhờ thêm một báo cáo tuỳ biến, nói là chỉ mất vài ngày. Đội không còn dư thời gian. Bạn trả lời thế nào?",
          choices: [
            { label: "Gật đầu rồi tìm cách làm thêm giờ", next: "gat" },
            { label: "Nói thẳng là đội không có thời gian cho việc này", next: "tu-choi" },
            { label: "Cho họ xem danh sách việc và hỏi nên lùi việc nào", next: "danh-sach" },
          ],
        },
        gat: {
          text: "Tuần cuối cùng, tính năng thanh toán trượt hạn và đội mới báo, đúng lúc không còn phương án nào. Kế hoạch của bên kinh doanh đổ theo, và quan hệ với họ tệ hơn nhiều so với một lần từ chối ban đầu.",
          ending: "bad",
        },
        "tu-choi": {
          text: "Câu trả lời nghe như một phán xét. Họ kể lại với cấp trên rằng đội kỹ thuật không hợp tác, cuộc nói chuyện biến thành cãi nhau ai đúng, và không ai bàn tới việc nào quan trọng hơn.",
          ending: "bad",
        },
        "danh-sach": {
          text: "Họ xem danh sách, im lặng một lúc rồi nói báo cáo ấy quan trọng hơn mốc thanh toán ba tuần nữa. Bạn làm gì tiếp?",
          choices: [
            { label: "Nhận việc, nhưng chưa nói gì với bên thanh toán", next: "lang-le" },
            { label: "Ghi việc nào lùi, lùi bao lâu, và báo mọi bên ngay", next: "bao-som" },
          ],
        },
        "lang-le": {
          text: "Bên làm thanh toán vẫn đợi mốc cũ và phát hiện việc bị lùi khi đã chuẩn bị cả đợt truyền thông. Việc đánh đổi đã xảy ra, chỉ là người phải chịu nó không được báo trước.",
          ending: "bad",
        },
        "bao-som": {
          text: "Cả hai bên cùng biết thanh toán lùi ba tuần vì báo cáo, và cùng đồng ý từ thời điểm còn nhiều lựa chọn. Việc bị lùi là kết quả của một quyết định, không phải một phát hiện vào phút chót.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một lời từ chối biến thành một cuộc bàn thứ tự",
      steps: [
        {
          label: "Nhận yêu cầu",
          detail:
            "Ghi lại đúng người yêu cầu muốn gì và vì sao cần. Chưa đồng ý và chưa từ chối, vì hiểu nhu cầu thật thường cho thấy cách làm rẻ hơn.",
        },
        {
          label: "Đặt cạnh danh sách hiện tại",
          detail:
            "Cho người yêu cầu xem những việc đội đang làm, kèm công sức và mốc của từng việc. Thời gian không co giãn, nên mọi việc nhận thêm đều đẩy một việc khác đi.",
        },
        {
          label: "Hỏi về thứ tự",
          detail:
            "Thay vì tôi không làm được, hỏi việc của bạn nên đứng trước việc nào. Người yêu cầu từ người nhận kết quả thành người tham gia quyết định.",
        },
        {
          label: "Chốt hệ quả",
          detail:
            "Ghi rõ việc nào lùi, bao lâu, và ai bị ảnh hưởng. Một dòng ngắn như vậy biến đánh đổi ngầm thành đánh đổi có chủ đích.",
        },
        {
          label: "Báo mọi bên liên quan",
          detail:
            "Gửi ngay cho những người phụ thuộc vào việc bị lùi, khi họ còn thời gian điều chỉnh kế hoạch. Báo sớm là món quà, dù nó khó chịu cho bạn ở lúc nói.",
        },
      ],
    },
  ],

  "kiem-chung-truoc-khi-xay": [
    {
      type: "exercise",
      language: "python",
      title: "Cân bằng chứng, đừng đếm bằng chứng",
      task: "Đội gom được tám tín hiệu cho một tính năng mới. Bài nói không phải bằng chứng nào cũng nặng như nhau, nên mỗi loại có trọng số (số minh hoạ cho bài tập này, không phải quy tắc): đã trả giá 5, đã hỏi 2, nói sẽ dùng 0. Điểm tối thiểu để xây là 6. Hiện mã cho mọi tín hiệu cùng trọng số 1, nên tám lời nói sẽ làm đội xây nhầm.",
      starter: `tin_hieu = ["noi_se_dung"] * 7 + ["da_hoi"]
trong_so = {"da_tra_gia": 1, "da_hoi": 1, "noi_se_dung": 1}
NGUONG = 6

diem = sum(trong_so[t] for t in tin_hieu)
print("Điểm bằng chứng:", diem)
print("Quyết định:", "xây" if diem >= NGUONG else "kiểm chứng thêm")
`,
      solution: `tin_hieu = ["noi_se_dung"] * 7 + ["da_hoi"]
trong_so = {"da_tra_gia": 5, "da_hoi": 2, "noi_se_dung": 0}
NGUONG = 6

diem = sum(trong_so[t] for t in tin_hieu)
print("Điểm bằng chứng:", diem)
print("Quyết định:", "xây" if diem >= NGUONG else "kiểm chứng thêm")
`,
      expectedOutput: `Điểm bằng chứng: 2
Quyết định: kiểm chứng thêm`,
      hints: [
        "Chỉ cần đổi các số trong trong_so; phần tính điểm đã đúng.",
        "Gần như vô giá trị nghĩa là nói sẽ dùng nên tính 0.",
      ],
    },
    {
      type: "flow",
      title: "Mua thông tin rẻ trước khi mua ba tháng công sức",
      steps: [
        {
          label: "Viết giả định ra giấy",
          detail:
            "Ví dụ: quản lý cửa hàng đang tốn nhiều giờ mỗi tuần để gộp số liệu bán hàng. Một giả định viết ra được thì kiểm chứng được; một giả định chỉ nằm trong đầu thì chỉ bị bảo vệ.",
        },
        {
          label: "Tìm dấu vết xoay xở",
          detail:
            "Xem người dùng có xuất dữ liệu sang công cụ khác không, đội hỗ trợ có đang làm tay một việc lặp lại không, nhiều khách không quen nhau có xin cùng một thứ không. Đây là loại bằng chứng mạnh nhất vì đã tốn công sức thật.",
        },
        {
          label: "Hỏi về quá khứ",
          detail:
            "Mời vài người đã để lại dấu vết và hỏi lần gần nhất họ gặp việc đó, đã làm gì. Câu trả lời có bối cảnh và chi tiết, khác hẳn một chữ có.",
        },
        {
          label: "Thử bằng bản thô",
          detail:
            "Nếu vẫn chưa chắc, làm tay hoặc dựng bản giả cho vài người dùng. Chi phí là vài ngày, và đổi lại bạn thấy họ có thật sự dùng không.",
        },
        {
          label: "Quyết định xây hay dừng",
          detail:
            "Nếu không ai đang xoay xở, hoặc vấn đề không đủ đau, hoặc bạn chưa nhìn đúng chỗ. Cả hai đáng biết trước khi bỏ ba tháng, và đều rẻ hơn nhiều so với phát hiện sau.",
        },
      ],
    },
  ],

  "xay-thu-khong-ai-can": [
    {
      type: "scenario",
      title: "Tính năng chia sẻ báo cáo không ai dùng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Tính năng chia sẻ báo cáo đã làm ba tháng và ra mắt hai tháng, nhưng rất ít người dùng. Đội đang bàn xem nên làm gì tiếp. Bạn đề xuất gì?",
          choices: [
            { label: "Quảng bá thêm trong sản phẩm và qua email", next: "quang-ba" },
            { label: "Thiết kế lại luồng chia sẻ cho rõ ràng hơn", next: "thiet-ke" },
            { label: "Hỏi xem vấn đề này có thật sự đau với ai không", next: "kiem" },
          ],
        },
        "quang-ba": {
          text: "Lượt nhấp tăng trong tuần đầu, nhưng gần như không ai quay lại dùng lần hai. Đội mất thêm hai tháng trong khi giả định cốt lõi, rằng vấn đề này có thật, vẫn chưa được kiểm tra.",
          ending: "bad",
        },
        "thiet-ke": {
          text: "Luồng mới đẹp hơn và rõ hơn, nhưng số người dùng gần như không đổi. Hai tháng thiết kế giải quyết một vấn đề mà có lẽ chưa từng có ai gặp.",
          ending: "bad",
        },
        kiem: {
          text: "Bạn nói chuyện với người dùng và hỏi đội hỗ trợ. Không ai đang tự xoay xở với việc chia sẻ báo cáo: không xuất file để gửi mail, không chụp màn hình. Giữ hay gỡ?",
          choices: [
            { label: "Giữ lại vì đã bỏ ba tháng vào nó", next: "giu" },
            { label: "Gỡ đi và ghi lại bài học cho các dự án sau", next: "go" },
          ],
        },
        giu: {
          text: "Ba tháng đã bỏ ra không quay lại dù giữ hay gỡ. Giữ chỉ làm chi phí bảo trì chạy mỗi tháng và để lại thêm một nút nữa trên giao diện vốn đã đông đúc.",
          ending: "bad",
        },
        go: {
          text: "Một lần khó chịu, kèm vài tin nhắn cho số ít người đang dùng. Đổi lại sản phẩm nhẹ hơn, và đội có một dòng bài học: kiểm chứng vấn đề trước khi xây lời giải.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Chi phí đã chìm không quay lại",
      intro:
        "Một quán đã mua nguyên liệu và công thức cho món mới, nhưng sau hai tháng gần như không ai gọi. Chủ quán vẫn để nó trong thực đơn vì ngại bỏ công đã bỏ ra.",
      columns: ["Giả thuyết đội nghĩ tới", "Ví dụ ở quán", "Câu hỏi nên đặt trước"],
      rows: [
        [
          "Quảng bá thêm",
          "Dán biển ở cửa quảng cáo món mới.",
          "Có ai từng đòi món kiểu này, hay chúng ta đang tìm khách cho món?",
        ],
        [
          "Thiết kế lại",
          "Đổi tên món và chụp ảnh đẹp hơn.",
          "Khách có ngần ngại vì giao diện, hay vì họ không muốn món này?",
        ],
        [
          "Vấn đề không đủ đau",
          "Món ngon nhưng không ai thấy thiếu nó.",
          "Có ai đang tự xoay xở thay món này không? Nếu không thì dừng.",
        ],
      ],
      oneLiner:
        "Công đã bỏ ra là cũ, câu hỏi duy nhất là đồng công sức tiếp theo nên đặt vào đâu.",
    },
  ],

  "lam-viec-voi-nguoi-khong-phai-ky-su": [
    {
      type: "scenario",
      title: "Cần dời hạn vì mã thanh toán quá lộn xộn",
      start: "hoi",
      nodes: {
        hoi: {
          text: "Bạn cần dời hạn tính năng mới vì phần mã thanh toán rối và đang làm mọi thay đổi chậm đi. Giám đốc sản phẩm hỏi: sao lâu vậy, bạn nói gì?",
          choices: [
            { label: "Giải thích về nợ kỹ thuật và các lớp phụ thuộc", next: "thuat-ngu" },
            { label: "Nói đơn giản là cần thêm thời gian, đừng lo", next: "don-gian" },
            { label: "Đưa hai phương án, mỗi cái ghi thời gian, rủi ro, tiền", next: "dich" },
          ],
        },
        "thuat-ngu": {
          text: "Họ gật đầu lịch sự nhưng không hiểu điều gì đang bị đánh đổi. Họ quyết định theo cảm giác rằng kỹ sư lại viện cớ, và lý do thật của bạn không có mặt trong cuộc quyết định.",
          ending: "bad",
        },
        "don-gian": {
          text: "Họ không có gì để cân nhắc ngoài việc tin hay không tin bạn. Lần sau bạn xin dời hạn nữa, họ thấy một thói quen chứ không thấy một đánh đổi, và sự tin tưởng giảm dần.",
          ending: "bad",
        },
        dich: {
          text: "Phương án A giao tuần sau nhưng mọi thay đổi ở vùng này về sau chậm gấp ba, với rủi ro lỗi thanh toán cao hơn. Phương án B giao muộn hai tuần nhưng dọn xong trước. Họ cho biết có khách lớn cần mốc tháng sau. Bạn làm gì?",
          choices: [
            { label: "Chọn A, ghi rõ rủi ro đã nhận, đặt lịch dọn sau", next: "chon-a" },
            { label: "Bảo vệ B và bỏ qua ràng buộc khách lớn", next: "bo-qua" },
          ],
        },
        "chon-a": {
          text: "Cả hai cùng quyết định với đầy đủ thông tin: mốc khách lớn được giữ, rủi ro và việc dọn dẹp có tên và có ngày. Họ biết phần kỹ thuật bạn lo, bạn biết phần kinh doanh họ lo.",
          ending: "good",
        },
        "bo-qua": {
          text: "Bạn giữ vững quan điểm nhưng không tính tới cam kết khách lớn mà họ biết còn bạn thì không. Họ chọn A mà không bàn với bạn nữa, và lần sau không còn mời bạn vào cuộc họp quyết định.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Dịch một đánh đổi kỹ thuật ra ngôn ngữ của người quyết định",
      steps: [
        {
          label: "Bắt đầu từ lo ngại kỹ thuật",
          detail:
            "Mã thanh toán lộn xộn và thiếu kiểm thử. Đây là sự thật bạn biết rõ, nhưng người kia không dùng đơn vị này để cân nhắc.",
        },
        {
          label: "Đổi sang thời gian",
          detail:
            "Mỗi thay đổi ở vùng này đang tốn gấp ba thời gian so với vùng khác, và khoảng cách ấy có xu hướng giãn ra. Nội dung vẫn còn nguyên, chỉ đổi đơn vị.",
        },
        {
          label: "Đổi sang rủi ro",
          detail:
            "Xác suất một lỗi lọt ra người dùng đang cao, mức thiệt hại nếu hỏng là sai lệch số tiền, và thời gian khắc phục thường là nửa ngày. Ba mảnh này giúp người nghe tự ước lượng rủi ro.",
        },
        {
          label: "Đổi sang tiền",
          detail:
            "Doanh thu bị ảnh hưởng nếu thanh toán hỏng, chi phí hạ tầng, hay công sức của người khác đang bị chặn. Chọn mảnh nào gần nhất với điều người kia đang theo dõi.",
        },
        {
          label: "Đưa hai phương án",
          detail:
            "Mỗi phương án kèm hệ quả. Bên kia ghép thông tin của bạn vào ràng buộc họ biết, thay vì phải chọn giữa tin bạn và không tin bạn.",
        },
      ],
    },
  ],

  "du-an-tu-y-tuong-toi-do-luong": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản nháp dự án do AI viết còn thủng ở đâu",
      task: "Một trợ lý AI viết nháp tài liệu bắt đầu dự án cho đội. Bấm vào những đoạn đi ngược các bước đã học trong chặng này, rồi nộp.",
      segments: [
        {
          text: "Vấn đề: người dùng cần một bảng điều khiển mới với năm biểu đồ.",
          error:
            "Đây là một giải pháp được viết thành vấn đề. Vấn đề phải nói theo góc nhìn người dùng, ví dụ họ mất nhiều giờ mỗi tuần để gộp số liệu, chứ không phải thứ ta định xây.",
        },
        {
          text: "Người gặp vấn đề: các quản lý cửa hàng; số lượng cụ thể sẽ lấy từ bảng tài khoản trước khi bắt đầu.",
        },
        {
          text: "Bằng chứng: trong khảo sát, đa số quản lý trả lời rằng họ sẽ dùng bảng điều khiển.",
          error:
            "Nói sẽ dùng là bằng chứng yếu nhất vì ai cũng đồng ý với ý tưởng nghe hợp lý. Cần dấu vết đã trả giá, như quản lý xuất dữ liệu ra bảng tính để tự gộp.",
        },
        {
          text: "Phiên bản đầu: một biểu đồ duy nhất, nhắm vào giả định rủi ro nhất, bật bằng cờ tính năng cho một phần nhỏ người dùng.",
        },
        {
          text: "Thước đo: tỷ lệ quản lý mở bảng điều khiển hằng tuần, với ngưỡng đáng làm được chốt trước khi phát hành.",
        },
        {
          text: "Sau khi giao, đội chuyển ngay sang dự án tiếp theo; kết quả sẽ được xem khi có thời gian.",
          error:
            "Đây là vòng hở: không ai quay lại hỏi cái vừa làm có tác dụng không, nên không học được gì. Lịch xem kết quả phải được đặt ngay từ lúc bắt đầu.",
        },
      ],
    },
    {
      type: "flow",
      title: "Một vòng từ giả định tới bằng chứng",
      steps: [
        {
          label: "Viết bốn câu",
          detail:
            "Vấn đề là gì theo góc nhìn người dùng, ai gặp và bao nhiêu người, bằng chứng nào cho thấy nó có thật, con số nào sẽ cho biết đã giải được. Bốn câu này chặn phần lớn dự án không đáng làm.",
        },
        {
          label: "Cắt lát nhỏ nhất",
          detail:
            "Chọn lát chạm được người dùng thật và nhắm vào giả định rủi ro nhất, không phải chỗ dễ nhất. Làm phần dễ trước chỉ là trì hoãn tin xấu.",
        },
        {
          label: "Giao qua cờ tính năng",
          detail:
            "Bật cho một phần nhỏ người dùng, chia ngẫu nhiên nếu muốn so sánh, và giữ một nhóm không có tính năng làm mốc. Tắt đi chỉ cần một công tắc nếu số liệu xấu.",
        },
        {
          label: "Đo chỉ số đã chọn",
          detail:
            "Dùng đúng chỉ số và định nghĩa đã chốt từ đầu, kèm các ràng buộc không được xấu đi. Không thêm thước đo mới sau khi đã thấy kết quả.",
        },
        {
          label: "Xem lại và quyết định",
          detail:
            "Buổi xem kết quả đã nằm trong lịch từ ngày đầu. Kết luận là mở rộng, chỉnh hoặc dừng, và ghi lại điều đội học được để vòng sau bắt đầu từ chỗ cao hơn.",
        },
      ],
    },
  ],

  "on-tap-do-luong-va-chon-viec": [
    {
      type: "scenario",
      title: "Bốn câu hỏi trước khi nhận một dự án",
      start: "de-xuat",
      nodes: {
        "de-xuat": {
          text: "Đội đề xuất làm trang gợi ý cá nhân hoá cho ứng dụng và đã vẽ xong giao diện. Bạn là người chặn hoặc cho đi. Bạn mở đầu thế nào?",
          choices: [
            { label: "Cho đi vì giao diện xong rồi, sẽ đo sau", next: "do-sau" },
            { label: "Bàn xem nên chọn thuật toán gợi ý nào trước", next: "thuat-toan" },
            { label: "Hỏi vấn đề của ai và bằng chứng nào cho thấy nó có thật", next: "van-de" },
          ],
        },
        "do-sau": {
          text: "Ba tháng sau tính năng ra mắt, và không ai nhớ con số nào sẽ cho biết nó thành công. Mọi người tự chọn thước đo có lợi cho mình, vòng lặp không bao giờ khép và đội không học được gì.",
          ending: "bad",
        },
        "thuat-toan": {
          text: "Cả buổi dành cho cách làm, trong khi câu hỏi nên làm hay không chưa ai hỏi. Đội xây một hệ thống gợi ý tinh vi cho một nhu cầu chưa ai chứng minh.",
          ending: "bad",
        },
        "van-de": {
          text: "Đội trả lời: vài khách phàn nàn và ba người nói sẽ thích. Chưa ai chỉ ra được người dùng đang tự xoay xở thế nào. Bạn xử lý ra sao?",
          choices: [
            { label: "Chấp nhận ba lời nói sẽ thích là đủ", next: "du" },
            { label: "Xem dấu vết ở đội hỗ trợ và dữ liệu xuất file", next: "dau-vet" },
          ],
        },
        du: {
          text: "Lời nói sẽ thích là bằng chứng yếu nhất, và đội lại xây thứ không ai cần. Ba tháng sau, nhóm lớn nhất, những người thử một lần rồi lặng lẽ bỏ đi, không để lại phản hồi nào.",
          ending: "bad",
        },
        "dau-vet": {
          text: "Bạn thấy hai khách lớn xuất dữ liệu ra bảng tính để tự lọc sản phẩm, và đội hỗ trợ có ghi chú những yêu cầu giống nhau. Vấn đề có thật. Giờ bạn muốn cam kết ra sao?",
          choices: [
            { label: "Xây bản đầy đủ rồi tính chỉ số sau", next: "day-du" },
            { label: "Chốt chỉ số trước, rồi cắt lát nhỏ nhất bằng cờ tính năng", next: "lat-nho" },
          ],
        },
        "day-du": {
          text: "Vấn đề có thật nhưng bạn dồn ba tháng vào bản đầy đủ mà không kiểm chứng giả định rủi ro nhất. Khi đo, kết quả mơ hồ vì chưa ai thống nhất thế nào là thành công.",
          ending: "bad",
        },
        "lat-nho": {
          text: "Chỉ số được chốt, lát đầu giao cho một phần nhỏ người dùng trong hai tuần, và buổi xem kết quả đã đặt lịch. Dù kết quả ra sao, đội cũng có một câu trả lời.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Đo cho đúng rồi chọn cho đúng, theo một dòng chảy",
      steps: [
        {
          label: "Có một vấn đề của người dùng",
          detail:
            "Bắt đầu bằng dấu vết của người đang xoay xở, như xuất dữ liệu ra bảng tính hay gọi hỗ trợ cùng một việc, chứ không bằng một ý tưởng hay.",
        },
        {
          label: "Chọn một chỉ số, viết định nghĩa",
          detail:
            "Một chỉ số dẫn dắt cùng vài ràng buộc, kèm định nghĩa ghi ở một chỗ duy nhất. Con số không có định nghĩa thì không so sánh được với chính nó của tháng trước.",
        },
        {
          label: "Cắt lát nhỏ, ước lượng thật",
          detail:
            "Chia việc tới mức giống những việc đội từng làm, rồi nhân hệ số hiệu chỉnh từ lịch sử. Lát đầu tiên nhắm vào giả định rủi ro nhất.",
        },
        {
          label: "Giao và so sánh cùng thời điểm",
          detail:
            "Giao qua cờ tính năng cho một phần nhỏ, giữ nhóm đối chứng. Tương quan chỉ mở ra câu hỏi; nhóm đối chứng mới trả lời nó.",
        },
        {
          label: "Xem lại, nói không hoặc kẻ vạch",
          detail:
            "Dựa trên kết quả, quyết định mở rộng hay dừng, và nói thẳng việc nào chưa làm quý này. Mỗi lời đồng ý là một lời từ chối với việc khác.",
        },
      ],
    },
  ],
};
