import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 08. Một người viết cho một tệp.
export const P08_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ───────────────────────── Chặng 11 ─────────────────────────
  "dam-phan-luong-khi-nhan-viec-moi": [
    {
      type: "scenario",
      title: "Mười phút quyết định: câu hỏi về mức lương mong muốn",
      start: "hoi",
      nodes: {
        hoi: {
          text: "Vòng phỏng vấn đầu đang tốt. Nhà tuyển dụng hỏi: 'Mức lương bạn mong muốn là bao nhiêu?'. Bạn chưa biết ngân sách của vị trí này. Số liệu trong tình huống chỉ là minh hoạ.",
          choices: [
            { label: "Hỏi lại xem vị trí này có dải lương đã được duyệt không", next: "dai" },
            { label: "Nói luôn mức lương hiện tại vì sớm muộn họ cũng hỏi", next: "hientai" },
            { label: "Nói một con số tròn như 25 triệu để đặt neo trước", next: "consotron" },
          ],
        },
        dai: {
          text: "Họ cho biết dải là 18 đến 24 triệu. Cuối vòng cuối, họ gọi báo lời mời 20 triệu và muốn bạn trả lời ngay trong cuộc gọi.",
          choices: [
            { label: "Xin một ngày suy nghĩ rồi phản hồi bằng dải thị trường có nguồn", next: "tot1" },
            { label: "Nhận ngay 20 triệu vì sợ họ đổi ý nếu để lâu", next: "xau1" },
          ],
        },
        tot1: {
          text: "Họ đồng ý cho một ngày. Hôm sau bạn gửi dải thị trường kèm ba tin tuyển dụng cùng vị trí làm nguồn. Hai bên chốt ở mức cao hơn lời mời đầu, và mức đó trở thành nền tính phần trăm tăng cho những năm sau.",
          ending: "good",
        },
        xau1: {
          text: "Bạn ký ở 20 triệu, nằm giữa dải 18 đến 24. Mười phút đó chỉ đến một lần: mức nền này sẽ là gốc để tính mọi lần tăng sau, ở cả nơi này lẫn nơi kế tiếp, và bạn chưa hề thử hỏi thêm.",
          ending: "bad",
        },
        hientai: {
          text: "Bạn nói lương hiện tại là 15 triệu. Họ ghi lại, và vòng sau lời mời là 17 triệu, tăng hơn 13%. Nghe có vẻ khá, nhưng dải của vị trí lại là 18 đến 24 triệu.",
          choices: [
            { label: "Nhận 17 triệu vì tăng hơn một phần mười là tốt rồi", next: "xau2" },
            { label: "Chuyển câu chuyện sang dải thị trường và giá trị của vị trí", next: "tot2" },
          ],
        },
        xau2: {
          text: "Cuộc trao đổi đã bị neo vào lịch sử lương cũ của bạn thay vì giá trị công việc. Bạn nhận 17 triệu, thấp hơn đáy dải của chính vị trí, và mọi sai lệch từ chỗ cũ theo bạn sang chỗ mới.",
          ending: "bad",
        },
        tot2: {
          text: "Bạn nói: 'Tôi muốn trao đổi dựa trên dải thị trường của vị trí, mà ba tin cùng vị trí ghi 18 đến 24 triệu.' Nhà tuyển dụng điều chỉnh lời mời lên trong dải. Vẫn tốn sức hơn nhiều so với việc tránh nói lương cũ ngay từ đầu.",
          ending: "good",
        },
        consotron: {
          text: "Bạn nói 25 triệu. Nhà tuyển dụng im lặng một lúc rồi nói ngân sách tối đa của vị trí là 20 triệu, và bạn đang ở trên trần.",
          choices: [
            { label: "Hạ ngay xuống 20 triệu để khỏi mất cơ hội này", next: "xau3" },
            { label: "Hỏi có bù được bằng thưởng ký hợp đồng, ngày phép hoặc mốc xem xét lại không", next: "tot3" },
          ],
        },
        xau3: {
          text: "Bạn nhận 20 triệu, đúng bằng trần ngân sách, mà không nhận thêm khoản nào khác. Con số bạn nói trước đã bị họ dùng để biết trần của mình, và bạn không còn gì để đổi lấy.",
          ending: "bad",
        },
        tot3: {
          text: "Ngân sách lương cứng thì phần chi một lần mới linh hoạt. Họ đồng ý thưởng ký hợp đồng và thêm ngày phép. Với mốc xem xét lại sau sáu tháng, bạn xin ghi vào thư mời kèm tiêu chí cụ thể, vì lời hứa miệng gần như không bao giờ thành hiện thực.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Mười phút đầu của một cuộc trao đổi lương, từng bước",
      steps: [
        { label: "Nghe câu hỏi", detail: "Nhà tuyển dụng hỏi mức lương mong muốn trong lúc bạn chưa biết ngân sách. Con số đầu tiên nói ra sẽ thành cái neo kéo mọi con số sau về phía nó." },
        { label: "Hỏi ngược về dải", detail: "Bạn hỏi vị trí này có dải lương đã duyệt không. Phần lớn nhà tuyển dụng có sẵn dải, nên câu hỏi này bình thường và không bị coi là né tránh." },
        { label: "Nếu buộc phải nói, đưa dải có nguồn", detail: "Nói một dải kèm nguồn, ví dụ 18 đến 24 triệu theo ba tin tuyển dụng cùng vị trí, thay vì một con số. Dải cho thấy bạn đã tra cứu chứ không đang mặc cả." },
        { label: "Xin một ngày khi có lời mời", detail: "Cảm ơn rồi xin một ngày suy nghĩ. Đây là chuẩn mực, không phải đòi hỏi, và là lúc bạn có đòn bẩy lớn nhất vì họ đã chọn bạn." },
        { label: "Mặc cả phần còn lại", detail: "Nếu quỹ lương cứng, chuyển sang thưởng ký hợp đồng, ngày phép và mốc xem xét lại. Khoản nào hẹn sau thì xin ghi bằng văn bản kèm tiêu chí." },
      ],
    },
  ],

  "dam-phan-tang-luong-o-cong-ty-hien-tai": [
    {
      type: "exercise",
      language: "python",
      title: "Biến việc đã làm thành một con số cấp trên kiểm chứng được",
      task: "Với mỗi kết quả, in tỷ lệ giảm so với mức TRƯỚC khi bạn cải tiến, theo đúng dạng: 'Thời gian chốt sổ (ngày): 10 -> 6, giảm 40%'. Mã hiện chia cho mức SAU nên ra những con số phóng đại như 67% hay 150%, đúng loại con số mà người phê duyệt kiểm lại là thấy sai.",
      starter: `ket_qua = [
    ("Thời gian chốt sổ (ngày)", 10, 6),
    ("Số lỗi đối soát mỗi tháng", 25, 10),
    ("Thời gian trả lời khách (giờ)", 8, 6),
]

for ten, truoc, sau in ket_qua:
    phan_tram = (truoc - sau) / sau * 100
    print(f"{ten}: {truoc} -> {sau}, giảm {phan_tram:.0f}%")
`,
      solution: `ket_qua = [
    ("Thời gian chốt sổ (ngày)", 10, 6),
    ("Số lỗi đối soát mỗi tháng", 25, 10),
    ("Thời gian trả lời khách (giờ)", 8, 6),
]

for ten, truoc, sau in ket_qua:
    phan_tram = (truoc - sau) / truoc * 100
    print(f"{ten}: {truoc} -> {sau}, giảm {phan_tram:.0f}%")
`,
      expectedOutput: `Thời gian chốt sổ (ngày): 10 -> 6, giảm 40%
Số lỗi đối soát mỗi tháng: 25 -> 10, giảm 60%
Thời gian trả lời khách (giờ): 8 -> 6, giảm 25%`,
      hints: [
        "Phần trăm giảm luôn tính trên mức ban đầu: (trước - sau) chia cho trước.",
        "Thử kiểm bằng mắt: 10 ngày xuống 6 ngày là bớt 4 ngày, bốn phần mười của 10.",
      ],
    },
    {
      type: "flow",
      title: "Từ tháng Giêng tới cuộc trò chuyện tháng Mười một",
      steps: [
        { label: "Ghi kết quả khi chúng xảy ra", detail: "Mỗi khi xong việc đáng kể, ghi một dòng có con số: 'rút thời gian chốt sổ từ mười ngày xuống sáu'. Đến tháng Mười một, con số cụ thể là thứ biến mất đầu tiên khỏi trí nhớ." },
        { label: "Đổi sang ngôn ngữ phạm vi", detail: "Thay 'tôi làm nhiều giờ hơn' bằng 'phạm vi của tôi đã rộng hơn mô tả lúc tuyển'. Phạm vi so được với dải thị trường, còn số giờ thì cấp phê duyệt không có ngân sách cho nó." },
        { label: "Chọn thời điểm trước kỳ chốt ngân sách", detail: "Đến lúc công bố kết quả thì con số đã duyệt xong từ vài tuần trước. Cuộc trò chuyện chỉ có tác dụng khi ngân sách còn đang được đề xuất." },
        { label: "Nói cuộc trò chuyện", detail: "Mở bằng phạm vi mới, kèm dải thị trường cho phạm vi đó, rồi đưa hai ba kết quả có con số. Người quản lý có sẵn thứ để mang lên cấp trên." },
        { label: "Giữ lời mời bên ngoài trong túi", detail: "Chỉ nhắc tới lời mời nơi khác khi bạn sẵn sàng nhận nó, vì dùng làm vũ khí sẽ tiêu tốn niềm tin rằng bạn muốn ở lại." },
      ],
    },
  ],

  "tong-dai-ngo-khong-chi-luong-gross": [
    {
      type: "exercise",
      language: "python",
      title: "So hai lời mời bằng tổng đãi ngộ, không bằng con số lương",
      task: "Tính tổng đãi ngộ mỗi năm (triệu) của từng lời mời theo ba quy tắc của bài: lương 12 tháng; thưởng tính theo mức thực chi trung bình các năm trước (số tháng lương); thưởng hứa miệng tính bằng 0; mỗi ngày phép thêm quy ra tiền bằng lương một ngày, lấy 22 ngày công mỗi tháng. Mã hiện cộng cả thưởng hứa miệng và bỏ ngày phép, nên xếp sai lời mời.",
      starter: `NGAY_CONG = 22
loi_moi = {
    "A": {"luong": 30, "thuong_thuc_chi": [1, 1], "thuong_hua_mieng": 2, "phep_them": 0},
    "B": {"luong": 28, "thuong_thuc_chi": [2, 2], "thuong_hua_mieng": 0, "phep_them": 3},
}

tong = {}
for ten, o in loi_moi.items():
    tong[ten] = o["luong"] * 12 + o["luong"] * o["thuong_hua_mieng"]
    print(f"Lời mời {ten}: {tong[ten]:.1f} triệu mỗi năm")
print("Cao hơn: " + max(tong, key=tong.get))
`,
      solution: `NGAY_CONG = 22
loi_moi = {
    "A": {"luong": 30, "thuong_thuc_chi": [1, 1], "thuong_hua_mieng": 2, "phep_them": 0},
    "B": {"luong": 28, "thuong_thuc_chi": [2, 2], "thuong_hua_mieng": 0, "phep_them": 3},
}

tong = {}
for ten, o in loi_moi.items():
    thang_thuong = sum(o["thuong_thuc_chi"]) / len(o["thuong_thuc_chi"])
    tien_phep = o["phep_them"] * o["luong"] / NGAY_CONG
    tong[ten] = o["luong"] * 12 + o["luong"] * thang_thuong + tien_phep
    print(f"Lời mời {ten}: {tong[ten]:.1f} triệu mỗi năm")
print("Cao hơn: " + max(tong, key=tong.get))
`,
      expectedOutput: `Lời mời A: 390.0 triệu mỗi năm
Lời mời B: 395.8 triệu mỗi năm
Cao hơn: B`,
      hints: [
        "Thưởng thực chi là một danh sách; lấy trung bình của nó rồi nhân với lương một tháng.",
        "Thưởng hứa miệng không nằm trong phép tính, nên biến thuong_hua_mieng không được dùng.",
        "Ngày phép: số ngày thêm nhân lương một tháng rồi chia cho NGAY_CONG.",
      ],
    },
    {
      type: "chart",
      title: "Hai lời mời, hai cách chia tổng đãi ngộ",
      caption: "Số liệu minh hoạ cho hai lời mời giả định, cùng với bài tập phía trên. Thưởng tính theo mức thực chi trung bình, thưởng hứa miệng tính bằng không.",
      kind: "bar",
      xLabel: "Thành phần",
      yLabel: "Triệu đồng mỗi năm",
      data: [
        { label: "Lương 12 tháng", values: [360, 336] },
        { label: "Thưởng thực chi", values: [30, 56] },
        { label: "Ngày phép thêm quy ra tiền", values: [0, 3.8] },
      ],
      seriesLabels: ["Lời mời A (lương cao hơn)", "Lời mời B (lương thấp hơn)"],
    },
  ],

  "nghe-tay-trai-chon-cai-cong-don": [
    {
      type: "scenario",
      title: "Mười giờ mỗi tuần: nhận việc phụ nào",
      start: "dau",
      nodes: {
        dau: {
          text: "Lương chính đã kịch trần trong ngắn hạn, bạn có đúng mười giờ rảnh mỗi tuần. Hai lời mời trả tiền gần như nhau: nhập liệu thuê theo giờ cho một công ty bạn chưa từng gặp, hoặc dựng website cho tiệm quen mà chủ tiệm hứa sẽ giới thiệu thêm. Số liệu chỉ là minh hoạ.",
          choices: [
            { label: "Nhận nhập liệu, tiền đều và bắt đầu được ngay tuần này", next: "nhaplieu" },
            { label: "Nhận làm website, có sản phẩm cho xem và khách giới thiệu", next: "web" },
            { label: "Nhận cả hai để thu nhập thêm gần gấp đôi ngay lập tức", next: "ca2" },
          ],
        },
        ca2: {
          text: "Hai việc chiếm hai mươi giờ, gấp đôi quỹ thời gian bạn có. Bạn giao trễ ở cả hai nơi, tiệm quen không còn muốn giới thiệu, và việc chính bắt đầu bị ảnh hưởng vì bạn thiếu ngủ.",
          ending: "bad",
        },
        nhaplieu: {
          text: "Ba tháng sau, tiền vẫn về đều, nhưng tuần nào cũng giống tuần nào. Bạn không nhanh hơn, không có gì để cho ai xem, và công ty kia không có lý do gì giới thiệu bạn.",
          choices: [
            { label: "Giữ nguyên vì thu nhập ổn định là điều quan trọng nhất", next: "giu" },
            { label: "Chuyển dần sang việc cho nói chuyện với khách và tự ra giá", next: "chuyen" },
          ],
        },
        giu: {
          text: "Bạn đang đổi giờ lấy tiền: dừng làm là khoản thu về không, và kinh nghiệm của bạn không đáng giá hơn lúc bắt đầu. Việc phụ này không nâng mức trần của việc chính.",
          ending: "bad",
        },
        chuyen: {
          text: "Bạn nhận một khách trực tiếp, phải tự nói chuyện, ra giá và chịu trách nhiệm toàn bộ đầu ra, đúng phần mà việc chính không cho làm. Sau vài tháng bạn có kỹ năng mới và khách đầu tiên.",
          ending: "good",
        },
        web: {
          text: "Trước khi bắt đầu, bạn nhớ hợp đồng lao động có thể có điều khoản về việc bên ngoài, nhất là khi việc phụ cùng ngành với việc chính. Bạn làm gì?",
          choices: [
            { label: "Đọc điều khoản, thông báo nếu hợp đồng yêu cầu rồi mới làm", next: "doc" },
            { label: "Bỏ qua và làm kín buổi tối, không ai biết thì không sao", next: "bo" },
          ],
        },
        doc: {
          text: "Hợp đồng chỉ cần thông báo là đủ, bạn thông báo và được chấp thuận. Website đầu tiên thành tác phẩm cho xem, chủ tiệm giới thiệu thêm hai khách, và kỹ năng làm việc với khách của bạn tiến bộ rõ.",
          ending: "good",
        },
        bo: {
          text: "Khách mới giới thiệu làm việc phụ của bạn lộ ra trong công ty. Điều khoản xung đột lợi ích khiến bạn bị nhắc nhở, và đọc trước vốn rẻ hơn nhiều so với xử lý sau.",
          ending: "bad",
        },
      },
    },
    {
      type: "feynman",
      title: "Hai việc phụ cùng mười giờ, khác ở chỗ còn lại gì",
      intro: "Hình dung mười giờ cuối tuần như một mảnh đất nhỏ. Một cách là thuê chỗ ngồi theo giờ: hết giờ thì ra về, tay trắng. Cách kia là trồng một cây: cùng công sức nhưng cây vẫn đó vào tuần sau.",
      columns: ["Khía cạnh", "Đổi giờ lấy tiền", "Cộng dồn"],
      rows: [
        ["Ví dụ", "Nhập liệu thuê theo giờ cho một công ty lạ", "Dựng website cho tiệm quen, tiệm này giới thiệu tiệm khác"],
        ["Giờ tuần sau", "Vẫn khó như giờ tuần này", "Dễ hơn vì bạn đã có kỹ năng và mẫu làm sẵn"],
        ["Khi dừng lại", "Chỉ còn khoản tiền đã tiêu", "Còn kỹ năng, tác phẩm cho xem hoặc người giới thiệu"],
        ["Tác động tới việc chính", "Gần như không có", "Nâng giá trị của bạn ở cả việc chính"],
      ],
      oneLiner: "Cùng mười giờ, hãy chọn việc để lại kỹ năng sâu hơn, tác phẩm cho xem hoặc quan hệ; thiếu cả ba thì bạn chỉ đang đổi giờ lấy tiền.",
    },
  ],

  "dinh-gia-dich-vu-freelance": [
    {
      type: "exercise",
      language: "python",
      title: "Giá theo giờ tối thiểu của người làm tự do",
      task: "Với mỗi người, tính giá tối thiểu mỗi giờ (nghìn đồng, làm tròn) theo công thức của bài: (thu nhập mong muốn + chi phí) chia cho số giờ BÁN ĐƯỢC, trong đó giờ bán được bằng tổng giờ nhân tỷ lệ bán được. Mã hiện chỉ chia thu nhập cho tổng giờ, nên ra mức 150 nghìn mà bài đã chỉ ra là phép tính sai.",
      starter: `yeu_cau = [
    (24, 3, 160, 0.6),
    (30, 4, 160, 0.5),
    (20, 2, 160, 0.75),
]

for muon_ve, chi_phi, tong_gio, ty_le in yeu_cau:
    gia = muon_ve * 1000 / tong_gio
    print(f"Cần về tay {muon_ve} triệu, chi phí {chi_phi} triệu, bán {tong_gio * ty_le:.0f} giờ -> giá tối thiểu {gia:.0f} nghìn mỗi giờ")
`,
      solution: `yeu_cau = [
    (24, 3, 160, 0.6),
    (30, 4, 160, 0.5),
    (20, 2, 160, 0.75),
]

for muon_ve, chi_phi, tong_gio, ty_le in yeu_cau:
    gio_ban_duoc = tong_gio * ty_le
    gia = (muon_ve + chi_phi) * 1000 / gio_ban_duoc
    print(f"Cần về tay {muon_ve} triệu, chi phí {chi_phi} triệu, bán {gio_ban_duoc:.0f} giờ -> giá tối thiểu {gia:.0f} nghìn mỗi giờ")
`,
      expectedOutput: `Cần về tay 24 triệu, chi phí 3 triệu, bán 96 giờ -> giá tối thiểu 281 nghìn mỗi giờ
Cần về tay 30 triệu, chi phí 4 triệu, bán 80 giờ -> giá tối thiểu 425 nghìn mỗi giờ
Cần về tay 20 triệu, chi phí 2 triệu, bán 120 giờ -> giá tối thiểu 183 nghìn mỗi giờ`,
      hints: [
        "Tử số là thu nhập mong muốn CỘNG chi phí, không phải thu nhập một mình.",
        "Mẫu số là số giờ bán được: tổng giờ nhân tỷ lệ. Triệu đổi sang nghìn nhân 1000.",
      ],
    },
    {
      type: "chart",
      title: "Giờ bán được càng ít, giá tối thiểu càng phải cao",
      caption: "Số minh hoạ với 160 giờ làm mỗi tháng. Kéo thanh trượt để xem giá tối thiểu mỗi giờ đổi thế nào khi thu nhập mong muốn và chi phí thay đổi, so với cách chia lương cho giờ.",
      kind: "line",
      xLabel: "Giờ bán được trên tổng giờ làm (%)",
      yLabel: "Giá tối thiểu (nghìn đồng mỗi giờ)",
      x: { from: 30, to: 100, step: 10 },
      params: [
        { id: "thunhap", label: "Thu nhập mong muốn mỗi tháng", min: 10, max: 60, step: 2, value: 24, unit: "triệu" },
        { id: "chiphi", label: "Chi phí tự gánh mỗi tháng", min: 0, max: 10, step: 0.5, value: 3, unit: "triệu" },
      ],
      series: [
        { label: "Giá đúng theo công thức", expr: "(thunhap + chiphi) * 1000 / (160 * x / 100)" },
        { label: "Giá nếu chỉ chia lương cho giờ", expr: "thunhap * 1000 / 160" },
      ],
    },
  ],

  "thu-nhap-tu-san-pham-phu": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Đọc một lời chào mời thu nhập thụ động",
      task: "Dưới đây là một đoạn quảng cáo khoá học 'sản phẩm tự kiếm tiền' do AI viết lại theo giọng người bán. Bấm vào những câu mà bạn thấy bỏ qua phần việc hoặc giờ công, rồi nộp.",
      segments: [
        { text: "Chúng tôi dạy bạn dựng một dịch vụ mà người dùng trả phí hằng tháng." },
        {
          text: "Dịch vụ này thu hàng chục triệu mỗi tháng mà bạn không phải làm gì thêm.",
          error: "Dịch vụ có người dùng thu cao nhất nhưng tự chạy ít nhất: có người dùng thì có lỗi, câu hỏi và nâng cấp. Thu cao mà không phải làm gì thì phần việc đang do người khác làm.",
        },
        { text: "Khoá học quay sẵn thì nên quay lại nội dung theo chu kỳ, vì nội dung kỹ thuật cũ đi sau một hai năm." },
        {
          text: "Mọi học viên đều đạt mức thu này, và chưa ai thất bại.",
          error: "Câu chuyện chỉ kể những người thành công, không nói tới số người đã ngừng, và phần công đều đặn của họ vắng mặt trong lời quảng cáo.",
        },
        { text: "Bán mẫu hay tài sản số một lần thì gần như tự chạy, đổi lại khoản thu khiêm tốn." },
        {
          text: "Đừng bận tâm số giờ bỏ ra, chúng tôi chỉ nhìn doanh thu cuối tháng.",
          error: "Phải chia khoản thu cho số giờ đã bỏ ra mới biết nguồn này đáng hay không, nếu chỉ nhìn con số mỗi tháng thì mọi nguồn trông đều hấp dẫn.",
        },
        { text: "Trước khi trả tiền, hãy hỏi ai đang làm phần việc tạo ra khoản thu đó." },
      ],
    },
    {
      type: "flow",
      title: "Hỏi bốn câu trước khi tin một lời chào mời thu nhập phụ",
      steps: [
        { label: "Phần việc nằm ở đâu", detail: "Khi lời chào mời hứa thu cao mà không phải làm gì, phần việc không biến mất. Hoặc người khác đang làm nó, hoặc khoản thu đến từ tiền của người tham gia sau." },
        { label: "Nhóm nào trong bốn nhóm", detail: "Bán một lần, khoá học quay sẵn, thư viện có tài trợ hay dịch vụ có người dùng? Càng về cuối, thu càng cao và tự chạy càng ít." },
        { label: "Giờ phải bỏ ra mỗi tháng", detail: "Hỏi cả giờ bảo trì: trả lời người dùng, nâng phiên bản, quay lại nội dung cũ. Lời chào mời thường chỉ đếm giờ dựng lần đầu." },
        { label: "Thu về chia cho giờ", detail: "Đừng nhìn tổng thu mỗi tháng. Chia cho tổng giờ đã bỏ ra rồi so với việc phụ khác, hoặc với chính việc chính của bạn." },
      ],
    },
  ],

  "dau-tu-vao-ban-than-hoc-gi-co-roi": [
    {
      type: "scenario",
      title: "Ba khoá học, một quý, mười hai triệu",
      start: "dau",
      nodes: {
        dau: {
          text: "Bạn có khoảng 12 triệu và 100 giờ rảnh trong quý này. Ba khoá học đều được khen: một khoá phân tích dữ liệu mà tin tuyển dụng của vị trí bạn nhắm tới ghi rõ yêu cầu, một khoá thiết kế bạn thấy rất thích, một khoá nâng cao có thị trường trả cao nhưng công ty bạn chưa có việc dùng. Học khoá nào?",
          choices: [
            { label: "Khoá phân tích dữ liệu, vì thị trường trả và quý sau có việc dùng", next: "phantich" },
            { label: "Khoá thiết kế vì bạn thích và học sẽ có động lực", next: "thietke" },
            { label: "Khoá nâng cao vì lương thị trường cao nhất trong ba khoá", next: "nangcao" },
          ],
        },
        phantich: {
          text: "Có thị trường lẫn chỗ dùng: đủ cả hai điều kiện. Học xong, bạn làm gì với nó?",
          choices: [
            { label: "Dùng ngay ở dự án quý sau và ghi lại kết quả có con số", next: "tot1" },
            { label: "Để dành, đợi dịp thích hợp rồi hãy đem ra dùng", next: "xau1" },
          ],
        },
        tot1: {
          text: "Kỹ năng được dùng ngay nên không phai, kết quả có con số trở thành bằng chứng cho cuộc đàm phán sau. Khoản này hoàn vốn tính được bằng tháng và phần tăng lặp lại những năm sau.",
          ending: "good",
        },
        xau1: {
          text: "Khoảng cách giữa lúc học và lúc dùng là biến quyết định. Kỹ năng để đó sẽ phai, khoản 12 triệu cùng 100 giờ trở thành chi phí thuần chứ không còn là khoản đầu tư.",
          ending: "bad",
        },
        thietke: {
          text: "Khoá này không có tin tuyển dụng nào yêu cầu cho vị trí của bạn. Bạn đặt tên cho khoản chi này thế nào?",
          choices: [
            { label: "Coi là đầu tư, kỳ vọng lương tăng sau khoá", next: "xau2" },
            { label: "Gọi đúng tên là tiêu dùng và tính vào ngân sách giải trí", next: "tot2" },
          ],
        },
        xau2: {
          text: "Sáu tháng sau lương không đổi vì thị trường của vị trí bạn không trả thêm cho kỹ năng này. Bạn vừa mất tiền, vừa mất một khoản ngân sách đáng lẽ dành cho việc có hoàn vốn.",
          ending: "bad",
        },
        tot2: {
          text: "Học vì thích hoàn toàn chính đáng, miễn gọi đúng tên. Bạn tính nó vào ngân sách giải trí, nên không lẫn với khoản đầu tư và không tự thất vọng khi lương không đổi.",
          ending: "good",
        },
        nangcao: {
          text: "Có thị trường nhưng công ty chưa có việc dùng: đây là quyền chọn chứ chưa phải thu nhập. Bạn tính tiếp thế nào?",
          choices: [
            { label: "Chỉ học khi đã chủ động tạo được chỗ dùng trong sáu tháng tới", next: "tot3" },
            { label: "Học trước, rồi chờ công ty tự có việc cần tới kỹ năng này", next: "xau3" },
          ],
        },
        tot3: {
          text: "Bạn nói chuyện với trưởng nhóm, nhận một đầu việc dùng được kỹ năng này sau khoá. Quyền chọn có chỗ dùng cụ thể nên mới đáng chi tiền.",
          ending: "good",
        },
        xau3: {
          text: "Công ty không có việc dùng, nên kỹ năng phai dần trong lúc chờ. Chi phí thật gồm cả học phí lẫn 100 giờ không dành cho việc phụ hay dự án khác.",
          ending: "bad",
        },
      },
    },
    {
      type: "chart",
      title: "Một khoá học hoàn vốn sau bao nhiêu tháng",
      caption: "Số minh hoạ theo ví dụ trong bài (học phí 12 triệu, lương tăng 1,5 triệu mỗi tháng). Kéo 'tháng chờ' để thấy chỗ dùng đến muộn làm điểm hoà vốn lùi đi ra sao. Chưa tính giá trị 100 giờ học.",
      kind: "line",
      xLabel: "Số tháng kể từ khi học xong",
      yLabel: "Lãi ròng cộng dồn (triệu đồng)",
      x: { from: 0, to: 24, step: 2 },
      params: [
        { id: "tang", label: "Lương tăng mỗi tháng", min: 0.5, max: 5, step: 0.5, value: 1.5, unit: "triệu" },
        { id: "hocphi", label: "Học phí", min: 2, max: 30, step: 1, value: 12, unit: "triệu" },
        { id: "tre", label: "Tháng chờ tới khi có chỗ dùng", min: 0, max: 12, step: 1, value: 0, unit: "tháng" },
      ],
      series: [
        { label: "Lãi ròng cộng dồn", expr: "max(0, x - tre) * tang - hocphi" },
        { label: "Điểm hoà vốn", expr: "0" },
      ],
    },
  ],

  "ban-do-tang-thu-nhap-12-thang": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp bốn nhánh theo mức thu thêm trên mỗi giờ bỏ ra",
      task: "Mỗi nhánh có số giờ cần bỏ ra và mức thu thêm mỗi tháng (triệu, số minh hoạ). Xếp theo thu thêm trong 12 tháng chia cho số giờ, giảm dần, rồi in 'thứ tự. tên: số nghìn mỗi giờ bỏ ra'. Mã hiện xếp theo mức thu thêm mỗi tháng, bỏ qua số giờ nên đưa nhánh nhiều giờ lên trước.",
      starter: `nhanh = [
    ("Đàm phán ở việc chính", 30, 2),
    ("Đổi việc", 80, 4),
    ("Nguồn thu thứ hai", 300, 2),
]

xep = sorted(nhanh, key=lambda n: n[2], reverse=True)
for i, (ten, gio, them) in enumerate(xep, 1):
    print(f"{i}. {ten}: {them * 12 * 1000 / gio:.0f} nghìn mỗi giờ bỏ ra")
`,
      solution: `nhanh = [
    ("Đàm phán ở việc chính", 30, 2),
    ("Đổi việc", 80, 4),
    ("Nguồn thu thứ hai", 300, 2),
]

xep = sorted(nhanh, key=lambda n: n[2] * 12 / n[1], reverse=True)
for i, (ten, gio, them) in enumerate(xep, 1):
    print(f"{i}. {ten}: {them * 12 * 1000 / gio:.0f} nghìn mỗi giờ bỏ ra")
`,
      expectedOutput: `1. Đàm phán ở việc chính: 800 nghìn mỗi giờ bỏ ra
2. Đổi việc: 600 nghìn mỗi giờ bỏ ra
3. Nguồn thu thứ hai: 80 nghìn mỗi giờ bỏ ra`,
      hints: [
        "Khoá xếp phải là thu thêm trong 12 tháng chia cho số giờ, giống con số mà dòng in ra.",
        "Dùng lại tên biến gio và them: lambda n: n[2] * 12 / n[1].",
      ],
    },
    {
      type: "flow",
      title: "Bản đồ mười hai tháng, mỗi quý một trọng tâm",
      steps: [
        { label: "Tháng 1-2: biết mình đang ở đâu", detail: "Tra dải thị trường cho vị trí của bạn và mở sổ ghi kết quả. Hai việc rẻ nhất và cần nhất, vì mọi bước sau dựa vào chúng." },
        { label: "Tháng 3-6: đàm phán ở việc chính", detail: "Chuẩn bị bằng chứng từ sổ ghi, đặt cuộc trò chuyện trước kỳ chốt ngân sách. Vài chục giờ chuẩn bị có thể đổi vài triệu mỗi tháng." },
        { label: "Quyết định rẽ nhánh", detail: "Nếu nội bộ mở thì tiếp tục ở đó. Nếu bạn đã ở đáy dải và quỹ lương đóng băng thì cân nhắc đổi việc, một bước nhảy lớn nhưng tốn nhiều tuần." },
        { label: "Tháng 6-12: nguồn thu thứ hai", detail: "Khi nhánh chính đã kịch trần, mới chuyển sang việc phụ cộng dồn. Chọn một nhánh mỗi quý, không phải bốn nhánh mỗi tuần." },
        { label: "Suốt cả năm: giữ ngân sách", detail: "Chạy nền song song để phần tăng thêm ở lại với bạn thay vì hòa vào chi tiêu tăng theo." },
      ],
    },
  ],

  // ───────────────────────── Chặng 12 ─────────────────────────
  "tap-tin-thu-muc-va-quyen-truy-cap": [
    {
      type: "flow",
      title: "Hệ điều hành quyết định một lần mở tệp thế nào",
      steps: [
        { label: "Tiến trình mang danh tính", detail: "Khi người dùng lan mở tệp bao-cao.pdf (quyền 640, chủ sở hữu an, nhóm ketoan), hệ điều hành lấy tên lan và các nhóm của lan." },
        { label: "Là chủ sở hữu thì dùng bộ đầu", detail: "Nếu người mở chính là chủ tệp, chỉ bộ quyền đầu tiên được áp. Với 640 bộ đó là rw-, tức đọc và ghi, và hệ điều hành dừng ở đây." },
        { label: "Không phải chủ thì xét nhóm", detail: "lan không là chủ nhưng thuộc nhóm ketoan, nên áp bộ thứ hai là r--: đọc được, ghi thì bị từ chối." },
        { label: "Ngoài nhóm thì dùng bộ cuối", detail: "bao không là chủ cũng không thuộc nhóm, nên áp bộ thứ ba là ---: không đọc được dù bộ của nhóm có cho phép." },
        { label: "Thư mục cha cũng phải cho đi qua", detail: "Trên đường tới tệp, mỗi thư mục cần quyền thực thi x của người đó. Thiếu một cấp là không tới được tệp, dù quyền của tệp rộng tới đâu." },
      ],
    },
  ],

  "cong-va-dich-vu-dang-lang-nghe": [
    {
      type: "flow",
      title: "Một gói tin đi từ máy bạn vào một cổng",
      steps: [
        { label: "Gói tin rời máy", detail: "Lệnh curl http://203.0.113.10:3000 tạo gói tin mang hai thứ: địa chỉ IP 203.0.113.10 và cổng 3000." },
        { label: "Địa chỉ IP chọn máy", detail: "Mạng chuyển gói tin tới đúng máy có địa chỉ đó. Ở bước này chưa biết tiến trình nào sẽ nhận." },
        { label: "Cổng chọn tiến trình", detail: "Hệ điều hành tìm tiến trình đang lắng nghe ở cổng 3000. Nếu có và nghe đúng địa chỉ đó, kết nối được." },
        { label: "Không ai nghe: bị từ chối", detail: "Gói tin tới được máy nhưng cổng không có ai lắng nghe, nên máy từ chối ngay. Thường là dịch vụ chưa chạy, hoặc đang nghe ở địa chỉ khác." },
        { label: "Không ai trả lời: treo tới hết giờ", detail: "Tường lửa hoặc nhóm bảo mật vứt gói tin lặng lẽ, nên bạn chờ đến hết giờ mà không nhận được gì. Đây là dấu hiệu khác hẳn bị từ chối." },
      ],
    },
  ],

  "bac-thang-tien-gui": [
    {
      type: "flow",
      title: "Gói tin đi qua ba cửa trước khi tới dịch vụ",
      steps: [
        { label: "Gói tin tới địa chỉ của máy chủ", detail: "Khách gọi vào cổng 5432 của máy chủ. Từ đây có ba chỗ có thể chặn, và triệu chứng nhìn từ ngoài đều giống nhau: kết nối treo." },
        { label: "Cửa 1: nhóm bảo mật đám mây", detail: "Lọc trước khi tới máy. Bị chặn ở đây thì máy chủ không thấy gì, kể cả trong nhật ký của chính nó." },
        { label: "Cửa 2: tường lửa trên máy", detail: "Mặc định chặn, chỉ cổng nào được mở mới qua. Ghi nhật ký được, nên đây là chỗ đầu tiên xem khi tầng đám mây đã mở mà vẫn treo." },
        { label: "Cửa 3: địa chỉ dịch vụ lắng nghe", detail: "Không phải tường lửa nhưng chặn thật: dịch vụ nghe ở 127.0.0.1 thì mở cổng bao nhiêu cũng vô ích." },
        { label: "Chẩn đoán đi ngược từ trong ra", detail: "Kiểm rẻ nhất trước: dịch vụ có nghe đúng địa chỉ không, rồi tường lửa trên máy, cuối cùng mới tới nhóm bảo mật đám mây." },
      ],
    },
  ],

  "dns-tu-ten-mien-toi-dia-chi-ip": [
    {
      type: "exercise",
      language: "python",
      title: "Bao lâu thì người dùng thấy địa chỉ IP mới",
      task: "Máy chủ chuyển sang IP mới ở giây thứ 60. Bộ đệm được điền ở giây 0 bằng câu trả lời cũ và chỉ hỏi lại khi đến hạn (t >= hết hạn; khi hỏi lại thì hết hạn mới = t + TTL). Sửa hàm để nó mô phỏng bộ đệm, rồi xem với TTL 300 giây và 60 giây thì người dùng thấy IP mới từ lúc nào. Mã hiện bỏ qua bộ đệm và luôn hỏi thẳng.",
      starter: `CU = "203.0.113.10"
MOI = "198.51.100.7"
DOI_LUC = 60

def ip_that(t):
    return CU if t < DOI_LUC else MOI

def thay_ip_moi_luc(ttl):
    ip_dem, het_han = ip_that(0), ttl
    for t in [30, 120, 299, 300, 350]:
        ip = ip_that(t)
        if ip == MOI:
            return t

for ttl in (300, 60):
    print(f"TTL {ttl} giây: người dùng thấy IP mới từ giây thứ {thay_ip_moi_luc(ttl)}")
`,
      solution: `CU = "203.0.113.10"
MOI = "198.51.100.7"
DOI_LUC = 60

def ip_that(t):
    return CU if t < DOI_LUC else MOI

def thay_ip_moi_luc(ttl):
    ip_dem, het_han = ip_that(0), ttl
    for t in [30, 120, 299, 300, 350]:
        if t >= het_han:
            ip_dem, het_han = ip_that(t), t + ttl
        if ip_dem == MOI:
            return t

for ttl in (300, 60):
    print(f"TTL {ttl} giây: người dùng thấy IP mới từ giây thứ {thay_ip_moi_luc(ttl)}")
`,
      expectedOutput: `TTL 300 giây: người dùng thấy IP mới từ giây thứ 300
TTL 60 giây: người dùng thấy IP mới từ giây thứ 120`,
      hints: [
        "Chỉ gọi ip_that(t) khi t đã tới hoặc vượt het_han; còn lại dùng ip_dem trong bộ đệm.",
        "Sau khi hỏi lại, nhớ đặt het_han = t + ttl, rồi mới so ip_dem với MOI.",
      ],
    },
    {
      type: "flow",
      title: "Một cái tên đi qua bốn tầng để ra địa chỉ IP",
      steps: [
        { label: "Trình duyệt hỏi hệ điều hành", detail: "Bạn gõ vi-du.vn. Hệ điều hành nhìn bộ đệm của nó trước; nếu còn bản chưa hết hạn thì trả lời ngay mà không hỏi ai." },
        { label: "Hỏi máy phân giải của nhà mạng", detail: "Không có trong bộ đệm máy, yêu cầu đi tới máy phân giải mà /etc/resolv.conf trỏ tới. Máy này cũng có bộ đệm riêng." },
        { label: "Hỏi lên từ gốc xuống", detail: "Nếu vẫn chưa biết, máy phân giải đi từ máy chủ gốc tới .vn rồi tới máy chủ tên có thẩm quyền của vi-du.vn." },
        { label: "Câu trả lời kèm TTL", detail: "Máy chủ tên trả về 203.0.113.10 cùng TTL, ví dụ 287 giây còn lại. Mỗi tầng giữ bản sao đến khi hết số giây đó." },
        { label: "Đổi IP phải chờ hết TTL", detail: "Sau khi bạn đổi bản ghi, các tầng đệm vẫn trả địa chỉ cũ đến lúc hết hạn. Vì vậy hạ TTL phải làm trước ngày chuyển, không phải sau." },
      ],
    },
  ],

  "tls-chung-chi-va-lop-bao-ve-phia-truoc": [
    {
      type: "exercise",
      language: "javascript",
      title: "Rà chứng chỉ: sai tên, đã hết hạn hay sắp hết hạn",
      task: "Với mỗi chứng chỉ, in một dòng 'host: kết luận'. Kiểm theo thứ tự: SAI TÊN nếu danh sách tên không bao phủ host (dùng sẵn hàm phuTen); HẾT HẠN (n ngày trước) nếu hạn đã qua; SẮP HẾT HẠN (còn n ngày) nếu còn từ 14 ngày trở xuống; còn lại là OK (còn n ngày). Mã hiện chỉ in OK hoặc HẾT HẠN theo ngày.",
      starter: `const homNay = "2026-10-04";
const chungChi = [
  { host: "vi-du.vn", ten: ["vi-du.vn", "*.vi-du.vn"], hetHan: "2026-11-28" },
  { host: "api.vi-du.vn", ten: ["*.vi-du.vn"], hetHan: "2026-10-11" },
  { host: "cu.vi-du.vn", ten: ["cu.vi-du.vn"], hetHan: "2026-09-30" },
  { host: "kho.vi-du.vn", ten: ["vi-du.vn"], hetHan: "2027-01-10" },
];

function ngayConLai(den) {
  return Math.round((Date.parse(den) - Date.parse(homNay)) / 86400000);
}
function phuTen(danhSach, host) {
  return danhSach.some(function (t) {
    if (t === host) return true;
    if (t.startsWith("*.")) return host.slice(host.indexOf(".") + 1) === t.slice(2);
    return false;
  });
}

for (const c of chungChi) {
  const con = ngayConLai(c.hetHan);
  console.log(c.host + ": " + (con >= 0 ? "OK (còn " + con + " ngày)" : "HẾT HẠN"));
}
`,
      solution: `const homNay = "2026-10-04";
const chungChi = [
  { host: "vi-du.vn", ten: ["vi-du.vn", "*.vi-du.vn"], hetHan: "2026-11-28" },
  { host: "api.vi-du.vn", ten: ["*.vi-du.vn"], hetHan: "2026-10-11" },
  { host: "cu.vi-du.vn", ten: ["cu.vi-du.vn"], hetHan: "2026-09-30" },
  { host: "kho.vi-du.vn", ten: ["vi-du.vn"], hetHan: "2027-01-10" },
];

function ngayConLai(den) {
  return Math.round((Date.parse(den) - Date.parse(homNay)) / 86400000);
}
function phuTen(danhSach, host) {
  return danhSach.some(function (t) {
    if (t === host) return true;
    if (t.startsWith("*.")) return host.slice(host.indexOf(".") + 1) === t.slice(2);
    return false;
  });
}

for (const c of chungChi) {
  const con = ngayConLai(c.hetHan);
  let ketLuan;
  if (!phuTen(c.ten, c.host)) ketLuan = "SAI TÊN (chứng chỉ không bao phủ tên này)";
  else if (con < 0) ketLuan = "HẾT HẠN (" + -con + " ngày trước)";
  else if (con <= 14) ketLuan = "SẮP HẾT HẠN (còn " + con + " ngày)";
  else ketLuan = "OK (còn " + con + " ngày)";
  console.log(c.host + ": " + ketLuan);
}
`,
      expectedOutput: `vi-du.vn: OK (còn 55 ngày)
api.vi-du.vn: SẮP HẾT HẠN (còn 7 ngày)
cu.vi-du.vn: HẾT HẠN (4 ngày trước)
kho.vi-du.vn: SAI TÊN (chứng chỉ không bao phủ tên này)`,
      hints: [
        "Kiểm tên đầu tiên: chứng chỉ hạn dài mà sai tên vẫn là chứng chỉ không dùng được cho host này.",
        "con là số ngày còn lại; khi nó âm, số ngày đã quá hạn là -con.",
      ],
    },
    {
      type: "flow",
      title: "Trình duyệt kiểm gì trước khi hiện ổ khoá",
      steps: [
        { label: "Kết nối tới cổng 443", detail: "Trình duyệt gọi vi-du.vn và nói rõ tên mình muốn gặp. Máy chủ (hoặc proxy ngược đứng trước) đưa chứng chỉ ra." },
        { label: "Tên có khớp không", detail: "Chứng chỉ ghi danh sách tên nó bao phủ, ví dụ vi-du.vn và *.vi-du.vn. Tên bạn gõ phải nằm trong danh sách đó." },
        { label: "Còn hạn không", detail: "So ngày hôm nay với notBefore và notAfter. Chứng chỉ hết hạn làm trình duyệt chặn trang bằng một cảnh báo đỏ dù mọi thứ khác vẫn đúng." },
        { label: "Người cấp có đáng tin không", detail: "Chứng chỉ do một tổ chức cấp, như Let's Encrypt, mà trình duyệt có sẵn trong danh sách tin cậy. Nó chỉ chứng minh người nắm tên miền, không chứng minh nội dung đáng tin." },
        { label: "Thương lượng khoá, mã hoá đường truyền", detail: "Khi cả ba kiểm đều qua, hai bên thoả thuận khoá chung. Từ đó không ai chen giữa đọc hay sửa được dữ liệu trên đường." },
      ],
    },
  ],

  "ssh-dang-nhap-bang-khoa": [
    {
      type: "scenario",
      title: "Tắt mật khẩu SSH mà không tự khoá mình ngoài cửa",
      start: "dau",
      nodes: {
        dau: {
          text: "Bạn vừa thêm khoá công khai lên một máy chủ ở xa và đăng nhập thử bằng khoá thành công. Giờ bạn muốn tắt đăng nhập bằng mật khẩu. Phiên SSH hiện tại đang mở.",
          choices: [
            { label: "Đặt PasswordAuthentication no, nạp lại rồi đóng phiên cũ để thử lại", next: "dong" },
            { label: "Giữ phiên cũ mở, đặt PasswordAuthentication no và PermitRootLogin no", next: "giu" },
            { label: "Để nguyên mật khẩu vì khoá riêng có thể bị mất khi đổi máy", next: "mk" },
          ],
        },
        dong: {
          text: "Một dòng cấu hình gõ sai, hoặc khoá chưa vào đúng chỗ. Bạn mở cửa sổ mới thì không vào được, và phiên cũ đã đóng. Đây là máy ở xa nên chỉ còn đường vào qua bảng điều khiển của nhà cung cấp.",
          ending: "bad",
        },
        giu: {
          text: "Hai dòng cấu hình đã sửa trong sshd_config, phiên cũ vẫn mở như chỗ lui. Bước tiếp theo là gì?",
          choices: [
            { label: "Chạy sshd -t để kiểm cú pháp, nạp lại, mở cửa sổ mới thử vào bằng khoá, được rồi mới đóng phiên cũ", next: "tot1" },
            { label: "Nạp lại, thấy không báo lỗi thì coi là xong và đóng luôn phiên cũ", next: "xau1" },
          ],
        },
        tot1: {
          text: "Cú pháp đúng, đăng nhập bằng khoá ở cửa sổ mới thành công, và thử bằng mật khẩu thì bị từ chối. Bây giờ phiên cũ mới đóng được, và máy chủ không còn gì để đoán mật khẩu.",
          ending: "good",
        },
        xau1: {
          text: "Không báo lỗi lúc nạp không có nghĩa là khoá đã dùng được. Không có cửa sổ thứ hai làm chỗ lui, nếu có gì lệch bạn chỉ phát hiện sau khi đã đóng phiên duy nhất đang vào được.",
          ending: "bad",
        },
        mk: {
          text: "Mật khẩu vẫn là thứ người lạ có thể đoán từ ngoài Internet. Bạn nghĩ cách nào đỡ rủi ro hơn?",
          choices: [
            { label: "Giữ mật khẩu nhưng đặt thật dài và phức tạp", next: "xau2" },
            { label: "Đặt cụm mật khẩu cho khoá riêng, sao lưu an toàn rồi tắt mật khẩu máy chủ", next: "tot2" },
          ],
        },
        xau2: {
          text: "Cửa mật khẩu vẫn mở với cả Internet nên máy chủ tiếp tục bị thử đoán ngày đêm. Lối vào an toàn nhất là lối không có gì để đoán, không phải lối có mật khẩu dài nhất.",
          ending: "bad",
        },
        tot2: {
          text: "Khoá riêng có cụm mật khẩu bảo vệ và bản sao lưu cất an toàn, nên mất máy không đồng nghĩa với mất quyền vào. Sau đó bạn tắt mật khẩu theo đúng thứ tự: kiểm tra trước, tắt sau.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một lần đăng nhập SSH bằng khoá",
      steps: [
        { label: "Kết nối tới máy chủ", detail: "ssh an@203.0.113.10 mở kết nối. Lần đầu, SSH hiện dấu vân tay của khoá máy chủ và hỏi bạn có tin không, rồi nhớ nó." },
        { label: "Kiểm khoá máy chủ", detail: "Những lần sau, nếu khoá máy chủ khác lần đã nhớ, SSH dừng lại và cảnh báo. Đó là dấu hiệu máy đã bị thay hoặc có người chen giữa." },
        { label: "Máy chủ gửi thử thách", detail: "Máy chủ tìm khoá công khai của bạn trong ~/.ssh/authorized_keys và gửi một thử thách để chứng minh bạn giữ khoá riêng tương ứng." },
        { label: "Bạn ký bằng khoá riêng", detail: "Máy bạn ký thử thách bằng khoá riêng tư. Khoá riêng không đi đâu cả, nên không có gì để nghe lén trên đường." },
        { label: "Máy chủ kiểm chữ ký", detail: "Máy chủ kiểm chữ ký bằng khoá công khai đã lưu. Khớp thì cho vào, không cần mật khẩu nào bị gõ hay bị đoán." },
      ],
    },
  ],

  "shell-script-gom-viec-lap-lai": [
    {
      type: "flow",
      title: "Vòng đời của một script sao lưu an toàn",
      steps: [
        { label: "Dòng an toàn ở đầu tệp", detail: "set -euo pipefail đổi ba mặc định nguy hiểm: dừng khi lỗi, báo biến chưa gán, và bắt lỗi giữa đường ống." },
        { label: "Nhận đầu vào qua tham số", detail: "NGUON=\"${1:?Cách dùng: sao-luu.sh <thư mục>}\" buộc người chạy đưa thư mục vào, thiếu thì script dừng ngay thay vì làm với đường dẫn rỗng." },
        { label: "In ra điều sắp làm", detail: "Với thao tác phá huỷ, in tên máy và đường dẫn sắp tác động rồi chờ xác nhận. Script đúng nhưng chạy nhầm máy là loại sự cố đắt nhất." },
        { label: "Làm việc, biến luôn trong ngoặc kép", detail: "tar và find chạy với \"$NGUON\" và \"$DICH\". Có ngoặc kép thì tên có dấu cách vẫn là một đối số duy nhất." },
        { label: "Báo kết quả", detail: "In 'Xong: ' kèm đường dẫn. Một lệnh nào lỗi giữa chừng thì set -e đã dừng script trước dòng này nên bạn không thấy chữ 'Xong' giả." },
      ],
    },
  ],

  "dat-tien-o-dau-cho-tung-muc-dich": [
    {
      type: "flow",
      title: "Cảnh báo khi vắng mặt: biết cron có thật sự chạy",
      steps: [
        { label: "Cron tới giờ thì chạy", detail: "Dòng 30 2 * * * chạy sao-luu.sh lúc 02:30 mỗi ngày, bất kể lượt trước xong chưa và bất kể ai đang theo dõi." },
        { label: "Script chạy xong thì báo về", detail: "Dòng cuối của script gửi một tín hiệu (ví dụ gọi một địa chỉ theo dõi) chỉ khi mọi bước trước đó thành công." },
        { label: "Nơi theo dõi ghi nhận", detail: "Nơi nhận tín hiệu ghi lại lần báo gần nhất và đặt một hạn: nếu quá hạn mà chưa thấy tín hiệu mới thì có chuyện." },
        { label: "Im lặng quá hạn thì kêu lên", detail: "Tác vụ chết hẳn thì không sinh ra lỗi nào, nó chỉ im lặng. Vì vậy cảnh báo phải kích hoạt khi thiếu tín hiệu, không phải khi có lỗi." },
        { label: "Bạn nhận cảnh báo và tra nhật ký", detail: "Bạn mở /var/log/sao-luu.log và grep CRON /var/log/syslog để biết là cron không chạy, hay chạy mà script hỏng, hay môi trường tối giản làm mất lệnh." },
      ],
    },
  ],
};
