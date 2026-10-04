import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 32. Một người viết cho một tệp.
export const P32_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Nền tảng nâng cao ───────────────────────────────────────────────────
  "tham-dinh-truoc-khi-nhan-mot-he-thong": [
    {
      type: "scenario",
      title: "Nhận bàn giao hệ thống đơn hàng từ đội cũ",
      start: "hoi",
      nodes: {
        hoi: {
          text: "Bạn sắp nhận một hệ thống xử lý đơn hàng đang chạy, đội cũ đã chuyển đi. Bạn có một buổi họp với trưởng đội cũ và chỉ kịp hỏi vài câu. Câu nào bạn hỏi trước?",
          choices: [
            { label: "Ai là người duy nhất biết sửa từng phần của hệ thống này?", next: "nguoi" },
            { label: "Tài liệu quy trình xử lý sự cố của hệ thống nằm ở đâu?", next: "quytrinh" },
            { label: "Tài liệu kiến trúc có cập nhật tới phiên bản hiện tại chưa?", next: "taiLieu" },
          ],
        },
        quytrinh: {
          text: "Bạn nhận được một tài liệu quy trình sạch đẹp, đủ bước. Ba tuần sau có sự cố thật, và mọi người xử lý theo trí nhớ của một người đã nghỉ, chứ không theo tài liệu. Quy trình ghi ý định; hành vi thật chỉ lộ ra khi có sự cố.",
          ending: "bad",
        },
        taiLieu: {
          text: "Tài liệu kiến trúc trả lời đúng và đầy đủ. Nhưng nó không cho biết ai đang giữ phần xử lý thanh toán trong đầu. Tháng sau người đó xin nghỉ dài ngày, và không còn ai trong đội đọc được đoạn mã ấy.",
          ending: "bad",
        },
        nguoi: {
          text: "Trưởng đội cũ trả lời thẳng: phần xử lý đơn hàng chỉ anh A hiểu, và anh đã nghỉ năm ngoái. Đây là một rủi ro cụ thể, có tên. Bạn làm gì với nó?",
          choices: [
            { label: "Ghi thành rủi ro có tên và xếp một buổi chuyển giao tri thức", next: "sao" },
            { label: "Bỏ qua vì phần đó lâu nay ít ai phải sửa tới", next: "boqua" },
          ],
        },
        boqua: {
          text: "Hai tháng sau một thay đổi quy định buộc phải sửa chính phần xử lý đơn hàng. Không ai trong đội hiểu nó, và việc đáng ra mất một tuần kéo thành sáu tuần đoán mò trong mã cũ.",
          ending: "bad",
        },
        sao: {
          text: "Rủi ro về người đã vào kế hoạch. Giờ tới câu hỏi thứ hai: lần gần nhất khôi phục từ bản sao lưu là khi nào? Trưởng đội cũ đáp: chưa bao giờ, nhưng sao lưu chạy đều mỗi đêm. Bạn quyết định thế nào?",
          choices: [
            { label: "Tin vào việc sao lưu chạy đều, vì không thấy báo lỗi nào", next: "tin" },
            { label: "Đòi một lần khôi phục thử vào môi trường riêng trước khi nhận", next: "thu" },
          ],
        },
        tin: {
          text: "Sáu tháng sau ổ đĩa hỏng. Bản sao lưu có mặt đủ mỗi đêm nhưng tệp trống vì một đổi cấu hình cũ, và không ai biết vì chưa từng mở thử. Một bản sao lưu chưa khôi phục thử chỉ là một giả định.",
          ending: "bad",
        },
        thu: {
          text: "Lần khôi phục thử thất bại ở bước đầu và lộ ra một lỗi cấu hình ba tháng tuổi. Bạn sửa nó trước khi nhận hệ thống, và danh sách rủi ro bàn giao giờ có hai dòng có tên, có giá, có người phụ trách.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Bốn câu hỏi thẩm định giống đi xem nhà cũ",
      intro:
        "Hãy nghĩ tới việc mua một căn nhà cũ. Bản vẽ cho biết căn nhà được thiết kế ra sao, còn chủ cũ mới cho biết nhà thật sự sống thế nào. Bốn câu hỏi bàn giao chính là những câu bạn hỏi chủ nhà mà bản vẽ không trả lời được.",
      columns: ["Câu hỏi", "Giống như hỏi chủ nhà", "Tín hiệu đáng lo"],
      rows: [
        ["Người duy nhất biết sửa", "Ai là thợ duy nhất biết đường ống chạy ở đâu", "Chủ nhà bảo cả nhà ai cũng biết"],
        ["Lần cuối khôi phục từ sao lưu", "Cầu dao tổng đã bao giờ được thử ngắt chưa", "Chưa bao giờ thử, nhưng chắc là chạy"],
        ["Vùng không ai dám đụng", "Phòng nào cả nhà tránh mở cửa", "Không có phòng nào như thế cả"],
        ["Sự cố gần nhất", "Lần mưa dột gần đây xử lý ra sao", "Chỉ kể quy trình, không kể chuyện đã xảy ra"],
      ],
      oneLiner: "Dữ liệu cho bạn biết hệ thống trông thế nào; bốn câu hỏi cho bạn biết hệ thống đang sống ra sao.",
    },
  ],

  "vi-sao-nhieu-cuoc-thay-doi-lon-that-bai": [
    {
      type: "exercise",
      language: "python",
      title: "Tiến độ khai báo và tiến độ thật",
      task: "Đội báo cáo phần trăm module đã viết xong (khai_bao). Hệ thống đo được số yêu cầu đi qua hệ thống mới và hệ thống cũ (luu_luong). Sửa dòng tính `that` để nó là phần trăm yêu cầu THẬT đang đi qua hệ thống mới, làm tròn xuống số nguyên, rồi chạy để thấy khoảng cách giữa hai con số.",
      starter: `khai_bao = {"Tuần 4": 40, "Tuần 8": 60, "Tuần 12": 80}
luu_luong = {"Tuần 4": (300, 9700), "Tuần 8": (800, 9200), "Tuần 12": (1500, 8500)}

for tuan in khai_bao:
    moi, cu = luu_luong[tuan]
    that = khai_bao[tuan]  # TODO: phần trăm yêu cầu đi qua hệ thống mới
    print(f"{tuan}: khai báo {khai_bao[tuan]}%, thật {that}%")

khoang_cach = khai_bao["Tuần 12"] - that
print(f"Khoảng cách tuần 12: {khoang_cach} điểm phần trăm")
`,
      solution: `khai_bao = {"Tuần 4": 40, "Tuần 8": 60, "Tuần 12": 80}
luu_luong = {"Tuần 4": (300, 9700), "Tuần 8": (800, 9200), "Tuần 12": (1500, 8500)}

for tuan in khai_bao:
    moi, cu = luu_luong[tuan]
    that = moi * 100 // (moi + cu)
    print(f"{tuan}: khai báo {khai_bao[tuan]}%, thật {that}%")

khoang_cach = khai_bao["Tuần 12"] - that
print(f"Khoảng cách tuần 12: {khoang_cach} điểm phần trăm")
`,
      expectedOutput: `Tuần 4: khai báo 40%, thật 3%
Tuần 8: khai báo 60%, thật 8%
Tuần 12: khai báo 80%, thật 15%
Khoảng cách tuần 12: 65 điểm phần trăm`,
      hints: [
        "Tổng yêu cầu là moi + cu; phần đi qua hệ thống mới là moi chia cho tổng đó.",
        "Nhân với 100 trước rồi dùng phép chia lấy phần nguyên // để ra số nguyên.",
      ],
    },
    {
      type: "chart",
      title: "Hai thước đo cho cùng một cuộc di trú",
      caption:
        "Số liệu minh hoạ, không phải dữ liệu của dự án nào. Điều đáng nhớ là hình dạng: con số đội tự khai báo đi lên đều, còn lưu lượng thật đi qua hệ thống mới chậm hơn nhiều và chỉ nhảy khi những phần khó được chuyển.",
      kind: "line",
      yLabel: "Phần trăm hoàn thành",
      data: [
        { label: "Tuần 4", values: [20, 1] },
        { label: "Tuần 8", values: [35, 4] },
        { label: "Tuần 12", values: [50, 9] },
        { label: "Tuần 16", values: [65, 13] },
        { label: "Tuần 20", values: [80, 18] },
      ],
      seriesLabels: ["Đội khai báo (module xong)", "Đo từ hệ thống (lưu lượng thật)"],
    },
  ],

  "case-mot-lan-di-tru-that": [
    {
      type: "scenario",
      title: "Chuyển hệ thống thanh toán sang dịch vụ mới",
      start: "tuan1",
      nodes: {
        tuan1: {
          text: "Đội của bạn nhận việc chuyển hệ thống thanh toán sang một dịch vụ mới. Đây là tuần đầu tiên. Việc gì cần làm trước cả khi vẽ kiến trúc?",
          choices: [
            { label: "Viết định nghĩa xong là gì và chọn con số đo được từ hệ thống", next: "thang1" },
            { label: "Vẽ kiến trúc đích cho xong rồi mới bàn tới cách đo", next: "kientruc" },
            { label: "Làm phần khó nhất trước để biết sớm dự án có khả thi không", next: "khoTruoc" },
          ],
        },
        kientruc: {
          text: "Kiến trúc đẹp và được duyệt. Nhưng không ai nói xong là thế nào, nên tới tháng thứ năm đội báo gần xong và lãnh đạo hỏi người dùng đã sang chưa thì không ai trả lời được. Dự án mờ dần chứ không kết thúc.",
          ending: "bad",
        },
        khoTruoc: {
          text: "Một đội chưa từng làm việc này đi thẳng vào phần phức tạp nhất. Họ vừa học quy trình chuyển, vừa gỡ phần khó, và sau hai tháng chưa có một yêu cầu thật nào chạy qua hệ thống mới để chứng minh quy trình đúng.",
          ending: "bad",
        },
        thang1: {
          text: "Con số đo là phần trăm lưu lượng thật qua hệ thống mới, kế hoạch nói tháng thứ tư sẽ đạt 50%. Đội dựng lớp trung gian và chuyển phần dễ nhất qua nó. Tới tháng thứ tư, đồng hồ đo chỉ 20%. Bạn phản ứng ra sao?",
          choices: [
            { label: "Cắt bớt phạm vi đợt này và dời hạn tương ứng", next: "chang3" },
            { label: "Giữ nguyên phạm vi, chỉ dời hạn thêm hai tháng", next: "doiHan" },
            { label: "Điều thêm sáu kỹ sư từ đội khác vào cho kịp", next: "themNguoi" },
          ],
        },
        doiHan: {
          text: "Hạn được dời mà phạm vi không đổi, nghĩa là ước lượng chưa được sửa. Tới tháng thứ sáu lưu lượng mới là 32%, và lần dời hạn thứ ba đã nằm sẵn trong kế hoạch.",
          ending: "bad",
        },
        themNguoi: {
          text: "Sáu người mới cần được hướng dẫn, và chi phí phối hợp tăng nhanh hơn số người. Tháng thứ sáu lưu lượng chỉ ở 24%, chậm hơn lúc chưa thêm người.",
          ending: "bad",
        },
        chang3: {
          text: "Sau khi cắt phạm vi, còn lại mười phần trăm cuối gồm khách đặc biệt và trường hợp lạ mà không ai muốn đụng tới. Bạn phân công thế nào?",
          choices: [
            { label: "Để đội tự nhận phần còn lại khi tới lúc dọn nốt", next: "troi" },
            { label: "Giao đích danh một người ngay bây giờ, kèm một ngày cụ thể", next: "xong" },
          ],
        },
        troi: {
          text: "Ai cũng thấy phần này nên có người nhận và ai cũng tưởng người khác sẽ nhận. Mười phần trăm cuối kéo dài thêm bốn tháng, trong khi hệ thống cũ vẫn phải trả phí duy trì.",
          ending: "bad",
        },
        xong: {
          text: "Người được giao bắt đầu từ danh sách trường hợp lạ ngay tuần này. Lưu lượng đạt 100% và hệ thống cũ được tắt. Khi kể lại, bạn có thể nêu con số đo, cách điều chỉnh phạm vi và người đứng tên phần cuối.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một cuộc di trú đi qua bốn mốc",
      steps: [
        {
          label: "Tuần đầu: định nghĩa xong",
          detail:
            "Một buổi họp tạo ra hai thứ: câu mô tả xong là gì, và con số đo được từ hệ thống (phần trăm lưu lượng thật qua hệ thống mới). Chưa có dòng mã nào, nhưng từ đây mọi tranh luận về tiến độ có chỗ dựa.",
        },
        {
          label: "Tháng đầu: lớp trung gian",
          detail:
            "Dựng lớp trung gian trước hệ thống cũ, rồi chuyển phần dễ nhất qua nó. Một vài yêu cầu thật đi qua đường mới, và đội kiểm chứng được quy trình chuyển trước khi đụng vào phần khó.",
        },
        {
          label: "Giữa chặng: đọc đồng hồ",
          detail:
            "So con số đo với kế hoạch. Nếu chậm, cắt phạm vi cùng lúc với dời hạn thay vì chỉ dời hạn. Không thêm người vào dự án đang chậm, vì chi phí trao đổi tăng nhanh hơn số người.",
        },
        {
          label: "Phần cuối: đích danh",
          detail:
            "Danh sách khách đặc biệt và trường hợp lạ có tên một người chịu trách nhiệm từ đầu. Khi chỉ còn phần này, đồng hồ chạm 100% và hệ thống cũ được tắt, một việc mà tuần đầu đã ghi rõ là dấu mốc kết thúc.",
        },
      ],
    },
  ],

  // ── Kỹ sư trưởng & Vận hành ─────────────────────────────────────────────
  "xay-dung-ngan-sach-doanh-nghiep": [
    {
      type: "exercise",
      language: "python",
      title: "Dòng lưu trữ không bao giờ tự giảm",
      task: "Mỗi tháng đội thêm 200 GB dữ liệu, đơn giá minh hoạ 0,02 USD mỗi GB mỗi tháng. Sửa vòng lặp để `luu` là dung lượng đã tích lại tới tháng đó, và `luu_xoa` là dung lượng khi có chính sách chỉ giữ dữ liệu của 6 tháng gần nhất. So ba cách lập dự trù cho 12 tháng.",
      starter: `them = 200      # GB thêm mỗi tháng
gia = 0.02      # USD mỗi GB mỗi tháng (minh hoạ)
giu_toi_da = 6  # chính sách xoá: chỉ giữ 6 tháng gần nhất

tong_don = 0
tong_xoa = 0
for thang in range(1, 13):
    luu = them       # TODO: dữ liệu tích lại tới tháng này
    luu_xoa = them   # TODO: như trên nhưng chỉ giữ giu_toi_da tháng
    tong_don += luu * gia
    tong_xoa += luu_xoa * gia

print(f"Nhân mười hai: {them * gia * 12:.0f} USD")
print(f"Cộng dồn: {tong_don:.0f} USD")
print(f"Có xoá sau 6 tháng: {tong_xoa:.0f} USD")
`,
      solution: `them = 200      # GB thêm mỗi tháng
gia = 0.02      # USD mỗi GB mỗi tháng (minh hoạ)
giu_toi_da = 6  # chính sách xoá: chỉ giữ 6 tháng gần nhất

tong_don = 0
tong_xoa = 0
for thang in range(1, 13):
    luu = them * thang
    luu_xoa = them * min(thang, giu_toi_da)
    tong_don += luu * gia
    tong_xoa += luu_xoa * gia

print(f"Nhân mười hai: {them * gia * 12:.0f} USD")
print(f"Cộng dồn: {tong_don:.0f} USD")
print(f"Có xoá sau 6 tháng: {tong_xoa:.0f} USD")
`,
      expectedOutput: `Nhân mười hai: 48 USD
Cộng dồn: 312 USD
Có xoá sau 6 tháng: 228 USD`,
      hints: [
        "Sau `thang` tháng, dung lượng đang lưu là them nhân với thang.",
        "Với chính sách xoá, số tháng được giữ không vượt quá giu_toi_da: dùng min(thang, giu_toi_da).",
      ],
    },
    {
      type: "chart",
      title: "Nhân mười hai và cộng dồn lệch nhau thế nào",
      caption:
        "Số liệu minh hoạ: đơn giá và dung lượng thêm mỗi tháng do bạn chỉnh. Đường thấp là cách lập 'tháng này nhân lên'; đường cong lên là chi phí lưu trữ cộng dồn khi dữ liệu chỉ tăng. Khoảng cách giữa hai đường là khoản hụt trong ngân sách.",
      kind: "line",
      xLabel: "Tháng trong năm",
      yLabel: "Chi phí lưu trữ cộng dồn (USD)",
      x: { from: 1, to: 12, step: 1 },
      params: [
        { id: "them", label: "Dữ liệu thêm mỗi tháng", min: 50, max: 500, step: 50, value: 200, unit: "GB" },
        { id: "gia", label: "Đơn giá mỗi GB mỗi tháng (minh hoạ)", min: 0.01, max: 0.05, step: 0.01, value: 0.02, unit: "USD" },
      ],
      series: [
        { label: "Lập bằng cách nhân tháng đầu", expr: "them*gia*x" },
        { label: "Dữ liệu tích lại (cộng dồn)", expr: "gia*them*x*(x+1)/2" },
      ],
    },
  ],

  "du-bao-lan": [
    {
      type: "exercise",
      language: "python",
      title: "Thay giả định bằng số thật, dự báo lại phần còn lại",
      task: "Kế hoạch ban đầu giả định chi phí tăng 3% mỗi tháng. Ba tháng đầu đã có số thật. Tính tốc độ tăng thật theo tháng từ số đo (tỷ lệ giữa tháng cuối và tháng đầu, lấy căn theo số khoảng giữa các tháng), rồi dự báo lại tháng 4 tới tháng 6 và ghi lại giả định đã đổi.",
      starter: `thuc_te = [100, 108, 117]   # chi phí ba tháng đầu (đơn vị minh hoạ)
tang_cu = 0.03

tang_moi = tang_cu  # TODO: tốc độ tăng thật rút ra từ thuc_te
so_khoang = len(thuc_te) - 1

gia_tri = thuc_te[-1]
tong = sum(thuc_te)
for thang in range(4, 7):
    gia_tri *= 1 + tang_moi
    tong += gia_tri
    print(f"Tháng {thang}: {gia_tri:.0f}")

print(f"Giả định tăng trưởng: {tang_cu * 100:.1f}% -> {tang_moi * 100:.1f}%")
print(f"Tổng sáu tháng: {tong:.0f}")
`,
      solution: `thuc_te = [100, 108, 117]   # chi phí ba tháng đầu (đơn vị minh hoạ)
tang_cu = 0.03

so_khoang = len(thuc_te) - 1
tang_moi = (thuc_te[-1] / thuc_te[0]) ** (1 / so_khoang) - 1

gia_tri = thuc_te[-1]
tong = sum(thuc_te)
for thang in range(4, 7):
    gia_tri *= 1 + tang_moi
    tong += gia_tri
    print(f"Tháng {thang}: {gia_tri:.0f}")

print(f"Giả định tăng trưởng: {tang_cu * 100:.1f}% -> {tang_moi * 100:.1f}%")
print(f"Tổng sáu tháng: {tong:.0f}")
`,
      expectedOutput: `Tháng 4: 127
Tháng 5: 137
Tháng 6: 148
Giả định tăng trưởng: 3.0% -> 8.2%
Tổng sáu tháng: 737`,
      hints: [
        "Ba tháng có hai khoảng giữa chúng, nên tốc độ tăng mỗi khoảng là (117/100) lấy luỹ thừa 1/2.",
        "Nhớ chuyển về tỷ lệ tăng bằng cách trừ đi 1.",
      ],
    },
    {
      type: "flow",
      title: "Một vòng dự báo lăn trong tháng",
      steps: [
        {
          label: "Thay số thật vào tháng vừa qua",
          detail:
            "Tháng 3 khép sổ: chi phí thật 117, kế hoạch ghi 109. Bạn thay 109 bằng 117 trong bảng, không sửa các tháng đã qua nữa.",
        },
        {
          label: "Tìm giả định đã sai",
          detail:
            "Kế hoạch giả định tăng 3% mỗi tháng, số thật cho thấy gần 8%. Đó không phải lỗi của ai, mà là một giả định cần cập nhật.",
        },
        {
          label: "Dự báo lại phần còn lại",
          detail:
            "Với tốc độ mới, tháng 4 tới tháng 12 được tính lại từ 117. Phần đã qua giữ nguyên, nên con số cả năm nay phản ánh điều đã học được.",
        },
        {
          label: "Ghi giả định đã đổi",
          detail:
            "Một dòng: 'Tăng trưởng 3% thành 8%; nguyên nhân: hai khách hàng lớn ra mắt sớm'. Sau sáu tháng, danh sách này cho biết đội hay sai ở đâu, điều mà một kế hoạch lập một lần không cho bạn biết.",
        },
      ],
    },
  ],

  "phan-tich-variance-thuc-te-vs-ke-hoach": [
    {
      type: "exercise",
      language: "python",
      title: "Tách một chênh lệch thành lượng và đơn giá",
      task: "Dự trù là 2.000 đơn vị với đơn giá 5 (đơn vị minh hoạ), tức 10.000. Với mỗi kỳ, tách tổng chênh lệch thành phần do lượng (chênh lệch lượng nhân đơn giá dự trù) và phần do đơn giá (chênh lệch đơn giá nhân lượng thực tế). Hai phần phải cộng lại đúng tổng.",
      starter: `ke_hoach_luong, ke_hoach_gia = 2000, 5

ky = [
    ("Kỳ A", 2400, 5.5),
    ("Kỳ B", 1500, 6),
]

for ten, luong, gia in ky:
    tong = luong * gia - ke_hoach_luong * ke_hoach_gia
    do_luong = tong   # TODO: phần lệch do lượng dùng
    do_gia = tong     # TODO: phần lệch do đơn giá
    print(f"{ten}: tổng {tong:+.0f}, lượng {do_luong:+.0f}, giá {do_gia:+.0f}")
    if do_luong < 0:
        print("  -> lượng dùng thấp hơn dự trù: xem lại dự báo sản phẩm")
    elif do_gia > 0:
        print("  -> đơn giá tăng: xem lại hệ thống")
`,
      solution: `ke_hoach_luong, ke_hoach_gia = 2000, 5

ky = [
    ("Kỳ A", 2400, 5.5),
    ("Kỳ B", 1500, 6),
]

for ten, luong, gia in ky:
    tong = luong * gia - ke_hoach_luong * ke_hoach_gia
    do_luong = (luong - ke_hoach_luong) * ke_hoach_gia
    do_gia = (gia - ke_hoach_gia) * luong
    print(f"{ten}: tổng {tong:+.0f}, lượng {do_luong:+.0f}, giá {do_gia:+.0f}")
    if do_luong < 0:
        print("  -> lượng dùng thấp hơn dự trù: xem lại dự báo sản phẩm")
    elif do_gia > 0:
        print("  -> đơn giá tăng: xem lại hệ thống")
`,
      expectedOutput: `Kỳ A: tổng +3200, lượng +2000, giá +1200
  -> đơn giá tăng: xem lại hệ thống
Kỳ B: tổng -1000, lượng -2500, giá +1500
  -> lượng dùng thấp hơn dự trù: xem lại dự báo sản phẩm`,
      hints: [
        "Phần do lượng: (lượng thực tế trừ lượng dự trù) nhân đơn giá dự trù.",
        "Phần do đơn giá: (đơn giá thực tế trừ đơn giá dự trù) nhân LƯỢNG THỰC TẾ, không phải lượng dự trù.",
      ],
    },
    {
      type: "chart",
      title: "Cùng một tổng, hai câu chuyện khác nhau",
      caption:
        "Số liệu minh hoạ: dự trù 1.000 đơn vị với đơn giá 10. Kéo lượng dùng (trục ngang) và thanh trượt đơn giá để thấy cùng một tổng chênh lệch có thể đến từ hai nguồn trái dấu, và vì sao tổng một mình không cho biết nên sửa dự báo hay sửa hệ thống.",
      kind: "line",
      xLabel: "Lượng dùng thực tế lệch so với dự trù (%)",
      yLabel: "Chênh lệch chi phí (đơn vị)",
      x: { from: -30, to: 50, step: 10 },
      params: [{ id: "dgia", label: "Đơn giá thực tế lệch so với dự trù", min: -30, max: 30, step: 5, value: -20, unit: "%" }],
      series: [
        { label: "Phần do lượng", expr: "1000*(x/100)*10" },
        { label: "Phần do đơn giá", expr: "10*(dgia/100)*1000*(1+x/100)" },
        { label: "Tổng chênh lệch", expr: "1000*(x/100)*10+10*(dgia/100)*1000*(1+x/100)" },
      ],
    },
  ],

  "chon-dung-chi-so-cho-doi-ky-thuat": [
    {
      type: "scenario",
      title: "Một bảng điều khiển bốn mươi ô",
      start: "bang",
      nodes: {
        bang: {
          text: "Bảng điều khiển của đội có bốn mươi ô và trưởng nhóm muốn thêm nữa vì sợ bỏ sót điều gì đó. Ngày nào mắt mọi người cũng chỉ lướt và dừng ở màu đỏ. Bạn làm gì?",
          choices: [
            { label: "Giữ cả bốn mươi ô và đổi sang màu dễ lướt hơn", next: "mau" },
            { label: "Hỏi mỗi ô ai làm gì khi nó xấu đi, ô nào không có thì loại", next: "hoi" },
            { label: "Thêm các ô theo thứ công cụ giám sát có sẵn để đo", next: "sanco" },
          ],
        },
        mau: {
          text: "Bảng đẹp hơn nhưng vẫn là bốn mươi ô. Một ô quan trọng chuyển vàng suốt hai tuần mà không ai nhận ra vì nó lẫn giữa nhiều ô vàng khác. Đến khi chuyển đỏ thì đã là sự cố.",
          ending: "bad",
        },
        sanco: {
          text: "Công cụ giám sát có sẵn hàng chục chỉ số dễ lấy, nên bảng phình lên sáu mươi ô. Nhưng chỉ số người dùng thật sự cảm nhận, như thời gian hoàn tất đơn, lại khó đo hơn nên không có trên bảng. Bảng đầy mà vẫn thiếu điều quan trọng.",
          ending: "bad",
        },
        hoi: {
          text: "Từ bốn mươi ô còn lại sáu. Ô nào không có người hành động thì chuyển thành cảnh báo có điều kiện hoặc bỏ. Một ô còn lại là 'số vé đã đóng mỗi người' và cấp trên muốn gắn nó vào đánh giá từng cá nhân. Bạn đề xuất gì?",
          choices: [
            { label: "Dùng ô đó đánh giá cá nhân và báo trước cho cả đội", next: "danhgia" },
            { label: "Giữ làm số theo dõi chung của nhóm, không gắn đánh giá", next: "nhom" },
            { label: "Bỏ ô đó vì mọi chỉ số rồi cũng bị tối ưu", next: "bo" },
          ],
        },
        danhgia: {
          text: "Chỉ trong một quý số vé đóng tăng gấp rưỡi, vì vé bị chia nhỏ. Con số vẫn đúng theo định nghĩa của nó, nhưng không còn đo được khối lượng việc đã xong thật.",
          ending: "bad",
        },
        bo: {
          text: "Bảng sạch hơn nhưng đội mất đi tín hiệu sớm về việc dồn ứ. Tháng sau hàng chờ dài ra gấp đôi và chỉ được phát hiện khi một khách hàng phàn nàn.",
          ending: "bad",
        },
        nhom: {
          text: "Ô vẫn đo đúng thứ nó đo, vì không ai bị đánh giá theo nó. Bảng còn sáu ô, mỗi ô có người hành động khi xấu đi, và mắt mọi người dừng lại ở đúng chỗ cần dừng.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Từ bốn mươi ô xuống còn sáu ô",
      steps: [
        {
          label: "Liệt kê từng ô",
          detail:
            "Mỗi ô một dòng: tên chỉ số, nguồn dữ liệu, ai nhìn nó gần đây nhất. Ô mà không ai nhớ lần cuối mình nhìn là ứng viên đầu tiên để loại.",
        },
        {
          label: "Hỏi ai hành động",
          detail:
            "Với mỗi ô: nếu nó xấu đi lúc ba giờ chiều thứ tư, một người cụ thể làm gì? Ô nào không trả lời được chỉ tạo lo lắng chứ không tạo hành động.",
        },
        {
          label: "Tách dẫn dắt và kết quả",
          detail:
            "Số vé đóng là kết quả, còn tuổi vé đang mở là chỉ số dẫn dắt vì còn kịp sửa. Giữ ít nhất một ô dẫn dắt cho mỗi mục tiêu.",
        },
        {
          label: "Kiểm tra có bị tối ưu không",
          detail:
            "Ô nào gắn với đánh giá cá nhân thì giả định nó đã ngừng đo thứ nó vốn đo. Chuyển nó về số của nhóm, hoặc đi kèm một ô đối trọng như chất lượng vé.",
        },
        {
          label: "Đẩy phần còn lại thành cảnh báo",
          detail:
            "Các ô bị loại không biến thành bảng phụ. Chúng thành cảnh báo có điều kiện: im lặng khi bình thường, chỉ lên tiếng khi vượt ngưỡng đã bàn trước.",
        },
      ],
    },
  ],

  "dung-luong-du-phong-bao-nhieu-la-du": [
    {
      type: "exercise",
      language: "python",
      title: "Mức đệm theo đỉnh, không theo trung bình",
      task: "Tải trung bình là 100 yêu cầu mỗi giây, đỉnh đã quan sát được là 700, và dự kiến tăng 20%. Trong lúc chờ mở rộng, tải tăng thêm 15 yêu cầu mỗi giây mỗi phút (số minh hoạ). Tính mức cần giữ theo công thức: đỉnh nhân (1 cộng tỷ lệ tăng) cộng phần tăng thêm trong thời gian mở rộng, rồi so với cách 'gấp đôi trung bình'.",
      starter: `trung_binh = 100
dinh = 700
tang = 0.20            # tỷ lệ tăng dự kiến
doc_them = 15          # yêu cầu/giây tăng thêm mỗi phút khi đang chờ mở rộng

print(f"Gấp đôi trung bình: {trung_binh * 2}")
for phut in (20, 2):
    can_giu = trung_binh * 2  # TODO: dùng đỉnh, tỷ lệ tăng và thời gian mở rộng
    print(f"Mở rộng {phut} phút: {can_giu}")
`,
      solution: `trung_binh = 100
dinh = 700
tang = 0.20            # tỷ lệ tăng dự kiến
doc_them = 15          # yêu cầu/giây tăng thêm mỗi phút khi đang chờ mở rộng

print(f"Gấp đôi trung bình: {trung_binh * 2}")
for phut in (20, 2):
    can_giu = round(dinh * (1 + tang) + doc_them * phut)
    print(f"Mở rộng {phut} phút: {can_giu}")
`,
      expectedOutput: `Gấp đôi trung bình: 200
Mở rộng 20 phút: 1140
Mở rộng 2 phút: 870`,
      hints: [
        "Phần đầu là dinh * (1 + tang); phần sau là doc_them * phut.",
        "Dùng round() để tránh số thập phân do phép nhân với 1,2.",
      ],
    },
    {
      type: "chart",
      title: "Mở rộng càng chậm, đệm cần giữ càng dày",
      caption:
        "Số liệu minh hoạ, không phải của hệ thống nào. Đường cong lên là mức cần giữ theo công thức; đường ngang là cách 'gấp đôi trung bình' (trung bình giả định 100). Chỉ khi mở rộng gần như tức thời thì cách gấp đôi mới có thể đủ.",
      kind: "line",
      xLabel: "Thời gian mở rộng (phút)",
      yLabel: "Mức cần giữ (yêu cầu mỗi giây)",
      x: { from: 0, to: 60, step: 5 },
      params: [
        { id: "dinh", label: "Đỉnh đã quan sát", min: 300, max: 1000, step: 50, value: 700, unit: "req/s" },
        { id: "doc", label: "Tải tăng thêm mỗi phút khi chờ", min: 5, max: 30, step: 5, value: 15, unit: "req/s" },
      ],
      series: [
        { label: "Mức cần giữ theo công thức", expr: "dinh*1.2+doc*x" },
        { label: "Gấp đôi trung bình", expr: "200" },
      ],
    },
  ],

  "rui-ro-tap-trung-khi-mot-phan-chi-phoi": [
    {
      type: "exercise",
      language: "python",
      title: "Đo tỷ trọng thay vì đếm số lượng",
      task: "Có sáu dịch vụ trong hoá đơn (số tiền minh hoạ) và một bảng cho biết ai sửa được từng thành phần. Hoàn thành hai phép đo: hai dòng lớn nhất chiếm bao nhiêu phần trăm hoá đơn (xếp từ lớn tới nhỏ), và những thành phần chỉ có đúng một người sửa được.",
      starter: `hoa_don = {"Cơ sở dữ liệu": 420, "Tính toán": 310, "Lưu trữ": 90, "Mạng": 60, "Giám sát": 70, "Khác": 50}
nguoi_sua = {
    "thanh toán": ["An"],
    "đơn hàng": ["An", "Bình"],
    "báo cáo": ["Chi"],
    "đăng nhập": ["Bình", "Chi", "Dũng"],
}

tong = sum(hoa_don.values())
xep = sorted(hoa_don.values())  # TODO: xếp từ lớn tới nhỏ
hai_dau = sum(xep[:2])
ty_trong = hai_dau * 100 // tong
print(f"Số dịch vụ: {len(hoa_don)}")
print(f"Hai dòng đầu chiếm: {ty_trong}%")
print("Tập trung" if ty_trong > 50 else "Phân tán")

for ten, ds in nguoi_sua.items():
    if len(ds) == 0:  # TODO: chỉ in thành phần có đúng một người sửa được
        print(f"Một người duy nhất: {ten} ({ds[0]})")
`,
      solution: `hoa_don = {"Cơ sở dữ liệu": 420, "Tính toán": 310, "Lưu trữ": 90, "Mạng": 60, "Giám sát": 70, "Khác": 50}
nguoi_sua = {
    "thanh toán": ["An"],
    "đơn hàng": ["An", "Bình"],
    "báo cáo": ["Chi"],
    "đăng nhập": ["Bình", "Chi", "Dũng"],
}

tong = sum(hoa_don.values())
xep = sorted(hoa_don.values(), reverse=True)
hai_dau = sum(xep[:2])
ty_trong = hai_dau * 100 // tong
print(f"Số dịch vụ: {len(hoa_don)}")
print(f"Hai dòng đầu chiếm: {ty_trong}%")
print("Tập trung" if ty_trong > 50 else "Phân tán")

for ten, ds in nguoi_sua.items():
    if len(ds) == 1:
        print(f"Một người duy nhất: {ten} ({ds[0]})")
`,
      expectedOutput: `Số dịch vụ: 6
Hai dòng đầu chiếm: 73%
Tập trung
Một người duy nhất: thanh toán (An)
Một người duy nhất: báo cáo (Chi)`,
      hints: [
        "sorted(..., reverse=True) xếp từ lớn tới nhỏ.",
        "Điều kiện cho tập trung hiểu biết là danh sách chỉ có đúng một tên.",
      ],
    },
    {
      type: "feynman",
      title: "Ba kiểu tập trung, ba chỗ cần nhìn",
      intro:
        "Hãy nghĩ tới một quán ăn nhỏ. Quán bán mười món nhưng bảy phần mười doanh thu đến từ một món. Cả quán chỉ có một đầu bếp biết nấu món ấy. Và một nhà cung cấp duy nhất giao nước dùng. Cùng là tập trung, nhưng mỗi loại hiện ra ở một chỗ khác.",
      columns: ["Loại tập trung", "Giống như ở quán", "Nhìn thấy ở đâu"],
      rows: [
        ["Chi phí", "Bảy phần mười tiền nguyên liệu dồn vào một món", "Dòng đầu của hoá đơn, ai mở cũng thấy"],
        ["Sự cố", "Một cái bếp ga hỏng gây phần lớn lần phải đóng cửa", "Lịch sử sự cố, nếu có ai cộng lại theo thành phần"],
        ["Hiểu biết", "Chỉ một đầu bếp biết công thức", "Gần như không hiện ra, tới khi người đó nghỉ phép"],
      ],
      oneLiner: "Đo tỷ trọng của hai dòng đầu, không đếm số dòng, và đo riêng cho chi phí, sự cố và hiểu biết.",
    },
  ],

  "quan-tri-rui-ro-nha-cung-cap-dich-vu": [
    {
      type: "scenario",
      title: "Nhà cung cấp báo đổi giá sau 90 ngày",
      start: "tin",
      nodes: {
        tin: {
          text: "Nhà cung cấp hạ tầng chính của bạn báo sẽ tăng giá khoảng 30% sau 90 ngày. Qua nhiều năm, đội đã dùng sáu dịch vụ riêng của họ mà không ai tính tổng. Bước đầu tiên của bạn là gì?",
          choices: [
            { label: "Ước lượng thời gian chuyển đi rồi đặt cạnh mốc 90 ngày", next: "uoc" },
            { label: "Chấp nhận giá mới vì chuyển đi thì dù sao cũng đắt hơn", next: "chapnhan" },
            { label: "Ra lệnh chuyển toàn bộ sang nhà cung cấp khác ngay lập tức", next: "ngay" },
          ],
        },
        chapnhan: {
          text: "Không ai hỏi giá có thể thương lượng không. Sang năm sau nhà cung cấp tăng giá thêm một lần nữa, và bạn nhận ra mình đã mất sức mặc cả từ lần đầu vì chưa bao giờ đo thời gian chuyển đi.",
          ending: "bad",
        },
        ngay: {
          text: "Đội dồn mọi sức cho việc chuyển đi trong 90 ngày. Hai dịch vụ riêng không có bản thay thế tương đương nên phải viết lại từ đầu, và một lần chuyển dữ liệu vội gây gián đoạn hai ngày với khách hàng.",
          ending: "bad",
        },
        uoc: {
          text: "Ước lượng cho thấy chuyển hết mất khoảng chín tháng, nhiều gấp ba lần thời hạn thông báo. Giờ bạn đã biết sức mặc cả của mình là bao nhiêu. Bạn đàm phán thế nào?",
          choices: [
            { label: "Xin giữ giá cũ một năm, song song dựng đường chuyển hai dịch vụ", next: "dampha" },
            { label: "Đàm phán nhưng không động tay vào việc chuyển đi", next: "khongLamGi" },
            { label: "Doạ sẽ chuyển đi nếu họ không giữ giá cũ", next: "doa" },
          ],
        },
        khongLamGi: {
          text: "Nhà cung cấp biết đội không có lối ra nào đủ nhanh nên chỉ giảm nhẹ. Chín tháng sau thời gian chuyển đi vẫn là chín tháng, và lần tăng giá kế tiếp gặp đúng thế yếu cũ.",
          ending: "bad",
        },
        doa: {
          text: "Nhà cung cấp tự tính được rằng chuyển đi mất cả năm nên không lung lay. Lời doạ thành chuyện đùa và bạn mất luôn thiện chí cho những lần thương lượng sau.",
          ending: "bad",
        },
        dampha: {
          text: "Nhà cung cấp đồng ý giữ giá một năm đổi lấy cam kết dài hơn trên phần ổn định, vì họ thấy đội đã có đường chuyển thật. Trong lúc đó một kỹ sư đề xuất dùng thêm một dịch vụ riêng tiện hơn. Bạn trả lời thế nào?",
          choices: [
            { label: "Cho dùng, nhưng ghi lại cả chi phí chuyển đi ước tính của nó", next: "ghi" },
            { label: "Cấm mọi dịch vụ riêng của nhà cung cấp từ giờ trở đi", next: "cam" },
            { label: "Cho dùng, vì nó tiện và tổng chi phí thấp hơn tự dựng", next: "khongGhi" },
          ],
        },
        cam: {
          text: "Đội phải tự dựng những thứ mà mua sẽ rẻ hơn. Tiến độ chậm đi một quý, và các kỹ sư lách quy tắc bằng cách dùng dịch vụ riêng ở những chỗ không ai kiểm tra.",
          ending: "bad",
        },
        khongGhi: {
          text: "Mỗi quyết định riêng lẻ đều hợp lý, nhưng không ai ghi lại tổng của chúng. Hai năm sau thời gian chuyển đi lại quay về mười lăm tháng và sức mặc cả biến mất lần nữa.",
          ending: "bad",
        },
        ghi: {
          text: "Dịch vụ mới được dùng với một dòng trong sổ: chi phí chuyển đi ước tính thêm hai tuần. Thời gian chuyển đi được ước lượng lại mỗi quý nên bạn thấy sức mặc cả thay đổi và chủ động chọn nơi trả giá cho tính tiện lợi.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Thời gian chuyển đi lớn dần so với thời hạn thông báo",
      caption:
        "Số liệu minh hoạ: mỗi dịch vụ riêng cộng thêm một số tháng chuyển đi do bạn chỉnh. Khi đường thời gian chuyển đi vượt đường thời hạn thông báo, bạn không còn đủ thời gian để nói không với điều kiện mới.",
      kind: "line",
      xLabel: "Số dịch vụ riêng của nhà cung cấp đang dùng",
      yLabel: "Tháng",
      x: { from: 0, to: 40, step: 5 },
      params: [
        { id: "thang", label: "Tháng cộng thêm cho mỗi dịch vụ riêng", min: 0.1, max: 0.6, step: 0.1, value: 0.3, unit: "tháng" },
        { id: "bao", label: "Thời hạn nhà cung cấp báo trước", min: 1, max: 6, step: 1, value: 3, unit: "tháng" },
      ],
      series: [
        { label: "Thời gian chuyển đi", expr: "1+x*thang" },
        { label: "Thời hạn thông báo", expr: "bao" },
      ],
    },
  ],

  "cau-truc-so-huu-ha-tang": [
    {
      type: "exercise",
      language: "python",
      title: "Cam kết bao nhiêu thì vừa",
      task: "Nhu cầu 12 tháng (đơn vị dung lượng, minh hoạ) được cho sẵn. Cam kết có giá 0,6 mỗi đơn vị mỗi tháng và phải trả dù không dùng; phần vượt cam kết trả theo nhu cầu với giá 1,0. Hoàn thành hàm tính tổng chi cho một mức cam kết rồi so sánh ba mức và tìm mức rẻ nhất trong các mức 0, 10, ... 100.",
      starter: `nhu_cau = [60, 60, 62, 65, 70, 80, 95, 90, 75, 65, 60, 60]
GIA_CAM_KET = 0.6
GIA_THEO_NHU_CAU = 1.0

def tong_chi(cam_ket):
    # TODO: trả cam_ket mỗi tháng (kể cả khi không dùng hết) + phần vượt theo nhu cầu
    return sum(cam_ket * GIA_CAM_KET for d in nhu_cau)

print(f"Toàn bộ theo nhu cầu: {tong_chi(0):.0f}")
print(f"Cam kết 60: {tong_chi(60):.0f}")
print(f"Cam kết 90: {tong_chi(90):.0f}")

tot_nhat = min(range(0, 101, 10), key=tong_chi)
print(f"Mức rẻ nhất: {tot_nhat} ({tong_chi(tot_nhat):.0f})")
`,
      solution: `nhu_cau = [60, 60, 62, 65, 70, 80, 95, 90, 75, 65, 60, 60]
GIA_CAM_KET = 0.6
GIA_THEO_NHU_CAU = 1.0

def tong_chi(cam_ket):
    return sum(cam_ket * GIA_CAM_KET + max(d - cam_ket, 0) * GIA_THEO_NHU_CAU for d in nhu_cau)

print(f"Toàn bộ theo nhu cầu: {tong_chi(0):.0f}")
print(f"Cam kết 60: {tong_chi(60):.0f}")
print(f"Cam kết 90: {tong_chi(90):.0f}")

tot_nhat = min(range(0, 101, 10), key=tong_chi)
print(f"Mức rẻ nhất: {tot_nhat} ({tong_chi(tot_nhat):.0f})")
`,
      expectedOutput: `Toàn bộ theo nhu cầu: 842
Cam kết 60: 554
Cam kết 90: 653
Mức rẻ nhất: 60 (554)`,
      hints: [
        "Mỗi tháng trả cam_ket * GIA_CAM_KET, kể cả khi nhu cầu thấp hơn.",
        "Phần vượt là max(d - cam_ket, 0), tính theo GIA_THEO_NHU_CAU.",
      ],
    },
    {
      type: "chart",
      title: "Cam kết vượt phần nền thì tiết kiệm biến thành lãng phí",
      caption:
        "Số liệu minh hoạ: đơn vị chi phí tương đối. Kéo mức nền thật và tỷ giá cam kết, rồi để ý điểm thấp nhất của đường: nó nằm đúng ở phần nền ổn định. Bên phải điểm đó bạn đang trả cho dung lượng chưa ai dùng.",
      kind: "line",
      xLabel: "Mức cam kết (đơn vị dung lượng)",
      yLabel: "Tổng chi (đơn vị tương đối)",
      x: { from: 0, to: 100, step: 10 },
      params: [
        { id: "nen", label: "Phần nền thật sự ổn định", min: 20, max: 90, step: 10, value: 60, unit: "đơn vị" },
        { id: "r", label: "Giá cam kết so với giá theo nhu cầu", min: 0.4, max: 0.9, step: 0.1, value: 0.6 },
      ],
      series: [
        { label: "Cam kết kết hợp theo nhu cầu", expr: "x*r+max(nen-x,0)" },
        { label: "Toàn bộ theo nhu cầu", expr: "nen" },
      ],
    },
  ],

  "tong-ket-ky-su-truong-van-hanh": [
    {
      type: "scenario",
      title: "Chỉ thị cắt 15% hạ tầng",
      start: "chithi",
      nodes: {
        chithi: {
          text: "Giám đốc tài chính đề nghị cắt 15% chi phí hạ tầng vì hoá đơn đã xuất hiện trong cuộc họp lãnh đạo. Ba đội liên quan đều làm đúng việc của mình nhưng chưa ai nhìn toàn cảnh. Bạn đề xuất gì?",
          choices: [
            { label: "Cắt đều 15% mỗi nhóm để công bằng và nhanh", next: "cat" },
            { label: "Tách chi phí theo nhóm và đơn vị việc, rồi đưa ba phương án", next: "tach" },
            { label: "Từ chối cắt vì hệ thống đang ở mức an toàn", next: "tuchoi" },
          ],
        },
        cat: {
          text: "Cắt đều lấy đi cả những khoản không ai đo: dung lượng dự phòng, tần suất sao lưu, thời gian kiểm thử. Ba tháng sau đỉnh tải làm sập hệ thống, và việc khôi phục tốn hơn khoản đã tiết kiệm.",
          ending: "bad",
        },
        tuchoi: {
          text: "Không có con số nào đi kèm, nên lời từ chối nghe như bảo vệ địa bàn. Ban lãnh đạo giao việc cắt cho một nhóm bên ngoài, và họ cắt theo hoá đơn mà không hiểu hệ thống.",
          ending: "bad",
        },
        tach: {
          text: "Trong một ngày bạn có chi phí theo nhóm và theo đơn vị việc, cùng ba phương án, mỗi phương án nêu rõ cái giá. Người duyệt chọn phương án cắt thẳng vào dung lượng dự phòng và tần suất sao lưu cho nhanh. Bạn làm gì?",
          choices: [
            { label: "Ghi bằng số hệ thống chịu được tới đâu sau khi cắt", next: "so" },
            { label: "Làm theo, vì quyết định đã được người có thẩm quyền chọn", next: "imlang" },
            { label: "Tự giữ lại phần dự phòng và không báo cho ai", next: "giuRiengg" },
          ],
        },
        imlang: {
          text: "Quyết định được thi hành đúng như yêu cầu, và không ai hiểu mình đang chấp nhận rủi ro gì. Khi sự cố đến, câu hỏi 'sao không ai cảnh báo' đổ lên người vận hành.",
          ending: "bad",
        },
        giuRiengg: {
          text: "Ba tháng sau đối chiếu chi phí thấy khoản bị giữ lại, và người duyệt mất niềm tin vào mọi con số bạn đưa ra. Lần sau họ không mời bạn vào cuộc trao đổi ngân sách.",
          ending: "bad",
        },
        so: {
          text: "Bạn gửi một trang: sau khi cắt, hệ thống chịu được mức tải cao nhất ghi nhận nhưng không chịu nổi gấp rưỡi. Người duyệt nhìn thấy rủi ro bằng số, giữ lại một phần dự phòng và cắt phần khác. Lần sau họ mời bạn vào cuộc họp ngân sách từ đầu.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Khoảng trống giữa ba nhóm",
      intro:
        "Hãy nghĩ tới một toà nhà văn phòng có ba bộ phận: người lắp điện, người thuê tầng, và kế toán nhận hoá đơn điện. Điện tăng gấp đôi mà ba bên đều làm đúng việc của mình. Câu hỏi 'sao tốn vậy' nằm ở giữa và không thuộc về ai.",
      columns: ["Nhóm", "Thấy gì", "Không thấy gì"],
      rows: [
        ["Đội hạ tầng", "Cấp thứ được yêu cầu", "Vì sao lượng cầu lại tăng"],
        ["Đội sản phẩm", "Tính năng dùng thứ được cấp", "Hoá đơn của phần mình đang dùng"],
        ["Bộ phận tài chính", "Hoá đơn tổng", "Hoá đơn nghĩa là gì về mặt kỹ thuật"],
      ],
      oneLiner: "Ba nhóm làm đúng việc của mình vẫn để lọt câu hỏi 'sao tốn vậy', và vai trò kỹ sư trưởng là người trả lời nó.",
    },
  ],

  // ── Hoạch định dung lượng ───────────────────────────────────────────────
  "hoach-dinh-dung-luong-la-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Tài nguyên chật nhất và hạn của nó",
      task: "Hệ thống có bốn tài nguyên với mức dùng hiện tại và tốc độ tăng mỗi ngày (điểm phần trăm, số minh hoạ). Đừng lấy trung bình: với mỗi tài nguyên tính số ngày còn lại tới 100% từ chính mức dùng của nó, xếp từ gần hạn nhất và in ra hạn gần nhất.",
      starter: `tai_nguyen = {
    "bộ xử lý": (30, 0.2),
    "kết nối cơ sở dữ liệu": (90, 0.5),
    "đĩa": (55, 0.3),
    "bộ nhớ": (62, 0.4),
}

trung_binh = sum(m for m, _ in tai_nguyen.values()) / len(tai_nguyen)
print(f"Mức trung bình: {trung_binh:.0f}%")

con_lai = []
for ten, (muc, tang) in tai_nguyen.items():
    ngay = round((100 - trung_binh) / tang)  # TODO: dùng mức của chính tài nguyên
    con_lai.append((ngay, ten))

con_lai.sort()
for ngay, ten in con_lai:
    print(f"{ten}: còn {ngay} ngày")
print(f"Hạn gần nhất: {con_lai[0][1]}")
`,
      solution: `tai_nguyen = {
    "bộ xử lý": (30, 0.2),
    "kết nối cơ sở dữ liệu": (90, 0.5),
    "đĩa": (55, 0.3),
    "bộ nhớ": (62, 0.4),
}

trung_binh = sum(m for m, _ in tai_nguyen.values()) / len(tai_nguyen)
print(f"Mức trung bình: {trung_binh:.0f}%")

con_lai = []
for ten, (muc, tang) in tai_nguyen.items():
    ngay = round((100 - muc) / tang)
    con_lai.append((ngay, ten))

con_lai.sort()
for ngay, ten in con_lai:
    print(f"{ten}: còn {ngay} ngày")
print(f"Hạn gần nhất: {con_lai[0][1]}")
`,
      expectedOutput: `Mức trung bình: 59%
kết nối cơ sở dữ liệu: còn 20 ngày
bộ nhớ: còn 95 ngày
đĩa: còn 150 ngày
bộ xử lý: còn 350 ngày
Hạn gần nhất: kết nối cơ sở dữ liệu`,
      hints: [
        "Số ngày còn lại là (100 trừ mức dùng của tài nguyên đó) chia cho tốc độ tăng mỗi ngày.",
        "Biến `muc` đã có sẵn trong vòng lặp; trung_binh chỉ để so sánh và không nên dùng ở đây.",
      ],
    },
    {
      type: "feynman",
      title: "Hạn quan trọng hơn con số",
      intro:
        "Hãy nghĩ tới bình xăng của một chiếc xe tải chạy đường dài. 'Bình chứa 80 lít' là một con số. 'Còn đủ chạy hai ngày nữa trước khi phải đổ xăng' là một hạn, và hạn mới là thứ khiến tài xế xếp lịch dừng ở trạm.",
      columns: ["Tài nguyên", "Con số", "Hạn (hành động)"],
      rows: [
        ["Kết nối cơ sở dữ liệu", "Đang ở 90% mức tối đa", "Còn khoảng 20 ngày, cần đội sở hữu xếp việc tăng giới hạn"],
        ["Bộ nhớ", "Đang ở 62%", "Còn khoảng 95 ngày, đưa vào rà soát quý"],
        ["Bộ xử lý", "Đang ở 30%", "Còn rất lâu, chưa cần hành động"],
      ],
      oneLiner: "Mức trung bình che mất tài nguyên chật nhất; hãy tìm tài nguyên đó và nói nó còn bao nhiêu ngày.",
    },
  ],

  "ngan-sach-va-du-bao-dung-luong": [
    {
      type: "scenario",
      title: "Dưới kế hoạch 5,5% có phải tin tốt không",
      start: "bao",
      nodes: {
        bao: {
          text: "Báo cáo quý cho thấy dung lượng đã dùng thấp hơn kế hoạch 5,5% (94.500 so với 100.000 vCPU-giờ). Trưởng nhóm đề nghị giảm hạn mức quý sau tương ứng. Bạn làm gì?",
          choices: [
            { label: "Giảm hạn mức quý sau 5,5% vì đang dùng dưới kế hoạch", next: "giam" },
            { label: "Tách chênh lệch thành phần do lưu lượng và phần do đơn giá", next: "tach" },
            { label: "Chờ thêm một quý xem xu hướng rồi mới quyết định", next: "cho" },
          ],
        },
        giam: {
          text: "Quý sau lưu lượng quay về đúng mức kế hoạch. Vì mỗi lượt đang tốn nhiều tài nguyên hơn dự trù, hạn mức bị giảm không đủ và đỉnh tải làm cạn dung lượng giữa quý.",
          ending: "bad",
        },
        cho: {
          text: "Một quý trôi qua mà không ai biết nguyên nhân. Đơn giá tài nguyên vẫn cao hơn 5% và đến lúc lưu lượng quay về, phần chi phí tăng thêm xuất hiện cùng lúc, không còn thời gian để sửa.",
          ending: "bad",
        },
        tach: {
          text: "Chênh lệch do lưu lượng: (900 − 1.000) × 100 = −10.000. Chênh lệch do đơn giá: (105 − 100) × 900 = +4.500. Hai phần cộng lại đúng −5.500. Phần đơn giá là phần đáng lo, và nó thuộc về ai?",
          choices: [
            { label: "Giao đội sở hữu dịch vụ, hỏi vì sao mỗi lượt tốn 105 chứ không 100", next: "dich" },
            { label: "Giao đội sản phẩm, vì lưu lượng thấp mới là chuyện chính", next: "sanpham" },
            { label: "Giao bộ phận mua sắm đàm phán lại đơn giá với nhà cung cấp", next: "muasam" },
          ],
        },
        sanpham: {
          text: "Đội sản phẩm chỉ ra được vì sao lưu lượng thấp, nhưng phần đơn giá nằm trong mã: một truy vấn chậm đi hoặc bộ nhớ đệm hết tác dụng. Không ai xem phần đó, và nó lớn dần.",
          ending: "bad",
        },
        muasam: {
          text: "Đơn giá ở đây là vCPU-giờ cho mỗi nghìn lượt, đo hiệu quả của mã chứ không phải giá thuê máy. Bộ phận mua sắm không có gì để đàm phán, và hai tuần trôi qua chỉ để xác nhận điều đó.",
          ending: "bad",
        },
        dich: {
          text: "Đội dịch vụ tìm ra một truy vấn mới thêm vào ở bản phát hành gần đây. Sửa nó đưa đơn giá về 100, hạn mức quý sau giữ nguyên cho lưu lượng quay về, và báo cáo kế tiếp ghi rõ cả hai nguyên nhân.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một vòng điều khiển: dự báo, thực tế, chênh lệch, điều chỉnh",
      steps: [
        {
          label: "Dự báo",
          detail:
            "Đặt mốc: 1.000 lượt mỗi giây, mỗi nghìn lượt tốn 100 vCPU-giờ, tổng 100.000 vCPU-giờ cho quý. Dựng thêm ba kịch bản cơ sở, tốt nhất, xấu nhất, nhớ rằng với dung lượng kịch bản xấu nhất là tải nhiều hơn.",
        },
        {
          label: "Thực tế",
          detail:
            "Đo cùng đơn vị với dự báo: thực tế 900 lượt mỗi giây và 105 vCPU-giờ mỗi nghìn lượt, tổng 94.500. Nếu đơn vị đo khác dự báo thì mọi bước sau vô nghĩa.",
        },
        {
          label: "Chênh lệch",
          detail:
            "−5.500 một mình không nói gì. Tách ra: −10.000 do lưu lượng và +4.500 do đơn giá. Cộng lại đúng bằng tổng chênh lệch, và mỗi phần dẫn tới một hành động khác nhau.",
        },
        {
          label: "Điều chỉnh",
          detail:
            "Phần đơn giá giao cho đội dịch vụ tìm nguyên nhân trong mã. Phần lưu lượng xem lại dự báo hoặc kênh vào. Hạn mức quý sau chỉnh theo lý do thật, không theo con số tổng.",
        },
      ],
    },
  ],

  "doc-bieu-do-chi-so-tin-hieu-va-nhieu": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản nháp đọc biểu đồ của AI",
      task: "Một trợ lý AI viết nhận xét sau khi xem biểu đồ vận hành của tuần vừa qua. Bấm vào những câu có cách đọc biểu đồ sai hoặc vội vàng, rồi nộp. Câu nào đúng thì để nguyên.",
      segments: [
        {
          text: "Độ trễ trung bình tăng ba ngày liên tiếp từ thứ ba đến thứ năm, vậy hệ thống đang xấu dần và nên mở rộng ngay.",
          error: "Ba điểm cùng chiều là chuyện thường của ngẫu nhiên và gần như không mang thông tin. Cần biết dao động nền trước khi gọi đó là xu hướng.",
        },
        {
          text: "Tỷ lệ lỗi tăng vào thứ ba, ngay sau bản phát hành lúc mười giờ, nên bản phát hành đó cần được kiểm tra trước.",
        },
        {
          text: "Lưu lượng chủ nhật thấp hơn thứ sáu 40%, cho thấy kênh vào đang gặp sự cố.",
          error: "Phần lớn chỉ số có chu kỳ tuần. Phải so với chủ nhật tuần trước, không so với ngày hôm trước.",
        },
        {
          text: "Dao động nền của độ trễ khoảng 8 mili giây, nên mức tăng 5 mili giây hôm qua nằm trong dao động bình thường.",
        },
        {
          text: "Đội can thiệp vào ngày độ trễ tệ nhất tuần và hôm sau nó tốt hơn, vậy việc can thiệp rõ ràng đã có hiệu quả.",
          error: "Giá trị cực đoan vốn hiếm nên ngày hôm sau gần như luôn tốt hơn kể cả khi không làm gì (hồi quy về trung bình). Không thể kết luận hiệu quả từ một điểm.",
        },
        {
          text: "Biểu đồ độ sẵn sàng có trục dọc bắt đầu từ 95%, nên biến động nửa điểm trông rất lớn; cần đọc nhãn trục trước khi kết luận.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Ba cái bẫy khi đọc một biểu đồ",
      intro:
        "Hãy nghĩ tới việc nhìn mặt biển từ bờ. Sóng lên xuống liên tục, một vài đợt sóng cao liên tiếp không có nghĩa là thuỷ triều đang lên. Bạn chỉ biết điều đó khi biết sóng bình thường cao bao nhiêu và khi nhìn đủ lâu.",
      columns: ["Hiện tượng", "Trông như", "Thực ra"],
      rows: [
        ["Ba điểm cùng chiều", "Một xu hướng đang hình thành", "Ngẫu nhiên tạo ra chuỗi ngắn như thế rất thường"],
        ["Thứ hai khác chủ nhật", "Một sự cố mới", "Chu kỳ tuần, phải so cùng kỳ"],
        ["Ngày tệ nhất rồi tốt lên", "Can thiệp có hiệu quả", "Hồi quy về trung bình, vì giá trị cực đoan hiếm"],
      ],
      oneLiner: "Biết dao động nền, so cùng kỳ, đánh dấu các mốc triển khai, rồi mới tin vào điều mắt thấy.",
    },
  ],

  "ngan-sach-tai-nguyen-va-nguong-can-thiep": [
    {
      type: "exercise",
      language: "python",
      title: "Ngưỡng riêng cho từng tài nguyên",
      task: "Trần an toàn là 90%. Mỗi tài nguyên tăng 0,5 điểm phần trăm mỗi ngày (số minh hoạ) nhưng thời gian chuẩn bị khác nhau. Tính ngưỡng can thiệp của từng tài nguyên bằng trần trừ phần tải sẽ tăng thêm trong thời gian chuẩn bị, rồi xem tài nguyên nào đã vượt ngưỡng của chính nó.",
      starter: `TRAN = 90
TANG_MOI_NGAY = 0.5

tai_nguyen = [
    # (tên, ngày chuẩn bị, mức dùng hiện tại %)
    ("máy chủ", 1, 70),
    ("kết nối cơ sở dữ liệu", 14, 78),
    ("thiết bị đặt mua", 56, 66),
]

for ten, ngay, muc in tai_nguyen:
    nguong = 80.0  # TODO: trần trừ phần tải tăng thêm trong thời gian chuẩn bị
    trang_thai = "CẦN CAN THIỆP" if muc > nguong else "ổn"
    print(f"{ten}: ngưỡng {nguong:.1f}%, đang {muc}% -> {trang_thai}")
`,
      solution: `TRAN = 90
TANG_MOI_NGAY = 0.5

tai_nguyen = [
    # (tên, ngày chuẩn bị, mức dùng hiện tại %)
    ("máy chủ", 1, 70),
    ("kết nối cơ sở dữ liệu", 14, 78),
    ("thiết bị đặt mua", 56, 66),
]

for ten, ngay, muc in tai_nguyen:
    nguong = TRAN - TANG_MOI_NGAY * ngay
    trang_thai = "CẦN CAN THIỆP" if muc > nguong else "ổn"
    print(f"{ten}: ngưỡng {nguong:.1f}%, đang {muc}% -> {trang_thai}")
`,
      expectedOutput: `máy chủ: ngưỡng 89.5%, đang 70% -> ổn
kết nối cơ sở dữ liệu: ngưỡng 83.0%, đang 78% -> ổn
thiết bị đặt mua: ngưỡng 62.0%, đang 66% -> CẦN CAN THIỆP`,
      hints: [
        "Phần tải tăng thêm trong lúc chuẩn bị là TANG_MOI_NGAY nhân số ngày chuẩn bị.",
        "Ngưỡng là TRAN trừ phần tăng thêm đó.",
      ],
    },
    {
      type: "chart",
      title: "Chuẩn bị càng lâu, ngưỡng càng phải thấp",
      caption:
        "Số liệu minh hoạ. Kéo tốc độ tăng của tải và trần an toàn để thấy ngưỡng can thiệp dịch xuống thế nào khi thời gian chuẩn bị dài ra: tài nguyên thêm trong vài phút và tài nguyên phải đặt mua nhiều tuần không thể dùng chung một con số.",
      kind: "line",
      xLabel: "Thời gian chuẩn bị (ngày)",
      yLabel: "Ngưỡng can thiệp (% mức dùng)",
      x: { from: 0, to: 60, step: 5 },
      params: [
        { id: "tang", label: "Tải tăng mỗi ngày", min: 0.1, max: 1, step: 0.1, value: 0.5, unit: "điểm %" },
        { id: "tran", label: "Trần an toàn", min: 80, max: 100, step: 5, value: 90, unit: "%" },
      ],
      series: [{ label: "Ngưỡng can thiệp", expr: "tran-tang*x" }],
    },
  ],
};
