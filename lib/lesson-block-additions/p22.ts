import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 22. Một người viết cho một tệp.
export const P22_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "he-thong-lon-khac-he-thong-nho": [
    {
      type: "exercise",
      language: "python",
      title: "Đếm đường liên lạc khi đội lớn lên",
      task: "Một đội n người có bao nhiêu cặp có thể phải trao đổi với nhau? Sửa hàm duong() cho đúng, để chương trình in ra số đường của đội 5 người, đội 20 người, và năng lực làm việc tăng bao nhiêu lần so với đường liên lạc tăng bao nhiêu lần.",
      starter: `def duong(n):
    return n * n // 2

for n in (5, 20):
    print(f"{n} người: {duong(n)} đường")
print(f"Năng lực x{20 // 5}, đường liên lạc x{duong(20) // duong(5)}")`,
      solution: `def duong(n):
    return n * (n - 1) // 2

for n in (5, 20):
    print(f"{n} người: {duong(n)} đường")
print(f"Năng lực x{20 // 5}, đường liên lạc x{duong(20) // duong(5)}")`,
      expectedOutput: `5 người: 10 đường
20 người: 190 đường
Năng lực x4, đường liên lạc x19`,
      hints: [
        "Mỗi người không nói chuyện với chính mình, nên mỗi người có n - 1 người để nối.",
        "Cặp (A, B) và cặp (B, A) là một đường, nên phải chia đôi.",
      ],
    },
    {
      type: "chart",
      title: "Đường liên lạc tăng nhanh hơn số người",
      caption:
        "Số liệu minh hoạ: thực tế không phải cặp nào cũng phải nói chuyện, nên thanh trượt cho bạn chỉnh tỉ lệ cặp thật sự cần trao đổi. Điều đáng nhìn là hình dạng: đường liên lạc cong lên trong khi số người tăng đều.",
      kind: "line",
      xLabel: "Số người trong tổ chức",
      yLabel: "Số đường liên lạc / số người",
      x: { from: 2, to: 40, step: 2 },
      params: [{ id: "tl", label: "Tỉ lệ cặp thật sự cần trao đổi", min: 10, max: 100, step: 10, value: 100, unit: "%" }],
      series: [
        { label: "Đường liên lạc", expr: "x*(x-1)/2*tl/100" },
        { label: "Số người", expr: "x" },
      ],
    },
  ],

  "ranh-gioi-va-quyen-so-huu": [
    {
      type: "exercise",
      language: "python",
      title: "Đếm số lần một tính năng vượt ranh giới",
      task: "Mỗi tính năng chạm vài thành phần, tên dạng miền/tầng. Một tính năng vượt ranh giới (số đội khác nhau - 1) lần. Mã khởi đầu đếm số thành phần chứ chưa đếm số đội. Sửa để so được hai cách chia: theo tầng và theo miền.",
      starter: `dac_diem = [
    ["don-hang/ui", "don-hang/api", "don-hang/db"],
    ["thanh-toan/ui", "thanh-toan/api", "thanh-toan/db"],
    ["kho/api", "kho/db"],
    ["don-hang/api", "thanh-toan/api"],
]

def chu_theo_tang(phan):
    return phan.split("/")[1]

def chu_theo_mien(phan):
    return phan.split("/")[0]

def so_lan_vuot(chu):
    tong = 0
    for phan in dac_diem:
        doi = [chu(p) for p in phan]
        tong += len(doi) - 1
    return tong

print(f"Cắt theo tầng: {so_lan_vuot(chu_theo_tang)} lần vượt ranh giới")
print(f"Cắt theo miền: {so_lan_vuot(chu_theo_mien)} lần vượt ranh giới")`,
      solution: `dac_diem = [
    ["don-hang/ui", "don-hang/api", "don-hang/db"],
    ["thanh-toan/ui", "thanh-toan/api", "thanh-toan/db"],
    ["kho/api", "kho/db"],
    ["don-hang/api", "thanh-toan/api"],
]

def chu_theo_tang(phan):
    return phan.split("/")[1]

def chu_theo_mien(phan):
    return phan.split("/")[0]

def so_lan_vuot(chu):
    tong = 0
    for phan in dac_diem:
        doi = set(chu(p) for p in phan)
        tong += len(doi) - 1
    return tong

print(f"Cắt theo tầng: {so_lan_vuot(chu_theo_tang)} lần vượt ranh giới")
print(f"Cắt theo miền: {so_lan_vuot(chu_theo_mien)} lần vượt ranh giới")`,
      expectedOutput: `Cắt theo tầng: 5 lần vượt ranh giới
Cắt theo miền: 1 lần vượt ranh giới`,
      hints: [
        "Hai thành phần cùng thuộc một đội thì không tạo ra ranh giới nào cả.",
        "Dùng set để mỗi đội chỉ được đếm một lần cho mỗi tính năng.",
      ],
    },
    {
      type: "feynman",
      title: "Cắt theo tầng hay theo miền, nhìn từ căn bếp",
      intro:
        "Hãy nghĩ tới một bếp nhà hàng. Bạn có thể chia người theo công đoạn (một người chỉ thái, một người chỉ nấu, một người chỉ bày) hoặc chia theo món (mỗi quầy lo trọn một món). Món mới ra mắt sẽ cho bạn thấy cách chia nào hợp với hướng công việc.",
      columns: ["Cách chia", "Giống như trong bếp", "Khi có một món mới"],
      rows: [
        ["Theo tầng", "Ba người, mỗi người một công đoạn cho mọi món", "Món nào cũng cần cả ba người ngồi lại"],
        ["Theo miền", "Mỗi quầy lo trọn một món từ thái tới bày", "Món mới chỉ động tới một quầy"],
        ["Vùng ai cũng sửa", "Nồi nước dùng chung, ai qua cũng nêm một chút", "Không ai còn nhớ công thức gốc"],
      ],
      oneLiner: "Chia sao cho phần lớn thay đổi nằm gọn trong một đội, vì mỗi ranh giới bị vượt qua là một cuộc họp.",
    },
  ],

  "phu-thuoc-cheo-giua-cac-doi": [
    {
      type: "scenario",
      title: "Việc của bạn nằm cuối hàng đợi của đội khác",
      start: "bi-chan",
      nodes: {
        "bi-chan": {
          text: "Đội bạn cần một thay đổi nhỏ trong mã của đội Thanh toán để ra mắt tính năng. Đội kia ước tính ba tuần vì việc của bạn nằm cuối hàng đợi. Bạn làm gì trước?",
          choices: [
            { label: "Gửi yêu cầu vào hàng đợi rồi làm việc khác", next: "ticket" },
            { label: "Nhắn ai bị chặn, tốn gì và hạn nào", next: "nhan" },
            { label: "Nhờ quản lý đội kia ép làm ngay hôm nay", next: "leo" },
          ],
        },
        ticket: {
          text: "Ba tuần sau yêu cầu vẫn nằm đó, vì đội Thanh toán không biết nó đang chặn một đợt ra mắt. Ngày hẹn trượt, và đội bạn mất thêm vài ngày nạp lại bối cảnh các việc đã bỏ dở.",
          ending: "bad",
        },
        leo: {
          text: "Đội Thanh toán làm ngay, nhưng việc họ đang dở bị hoãn và họ nhớ chuyện đó. Lần sau yêu cầu của bạn nằm cuối hàng đợi một lần nữa, và đội kia ít muốn giúp hơn.",
          ending: "bad",
        },
        nhan: {
          text: "Đội Thanh toán trả lời rằng họ không biết việc này chặn ai. Họ chịu xếp lại, nhưng phần của họ vẫn mất hai tuần. Họ cũng nói bạn có thể tự viết phần nhỏ đó nếu họ duyệt. Bạn chọn gì?",
          choices: [
            { label: "Chờ theo lịch hai tuần của họ", next: "cho" },
            { label: "Tự viết phần nhỏ, họ duyệt lại", next: "tulam" },
            { label: "Đề nghị chuyển hẳn mã đó sang đội bạn", next: "chuyen" },
          ],
        },
        cho: {
          text: "Tính năng ra mắt trễ hai tuần. Tuần sau lại có một đội khác chen vào hàng đợi trước, và phần nạp lại bối cảnh vẫn tốn thêm vài ngày cho đội bạn.",
          ending: "bad",
        },
        chuyen: {
          text: "Cuộc bàn về quyền sở hữu mất một tháng họp với ba đội, chỉ vì một thay đổi nhỏ xảy ra một lần. Ranh giới chưa bị vượt qua liên tục nên chưa có lý do để vẽ lại.",
          ending: "bad",
        },
        tulam: {
          text: "Bạn viết phần nhỏ trong hai ngày, đội Thanh toán duyệt theo tiêu chuẩn của họ và giữ được chất lượng. Tính năng ra đúng hẹn, đội kia không mất tốc độ và vẫn là chủ của đoạn mã đó.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Ba tuần bị chặn thật sự tốn bao nhiêu",
      caption:
        "Số liệu minh hoạ: giả sử mỗi lần nạp lại bối cảnh tốn vài ngày, và người ta phải nạp hai lần (khi bỏ dở và khi quay lại). Báo cáo chỉ thấy đường trên lịch, còn đường thực tế mới là thứ đội bạn trả.",
      kind: "line",
      xLabel: "Số tuần bị chặn",
      yLabel: "Công sức mất (tuần-người)",
      x: { from: 1, to: 8, step: 1 },
      params: [
        { id: "nguoi", label: "Số người bị chặn", min: 1, max: 8, step: 1, value: 3, unit: "người" },
        { id: "nap", label: "Ngày để nạp lại bối cảnh mỗi lần", min: 0, max: 5, step: 1, value: 3, unit: "ngày" },
      ],
      series: [
        { label: "Trên lịch", expr: "x*nguoi" },
        { label: "Thực tế", expr: "(x+2*nap/5)*nguoi" },
      ],
    },
  ],

  "hop-dong-giua-cac-doi": [
    {
      type: "exercise",
      language: "javascript",
      title: "Cỗ máy kiểm hợp đồng giữa hai đội",
      task: "Đội Đơn hàng hứa trả về ba trường với kiểu dữ liệu cho trước. Hàm kiemTra() mới chỉ bắt trường bị thiếu. Mở rộng để nó bắt cả trường sai kiểu, rồi in ra số vi phạm và từng vi phạm. Trường thừa không phải vi phạm.",
      starter: `var hopDong = { maDon: "string", soTien: "number", trangThai: "string" };
var phanHoi = { maDon: "A17", soTien: "250000", status: "paid" };

function kiemTra(p, hd) {
  var loi = [];
  for (var truong in hd) {
    if (!(truong in p)) loi.push("thiếu " + truong);
  }
  return loi;
}

var loi = kiemTra(phanHoi, hopDong);
console.log("Vi phạm: " + loi.length);
loi.forEach(function (l) { console.log("- " + l); });`,
      solution: `var hopDong = { maDon: "string", soTien: "number", trangThai: "string" };
var phanHoi = { maDon: "A17", soTien: "250000", status: "paid" };

function kiemTra(p, hd) {
  var loi = [];
  for (var truong in hd) {
    if (!(truong in p)) loi.push("thiếu " + truong);
    else if (typeof p[truong] !== hd[truong]) loi.push(truong + " sai kiểu: cần " + hd[truong] + ", nhận " + typeof p[truong]);
  }
  return loi;
}

var loi = kiemTra(phanHoi, hopDong);
console.log("Vi phạm: " + loi.length);
loi.forEach(function (l) { console.log("- " + l); });`,
      expectedOutput: `Vi phạm: 2
- soTien sai kiểu: cần number, nhận string
- thiếu trangThai`,
      hints: [
        "Một trường có mặt vẫn có thể sai: so typeof giá trị với kiểu đã hứa.",
        "Chỉ duyệt các trường trong hợp đồng; trường status thừa bên phản hồi bị bỏ qua.",
      ],
    },
    {
      type: "flow",
      title: "Một thay đổi đi qua cỗ máy kiểm hợp đồng",
      steps: [
        {
          label: "Phía cung cấp sửa mã",
          detail:
            "Một kỹ sư đội Đơn hàng đổi tên trường soTien thành so_tien cho thống nhất với phần còn lại của mã. Với anh ấy đây là việc dọn dẹp vô hại, và trong nhóm chat không ai được hỏi.",
        },
        {
          label: "Kiểm của bên cung cấp",
          detail:
            "Mỗi lần gộp mã, cỗ máy so phản hồi thật với bản mô tả đã hứa. Nó báo thiếu trường soTien và chặn gộp, trước khi bất kỳ khách hàng nội bộ nào thấy.",
        },
        {
          label: "Kiểm của bên tiêu thụ",
          detail:
            "Đội Báo cáo chạy bộ kiểm riêng, chỉ xác nhận những trường họ thật sự đọc. Nó lộ ra rằng họ còn dùng một trường trangThai không có trong lời hứa nào, tức một giả định ngầm cần được nói ra.",
        },
        {
          label: "Đổi có chủ đích",
          detail:
            "Nếu đổi tên thật sự cần thiết, đội Đơn hàng cập nhật hợp đồng, phát cả hai tên trong một giai đoạn và báo các đội đọc. Thay đổi trở thành quyết định thay vì tai nạn.",
        },
        {
          label: "Gỡ dạng cũ",
          detail:
            "Khi bộ kiểm của mọi bên tiêu thụ đã xanh với tên mới, tên cũ mới bị xoá. Bằng chứng nằm ở các lần chạy kiểm chứ không ở lời nhắn ba tháng trước mà người nhắn đã chuyển đội.",
        },
      ],
    },
  ],

  "kho-ma-chung-hay-tach": [
    {
      type: "scenario",
      title: "Công ty bốn mươi người, năm đội, một kho mã",
      start: "dau",
      nodes: {
        dau: {
          text: "Công ty bạn có năm đội và một kho mã chung đang chạy ổn. Một đồng nghiệp đề xuất tách kho theo dịch vụ vì các công ty lớn đều làm vậy. Bạn phản hồi thế nào?",
          choices: [
            { label: "Tách ngay theo bài viết của công ty lớn", next: "tach" },
            { label: "Đo xem thay đổi xuyên đội xảy ra bao nhiêu", next: "do" },
            { label: "Giữ nguyên vì chưa ai than phiền gì", next: "giu" },
          ],
        },
        tach: {
          text: "Kho đã tách, nhưng công ty chưa có công cụ phát hành có thứ tự. Một thay đổi giao diện dùng chung giờ cần năm lần phát hành xếp hàng, và phiên bản lệch nhau xuất hiện giữa các dịch vụ.",
          ending: "bad",
        },
        giu: {
          text: "Không ai đo gì cả. Một năm sau công ty mua thêm hai đội và thời gian xây kho tăng gấp đôi, nhưng lúc đó chuyển mô hình đã thành dự án nhiều tháng đụng tới mọi công cụ.",
          ending: "bad",
        },
        do: {
          text: "Số liệu ba tháng gần nhất cho thấy phần lớn thay đổi chạm từ hai đội trở lên, ít khi chỉ nằm trong một dịch vụ. Bạn cần quyết định cách vận hành kho chung.",
          choices: [
            { label: "Giữ kho chung, đầu tư công cụ và quyền sở hữu", next: "ok" },
            { label: "Giữ kho chung và triển khai mọi thứ cùng lúc", next: "cungluc" },
          ],
        },
        cungluc: {
          text: "Chung kho bị nhầm với triển khai cùng lúc. Mỗi lần một đội sửa, cả năm đội phải chờ cùng một đợt phát hành, và đội nào chậm cũng kéo cả công ty chậm theo. Đây là hai quyết định riêng biệt.",
          ending: "bad",
        },
        ok: {
          text: "Thay đổi xuyên đội nằm trong một lần gộp mã, và ai cũng thấy ngay phần nó chạm tới. Bạn ghi rõ đội nào sở hữu thư mục nào, và mỗi đội vẫn tự chọn ngày phát hành riêng.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Kho chung và kho tách, qua chuyện tủ sách",
      intro:
        "Hãy hình dung một toà nhà có mười hộ. Họ có thể dùng chung một phòng sách của toà nhà, hoặc mỗi hộ giữ một tủ sách riêng. Không bên nào đúng tuyệt đối, tuỳ việc các hộ cần mượn sách của nhau nhiều hay ít.",
      columns: ["Mô hình", "Giống như", "Cái giá phải trả"],
      rows: [
        ["Kho chung", "Một phòng sách của cả toà nhà", "Phải có luật rõ ai được xếp kệ nào"],
        ["Kho tách", "Mỗi hộ một tủ sách riêng", "Đổi cách xếp sách phải gõ cửa từng nhà"],
        ["Chung kho, tách triển khai", "Chung phòng sách, mỗi hộ tự chọn ngày dọn", "Cần công cụ để không ai dọn nhầm kệ của người khác"],
      ],
      oneLiner: "Chọn theo việc bạn làm nhiều hơn: đổi thứ dùng chung xuyên đội, hay để mỗi đội đi một mình.",
    },
  ],

  "chuan-chung-va-tu-chu": [
    {
      type: "scenario",
      title: "Đội Thanh toán xin làm khác chuẩn",
      start: "xin",
      nodes: {
        xin: {
          text: "Đội Thanh toán xin dùng một ngôn ngữ khác ngôn ngữ chuẩn của công ty, và một định dạng nhật ký riêng. Họ nói điều đó hợp với bài toán của họ hơn. Bạn trả lời thế nào?",
          choices: [
            { label: "Từ chối cả hai vì công ty đã có chuẩn", next: "tuchoi" },
            { label: "Chấp nhận cả hai, đội nào tự chủ đội đó", next: "chapnhan" },
            { label: "Đồng ý ngôn ngữ, giữ nguyên chuẩn nhật ký", next: "tach" },
          ],
        },
        tuchoi: {
          text: "Đội Thanh toán vẫn dùng ngôn ngữ họ muốn nhưng không nói với ai. Công ty mất cả sự nhất quán lẫn thông tin về chỗ chuẩn đang sai, và lần sau họ không xin phép nữa.",
          ending: "bad",
        },
        chapnhan: {
          text: "Một đêm có sự cố thanh toán, người trực tìm nhật ký theo mã giao dịch nhưng định dạng của đội Thanh toán khác các đội còn lại. Việc truy vết mất thêm hai giờ vì ranh giới giữa các dịch vụ không còn đọc được chung.",
          ending: "bad",
        },
        tach: {
          text: "Ngôn ngữ nằm bên trong đội nên đồng ý được. Nhật ký là chỗ các đội gặp nhau nên vẫn phải chung. Đội Thanh toán phản đối: dựng nhật ký chuẩn sẽ tốn họ hai ngày. Bạn làm gì?",
          choices: [
            { label: "Bắt làm đủ vì chuẩn là chuẩn", next: "ep" },
            { label: "Đưa khuôn dự án đã cấu hình sẵn nhật ký", next: "khuon" },
            { label: "Miễn cho lần này và không ghi lại gì", next: "mien" },
          ],
        },
        ep: {
          text: "Họ làm cho có, đúng bề ngoài nhưng thiếu mã giao dịch ở nhiều dòng. Chuẩn tồn tại trên giấy còn đội thứ hai nhìn vào đó học cách lách.",
          ending: "bad",
        },
        mien: {
          text: "Một ngoại lệ không ghi chép trở thành tiền lệ ngầm. Ba tháng sau hai đội khác cũng xin miễn và không ai nhớ lý do, nên chuẩn mất tác dụng ở đúng chỗ các đội gặp nhau.",
          ending: "bad",
        },
        khuon: {
          text: "Khuôn đã có nhật ký đúng chuẩn, nên đội Thanh toán chỉ mất vài giờ. Họ giữ được ngôn ngữ mình chọn, và ranh giới giữa các dịch vụ vẫn đọc được bằng một câu truy vấn.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Từ chuẩn trên giấy thành đường dễ đi nhất",
      steps: [
        {
          label: "Chọn chỗ thống nhất",
          detail:
            "Liệt kê những thứ nằm ở chỗ các đội gặp nhau: định dạng nhật ký, tên chỉ số, cách xác thực. Ngôn ngữ và cấu trúc thư mục không có tên trong danh sách này.",
        },
        {
          label: "Dựng khuôn dự án",
          detail:
            "Một lệnh tạo dịch vụ mới đã cấu hình sẵn nhật ký, chỉ số, xác thực và triển khai. Đây là bản chuẩn thật, vì người ta dùng nó thay vì đọc nó.",
        },
        {
          label: "Đo thời gian đầu tiên",
          detail:
            "Một đội mới mất bao lâu để dựng được dịch vụ đầu tiên chạy trên môi trường thật. Con số này tăng lên nghĩa là khuôn đang trở thành rào cản.",
        },
        {
          label: "Mở cửa ngoại lệ",
          detail:
            "Một đội xin khác chuẩn thì ghi lại lý do ở nơi công khai. Nếu không có cửa này, người ta lách trong im lặng và bạn mất cả sự nhất quán lẫn thông tin.",
        },
        {
          label: "Sửa khuôn theo ngoại lệ",
          detail:
            "Ba đội cùng xin một ngoại lệ là tín hiệu chuẩn đang sai. Sửa khuôn, chuẩn đổi theo, và ngoại lệ cũ không còn là ngoại lệ.",
        },
      ],
    },
  ],

  "doi-nen-tang-noi-bo": [
    {
      type: "exercise",
      language: "python",
      title: "Mô hình hàng đợi biến năng lực một đội thành trần của cả tổ chức",
      task: "Đội nền tảng xử lý NANG_LUC yêu cầu mỗi tuần, theo thứ tự đến. Mười đội cùng gửi yêu cầu trong tuần đầu. Sửa hàm tuan_cho() để tính số tuần chờ đúng: yêu cầu thứ k được xử lý vào tuần cuối của nhóm chứa nó.",
      starter: `NANG_LUC = 3

def tuan_cho(thu_tu):
    return thu_tu // NANG_LUC

for k in (4, 10):
    print(f"Đội thứ {k} chờ {tuan_cho(k)} tuần")
lau_nhat = max(tuan_cho(k) for k in range(1, 11))
print(f"Đội chờ lâu nhất: {lau_nhat} tuần")`,
      solution: `NANG_LUC = 3

def tuan_cho(thu_tu):
    return (thu_tu + NANG_LUC - 1) // NANG_LUC

for k in (4, 10):
    print(f"Đội thứ {k} chờ {tuan_cho(k)} tuần")
lau_nhat = max(tuan_cho(k) for k in range(1, 11))
print(f"Đội chờ lâu nhất: {lau_nhat} tuần")`,
      expectedOutput: `Đội thứ 4 chờ 2 tuần
Đội thứ 10 chờ 4 tuần
Đội chờ lâu nhất: 4 tuần`,
      hints: [
        "Yêu cầu thứ 3 xong trong tuần 1, yêu cầu thứ 4 phải sang tuần 2: cần làm tròn lên.",
        "Chia nguyên cộng thêm NANG_LUC - 1 trước khi chia là cách làm tròn lên với số nguyên.",
      ],
    },
    {
      type: "chart",
      title: "Hàng đợi làm năng lực của một đội thành trần của tất cả",
      caption:
        "Số liệu minh hoạ: giả sử mỗi đội chỉ cần một yêu cầu và đội nền tảng xử lý số yêu cầu cố định mỗi tuần. Đường tự phục vụ là giả định mỗi đội mất khoảng một ngày tự dựng.",
      kind: "line",
      xLabel: "Thứ tự đội gửi yêu cầu",
      yLabel: "Tuần chờ",
      x: { from: 1, to: 20, step: 1 },
      params: [{ id: "cap", label: "Yêu cầu đội nền tảng xử lý mỗi tuần", min: 1, max: 8, step: 1, value: 3, unit: "yêu cầu" }],
      series: [
        { label: "Mô hình hàng đợi", expr: "ceil(x/cap)" },
        { label: "Tự phục vụ (minh hoạ)", expr: "0.2" },
      ],
    },
  ],

  "dung-chung-hay-nhan-ban": [
    {
      type: "scenario",
      title: "Hai đội cùng có một hàm tính phí vận chuyển",
      start: "de-xuat",
      nodes: {
        "de-xuat": {
          text: "Đội Giỏ hàng và đội Hoá đơn đều có một hàm tính phí vận chuyển nhìn gần như giống hệt. Một kỹ sư đề xuất gom thành thư viện chung. Bạn xử lý thế nào?",
          choices: [
            { label: "Gom ngay vì trùng mã luôn là điều xấu", next: "gom" },
            { label: "Hỏi: cùng một quy tắc hay tình cờ giống?", next: "hoi" },
            { label: "Để nguyên và đừng bao giờ gom", next: "nguyen" },
          ],
        },
        gom: {
          text: "Thư viện ra đời, nhưng hôm nay hai hàm giống nhau chỉ vì cùng đọc một bảng giá. Tháng sau đội Hoá đơn cần làm tròn theo hợp đồng vận chuyển còn Giỏ hàng chỉ ước tính, và hai đội phải thương lượng từng thay đổi.",
          ending: "bad",
        },
        nguyen: {
          text: "Nếu hai chỗ thật sự theo cùng một luật thì việc không gom là rủi ro: luật đổi, một đội cập nhật còn đội kia quên. Khách thấy phí khác nhau giữa giỏ hàng và hoá đơn mà không ai hiểu vì sao.",
          ending: "bad",
        },
        hoi: {
          text: "Đội Giỏ hàng chỉ ước tính phí cho khách xem, còn đội Hoá đơn tính số tiền thật theo hợp đồng và đã báo rằng quy tắc làm tròn của họ sẽ khác. Hai hàm giống nhau chỉ vì hôm nay cùng đọc một bảng giá. Bạn làm gì?",
          choices: [
            { label: "Lặp có chủ đích, ghi chú ở cả hai nơi", next: "lap" },
            { label: "Gom lại và thêm tham số cho chỗ khác", next: "thamso" },
            { label: "Gom lại và để Hoá đơn tự xin ngoại lệ", next: "ngoai" },
          ],
        },
        thamso: {
          text: "Sau vài vòng thương lượng, thư viện đầy cờ và không ai hiểu tổ hợp nào còn được dùng. Tách ra thì đã quá muộn vì cả hai đội đã xây tiếp lên trên.",
          ending: "bad",
        },
        ngoai: {
          text: "Hoá đơn xin ngoại lệ ở mỗi thay đổi, và đội thư viện phải duyệt từng lần. Hai đội bị buộc vào cùng một lịch phát hành dù công việc của họ độc lập.",
          ending: "bad",
        },
        lap: {
          text: "Hai hàm nằm ở hai đội, mỗi cái đổi theo nhu cầu riêng. Chú thích ghi rằng chúng đang giống nhau vì cùng bảng giá, để người sau biết đây là lặp có chủ đích chứ không phải sót.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Giống nhau chưa chắc là một thứ",
      intro:
        "Hai nhà hàng xóm có thể cùng ăn tối lúc bảy giờ. Đó có phải là một quy tắc chung hay chỉ là trùng hợp? Câu trả lời quyết định bạn có nên buộc hai nhà vào một lịch hay không.",
      columns: ["Hai thứ giống nhau", "Giống như", "Nên gom không?"],
      rows: [
        ["Cùng một quy tắc", "Hai quầy cùng áp một bảng giá niêm yết", "Nên, vì giá đổi thì cả hai phải đổi"],
        ["Tình cờ giống nhau", "Hai nhà tình cờ cùng ăn tối lúc bảy giờ", "Không, vì mỗi nhà đổi giờ theo việc riêng"],
        ["Gom nhầm giữa hai đội", "Hai nhà bị ép nấu chung một nồi cơm", "Không, vì mỗi lần đổi là một cuộc thương lượng"],
      ],
      oneLiner: "Hỏi vì sao hai đoạn giống nhau trước khi gom, và giữa hai đội thì ngưỡng để gom phải cao hơn trong một đội.",
    },
  ],

  "du-lieu-dung-chung-giua-cac-doi": [
    {
      type: "exercise",
      language: "javascript",
      title: "Ai bị ảnh hưởng nếu đổi tên một cột",
      task: "Sơ đồ nói bốn dịch vụ tách biệt, nhưng một số cùng đọc thẳng bảng của dịch vụ Đơn hàng. Hàm in ra những đội ngoài chủ sở hữu có đọc cột sắp đổi tên. Mã khởi đầu đang đếm cả chủ sở hữu; sửa để chỉ đếm các đội khác.",
      starter: `var dichVu = {
  "don-hang": ["id", "trang_thai", "tong_tien"],
  "thanh-toan": ["don_id", "tong_tien"],
  "bao-cao": ["id", "tong_tien", "khach_hang"],
  "kho": ["ma_sku", "so_luong"]
};
var chuSoHuu = "don-hang";
var cot = "tong_tien";

var bi = Object.keys(dichVu).filter(function (ten) {
  return dichVu[ten].indexOf(cot) >= 0;
});
console.log("Đổi tên cột " + cot + " phải báo cho " + bi.length + " đội: " + bi.join(", "));`,
      solution: `var dichVu = {
  "don-hang": ["id", "trang_thai", "tong_tien"],
  "thanh-toan": ["don_id", "tong_tien"],
  "bao-cao": ["id", "tong_tien", "khach_hang"],
  "kho": ["ma_sku", "so_luong"]
};
var chuSoHuu = "don-hang";
var cot = "tong_tien";

var bi = Object.keys(dichVu).filter(function (ten) {
  return ten !== chuSoHuu && dichVu[ten].indexOf(cot) >= 0;
});
console.log("Đổi tên cột " + cot + " phải báo cho " + bi.length + " đội: " + bi.join(", "));`,
      expectedOutput: `Đổi tên cột tong_tien phải báo cho 2 đội: thanh-toan, bao-cao`,
      hints: [
        "Chủ sở hữu tự sửa mã của mình; người cần được báo là những đội đọc cột từ bên ngoài.",
        "Thêm một điều kiện loại tên chuSoHuu trong filter.",
      ],
    },
    {
      type: "flow",
      title: "Gỡ một cột dùng chung bằng bản sao dành cho đọc",
      steps: [
        {
          label: "Chủ muốn đổi cột",
          detail:
            "Đội Đơn hàng muốn đổi tong_tien thành tong_tien_sau_thue. Hai đội khác đang đọc thẳng bảng, nên bản đổi này sẽ làm báo cáo của họ lỗi ngay khi gộp mã.",
        },
        {
          label: "Xuất hình dạng ổn định",
          detail:
            "Đội Đơn hàng dựng một bản sao dành cho đọc với cột tong_tien cố định và mô tả công khai. Bảng gốc bên trong giờ đổi tuỳ ý, còn bản sao là lời hứa.",
        },
        {
          label: "Chuyển các bên đọc",
          detail:
            "Đội Thanh toán và Báo cáo đổi nguồn từ bảng gốc sang bản sao, mỗi đội theo nhịp của mình. Trong giai đoạn này cả bảng gốc lẫn bản sao đều còn sống.",
        },
        {
          label: "Đổi bên trong",
          detail:
            "Khi không còn ai đọc thẳng bảng, đội Đơn hàng đổi tên cột và cập nhật bản xuất. Đội khác không phải làm gì, vì hình dạng họ nhìn thấy vẫn như cũ.",
        },
        {
          label: "Khoá cửa đọc thẳng",
          detail:
            "Thu hồi quyền đọc bảng gốc của các đội khác. Nếu thiếu bước này, một năm sau sẽ có người đọc thẳng trở lại vì nó nhanh nhất để dựng.",
        },
      ],
    },
  ],

  "su-kien-giua-cac-doi": [
    {
      type: "exercise",
      language: "javascript",
      title: "Bên nghe cũ phải sống sót qua một lần đổi sự kiện",
      task: "Sự kiện DonHangDaTao đổi trường items thành lines. Trong giai đoạn đổi, bên phát gửi dạng nào cũng có thể gặp. Sửa tongMatHang() để đếm được mặt hàng ở cả hai dạng; trường thừa như ghiChu không được làm hỏng gì.",
      starter: `function tongMatHang(sk) {
  var dong = sk.items || [];
  return dong.length;
}

var v1 = { ten: "DonHangDaTao", items: ["a", "b", "c"] };
var v2 = { ten: "DonHangDaTao", lines: [{ sku: "a" }, { sku: "b" }], ghiChu: "mới" };
console.log("v1: " + tongMatHang(v1) + " mặt hàng");
console.log("v2: " + tongMatHang(v2) + " mặt hàng");`,
      solution: `function tongMatHang(sk) {
  var dong = sk.items || sk.lines || [];
  return dong.length;
}

var v1 = { ten: "DonHangDaTao", items: ["a", "b", "c"] };
var v2 = { ten: "DonHangDaTao", lines: [{ sku: "a" }, { sku: "b" }], ghiChu: "mới" };
console.log("v1: " + tongMatHang(v1) + " mặt hàng");
console.log("v2: " + tongMatHang(v2) + " mặt hàng");`,
      expectedOutput: `v1: 3 mặt hàng
v2: 2 mặt hàng`,
      hints: [
        "Mã khởi đầu in 0 cho v2 vì nó chỉ biết tên trường cũ và lặng lẽ coi như rỗng.",
        "Thử trường cũ, rồi trường mới, rồi mảng rỗng, theo đúng thứ tự đó.",
      ],
    },
    {
      type: "feynman",
      title: "Bảng tin hay cú điện thoại",
      intro:
        "Bên phát sự kiện giống người treo bảng tin ở sảnh chung cư. Bên ra lệnh giống người gọi điện từng nhà dặn việc. Khi nhà thứ tư quan tâm, hai cách cho kết quả rất khác.",
      columns: ["Cách trao", "Giống như", "Khi thêm người thứ tư"],
      rows: [
        ["Kể sự thật", "Treo bảng tin: đơn 17 đã được tạo", "Người thứ tư tự đến đọc, người treo không phải làm gì"],
        ["Ra lệnh", "Gọi từng nhà dặn việc cần làm", "Người gọi phải thêm số và sửa lại lời dặn"],
        ["Đổi hình dạng sự kiện", "Đổi cách viết bảng tin", "Phải dán cả bản cũ lẫn bản mới một thời gian"],
      ],
      oneLiner: "Đặt tên sự kiện ở thì quá khứ và đừng nhắc tới bên nhận, vì kể lại chuyện đã xảy ra là cách duy nhất không buộc ai vào ai.",
    },
  ],

  "nhat-quan-cuoi-cung": [
    {
      type: "scenario",
      title: "Ảnh đại diện nhanh, tiền thì không",
      start: "anh",
      nodes: {
        anh: {
          text: "Người dùng đổi ảnh đại diện. Trang cá nhân cập nhật ngay, nhưng ở phần bình luận (dịch vụ khác giữ bản sao) ảnh cũ còn hiện vài giây. Bạn xử lý thế nào?",
          choices: [
            { label: "Cho cả hai dịch vụ cùng ghi trong một giao dịch", next: "chung" },
            { label: "Hiện ngay ảnh vừa chọn, chấp nhận lệch vài giây", next: "chapnhan" },
            { label: "Khoá nút Lưu tới khi mọi dịch vụ xác nhận", next: "khoa" },
          ],
        },
        chung: {
          text: "Hai dịch vụ giờ phải ghi cùng nhịp. Một ngày dịch vụ bình luận chậm thì việc đổi ảnh cũng chậm theo, và khi nó hỏng thì người dùng không đổi được ảnh nữa. Bạn đã mất đúng sự độc lập mà ban đầu muốn có.",
          ending: "bad",
        },
        khoa: {
          text: "Người dùng nhìn vòng quay chờ vài giây mỗi lần lưu, và đội nào chậm cũng kéo cả trải nghiệm chậm theo. Độ lệch vẫn tồn tại ở các chỗ khác, chỉ là bạn đã bắt người dùng chờ nó.",
          ending: "bad",
        },
        chapnhan: {
          text: "Người dùng thấy ảnh mới ngay và bản sao bình luận bắt kịp sau vài giây. Hậu quả của độ lệch này nhỏ và đảo ngược được. Nhóm kế bên đề nghị áp dụng cùng cách cho việc trừ tiền của khách. Bạn làm gì?",
          choices: [
            { label: "Cũng để các bản sao lệch vài giây", next: "tru2" },
            { label: "Dùng một điểm quyết định duy nhất cho tiền", next: "tien" },
          ],
        },
        tru2: {
          text: "Hai dịch vụ cùng đọc số dư cũ trong khoảng lệch và cùng cho phép trừ tiền. Khách bị trừ hai lần cho một đơn, và hậu quả đó không đảo ngược được bằng việc chờ thêm vài giây.",
          ending: "bad",
        },
        tien: {
          text: "Trừ tiền đi qua một điểm quyết định duy nhất, chậm hơn một chút nhưng đúng. Phần còn lại như ảnh, số lượt thích, báo cáo vẫn để độc lập và lệch tạm thời.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Độ trễ đồng bộ nhân với lưu lượng ra số bản ghi đang lệch",
      caption:
        "Số liệu minh hoạ: giả sử cứ mỗi giây có một số sự kiện cập nhật và mỗi sự kiện mất một khoảng trễ để tới bản sao. Số bản ghi đang lệch xấp xỉ tích của hai thứ đó, nên giảm độ trễ hay giảm lưu lượng đều làm đường này thấp xuống.",
      kind: "line",
      xLabel: "Độ trễ đồng bộ (giây)",
      yLabel: "Bản ghi đang lệch",
      x: { from: 0, to: 30, step: 2 },
      params: [{ id: "rate", label: "Số cập nhật mỗi giây", min: 1, max: 50, step: 1, value: 10, unit: "sự kiện/giây" }],
      series: [{ label: "Bản ghi đang lệch", expr: "x*rate" }],
    },
  ],

  "phoi-hop-trien-khai-nhieu-doi": [
    {
      type: "exercise",
      language: "python",
      title: "Tương thích hai chiều làm thứ tự triển khai hết quan trọng",
      task: "Đội A phát một thông điệp, đội B nhận. Mỗi đội có bản cũ và bản mới, nên có bốn trạng thái trung gian khi triển khai. Chương trình đếm trạng thái mà hai bên còn hiểu nhau. Hiện bản mới của A chỉ phát dạng mới nên bản cũ của B không đọc được. Sửa để bản mới phát cả hai dạng.",
      starter: `phat_ra = {"cu": {"v1"}, "moi": {"v2"}}
chap_nhan = {"cu": {"v1"}, "moi": {"v1", "v2"}}

chay_duoc = 0
for a in ("cu", "moi"):
    for b in ("cu", "moi"):
        if phat_ra[a] & chap_nhan[b]:
            chay_duoc += 1

print(f"Trạng thái chạy được: {chay_duoc}/4")
if chay_duoc < 4:
    print("Thứ tự triển khai quan trọng")
else:
    print("Thứ tự triển khai không quan trọng")`,
      solution: `phat_ra = {"cu": {"v1"}, "moi": {"v1", "v2"}}
chap_nhan = {"cu": {"v1"}, "moi": {"v1", "v2"}}

chay_duoc = 0
for a in ("cu", "moi"):
    for b in ("cu", "moi"):
        if phat_ra[a] & chap_nhan[b]:
            chay_duoc += 1

print(f"Trạng thái chạy được: {chay_duoc}/4")
if chay_duoc < 4:
    print("Thứ tự triển khai quan trọng")
else:
    print("Thứ tự triển khai không quan trọng")`,
      expectedOutput: `Trạng thái chạy được: 4/4
Thứ tự triển khai không quan trọng`,
      hints: [
        "Trạng thái hỏng duy nhất là bản mới của A đứng cạnh bản cũ của B.",
        "Bản mới của A cần phát được dạng mà bản cũ của B hiểu.",
      ],
    },
    {
      type: "flow",
      title: "Khi buộc phải triển khai cùng nhau",
      steps: [
        {
          label: "Viết kịch bản trước",
          detail:
            "Một trang ghi thứ tự bước, người phụ trách từng đội, điều kiện để tiếp tục và điều kiện để dừng. Viết khi chưa có áp lực, không viết lúc đang giữa đêm.",
        },
        {
          label: "Diễn thử đường lui",
          detail:
            "Chạy thử cả đường lui trên môi trường thử, không chỉ đường tiến. Lui một bên trước tạo đúng trạng thái không tương thích mà bạn đang cố tránh, nên đường lui phải đồng thời.",
        },
        {
          label: "Tách phần tương thích",
          detail:
            "Tìm thay đổi có thể làm tương thích hai chiều: bản mới của A phát cả hai dạng, bản mới của B nhận cả hai dạng. Phần nào làm được thì ra khỏi cuộc phối hợp.",
        },
        {
          label: "Bật theo thứ tự",
          detail:
            "Phần còn lại triển khai theo kịch bản, mỗi bước có người xác nhận trước khi bước sau bắt đầu. Cờ tính năng giúp tách việc đưa mã lên và việc bật hành vi.",
        },
        {
          label: "Hỏi vì sao phải phối hợp",
          detail:
            "Sau sự việc, ghi lại ranh giới nào buộc hai đội đi cùng giờ. Đếm số lần mỗi quý và coi nó là chỉ số cần giảm: lần nào cũng là một chỉ dẫn về chỗ cần sửa.",
        },
      ],
    },
  ],

  "duong-gang-va-phu-thuoc-noi-tiep": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm ngày xong sớm nhất của một kế hoạch nhiều đội",
      task: "Mỗi việc có số tuần và danh sách việc phải xong trước. Việc chỉ bắt đầu khi mọi việc trước nó đã xong. Ngày xong sớm nhất của cả kế hoạch bằng việc xong muộn nhất, không bằng tổng công sức. Mã khởi đầu đang cộng các nhánh lại với nhau; sửa để lấy nhánh dài nhất.",
      starter: `viec = {
    "A": (2, []),
    "B": (3, ["A"]),
    "C": (2, ["A"]),
    "D": (1, ["B", "C"]),
    "E": (4, []),
}
xong = {}

def som_nhat(ten):
    if ten in xong:
        return xong[ten]
    dai, truoc = viec[ten]
    bat_dau = sum(som_nhat(t) for t in truoc)
    xong[ten] = bat_dau + dai
    return xong[ten]

tong = sum(dai for dai, _ in viec.values())
ngay_xong = max(som_nhat(t) for t in viec)
print(f"Tổng công sức: {tong} tuần-người")
print(f"Ngày xong sớm nhất: tuần {ngay_xong}")`,
      solution: `viec = {
    "A": (2, []),
    "B": (3, ["A"]),
    "C": (2, ["A"]),
    "D": (1, ["B", "C"]),
    "E": (4, []),
}
xong = {}

def som_nhat(ten):
    if ten in xong:
        return xong[ten]
    dai, truoc = viec[ten]
    bat_dau = max((som_nhat(t) for t in truoc), default=0)
    xong[ten] = bat_dau + dai
    return xong[ten]

tong = sum(dai for dai, _ in viec.values())
ngay_xong = max(som_nhat(t) for t in viec)
print(f"Tổng công sức: {tong} tuần-người")
print(f"Ngày xong sớm nhất: tuần {ngay_xong}")`,
      expectedOutput: `Tổng công sức: 12 tuần-người
Ngày xong sớm nhất: tuần 6`,
      hints: [
        "D chỉ cần chờ nhánh B hoặc C xong muộn hơn, không cần chờ cả hai lần lượt.",
        "Dùng max thay cho sum; việc không có tiền đề bắt đầu ở tuần 0.",
      ],
    },
    {
      type: "chart",
      title: "Nối tiếp, song song và chốt hợp đồng trước",
      caption:
        "Số liệu minh hoạ: mỗi phần mất cùng số tuần, nên nối tiếp là cộng còn song song là lấy một. Đường giữa là chốt hình dạng giao diện ngay từ đầu rồi dựng bản giả lập, chỉ cộng thêm thời gian ghép thật ở cuối.",
      kind: "line",
      xLabel: "Số đội trong chuỗi",
      yLabel: "Tuần tới ngày xong",
      x: { from: 1, to: 8, step: 1 },
      params: [
        { id: "w", label: "Tuần cho mỗi phần", min: 1, max: 4, step: 1, value: 2, unit: "tuần" },
        { id: "g", label: "Tuần ghép thật ở cuối", min: 0, max: 2, step: 0.5, value: 0.5, unit: "tuần" },
      ],
      series: [
        { label: "Nối tiếp", expr: "x*w" },
        { label: "Chốt giao diện trước", expr: "min(x*w, w+g)" },
        { label: "Song song hoàn toàn", expr: "w" },
      ],
    },
  ],

  "ghi-lai-quyet-dinh-kien-truc": [
    {
      type: "scenario",
      title: "Người mới đề xuất lại một phương án đã bị loại",
      start: "de-xuat",
      nodes: {
        "de-xuat": {
          text: "Chị Linh mới vào đội đề xuất đổi sang một cơ sở dữ liệu mà hai năm trước đội đã thử rồi loại vì giới hạn ghi. Không có tài liệu nào về chuyện đó và bạn là người duy nhất còn nhớ. Bạn làm gì?",
          choices: [
            { label: "Nói miệng rằng đội đã thử và không được", next: "mieng" },
            { label: "Cho chị ấy thử lại vì ai cũng có quyền", next: "thu" },
            { label: "Viết nửa trang về quyết định đó cạnh mã", next: "viet" },
          ],
        },
        mieng: {
          text: "Chị Linh không có gì để kiểm lại và thấy đây là ý kiến cá nhân. Tranh luận kéo dài vài buổi, và khi bạn chuyển đội thì chẳng còn ai biết lý do.",
          ending: "bad",
        },
        thu: {
          text: "Ba tuần sau chị Linh gặp lại đúng giới hạn ghi mà đội đã gặp hai năm trước. Công sức đó mất đi hoàn toàn thiện chí, và lần sau người khác lại đề xuất cùng phương án.",
          ending: "bad",
        },
        viet: {
          text: "Bạn quyết định viết. Nhưng nửa trang cần ghi những gì thì mới giúp người sau không đi lại đoạn đã biết là cụt?",
          choices: [
            { label: "Chỉ ghi lựa chọn hiện tại và tên người quyết", next: "ngan" },
            { label: "Ghi bối cảnh, phương án đã loại, điều kiện xem lại", next: "du" },
            { label: "Soạn hai mươi trang rồi xin ba chữ ký duyệt", next: "dai" },
          ],
        },
        ngan: {
          text: "Tài liệu nói hệ thống dùng gì và ai quyết định, nhưng không nói đã cân nhắc gì khác. Người sau vẫn chỉ thấy một phương án và vẫn đề xuất lại các phương án đã bị loại.",
          ending: "bad",
        },
        dai: {
          text: "Quy trình nặng nên lần sau không ai muốn làm. Sau vài tháng đội trở về chỗ không ghi gì, và tài liệu hai mươi trang kia không còn khớp mã.",
          ending: "bad",
        },
        du: {
          text: "Nửa trang ghi rõ lúc đó giới hạn ghi là ràng buộc chính, hai phương án khác đã cân nhắc, và điều kiện xem lại: nếu khối lượng ghi giảm đáng kể thì thử lại. Chị Linh đọc trong năm phút và tự rút đề xuất.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Ghi chú quyết định, qua chuyện chọn nhà thuê",
      intro:
        "Hãy nghĩ tới người ghi chú trước khi thuê nhà. Một năm sau, ai nhìn vào căn nhà đang ở cũng chỉ thấy đúng một lựa chọn. Chỉ ghi chú mới cho họ biết đã có những căn nào khác.",
      columns: ["Phần ghi chú", "Giống như", "Thiếu nó, người sau sẽ"],
      rows: [
        ["Bối cảnh", "Ghi lúc đó ngân sách bao nhiêu và đi làm ở đâu", "Không hiểu vì sao lựa chọn từng hợp lý"],
        ["Phương án", "Ghi hai căn đã xem và lý do bỏ", "Đề xuất lại đúng căn đã bị loại"],
        ["Lựa chọn", "Ghi căn đã thuê và vì sao", "Phải đoán từ hiện trạng"],
        ["Điều kiện xem lại", "Ghi: đổi chỗ làm thì tìm nhà khác", "Coi lựa chọn như vĩnh viễn hoặc bỏ nó không lý do"],
      ],
      oneLiner: "Nửa trang cạnh mã, ghi cả con đường lẫn điều kiện xem lại, giá trị hơn hai mươi trang không ai theo.",
    },
  ],

  "ra-soat-kien-truc": [
    {
      type: "exercise",
      language: "python",
      title: "Lọc quyết định nào đáng nghe thêm",
      task: "Quy tắc: quyết định mà sửa sai mất từ 90 ngày trở lên thì nên mang đi rà soát để nghe thêm góc nhìn; dưới 90 ngày thì đội tự quyết. Mã khởi đầu bỏ sót quyết định đúng ở ngưỡng. Sửa điều kiện rồi in danh sách cần nghe thêm.",
      starter: `quyet_dinh = [
    ("đổi thư viện nội bộ", 7),
    ("cách các dịch vụ trao dữ liệu", 730),
    ("chọn công cụ ghi nhật ký", 21),
    ("đổi cơ sở dữ liệu chính", 365),
    ("đổi nhà cung cấp email", 90),
]
NGUONG = 90

can_nghe = [ten for ten, ngay in quyet_dinh if ngay > NGUONG]
tu_quyet = [ten for ten, ngay in quyet_dinh if ngay <= NGUONG]

print(f"Cần nghe thêm: {len(can_nghe)}")
for ten in can_nghe:
    print(f"- {ten}")
print(f"Đội tự quyết: {len(tu_quyet)}")`,
      solution: `quyet_dinh = [
    ("đổi thư viện nội bộ", 7),
    ("cách các dịch vụ trao dữ liệu", 730),
    ("chọn công cụ ghi nhật ký", 21),
    ("đổi cơ sở dữ liệu chính", 365),
    ("đổi nhà cung cấp email", 90),
]
NGUONG = 90

can_nghe = [ten for ten, ngay in quyet_dinh if ngay >= NGUONG]
tu_quyet = [ten for ten, ngay in quyet_dinh if ngay < NGUONG]

print(f"Cần nghe thêm: {len(can_nghe)}")
for ten in can_nghe:
    print(f"- {ten}")
print(f"Đội tự quyết: {len(tu_quyet)}")`,
      expectedOutput: `Cần nghe thêm: 3
- cách các dịch vụ trao dữ liệu
- đổi cơ sở dữ liệu chính
- đổi nhà cung cấp email
Đội tự quyết: 2`,
      hints: [
        "Đề bài nói từ 90 ngày trở lên, nên 90 cũng thuộc nhóm cần nghe thêm.",
        "Hai điều kiện phải bù nhau, không để một quyết định rơi vào cả hai nhóm hoặc không nhóm nào.",
      ],
    },
    {
      type: "flow",
      title: "Một đề xuất đi qua rà soát kiểu cửa sổ",
      steps: [
        {
          label: "Lọc theo chi phí sửa sai",
          detail:
            "Đội tự hỏi: nếu chọn sai thì mất bao lâu để sửa? Đổi thư viện nội bộ mất một tuần nên tự quyết; chọn cách các dịch vụ trao dữ liệu có thể mất hai năm nên mang đi nghe thêm.",
        },
        {
          label: "Gửi bản nửa trang",
          detail:
            "Đội viết bối cảnh, các phương án và nghiêng về lựa chọn nào, đủ để người ngoài đọc trong năm phút. Không cần slide, không cần họp chuẩn bị.",
        },
        {
          label: "Nghe góc nhìn khác",
          detail:
            "Người từ đội khác chỉ ra thứ đội đề xuất không thấy: một đội đang đọc thẳng bảng dữ liệu, một chuẩn chung đã có. Cuộc nói chuyện kết thúc bằng câu hỏi chứ không bằng phiếu duyệt.",
        },
        {
          label: "Đội sở hữu quyết",
          detail:
            "Quyền quyết định vẫn ở đội đề xuất. Giữ nó ở đó là thứ phân biệt rà soát với phê duyệt, và cũng giữ trách nhiệm không bị pha loãng khi có điều không ổn.",
        },
        {
          label: "Ghi lại lý do",
          detail:
            "Quyết định cùng các phương án đã nghe được ghi cạnh mã. Nếu đội khác bắt đầu chia nhỏ đề xuất để lọt dưới ngưỡng, đó là dấu hiệu quy trình đã trượt từ cửa sổ sang cửa ải.",
        },
      ],
    },
  ],

  "di-tru-lon-bop-nghet-dan": [
    {
      type: "scenario",
      title: "Thay hệ thống đơn hàng tám tuổi",
      start: "dau",
      nodes: {
        dau: {
          text: "Hệ thống đơn hàng của công ty đã chạy tám năm và ai cũng muốn thay. Giám đốc kỹ thuật đề nghị hoàn thành trong mười tám tháng. Bạn đề xuất cách nào?",
          choices: [
            { label: "Dựng bản mới song song rồi chuyển một lần", next: "nhay" },
            { label: "Đặt lớp định tuyến trước hệ thống cũ", next: "lop" },
            { label: "Đóng băng tính năng cũ để bản mới đuổi kịp", next: "bang" },
          ],
        },
        nhay: {
          text: "Bản viết lại phải đoán hết hàng nghìn quyết định nhỏ không có trong tài liệu, trong khi bản cũ vẫn nhận thêm tính năng. Tháng thứ mười hai khoảng cách chưa thu hẹp và ngân sách cạn.",
          ending: "bad",
        },
        bang: {
          text: "Kinh doanh không chịu dừng, và vài ngoại lệ đầu tiên làm bản cũ tiếp tục thay đổi. Khoảng cách với bản mới không thu hẹp lại, trong khi đội mất niềm tin vào cả lịch lẫn cam kết.",
          ending: "bad",
        },
        lop: {
          text: "Lớp định tuyến chạy được, chưa đổi hành vi nào và chưa ai nhận ra sự khác biệt. Bây giờ bạn chọn phần đầu tiên để chuyển sang hệ thống mới.",
          choices: [
            { label: "Phần lớn nhất để thấy hiệu quả ngay", next: "lon" },
            { label: "Phần nhỏ nhất, chạy song song để so kết quả", next: "nho" },
          ],
        },
        lon: {
          text: "Phần lớn mang theo quá nhiều trường hợp lạ, và lỗi nào cũng khó tách khỏi lỗi khác. Một sự cố lúc đầu tháng buộc quay về hệ thống cũ, và dự án mất uy tín.",
          ending: "bad",
        },
        nho: {
          text: "Việc so kết quả trên lưu lượng thật cho thấy lệch ở khách hàng lớn: bản cũ có một luật làm tròn riêng cho họ, không có trong tài liệu nào. Bạn làm gì với phát hiện này?",
          choices: [
            { label: "Bỏ qua vì bản mới chắc đúng hơn", next: "boqua" },
            { label: "Ghi lại thành hành vi cần giữ ở bản mới", next: "ghi" },
            { label: "Dừng di trú tới khi hiểu hết bản cũ", next: "dung" },
          ],
        },
        boqua: {
          text: "Khách hàng lớn nhận hoá đơn lệch vài đồng trên mỗi đơn, và họ phát hiện trước đội kỹ thuật. Niềm tin của khách vào hệ thống mới giảm ngay lần chuyển đầu tiên.",
          ending: "bad",
        },
        dung: {
          text: "Đội dừng cả dự án để đọc mã tám năm tuổi, mà tài liệu về những luật này không tồn tại. Mười hai tháng trôi qua và chưa chuyển thêm được phần nào.",
          ending: "bad",
        },
        ghi: {
          text: "Luật làm tròn được đưa vào bản mới như một hành vi có tên, có kiểm thử. Mỗi bước sau đó nhỏ và lui được, và nếu dự án bị dừng ở tháng thứ chín thì các phần đã chuyển vẫn đang mang lại lợi ích.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Giá trị đã chuyển qua thời gian: viết lại hay bóp nghẹt dần",
      caption:
        "Số liệu minh hoạ, không phải đo thực: giả sử viết lại cho giá trị một lần khi hoàn tất, còn bóp nghẹt dần cho giá trị đều đặn mỗi tháng. Kéo thanh trượt tháng dự án bị dừng để thấy khi dừng sớm thì mỗi cách còn lại bao nhiêu.",
      kind: "line",
      xLabel: "Tháng",
      yLabel: "Phần đã chuyển xong (%)",
      x: { from: 0, to: 24, step: 2 },
      params: [
        { id: "T", label: "Tháng cần để chuyển hết", min: 6, max: 24, step: 1, value: 18, unit: "tháng" },
        { id: "d", label: "Tháng dự án bị dừng", min: 3, max: 24, step: 1, value: 12, unit: "tháng" },
      ],
      series: [
        { label: "Bóp nghẹt dần", expr: "min(100, min(x,d)*100/T)" },
        { label: "Viết lại hoàn toàn", expr: "100*min(1,max(0,min(x,d)-T+1))" },
      ],
    },
  ],
};
