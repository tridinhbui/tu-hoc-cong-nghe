import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 34. Một người viết cho một tệp.
export const P34_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "ghi-ngay-hay-ghi-theo-lo-va-do-tre-du-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Tính chi phí ghi ngay và ghi theo lô",
      task:
        "Mỗi lượt ghi tốn 40 ms cố định (mở kết nối, xác nhận) cộng 1 ms cho mỗi bản ghi. Số liệu chỉ để minh hoạ. Có 130 bản ghi cần ghi. Hàm dưới đây tính số lượt và tổng thời gian cho từng cỡ lô, nhưng 130 bản ghi chia lô 50 thì vẫn cần lượt thứ ba cho 30 bản ghi còn dư. Sửa cách đếm lượt để chương trình in đúng.",
      starter: `n = 130
co_dinh = 40
moi_ban = 1

for lo in [1, 10, 50]:
    luot = n // lo
    tong = luot * co_dinh + n * moi_ban
    print(f"lô {lo}: {luot} lượt, {tong} ms")
`,
      solution: `n = 130
co_dinh = 40
moi_ban = 1

for lo in [1, 10, 50]:
    luot = -(-n // lo)
    tong = luot * co_dinh + n * moi_ban
    print(f"lô {lo}: {luot} lượt, {tong} ms")
`,
      expectedOutput: "lô 1: 130 lượt, 5330 ms\nlô 10: 13 lượt, 650 ms\nlô 50: 3 lượt, 250 ms",
      hints: [
        "Phép // làm tròn xuống, nên lô cuối chưa đủ đầy bị bỏ sót.",
        "Làm tròn lên: -(-n // lo), hoặc dùng math.ceil(n / lo).",
        "Chi phí cố định nhân với số lượt, chứ không nhân với số bản ghi. Đó là chỗ ghi theo lô tiết kiệm được.",
      ],
    },
    {
      type: "chart",
      title: "Chi phí mỗi bản ghi giảm nhanh khi lô lớn dần",
      caption:
        "Số liệu minh hoạ, không phải đo từ một hệ thống cụ thể. Chi phí mỗi bản ghi = chi phí cố định của một lượt chia cho cỡ lô, cộng chi phí riêng của mỗi bản ghi. Đường ngang là ghi ngay (lô 1). Kéo chi phí cố định để thấy lợi ích của lô phụ thuộc vào phần cố định lớn tới đâu, và nhớ rằng lô lớn cũng nghĩa là dữ liệu trễ hơn.",
      kind: "line",
      xLabel: "Cỡ lô (số bản ghi mỗi lượt ghi)",
      yLabel: "Chi phí mỗi bản ghi (ms)",
      x: { from: 1, to: 50, step: 1 },
      params: [
        { id: "f", label: "Chi phí cố định mỗi lượt ghi", min: 5, max: 100, step: 5, value: 40, unit: "ms" },
        { id: "v", label: "Chi phí riêng mỗi bản ghi", min: 1, max: 10, step: 1, value: 1, unit: "ms" },
      ],
      series: [
        { label: "Ghi theo lô", expr: "f/x + v" },
        { label: "Ghi ngay (lô 1)", expr: "f + v" },
      ],
    },
  ],

  "tu-luan-diem-ky-thuat-toi-quyet-dinh-trien-khai": [
    {
      type: "scenario",
      title: "Viết lại đề xuất để người duyệt dám nói đồng ý",
      start: "dau",
      nodes: {
        dau: {
          text:
            "Bạn muốn thay hàng đợi tự dựng của nhóm bằng một dịch vụ quản lý sẵn. Bản đề xuất đầu tiên chỉ có một dòng kết luận: 'sẽ ổn định hơn'. Trưởng nhóm đọc xong và để đó. Bạn sửa bản đề xuất theo hướng nào?",
          choices: [
            { label: "Thêm một con số mà nếu đo được thì cả đội dừng", next: "so_sanh" },
            { label: "Thêm trang liệt kê mọi rủi ro có thể xảy ra", next: "ket_rui_ro" },
            { label: "Nhấn mạnh dịch vụ mới là hướng đi hiện đại", next: "ket_hien_dai" },
          ],
        },
        so_sanh: {
          text:
            "Bạn ghi: nếu độ trễ p95 sau hai tuần chạy thử vượt mức đã thoả thuận thì dừng. Người duyệt hỏi: 'Hệ thống hiện tại chạy được rồi, sao phải đổi?' Bạn trả lời thế nào?",
          choices: [
            { label: "Nêu giờ trực và số sự cố mỗi tháng của hiện trạng", next: "buoc_nho" },
            { label: "Nói rằng giữ nguyên là chấp nhận tụt lại phía sau", next: "ket_tut_lai" },
            { label: "Đề nghị chuyển toàn bộ một đợt cho gọn việc", next: "ket_mot_dot" },
          ],
        },
        buoc_nho: {
          text:
            "Người duyệt đồng ý rằng hiện trạng đang tốn công, nhưng họ lo: nếu dịch vụ mới không hợp thì không có đường quay lại. Bạn đề xuất gì để hạ rào cản đó?",
          choices: [
            { label: "Chuyển một hàng đợi nhỏ trước, giữ đường quay lại", next: "ket_tot" },
            { label: "Cam kết rằng sẽ không có sự cố nào khi chuyển", next: "ket_cam_ket" },
            { label: "Xin duyệt kế hoạch ba quý ngay trong cuộc họp này", next: "ket_ke_hoach_dai" },
          ],
        },
        ket_rui_ro: {
          ending: "bad",
          text:
            "Danh sách rủi ro ai cũng đã biết, nên người duyệt không có gì để kiểm. Họ ghi 'xem lại quý sau'. Trong lúc đó hiện trạng tiếp tục được so với một phương án có chi phí bằng không, và đề xuất của bạn mất ba tháng mà không tiến thêm bước nào.",
        },
        ket_hien_dai: {
          ending: "bad",
          text:
            "'Hiện đại' không phải thứ người duyệt có thể đo. Họ hỏi lại bằng con số và bạn không có. Đề xuất bị xếp xuống cuối danh sách ưu tiên vì không ai ký vào một lời hứa không kiểm chứng được.",
        },
        ket_tut_lai: {
          ending: "bad",
          text:
            "Câu trả lời nghe như một lời trách, không phải một con số. Người duyệt giữ nguyên hiện trạng vì giữ nguyên thì không phải giải thích với ai. Chi phí giữ nguyên vẫn vô hình và bạn không nêu được nó.",
        },
        ket_mot_dot: {
          ending: "bad",
          text:
            "Người duyệt không sợ bạn sai, họ sợ không có đường lui. Chuyển một đợt nghĩa là nếu hỏng thì hỏng toàn bộ. Họ từ chối, và lần sau bạn đề xuất lại sẽ khó hơn.",
        },
        ket_cam_ket: {
          ending: "bad",
          text:
            "Không ai tin lời hứa không có sự cố nào, và cam kết đó đặt cược uy tín của bạn vào điều bạn không kiểm soát được. Cuộc họp chuyển sang hỏi 'nếu có sự cố thì sao' và bạn chưa chuẩn bị đường dừng.",
        },
        ket_ke_hoach_dai: {
          ending: "bad",
          text:
            "Xin cam kết lớn trước khi có bằng chứng buộc người duyệt đặt cược cả ba quý. Họ chọn an toàn nhất: không duyệt. Một thử nghiệm rẻ ở bước đầu lẽ ra giải quyết bất đồng mà không ai phải thắng bằng lập luận.",
        },
        ket_tot: {
          ending: "good",
          text:
            "Bước nhỏ có thể dừng giữa chừng, kèm điều kiện bác bỏ đã thoả thuận từ trước. Người duyệt ký vì rủi ro đã bị chặn ở một cỡ họ chịu được. Hai tuần sau, con số quyết định chứ không phải lập luận của ai.",
        },
      },
    },
    {
      type: "flow",
      title: "Một đề xuất kỹ thuật đi từ ý tưởng tới chữ ký",
      steps: [
        {
          label: "Nêu rõ phương án và chi phí của nó",
          detail: "Số giờ, tiền, và người phải làm. Người duyệt phải ký vào đây, nên nó phải có con số chứ không phải tính từ.",
        },
        {
          label: "Nêu chi phí của việc giữ nguyên",
          detail: "Giờ trực mỗi tháng, số sự cố, công vá lỗi. Nó vô hình vì đã đang được trả, nên phải viết ra thì mới có mặt trong phép so sánh.",
        },
        {
          label: "Thoả thuận điều kiện bác bỏ",
          detail: "Một con số cụ thể, ví dụ độ trễ p95 trên mức nào thì dừng. Thoả thuận trước thì về sau không ai diễn giải lại được.",
        },
        {
          label: "Chia thành bước có thể dừng",
          detail: "Mỗi bước kết thúc ở trạng thái an toàn: có thể giữ nguyên hoặc quay lại. Người duyệt đồng ý dễ hơn khi có đường lui.",
        },
        {
          label: "Đề xuất thử nghiệm rẻ trước cam kết lớn",
          detail: "Khi hai bên bất đồng về một dự đoán, chạy thử nhỏ để dữ liệu quyết định, thay vì tranh luận xem ai đúng.",
        },
      ],
    },
  ],

  "chien-luoc-do-luong-xu-huong-va-hoi-quy-trung-binh": [
    {
      type: "exercise",
      language: "python",
      title: "Quy tắc cảnh báo khớp hoàn hảo, rồi sụp ngoài mẫu",
      task:
        "Mười tuần dữ liệu theo thứ tự thời gian: mỗi dòng là (mức CPU trung bình, tuần sau có sự cố hay không). Chương trình tìm ngưỡng CPU cảnh báo tốt nhất. Hiện nó tìm và kiểm trên cùng một tập nên ra kết quả đẹp vô nghĩa. Chia theo thời gian: sáu tuần đầu để tìm ngưỡng, bốn tuần sau để kiểm, và xem quy tắc còn đúng bao nhiêu.",
      starter: `du_lieu = [
    (40, 0), (45, 0), (52, 0), (58, 1), (63, 1), (48, 0),
    (50, 1), (44, 1), (60, 0), (41, 0),
]

def khop(tap, nguong):
    return sum((cpu >= nguong) == bool(co) for cpu, co in tap)

def tim_nguong(tap):
    tot, tot_khop = None, -1
    for n in range(40, 66):
        k = khop(tap, n)
        if k > tot_khop:
            tot, tot_khop = n, k
    return tot

tap_tim = du_lieu
tap_kiem = du_lieu

ng = tim_nguong(tap_tim)
print(f"Ngưỡng tìm được: {ng}")
print(f"Khớp trên dữ liệu tìm: {khop(tap_tim, ng)}/{len(tap_tim)}")
print(f"Khớp ngoài mẫu: {khop(tap_kiem, ng)}/{len(tap_kiem)}")
`,
      solution: `du_lieu = [
    (40, 0), (45, 0), (52, 0), (58, 1), (63, 1), (48, 0),
    (50, 1), (44, 1), (60, 0), (41, 0),
]

def khop(tap, nguong):
    return sum((cpu >= nguong) == bool(co) for cpu, co in tap)

def tim_nguong(tap):
    tot, tot_khop = None, -1
    for n in range(40, 66):
        k = khop(tap, n)
        if k > tot_khop:
            tot, tot_khop = n, k
    return tot

tap_tim = du_lieu[:6]
tap_kiem = du_lieu[6:]

ng = tim_nguong(tap_tim)
print(f"Ngưỡng tìm được: {ng}")
print(f"Khớp trên dữ liệu tìm: {khop(tap_tim, ng)}/{len(tap_tim)}")
print(f"Khớp ngoài mẫu: {khop(tap_kiem, ng)}/{len(tap_kiem)}")
`,
      expectedOutput: "Ngưỡng tìm được: 53\nKhớp trên dữ liệu tìm: 6/6\nKhớp ngoài mẫu: 1/4",
      hints: [
        "Dữ liệu đã xếp theo thời gian, nên chia bằng cắt lát: du_lieu[:6] cho phần tìm và du_lieu[6:] cho phần kiểm.",
        "Phần kiểm phải nằm SAU toàn bộ phần dùng để tìm quy tắc. Đừng xáo trộn ngẫu nhiên.",
        "Khi chạy xong, nhìn hai dòng khớp: 6/6 trên dữ liệu tìm không nói gì về tuần sau.",
      ],
    },
    {
      type: "flow",
      title: "Từ một quy tắc tìm được tới một quy tắc đã kiểm chứng",
      steps: [
        {
          label: "Tách phần kiểm trước khi nhìn dữ liệu",
          detail: "Cắt các tuần gần nhất ra, ví dụ bốn tuần cuối. Từ đây không ai được mở chúng khi đang tìm ngưỡng.",
        },
        {
          label: "Tìm quy tắc trên phần còn lại",
          detail: "Thử các ngưỡng 40, 41, 42... trên sáu tuần đầu. Thử càng nhiều ngưỡng thì càng chắc chắn có một ngưỡng khớp hoàn hảo, kể cả khi dữ liệu là ngẫu nhiên.",
        },
        {
          label: "Nghi ngờ khi khớp quá đẹp",
          detail: "6/6 trên dữ liệu đã dùng để tìm ra quy tắc không chứa thông tin nào. Nó chỉ cho biết bạn đã thử đủ nhiều.",
        },
        {
          label: "Chạy phần kiểm đúng một lần",
          detail: "Bốn tuần chưa từng thấy cho kết quả thật, ví dụ 1/4. Ghi lại con số này, dù nó xấu.",
        },
        {
          label: "Không quay lại chỉnh rồi chạy lại",
          detail: "Chỉnh ngưỡng rồi chạy lại trên đúng bốn tuần đó thì chúng thành dữ liệu đã thấy. Muốn thử tiếp thì cần phần kiểm mới, tức là chờ thêm dữ liệu.",
        },
      ],
    },
  ],

  "quyen-so-huu-ma-va-ranh-gioi-trach-nhiem": [
    {
      type: "scenario",
      title: "Thư viện gửi email mà hai đội cùng sửa",
      start: "dau",
      nodes: {
        dau: {
          text:
            "Thư viện gửi email xác nhận lỗi lần thứ ba trong quý. Xem lịch sử mã thì cả đội Thanh toán lẫn đội Thông báo đều sửa nó, và không đội nào coi nó là của mình. Bạn là trưởng nhóm kỹ thuật. Bạn quyết định thế nào?",
          choices: [
            { label: "Giao cho đội Thông báo kèm thời gian dọn dẹp và quyền từ chối", next: "tuan_sau" },
            { label: "Giao cho đội Thông báo và dặn họ lo từ nay", next: "ket_khong_gio" },
            { label: "Giữ nguyên hai đội cùng sửa, thêm tài liệu hướng dẫn", next: "ket_tai_lieu" },
          ],
        },
        tuan_sau: {
          text:
            "Đội Thông báo nhận. Tuần sau đội Thanh toán đẩy vào một thay đổi làm thư viện khó bảo trì hơn, vì họ cần gửi thêm một loại email gấp. Đội Thông báo phản ứng ra sao?",
          choices: [
            { label: "Từ chối bản này và cùng viết lại cách khác với họ", next: "ket_tot" },
            { label: "Nhận cho xong để khỏi mất lòng đội Thanh toán", next: "ket_nhan_het" },
            { label: "Từ chối mọi thay đổi đến từ bên ngoài đội", next: "ket_cua_ai" },
          ],
        },
        ket_khong_gio: {
          ending: "bad",
          text:
            "Đội Thông báo nhận toàn bộ chi phí của những quyết định họ chưa từng tham gia, mà không có thời gian dọn. Hai tháng sau họ báo không thể nhận thêm việc gì liên quan tới thư viện, và nó lại trở về trạng thái không ai nhận.",
        },
        ket_tai_lieu: {
          ending: "bad",
          text:
            "Tài liệu không đổi được việc hai đội vẫn cùng sửa mã mà không ai chịu trách nhiệm. Những thay đổi nhỏ không nhất quán tiếp tục chồng lên nhau, và lần lỗi thứ tư vẫn gọi cả hai đội dậy lúc ba giờ sáng.",
        },
        ket_nhan_het: {
          ending: "bad",
          text:
            "Trách nhiệm mà không có quyền từ chối: đội Thông báo gánh hậu quả của mọi thay đổi người khác đẩy vào. Mỗi lần nhận thêm một chút, mã khó giữ hơn một chút, và sớm muộn họ cũng ngừng nhận.",
        },
        ket_cua_ai: {
          ending: "bad",
          text:
            "Quyền từ chối không có trách nhiệm đi cùng biến đội thành một cửa ải. Đội Thanh toán sao chép thư viện sang kho mã của họ để khỏi qua cửa, và giờ có hai bản gửi email khác nhau cần bảo trì.",
        },
        ket_tot: {
          ending: "good",
          text:
            "Quyền từ chối đi kèm trách nhiệm và thời gian dọn dẹp. Đội Thông báo giải thích vì sao bản đầu làm mã khó bảo trì, đội Thanh toán có cách làm vẫn đáp ứng việc gấp, và không ai phải đi đường vòng.",
        },
      },
    },
    {
      type: "feynman",
      title: "Quyền sở hữu mã giống hành lang chung của một dãy nhà trọ",
      intro:
        "Hành lang chung của dãy nhà trọ là chỗ ai cũng đi qua và ai cũng để đồ lên đó một ít. Sau vài năm nó bừa bộn, không ai đủ hiểu vì sao có cái xe đạp hỏng ở góc, và không ai dám dọn. Phần mã ở ranh giới giữa hai đội cũng thế.",
      columns: ["Ở dãy nhà trọ", "Trong mã nguồn", "Điều xảy ra"],
      rows: [
        ["Hành lang mà mọi phòng đều dùng", "Thư viện dùng chung của hai đội", "Cả hai đều cần, nên không đội nào thấy nó là của mình"],
        ["Mỗi người để thêm một thứ lên hành lang", "Mỗi đội sửa thêm một chút", "Thay đổi nhỏ chồng lên nhau và không nhất quán"],
        ["Giao hành lang cho một phòng mà không kèm giờ dọn", "Giao mã cho một đội mà không kèm thời gian dọn", "Đội nhận trả hết chi phí của những quyết định cũ"],
        ["Chủ phòng cấm mọi người đặt đồ, bất kể lý do", "Đội sở hữu từ chối mọi thay đổi bên ngoài", "Các đội khác tìm đường vòng, hoặc sao chép riêng"],
      ],
      oneLiner: "Sở hữu mã là có cả hai vế: quyền nói không và trách nhiệm dọn, thiếu một vế thì vế còn lại tự hỏng.",
    },
  ],

  "khi-chi-tieu-cua-doi-xung-dot-voi-loi-ich-nguoi-dung": [
    {
      type: "exercise",
      language: "python",
      title: "Chỉ tiêu chính tăng, chỉ số đối trọng có tăng theo không",
      task:
        "Đội hỗ trợ được thưởng theo số phiếu đóng trong tháng. Chỉ số đối trọng là tỉ lệ phiếu bị khách mở lại. Dữ liệu dưới đây chỉ để minh hoạ. Hiện chương trình chỉ nhìn số phiếu đóng nên đánh dấu nhầm người. Hãy đánh dấu người nào đóng từ 40 phiếu trở lên mà tỉ lệ mở lại trên 25%, và in tỉ lệ đó làm tròn theo phần trăm.",
      starter: `nhan_vien = [
    ("An", 42, 3),
    ("Bình", 55, 21),
    ("Chi", 38, 2),
    ("Dũng", 47, 15),
    ("Em", 60, 6),
]

nghi_van = []
for ten, dong, mo_lai in nhan_vien:
    ti_le = round(mo_lai / dong * 100)
    if dong >= 50:
        nghi_van.append((ten, dong, ti_le))

print("Cần xem lại: " + ", ".join(t for t, _, _ in nghi_van))
for ten, dong, ti_le in nghi_van:
    print(f"{ten}: đóng {dong}, mở lại {ti_le}%")
`,
      solution: `nhan_vien = [
    ("An", 42, 3),
    ("Bình", 55, 21),
    ("Chi", 38, 2),
    ("Dũng", 47, 15),
    ("Em", 60, 6),
]

nghi_van = []
for ten, dong, mo_lai in nhan_vien:
    ti_le = round(mo_lai / dong * 100)
    if dong >= 40 and mo_lai / dong > 0.25:
        nghi_van.append((ten, dong, ti_le))

print("Cần xem lại: " + ", ".join(t for t, _, _ in nghi_van))
for ten, dong, ti_le in nghi_van:
    print(f"{ten}: đóng {dong}, mở lại {ti_le}%")
`,
      expectedOutput: "Cần xem lại: Bình, Dũng\nBình: đóng 55, mở lại 38%\nDũng: đóng 47, mở lại 32%",
      hints: [
        "Điều kiện cần hai vế: đóng từ 40 phiếu và tỉ lệ mở lại trên 0.25. Chỉ nhìn một con số là chính cái bẫy của bài.",
        "Em đóng nhiều nhất nhưng mở lại ít. Người đóng nhiều không đồng nghĩa với người đáng xem lại.",
      ],
    },
    {
      type: "feynman",
      title: "Thưởng theo số tô bán ra: vì sao chỉ tiêu đẩy người ta làm điều không ai muốn",
      intro:
        "Quán phở thưởng nhân viên theo số tô bán ra mỗi ngày. Không ai muốn làm hại khách, nhưng cách dễ nhất để bán nhiều tô hơn là cho ít thịt, chan nước thật nhanh và giục khách ăn xong. Đội kỹ thuật bị đo bằng một con số cũng đi tới những quyết định kiểu vậy.",
      columns: ["Ở quán phở", "Trong đội kỹ thuật", "Cách chặn"],
      rows: [
        ["Thưởng theo số tô bán ra", "Thưởng theo số phiếu đóng", "Mục tiêu chỉ là một con số, nên mọi cách làm nó tăng đều có vẻ hợp lý"],
        ["Cho ít thịt để phục vụ nhanh", "Đóng phiếu sớm dù chưa giải quyết xong", "Ghép với một con số mà thủ thuật đó làm xấu đi"],
        ["Số khách quay lại trong tuần", "Tỉ lệ phiếu bị mở lại", "Cặp chỉ số: làm chính tăng bằng thủ thuật thì chỉ số đối trọng tụt ngay"],
        ["Chủ quán đo tô bán, quản lý đo khách quay lại", "Hai người chịu hai con số", "Mỗi người tối ưu phần của mình, cặp chỉ số quay về hai chỉ tiêu riêng; cần cùng một người chịu cả hai"],
      ],
      oneLiner: "Chỉ tiêu đặt sai không tạo ra người xấu, nó tạo ra những quyết định hợp lý với người bị đo; muốn chặn thì ghép chỉ tiêu với một con số đối trọng do cùng một người chịu trách nhiệm.",
    },
  ],

  "sau-buoc-khi-duoc-nho-tu-van-ky-thuat": [
    {
      type: "scenario",
      title: "Đồng nghiệp hỏi nên chọn công cụ nào",
      start: "dau",
      nodes: {
        dau: {
          text:
            "Một đồng nghiệp ở đội khác nhắn: 'Em đang phân vân giữa tự dựng hàng đợi hay dùng dịch vụ nhắn tin quản lý sẵn, anh chị thấy cái nào hơn?' Bạn đã gặp nhiều tình huống như thế. Bạn trả lời gì đầu tiên?",
          choices: [
            { label: "Hỏi em đang cố đạt được điều gì với nó", next: "rang_buoc" },
            { label: "Nói thẳng cái nào nhanh hơn rồi trả lời xong", next: "ket_sai_cau_hoi" },
            { label: "Gửi bảng so sánh dài rồi để em tự chọn", next: "ket_tra_lai" },
          ],
        },
        rang_buoc: {
          text:
            "Em kể: cần báo đơn hàng mới tới kho, và 'không được mất thông báo nào'. Bạn kiểm lại các ràng buộc, rồi đã tới lúc đưa ý kiến. Bạn làm gì?",
          choices: [
            { label: "Nêu hai phương án kèm đánh đổi, khuyến nghị một và nói độ chắc", next: "chot" },
            { label: "Chọn một phương án và chỉ nói lý do ủng hộ nó", next: "ket_thieu_danh_doi" },
            { label: "Nói mình chưa chắc nên không muốn khuyến nghị", next: "ket_im_lang" },
          ],
        },
        chot: {
          text:
            "Em chọn theo khuyến nghị và cảm ơn. Cuộc trò chuyện sắp kết thúc. Bạn làm gì trước khi đóng tin nhắn?",
          choices: [
            { label: "Ghi lý do, ràng buộc lúc đó và hẹn xem lại sau một tháng", next: "ket_tot" },
            { label: "Chúc em thuận lợi và coi như việc đã xong", next: "ket_khong_biet" },
            { label: "Ghi quyết định vào wiki nhưng không đặt mốc xem lại", next: "ket_ho_so" },
          ],
        },
        ket_sai_cau_hoi: {
          ending: "bad",
          text:
            "Bạn trả lời rất tốt một câu hỏi sai. Ba tuần sau em dựng xong và phát hiện mỗi ngày chỉ có vài trăm thông báo cần gửi, ràng buộc thật là phải không mất tin chứ không phải tốc độ. Lời khuyên của bạn tối ưu cho thứ không ai cần.",
        },
        ket_tra_lai: {
          ending: "bad",
          text:
            "Ba phương án để đó nghe như tôn trọng, nhưng thực chất bạn trả lại nguyên câu hỏi kèm thêm việc phải đọc. Em tới hỏi vì bạn đã từng gặp tình huống này, mà phần giá trị nhất là bạn chọn cái nào lại bị bỏ trống.",
        },
        ket_thieu_danh_doi: {
          ending: "bad",
          text:
            "Em làm theo, và khi gặp một ràng buộc mới không biết mình nên đổi ý lúc nào, vì bạn chưa từng nói phương án này yếu ở đâu. Một khuyến nghị thiếu đánh đổi buộc người nghe tin hoàn toàn hoặc không tin gì.",
        },
        ket_im_lang: {
          ending: "bad",
          text:
            "Sự chưa chắc là thông tin có ích, nhưng im lặng thì không. Em không có gì để dựa vào và chọn theo phương án đầu tiên tìm thấy trên mạng. Lẽ ra bạn có thể nói 'khoảng bảy phần mười là phương án quản lý sẵn hợp hơn' và vẫn trung thực.",
        },
        ket_khong_biet: {
          ending: "bad",
          text:
            "Bạn bỏ bước cuối. Sáu tháng sau không ai biết lời khuyên đó dùng được hay không, nên tỉ lệ đúng của bạn không cải thiện dù bạn tư vấn thêm bao nhiêu lần.",
        },
        ket_ho_so: {
          ending: "bad",
          text:
            "Quyết định nằm trong wiki nhưng không có mốc nào buộc ai quay lại nhìn nó. Khi ràng buộc đổi, trang đó vẫn nói điều cũ và không ai nhận ra. Một bản ghi không hẹn xem lại chỉ là hồ sơ.",
        },
        ket_tot: {
          ending: "good",
          text:
            "Hỏi mục tiêu trước, khuyến nghị kèm độ chắc, rồi hẹn xem lại. Một tháng sau hai bên nhìn lại và thấy một ràng buộc đã đổi. Bạn biết lời khuyên đúng tới đâu, và lần tư vấn tiếp theo tốt hơn lần này.",
        },
      },
    },
    {
      type: "flow",
      title: "Sáu bước, qua một lần tư vấn có thật",
      steps: [
        {
          label: "Hỏi họ đang cố đạt được điều gì",
          detail: "Câu hỏi mang tới đã là một kết luận ('A hay B'). Hỏi mục tiêu để biết A và B có phải hai lựa chọn duy nhất không. Bỏ bước này thì bạn trả lời tốt một câu hỏi sai.",
        },
        {
          label: "Hỏi vì sao chỉ có bấy nhiêu lựa chọn",
          detail: "Ai đã loại phương án C và dựa vào đâu? Đôi khi lý do là một lần thử cách đây hai năm với phiên bản cũ.",
        },
        {
          label: "Kiểm lại ràng buộc",
          detail: "Tách cái thật sự cố định (luật, hợp đồng) khỏi cái chưa ai hỏi (ngân sách, thời hạn). Ràng buộc chưa ai hỏi thường là chỗ mở ra phương án mới.",
        },
        {
          label: "Nêu hai tới ba phương án và khuyến nghị một",
          detail: "Mỗi phương án kèm đánh đổi. Sau đó nói bạn chọn cái nào, vì sao, và chắc tới mức nào.",
        },
        {
          label: "Ghi quyết định cùng lý do và ràng buộc lúc đó",
          detail: "Để sau này biết quyết định hợp lý với bối cảnh nào, và khi bối cảnh đổi thì biết cần xem lại.",
        },
        {
          label: "Hẹn mốc xem lại",
          detail: "Bước hay bị bỏ nhất cùng với bước một. Không có nó bạn không bao giờ biết lời khuyên đúng hay sai, nên không giỏi lên theo thời gian.",
        },
      ],
    },
  ],

  "bat-thuong-trong-du-lieu-hanh-vi": [
    {
      type: "exercise",
      language: "python",
      title: "Chỉ số giảm ở mọi nhóm mà tổng vẫn tăng",
      task:
        "Tỉ lệ chuyển đổi của hai nhóm thiết bị qua hai tháng (số liệu minh hoạ). Chương trình phải in tỉ lệ từng nhóm và tỉ lệ chung của mỗi tháng, rồi nêu nhóm nào giảm. Hiện phần tính theo nhóm đang chia cho tổng lượt truy cập của cả tháng nên sai. Sửa để mỗi nhóm chia cho lượt truy cập của chính nhóm đó.",
      starter: `thang = {
    "Tháng trước": {"mobile": (800, 16), "desktop": (200, 20)},
    "Tháng này": {"mobile": (300, 5), "desktop": (700, 63)},
}

def ti_le(luot, chuyen):
    return chuyen / luot * 100

rate = {}
for ten, nhom in thang.items():
    tong_luot = sum(l for l, _ in nhom.values())
    tong_chuyen = sum(c for _, c in nhom.values())
    rate[ten] = {"chung": ti_le(tong_luot, tong_chuyen)}
    for loai, (luot, chuyen) in nhom.items():
        rate[ten][loai] = ti_le(tong_luot, chuyen)
    print(ten + ": " + ", ".join(f"{k} {v:.1f}%" for k, v in rate[ten].items()))

giam = [k for k in ("mobile", "desktop") if rate["Tháng này"][k] < rate["Tháng trước"][k]]
print("Nhóm giảm: " + ", ".join(giam))
doi = rate["Tháng này"]["chung"] - rate["Tháng trước"]["chung"]
print(f"Chung đổi: {doi:+.1f} điểm")
`,
      solution: `thang = {
    "Tháng trước": {"mobile": (800, 16), "desktop": (200, 20)},
    "Tháng này": {"mobile": (300, 5), "desktop": (700, 63)},
}

def ti_le(luot, chuyen):
    return chuyen / luot * 100

rate = {}
for ten, nhom in thang.items():
    tong_luot = sum(l for l, _ in nhom.values())
    tong_chuyen = sum(c for _, c in nhom.values())
    rate[ten] = {"chung": ti_le(tong_luot, tong_chuyen)}
    for loai, (luot, chuyen) in nhom.items():
        rate[ten][loai] = ti_le(luot, chuyen)
    print(ten + ": " + ", ".join(f"{k} {v:.1f}%" for k, v in rate[ten].items()))

giam = [k for k in ("mobile", "desktop") if rate["Tháng này"][k] < rate["Tháng trước"][k]]
print("Nhóm giảm: " + ", ".join(giam))
doi = rate["Tháng này"]["chung"] - rate["Tháng trước"]["chung"]
print(f"Chung đổi: {doi:+.1f} điểm")
`,
      expectedOutput:
        "Tháng trước: chung 3.6%, mobile 2.0%, desktop 10.0%\nTháng này: chung 6.8%, mobile 1.7%, desktop 9.0%\nNhóm giảm: mobile, desktop\nChung đổi: +3.2 điểm",
      hints: [
        "Trong vòng lặp nhóm, ti_le phải nhận lượt truy cập của nhóm (luot), không phải tong_luot.",
        "Khi chạy đúng, hai nhóm đều giảm mà tỉ lệ chung vẫn tăng. Không có lỗi tính nào, chỉ là tỷ trọng giữa hai nhóm đã đổi.",
      ],
    },
    {
      type: "flow",
      title: "Gặp một bất thường: hai phép kiểm rẻ nhất, theo thứ tự",
      steps: [
        {
          label: "Chỉ số bất ngờ đổi",
          detail: "Tỉ lệ chuyển đổi tăng gần ba điểm sau một tháng, không có đợt khuyến mãi nào. Chưa kết luận gì, chưa kể cho ai nghe một câu chuyện về hành vi.",
        },
        {
          label: "Kiểm cách đo trước",
          detail: "Hỏi: tháng qua có sự kiện nào bị sửa, thêm điều kiện hay đổi vị trí ghi nhận không? Việc này diễn ra thường và hiếm khi được thông báo cho người đọc chỉ số, nên đây là lời giải khả dĩ nhất.",
        },
        {
          label: "Chia nhỏ theo nhóm",
          detail: "Tách theo thiết bị, nguồn lưu lượng, quốc gia. Mọi nhóm đổi cùng chiều với tổng thì loại được lời giải thành phần thay đổi. Đổi ngược chiều hoặc không đổi thì bạn vừa tìm ra nguyên nhân.",
        },
        {
          label: "Nhận ra tỷ trọng đổi",
          detail: "Mobile và desktop đều giảm nhưng desktop chiếm phần lớn hơn nên tổng tăng. Phản xạ nghĩ 'chỉ số tính sai' là sai ở đây: nó hoàn toàn có thể xảy ra mà không có lỗi nào.",
        },
        {
          label: "Chỉ khi các phép kiểm không giải thích được mới nói hành vi đổi",
          detail: "Hành vi thật đổi là lời giải thú vị nhất và ít khả năng nhất. Hai phép kiểm đầu mất chưa tới một giờ mỗi cái, rẻ hơn nhiều so với một giả định sai chống đỡ cho quyết định của nhiều tháng sau.",
        },
      ],
    },
  ],

  "nhat-ky-quyet-dinh-va-pre-mortem": [
    {
      type: "exercise",
      language: "python",
      title: "Nhật ký dự đoán nói gì về độ chắc của bạn",
      task:
        "Mười dự đoán đã ghi từ trước: mỗi dòng là (độ chắc đã ghi, phần trăm; kết quả 1 là đúng, 0 là sai). Số liệu minh hoạ. Hãy gom thành hai nhóm, 'chắc' khi độ chắc từ 80 trở lên và 'ít chắc' còn lại, rồi so độ chắc trung bình đã ghi với tỉ lệ đúng thực tế của từng nhóm. Hiện tỉ lệ thực tế đang chia cho cả mười dự đoán thay vì chia cho riêng nhóm.",
      starter: `nhat_ky = [
    (90, 1), (90, 0), (80, 1), (90, 0), (80, 1),
    (60, 1), (60, 0), (70, 0), (90, 1), (70, 1),
]

def bao_cao(ten, nhom):
    ghi = sum(c for c, _ in nhom) / len(nhom)
    dung = sum(k for _, k in nhom)
    thuc = dung / len(nhat_ky) * 100
    print(f"{ten}: nói {ghi:.0f}%, thực tế {thuc:.0f}% ({dung}/{len(nhom)})")

bao_cao("Nói chắc (>=80)", [x for x in nhat_ky if x[0] >= 80])
bao_cao("Ít chắc (<80)", [x for x in nhat_ky if x[0] < 80])
`,
      solution: `nhat_ky = [
    (90, 1), (90, 0), (80, 1), (90, 0), (80, 1),
    (60, 1), (60, 0), (70, 0), (90, 1), (70, 1),
]

def bao_cao(ten, nhom):
    ghi = sum(c for c, _ in nhom) / len(nhom)
    dung = sum(k for _, k in nhom)
    thuc = dung / len(nhom) * 100
    print(f"{ten}: nói {ghi:.0f}%, thực tế {thuc:.0f}% ({dung}/{len(nhom)})")

bao_cao("Nói chắc (>=80)", [x for x in nhat_ky if x[0] >= 80])
bao_cao("Ít chắc (<80)", [x for x in nhat_ky if x[0] < 80])
`,
      expectedOutput: "Nói chắc (>=80): nói 87%, thực tế 67% (4/6)\nÍt chắc (<80): nói 65%, thực tế 50% (2/4)",
      hints: [
        "Tỉ lệ đúng của một nhóm là số dự đoán đúng của nhóm chia cho số dự đoán của nhóm, không phải của cả nhật ký.",
        "Khi chạy đúng, nhóm 'nói chắc' ghi 87% mà đúng 67%. Chỉ một bản ghi viết trước mới cho bạn thấy khoảng cách này, vì trí nhớ sẽ tự chỉnh.",
      ],
    },
    {
      type: "feynman",
      title: "Sổ dự đoán và pre-mortem qua chuyện xem bóng đá với bạn bè",
      intro:
        "Cả nhóm bạn đoán tỉ số trước trận. Sau trận, ai cũng nhớ là mình đã 'thấy trước' kết quả, kể cả người đoán sai hoàn toàn. Chỉ tờ giấy ghi trước giờ bóng lăn mới phân xử được. Quyết định kỹ thuật cũng cần tờ giấy đó.",
      columns: ["Xem bóng với bạn bè", "Quyết định kỹ thuật", "Điều nó bảo vệ"],
      rows: [
        ["Ghi tỉ số dự đoán lên giấy trước trận", "Ghi 'khoảng bảy phần mười xong trước tháng Sáu'", "Đối chiếu được với kết quả, sau vài chục lần có tỉ lệ đúng thật"],
        ["Kể lại vì sao chọn đội đó", "Ghi lý do và bối cảnh của quyết định", "Hiểu vì sao hợp lý lúc đó, nhưng không cho ra tỉ lệ đúng"],
        ["Sau trận ai cũng bảo 'tôi đã nói rồi'", "Nhớ lại là mình đã khá chắc, hoặc vốn đã nghi ngờ", "Trí nhớ dịch về phía kết quả; chỉ bản ghi viết trước chống được"],
        ["Mỗi người tự viết kịch bản đội thua trước khi nghe ai", "Mỗi người viết riêng 5 phút kịch bản thất bại, rồi mới cùng đọc", "Giữ sự đa dạng, vì kịch bản đầu tiên được nói ra sẽ kéo cả nhóm theo"],
      ],
      oneLiner: "Muốn biết mình đúng bao nhiêu phần thì phải viết con số trước khi biết kết quả, và muốn thấy rủi ro thật thì hỏi 'nó thất bại ra sao' chứ không hỏi 'nó có thể sai ở đâu'.",
    },
  ],

  "kien-truc-lua-chon-va-gia-tri-mac-dinh": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản nháp đánh giá thiết kế về giá trị mặc định",
      task:
        "Một trợ lý AI viết bản nháp đánh giá cho màn hình cài đặt mới. Có ba đoạn nói sai về giá trị mặc định và ma sát. Bấm vào các đoạn đáng ngờ rồi nộp.",
      segments: [
        {
          text:
            "Phần lớn người dùng không đổi giá trị mặc định vì đổi tốn công, nên người đặt mặc định đang quyết định thay cho đa số họ.",
        },
        {
          text:
            "Vì thế ô 'chia sẻ dữ liệu sử dụng' nên bật sẵn: ai không muốn thì tự tắt, nên đây là lựa chọn trung lập.",
          error:
            "Bật sẵn không trung lập. Đa số người dùng sẽ không đổi, nên ô bật sẵn nghĩa là quyết định chia sẻ thay cho đa số. Phải coi đây là một lựa chọn có phía và cân nhắc nó như vậy.",
        },
        {
          text:
            "Hộp thoại xoá vĩnh viễn một dự án nên có một bước xác nhận, vì đó là lúc hậu quả không hoàn tác được.",
        },
        {
          text:
            "Quy trình huỷ đăng ký nên có ba bước xác nhận để người dùng cân nhắc kỹ, đó là ma sát đặt đúng chỗ.",
          error:
            "Đó là ma sát sai chỗ. Cùng kỹ thuật với bước xác nhận khi xoá, nhưng đặt ở cửa ra thay vì trước hành động nguy hiểm, nên nó phục vụ bên bán chứ không bảo vệ người dùng.",
        },
        {
          text:
            "Để tránh áp đặt, nên bỏ hết giá trị mặc định và buộc người dùng tự chọn ở lần mở đầu tiên.",
          error:
            "Buộc chọn cũng không trung lập. Nó chặn người dùng ở câu hỏi họ chưa đủ thông tin để trả lời, đúng lúc họ muốn làm việc khác, và phần lớn sẽ chọn bừa hoặc bỏ đi. Trung lập không tồn tại, chỉ có chọn phía một cách có ý thức.",
        },
        {
          text:
            "Mỗi giá trị mặc định nên có người ghi tên là đã chọn và ghi lý do, để sau này còn xem lại được.",
        },
      ],
    },
    {
      type: "flow",
      title: "Một giá trị mặc định đi từ dòng mã tới hành vi của người dùng",
      steps: [
        {
          label: "Kỹ sư viết một dòng mã",
          detail: "notifications_enabled = true trong tệp cấu hình mặc định. Dòng này nhỏ tới mức không xuất hiện trong buổi họp thiết kế nào.",
        },
        {
          label: "Sản phẩm phát hành",
          detail: "Mọi người dùng mới nhận giá trị đó khi tạo tài khoản. Không ai trong họ được hỏi.",
        },
        {
          label: "Người dùng đang bận làm việc khác",
          detail: "Đổi giá trị mặc định cần mở cài đặt, tìm đúng mục, hiểu nó làm gì. Việc đó tốn công và họ đang muốn làm thứ họ tới để làm.",
        },
        {
          label: "Đa số giữ nguyên",
          detail: "Họ không đồng ý, họ chỉ không đổi. Hành vi của đa số người dùng giờ do một dòng mã quyết định.",
        },
        {
          label: "Hành vi cộng dồn thành số liệu",
          detail: "Tỉ lệ bật thông báo cao 'chứng minh' người dùng thích thông báo, trong khi nó phản ánh giá trị mặc định. Hãy hỏi mặc định là gì trước khi đọc số liệu.",
        },
      ],
    },
  ],

  "nhung-dich-vu-vao-san-pham-nguoi-khac": [
    {
      type: "exercise",
      language: "python",
      title: "Còn bao nhiêu lưu lượng trên phiên bản cũ của giao diện lập trình",
      task:
        "Có năm khách hàng đã tích hợp (số liệu minh hoạ). Trước khi đặt ngày tắt v1, cần biết bao nhiêu lưu lượng còn ở v1 và ai là khách lớn nhất còn ở đó. Chương trình đang đếm theo số khách, và lấy khách đầu tiên chứ không phải khách lớn nhất. Sửa để tính theo lưu lượng và chọn đúng khách lớn nhất còn ở v1.",
      starter: `khach = [
    ("Acme", "v1", 4000),
    ("Beta", "v2", 9000),
    ("Cora", "v1", 300),
    ("Dune", "v2", 2500),
    ("Evo", "v1", 150),
]

con_v1 = [k for k in khach if k[1] == "v1"]
ti_le = len(con_v1) / len(khach) * 100
lon_nhat = con_v1[0]

print(f"Còn trên v1: {len(con_v1)}/{len(khach)} khách, {ti_le:.0f}% lưu lượng")
print(f"Khách lớn nhất còn ở v1: {lon_nhat[0]} ({lon_nhat[2]} yêu cầu/ngày)")
`,
      solution: `khach = [
    ("Acme", "v1", 4000),
    ("Beta", "v2", 9000),
    ("Cora", "v1", 300),
    ("Dune", "v2", 2500),
    ("Evo", "v1", 150),
]

con_v1 = [k for k in khach if k[1] == "v1"]
tong = sum(k[2] for k in khach)
ti_le = sum(k[2] for k in con_v1) / tong * 100
lon_nhat = max(con_v1, key=lambda k: k[2])

print(f"Còn trên v1: {len(con_v1)}/{len(khach)} khách, {ti_le:.0f}% lưu lượng")
print(f"Khách lớn nhất còn ở v1: {lon_nhat[0]} ({lon_nhat[2]} yêu cầu/ngày)")
`,
      expectedOutput: "Còn trên v1: 3/5 khách, 28% lưu lượng\nKhách lớn nhất còn ở v1: Acme (4000 yêu cầu/ngày)",
      hints: [
        "Lưu lượng là tổng số yêu cầu mỗi ngày, không phải số khách. Cộng cột thứ ba, đừng đếm số dòng.",
        "max(con_v1, key=lambda k: k[2]) chọn khách có lưu lượng lớn nhất.",
        "Ba trên năm khách nghe nhiều, nhưng một khách như Acme đã quyết định ngày tắt: họ tích hợp từ lâu và không có động lực để cập nhật.",
      ],
    },
    {
      type: "chart",
      title: "Một thay đổi phá vỡ tương thích nhân lên theo số tích hợp",
      caption:
        "Số liệu minh hoạ, không đo từ sản phẩm cụ thể. Công sức phía khách = số khách tích hợp nhân với số giờ mỗi bên phải sửa; công sức hỗ trợ phía bạn tính theo giờ trên mỗi khách. Bạn không kiểm soát lịch cập nhật của họ, nên con số này không thương lượng được bằng cách làm nhanh hơn.",
      kind: "area",
      xLabel: "Số khách đã tích hợp",
      yLabel: "Tổng giờ công",
      x: { from: 0, to: 200, step: 10 },
      params: [
        { id: "h", label: "Giờ mỗi khách phải sửa để theo bản mới", min: 2, max: 40, step: 2, value: 8, unit: "giờ" },
        { id: "s", label: "Giờ hỗ trợ của bạn cho mỗi khách", min: 1, max: 10, step: 1, value: 2, unit: "giờ" },
      ],
      series: [
        { label: "Công sức phía khách", expr: "x*h" },
        { label: "Công sức hỗ trợ phía bạn", expr: "x*s" },
      ],
    },
  ],

  "kiem-soat-noi-bo-va-danh-gia-rui-ro-lam-dung": [
    {
      type: "scenario",
      title: "Sau một lần xoá nhầm bảng sản xuất",
      start: "dau",
      nodes: {
        dau: {
          text:
            "Tuần trước một kỹ sư xoá nhầm một bảng trên môi trường sản xuất lúc đang vội, may là khôi phục được. Giám đốc kỹ thuật muốn 'siết quyền'. Bạn được giao thiết kế phản ứng. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Yêu cầu hai người duyệt cho mọi lệnh trên môi trường sản xuất", next: "ket_di_vong" },
            { label: "Liệt kê thao tác mà một tài khoản đơn lẻ gây hại nhất", next: "chon_loai" },
            { label: "Chỉ xem lại các sự cố đã xảy ra trong hai năm qua", next: "ket_chi_lich_su" },
          ],
        },
        chon_loai: {
          text:
            "Danh sách có: xoá bảng, đổi cấu hình thanh toán, xuất toàn bộ danh sách khách hàng, và xoá dữ liệu tạm (chạy hàng nghìn lần mỗi ngày). Bạn chọn kiểu kiểm soát nào?",
          choices: [
            { label: "Chặn trước mọi thao tác xoá, kể cả xoá dữ liệu tạm", next: "ket_chan_tat_ca" },
            { label: "Chặn trước thao tác hiếm không đảo ngược, còn lại phát hiện sau", next: "con_lai" },
            { label: "Không chặn gì, chỉ ghi nhật ký để xem lại khi cần", next: "ket_chi_ghi" },
          ],
        },
        con_lai: {
          text:
            "Hệ thống đã chặn trước thao tác nguy hiểm và có cảnh báo cho phần còn lại. Nhưng sẽ vẫn có một sai sót lọt qua cả hai lớp. Bạn chuẩn bị gì cho lúc đó?",
          choices: [
            { label: "Bản sao lưu được thử khôi phục định kỳ, kèm quy trình ghi rõ ai làm gì", next: "ket_tot" },
            { label: "Tin rằng hai lớp trên đã đủ vì đã chặn được đa số", next: "ket_chu_quan" },
            { label: "Thêm lớp duyệt thứ ba cho mọi thao tác còn lại", next: "ket_lop_ba" },
          ],
        },
        ket_di_vong: {
          ending: "bad",
          text:
            "Hai người duyệt cho mọi lệnh làm việc gấp mất hàng giờ. Một tuần sau cả đội dùng chung một tài khoản quản trị để khỏi phải xin duyệt, và không ai theo dõi nó. Bạn có ảo giác rằng đã có kiểm soát, nên không ai đi tìm cách bảo vệ khác.",
        },
        ket_chi_lich_su: {
          ending: "bad",
          text:
            "Lịch sử chỉ cho thấy những gì đã xảy ra. Đổi cấu hình thanh toán chưa từng sai nên không có dòng nào trong báo cáo, và không ai chặn nó. Sáu tháng sau một tài khoản đơn lẻ sửa nhầm đúng chỗ ấy.",
        },
        ket_chan_tat_ca: {
          ending: "bad",
          text:
            "Chặn một thao tác chạy nghìn lần mỗi ngày để phòng một trường hợp mỗi năm là đánh đổi rất tệ. Tác vụ dọn dữ liệu tạm bị kẹt chờ duyệt, hàng đợi đầy, và đội tắt kiểm soát đi để hệ thống chạy lại.",
        },
        ket_chi_ghi: {
          ending: "bad",
          text:
            "Nhật ký cho thấy ai đã xoá bảng thanh toán, sau khi bảng đã mất. Phát hiện sau không cứu được thứ không thể dựng lại. Với những thao tác hiếm mà không đảo ngược, chặn trước vẫn rẻ nhất.",
        },
        ket_chu_quan: {
          ending: "bad",
          text:
            "Khâu khắc phục thường là phần bị bỏ quên nhất. Khi một sai sót lọt qua, bản sao lưu chưa từng được thử khôi phục, không ai biết quy trình, và một sự cố hai giờ kéo thành một ngày.",
        },
        ket_lop_ba: {
          ending: "bad",
          text:
            "Lớp duyệt thứ ba đẩy đội trở lại con đường vòng: người ta tìm cách né nó để làm việc gấp. Một kiểm soát bị né không chỉ vô dụng mà còn nuôi cảm giác an toàn giả.",
        },
        ket_tot: {
          ending: "good",
          text:
            "Mục tiêu là giới hạn hậu quả sai sót chứ không chống người xấu, nên không ai cần đi đường vòng. Khi sai sót tiếp theo xảy ra, đội khôi phục đúng theo quy trình đã thử và thiệt hại dừng ở mức đã biết trước.",
        },
      },
    },
    {
      type: "feynman",
      title: "Ba loại kiểm soát, nhìn từ một toà nhà chung cư",
      intro:
        "Toà chung cư không chỉ chống trộm. Nó còn phải lo cháy, rò nước và người đãng trí khoá mình ngoài cửa. Cách phối hợp ba loại kiểm soát ở đó giống hệt cách phối hợp trong hệ thống, kể cả cái giá của từng loại.",
      columns: ["Trong toà nhà", "Trong hệ thống", "Chi phí chính"],
      rows: [
        ["Khoá cửa và thẻ từ ở sảnh", "Ngăn trước: chặn hành động", "Tính theo tần suất: càng nhiều lượt đi qua cửa thì càng đắt"],
        ["Chuông báo khói và camera", "Phát hiện sau: tìm ra nó đã xảy ra", "Rẻ hơn nhiều nhưng cần người thật sự nhìn"],
        ["Bình chữa cháy và lối thoát hiểm", "Khắc phục: giới hạn thiệt hại sau khi biết", "Thường bị bỏ quên cho đến khi cần"],
        ["Cửa thoát hiểm bị chèn ghế cho tiện", "Kiểm soát bị đi vòng", "Còn tệ hơn không có, vì ai cũng tưởng đã có"],
      ],
      oneLiner: "Phối hợp ba loại kiểm soát theo tần suất và hậu quả, và đặt mục tiêu là giới hạn thiệt hại của sai sót để không ai phải đi đường vòng.",
    },
  ],

  "xac-dinh-du-lieu-nao-can-bao-ve-toi-muc-nao": [
    {
      type: "exercise",
      language: "python",
      title: "Phân mức bảo vệ theo câu hỏi 'mất thì dựng lại được không'",
      task:
        "Sáu kho dữ liệu, mỗi kho cho biết dựng lại được không và dựng lại mất bao nhiêu giờ (số liệu minh hoạ). Phân thành ba mức: 'cao' nếu không dựng lại được, 'cham' nếu dựng lại được nhưng mất hơn 4 giờ, 'nhanh' nếu dựng lại trong 4 giờ trở xuống. Hiện chương trình chỉ nhìn việc dựng lại được hay không nên xếp bảng chỉ số tháng sai mức.",
      starter: `kho = [
    ("don_hang", False, 0),
    ("anh_nguoi_dung", False, 0),
    ("bang_tong_hop_ngay", True, 2),
    ("chi_so_thang", True, 30),
    ("cache_tim_kiem", True, 1),
    ("ban_ghi_kiem_toan", False, 0),
]

def phan_muc(dung_lai, gio):
    if not dung_lai:
        return "cao"
    return "nhanh"

dem = {"cao": 0, "cham": 0, "nhanh": 0}
for ten, dung_lai, gio in kho:
    m = phan_muc(dung_lai, gio)
    dem[m] += 1
    print(f"{ten}: {m}")
print(f"Tóm tắt: cao={dem['cao']} cham={dem['cham']} nhanh={dem['nhanh']}")
`,
      solution: `kho = [
    ("don_hang", False, 0),
    ("anh_nguoi_dung", False, 0),
    ("bang_tong_hop_ngay", True, 2),
    ("chi_so_thang", True, 30),
    ("cache_tim_kiem", True, 1),
    ("ban_ghi_kiem_toan", False, 0),
]

def phan_muc(dung_lai, gio):
    if not dung_lai:
        return "cao"
    if gio > 4:
        return "cham"
    return "nhanh"

dem = {"cao": 0, "cham": 0, "nhanh": 0}
for ten, dung_lai, gio in kho:
    m = phan_muc(dung_lai, gio)
    dem[m] += 1
    print(f"{ten}: {m}")
print(f"Tóm tắt: cao={dem['cao']} cham={dem['cham']} nhanh={dem['nhanh']}")
`,
      expectedOutput:
        "don_hang: cao\nanh_nguoi_dung: cao\nbang_tong_hop_ngay: nhanh\nchi_so_thang: cham\ncache_tim_kiem: nhanh\nban_ghi_kiem_toan: cao\nTóm tắt: cao=3 cham=1 nhanh=2",
      hints: [
        "Mức giữa là dữ liệu dựng lại được nhưng chậm: sao lưu để rút ngắn thời gian khôi phục, không phải để tránh mất.",
        "Thêm một nhánh: if gio > 4 trả về 'cham', đặt sau nhánh 'không dựng lại được'.",
        "Với mức 'nhanh', thứ cần bảo vệ là mã dựng lại và dữ liệu nguồn, và đừng quên kiểm xem lượt tính lại còn chạy được không.",
      ],
    },
    {
      type: "chart",
      title: "Khôi phục mọi thứ trong một lượt thì dữ liệu nóng phải chờ cả lượt",
      caption:
        "Số liệu minh hoạ, không đo từ hệ thống cụ thể. Thời gian khôi phục = dung lượng chia cho tốc độ khôi phục. Đường ngang là mốc nửa giờ cho dữ liệu cần ngay. Kéo tốc độ để thấy: dung lượng cần lưu càng lớn thì chi phí này càng không trả được bằng tiền thêm cho lưu trữ, vì nó là thời gian.",
      kind: "line",
      xLabel: "Tổng dung lượng sao lưu (TB)",
      yLabel: "Giờ để khôi phục toàn bộ",
      x: { from: 1, to: 50, step: 1 },
      params: [{ id: "t", label: "Tốc độ khôi phục", min: 200, max: 2000, step: 100, value: 500, unit: "GB/giờ" }],
      series: [
        { label: "Thời gian khôi phục toàn bộ", expr: "x*1000/t" },
        { label: "Mốc nửa giờ cho dữ liệu cần ngay", expr: "0.5" },
      ],
    },
  ],

  "cham-diem-rui-ro-tu-dong-va-nguong-quyet-dinh": [
    {
      type: "exercise",
      language: "python",
      title: "Ngưỡng cắt phụ thuộc vào chi phí hai loại sai lầm",
      task:
        "Mô hình chấm điểm 19 mẫu (điểm từ 0 đến 100, nhãn 1 là mẫu thật sự xấu). Chặn khi điểm lớn hơn hoặc bằng ngưỡng. Chặn nhầm một mẫu tốt tốn 1 đơn vị, để lọt một mẫu xấu tốn 10 đơn vị (số minh hoạ, trong thực tế phải có người chịu trách nhiệm nói ra). Chương trình hiện coi hai loại sai lầm tốn như nhau. Sửa chi phí để tìm ngưỡng tối ưu, và đếm các mẫu nằm trong vùng giữa ±10 điểm quanh ngưỡng.",
      starter: `mau = [
    (10, 0), (15, 0), (20, 0), (25, 0), (35, 0), (40, 0), (42, 1),
    (45, 0), (48, 0), (50, 1), (52, 0), (55, 0), (58, 0), (60, 1),
    (65, 1), (70, 0), (80, 1), (85, 1), (90, 1),
]
chi_phi_chan_nham = 1
chi_phi_bo_lot = 1

def chi_phi(nguong):
    chan_nham = sum(1 for d, y in mau if d >= nguong and y == 0)
    bo_lot = sum(1 for d, y in mau if d < nguong and y == 1)
    return chan_nham * chi_phi_chan_nham + bo_lot * chi_phi_bo_lot, chan_nham, bo_lot

tot = min(range(10, 100, 10), key=lambda n: chi_phi(n)[0])
tong, cn, bl = chi_phi(tot)
giua = sum(1 for d, _ in mau if tot - 10 <= d <= tot + 10)

print(f"Ngưỡng tốt nhất: {tot}")
print(f"Chặn nhầm {cn}, bỏ lọt {bl}, tổng chi phí {tong}")
print(f"Chuyển cho người xem: {giua}/{len(mau)} mẫu")
`,
      solution: `mau = [
    (10, 0), (15, 0), (20, 0), (25, 0), (35, 0), (40, 0), (42, 1),
    (45, 0), (48, 0), (50, 1), (52, 0), (55, 0), (58, 0), (60, 1),
    (65, 1), (70, 0), (80, 1), (85, 1), (90, 1),
]
chi_phi_chan_nham = 1
chi_phi_bo_lot = 10

def chi_phi(nguong):
    chan_nham = sum(1 for d, y in mau if d >= nguong and y == 0)
    bo_lot = sum(1 for d, y in mau if d < nguong and y == 1)
    return chan_nham * chi_phi_chan_nham + bo_lot * chi_phi_bo_lot, chan_nham, bo_lot

tot = min(range(10, 100, 10), key=lambda n: chi_phi(n)[0])
tong, cn, bl = chi_phi(tot)
giua = sum(1 for d, _ in mau if tot - 10 <= d <= tot + 10)

print(f"Ngưỡng tốt nhất: {tot}")
print(f"Chặn nhầm {cn}, bỏ lọt {bl}, tổng chi phí {tong}")
print(f"Chuyển cho người xem: {giua}/{len(mau)} mẫu")
`,
      expectedOutput: "Ngưỡng tốt nhất: 40\nChặn nhầm 7, bỏ lọt 0, tổng chi phí 7\nChuyển cho người xem: 6/19 mẫu",
      hints: [
        "Chỉ cần đổi một dòng: chi_phi_bo_lot = 10. Phần còn lại của chương trình đã tính đúng theo chi phí.",
        "Chạy thử với bo_lot = 1 để thấy ngưỡng tối ưu nhảy lên 60. Không con số nào tối ưu cho cả hai loại sai lầm, nên chi phí nằm ngoài dữ liệu.",
        "Vùng giữa là nơi mô hình gần như không phân biệt được. Quanh ngưỡng, để người xem quyết định rẻ hơn ép về một phía.",
      ],
    },
    {
      type: "flow",
      title: "Một hồ sơ đi qua bộ chấm điểm tự động",
      steps: [
        {
          label: "Hồ sơ vào, mô hình cho điểm",
          detail: "Điểm 47 trên thang 100. Con số này không tự nói đó là chặn hay cho qua.",
        },
        {
          label: "So với ngưỡng đã chọn",
          detail: "Ngưỡng 40 do người chịu trách nhiệm về cả hai loại sai lầm đặt, dựa trên chi phí chặn nhầm và để lọt. Dịch ngưỡng lên thì bớt cho qua nhầm và tăng chặn nhầm, xuống thì ngược lại.",
        },
        {
          label: "Vùng giữa chuyển cho người xem",
          detail: "Điểm 47 nằm trong ±10 quanh ngưỡng nên mô hình gần như không phân biệt được. Người xem có phán đoán tốt hơn mô hình ở đúng chỗ này, và nhóm quanh ngưỡng thường nhỏ nên rẻ.",
        },
        {
          label: "Ghi lại lý do của quyết định",
          detail: "Các yếu tố đẩy điểm lên, ngưỡng áp dụng, ai xem. Có khiếu nại thì phân biệt được một quyết định đúng với một lỗi.",
        },
        {
          label: "Theo dõi phân bố điểm theo thời gian",
          detail: "Khi dữ liệu đầu vào đổi, phân bố dịch chuyển và ngưỡng cũ cắt ở một chỗ khác so với lúc được chọn. Cần xem lại ngưỡng thay vì để nó chạy mãi.",
        },
      ],
    },
  ],

  "chi-phi-co-dinh-va-bien-doi-khi-tach-dich-vu": [
    {
      type: "exercise",
      language: "python",
      title: "Chi phí cố định của dịch vụ không phụ thuộc số dòng mã",
      task:
        "Mỗi dịch vụ riêng cần bốn khoản cố định: kho mã (2 giờ/tháng), đường phát hành (4), bảng theo dõi (3), người trực (6). Đó là 15 giờ mỗi dịch vụ mỗi tháng, số liệu minh hoạ. Chương trình hiện tính giờ tỷ lệ theo số dòng mã nên dịch vụ nhỏ trông gần như miễn phí. Sửa để mỗi dịch vụ tốn đủ 15 giờ.",
      starter: `khoan_co_dinh = {"kho ma": 2, "duong phat hanh": 4, "theo doi": 3, "truc": 6}
dich_vu = [
    ("thanh-toan", 20000),
    ("thong-bao", 200),
    ("anh", 350),
    ("bao-cao", 1200),
]

tong = 0
for ten, dong in dich_vu:
    gio = sum(khoan_co_dinh.values()) * dong / 20000
    tong += gio
    print(f"{ten} ({dong} dòng): {gio:.0f} giờ")
print(f"Tổng: {tong:.0f} giờ/tháng")
`,
      solution: `khoan_co_dinh = {"kho ma": 2, "duong phat hanh": 4, "theo doi": 3, "truc": 6}
dich_vu = [
    ("thanh-toan", 20000),
    ("thong-bao", 200),
    ("anh", 350),
    ("bao-cao", 1200),
]

tong = 0
for ten, dong in dich_vu:
    gio = sum(khoan_co_dinh.values())
    tong += gio
    print(f"{ten} ({dong} dòng): {gio:.0f} giờ")
print(f"Tổng: {tong:.0f} giờ/tháng")
`,
      expectedOutput:
        "thanh-toan (20000 dòng): 15 giờ\nthong-bao (200 dòng): 15 giờ\nanh (350 dòng): 15 giờ\nbao-cao (1200 dòng): 15 giờ\nTổng: 60 giờ/tháng",
      hints: [
        "Bỏ phần nhân với dong / 20000. Chi phí cố định không co lại theo kích cỡ mã.",
        "Tổng tăng tuyến tính theo số dịch vụ, không theo khối lượng công việc. Thử thêm một dịch vụ 100 dòng và xem tổng.",
      ],
    },
    {
      type: "chart",
      title: "Giờ cố định mỗi tháng tăng theo số dịch vụ, không theo khối lượng",
      caption:
        "Số liệu minh hoạ, không đo từ một đội cụ thể. Tổng giờ cố định = số dịch vụ nhân với giờ cố định của mỗi dịch vụ (kho mã, đường phát hành, theo dõi, người trực). Đường thứ hai chia cho số kỹ sư để thấy phần này đè lên mỗi người ra sao; kéo số kỹ sư để thấy đội nhỏ chịu nặng hơn.",
      kind: "line",
      xLabel: "Số dịch vụ riêng",
      yLabel: "Giờ mỗi tháng",
      x: { from: 1, to: 20, step: 1 },
      params: [
        { id: "h", label: "Giờ cố định của mỗi dịch vụ", min: 4, max: 30, step: 1, value: 15, unit: "giờ/tháng" },
        { id: "e", label: "Số kỹ sư trong đội", min: 2, max: 12, step: 1, value: 6, unit: "người" },
      ],
      series: [
        { label: "Tổng giờ cố định cả đội", expr: "x*h" },
        { label: "Bình quân mỗi kỹ sư", expr: "x*h/e" },
      ],
    },
  ],

  "doc-hieu-chi-bao-kinh-te-vi-mo": [
    {
      type: "exercise",
      language: "python",
      title: "Cảnh báo còn bao nhiêu ngày nữa thì đầy, không chỉ 'đã tới 80%'",
      task:
        "Mức dùng ổ đĩa đo cuối mỗi tuần trong bốn tuần: 52, 57, 63, 70 phần trăm (số liệu minh hoạ). Một cảnh báo ở 80% chưa kêu. Hãy tính tốc độ tăng trung bình mỗi tuần và số ngày còn lại tới 100%. Hiện chương trình chia tốc độ cho cả bốn mốc thay vì cho ba khoảng giữa chúng.",
      starter: `muc = [52, 57, 63, 70]

toc_do = (muc[-1] - muc[0]) / len(muc)
ngay_con = (100 - muc[-1]) / toc_do * 7

print(f"Mức hiện tại: {muc[-1]}%")
print(f"Tốc độ: {toc_do:.0f} điểm/tuần")
print(f"Còn khoảng {ngay_con:.0f} ngày tới khi đầy")
print("Cảnh báo mức 80%:", "kêu" if muc[-1] >= 80 else "chưa kêu")
print("Cảnh báo còn <= 42 ngày:", "kêu" if ngay_con <= 42 else "chưa kêu")
`,
      solution: `muc = [52, 57, 63, 70]

toc_do = (muc[-1] - muc[0]) / (len(muc) - 1)
ngay_con = (100 - muc[-1]) / toc_do * 7

print(f"Mức hiện tại: {muc[-1]}%")
print(f"Tốc độ: {toc_do:.0f} điểm/tuần")
print(f"Còn khoảng {ngay_con:.0f} ngày tới khi đầy")
print("Cảnh báo mức 80%:", "kêu" if muc[-1] >= 80 else "chưa kêu")
print("Cảnh báo còn <= 42 ngày:", "kêu" if ngay_con <= 42 else "chưa kêu")
`,
      expectedOutput:
        "Mức hiện tại: 70%\nTốc độ: 6 điểm/tuần\nCòn khoảng 35 ngày tới khi đầy\nCảnh báo mức 80%: chưa kêu\nCảnh báo còn <= 42 ngày: kêu",
      hints: [
        "Bốn mốc đo chỉ có ba khoảng giữa các mốc. Chia cho len(muc) - 1.",
        "Cảnh báo theo mức không phân biệt được ba tháng với hai ngày. Cảnh báo theo số ngày còn lại thì cho mọi trường hợp cùng một khoảng thời gian để phản ứng.",
      ],
    },
    {
      type: "chart",
      title: "Cùng ngưỡng 80% nhưng thời gian phản ứng khác nhau một trời một vực",
      caption:
        "Số liệu minh hoạ. Số ngày còn lại tới ngưỡng = (ngưỡng trừ mức hiện tại) chia tốc độ tăng mỗi tuần, nhân 7. Đường thứ hai là số ngày còn lại tới khi đầy 100%. Kéo mức hiện tại và nhìn: cùng một cảnh báo ở 80% có thể cho bạn vài tháng hoặc vài ngày, tuỳ hoàn toàn vào tốc độ tăng.",
      kind: "line",
      xLabel: "Tốc độ tăng (điểm phần trăm mỗi tuần)",
      yLabel: "Số ngày còn lại",
      x: { from: 1, to: 20, step: 1 },
      params: [{ id: "m", label: "Mức dùng hiện tại", min: 40, max: 79, step: 1, value: 70, unit: "%" }],
      series: [
        { label: "Ngày còn lại tới ngưỡng cảnh báo 80%", expr: "(80-m)/x*7" },
        { label: "Ngày còn lại tới khi đầy", expr: "(100-m)/x*7" },
      ],
    },
  ],

  "cong-bo-thay-doi-va-quan-ly-ky-vong": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Nhờ AI soạn thông báo thay đổi phá vỡ tương thích",
      task:
        "Bạn sắp ngừng hỗ trợ một điểm cuối của giao diện lập trình (v1). Hãy lắp một lời dặn gồm bốn phần để AI soạn thông báo cho các đối tác tích hợp. Bấm từng phần và chọn phương án phù hợp nhất.",
      parts: [
        {
          id: "nguoi_doc",
          label: "Người đọc",
          options: [
            {
              text: "Viết cho các kỹ sư của đối tác đang gọi điểm cuối này, những người sẽ phải sửa và chuyển tiếp tin cho người dùng của họ.",
              good: true,
              feedback:
                "Thông báo của bạn sẽ được chuyển tiếp, nên cần viết cho người đọc làm việc, kèm đủ ý để họ nói lại với người dùng của họ.",
            },
            {
              text: "Viết cho toàn bộ công chúng quan tâm tới sản phẩm của chúng ta.",
              feedback:
                "Quá rộng: không có ai biết mình có phải làm gì. Người cần hành động bị chìm trong thông tin dành cho người khác.",
            },
            {
              text: "Viết cho nội bộ đội để lưu hồ sơ về thay đổi.",
              feedback: "Đó là ghi chú phát hành nội bộ. Đối tác không đọc nó, và họ vẫn bị bất ngờ.",
            },
          ],
        },
        {
          id: "ba_cau",
          label: "Nội dung bắt buộc",
          options: [
            {
              text: "Phải trả lời đủ ba câu: cái gì đổi, khi nào, và người đọc cần làm gì trước ngày nào.",
              good: true,
              feedback:
                "Câu thứ ba thường bị bỏ và cũng là câu duy nhất người đọc thật sự cần. Thiếu nó thì thông báo không tạo ra hành động nào.",
            },
            {
              text: "Mô tả thật chi tiết thay đổi kỹ thuật bên trong: cấu trúc mới, lý do thiết kế và so sánh với bản cũ.",
              feedback:
                "Cái gì đổi thường đã được viết rất kỹ. Mô tả hoàn hảo mà không nói ai cần làm gì thì người đọc vẫn không biết bước tiếp theo.",
            },
            {
              text: "Chỉ cần nói sắp có thay đổi và hẹn công bố chi tiết sau.",
              feedback: "'Khi nào' mơ hồ biến thông báo thành một lời cảnh báo mà không ai lập lịch được.",
            },
          ],
        },
        {
          id: "thoi_han",
          label: "Thời hạn",
          options: [
            {
              text: "Tính từ chu kỳ phát hành của bên chậm nhất trong các đối tác.",
              good: true,
              feedback:
                "Một đối tác phát hành theo quý cần ít nhất một quý, không phải hai tuần. Thời hạn tính từ phía họ mới là con số dùng được.",
            },
            {
              text: "Lấy theo chu kỳ phát hành của chúng ta cộng thêm một tuần cho chắc.",
              feedback:
                "Chu kỳ của bạn dễ lấy nhưng không phải con số cần dùng. Bên chậm nhất sẽ bị buộc xử lý như một sự cố.",
            },
            {
              text: "Lấy theo thông lệ chung của ngành về thời gian báo trước.",
              feedback:
                "Thông lệ ngành cũng dễ lấy và cũng không biết đối tác của bạn phát hành theo nhịp nào.",
            },
          ],
        },
        {
          id: "khuon",
          label: "Khuôn dạng",
          options: [
            {
              text: "Mở đầu bằng một câu tóm tắt hành động và ngày, rồi mới tới chi tiết kỹ thuật.",
              good: true,
              feedback:
                "Người đọc cần biết mình có liên quan không trong vài giây đầu. Phần chi tiết đặt sau cho ai cần.",
            },
            {
              text: "Mở đầu bằng bối cảnh dài về lịch sử của điểm cuối trước khi nói tới thay đổi.",
              feedback:
                "Hành động chìm ở cuối một thông báo dài. Người đọc đã bỏ đi trước khi tới đoạn họ cần.",
            },
            {
              text: "Chia thành nhiều thư ngắn, mỗi thư nói một phần nhỏ.",
              feedback:
                "Rải thông tin qua nhiều thư khiến người đọc phải ghép lại, và người bỏ sót một thư sẽ thiếu đúng phần họ cần.",
            },
          ],
        },
      ],
      responses: [
        {
          requires: ["nguoi_doc", "ba_cau", "thoi_han", "khuon"],
          text:
            "Bản nháp mở đầu: 'Điểm cuối v1 sẽ ngừng hoạt động ngày 31/3. Nếu hệ thống của bạn gọi /v1/orders, hãy chuyển sang /v2/orders trước ngày đó.' Tiếp theo là ba phần: cái gì đổi, lịch báo trước 4 tháng tính từ chu kỳ quý của đối tác chậm nhất, và những việc cần làm cho từng loại tích hợp, kèm câu mẫu để họ chuyển tiếp cho người dùng của họ. (Văn bản minh hoạ do trình mô phỏng viết sẵn, không phải AI thật.)",
        },
        {
          requires: ["ba_cau", "thoi_han"],
          text:
            "Bản nháp có đủ ba câu và thời hạn hợp lý, nhưng nằm cuối một thông báo dài, mở đầu bằng lịch sử của v1. Người đọc phải kéo xuống mới thấy việc họ cần làm. (Văn bản minh hoạ do trình mô phỏng viết sẵn.)",
        },
        {
          text:
            "Bản nháp mô tả kỹ thuật rất chi tiết về cấu trúc mới của v2, ghi 'sắp tới' mà không có ngày, và không nói người đọc cần làm gì. Đối tác đọc xong vẫn không biết bước tiếp theo, và nhiều nơi chỉ biết khi hệ thống của họ hỏng. (Văn bản minh hoạ do trình mô phỏng viết sẵn.)",
        },
      ],
    },
    {
      type: "flow",
      title: "Cùng một thay đổi phá vỡ tương thích, đi theo dòng thời gian",
      steps: [
        {
          label: "Ba tháng trước: thông báo đủ ba câu",
          detail: "Cái gì đổi, ngày nào, người đọc phải làm gì trước ngày đó. Tới lúc này một thay đổi phá vỡ tương thích mới là một việc cần lên kế hoạch.",
        },
        {
          label: "Đối tác lên lịch trong chu kỳ của họ",
          detail: "Bên phát hành theo quý xếp việc vào quý tới. Hạn của bạn lấy theo bên chậm nhất, không theo chu kỳ phát hành của chính bạn.",
        },
        {
          label: "Nhắc lại khi còn một tháng",
          detail: "Một thông báo gửi một lần dễ bị trôi. Nhắc kèm danh sách những đối tác chưa chuyển cho thấy ai thực sự cần giúp.",
        },
        {
          label: "Ngày tắt",
          detail: "Đối tác đã chuyển thì không thấy gì xảy ra. Đối tác chưa chuyển thì thấy lỗi, nhưng không bất ngờ vì đã được báo từ trước.",
        },
        {
          label: "Cùng thay đổi, nếu không báo trước",
          detail: "Nó tới như một sự cố: người dùng phải huỷ lịch để xử lý, và phản ứng tiêu cực nhắm vào việc bị bất ngờ chứ không phải bản thân thay đổi.",
        },
      ],
    },
  ],
};
