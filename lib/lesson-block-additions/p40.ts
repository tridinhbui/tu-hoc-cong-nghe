import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 40. Một người viết cho một tệp.

const L = (...lines: string[]) => lines.join("\n");

export const P40_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "dataframe-bang-du-lieu-trong-code": [
    {
      type: "exercise",
      language: "python",
      title: "Lọc trước, gom nhóm sau",
      task:
        "Bảng đơn hàng dưới đây có cả đơn đã thanh toán (paid) lẫn đơn hoàn tiền (refund). Doanh thu theo thành phố chỉ được tính trên đơn paid. Mã khởi đầu đang cộng mọi dòng nên con số của từng thành phố đều bị thổi lên. Thêm bước lọc để mỗi thành phố chỉ cộng đơn paid.",
      starter: L(
        "don_hang = [",
        "    {\"thanh_pho\": \"Hà Nội\", \"trang_thai\": \"paid\", \"tien\": 120},",
        "    {\"thanh_pho\": \"Hà Nội\", \"trang_thai\": \"refund\", \"tien\": 80},",
        "    {\"thanh_pho\": \"Đà Nẵng\", \"trang_thai\": \"paid\", \"tien\": 50},",
        "    {\"thanh_pho\": \"Hà Nội\", \"trang_thai\": \"paid\", \"tien\": 30},",
        "    {\"thanh_pho\": \"Đà Nẵng\", \"trang_thai\": \"paid\", \"tien\": 70},",
        "    {\"thanh_pho\": \"Đà Nẵng\", \"trang_thai\": \"refund\", \"tien\": 40},",
        "]",
        "",
        "tong = {}",
        "for d in don_hang:",
        "    tong[d[\"thanh_pho\"]] = tong.get(d[\"thanh_pho\"], 0) + d[\"tien\"]",
        "",
        "for thanh_pho in tong:",
        "    print(thanh_pho, tong[thanh_pho])",
        "",
      ),
      solution: L(
        "don_hang = [",
        "    {\"thanh_pho\": \"Hà Nội\", \"trang_thai\": \"paid\", \"tien\": 120},",
        "    {\"thanh_pho\": \"Hà Nội\", \"trang_thai\": \"refund\", \"tien\": 80},",
        "    {\"thanh_pho\": \"Đà Nẵng\", \"trang_thai\": \"paid\", \"tien\": 50},",
        "    {\"thanh_pho\": \"Hà Nội\", \"trang_thai\": \"paid\", \"tien\": 30},",
        "    {\"thanh_pho\": \"Đà Nẵng\", \"trang_thai\": \"paid\", \"tien\": 70},",
        "    {\"thanh_pho\": \"Đà Nẵng\", \"trang_thai\": \"refund\", \"tien\": 40},",
        "]",
        "",
        "tong = {}",
        "for d in don_hang:",
        "    if d[\"trang_thai\"] != \"paid\":",
        "        continue",
        "    tong[d[\"thanh_pho\"]] = tong.get(d[\"thanh_pho\"], 0) + d[\"tien\"]",
        "",
        "for thanh_pho in tong:",
        "    print(thanh_pho, tong[thanh_pho])",
        "",
      ),
      expectedOutput: "Hà Nội 150\nĐà Nẵng 120",
      hints: [
        "Thứ tự bốn thao tác trong bài: chọn cột, lọc dòng, rồi mới gom nhóm. Mã đang thiếu bước lọc dòng.",
        "Trong vòng lặp, bỏ qua dòng có trang_thai khác \"paid\" bằng continue trước khi cộng.",
      ],
    },
    {
      type: "flow",
      title: "Một bảng đơn hàng đi qua bốn thao tác",
      steps: [
        { label: "Đọc vào rồi kiểm kiểu từng cột", detail: "Bảng có cột ngay_dat và tien. Nếu tien được đọc là chuỗi vì có dấu chấm ngăn nghìn như \"1.250.000\", mọi phép cộng phía sau đều sai mà không báo lỗi. In kiểu của từng cột ngay lúc này." },
        { label: "Chọn cột", detail: "Giữ thanh_pho, trang_thai, tien và bỏ phần còn lại. Bảng gọn hơn nên lỗi ít hơn, và người đọc mã sau này thấy ngay bạn quan tâm đến những cột nào." },
        { label: "Lọc dòng", detail: "Giữ dòng có trang_thai là paid. Sáu dòng còn bốn. Điều kiện được viết thành mã nên tuần sau chạy lại cho đúng cùng kết quả, khác với bộ lọc bấm tay trong bảng tính." },
        { label: "Gom nhóm theo thành phố", detail: "Mỗi thành phố một dòng kết quả với tổng tiền. Kết quả vẫn là một bảng, nên bạn nối tiếp được bước sau thay vì chép số ra chỗ khác." },
        { label: "Ghép bảng theo khóa chung", detail: "Nối với bảng chỉ tiêu theo thanh_pho. Trước khi ghép, đếm số dòng và số giá trị duy nhất của khóa ở bảng bên phải. Nếu hai số lệch nhau, phép ghép sẽ nhân bản dòng." },
      ],
    },
  ],

  "lam-sach-du-lieu-va-cai-gia-cua-du-lieu-ban": [
    {
      type: "exercise",
      language: "python",
      title: "Cột tỷ suất trộn hai đơn vị",
      task:
        "Cột tỷ suất lợi nhuận dưới đây có giá trị dạng 0,15 lẫn giá trị dạng 15. Mọi giá trị đều là số hợp lệ nên không kiểm tra kiểu nào bắt được. Mã khởi đầu lấy trung bình thẳng cột và ra con số vô nghĩa. Quy mọi giá trị lớn hơn 1 về dạng thập phân (chia cho 100), đếm số dòng đã sửa, rồi tính lại trung bình.",
      starter: L(
        "ty_suat = [0.12, 15, 0.2, 18, 0.1, 25]",
        "",
        "sach = []",
        "da_sua = 0",
        "for v in ty_suat:",
        "    sach.append(v)",
        "",
        "print(\"Đã chuẩn hoá:\", da_sua, \"dòng\")",
        "print(f\"Trung bình: {sum(sach) / len(sach) * 100:.1f}%\")",
        "",
      ),
      solution: L(
        "ty_suat = [0.12, 15, 0.2, 18, 0.1, 25]",
        "",
        "sach = []",
        "da_sua = 0",
        "for v in ty_suat:",
        "    if v > 1:",
        "        v = v / 100",
        "        da_sua += 1",
        "    sach.append(v)",
        "",
        "print(\"Đã chuẩn hoá:\", da_sua, \"dòng\")",
        "print(f\"Trung bình: {sum(sach) / len(sach) * 100:.1f}%\")",
        "",
      ),
      expectedOutput: "Đã chuẩn hoá: 3 dòng\nTrung bình: 16.7%",
      hints: [
        "Giá trị nào lớn hơn 1 thì gần như chắc chắn đang ở dạng phần trăm, vì tỷ suất thập phân ở đây đều nhỏ hơn 1.",
        "Nhớ tăng da_sua mỗi lần chia, để báo cáo cho biết đã đụng vào bao nhiêu dòng.",
      ],
    },
    {
      type: "feynman",
      title: "Ô trống trong khảo sát giống người bỏ qua câu hỏi thu nhập",
      intro:
        "Tưởng tượng bạn phát phiếu khảo sát thu nhập cho một lớp, và 20% số phiếu để trống ô thu nhập. Người rất giàu và người rất eo hẹp đều ngại trả lời hơn người ở giữa. Mỗi cách xử lý ô trống là một cách đoán xem những người im lặng ấy là ai.",
      columns: ["Cách xử lý", "Giống như làm gì với phiếu", "Cái giá phải trả"],
      rows: [
        ["Xoá dòng thiếu", "Vứt phiếu trống, chỉ đọc phiếu đầy đủ", "Mất đúng hai đầu của dải thu nhập, trung bình lệch về giữa"],
        ["Điền trung vị", "Ghi hộ mọi người trống vào mức giữa", "Độ phân tán co lại, khoảng tin cậy hẹp hơn thực tế"],
        ["Thêm cột đánh dấu", "Điền tạm một số và ghi chú: người này bỏ trống", "Giữ lại tín hiệu rằng im lặng cũng là thông tin"],
      ],
      oneLiner: "Xoá hay điền ô trống là chọn giả định về những người không trả lời, và cột đánh dấu là cách duy nhất giữ lại chính việc họ im lặng.",
    },
  ],

  "truc-quan-hoa-va-bieu-do-noi-doi": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Nhận xét biểu đồ do AI viết: tìm các chỗ khuyên sai",
      task:
        "Một công cụ AI viết nhận xét cho bộ biểu đồ báo cáo quý. Các số là minh hoạ. Bấm vào những đoạn có lời khuyên về biểu đồ sai hoặc dễ đánh lừa người xem, rồi nộp.",
      segments: [
        { text: "Doanh thu ba chi nhánh nên vẽ bằng biểu đồ cột, vì đây là so sánh giữa các nhóm." },
        {
          text:
            "Trục tung của biểu đồ cột có thể bắt đầu từ 480 triệu để chênh lệch hiện rõ hơn, nhờ vậy cột chi nhánh A (520 triệu) trông cao gấp đôi cột chi nhánh B (500 triệu).",
          error:
            "Mắt đọc chiều cao cột như độ lớn tuyệt đối. Cắt trục ở 480 khiến chênh 4% trông như gấp đôi. Cột phải bắt đầu từ 0; nếu buộc phải cắt thì phải ghi chú rõ ngay trên hình.",
        },
        { text: "Doanh thu theo tháng vẽ bằng biểu đồ đường, trục không nhất thiết từ 0 vì điều cần thấy là hướng và độ dốc." },
        {
          text:
            "Để cho thấy chi quảng cáo kéo doanh thu, đặt hai đường lên cùng một hình với hai trục tung khác thang rồi chỉnh sao cho chúng chạm nhau. Hai đường trùng khớp chứng tỏ quảng cáo làm doanh thu tăng.",
          error:
            "Chỉnh thang cho hai đường chạm nhau tạo ra mức trùng khớp tuỳ ý, và dữ liệu không hề khẳng định quan hệ đó. Trùng khớp trên hình cũng không chứng minh nhân quả. Nên vẽ từng đường riêng trước khi tin.",
        },
        { text: "Muốn biết thu nhập khách hàng trải ra thế nào, dùng histogram vì số trung bình không cho thấy dữ liệu phân bố ra sao." },
        {
          text: "Nên thêm hiệu ứng ba chiều cho các cột để giá trị nổi bật hơn.",
          error: "Hiệu ứng ba chiều làm sai lệch tỷ lệ giữa các cột và cản việc đọc giá trị. Nó nằm trong danh sách dấu hiệu cần cảnh giác của bài, không phải cách làm nổi bật.",
        },
      ],
    },
    {
      type: "chart",
      title: "Cắt trục tung làm chênh 4% trông thành gấp mấy lần",
      caption:
        "Số liệu minh hoạ: cột A cao 52, cột B cao 50, chênh thật 4%. Trục ngang là điểm mà trục tung bắt đầu (0 là đúng). Đường trên cho biết cột A trông cao gấp bao nhiêu lần cột B trên hình.",
      kind: "line",
      xLabel: "Giá trị bắt đầu của trục tung",
      yLabel: "Cột A trông cao gấp (lần) cột B",
      x: { from: 0, to: 48, step: 4 },
      series: [
        { label: "Độ cao tương đối trông thấy trên hình", expr: "(52-x)/(50-x)" },
        { label: "Tỷ lệ thật", expr: "52/50" },
      ],
    },
  ],

  "dashboard-va-bao-cao-tu-phuc-vu": [
    {
      type: "scenario",
      title: "Giám đốc xin một dashboard cho đội hỗ trợ khách hàng",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text:
            "Giám đốc vận hành gửi bạn danh sách hai mươi chỉ số và nhờ dựng dashboard cho đội hỗ trợ khách hàng. Công cụ cho phép làm cả hai mươi biểu đồ trong một buổi chiều.",
          choices: [
            { label: "Dựng đủ hai mươi biểu đồ trên một trang", next: "hai_muoi" },
            { label: "Hỏi trước: dashboard này sẽ đổi quyết định nào", next: "hoi" },
            { label: "Chọn năm biểu đồ đẹp nhất rồi gửi duyệt", next: "nam_dep" },
          ],
        },
        hai_muoi: {
          text:
            "Trang có hai mươi khối ngang hàng. Cuộc họp đầu tiên mất mười phút tranh cãi nên nhìn vào khối nào, hai tuần sau không ai mở trang nữa và đội trực vẫn xếp ca bằng tin nhắn.",
          ending: "bad",
        },
        nam_dep: {
          text:
            "Năm biểu đồ nhìn rất đẹp nhưng đều là tổng tích lũy theo tháng. Không khối nào cho biết hàng đợi hôm nay có đang quá tải, nên đội trực không có lý do để mở nó mỗi sáng.",
          ending: "bad",
        },
        hoi: {
          text:
            "Giám đốc trả lời: mỗi sáng trưởng ca phải quyết định xếp lại ai trực dựa trên hàng đợi, và mỗi tuần đội xem xu hướng. Bạn cần chọn cách tổ chức trang.",
          choices: [
            { label: "Ba tầng: cảnh báo hàng đợi, xu hướng tuần, bảng chi tiết có lọc", next: "ba_tang" },
            { label: "Một trang tổng hợp, số liệu cập nhật vào cuối tháng cho nhẹ hệ thống", next: "cuoi_thang" },
          ],
        },
        cuoi_thang: {
          text:
            "Trưởng ca cần số liệu mỗi sáng nhưng chỉ nhận được bản cuối tháng. Quyết định hằng ngày không có số để dựa vào nên họ tự đếm tay trong bảng tính riêng, và dashboard bị bỏ.",
          ending: "bad",
        },
        ba_tang: {
          text:
            "Tầng cảnh báo có hai con số đọc trong ba giây. Đến lúc kiểm thử, hai trưởng ca cãi nhau về chữ phiếu quá hạn: một người tính từ lúc khách gửi, người kia tính từ lúc phiếu được nhận. Bạn xử lý thế nào?",
          choices: [
            { label: "Ghi định nghĩa ngay cạnh con số và chốt với cả hai trưởng ca", next: "dinh_nghia" },
            { label: "Để mỗi người hiểu theo ý mình, ai thắc mắc thì tự hỏi", next: "mo_ho" },
          ],
        },
        dinh_nghia: {
          text:
            "Định nghĩa nằm ngay dưới con số cảnh báo. Cuộc họp sáng dành thời gian quyết định xếp ai vào ca chứ không cãi về nghĩa của từ, và bộ lọc giúp trưởng ca tự trả lời câu hỏi thứ hai mà không phải nhờ bạn.",
          ending: "good",
        },
        mo_ho: {
          text:
            "Hai trưởng ca vẫn đọc cùng một con số theo hai nghĩa và đi đến hai quyết định trái nhau. Báo cáo tuần có hai phiên bản, cuộc họp lại tranh cãi thay vì hành động.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Ba tầng dashboard được đọc trong một buổi sáng",
      steps: [
        { label: "Ba giây: tầng cảnh báo", detail: "Trưởng ca mở trang và thấy hai con số: số phiếu quá hạn và độ dài hàng đợi hiện tại. Cả hai đều bình thường, nên họ không cần đọc xuống dưới." },
        { label: "Một con số đổi màu", detail: "Hôm nay số phiếu quá hạn vượt ngưỡng đã thoả thuận. Ngưỡng nằm trong định nghĩa cạnh con số, nên không ai phải hỏi thế nào là nhiều." },
        { label: "Ba mươi giây: tầng xu hướng", detail: "Đường số phiếu quá hạn theo ngày cho thấy tăng từ đầu tuần chứ không phải một ngày bất thường. Câu hỏi đổi từ có vấn đề không thành vì sao nó tăng." },
        { label: "Tầng đào sâu có bộ lọc", detail: "Lọc theo loại yêu cầu rồi theo ca trực: phần lớn phiếu quá hạn thuộc một loại yêu cầu và một ca. Người xem tự trả lời câu hỏi thứ hai mà không quay lại nhờ người phân tích." },
        { label: "Quyết định được đưa ra trước cuộc họp", detail: "Trưởng ca chuyển hai người sang ca đó ngay trong sáng nay. Nhịp cập nhật hằng giờ phù hợp với nhịp quyết định hằng ngày, đúng điều bài nói về đường ống dữ liệu." },
      ],
    },
  ],

  "sql-nang-cao-join-va-window-function": [
    {
      type: "sim",
      tool: "sql",
      mission: "left-join-null",
      title: "LEFT JOIN để tìm khách chưa từng đặt hàng",
      task:
        "Bảng customers và bảng orders được nối bằng orders.customer_id. Dùng LEFT JOIN từ customers sang orders rồi lọc những dòng bên orders không có gì (IS NULL) để liệt kê tên các khách chưa có đơn nào. INNER JOIN sẽ âm thầm bỏ đúng nhóm khách này.",
    },
    {
      type: "chart",
      title: "JOIN với bảng có nhiều dòng cho một khóa nhân bản tổng",
      caption:
        "Số liệu minh hoạ. Mỗi đơn hàng ghép với bảng khách hàng mà một mã khách có nhiều dòng (mỗi địa chỉ một dòng). Trục ngang là số dòng trên mỗi mã khách, kéo thanh trượt để đổi doanh thu thật.",
      kind: "bar",
      xLabel: "Số dòng trong bảng bên phải cho mỗi mã khách",
      yLabel: "Tổng doanh thu hiện ra (triệu đồng)",
      x: { from: 1, to: 5, step: 1 },
      params: [{ id: "that", label: "Doanh thu thật", min: 100, max: 500, step: 50, value: 200, unit: "triệu" }],
      series: [
        { label: "Tổng sau JOIN", expr: "that*x" },
        { label: "Tổng đúng", expr: "that" },
      ],
    },
  ],

  "chon-chi-so-do-luong-va-vanity-metric": [
    {
      type: "exercise",
      language: "python",
      title: "Tổng tích lũy tăng, tỷ lệ hoạt động thì sao",
      task:
        "Sau ba tháng, tổng số người đã đăng ký tăng đều và slide trông rất đẹp. Với mỗi tháng, tính tỷ lệ phần trăm người còn hoạt động trên tổng đã đăng ký, rồi kiểm tra tỷ lệ này có giảm liên tiếp qua ba tháng không. Mã khởi đầu đang chia ngược nên ra con số lớn hơn 100%.",
      starter: L(
        "thang = [(1, 1000, 500), (2, 1500, 450), (3, 2000, 400)]",
        "",
        "ty_le = []",
        "for t, tich_luy, hoat_dong in thang:",
        "    p = tich_luy / hoat_dong * 100",
        "    ty_le.append(p)",
        "    print(f\"Tháng {t}: {tich_luy} đã đăng ký, {p:.1f}% hoạt động\")",
        "",
        "print(\"Giảm liên tiếp:\", all(a > b for a, b in zip(ty_le, ty_le[1:])))",
        "",
      ),
      solution: L(
        "thang = [(1, 1000, 500), (2, 1500, 450), (3, 2000, 400)]",
        "",
        "ty_le = []",
        "for t, tich_luy, hoat_dong in thang:",
        "    p = hoat_dong / tich_luy * 100",
        "    ty_le.append(p)",
        "    print(f\"Tháng {t}: {tich_luy} đã đăng ký, {p:.1f}% hoạt động\")",
        "",
        "print(\"Giảm liên tiếp:\", all(a > b for a, b in zip(ty_le, ty_le[1:])))",
        "",
      ),
      expectedOutput: L(
        "Tháng 1: 1000 đã đăng ký, 50.0% hoạt động",
        "Tháng 2: 1500 đã đăng ký, 30.0% hoạt động",
        "Tháng 3: 2000 đã đăng ký, 20.0% hoạt động",
        "Giảm liên tiếp: True",
      ),
      hints: [
        "Tỷ lệ hoạt động là phần đang hoạt động chia cho cả nhóm đã đăng ký, nên tử số là hoat_dong.",
        "Khi tỷ lệ đúng, dòng cuối tự cho biết chỉ số dẫn tới hành động đang đi xuống trong lúc chỉ số phù phiếm đi lên.",
      ],
    },
    {
      type: "feynman",
      title: "Chỉ số giống đồng hồ trên xe: đẹp chưa đủ, phải kéo được tay lái",
      intro:
        "Đồng hồ cây số tích lũy chỉ có một chiều tăng. Đồng hồ xăng thì lên xuống theo cách bạn lái, và khi kim chạm vạch đỏ bạn có việc phải làm. Bốn câu hỏi sàng lọc trong bài chính là cách phân biệt hai loại đồng hồ đó.",
      columns: ["Câu hỏi sàng lọc", "Với đồng hồ xe", "Với chỉ số kinh doanh"],
      rows: [
        ["Thay đổi được không", "Kim xăng đổi theo cách chạy", "Tổng người dùng tích lũy chỉ đi một chiều nên không mang tín hiệu"],
        ["Ai chịu trách nhiệm", "Người cầm lái nhìn kim xăng", "Chỉ số vô chủ chỉ nằm trên báo cáo"],
        ["Dẫn báo hay kết quả", "Vạch đỏ báo trước khi chết máy", "Tỷ lệ khách quay lại 30 ngày báo trước doanh thu tụt"],
        ["Bị lách thế nào", "Rút bớt xăng khỏi bình để kim đẹp", "Ghép cặp: tăng trưởng đi với tỷ lệ rời bỏ"],
      ],
      oneLiner: "Chọn chỉ số mà khi xấu đi thì có người phải làm việc gì đó, và ghép cặp để không ai lách được bằng đường tắt.",
    },
  ],

  "phan-tich-cohort-va-cai-bay-trung-binh": [
    {
      type: "exercise",
      language: "python",
      title: "Mọi nhóm đều tốt lên mà tổng thể vẫn giảm",
      task:
        "Dữ liệu giữ chân khách hàng của hai năm theo hai kênh. Mã khởi đầu tính tỷ lệ ở lại chung của năm 2 nhưng vẫn dùng số người của năm 1, nên kết quả không phản ánh cơ cấu mới. Sửa để tỷ lệ chung mỗi năm được tính theo đúng số người của năm đó, rồi quan sát từng kênh và con số tổng chuyển động ra sao.",
      starter: L(
        "nguoi1 = {\"giới thiệu\": 100, \"quảng cáo\": 100}",
        "ti1 = {\"giới thiệu\": 50, \"quảng cáo\": 20}",
        "nguoi2 = {\"giới thiệu\": 50, \"quảng cáo\": 250}",
        "ti2 = {\"giới thiệu\": 55, \"quảng cáo\": 25}",
        "",
        "def chung(nguoi, ti):",
        "    return sum(nguoi[k] * ti[k] for k in nguoi) / sum(nguoi.values())",
        "",
        "for kenh in nguoi1:",
        "    print(f\"{kenh}: {ti1[kenh]}% -> {ti2[kenh]}%\")",
        "print(f\"Chung: {chung(nguoi1, ti1):.1f}% -> {chung(nguoi1, ti2):.1f}%\")",
        "",
      ),
      solution: L(
        "nguoi1 = {\"giới thiệu\": 100, \"quảng cáo\": 100}",
        "ti1 = {\"giới thiệu\": 50, \"quảng cáo\": 20}",
        "nguoi2 = {\"giới thiệu\": 50, \"quảng cáo\": 250}",
        "ti2 = {\"giới thiệu\": 55, \"quảng cáo\": 25}",
        "",
        "def chung(nguoi, ti):",
        "    return sum(nguoi[k] * ti[k] for k in nguoi) / sum(nguoi.values())",
        "",
        "for kenh in nguoi1:",
        "    print(f\"{kenh}: {ti1[kenh]}% -> {ti2[kenh]}%\")",
        "print(f\"Chung: {chung(nguoi1, ti1):.1f}% -> {chung(nguoi2, ti2):.1f}%\")",
        "",
      ),
      expectedOutput: L("giới thiệu: 50% -> 55%", "quảng cáo: 20% -> 25%", "Chung: 35.0% -> 30.0%"),
      hints: [
        "Tỷ lệ chung là trung bình có trọng số, và trọng số là số người của đúng năm đang tính.",
        "Khi đổi đúng, hai dòng đầu đều tăng còn dòng cuối giảm. Vấn đề nằm ở cơ cấu kênh, không nằm ở sản phẩm.",
      ],
    },
    {
      type: "chart",
      title: "Cả hai kênh tốt lên, con số chung vẫn xuống",
      caption:
        "Số liệu lấy từ ví dụ trong bài (tỷ lệ khách ở lại, đơn vị phần trăm): năm 1 có 100 người mỗi kênh, năm 2 có 50 người từ giới thiệu và 250 người từ quảng cáo.",
      kind: "bar",
      yLabel: "Tỷ lệ ở lại (%)",
      data: [
        { label: "Giới thiệu", values: [50, 55] },
        { label: "Quảng cáo", values: [20, 25] },
        { label: "Chung", values: [35, 30] },
      ],
      seriesLabels: ["Năm 1", "Năm 2"],
    },
  ],

  "ab-testing-va-y-nghia-thong-ke": [
    {
      type: "scenario",
      title: "Ngày thứ ba của một thử nghiệm kế hoạch chạy mười bốn ngày",
      start: "ngay3",
      nodes: {
        ngay3: {
          text:
            "Bạn chạy thử nghiệm nút mua mới (biến thể B) với kế hoạch mười bốn ngày. Ngày thứ ba, B đang hơn A về tỷ lệ mua và p-value nhìn thấy là 0,03. Sếp nhắn: có thể dừng và triển khai chưa?",
          choices: [
            { label: "Dừng ngay vì đã đạt ý nghĩa thống kê", next: "dung_som" },
            { label: "Chạy tiếp đủ mười bốn ngày như kế hoạch", next: "chay_tiep" },
            { label: "Kéo dài thêm cho tới khi p-value còn thấp hơn", next: "keo_dai" },
          ],
        },
        dung_som: {
          text:
            "Nhìn liên tục rồi dừng khi thấy đẹp làm ngưỡng sai 5% thật ra cao hơn nhiều. Sau khi triển khai, tỷ lệ mua trở về mức cũ, nút mới tốn công làm mà không đem lại gì, và bạn phải giải thích với sếp vì sao con số đã đẹp.",
          ending: "bad",
        },
        keo_dai: {
          text:
            "Kéo dài cho tới khi con số vừa ý là chọn điểm dừng sau khi thấy dữ liệu. Kết luận nghe thuyết phục nhưng không ai tái lập được, và kế hoạch ban đầu mất giá trị.",
          ending: "bad",
        },
        chay_tiep: {
          text:
            "Hết mười bốn ngày, B chỉ hơn A khoảng 2% và p-value là 0,20, chưa đạt ý nghĩa. Người trong nhóm đề nghị vài hướng. Bạn chọn gì?",
          choices: [
            { label: "Báo cáo chưa thấy khác biệt đủ tin và giữ phương án A", next: "bao_cao_that" },
            { label: "Chuyển sang báo cáo chỉ số phụ thời gian ở lại trang vì trông đẹp", next: "doi_chi_so" },
            { label: "Cắt dữ liệu thành hai mươi nhóm người dùng để tìm nhóm B thắng", next: "cat_lat" },
          ],
        },
        bao_cao_that: {
          text:
            "Bạn nêu rõ kết quả không khác biệt đủ tin, kèm cỡ mẫu và mức cải thiện tối thiểu đã định từ đầu. Đội không tốn công triển khai thứ chưa chắc có hiệu quả, và lần sau có thể thử một giả thuyết khác.",
          ending: "good",
        },
        doi_chi_so: {
          text:
            "Chỉ số chính không đạt nên bạn đổi sang chỉ số phụ có số đẹp. Kết quả nghe hợp lý nhưng là chỉ số được chọn sau khi đã thấy dữ liệu, rất khó phát hiện từ bên ngoài, và sẽ không lặp lại ở lần chạy sau.",
          ending: "bad",
        },
        cat_lat: {
          text:
            "Cắt hai mươi cách thì trung bình có một nhóm đạt ý nghĩa thuần do ngẫu nhiên. Bạn báo cáo nhóm đó như một phát hiện, nút mới được đẩy cho đúng nhóm ấy, và tác động thật là bằng không.",
          ending: "bad",
        },
      },
    },
    {
      type: "chart",
      title: "Thử càng nhiều biến thể, càng dễ có một kết quả đạt ý nghĩa do may rủi",
      caption:
        "Tính theo lý thuyết, giả sử các lần thử độc lập và không có biến thể nào thật sự tốt hơn. Nhìn giữa chừng nhiều lần cho kết quả tương quan với nhau nên con số thật thấp hơn đường này, nhưng chiều tăng vẫn như vậy. Đây là minh hoạ, không phải số đo từ một thử nghiệm cụ thể.",
      kind: "line",
      xLabel: "Số biến thể hoặc cách cắt lát đã thử",
      yLabel: "Xác suất có ít nhất một kết quả đạt ý nghĩa (%)",
      x: { from: 1, to: 20, step: 1 },
      params: [{ id: "a", label: "Ngưỡng ý nghĩa cho mỗi lần thử", min: 1, max: 10, step: 1, value: 5, unit: "%" }],
      series: [{ label: "Xác suất báo nhầm", expr: "100*(1-(1-a/100)^x)" }],
    },
  ],

  "tuong-quan-khong-phai-nhan-qua": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản tóm tắt phân tích do AI viết: đâu là chỗ nhảy sang nhân quả",
      task:
        "AI tóm tắt một phân tích về tính năng bật thông báo. Các số là minh hoạ. Bấm vào những đoạn kết luận vượt quá bằng chứng, rồi nộp.",
      segments: [
        { text: "Trong dữ liệu quý vừa rồi, người dùng bật thông báo có số phiên mỗi tuần cao hơn rõ rệt so với người tắt." },
        {
          text: "Vì vậy bật thông báo làm người dùng tích cực hơn, và ta nên bật sẵn cho mọi người.",
          error:
            "Chiều tác động có thể ngược lại: người vốn tích cực mới bật thông báo. Cũng có thể một yếu tố thứ ba, như mức độ quan tâm tới sản phẩm, đứng sau cả hai. Dữ liệu quan sát chưa tách được các khả năng này.",
        },
        { text: "Mối quan hệ này lặp lại ba quý liên tiếp, nhưng cả ba quý đều là dữ liệu quan sát nên chưa loại được yếu tố thứ ba." },
        {
          text: "Khảo sát hài lòng trên người dùng đang hoạt động cho điểm trung bình 4,6 trên 5, nên có thể kết luận gần như toàn bộ khách hàng hài lòng.",
          error:
            "Đây là thiên lệch sống sót. Người không hài lòng đã rời đi và biến mất khỏi danh sách được khảo sát, nên điểm đẹp hơn thực tế. Điểm 4,6 chỉ nói về những người còn ở lại.",
        },
        { text: "Để kiểm tra nhân quả, có thể bật thông báo ngẫu nhiên cho một nửa người dùng mới rồi so sánh với nửa còn lại." },
        { text: "Doanh số kem và số vụ đuối nước cùng tăng vào mùa hè, và nhiệt độ có thể đứng sau cả hai." },
      ],
    },
    {
      type: "feynman",
      title: "Ba cách tương quan đánh lừa bạn, qua ba chuyện đời thường",
      intro:
        "Hai thứ cùng lên xuống không có nghĩa thứ này kéo thứ kia. Mỗi cơ chế trong bài có một chuyện đời thường dễ nhớ, và một câu hỏi bạn nên tự hỏi trước khi viết chữ làm tăng vào báo cáo.",
      columns: ["Cơ chế", "Chuyện đời thường", "Câu hỏi tự hỏi"],
      rows: [
        ["Biến gây nhiễu", "Trời nóng làm cả bán kem lẫn đi bơi tăng, nên số vụ đuối nước đi cùng doanh số kem", "Có yếu tố thứ ba nào tác động lên cả hai không"],
        ["Nhân quả ngược", "Người hay đọc sách mới mua giá sách, giá sách không làm họ ham đọc", "Có khi nào chiều tác động đi ngược điều mình giả định"],
        ["Thiên lệch sống sót", "Hỏi khách trong quán về độ ngon, người chê đã không quay lại", "Những người vắng mặt trong mẫu đã đi đâu"],
      ],
      oneLiner: "Gặp hai thứ cùng chuyển động, đừng hỏi cái nào gây ra cái nào trước khi hỏi còn cách giải thích nào khác chưa loại trừ.",
    },
  ],

  "ke-chuyen-bang-du-lieu": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Nhờ AI dựng bản trình bày theo kim tự tháp ngược",
      task:
        "Bạn có bảng doanh thu quý 4 giảm 8%, chủ yếu ở nhóm khách doanh nghiệp. Hãy lắp một prompt để AI viết giúp bộ tiêu đề slide. Chọn một phương án cho mỗi phần.",
      parts: [
        {
          id: "boi_canh",
          label: "Bối cảnh",
          options: [
            {
              text: "Nói rõ người nghe là ban giám đốc và họ cần quyết định có tăng ngân sách bán hàng doanh nghiệp không",
              good: true,
              feedback: "Có người nghe và có quyết định cần đưa ra, nên AI biết kết luận phải dẫn tới đề xuất nào.",
            },
            {
              text: "Gửi bảng doanh thu quý 4 và nhờ viết nội dung cho các slide thật chuyên nghiệp",
              feedback: "Chỉ có dữ liệu, thiếu người nghe và quyết định. AI sẽ mô tả số liệu chứ không dẫn tới hành động.",
            },
            {
              text: "Báo là sếp rất bận nên cần bài ngắn và đẹp, không cần nói thêm gì",
              feedback: "Ngắn và đẹp không phải bối cảnh. AI không biết sếp cần quyết định gì nên bài thiếu trọng tâm.",
            },
          ],
        },
        {
          id: "tieu_de",
          label: "Yêu cầu về tiêu đề",
          options: [
            {
              text: "Viết ba tiêu đề là thông điệp có con số, ghép lại thành một lập luận",
              good: true,
              feedback: "Người lướt slide chỉ đọc tiêu đề vẫn nhận đủ lập luận, như bài đã nói.",
            },
            {
              text: "Viết ba tiêu đề ngắn theo tên biểu đồ, ví dụ Doanh thu theo quý",
              feedback: "Tiêu đề mô tả loại biểu đồ không cho người đọc biết nên rút ra điều gì.",
            },
            {
              text: "Viết thật nhiều tiêu đề hấp dẫn để mình chọn lấy cái ưng ý nhất",
              feedback: "Nhiều tiêu đề không làm thành một lập luận, và mọi phát hiện bị nêu ngang hàng nhau.",
            },
          ],
        },
        {
          id: "gioi_han",
          label: "Giới hạn của phân tích",
          options: [
            {
              text: "Thêm một slide nêu điều phân tích chưa trả lời được và giả định đang đỡ kết luận",
              good: true,
              feedback: "Tự nêu giới hạn mạnh hơn bị hỏi, và khớp với tầng giới hạn trong cấu trúc bốn tầng.",
            },
            {
              text: "Bỏ hẳn phần hạn chế để bài gọn và nghe chắc chắn hơn",
              feedback: "Người nghe sẽ tự hỏi và bạn mất thế chủ động. Đây là dấu hiệu của bản trình bày yếu.",
            },
            {
              text: "Chỉ thêm phần phương pháp ở cuối bài, ai muốn biết thì đọc",
              feedback: "Phương pháp thuộc phụ lục. Nó không nói đã bỏ qua điều gì hay giả định nào chống đỡ kết luận.",
            },
          ],
        },
      ],
      responses: [
        {
          requires: ["boi_canh", "tieu_de", "gioi_han"],
          text:
            "Tiêu đề 1: Doanh thu quý 4 giảm 8%, gần như toàn bộ nằm ở nhóm khách doanh nghiệp. Tiêu đề 2: Nhóm này mất khách mới chứ không mất khách cũ. Tiêu đề 3: Đề xuất tăng ngân sách bán hàng doanh nghiệp, cần quyết định hôm nay. Slide cuối: chưa phân tích được tác động của giá, và kết luận đang giả định khách mới là nguyên nhân chính.",
        },
        {
          requires: ["boi_canh", "tieu_de"],
          text:
            "Tiêu đề 1: Doanh thu quý 4 giảm 8%, tập trung ở khách doanh nghiệp. Tiêu đề 2: Mất khách mới chứ không mất khách cũ. Tiêu đề 3: Đề xuất tăng ngân sách bán hàng doanh nghiệp. Không có slide nào nói đến giới hạn của phân tích, nên người nghe sẽ tự hỏi.",
        },
        {
          requires: ["tieu_de"],
          text:
            "Tiêu đề 1: Doanh thu quý 4 giảm 8%. Tiêu đề 2: Một nhóm khách ảnh hưởng nhiều nhất. Tiêu đề 3: Cần xem xét thêm. Thiếu người nghe và quyết định nên kết thúc là một câu cần phân tích thêm.",
        },
        {
          text:
            "Slide 1: Doanh thu theo quý. Slide 2: Doanh thu theo nhóm khách. Slide 3: Doanh thu theo khu vực. Đây là các tiêu đề tên biểu đồ, người lướt qua không rút ra được điều gì.",
        },
      ],
    },
    {
      type: "flow",
      title: "Cuộc họp bị cắt còn năm phút: bản trình bày vẫn phải đi được tới quyết định",
      steps: [
        { label: "Phút đầu: kết luận có con số", detail: "Mở bằng một câu: doanh thu quý 4 giảm 8%, gần như toàn bộ ở khách doanh nghiệp, đề xuất tăng ngân sách bán hàng nhóm này. Nếu cuộc họp dừng ở đây, người nghe vẫn có thứ để quyết." },
        { label: "Phút hai và ba: ba điểm tựa", detail: "Mỗi bằng chứng một slide, tiêu đề là thông điệp. Người chỉ lướt tiêu đề vẫn đọc được lập luận liền mạch từ trên xuống." },
        { label: "Phút bốn: giới hạn bạn tự nêu", detail: "Phân tích chưa trả lời được tác động của giá, và giả định khách mới là nguyên nhân. Tự nêu trước nên người nghe không bắt bạn phải chống đỡ." },
        { label: "Phút năm: đề xuất cần được quyết định", detail: "Kết thúc bằng một lựa chọn cụ thể với người ra quyết định, không phải câu cần phân tích thêm. Phụ lục chờ sẵn cho người hỏi về phương pháp hay các cách cắt lát khác." },
      ],
    },
  ],

  "dao-duc-du-lieu-va-thien-lech-thuat-toan": [
    {
      type: "exercise",
      language: "python",
      title: "Độ chính xác chung che mất một nhóm bị từ chối",
      task:
        "Mô hình duyệt hồ sơ vay có kết quả cho từng hồ sơ: nhóm, hồ sơ có thật sự đạt chuẩn không, và mô hình có duyệt không. Chỉ đo tỷ lệ duyệt chung thì cả hai nhóm trông giống nhau. Mã khởi đầu đang tính trên toàn bộ hồ sơ. Sửa để tính tỷ lệ duyệt trong số hồ sơ đạt chuẩn riêng cho từng nhóm, rồi in mức chênh.",
      starter: L(
        "ho_so = (",
        "    [(\"A\", True, True)] * 7 + [(\"A\", True, False)]",
        "    + [(\"B\", True, True)] + [(\"B\", True, False)] * 3",
        "    + [(\"A\", False, False)] * 3 + [(\"B\", False, False)] * 2",
        ")",
        "",
        "def ty_le_duyet(nhom):",
        "    dat = [h for h in ho_so if h[1]]",
        "    return sum(1 for h in dat if h[2]) / len(dat) * 100",
        "",
        "a = ty_le_duyet(\"A\")",
        "b = ty_le_duyet(\"B\")",
        "print(f\"A: {a:.1f}%\")",
        "print(f\"B: {b:.1f}%\")",
        "print(f\"Chênh lệch: {a - b:.1f} điểm\")",
        "",
      ),
      solution: L(
        "ho_so = (",
        "    [(\"A\", True, True)] * 7 + [(\"A\", True, False)]",
        "    + [(\"B\", True, True)] + [(\"B\", True, False)] * 3",
        "    + [(\"A\", False, False)] * 3 + [(\"B\", False, False)] * 2",
        ")",
        "",
        "def ty_le_duyet(nhom):",
        "    dat = [h for h in ho_so if h[0] == nhom and h[1]]",
        "    return sum(1 for h in dat if h[2]) / len(dat) * 100",
        "",
        "a = ty_le_duyet(\"A\")",
        "b = ty_le_duyet(\"B\")",
        "print(f\"A: {a:.1f}%\")",
        "print(f\"B: {b:.1f}%\")",
        "print(f\"Chênh lệch: {a - b:.1f} điểm\")",
        "",
      ),
      expectedOutput: L("A: 87.5%", "B: 25.0%", "Chênh lệch: 62.5 điểm"),
      hints: [
        "Hàm nhận tham số nhom nhưng chưa dùng nó. Thêm điều kiện h[0] == nhom vào phép lọc.",
        "Đây là ý của bài: đo kết quả theo từng nhóm, vì số chung che mất nhóm bị đối xử khác.",
      ],
    },
    {
      type: "flow",
      title: "Mô hình không dùng dân tộc vẫn học ra ranh giới dân tộc",
      steps: [
        { label: "Danh sách biến đầu vào trông sạch", detail: "Không có cột giới tính hay dân tộc. Bản kiểm tra danh sách biến cho cảm giác an toàn, và ở bước này chưa ai nhận ra vấn đề." },
        { label: "Dữ liệu lịch sử mang sẵn thiên lệch", detail: "Các hồ sơ bị từ chối trước đây tập trung ở một số khu vực, vì quyết định cũ đã thiên lệch. Mô hình huấn luyện trên chúng coi đó là quy luật." },
        { label: "Mã bưu chính trở thành biến thay thế", detail: "Dù chỉ là một cột địa chỉ, nó tương quan với nhóm dân cư, nên mô hình dựa vào nó để dự đoán. Dữ liệu xã hội vốn đan xen nhau." },
        { label: "Độ chính xác chung vẫn tốt", detail: "Nhóm đa số chiếm phần lớn hồ sơ nên số chung đẹp. Không ai thấy gì bất thường nếu chỉ nhìn một con số tổng." },
        { label: "Đo kết quả theo từng nhóm mới lộ ra", detail: "Tỷ lệ duyệt trong số hồ sơ đạt chuẩn khác nhau xa giữa các nhóm. Chỉ lúc này nhóm mới có căn cứ để sửa mô hình, và trả lời được vì sao một hồ sơ bị từ chối." },
      ],
    },
  ],

  "lap-ke-hoach-theo-yeu-to-dan-dat": [
    {
      type: "exercise",
      language: "python",
      title: "Cuối kỳ lệch, yếu tố nào lệch",
      task:
        "Doanh thu = số người dùng trả phí × giá gói × tỷ lệ gia hạn. Kế hoạch là 1000 người, 200 nghìn đồng, 80%; thực tế là 900 người, 200 nghìn đồng, 70%. Mã khởi đầu mới tính phần lệch của người dùng và giá. Hãy hoàn thành phần lệch do tỷ lệ gia hạn (đổi riêng yếu tố đó, giữ nguyên hai yếu tố kia ở kế hoạch), rồi tính phần tương tác còn lại giữa các yếu tố sao cho các phần cộng đúng bằng tổng lệch.",
      starter: L(
        "def dt(nguoi, gia, gia_han):",
        "    return nguoi * gia * gia_han // 100",
        "",
        "ke = (1000, 200, 80)",
        "tt = (900, 200, 70)",
        "",
        "goc = dt(*ke)",
        "tong_lech = dt(*tt) - goc",
        "nguoi = dt(tt[0], ke[1], ke[2]) - goc",
        "gia = dt(ke[0], tt[1], ke[2]) - goc",
        "gia_han = 0",
        "tuong_tac = 0",
        "",
        "print(\"Người dùng:\", nguoi)",
        "print(\"Giá:\", gia)",
        "print(\"Gia hạn:\", gia_han)",
        "print(\"Tương tác:\", tuong_tac)",
        "",
      ),
      solution: L(
        "def dt(nguoi, gia, gia_han):",
        "    return nguoi * gia * gia_han // 100",
        "",
        "ke = (1000, 200, 80)",
        "tt = (900, 200, 70)",
        "",
        "goc = dt(*ke)",
        "tong_lech = dt(*tt) - goc",
        "nguoi = dt(tt[0], ke[1], ke[2]) - goc",
        "gia = dt(ke[0], tt[1], ke[2]) - goc",
        "gia_han = dt(ke[0], ke[1], tt[2]) - goc",
        "tuong_tac = tong_lech - (nguoi + gia + gia_han)",
        "",
        "print(\"Người dùng:\", nguoi)",
        "print(\"Giá:\", gia)",
        "print(\"Gia hạn:\", gia_han)",
        "print(\"Tương tác:\", tuong_tac)",
        "",
      ),
      expectedOutput: L("Người dùng: -16000", "Giá: 0", "Gia hạn: -20000", "Tương tác: 2000"),
      hints: [
        "Làm giống hai dòng trên: lấy tham số thứ ba của tt, hai tham số đầu của ke.",
        "Ba lệch riêng lẻ cộng lại không bằng tổng lệch vì các yếu tố nhân với nhau. Phần chênh là tương tác.",
      ],
    },
    {
      type: "chart",
      title: "Doanh thu gia hạn kéo theo ba yếu tố, kéo từng thanh trượt để thấy",
      caption:
        "Số liệu minh hoạ, mô hình rút gọn: doanh thu gia hạn mỗi tháng = số người dùng × giá gói × tỷ lệ gia hạn. Kéo giá hoặc tỷ lệ gia hạn để thấy yếu tố nào làm cả đường dịch nhiều nhất.",
      kind: "line",
      xLabel: "Số người dùng trả phí",
      yLabel: "Doanh thu gia hạn mỗi tháng (triệu đồng)",
      x: { from: 100, to: 1000, step: 100 },
      params: [
        { id: "gia", label: "Giá gói bình quân", min: 100, max: 400, step: 50, value: 200, unit: "nghìn" },
        { id: "gh", label: "Tỷ lệ gia hạn", min: 50, max: 100, step: 5, value: 80, unit: "%" },
      ],
      series: [{ label: "Doanh thu gia hạn", expr: "x*gia*gh/100/1000" }],
    },
  ],

  "ke-hoach-nhan-su-cho-doi-ky-thuat": [
    {
      type: "exercise",
      language: "python",
      title: "Bốn vị trí được duyệt, năng lực thật của năm là bao nhiêu",
      task:
        "Mỗi vị trí có ba mốc: tháng duyệt, tháng vào làm, tháng bắt đầu tự chủ được (đều tính trong năm, tháng 13 trở đi là sang năm sau). Kế hoạch đếm đầu người coi người đóng góp từ tháng duyệt tới hết tháng 12. Năng lực thật chỉ tính từ tháng tự chủ. Mã khởi đầu đang tính năng lực thật từ tháng vào làm, nên con số quá lạc quan. Sửa lại cho đúng.",
      starter: L(
        "# (tháng duyệt, tháng vào làm, tháng tự chủ)",
        "vi_tri = [(1, 3, 6), (1, 4, 7), (4, 6, 10), (10, 12, 15)]",
        "",
        "ke_hoach = 0",
        "that = 0",
        "for duyet, vao, tu_chu in vi_tri:",
        "    ke_hoach += 12 - duyet + 1",
        "    that += max(0, 12 - vao + 1)",
        "",
        "print(f\"Kế hoạch đếm đầu người: {ke_hoach} tháng-người\")",
        "print(f\"Năng lực thật: {that} tháng-người\")",
        "print(f\"Tỷ lệ: {that / ke_hoach * 100:.0f}%\")",
        "",
      ),
      solution: L(
        "# (tháng duyệt, tháng vào làm, tháng tự chủ)",
        "vi_tri = [(1, 3, 6), (1, 4, 7), (4, 6, 10), (10, 12, 15)]",
        "",
        "ke_hoach = 0",
        "that = 0",
        "for duyet, vao, tu_chu in vi_tri:",
        "    ke_hoach += 12 - duyet + 1",
        "    that += max(0, 12 - tu_chu + 1)",
        "",
        "print(f\"Kế hoạch đếm đầu người: {ke_hoach} tháng-người\")",
        "print(f\"Năng lực thật: {that} tháng-người\")",
        "print(f\"Tỷ lệ: {that / ke_hoach * 100:.0f}%\")",
        "",
      ),
      expectedOutput: L("Kế hoạch đếm đầu người: 36 tháng-người", "Năng lực thật: 16 tháng-người", "Tỷ lệ: 44%"),
      hints: [
        "Người vào làm vẫn chưa làm việc độc lập. Chỉ tính từ tháng tự chủ, tức biến tu_chu.",
        "Vị trí duyệt tháng 10 có tu_chu là 15, vượt quá tháng 12 nên max(0, ...) đưa phần đóng góp về bằng không.",
      ],
    },
    {
      type: "chart",
      title: "Duyệt càng muộn, năng lực thật trong năm càng ít hơn con số trên giấy",
      caption:
        "Số liệu minh hoạ cho một vị trí. Trục ngang là tháng được duyệt. Đường trên là năng lực theo kế hoạch đếm đầu người, đường dưới trừ thời gian tuyển và thời gian để người mới tự chủ. Kéo hai thanh trượt để xem tác động.",
      kind: "line",
      xLabel: "Tháng được duyệt (1 đến 12)",
      yLabel: "Số tháng người đóng góp trong năm",
      x: { from: 1, to: 12, step: 1 },
      params: [
        { id: "tuyen", label: "Thời gian tuyển", min: 1, max: 6, step: 1, value: 3, unit: "tháng" },
        { id: "tuchu", label: "Thời gian để người mới tự chủ", min: 1, max: 6, step: 1, value: 3, unit: "tháng" },
      ],
      series: [
        { label: "Kế hoạch đếm đầu người", expr: "12-x+1" },
        { label: "Năng lực thật", expr: "max(0, 12-x+1-tuyen-tuchu)" },
      ],
    },
  ],

  "lich-phat-hanh-13-tuan": [
    {
      type: "scenario",
      title: "Tuần 6 của lịch 13 tuần, một yêu cầu khẩn chen vào",
      start: "yeu_cau",
      nodes: {
        yeu_cau: {
          text:
            "Lịch 13 tuần của đội đã kín tới tuần 13. Tuần 6, quản lý sản phẩm xin chèn một việc khẩn: tích hợp thanh toán với đối tác, ước tính ba tuần công.",
          choices: [
            { label: "Nhận luôn, ai rảnh thì làm thêm", next: "nhet" },
            { label: "Hỏi: việc này cam kết hay dự kiến, và còn bao nhiêu dự phòng", next: "hoi" },
            { label: "Từ chối vì lịch đã chốt từ đầu quý", next: "tu_choi" },
          ],
        },
        nhet: {
          text:
            "Không ai bị gỡ việc nào nên cả đội làm thêm giờ. Hai việc đã hứa với bên ngoài trễ hạn, và không ai trong lịch biết trước vì lịch không được sửa.",
          ending: "bad",
        },
        tu_choi: {
          text:
            "Lịch được giữ nguyên nhưng việc đối tác là việc thật. Quản lý sản phẩm tìm đường vòng, nhờ riêng từng người làm giúp, và lịch chính thức mất dần mối liên hệ với công việc đang chạy.",
          ending: "bad",
        },
        hoi: {
          text:
            "Bạn mở lịch: phần dự phòng còn một tuần công, trong khi việc mới cần ba tuần. Các dòng ở tuần 11 và 12 được đánh dấu dự kiến, các dòng trước đó đã cam kết với bên ngoài. Bạn chọn gì?",
          choices: [
            { label: "Dùng một tuần dự phòng, dời hai tuần việc dự kiến ra và báo người phụ thuộc", next: "doi_du_kien" },
            { label: "Dùng hết dự phòng rồi lấy nốt từ việc đã cam kết mà không báo ai", next: "lay_cam_ket" },
            { label: "Thêm dòng mới ở cuối lịch mà không đánh dấu cam kết hay dự kiến", next: "khong_danh_dau" },
          ],
        },
        doi_du_kien: {
          text:
            "Việc đối tác có chỗ chạy, hai việc dự kiến được dời và người phụ thuộc biết trước nên kịp đổi kế hoạch. Lịch được sửa trong cùng tuần nên không trôi xa khỏi thực tế.",
          ending: "good",
        },
        lay_cam_ket: {
          text:
            "Một việc đã cam kết bị đẩy ra mà bên ngoài không hay. Đến ngày hẹn bên đó mới biết, và độ tin cậy của lịch giảm vì những dòng cam kết không còn là cam kết.",
          ending: "bad",
        },
        khong_danh_dau: {
          text:
            "Dòng mới trông giống mọi dòng khác nên người ngoài đội đọc nó như một cam kết. Khi nó phải dời, họ coi đó là thất hứa, dù đây vốn là việc dự kiến.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Một tuần cuốn chiếu của lịch 13 tuần",
      steps: [
        { label: "Bỏ tuần vừa qua", detail: "Tuần 1 đã xong, được ghi lại những việc đã làm so với dự kiến. Phần này là dữ liệu để biết đội thật sự làm được bao nhiêu mỗi tuần." },
        { label: "Sửa các tuần còn lại theo thực tế", detail: "Việc nào trễ thì dời, việc nào xong sớm thì rút. Thay đổi viết ngay lên lịch chứ không nhớ trong đầu, nên không ai đọc nhầm bản cũ." },
        { label: "Đánh dấu cam kết hoặc dự kiến cho từng dòng", detail: "Dòng có người nhận, có ngày và bên ngoài đang dựa vào là cam kết. Còn lại là dự kiến. Người ngoài đội nhìn là biết dòng nào dời được." },
        { label: "Thêm tuần mới ở cuối", detail: "Lịch luôn đủ mười ba tuần. Tuần mới bắt đầu với phần dự phòng được quyết định có ý thức, không phải phần còn sót lại." },
        { label: "Báo người phụ thuộc phần thay đổi", detail: "Chỉ những dòng cam kết đổi mới cần báo, nên bản tin ngắn và đọc được. Từ đây lịch trở thành thứ cả đội mở ra hằng tuần chứ không treo trên tường." },
      ],
    },
  ],

  "kich-ban-va-do-nhay-trong-ke-hoach": [
    {
      type: "exercise",
      language: "python",
      title: "Tải tăng 20%, thời gian chờ tăng bao nhiêu",
      task:
        "Theo mô hình hàng đợi trong bài, thời gian chờ bằng 1 ÷ (1 − mức bận) lần thời gian xử lý. Với ba mức bận hiện tại, tính mức bận mới khi tải tăng 20% và thời gian chờ trước, sau. Mã khởi đầu ngoại suy tuyến tính: lấy thời gian chờ cũ nhân 1,2. Thay bằng công thức hàng đợi.",
      starter: L(
        "for ban in (50, 60, 80):",
        "    ban_moi = ban * 120 // 100",
        "    cu = 100 / (100 - ban)",
        "    moi = cu * 1.2",
        "    print(f\"Bận {ban}% -> {ban_moi}%: chờ {cu:.1f} -> {moi:.1f} lần\")",
        "",
      ),
      solution: L(
        "for ban in (50, 60, 80):",
        "    ban_moi = ban * 120 // 100",
        "    cu = 100 / (100 - ban)",
        "    moi = 100 / (100 - ban_moi)",
        "    print(f\"Bận {ban}% -> {ban_moi}%: chờ {cu:.1f} -> {moi:.1f} lần\")",
        "",
      ),
      expectedOutput: L(
        "Bận 50% -> 60%: chờ 2.0 -> 2.5 lần",
        "Bận 60% -> 72%: chờ 2.5 -> 3.6 lần",
        "Bận 80% -> 96%: chờ 5.0 -> 25.0 lần",
      ),
      hints: [
        "Thời gian chờ mới tính từ mức bận mới ban_moi, không phải từ thời gian chờ cũ.",
        "Hệ thống càng gần quá tải, cùng một mức tăng tải càng làm thời gian chờ tăng vọt: đó là tính phi tuyến.",
      ],
    },
    {
      type: "chart",
      title: "Cùng một mức tăng tải, hệ thống càng bận thì thời gian chờ càng nổ",
      caption:
        "Tính theo công thức hàng đợi đơn giản trong bài: chờ = 1 ÷ (1 − mức bận), tính bằng số lần thời gian xử lý. Số liệu minh hoạ, không phải đo từ một hệ thống cụ thể. Kéo mức bận hiện tại để thấy đường thật tách xa đường ngoại suy tuyến tính.",
      kind: "line",
      xLabel: "Tải tăng thêm (%)",
      yLabel: "Thời gian chờ (lần thời gian xử lý)",
      x: { from: 0, to: 20, step: 2 },
      params: [{ id: "ban", label: "Mức bận hiện tại", min: 40, max: 80, step: 5, value: 80, unit: "%" }],
      series: [
        { label: "Công thức hàng đợi", expr: "1/(1-ban*(1+x/100)/100)" },
        { label: "Ngoại suy tuyến tính", expr: "(1/(1-ban/100))*(1+x/100)" },
      ],
    },
  ],

  "phan-bo-chi-phi-nen-tang-dung-chung": [
    {
      type: "scenario",
      title: "Bộ phận lỗ sau phân bổ có nên đóng không",
      start: "de_xuat",
      nodes: {
        de_xuat: {
          text:
            "Báo cáo cuối năm cho thấy bộ phận Công cụ nội bộ lỗ sau khi phân bổ chi phí chung. Giám đốc tài chính đề xuất đóng nó. Bạn là người phụ trách phân tích.",
          choices: [
            { label: "Ủng hộ đóng vì bộ phận đang lỗ sau phân bổ", next: "dong_ngay" },
            { label: "Hỏi: đóng bộ phận thì khoản chi nào thật sự biến mất", next: "hoi" },
            { label: "Đổi tiêu thức phân bổ để bộ phận nhìn có lãi", next: "doi_tieu_thuc" },
          ],
        },
        dong_ngay: {
          text:
            "Bộ phận đóng, nhưng tiền thuê trụ sở, hạ tầng lõi và lương ban điều hành hầu như không giảm. Chúng được phân bổ lại cho các bộ phận còn lại, và lợi nhuận tổng giảm đi đúng phần đóng góp của bộ phận vừa đóng.",
          ending: "bad",
        },
        doi_tieu_thuc: {
          text:
            "Đổi tiêu thức chỉ chuyển chi phí sang bộ phận khác. Bộ phận kia giờ lỗ, tranh cãi bùng lên, và con số tổng không đổi gì. Lựa chọn trông như phân tích nhưng chỉ chuyển gánh nặng.",
          ending: "bad",
        },
        hoi: {
          text:
            "Bạn tách báo cáo ba tầng. Sau chi phí trực tiếp, bộ phận còn dương. Chi phí hạ tầng lõi và thuê trụ sở không biến mất nếu đóng. Bạn so sánh hai phương án thế nào?",
          choices: [
            { label: "Dùng phần đóng góp sau chi phí trực tiếp để so sánh giữ với đóng", next: "dong_gop" },
            { label: "Chia lại chi phí chung cho các bộ phận còn lại rồi xem còn lãi không", next: "chia_lai" },
          ],
        },
        dong_gop: {
          text:
            "Bạn nêu rõ: đóng bộ phận chỉ làm mất chi phí trực tiếp, đổi lại mất cả phần đóng góp dương. Với đánh giá người quản lý thì dùng con số sau chi phí kiểm soát được. Công ty giữ bộ phận lại và quyết định dựa trên con số đúng câu hỏi.",
          ending: "good",
        },
        chia_lai: {
          text:
            "Các bộ phận còn lại gánh thêm phần chi phí chung, lợi nhuận tổng vẫn thấp hơn so với giữ, và tranh cãi về tiêu thức phân bổ chiếm hết buổi họp mà không ai trả lời câu hỏi khoản chi nào thật sự mất.",
          ending: "bad",
        },
      },
    },
    {
      type: "chart",
      title: "Cùng một bộ phận, ba tầng lợi nhuận kể ba câu chuyện",
      caption:
        "Số liệu minh hoạ, đơn vị triệu đồng. Tầng một ít gây tranh cãi nhất, tầng hai dùng để đánh giá người quản lý, tầng ba (sau phân bổ chi phí chung) dùng cho quyết định về sản phẩm hoặc bộ phận chứ không dùng đánh giá con người.",
      kind: "bar",
      yLabel: "Lợi nhuận (triệu đồng)",
      data: [
        { label: "Công cụ nội bộ", values: [30, 20, -10] },
        { label: "Nền tảng thanh toán", values: [80, 60, 35] },
      ],
      seriesLabels: ["Sau chi phí trực tiếp", "Sau chi phí kiểm soát được", "Sau phân bổ chi phí chung"],
    },
  ],
};
