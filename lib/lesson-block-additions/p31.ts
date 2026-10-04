import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 31. Một người viết cho một tệp.
export const P31_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "cong-suc-tieu-di-va-tich-lai": [
    {
      type: "exercise",
      language: "python",
      title: "Công cụ này có đáng làm không",
      task: "Một việc thủ công mất 10 phút, lặp 20 lần mỗi tháng. Viết công cụ cho nó mất 12 giờ (giả sử công cụ không tốn công duy trì). Với mỗi trường hợp việc còn tồn tại 2, 4, 12 tháng, in số giờ ròng tiết kiệm được, tức là đã trừ công làm công cụ, kèm kết luận. Mã khởi đầu quên trừ phần công sức bỏ ra.",
      starter: `phut_moi_lan = 10
lan_moi_thang = 20
gio_lam_cong_cu = 12

for thang in [2, 4, 12]:
    tiet_kiem = phut_moi_lan * lan_moi_thang * thang / 60
    ket_qua = tiet_kiem  # TODO: trừ công sức làm công cụ
    nhan = "nên tích" if ket_qua > 0 else "không nên tích"
    print(f"Sau {thang} tháng: {ket_qua:.1f} giờ -> {nhan}")
`,
      solution: `phut_moi_lan = 10
lan_moi_thang = 20
gio_lam_cong_cu = 12

for thang in [2, 4, 12]:
    tiet_kiem = phut_moi_lan * lan_moi_thang * thang / 60
    ket_qua = tiet_kiem - gio_lam_cong_cu
    nhan = "nên tích" if ket_qua > 0 else "không nên tích"
    print(f"Sau {thang} tháng: {ket_qua:.1f} giờ -> {nhan}")
`,
      expectedOutput: "Sau 2 tháng: -5.3 giờ -> không nên tích\nSau 4 tháng: 1.3 giờ -> nên tích\nSau 12 tháng: 28.0 giờ -> nên tích",
      hints: [
        "Số giờ tiết kiệm được là tổng thời gian làm tay trong cả khoảng, chưa phải số ròng.",
        "Số ròng = tiết kiệm được trừ gio_lam_cong_cu. Hai tháng đầu chưa đủ để hoàn vốn.",
      ],
    },
    {
      type: "chart",
      title: "Điểm hoà vốn của việc tích lại",
      caption:
        "Số liệu minh hoạ: kéo thanh trượt để thấy công cụ cần bao lâu để thắng làm tay. Nếu việc biến mất trước giao điểm của hai đường thì tích lại là lỗ, đúng với câu hỏi phân biệt của bài: việc này còn tồn tại sau sáu tháng nữa không.",
      kind: "line",
      xLabel: "Số tháng việc còn tồn tại",
      yLabel: "Công sức cộng dồn (giờ)",
      x: { from: 0, to: 24, step: 2 },
      params: [
        { id: "phut", label: "Thời gian mỗi lần làm tay", min: 5, max: 30, step: 5, value: 10, unit: "phút" },
        { id: "lan", label: "Số lần lặp mỗi tháng", min: 4, max: 40, step: 2, value: 20, unit: "lần" },
        { id: "build", label: "Công sức làm công cụ", min: 2, max: 40, step: 2, value: 12, unit: "giờ" },
        { id: "duytri", label: "Công duy trì công cụ mỗi tháng", min: 0, max: 2, step: 0.25, value: 0.25, unit: "giờ" },
      ],
      series: [
        { label: "Làm tay mãi", expr: "x*lan*phut/60" },
        { label: "Làm công cụ", expr: "build+x*duytri" },
      ],
    },
  ],

  "tu-xay-hay-mua-san": [
    {
      type: "exercise",
      language: "javascript",
      title: "So tổng chi phí ba năm, có cả phần duy trì",
      task: "Tự xây: 4 tháng, 2 kỹ sư, mỗi người-tháng quy ra 60 triệu. Mỗi năm duy trì tốn thêm 25% công dựng ban đầu. Mua sẵn: 18 triệu mỗi tháng. Tính tổng ba năm của hai phương án (số minh hoạ). Mã khởi đầu mới tính công dựng nên nhìn như tự xây rẻ hơn.",
      starter: `const dung = 4 * 2 * 60;
const duyTriMoiNam = 0; // TODO: 25% công dựng, mỗi năm
const tuXay = dung + duyTriMoiNam * 3;
const mua = 18 * 36;

console.log("Tự xây: " + tuXay + " triệu");
console.log("Mua: " + mua + " triệu");
console.log("Chọn: " + (tuXay < mua ? "tự xây" : "mua"));
`,
      solution: `const dung = 4 * 2 * 60;
const duyTriMoiNam = dung * 25 / 100;
const tuXay = dung + duyTriMoiNam * 3;
const mua = 18 * 36;

console.log("Tự xây: " + tuXay + " triệu");
console.log("Mua: " + mua + " triệu");
console.log("Chọn: " + (tuXay < mua ? "tự xây" : "mua"));
`,
      expectedOutput: "Tự xây: 840 triệu\nMua: 648 triệu\nChọn: mua",
      hints: [
        "Duy trì mỗi năm = 25% của công dựng ban đầu, không phải 25% của chi phí mua.",
        "Ba năm thì nhân phần duy trì với 3. Kết luận lật khi phần này được cộng vào.",
      ],
    },
    {
      type: "chart",
      title: "Hai đường chi phí cộng dồn: tự xây và mua",
      caption:
        "Số liệu minh hoạ, đơn vị triệu đồng. Tự xây bắt đầu cao rồi tăng chậm theo phần duy trì; mua bắt đầu từ 0 và tăng đều. Kéo tỷ lệ duy trì để thấy giao điểm dịch chuyển: đây chính là khoản làm lật kết luận trong câu hai của bài.",
      kind: "line",
      xLabel: "Năm kể từ lúc bắt đầu",
      yLabel: "Tổng chi phí cộng dồn (triệu đồng)",
      x: { from: 0, to: 5, step: 0.5 },
      params: [
        { id: "dung", label: "Công dựng ban đầu", min: 200, max: 800, step: 40, value: 480, unit: "triệu" },
        { id: "duytri", label: "Duy trì mỗi năm so với công dựng", min: 10, max: 50, step: 5, value: 25, unit: "%" },
        { id: "phi", label: "Phí mua sẵn mỗi tháng", min: 5, max: 40, step: 1, value: 18, unit: "triệu" },
      ],
      series: [
        { label: "Tự xây", expr: "dung+dung*duytri/100*x" },
        { label: "Mua sẵn", expr: "phi*12*x" },
      ],
    },
  ],

  "so-su-kien-thuc-chien": [
    {
      type: "exercise",
      language: "python",
      title: "Kiểm sổ cân cho một loạt sự kiện",
      task: "Mỗi sự kiện có danh sách số tiền ở vế Vào và vế Ra. Sổ cân khi TỔNG hai bên bằng nhau. In 'cân' hoặc 'lệch N' cho từng sự kiện, rồi in số sự kiện lệch. Mã khởi đầu chỉ so dòng đầu tiên của mỗi vế nên báo lệch oan cho sự kiện một vế Ra đối ứng hai vế Vào.",
      starter: `su_kien = [
    ("Dành bộ đệm 500", [500], [500]),
    ("Hoàn tất 200 lượt gọi", [200], [200]),
    ("Phục vụ 300 lượt, trả một nửa", [150, 150], [300]),
    ("Mượn 50 kết nối", [50], [40]),
]

so_lech = 0
for ten, vao, ra in su_kien:
    v = vao[0]  # TODO: so tổng cả vế, không chỉ dòng đầu
    r = ra[0]
    if v == r:
        print(f"{ten}: cân")
    else:
        print(f"{ten}: lệch {abs(v - r)}")
        so_lech += 1
print(f"Số sự kiện lệch: {so_lech}")
`,
      solution: `su_kien = [
    ("Dành bộ đệm 500", [500], [500]),
    ("Hoàn tất 200 lượt gọi", [200], [200]),
    ("Phục vụ 300 lượt, trả một nửa", [150, 150], [300]),
    ("Mượn 50 kết nối", [50], [40]),
]

so_lech = 0
for ten, vao, ra in su_kien:
    v = sum(vao)
    r = sum(ra)
    if v == r:
        print(f"{ten}: cân")
    else:
        print(f"{ten}: lệch {abs(v - r)}")
        so_lech += 1
print(f"Số sự kiện lệch: {so_lech}")
`,
      expectedOutput:
        "Dành bộ đệm 500: cân\nHoàn tất 200 lượt gọi: cân\nPhục vụ 300 lượt, trả một nửa: cân\nMượn 50 kết nối: lệch 10\nSố sự kiện lệch: 1",
      hints: [
        "Thứ phải cân là tổng hai bên, không phải số dòng log. Dùng sum() cho từng vế.",
        "Sự kiện mượn kết nối chỉ ghi 40 ở vế Ra trong khi vế Vào là 50: một chỗ thiếu mười, đúng hình dạng của sự kiện bị ghi thiếu.",
      ],
    },
    {
      type: "flow",
      title: "Một sự kiện đi qua sổ: phục vụ 300 lượt, mới trả được một nửa",
      steps: [
        {
          label: "Xác định các sổ bị chạm",
          detail:
            "Sự kiện chạm ba sổ: kết nối rảnh, việc đang chờ trả, lượt phục vụ. Liệt kê thiếu một sổ thì tổng ở bước cuối sẽ không cân, và đó chính là lý do để quay lại bước này.",
        },
        {
          label: "Phân nhóm từng sổ",
          detail:
            "Kết nối rảnh và việc đang chờ trả thuộc nhóm đang giữ; lượt phục vụ thuộc nhóm ghi nhận phục vụ. Nhóm quyết định sổ tăng thì nằm ở vế nào.",
        },
        {
          label: "Áp quy tắc tăng giảm",
          detail:
            "Theo quy tắc ở bài Ghi log có cấu trúc: hai sổ đang giữ tăng nên đi vào vế Vào, lượt phục vụ tăng nên đi vào vế Ra. Chưa cần nghĩ tới con số.",
        },
        {
          label: "Ghi vế Vào trước, vế Ra sau",
          detail:
            "Vào kết nối rảnh 150, Vào việc đang chờ trả 150, Ra lượt phục vụ 300. Một vế Ra đối ứng với hai vế Vào, nên số dòng log không phải thứ để đếm.",
        },
        {
          label: "Kiểm tổng hai bên",
          detail:
            "150 cộng 150 bằng 300: cân. Nếu log chỉ có dòng 150 đầu tiên thì lệch 150, dấu hiệu quen thuộc của một sự kiện chỉ ghi được một vế.",
        },
        {
          label: "Sự kiện sau không đếm lại",
          detail:
            "Khi bên gọi nhận nốt 150 kết quả còn lại, ghi Vào kết nối rảnh và Ra việc đang chờ trả. Không có dòng lượt phục vụ nào, vì nó đã được ghi ở bước trước; thêm vào là báo lưu lượng gấp đôi.",
        },
      ],
    },
  ],

  "phan-bo-chi-phi-tra-truoc": [
    {
      type: "exercise",
      language: "python",
      title: "Phân bổ theo mức dùng, tiền ra một lần",
      task: "Cam kết trả trước 120 triệu cho bốn quý (số minh hoạ). Lượng request mỗi quý là 10, 30, 40, 20 triệu. Phân bổ chi phí theo mức dùng, in phân bổ và tiền ra của từng quý, cùng phần còn chưa phân bổ sau quý 1. Mã khởi đầu đang chia đều.",
      starter: `tong = 120
yeu_cau = [10, 30, 40, 20]
tien_ra = [tong, 0, 0, 0]

phan_bo = []
for i in range(len(yeu_cau)):
    phan_bo.append(tong // len(yeu_cau))  # TODO: chia theo mức dùng của từng quý

for i, (pb, tr) in enumerate(zip(phan_bo, tien_ra), 1):
    print(f"Q{i}: phân bổ {pb}, tiền ra {tr}")
print(f"Tổng phân bổ: {sum(phan_bo)}")
print(f"Còn chưa phân bổ sau Q1: {tong - phan_bo[0]}")
`,
      solution: `tong = 120
yeu_cau = [10, 30, 40, 20]
tien_ra = [tong, 0, 0, 0]

phan_bo = []
for i in range(len(yeu_cau)):
    phan_bo.append(tong * yeu_cau[i] // sum(yeu_cau))

for i, (pb, tr) in enumerate(zip(phan_bo, tien_ra), 1):
    print(f"Q{i}: phân bổ {pb}, tiền ra {tr}")
print(f"Tổng phân bổ: {sum(phan_bo)}")
print(f"Còn chưa phân bổ sau Q1: {tong - phan_bo[0]}")
`,
      expectedOutput:
        "Q1: phân bổ 12, tiền ra 120\nQ2: phân bổ 36, tiền ra 0\nQ3: phân bổ 48, tiền ra 0\nQ4: phân bổ 24, tiền ra 0\nTổng phân bổ: 120\nCòn chưa phân bổ sau Q1: 108",
      hints: [
        "Phần của một quý = tổng nhân tỷ trọng request của quý đó trong tổng request.",
        "Cả hai cách cho cùng tổng 120. Điểm khác là chỗ đặt gánh nặng, và tiền ra thì luôn nằm hết ở Q1.",
      ],
    },
    {
      type: "flow",
      title: "Đường đi của một khoản cam kết trả trước 120 triệu",
      steps: [
        {
          label: "Ký cam kết: tiền ra một lần",
          detail:
            "Toàn bộ 120 triệu rời tài khoản ở kỳ ký. Dòng tiền chỉ thấy khoản này một lần, và các kỳ sau không có đồng nào ra nữa.",
        },
        {
          label: "Nằm ở dạng đã trả, chưa ghi nhận",
          detail:
            "Ngay sau khi ký, cả 120 triệu là khoản đã trả nhưng chưa thành chi phí của kỳ nào. Bảng chi phí kỳ này gần như chưa thấy gì, dù tiền đã đi hết.",
        },
        {
          label: "Mỗi kỳ chuyển một phần sang chi phí",
          detail:
            "Chia đều thì mỗi quý 30; theo mức dùng thì 12, 36, 48, 24 như bài tập ở trên. Dòng này làm bảng chi phí tăng mà không có đồng nào rời tài khoản trong kỳ đó.",
        },
        {
          label: "Vào chi phí mỗi request của dịch vụ",
          detail:
            "Phần phân bổ cộng vào chi phí của dịch vụ dùng cam kết, nên chi phí mỗi request của dịch vụ ấy cao lên. So nó với dịch vụ trả theo giờ mà quên điều này là so hai thứ khác loại.",
        },
        {
          label: "Phần còn lại quyết định gia hạn",
          detail:
            "Khi cân nhắc gia hạn, chỉ phần chưa phân bổ hết mới đáng đưa vào so sánh. Phần đã phân bổ là quá khứ; coi phần còn lại là tiền còn giữ được là nhầm, vì nó đã ra khỏi tài khoản từ kỳ đầu.",
        },
      ],
    },
  ],

  "synergy-ma": [
    {
      type: "scenario",
      title: "Slide hứa tiết kiệm 80 triệu mỗi tháng khi gộp hai dịch vụ",
      start: "slide",
      nodes: {
        slide: {
          text: "Quản lý gửi bạn slide: gộp dịch vụ A và B sẽ tiết kiệm 80 triệu mỗi tháng (số minh hoạ), gồm 40 từ bớt hệ thống trùng lặp và 40 từ việc mới như phân tích dữ liệu gộp. Bạn được nhờ lập con số đưa vào kế hoạch. Bạn làm gì với 80 triệu?",
          choices: [
            { label: "Giữ cả 80 triệu và ghi giả định ở phụ lục", next: "giu" },
            { label: "Chỉ tính 40 triệu do bớt trùng lặp", next: "mocthoigian" },
            { label: "Cắt mỗi khoản một nửa cho an toàn", next: "nua" },
          ],
        },
        giu: {
          text: "Quý sau kế hoạch ngân sách đã trừ sẵn 80 triệu. Phần 40 triệu từ việc mới phụ thuộc vào đội phân tích mà chưa ai giao việc, nên không bao giờ xuất hiện. Con số trên slide trở thành cam kết với tài chính, và bạn là người phải giải thích khoản hụt.",
          ending: "bad",
        },
        nua: {
          text: "Con số mới là 40 triệu, nhưng 20 triệu trong đó vẫn đến từ khoản mà không ai kiểm soát được. Bạn chỉ làm con số bé đi chứ chưa làm nó đáng tin: lợi ích do việc mới vẫn là phỏng đoán, nay mang vẻ thận trọng.",
          ending: "bad",
        },
        mocthoigian: {
          text: "Còn 40 triệu, cần mốc bắt đầu tính. Đội ước tính di trú mất 3 tháng. Bạn đặt kế hoạch thế nào?",
          choices: [
            { label: "Giữ 3 tháng, tính lợi ích từ ngày gộp xong", next: "tamthang" },
            { label: "Gấp đôi thời gian, tính lợi ích từ ngày tắt hệ thống cũ", next: "tat" },
            { label: "Rút xuống 2 tháng vì đội đã quen mã cũ", next: "tamthang" },
          ],
        },
        tamthang: {
          text: "Hệ thống mới chạy đúng hẹn, nhưng một nhóm khách chưa chuyển nên hệ thống cũ vẫn bật. Lợi ích đã được tính từ ngày gộp xong, trong khi hai hệ thống cùng đang tốn tiền: kế hoạch ghi đã tiết kiệm trong lúc hoá đơn cao hơn trước.",
          ending: "bad",
        },
        tat: {
          text: "Kế hoạch ghi 6 tháng di trú, và lợi ích chỉ bắt đầu từ ngày tắt hệ thống cũ. Còn một việc: vài khách và vài luồng chưa ai dám đụng. Bạn xử lý chúng thế nào?",
          choices: [
            { label: "Để hệ thống cũ chạy thêm, tính khi nào tới lượt", next: "treo" },
            { label: "Ghi mỗi khách còn lại, người phụ trách và ngày tắt cuối", next: "xong" },
            { label: "Coi như đã tắt trên giấy để số liệu đẹp", next: "treo" },
          ],
        },
        treo: {
          text: "Hệ thống cũ không bao giờ được tắt. Một năm sau đội nuôi cả hai hệ thống cộng thêm lớp tương thích, tệ hơn điểm xuất phát, và con số 40 triệu chưa tiết kiệm được đồng nào.",
          ending: "bad",
        },
        xong: {
          text: "Kế hoạch có con số nhỏ hơn slide, nhưng mỗi dòng đều kiểm được và có ngày. Sau 7 tháng hệ thống cũ được tắt thật; khoản tiết kiệm thấp hơn lời hứa ban đầu nhưng là khoản có thật, tính từ ngày tắt.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Slide so với thực tế sau khi cắt bớt lạc quan",
      caption:
        "Số liệu minh hoạ cho một thương vụ giả định, đơn vị triệu đồng mỗi tháng. Cột thứ hai cho thấy phần lợi ích do làm được việc mới biến mất và hai khoản chi ngược chiều xuất hiện, những thứ không bao giờ có mặt trên slide.",
      kind: "bar",
      yLabel: "Triệu đồng mỗi tháng",
      seriesLabels: ["Trên slide", "Sau khi cắt bớt lạc quan"],
      data: [
        { label: "Bớt trùng lặp", values: [40, 34] },
        { label: "Làm được việc mới", values: [40, 0] },
        { label: "Duy trì lớp tương thích", values: [0, -6] },
        { label: "Nuôi hai hệ thống thêm", values: [0, -8] },
        { label: "Tổng", values: [80, 20] },
      ],
    },
  ],

  "case-tu-chi-so-den-trai-nghiem": [
    {
      type: "scenario",
      title: "Mọi biểu đồ đều xanh mà khách vẫn nói chậm",
      start: "bao",
      nodes: {
        bao: {
          text: "Bộ phận hỗ trợ báo ba khách ở cùng một tỉnh nói ứng dụng chậm khi mở màn hình đơn hàng. Bảng theo dõi phía máy chủ cho p99 ở 120ms, đường phẳng, cảnh báo im lặng. Bạn làm gì trước?",
          choices: [
            { label: "Trả lời khách rằng phía mình bình thường", next: "binhthuong" },
            { label: "Đo thời gian từ trình duyệt ở màn hình đó", next: "trinhduyet" },
            { label: "Tăng gấp đôi máy chủ cho chắc ăn", next: "tangmay" },
          ],
        },
        binhthuong: {
          text: "Khách không trả lời lại, và hai tuần sau số người mở màn hình đơn hàng ở tỉnh đó giảm rõ rệt. Biểu đồ máy chủ vẫn xanh vì nó chưa bao giờ đo thứ những người đó đang chờ.",
          ending: "bad",
        },
        tangmay: {
          text: "Hoá đơn tăng gấp đôi, p99 phía máy chủ vẫn là 120ms vì máy chủ chưa từng là chỗ chậm. Phàn nàn từ tỉnh đó không thay đổi, và đội mất một tuần mà vẫn chưa biết chậm ở đâu.",
          ending: "bad",
        },
        trinhduyet: {
          text: "Số đo từ trình duyệt cho thấy p50 ổn nhưng p95 gần 4 giây, và phần lớn thời gian nằm sau khi phản hồi đã về tới thiết bị: trình duyệt tải một tệp script lớn rồi dựng trang trên máy yếu. Bạn đọc kết quả này thế nào?",
          choices: [
            { label: "Lấy trung bình, thấy ổn và đóng yêu cầu hỗ trợ", next: "trungbinh" },
            { label: "Đọc theo phân vị và tách thời gian theo từng chặng", next: "chang" },
            { label: "Tin số đo máy chủ hơn vì nó chính xác hơn", next: "tinmay" },
          ],
        },
        trungbinh: {
          text: "Trung bình kéo vài lượt rất chậm xuống thành một con số trông ổn, nên yêu cầu bị đóng. Ba khách đó nằm đúng ở phần đuôi mà trung bình che đi, và họ gửi thêm phàn nàn vào tuần sau.",
          ending: "bad",
        },
        tinmay: {
          text: "Hai nguồn mâu thuẫn và bạn chọn nguồn mình đã quen nhìn. Đội kết luận người dùng nhầm, trong khi phàn nàn mới là thứ đang chỉ ra chỗ chưa được đo.",
          ending: "bad",
        },
        chang: {
          text: "Chặng lớn nhất là tải và dựng trang, không phải máy chủ. Bạn nhờ đội giao diện tách tệp script và đặt đo từ trình duyệt cho riêng màn hình đơn hàng, cùng cảnh báo trên p95. Một tuần sau phàn nàn từ tỉnh đó biến mất.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một lần bấm, từ tay người dùng tới mắt người dùng",
      steps: [
        {
          label: "Người dùng bấm",
          detail: "Đồng hồ của người dùng bắt đầu chạy từ đây. Không biểu đồ phía máy chủ nào biết thời điểm này tồn tại.",
        },
        {
          label: "Request đi qua mạng của họ",
          detail:
            "Mạng di động yếu hay wifi quán cà phê quyết định mất bao lâu để request tới được máy chủ. Hoàn toàn nằm ngoài tầm đo của bạn từ phía máy chủ.",
        },
        {
          label: "Máy chủ xử lý",
          detail:
            "Đây là chặng duy nhất mà p99 120ms trong bài mô tả: từ lúc nhận request tới lúc gửi xong phản hồi. Chính xác, và chỉ là một phần của cả hành trình.",
        },
        {
          label: "Phản hồi quay về qua mạng",
          detail: "Phản hồi lớn đi qua mạng yếu chậm hơn phản hồi nhỏ, nhưng máy chủ vẫn chỉ ghi lại lúc nó gửi xong.",
        },
        {
          label: "Trình duyệt tải và dựng trang",
          detail:
            "Tải script, chạy script, dựng giao diện trên thiết bị của người dùng. Máy yếu và tệp script lớn có thể ăn nhiều thời gian hơn cả chặng máy chủ cộng lại.",
        },
        {
          label: "Nhìn thấy và dùng được",
          detail:
            "Đồng hồ của người dùng dừng ở đây. Chỉ đo từ trình duyệt, đọc theo phân vị, mới thấy được toàn bộ khoảng này, nên đó là nơi cần đặt cảnh báo cho các màn hình quan trọng nhất.",
        },
      ],
    },
  ],

  "10-cong-thuc-phong-van-ky-thuat": [
    {
      type: "exercise",
      language: "python",
      title: "Chạy chuỗi từ lưu lượng xuống chi phí mỗi request",
      task: "Hệ thống nhận 8.640.000 request mỗi ngày, hệ số đỉnh 3, cache trúng 80%, mỗi node chịu 20 RPS, dự phòng cộng thêm 1 node, đơn giá 2 triệu mỗi node mỗi tháng (số minh hoạ). In RPS trung bình, RPS đỉnh, tải tới máy chủ gốc, số node, chi phí tháng và chi phí mỗi request. Mã khởi đầu quên nhân phần cache trượt.",
      starter: `import math

yeu_cau_ngay = 8_640_000
rps_tb = yeu_cau_ngay // 86_400
rps_dinh = rps_tb * 3
cache_trung = 80  # phần trăm
tai_goc = rps_dinh  # TODO: chỉ phần cache trượt mới tới máy chủ gốc
node = math.ceil(tai_goc / 20) + 1
chi_phi = node * 2

print(f"RPS trung bình: {rps_tb}")
print(f"RPS đỉnh: {rps_dinh}")
print(f"Tải tới gốc: {tai_goc}")
print(f"Số node: {node}")
print(f"Chi phí: {chi_phi} triệu/tháng")
print(f"Mỗi request: {chi_phi * 1_000_000 / (yeu_cau_ngay * 30):.2f} đồng")
`,
      solution: `import math

yeu_cau_ngay = 8_640_000
rps_tb = yeu_cau_ngay // 86_400
rps_dinh = rps_tb * 3
cache_trung = 80  # phần trăm
tai_goc = rps_dinh * (100 - cache_trung) // 100
node = math.ceil(tai_goc / 20) + 1
chi_phi = node * 2

print(f"RPS trung bình: {rps_tb}")
print(f"RPS đỉnh: {rps_dinh}")
print(f"Tải tới gốc: {tai_goc}")
print(f"Số node: {node}")
print(f"Chi phí: {chi_phi} triệu/tháng")
print(f"Mỗi request: {chi_phi * 1_000_000 / (yeu_cau_ngay * 30):.2f} đồng")
`,
      expectedOutput:
        "RPS trung bình: 100\nRPS đỉnh: 300\nTải tới gốc: 60\nSố node: 4\nChi phí: 8 triệu/tháng\nMỗi request: 0.03 đồng",
      hints: [
        "Tải tới gốc = RPS đỉnh nhân phần trượt cache, tức (100 trừ tỷ lệ trúng) phần trăm.",
        "Số node làm tròn lên rồi mới cộng dự phòng. Bỏ cache thì phải nuôi 16 node thay vì 4.",
      ],
    },
    {
      type: "chart",
      title: "Số node cần có khi cache trúng ít hay nhiều",
      caption:
        "Số liệu minh hoạ. Đường dưới là số node khi cache trúng đúng tỷ lệ ở trục ngang; đường trên là số node nếu cache bị xoá sạch sau một lần triển khai. Hai đường gần nhau khi cache trúng thấp và tách ra rất xa khi trúng cao: đó là lý do bỏ cache khỏi phép tính nhìn vẫn đúng cho tới đúng lúc tệ nhất.",
      kind: "line",
      xLabel: "Tỷ lệ cache trúng (%)",
      yLabel: "Số node triển khai (đã cộng dự phòng)",
      x: { from: 0, to: 95, step: 5 },
      params: [
        { id: "avg", label: "RPS trung bình", min: 20, max: 200, step: 10, value: 100, unit: "RPS" },
        { id: "peak", label: "Hệ số đỉnh", min: 1, max: 6, step: 1, value: 3, unit: "lần" },
        { id: "tp", label: "Thông lượng mỗi node", min: 10, max: 50, step: 5, value: 20, unit: "RPS" },
      ],
      series: [
        { label: "Cache đang trúng", expr: "ceil(avg*peak*(100-x)/(100*tp))+1" },
        { label: "Nếu cache bị xoá sạch", expr: "ceil(avg*peak/tp)+1" },
      ],
    },
  ],

  "he-thong-dang-co-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Nếu phần mượn biến mất, còn phục vụ được bao nhiêu",
      task: "Bốn nguồn dung lượng, đơn vị là yêu cầu mỗi giây (số minh hoạ). Nguồn có hạn mức thì chỉ dùng được tới hạn mức dù thuê nhiều hơn. Tính dung lượng dùng được thật, phần bị hạn mức chặn, và phần trăm còn phục vụ khi mất hết nguồn mượn. Mã khởi đầu cộng thẳng dung lượng mà bỏ qua hạn mức.",
      starter: `nguon = [
    ("Cụm tự dựng", 400, "tự có", None),
    ("Bể chung", 300, "mượn", None),
    ("API ngoài", 200, "mượn", 120),
    ("Hàng đợi thuê", 100, "mượn", None),
]

tong_danh_nghia = 0
dung_duoc = 0
tu_co = 0
for ten, don_vi, loai, han_muc in nguon:
    tong_danh_nghia += don_vi
    dung_duoc += don_vi  # TODO: bị hạn mức chặn thì chỉ tính tới hạn mức
    if loai == "tự có":
        tu_co += don_vi

print(f"Dung lượng dùng được: {dung_duoc}")
print(f"Bị hạn mức chặn mất: {tong_danh_nghia - dung_duoc}")
print(f"Mất hết phần mượn còn phục vụ: {tu_co * 100 // dung_duoc}%")
`,
      solution: `nguon = [
    ("Cụm tự dựng", 400, "tự có", None),
    ("Bể chung", 300, "mượn", None),
    ("API ngoài", 200, "mượn", 120),
    ("Hàng đợi thuê", 100, "mượn", None),
]

tong_danh_nghia = 0
dung_duoc = 0
tu_co = 0
for ten, don_vi, loai, han_muc in nguon:
    tong_danh_nghia += don_vi
    thuc = don_vi if han_muc is None else min(don_vi, han_muc)
    dung_duoc += thuc
    if loai == "tự có":
        tu_co += thuc

print(f"Dung lượng dùng được: {dung_duoc}")
print(f"Bị hạn mức chặn mất: {tong_danh_nghia - dung_duoc}")
print(f"Mất hết phần mượn còn phục vụ: {tu_co * 100 // dung_duoc}%")
`,
      expectedOutput: "Dung lượng dùng được: 920\nBị hạn mức chặn mất: 80\nMất hết phần mượn còn phục vụ: 43%",
      hints: [
        "Với mỗi nguồn, phần dùng được là min(dung lượng, hạn mức) nếu có hạn mức.",
        "Phần trăm cuối lấy phần tự có chia cho dung lượng dùng được, không chia cho dung lượng danh nghĩa.",
      ],
    },
    {
      type: "feynman",
      title: "Sở hữu, mượn và hạn mức: chuyện nhà ở",
      intro:
        "Hãy nghĩ về chỗ ở của một gia đình. Có phòng đã mua sẵn, có phòng thuê theo ngày, và có những giới hạn mà không ai để ý cho tới khi chạm vào chúng.",
      columns: ["Phần", "Giống như", "Điều cần hỏi"],
      rows: [
        ["Sở hữu", "Căn nhà đã mua, luôn ở được", "Mấy phòng? Giới hạn là một con số biết trước"],
        [
          "Mượn",
          "Thuê phòng theo ngày hoặc ở nhờ người quen",
          "Hợp đồng nói gì, và nếu họ không cho ở nữa thì còn bao nhiêu chỗ",
        ],
        [
          "Hạn mức",
          "Thang máy ghi tối đa tám người, chưa ai biết vì chưa từng đủ chín",
          "Giới hạn nào đang áp mà chưa ai từng chạm tới",
        ],
      ],
      oneLiner: "Hỏi hệ thống còn phục vụ được bao nhiêu phần trăm khi phần mượn mất hết, rồi liệt kê những hạn mức chưa ai chạm.",
    },
  ],

  "chon-cach-uoc-luong": [
    {
      type: "exercise",
      language: "javascript",
      title: "Thử gấp ba và một phần ba trên ô đầu vào quyết định",
      task: "Mô hình chi phí: 1.000 người dùng, mỗi người 30 yêu cầu mỗi ngày, 30 ngày, giá 10 USD cho mỗi 1.000 yêu cầu (số minh hoạ), ngân sách 20.000 USD mỗi tháng. Ô đầu vào chưa chắc nhất là số yêu cầu mỗi người. Thử nó ở mức gốc, gấp ba, một phần ba, rồi kết luận có đổi không. Mã khởi đầu đã có vòng lặp nhưng chưa thật sự thử ô đó.",
      starter: `function chiPhi(yeuCauMoiNguoi) {
  return Math.round(1000 * yeuCauMoiNguoi * 30 / 1000 * 10);
}

const nganSach = 20000;
const yeuCauGoc = 30;
const cacMuc = [["Cơ sở", 1], ["Gấp ba", 3], ["Một phần ba", 1 / 3]];

const ketLuan = new Set();
for (const [ten, he] of cacMuc) {
  const cp = chiPhi(yeuCauGoc); // TODO: nhân hệ số vào ô đầu vào
  const trongNganSach = cp <= nganSach;
  ketLuan.add(trongNganSach);
  console.log(ten + ": " + cp + " USD - " + (trongNganSach ? "trong ngân sách" : "vượt ngân sách"));
}
console.log(ketLuan.size > 1 ? "Kết luận: đổi theo giả định, chưa phải ước lượng, cần số thật" : "Kết luận: không đổi");
`,
      solution: `function chiPhi(yeuCauMoiNguoi) {
  return Math.round(1000 * yeuCauMoiNguoi * 30 / 1000 * 10);
}

const nganSach = 20000;
const yeuCauGoc = 30;
const cacMuc = [["Cơ sở", 1], ["Gấp ba", 3], ["Một phần ba", 1 / 3]];

const ketLuan = new Set();
for (const [ten, he] of cacMuc) {
  const cp = chiPhi(yeuCauGoc * he);
  const trongNganSach = cp <= nganSach;
  ketLuan.add(trongNganSach);
  console.log(ten + ": " + cp + " USD - " + (trongNganSach ? "trong ngân sách" : "vượt ngân sách"));
}
console.log(ketLuan.size > 1 ? "Kết luận: đổi theo giả định, chưa phải ước lượng, cần số thật" : "Kết luận: không đổi");
`,
      expectedOutput:
        "Cơ sở: 9000 USD - trong ngân sách\nGấp ba: 27000 USD - vượt ngân sách\nMột phần ba: 3000 USD - trong ngân sách\nKết luận: đổi theo giả định, chưa phải ước lượng, cần số thật",
      hints: [
        "Hệ số he phải đi vào tham số của chiPhi: chiPhi(yeuCauGoc * he).",
        "Khi các kết luận không giống nhau ở ba mức, mô hình đang phụ thuộc vào ô đoán chứ chưa phải một ước lượng.",
      ],
    },
    {
      type: "flow",
      title: "Chọn phương pháp ước lượng, theo thứ tự hỏi",
      steps: [
        {
          label: "Có thứ để chạy không",
          detail:
            "Nếu có, đo trực tiếp: chạy thật với một phần lưu lượng rồi nhân lên. Không giả định gì về hình dạng tải. Chỉ cần nhớ phép nhân lên sai khi hệ thống có nút thắt dùng chung.",
        },
        {
          label: "Có thứ tương tự đã chạy không",
          detail:
            "Nếu không có gì để chạy, tìm một thành phần gần giống, lấy chi phí thật của nó rồi chỉnh theo chênh lệch quy mô. Nhanh và rẻ, nhưng cần bước kế tiếp mới dám dùng.",
        },
        {
          label: "Nói được vì sao hai thứ giống nhau không",
          detail:
            "Phải chỉ ra được giống ở đúng khía cạnh đang xét. Hai dịch vụ cùng gọi là dịch vụ tìm kiếm có thể khác hàng trăm lần về lượng dữ liệu phải quét. Không nói được thì sang bước dựng mô hình.",
        },
        {
          label: "Dựng mô hình từ các thành phần",
          detail:
            "Cách duy nhất khi chưa có gì đo hay so. Tách thành các đại lượng nhỏ rồi nhân lên, và đánh dấu ô nào là ô đoán, vì bảng nhiều dòng tạo cảm giác chính xác kể cả khi mọi dòng nhân từ một ô đoán.",
        },
        {
          label: "Thử gấp ba và một phần ba",
          detail:
            "Đổi ô đầu vào quyết định lên gấp ba và xuống một phần ba. Kết luận không đổi thì ước lượng đủ dùng; đổi thì bạn có một phép nhân đang chờ số thật, nên đi đo.",
        },
        {
          label: "Làm tròn theo độ tin cậy, ghi giả định",
          detail:
            "Viết khoảng mười tới bốn mươi nghìn thay cho 12.847 khi đầu vào chỉ chắc trong khoảng gấp ba, kèm giả định chính, để người đọc biết con số đổi khi nào.",
        },
      ],
    },
  ],

  "chat-luong-ma-do-bang-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm chỗ giao của hay sửa và phức tạp",
      task: "Sáu tệp có số lần sửa trong 90 ngày và độ phức tạp (số minh hoạ). Chỉ tệp có CẢ HAI chỉ số vượt ngưỡng (sửa từ 15 lần, phức tạp từ 20) mới đáng nhìn kỹ. In chúng theo điểm sửa nhân phức tạp giảm dần. Mã khởi đầu lọc theo mỗi độ phức tạp.",
      starter: `tep = [
    ("billing.py", 42, 31),
    ("legacy_report.py", 1, 58),
    ("utils.py", 35, 4),
    ("checkout.py", 27, 24),
    ("export.py", 2, 40),
    ("auth.py", 18, 22),
]

ung_vien = []
for ten, so_lan_sua, phuc_tap in tep:
    if phuc_tap >= 20:  # TODO: chỉ giữ chỗ giao của hai chỉ số
        ung_vien.append((ten, so_lan_sua, phuc_tap))

ung_vien.sort(key=lambda t: t[1] * t[2], reverse=True)
for ten, sua, pt in ung_vien:
    print(f"{ten}: {sua} lần sửa x phức tạp {pt} = {sua * pt}")
`,
      solution: `tep = [
    ("billing.py", 42, 31),
    ("legacy_report.py", 1, 58),
    ("utils.py", 35, 4),
    ("checkout.py", 27, 24),
    ("export.py", 2, 40),
    ("auth.py", 18, 22),
]

ung_vien = []
for ten, so_lan_sua, phuc_tap in tep:
    if phuc_tap >= 20 and so_lan_sua >= 15:
        ung_vien.append((ten, so_lan_sua, phuc_tap))

ung_vien.sort(key=lambda t: t[1] * t[2], reverse=True)
for ten, sua, pt in ung_vien:
    print(f"{ten}: {sua} lần sửa x phức tạp {pt} = {sua * pt}")
`,
      expectedOutput:
        "billing.py: 42 lần sửa x phức tạp 31 = 1302\ncheckout.py: 27 lần sửa x phức tạp 24 = 648\nauth.py: 18 lần sửa x phức tạp 22 = 396",
      hints: [
        "Điều kiện cần cả hai vế: phức tạp từ 20 VÀ sửa từ 15 lần.",
        "legacy_report.py rất phức tạp nhưng gần như không ai đụng tới, còn utils.py sửa liên tục nhưng đơn giản: cả hai đều không gây tốn kém lớn.",
      ],
    },
    {
      type: "feynman",
      title: "Chỉ số mã giống đồng hồ trên xe máy",
      intro:
        "Đồng hồ trên xe cho bạn biết tốc độ, xăng, nhiệt độ, nhưng không cho biết xe còn đi tốt bao lâu. Chỉ số mã cũng vậy: nó đo hiện tại, còn thứ bạn quan tâm nằm ở tương lai.",
      columns: ["Chỉ số", "Giống như", "Vì sao đặt làm mục tiêu thì hỏng"],
      rows: [
        [
          "Độ phủ kiểm thử",
          "Số dấu kiểm trong sổ bảo dưỡng",
          "Kiểm thử gọi hàm mà không khẳng định gì vẫn tăng độ phủ",
        ],
        [
          "Độ phức tạp vòng lặp",
          "Số ngã rẽ trên đường đi",
          "Chia hàm thành nhiều hàm nhỏ làm con số giảm, đường đi vẫn rối",
        ],
        [
          "Số dòng mã",
          "Cân nặng hành lý",
          "Nén mã vào một dòng làm số giảm, người đọc vẫn không hiểu",
        ],
      ],
      oneLiner: "Chỉ số là công cụ để tìm chỗ đáng nhìn kỹ, không phải thước để phán xét, nên đừng biến nó thành ngưỡng chặn.",
    },
  ],

  "doi-chuan-hieu-nang-do-cho-dung": [
    {
      type: "exercise",
      language: "javascript",
      title: "Trung bình đẹp, p95 xấu, và phần đuôi nhân lên",
      task: "Có 20 lượt gọi với độ trễ (ms) như bên dưới. In trung bình, p95 theo cách xếp hạng gần nhất (phần tử thứ 19 của mảng đã sắp), và xác suất một trang gọi 10 dịch vụ, mỗi dịch vụ chậm 5% lượt, chạm ít nhất một lượt chậm. Mã khởi đầu in trung bình ở dòng p95.",
      starter: `const doTre = [85, 90, 92, 88, 95, 91, 87, 93, 89, 94, 86, 90, 92, 88, 91, 96, 89, 87, 2800, 3100];

const trungBinh = Math.round(doTre.reduce((a, b) => a + b, 0) / doTre.length);
const p95 = trungBinh; // TODO: sắp xếp rồi lấy phần tử thứ 19
const tiLeChamMoiDichVu = 0.05;
const xacSuat = Math.round(tiLeChamMoiDichVu * 100); // TODO: 10 dịch vụ cùng gọi

console.log("Trung bình: " + trungBinh + " ms");
console.log("p95: " + p95 + " ms");
console.log("Trang gọi 10 dịch vụ chạm ít nhất một lượt chậm: " + xacSuat + "%");
`,
      solution: `const doTre = [85, 90, 92, 88, 95, 91, 87, 93, 89, 94, 86, 90, 92, 88, 91, 96, 89, 87, 2800, 3100];

const trungBinh = Math.round(doTre.reduce((a, b) => a + b, 0) / doTre.length);
const daSap = [...doTre].sort((a, b) => a - b);
const p95 = daSap[Math.ceil(0.95 * daSap.length) - 1];
const tiLeChamMoiDichVu = 0.05;
const xacSuat = Math.round((1 - Math.pow(1 - tiLeChamMoiDichVu, 10)) * 100);

console.log("Trung bình: " + trungBinh + " ms");
console.log("p95: " + p95 + " ms");
console.log("Trang gọi 10 dịch vụ chạm ít nhất một lượt chậm: " + xacSuat + "%");
`,
      expectedOutput: "Trung bình: 376 ms\np95: 2800 ms\nTrang gọi 10 dịch vụ chạm ít nhất một lượt chậm: 40%",
      hints: [
        "Sắp mảng tăng dần (nhớ truyền hàm so sánh số), p95 là phần tử ở vị trí ceil(0,95 x 20) trừ 1.",
        "Xác suất ít nhất một lượt chậm = 1 trừ xác suất cả mười lượt đều nhanh, tức 1 - 0,95^10.",
      ],
    },
    {
      type: "chart",
      title: "Phần đuôi của từng dịch vụ nhân lên thành trải nghiệm của cả trang",
      caption:
        "Tính trực tiếp từ công thức 1 - (1 - p)^n, với p là tỷ lệ lượt chậm của mỗi dịch vụ. Tỷ lệ chậm mặc định 5% là số minh hoạ; kéo thanh trượt để thấy với 20 dịch vụ ngay cả 1% cũng thành khoảng một trang trong năm.",
      kind: "line",
      xLabel: "Số dịch vụ mà một trang gọi",
      yLabel: "Xác suất chạm ít nhất một lượt chậm (%)",
      x: { from: 1, to: 20, step: 1 },
      params: [{ id: "p", label: "Tỷ lệ lượt chậm mỗi dịch vụ", min: 1, max: 10, step: 1, value: 5, unit: "%" }],
      series: [
        { label: "Cả trang", expr: "100*(1-(1-p/100)^x)" },
        { label: "Một dịch vụ riêng lẻ", expr: "p" },
      ],
    },
  ],

  "no-ky-thuat-quyet-dinh-tra-cai-nao": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp nợ theo lãi phải trả, không theo độ tệ",
      task: "Năm module với mức nghiêm trọng kỹ thuật (1-10), số việc sắp làm trong quý tới, và số ngày công nợ làm mất mỗi việc (số minh hoạ). Lãi mỗi quý = số việc nhân ngày mất. In ba module đáng trả trước theo lãi. Mã khởi đầu đang xếp theo độ nghiêm trọng.",
      starter: `module = [
    ("payments", 9, 0, 3),
    ("orders", 6, 12, 2),
    ("search", 5, 8, 1),
    ("legacy_report", 10, 1, 4),
    ("auth", 4, 6, 2),
]

# TODO: xếp theo lãi (số việc x ngày mất), không theo độ nghiêm trọng
xep = sorted(module, key=lambda m: m[1], reverse=True)

for i, (ten, nghiem_trong, viec, ngay) in enumerate(xep[:3], 1):
    print(f"{i}. {ten}: {viec} việc x {ngay} ngày = {viec * ngay} ngày công mỗi quý")
`,
      solution: `module = [
    ("payments", 9, 0, 3),
    ("orders", 6, 12, 2),
    ("search", 5, 8, 1),
    ("legacy_report", 10, 1, 4),
    ("auth", 4, 6, 2),
]

xep = sorted(module, key=lambda m: m[2] * m[3], reverse=True)

for i, (ten, nghiem_trong, viec, ngay) in enumerate(xep[:3], 1):
    print(f"{i}. {ten}: {viec} việc x {ngay} ngày = {viec * ngay} ngày công mỗi quý")
`,
      expectedOutput:
        "1. orders: 12 việc x 2 ngày = 24 ngày công mỗi quý\n2. auth: 6 việc x 2 ngày = 12 ngày công mỗi quý\n3. search: 8 việc x 1 ngày = 8 ngày công mỗi quý",
      hints: [
        "Khoá sắp xếp là tích của hai cột cuối: m[2] * m[3].",
        "payments và legacy_report tệ nhất nhưng gần như không ai đụng tới trong quý, nên lãi thực tế gần bằng không.",
      ],
    },
    {
      type: "chart",
      title: "Lãi nợ kỹ thuật = số việc nhân mức cản trở",
      caption:
        "Số liệu minh hoạ. Module thứ nhất rất tệ nhưng ít việc sắp làm; module thứ hai chỉ hơi tệ nhưng có nhiều việc. Kéo thanh trượt số việc của từng module để thấy khi nào lãi của module hơi tệ vượt module tệ nhất.",
      kind: "line",
      xLabel: "Ngày công mỗi việc bị nợ làm mất",
      yLabel: "Ngày công mất mỗi quý",
      x: { from: 0, to: 5, step: 0.5 },
      params: [
        { id: "viecA", label: "Việc sắp làm ở module tệ nhất", min: 0, max: 20, step: 1, value: 1, unit: "việc" },
        { id: "viecB", label: "Việc sắp làm ở module hơi tệ", min: 0, max: 20, step: 1, value: 12, unit: "việc" },
      ],
      series: [
        { label: "Module tệ nhất, ít người đụng", expr: "x*viecA" },
        { label: "Module hơi tệ, hay phải sửa", expr: "x*viecB" },
      ],
    },
  ],

  "quy-uoc-va-kiem-tra-tu-dong": [
    {
      type: "exercise",
      language: "python",
      title: "Viết một quy tắc máy kiểm được: tên dạng snake_case",
      task: "Quy ước của nhóm: tên hàm viết thường, từ nối bằng MỘT dấu gạch dưới, không bắt đầu hay kết thúc bằng gạch dưới. Hãy viết kiểm tra, in các tên vi phạm và số tên đạt. Mã khởi đầu chỉ xem tên có viết thường hay không nên bỏ lọt tên có gạch dưới thừa.",
      starter: `import re

ten_ham = ["load_user", "LoadOrder", "calc_total", "_tmp", "parse__row", "getPrice", "fmt_v2"]

vi_pham = [t for t in ten_ham if not t.islower()]  # TODO: dùng mẫu chặt hơn

print("Vi phạm: " + ", ".join(vi_pham))
print(f"Đạt quy ước: {len(ten_ham) - len(vi_pham)}/{len(ten_ham)}")
`,
      solution: `import re

ten_ham = ["load_user", "LoadOrder", "calc_total", "_tmp", "parse__row", "getPrice", "fmt_v2"]

mau = re.compile(r"[a-z][a-z0-9]*(_[a-z0-9]+)*")
vi_pham = [t for t in ten_ham if not mau.fullmatch(t)]

print("Vi phạm: " + ", ".join(vi_pham))
print(f"Đạt quy ước: {len(ten_ham) - len(vi_pham)}/{len(ten_ham)}")
`,
      expectedOutput: "Vi phạm: LoadOrder, _tmp, parse__row, getPrice\nĐạt quy ước: 3/7",
      hints: [
        "Mẫu: một chữ thường đầu tiên, rồi các cụm gạch dưới theo sau là chữ thường hoặc số: [a-z][a-z0-9]*(_[a-z0-9]+)*.",
        "Dùng fullmatch để mẫu phải khớp cả tên, không chỉ một đoạn của nó.",
      ],
    },
    {
      type: "flow",
      title: "Một quy tắc đi từ ý tưởng tới cổng chặn",
      steps: [
        {
          label: "Chọn việc có quy tắc rõ ràng",
          detail:
            "Tên đúng quy ước viết hoa, hàm dài quá ngưỡng, khuôn mẫu bị cấm. Máy kiểm được tên có viết đúng dạng không; nó không kiểm được tên đó có mô tả đúng giá trị hay không, nên phần ấy vẫn là việc của người rà soát.",
        },
        {
          label: "Thử trên mã hiện tại và đếm báo sai",
          detail:
            "Chạy quy tắc trên kho mã và đọc ngẫu nhiên mười cảnh báo. Nếu quá nửa là báo sai thì quy tắc này sẽ dạy cả đội bỏ qua cảnh báo, kể cả cảnh báo thật.",
        },
        {
          label: "Nhiễu thì tắt hẳn",
          detail:
            "Đừng để đó rồi dặn mọi người tự lọc. Ít quy tắc mà tin được luôn tốt hơn nhiều quy tắc mà phải lọc, và thói quen bỏ qua mới là thiệt hại lâu dài.",
        },
        {
          label: "Áp cho mã mới và mã vừa sửa",
          detail:
            "Mã cũ vi phạm thì để dần dần. Sửa hết một lượt tạo ra bản thay đổi khổng lồ không ai rà soát nổi. Đừng hạ yêu cầu xuống mức mã cũ đã đạt: đó là hạ chuẩn cho cổng xanh.",
        },
        {
          label: "Chạy ở máy lập trình viên trước",
          detail:
            "Phản hồi sớm thì rẻ. Cấu hình lấy từ một tệp trong kho để mọi máy chạy giống nhau, nếu không bạn phá chính tính nhất quán mình đang xây.",
        },
        {
          label: "Chạy lại ở quy trình chung",
          detail:
            "Cùng cấu hình, cùng kết quả. Máy lập trình viên có thể bị bỏ qua; quy trình chung là cổng cuối chặn việc gộp mã.",
        },
      ],
    },
  ],

  "danh-gia-suc-khoe-mot-kho-ma": [
    {
      type: "scenario",
      title: "Một buổi chiều với kho mã lạ",
      start: "batdau",
      nodes: {
        batdau: {
          text: "Công ty đang cân nhắc tiếp nhận một kho mã từ đội khác và bạn có một buổi chiều để cho ý kiến. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Đọc kỹ thư mục lõi từ đầu tới cuối", next: "doc" },
            { label: "Cài đặt theo hướng dẫn và bấm giờ", next: "chay" },
            { label: "Hỏi trưởng nhóm cũ kho mã này tốt tới đâu", next: "hoi" },
          ],
        },
        doc: {
          text: "Bốn tiếng sau bạn hiểu rõ mã hôm nay và hoàn toàn chưa biết đội làm việc ra sao: bản thay đổi nhỏ hay lớn, có gấp rút không. Báo cáo của bạn mô tả hiện tại, trong khi người quyết định cần dự đoán tương lai.",
          ending: "bad",
        },
        hoi: {
          text: "Trưởng nhóm cũ trả lời là rất ổn và bạn ghi lại nguyên văn. Người sắp bàn giao có lý do để mô tả đẹp, nên báo cáo của bạn chỉ lặp lại điều họ muốn nghe.",
          ending: "bad",
        },
        chay: {
          text: "Cài đặt mất 40 phút và phải hỏi hai người một biến môi trường không có trong tài liệu. Bạn làm gì tiếp?",
          choices: [
            { label: "Bỏ qua, đây chỉ là chuyện cài đặt", next: "boqua" },
            { label: "Ghi lại như một chi phí rồi xem lịch sử ba tháng", next: "lichsu" },
          ],
        },
        boqua: {
          text: "Chi phí 40 phút và hai người bị hỏi sẽ lặp lại cho từng người mới và từng lần đổi máy. Báo cáo thiếu một khoản mà cả đội sẽ trả hằng tháng.",
          ending: "bad",
        },
        lichsu: {
          text: "Lịch sử cho thấy bốn bản quay lại gấp vào tối thứ sáu và cuối tuần, cả bốn đều đụng module thanh toán. Bạn làm gì tiếp?",
          choices: [
            { label: "Kết luận đội làm ẩu và đề nghị thay đội", next: "doi" },
            { label: "Mở quy trình tự động xem điều kiện chặn, rồi đọc năm bài kiểm thử ở module đó", next: "tin" },
            { label: "Nhìn độ phủ 91% và xem như ổn", next: "phu" },
          ],
        },
        doi: {
          text: "Bạn đi quá xa so với dữ liệu: quay lại gấp cho biết mã lên sản phẩm chưa được kiểm đủ và quy trình không bắt được lỗi, chưa cho biết lỗi nằm ở con người. Đề nghị thay đội làm mất đúng những người hiểu hệ thống.",
          ending: "bad",
        },
        phu: {
          text: "Độ phủ cao nhưng bốn bản quay lại vẫn xảy ra, vì phần lớn kiểm thử chỉ gọi hàm mà không khẳng định gì. Báo cáo ghi kho mã khoẻ, và tuần sau lại có thêm một bản quay lại.",
          ending: "bad",
        },
        tin: {
          text: "Quy trình tự động chỉ chặn lỗi định dạng, không chặn gì ở module thanh toán, và trong năm bài kiểm thử có hai bài không khẳng định gì. Báo cáo của bạn nêu ba bằng chứng cụ thể, kèm đề xuất bổ sung kiểm thử cho module đó trước khi tiếp nhận.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Bốn việc theo thứ tự, và mỗi việc cho biết điều gì",
      steps: [
        {
          label: "Chạy dự án lần đầu và bấm giờ",
          detail:
            "Nửa giờ là bình thường. Hai ngày kèm việc phải hỏi ba người là chi phí mỗi thành viên mới và mỗi lần đổi máy đều trả lại. Nó cho bạn biết kho mã sống nhờ tri thức trong đầu ai.",
        },
        {
          label: "Đọc lịch sử ba tháng gần nhất",
          detail:
            "Xem bản thay đổi lớn hay nhỏ, có bản quay lại gấp vào buổi tối và cuối tuần không, tệp nào bị sửa liên tục. Lịch sử cho thấy đội làm việc ra sao, và gần như không ai viết lại nó để gây ấn tượng.",
        },
        {
          label: "Xem quy trình tự động chặn gì",
          detail:
            "Tài liệu nói đội coi trọng gì; điều kiện chặn gộp mã cho thấy họ coi trọng thật gì. Khoảng cách giữa hai thứ là một tín hiệu mạnh về kho mã.",
        },
        {
          label: "Đọc năm bài kiểm thử ngẫu nhiên",
          detail:
            "Mười phút đọc năm bài cho biết nhiều hơn con số độ phủ. Một bài gọi hàm rồi không khẳng định gì vẫn làm độ phủ tăng, nên điều cần tìm là bài kiểm thử có thật sự bắt được lỗi không.",
        },
      ],
    },
  ],

  "di-tru-he-thong-cay-da-bop-nghet": [
    {
      type: "scenario",
      title: "Tám năm tuổi, đã đến lúc thay hệ thống",
      start: "batdau",
      nodes: {
        batdau: {
          text: "Đội tám người có một hệ thống đơn khối tám năm tuổi, khó thêm tính năng. Quản lý muốn thay bằng hệ thống mới. Bạn đề xuất cách nào?",
          choices: [
            { label: "Viết lại toàn bộ rồi chuyển một lần", next: "vietlai" },
            { label: "Đặt lớp trung gian ở trước, chuyển từng phần", next: "trungian" },
            { label: "Dừng tính năng mới sáu tháng để viết lại", next: "dung" },
          ],
        },
        vietlai: {
          text: "Sau năm tháng hệ thống mới mới đạt một nửa tính năng, vì hệ thống cũ vẫn nhận sửa lỗi và tính năng cho khách đang dùng. Đội đuổi theo một đích không đứng yên, và ngày chuyển được lùi thêm lần này đến lần khác.",
          ending: "bad",
        },
        dung: {
          text: "Khách chờ sáu tháng không có tính năng nào và hai khách lớn đã sang đối thủ. Hệ thống mới chưa xong, hệ thống cũ cũng chưa được sửa gì, nên đội vừa mất khách vừa mất niềm tin.",
          ending: "bad",
        },
        trungian: {
          text: "Lớp trung gian đã chạy và đang chuyển mọi yêu cầu sang hệ thống cũ. Bạn cần quyết định gì cho tiến độ của cả dự án?",
          choices: [
            { label: "Cứ chuyển dần, khi nào xong thì xong", next: "dandan" },
            { label: "Ghi ngày tắt hệ thống cũ và mốc cho từng phần", next: "phandau" },
          ],
        },
        dandan: {
          text: "Sau một năm đội chuyển được sáu mươi phần trăm và đã mệt. Phần còn lại nằm nguyên ở hệ thống cũ, và đội bảo trì cả hai: trạng thái nửa vời tệ hơn cả hai phương án ban đầu.",
          ending: "bad",
        },
        phandau: {
          text: "Có ngày kết thúc và mốc cho từng phần. Giờ cần chọn phần đầu tiên để chuyển. Bạn chọn phần nào?",
          choices: [
            { label: "Phần lớn nhất để xong sớm phần khó nhất", next: "lon" },
            { label: "Phần tra cứu sản phẩm, chỉ đọc và ít phụ thuộc", next: "ok" },
          ],
        },
        lon: {
          text: "Phần lớn nhất chạm nhiều bảng dữ liệu dùng chung. Khi nó lỗi, quay lại tức là đảo cả luồng đặt hàng, và đội chưa có kinh nghiệm quay lại nên mất ba ngày mới ổn định được.",
          ending: "bad",
        },
        ok: {
          text: "Một dòng cấu hình ở lớp trung gian đổi định tuyến phần tra cứu sang hệ thống mới, và quay lại cũng chỉ một dòng nữa. Phần đầu chạy ổn trong hai tuần, đội có quy trình để lặp lại cho từng phần, và ngày tắt hệ thống cũ giữ đội không dừng ở nửa chừng.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Cây đa bóp nghẹt qua đường dẫn /tra-cuu",
      steps: [
        {
          label: "Lớp trung gian nhận mọi yêu cầu",
          detail:
            "Yêu cầu tới /tra-cuu đi qua lớp trung gian, và ban đầu nó chuyển hết sang hệ thống cũ. Chưa có gì thay đổi với người dùng, nhưng bạn đã có một điểm điều khiển duy nhất.",
        },
        {
          label: "Xây phần đầu ở hệ thống mới",
          detail:
            "Đội dựng phần tra cứu sản phẩm ở hệ thống mới và kiểm trên môi trường thử. Hệ thống cũ vẫn tiếp tục nhận sửa lỗi cho mọi phần khác.",
        },
        {
          label: "Đổi một dòng định tuyến",
          detail:
            "Cấu hình lớp trung gian chuyển /tra-cuu sang hệ thống mới. Người dùng không biết gì khác, và các đường dẫn khác vẫn về hệ thống cũ.",
        },
        {
          label: "Lỗi thì quay lại một dòng",
          detail:
            "Nếu phần mới lỗi, đổi lại dòng cấu hình ấy và mọi yêu cầu trở về hệ thống cũ. Mỗi phần chuyển xong là một lần quay lại được, nên kích thước thay đổi luôn nhỏ.",
        },
        {
          label: "Lặp lại cho từng phần",
          detail:
            "Phần tiếp theo cùng quy trình: xây, đổi định tuyến, theo dõi. Hệ thống cũ teo dần theo từng đường dẫn đã chuyển, và đội bảo trì cả hai trong lúc đó nên chi phí này trả đều đặn.",
        },
        {
          label: "Tắt hệ thống cũ đúng ngày",
          detail:
            "Ngày kết thúc ghi từ đầu là thứ ngăn trạng thái nửa vời trở nên dễ chấp nhận. Khi phần cuối chuyển xong thì tắt hệ thống cũ, và gỡ lớp trung gian nếu không còn cần.",
        },
      ],
    },
  ],

  "tach-khoi-tach-theo-duong-nao": [
    {
      type: "scenario",
      title: "Ba đội cản nhau trên một kho mã chung",
      start: "batdau",
      nodes: {
        batdau: {
          text: "Công ty có ba đội với khoảng hai mươi lăm người trên cùng một kho mã, và mỗi lần phát hành họ cản nhau: đội này chờ đội kia gộp xong. CTO yêu cầu tách thành dịch vụ riêng. Bạn đề xuất đường cắt nào?",
          choices: [
            { label: "Tách theo lớp: giao diện, nghiệp vụ, dữ liệu", next: "lop" },
            { label: "Tách theo năng lực nghiệp vụ: đặt hàng, thanh toán, kho", next: "nghiepvu" },
            { label: "Mỗi hàm lớn thành một dịch vụ riêng", next: "ham" },
          ],
        },
        lop: {
          text: "Sơ đồ nhìn rất gọn, nhưng gần như mọi tính năng mới đều cần sửa cả ba lớp. Mỗi tính năng bây giờ cần phối hợp ba lần phát hành, và các đội cản nhau còn nhiều hơn trước.",
          ending: "bad",
        },
        ham: {
          text: "Hàng chục dịch vụ nhỏ nói chuyện với nhau qua mạng. Mỗi lần gọi trả thêm độ trễ, xử lý lỗi và một khả năng hỏng mới; vài tháng sau tìm một lỗi phải lần qua sáu dịch vụ.",
          ending: "bad",
        },
        nghiepvu: {
          text: "Đường cắt đã vẽ xong. Khi chia dữ liệu, bạn thấy hai dịch vụ đặt hàng và kho cùng đọc và ghi bảng tồn kho. Bạn làm gì?",
          choices: [
            { label: "Cho hai dịch vụ dùng chung bảng đó để khỏi sao chép", next: "chung" },
            { label: "Chuyển bảng tồn kho về một bên, bên kia hỏi qua giao diện", next: "mot" },
            { label: "Ghi chú vào tài liệu rồi cứ tách tiếp", next: "ghichu" },
          ],
        },
        chung: {
          text: "Hai dịch vụ dùng chung một bảng thì thực chất vẫn là một. Mỗi lần đổi cấu trúc bảng, hai đội phải họp phối hợp phát hành, và bạn đã trả toàn bộ chi phí vận hành phân tán mà không được lợi ích tách rời.",
          ending: "bad",
        },
        ghichu: {
          text: "Ghi chú nằm đó nhưng không ai đọc. Ba tháng sau một đội đổi tên cột trong bảng, dịch vụ bên kia lỗi lúc chiều tối và nhóm trực phải gọi cả hai đội dậy để sửa.",
          ending: "bad",
        },
        mot: {
          text: "Mỗi bảng chỉ có một chủ, đường cắt nằm ở chỗ lượng nói chuyện nhỏ. Hai tháng sau, tính năng mới phần lớn chỉ đụng vào một dịch vụ, và các đội phát hành độc lập được.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Cắt bếp nhà hàng theo đường nào",
      intro:
        "Hãy nghĩ tới một nhà hàng đông khách. Bạn có thể chia bếp theo món, theo công đoạn, hoặc để mọi người dùng chung một cuốn sổ. Mỗi cách làm lượng người phải nói chuyện với nhau khác hẳn.",
      columns: ["Cách cắt", "Giống như trong nhà hàng", "Khi có món mới"],
      rows: [
        [
          "Theo năng lực nghiệp vụ",
          "Mỗi quầy làm trọn món của mình, ví dụ quầy phở, quầy cơm",
          "Món mới chỉ đụng một quầy, ít phải nói chuyện qua quầy khác",
        ],
        [
          "Theo lớp kỹ thuật",
          "Một tổ chỉ thái, một tổ chỉ nấu, một tổ chỉ bày đĩa",
          "Món nào cũng qua cả ba tổ nên cả ba cùng phải đổi lịch",
        ],
        [
          "Chung một bảng dữ liệu",
          "Hai quầy cùng viết vào một cuốn sổ gọi món",
          "Đổi cách ghi sổ là phải họp cả hai quầy, vì thực ra là một quầy",
        ],
      ],
      oneLiner: "Đường cắt tốt là đường mà lượng nói chuyện qua nó nhỏ nhất; hai bên cùng đụng một bảng hay cùng đổi cho mỗi tính năng là dấu hiệu vẽ sai.",
    },
  ],
};
