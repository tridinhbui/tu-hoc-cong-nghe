import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 42. Một người viết cho một tệp.
export const P42_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── DevRel ──────────────────────────────────────────────────────────────
  "devrel-cong-viec-that-su-la-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Đo đội bằng người tới được kết quả, không bằng lượt đăng ký",
      task:
        "Báo cáo quý của đội đang lấy số đăng ký làm số người dùng thành công và chia tổng thời gian cho cả những người bỏ dở, nên nhìn rất đẹp. Danh sách phut ghi số phút mỗi người cần để chạy được lệnh gọi đầu tiên (None là bỏ giữa chừng). Sửa để đếm đúng số người tới được kết quả và in thời gian trung vị CHỈ của họ.",
      starter:
        `phut = [12, None, 35, None, 8, 190, None, 20]
dang_ky = len(phut)
den_noi = dang_ky
trung_vi = sum(p for p in phut if p is not None) / dang_ky
print("Đăng ký:", dang_ky)
print("Tới được kết quả đầu tiên:", den_noi)
print("Thời gian trung vị (phút):", trung_vi)
`,
      solution:
        `phut = [12, None, 35, None, 8, 190, None, 20]
xong = sorted(p for p in phut if p is not None)
dang_ky = len(phut)
den_noi = len(xong)
giua = len(xong) // 2
if len(xong) % 2 == 0:
    trung_vi = (xong[giua - 1] + xong[giua]) / 2
else:
    trung_vi = xong[giua]
print("Đăng ký:", dang_ky)
print("Tới được kết quả đầu tiên:", den_noi)
print("Thời gian trung vị (phút):", trung_vi)
`,
      expectedOutput: "Đăng ký: 8\nTới được kết quả đầu tiên: 5\nThời gian trung vị (phút): 20",
      hints: [
        "Người bỏ dở có giá trị None: lọc họ ra TRƯỚC khi đếm và trước khi tính thời gian.",
        "Trung vị là phần tử ở giữa danh sách đã sắp xếp. Một người mất 190 phút không kéo nó đi xa như kéo giá trị trung bình.",
      ],
    },
    {
      type: "feynman",
      title: "Ba nhóm người, ba kiểu cần khác nhau",
      intro:
        "Hãy nghĩ tới một toà chung cư và người đứng ở quầy hướng dẫn. Khách đi xem căn hộ, cư dân sống hằng ngày và cư dân vừa mất điện lúc hai giờ sáng đều tới quầy ấy, nhưng không ai cần cùng một câu trả lời.",
      columns: ["Nhóm người", "Giống như", "Điều họ cần nhất"],
      rows: [
        ["Đang cân nhắc", "Khách đi xem căn hộ", "Nghe cả điều căn hộ KHÔNG có, trước khi quyết định"],
        ["Đang dùng hằng ngày", "Cư dân sống ở đó", "Bảng chỉ dẫn tra nhanh và ví dụ chạy được ngay"],
        ["Đang gặp sự cố", "Cư dân mất điện lúc hai giờ sáng", "Một trang nói lỗi này nghĩa là gì và bước kế tiếp là gì"],
      ],
      oneLiner: "Đo đội bằng số kỹ sư tới được kết quả đầu tiên, vì lượt xem tăng được mà không ai dùng được thêm gì.",
    },
  ],

  "ir-cong-bo-thong-tin-va-thoi-diem": [
    {
      type: "scenario",
      title: "Webhook hỏng từ chiều thứ tư",
      start: "phat_hien",
      nodes: {
        phat_hien: {
          text: "Sáng thứ năm bạn nhận tin: bản triển khai chiều thứ tư làm trường amount trong webhook đổi từ số sang chuỗi, và mã của một số khách đã vỡ. Chưa ai biết có bao nhiêu khách. Nhóm kỹ thuật nói cần hai ngày mới có số chính xác và bản vá. Bạn làm gì?",
          choices: [
            { label: "Đợi hai ngày để công bố kèm số khách và bản vá đầy đủ", next: "doi" },
            { label: "Đăng ngay phần đã chắc, ghi rõ phần đang xác minh", next: "ngay" },
            { label: "Đăng vào buổi tối, lúc ít người trực tuyến để đỡ ồn ào", next: "toi" },
          ],
        },
        doi: {
          text: "Hai ngày sau thông báo ra đủ số liệu, nhưng cộng đồng đã mở một chủ đề trên diễn đàn từ trưa thứ năm. Nhiều kỹ sư tự dò nguyên nhân, vài người kết luận nhầm là lỗi code của mình và quay lại phiên bản cũ của chính họ. Thông báo của bạn đến sau tin đồn.",
          ending: "bad",
        },
        toi: {
          text: "Thông báo lên lúc 22 giờ, khi các đội trực đã về. Sáng hôm sau, những người mở máy đầu tiên phát hiện sự cố đã kéo dài cả đêm mà họ không được báo, và họ hiểu việc chọn giờ đó là chủ ý.",
          ending: "bad",
        },
        ngay: {
          text: "Thông báo đã lên: webhook từ chiều thứ tư có trường amount đổi kiểu, mức ảnh hưởng đang được đánh giá, cập nhật tiếp lúc 15 giờ. Đầu giờ chiều kỹ thuật báo bản vá sẽ trễ tới thứ bảy. Bạn làm gì?",
          choices: [
            { label: "Giữ im lặng đến khi có bản vá rồi mới cập nhật", next: "im" },
            { label: "Cập nhật đúng giờ hẹn, nêu cách tránh tạm thời", next: "tot" },
            { label: "Nhắn riêng cho vài khách lớn nhất bị ảnh hưởng", next: "rieng" },
          ],
        },
        im: {
          text: "15 giờ qua đi mà không có gì mới. Người dùng hiểu im lặng là tình hình xấu hơn bạn nói, và phiếu hỗ trợ tăng vọt đúng khoảng đó. Bản vá ra thứ bảy, nhưng lời hẹn cập nhật đã bị bỏ.",
          ending: "bad",
        },
        rieng: {
          text: "Vài khách lớn lùi kế hoạch kịp, phần cộng đồng còn lại biết chuyện qua một ảnh chụp tin nhắn được chuyền tay. Họ nhớ rằng thông tin tốt nhất đã đi riêng cho người khác trước họ.",
          ending: "bad",
        },
        tot: {
          text: "Đúng 15 giờ bạn đăng: bản vá dự kiến thứ bảy, trong lúc đó có thể đọc trường amount như chuỗi rồi ép về số ở phía mình. Người dùng có việc làm ngay, và bạn đã giữ đúng lời hẹn đầu tiên nên lời hẹn kế tiếp có giá trị.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Đồng hồ công bố chạy từ lúc nào",
      steps: [
        {
          label: "Chiều thứ tư: sự kiện phát sinh",
          detail:
            "Bản triển khai làm webhook đổi kiểu trường. Đồng hồ công bố bắt đầu chạy NGAY ở đây, kể cả khi chưa ai trong công ty biết gì.",
        },
        {
          label: "Thứ năm: đội trực biết",
          detail:
            "Một ngày đã trôi. Đội trực xử lý tiếp rất hợp lý, và đội quan hệ nhà phát triển vẫn chưa nghe gì. Đồng hồ không dừng chờ ai báo.",
        },
        {
          label: "Thứ sáu: lãnh đạo kỹ thuật họp",
          detail:
            "Cuộc họp bàn nên nói thế nào, chờ số liệu nào, đợi bản vá hay không. Đây là chỗ lý do nội bộ nghe hợp lý nhất, và cũng là chỗ thêm một ngày nữa mất đi.",
        },
        {
          label: "Thứ hai: người công bố nhận tin",
          detail:
            "Bốn ngày đã qua trước khi người chịu trách nhiệm viết thông báo biết có chuyện. Trong thời gian đó người dùng đã tự mở phiếu và đăng bài hỏi.",
        },
        {
          label: "Cách đếm đúng, cách sửa chỗ nghẽn",
          detail:
            "Tính từ thứ tư. Việc cần sửa là đường đi của tin: một kênh để người trực báo thẳng tới người công bố ngay khi có thay đổi ảnh hưởng người dùng, không chờ qua từng cuộc họp.",
        },
      ],
    },
  ],

  "lo-trinh-cong-bo-va-moc-thoi-gian": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản nháp thông báo lùi mốc",
      task:
        "Một công cụ AI soạn bản nháp thông báo lùi mốc ra mắt cho cộng đồng. Bấm vào những câu mà bài vừa dạy là không nên đăng, rồi nộp.",
      segments: [
        {
          text: "Chúng tôi lùi bản xác thực mới từ giữa quý sang cuối quý này.",
        },
        {
          text: "Do gặp một số khó khăn kỹ thuật nên mốc phải lùi lại.",
          error: "Nguyên nhân mơ hồ. Bài dạy nói cụ thể: cộng đồng chấp nhận một lần trễ khi nguyên nhân rõ và khớp với điều đội từng nói, còn câu chung chung khiến họ nghi đội không nhìn thấy nó đang tới.",
        },
        {
          text: "Phần đăng nhập bằng khoá mới lùi hẳn sang quý sau, phần đăng nhập cũ vẫn chạy như hiện nay.",
        },
        {
          text: "Từ tuần trước chúng tôi đã báo riêng cho vài khách lớn để họ chủ động lùi kế hoạch.",
          error: "Báo riêng cho một số khách trước là điều bài cấm. Phần cộng đồng còn lại sẽ biết, và họ nhớ rằng mình nhận tin sau.",
        },
        {
          text: "Chúng tôi cam kết mốc mới sẽ không trễ thêm một ngày nào.",
          error: "Một mốc vừa trễ lại đi kèm lời hứa tuyệt đối. Nếu trễ lần nữa, cái mất không chỉ là mốc mà là toàn bộ lời hứa vừa đưa ra.",
        },
        {
          text: "Thông báo này được đăng ngay khi có đủ căn cứ, sớm hơn ngày hẹn bốn tuần.",
        },
        {
          text: "Bản cập nhật kế tiếp sẽ đăng vào thứ sáu tuần sau.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Mốc công bố giống lời hẹn giờ với bạn bè",
      intro:
        "Một người bạn hẹn bạn nhiều lần. Người hẹn đúng giờ thì bạn đến đúng giờ. Người hay trễ thì bạn tự dặn mình cộng thêm nửa tiếng, và lời hẹn của họ thôi có nghĩa. Mốc của đội sản phẩm vận hành y như thế.",
      columns: ["Cách đặt mốc", "Giống như", "Cái giá về sau"],
      rows: [
        ["Đặt sớm để được chú ý", "Hẹn \"năm phút nữa tới\" khi còn đang ở xa", "Trễ một lần là mọi người tự cộng thêm giờ vào các lần hẹn sau"],
        ["Đặt xa rồi ra sớm hơn hẹn", "Hẹn một tiếng nhưng tới sau bốn mươi phút", "Lần nào cũng đẹp, tới khi họ tự trừ hao và con số mất nghĩa"],
        ["Biết sẽ trễ thì báo ngay", "Nhắn khi vừa biết kẹt xe, nói đúng chỗ kẹt", "Chấp nhận được, vì nguyên nhân khớp điều bạn từng nói"],
      ],
      oneLiner: "Giá trị của mốc nằm ở chuỗi lần giữ được lời, nên báo sớm khi sắp trễ rẻ hơn đúng giờ một lần rồi mất tin.",
    },
  ],

  "devrel-bo-tai-lieu-va-buoi-gap": [
    {
      type: "scenario",
      title: "Câu hỏi \"khi nào có tính năng này\"",
      start: "hoi",
      nodes: {
        hoi: {
          text: "Cuối buổi gặp kỹ thuật, trưởng nhóm của khách hỏi: \"Xuất báo cáo theo lô bao giờ có?\". Nội bộ tính năng đó mới nằm trong danh sách xem xét, chưa có mốc. Bạn trả lời thế nào?",
          choices: [
            { label: "\"Đội đang làm rồi, chắc sắp có thôi\"", next: "sap_co" },
            { label: "\"Chưa có mốc; anh cho biết khối lượng cần, tôi đưa vào ưu tiên\"", next: "dieu_kien" },
            { label: "\"Lộ trình thì tôi không được phép nói gì cả\"", next: "ne" },
          ],
        },
        sap_co: {
          text: "Câu trả lời nghe an toàn, nhưng người nghe không phân biệt được lộ trình nội bộ với lời hứa. Ba tháng sau, họ trích nguyên câu đó trong cuộc họp mua hàng như một cam kết, và bạn không có mốc nào để trả.",
          ending: "bad",
        },
        ne: {
          text: "Khách không nhận được gì dùng được. Họ ghi lại rằng nhà cung cấp né câu hỏi, rồi bắt đầu tự dựng phần xuất báo cáo bên phía họ, và tính năng của bạn khi ra đời đã có đối thủ ngay trong nhà khách.",
          ending: "bad",
        },
        dieu_kien: {
          text: "Khách khó chịu trong ba giây, rồi nhận ra họ vừa có một việc để làm: nêu khối lượng và tần suất cần xuất. Buổi gặp sắp kết thúc, và còn hai câu bạn chưa trả lời được (giới hạn tốc độ gọi và cách xoá dữ liệu). Bạn làm gì?",
          choices: [
            { label: "Ghi ngay hai câu đó vào sổ trước mặt khách, hẹn ngày gửi", next: "ghi" },
            { label: "Nhớ trong đầu rồi tối về ghi lại cho đầy đủ", next: "quen" },
            { label: "Trả lời đại khái theo ý hiểu để buổi gặp trọn vẹn", next: "doan" },
          ],
        },
        quen: {
          text: "Sau một buổi chiều gặp thêm hai khách khác, bạn chỉ còn nhớ một trong hai câu. Câu quên mất chính là câu khó, và khách chờ thư trả lời không bao giờ tới.",
          ending: "bad",
        },
        doan: {
          text: "Bạn đoán giới hạn tốc độ cao hơn thực tế. Khách thiết kế hệ thống của họ dựa trên con số đó, tới lúc chạy thật mới gặp lỗi và trích lại lời bạn.",
          ending: "bad",
        },
        ghi: {
          text: "Khách thấy câu hỏi của mình được ghi lại và có ngày trả lời. Hai câu đó đi vào danh sách việc cần làm, đồng thời cho đội biết chỗ nào trong tài liệu còn thiếu.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Tài liệu theo câu hỏi giống tờ hỏi đáp ở từng quầy",
      intro:
        "Một bệnh viện không đưa cho mỗi người một cuốn sổ tay dày. Mỗi quầy có tờ hỏi đáp ngắn cho đúng những điều người ta hay hỏi ở quầy đó. Bộ tài liệu cho buổi gặp kỹ thuật cũng nên làm như vậy.",
      columns: ["Cách tổ chức", "Giống như", "Lúc bị hỏi giữa buổi gặp"],
      rows: [
        ["Một bộ chung theo nội dung", "Cuốn sổ tay ba trăm trang", "Lật tìm ba phút, khách ngồi đợi"],
        ["Một trang cho mỗi nhóm câu hỏi", "Tờ hỏi đáp dán sẵn ở từng quầy", "Mở đúng trang và gửi nguyên trang cho người hỏi"],
        ["Danh sách câu chưa trả lời được", "Sổ ghi yêu cầu ở quầy", "Vừa là việc cần làm, vừa chỉ ra chỗ tài liệu đang thiếu"],
      ],
      oneLiner: "Tổ chức tài liệu theo câu hỏi người ta hỏi, và ghi ngay tại chỗ những câu chưa trả lời được.",
    },
  ],

  "ir-khung-hoang-va-tin-xau": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản nháp thông báo lộ khoá API",
      task:
        "Một công cụ AI soạn thông báo sự cố lộ khoá API. Số liệu trong bản nháp là minh hoạ. Bấm vào những câu mà bài vừa dạy là điểm yếu của một thông báo tin xấu, rồi nộp.",
      segments: [
        {
          text: "Một số khoá API bị lộ qua kho mã công khai, và chúng tôi đã thu hồi các khoá đó lúc 09:10 hôm nay.",
        },
        {
          text: "Chúng tôi vô cùng xin lỗi và hết sức nghiêm túc coi trọng an toàn của từng người dùng.",
          error: "Đầy tính từ nhưng không có con số hay việc làm nào kiểm được. Bài dạy thay phần này bằng điều cụ thể: bao nhiêu tài khoản, kiểm soát nào đã đổi.",
        },
        {
          text: "Có 214 tài khoản bị ảnh hưởng từ ngày 3 đến ngày 9, và kho mã thứ hai vẫn đang được rà soát.",
        },
        {
          text: "Sự việc này sẽ không bao giờ lặp lại.",
          error: "Lời hứa không ai kiểm soát được; nếu nó lặp lại thì lần thứ hai đắt gấp đôi vì đã có lời hứa đứng đó.",
        },
        {
          text: "Từ nay mọi thay đổi cấu hình khoá cần hai người duyệt.",
        },
        {
          text: "Chúng tôi sẽ đăng thêm thông tin ngay khi có, thỉnh thoảng trong tuần.",
          error: "Không có mốc. Sau công bố đầy đủ, chỉ cập nhật theo đúng những mốc đã nêu; \"thỉnh thoảng\" để người dùng tự đoán và hỏi dồn.",
        },
        {
          text: "Bản cập nhật tiếp theo sẽ đăng lúc 15:00 ngày mai.",
        },
      ],
    },
    {
      type: "flow",
      title: "Hai mươi bốn giờ đầu của một sự cố lộ khoá",
      steps: [
        {
          label: "Chặn trước, đếm sau",
          detail:
            "Thu hồi khoá và đóng các phiên đăng nhập bị lộ. Câu hỏi \"lớn tới đâu\" chưa cần trả lời mới bắt đầu chặn được, nên không có lý do để chờ.",
        },
        {
          label: "Khoanh phạm vi",
          detail:
            "Ghi ba thứ: bao nhiêu tài khoản, dữ liệu gì, từ ngày nào. Ghi cả chỗ chưa rà, ví dụ kho mã thứ hai, vì chỗ chưa rà là chỗ tin xấu thứ hai có thể nằm.",
        },
        {
          label: "Công bố trọn vẹn một lần",
          detail:
            "Một thông báo có con số, nguyên nhân, kiểm soát đã đổi, kèm mốc cho phần chưa xong. Ba mảnh tin nhỏ cùng nội dung làm người đọc hỏi lại mỗi lần còn bao nhiêu nữa, còn một thông báo đủ thì đóng được câu hỏi đó.",
        },
        {
          label: "Cập nhật đúng mốc đã hứa",
          detail:
            "Tới giờ đã hẹn thì đăng, kể cả khi chỉ để nói chưa có gì mới. Không thêm mốc, không đổi mốc; mỗi lần giữ đúng hẹn là một lý do để người dùng tin những gì bạn nói tiếp theo.",
        },
      ],
    },
  ],

  // ── Nhật ký / log ───────────────────────────────────────────────────────
  "ghi-log-co-cau-truc": [
    {
      type: "exercise",
      language: "python",
      title: "Hỏi log bằng trường, không bằng khớp chuỗi",
      task:
        "Mỗi dòng trong dong là một sự kiện log dạng JSON. Cần biết khách kh_07 gặp bao nhiêu lỗi (level là error) và mã yêu cầu nào. Đoạn khởi đầu dò chữ error trong cả dòng nên đếm nhầm cả dòng info chỉ NHẮC tới chữ đó và dòng lỗi của khách khác. Sửa để đọc từng dòng như dữ liệu và lọc theo trường.",
      starter:
        `import json

dong = [
    '{"level":"error","khach":"kh_07","ma":"req_1","msg":"timeout"}',
    '{"level":"info","khach":"kh_07","ma":"req_2","msg":"retry after error"}',
    '{"level":"error","khach":"kh_02","ma":"req_3","msg":"db down"}',
    '{"level":"error","khach":"kh_07","ma":"req_4","msg":"timeout"}',
    '{"level":"warn","khach":"kh_07","ma":"req_5","msg":"slow"}',
]
so_loi = 0
ma = []
for d in dong:
    if "error" in d:
        so_loi += 1
print("Lỗi của kh_07:", so_loi)
print("Mã yêu cầu:", ", ".join(ma))
`,
      solution:
        `import json

dong = [
    '{"level":"error","khach":"kh_07","ma":"req_1","msg":"timeout"}',
    '{"level":"info","khach":"kh_07","ma":"req_2","msg":"retry after error"}',
    '{"level":"error","khach":"kh_02","ma":"req_3","msg":"db down"}',
    '{"level":"error","khach":"kh_07","ma":"req_4","msg":"timeout"}',
    '{"level":"warn","khach":"kh_07","ma":"req_5","msg":"slow"}',
]
so_loi = 0
ma = []
for d in dong:
    su_kien = json.loads(d)
    if su_kien["level"] == "error" and su_kien["khach"] == "kh_07":
        so_loi += 1
        ma.append(su_kien["ma"])
print("Lỗi của kh_07:", so_loi)
print("Mã yêu cầu:", ", ".join(ma))
`,
      expectedOutput: "Lỗi của kh_07: 2\nMã yêu cầu: req_1, req_4",
      hints: [
        "json.loads(d) biến một dòng chữ thành từ điển. Sau đó so sánh từng trường, không dò chữ trong cả dòng.",
        "Điều kiện cần hai vế cùng đúng: level bằng error VÀ khach bằng kh_07. Nhớ thêm mã yêu cầu vào ma khi dòng thoả.",
      ],
    },
    {
      type: "feynman",
      title: "Log có cấu trúc giống bảng tính có cột",
      intro:
        "Một quán ghi đơn vào cuốn sổ tay viết tay mỗi tối. Quán khác ghi vào bảng tính có cột riêng cho tên khách, món, giờ. Khi chủ quán hỏi \"khách A gọi gì trong tuần qua\", hai cách ghi cho hai câu trả lời rất xa nhau về thời gian.",
      columns: ["Kiểu ghi", "Giống như", "Hỏi \"lỗi của khách A trong giờ qua\""],
      rows: [
        ["Dạng câu chữ", "Sổ tay viết tay mỗi tối", "Đọc từng trang rồi tự đếm, dễ sót"],
        ["Có cấu trúc, mỗi thứ một trường", "Bảng tính có cột riêng", "Lọc theo cột khách và cột mức độ, ra ngay"],
        ["Thêm mã định danh yêu cầu", "Số phiếu dán lên mọi giấy tờ của một đơn", "Gom mọi dòng của một yêu cầu qua nhiều dịch vụ thành một câu chuyện"],
      ],
      oneLiner: "Chia mỗi mẩu thông tin vào một trường có tên để log thành dữ liệu hỏi được, với mã yêu cầu làm sợi chỉ nối.",
    },
  ],

  "duong-di-tu-su-kien-toi-dashboard": [
    {
      type: "scenario",
      title: "Biểu đồ lỗi bỗng phẳng ở mức không",
      start: "phang",
      nodes: {
        phang: {
          text: "Sau một lần triển khai, biểu đồ lỗi trên dashboard chuyển thành đường phẳng ở mức không. Đồng nghiệp nhắn: \"tuyệt, bản mới sạch lỗi\". Bạn làm gì?",
          choices: [
            { label: "Đồng ý và đóng phiếu theo dõi sự cố", next: "dong" },
            { label: "Kiểm sự kiện mới nhất trong hệ thống có dấu thời gian nào", next: "kiem" },
            { label: "Nới bộ lọc biểu đồ để chắc thấy mọi mức độ lỗi", next: "loc" },
          ],
        },
        dong: {
          text: "Bộ thu thập đã ngừng gửi từ lúc triển khai, nên biểu đồ phẳng vì không có dữ liệu chứ không phải vì không có lỗi. Người dùng gặp lỗi suốt buổi chiều và không có đường nào báo về, tới khi phiếu hỗ trợ dồn lại.",
          ending: "bad",
        },
        loc: {
          text: "Bộ lọc nới rộng thế nào biểu đồ vẫn phẳng, vì không có dữ liệu nào để lọc. Bạn mất cả giờ chỉnh một thứ không phải nguyên nhân, trong khi sự cố vẫn chạy.",
          ending: "bad",
        },
        kiem: {
          text: "Sự kiện mới nhất trong hệ thống có dấu thời gian đúng lúc triển khai. Bộ thu thập không chạy lại sau bản mới, nên biểu đồ phẳng. Khoảng thiếu đã kéo dài gần một giờ. Bạn xử lý thế nào?",
          choices: [
            { label: "Chạy lại bộ thu thập rồi coi như đã xong, vì dữ liệu mới đã tới", next: "chay_lai" },
            { label: "Chạy lại bộ thu thập, đánh dấu khoảng thiếu, thêm cảnh báo mất dữ liệu", next: "tot" },
            { label: "Quay về bản cũ vì nghi bản mới làm mất dữ liệu trên toàn hệ thống", next: "rollback" },
          ],
        },
        chay_lai: {
          text: "Dữ liệu mới tới trở lại, nhưng khoảng thiếu không được đánh dấu nên người xem sau này đọc nó như \"không có lỗi\". Và lần sau bộ thu thập ngừng, vẫn không có gì báo.",
          ending: "bad",
        },
        rollback: {
          text: "Ứng dụng vốn chạy bình thường; chỉ bộ thu thập hỏng. Quay về bản cũ gây thêm một đợt gián đoạn, bộ thu thập vẫn chưa được chạy lại, và nguyên nhân thật chưa ai chạm tới.",
          ending: "bad",
        },
        tot: {
          text: "Dữ liệu trở lại, biểu đồ có vạch ghi \"không có dữ liệu\" cho khoảng thiếu, và từ nay hệ thống báo ngay khi quá vài phút không nhận được sự kiện nào. Kiểu hỏng làm bạn yên tâm giờ có tiếng chuông riêng.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một dòng log đi tới biểu đồ, và nó có thể rơi ở đâu",
      steps: [
        {
          label: "Ghi: ứng dụng viết một dòng",
          detail:
            "Khi lưu lượng tăng vọt, bộ đệm có thể đầy và dòng bị bỏ ngay tại đây mà không có thông báo nào.",
        },
        {
          label: "Thu thập: một tiến trình đọc và gửi đi",
          detail:
            "Tiến trình này có thể ngừng chạy sau một lần triển khai. Khi đó mọi thứ phía sau vẫn sống, chỉ không còn gì đi vào. Đây là chỗ sinh ra biểu đồ phẳng ở mức không.",
        },
        {
          label: "Lập chỉ mục: sắp xếp để truy vấn",
          detail:
            "Bước này tốn thời gian nên tạo ra độ trễ. Nếu sáu phút mới hiện lên, thay đổi bạn vừa làm có thể chưa kịp hiện, và bạn dễ kết luận nó không có tác dụng.",
        },
        {
          label: "Truy vấn và hiển thị",
          detail:
            "Bộ lọc của chính bạn quyết định cái gì lên biểu đồ. Một bộ lọc theo dịch vụ cũ vẫn chạy được trong khi dịch vụ mới đã đổi tên, và biểu đồ vẫn sạch.",
        },
        {
          label: "Đo độ trễ trước khi cần",
          detail:
            "Ghi một dòng có dấu thời gian rồi đếm xem bao lâu nó hiện trên biểu đồ. Con số đó, biết trước sự cố, là thứ cho bạn biết lúc nào nên tin biểu đồ.",
        },
      ],
    },
  ],

  "xoay-vong-log-va-chi-phi-luu-tru": [
    {
      type: "exercise",
      language: "python",
      title: "Lấy mẫu có chủ đích: giữ hết lỗi, thưa dòng thành công",
      task:
        "Danh sách dong là chuỗi log, mỗi phần tử là \"ok\" hoặc \"loi\". Chính sách mới: giữ TOÀN BỘ dòng lỗi, còn dòng thành công chỉ giữ một trong mỗi năm (dòng thành công thứ nhất, thứ sáu, thứ mười một... tính riêng các dòng thành công). Đoạn khởi đầu lấy mẫu mọi dòng theo vị trí nên vứt cả dòng lỗi. Sửa để in đúng số dòng giữ và số dòng lỗi còn lại.",
      starter:
        `dong = ["ok", "ok", "ok", "loi", "ok", "ok", "ok", "ok", "ok", "loi", "ok", "ok"]
giu = []
for i, d in enumerate(dong):
    if i % 5 == 0:
        giu.append(d)
print("Giữ lại:", len(giu), "/", len(dong))
print("Trong đó dòng lỗi:", giu.count("loi"))
`,
      solution:
        `dong = ["ok", "ok", "ok", "loi", "ok", "ok", "ok", "ok", "ok", "loi", "ok", "ok"]
giu = []
dem_ok = 0
for d in dong:
    if d == "loi":
        giu.append(d)
    else:
        if dem_ok % 5 == 0:
            giu.append(d)
        dem_ok += 1
print("Giữ lại:", len(giu), "/", len(dong))
print("Trong đó dòng lỗi:", giu.count("loi"))
`,
      expectedOutput: "Giữ lại: 4 / 12\nTrong đó dòng lỗi: 2",
      hints: [
        "Kiểm dòng lỗi TRƯỚC: gặp \"loi\" thì giữ luôn, không qua bước lấy mẫu.",
        "Dùng một biến đếm riêng cho dòng thành công, chia lấy dư cho 5, để việc thưa không phụ thuộc vị trí của dòng lỗi xen giữa.",
      ],
    },
    {
      type: "chart",
      title: "Một thời hạn chung và thời hạn tách theo loại",
      caption:
        "Số liệu minh hoạ, không phải bảng giá của nhà cung cấp nào. Giả sử log gỡ lỗi giữ 3 ngày, log lỗi 60 ngày, log truy cập giữ theo trục ngang. Kéo thanh trượt dung lượng log gỡ lỗi để thấy khoảng cách giữa hai đường mở rộng nhanh khi phần gỡ lỗi chiếm nhiều.",
      kind: "line",
      xLabel: "Thời hạn giữ log truy cập (ngày)",
      yLabel: "Chi phí lưu mỗi tháng (USD)",
      x: { from: 0, to: 360, step: 30 },
      params: [
        { id: "gl", label: "Log gỡ lỗi mỗi ngày", min: 5, max: 100, step: 5, value: 20, unit: "GB" },
        { id: "tc", label: "Log truy cập mỗi ngày", min: 0.5, max: 10, step: 0.5, value: 2, unit: "GB" },
        { id: "gia", label: "Giá lưu mỗi gigabyte mỗi tháng (minh hoạ)", min: 0.01, max: 0.05, step: 0.01, value: 0.02, unit: "USD" },
      ],
      series: [
        { label: "Giữ mọi loại cùng một thời hạn", expr: "x*(gl+3+tc)*gia" },
        { label: "Tách thời hạn theo loại", expr: "(min(x,3)*gl+min(x,60)*3+x*tc)*gia" },
      ],
    },
  ],

  "doi-chieu-va-tim-sai-sot-he-thong": [
    {
      type: "exercise",
      language: "python",
      title: "Phân nhóm các bản ghi lệch trước khi sửa",
      task:
        "Hệ thống thanh toán a và hệ thống đối soát b đáng lẽ có cùng các giao dịch, nhưng b thiếu vài bản ghi. Đoạn khởi đầu chỉ biết số lệch, nên không trả lời được nguyên nhân. Sửa để lấy các giao dịch có ở a mà thiếu ở b, rồi đếm chúng theo tiền tệ: bài học nói việc đầu tiên khi thấy lệch là phân nhóm.",
      starter:
        `a = {"t1": "VND", "t2": "USD", "t3": "VND", "t4": "USD", "t5": "USD", "t6": "VND"}
b = {"t1": "VND", "t3": "VND", "t6": "VND"}
lech = len(a) - len(b)
theo_tien = {}
print("Lệch:", lech, "bản ghi")
print("Theo tiền tệ:", theo_tien)
`,
      solution:
        `a = {"t1": "VND", "t2": "USD", "t3": "VND", "t4": "USD", "t5": "USD", "t6": "VND"}
b = {"t1": "VND", "t3": "VND", "t6": "VND"}
thieu = [ma for ma in a if ma not in b]
theo_tien = {}
for ma in thieu:
    tien = a[ma]
    theo_tien[tien] = theo_tien.get(tien, 0) + 1
print("Lệch:", len(thieu), "bản ghi")
print("Theo tiền tệ:", theo_tien)
`,
      expectedOutput: "Lệch: 3 bản ghi\nTheo tiền tệ: {'USD': 3}",
      hints: [
        "Giao dịch thiếu là mã có trong a mà không có trong b. Lấy danh sách mã đó, không chỉ lấy hiệu hai độ dài.",
        "Với mỗi mã thiếu, đọc tiền tệ từ a và tăng bộ đếm tương ứng. Khi mọi bản ghi lệch cùng một nhóm, đó là chữ ký của một lỗi xử lý, không phải nhiễu.",
      ],
    },
    {
      type: "chart",
      title: "Hai kiểu lệch trông khác nhau qua sáu ngày",
      caption:
        "Số liệu minh hoạ, đơn vị là điểm phần trăm chênh giữa hai nguồn. Nhiễu ngẫu nhiên đổi dấu và đổi độ lớn mỗi ngày; lệch ổn định luôn cùng chiều và cùng cỡ, và đó mới là kiểu cần phân nhóm ngay.",
      kind: "line",
      xLabel: "Ngày",
      yLabel: "Chênh lệch giữa hai nguồn (điểm phần trăm)",
      data: [
        { label: "Ngày 1", values: [0.3, 0.2] },
        { label: "Ngày 2", values: [-0.2, 0.2] },
        { label: "Ngày 3", values: [0.1, 0.2] },
        { label: "Ngày 4", values: [-0.4, 0.2] },
        { label: "Ngày 5", values: [0.2, 0.2] },
        { label: "Ngày 6", values: [-0.1, 0.2] },
      ],
      seriesLabels: ["Nhiễu ngẫu nhiên", "Lệch ổn định"],
    },
  ],

  "chot-ky-so-lieu-va-du-lieu-den-muon": [
    {
      type: "exercise",
      language: "python",
      title: "Đặt cửa sổ chốt theo phần đuôi, không theo trung bình",
      task:
        "Danh sách tre là độ trễ (giờ) giữa lúc một sự kiện xảy ra và lúc nó tới hệ thống, của 20 sự kiện. Cửa sổ chốt cần đủ dài để phủ ít nhất 95% sự kiện. Đoạn khởi đầu lấy trung bình làm cửa sổ, vốn bị phần lớn sự kiện nhanh kéo xuống. Sửa để chọn cửa sổ theo phần đuôi và in số sự kiện vẫn tới sau cửa sổ.",
      starter:
        `tre = [0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.4, 0.5, 0.5, 0.6,
       0.7, 0.8, 0.9, 1, 1, 1.5, 2, 3, 18, 30]
cua_so = round(sum(tre) / len(tre))
tre_hon = len([t for t in tre if t > cua_so])
print("Cửa sổ chốt (giờ):", cua_so)
print("Sự kiện tới sau cửa sổ:", tre_hon)
`,
      solution:
        `tre = [0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.4, 0.5, 0.5, 0.6,
       0.7, 0.8, 0.9, 1, 1, 1.5, 2, 3, 18, 30]
xep = sorted(tre)
k = (len(xep) * 95 + 99) // 100
cua_so = xep[k - 1]
tre_hon = len([t for t in tre if t > cua_so])
print("Cửa sổ chốt (giờ):", cua_so)
print("Sự kiện tới sau cửa sổ:", tre_hon)
`,
      expectedOutput: "Cửa sổ chốt (giờ): 18\nSự kiện tới sau cửa sổ: 1",
      hints: [
        "Sắp xếp độ trễ tăng dần rồi lấy phần tử ở vị trí phủ 95% số sự kiện (với 20 sự kiện là phần tử thứ 19).",
        "Dùng phép chia nguyên để tính vị trí, tránh sai số số thực khi làm tròn lên: (n * 95 + 99) // 100.",
      ],
    },
    {
      type: "flow",
      title: "Một sự kiện mang dấu thời gian hôm qua tới nơi hôm nay",
      steps: [
        {
          label: "Sự kiện xảy ra lúc 23:50 hôm qua",
          detail:
            "Một thiết bị ghi lại thao tác của người dùng nhưng đang mất mạng. Sự kiện nằm trong bộ nhớ máy, mang dấu thời gian hôm qua.",
        },
        {
          label: "Gửi bù sau vài giờ",
          detail:
            "Có mạng trở lại, thiết bị gửi bù. Độ trễ giữa lúc xảy ra và lúc tới hệ thống là con số bạn đo được từ đây, và nó thuộc phần đuôi chứ không phải trung bình.",
        },
        {
          label: "Kỳ còn mở: vào con số tạm",
          detail:
            "Nếu cửa sổ chốt chưa hết, sự kiện đi vào số liệu hôm qua và con số đổi. Báo cáo ghi rõ \"tạm\", nên người đọc biết nó còn có thể đổi.",
        },
        {
          label: "Kỳ đã chốt: không sửa kỳ cũ",
          detail:
            "Sự kiện tới sau cửa sổ không được chèn vào kỳ đã chốt. Nó được ghi vào kỳ hiện tại kèm ghi chú rằng thuộc về hôm qua, và con số chính thức vẫn bất biến.",
        },
        {
          label: "Ghi lại ba thứ khi chốt",
          detail:
            "Con số, thời điểm chốt, và phiên bản logic tính toán đã dùng. Sáu tháng sau có tranh cãi, ba thứ này là cách duy nhất để biết con số được sinh ra thế nào.",
        },
      ],
    },
  ],

  // ── Dự án hạ tầng ───────────────────────────────────────────────────────
  "dieu-kien-tien-quyet-truoc-khi-khoi-cong": [
    {
      type: "exercise",
      language: "python",
      title: "Hỏi lần lượt hay hỏi song song từ ngày đầu",
      task:
        "Dự án cần bốn điều kiện tiên quyết, mỗi điều kiện có thời gian chờ riêng (số tuần dưới đây là minh hoạ). Nếu hỏi lần lượt, xong cái này mới hỏi cái kia, thời gian chờ là tổng. Nếu gửi cả bốn yêu cầu ngay ngày đầu, chỉ có điều kiện chậm nhất quyết định khi nào được bắt đầu. Đoạn khởi đầu tính cả hai cách bằng tổng; sửa cách song song.",
      starter:
        `cho = {"quyền truy cập": 3, "chủ sở hữu gật đầu": 2, "khung giờ được đổi": 5, "pháp lý": 8}
lan_luot = sum(cho.values())
song_song = sum(cho.values())
print("Hỏi lần lượt:", lan_luot, "tuần")
print("Hỏi song song từ ngày đầu:", song_song, "tuần")
print("Tiết kiệm:", lan_luot - song_song, "tuần")
print("Cần theo dõi sát nhất:", max(cho, key=cho.get))
`,
      solution:
        `cho = {"quyền truy cập": 3, "chủ sở hữu gật đầu": 2, "khung giờ được đổi": 5, "pháp lý": 8}
lan_luot = sum(cho.values())
song_song = max(cho.values())
print("Hỏi lần lượt:", lan_luot, "tuần")
print("Hỏi song song từ ngày đầu:", song_song, "tuần")
print("Tiết kiệm:", lan_luot - song_song, "tuần")
print("Cần theo dõi sát nhất:", max(cho, key=cho.get))
`,
      expectedOutput:
        "Hỏi lần lượt: 18 tuần\nHỏi song song từ ngày đầu: 8 tuần\nTiết kiệm: 10 tuần\nCần theo dõi sát nhất: pháp lý",
      hints: [
        "Các yêu cầu chạy cùng lúc thì thời gian chờ chung bằng điều kiện lâu nhất, không phải tổng.",
        "Điều kiện lâu nhất đồng thời là cái cần người cụ thể theo đuổi, vì pháp lý thường ít khả năng rút ngắn nhất.",
      ],
    },
    {
      type: "flow",
      title: "Một yêu cầu quyền truy cập đi qua những đâu",
      steps: [
        {
          label: "Gửi yêu cầu, ngày đầu của dự án",
          detail:
            "Phiếu nêu hệ thống nào, môi trường nào, đọc hay ghi, và vì sao. Phiếu thiếu lý do cụ thể thường bị trả lại ngay vòng đầu, mất thêm một lượt chờ.",
        },
        {
          label: "Chờ duyệt ở đội khác",
          detail:
            "Yêu cầu nằm trong hàng đợi của người có ưu tiên riêng và bạn không nằm trong đó. Không ai trong dự án thấy khoảng chờ này trên bảng chi phí.",
        },
        {
          label: "Họ hỏi lại",
          detail:
            "Mỗi câu hỏi là một vòng chờ mới. Người được gán tên cho việc này trả lời trong ngày, vì \"ai đó đang lo\" là cách khiến phiếu nằm im.",
        },
        {
          label: "Có quyền ở môi trường thử, chưa có ở môi trường thật",
          detail:
            "Đội có thể viết mã tới đây, nhưng thay đổi trên hệ thống thật chỉ vào được trong khung giờ cho phép, xin trước nhiều tuần. Điều kiện này cần hỏi từ đầu như các điều kiện kia.",
        },
        {
          label: "Được phép chạy thật",
          detail:
            "Bây giờ tiến độ mới thật sự chạy. Quãng chờ ở trên vẫn tính vào thời gian dự án, dù không có hoá đơn nào ghi lại nó.",
        },
      ],
    },
  ],

  "duong-cong-chu-j-cua-du-an-ha-tang": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm đáy và điểm hoà vốn của đường cong chữ J",
      task:
        "Dự án chạy tám quý. Chi phí dựng dồn vào hai quý đầu, chi phí nuôi 10 mỗi quý, và mỗi đội đã chuyển mang lại 12 giá trị mỗi quý. Danh sách doi là số đội đã chuyển ở mỗi quý (số liệu minh hoạ). Đoạn khởi đầu cộng dồn chỉ vế giá trị nên đáy và hoà vốn đều sai. Sửa để trừ cả chi phí dựng và chi phí nuôi, rồi in quý có giá trị tích luỹ thấp nhất và quý hoà vốn đầu tiên.",
      starter:
        `chi_dung = [60, 60, 0, 0, 0, 0, 0, 0]
chi_nuoi = 10
doi = [0, 0, 1, 3, 5, 7, 8, 8]
gia_tri_doi = 12
luy_ke = []
tong = 0
for q in range(8):
    tong += doi[q] * gia_tri_doi
    luy_ke.append(tong)
day = luy_ke.index(min(luy_ke)) + 1
hoa_von = [i + 1 for i, v in enumerate(luy_ke) if v >= 0][0]
print("Điểm thấp nhất: quý", day, "(" + str(min(luy_ke)) + ")")
print("Hoà vốn: quý", hoa_von)
`,
      solution:
        `chi_dung = [60, 60, 0, 0, 0, 0, 0, 0]
chi_nuoi = 10
doi = [0, 0, 1, 3, 5, 7, 8, 8]
gia_tri_doi = 12
luy_ke = []
tong = 0
for q in range(8):
    tong += doi[q] * gia_tri_doi - chi_dung[q] - chi_nuoi
    luy_ke.append(tong)
day = luy_ke.index(min(luy_ke)) + 1
hoa_von = [i + 1 for i, v in enumerate(luy_ke) if v >= 0][0]
print("Điểm thấp nhất: quý", day, "(" + str(min(luy_ke)) + ")")
print("Hoà vốn: quý", hoa_von)
`,
      expectedOutput: "Điểm thấp nhất: quý 2 (-140)\nHoà vốn: quý 6",
      hints: [
        "Mỗi quý, giá trị thêm vào là doi[q] * gia_tri_doi trừ chi phí dựng của quý đó trừ chi phí nuôi.",
        "Đáy nằm ở cuối giai đoạn chỉ có chi phí, trước khi có đội đầu tiên; hoà vốn là quý đầu tiên mà tổng tích luỹ không còn âm.",
      ],
    },
    {
      type: "chart",
      title: "Đường cong chữ J của một hạ tầng nội bộ",
      caption:
        "Số liệu minh hoạ, đơn vị tuỳ chọn (ví dụ giờ công). Giá trị tích luỹ là giá trị các đội mang lại trừ chi phí dựng và chi phí nuôi. Kéo quý có đội đầu tiên về sau để thấy đáy sâu hơn và hoà vốn xa hơn.",
      kind: "line",
      xLabel: "Quý kể từ lúc khởi công",
      yLabel: "Giá trị tích luỹ",
      x: { from: 0, to: 12, step: 1 },
      params: [
        { id: "dung", label: "Chi phí dựng, dồn về đầu", min: 100, max: 600, step: 50, value: 300 },
        { id: "nuoi", label: "Chi phí nuôi mỗi quý", min: 5, max: 50, step: 5, value: 20 },
        { id: "gt", label: "Giá trị mỗi đội mỗi quý", min: 5, max: 30, step: 5, value: 15 },
        { id: "moi", label: "Số đội chuyển thêm mỗi quý", min: 1, max: 4, step: 1, value: 2 },
        { id: "dau", label: "Quý có đội đầu tiên", min: 1, max: 8, step: 1, value: 4 },
      ],
      series: [
        { label: "Giá trị tích luỹ", expr: "-dung - nuoi*x + gt*moi*max(0, x-dau)*(max(0, x-dau)+1)/2" },
      ],
    },
  ],

  "ba-nguon-luc-cua-mot-du-an-dai": [
    {
      type: "scenario",
      title: "Ba đội muốn thử nền tảng mới",
      start: "moi",
      nodes: {
        moi: {
          text: "Dự án hạ tầng của bạn có hai người trong đội, một người mượn nửa ngày mỗi tuần, và ba đội sẵn lòng thử bản đầu. Bản này còn nhiều chỗ chưa ổn. Bạn mời thế nào?",
          choices: [
            { label: "Mời cả ba đội dự giới thiệu và thử bản mới cùng lúc", next: "ca_ba" },
            { label: "Chọn đội đau nhất, cùng họ chuyển từng bước", next: "mot_doi" },
            { label: "Gửi tài liệu dài cho cả công ty, đội nào cần sẽ tự tới", next: "tai_lieu" },
          ],
        },
        ca_ba: {
          text: "Hai trong ba đội gặp lỗi mà đội của bạn không đủ người xử lý ngay. Họ dùng hết một buổi chiều của mình mà không được gì. Lần sau bạn mời, họ nhận lời nhưng không tới: vốn chú ý của họ đã tiêu hết.",
          ending: "bad",
        },
        tai_lieu: {
          text: "Vài người mở tài liệu, không ai thấy nó trả lời vấn đề của đội mình, nên không ai thử. Bạn đã rút từ tài khoản chú ý của cả công ty mà không mua được gì, và không có ai báo cho bạn biết.",
          ending: "bad",
        },
        mot_doi: {
          text: "Đội A chuyển xong, với bạn ngồi cạnh sửa từng lỗi nhỏ. Họ tiết kiệm được thời gian thật mỗi tuần. Hai đội còn lại đang đứng xem. Bạn làm gì với kết quả đó?",
          choices: [
            { label: "Nhờ đội A kể mất bao lâu và được gì, để đội khác tự cân", next: "ke_lai" },
            { label: "Gửi thông báo cho cả công ty rằng nền tảng đã sẵn sàng", next: "thong_bao" },
            { label: "Yêu cầu hai đội còn lại chuyển theo kịp trong quý này", next: "ep" },
          ],
        },
        thong_bao: {
          text: "Thông báo chung chung không làm ai dừng việc đang làm để đọc. Bạn lại tiêu thêm một lượt chú ý, trong khi bằng chứng mạnh nhất mà bạn có, câu chuyện của đội A, vẫn nằm im.",
          ending: "bad",
        },
        ep: {
          text: "Hai đội chuyển vì bị yêu cầu, không phải vì thấy lợi. Họ làm cho xong, báo lỗi ngay khi gặp, và không giới thiệu cho ai. Chi phí chuyển đổi nằm ở phía họ nên thiện chí cạn nhanh.",
          ending: "bad",
        },
        ke_lai: {
          text: "Đội A nói thẳng: mất ba tuần, đỡ được hai việc lặp mỗi tuần. Con số của người đã làm thuyết phục hơn mọi tài liệu, và hai đội kia tự đến gặp bạn với đúng câu hỏi họ cần.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Ba nguồn lực giống ba loại vốn của một gia đình",
      intro:
        "Một gia đình sắp xây nhà có tiền lương trong tài khoản, một ít tiền nhờ người quen cho mượn nửa chừng, và thiện chí của hàng xóm chịu nghe tiếng ồn xây dựng. Cái nào cạn trước, ngôi nhà cũng đứng lại.",
      columns: ["Nguồn lực", "Giống như", "Cạn thì thấy gì"],
      rows: [
        ["Người trong đội", "Tiền lương trong tài khoản", "Thiếu thì có người báo ngay, vì ai cũng đếm được"],
        ["Người mượn", "Tiền người quen hứa cho mượn nửa chừng", "Giấy ghi nửa ngày, thực tế ít hơn, và không ai báo"],
        ["Sự chú ý của đội sẽ dùng", "Thiện chí của hàng xóm", "Họ thôi tới buổi giới thiệu mà không nói một lời"],
      ],
      oneLiner: "Ngân sách cạn thì có người báo; vốn chú ý cạn thì chỉ có sự im lặng, nên tiêu nó vào đúng một đội trước.",
    },
  ],

  "do-gia-tri-rong-cua-ha-tang": [
    {
      type: "exercise",
      language: "python",
      title: "Giá trị ròng của bốn đội, kể cả đội đang lỗ",
      task:
        "Mỗi cặp trong doi là (giờ tiết kiệm mỗi tuần, giờ mất đi mỗi tuần do học, chuyển, chờ, đi đường vòng) của một đội đang dùng hạ tầng. Đoạn khởi đầu chỉ cộng vế lợi ích nên báo cáo trông rất tốt. Sửa để in tổng giờ tiết kiệm, giá trị ròng và số đội mà hạ tầng đang làm họ mất nhiều hơn được.",
      starter:
        `doi = [(6, 4), (5, 2), (3, 5), (7, 4)]
tiet_kiem = sum(a for a, b in doi)
rong = tiet_kiem
dang_lo = 0
print("Tổng giờ tiết kiệm:", tiet_kiem)
print("Giá trị ròng:", rong, "giờ/tuần")
print("Đội đang lỗ:", dang_lo)
`,
      solution:
        `doi = [(6, 4), (5, 2), (3, 5), (7, 4)]
tiet_kiem = sum(a for a, b in doi)
rong = sum(a - b for a, b in doi)
dang_lo = len([1 for a, b in doi if b > a])
print("Tổng giờ tiết kiệm:", tiet_kiem)
print("Giá trị ròng:", rong, "giờ/tuần")
print("Đội đang lỗ:", dang_lo)
`,
      expectedOutput: "Tổng giờ tiết kiệm: 21\nGiá trị ròng: 6 giờ/tuần\nĐội đang lỗ: 1",
      hints: [
        "Giá trị ròng là tổng của (lợi ích − chi phí) của từng đội, không phải tổng lợi ích trừ đi một con số chung.",
        "Một đội đang lỗ khi giờ mất đi lớn hơn giờ tiết kiệm. Đếm các đội đó: đây là nhóm cần lối thoát hoặc cần ngừng ép dùng.",
      ],
    },
    {
      type: "chart",
      title: "Báo cáo chỉ có vế cộng và báo cáo giá trị ròng",
      caption:
        "Số liệu minh hoạ, đơn vị là giờ mỗi tuần. Hai đường dùng cùng dữ liệu: một đường chỉ tính giờ tiết kiệm, một đường trừ cả giờ học, chuyển, chờ và đi đường vòng. Kéo chi phí mỗi đội lên gần mức tiết kiệm để thấy khoảng cách giữa hai báo cáo.",
      kind: "line",
      xLabel: "Số đội đang dùng",
      yLabel: "Giờ mỗi tuần",
      x: { from: 0, to: 12, step: 1 },
      params: [
        { id: "tk", label: "Giờ tiết kiệm mỗi đội", min: 2, max: 12, step: 1, value: 6, unit: "giờ" },
        { id: "cp", label: "Giờ mất đi mỗi đội", min: 0, max: 12, step: 1, value: 4, unit: "giờ" },
      ],
      series: [
        { label: "Báo cáo chỉ có vế lợi ích", expr: "x*tk" },
        { label: "Giá trị ròng", expr: "x*(tk-cp)" },
      ],
    },
  ],

  "ba-rui-ro-cong-don-cua-du-an-dai": [
    {
      type: "scenario",
      title: "Người mượn bị rút về giữa dự án",
      start: "rut",
      nodes: {
        rut: {
          text: "Tháng thứ năm của dự án mười hai tháng, người mượn giữ phần tích hợp báo bị đội cũ rút về. Kỳ rà soát ngân sách vào tháng tám; mốc đội đầu tiên chuyển dự kiến tháng chín. Bạn làm gì?",
          choices: [
            { label: "Tìm người thay thế, ghi chậm vài tuần vào mục tiến độ", next: "thay" },
            { label: "Kéo mốc có người dùng đầu tiên về trước kỳ rà soát", next: "keo" },
            { label: "Chờ tới kỳ rà soát rồi giải trình đầy đủ nguyên nhân", next: "cho" },
          ],
        },
        thay: {
          text: "Đọc theo bảng thì đây là một rủi ro vừa phải đã có cách xử lý. Nhưng người thay cần vài tuần làm quen, và mốc tháng chín trượt hẳn qua kỳ rà soát tháng tám. Kỳ đó nhìn vào đúng lúc chưa có ai dùng.",
          ending: "bad",
        },
        cho: {
          text: "Tại kỳ rà soát, dự án đã tiêu quá nửa ngân sách, chưa đội nào dùng. Giải trình đúng đến đâu cũng đi sau con số, và nguồn lực bị rút thêm trước khi mốc đầu tiên tới.",
          ending: "bad",
        },
        keo: {
          text: "Để kéo mốc về trước tháng tám, bạn phải cắt bớt phạm vi của lần chuyển đầu tiên. Bạn cắt gì?",
          choices: [
            { label: "Giữ một đội và một luồng việc, bỏ phần tích hợp đầy đủ", next: "tot" },
            { label: "Giữ cả ba đội, bỏ kiểm thử và tài liệu của lần đầu", next: "bo_kiem_thu" },
            { label: "Giữ nguyên phạm vi, tăng giờ làm của đội trong ba tháng", next: "tang_gio" },
          ],
        },
        bo_kiem_thu: {
          text: "Ba đội dùng bản chưa kiểm thử và gặp lỗi. Họ chuyển chi phí đó thành lời phàn nàn ngay trước kỳ rà soát, và có người dùng đầu tiên cũng chẳng cứu được sự ủng hộ.",
          ending: "bad",
        },
        tang_gio: {
          text: "Đội làm thêm giờ nhưng khối lượng công không giảm, nên mốc vẫn chỉ vừa kịp hoặc trượt vài tuần. Một người nữa nghỉ vì kiệt sức làm mắt xích đầu tiên đứt lần thứ hai.",
          ending: "bad",
        },
        tot: {
          text: "Một đội dùng được một luồng việc trước kỳ rà soát tháng tám. Dự án vào kỳ đó với một đội đã chuyển và con số thật, thay vì một lời hứa. Phần còn lại tiếp tục như kế hoạch, với ít lần phải chứng minh mình đáng sống hơn.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Ba việc bình thường nối thành một kết cục không ai chọn",
      steps: [
        {
          label: "Mất nguồn lực",
          detail:
            "Một người mượn bị rút về đội cũ. Chuyện này xảy ra mọi lúc nên không báo động ai, và nếu đứng riêng thì chỉ cần tìm người thay.",
        },
        {
          label: "Trượt mốc có người dùng đầu tiên",
          detail:
            "Phần việc của người đó là tích hợp, nên đội đầu tiên chưa chuyển kịp. Sáu tuần trong dự án mười hai tháng là bình thường nếu chỉ nhìn riêng nó.",
        },
        {
          label: "Kỳ rà soát tới đúng lúc chưa có ai dùng",
          detail:
            "Lịch rà soát cố định, không dời vì dự án. Nhìn từ ngoài, một dự án đã tiêu quá nửa ngân sách và chưa đội nào dùng trông giống hệt một dự án thất bại.",
        },
        {
          label: "Mất sự ủng hộ",
          detail:
            "Người bảo trợ không còn lý do để giữ nguồn lực, và nguồn lực bị rút lại. Mắt xích cuối làm mắt xích đầu tệ hơn vòng sau.",
        },
        {
          label: "Chặn ở giữa",
          detail:
            "Chặn ở mắt xích thứ hai rẻ hơn chặn hai đầu: chia dự án thành ba đoạn, mỗi đoạn kết thúc bằng thứ có người dùng, để mỗi kỳ rà soát nhìn thấy thứ đã chạy.",
        },
      ],
    },
  ],

  // ── Sự kiện hiếm ────────────────────────────────────────────────────────
  "dinh-muc-tai-nguyen-va-gia-cua-mot-cam-ket": [
    {
      type: "exercise",
      language: "python",
      title: "Cam kết ở mức sàn, mức cao hay không cam kết",
      task:
        "Mức dùng của bốn tháng được ghi trong dung (đơn vị tài nguyên, số liệu minh hoạ). Giá thường 10 mỗi đơn vị, giá cam kết 6 mỗi đơn vị nhưng phải trả cho TOÀN BỘ phần đã cam kết dù dùng hay không; phần dùng vượt cam kết trả giá thường. Đoạn khởi đầu tính nhầm phần vượt theo giá cam kết. Sửa để so ba mức cam kết với việc không cam kết.",
      starter:
        `dung = [70, 90, 60, 110]
gia_thuong = 10
gia_cam_ket = 6
chi_phi = {}
for c in [60, 90, 120]:
    tong = 0
    for d in dung:
        tong += c * gia_cam_ket + max(0, d - c) * gia_cam_ket
    chi_phi[c] = tong
    print(f"Cam kết {c}: {tong}")
print(f"Không cam kết: {sum(dung) * gia_thuong}")
print(f"Rẻ nhất: {min(chi_phi, key=chi_phi.get)}")
`,
      solution:
        `dung = [70, 90, 60, 110]
gia_thuong = 10
gia_cam_ket = 6
chi_phi = {}
for c in [60, 90, 120]:
    tong = 0
    for d in dung:
        tong += c * gia_cam_ket + max(0, d - c) * gia_thuong
    chi_phi[c] = tong
    print(f"Cam kết {c}: {tong}")
print(f"Không cam kết: {sum(dung) * gia_thuong}")
print(f"Rẻ nhất: {min(chi_phi, key=chi_phi.get)}")
`,
      expectedOutput: "Cam kết 60: 2340\nCam kết 90: 2360\nCam kết 120: 2880\nKhông cam kết: 3300\nRẻ nhất: 60",
      hints: [
        "Phần vượt cam kết (d − c, khi dương) tính giá thường, không phải giá cam kết.",
        "Mức 60 là mức dùng thấp nhất của bốn tháng, tức mức SÀN. Quan sát vì sao mức 120 đắt hơn không cam kết một khoảng đáng kể ở các tháng dùng ít.",
      ],
    },
    {
      type: "chart",
      title: "Chi phí theo mức dùng thật khi đã cam kết",
      caption:
        "Số liệu minh hoạ, giá thường là 1 mỗi đơn vị. Đường phẳng là chỗ bạn trả cho phần trống: mức dùng nằm dưới mức cam kết thì chi phí không giảm thêm, nên tối ưu để dùng ít hơn không tiết kiệm được gì. Kéo mức cam kết lên cao để thấy vùng đó mở rộng.",
      kind: "line",
      xLabel: "Mức dùng thật trong tháng (đơn vị)",
      yLabel: "Chi phí trong tháng",
      x: { from: 0, to: 150, step: 10 },
      params: [
        { id: "cam", label: "Mức đã cam kết", min: 0, max: 150, step: 10, value: 80, unit: "đơn vị" },
        { id: "giam", label: "Mức chiết khấu cho phần cam kết", min: 10, max: 60, step: 5, value: 40, unit: "%" },
      ],
      series: [
        { label: "Không cam kết", expr: "x" },
        { label: "Đã cam kết", expr: "cam*(1-giam/100) + max(0, x-cam)" },
      ],
    },
  ],
};
