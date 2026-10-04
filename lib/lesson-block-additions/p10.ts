import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 10. Một người viết cho một tệp.
export const P10_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Chặng 14, bài 8 ────────────────────────────────────────────────────────
  "cam-ket-dao-tao-va-rang-buoc": [
    {
      type: "exercise",
      language: "python",
      title: "Tính khoản phải hoàn khi nghỉ giữa chừng",
      task: "Hợp đồng ghi cam kết đào tạo 30.000.000 đồng trong 12 tháng, và khoản hoàn GIẢM DẦN đều theo số tháng còn lại. Hàm hoan_tra đang luôn trả về đủ 30.000.000. Sửa nó để tiền phải hoàn tỉ lệ với số tháng chưa làm đủ.",
      starter: `def hoan_tra(thang_da_lam):
    cam_ket = 30000000
    thang_cam_ket = 12
    return cam_ket

for thang in [0, 5, 12]:
    print(f"Nghỉ sau {thang} tháng: phải hoàn {hoan_tra(thang)}")
`,
      solution: `def hoan_tra(thang_da_lam):
    cam_ket = 30000000
    thang_cam_ket = 12
    thang_con_lai = max(0, thang_cam_ket - thang_da_lam)
    return cam_ket * thang_con_lai // thang_cam_ket

for thang in [0, 5, 12]:
    print(f"Nghỉ sau {thang} tháng: phải hoàn {hoan_tra(thang)}")
`,
      expectedOutput: `Nghỉ sau 0 tháng: phải hoàn 30000000
Nghỉ sau 5 tháng: phải hoàn 17500000
Nghỉ sau 12 tháng: phải hoàn 0`,
      hints: [
        "Số tháng còn lại là thang_cam_ket - thang_da_lam.",
        "Khoản hoàn = cam_ket nhân số tháng còn lại, chia cho thang_cam_ket (dùng // để ra số nguyên).",
      ],
    },
    {
      type: "chart",
      kind: "line",
      title: "Điều khoản giảm dần khác điều khoản giữ nguyên thế nào",
      caption:
        "Số tiền cam kết và thời hạn là số minh hoạ để bạn kéo thử, không phải mức của một công ty cụ thể. Đường trên là điều khoản giữ nguyên toàn bộ khoản cho tới hết thời hạn; đường dưới là điều khoản giảm đều theo tháng.",
      xLabel: "Số tháng đã làm",
      yLabel: "Khoản phải hoàn (triệu đồng)",
      x: { from: 0, to: 24, step: 1 },
      params: [
        { id: "cam_ket", label: "Khoản cam kết", min: 10, max: 60, step: 5, value: 30, unit: " triệu" },
        { id: "han", label: "Thời hạn cam kết", min: 6, max: 24, step: 1, value: 12, unit: " tháng" },
      ],
      series: [
        { label: "Giữ nguyên tới hết hạn", expr: "cam_ket * min(1, max(0, han - x))" },
        { label: "Giảm dần theo tháng", expr: "max(0, cam_ket * (han - x) / han)" },
      ],
    },
  ],

  // ── Chặng 14, bài 9 ────────────────────────────────────────────────────────
  "doc-tin-tuyen-dung": [
    {
      type: "exercise",
      language: "python",
      title: "Tách yêu cầu thành hai nhóm",
      task: "Phần mô tả công việc của tin cho biết bạn sẽ làm gì mỗi ngày. Mục yêu cầu nào được nhắc lại trong phần mô tả thì là nhóm cốt lõi, còn lại là nhóm có thì tốt. Hiện mã xếp TẤT CẢ vào cốt lõi; sửa điều kiện để nó đối chiếu với mo_ta.",
      starter: `mo_ta = "xây dựng giao diện web, sửa lỗi hiển thị, viết kiểm thử giao diện"
yeu_cau = ["giao diện", "kiểm thử", "GraphQL", "sửa lỗi", "3 năm kinh nghiệm"]

cot_loi = []
co_thi_tot = []
for muc in yeu_cau:
    if muc in yeu_cau:
        cot_loi.append(muc)
    else:
        co_thi_tot.append(muc)

print("Cốt lõi:", ", ".join(cot_loi))
print("Có thì tốt:", ", ".join(co_thi_tot))
`,
      solution: `mo_ta = "xây dựng giao diện web, sửa lỗi hiển thị, viết kiểm thử giao diện"
yeu_cau = ["giao diện", "kiểm thử", "GraphQL", "sửa lỗi", "3 năm kinh nghiệm"]

cot_loi = []
co_thi_tot = []
for muc in yeu_cau:
    if muc in mo_ta:
        cot_loi.append(muc)
    else:
        co_thi_tot.append(muc)

print("Cốt lõi:", ", ".join(cot_loi))
print("Có thì tốt:", ", ".join(co_thi_tot))
`,
      expectedOutput: `Cốt lõi: giao diện, kiểm thử, sửa lỗi
Có thì tốt: GraphQL, 3 năm kinh nghiệm`,
      hints: ["Điều kiện hiện đang hỏi muc có nằm trong chính yeu_cau hay không, nên lúc nào cũng đúng.", "Đối chiếu với mo_ta: if muc in mo_ta."],
    },
    {
      type: "flow",
      title: "Đọc một tin tuyển dụng từ trên xuống dưới",
      steps: [
        { label: "Mô tả công việc trước", detail: "Đọc phần này đầu tiên và thử hình dung một ngày làm việc. Nếu không hình dung nổi, đó đã là một tín hiệu để hỏi thêm." },
        { label: "Tách yêu cầu làm hai nhóm", detail: "Gạch những mục lặp lại trong phần mô tả: đó là nhóm cốt lõi. Mục nằm cuối danh sách mà mô tả không nhắc thường là có thì tốt." },
        { label: "Đối chiếu từng mục cốt lõi", detail: "Với mỗi mục, bạn chỉ ra được thứ gì làm bằng chứng, ví dụ một dự án hay một kho mã. Không có bằng chứng thì mục đó coi như còn thiếu." },
        { label: "Hỏi khoảng lương sớm", detail: "Hỏi trước khi bỏ nhiều buổi cho các vòng sau. Đây là câu hỏi bình thường và người tuyển thường trả lời được ngay." },
        { label: "Nộp hồ sơ", detail: "Hồ sơ bị loại gần như không tốn gì, còn bỏ lỡ một vị trí phù hợp thì không ai thấy. Phần thiếu có quan trọng không là việc của người tuyển." },
      ],
    },
  ],

  // ── Chặng 14, bài 10 ───────────────────────────────────────────────────────
  "ke-hoach-ung-tuyen-dau-tien": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm vòng đang làm hồ sơ của bạn dồn lại",
      task: "Bảng theo dõi ghi vòng mà mỗi hồ sơ đang dừng. Mã đang lấy vòng của hồ sơ đầu tiên làm vòng dồn nhiều nhất. Sửa nó để chọn vòng có NHIỀU hồ sơ nhất, vì chỗ đó mới là chỗ cần sửa.",
      starter: `vong = ["Hồ sơ", "Hồ sơ", "Kỹ thuật", "Kỹ thuật", "Kỹ thuật", "Kỹ thuật", "Kỹ thuật", "Hành vi", "Hồ sơ"]

dem = {}
for v in vong:
    dem[v] = dem.get(v, 0) + 1

vong_don = vong[0]

print("Hồ sơ đang chạy:", len(vong))
print(f"Dồn nhiều nhất ở vòng: {vong_don} ({dem[vong_don]} hồ sơ)")
print("Việc cần làm: ôn đúng vòng", vong_don)
`,
      solution: `vong = ["Hồ sơ", "Hồ sơ", "Kỹ thuật", "Kỹ thuật", "Kỹ thuật", "Kỹ thuật", "Kỹ thuật", "Hành vi", "Hồ sơ"]

dem = {}
for v in vong:
    dem[v] = dem.get(v, 0) + 1

vong_don = max(dem, key=dem.get)

print("Hồ sơ đang chạy:", len(vong))
print(f"Dồn nhiều nhất ở vòng: {vong_don} ({dem[vong_don]} hồ sơ)")
print("Việc cần làm: ôn đúng vòng", vong_don)
`,
      expectedOutput: `Hồ sơ đang chạy: 9
Dồn nhiều nhất ở vòng: Kỹ thuật (5 hồ sơ)
Việc cần làm: ôn đúng vòng Kỹ thuật`,
      hints: ["dem đã đếm đúng số hồ sơ ở mỗi vòng; chỉ cần chọn khoá có giá trị lớn nhất.", "max(dem, key=dem.get) trả về khoá có giá trị lớn nhất."],
    },
    {
      type: "flow",
      title: "Bốn việc của lần ứng tuyển đầu tiên, theo thứ tự",
      steps: [
        { label: "Đọc thị trường", detail: "Mở năm tới mười tin cho đúng vị trí bạn nhắm và gạch thứ lặp lại. Phần bị gạch nhiều lần là nhóm cốt lõi thật." },
        { label: "Sửa hồ sơ theo thứ đã gạch", detail: "Ghim hai kho mã, mỗi kho một README chạy được. Đủ để bắt đầu, không cần hoàn hảo." },
        { label: "Nộp song song", detail: "Nộp nhiều nơi cùng lúc và ghi vào một bảng theo dõi. Lời mời đến cùng lúc là thứ duy nhất tạo sức thương lượng." },
        { label: "Ôn theo từng vòng đã hẹn", detail: "Biết vòng nào rồi mới ôn vòng đó, và ghi lại câu hỏi ngay sau mỗi buổi. Nhìn bảng theo dõi để thấy hồ sơ dồn ở vòng nào rồi sửa đúng chỗ đó." },
      ],
    },
  ],

  // ── Chặng 15, bài 1 ────────────────────────────────────────────────────────
  "chuoi-khoi-la-gi-ve-mat-ky-thuat": [
    {
      type: "exercise",
      language: "python",
      title: "Bắt quả tang một khối bị sửa",
      task: "Ba khối nối nhau bằng mã băm: mỗi khối lưu mã băm của khối liền trước. Kẻ xấu sửa khối 1 rồi tính lại mã băm của chính khối đó để che dấu vết. Sửa biến noi_dung để thật sự so mã 'truoc' của mỗi khối với mã của khối đứng trước nó.",
      starter: `import hashlib

def bam(chuoi):
    return hashlib.sha256(chuoi.encode()).hexdigest()[:8]

du_lieu = ["An tra Binh 5", "Binh tra Chi 3", "Chi tra Dung 1"]
chuoi = []
truoc = "00000000"
for d in du_lieu:
    hien_tai = bam(truoc + d)
    chuoi.append({"du_lieu": d, "truoc": truoc, "ma": hien_tai})
    truoc = hien_tai

# Kẻ xấu sửa khối 1, rồi tính lại mã của chính khối đó
chuoi[1]["du_lieu"] = "Binh tra Chi 300"
chuoi[1]["ma"] = bam(chuoi[1]["truoc"] + chuoi[1]["du_lieu"])

for i in range(1, len(chuoi)):
    noi_dung = True
    print("Khối", i, "nối vào khối", i - 1, ":", "ĐÚNG" if noi_dung else "SAI")
`,
      solution: `import hashlib

def bam(chuoi):
    return hashlib.sha256(chuoi.encode()).hexdigest()[:8]

du_lieu = ["An tra Binh 5", "Binh tra Chi 3", "Chi tra Dung 1"]
chuoi = []
truoc = "00000000"
for d in du_lieu:
    hien_tai = bam(truoc + d)
    chuoi.append({"du_lieu": d, "truoc": truoc, "ma": hien_tai})
    truoc = hien_tai

# Kẻ xấu sửa khối 1, rồi tính lại mã của chính khối đó
chuoi[1]["du_lieu"] = "Binh tra Chi 300"
chuoi[1]["ma"] = bam(chuoi[1]["truoc"] + chuoi[1]["du_lieu"])

for i in range(1, len(chuoi)):
    noi_dung = chuoi[i]["truoc"] == chuoi[i - 1]["ma"]
    print("Khối", i, "nối vào khối", i - 1, ":", "ĐÚNG" if noi_dung else "SAI")
`,
      expectedOutput: `Khối 1 nối vào khối 0 : ĐÚNG
Khối 2 nối vào khối 1 : SAI`,
      hints: [
        "Mỗi khối lưu trong 'truoc' mã băm của khối đứng trước lúc được tạo.",
        "Khối 1 đã đổi mã 'ma' của mình, nên 'truoc' của khối 2 không còn bằng nó. Hãy so chuoi[i]['truoc'] với chuoi[i - 1]['ma'].",
      ],
    },
  ],

  // ── Chặng 15, bài 2 ────────────────────────────────────────────────────────
  "vi-khoa-rieng-tu-va-tu-luu-ky": [
    {
      type: "scenario",
      title: "Mười hai từ khôi phục của bạn",
      start: "cai-vi",
      nodes: {
        "cai-vi": {
          text: "Bạn vừa cài một ví tự giữ khoá trên điện thoại. Ví hiện mười hai từ khôi phục và nhắc bạn lưu lại. Bạn lưu thế nào?",
          choices: [
            { label: "Chép tay ra giấy và cất ở hai nơi an toàn khác nhau", next: "tin-nhan" },
            { label: "Chụp màn hình, vì ảnh trong máy đã tự đồng bộ lên đám mây", next: "mat-anh" },
            { label: "Gửi vào hộp thư của chính mình cho khỏi quên", next: "mat-thu" },
          ],
        },
        "mat-anh": {
          text: "Tài khoản đám mây của bạn bị người khác đăng nhập. Họ lật kho ảnh, thấy mười hai từ và đưa chúng vào một ví khác. Vì cụm khôi phục chính là khoá riêng tư, họ có toàn quyền ngay lập tức và không có cách nào thu hồi. Số tiền trong ví biến mất trong vài phút.",
          ending: "bad",
        },
        "mat-thu": {
          text: "Hộp thư của bạn bị lộ mật khẩu ở một dịch vụ khác. Kẻ xấu tìm từ khoá 'ví', thấy mười hai từ và rút sạch. Một bản sao nằm trên máy chủ thư là một bản mà bạn không kiểm soát được.",
          ending: "bad",
        },
        "tin-nhan": {
          text: "Hôm sau có tin nhắn tự xưng là 'bộ phận hỗ trợ ví': ví của bạn bị lỗi đồng bộ, hãy nhập mười hai từ vào đường dẫn kèm theo để xác minh. Bạn làm gì?",
          choices: [
            { label: "Không gửi cho ai, vì người hỗ trợ thật không cần tới khoá riêng tư của bạn", next: "doi-may" },
            { label: "Nhập vào trang đó, vì họ nói đúng tên ví của bạn", next: "mat-tien" },
            { label: "Hỏi họ số hỗ trợ trước, thấy trả lời nhanh nên nhập luôn", next: "mat-tien-2" },
          ],
        },
        "mat-tien": {
          text: "Trang đó là của kẻ lừa đảo. Biết tên ví chỉ cần nhìn địa chỉ công khai, không chứng minh họ là ai. Họ nhận mười hai từ, có toàn quyền ký thay bạn và chuyển hết đi.",
          ending: "bad",
        },
        "mat-tien-2": {
          text: "Trả lời nhanh không chứng minh được điều gì, kẻ lừa đảo luôn có kịch bản sẵn. Họ nhận mười hai từ và rút hết tài sản. Giao dịch đã ghi lên chuỗi thì không đảo ngược được.",
          ending: "bad",
        },
        "doi-may": {
          text: "Tuần sau điện thoại của bạn rơi vỡ. Bạn mua máy mới và cần lấy lại ví. Bạn làm gì?",
          choices: [
            { label: "Cài ví lên máy mới, chọn khôi phục và nhập mười hai từ đã chép", next: "khoi-phuc-ok" },
            { label: "Liên hệ nhà phát hành ví để xin cấp lại quyền truy cập", next: "khong-ai-cap-lai" },
          ],
        },
        "khoi-phuc-ok": {
          text: "Số dư và lịch sử hiện lại đầy đủ. Dữ liệu vẫn nằm trên chuỗi chứ chưa bao giờ nằm trong máy bạn; bạn chỉ lấy lại khả năng ký. Tờ giấy cất kỹ đã làm đúng việc của nó.",
          ending: "good",
        },
        "khong-ai-cap-lai": {
          text: "Họ trả lời rằng không có danh sách người dùng hay mật khẩu nào để cấp lại, vì mạng chỉ biết khoá công khai. Nếu bạn không còn mười hai từ thì không ai khôi phục được, và tài sản bị khoá vĩnh viễn.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Một giao dịch được ký rồi được mạng kiểm",
      steps: [
        { label: "Bạn soạn giao dịch", detail: "Ví hiện cho bạn nội dung: chuyển gì, cho địa chỉ nào. Khoá riêng tư của bạn vẫn nằm trong ví, chưa đi đâu." },
        { label: "Ví ký bằng khoá riêng tư", detail: "Chỉ khoá riêng tư tạo được chữ ký, và chữ ký đó đúng với đúng nội dung giao dịch này. Khoá không rời khỏi ví." },
        { label: "Gửi giao dịch cùng chữ ký lên mạng", detail: "Mạng nhận nội dung, chữ ký và khoá công khai của bạn. Nó không bao giờ nhận được khoá riêng tư." },
        { label: "Các nút kiểm bằng khoá công khai", detail: "Chữ ký khớp thì giao dịch hợp lệ. Không có bảng mật khẩu hay danh sách người dùng để tra, vì chữ ký chính là bằng chứng." },
        { label: "Ghi vào chuỗi", detail: "Giao dịch nằm vĩnh viễn trong khối. Cũng vì mạng chỉ biết khoá công khai nên nếu bạn mất khoá riêng tư, không ai cấp lại lối vào cho bạn." },
      ],
    },
  ],

  // ── Chặng 15, bài 3 ────────────────────────────────────────────────────────
  "san-giao-dich-va-rui-ro-doi-tac": [
    {
      type: "scenario",
      title: "Hợp đồng đã lên chuỗi mà có lỗi",
      start: "phat-hien",
      nodes: {
        "phat-hien": {
          text: "Ba ngày sau khi triển khai, bạn thấy hàm hoàn tiền tính sai khi số lượng bằng 0. Hợp đồng đang giữ tiền của người dùng, và bạn không viết sẵn nút tắt hay lớp proxy nào. Bạn làm gì?",
          choices: [
            { label: "Triển khai một hợp đồng mới đã sửa, công bố địa chỉ mới và hướng dẫn người dùng chuyển sang", next: "viet-moi" },
            { label: "Sửa mã trên kho lưu trữ, vì bản trong kho mới là bản chính thức", next: "sua-kho" },
            { label: "Nhờ đội vận hành mạng đổi lại byte của khối chứa hợp đồng", next: "doi-khoi" },
          ],
        },
        "sua-kho": {
          text: "Kho mã đổi nhưng hợp đồng trên chuỗi thì không. Người dùng vẫn gọi đúng địa chỉ cũ và vẫn chạm vào hàm lỗi. Mã đã triển khai nằm nguyên, không có bản vá nóng.",
          ending: "bad",
        },
        "doi-khoi": {
          text: "Không ai đủ quyền để làm việc đó, kể cả bạn. Khối đã nối bằng mã băm với mọi khối sau nó, và đó là tính chất mà mọi người dùng đang dựa vào. Bạn mất thêm thời gian trong lúc lỗi vẫn còn.",
          ending: "bad",
        },
        "viet-moi": {
          text: "Hợp đồng cũ vẫn tồn tại và vẫn giữ tiền của những ai chưa chuyển. Với hợp đồng mới, bạn muốn không lặp lại chuyện này. Bạn chọn cách nào?",
          choices: [
            { label: "Viết kiểm thử cho các trường hợp biên như số lượng bằng 0 và thử trên mạng thử nghiệm trước khi triển khai", next: "kiem-thu" },
            { label: "Triển khai ngay vì bản trước đã chạy ổn ba ngày", next: "lap-loi" },
            { label: "Thêm lớp proxy để đổi con trỏ sang bản mới khi cần, và nói rõ ai giữ khoá đổi", next: "proxy" },
          ],
        },
        "lap-loi": {
          text: "Ba ngày chạy ổn chỉ chứng minh những trường hợp thường gặp. Một trường hợp biên khác lại lọt qua và vĩnh viễn nằm trên chuỗi, lần này với số tiền lớn hơn.",
          ending: "bad",
        },
        "kiem-thu": {
          text: "Kiểm thử bắt được lỗi biên ngay trên mạng thử nghiệm, nơi sửa chỉ tốn một lần chạy lại. Vì mã lên chuỗi là không sửa được, việc kiểm trước là chỗ duy nhất để bắt lỗi rẻ.",
          ending: "good",
        },
        "proxy": {
          text: "Proxy vá được lỗi, nhưng ai đổi được con trỏ thì đổi được hành vi hợp đồng, nên người dùng phải tin một bên. Bạn không giấu điều đó mà nói thẳng ai giữ khoá, ai đổi được gì. Đây là một cái giá được chọn có chủ ý.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Hợp đồng thông minh giống máy bán hàng tự động",
      intro:
        "Máy bán nước tự động làm đúng những gì nó được lắp để làm: bỏ đủ tiền, nhấn nút thì chai nước rơi xuống, không ai đứng quầy để thương lượng. Nhưng nếu thợ lắp nhầm giá, máy cũng bán nhầm giá không chút do dự. Hợp đồng thông minh là chiếc máy đó, mà ai cũng đọc được mã và không ai mở được nắp để sửa.",
      columns: ["Chiếc máy bán nước", "Hợp đồng thông minh", "Điều bạn cần biết"],
      rows: [
        ["Ai cũng thấy bảng giá", "Ai cũng đọc được mã đã triển khai", "Bạn biết chắc mã sẽ không đổi vào tuần sau"],
        ["Cùng một nút, cùng một chai nước ở mọi nơi", "Mọi nút chạy cùng mã trên cùng dữ liệu, ra cùng kết quả", "Vì thế hợp đồng không tự gọi ra Internet được"],
        ["Lắp sai giá thì máy bán sai giá", "Lỗi logic vẫn được thực thi trung thực, công khai và vĩnh viễn", "Mã đúng ý định không được bảo đảm"],
        ["Muốn đổi giá phải gọi thợ có chìa khoá", "Muốn đổi mã phải có proxy, và người giữ khoá thành bên phải tin", "Không có lựa chọn miễn phí"],
      ],
      oneLiner: "Hợp đồng thông minh chạy đúng như viết, không hơn: lỗi trong mã cũng chạy đúng như vậy.",
    },
  ],

  // ── Chặng 15, bài 4 ────────────────────────────────────────────────────────
  "stablecoin-neo-vao-cai-gi": [
    {
      type: "exercise",
      language: "javascript",
      title: "Chọn giá cho hợp đồng khi một nguồn bị chiếm",
      task: "Năm nguồn báo giá của cùng một tài sản, trong đó một nguồn bị chiếm và báo 250. Mã đang lấy giá trung bình nên bị kéo lệch. Sửa để dùng TRUNG VỊ (giá nằm giữa khi xếp tăng dần) làm giá hợp đồng.",
      starter: `const gia = [100.2, 99.8, 100.1, 250, 100.0];

const tong = gia.reduce((a, b) => a + b, 0);
const giaDung = tong / gia.length;

console.log("Giá hợp đồng dùng: " + giaDung.toFixed(2));
console.log("Lệch so với giá thật (100): " + Math.abs(giaDung - 100).toFixed(1));
`,
      solution: `const gia = [100.2, 99.8, 100.1, 250, 100.0];

const daXep = [...gia].sort((a, b) => a - b);
const giaDung = daXep[Math.floor(daXep.length / 2)];

console.log("Giá hợp đồng dùng: " + giaDung.toFixed(2));
console.log("Lệch so với giá thật (100): " + Math.abs(giaDung - 100).toFixed(1));
`,
      expectedOutput: `Giá hợp đồng dùng: 100.10
Lệch so với giá thật (100): 0.1`,
      hints: ["Xếp tăng dần bằng [...gia].sort((a, b) => a - b), nhớ so sánh bằng số chứ không theo chữ.", "Có 5 phần tử nên trung vị là phần tử ở chỉ số 2."],
    },
    {
      type: "flow",
      title: "Một giá ngoài đời đi vào hợp đồng",
      steps: [
        { label: "Hợp đồng cần biết giá", detail: "Nó không tự hỏi Internet được, vì lời gọi ra ngoài có thể cho kết quả khác nhau ở mỗi nút và phá sự đồng thuận." },
        { label: "Nhiều nguồn độc lập báo giá", detail: "Mỗi nguồn nhìn thị trường của mình. Một nguồn sai hoặc bị chiếm chỉ là một số trong nhiều số." },
        { label: "Oracle tổng hợp bằng trung vị", detail: "Số lệch xa như 250 giữa các số quanh 100 không kéo được kết quả. Muốn lệch giá phải có nhiều bên cùng sai một lúc." },
        { label: "Ghi lên chuỗi bằng một giao dịch", detail: "Giá chỉ trở thành dữ kiện của hợp đồng sau khi được ghi, và việc ghi cũng tốn phí như mọi giao dịch." },
        { label: "Hợp đồng đọc giá đã ghi", detail: "Nếu giá ghi nhầm hoặc cũ, hợp đồng vẫn chạy trung thực trên giá đó. Câu hỏi đúng là dữ liệu vào hợp đồng đến từ đâu." },
      ],
    },
  ],

  // ── Chặng 15, bài 5 ────────────────────────────────────────────────────────
  "khung-phap-ly-tai-san-so-viet-nam": [
    {
      type: "scenario",
      title: "Một nền tảng khoá học dùng chuỗi khối",
      start: "y-tuong",
      nodes: {
        "y-tuong": {
          text: "Đội bạn muốn ra mắt nền tảng khoá học: học viên trả học phí bằng token, và khi học xong có chứng nhận ghi lên chuỗi kèm họ tên, số căn cước. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Tách hai câu hỏi: viết phần mềm với dùng token để thanh toán, và kiểm tra riêng luồng thanh toán", next: "bo-thanh-toan" },
            { label: "Dựng cả hai luồng xong rồi mới hỏi ý kiến luật sư", next: "dung-xong" },
            { label: "Coi đây là viết phần mềm nên không cần hỏi gì thêm", next: "gop-hai-cau" },
          ],
        },
        "dung-xong": {
          text: "Luật sư cho biết tài sản số không được công nhận làm phương tiện thanh toán, nên luồng thu học phí phải bỏ. Hai tháng làm xong luồng này thành công cốc, và lịch ra mắt trượt.",
          ending: "bad",
        },
        "gop-hai-cau": {
          text: "Việc viết và triển khai phần mềm không bị cấm trực tiếp, nhưng đó mới là câu hỏi thứ nhất. Dùng token làm phương tiện thanh toán là câu hỏi thứ hai, và nó không được công nhận. Gộp hai câu làm một khiến bạn dựng xong rồi mới phải bỏ cả luồng thanh toán.",
          ending: "bad",
        },
        "bo-thanh-toan": {
          text: "Bạn thu học phí theo cách thông thường và chỉ dùng chuỗi cho chứng nhận. Còn dữ liệu của học viên thì sao?",
          choices: [
            { label: "Chỉ ghi mã băm của chứng nhận lên chuỗi, giữ họ tên và số căn cước ở cơ sở dữ liệu xoá được", next: "yeu-cau-xoa" },
            { label: "Ghi họ tên lên chuỗi dưới dạng mã hoá, vì mã hoá rồi thì coi như không lộ", next: "ma-hoa" },
            { label: "Ghi thẳng lên chuỗi, rồi làm chức năng xoá khi có người yêu cầu", next: "khong-xoa-duoc" },
          ],
        },
        "ma-hoa": {
          text: "Dữ liệu vẫn nằm vĩnh viễn trên chuỗi, còn khoá giải mã có thể lộ nhiều năm sau. Khi học viên yêu cầu xoá theo quy định về dữ liệu cá nhân, bạn không có thao tác nào xoá được thứ đã ghi.",
          ending: "bad",
        },
        "khong-xoa-duoc": {
          text: "Chuỗi khối được thiết kế để không ai xoá được gì, nên chức năng xoá không thể tồn tại. Bạn vướng một xung đột có thật giữa quyền yêu cầu xoá của chủ dữ liệu và tính bất biến của chuỗi.",
          ending: "bad",
        },
        "yeu-cau-xoa": {
          text: "Vài tháng sau một học viên yêu cầu xoá dữ liệu cá nhân của mình. Bạn trả lời thế nào?",
          choices: [
            { label: "Dữ liệu đã nằm trên chuỗi nên chúng tôi không xoá được", next: "tu-thiet-ke" },
            { label: "Xoá bản gốc trong cơ sở dữ liệu; mã băm còn lại trên chuỗi không còn nghĩa với ai", next: "xoa-ok" },
          ],
        },
        "tu-thiet-ke": {
          text: "Đó là lời từ chối cho một vấn đề bạn tự tạo ra, vì bạn đã chọn ghi dữ liệu cá nhân lên chuỗi. Nếu bạn chỉ ghi mã băm và giữ dữ liệu gốc ở nơi xoá được thì đã không rơi vào thế này.",
          ending: "bad",
        },
        "xoa-ok": {
          text: "Bản gốc bị xoá, mã băm trên chuỗi chỉ còn là một chuỗi ký tự không đối chiếu được với ai. Bạn đáp ứng yêu cầu xoá mà vẫn giữ chuỗi nguyên vẹn. Đây là thông lệ đã thành thói quen của ngành.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Xoá dữ liệu cá nhân khi chuỗi không xoá được",
      steps: [
        { label: "Học viên nộp thông tin", detail: "Họ tên, số căn cước và điểm vào cơ sở dữ liệu của bạn, nơi bạn xoá được." },
        { label: "Tính mã băm của chứng nhận", detail: "Chạy nội dung chứng nhận qua hàm băm để ra một dấu vân tay ngắn. Từ dấu vân tay không suy ngược ra họ tên." },
        { label: "Chỉ mã băm lên chuỗi", detail: "Chuỗi giữ dấu vân tay và thời điểm cấp, đủ để người khác kiểm chứng chứng nhận có thật." },
        { label: "Học viên yêu cầu xoá", detail: "Quyền yêu cầu xoá dữ liệu cá nhân của chủ thể vẫn nguyên giá trị với bạn." },
        { label: "Xoá bản gốc", detail: "Bạn xoá hàng trong cơ sở dữ liệu. Mã băm còn trên chuỗi, nhưng không còn dữ liệu nào để đối chiếu, nên nó vô nghĩa với mọi người." },
      ],
    },
  ],

  // ── Chặng 15, bài 6 ────────────────────────────────────────────────────────
  "lua-dao-trong-tai-san-so": [
    {
      type: "exercise",
      language: "python",
      title: "Tràn số khi trừ quá số dư",
      task: "Hợp đồng cũ dùng số nguyên không dấu: trừ quá số dư không báo lỗi mà quay vòng thành số rất lớn (ở đây mô phỏng bằng số 8 bit, tối đa 255; hợp đồng thật dùng 256 bit). Hàm rut đang luôn trừ thẳng. Thêm bước kiểm tra để số tiền rút lớn hơn số dư thì trả về 'từ chối'.",
      starter: `def tru_khong_dau(a, b):
    return (a - b) % 256

def rut(so_du, so_tien):
    return str(tru_khong_dau(so_du, so_tien))

print("Số dư 5, rút 10 (không kiểm tra):", tru_khong_dau(5, 10))
print("Số dư 5, rút 10 (kiểm tra trước):", rut(5, 10))
print("Số dư 50, rút 10 (kiểm tra trước):", rut(50, 10))
`,
      solution: `def tru_khong_dau(a, b):
    return (a - b) % 256

def rut(so_du, so_tien):
    if so_tien > so_du:
        return "từ chối"
    return str(tru_khong_dau(so_du, so_tien))

print("Số dư 5, rút 10 (không kiểm tra):", tru_khong_dau(5, 10))
print("Số dư 5, rút 10 (kiểm tra trước):", rut(5, 10))
print("Số dư 50, rút 10 (kiểm tra trước):", rut(50, 10))
`,
      expectedOutput: `Số dư 5, rút 10 (không kiểm tra): 251
Số dư 5, rút 10 (kiểm tra trước): từ chối
Số dư 50, rút 10 (kiểm tra trước): 40`,
      hints: ["Kiểm tra trước khi trừ: nếu so_tien > so_du thì return 'từ chối'.", "Dòng đầu đã cho thấy lỗi: 5 - 10 quay vòng thành 251 thay vì báo lỗi."],
    },
    {
      type: "flow",
      title: "Lỗi gọi lại: thứ tự sai rút cạn hợp đồng",
      steps: [
        { label: "Hợp đồng giữ số dư 100 cho kẻ tấn công", detail: "Hàm rút làm hai việc: gửi tiền ra ngoài, rồi mới trừ số dư. Thứ tự này là chỗ hỏng." },
        { label: "Kẻ tấn công gọi rút 100", detail: "Hợp đồng kiểm tra thấy số dư còn 100 nên cho rút, rồi gửi 100 sang địa chỉ của kẻ tấn công." },
        { label: "Mã nhận tiền của kẻ tấn công gọi rút lại ngay", detail: "Địa chỉ nhận là một hợp đồng khác, và nó chạy mã của riêng nó ngay lúc nhận tiền. Mã đó gọi rút một lần nữa." },
        { label: "Lần gọi thứ hai vẫn thấy số dư 100", detail: "Hợp đồng chưa kịp trừ ở lần một nên lại gửi thêm 100. Vòng lặp này tiếp tục cho tới khi hợp đồng hết tiền." },
        { label: "Cách vá: đổi thứ tự", detail: "Kiểm tra điều kiện, đổi trạng thái (trừ số dư), rồi mới tương tác ra ngoài. Lần gọi lại thấy số dư bằng 0 và bị từ chối." },
      ],
    },
  ],

  // ── Chặng 15, bài 7 ────────────────────────────────────────────────────────
  "khi-nao-khong-nen-dung-chuoi-khoi": [
    {
      type: "scenario",
      title: "Giám đốc muốn dùng chuỗi khối",
      start: "de-xuat",
      nodes: {
        "de-xuat": {
          text: "Giám đốc một chuỗi cửa hàng muốn dùng chuỗi khối để 'chống sửa dữ liệu đơn hàng' của hệ thống nội bộ. Chỉ công ty vận hành hệ thống đó; đối tác chỉ cần chắc rằng đơn hàng đã giao không bị sửa. Phản ứng đầu tiên của bạn?",
          choices: [
            { label: "Hỏi: ở đây ai là bên mà mọi người đã tin sẵn, và vì sao cần nhiều bên không tin nhau?", next: "ben-tin" },
            { label: "Đồng ý, vì chuỗi khối là công nghệ chống sửa dữ liệu tốt nhất hiện nay", next: "mua-dat" },
            { label: "Dựng một chuỗi riêng, công ty chọn các nút tham gia", next: "chuoi-rieng" },
          ],
        },
        "mua-dat": {
          text: "Công ty trả cái giá của đồng thuận: chậm hơn hàng trăm lần, mỗi nút lưu vĩnh viễn, mỗi lượt ghi tốn phí. Thứ mua về là tính chất mà một cách rẻ hơn đã cho được.",
          ending: "bad",
        },
        "chuoi-rieng": {
          text: "Công ty tự chọn ai làm nút, nghĩa là chính công ty là bên mọi người phải tin, đúng thứ mà đồng thuận sinh ra để không cần. Kết quả là một cơ sở dữ liệu chậm hơn nhiều lần, và bạn trả đủ cái giá mà không mua được gì.",
          ending: "bad",
        },
        "ben-tin": {
          text: "Câu trả lời: chỉ có công ty vận hành dữ liệu, và đối tác đã chấp nhận điều đó. Bạn chọn giải pháp nào?",
          choices: [
            { label: "Nhật ký chỉ ghi thêm cộng chữ ký số trên cơ sở dữ liệu thường, kèm API chỉ đọc cho đối tác", next: "re-hon" },
            { label: "Ghi từng dòng đơn hàng lên một chuỗi khối công khai để minh bạch", next: "cong-khai" },
            { label: "Giữ nguyên hệ thống cũ, không thêm gì", next: "bo-tri" },
          ],
        },
        "cong-khai": {
          text: "Mỗi dòng đơn hàng tốn phí giao dịch, ghi chậm, và dữ liệu kinh doanh nằm công khai vĩnh viễn. Hơn nữa, nếu nhân viên ghi nhầm một đơn thì chuỗi bảo vệ cái nhầm đó mãi mãi.",
          ending: "bad",
        },
        "bo-tri": {
          text: "Đối tác vẫn không có cách nào kiểm chứng rằng đơn đã giao không bị sửa, nên nhu cầu thật của họ chưa được đáp ứng. Câu hỏi 'có cần chuỗi khối không' có câu trả lời là không, nhưng 'có cần chống sửa không' thì vẫn là có.",
          ending: "bad",
        },
        "re-hon": {
          text: "Chữ ký số trên nhật ký chỉ ghi thêm cho tính chất chống sửa, API chỉ đọc cho đối tác kiểm chứng, và công ty vẫn giữ quyền vận hành. Nhanh hơn hàng trăm lần, không tốn phí từng lượt ghi.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Cùng một nhu cầu, chuỗi khối hay cách rẻ hơn",
      intro:
        "Muốn khoá một tủ hồ sơ, bạn mua một ổ khoá chứ không xây hầm ngân hàng. Hầm ngân hàng chắc chắn hơn, nhưng cái giá của nó (tiền, thời gian, thủ tục) chỉ đáng khi bạn thật sự cần giữ thứ đáng giá trước những người không tin nhau.",
      columns: ["Bạn muốn", "Chuỗi khối cho", "Cách rẻ hơn"],
      rows: [
        ["Dữ liệu không bị sửa lén", "Có, nhưng cả mạng phải đồng thuận cho mỗi lượt ghi", "Nhật ký chỉ ghi thêm cộng chữ ký số trên cơ sở dữ liệu thường"],
        ["Dữ liệu có nhiều bản sao", "Có, mọi nút lưu vĩnh viễn nên rất tốn", "Sao chép của hệ quản trị hiện đại, nhanh hơn hàng trăm lần, không tốn phí từng lượt ghi"],
        ["Đối tác kiểm chứng được", "Có, ai cũng đọc được", "API chỉ đọc cộng nhật ký ký số, một bên vẫn giữ quyền vận hành"],
      ],
      oneLiner: "Chuỗi khối chỉ đáng cái giá khi nhiều bên không tin nhau và không có ai chung để tin; còn lại, cách rẻ hơn đã đủ.",
    },
  ],

  // ── Chặng 15, bài 8 ────────────────────────────────────────────────────────
  "tong-ket-dung-ung-dung-phi-tap-trung-nho": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bản thiết kế dự án chứng nhận do AI đề xuất",
      task: "AI vừa phác bản thiết kế cho dự án cấp chứng nhận hoàn thành khoá học trên chuỗi khối. Bấm vào những câu sai với điều bạn đã học trong chặng này, rồi nộp.",
      segments: [
        { text: "Mục tiêu: khi học viên hoàn thành khoá, trường cấp một chứng nhận mà người khác kiểm chứng được." },
        {
          text: "Ghi họ tên, số căn cước và điểm của học viên thẳng lên chuỗi để ai cũng tra được.",
          error: "Dữ liệu cá nhân lên chuỗi là vĩnh viễn, học viên không xoá được khi có yêu cầu. Chỉ nên ghi mã băm và giữ dữ liệu gốc ở nơi xoá được.",
        },
        { text: "Hợp đồng lưu mã băm của chứng nhận và thời điểm cấp." },
        {
          text: "Hợp đồng gọi API của trường mỗi lần cần điểm để dữ liệu luôn mới nhất.",
          error: "Hợp đồng không tự gọi ra ngoài được vì kết quả khác nhau ở mỗi nút sẽ phá đồng thuận. Dự án này chỉ cần ghi mã băm sau khi trường đã biết điểm, nên không cần oracle.",
        },
        { text: "Ví của trường giữ khoá riêng tư để ký các giao dịch ghi chứng nhận." },
        {
          text: "Nếu trường quên cụm khôi phục, nhà phát hành ví sẽ cấp lại quyền ký.",
          error: "Không ai cấp lại được: mạng chỉ biết khoá công khai. Mất cụm khôi phục là mất quyền ký vĩnh viễn.",
        },
        { text: "Trước khi triển khai, kiểm thử kỹ hợp đồng, vì mã đã lên chuỗi thì không sửa được." },
      ],
    },
    {
      type: "flow",
      title: "Một chứng nhận từ lúc cấp tới lúc được kiểm chứng",
      steps: [
        { label: "Tạo chứng nhận ngoài chuỗi", detail: "Họ tên, ngày hoàn thành và điểm nằm trong cơ sở dữ liệu của trường, nơi xoá được." },
        { label: "Băm chứng nhận", detail: "Nội dung đi qua hàm băm để ra một dấu vân tay. Đổi một chữ trong chứng nhận là dấu vân tay đổi hoàn toàn." },
        { label: "Ví của trường ký", detail: "Ví dùng khoá riêng tư ký giao dịch ghi dấu vân tay. Mạng chỉ cần khoá công khai để kiểm chữ ký." },
        { label: "Hợp đồng ghi lên chuỗi", detail: "Hợp đồng chỉ lưu dấu vân tay và thời điểm cấp. Từ đây nó không sửa được, và trường trả phí giao dịch." },
        { label: "Người khác kiểm chứng", detail: "Nhà tuyển dụng băm lại tờ chứng nhận họ cầm và so với dấu vân tay trên chuỗi. Khớp là bản gốc, lệch là đã bị sửa." },
      ],
    },
  ],

  // ── Chặng 16, bài 1 ────────────────────────────────────────────────────────
  "vi-sao-ai-cung-co-the-bi-lua": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Tìm ba cách tạo trạng thái trong một tin nhắn giả",
      task: "Đây là tin nhắn giả danh ngân hàng. Kịch bản không dựa vào việc bạn thiếu hiểu biết mà tạo ra sợ hãi, gấp gáp hay bí mật. Bấm vào những câu làm đúng việc đó rồi nộp.",
      segments: [
        { text: "Kính gửi quý khách, đây là thông báo về tài khoản của quý khách." },
        {
          text: "Tài khoản của quý khách sẽ bị khoá trong 30 phút nữa.",
          error: "Hạn 30 phút cùng nỗi sợ mất tài khoản là để bạn không có thời gian kiểm chứng.",
        },
        { text: "Mã tham chiếu của thông báo là 48215." },
        {
          text: "Để tránh bị khoá, hãy bấm vào liên kết bên dưới và nhập mã OTP vừa gửi tới điện thoại.",
          error: "Đẩy bạn hành động ngay trong tin nhắn thay vì tự mở ứng dụng chính thức. Ngân hàng thật không hỏi mã OTP qua liên kết.",
        },
        {
          text: "Vui lòng không chia sẻ tin nhắn này với ai để việc xử lý không bị ảnh hưởng.",
          error: "Yêu cầu giữ bí mật là dấu hiệu mạnh nhất: người thứ hai không mang theo nỗi sợ sẽ thấy ngay chỗ vô lý.",
        },
      ],
    },
  ],

  // ── Chặng 16, bài 2 ────────────────────────────────────────────────────────
  // ── Chặng 16, bài 3 ────────────────────────────────────────────────────────
  "nguoi-quen-bi-chiem-tai-khoan": [
    {
      type: "scenario",
      title: "Bạn thân nhắn tin mượn tiền gấp",
      start: "tin-nhan",
      nodes: {
        "tin-nhan": {
          text: "Hà, bạn thân của bạn, nhắn trên ứng dụng chat: 'Mình đang kẹt, mượn giúp mình 3 triệu chuyển vào số này, mai mình trả nhé.' Số tài khoản mang tên một người lạ. Bạn làm gì?",
          choices: [
            { label: "Thoát cuộc trò chuyện và gọi vào số của Hà đã lưu trong danh bạ", next: "goi-lai" },
            { label: "Hỏi một câu riêng tư ngay trong cuộc trò chuyện, ví dụ tên con mèo của Hà", next: "tra-loi-dung" },
            { label: "Chuyển thử 50 nghìn xem phản ứng ra sao", next: "chuyen-thu" },
          ],
        },
        "tra-loi-dung": {
          text: "Người bên kia trả lời đúng. Họ đang cầm tài khoản của Hà nên đọc được cả lịch sử trò chuyện cũ. Bạn tin và chuyển 3 triệu vào tài khoản của người lạ.",
          ending: "bad",
        },
        "chuyen-thu": {
          text: "Khoản thử không kiểm chứng điều gì, nó chỉ làm bạn tin hơn. Họ cảm ơn rồi nhắn tiếp: thiếu thêm 2 triệu nữa. Bạn đã trao tiền cho kẻ vừa chứng minh bạn sẵn sàng chuyển.",
          ending: "bad",
        },
        "goi-lai": {
          text: "Hà bắt máy và nói mình không nhắn gì cả, tài khoản có lẽ đã bị chiếm. Cùng lúc bạn thấy tin nhắn giống hệt được gửi cho vài người bạn chung. Bạn làm gì tiếp?",
          choices: [
            { label: "Báo ngay cho các bạn chung qua một kênh khác và nhắc Hà báo tài khoản bị chiếm", next: "bao-dong" },
            { label: "Trả lời kẻ kia bằng một tràng mắng để họ biết bạn không bị lừa", next: "mang" },
            { label: "Chụp màn hình cho vui rồi bỏ qua, vì mình không bị lừa là được", next: "bo-qua" },
          ],
        },
        "mang": {
          text: "Kẻ kia im lặng rồi chuyển sang người tiếp theo. Bạn không giúp được ai: tin nhắn vẫn tới các bạn chung và tài khoản của Hà vẫn nằm trong tay họ.",
          ending: "bad",
        },
        "bo-qua": {
          text: "Một người bạn trong nhóm chung thấy tin 'mượn tiền' từ Hà và chuyển 2 triệu. Bạn là người duy nhất biết đây là lừa đảo, nhưng bạn không nói với ai.",
          ending: "bad",
        },
        "bao-dong": {
          text: "Các bạn chung được báo trước khi ai chuyển tiền, và Hà đổi mật khẩu rồi báo ứng dụng khoá tài khoản. Bạn xác minh bằng một kênh do mình chủ động mở, quy tắc này không có hạn sử dụng dù công nghệ giả mạo tiến bộ tới đâu.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Cách nào đủ để xác minh một người quen",
      intro:
        "Có người đứng trước cửa nhà, nói là bạn thân của bạn. Nhìn qua mắt thần thấy giống, nói chuyện nghe cũng giống. Cách chắc ăn nhất không phải nhìn kỹ hơn mà là không mở cửa, rồi tự gọi cho bạn thân bằng số bạn đã lưu từ trước.",
      columns: ["Cách kiểm", "Kẻ chiếm tài khoản qua được không", "Kết luận"],
      rows: [
        ["Hỏi câu riêng tư trong cùng ứng dụng", "Qua được, vì họ cầm tài khoản và thấy cả tin nhắn cũ", "Không đủ"],
        ["Gọi video thấy đúng mặt", "Qua được, vì hình ảnh và giọng nói giả đã đủ thuyết phục", "Không đủ"],
        ["Chuyển thử một khoản nhỏ", "Qua được, và còn làm bạn tin hơn", "Không kiểm chứng gì cả"],
        ["Gọi vào số đã lưu trong danh bạ", "Không qua được, vì họ không cầm điện thoại của người thật", "Đủ, vì bạn tự mở một kênh khác"],
      ],
      oneLiner: "Đừng phân biệt thật giả trong kênh đang đưa ra yêu cầu; hãy bước sang một kênh khác do chính bạn mở.",
    },
  ],

  // ── Chặng 16, bài 4 ────────────────────────────────────────────────────────
  // ── Chặng 16, bài 5 ────────────────────────────────────────────────────────
};
